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

import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { MarkdownEditor } from '@accordproject/markdown-editor';
import { Template, Clause } from '@accordproject/cicero-core';
import BadParse from '../SlateCommands/BadParse';
import GoodParse from '../SlateCommands/GoodParse';
import './ClauseEditor.css';

/**
 * Clause Editor React component. The component displays the text of the
 * Clause in a MarkdownEditor and parses the text uses an associated template.
 * @param {*} props the props for the component. See the declared PropTypes
 * for details.
 */
function ClauseEditor(props) {
  /**
   * A reference to the Markdown Editor. We need this is the parsing effect
   * to get the contents of the editor
   */
  const editorRef = useRef(null);

  /**
   * A flag that indicates we are currenty loading the template for this clause
   */
  const [loadingTemplate, setLoadingTemplate] = useState(false);

  /**
   * The loaded template associated with this Clause. This is set by the next effect.
   */
  const [template, setTemplate] = useState(null);

  /**
   * The error loading the template
   */
  const [error, setError] = useState(null);

  /**
   * The plain text contents of the editor
   */
  const [plainText, setPlainText] = useState('');

  /**
   * Loads the template set in props.templateUrl
   */
  useEffect(() => {
    if (!loadingTemplate && !template && !error) {
      setLoadingTemplate(true);
      Template.fromUrl(props.templateUrl)
        .then((template) => {
          setTemplate(template);
        })
        .catch((err) => {
          setError(err.message);
        });
    }
  });

  /**
   * Parses the contents of the editor using the loaded template
   */
  useEffect(() => {
    // if we haven't loaded the template yet, we skip parsing
    const markdownEditor = editorRef.current;
    const slateEditor = markdownEditor.editor.current;

    if (markdownEditor && template && slateEditor) {
      const block = slateEditor.value.document.getBlocks().get(0);

      try {
        const ciceroClause = new Clause(template);
        ciceroClause.parse(plainText);
        const parseResult = ciceroClause.getData();
        props.onParse(parseResult);
        slateEditor.command(GoodParse, block, parseResult);
      } catch (error) {
        props.onParse(error);
        slateEditor.command(BadParse, block, error);
      }
    }
  });

  return (
    <div>
      <MarkdownEditor
        ref={editorRef}
        {...props}
        onChange={(editor) => {
          const text = editor.getMarkdown();
          setPlainText(text);
          props.onChange(editor);
        }}
      />
    </div>
  );
}

/**
 * The property types for this component
 */
ClauseEditor.propTypes = {
  markdown: PropTypes.string,
  onParse: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  lockText: PropTypes.bool.isRequired,
  templateUrl: PropTypes.string.isRequired,
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
