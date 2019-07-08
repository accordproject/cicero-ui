import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';
import styled from 'styled-components';

const ErrorsBar = styled.div`
  width: 100%;
  height: 400px;
  padding: 10px;
  background-color: #1E2D53;
  box-shadow: 0 -2px 20px 0 rgba(20,31,60,0.65);
`;

const ErrorsHeader = styled.div`
  width: 100%;
  height: 35px;
  padding: 0.5em;
  background-color: #1E2D53;
  box-shadow: 0 -2px 20px 0 rgba(20,31,60,0.65);

  border-top: 1px solid #50637F;

  // height: 20px;
  // width: 80px;
  color: ${props => (props.errors ? '#c71a19' : '#19c6c7')};
  transition: 0.5s;
  font-family: "IBM Plex Sans";
  font-size: 16px;
  font-weight: bold;
  letter-spacing: -0.5px;
  line-height: 20px;
`;

const buildMessage = (data, key) => {
  let result = 'Unknown';
  if (data.fileLocation) {
    result = '';
    if (data.fileLocation[key].line) {
      result += `Line: ${data.fileLocation[key].line}`;
    }
    if (data.fileLocation[key].column) {
      result += ` Col: ${data.fileLocation[key].column}`;
    }
  }
  return result;
};

const buildStartLocation = data => buildMessage(data, 'start');

const buildEndLocation = data => buildMessage(data, 'end');

const errorsExist = err => err.length > 0;

const errorsLength = err => err.length || 'No';

const modelError = {
  component: 'composer-concerto',
  name: 'ParseException',
  fileLocation: {
    start: {
      offset: 559,
      line: 15,
      column: 1
    },
    end: {
      offset: 559,
      line: 15,
      column: 1
    },
    fileName: './examples/volumediscount/model.cto'
  },
  shortMessage: 'Expected "namespace", comment, end of line, or whitespace but "n" found.',
  fileName: './examples/volumediscount/model.cto',
  message: 'This is one big long message with lots of information and maybe more information and then even more you better believe it oh boy so much information'
};

const parseError = {
  component: 'ergo-compiler',
  name: 'TypeException',
  fileLocation: {
    start: {
      line: 21,
      column: 54
    },
    end: {
      line: 21,
      column: 76
    }
  },
  shortMessage: "This operator received unexpected arguments of type `Double'  and `Integer'.",
  fileName: './examples/volumediscount/logic.ergo',
  message: 'This is one big long message with lots of information and maybe more information and then even more you better believe it oh boy so much information'
};

const ergoError = {
  component: 'ergo-compiler',
  name: 'ParseException',
  fileLocation: {
    start: {
      line: 17,
      column: 0
    },
    end: {
      line: 17,
      column: 7
    }
  },
  shortMessage: 'Parse error',
  fileName: './examples/volumediscount/logic.ergo',
  message: 'This is one big long message with lots of information and maybe more information and then even more you better believe it oh boy so much information'
};

const errrorExample = [modelError, parseError, ergoError];

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
  height: 50px;
  width: 100%;
  color: #F0F0F0;
  border-bottom: 1px solid #50637F;
  padding: 15px 0;
  
  display: grid;
  grid-template-areas: "errorArrow errorFile errorType errorMessage"
                       "errorFull errorFull errorFull errorFull";
  grid-template-columns: 0.25fr 1fr 1fr 8fr;
  grid-template-rows: 1min-content 1auto;
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

const spreadErrors = errArr => errArr.map(
  (err, key) => (
      <ErrorComponent key={key}>
        <ArrowDiv />
        <ErrRARorFile>{fileTypeConversion(err.fileName)}</ErrRARorFile>
        <ErrRARorType>{err.name}:</ErrRARorType>
        <ErrRARorMessage>{err.shortMessage}</ErrRARorMessage>
        <ErrRARorFullMsg>{err.message}</ErrRARorFullMsg>
      </ErrorComponent>
  )
);

const ErrorLogger = (props) => {
  console.log('props: ', props.errors);
  return (
  <div>
    <ErrorsBar>
      {spreadErrors(errrorExample)}
    </ErrorsBar>
    <ErrorsHeader errors={errorsExist([errrorExample])}>
      {errorsExist([errrorExample])
        && <Icon name="exclamation triangle" />}
      {errorsLength(errrorExample)} Errors
    </ErrorsHeader>
  </div>
  );
};

ErrorLogger.propTypes = {
  errors: PropTypes.array.isRequired,
};

export default ErrorLogger;
