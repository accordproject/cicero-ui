import { uuid } from 'uuidv4';
import { Editor } from 'slate';
import { getEventTransfer } from 'slate-react';
import { SlateTransformer } from '@accordproject/markdown-slate';
import { HtmlTransformer } from '@accordproject/markdown-html';
import _ from 'lodash';
import { CLAUSE } from './withClauseSchema';

import '../styles.css';

// const findClauseNodeById = (editor, clauseId) => editor.children.find(
//   ({ type, data }) => type === 'clause' && data.clauseid === clauseId
// );


const debouncedOnClauseUpdated = onClauseUpdated => _.debounce(
  onClauseUpdated, 1000, { maxWait: 10000 }
);

const isEditable = (editor, format) => {
  const [match] = Editor.nodes(editor, { match: n => n.type === format });
  return !!match;
};

/* eslint no-param-reassign: 0 */
const withClauses = (editor, withClausesProps) => {
  const { insertData, onChange } = editor;
  const { onClauseUpdated, pasteToContract } = withClausesProps;

  editor.isInsideClause = () => isEditable(editor, 'clause');

  editor.onChange = () => {
    if (onClauseUpdated && editor.isInsideClause()) {
      debouncedOnClauseUpdated(onClauseUpdated, editor.isInsideClause);
    }
    onChange();
  };

  editor.insertData = (data) => {
    const HTML_DOM = data.getData('text/html');
    if (HTML_DOM) {
      try {
        const clausesToParseAndPaste = [];
        const htmlTransformer = new HtmlTransformer();
        const slateTransformer = new SlateTransformer();

        const SLATE_DOM = slateTransformer
          .fromCiceroMark(htmlTransformer.toCiceroMark(HTML_DOM));

        const NEW_SLATE_CHILDREN = SLATE_DOM.document.children.map(
          (child) => {
            if (child.type === CLAUSE) {
              console.log('child', child);
              child.data.clauseid = uuid();
              clausesToParseAndPaste.push(child);
            }
            return child;
          }
        );
        const NEW_SLATE_DOM = {
          object: 'value',
          document: {
            object: 'document',
            data: {},
            children: NEW_SLATE_CHILDREN
          }
        };

        clausesToParseAndPaste.forEach((clause) => {
          pasteToContract(clause);
          onClauseUpdated(editor, clause);
        });

        const NEW_HTML_DOM = htmlTransformer
          .toHtml(slateTransformer.toCiceroMark(NEW_SLATE_DOM));
        insertData(data, NEW_HTML_DOM);
        return editor;
      } catch (err) { console.error(err); }
    }
    insertData(data);
  };
  return editor;
};

/**
 * A plugin for a clause embedded in a contract
 */
function ClausePlugin() {
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
    // isEditable,
    // onChange,
    // onPaste,
    queries: {
      // findClauseNodeById,
      // isOutsideOfClause: isEditable,
      isClauseSupported
    }
  };
}

export default withClauses;
