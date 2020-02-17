/* React */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';

/* Styling */
import * as S from './styles';

/* Icons */
import * as deleteIcon from '../icons/trash';
import * as editIcon from '../icons/edit';
import * as testIcon from '../icons/testIcon';

/* Actions */
import { titleGenerator, headerGenerator } from './actions';

/**
 * Component to render a clause
 * This will have an id property of the clauseid
 * @param {*} props
 */
function ClauseComponent(props) {
  const clauseProps = props.clauseProps || Object.create(null);
  const [hovering, setHovering] = useState(false);
  const [hoveringHeader, setHoveringHeader] = useState(false);

  const errorsComponent = props.errors
    ? <Segment contentEditable={false} attached raised>{props.errors}</Segment>
    : null;

  const title = titleGenerator(props.templateUri);
  const header = headerGenerator(props.templateUri, clauseProps.HEADER_TITLE);

  const iconWrapperProps = {
    currentHover: hovering,
    iconBg: clauseProps.CLAUSE_BACKGROUND
  };

  const testIconProps = {
    'aria-label': testIcon.type,
    width: '16px',
    height: '20px',
    viewBox: '0 0 16 20',
    clauseIconColor: clauseProps.CLAUSE_ICONS,
    onClick: () => clauseProps.CLAUSE_TEST_FUNCTION(props)
  };

  const editIconProps = {
    'aria-label': editIcon.type,
    width: '19px',
    height: '19px',
    viewBox: '0 0 19 19',
    clauseIconColor: clauseProps.CLAUSE_ICONS,
    onClick: () => clauseProps.CLAUSE_EDIT_FUNCTION(props)
  };

  const deleteIconProps = {
    'aria-label': deleteIcon.type,
    width: '15px',
    height: '19px',
    viewBox: '0 0 12 15',
    clauseIconColor: clauseProps.CLAUSE_ICONS,
    onClick: () => clauseProps.CLAUSE_DELETE_FUNCTION(props)
  };

  return (
    <S.ClauseWrapper
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      id={props.clauseId}
      draggable="true"
    >
      <S.ClauseBackground
        clauseborder={clauseProps.CLAUSE_BORDER}
        clausebg={clauseProps.CLAUSE_BACKGROUND}
        contentEditable={false}
      />

      <S.ClauseHeader
        currentHover={hovering}
        headerfont={clauseProps.HEADER_FONT}
        headercolor={clauseProps.HEADER_COLOR}
        headerbg={clauseProps.CLAUSE_BACKGROUND}
        contentEditable={false}
      >
        {(hoveringHeader && header.length > 54)
          && <S.HeaderToolTipWrapper>
            <S.HeaderToolTip>
              {title + clauseProps.HEADER_TITLE}
            </S.HeaderToolTip>
          </S.HeaderToolTipWrapper>
        }
        <S.HeaderToolTipText
          onMouseEnter={() => setHoveringHeader(true)}
          onMouseLeave={() => setHoveringHeader(false)}
        >
          {header}
        </S.HeaderToolTipText>
      </S.ClauseHeader>
      { !props.readOnly
        && <>
          <S.TestWrapper {...iconWrapperProps}>
            <S.ClauseIcon {...testIconProps}>
              {testIcon.icon()}
            </ S.ClauseIcon>
          </S.TestWrapper>
          <S.EditWrapper {...iconWrapperProps}>
            <S.ClauseIcon {...editIconProps}>
              {editIcon.icon()}
            </ S.ClauseIcon>
          </S.EditWrapper>
          <S.DeleteWrapper {...iconWrapperProps}>
            <S.ClauseIcon {...deleteIconProps}>
              {deleteIcon.icon()}
            </ S.ClauseIcon>
          </S.DeleteWrapper>
        </>
      }
      <S.ClauseBody
        bodyfont={clauseProps.BODY_FONT}
        variablecolor={clauseProps.VARIABLE_COLOR}
        conditionalcolor={clauseProps.CONDITIONAL_COLOR}
        computedcolor={clauseProps.COMPUTED_COLOR}
      >
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
  readOnly: PropTypes.bool,
  removeFromContract: PropTypes.func,
  clauseId: PropTypes.string,
  clauseProps: PropTypes.shape({
    BODY_FONT: PropTypes.string,
    CLAUSE_BACKGROUND: PropTypes.string,
    CLAUSE_BORDER: PropTypes.string,
    CLAUSE_ICONS: PropTypes.string,
    CLAUSE_DELETE_FUNCTION: PropTypes.func,
    CLAUSE_EDIT_FUNCTION: PropTypes.func,
    CLAUSE_TEST_FUNCTION: PropTypes.func,
    COMPUTED_COLOR: PropTypes.string,
    HEADER_COLOR: PropTypes.string,
    HEADER_FONT: PropTypes.string,
    HEADER_TITLE: PropTypes.string,
    VARIABLE_COLOR: PropTypes.string,
    CONDITIONAL_COLOR: PropTypes.string,
  }),
};

export default ClauseComponent;
