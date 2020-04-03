/* React */
import React, { useState, useEffect } from 'react';
// import { Inline, Block } from 'slate';
import PropTypes from 'prop-types';

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
// import ConditionalBoolean from './ConditionalBoolean';
// import ClauseVariableList from './ClauseVariableList';

/* slate-command */
// import regenerateKey from '../SlateCommands/RegenerateAllNodeKeys';

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
  // const [listVariables, setListVariables] = useState({});

  const title = titleGenerator(props.templateUri);
  const header = headerGenerator(props.templateUri, clauseProps.HEADER_TITLE);

  const iconWrapperProps = {
    currentHover: hovering,
    // iconBg: clauseProps.CLAUSE_BACKGROUND
  };

  /* eslint react/no-find-dom-node: "off" */
  // useEffect(() => {
  //   console.log('useEffect props.clauseNode', props);
  // const findPosition = (key) => {
  //   const pathToConditional = props.editor.value.document.getPath(key);
  //   const elementDOM = props.editor.findDOMNode(pathToConditional);
  //   const popupPosition = 'bottom left';
  //   const positionalStyle = {
  //     popupStyle: { top: elementDOM.offsetTop, left: elementDOM.offsetLeft, transform: 'none' },
  //     popupPosition,
  //     popupHeight: elementDOM.offsetHeight,
  //     popupWidth: elementDOM.offsetWidth,
  //   };
  //   return positionalStyle;
  // };

  // const findConditionals = node => ({
  //   ...(((node.type === 'conditional') && (node.data.whenFalse === '')) ? {
  //     [node.key]: {
  //       id: node.data.id,
  //       whenTrue: node.data.whenTrue,
  //       whenFalse: node.data.whenFalse,
  //       // position: findPosition(node.key),
  //       currentText: node.children[0].text,
  //       isFalse: (node.children[0].text === node.data.whenFalse),
  //     }
  //   } : {}),
  //   ...(node.children || [])
  //     .map(findConditionals)
  //     .reduce((props, node) => ({ ...props, ...node }), {})
  // });
  // props.children.props.node.children.forEach((clauseNode) => {
  //   clauseNode.children.forEach(block => findConditionals(block));
  // });

  // let listData = {};
  // const findListVariables = (node) =>{
  //   if((node.type === 'ul_list') ||(node.type ==='ol_list' )){
  //     (node.nodes || []).forEach((listNode,index) => {
  //      if(listNode.getInlinesByType("variable").size > 0){
  //         listData[listNode.key] = {
  //             currentText: listNode.text,
  //             head: index === 0,
  //             tail: index === (node.nodes.size - 1),
  //             parentKey: node.key,
  //             position: findPosition(listNode.key)
  //           }
  //      }
  //     })
  //   }
  //   return {
  //     ...listData,
  //     ...(node.nodes || [])
  //     .map(findListVariables)
  //     .reduce((props, node) => ({ ...props, ...node }), {})
  //   }

  // }

  // const newState = findConditionals(props.clauseNode);
  // console.log('useEffect newState', newState);
  // const foundListVariables = findListVariables(props.clauseNode)

  // setConditionals(newState);
  // setListVariables(foundListVariables)
  // }, [props, props.clauseNode, props.editor]);

  // const toggleConditional = (key) => {
  //   const selectionNodeKey = key || props.editor.value.selection.focus.key - 1;
  //   const selectedConditional = conditionals[selectionNodeKey];

  //   if (selectedConditional) {
  //     const selectionTextNode = props.editor.value.document.getNode(key);

  //     const newInlineJSON = {
  //       object: 'inline',
  //       type: 'conditional',
  //       data: {
  //         id: selectedConditional.id,
  //         whenTrue: selectedConditional.whenTrue,
  //         whenFalse: selectedConditional.whenFalse
  //       },
  //       nodes: [
  //         {
  //           object: 'text',
  //           text: selectionTextNode.text === selectedConditional.whenTrue
  //             ? selectedConditional.whenFalse
  //             : selectedConditional.whenTrue,
  //           marks: []
  //         }
  //       ]
  //     };
  //     const newInlineSlate = Inline.fromJSON(newInlineJSON);
  //     props.editor.replaceNodeByKey(selectionNodeKey, newInlineSlate);
  //   }
  // };

  // const addList = (listLastkey,parentKey) =>{
  //   const listLastNode = props.editor.value.document.getNode(listLastkey);
  //   const parentNode = props.editor.value.document.getNode(parentKey);

  //   const newBlockJSON = regenerateKey(listLastNode);
  //   const newBlockSlate = Block.fromJSON(newBlockJSON);

  //   let newNode = parentNode.nodes.asMutable().push(newBlockSlate);

  //  const updatedList = {
  //       data: parentNode.data,
  //       key: parentNode.key,
  //       object: parentNode.object,
  //       text: parentNode.text,
  //       type: parentNode.type,
  //       nodes:newNode
  //  }

  //   props.editor.replaceNodeByKey(parentKey,Block.fromJSON(updatedList));

  // }

  // const removeList = (key) => props.editor.removeNodeByKey(key);

  const testIconProps = {
    'aria-label': testIcon.type,
    width: '19px',
    height: '19px',
    viewBox: '0 0 16 20',
    // clauseIconColor: clauseProps.CLAUSE_ICONS
  };

  const editIconProps = {
    'aria-label': editIcon.type,
    width: '19px',
    height: '19px',
    viewBox: '0 0 19 19',
    // clauseIconColor: clauseProps.CLAUSE_ICONS
  };

  const deleteIconProps = {
    'aria-label': deleteIcon.type,
    width: '19px',
    height: '19px',
    viewBox: '0 0 12 15',
    // clauseIconColor: clauseProps.CLAUSE_ICONS
  };

  // const conditionalIconProps = {
  //   currentHover: hovering,
  //   toggleConditional,
  // };
  // const ListIconProps = {
  //   currentHover: hovering,
  //   removeList,
  //   addList
  // };
  // console.log('clause component', props);
  return (
    <S.ClauseWrapper
      src={props.templateUri}
      id={props.clauseId}
      className='clause'
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
    {/* {
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
    {
       Object.entries(listVariables).map(([key, value]) => (
        <ClauseVariableList
              key={key}
              listIconStyle={value.position.popupStyle}
              slateListKey={key}
              nodeValue={value}
              {...ListIconProps}
            />
      ))
    } */}
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
