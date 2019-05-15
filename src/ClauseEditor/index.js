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

import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { MarkdownEditor } from '@accordproject/markdown-editor';
import { Clause } from '@accordproject/cicero-core';
import ParseResult from '../ParseResult';

import './ClauseEditor.css';

/**
 * We don't extend the editor with any custom plugins
 */
const plugins = [];

/**
 * Clause Editor React component. The component displays the text of the
 * Clause in a MarkdownEditor and parses the text using an associated template.
 * @param {*} props the props for the component. See the declared PropTypes
 * for details.
 */
function ClauseEditor(props) {
  /**
   * We cache the previous parse input so that we
   * only call parse when it changes.
   */
  const [prevParse, setPrevParse] = useState(null);

  /**
   * The result of parsing
   */
  const [parseResult, setParseResult] = useState(null);

  /**
   * Called when the underlying MarkdownEditor changes
   */
  const onChange = useCallback((value, markdown) => {
    const trimmed = markdown.trim();
    if (props.template && trimmed !== prevParse) {
      try {
        // @ts-ignore
        const ciceroClause = new Clause(props.template);
        ciceroClause.parse(trimmed);
        const parseResult = ciceroClause.getData();
        setParseResult(parseResult);
        console.log('setParseResult');
        props.onParse(parseResult);
      } catch (error) {
        console.log('setParseResult - error');
        setParseResult(error);
        props.onParse(error);
      }

      setPrevParse(trimmed);
    }
    props.onChange(value, markdown);
  }, [prevParse, props]);

  return (
      <div>
        <MarkdownEditor
          markdownMode={false}
          markdown={props.markdown}
          lockText={props.lockText}
          plugins={plugins}
          onChange={onChange}
        />
        <ParseResult parseResult={parseResult}/>
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
