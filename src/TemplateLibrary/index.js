import _ from 'lodash';

/* React */
import React from 'react';
import PropTypes from 'prop-types';

/* Styling */
import styled from 'styled-components';
import { Button, Card, Input } from 'semantic-ui-react';

/* Internal */
import TemplateCard from './TemplateCard';

const TemplatesWrapper = styled.div`
  position: relative;
  margin: 16px 16px;
  font-family: 'IBM Plex Sans', sans-serif;
  max-width: 442px;
`;

const Header = styled.div`
  position: relative;
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 800;
  font-size: 16px;
  max-width: 442px;
`;

const UploadImport = styled.a`
  position: relative;
  font-weight: 300;
  float: right;
  margin: 0 16px 0 0;
  text-decoration: underline;
  font-size: 14px;
  color: #76777D;
`;

const Functionality = styled.div`
  margin: 16px 0;
  max-width: 430px;
  font-family: 'IBM Plex Sans', sans-serif;
`;

const SearchInput = styled(Input)`
  margin: 0 20px 0 0;
  width: 136px;
  float: left;
`;

const AddClauseBtn = styled(Button)`
  max-width: 272px;
`;

const TemplateCards = styled(Card.Group)`
  margin: 20px 0 0 0;
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
      <div>
        <TemplatesWrapper>
        <Header>
            Clause Templates
            {this.props.import
            && <UploadImport
              onClick={this.props.import}
              href="javascript:void(0);"
              className="importButton"
              >
              Import from VS Code
            </UploadImport>}
            {this.props.upload
            && <UploadImport
              onClick={this.props.upload}
              href="javascript:void(0);"
              className="uploadButton"
              >
              Upload CTA file
            </UploadImport>}
          </Header>
          <Functionality>
            <SearchInput className="icon" fluid icon="search" placeholder="Search..." onChange={this.onQueryChange} />
            <AddClauseBtn
              content="New Clause Template"
              color="blue"
              fluid
              icon="plus"
              id="addClauseBtn"
              onClick={this.props.addTemp}
              className="addTemplateButton"
            />
          </Functionality>
          <TemplateCards>
            {
            _.sortBy(filtered, ['name']).map(t => (
              <TemplateCard
                key={t.uri}
                addToCont={this.props.addToCont}
                template={t}
                handleViewTemplate={this.handleViewTemplate}
                className="templateCard"
              />
            ))
          }
          </TemplateCards>
        </TemplatesWrapper>
      </div>
    );
  }
}

export default TemplateLibraryComponent;
