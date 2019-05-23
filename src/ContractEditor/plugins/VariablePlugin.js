import React from 'react';
import PropTypes from 'prop-types';

/**
 * A plugin for a variable
 */
function VariablePlugin() {
  const plugin = 'Variable';
  const tags = ['variable'];
  const markdownTags = ['variable'];
  const schema = {
    inlines: {
      variable: {
        nodes: [
          {
            match: [{ type: 'text' }],
          },
        ],
      },
    },
  };

  /**
     * @param {Event} event
     * @param {Editor} editor
     * @param {Function} next
     */
  function onEnter(event, editor, next) {
    return next();
  }

  /**
 * Handles change to document.
 */
  function onChange(editor, next) {
    console.log('onChange - VariablePlugin');
    let variableNode = null;
    const variables = editor.value.inlines.some(inline => inline.type === 'variable');
    console.log('variables', variables);
    if (variables.size === 1) {
      variableNode = variables.get(0);
    }

    if (!variableNode) {
      return next();
    }

    console.log(variableNode);
    const { name } = variableNode.data;

    if (name) {
      console.log(`Found variable on node: ${name}`);
    } else {
      console.log('Variable name not found on node.');
    }


    return next();
  }

  /**
     * @param {Event} event
     * @param {Editor} editor
     * @param {Function} next
     */
  function onKeyDown(event, editor, next) {
    switch (event.key) {
      case 'Enter':
        return onEnter(event, editor, next);
      default:
        return next();
    }
  }

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
        const name = data.get('name');
        return (
          <a {...attributes} href={name}>
            {children}
          </a>
        );
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
    let markdown = `<variable ${value.data.get('attributeString')}>`;

    value.nodes.forEach((li) => {
      const text = parent.recursive(li.nodes);
      markdown += text;
    });

    markdown += '</variable>\n\n';
    return markdown;
  }

  /**
 * Handles data from markdown.
 */
  function fromMarkdown(stack, event, tag) {
    const block = {
      object: 'inline',
      type: 'variable',
      data: Object.assign(tag),
      nodes: [],
    };

    stack.push(block);

    stack.addTextLeaf({
      object: 'leaf',
      text: tag.content ? tag.content : '',
      marks: [],
    });
    stack.pop();
    console.log(stack);
    return true;
  }

  /**
 * Handles data from the HTML format.
 */
  function fromHTML(editor, el, next) {
    return {
      object: 'inline',
      type: 'variable',
      data: {},
      nodes: next(el.childNodes),
    };
  }

  return {
    plugin,
    tags,
    markdownTags,
    schema,
    onKeyDown,
    renderInline,
    toMarkdown,
    fromMarkdown,
    fromHTML,
    onChange,
  };
}

export default VariablePlugin;
