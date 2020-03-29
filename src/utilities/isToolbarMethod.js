const toolbarMethods = {
  paragraph: true,
  heading_one: true,
  heading_two: true,
  heading_three: true,
  bold: true,
  italic: true,
  code: true,
  block_quote: true,
  ul_list: true,
  ol_list: true,
  hyperlink: true,
};

const isToolbarMethod = inputType => toolbarMethods[inputType] || false;

export default isToolbarMethod;
