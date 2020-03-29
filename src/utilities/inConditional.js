import _ from 'lodash';

const inConditional = (descendants) => {
  if (descendants.size !== 4) return false;
  const pattern = descendants.map(node => node.type).toArray();
  if (
    // pattern of nodes when in a conditional is the following:
    // clause, paragraph, conditional, undefined (text node has no type)
    _.isEqual(pattern, ['clause', 'paragraph', 'conditional', undefined])
    && descendants.get(descendants.size - 1).object === 'text' // check that node with undefined type is text node
  ) return true;

  return false;
};

export default inConditional;
