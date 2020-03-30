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
import RichTextEditor from '@accordproject/markdown-editor/dist/RichTextEditor';

import withClauses from '../plugins/ClausePlugin';
// import VariablePlugin from '../plugins/VariablePlugin';
// import ConditionalPlugin from '../plugins/ConditionalPlugin';
// import ComputedPlugin from '../plugins/ComputedPlugin';
import ClauseComponent from '../components/ClauseComponent';

/**
 * Adds the current value to local storage
 */
const storeLocal = (value) => {
  localStorage.setItem('contract-editor', value.toJSON());
};

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

/* eslint react/display-name: 0 */
const customElements = (attributes, children, element) => {
  const returnObject = {
    clause: () => (
      <ClauseComponent
        templateUri={element.data.src}
        clauseId={element.data.clauseid}
        {...attributes}>
          {children}
      </ClauseComponent>
    ),
    variable: () => (
      <span id={element.data.id} {...attributes} className='variable'>
        {children}
      </span>
    ),
    conditional: () => (<span style={{ border: '1px solid red' }} {...attributes}>{children}</span>)
  };
  return returnObject;
};
/**
   * Function called when a clause is updated
   */
const onClauseUpdatedNew = (editor, clauseNode) => {
  editor.props.clausePluginProps.onClauseUpdated(clauseNode);
};

/**
   * Debounced onClauseUpdated to only be called after 1 second
   */
const debouncedOnClauseUpdatedNew = _.debounce(onClauseUpdatedNew, 1000, { maxWait: 10000 });

/**
  * Handles change to document.
  */
const onChangeNew = (editor, next) => {
  const blocks = editor.value.document.getDescendantsAtRange(editor.value.selection);
  const clauseNode = blocks.size > 0 && blocks.find(node => node.type === 'clause');
  if (!clauseNode) {
    return next();
  }

  debouncedOnClauseUpdatedNew(editor, clauseNode);
  return next();
};

/**
 * ContractEditor React component, which wraps a markdown-editor
 * and assigns the ClausePlugin.
 *
 * @param {*} props the properties for the component
 */
// eslint-disable-next-line react/display-name
const ContractEditor = React.forwardRef((props, ref) =>
  // const plugins = React.useMemo(() => (
  //   props.plugins
  //     ? props.plugins.concat([withClauses])
  //     : [withClauses]
  // ), [props.plugins]);
  (
    <RichTextEditor
      ref={ref}
      value={props.value || contractProps.value}
      onChange={props.onChange || contractProps.onChange}
      // plugins={plugins}
      customElements={customElements}
      // lockText={props.lockText}
      // readOnly={props.readOnly}
      // editorProps={{ ...props.editorProps, onUndoOrRedo: props.onUndoOrRedo }}
      data-testid='editor'
      clausePluginProps={{
        loadTemplateObject: props.loadTemplateObject,
        onClauseUpdated: props.onClauseUpdated,
        pasteToContract: props.pasteToContract,
        clauseProps: props.clauseProps,
        clauseMap: props.clauseMap
      }}
  />
  ));

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
    EDITOR_MARGIN: PropTypes.string,
    EDITOR_HEIGHT: PropTypes.string,
    EDITOR_SHADOW: PropTypes.string,
    EDITOR_WIDTH: PropTypes.string,
    TOOLBAR_BACKGROUND: PropTypes.string,
    TOOLTIP_BACKGROUND: PropTypes.string,
    TOOLTIP: PropTypes.string,
    TOOLBAR_SHADOW: PropTypes.string,
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
    CLAUSE_ICONS: PropTypes.string,
    CLAUSE_DELETE_FUNCTION: PropTypes.func,
    CLAUSE_EDIT_FUNCTION: PropTypes.func,
    CLAUSE_TEST_FUNCTION: PropTypes.func,
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
