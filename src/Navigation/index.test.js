import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import NavigationComponent from './index';
import ComponentSwitch from './ComponentSwitch';
import { truncateHeader } from './actions';

describe('<NavigationComponent />', () => {
  const propsFilesTrue = {
    navigationProps: {
      NAVIGATE_SWITCH_FILES_VISIBLE: true
    },
    navigateHeader: jest.fn(),
    headers: []
  };

  const propsFilesFalse = {
    navigationProps: {
      NAVIGATE_SWITCH_FILES_VISIBLE: false
    },
    navigateHeader: jest.fn(),
    headers: []
  };

  describe('on initialization', () => {
    it('renders component correctly showing Files', () => {
      const component = shallow(<NavigationComponent {...propsFilesTrue} />);
      const tree = toJson(component);
      expect(tree).toMatchSnapshot();
    });

    it('renders component correctly hiding Files', () => {
      const component = shallow(<NavigationComponent {...propsFilesFalse} />);
      const tree = toJson(component);
      expect(tree).toMatchSnapshot();
    });

    it('renders without files initially', () => {
      const component = shallow(<NavigationComponent {...propsFilesFalse} />);
      expect(component.find('#NavigationWrapperComponent').exists()).toBeTruthy();
      expect(component.find('#ContractNavigationComponent').exists()).toBeTruthy();
      expect(component.find('#FilesNavigationComponent').exists()).toBe(false);
    });
  });
});

describe('<ComponentSwitch />', () => {
  const propsFilesTrue = {
    filesVisible: true,
    navState: 'FILES',
    setNavState: jest.fn(),
  };

  const propsFilesFalse = {
    filesVisible: false,
    navState: 'NAVIGATION',
    setNavState: jest.fn(),
  };

  describe('on initialization', () => {
    it('renders component correctly showing Files', () => {
      const component = shallow(<ComponentSwitch {...propsFilesTrue} />);
      const tree = toJson(component);
      expect(tree).toMatchSnapshot();
    });

    it('renders component correctly showing Navigation', () => {
      const component = shallow(<ComponentSwitch {...propsFilesFalse} />);
      const tree = toJson(component);
      expect(tree).toMatchSnapshot();
    });
  });
});

describe('truncateHeader', () => {
  it('should truncate a clause heading to 20 characters', () => {
    const clauseHeader = {
      type: 'clause',
      text: 'Acceptance of Delivery',
    };
    const resultClauseHeader = 'Acceptance of Delive...';
    expect(truncateHeader(clauseHeader)).toEqual(resultClauseHeader);
  });

  it('should truncate a heading one to 22 characters', () => {
    const headingOne = {
      type: 'heading_one',
      text: 'Welcome to Template Studio! Edit this text to get started.',
    };
    const resultHeadingOne = 'Welcome to Template St...';
    expect(truncateHeader(headingOne)).toEqual(resultHeadingOne);
  });

  it('should truncate a heading two to 18 characters', () => {
    const headingTwo = {
      type: 'heading_two',
      text: 'Welcome to Template Studio! Edit this text to get started.',
    };
    const resultHeadingTwo = 'Welcome to Templat...';
    expect(truncateHeader(headingTwo)).toEqual(resultHeadingTwo);
  });

  it('should truncate a heading three to 14 characters', () => {
    const headingThree = {
      type: 'heading_three',
      text: 'Welcome to Template Studio! Edit this text to get started.',
    };
    const resultHeadingThree = 'Welcome to Tem...';
    expect(truncateHeader(headingThree)).toEqual(resultHeadingThree);
  });
});
