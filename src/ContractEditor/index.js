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
import ClausePlugin from './plugins/clausePlugin';

/**
 * A rich text contract editor
 */
function storeLocal(editor) {
  localStorage.setItem('markdown-editor', editor.getMarkdown());
}

const defaultMarkdown = `# Supply Agreement
  This is a supply agreement between Party A and Party B.
  
  # Payment
  
  <clause src="https://templates.accordproject.org/archives/full-payment-upon-signature@0.7.1.cta">
  Upon the signing of this Agreement, "Dan" shall pay the total purchase price to "Steve" in the amount of 0.01 USD.
  </clause>
  
  ## Late Delivery And Penalty
  
  <clause src="https://templates.accordproject.org/archives/latedeliveryandpenalty@0.13.1.cta">
  Late Delivery and Penalty. In case of delayed delivery except for Force Majeure cases, "Dan" (the Seller) shall pay to "Steve" (the Buyer) for every 2 days of delay penalty amounting to 10.5% of the total value of the Equipment whose delivery has been delayed. Any fractional part of a days is to be considered a full days. The total amount of penalty shall not however, exceed 55% of the total value of the Equipment involved in late delivery. If the delay is more than 15 days, the Buyer is entitled to terminate this Contract.
  </clause>
  
  End.
  `;

const contractProps = {
  plugins: [List(), ClausePlugin()],
  markdown: defaultMarkdown,
  onChange: storeLocal,
};

/**
 * A rich text contract editor
 */
const ContractEditor = props => (
  <MarkdownEditor
    markdown={props.markdown || contractProps.markdown}
    onChange={props.onChange || contractProps.onChange}
    plugins={props.plugins.concat([List(), ClausePlugin(props.templates)])}
    templates={props.templates}
    lockText={true}
  />
);

/**
 * The property types for this component
 */
ContractEditor.propTypes = {
  markdown: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  lockText: PropTypes.bool.isRequired,
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
  templates: PropTypes.arrayOf(PropTypes.object),
};

export default ContractEditor;
