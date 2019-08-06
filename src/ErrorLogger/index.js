import React, { useState } from 'react';
import PropTypes from 'prop-types';

import * as actions from './actions';
import * as styles from './styles';

const ErrorLogger = (props) => {
  const { errors, errorNav } = props;

  const [errorsVisible, setErrorsVisible] = useState(false);
  const [specErrorVisible, setspecErrorVisible] = useState(false);

  const handleClickErrorsBar = () => {
    if (actions.gtZero(errors.length)) { setErrorsVisible(!errorsVisible); }
  };

  const handleClickSpecError = () => {
    setspecErrorVisible(!specErrorVisible);
  };

  const headerProps = {
    backgroundColor: errorsVisible,
    errors: actions.errorsExist(errors),
    onClick: handleClickErrorsBar
  };

  const errorComponentGenerator = errors => errors
    .map(soloError => <styles.ErrorComponent
        key={actions.keySwitchCase(soloError)}>

      <styles.ArrowDiv expanded={specErrorVisible} onClick={handleClickSpecError}/>
      <styles.ErrorFile
        onClick={() => errorNav(soloError)}>
        {actions.typeSwitchCase(soloError)}
      </styles.ErrorFile>

      <styles.ErrorType onClick={handleClickSpecError}>
        {actions.overalltypeSwitchCase(soloError).name}:
      </styles.ErrorType>

      <styles.ErrorShortMessage onClick={handleClickSpecError}>
        {actions.truncateMessage(actions.overalltypeSwitchCase(soloError).shortMessage)}
      </styles.ErrorShortMessage>

      {specErrorVisible
        && <styles.ErrorFullMessage>
            {actions.overalltypeSwitchCase(soloError).message}
           </styles.ErrorFullMessage>}

    </styles.ErrorComponent>);

  return (
    <div>
      {errorsVisible
        && <styles.ErrorDisplay id="ErrorComponentDisplay">
             {errorComponentGenerator(errors)}
           </styles.ErrorDisplay>}

      <styles.ErrorsHeader id="ErrorComponentHeader" {...headerProps} >
        {actions.gtZero(errors.length)
          && <styles.ErrorSymbol name="exclamation triangle" size="small" />}
        {actions.errorArrayLength(errors)} Errors
        <styles.ErrorBarArrow errorDisplay={errorsVisible} />
      </styles.ErrorsHeader>
    </div>
  );
};

ErrorLogger.propTypes = {
  errors: PropTypes.array.isRequired,
  errorNav: PropTypes.func,
};

export default ErrorLogger;
