import React, { Component } from 'react';
import { render } from 'react-dom';
import 'semantic-ui-css/semantic.min.css';

import { ContractEditor } from '../../src';

class Demo extends Component {
  render() {
    return (
    <div>
      <ContractEditor />
    </div>
    );
  }
}

render(<Demo/>, document.querySelector('#root'));
