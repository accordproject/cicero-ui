/* React */
import React, { useState, useEffect } from 'react';
import { Inline } from 'slate';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';

/* Styling */
import * as S from './styles';

/* Icons */
import * as deleteIcon from '../icons/trash';
import * as editIcon from '../icons/edit';
import * as testIcon from '../icons/testIcon';

/* Actions */
import {
  headerGenerator,
  titleGenerator
} from './actions';

/* Components */
import ConditionalBoolean from './ConditionalBoolean';

/**
 * Component to render a clause
 * This will have an id property of the clauseid
 * @param {*} props
 */
function ClauseComponent(props) {
  const clauseProps = props.clauseProps || Object.create(null);

  // Tooltip visibility controls
  const [hovering, setHovering] = useState(false);
  const [hoveringHeader, setHoveringHeader] = useState(false);
  const [hoveringTestIcon, setHoveringTestIcon] = useState(false);
  const [hoveringEditIcon, setHoveringEditIcon] = useState(false);
  const [hoveringDeleteIcon, setHoveringDeleteIcon] = useState(false);

  const [conditionals, setConditionals] = useState({});

  const errorsComponent = props.errors
    ? <Segment contentEditable={false} attached raised>{props.errors}</Segment>
    : null;

  const title = titleGenerator(props.templateUri);
  const header = headerGenerator(props.templateUri, clauseProps.HEADER_TITLE);

  const iconWrapperProps = {
    currentHover: hovering,
    iconBg: clauseProps.CLAUSE_BACKGROUND
  };

  /* eslint react/no-find-dom-node: "off" */
  useEffect(() => {
    const findPosition = (key) => {
      const pathToConditional = props.editor.value.document.getPath(key);
      const elementDOM = props.editor.findDOMNode(pathToConditional);
      const popupPosition = 'bottom left';
      const positionalStyle = {
        popupStyle: { top: elementDOM.offsetTop, left: elementDOM.offsetLeft, transform: 'none' },
        popupPosition,
        popupHeight: elementDOM.offsetHeight,
        popupWidth: elementDOM.offsetWidth,
      };
      return positionalStyle;
    };

    const findConditionals = node => ({
      ...(((node.type === 'conditional') && (node.data.get('whenFalse') === '')) ? {
        [node.key]: {
          id: node.data.get('id'),
          whenTrue: node.data.get('whenTrue'),
          whenFalse: node.data.get('whenFalse'),
          position: findPosition(node.key),
          currentText: node.text,
          isFalse: node.text === node.data.get('whenFalse'),
        }
      } : {}),
      ...(node.nodes || [])
        .map(findConditionals)
        .reduce((props, node) => ({ ...props, ...node }), {})
    });

    const newState = findConditionals(props.clauseNode);
    setConditionals(newState);
  }, [props.clauseNode, props.editor]);

  const toggleConditional = (key) => {
    const selectionNodeKey = key || props.editor.value.selection.focus.key - 1;
    const selectedConditional = conditionals[selectionNodeKey];

    if (selectedConditional) {
      const selectionTextNode = props.editor.value.document.getNode(key);

      const newInlineJSON = {
        object: 'inline',
        type: 'conditional',
        data: {
          id: selectedConditional.id,
          whenTrue: selectedConditional.whenTrue,
          whenFalse: selectedConditional.whenFalse
        },
        nodes: [
          {
            object: 'text',
            text: selectionTextNode.text === selectedConditional.whenTrue
              ? selectedConditional.whenFalse
              : selectedConditional.whenTrue,
            marks: []
          }
        ]
      };
      const newInlineSlate = Inline.fromJSON(newInlineJSON);

      props.editor.replaceNodeByKey(selectionNodeKey, newInlineSlate);
    }
  };

  const testIconProps = {
    'aria-label': testIcon.type,
    width: '19px',
    height: '19px',
    viewBox: '0 0 16 20',
    clauseIconColor: clauseProps.CLAUSE_ICONS
  };

  const editIconProps = {
    'aria-label': editIcon.type,
    width: '19px',
    height: '19px',
    viewBox: '0 0 19 19',
    clauseIconColor: clauseProps.CLAUSE_ICONS
  };

  const deleteIconProps = {
    'aria-label': deleteIcon.type,
    width: '19px',
    height: '19px',
    viewBox: '0 0 12 15',
    clauseIconColor: clauseProps.CLAUSE_ICONS
  };

  const conditionalIconProps = {
    currentHover: hovering,
    toggleConditional,
  };

  return (
    <S.ClauseWrapper
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      id={props.clauseId}
    >
    {
      !props.readOnly
      && Object.entries(conditionals).map(([key, value]) => (
        value.isFalse && (value.whenFalse === '')
          && <ConditionalBoolean
              key={key}
              conditionalStyle={value.position.popupStyle}
              slateKey={key}
              nodeValue={value}
              {...conditionalIconProps}
            />
      ))
    }
      <S.ClauseBackground
        clauseborder={clauseProps.CLAUSE_BORDER}
        clausebg={clauseProps.CLAUSE_BACKGROUND}
        contentEditable={false}
      />

      <S.ClauseHeader
        currentHover={hovering}
        headerfont={clauseProps.HEADER_FONT}
        headercolor={clauseProps.HEADER_COLOR}
        headerbg={clauseProps.CLAUSE_BACKGROUND}
        contentEditable={false}
      >
        {(hoveringHeader && header.length > 54)
          && <S.HeaderToolTipWrapper>
            <S.HeaderToolTip>
              {title + clauseProps.HEADER_TITLE}
            </S.HeaderToolTip>
          </S.HeaderToolTipWrapper>
        }
        <S.HeaderToolTipText
          onMouseEnter={() => setHoveringHeader(true)}
          onMouseLeave={() => setHoveringHeader(false)}
        >
          {header}
        </S.HeaderToolTipText>
      </S.ClauseHeader>
      { !props.readOnly
        && <>
          <S.TestWrapper
            {...iconWrapperProps}
            onMouseEnter={() => setHoveringTestIcon(true)}
            onMouseLeave={() => setHoveringTestIcon(false)}
            onClick={() => clauseProps.CLAUSE_TEST_FUNCTION(props)}
          >
            <S.ClauseIcon
              {...testIconProps}
              hovering={hoveringTestIcon}
            >
              {testIcon.icon()}
            </ S.ClauseIcon>
            {(hoveringTestIcon)
              && <S.HeaderToolTipWrapper>
                <S.HeaderToolTip>
                  Test
                </S.HeaderToolTip>
              </S.HeaderToolTipWrapper>
            }
          </S.TestWrapper>
          <S.EditWrapper
            {...iconWrapperProps}
            onMouseEnter={() => setHoveringEditIcon(true)}
            onMouseLeave={() => setHoveringEditIcon(false)}
            onClick={() => clauseProps.CLAUSE_EDIT_FUNCTION(props)}
          >
            <S.ClauseIcon
              {...editIconProps}
              hovering={hoveringEditIcon}
            >
              {editIcon.icon()}
            </ S.ClauseIcon>
            {(hoveringEditIcon)
              && <S.HeaderToolTipWrapper>
                <S.HeaderToolTip>
                  Edit
                </S.HeaderToolTip>
              </S.HeaderToolTipWrapper>
            }
          </S.EditWrapper>
          <S.DeleteWrapper
            {...iconWrapperProps}
            onMouseEnter={() => setHoveringDeleteIcon(true)}
            onMouseLeave={() => setHoveringDeleteIcon(false)}
            onClick={() => clauseProps.CLAUSE_DELETE_FUNCTION(props)}
          >
            <S.ClauseIcon
              {...deleteIconProps}
              hovering={hoveringDeleteIcon}
            >
              {deleteIcon.icon()}
            </ S.ClauseIcon>
            {(hoveringDeleteIcon)
              && <S.HeaderToolTipWrapper>
                <S.HeaderToolTip>
                  Delete
                </S.HeaderToolTip>
              </S.HeaderToolTipWrapper>
            }
          </S.DeleteWrapper>
        </>
      }
      <S.ClauseBody
        bodyfont={clauseProps.BODY_FONT}
        variablecolor={clauseProps.VARIABLE_COLOR}
        conditionalcolor={clauseProps.CONDITIONAL_COLOR}
        computedcolor={clauseProps.COMPUTED_COLOR}
        {...props.attributes}
      >
        {props.children}
      </S.ClauseBody>
    {errorsComponent}
  </S.ClauseWrapper>
  );
}

ClauseComponent.propTypes = {
  attributes: PropTypes.PropTypes.shape({
    'data-key': PropTypes.string,
  }),
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
  clauseId: PropTypes.string,
  clauseNode: PropTypes.any,
  clauseProps: PropTypes.shape({
    BODY_FONT: PropTypes.string,
    CLAUSE_BACKGROUND: PropTypes.string,
    CLAUSE_BORDER: PropTypes.string,
    CLAUSE_ICONS: PropTypes.string,
    CLAUSE_DELETE_FUNCTION: PropTypes.func,
    CLAUSE_EDIT_FUNCTION: PropTypes.func,
    CLAUSE_TEST_FUNCTION: PropTypes.func,
    COMPUTED_COLOR: PropTypes.string,
    HEADER_COLOR: PropTypes.string,
    HEADER_FONT: PropTypes.string,
    HEADER_TITLE: PropTypes.string,
    VARIABLE_COLOR: PropTypes.string,
    CONDITIONAL_COLOR: PropTypes.string,
  }),
  editor: PropTypes.any,
  errors: PropTypes.object,
  readOnly: PropTypes.bool,
  removeFromContract: PropTypes.func,
  templateUri: PropTypes.string.isRequired,
};

export default ClauseComponent;
