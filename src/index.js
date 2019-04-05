import React, { PureComponent } from 'react';
import TemplateLibrary from './TemplateLibrary';
import 'semantic-ui-css/semantic.min.css';

const templateOne = {
  name: 'Acceptance of Delivery',
  uri: 'wxuhvq://acceptance-of-delivery@0.9.0#3b26c985be71ecc1e69698d7f71f7033226468baa6300878824ea34430e98fe4',
  version: '0.9.0',
  description: 'This clause allows the receiver of goods to inspect them for a given time period after delivery.',
  icon: 'https://www.accordproject.org/static/images/footer/logo@2x.png',
};

const templateTwo = {
  name: 'Docusign Connect',
  uri: 'ap://docusign-connect@0.2.0#61edb28a8f4b1c6a96b845712b9c0a2d16be0c4fe6bb4eefea055d1e82dc3f60',
  version: '0.2.0',
  description: 'Counts events from DocuSign connect with a given envelope status.',
  icon: 'https://www.accordproject.org/static/images/footer/logo@2x.png',
};

const templateThree = {
  name: 'Fragile Goods',
  uri: 'ap://fragile-goods@0.9.1#57cd64ae227cc2fc27abb4308eb38f9224945aa1c90c2dc3aa217215639af877',
  version: '0.9.1',
  description: 'This clause specifies penalties for shocks caused to a fragile package in transport.',
  icon: 'https://www.accordproject.org/static/images/footer/logo@2x.png',
};

const templateFour = {
  name: 'Full Payment Upon Demand',
  uri: 'ap://full-payment-upon-demand@0.3.0#518ccbfcd4970ec7ca75fd5df97e60b3e2fb2401a6e29feb06f494919365c277',
  version: '0.3.0',
  description: 'This is a one-time full payment clause applicable on demand.',
  icon: 'https://www.accordproject.org/static/images/footer/logo@2x.png',
};

const templateFive = {
  name: 'IP Payment',
  uri: 'ap://ip-payment@0.8.1#17673fccee1f8e6a79d399e16aaf8228e70f3cb4c2ec6ab334133162114be4bb',
  version: '0.8.1',
  description: 'This clause is a payment clause for IP agreement, such as trademark or copyright licenses aggreements. uch as trademark or copyright licenses aggreements.',
  icon: 'https://www.accordproject.org/static/images/footer/logo@2x.png',
};

const templateArray = [templateOne, templateTwo, templateThree, templateFour, templateFive];

const mockUpload = () => { console.log('upload'); };

const mockImport = () => { console.log('import'); };

const mockAddTemp = () => { console.log('addTemp'); };

const mockAddToCont = (input) => { console.log('addToCont: ', input); };

export default class MockData extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      upload: mockUpload,
      import: mockImport,
      addTemp: mockAddTemp,
      templates: templateArray,
      addToCont: mockAddToCont,
    };
  }
  render() {
    return (
      <TemplateLibrary
        templates={this.state.templates}
        upload={this.state.upload}
        import={this.state.import}
        addTemp={this.state.addTemp}
        addToCont={this.state.addToCont} 
      />
    )
  }
}
