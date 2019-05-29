import React, { useCallback, useState } from 'react';
import {
  Header, Menu, Grid, Rail, Segment
} from 'semantic-ui-react';

import { render } from 'react-dom';
import { Template, Clause } from '@accordproject/cicero-core';
import 'semantic-ui-css/semantic.min.css';
import ClauseEditor from '../../src/ClauseEditor';
import ContractEditor from '../../src/ContractEditor';

const clauseEditorInitialMarkdown = `<clause src="https://templates.accordproject.org/archives/latedeliveryandpenalty@0.13.1.cta">
Late Delivery and Penalty. In case of delayed delivery except for Force Majeure cases, "Dan" (the Seller) shall pay to "Steve" (the Buyer) for every 2 days of delay penalty amounting to 10.5% of the total value of the Equipment whose delivery has been delayed. Any fractional part of a days is to be considered a full days. The total amount of penalty shall not however, exceed 55% of the total value of the Equipment involved in late delivery. If the delay is more than 15 days, the Buyer is entitled to terminate this Contract.
</clause>`;

const contractEditorInitialMarkdown = `# Supply Agreement
  This is a supply agreement between Party A and Party B.
  
  # Payment
  
  <clause src="https://templates.accordproject.org/archives/full-payment-upon-signature@0.7.1.cta">
  Upon the signing of this Agreement, <variable name="buyer">"Dan"</variable> shall pay the total purchase price to <variable name="seller">"Steve"</variable> in the amount of 0.01 USD.
  </clause>
  
  ## Late Delivery And Penalty
  
  <clause src="https://templates.accordproject.org/archives/latedeliveryandpenalty@0.13.1.cta">
  Late Delivery and Penalty. In case of delayed delivery except for Force Majeure cases, "Dan" (the Seller) shall pay to "Steve" (the Buyer) for every 2 days of delay penalty amounting to 10.5% of the total value of the Equipment whose delivery has been delayed. Any fractional part of a days is to be considered a full days. The total amount of penalty shall not however, exceed 55% of the total value of the Equipment involved in late delivery. If the delay is more than 15 days, the Buyer is entitled to terminate this Contract.
  </clause>
  
  End.
  `;

/**
 * A demo component that uses ContractEditor and
 * TemplateLoadingClauseEditor
 */
function Demo() {
  /**
   * Which demo is currently selected
   */
  const [activeItem, setActiveItem] = useState('clauseEditor');

  /**
   * The list of templates that have been loaded, indexed by URL
   */
  const [templates, setTemplates] = useState({});
  /**
   * Called when the data in either of the editors has been modified
   */
  const onChange = useCallback((value, markdown) => {
    // console.log('new markdown');
  }, []);

  /**
   * Called when the data in the clause editor has been parsed
   */
  const onParse = useCallback((newParseResult) => {
    // console.log('onParse');
  }, []);

  const handleItemClick = useCallback((e, { name }) => {
    setActiveItem(name);
  }, []);

  const demo = activeItem === 'clauseEditor'
    ? <ClauseEditor
  lockText={false}
  markdown={clauseEditorInitialMarkdown}
  onChange={onChange}
  onParse={onParse}
  />
    : <ContractEditor
  lockText={false}
  markdown={contractEditorInitialMarkdown}
  onChange={onChange}
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
