import React from 'react';

/**
 * A plugin for a variable
 */
function VariablePlugin() {
  const name = 'variable';

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
   * Only allows words that don't have marks to be edited
   *
   * @param {Value} value - the Slate value
   */
  const isEditable = ((value, code) => {
    const inVariable = value.inlines.size > 0 && value.inlines.every(node => node.type === 'variable');
    const { anchor } = value.selection;
    console.log(anchor.toJSON());

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

    if (code === 'input') {
      // if are outside of a variable allowing
      // extending the variable
      const prev = value.document.getPreviousSibling(anchor.path);
      return prev && anchor.offset === 0 && prev.type === 'variable';
    }

    return inVariable;
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

    switch (node.type) {
      case 'variable': {
        const { data } = node;
        const value = data.get('value');
        // @ts-ignore
        return <span {...attributes} className='variable'>
            {children}
          </span>;
      }

      default: {
        return next();
      }
    }
  }

  /**
     * @param {ToMarkdown} parent
     * @param {Node} value
     */
  function toMarkdown(parent, value) {
    return `<variable ${value.data.get('attributeString')}/>\n\n`;
  }

  /**
 * Handles data from markdown.
 */
  function fromMarkdown(stack, event, tag, node) {
    const parent = stack.peek();

    // variables can only occur inside paragraphs
    if (!parent.type || parent.type !== 'paragraph') {
      const para = {
        object: 'block',
        type: 'paragraph',
        data: {},
        nodes: [],
      };
      stack.push(para);
    }

    const inline = {
      object: 'inline',
      type: 'variable',
      data: Object.assign(tag),
      nodes: [{
        object: 'text',
        text: `${tag.attributes.value}`,
      }]
    };

    stack.append(inline);

    if (!parent.type || parent.type !== 'paragraph') {
      stack.pop();
    }

    return true;
  }

  /**
 * Handles data from the HTML format.
 */
  function fromHTML(editor, el, next) {
    return {
      object: 'block',
      type: 'variable',
      data: {},
      nodes: next(el.childNodes),
    };
  }

  return {
    name,
    tags,
    augmentSchema,
    isEditable,
    renderInline,
    toMarkdown,
    fromMarkdown,
    fromHTML,
  };
}

export default VariablePlugin;
