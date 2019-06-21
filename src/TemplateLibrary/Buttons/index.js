/* React */
import React from 'react';
import PropTypes from 'prop-types';

/* Styling */
import styled from 'styled-components';
import { Button } from 'semantic-ui-react';

const UploadButton = styled.button`
  position: relative;
  font-weight: 300;
  text-align: right;
  text-decoration: none;
  font-size: 14px;
  color: #76777D;
  border: 0;
  cursor: pointer;
  &:hover {
    color: #0361DE;
    text-decoration: underline;
  }
  &:focus {
    outline: none;
    color: #3089FF;
    text-decoration: underline;
  }
  &:active {
    color: #3089FF;
    text-decoration: underline;
  }
`;

const ImportButton = styled(UploadButton)`
  margin-bottom: 5px;
`;

const AddClauseBtn = styled(Button)`
  margin: 5px auto 0 !important;
  width: 96% !important;
`;

export const ImportComponent = props => (
    <ImportButton
        onClick={props.importInput}
        href="javascript:void(0);"
        className="importButton"
    >
        Import from VS Code
    </ImportButton>);

export const UploadComponent = props => (
    <UploadButton
        onClick={props.uploadInput}
        href="javascript:void(0);"
        className="uploadButton"
    >
        Upload CTA file
    </UploadButton>);

export const NewClauseComponent = props => (
    <AddClauseBtn
        content="New Clause Template"
        color="blue"
        fluid
        icon="plus"
        id="addClauseBtn"
        onClick={props.addTempInput}
        className="addTemplateButton"
    />);

ImportComponent.propTypes = { importInput: PropTypes.func };
UploadComponent.propTypes = { uploadInput: PropTypes.func };
NewClauseComponent.propTypes = { addTempInput: PropTypes.func };
