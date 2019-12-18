import React from 'react';
import inVariableHelper from '../utilities/inVariable';
import isToolbarMethodHelper from '../utilities/isToolbarMethod';

/**
 * A plugin for a variable
 */
function VariablePlugin() {
  const name = 'variable';

  /**
   * Augment the base schema with the variable type
   * @param {*} schema
   */
  const augmentSchema = ((schema) => {
    const additions = {
      inlines: {
        variable: {
          nodes: [{
            match: { object: 'text' }
          }]
        },
      },
    };

    const newSchema = JSON.parse(JSON.stringify(schema));
    newSchema.inlines = { ...newSchema.inlines, ...additions.inlines };
    newSchema.document.nodes[0].match.push({ type: 'variable' });
    newSchema.blocks.paragraph.nodes[0].match.push({ type: 'variable' });
    return newSchema;
  });

  /**
   * Allow variable inlines to be edited
   *
   * @param {*} value - the Slate value
   * @param {string} code - the key code
   */
  const isEditable = ((editor, code) => {
    const { value } = editor;
    const inVariable = inVariableHelper(value.document.getDescendantsAtRange(value.selection));

    const { anchor } = value.selection;
    console.log(`${code} - in variable ${inVariable}`, anchor.toJSON());

    if (inVariable && isToolbarMethodHelper(code)) {
      return false;
    }

    if (code === 'backspace') {
      if (inVariable) {
        // if we hit backspace and are at the zeroth
        // position of a variable prevent deleting the char
        // that precedes the variable
        return anchor.offset > 0;
      }

      // if we hit backspace and are outside of a variable
      // allow deleting the last char of the variable
      // IFF the variable has more than 1 char
      const prev = value.document.getPreviousSibling(anchor.path);
      return prev && anchor.offset === 0 && prev.type === 'variable' && prev.getFirstText().text.length > 1;
    }

    if (!inVariable && code === 'input') {
      // if are outside of a variable allowing
      // extending the variable
      const prev = value.document.getPreviousSibling(anchor.path);

      const extendingVar = prev && anchor.offset === 0 && prev.type === 'variable';
      if (extendingVar) {
        editor.moveToEndOfNode(prev);
      }
      return extendingVar;
    }

    // disallow enter within variables!
    return code !== 'enter' && inVariable;
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
      case 'variable': {
        // @ts-ignore
        return <span id={id} {...attributes} className='variable'>
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

export default VariablePlugin;
