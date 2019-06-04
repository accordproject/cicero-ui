import React, { useCallback, useState } from 'react';
import {
  Header, Menu, Grid, Rail, Segment
} from 'semantic-ui-react';

import { render } from 'react-dom';
import { Template, Clause } from '@accordproject/cicero-core';
import 'semantic-ui-css/semantic.min.css';
import ClauseEditor from '../../src/ClauseEditor';
import ContractEditor from '../../src/ContractEditor';
import defaultContractValue from './defaultContractValue';
import defaultClauseValue from './defaultClauseValue';

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
  value={defaultClauseValue}
  onChange={onChange}
  onParse={onParse}
  />
    : <ContractEditor
  lockText={false}
  value={defaultContractValue}
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
