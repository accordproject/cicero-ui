/* React */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

/* Styling */
import { NavigationWrapper } from './styles';

/* Constants */
import { NAVIGATION, FILES } from './constants';

/* Components */
import ContractNavigation from './Contract';
import FilesNavigation from './Files';
import ComponentSwitch from './ComponentSwitch';

/** classNames exposed for user-defined styling */
import {CustomStylesWrapper} from './customStyles';

/**
 * Represents the overall navigation wrapper, consisting of
 * two separate components, navigating between headers of the
 * contract or files of a single clause
 * @param {*} props
 */
const NavigationComponent = (props) => {

  const [navState, setNavState] = useState(NAVIGATION);
  const navigationState = () => navState === NAVIGATION;
  const filesState = () => navState === FILES;

  const navigationWrapperProps = {
    id: 'NavigationWrapperComponent'
  };

  const switchProps = {
    navState,
    setNavState,
  };

  const navigationGenerator = (props) => {
    if (navigationState()) {
      return <ContractNavigation
        id="ContractNavigationComponent" {...props} />;
    }
    if (filesState()) {
      return <FilesNavigation
        id="FilesNavigationComponent" {...props} />;
    }
    return 'Select Navigation or Files';
  };

  return (
    <CustomStylesWrapper>
    <NavigationWrapper {...navigationWrapperProps} >
        <ComponentSwitch {...switchProps} />
        {navigationGenerator(props)}
    </NavigationWrapper>
    </CustomStylesWrapper>
  );
};

NavigationComponent.propTypes = {
  headers: PropTypes.array,
  navigateHeader: PropTypes.func,
};

export default NavigationComponent;
