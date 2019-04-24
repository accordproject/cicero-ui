import React, { Component } from 'react';
import { render } from 'react-dom';
import 'semantic-ui-css/semantic.min.css';

import Example from '../../src';

class Demo extends Component {
  render() {
    return <div>
      <Example/>
    </div>;
  }
}

render(<Demo/>, document.querySelector('#demo'));
