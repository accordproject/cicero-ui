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
  // console.log('props in Conditional', props.children.props.node);

  const conditional = {
    id: children.props.node.data.id,
    whenTrue: children.props.node.data.whenTrue,
    whenFalse: children.props.node.data.whenFalse,
    isFalse: (
      children.props.node.children[0].text === children.props.node.data.whenFalse
    ),
  };

  // const toggleConditional = (key) => {
  //   const newInlineJSON = {
  //     object: 'inline',
  //     type: 'conditional',
  //     data: {
  //       id: conditional.id,
  //       whenTrue: conditional.whenTrue,
  //       whenFalse: conditional.whenFalse
  //     },
  //     nodes: [
  //       {
  //         object: 'text',
  //         text: node.text === conditional.whenTrue
  //           ? conditional.whenFalse
  //           : conditional.whenTrue,
  //         marks: []
  //       }
  //     ]
  //   };
  //   const newInlineSlate = Inline.fromJSON(newInlineJSON);

  //   props.editor.replaceNodeByKey(key, newInlineSlate);
  // };

  const conditionalProps = {
    id: conditional.id,
    className: children.props.node.children[0].text === '' ? '' : 'conditional',
    onMouseEnter: () => setHovering(true),
    onMouseLeave: () => setHovering(false),
    // onClick: () => { toggleConditional(node.key); },
    ...attributes,
  };

  const conditionalSwitchProps = {
    ...conditional,
    currentHover: hovering,
  };

  return (
    <>
        {/* { !props.readOnly && node.text !== ''
        && <ConditionalSwitch {...conditionalSwitchProps} />
        } */}
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
