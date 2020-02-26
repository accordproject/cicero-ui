/* React */
import React, { useState } from 'react';
import { Inline } from 'slate';
import PropTypes from 'prop-types';

/* Components */
import ConditionalSwitch from './ConditionalSwitch';

/**
 * Component to render an inline conditional node
 * This will have an id property of the Slate key
 * @param {*} props
 */
const Conditional = (props) => {
  const { attributes, children, node } = props;
  const [hovering, setHovering] = useState(false);
  const conditional = {
    whenTrue: node.data.get('whenTrue'),
    whenFalse: node.data.get('whenFalse'),
    isFalse: node.text === node.data.get('whenFalse'),
  };

  const toggleConditional = (key) => {
    const newInlineJSON = {
      object: 'inline',
      type: 'conditional',
      data: {
        id: 'forceMajeure',
        whenTrue: conditional.whenTrue,
        whenFalse: conditional.whenFalse
      },
      nodes: [
        {
          object: 'text',
          text: node.text === conditional.whenTrue
            ? conditional.whenFalse
            : conditional.whenTrue,
          marks: []
        }
      ]
    };
    const newInlineSlate = Inline.fromJSON(newInlineJSON);

    props.editor.replaceNodeByKey(key, newInlineSlate);
  };

  const conditionalProps = {
    id: node.data.get('id'),
    className: 'conditional',
    onMouseEnter: () => setHovering(true),
    onMouseLeave: () => setHovering(false),
    onClick: () => { toggleConditional(node.key); },
    ...attributes,
  };

  const conditionalSwitchProps = {
    ...conditional,
    currentHover: hovering,
  };

  return (
    <>
        { !props.readOnly && node.text !== ''
        && <ConditionalSwitch {...conditionalSwitchProps} />
        }
        <span {...conditionalProps}>{children}</span>
    </>
  );
};

Conditional.propTypes = {
  attributes: PropTypes.PropTypes.shape({
    'data-key': PropTypes.string,
  }),
  children: PropTypes.arrayOf(
    PropTypes.object
  ).isRequired,
  editor: PropTypes.any,
  node: PropTypes.shape({
    key: PropTypes.string,
    data: PropTypes.obj,
    text: PropTypes.string,
  }),
  readOnly: PropTypes.bool,
};

export default Conditional;
