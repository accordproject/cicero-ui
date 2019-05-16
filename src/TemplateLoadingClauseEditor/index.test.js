import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import TemplateLoadingClauseEditor from './index';

const props = {
  markdown: '',
  onParse: () => 1,
  onChange: () => 1,
  lockText: true,
  template: {},
};

describe('<TemplateLoadingClauseEditor />', () => {
  describe('on initialization', () => {
    it('renders page correctly', () => {
      const component = shallow(<TemplateLoadingClauseEditor {...props} />);
      const tree = toJson(component);
      expect(tree).toMatchSnapshot();
    });
  });
});
