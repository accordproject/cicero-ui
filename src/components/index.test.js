import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { headerGenerator, titleGenerator } from './actions';
import ClauseComponent from './ClauseComponent';

const templateTitle = 'ap://acceptance-of-delivery@0.12.1#721d1aa0999a5d278653e211ae2a64b75fdd8ca6fa1f34255533c942404c5c1f';
const clauseId = '721d1aa0999a5d278653e211ae2a64b75fdd8ca6fa1f34255533c942404c5c1f';

const props = {
  clauseProps: {},
  templateUri: templateTitle,
  clauseId,
  children: []
};

describe('<ClauseComponent />', () => {
  describe('on initialization', () => {
    it('renders component correctly', () => {
      const component = shallow(<ClauseComponent {...props} />);
      const tree = toJson(component);
      expect(tree).toMatchSnapshot();
    });
  });
});

describe('headerGenerator', () => {
  it('should truncate a title over 54 characters', () => {
    const inputTitle = ' - CLAUSE TEMPLATE H A B C D E F G H';
    const truncatedTitle = 'ACCEPTANCE OF DELIVERY - CLAUSE TEMPLATE H A B C D E F...';
    expect(headerGenerator(templateTitle, inputTitle)).toEqual(truncatedTitle);
  });

  it('should not truncate a title under 54 characters', () => {
    const inputTitle = ' - CLAUSE TEMPLATE';
    const truncatedTitle = 'ACCEPTANCE OF DELIVERY - CLAUSE TEMPLATE';
    expect(headerGenerator(templateTitle, inputTitle)).toEqual(truncatedTitle);
  });

  it('should handle missing `inputTitle`', () => {
    const truncatedTitle = 'ACCEPTANCE OF DELIVERY';
    expect(headerGenerator(templateTitle)).toEqual(truncatedTitle);
  });
});

describe('titleGenerator',() => {
  it('should generate a title', () => {
    expect(titleGenerator(templateTitle)).toEqual('ACCEPTANCE OF DELIVERY');
  })
})