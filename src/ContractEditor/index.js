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
import PropTypes from 'prop-types';
import { SlateAsInputEditor, List } from '@accordproject/markdown-editor';

import ClausePlugin from '../plugins/ClausePlugin';

/**
 * Adds the current markdown to local storage
 */
function storeLocal(value, markdown) {
  localStorage.setItem('contract-editor', markdown);
}

/**
 * Default contract props
 */
const contractProps = {
  value: {
    object: 'value',
    document: {
      object: 'document',
      data: {},
      nodes: [{
        object: 'block',
        type: 'paragraph',
        data: {},
        nodes: [{
          object: 'text',
          text: 'Welcome! Edit this text to get started.',
          marks: []
        }],
      }]
    }
  },
  onChange: storeLocal,
  plugins: []
};

/**
 * ContractEditor React component, which wraps a markdown-editor
 * and assigns the ClausePlugin.
 *
 * @param {*} props the properties for the component
 */
const ContractEditor = (props) => {
  const [plugins, setplugins] = useState([]);
  useEffect(() => {
    setplugins(
      props.plugins
        ? props.plugins.concat(
          [List(), ClausePlugin(props.loadTemplateObject, props.parseClause)]
        )
        : [List(), ClausePlugin(props.loadTemplateObject, props.parseClause)]
    );
  }, [props.loadTemplateObject, props.parseClause, props.plugins]);
  return (
    plugins.length ? <SlateAsInputEditor
    value={props.value || contractProps.value}
    onChange={props.onChange || contractProps.onChange}
    plugins={plugins}
    lockText={props.lockText}
    editorProps={props.editorProps}
  /> : null
  );
};
/**
 * The property types for this component
 */
ContractEditor.propTypes = {

  /**
   * Initial contents of the editor
   */
  value: PropTypes.object,

  /**
   * Callback called when the contents of the editor changes
   */
  onChange: PropTypes.func,

  /**
   * Styling props passed down through an object to Markdown Editor
   */
  editorProps: PropTypes.object,

  /**
   * Whether to lock all non variable text
   */
  lockText: PropTypes.bool,

  /**
   * A callback to load a template
   */
  loadTemplateObject: PropTypes.func.isRequired,

  /**
   * A callback to parse the contents of a clause
   */
  parseClause: PropTypes.func.isRequired,

  /**
   * An array of plugins into the underlying markdown-editor
   */
  plugins: PropTypes.arrayOf(PropTypes.shape({
    onEnter: PropTypes.func,
    onKeyDown: PropTypes.func,
    renderBlock: PropTypes.func.isRequired,
    toMarkdown: PropTypes.func.isRequired,
    fromMarkdown: PropTypes.func.isRequired,
    fromHTML: PropTypes.func.isRequired,
    plugin: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    schema: PropTypes.object.isRequired,
  })),
};

export default ContractEditor;
