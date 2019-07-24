/* React */
import React from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';

/* Styling */
import styled from 'styled-components';
import './index.css';

/* Icons */
import * as deleteIcon from '../../assets/icons/trash';

/* Actions */
import titleGenerator from './actions';

const ClauseWrapper = styled.div`
  border: 1px solid ${props => props.clauseborder || '#19C6C7'};
  border-radius: 3px;
  background-color: ${props => props.clausebg || '#ECF0FA'};

  display: grid;
  grid-template-columns: 1fr 20px 20px 20px 20px 1px;
  grid-template-rows: auto 1fr;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  grid-template-areas: "titleArea testIcon codeIcon editIcon deleteIcon endSpace"
                       "bodyArea bodyArea bodyArea bodyArea bodyArea bodyArea";
`;

const ClauseHeader = styled.div`
  margin: 12px 10px;

  color: #939EBA;
  font-family: ${props => props.headerfont || 'Graphik'};
  font-size: 14px;
  font-weight: 600;
  line-height: 14px;

  grid-area: titleArea;
`;

const ClauseBody = styled.div`
  margin: 10px 10px 15px;

  color: #141F3C;
  font-family: ${props => props.bodyfont || 'Graphik'};
  font-size: 15px;
  line-height: 22px;

  grid-area: bodyArea;
`;

const ClauseDelete = styled.svg`
  fill: #939EBA;
  cursor: pointer;

  grid-area: deleteIcon;
  place-self: center;

  &:hover {
    fill: ${props => props.clausedelete || '#19C6C7'};
  }
`;

const deleteIconProps = {
  'aria-label': deleteIcon.type,
  width: '12px',
  height: '15px',
  viewBox: '0 0 12 15'
};

/**
 * Component to render a clause
 *
 * @param {*} props
 */
function ClauseComponent(props) {
  const clauseProps = props.clauseProps || Object.create(null);
  const errorsComponent = props.errors
    ? <Segment contentEditable={false} attached raised>{props.errors}</Segment>
    : null;
  return (
    <ClauseWrapper
      clauseborder={clauseProps.CLAUSE_BORDER}
      clausebg={clauseProps.CLAUSE_BACKGROUND}
    >
      <ClauseHeader headerfont={clauseProps.HEADER_FONT} >
        {titleGenerator(props.templateUri)} — SMART CLAUSE
      </ClauseHeader>
      <ClauseDelete {...deleteIconProps} clausedelete={clauseProps.CLAUSE_DELETE} >
        {deleteIcon.icon()}
      </ ClauseDelete>
      <ClauseBody bodyfont={clauseProps.BODY_FONT} >
        {props.children}
      </ClauseBody>
    {errorsComponent}
  </ClauseWrapper>
  );
}

ClauseComponent.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
  templateUri: PropTypes.string.isRequired,
  clauseId: PropTypes.string,
  errors: PropTypes.object,
  clauseProps: PropTypes.shape({
    BODY_FONT: PropTypes.string,
    CLAUSE_BACKGROUND: PropTypes.string,
    CLAUSE_BORDER: PropTypes.string,
    CLAUSE_DELETE: PropTypes.string,
    HEADER_FONT: PropTypes.string,
  }),
};

export default ClauseComponent;
