import React from 'react';
import {
  getEventTransfer, setEventTransfer, findNode
} from 'slate-react';
import Base64 from 'slate-base64-serializer';
import { Document, Point } from 'slate';
import _ from 'lodash';

import '../styles.css';
import ClauseComponent from '../components/ClauseComponent';


/**
 * A plugin for a clause embedded in a contract
 */
function ClausePlugin() {
  const name = 'clause';

  /**
   * Augment the base schema with the variable type
   * @param {*} schema
   */
  const augmentSchema = ((schema) => {
    const additions = {
      blocks: {
        clause: {
          nodes: [
            {
              match: [
                { type: 'paragraph' },
                { type: 'list' },
                { type: 'link' },
                { type: 'horizontal_rule' },
                { type: 'heading_one' },
                { type: 'heading_two' },
                { type: 'heading_three' },
                { type: 'heading_four' },
                { type: 'heading_five' },
                { type: 'heading_six' },
                { type: 'block_quote' },
                { type: 'code_block' },
                { type: 'html_block' },
                { type: 'html_inline' },
                { type: 'softbreak' },
                { type: 'linebreak' },
                { type: 'ol_list' },
                { type: 'ul_list' },
                { type: 'image' },
              ],
            },
          ],
        },
      },
    };

    const newSchema = JSON.parse(JSON.stringify(schema));
    newSchema.blocks = { ...newSchema.blocks, ...additions.blocks };
    newSchema.document.nodes[0].match.push({ type: 'clause' });
    return newSchema;
  });

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
   * a utility function to generate a random node id for annotations
   */
  function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      // eslint-disable-next-line no-bitwise
      const r = Math.random() * 16 | 0;
      // eslint-disable-next-line no-bitwise, no-mixed-operators
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  /**
   * Function called when a clause is updated
   */
  function onClauseUpdated(editor, clauseNode) {
    editor.props.clausePluginProps.onClauseUpdated(clauseNode);
  }

  /**
   * Debounced onClauseUpdated to only be called after 1 second
   */
  const debouncedOnClauseUpdated = _.debounce(onClauseUpdated, 1000, { maxWait: 10000 });

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
              const generatedUUID = uuidv4();
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
  * Handles change to document.
  */
  function onChange(editor, next) {
    const blocks = editor.value.document.getDescendantsAtRange(editor.value.selection);
    const clauseNode = blocks.size > 0 && blocks.find(node => node.type === 'clause');
    if (!clauseNode) {
      return next();
    }

    debouncedOnClauseUpdated(editor, clauseNode);
    return next();
  }

  /**
  * Determines if path has an ancestor that is a clause
  */
  function hasClauseAncestor(editor, path) {
    const ancestors = editor.value.document.getAncestors(path);
    return ancestors.size > 0 && ancestors.some(node => node.type === 'clause');
  }

  /**
  * Handles dragging clause element
  */
  function onDragStart(event, editor, next) {
    const { value } = editor;

    const path = editor.findPath(event.target);
    const preventDrag = hasClauseAncestor(editor, path);
    if (preventDrag) {
      event.preventDefault();
      return false;
    }
    const node = value.document.getDescendantsAtRange(value.selection).get(0);
    if (node.type === 'clause') {
      const fragment = Document.create({ nodes: [node] });
      const encoded = Base64.serializeNode(fragment);
      return setEventTransfer(event, 'fragment', encoded);
    }
    return next();
  }

  /**
  * Handles dragging clause element
  */
  function onDragEnd(event, editor, next) {
    event.preventDefault();
    const path = editor.findPath(event.target);
    const preventDrag = hasClauseAncestor(editor, path);
    if (preventDrag) {
      return false;
    }
    return next();
  }

  /**
  * Handles dragging clause element
  */
  function onDragOver(event, editor, next) {
    console.log('on drag over');
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    return next();
  }

  /**
  * Handles dropping a element
  */
  function onDrop(event, editor, next) {
    console.log('in on drop');
    const path = editor.findPath(event.target);
    const preventDrop = hasClauseAncestor(editor, path);
    if (preventDrop) {
      event.preventDefault();
      return false;
    }
    const { value } = editor;
    const { selection } = value;
    console.log('selection -- ', selection);
    // const { anchor, focus } = selection;
    // const anchorPath = anchor.path;
    // const focusPath = focus.path;
    // console.log('nodes in selection?? -- ', value.document.getNodesAtRange(selection));
    // editor.removeNodeByKey(value.document.getNodesAtRange(selection).get(0).key);

    const target = editor.findEventRange(event);


    editor.focus();

    // COMPAT: React's onSelect event breaks after an onDrop event
    // has fired in a node: https://github.com/facebook/react/issues/11379.
    // Until this is fixed in React, we dispatch a mouseup event on that
    // DOM node, since that will make it go back to normal.
    // const el = editor.findDOMNode(target.focus.path);

    // if (el) {
    //   el.dispatchEvent(
    //     new MouseEvent('mouseup', {
    //       view: window,
    //       bubbles: true,
    //       cancelable: true,
    //     })
    //   );
    // }

    const draggedRange = selection;
    console.log('draggedRange -- ', draggedRange);

    editor.select(target);

    editor.deleteAtRange(draggedRange);
    // const { value } = editor;
    // const { selection } = value;
    // const target = editor.findEventRange(event);
    // console.log('selection -- ', selection);
    // const draggedRange = selection;

    // editor.select(target);
    // if (true) {
    //   editor.deleteAtRange(draggedRange);
    // }
    return next();
  }

  /**
  * @param {Object} props
  * @param {*} editor Slate Editor
  * @param {Function} next
  */
  function renderBlock(props, editor, next) {
    const loadTemplateCallback = editor.props.clausePluginProps.loadTemplateObject;
    const { readOnly } = editor.props;
    const { clauseProps } = editor.props.clausePluginProps;
    const { node, children } = props;

    switch (node.type) {
      case 'clause': {
        const src = node.data.get('src');
        const clauseid = node.data.get('clauseid');

        if (src) {
          loadTemplateCallback(src.toString());
        }
        console.log('props in clause --- ', props);

        console.log('children in clause --- ', children);
        return (
          <ClauseComponent
            clauseProps={clauseProps}
            templateUri={src}
            clauseId={clauseid}
            readOnly={readOnly}
            {...props}>
              {children}
          </ClauseComponent>
        );
      }
      default:
        return next();
    }
  }

  /**
   * Find clause node by clauseId.
   */
  function findClauseNode(editor, clauseId) {
    return editor.value.document.nodes.find(node => (node.type === 'clause')
    && (node.data.get('clauseid') === clauseId));
  }

  /**
   * Check if UI valid (depth first traversal)
   * @param {object} params - recursion params
   * @param {object} nodes - the Slate nodes
   */
  function _recursive(params, nodes) {
    nodes.forEach((node, index) => {
      const nodeType = node.type;
      switch (node.object) {
        case 'text':
          break;
        default: {
          switch (nodeType) {
            case 'conditional':
              throw new Error('Conditional variable not supported');
            case 'computed':
              throw new Error('Computed variable not supported');
            case 'html_block':
              throw new Error('HTML block not supported');
            case 'code_block':
              throw new Error('Code block not supported');
            case 'html_inline':
              throw new Error('HTML inline not supported');
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
    name,
    augmentSchema,
    renderBlock,
    isEditable,
    onChange,
    onDragStart,
    onDragEnd,
    onDragOver,
    onDrop,
    onPaste,
    queries: {
      findClauseNode,
      isOutsideOfClause: isEditable,
      isClauseSupported
    }
  };
}

export default ClausePlugin;
