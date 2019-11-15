import React from 'react';

/**
 * A plugin for a computed
 */
function ComputedPlugin() {
  const name = 'computed';

  /**
   * Augment the base schema with the computed type
   * @param {*} schema
   */
  const augmentSchema = ((schema) => {
    const additions = {
      inlines: {
        computed: {
          nodes: [{
            match: { object: 'text' }
          }]
        },
      },
    };

    const newSchema = JSON.parse(JSON.stringify(schema));
    newSchema.inlines = { ...newSchema.inlines, ...additions.inlines };
    newSchema.document.nodes[0].match.push({ type: 'computed' });
    newSchema.blocks.paragraph.nodes[0].match.push({ type: 'computed' });
    return newSchema;
  });

  /**
   * Do not allow computed fields to be edited
   *
   * @param {*} value - the Slate value
   * @param {string} code - the key code
   */
  const isEditable = ((value, code) => {
    const inComputed = value.inlines.size > 0 && value.inlines.some(node => node.type === 'computed');
    if (inComputed) {
      return false;
    }
  });

  /**
   * Render a Slate inline.
   *
   * @param {Object} props
   * @param {Editor} editor
   * @param {Function} next
   * @return {Element}
   */
  function renderInline(props, editor, next) {
    const { attributes, children, node } = props;
    const id = node.data.get('id');

    switch (node.type) {
      case 'computed': {
        // @ts-ignore
        return <span id={id} {...attributes} className='computed'>
            {children}
          </span>;
      }

      default: {
        return next();
      }
    }
  }

  return {
    name,
    augmentSchema,
    isEditable,
    renderInline,
  };
}

export default ComputedPlugin;
