/* React */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

/* Styling */
import * as A from './actions';

/* Actions */
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
    id: 'ErrorComponentHeader',
    backgroundColor: errorsVisible,
    errors: A.errorsExist(errors),
    onClick: handleClickErrorsBar,
    headerBackground: errorsProps.ERRORS_HEADER_BACKGROUND,
  };

  const displayProps = {
    id: 'ErrorComponentDisplay',
    errorDisplay: errorsVisible,
    headerBarArrow: errorsProps.ERRORS_HEADER_EXPAND_ARROW,
  };

  const fileProps = {
    errorFile: errorsProps.ERROR_FILE,
    errorFileHover: errorsProps.ERROR_FILE_HOVER,
  };

  const typeProps = {
    onClick: handleClickSpecError,
    errorType: errorsProps.ERROR_TYPE,
  };

  const shortMessageProps = {
    onClick: handleClickSpecError,
    shortMessage: errorsProps.ERROR_SHORT_MESSAGE,
  };

  const fullMessageProps = {
    fullMessage: errorsProps.ERROR_FULL_MESSAGE,
  };

  const barArrowProps = {
    errorDisplay: errorsVisible,
    headerBarArrow: errorsProps.ERRORS_HEADER_EXPAND_ARROW,
  };

  const errorArrowProps = {
    expanded: specErrorVisible,
    onClick: handleClickSpecError,
    errorArrow: errorsProps.ERROR_EXPAND_ARROW,
  };

  const symbolProps = {
    name: 'exclamation triangle',
    size: 'small'
  };

  const errorComponentGenerator = errors => errors
    .map(soloError => <S.ErrorComponent
      key={A.keySwitchCase(soloError)}>

      <S.ArrowDiv {...errorArrowProps} />
      <S.ErrorFile {...fileProps} onClick={() => errorNav(soloError)} >
        {A.typeSwitchCase(soloError)}
      </S.ErrorFile>

      <S.ErrorType {...typeProps} >
        {A.overalltypeSwitchCase(soloError).name}:
      </S.ErrorType>

      <S.ErrorShortMessage {...shortMessageProps} >
        {A.truncateMessage(A.overalltypeSwitchCase(soloError).shortMessage)}
      </S.ErrorShortMessage>

      {specErrorVisible
        && <S.ErrorFullMessage {...fullMessageProps} >
            {A.overalltypeSwitchCase(soloError).message}
          </S.ErrorFullMessage>}
    </S.ErrorComponent>);

  return (
    <div>
      {errorsVisible
        && <S.ErrorDisplay {...displayProps} >
            {errorComponentGenerator(errors)}
          </S.ErrorDisplay>}

      <S.ErrorsHeader {...headerProps} >
        {A.gtZero(errors.length)
          && <S.ErrorSymbol {...symbolProps} />}
        {A.errorArrayLength(errors)} Errors
        <S.ErrorBarArrow {...barArrowProps} />
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
