import { uuid } from 'uuidv4';
import { Editor } from 'slate';
import { getEventTransfer } from 'slate-react';
import _ from 'lodash';

import '../styles.css';


const onClauseUpdated = (onClauseUpdated, isInsideClause) => {
  onClauseUpdated(isInsideClause);
};

const debouncedOnClauseUpdated = _.debounce(onClauseUpdated, 1000, { maxWait: 10000 });

const isEditable = (editor, format) => {
  const [match] = Editor.nodes(editor, { match: n => n.type === format });
  return !!match;
};

export const isInsideClause = editor => isEditable(editor, 'clause');

export const onClauseChange = (editor, onClauseUpdated) => {
  if (!isInsideClause(editor)) { return; }
  debouncedOnClauseUpdated(onClauseUpdated, isInsideClause);
};

const findClauseNodeById = (editor, clauseId) => editor.children.find(
  ({ type, data }) => type === 'clause' && data.clauseid === clauseId
);


const withClauses = (editor) => {
  // extract functions augmenting, call them at the end
  console.log('Inside withClauses', editor);
  const {
    insertData, insertText, isVoid, renderElement
  } = editor;

  // editor.insertText = (text) => {
  //   console.log('Inside withClauses insertText', text);
  //   insertText(text);
  // };

  // editor.isVoid = element => (element.type === 'image' ? true : isVoid(element));
  editor.isInsideClause = () => isEditable(editor, 'clause');
  return editor;
};

/**
 * A plugin for a clause embedded in a contract
 */
function ClausePlugin() {
  /**
   * Allow edits if we are outside of a Clause
   *
   * @param {Value} value - the Slate value
   */
  const isEditable = ((editor, code) => {
    const { value } = editor;
    const blocks = value.document.getDescendantsAtRange(value.selection);
    const inClause = blocks.size > 0 && blocks.some(node => node.type === 'clause');
    return !inClause;
  });

  /**
   * Function called when a clause is updated
   */
  function onClauseUpdated(editor, clauseNode) {
    editor.props.clausePluginProps.onClauseUpdated(clauseNode);
  }

  /**
   * Utility function to parse clauses within a paste value
   */
  function parsePastedClauses(editor, clausesArray) {
    clausesArray.forEach((clauseNode) => {
      onClauseUpdated(editor, clauseNode);
    });
  }

  /**
  * Called on a paste
  * @param {*} event
  * @param {*} editor
  * @param {*} next
  * @return {*} the react component
  */
  const onPaste = async (event, editor, next) => {
    if (isEditable(editor, 'paste')) {
      const transfer = getEventTransfer(event);

      // keep track of all the things that just got pasted
      const clausesToParse = [];
      const clausesToPaste = [];

      if (transfer.type === 'fragment') {
        const mutableFragment = transfer.fragment.asMutable();
        let mutableNodes = mutableFragment.nodes.asMutable();
        const isHeadingClause = node => node.type === 'clause';
        mutableNodes = mutableNodes.map((node) => {
          if (isHeadingClause(node)) {
            const mutableNode = node.withMutations((n) => {
              const clauseUriSrc = n.data.get('src');
              const generatedUUID = uuid();
              const newData = n.data.withMutations((d) => {
                d.set('clauseid', generatedUUID);
              });
              n.set('data', newData);
              clausesToParse.push(n);
              clausesToPaste.push({ id: generatedUUID, src: clauseUriSrc, text: node.text });
            });
            return mutableNode;
          }
          return node;
        });
        mutableFragment.nodes = mutableNodes.asImmutable();
        transfer.fragment = mutableFragment.asImmutable();

        await editor.insertFragment(transfer.fragment);
        clausesToPaste.forEach(clause => editor.props.clausePluginProps
          .pasteToContract(clause.id, clause.src, clause.text));
        // on change is fired here, so then we can look into if there are new blocks

        parsePastedClauses(editor, clausesToParse);

        return undefined;
      }
      return next();
    }
    return next();
  };

  /**
   * Check if UI valid (depth first traversal)
   * @param {object} params - recursion params
   * @param {object} nodes - the Slate nodes
   */
  function _recursive(params, nodes) {
    /* eslint no-underscore-dangle: 0 */
    nodes.forEach((node, index) => {
      const nodeType = node.type;
      switch (node.object) {
        case 'text':
          break;
        default: {
          // eslint-disable-next-line default-case
          switch (nodeType) {
            case 'computed':
              throw new Error('Computed variable not supported');
            case 'image':
              throw new Error('Image not supported');
            case 'ol_list':
            case 'ul_list': {
              if (node.data.kind === 'variable') {
                throw new Error('List variable not supported');
              } if (params.depth > 0) {
                throw new Error('Nested list not supported');
              } else {
                // Increment depth before handling a list children
                params.depth += 1;
              }
            }
          }
        }
      }

      // process any children, attaching to first child if it exists
      if (node.nodes) {
        _recursive(params, node.nodes);
      }
      // Decrement depth when coming out of a list
      if (nodeType === 'ol_list' || nodeType === 'ul_list') {
        params.depth -= 1;
      }
    });
  }

  /**
   * Check if UI valid
   * @param {object} editor - Slate editor
   * @param {object} clauseNode - the Slate node
   * @return {boolean} is it valid
   */
  function isClauseSupported(editor, clauseNode) {
    const params = { depth: 0 };
    let nodes;
    if (clauseNode.document) {
      nodes = clauseNode.document.nodes;
    } else {
      nodes = [clauseNode];
    }
    _recursive(params, nodes);
    return true;
  }

  return {
    // augmentSchema,
    // renderBlock,
    isEditable,
    // onChange,
    onPaste,
    queries: {
      // findClauseNodeById,
      isOutsideOfClause: isEditable,
      isClauseSupported
    }
  };
}

export default withClauses;
