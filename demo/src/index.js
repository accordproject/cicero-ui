import React, { useCallback, useState } from 'react';
import {
  Header, Menu, Grid, Rail, Segment
} from 'semantic-ui-react';

import { render } from 'react-dom';
import { Template, Clause } from '@accordproject/cicero-core';
import 'semantic-ui-css/semantic.min.css';
import List from '@accordproject/markdown-editor/dist/plugins/list';
import TemplateLoadingClauseEditor from '../../src/TemplateLoadingClauseEditor';
import ContractEditor from '../../src/ContractEditor';

import ClausePlugin from '../../src/ContractEditor/plugins/clausePlugin';
import VariablePlugin from '../../src/ContractEditor/plugins/VariablePlugin';

const clauseEditorTemplateUrl = 'https://templates.accordproject.org/archives/latedeliveryandpenalty@0.13.1.cta';
const clauseEditorInitialMarkdown = 'Late Delivery and Penalty. In case of delayed delivery except for Force Majeure cases, "Dan" (the Seller) shall pay to "Steve" (the Buyer) for every 2 days of delay penalty amounting to 10.5% of the total value of the Equipment whose delivery has been delayed. Any fractional part of a days is to be considered a full days. The total amount of penalty shall not however, exceed 55% of the total value of the Equipment involved in late delivery. If the delay is more than 15 days, the Buyer is entitled to terminate this Contract.';

const contractEditorInitialMarkdown = `# Supply Agreement
  This is a supply agreement between Party A and Party B.
  
  # Payment
  
  <clause src="https://templates.accordproject.org/archives/full-payment-upon-signature@0.7.1.cta">
  Upon the signing of this Agreement, {{variable name="buyer"}}"Dan"{{/variable}} shall pay the total purchase price to {{variable name="seller"}}"Steve"{{/variable}} in the amount of 0.01 USD.
  </clause>
  
  ## Late Delivery And Penalty
  
  <clause src="https://templates.accordproject.org/archives/latedeliveryandpenalty@0.13.1.cta">
  Late Delivery and Penalty. In case of delayed delivery except for Force Majeure cases, "Dan" (the Seller) shall pay to "Steve" (the Buyer) for every 2 days of delay penalty amounting to 10.5% of the total value of the Equipment whose delivery has been delayed. Any fractional part of a days is to be considered a full days. The total amount of penalty shall not however, exceed 55% of the total value of the Equipment involved in late delivery. If the delay is more than 15 days, the Buyer is entitled to terminate this Contract.
  </clause>
  
  End.
  `;

/**
 * A demo component that uses TemplateLoadingClauseEditor
 * @param {*} props
 */
// eslint-disable-next-line require-jsdoc, no-unused-vars
function Demo(props) {
  const [activeItem, setActiveItem] = useState('clauseEditor');

  const [templates, setTemplates] = useState({});
  /**
   * Called when the data in the editor has been modified
   */
  const onChange = useCallback((value, markdown) => {
    // console.log('new markdown');
  }, []);

  /**
   * Called when the data in the editor has been parsed
   */
  const onParse = useCallback((newParseResult) => {
    // console.log('onParse');
  }, []);

  /**
   * Called when we need to load a template
   */
  const loadTemplateObject = useCallback(async (templateUri) => {
    let template = templates[templateUri];
    if (!template) {
      console.log(`loadTemplateObject: ${templateUri}`);
      template = await Template.fromUrl(templateUri);
      templates[templateUri] = template;
      setTemplates(templates);
    }
  }, [templates]);

  /**
   * Called when we need to parse a clause
   */
  const parseClause = useCallback((templateUri, text, clauseId) => {
    try {
      const template = templates[templateUri];
      if (template) {
        console.log(`parseClause: ${templateUri} with ${text}`);
        const clause = new Clause(template);
        clause.parse(text);
        return Promise.resolve(clause.getData());
      }
      return Promise.resolve('Template not loaded.');
    } catch (err) {
      return Promise.resolve(err);
    }
  }, [templates]);

  const handleItemClick = useCallback((e, { name }) => {
    setActiveItem(name);
  }, []);

  const demo = activeItem === 'clauseEditor'
    ? <TemplateLoadingClauseEditor
  lockText={false}
  markdown={clauseEditorInitialMarkdown}
  templateUrl={clauseEditorTemplateUrl}
  onChange={onChange}
  onParse={onParse}
  />
    : <ContractEditor
  lockText={false}
  markdown={contractEditorInitialMarkdown}
  onChange={onChange}
  parseClause={parseClause}
  loadTemplateObject={loadTemplateObject}
  />;

  return (
    <div>
      <Grid centered columns={2}>
    <Grid.Column>
      <Segment>
      {demo}
        <Rail position='left'>
          <Segment>
          <Menu vertical>
        <Menu.Item
          name='clauseEditor'
          active={activeItem === 'clauseEditor'}
          onClick={handleItemClick}
        >
          <Header as='h4'>Clause Editor</Header>
          <p>Edit a single clause.</p>
        </Menu.Item>

        <Menu.Item name='contractEditor' active={activeItem === 'contractEditor'} onClick={handleItemClick}>
        <Header as='h4'>Contract Editor</Header>
          <p>Adds multiple clauses to a rich-text contract.</p>
        </Menu.Item>

      </Menu>
          </Segment>
        </Rail>

      </Segment>
    </Grid.Column>
  </Grid>

    </div>
  );
}

render(<Demo/>, document.querySelector('#root'));
