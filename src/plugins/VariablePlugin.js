import React from 'react';

/**
 * A plugin for a variable
 */
function VariablePlugin(opts) {
  const name = 'variable';
  const options = opts;

  const tags = [
    {
      html: 'variable',
      slate: 'variable',
      md: 'variable'
    }
  ];

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
    newSchema.document.nodes[0].match.push({ type: tags[0].slate });
    newSchema.blocks.paragraph.nodes[0].match.push({ type: tags[0].slate });
    return newSchema;
  });

  /**
   * Allow variable inlines to be edited
   *
   * @param {Value} value - the Slate value
   */
  const isEditable = ((value, code) => {
    console.log('value inlines: ', value.inlines);
    const inVariable = value.inlines.size > 0 && value.inlines.every(node => node.type === 'variable');
    const { anchor } = value.selection;
    console.log(`${code} - in variable ${inVariable}`, anchor.toJSON());

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
      return prev && anchor.offset === 0 && prev.type === 'variable';
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
    // console.log('nodeAtt: ', node);
    const id = node.data.get('id');
    const value = node.data.get('value');

    const something = decodeURIComponent(value);

    children.nodes = [{
      object: 'text',
      text: something,
    }];

    console.log('children: ', children);

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
    tags,
    augmentSchema,
    isEditable,
    renderInline,
  };
}

export default VariablePlugin;
