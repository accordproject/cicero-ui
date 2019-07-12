import React from 'react';
import { Point } from 'slate';
import { Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import { Template, Clause } from '@accordproject/cicero-core';
import '../styles.css';
// eslint-disable-next-line camelcase
import murmurhash3_32_gc from './murmurhash3_gc';
import ClauseComponent from '../components/ClauseComponent';

const StyledIcon = styled(Icon)`
  color: #ffffff !important;
`;

/**
 * A plugin for a clause embedded in a contract
 * @param {*} customLoadTemplate - a custom function used to load templates
 * @param {*} customParseClause - a custom function used to parse clause text
 */
function ClausePlugin(customLoadTemplate, customParseClause) {
  const name = 'clause';
  const tags = [
    {
      html: 'clause',
      slate: 'clause',
      md: 'clause'
    }
  ];
  const templates = {};

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
              match: [{ type: 'paragraph' }],
            },
          ],
        },
      },
    };

    const newSchema = JSON.parse(JSON.stringify(schema));
    newSchema.blocks = { ...newSchema.blocks, ...additions.blocks };
    newSchema.document.nodes[0].match.push({ type: tags[0].slate });
    return newSchema;
  });

  /**
   * Called by the clause plugin into the contract editor
   * when we need to load a template
   */
  async function loadTemplate(templateUri) {
    let template = templates[templateUri];
    if (!template) {
      console.log(`Loading template: ${templateUri}`);
      template = await Template.fromUrl(templateUri);
      templates[templateUri] = template;
    }

    return template;
  }

  /**
   * Rewrites the text of a clause to introduce variables
   *
   * @param {string} templateUri the URI of the template to load
   * @param {string} clauseText the text of the clause (must be parseable)
   */
  async function rewriteClause(templateUri, clauseText) {
    try {
      const template = await loadTemplate(templateUri);
      const clause = new Clause(template);
      clause.parse(clauseText);
      const variableText = clause.generateText({ wrapVariables: true });
      console.log(variableText);
      return Promise.resolve(variableText);
    } catch (err) {
      console.log(err);
      return Promise.resolve(err);
    }
  }

  /**
   * Called by the clause plugin into the contract editor
   * when we need to parse a clause
   */
  function parseClause(templateUri, text, clauseId) {
    try {
      const template = templates[templateUri];
      if (template) {
        console.log(`parseClause: ${templateUri} with ${text}`);
        const clause = new Clause(template);
        clause.parse(text);
        return Promise.resolve(clause.getData());
      }
      return Promise.resolve('Template not loaded.');
    } catch (err) {
      return Promise.resolve(err);
    }
  }

  const loadTemplateCallback = customLoadTemplate || loadTemplate;
  const parseClauseCallback = customParseClause || parseClause;

  /**
   * Adds an annotation to the editor
   *
   * @param {*} editor
   * @param {*} annotation
   */
  function addAnnotation(editor, annotation) {
    editor.addAnnotation(annotation);
  }

  /**
   * Remove the parse annotations from the editor
   *
   * @param {*} editor
   */
  function removeParseAnnotations(editor) {
    const { annotations } = editor.value;

    editor.withoutSaving(() => {
      annotations.forEach((ann) => {
        if (ann.type.startsWith('parse')) {
          editor.removeAnnotation(ann);
        }
      });
    });
  }

  /**
   * Checks whether an annotation exists
   *
   * @param {*} editor
   * @param {*} annotation
   * @returns {boolean} true if the annotation already exists on the value
   */
  function annotationExists(editor, annotation) {
    const { annotations } = editor.value;
    return annotations.get(annotation.key);
  }

  /**
   * Allow edits if we are outside of a Clause
   *
   * @param {Value} value - the Slate value
   */
  const isEditable = ((value, code) => {
    const blocks = value.document.getDescendantsAtRange(value.selection);
    const inClause = blocks.size > 0 && blocks.some(node => node.type === 'clause');
    console.log('outside clause', !inClause);
    return !inClause;
  });

  /**
  * Handles change to document.
  */
  function onChange(editor, next) {
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
    const { src, clauseid } = nodeAttributes;
    const { selection } = editor.value;

    const anchor = Point.create(selection.anchor).moveToStartOfNode(clauseNode)
      .normalize(editor.value.document);
    const focus = Point.create(selection.focus).moveToEndOfNode(clauseNode)
      .normalize(editor.value.document);
    const parseText = textNode.text.trim();
    // @ts-ignore
    const hash = murmurhash3_32_gc(`${parseText} at ${anchor.toJSON()} to ${focus.toJSON()}`, 0xdeadbeef);

    const annotation = {
      anchor,
      focus,
      key: `clauseParse-${hash}`
    };

    // we only re-parse and modify the value if the text has changed
    if (!annotationExists(editor, annotation)) {
      removeParseAnnotations(editor);
      parseClauseCallback(src, parseText, clauseid)
        .then((parseResult) => {
          annotation.type = 'parseResult';
          annotation.data = parseResult;
          addAnnotation(editor, annotation);
        })
        .catch((error) => {
          annotation.type = 'parseError';
          annotation.data = { error };
          addAnnotation(editor, annotation);
        });
    }

    return next();
  }

  /**
  * @param {Object} props
  * @param {Editor} editor
  * @param {Function} next
  */
  function renderBlock(props, editor, next) {
    const { node, attributes, children } = props;

    switch (node.type) {
      case 'clause': {
        const nodeAttributes = node.data.get('attributes');
        const { src, clauseid } = nodeAttributes;

        if (src) {
          console.log(`handing over responsibility of loading: ${src}`);
          loadTemplateCallback(src.toString());
        }

        return (<ClauseComponent templateUri={src} clauseId={clauseid} {...props}>{children}</ClauseComponent>);
      }
      default:
        return next();
    }
  }

  /**
   * @param {ToMarkdown} parent
   * @param {Node} value
   */
  function toMarkdown(parent, value) {
    let markdown = `\n\n\`\`\` <clause src=${value.data.get('attributes').src} id=${value.data.get('attributes').id}>\n`;

    value.nodes.forEach((li) => {
      const text = parent.recursive(li.nodes);
      markdown += text;
    });

    markdown += '\n```\n';
    return markdown;
  }

  /**
  * Handles data from markdown.
  */
  function fromMarkdown(stack, event, tag, node, parseNestedMarkdown) {
    const block = {
      object: 'block',
      type: 'clause',
      data: tag,
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

    // sub-parse of the contents of the clause node
    const text = tag.content ? tag.content : node.literal;
    const slateDoc = parseNestedMarkdown(text).toJSON();
    slateDoc.document.nodes.forEach(node => stack.append(node));
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
      key={name}
      name='legal'
      aria-label='clause'
      onMouseDown={event => onClickButton(editor, event)}
    />);
  }

  /**
   * Render Slate annotations.
   */
  function renderAnnotation(props, editor, next) {
    const { children, annotation, attributes } = props;

    switch (annotation.type) {
      case 'parseError':
        return (
          <span {...attributes} className='parseError'>
            {children}
          </span>
        );
      default:
        return next();
    }
  }

  return {
    name,
    tags,
    augmentSchema,
    renderBlock,
    toMarkdown,
    fromMarkdown,
    isEditable,
    onChange,
    fromHTML,
    renderToolbar,
    renderAnnotation,
    rewriteClause
  };
}

export default ClausePlugin;
