import React from 'react';
import inConditionalHelper from '../utilities/inConditional';
import Conditional from '../components/Conditional';

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
    const inConditional = inConditionalHelper(value.document
      .getDescendantsAtRange(value.selection));

    const { anchor } = value.selection;
    console.log(`${code} - in conditional ${inConditional}`, anchor.toJSON());
     
    if (code === 'backspace' || code === 'input') {
      if (inConditional) {
        // once wihin the range of a conditional, we prevent Editing(deleting or adding)
        return false;
      }
    }
    // disallow enter within conditionals!
    return code !== 'enter' && inConditional;
  });

  /**
   * Render a Slate inline.
   * This contains an addition symbol and tooltip for conditionals
   *
   * @param {Object} props
   * @param {Editor} editor
   * @param {Function} next
   * @return {Element}
   */
  function renderInline(props, editor, next) {
    const { node } = props;

    switch (node.type) {
      case 'conditional': {
        return <Conditional {...props}/>;
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
