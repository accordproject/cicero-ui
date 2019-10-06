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
import { SlateAsInputEditor } from '@accordproject/markdown-editor';

import ClausePlugin from '../plugins/ClausePlugin';
import VariablePlugin from '../plugins/VariablePlugin';

/**
 * Adds the current value to local storage
 */
function storeLocal(value) {
  localStorage.setItem('contract-editor', value.toJSON());
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
// eslint-disable-next-line react/display-name
const ContractEditor = React.forwardRef((props, ref) => {
  const [plugins, setPlugins] = useState([]);
  useEffect(() => {
    setPlugins(
      props.plugins
        ? props.plugins.concat(
          [VariablePlugin(), ClausePlugin(
            props.loadTemplateObject,
            props.parseClause,
            props.pasteToContract,
            props.clauseProps
          )]
        )
        : [VariablePlugin(), ClausePlugin(
          props.loadTemplateObject,
          props.parseClause,
          props.pasteToContract,
          props.clauseProps
        )]
    );
  }, [
    props.clauseProps,
    props.loadTemplateObject,
    props.parseClause,
    props.pasteToContract,
    props.plugins
  ]);
  return (
    plugins.length ? <SlateAsInputEditor
    ref={ref}
    value={props.value || contractProps.value}
    onChange={props.onChange || contractProps.onChange}
    plugins={plugins}
    lockText={props.lockText}
    editorProps={props.editorProps}
  /> : null
  );
});

/**
 * The property types for this component
 */
ContractEditor.propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func,
  editorProps: PropTypes.object,
  lockText: PropTypes.bool,
  loadTemplateObject: PropTypes.func,
  pasteToContract: PropTypes.func,
  clauseProps: PropTypes.shape({
    BODY_FONT: PropTypes.string,
    CLAUSE_BACKGROUND: PropTypes.string,
    CLAUSE_BORDER: PropTypes.string,
    CLAUSE_DELETE: PropTypes.string,
    CLAUSE_DELETE_FUNCTION: PropTypes.func,
    HEADER_FONT: PropTypes.string,
    HEADER_TITLE: PropTypes.string,
  }),
  parseClause: PropTypes.func,
  plugins: PropTypes.arrayOf(PropTypes.shape({
    onEnter: PropTypes.func,
    onKeyDown: PropTypes.func,
    name: PropTypes.string.isRequired,
    augmentSchema: PropTypes.func,
  })),
};

export default ContractEditor;
