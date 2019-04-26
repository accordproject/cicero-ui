import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import TemplateLibrary from './index';

describe('<TemplateLibrary />', () => {
  describe('on initialization', () => {
    it('renders page correctly', () => {
      const component = shallow(<TemplateLibrary />);
      const tree = toJson(component);
      expect(tree).toMatchSnapshot();
    });
  });
});
