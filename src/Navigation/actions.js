const isClause = input => input === 'clause';
const isHeadingOne = input => input === 'heading_one';
const isHeadingTwo = input => input === 'heading_two';
const isHeadingThree = input => input === 'heading_three';

const truncateHeading = (heading, length) => ((heading.length > length)
  ? `${heading.substring(0, length)}...` : heading);


export const truncateHeader = ({ type, text }) => {
  if (isClause(type)) return truncateHeading(text, 22);
  if (isHeadingOne(type)) return truncateHeading(text, 22);
  if (isHeadingTwo(type)) return truncateHeading(text, 18);
  if (isHeadingThree(type)) return truncateHeading(text, 14);
  return 'Error!';
};
