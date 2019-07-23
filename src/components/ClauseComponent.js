/* React */
import React from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';

/* Styling */
import styled from 'styled-components';
import './index.css';

/* Icons */
import * as deleteIcon from '../../assets/icons/trash';

const ClauseWrapper = styled.div`
  border: 1px solid #19C6C7;
  border-radius: 3px;
  background-color: #ECF0FA;


  display: grid;
  grid-template-columns: 1fr 20px 20px 20px 20px 1px;
  grid-template-rows: 40px 1fr;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  grid-template-areas: "titleArea testIcon codeIcon editIcon deleteIcon endSpace"
                       "bodyArea bodyArea bodyArea bodyArea bodyArea bodyArea";
`;

const ClauseHeader = styled.div`
  margin: 12px 10px;

  color: #939EBA;
  font-family: Graphik;
  font-size: 14px;
  font-weight: 600;
  line-height: 14px;

  grid-area: titleArea;
`;

const ClauseBody = styled.div`
  margin: 10px 10px 15px;

  color: #141F3C;
  font-family: Graphik;
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
    fill: #19C6C7;
  }
`;


const deleteIconProps = {
  'aria-label': deleteIcon.type,
  width: '12px',
  height: '15px',
  viewBox: '0 0 12 15'
};

const titleStart = input => input.lastIndexOf('/');
const titleEnd = input => input.indexOf('@');
const titleReducer = input => input.slice((titleStart(input) + 1), titleEnd(input));
const titleSpacer = input => input.replace(/-/g, ' ');
const titleCaps = input => input.toUpperCase();

const titleGenerator = (input) => {
  const reducedTitle = titleReducer(input);
  const spacedTitle = titleSpacer(reducedTitle);
  const finalTitle = titleCaps(spacedTitle);

  return finalTitle;
};

/**
 * Component to render a clause
 *
 * @param {*} props
 */
function ClauseComponent(props) {
  const errorsComponent = props.errors
    ? <Segment contentEditable={false} attached raised>{props.errors}</Segment>
    : null;
  return (
    <ClauseWrapper>
      <ClauseHeader>
        {titleGenerator(props.templateUri)} — SMART CLAUSE
      </ClauseHeader>
      <ClauseDelete {...deleteIconProps} >
        {deleteIcon.icon()}
      </ ClauseDelete>
      <ClauseBody>
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
};

export default ClauseComponent;
