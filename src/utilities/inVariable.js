const inVariable = (value) => {
  // check if the user has selected more than just a variable
  if (value.selection.start.key !== value.selection.end.key) return false;

  const descendants = value.document.getDescendantsAtRange(value.selection);
  // check that the selection contains exactly one variable node
  if (descendants.filter(d => d.type === 'variable').size === 1) return true;

  return false;
};

export default inVariable;
