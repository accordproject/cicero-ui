import React, { Component } from 'react';
import { render } from 'react-dom';
import 'semantic-ui-css/semantic.min.css';

import { ClauseEditor, ContractEditor } from '../../src';

const plugins = [];
const onChange = ((value, markdown) => {
  console.log(markdown);
});

const onParse = ((parseResult) => {
  console.log(parseResult);
});

const clauseData = {
  $class: 'org.accordproject.latedeliveryandpenalty.LateDeliveryAndPenaltyContract',
  contractId: 'd1c0f4a7-cf8b-4a19-8624-2f023add3e55',
  buyer: {
    $class: 'org.accordproject.cicero.contract.AccordParty',
    partyId: 'Jerome'
  },
  seller: {
    $class: 'org.accordproject.cicero.contract.AccordParty',
    partyId: 'Dan'
  },
  forceMajeure: true,
  penaltyDuration: {
    $class: 'org.accordproject.time.Duration',
    amount: 2,
    unit: 'days'
  },
  penaltyPercentage: 10.5,
  capPercentage: 55,
  termination: {
    $class: 'org.accordproject.time.Duration',
    amount: 15,
    unit: 'days'
  },
  fractionalPart: 'days'
};

// <ContractEditor/>

class Demo extends Component {
  render() {
    return (
    <div>
      <ClauseEditor
        lockText={false}
        markdown={'Template loading...'}
        clauseData={clauseData}
        templateUrl={'https://templates.accordproject.org/archives/latedeliveryandpenalty@0.13.1.cta'}
        onChange={onChange}
        onParse={onParse}
        plugins={plugins}
        />
    </div>
    );
  }
}

render(<Demo/>, document.querySelector('#root'));
