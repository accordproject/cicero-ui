import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card, Image } from 'semantic-ui-react';

import TemplateActions from './TemplateActions';

const CardContainer = styled(Card)`
  margin: 10px 0 !important;
  background-color: ${props => props.color || 'transparent'} !important;
  position: relative;
  text-align: left;
  min-height: 120px;
  font-size: 14px !important;
  box-shadow: 0 1px 9px 0 rgba(0,0,0,0.1) !important;
`;

const Title = styled.div`
  height: 16px;
  color: ${props => props.color || null};
  font-size: 16px;
  font-weight: 600;
  line-height: 16px;
  margin-bottom: 5px;
`;

const TemplateLogo = styled(Image)`
  position: absolute !important;
  top: 13px;
  right: 16px;
  max-height: 23px;
`;

const Version = styled.span`
  margin-left: 10px;
  font-size: 12px;
  font-weight: 300;
`;

const DescriptionContainer = styled(Card.Description)`
  max-width: 400px;
  margin: auto;
  font-size: 0.9em;
  color: ${props => props.color || null} !important;
`;

/**
 * A Template Card component that will display the each template
 * and it's details.
 */
class TemplateCard extends React.Component {
  /**
     * Render this React component
     * @return {*} the react component
  */
  render() {
    const { libraryProps, template } = this.props;
    return (
        <CardContainer fluid key={template.uri} color={libraryProps.TEMPLATE_BACKGROUND}>
            <Card.Content>
              <TemplateLogo src={template.icon} />
              <Title color={libraryProps.TEMPLATE_TITLE}>
                {template.name}
                <Version>v {template.version}</Version>
              </Title>
              <DescriptionContainer color={libraryProps.TEMPLATE_DESCRIPTION}>
                {template.description}
              </DescriptionContainer>
            </Card.Content>
            <TemplateActions
              libraryProps={libraryProps}
              addToCont={this.props.addToCont}
              uriKey={template.uri}
              handleViewDetails={this.props.handleViewTemplate}
              className="templateAction"
            />
        </CardContainer>
    );
  }
}

/**
 * The property types for this component
 */
TemplateCard.propTypes = {
  template: PropTypes.object,
  addToCont: PropTypes.func,
  handleViewTemplate: PropTypes.func,
  libraryProps: PropTypes.shape({
    ACTION_BUTTON: PropTypes.string,
    ACTION_BUTTON_BG: PropTypes.string,
    ACTION_BUTTON_BORDER: PropTypes.string,
    HEADER_TITLE: PropTypes.string,
    TEMPLATE_BACKGROUND: PropTypes.string,
    TEMPLATE_DESCRIPTION: PropTypes.string,
    TEMPLATE_TITLE: PropTypes.string,
  }),
};

export default TemplateCard;
