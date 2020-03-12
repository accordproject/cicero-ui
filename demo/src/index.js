import React, {
  useCallback, useEffect, useState
} from 'react';
import {
  Button, Grid, Header, Segment
} from 'semantic-ui-react';

import { Clause, Template } from '@accordproject/cicero-core';
import { SlateTransformer } from '@accordproject/markdown-slate';
import { Value } from 'slate';

import { render } from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import ContractEditor from '../../src/ContractEditor';

const slateTransformer = new SlateTransformer();

const templateUri = 'https://templates.accordproject.org/archives/latedeliveryandpenalty@0.15.0.cta';

const templateUri2 = 'https://templates.accordproject.org/archives/acceptance-of-delivery@0.13.1.cta';

const clauseText = `Late Delivery and Penalty.
----

In case of delayed delivery<if id="forceMajeure" value="%20except%20for%20Force%20Majeure%20cases%2C" whenTrue="%20except%20for%20Force%20Majeure%20cases%2C" whenFalse=""/>
<variable id="seller" value="%22Dan%22"/> (the Seller) shall pay to <variable id="buyer" value="%22Steve%22"/> (the Buyer) for every <variable id="penaltyDuration" value="2%20days"/>
of delay penalty amounting to <variable id="penaltyPercentage" value="10.5"/>% of the total value of the Equipment
whose delivery has been delayed. Any fractional part of a <variable id="fractionalPart" value="days"/> is to be
considered a full <variable id="fractionalPart" value="days"/>. The total amount of penalty shall not however,
exceed <variable id="capPercentage" value="55.0"/>% of the total value of the Equipment involved in late delivery.
If the delay is more than <variable id="termination" value="15%20days"/>, the Buyer is entitled to terminate this Contract.<if id="forceMajeure" value="%20except%20for%20Force%20Majeure%20cases%2C" whenTrue="%20except%20for%20Force%20Majeure%20cases%2C" whenFalse=""/>
-  <variable id="1" value="0.0"/>$ million <= Volume <  <variable id="millionTwo" value="1.0"/>$ million :  <variable id="percent" value="3.1"/>%
-  <variable id="1" value="0.0"/>$ million <= Volume <  <variable id="millionTwo" value="1.0"/>$ million :  <variable id="percent" value="3.1"/>%
-  <variable id="2" value="4.0"/>$ million <= Volume <  <variable id="millionTwo" value="2.0"/>$ million :  <variable id="percent" value="3.2"/>%

last today is friday
-  <variable id="3" value="6.0"/>$ million <= Volume <  <variable id="millionTwo" value="3.0"/>$ million :  <variable id="percent" value="3.3"/>%
-  <variable id="4" value="7.0"/>$ million <= Volume <  <variable id="millionTwo" value="4.0"/>$ million :  <variable id="percent" value="3.4"/>%`;

const clauseText2 = `Acceptance of Delivery.
----

<variable id="shipper" value="%22Party%20A%22"/> will be deemed to have completed its delivery obligations
if in <variable id="receiver" value="%22Party%20B%22"/>'s opinion, the <variable id="deliverable" value="%22Widgets%22"/> satisfies the
Acceptance Criteria, and <variable id="receiver" value="%22Party%20B%22"/> notifies <variable id="shipper" value="%22Party%20A%22"/> in writing
that it is accepting the <variable id="deliverable" value="%22Widgets%22"/>.

Inspection and Notice.
----

<variable id="receiver" value="%22Party%20B%22"/> will have <variable id="businessDays" value="10"/> Business Days to inspect and
evaluate the <variable id="deliverable" value="%22Widgets%22"/> on the delivery date before notifying
<variable id="shipper" value="%22Party%20A%22"/> that it is either accepting or rejecting the
<variable id="deliverable" value="%22Widgets%22"/>.

Acceptance Criteria.
----

The "Acceptance Criteria" are the specifications the <variable id="deliverable" value="%22Widgets%22"/>
must meet for the <variable id="shipper" value="%22Party%20A%22"/> to comply with its requirements and
obligations under this agreement, detailed in <variable id="attachment" value="%22Attachment%20X%22"/>, attached
to this agreement.`;

const getContractSlateVal = async () => {
  const lateDeliveryandPenaltyClause = `\`\`\` <clause src="${templateUri}" clauseid="123">
${clauseText}
\`\`\`
`;

  const acceptanceOfDeliveryClause = `\`\`\` <clause src="${templateUri2}" clauseid="123">
${clauseText2}
\`\`\`
`;

  const defaultContractMarkdown = `# Heading One
  This is text. This is *italic* text. This is **bold** text. This is a [link](https://clause.io). This is \`inline code\`.
  
  ${lateDeliveryandPenaltyClause}

  Paragraph in between
  
  ${acceptanceOfDeliveryClause}
  
  Fin.
  `;
  return Value.fromJSON(slateTransformer.fromMarkdown(defaultContractMarkdown));
};

/**
 * Parses user inputted text for a template using Cicero
 * @param {object} clauseNode The slate node of the clause.
 * @returns {Promise} The result of the parse or an error.
 */
const parseClause = (template, clauseNode) => {
  try {
    const clauseNodeJson = clauseNode.toJSON();
    const ciceroClause = new Clause(template);
    const slateTransformer = new SlateTransformer();
    const value = {
      document: {
        nodes: clauseNodeJson.nodes
      }
    };
    const text = slateTransformer.toMarkdown(value, { wrapVariables: false });
    ciceroClause.parse(text);
    const parseResult = ciceroClause.getData();
    console.log(parseResult);
  } catch (error) {
    console.log(error);
  }
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
  const [templateObj, setTemplateObj] = useState({});

  /**
   * Async rewrite of the markdown text to a slate value
   */
  useEffect(() => {
    getContractSlateVal().then(value => setContractValue(value));
  }, []);

  const fetchTemplateObj = async (uri) => {
    try {
      if (!templateObj[uri]) {
        const template = await Template.fromUrl(uri);
        setTemplateObj({ ...templateObj, [uri]: template });
      }
    } catch (err) {
      console.log(err);
    }
  };


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
    EDITOR_WIDTH: '600px',
  };

  const demo = <ContractEditor
        lockText={lockTextState}
        value={contractValue}
        onChange={onContractChange}
        editorProps={editorProps}
        onClauseUpdated={(clauseNode => parseClause(templateObj[clauseNode.data.get('src')], clauseNode))}
        loadTemplateObject={fetchTemplateObj}
      />;

  return (
    <div>
      <Button aria-label="Toggle lockText" onClick={() => setlockTextState(!lockTextState)} >Toggle lockText</Button>
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
