import React from 'react';
import PropTypes from 'prop-types';
import 'react-table/react-table.css';
import ReactTable from 'react-table';

/**
 * @param {object} d
 * @param {string} key
 */
function buildMessage(d, key) {
  let result = 'Unknown';

  if (d.fileLocation) {
    result = '';
    if (d.fileLocation[key].line) {
      result += `Line: ${d.fileLocation[key].line}`;
    }

    if (d.fileLocation[key].column) {
      result += ` Col: ${d.fileLocation[key].column}`;
    }
  }

  return result;
}

/**
 * @param {object} d
 */
function buildStartLocation(d) {
  return buildMessage(d, 'start');
}

/**
 * @param {object} d
 */
function buildEndLocation(d) {
  return buildMessage(d, 'end');
}


const columns = [{
  Header: 'Type',
  accessor: 'type',
  width: 100,
},
{
  Header: 'Name',
  accessor: 'name',
  width: 200,
},
{
  Header: 'File',
  accessor: 'fileName',
  width: 100,
},
{
  id: 'startLocation',
  Header: 'Start Location',
  accessor: d => buildStartLocation(d),
  width: 100,
},
{
  id: 'endLocation',
  Header: 'End Location',
  accessor: d => buildEndLocation(d),
  width: 100,
},
{
  Header: 'Message',
  accessor: 'shortMessage',
  width: 600,
},
];

const ErrorLogger = props => (
  <ReactTable
    data={props.errors}
    pageSize={5}
    columns={columns}
  />
);

ErrorLogger.propTypes = {
  errors: PropTypes.array.isRequired,
};

export default ErrorLogger;
