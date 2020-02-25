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
import ConditionalAddition from './ConditionalAddition';

/**
 * Component to render a clause
 * This will have an id property of the clauseid
 * @param {*} props
 */
function ClauseComponent(props) {
  const clauseProps = props.clauseProps || Object.create(null);
  const [hovering, setHovering] = useState(false);
  const [hoveringHeader, setHoveringHeader] = useState(false);
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
      };
      return positionalStyle;
    };

    const findConditionals = node => ({
      ...(node.type === 'conditional' ? {
        [node.key]: {
          whenTrue: node.data.get('whenTrue'),
          whenFalse: node.data.get('whenFalse'),
          position: findPosition(node.key),
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
      const selectionTextNode = props.editor.value.document
        .getTextsAtRange(props.editor.value.selection)
        .find(b => b.text);

      const newInlineJSON = {
        object: 'inline',
        type: 'conditional',
        data: {
          id: 'forceMajeure',
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
    width: '16px',
    height: '20px',
    viewBox: '0 0 16 20',
    clauseIconColor: clauseProps.CLAUSE_ICONS,
    onClick: () => clauseProps.CLAUSE_TEST_FUNCTION(props)
  };

  const editIconProps = {
    'aria-label': editIcon.type,
    width: '19px',
    height: '19px',
    viewBox: '0 0 19 19',
    clauseIconColor: clauseProps.CLAUSE_ICONS,
    onClick: () => clauseProps.CLAUSE_EDIT_FUNCTION(props)
  };

  const deleteIconProps = {
    'aria-label': deleteIcon.type,
    width: '15px',
    height: '19px',
    viewBox: '0 0 12 15',
    clauseIconColor: clauseProps.CLAUSE_ICONS,
    onClick: () => clauseProps.CLAUSE_DELETE_FUNCTION(props)
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
        && <ConditionalAddition
          key={key}
          conditionalStyle={value.position.popupStyle}
          slateKey={key}
          {...conditionalIconProps}
        />))
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
          <S.TestWrapper {...iconWrapperProps}>
            <S.ClauseIcon {...testIconProps}>
              {testIcon.icon()}
            </ S.ClauseIcon>
          </S.TestWrapper>
          <S.EditWrapper {...iconWrapperProps}>
            <S.ClauseIcon {...editIconProps}>
              {editIcon.icon()}
            </ S.ClauseIcon>
          </S.EditWrapper>
          <S.DeleteWrapper {...iconWrapperProps}>
            <S.ClauseIcon {...deleteIconProps}>
              {deleteIcon.icon()}
            </ S.ClauseIcon>
          </S.DeleteWrapper>
        </>
      }
      <S.ClauseBody
        bodyfont={clauseProps.BODY_FONT}
        variablecolor={clauseProps.VARIABLE_COLOR}
        conditionalcolor={clauseProps.CONDITIONAL_COLOR}
        computedcolor={clauseProps.COMPUTED_COLOR}
        onClick={() => toggleConditional()}
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
