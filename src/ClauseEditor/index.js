/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { useEffect, useState } from 'react';
import { Icon, Message, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { MarkdownEditor } from '@accordproject/markdown-editor';
import { Template, Clause } from '@accordproject/cicero-core';
import './ClauseEditor.css';

/**
 * Clause Editor React component. The component displays the text of the
 * Clause in a MarkdownEditor and parses the text using an associated template.
 * @param {*} props the props for the component. See the declared PropTypes
 * for details.
 */
function ClauseEditor(props) {
  /**
   * A flag that indicates we are currenty loading the template for this clause
   */
  const [loadingTemplate, setLoadingTemplate] = useState(false);

  /**
   * The loaded template associated with this Clause. This defaults
   * to the template that was passed in props. If no template is specified
   * in props then the template is loaded from the props.templateUrl.
   */
  const [template, setTemplate] = useState(props.template);

  /**
   * The error loading the template
   */
  const [error, setError] = useState(null);

  /**
   * The contents of the editor
   */
  const [editorText, setEditorText] = useState(props.markdown);

  /**
   * The result of parsing
   */
  const [parseResult, setParseResult] = useState(null);

  /**
   * The text to parse
   */
  const [parseText, setParseText] = useState(null);

  /**
   * Sets the editorText when the template changes, or the props.clauseData.
   */
  useEffect(() => {
    if (template) {
      if (props.clauseData) {
        // @ts-ignore
        const ciceroClause = new Clause(template);
        ciceroClause.setData(props.clauseData);
        const text = ciceroClause.generateText(/* { wrapVariables: true } */);
        setEditorText(text);
      } else {
        setEditorText(template.getMetadata().getSample());
      }
    }
  }, [props.clauseData, template]);

  /**
   * Loads the template set in props.templateUrl if
   * props.template is not set
   */
  useEffect(() => {
    if (!loadingTemplate && !template && !error) {
      setLoadingTemplate(true);
      Template.fromUrl(props.templateUrl)
        .then((template) => {
          setTemplate(template);
          console.log(`setTemplate: ${template.getIdentifier()}`);
        })
        .catch((err) => {
          setError(err.message);
        });
    }
  }, [error, loadingTemplate, props.templateUrl, template]);

  /**
   * Parses the contents of parseText using the loaded template
   * and calls props.onParse with the results
   */
  useEffect(() => {
    if (template && parseText) {
      try {
        // @ts-ignore
        const ciceroClause = new Clause(template);
        ciceroClause.parse(parseText);
        const parseResult = ciceroClause.getData();
        setParseResult(parseResult);
        props.onParse(parseResult);
      } catch (error) {
        setParseResult(error);
        props.onParse(error);
      }
    }
  }, [parseText, props, template]);

  let message = null;

  if (parseResult) {
    if (parseResult.toString().startsWith('Error')) {
      message = <Message negative attached='bottom'>
    <Icon name='warning sign'/>
    {parseResult.toString()}
  </Message>;
    } else {
      message = <Message positive attached='bottom'>
    <Icon name='check square'/>
    {JSON.stringify(parseResult, null, 2)}
  </Message>;
    }
  }

  if (!parseResult) {
    message = <Message positive attached='bottom'>
    <Icon name='circle notched' loading />
    Loading...
  </Message>;
  }

  const plugins = [];

  return (
    <div>
      <MarkdownEditor
        markdownMode={false}
        markdown={editorText}
        lockText={props.lockText}
        plugins={plugins}
        onChange={(value, markdown) => {
          setParseText(markdown.trim());
          props.onChange(value, markdown);
        }}
      />
      {message}
    </div>
  );
}

/**
 * The property types for this component
 */
ClauseEditor.propTypes = {
  clauseData: PropTypes.object,
  markdown: PropTypes.string.isRequired,
  onParse: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  lockText: PropTypes.bool.isRequired,
  templateUrl: PropTypes.string,
  template: PropTypes.object,
  plugins: PropTypes.arrayOf(PropTypes.shape({
    onEnter: PropTypes.func,
    onKeyDown: PropTypes.func,
    renderNode: PropTypes.func.isRequired,
    toMarkdown: PropTypes.func.isRequired,
    fromMarkdown: PropTypes.func.isRequired,
    fromHTML: PropTypes.func.isRequired,
    plugin: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    markdownTags: PropTypes.arrayOf(PropTypes.string).isRequired,
    schema: PropTypes.object.isRequired,
  })),
};

export default ClauseEditor;
