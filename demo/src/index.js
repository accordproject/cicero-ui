import React, {
  useCallback, useEffect, useState
} from 'react';
import {
  Button, Grid, Header, Segment
} from 'semantic-ui-react';

import { Clause, Template } from '@accordproject/cicero-core';
import { SlateTransformer } from '@accordproject/markdown-slate';

import { render } from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import ContractEditor from '../../src/ContractEditor';

const slateTransformer = new SlateTransformer();

const templateUri = 'https://templates.accordproject.org/archives/acceptance-of-delivery@0.12.0.cta';
const clauseText = `Acceptance of Delivery. <variable id="shipper" value="%22Party%20A%22"/> will be deemed to have completed its delivery obligations if in <variable id="receiver" value="%22Party%20B%22"/>'s opinion, the <variable id="deliverable" value="%22Widgets%22"/> satisfies the Acceptance Criteria, and <variable id="receiver" value="%22Party%20B%22"/> notifies <variable id="shipper" value="%22Party%20A%22"/> in writing that it is accepting the <variable id="deliverable" value="%22Widgets%22"/>.

Inspection and Notice. <variable id="receiver" value="%22Party%20B%22"/> will have <variable id="businessDays" value="10"/> Business Days' to inspect and evaluate the <variable id="deliverable" value="%22Widgets%22"/> on the delivery date before notifying <variable id="shipper" value="%22Party%20A%22"/> that it is either accepting or rejecting the <variable id="deliverable" value="%22Widgets%22"/>.

Acceptance Criteria. The "Acceptance Criteria" are the specifications the <variable id="deliverable" value="%22Widgets%22"/> must meet for the <variable id="shipper" value="%22Party%20A%22"/> to comply with its requirements and obligations under this agreement, detailed in <variable id="attachment" value="%22Attachment%20X%22"/>, attached to this agreement.`;

const getContractSlateVal = async () => {
  const acceptanceOfDeliveryClause = `\`\`\` <clause src="${templateUri}" clauseid="123">
${clauseText}
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
 * Parses user inputted text for a template using Cicero
 * @param {object} template The cicero template object.
 * @param {string} text The user submitted text.
 * @param {string} clauseId The uuid of the clause
 * @returns {Promise} The result of the parse or an error.
 */
const parseClause = (template, text, clauseId) => {
  try {
    const ciceroClause = new Clause(template);
    ciceroClause.parse(text);
    const parseResult = ciceroClause.getData();
    // Example code you could use to add this parse result to a redux store:
    // store.dispatch(parseClauseSuccess(clauseId, parseResult));
    return Promise.resolve(parseResult);
  } catch (error) {
    // Example code you could use to add this parse result to a redux store:
    // store.dispatch(parseClauseError(clauseId, error));
    return Promise.reject(error);
  }
};

const fetchTemplateObj = async (uri) => {
  try {
    const templateObj = await Template.fromUrl(uri);
    return templateObj;
  } catch (err) { return err; }
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
  const [templateObj, setTemplateObj] = useState(null);

  /**
   * Async rewrite of the markdown text to a slate value
   */
  useEffect(() => {
    getContractSlateVal().then(value => setContractValue(value));
  }, []);

  /**
   * Async applying the given template object onto state for use parsing
   */
  useEffect(() => {
    fetchTemplateObj(templateUri).then(value => setTemplateObj(value));
  }, []);

  /**
   * Called when the data in the contract editor has been modified
   */
  const onContractChange = useCallback((value) => {
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
        parseClause={(uri, text, clauseId) => parseClause(templateObj, text, clauseId)}
        loadTemplateObject={fetchTemplateObj}
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
