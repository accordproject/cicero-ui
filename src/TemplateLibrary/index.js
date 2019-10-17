import _ from 'lodash';

/* React */
import React from 'react';
import PropTypes from 'prop-types';

/* Styling */
import styled from 'styled-components';
import { Input } from 'semantic-ui-react';

/* Internal */
import TemplateCard from './TemplateCard';
import { ImportComponent, UploadComponent, NewClauseComponent } from './Buttons';

const TemplatesWrapper = styled.div`
  font-family: 'IBM Plex Sans', sans-serif;
  position: relative;
  max-width: 355px;
  height: inherit;

  grid-template-areas:  "header"
                        "functionTemps";
  grid-template-rows:    55px auto;
  grid-template-columns: 100%;
`;

const Header = styled.div`
  position: relative;
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 800;
  font-size: 1em;
  margin-bottom: 10px;
  
  display: grid;
  grid-area: header;
  grid-template-columns: 1fr 1fr;
  grid-template-areas: "title imports";
`;

const HeaderTitle = styled.p`
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 800;
  font-size: 1em;
  text-align: left;
  color: ${props => props.color || null};
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
  margin-bottom: 10px;
  grid-area: functionTemps;
  display: grid;
  max-height: 106px;
`;

const ArrowWrapper = styled.div`
  position: absolute;
  text-align: center;
  z-index: 999;
  cursor: pointer;
  top: 2.5em;
  left: -1em;
  background-color: white;
  border: solid;
  border-radius: 50%;
  width: 2em;
  height: 2em;
  display: flex;
  border-color: #62c6c8;
  border-width: 0.1em;
  &:hover {
    background-color: #62c6c8;
  }
`;

const SearchInput = styled(Input)`
  margin: 5px 0 !important;
  width: 100% !important;
  max-height: 53px;
  border: 1px solid #B5BABE;
  border-radius: 3px;
  box-shadow: inset 0 0 4px 0 #ABABAB;
`;

const TemplateCards = styled.div`
  margin: 0 !important;
  width: 100%;
  height: ${props => props.tempsHeight || 'calc(100% - 54px)'};
  display: inherit;
  overflow-y: scroll !important;
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
    libraryProps: PropTypes.shape({
      ACTION_BUTTON: PropTypes.string,
      ACTION_BUTTON_BG: PropTypes.string,
      ACTION_BUTTON_BORDER: PropTypes.string,
      HEADER_TITLE: PropTypes.string,
      TEMPLATE_BACKGROUND: PropTypes.string,
      TEMPLATE_BORDER: PropTypes.string,
      TEMPLATE_DESCRIPTION: PropTypes.string,
      TEMPLATE_TITLE: PropTypes.string,
      TEMPLATES_HEIGHT: PropTypes.string,
    }),
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
    const libraryProps = this.props.libraryProps || Object.create(null);

    return (
      <TemplatesWrapper>
        <Header>
          <HeaderTitle color={libraryProps.HEADER_TITLE}>Clause Templates</HeaderTitle>
          <HeaderImports>
            {this.props.import
            && <ImportComponent importInput={this.props.import} />}
            {this.props.upload
            && <UploadComponent uploadInput={this.props.upload} />}
          </HeaderImports>
        </Header>
        <Functionality>
          <ArrowWrapper>fdfs</ArrowWrapper>
          <SearchInput className="icon" fluid icon="search" placeholder="Search..." onChange={this.onQueryChange} />
          {this.props.addTemp
          && <NewClauseComponent addTempInput={this.props.addTemp} />}
        </Functionality>
        <TemplateCards tempsHeight={libraryProps.TEMPLATES_HEIGHT} >
          {_.sortBy(filtered, ['name']).map(t => (
            <TemplateCard
              key={t.uri}
              addToCont={this.props.addToCont}
              template={t}
              handleViewTemplate={this.props.handleViewTemplate}
              className="templateCard"
              libraryProps={libraryProps}
            />
          ))}
        </TemplateCards>
      </TemplatesWrapper>
    );
  }
}

export default TemplateLibraryComponent;
