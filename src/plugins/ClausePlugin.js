import React from 'react';
import { Point } from 'slate';
import { getEventTransfer } from 'slate-react';
import { Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import { Template, Clause } from '@accordproject/cicero-core';
import { PluginManager, List, ToMarkdown } from '@accordproject/markdown-editor';

import '../styles.css';
// eslint-disable-next-line camelcase
import murmurhash3_32_gc from './murmurhash3_gc';
import ClauseComponent from '../components/ClauseComponent';
import VariablePlugin from './VariablePlugin';

const plugins = [List(), VariablePlugin({ rawValue: true })];
const pluginManager = new PluginManager(plugins);
const markdownGenerator = new ToMarkdown(pluginManager);

const StyledIcon = styled(Icon)`
  color: #ffffff !important;
`;

/**
 * A plugin for a clause embedded in a contract
 * @param {*} customLoadTemplate - a custom function used to load templates
 * @param {*} customParseClause - a custom function used to parse clause text
 * @param {*} customPasteClause - a custom function used to paste a clause template
 */
function ClausePlugin(customLoadTemplate, customParseClause, customPasteClause, clauseProps) {
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
   * Rewrites the text of a clause to introduce variables
   *
   * @param {string} templateUri the URI of the template to load
   * @param {string} clauseText the text of the clause (must be parseable)
   */
  async function rewriteClause(templateUri, clauseText) {
    try {
      const template = await loadTemplateCallback(templateUri);
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
  function removeParseAnnotations(editor, clauseId) {
    const { annotations } = editor.value;

    editor.withoutSaving(() => {
      annotations.forEach((ann) => {
        const json = JSON.parse(ann.key);
        if (json.clauseId === clauseId) {
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
   * Utility function to return a parsed text and its annotation from a clause
   */
  function generateAnnotation(editor, clauseNode) {
    const { selection } = editor.value;
    const parseText = markdownGenerator.recursive(clauseNode.node.nodes);
    const anchor = Point.create(selection.anchor).moveToStartOfNode(clauseNode.node)
      .normalize(editor.value.document);
    const focus = Point.create(selection.focus).moveToEndOfNode(clauseNode.node)
      .normalize(editor.value.document);
    // @ts-ignore
    const hash = murmurhash3_32_gc(`${clauseNode.clauseId} ${parseText}`, 0xdeadbeef);
    const annotationKey = JSON.stringify({ clauseId: clauseNode.clauseId, hash, });
    const annotation = {
      anchor,
      focus,
      key: annotationKey
    };
    return { annotation, parseText };
  }

  /**
   * Utility function to replace parse annotations for clauses
  */
  function replaceAnnotations(inputObject) {
    const {
      editor,
      annotation,
      clauseid,
      parseText,
      src,
    } = inputObject;

    removeParseAnnotations(editor, clauseid);
    parseClauseCallback(src, parseText, clauseid)
      .then((parseResult) => {
        console.log(parseResult);
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

  /**
   * Utility function to parse clauses within a paste value
   */
  function parsePastedClauses(editor, clausesArray) {
    clausesArray.forEach((clauseNode) => {
      const { annotation, parseText } = generateAnnotation(editor, clauseNode);
      const replaceAnnotationObject = {
        editor,
        annotation,
        clauseid: clauseNode.clauseId,
        parseText,
        src: clauseNode.src,
      };
      // we only re-parse and modify the value if the text has changed
      if (!annotationExists(editor, annotation)) {
        replaceAnnotations(replaceAnnotationObject);
      }
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

            customPasteClause(generatedUUID, clauseUriSrc, node.text);

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
      console.log('onChange - outside clause');
      return next();
    }
    console.log('onChange - inside clause', clauseNode.toJSON());

    const nodeAttributes = clauseNode.data.get('attributes');
    const { src, clauseid } = nodeAttributes;
    const clauseNodeInput = { node: clauseNode, clauseId: clauseid };
    const { annotation, parseText } = generateAnnotation(editor, clauseNodeInput);
    const replaceAnnotationObject = {
      editor,
      annotation,
      clauseid,
      parseText,
      src,
    };

    // we only re-parse and modify the value if the text has changed
    if (!annotationExists(editor, annotation)) {
      replaceAnnotations(replaceAnnotationObject);
      removeParseAnnotations(editor, clauseid);

      parseClauseCallback(src, parseText, clauseid)
        .then((parseResult) => {
          console.log(parseResult);
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
   * @param {ToMarkdown} parent
   * @param {Node} value
   */
  function toMarkdown(parent, value) {
    let markdown = `\n\n\`\`\` <clause src=${value.data.get('attributes').src} clauseid=${value.data.get('attributes').clauseid}>\n`;

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

  /**
   * Find clause node by clauseId.
   */
  function findClauseNode(editor, clauseId) {
    return editor.value.document.nodes.find(node => (node.type === 'clause')
    && (node.data.get('attributes').clauseid === clauseId));
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
    onPaste,
    fromHTML,
    renderToolbar,
    renderAnnotation,
    rewriteClause,
    queries: {
      findClauseNode
    }
  };
}

export default ClausePlugin;
