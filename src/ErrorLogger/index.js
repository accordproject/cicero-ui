import React, { useState } from 'react';
import PropTypes from 'prop-types';

import * as A from './actions';
import * as S from './styles';

const ErrorLogger = (props) => {
  const { errors, errorNav } = props;
  const errorsProps = props.errorsProps || Object.create(null);

  const [errorsVisible, setErrorsVisible] = useState(false);
  const [specErrorVisible, setspecErrorVisible] = useState(false);

  const handleClickErrorsBar = () => {
    if (A.gtZero(errors.length)) { setErrorsVisible(!errorsVisible); }
  };

  const handleClickSpecError = () => {
    setspecErrorVisible(!specErrorVisible);
  };

  const headerProps = {
    backgroundColor: errorsVisible,
    errors: A.errorsExist(errors),
    onClick: handleClickErrorsBar
  };

  const errorComponentGenerator = errors => errors
    .map(soloError => <S.ErrorComponent
        key={A.keySwitchCase(soloError)}>

      <S.ArrowDiv expanded={specErrorVisible} onClick={handleClickSpecError}/>
      <S.ErrorFile
        onClick={() => errorNav(soloError)}>
        {A.typeSwitchCase(soloError)}
      </S.ErrorFile>

      <S.ErrorType onClick={handleClickSpecError}>
        {A.overalltypeSwitchCase(soloError).name}:
      </S.ErrorType>

      <S.ErrorShortMessage onClick={handleClickSpecError}>
        {A.truncateMessage(A.overalltypeSwitchCase(soloError).shortMessage)}
      </S.ErrorShortMessage>

      {specErrorVisible
        && <S.ErrorFullMessage>
            {A.overalltypeSwitchCase(soloError).message}
           </S.ErrorFullMessage>}

    </S.ErrorComponent>);

  return (
    <div>
      {errorsVisible
        && <S.ErrorDisplay id="ErrorComponentDisplay">
             {errorComponentGenerator(errors)}
           </S.ErrorDisplay>}

      <S.ErrorsHeader id="ErrorComponentHeader" {...headerProps} >
        {A.gtZero(errors.length)
          && <S.ErrorSymbol name="exclamation triangle" size="small" />}
        {A.errorArrayLength(errors)} Errors
        <S.ErrorBarArrow errorDisplay={errorsVisible} />
      </S.ErrorsHeader>
    </div>
  );
};

ErrorLogger.propTypes = {
  errors: PropTypes.array.isRequired,
  errorNav: PropTypes.func,
  errorsProps: PropTypes.shape({
    ERRORS_HEADER_BACKGROUND: PropTypes.string,
    ERRORS_HEADER_EXPAND_ARROW: PropTypes.string,
    ERROR_EXPAND_ARROW: PropTypes.string,
    ERROR_FULL_MESSAGE: PropTypes.string,
    ERROR_SHORT_MESSAGE: PropTypes.string,
    ERROR_FILE: PropTypes.string,
    ERROR_FILE_HOVER: PropTypes.string,
    ERROR_TYPE: PropTypes.string,
  }),
};

export default ErrorLogger;
