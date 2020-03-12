import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

const CurrentTextValue = props => (
  <Fragment>
  <p><b>{props.textLabel}</b>{props.textValue}</p>
  </Fragment>
);


CurrentTextValue.propTypes = {
  textValue: PropTypes.string,
  textLabel: PropTypes.string,
};

export default React.memo(CurrentTextValue);
