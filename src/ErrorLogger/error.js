/* React */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

/* Styling */
import * as A from './actions';

/* Actions */
import * as S from './styles';

const ErrorComponent = (props) => {
  const { error, errorProps, errorNav } = props;

  const [specErrorVisible, setspecErrorVisible] = useState(false);

  const handleClickSpecError = () => {
    setspecErrorVisible(!specErrorVisible);
  };

  const componentProps = {
    borderBottom: errorProps.ERROR_BORDER_BOTTOM,
  };

  const fileProps = {
    errorFile: errorProps.ERROR_FILE,
    errorFileHover: errorProps.ERROR_FILE_HOVER,
  };

  const typeProps = {
    onClick: handleClickSpecError,
    errorType: errorProps.ERROR_TYPE,
  };

  const shortMessageProps = {
    onClick: handleClickSpecError,
    shortMessage: errorProps.ERROR_SHORT_MESSAGE,
  };

  const fullMessageProps = {
    fullMessage: errorProps.ERROR_FULL_MESSAGE,
  };

  const errorArrowProps = {
    expanded: specErrorVisible,
    onClick: handleClickSpecError,
    errorArrow: errorProps.ERROR_EXPAND_ARROW,
  };

  return (
    <S.ErrorComponent {...componentProps}>

      <S.ArrowDiv {...errorArrowProps} />
      <S.ErrorFile {...fileProps} onClick={() => errorNav(error)} >
        {A.typeSwitchCase(error)}
      </S.ErrorFile>

      <S.ErrorType {...typeProps} >
        {A.overalltypeSwitchCase(error).name}:
      </S.ErrorType>

      <S.ErrorShortMessage {...shortMessageProps} >
        {A.truncateMessage(A.overalltypeSwitchCase(error).shortMessage)}
      </S.ErrorShortMessage>

      {specErrorVisible
        && <S.ErrorFullMessage {...fullMessageProps} >
            {A.overalltypeSwitchCase(error).message}
          </S.ErrorFullMessage>}
    </S.ErrorComponent>
  );
};

ErrorComponent.propTypes = {
  error: PropTypes.object.isRequired,
  errorNav: PropTypes.func,
  errorProps: PropTypes.shape({
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

export default ErrorComponent;
