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
  const navigationSwitchProps = {
    navState: props.navState,
  };

  const navigationProps = {
    id: 'ContractNavigationSwitchComponent',
    ...navigationSwitchProps,
    onClick: () => props.setNavState(NAVIGATION),
  };

  const fileProps = {
    id: 'ContractFilesSwitchComponent',
    ...navigationSwitchProps,
    onClick: () => props.setNavState(FILES),
  };

  return (
    <React.Fragment>
        <SC.Navigation {...navigationProps} className={props.navState === 'NAVIGATION'?'navigationTitleActive':'navigationTitleInactive'}>
            NAVIGATION
        </SC.Navigation>
        <SC.Files {...fileProps} className={props.navState === 'FILES'?'navigationTitleActive':'navigationTitleInactive'}>
            FILES
        </SC.Files>
    </React.Fragment>
  );
};

NavigationComponent.propTypes = {
  setNavState: PropTypes.func.isRequired,
  navState: PropTypes.string.isRequired,
};

export default NavigationComponent;
