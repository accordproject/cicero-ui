/* React */
import React from 'react';
import PropTypes from 'prop-types';

/* Styling */
import * as SC from './styles';

/* Constants */
import { NAVIGATION, FILES } from './constants';

/**
 * Represents the navigation between both navigation
 * components, and provides the means to switch between
 * the two components with a state from props
 * @param {*} props
 */
const NavigationComponent = (props) => {
  const navigationProps = {
    navState: props.navState,
    onClick: () => props.setNavState(NAVIGATION),
  };

  const fileProps = {
    navState: props.navState,
    onClick: () => props.setNavState(FILES),
  };

  return (
    <React.Fragment>
        <SC.Navigation {...navigationProps}>
            NAVIGATION
        </SC.Navigation>
        <SC.Files {...fileProps}>
            FILES
        </SC.Files>
    </React.Fragment>
  );
};

NavigationComponent.propTypes = {
  setNavState: PropTypes.func.isRequired,
  navState: PropTypes.string.isRequired
};

export default NavigationComponent;
