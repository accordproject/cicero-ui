const titleStart = input => input.lastIndexOf('/');
const titleEnd = input => input.indexOf('@');
const titleReducer = input => input.slice((titleStart(input) + 1), titleEnd(input));
const titleSpacer = input => input.replace(/-/g, ' ');
const titleCaps = input => input.toUpperCase();

export const titleGenerator = (input) => {
  const reducedTitle = titleReducer(input);
  const spacedTitle = titleSpacer(reducedTitle);
  const finalTitle = titleCaps(spacedTitle);
  return finalTitle;
};

export const headerGenerator = (templateTitle, inputTitle) => {
  const title = titleGenerator(templateTitle);
  const header = inputTitle ? (title + inputTitle) : title;
  const truncatedTitle = ((header.length > 54) ? (`${header.slice(0, 54)}...`) : header);
  return truncatedTitle;
};

/**
 * Collect all conditional variables and return them
 * in an object indexed by their slate keys
 *
 * @param {Node} node the clause node being rendered
 * @return {Object} object with slate key as keys and
 *    the true and false values in an object as a value
 */
export const findConditionals = node => ({
  ...(node.type === 'conditional' ? {
    [node.key]: {
      whenTrue: node.data.get('whenTrue'),
      whenFalse: node.data.get('whenFalse')
    }
  } : {}),
  ...(node.nodes || [])
    .map(findConditionals)
    .reduce((props, node) => ({ ...props, ...node }), {})
});
