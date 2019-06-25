import _ from 'lodash';

/* React */
import React from 'react';
import PropTypes from 'prop-types';

/* Styling */
import styled from 'styled-components';
import { Card, Input } from 'semantic-ui-react';

/* Internal */
import TemplateCard from './TemplateCard';
import { ImportComponent, UploadComponent, NewClauseComponent } from './Buttons';

const TemplatesWrapper = styled.div`
  font-family: 'IBM Plex Sans', sans-serif;
  position: relative;
  max-width: 355px;

  display: grid;
  grid-template-areas:  "header"
                        "functionTemps";
  grid-template-rows:    55px auto;
  grid-template-columns: 100%;
`;

const Header = styled.div`
  position: relative;
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 800;
  font-size: 16px;
  margin-bottom: 10px;
  
  display: grid;
  grid-area: header;
  grid-template-columns: 1fr 1fr;
  grid-template-areas: "title imports";
`;

const HeaderTitle = styled.p`
  text-align: left;
`;

const HeaderImports = styled.div`
  display: flex;
  flex-direction: column;
`;

const Functionality = styled.div`
  font-family: 'IBM Plex Sans', sans-serif;
  max-width: 430px;
  display: flex;
  flex-direction: column;
`;

const SearchInput = styled(Input)`
  margin: 5px 0 !important;
  width: 100% !important;
`;

const TemplateCards = styled(Card.Group)`
  margin: 0 !important;
  width: 100%;
`;

/**
 * A Template Library component that will display the filtered list of templates
 * and provide drag-and-drop functionality.
 */

class TemplateLibraryComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
    };
    this.onQueryChange = this.onQueryChange.bind(this);
  }

  static propTypes = {
    upload: PropTypes.func,
    import: PropTypes.func,
    addTemp: PropTypes.func,
    addToCont: PropTypes.func,
    handleViewTemplate: PropTypes.func,
    templates: PropTypes.arrayOf(PropTypes.object),
  }

  onQueryChange(e, input) {
    const query = input.value.toLowerCase().trim();
    if (query !== this.state.query) {
      this.setState({ query });
    }
  }

  filterTemplates(templates) {
    const { query } = this.state;
    let filteredTemplates = templates;
    if (query.length) {
      const regex = new RegExp(query, 'i');
      filteredTemplates = _.filter(filteredTemplates, t => (
        t.name.match(regex) || t.uri.match(regex)
      ));
    }
    return filteredTemplates;
  }

  /**
   * Render this React component
   * @return {*} the react component
   */
  render() {
    const filtered = this.filterTemplates(this.props.templates);
    return (
      <TemplatesWrapper>
        <Header>
          <HeaderTitle>Clause Templates</HeaderTitle>
          <HeaderImports>
            {this.props.import
            && <ImportComponent importInput={this.props.import} />}
            {this.props.upload
            && <UploadComponent uploadInput={this.props.upload} />}
          </HeaderImports>
        </Header>
        <Functionality>
          <SearchInput className="icon" fluid icon="search" placeholder="Search..." onChange={this.onQueryChange} />
          {this.props.addTemp
          && <NewClauseComponent addTempInput={this.props.addTemp} />}
        </Functionality>
        <TemplateCards>
          {_.sortBy(filtered, ['name']).map(t => (
            <TemplateCard
              key={t.uri}
              addToCont={this.props.addToCont}
              template={t}
              handleViewTemplate={this.props.handleViewTemplate}
              className="templateCard"
            />
          ))}
        </TemplateCards>
      </TemplatesWrapper>
    );
  }
}

export default TemplateLibraryComponent;
