import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card, Image } from 'semantic-ui-react';

import TemplateActions from './TemplateActions';

const CardContainer = styled(Card)`
  position: relative;
  text-align: left;
  min-height: 120px;
  box-shadow: 0 1px 9px 0 rgba(0,0,0,0.1);
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
    const { template } = this.props;
    return (
        <CardContainer fluid key={template.uri}>
            <Card.Content>
              <TemplateLogo src={template.icon} />
              <Card.Header>
                {template.name}
                <Version>v {template.version}</Version>
              </Card.Header>
              <DescriptionContainer>
                {template.description}
              </DescriptionContainer>
            </Card.Content>
            <TemplateActions
              addToCont={this.props.addToCont}
              uriKey={template.uri}
              handleViewDetails={this.props.handleViewTemplate}
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
};

export default TemplateCard;
