import _ from 'lodash';

const inVariable = (descendants) => {
  if (descendants.size !== 4) return false;
  const pattern = descendants.map(node => node.type).toArray();
  if (
    // pattern of nodes when in a variable is the following:
    // clause, paragraph, variable, undefined (text node has no type)
    _.isEqual(pattern, ['clause', 'paragraph', 'variable', undefined])
    && descendants.get(descendants.size - 1).object === 'text' // check that node with undefined type is text node
  ) return true;

  return false;
};

export default inVariable;
