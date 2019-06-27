import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card, Image } from 'semantic-ui-react';

import TemplateActions from './TemplateActions';

const CardContainer = styled(Card)`
  margin: 10px 0 !important;
  background-color: ${props => props.templateBackground || null} !important;
  position: relative;
  text-align: left;
  min-height: 120px;
  font-size: 14px !important;
  box-shadow: 0 1px 9px 0 rgba(0,0,0,0.1) !important;
`;

const Title = styled.div`
  height: 16px;
  color: ${props => props.templateTitle || null};
  font-family: Graphik;
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
  color: ${props => props.templateDescription || null} !important;
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
        <CardContainer fluid key={template.uri} templateBackground={this.props.templateBackground}>
            <Card.Content>
              <TemplateLogo src={template.icon} />
              <Title templateTitle={this.props.templateTitle}>
                {template.name}
                <Version>v {template.version}</Version>
              </Title>
              <DescriptionContainer templateDescription={this.props.templateDescription}>
                {template.description}
              </DescriptionContainer>
            </Card.Content>
            <TemplateActions
              actionBtnBkgrd={this.props.actionBtnBkgrd}
              actionBtnColor={this.props.actionBtnColor}
              actionBtnBorder={this.props.actionBtnBorder}
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
  templateDescription: PropTypes.string,
  template: PropTypes.object,
  addToCont: PropTypes.func,
  handleViewTemplate: PropTypes.func,
  actionBtnColor: PropTypes.string,
  actionBtnBkgrd: PropTypes.string,
  actionBtnBorder: PropTypes.string,
  templateBackground: PropTypes.string,
  templateTitle: PropTypes.string,
};

export default TemplateCard;
