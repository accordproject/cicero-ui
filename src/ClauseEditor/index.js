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
import { Template, Clause } from '@accordproject/cicero-core';
import ContractEditor from '../ContractEditor';
import ParseResult from '../ParseResult';

import './ClauseEditor.css';

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
   * The list of templates that have been loaded, indexed by URL
   */
  const [templates, setTemplates] = useState({});

  /**
   * Called when the underlying MarkdownEditor changes
   */
  const onChange = useCallback((value, markdown) => {
    // const trimmed = markdown.trim();
    // if (props.template && trimmed !== prevParse) {
    //   try {
    //     // @ts-ignore
    //     const ciceroClause = new Clause(props.template);
    //     ciceroClause.parse(trimmed);
    //     const parseResult = ciceroClause.getData();
    //     setParseResult(parseResult);
    //     console.log('setParseResult');
    //     props.onParse(parseResult);
    //   } catch (error) {
    //     console.log('setParseResult - error');
    //     setParseResult(error);
    //     props.onParse(error);
    //   }

    //   setPrevParse(trimmed);
    // }
    props.onChange(value, markdown);
  }, [props]);

  return (
      <div>
        <ContractEditor
          value={props.value}
          lockText={props.lockText}
          plugins={props.plugins}
          onChange={onChange}
          showEditButton={props.showEditButton}
          parseClause={props.parseClause}
          loadTemplateObject={props.loadTemplateObject}
        />
        { props.showParse ? <ParseResult parseResult={parseResult} /> : null }
      </div>
  );
}

/**
 * The property types for this component
 */
ClauseEditor.propTypes = {

  /**
   * Initial contents of the editor (clause text)
   */
  value: PropTypes.object.isRequired,

  /**
   * Callback when contents of the editor changes
   */
  onChange: PropTypes.func.isRequired,

  /**
   * A callback to load a template
   */
  loadTemplateObject: PropTypes.func,

  /**
   * When true only the variables in the template are editable
   */
  lockText: PropTypes.bool.isRequired,

  /**
   * A callback to parse the contents of a clause
   */
  parseClause: PropTypes.func,

  /**
   * The Cicero template for the clause (Optional)
   */
  template: PropTypes.object,

  /**
   * If true then show the edit button.
   */
  showEditButton: PropTypes.bool,

  /**
   * If true then show the parse result.
   */
  showParse: PropTypes.bool,

  /**
   * An array of plugins that can extend the underlying markdown editor
   */
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
/**
 * The default property values for this component
 */
ClauseEditor.defaultProps = {
  showEditButton: true,
  showParse: true,
};

export default ClauseEditor;
