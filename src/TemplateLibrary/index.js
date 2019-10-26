import _ from 'lodash';

/* React */
import React, { useState } from 'react';
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

const SearchInput = styled(Input)`
  margin: 5px 0 !important;
  width: 100% !important;
  max-height: 40px;
  border: 1px solid #939EBA;
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

const TemplateLibraryComponent = (props) => {
  const [query, setQuery] = useState('');

  const onQueryChange = (e, input) => {
    const inputQuery = input.value.toLowerCase().trim();
    if (inputQuery !== query) {
      setQuery(inputQuery);
    }
  };

  const filterTemplates = (templates) => {
    let filteredTemplates = templates;
    if (query.length) {
      const regex = new RegExp(query, 'i');
      filteredTemplates = _.filter(filteredTemplates, t => (
        t.name.match(regex) || t.uri.match(regex)
      ));
    }
    return filteredTemplates;
  };

  /**
   * Render this React component
   * @return {*} the react component
   */
  const filtered = filterTemplates(props.templates);
  const libraryProps = props.libraryProps || Object.create(null);

  return (
      <TemplatesWrapper>
        <Header>
          <HeaderTitle color={libraryProps.HEADER_TITLE}>Clause Templates</HeaderTitle>
          <HeaderImports>
            {props.import
            && <ImportComponent importInput={props.import} />}
            {props.upload
            && <UploadComponent uploadInput={props.upload} />}
          </HeaderImports>
        </Header>
        <Functionality>
          <SearchInput className="icon" fluid icon="search" placeholder="Search..." onChange={onQueryChange} />
          {props.addTemp
          && <NewClauseComponent addTempInput={props.addTemp} />}
        </Functionality>
        <TemplateCards tempsHeight={libraryProps.TEMPLATES_HEIGHT} >
          {_.sortBy(filtered, ['name']).map(t => (
            <TemplateCard
              key={t.uri}
              addToCont={props.addToCont}
              template={t}
              handleViewTemplate={props.handleViewTemplate}
              className="templateCard"
              libraryProps={libraryProps}
            />
          ))}
        </TemplateCards>
      </TemplatesWrapper>
  );
};

TemplateLibraryComponent.propTypes = {
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
};

export default TemplateLibraryComponent;
