/* React */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

/* Styling */
import * as A from './actions';

/* Actions */
import * as S from './styles';


const ErrorComponent = (soloError) => {
  const [specErrorVisible, setspecErrorVisible] = useState(false);

  const handleClickSpecError = () => {
    setspecErrorVisible(!specErrorVisible);
  };

  return (
    <S.ErrorComponent {...componentProps}
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
    </S.ErrorComponent>
  );
};

ErrorComponent.propTypes = {
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

export default ErrorComponent;
