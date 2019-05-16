import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import TemplateCard from './TemplateCard';
import TemplateLibrary from './index';

const templateArray = [
  {
    description: 'This clause allows the receiver of goods to inspect them for a given time period after delivery.',
    name: 'acceptance-of-delivery',
    uri: 'ap://acceptance-of-delivery@0.11.0#311de48109cce10e6b2e33ef183ccce121886d0b76754d649d5054d1084f93cd',
    version: '0.11.0'
  },
  {
    description: 'a Simple Car Rental Contract in Turkish Language',
    name: 'car-rental-tr',
    uri: 'ap://car-rental-tr@0.8.0#1d6de2328745fe4bae726e0fb887fee6d3fbd00b3d717e30e38dc7bffd7222fa',
    version: '0.8.0'
  },
  {
    description: 'This clause is a copyright license agreement.',
    name: 'copyright-license',
    uri: 'ap://copyright-license@0.12.0#55d73ab5dacc642d8a7cd0bc95c7da5580bd031e00b955616837abd50be08b6b',
    version: '0.12.0'
  },
  {
    description: 'A sample demandforecast clause.',
    name: 'demandforecast',
    uri: 'ap://demandforecast@0.11.0#ac252106feb1f685f5ecceb12b967bb8210ca5283660b5bf72aeb5b397342f87',
    version: '0.11.0'
  },
  {
    description: 'Counts events from DocuSign connect with a given envelope status.',
    name: 'docusign-connect',
    uri: 'ap://docusign-connect@0.5.0#4b44811f4f3e4899c026c35f4180d6c555f9101e8fcca35a13ad09aa2e28b7f7',
    version: '0.5.0'
  },
  {
    description: 'This is a clause enforcing healthy eating habits in employees.',
    name: 'eat-apples',
    uri: 'ap://eat-apples@0.8.0#5d04f0bb8698e1e7565e496aa97beb055b1f3e7fb353d0b0447aeaac59729ed2',
    version: '0.8.0'
  },
];


describe('<TemplateLibrary />', () => {
  describe('on initialization', () => {
    it('renders page correctly', () => {
      const component = shallow(<TemplateLibrary templates={templateArray} />);
      const tree = toJson(component);
      expect(tree).toMatchSnapshot();
    });
  });

  describe('runs functions passed into it', () => {
    it('upload function runs', () => {
      const mockUpload = jest.fn();
      const component = shallow(<TemplateLibrary upload={mockUpload} />);
      expect(component.find('.uploadButton').prop('onClick')).toEqual(mockUpload);
      component.find('.uploadButton').simulate('click');
      expect(mockUpload).toHaveBeenCalled();
    });

    it('import function runs', () => {
      const mockImport = jest.fn();
      const component = shallow(<TemplateLibrary import={mockImport} />);
      expect(component.find('.importButton').prop('onClick')).toEqual(mockImport);
      component.find('.importButton').simulate('click');
      expect(mockImport).toHaveBeenCalled();
    });

    it('add Template function runs', () => {
      const addNewTemplate = jest.fn();
      const component = shallow(<TemplateLibrary addTemp={addNewTemplate} />);
      expect(component.find('.addTemplateButton').prop('onClick')).toEqual(addNewTemplate);
      component.find('.addTemplateButton').simulate('click');
      expect(addNewTemplate).toHaveBeenCalled();
    });

    it('add To Contract function runs', () => {
      const mockAddToCont = jest.fn();
      const component = shallow(
        <TemplateCard
          key={templateArray[0].uri}
          template={templateArray[0]}
          addToCont={mockAddToCont}
        />
      );
      expect(component.find('.templateAction').prop('addToCont')).toEqual(mockAddToCont);
    });
  });
});
