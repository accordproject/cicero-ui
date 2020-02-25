/* React */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

/* Styling */
import { ClauseConditional, ClauseConditionalTooltip } from './styles';

import * as conditionalIcon from '../icons/conditional';

/**
 * Component to render an addition symbol for an empty conditional
 * This will have an key property of the Slate node
 * @param {*} props
 */
const ConditionalAddition = (props) => {
  const [hoveringConditional, setHoveringConditional] = useState(false);
  const [tooltipWidth, setTooltipWidth] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    setTooltipWidth(ref.current ? ref.current.offsetWidth : 0);
  }, []);

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

  const conditionalTooltip = {
    ref,
    currentHover: hoveringConditional,
    className: 'conditionalTooltip',
    style: {
      ...props.conditionalStyle,
      top: props.conditionalStyle.top - 26,
      left: props.conditionalStyle.left - (tooltipWidth / 2),
    },
    somethingLength: props.nodeValue.position.popupWidth,
    somethingHeight: props.nodeValue.position.popupHeight
      + (props.nodeValue.position.popupHeight * 0.5),
    caretTop: props.nodeValue.position.popupHeight,
    caretLeft: (tooltipWidth / 2),
  };

  return (
    <div>
      <ClauseConditionalTooltip {...conditionalTooltip}>
        Show text: "{props.nodeValue.whenTrue}"
      </ClauseConditionalTooltip>
      <ClauseConditional {...conditionalIconProps}>
          {conditionalIcon.icon(hoveringConditional)}
      </ClauseConditional>
    </div>
  );
};

ConditionalAddition.propTypes = {
  currentHover: PropTypes.bool,
  slateKey: PropTypes.string,
  nodeValue: PropTypes.obj,
  conditionalStyle: PropTypes.obj,
  toggleConditional: PropTypes.func,
};

export default ConditionalAddition;
