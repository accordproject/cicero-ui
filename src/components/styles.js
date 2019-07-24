import styled from 'styled-components';
import './index.css';

export const ClauseWrapper = styled.div`
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

export const ClauseHeader = styled.div`
  margin: 12px 10px;

  color: #939EBA;
  font-family: ${props => props.headerfont || 'Graphik'};
  font-size: 14px;
  font-weight: 600;
  line-height: 14px;

  grid-area: titleArea;
`;

export const ClauseBody = styled.div`
  margin: 10px 10px 15px;

  color: #141F3C;
  font-family: ${props => props.bodyfont || 'Graphik'};
  font-size: 15px;
  line-height: 22px;

  grid-area: bodyArea;
`;

export const ClauseDelete = styled.svg`
  fill: #939EBA;
  cursor: pointer;

  grid-area: deleteIcon;
  place-self: center;

  &:hover {
    fill: ${props => props.clausedelete || '#19C6C7'};
  }
`;
