import React from 'react';
import PropTypes from 'prop-types';
import { Dimmer } from 'semantic-ui-react';

const CustomLoader = props => (
  <Dimmer active={props.active} inverted>
    <img src="/assets/images/logos/loading.gif" alt="loading..." />
    <p style={{ color: '#484848' }}>{props.loadingMessage}</p>
  </Dimmer>
);

CustomLoader.propTypes = {
  active: PropTypes.bool.isRequired,
  loadingMessage: PropTypes.string,
};

CustomLoader.defaultProps = {
  active: false,
  loadingMessage: '',
};

export default CustomLoader;
