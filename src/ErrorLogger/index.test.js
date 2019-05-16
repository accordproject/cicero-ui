import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import ErrorLogger from './index';

describe('<ErrorLogger />', () => {
  describe('on initialization', () => {
    it('renders page correctly', () => {
      const component = shallow(<ErrorLogger errors={[]} />);
      const tree = toJson(component);
      expect(tree).toMatchSnapshot();
    });
  });
});
