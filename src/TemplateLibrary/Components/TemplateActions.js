import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';

const ActionsContainer = styled.div`
  padding: 0 !important;
  background-color: #F9F9F9 !important;
  max-height: 30px;
`;

const TemplateBtn = styled.a`
  padding: 5px 10px;
  display: inline-block;
  color: #484848;
  font-family: "IBM Plex Sans";
  font-size: 0.75em;
  font-weight: bold;
`;

const AddToContractBtn = styled(TemplateBtn)`
  width: 60%;
  border-right: 1px solid #E1E5EB; 
  cursor: pointer;
  &:hover {
    color: #3087CB;
  }
`;

const DetailsBtn = styled(TemplateBtn)`
  float: right;
  width: 40%;
  font-size: 0.75em;
  font-weight: 300;
  text-align: center;
`;

/**
 * A Template Actions component that will provide each template
 * with functionality.
 */
const TemplateActions = props => (
    <ActionsContainer className={props.className}>
    <div>
      <AddToContractBtn
        className="templateAddToContractButton"
        onClick={() => props.addToCont(props.uriKey)}
      >
        <Icon name="plus" />
        Add to contract
      </AddToContractBtn>
      <DetailsBtn
        className="templateDetailsButton"
        onClick={() => props.handleViewDetails(props.uriKey)}>
        Details
      </DetailsBtn>
    </div>
  </ActionsContainer>
);

TemplateActions.propTypes = {
  addToCont: PropTypes.func,
  handleViewDetails: PropTypes.func,
  uriKey: PropTypes.string,
};

export default TemplateActions;
