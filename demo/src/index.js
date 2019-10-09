import React, { useCallback, useEffect, useState } from 'react';
import {
  Button, Grid, Header, Segment
} from 'semantic-ui-react';

// import { PluginManager } from '@accordproject/markdown-editor';
import { SlateTransformer } from '@accordproject/markdown-slate';

import { render } from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import ContractEditor from '../../src/ContractEditor';
import ClausePlugin from '../../src/plugins/ClausePlugin';

const slateTransformer = new SlateTransformer();
const clausePlugin = ClausePlugin(null, null);

const templateUri = 'https://templates.accordproject.org/archives/acceptance-of-delivery@0.12.0.cta';
const clauseText = `Acceptance of Delivery. "Party A" will be deemed to have completed its delivery obligations if in "Party B"'s opinion, the "Widgets" satisfies the Acceptance Criteria, and "Party B" notifies "Party A" in writing that it is accepting the "Widgets".

Inspection and Notice. "Party B" will have 10 Business Days' to inspect and evaluate the "Widgets" on the delivery date before notifying "Party A" that it is either accepting or rejecting the "Widgets".

Acceptance Criteria. The "Acceptance Criteria" are the specifications the "Widgets" must meet for the "Party A" to comply with its requirements and obligations under this agreement, detailed in "Attachment X", attached to this agreement.`;

const getContractMarkdown = async () => {
  const rewriteClauseText = await clausePlugin.rewriteClause(templateUri, clauseText);

  const acceptanceOfDeliveryClause = `\`\`\` <clause src="${templateUri}" clauseid="123">
${rewriteClauseText}
\`\`\`
`;

  const defaultContractMarkdown = `# Heading One
  This is text. This is *italic* text. This is **bold** text. This is a [link](https://clause.io). This is \`inline code\`.
  
  ${acceptanceOfDeliveryClause}
  
  Fin.
  `;
  return slateTransformer.fromMarkdown(defaultContractMarkdown);
};

/**
 * A demo component that uses ContractEditor
 */
function Demo() {
  /**
   * Currently contract value
   */
  const [contractValue, setContractValue] = useState(null);
  const [lockTextState, setlockTextState] = useState(true);

  /**
   * Async rewrite of the markdown text to a slate value
   */
  useEffect(() => {
    getContractMarkdown().then(value => setContractValue(value));
  }, []);

  /**
   * Called when the data in the contract editor has been modified
   */
  const onContractChange = useCallback((value) => {
    // console.log(JSON.stringify(value.toJSON(), null, 4));
    setContractValue(value);
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

  const demo = <ContractEditor
        lockText={lockTextState}
        value={contractValue}
        onChange={onContractChange}
        editorProps={editorProps}
      />;

  return (
    <div>
      <Button onClick={() => setlockTextState(!lockTextState)} >Toggle lockText</Button>
      <Header size='medium'>lockText state: {lockTextState.toString()}</Header>
      <Grid centered columns={2}>
        <Grid.Column>
          <Segment>
          {demo}
          </Segment>
        </Grid.Column>
      </Grid>
    </div>
  );
}

render(<Demo/>, document.querySelector('#root'));
