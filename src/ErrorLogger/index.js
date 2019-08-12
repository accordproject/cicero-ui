/* React */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

/* Styling */
import * as A from './actions';

/* Actions */
import * as S from './styles';

/* Component */
import ErrorComponent from './error';

const ErrorLogger = (props) => {
  const { errors, errorNav } = props;
  const errorsProps = props.errorsProps || Object.create(null);

  const [errorsVisible, setErrorsVisible] = useState(false);

  const handleClickErrorsBar = () => {
    if (A.gtZero(errors.length)) { setErrorsVisible(!errorsVisible); }
  };

  const headerProps = {
    id: 'ErrorComponentHeader',
    errors: A.errorsExist(errors),
    onClick: handleClickErrorsBar,
    headerBackground: errorsProps.ERRORS_HEADER_BACKGROUND,
    headerBackgroundHover: errorsProps.ERRORS_HEADER_BACKGROUND_HOVER,
    headerShadow: errorsProps.ERRORS_HEADER_SHADOW,
    headerTop: errorsProps.ERRORS_HEADER_BORDER_TOP,
  };

  const displayProps = {
    id: 'ErrorComponentDisplay',
    errorDisplay: errorsVisible,
    displayBackground: errorsProps.ERRORS_DISPLAY_BACKGROUND,
    displayShadow: errorsProps.ERRORS_DISPLAY_SHADOW,
  };

  const barArrowProps = {
    errorDisplay: errorsVisible,
    headerBarArrow: errorsProps.ERRORS_HEADER_EXPAND_ARROW,
  };

  const symbolProps = {
    name: 'exclamation triangle',
    size: 'small'
  };

  const errorComponentGenerator = errors => errors
    .map(soloError => <ErrorComponent
      errorProps={errorsProps}
      error={soloError}
      errorNav={errorNav}
      key={A.keySwitchCase(soloError)} />);

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
    ERRORS_HEADER_BACKGROUND_HOVER: PropTypes.string,
    ERRORS_HEADER_EXPAND_ARROW: PropTypes.string,
    ERRORS_HEADER_BORDER_TOP: PropTypes.string,
    ERRORS_HEADER_SHADOW: PropTypes.string,
    ERRORS_DISPLAY_BACKGROUND: PropTypes.string,
    ERRORS_DISPLAY_SHADOW: PropTypes.string,
    ERROR_BORDER_BOTTOM: PropTypes.string,
    ERROR_EXPAND_ARROW: PropTypes.string,
    ERROR_FILE: PropTypes.string,
    ERROR_FILE_HOVER: PropTypes.string,
    ERROR_TYPE: PropTypes.string,
    ERROR_FULL_MESSAGE: PropTypes.string,
    ERROR_SHORT_MESSAGE: PropTypes.string,
  }),
};

export default ErrorLogger;
