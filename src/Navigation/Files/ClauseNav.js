import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { setCurrentEditorAction } from '../../actions/appActions';
import SubHeading from './SubHeadingBtn';

const ClauseNav = (props) => {
  const {
    clauseTemplateId, onClauseClick, src, showExpandedClause, setCurrentEditor
  } = props;

  const [clauseOpen, setClauseOpen] = useState(false);


  return (
    <React.Fragment>
      <SubHeading
        onClick={() => {
          onClauseClick(clauseTemplateId);
          setClauseOpen(!clauseOpen);
        }}
      >
        <Icon name={clauseOpen ? 'caret down' : 'caret right'} style={{ textDecoration: 'none' }} />
        {src}
      </SubHeading>
      {
      showExpandedClause[clauseTemplateId]
      && <React.Fragment>
        <SubHeading onClick={() => setCurrentEditor(clauseTemplateId, 'clauseMetadata')}>Metadata</SubHeading>
        <SubHeading onClick={() => setCurrentEditor(clauseTemplateId, 'clauseTemplateGrammar')}>Clause Template</SubHeading>
        <SubHeading onClick={() => setCurrentEditor(clauseTemplateId, 'clauseExampleText')}>Example Text</SubHeading>
        <SubHeading onClick={() => setCurrentEditor(clauseTemplateId, 'clauseModel')}>Model</SubHeading>
        <SubHeading onClick={() => setCurrentEditor(clauseTemplateId, 'clauseLogic')}>Logic</SubHeading>
      </React.Fragment>
      }
    </React.Fragment>);
};

ClauseNav.propTypes = {
  clauseTemplateId: PropTypes.string.isRequired,
  onClauseClick: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
  showExpandedClause: PropTypes.object.isRequired,
  setCurrentEditor: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  setCurrentEditor: (clauseTemplateId, editor) => {
    dispatch(setCurrentEditorAction(clauseTemplateId, editor));
  },
});

export default connect(null, mapDispatchToProps)(ClauseNav);
