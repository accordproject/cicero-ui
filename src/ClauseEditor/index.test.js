import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import ClauseEditor from './index';

const props = {
  value: null,
  onParse: () => 1,
  onChange: () => 1,
  lockText: true,
  template: {},
};

describe('<ClauseEditor />', () => {
  describe('on initialization', () => {
    it('renders page correctly', () => {
      const component = shallow(<ClauseEditor {...props} />);
      const tree = toJson(component);
      expect(tree).toMatchSnapshot();
    });
  });
});
