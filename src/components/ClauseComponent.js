/* React */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';

/* Styling */
import * as S from './styles';

/* Icons */
import * as deleteIcon from '../icons/trash';

/* Actions */
import titleGenerator from './actions';

const deleteIconProps = {
  'aria-label': deleteIcon.type,
  width: '12px',
  height: '15px',
  viewBox: '0 0 12 15'
};

/**
 * Component to render a clause
 * This will have an id property of the clauseid
 * @param {*} props
 */
function ClauseComponent(props) {
  const clauseProps = props.clauseProps || Object.create(null);
  const [hovering, setHovering] = useState(false);

  const errorsComponent = props.errors
    ? <Segment contentEditable={false} attached raised>{props.errors}</Segment>
    : null;

  return (
    <S.ClauseWrapper
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      id={props.clauseId}
    >
      <S.ClauseBackground
        clauseborder={clauseProps.CLAUSE_BORDER}
        clausebg={clauseProps.CLAUSE_BACKGROUND}
      />

      <S.ClauseHeader
        currentHover={hovering}
        headerfont={clauseProps.HEADER_FONT}
      >
        {titleGenerator(props.templateUri)} — SMART CLAUSE
      </S.ClauseHeader>
      <S.ClauseDelete
        {...deleteIconProps}
        currentHover={hovering}
        clausedelete={clauseProps.CLAUSE_DELETE}
        onClick={() => clauseProps.CLAUSE_DELETE_FUNCTION(props)}
      >
        {deleteIcon.icon()}
      </ S.ClauseDelete>
      <S.ClauseBody bodyfont={clauseProps.BODY_FONT} >
        {props.children}
      </S.ClauseBody>
    {errorsComponent}
  </S.ClauseWrapper>
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
  clauseId: PropTypes.string,
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
