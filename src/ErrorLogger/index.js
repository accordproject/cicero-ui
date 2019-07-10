import * as R from 'ramda';
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';
import styled from 'styled-components';

const ErrorDisplay = styled.div`
  width: 100%;
  max-height: 300px;
  background-color: #1E2D53;
  box-shadow: 0 -2px 20px 0 rgba(20,31,60,0.65);
`;

const ErrorsHeader = styled.div`
  width: 100%;
  height: 25px;
  padding: 0.1em 0.1em 0.1em 1em;
  background-color: ${props => (props.backgroundColor ? '#364C77' : '#1E2D53')};
  box-shadow: 0 -2px 20px 0 rgba(20,31,60,0.65);
  

  border-top: 1px solid #50637F;

  // height: 20px;
  // width: 80px;
  color: ${props => (props.errors ? '#FF4242' : '#19C6C7')};
  transition: 0.5s;
  font-family: "IBM Plex Sans";
  font-size: 16px;
  font-weight: bold;
  letter-spacing: -0.5px;
  line-height: 20px;

  &:hover {
    background-color: #364C77;
    cursor: pointer;
  }
`;

const ErrorSymbol = styled(Icon)`
  vertical-align: middle;
`;

const ErrorBarArrow = styled.div`
  float: right;
  margin: 5px 15px;

  border-top: ${props => (props.errorDisplay ? '7px solid #7B9AD1' : '0')};
  border-right: 4px solid transparent;
  border-left: 4px solid transparent;
  border-bottom: ${props => (props.errorDisplay ? '0' : '7px solid #7B9AD1')};
`;

// const buildMessage = (data, key) => {
//   let result = 'Unknown';
//   if (data.fileLocation) {
//     result = '';
//     if (data.fileLocation[key].line) {
//       result += `Line: ${data.fileLocation[key].line}`;
//     }
//     if (data.fileLocation[key].column) {
//       result += ` Col: ${data.fileLocation[key].column}`;
//     }
//   }
//   return result;
// };

const pathToLength = input => R.path(['length'], input);

const errorsLengthasdf = err => err || 'No';

const isGreaterThanZero = input => R.gt(input, 0);

const errorArraysLength = props => R.toPairs(props).map(eachError => eachError[1].length);

const reduceLength = arrayOfLengths => R.reduce(R.add, 0, arrayOfLengths);

const errorNumber = R.pipe(errorArraysLength, reduceLength, errorsLengthasdf);

const anyErrorsExist = R.pipe(errorArraysLength, reduceLength, isGreaterThanZero);

// const buildStartLocation = data => buildMessage(data, 'start');

// const buildEndLocation = data => buildMessage(data, 'end');

// const arrLength = input => input.length && (input.length > 1);
const arrLength = arr => pathToLength(arr) > 1;

const extensionFinder = file => file.lastIndexOf('.');

const fileTypeFinder = file => file.substring(extensionFinder(file));

const fileTypeConversion = (file) => {
  switch (fileTypeFinder(file)) {
    case '.cto':
      return 'Model';
    case '.ergo':
      return 'Ergo Logic';
    case '.json':
      return 'Metadata';
    case '.tem':
      return 'Grammar';
    case '.txt':
      return 'Sample';
    default:
      return 'Unknown';
  }
};

const ErrorComponent = styled.div`
  width: 100%;
  color: #F0F0F0;
  border-bottom: 1px solid #50637F;
  padding: 10px 16px;
  
  display: grid;
  grid-row-gap: 20px; 
  grid-template-areas: "errorArrow errorFile errorType errorMessage"
                       "errorFull errorFull errorFull errorFull";
  grid-template-columns: 0.25fr 1fr 1fr 8fr;
  grid-template-rows: min-content auto;
`;

const ErrRARorFile = styled.a`
  text-decoration: underline;
  color: #F0F0F0;
  grid-area: errorFile;
  align-self: center;
`;

const ErrRARorType = styled.div`
  grid-area: errorType;
  align-self: center;
`;

const ErrRARorMessage = styled.div`
  color: gray;
  grid-area: errorMessage;
  align-self: center;
`;

const ErrRARorFullMsg = styled.div`
  color: gray;
  grid-area: errorFull;
  // align-self: center;
`;

const ArrowDiv = styled.div`
  grid-area: errorArrow;
  place-self: center;
  width: 0; 
  height: 0; 
  border-top: 4px solid transparent;
  border-bottom: 4px solid transparent;
  border-left: 10px solid #50637F;
  border-right: 0;

  // &:hover {

  //   border-bottom: 0;
  //   border-right: 4px solid transparent;
  //   border-left: 4px solid transparent;
  //   border-top: 10px solid #50637F;
  // }

  // border-right: 4px solid transparent;
  // border-left: 4px solid transparent;
  // border-top: 10px solid #50637F;
`;

const spreadErrors = input => input.errrorExample.map(
  (err, key) => (
      <ErrorComponent key={key} onClick={input.handleClickSpecError}>
        <ArrowDiv />
        <ErrRARorFile>{fileTypeConversion(err.fileName)}</ErrRARorFile>
        <ErrRARorType>{err.name}:</ErrRARorType>
        <ErrRARorMessage>{err.shortMessage}</ErrRARorMessage>
        {input.specErrorVisible && <ErrRARorFullMsg>{err.message}</ErrRARorFullMsg>}
      </ErrorComponent>
  )
);

// const arrLength = input => input.length && (input.length > 1);
// const arrLength = input => R.path(['length'], input) > 1;

const ErrorLogger = (props) => {
  const { errors } = props;

  console.log('Errors in Cicero-UI: ', errors);
  console.log('Something: ', errorNumber(props.errors));

  // const buttonRef = useRef(null);

  // const anyErrors = () => (!!props);

  const [errorsVisible, setErrorsVisible] = useState(false);

  const [specErrorVisible, setspecErrorVisible] = useState([]);

  const handleClickErrorsBar = () => {
    if (arrLength(errors)) { setErrorsVisible(!errorsVisible); }
    // buttonRef.current.blur();
  };

  const handleClickSpecError = () => {
    setspecErrorVisible(!specErrorVisible);
    // buttonRef.current.blur();
  };

  const spreadErrorsProps = {
    errrorExample: props.errors,
    handleClickSpecError,
    specErrorVisible
  };

  return (
  <div>
    {errorsVisible && <ErrorDisplay>
      {spreadErrors(spreadErrorsProps)}
    </ErrorDisplay>}

    <ErrorsHeader
      backgroundColor={errorsVisible}
      errors={anyErrorsExist(errors)}
      onClick={handleClickErrorsBar}
    >
      {anyErrorsExist(errors)
        && <ErrorSymbol name="exclamation triangle" size="small" />}
      {errorNumber(errors)} Errors
      <ErrorBarArrow errorDisplay={errorsVisible} />
    </ErrorsHeader>
  </div>
  );
};

ErrorLogger.propTypes = {
  errors: PropTypes.array.isRequired,
};

export default ErrorLogger;
