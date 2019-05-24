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
import { MarkdownEditor } from '@accordproject/markdown-editor';
import List from '@accordproject/markdown-editor/dist/plugins/list';
import ClausePlugin from '../plugins/ClausePlugin';
import ClauseComponent from '../components/ClauseComponent';

const defaultMarkdown = `# Supply Agreement
  This is a supply agreement between Party A and Party B.
  
  # Payment
  
  <clause src="https://templates.accordproject.org/archives/full-payment-upon-signature@0.7.1.cta" clauseid="skjh2342dsa">
  Upon the signing of this Agreement, "Dan" shall pay the total purchase price to "Steve" in the amount of 0.01 USD.
  </clause>
  
  ## Late Delivery And Penalty
  
  <clause src="https://templates.accordproject.org/archives/latedeliveryandpenalty@0.13.1.cta" clauseid="kgek32h4k3j2hkew">
  Late Delivery and Penalty. In case of delayed delivery except for Force Majeure cases, "Dan" (the Seller) shall pay to "Steve" (the Buyer) for every 2 days of delay penalty amounting to 10.5% of the total value of the Equipment whose delivery has been delayed. Any fractional part of a days is to be considered a full days. The total amount of penalty shall not however, exceed 55% of the total value of the Equipment involved in late delivery. If the delay is more than 15 days, the Buyer is entitled to terminate this Contract.
  </clause>
  
  End.
  `;

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
  markdown: defaultMarkdown,
  onChange: storeLocal,
  plugins: []
};

/**
 * ContractEditor React component, which wraps a markdown-editor
 * and assigns the ClausePlugin.
 *
 * @param {*} props the properties for the component
 */
const ContractEditor = props => (
  <MarkdownEditor
    markdown={props.markdown || contractProps.markdown}
    onChange={props.onChange || contractProps.onChange}
    plugins={
      props.plugins
        ? props.plugins.concat([List(), ClausePlugin(ClauseComponent, props.loadTemplateObject, props.parseClause)])
        : [List(), ClausePlugin(ClauseComponent, props.loadTemplateObject, props.parseClause)]
    }
  />
);
/**
 * The property types for this component
 */
ContractEditor.propTypes = {

  /**
   * Initial contents of the editor
   */
  markdown: PropTypes.string,

  /**
   * Callback called when the contents of the editor changes
   */
  onChange: PropTypes.func,

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
    markdownTags: PropTypes.arrayOf(PropTypes.string).isRequired,
    schema: PropTypes.object.isRequired,
  })),
};

export default ContractEditor;
