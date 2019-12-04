import React from 'react';
import inConditionalHelper from '../utilities/inConditional';

/**
 * A plugin for a conditional
 */
function ConditionalPlugin() {
  const name = 'conditional';

  /**
   * Augment the base schema with the conditional type
   * @param {*} schema
   */
  const augmentSchema = ((schema) => {
    const additions = {
      inlines: {
        conditional: {
          nodes: [{
            match: { object: 'text' }
          }]
        },
      },
    };

    const newSchema = JSON.parse(JSON.stringify(schema));
    newSchema.inlines = { ...newSchema.inlines, ...additions.inlines };
    newSchema.document.nodes[0].match.push({ type: 'conditional' });
    newSchema.blocks.paragraph.nodes[0].match.push({ type: 'conditional' });
    return newSchema;
  });

  /**
   * Allow conditional inlines to be edited
   *
   * @param {*} value - the Slate value
   * @param {string} code - the key code
   */
  const isEditable = ((editor, code) => {
    const { value } = editor;
    const inConditional = inConditionalHelper(value.document.getDescendantsAtRange(value.selection));

    const { anchor } = value.selection;
    console.log(`${code} - in conditional ${inConditional}`, anchor.toJSON());

    if (code === 'backspace') {
      if (inConditional) {
        // if we hit backspace and are at the zeroth
        // position of a conditional prevent deleting the char
        // that precedes the conditional
        return anchor.offset > 0;
      }

      // if we hit backspace and are outside of a conditional
      // allow deleting the last char of the conditional
      // IFF the conditional has more than 1 char
      const prev = value.document.getPreviousSibling(anchor.path);
      return prev && anchor.offset === 0 && prev.type === 'conditional' && prev.getFirstText().text.length > 1;
    }

    if (!inConditional && code === 'input') {
      // if are outside of a conditional allowing
      // extending the conditional
      const prev = value.document.getPreviousSibling(anchor.path);

      const extendingVar = prev && anchor.offset === 0 && prev.type === 'conditional';
      if (extendingVar) {
        editor.moveToEndOfNode(prev);
      }
      return extendingVar;
    }

    // disallow enter within conditionals!
    return code !== 'enter' && inConditional;
  });

  /**
   * Render a Slate inline.
   *
   * @param {Object} props
   * @param {Editor} editor
   * @param {Function} next
   * @return {Element}
   */
  function renderInline(props, editor, next) {
    const { attributes, children, node } = props;
    const id = node.data.get('id');

    switch (node.type) {
      case 'conditional': {
        // @ts-ignore
        return <span id={id} {...attributes} className='conditional'>
            {children}
          </span>;
      }

      default: {
        return next();
      }
    }
  }

  return {
    name,
    augmentSchema,
    isEditable,
    renderInline,
  };
}

export default ConditionalPlugin;
