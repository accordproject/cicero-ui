import React from 'react';
import PropTypes from 'prop-types';
// import ReactTable from 'react-table';
import styled from 'styled-components';
import 'react-table/react-table.css';

const ErrorsBar = styled.div`
  width: 100vw;
  height: 100px;
  padding: 10px;
  background-color: #1E2D53;
  box-shadow: 0 -2px 20px 0 rgba(20,31,60,0.65);
`;

const ErrorsHeader = styled.div`
  height: 20px;
  width: 66px;
  color: ${props => (props.errors ? '#c71a19' : '#19c6c7')};
  transition: 0.5s;
  font-family: "IBM Plex Sans";
  font-size: 16px;
  font-weight: bold;
  letter-spacing: -0.5px;
  line-height: 20px;
`;

// /**
//  * @param {object} d
//  * @param {string} key
//  */
// function buildMessage(d, key) {
//   let result = 'Unknown';

//   if (d.fileLocation) {
//     result = '';
//     if (d.fileLocation[key].line) {
//       result += `Line: ${d.fileLocation[key].line}`;
//     }

//     if (d.fileLocation[key].column) {
//       result += ` Col: ${d.fileLocation[key].column}`;
//     }
//   }

//   return result;
// }

// /**
//  * @param {object} d
//  */
// function buildStartLocation(d) {
//   return buildMessage(d, 'start');
// }

// /**
//  * @param {object} d
//  */
// function buildEndLocation(d) {
//   return buildMessage(d, 'end');
// }

const errorsExist = err => err.length > 0;

const errorsLength = err => err.length || 'No';


// const columns = [{
//   Header: 'Type',
//   accessor: 'type',
//   width: 100,
// },
// {
//   Header: 'Name',
//   accessor: 'name',
//   width: 200,
// },
// {
//   Header: 'File',
//   accessor: 'fileName',
//   width: 100,
// },
// {
//   id: 'startLocation',
//   Header: 'Start Location',
//   accessor: d => buildStartLocation(d),
//   width: 100,
// },
// {
//   id: 'endLocation',
//   Header: 'End Location',
//   accessor: d => buildEndLocation(d),
//   width: 100,
// },
// {
//   Header: 'Message',
//   accessor: 'shortMessage',
//   width: 600,
// },
// ];

const ErrorLogger = (props) => {
  console.log('props: ', props.errors);
  return (
  <div>
    {/* <ReactTable
      data={props.errors}
      pageSize={5}
      columns={columns}
    /> */}
    <ErrorsBar>
      <ErrorsHeader errors={errorsExist(props.errors)}>
        {errorsLength(props.errors)} Errors
      </ErrorsHeader>
    </ErrorsBar>
  </div>
  );
};

ErrorLogger.propTypes = {
  errors: PropTypes.array.isRequired,
};

export default ErrorLogger;
