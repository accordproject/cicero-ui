import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, Card, Input } from 'semantic-ui-react';

// import CustomLoader from '../CustomLoader';
import TemplateCard from './TemplateCard';
// import TemplateDetails from './TemplateDetails';

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
class TemplateLibrary extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      loading: false,
      templateUri: false,
    };
    this.onQueryChange = this.onQueryChange.bind(this);
    this.handleHideTemplate = this.handleHideTemplate.bind(this);
    this.handleViewTemplate = this.handleViewTemplate.bind(this);
  }

  componentDidMount() {
    // this.fetchTemplates();
  }

  onQueryChange(e, el) {
    this.setState({ query: el.value });
  }

  handleViewTemplate(templateUri) {
    this.setState({ templateUri });
  }

  handleHideTemplate() {
    this.setState({ templateUri: false });
  }

  fetchTemplates() {
    if (this.props.templates.length > 0) return;

    this.setState({ loading: true });
    // templateMethods.fetchTemplates()
    //   .then((templates) => {
    //     this.setState({ loading: false, templates });
    //   })
    //   .catch((error) => {
    //     this.setState({ error, loading: false });
    //   });
  }

  /**
   * Called by React when the component has been mounted into the DOM tree
   */

  /**
   * Render this React component
   * @return {*} the react component
   */
  render() {
    let { templates } = this.props;
    if (this.state.query.length) {
      const query = new RegExp(this.state.query, 'i');
      templates = templates.filter(t => t.name.match(query));
    }
    return (
      <div>
        <TemplatesWrapper>
          {/* <CustomLoader active={this.state.loading} /> */}
          <Header>
            Smart Clauses
            {this.props.import
            && <UploadImport
              onClick={this.props.import}
              href="javascript:void(0);"
              >
              Import from VS Code
            </UploadImport>}
            {this.props.upload
            && <UploadImport
              onClick={this.props.upload}
              href="javascript:void(0);"
              >
              Upload CTA file
            </UploadImport>}
          </Header>
          <Functionality>
            <SearchInput className="icon" fluid icon="search" placeholder="Search..." onChange={this.onQueryChange} />
            <AddClauseBtn
              content="New Smart Clause Template"
              color="blue"
              fluid
              icon="plus"
              id="addClauseBtn"
              onClick={this.props.addTemp}
            />
          </Functionality>
          <TemplateCards>
            {
            _.sortBy(templates, ['name']).map(t => (
              <TemplateCard
                key={t.uri}
                addToCont={this.props.addToCont}
                template={t}
                handleViewTemplate={this.handleViewTemplate}
              />
            ))
          }
          </TemplateCards>
          {/* <TemplateDetails
          btnText="Add to Contract"
          onClick={() => this.props.handleAddClause(this.state.templateUri)}
          onClose={this.handleHideTemplate}
          open={!!this.state.templateUri}
          templates={this.props.templates}
          templateUri={this.state.templateUri}
        /> */}
        </TemplatesWrapper>
      </div>
    );
  }
}

/**
 * The property types for this component
 */
TemplateLibrary.propTypes = {
  upload: PropTypes.func,
  import: PropTypes.func,
  addTemp: PropTypes.func,
  addToCont: PropTypes.func,
  templates: PropTypes.arrayOf(PropTypes.object),
};

export default TemplateLibrary;