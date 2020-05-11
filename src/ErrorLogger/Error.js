/* React */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

/* Actions */
import * as ACT from './actions';

/* Styling */
import * as SC from './styles';

const ErrorComponent = (props) => {
  const { error, errorNav } = props;
  const [specErrorVisible, setspecErrorVisible] = useState(false);

  const handleClickSpecError = () => {
    setspecErrorVisible(!specErrorVisible);
  };

  const typeProps = {
    onClick: handleClickSpecError,
  };

  const shortMessageProps = {
    onClick: handleClickSpecError,
  };

  const errorArrowProps = {
    expanded: specErrorVisible,
    onClick: handleClickSpecError,
  };

  return (
    <SC.ErrorComponent className='errorLoggerError'>

      <SC.ArrowDiv {...errorArrowProps} className={specErrorVisible?'errorLoggerErrorArrowExpanded':'errorLoggerErrorArrowCollapsed'}/>
      <SC.ErrorFile onClick={() => errorNav(error)} className='errorLoggerError'>
        {ACT.typeSwitchCase(error || {})}
      </SC.ErrorFile>

      <SC.ErrorType {...typeProps} className='errorLoggerErrorType'>
        {ACT.overalltypeSwitchCase(error).name || 'Unknown Error'}:
      </SC.ErrorType>

      <SC.ErrorShortMessage {...shortMessageProps} className='errorLoggerErrorShortMessage'>
        {ACT.truncateMessage(ACT.overalltypeSwitchCase(error).shortMessage || 'Unknown Error')}
      </SC.ErrorShortMessage>

      {specErrorVisible
        && <SC.ErrorFullMessage {...fullMessageProps} className='errorLoggerErrorFullMessage'>
            {ACT.overalltypeSwitchCase(error).message || 'Unknown Error'}
          </SC.ErrorFullMessage>}
    </SC.ErrorComponent>
  );
};

ErrorComponent.propTypes = {
  error: PropTypes.object.isRequired,
  errorNav: PropTypes.func,
};

export default ErrorComponent;
