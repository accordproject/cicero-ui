import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import ClauseComponent from '../components/ClauseComponent';

const StyledIcon = styled(Icon)`
  color: #ffffff !important;
`;

/**
 * A plugin for a clause embedded in a contract
 */
function ClausePlugin(loadTemplateObject, parseClause) {
  const plugin = 'Clause';
  const tags = ['clause'];
  const markdownTags = ['clause'];
  const schema = {
    blocks: {
      Clause: {
        nodes: [
          {
            match: [{ type: 'paragraph' }],
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
    console.log('onChange');
    let clauseNode = null;
    let textNode = null;
    const textNodes = editor.value.texts;
    if (textNodes.size === 1) {
      textNode = textNodes.get(0);
      const para = editor.value.document.getParent(textNode.key);
      clauseNode = editor.value.document.getParent(para.key);
    }

    if (!clauseNode || clauseNode.type !== 'clause') {
      return next();
    }

    const nodeAttributes = clauseNode.data.get('attributes');
    const { src } = nodeAttributes;
    parseClause(src, textNode.text.trim())
      .then(parseResult => console.log(parseResult)) // add/remove annotation
      .catch(error => console.log(error)); // add/remove annotation
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
     * @param {Object} props
     * @param {Editor} editor
     * @param {Function} next
     */
  function renderBlock(props, editor, next) {
    renderBlock.propTypes = {
      node: PropTypes.any,
      attributes: PropTypes.any,
      children: PropTypes.any,
    };

    const { node, children } = props;

    const nodeAttributes = node.data.get('attributes');
    const { src } = nodeAttributes;

    if (src) {
      console.log(`handing over responsibility of loading: ${src}`);
      loadTemplateObject(src.toString());
    }

    return (<ClauseComponent {...props}>{children}</ClauseComponent>);
  }

  /**
     * @param {ToMarkdown} parent
     * @param {Node} value
     */
  function toMarkdown(parent, value) {
    let markdown = `<clause ${value.data.get('attributeString')}>`;

    value.nodes.forEach((li) => {
      const text = parent.recursive(li.nodes);
      markdown += text;
    });

    markdown += '</clause>\n\n';
    return markdown;
  }

  /**
 * Handles data from markdown.
 */
  function fromMarkdown(stack, event, tag) {
    const block = {
      object: 'block',
      type: 'clause',
      data: Object.assign(tag),
      nodes: [],
    };

    stack.push(block);

    const para = {
      object: 'block',
      type: 'paragraph',
      data: {},
      nodes: [],
    };

    stack.push(para);
    stack.addTextLeaf({
      object: 'leaf',
      text: tag.content ? tag.content : '',
      marks: [],
    });
    stack.pop();
    stack.pop();
    return true;
  }

  /**
 * Handles data from the HTML format.
 */
  function fromHTML(editor, el, next) {
    return {
      object: 'block',
      type: 'clause',
      data: {},
      nodes: next(el.childNodes),
    };
  }

  /**
   * When then button is clicked
   *
   * @param {Editor} editor
   * @param {Event} event
   */

  /**
 * Handles a button click.
 */
  function onClickButton(editor, event) {
    event.preventDefault();
    alert('Clause plugin button clicked!');
  }

  /**
   * Render a clause toolbar button.
   *
   * @param {Editor} editor
   * @return {Element}
   */
  function renderToolbar(editor) {
    return (<StyledIcon
      key={plugin}
      name='legal'
      aria-label='clause'
      onMouseDown={event => onClickButton(editor, event)}
    />);
  }

  return {
    plugin,
    tags,
    markdownTags,
    schema,
    onKeyDown,
    renderBlock,
    toMarkdown,
    fromMarkdown,
    fromHTML,
    onChange,
    renderToolbar,
  };
}

export default ClausePlugin;
