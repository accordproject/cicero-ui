/* React */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

/* Styling */
import { ClauseConditionalOverlay, ClauseConditionalTooltip } from './styles';

/**
 * Component to render an overlay and tooltip
 * The overlay acts as UI element over conditional variables
 * The tooltip will display what the conditional text will be changed to
 * This will have an key property of the Slate node
 * @param {*} props
 */
const ConditionalOverlay = (props) => {
  const [hoveringConditional, setHoveringConditional] = useState(false);
  const [tooltipWidth, setTooltipWidth] = useState(0);
  const [overlayWidth, setOverlayWidth] = useState(0);
  const tooltipRref = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    setTooltipWidth(tooltipRref.current ? tooltipRref.current.offsetWidth : 0);
    setOverlayWidth(overlayRef.current ? overlayRef.current.offsetWidth : 0);
  }, []);

  const conditionalOverlay = {
    ref: overlayRef,
    className: 'conditionalOverlay',
    currentHover: props.currentHover,
    style: props.conditionalStyle,
    overlayLength: props.nodeValue.position.popupWidth,
    overlayHeight: props.nodeValue.position.popupHeight,
    onMouseEnter: () => setHoveringConditional(true),
    onMouseLeave: () => setHoveringConditional(false),
    onClick: () => props.toggleConditional(props.slateKey),
  };

  const conditionalTooltip = {
    ref: tooltipRref,
    className: 'conditionalTooltip',
    currentHover: hoveringConditional,
    style: {
      ...props.conditionalStyle,
      left: props.conditionalStyle.left + ((overlayWidth - tooltipWidth) / 2),
    },
    tooltipHeight: props.nodeValue.position.popupHeight
      + (props.nodeValue.position.popupHeight * 0.5),
    caretTop: props.nodeValue.position.popupHeight,
    caretLeft: (tooltipWidth / 2),
  };
  const tooltipText = props.nodeValue.isFalse
    ? props.nodeValue.whenTrue
    : props.nodeValue.whenFalse;
  const tooltipInstructions = props.nodeValue.whenFalse === ''
    ? 'Hide text'
    : `Change to: "${tooltipText}"`;

  return (
    <div>
      <ClauseConditionalOverlay {...conditionalOverlay}/>
      <ClauseConditionalTooltip {...conditionalTooltip}>
        {tooltipInstructions}
      </ClauseConditionalTooltip>
    </div>
  );
};

ConditionalOverlay.propTypes = {
  currentHover: PropTypes.bool,
  slateKey: PropTypes.string,
  conditionalStyle: PropTypes.obj,
  toggleConditional: PropTypes.func,
  nodeValue: PropTypes.obj,
};

export default ConditionalOverlay;
