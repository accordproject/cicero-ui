/* React */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

/* Styling */
import { ClauseConditional } from './styles';

import * as conditionalIcon from '../icons/conditional';


/**
 * Component to render a clause
 * This will have an id property of the clauseid
 * @param {*} props
 */
const ConditionalAddition = (props) => {
  const [hoveringConditional, setHoveringConditional] = useState(false);

  const conditionalIconProps = {
    'aria-label': conditionalIcon.type,
    viewBox: '0 0 18 18',
    className: 'conditionalIcon',
    currentHover: props.currentHover,
    style: props.conditionalStyle,
    onMouseEnter: () => setHoveringConditional(true),
    onMouseLeave: () => setHoveringConditional(false),
    onClick: () => props.toggleConditional(props.slateKey)
  };

  return (
    <ClauseConditional {...conditionalIconProps}>
        {conditionalIcon.icon(hoveringConditional)}
    </ClauseConditional>
  );
};

ConditionalAddition.propTypes = {
  currentHover: PropTypes.bool,
  slateKey: PropTypes.string,
  conditionalStyle: PropTypes.obj,
  toggleConditional: PropTypes.func,
};

export default ConditionalAddition;
