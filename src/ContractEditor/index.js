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

import React from 'react';
import PropTypes from 'prop-types';
import { SlateAsInputEditor } from '@accordproject/markdown-editor';

import ClausePlugin from '../plugins/ClausePlugin';
import VariablePlugin from '../plugins/VariablePlugin';
import ConditionalPlugin from '../plugins/ConditionalPlugin';
import ComputedPlugin from '../plugins/ComputedPlugin';

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
  const plugins = React.useMemo(() => (props.plugins
    ? props.plugins.concat(
      [VariablePlugin(), ConditionalPlugin(), ClausePlugin(), ComputedPlugin()]
    )
    : [VariablePlugin(), ConditionalPlugin(), ClausePlugin(), ComputedPlugin()]), [props.plugins]);
  return (
    plugins.length ? <SlateAsInputEditor
    ref={ref}
    value={props.value || contractProps.value}
    onChange={props.onChange || contractProps.onChange}
    plugins={plugins}
    lockText={props.lockText}
    readOnly={props.readOnly}
    editorProps={{ ...props.editorProps, onUndoOrRedo: props.onUndoOrRedo }}
    clausePluginProps={{
      loadTemplateObject: props.loadTemplateObject,
      onClauseUpdated: props.onClauseUpdated,
      pasteToContract: props.pasteToContract,
      clauseProps: props.clauseProps,
      clauseMap: props.clauseMap
    }}
  /> : null
  );
});

/**
 * The property types for this component
 */
ContractEditor.propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func,
  editorProps: PropTypes.shape({
    BUTTON_BACKGROUND_INACTIVE: PropTypes.string,
    BUTTON_BACKGROUND_ACTIVE: PropTypes.string,
    BUTTON_SYMBOL_INACTIVE: PropTypes.string,
    BUTTON_SYMBOL_ACTIVE: PropTypes.string,
    DROPDOWN_COLOR: PropTypes.string,
    EDITOR_BORDER: PropTypes.string,
    EDITOR_BORDER_RADIUS: PropTypes.string,
    EDITOR_SHADOW: PropTypes.string,
    TOOLBAR_BACKGROUND: PropTypes.string,
    TOOLTIP_BACKGROUND: PropTypes.string,
    TOOLTIP: PropTypes.string,
    TOOLBAR_SHADOW: PropTypes.string,
    WIDTH: PropTypes.string,
  }),
  lockText: PropTypes.bool,
  readOnly: PropTypes.bool,
  loadTemplateObject: PropTypes.func.isRequired,
  pasteToContract: PropTypes.func.isRequired,
  clauseMap: PropTypes.object,
  clauseProps: PropTypes.shape({
    BODY_FONT: PropTypes.string,
    CLAUSE_BACKGROUND: PropTypes.string,
    CLAUSE_BORDER: PropTypes.string,
    CLAUSE_DELETE: PropTypes.string,
    CLAUSE_DELETE_FUNCTION: PropTypes.func,
    HEADER_FONT: PropTypes.string,
    HEADER_TITLE: PropTypes.string,
  }).isRequired,
  onClauseUpdated: PropTypes.func.isRequired,
  onUndoOrRedo: PropTypes.func,
  plugins: PropTypes.arrayOf(PropTypes.shape({
    onEnter: PropTypes.func,
    onKeyDown: PropTypes.func,
    name: PropTypes.string.isRequired,
    augmentSchema: PropTypes.func,
  })),
};

export default ContractEditor;
