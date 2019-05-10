import React, { Component } from 'react';
import { render } from 'react-dom';
import 'semantic-ui-css/semantic.min.css';

import { ClauseEditor, ContractEditor } from '../../src';

const plugins = [];
const onChange = ((editor) => {
  // console.log('on change!');
});

const onParse = ((parseResult) => {
  console.log(parseResult);
});

// <ContractEditor/>


const markdown = 'Late Delivery and Penalty. In case of delayed delivery except for Force Majeure cases, "Dan" (the Seller) shall pay to "Steve" (the Buyer) for every 2 days of delay penalty amounting to 10.5% of the total value of the Equipment whose delivery has been delayed. Any fractional part of a days is to be considered a full days. The total amount of penalty shall not however, exceed 55% of the total value of the Equipment involved in late delivery. If the delay is more than 15 days, the Buyer is entitled to terminate this Contract.';

class Demo extends Component {
  render() {
    return (
    <div>
      <ClauseEditor
        lockText={false}
        templateUrl={'https://templates.accordproject.org/archives/latedeliveryandpenalty@0.13.1.cta'}
        onChange={onChange}
        onParse={onParse}
        plugins={plugins}
        markdown={markdown}
        />
    </div>
    );
  }
}

render(<Demo/>, document.querySelector('#root'));
