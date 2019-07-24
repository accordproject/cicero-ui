const titleStart = input => input.lastIndexOf('/');
const titleEnd = input => input.indexOf('@');
const titleReducer = input => input.slice((titleStart(input) + 1), titleEnd(input));
const titleSpacer = input => input.replace(/-/g, ' ');
const titleCaps = input => input.toUpperCase();

const titleGenerator = (input) => {
  const reducedTitle = titleReducer(input);
  const spacedTitle = titleSpacer(reducedTitle);
  const finalTitle = titleCaps(spacedTitle);

  return finalTitle;
};

export default titleGenerator;
