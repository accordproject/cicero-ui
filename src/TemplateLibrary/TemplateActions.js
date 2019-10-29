import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';

const ActionsContainer = styled.div`
  padding: 0 !important;
  background-color: ${props => props.colorBorder || '#F9F9F9'} !important;
  max-height: 30px;
`;

const TemplateBtn = styled.a`
  padding: 5px 10px;
  display: inline-block;
  color: ${props => props.colorButton || '#484848'};
  font-family: "IBM Plex Sans";
  font-size: 0.75em;
  font-weight: bold;
`;

const AddToContractBtn = styled(TemplateBtn)`
  width: 60%;
  border-right: 1px solid ${props => props.colorBorder || '#E1E5EB'}; 
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
class TemplateActions extends React.Component {
  /**
     * Render this React component
     * @return {*} the react component
  */
  render() {
    const { handleViewDetails, libraryProps } = this.props;
    return (
        <ActionsContainer color={libraryProps.ACTION_BUTTON_BG}>
        <div>
          <AddToContractBtn className="adToContractButton" colorBorder={libraryProps.ACTION_BUTTON_BORDER} colorButton={libraryProps.ACTION_BUTTON} onClick={() => this.props.addToCont(this.props.uriKey)} >
            <Icon name="plus" />
            Add to contract
          </AddToContractBtn>
          <DetailsBtn
            color={libraryProps.ACTION_BUTTON}
            onClick={() => handleViewDetails(this.props.uriKey)}>
            Details
          </DetailsBtn>
        </div>
      </ActionsContainer>
    );
  }
}

/**
 * The property types for this component
 */
TemplateActions.propTypes = {
  addToCont: PropTypes.func,
  handleViewDetails: PropTypes.func,
  uriKey: PropTypes.string,
  libraryProps: PropTypes.shape({
    ACTION_BUTTON: PropTypes.string,
    ACTION_BUTTON_BG: PropTypes.string,
    ACTION_BUTTON_BORDER: PropTypes.string,
  }),
};

export default TemplateActions;
