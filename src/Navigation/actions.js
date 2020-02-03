const truncateHeading = (heading, length) => ((heading && (heading.length > length))
  ? `${heading.substring(0, length)}...` : heading || '');

export const truncateHeader = ({ type, text }) => {
  switch (type) {
    case 'clause':
      return truncateHeading(text, 20);
    case 'heading_one':
      return truncateHeading(text, 22);
    case 'heading_two':
      return truncateHeading(text, 18);
    case 'heading_three':
      return truncateHeading(text, 14);
    default:
      return 'Error!';
  }
};
