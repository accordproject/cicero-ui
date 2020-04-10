export const CLAUSE = 'clause';
const VARIABLE = 'variable';
const CONDITIONAL = 'conditional';

const INLINES = { [VARIABLE]: true };
const VOIDS = {};

/* eslint no-param-reassign: 0 */
const withClauseSchema = (editor) => {
  const { isVoid, isInline } = editor;
  editor.isVoid = element => (VOIDS[element.type] || isVoid(element));
  editor.isInline = element => (INLINES[element.type] || isInline(element));

  return editor;
};

export default withClauseSchema;
