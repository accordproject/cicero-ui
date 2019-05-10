import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import ContractEditor from './index';

describe('<ContractEditor />', () => {
  describe('on initialization', () => {
    it('renders page correctly', () => {
      const component = shallow(<ContractEditor />);
      const tree = toJson(component);
      expect(tree).toMatchSnapshot();
    });
  });
});
