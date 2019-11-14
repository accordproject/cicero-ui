import React from 'react';
import { getEventTransfer } from 'slate-react';
import { SlateTransformer } from '@accordproject/markdown-slate';
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
                { type: 'quote' },
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
  const isEditable = ((value, code) => {
    // const inClause = value.blocks.size > 0 && value.blocks.every(node => node.type === 'clause');

    const blocks = value.document.getDescendantsAtRange(value.selection);
    const inClause = blocks.size > 0 && blocks.some(node => node.type === 'clause');
    console.log('in clause', inClause);
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
   * Utility function to parse a clause
   */
  function parse(editor, clauseNode) {
    // needs a slate value, not list of nodes
    // come back to this, clean up the API
    const parseClauseCallback = editor.props.clausePluginProps.parseClause;
    const value = {
      document: {
        nodes: clauseNode.nodes
      }
    };

    const slateTransformer = new SlateTransformer();
    const parseText = slateTransformer.toMarkdown(value, { wrapVariables: false });

    parseClauseCallback(clauseNode.data.get('src'), parseText, clauseNode.data.get('clauseid'))
      .then((parseResult) => {
        console.log(parseResult);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /**
   * Debounced parse to only be called after 1 second
   */
  const debouncedParse = _.debounce(parse, 1000, { maxWait: 10000 });

  /**
   * Utility function to parse clauses within a paste value
   */
  function parsePastedClauses(editor, clausesArray) {
    clausesArray.forEach((clauseNode) => {
      parse(editor, clauseNode);
    });
  }

  /**
  * Called on a paste
  * @param {*} event
  * @param {*} editor
  * @param {*} next
  * @return {*} the react component
  */
  const onPaste = (event, editor, next) => {
    if (isEditable(editor.value, 'paste')) {
      const transfer = getEventTransfer(event);

      // keep track of all the things that just got pasted
      const clausesToParse = [];

      if (transfer.type === 'fragment') {
        const mutableFragment = transfer.fragment.asMutable();
        const mutableNodes = mutableFragment.nodes.asMutable();
        const isHeadingClause = node => node.type === 'clause';
        mutableNodes.map((node) => {
          if (isHeadingClause(node)) {
            const mutableNode = node.asMutable();
            const mutableDataMap = mutableNode.data.asMutable();
            const mutableAttributesMap = mutableDataMap.get('attributes');

            const generatedUUID = uuidv4();
            const clauseUriSrc = mutableAttributesMap.src;

            mutableAttributesMap.clauseid = generatedUUID;

            editor.props.clausePluginProps.pasteToContract(generatedUUID, clauseUriSrc, node.text);

            mutableDataMap.set('attributes', mutableAttributesMap);
            mutableNode.data = mutableDataMap.asImmutable();

            clausesToParse.push({ node, src: clauseUriSrc, clauseId: generatedUUID });
            return mutableNode;
          }
          return node;
        });
        mutableFragment.nodes = mutableNodes.asImmutable();
        transfer.fragment = mutableFragment.asImmutable();
        editor.insertFragment(transfer.fragment);
        // on change is fired here, so then we can look into if there are new blocks

        parsePastedClauses(editor, clausesToParse);

        return undefined;
      }
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

    debouncedParse(editor, clauseNode);
    return next();
  }

  /**
  * @param {Object} props
  * @param {*} editor Slate Editor
  * @param {Function} next
  */
  function renderBlock(props, editor, next) {
    const loadTemplateCallback = editor.props.clausePluginProps.loadTemplateObject;
    const { clauseProps } = editor.props.clausePluginProps;
    const { node, children } = props;

    switch (node.type) {
      case 'clause': {
        const src = node.data.get('src');
        const clauseid = node.data.get('clauseid');

        if (src) {
          loadTemplateCallback(src.toString());
        }

        return (
          <ClauseComponent
            clauseProps={clauseProps}
            templateUri={src}
            clauseId={clauseid}
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

  return {
    name,
    augmentSchema,
    renderBlock,
    isEditable,
    onChange,
    onPaste,
    queries: {
      findClauseNode
    }
  };
}

export default ClausePlugin;
