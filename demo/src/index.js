import React, { useCallback, useState } from 'react';
import {
  Header, Menu, Grid, Rail, Segment
} from 'semantic-ui-react';

import { PluginManager, List, FromMarkdown } from '@accordproject/markdown-editor';

import { render } from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import ClauseEditor from '../../src/ClauseEditor';
import ContractEditor from '../../src/ContractEditor';
import ClausePlugin from '../../src/plugins/ClausePlugin';
import VariablePlugin from '../../src/plugins/VariablePlugin';

const plugins = [List(), VariablePlugin(), ClausePlugin(null, null)];
const pluginManager = new PluginManager(plugins);
const fromMarkdown = new FromMarkdown(pluginManager);

const acceptanceOfDelivery = `\`\`\` <clause src="https://templates.accordproject.org/archives/acceptance-of-delivery@0.12.0.cta" id="123">
**Acceptance** of Delivery. <variable id="seller" value="Party A"/> will be deemed to have completed its delivery obligations if in <variable id="buyer" value="Party B"/>'s opinion, the "Widgets" satisfies the Acceptance Criteria, and "Party B" notifies "Party A" in writing that it is accepting the "Widgets".

Inspection and Notice. "Party B" will have 10 Business Days' to inspect and evaluate the "Widgets" on the delivery date before notifying "Party A" that it is either accepting or rejecting the "Widgets".

Acceptance Criteria. The "Acceptance Criteria" are the specifications the "Widgets" must meet for the "Party A" to comply with its requirements and obligations under this agreement, detailed in "Attachment X", attached to this agreement.
\`\`\`
`;

const defaultContractMarkdown = `# Heading Two
This is text. This is *italic* text. This is **bold** text. This is a [link](https://clause.io). This is \`inline code\`.

Variable <variable id="firstName" value="Dan"/> in a paragraph.

<variable id="lastName" value="Selman"/>

^^^ standalone variable

${acceptanceOfDelivery}

Fin.
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
   * Currently clause value
   */
  const [clauseValue, setClauseValue] = useState(fromMarkdown.convert(acceptanceOfDelivery));

  /**
   * Currently contract value
   */
  const [contractValue, setContractValue] = useState(fromMarkdown.convert(defaultContractMarkdown));

  /**
   * Called when the data in the clause editor has been modified
   */
  const onClauseChange = useCallback((value, markdown) => {
    // console.log('new markdown', markdown);
    setClauseValue(value);
  }, []);

  /**
   * Called when the data in the contract editor has been modified
   */
  const onContractChange = useCallback((value, markdown) => {
    // console.log(JSON.stringify(value.toJSON(), null, 4));
    setContractValue(value);
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

  const editorProps = {
    BUTTON_BACKGROUND_INACTIVE: null,
    BUTTON_BACKGROUND_ACTIVE: null,
    BUTTON_SYMBOL_INACTIVE: null,
    BUTTON_SYMBOL_ACTIVE: null,
    DROPDOWN_COLOR: null,
    TOOLBAR_BACKGROUND: null,
    TOOLTIP_BACKGROUND: null,
    TOOLTIP: null,
    TOOLBAR_SHADOW: null,
    WIDTH: '600px',
  };

  const demo = activeItem === 'clauseEditor'
    ? <ClauseEditor
        lockText={true}
        value={clauseValue}
        onChange={onClauseChange}
        onParse={onParse}
        editorProps={editorProps}
      />
    : <ContractEditor
        lockText={true}
        value={contractValue}
        onChange={onContractChange}
        editorProps={editorProps}
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
