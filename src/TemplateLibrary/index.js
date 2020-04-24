import _ from 'lodash';

/* React */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

/* Styling */
import styled from 'styled-components';
import { Input } from 'semantic-ui-react';

/* Internal */
import isQueryMatch from '../utilities/isQueryMatch';
import TemplateCard from './Components/TemplateCard';
import { ImportComponent, UploadComponent, NewClauseComponent } from './Buttons';

/** classNames exposed for user-defined styling */
import {CustomStylesWrapper} from './customStyles';

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
`;

const HeaderImports = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
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
  border-radius: 3px;
  box-shadow: inset 0 0 4px 0 #ABABAB;
  &&&,
  &&& input,
  &&& input::placeholder,
  &&& input:focus {
    color: #FFFFFF !important;
    caret-color: #FFFFFF !important;
    background-color: transparent;
    opacity: 1 !important;
  },
  &&& input::selection {
    background-color: #cce2ff;
  }
`;

const TemplateCards = styled.div`
  margin: 0 !important;
  width: 100%;
  height: calc(100% - 54px);
  display: inherit;
  overflow-y: scroll !important;
`;

/**
 * A Template Library component that will display the filtered list of templates
 * and provide drag-and-drop functionality.
 */

const TemplateLibraryComponent = (props) => {
  const [query, setQuery] = useState([]);

  const onQueryChange = (e, input) => {
    const inputQuery = input.value.toLowerCase().trim().split(' ').filter(q => q.length);
    if (inputQuery !== query) {
      setQuery(inputQuery);
    }
  };

  const filterTemplates = (templates) => {
    let filtered = templates;
    if (query.length) {
      filtered = _.filter(filtered, t => isQueryMatch([t.name, t.displayName, t.uri], query));
    }

    return filtered;
  };

  /**
   * Render this React component
   * @return {*} the react component
   */
  const filtered = filterTemplates(props.templates);

  return (
    <CustomStylesWrapper>
      <TemplatesWrapper>
        <Header>
          <HeaderTitle className='templateListTitle' >Clause Templates</HeaderTitle>
          <HeaderImports>
            {props.import
            && <ImportComponent importInput={props.import} />}
            {props.upload
            && <UploadComponent uploadInput={props.upload} />}
          </HeaderImports>
        </Header>
        <Functionality>
          <SearchInput className="icon" fluid icon="search" placeholder="Search..." onChange={onQueryChange} className='templateSearchInput' />
          {props.addTemp
          && <NewClauseComponent addTempInput={props.addTemp} />}
        </Functionality>
        {filtered && filtered.length ? <TemplateCards tempsHeight={libraryProps.TEMPLATES_HEIGHT} >
          {_.sortBy(filtered, ['name']).map(t => (
            <TemplateCard
              key={t.uri}
              addToCont={props.addToCont}
              template={t}
              handleViewTemplate={props.handleViewTemplate}
              className="templateCard"
            />
          ))}
        </TemplateCards> : <p style={{ textAlign: 'center' }}>No results found</p>}
      </TemplatesWrapper>
      </CustomStylesWrapper>
  );
};

TemplateLibraryComponent.propTypes = {
  upload: PropTypes.func,
  import: PropTypes.func,
  addTemp: PropTypes.func,
  addToCont: PropTypes.func,
  handleViewTemplate: PropTypes.func,
  templates: PropTypes.arrayOf(PropTypes.object),
};

export default TemplateLibraryComponent;
