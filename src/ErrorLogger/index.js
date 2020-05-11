/* React */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

/* Styling */
import * as ACT from './actions';

/* Actions */
import * as SC from './styles';

/* Component */
import ErrorComponent from './Error';

const ErrorLogger = (props) => {
  const { errors, errorNav } = props;
  const errorLength = Object.keys(errors).length ? Object.keys(errors).length : 0;

  const [errorsVisible, setErrorsVisible] = useState(false);

  const handleClickErrorsBar = () => {
    if (ACT.gtZero(errorLength)) { setErrorsVisible(!errorsVisible); }
  };

  const headerProps = {
    id: 'ErrorComponentHeader',
    errors: ACT.errorsExist(errors),
    onClick: handleClickErrorsBar,
  };

  const displayProps = {
    id: 'ErrorComponentDisplay',
    errorDisplay: errorsVisible,
  };

  const barArrowProps = {
    errorDisplay: errorsVisible,
  };

  const symbolProps = {
    name: 'exclamation triangle',
    size: 'small'
  };

  const errorComponentGenerator = errors => Object.values(errors)
    .map(errorValue => <ErrorComponent
      error={errorValue}
      errorNav={errorNav}
      key={ACT.keySwitchCase(errorValue)} />);

  return (
    <div className='ciceroUI'>
      {errorsVisible
        && <SC.ErrorDisplay {...displayProps} className='errorLoggerDisplay'>
            {errorComponentGenerator(errors)}
        </SC.ErrorDisplay>
    }
      <SC.ErrorsHeader {...headerProps} className='errorLoggerHeader'>
        {ACT.gtZero(errorLength)
          && <SC.ErrorSymbol {...symbolProps} />}
        {ACT.errorArrayLength(errors)} {ACT.isMultipleErrors(errors)}
        <SC.ErrorBarArrow {...barArrowProps} className='errorLoggerBarArrow'/>
      </SC.ErrorsHeader>
    </div>
  );
};

ErrorLogger.propTypes = {
  errors: PropTypes.object.isRequired,
  errorNav: PropTypes.func,
};

export default ErrorLogger;
