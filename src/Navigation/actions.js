export const isClause = input => input === 'clause';
export const isHeadingOne = input => input === 'heading_one';
export const isHeadingTwo = input => input === 'heading_two';
export const isHeadingThree = input => input === 'heading_three';

const truncateHeading = (heading, length) => ((heading.length > length)
  ? `${heading.substring(0, length)}...`
  : heading);


export const truncateHeader = ({ type, text }) => {
  if (isClause(type)) return truncateHeading(text, 20);
  if (isHeadingOne(type)) return truncateHeading(text, 22);
  if (isHeadingTwo(type)) return truncateHeading(text, 18);
  if (isHeadingThree(type)) return truncateHeading(text, 14);
  return 'Error!';
};
