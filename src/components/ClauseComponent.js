/* React */
import React from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';

/* Styling */
import * as styles from './styles';

/* Icons */
import * as deleteIcon from '../icons/trash';
// import * as addIcon from '../../assets/icons/add';

/* Actions */
import titleGenerator from './actions';

const deleteIconProps = {
  'aria-label': deleteIcon.type,
  width: '12px',
  height: '15px',
  viewBox: '0 0 12 15'
};

// const addIconProps = {
//   'aria-label': addIcon.type,
//   width: '18px',
//   height: '18px',
//   viewBox: '0 0 18 18'
// };

/**
 * Component to render a clause
 *
 * @param {*} props
 */
function ClauseComponent(props) {
  const clauseProps = props.clauseProps || Object.create(null);

  const errorsComponent = props.errors
    ? <Segment contentEditable={false} attached raised>{props.errors}</Segment>
    : null;

  console.log('props: ', props);

  return (
    <styles.ClauseWrapper
      clauseborder={clauseProps.CLAUSE_BORDER}
      clausebg={clauseProps.CLAUSE_BACKGROUND}
    >
      <styles.ClauseHeader headerfont={clauseProps.HEADER_FONT} >
        {titleGenerator(props.templateUri)} — SMART CLAUSE
      </styles.ClauseHeader>
      <styles.ClauseDelete
        {...deleteIconProps}
        clausedelete={clauseProps.CLAUSE_DELETE}
        onClick={clauseProps.CLAUSE_DELETE_FUNCTION(props.attributes['data-key'])}
      >
        {deleteIcon.icon()}
      </ styles.ClauseDelete>
      <styles.ClauseBody bodyfont={clauseProps.BODY_FONT} >
        {props.children}
      </styles.ClauseBody>
    {errorsComponent}
  </styles.ClauseWrapper>
  );
}

ClauseComponent.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
  templateUri: PropTypes.string.isRequired,
  attributes: PropTypes.PropTypes.shape({
    'data-key': PropTypes.string,
  }),
  errors: PropTypes.object,
  removeFromContract: PropTypes.func,
  clauseProps: PropTypes.shape({
    BODY_FONT: PropTypes.string,
    CLAUSE_BACKGROUND: PropTypes.string,
    CLAUSE_BORDER: PropTypes.string,
    CLAUSE_DELETE: PropTypes.string,
    CLAUSE_DELETE_FUNCTION: PropTypes.func,
    HEADER_FONT: PropTypes.string,
  }),
};

export default ClauseComponent;
