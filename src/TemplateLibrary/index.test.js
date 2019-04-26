import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import TemplateLibrary from './index';

Enzyme.configure({ adapter: new Adapter() });

describe('<TemplateLibrary />', () => {
  describe('on initialization', () => {
    it('renders page correctly', () => {
      const component = shallow(<TemplateLibrary />);
      const tree = toJson(component);
      expect(tree).toMatchSnapshot();
    });
  });
});
