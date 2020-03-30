import { Node } from 'slate';
import { isEqual } from 'lodash';

const inVariable = (editor) => {
  const { selection } = editor;

  // check if the user has selected more than just a variable
  if (!isEqual(selection.anchor.path, selection.focus.path)) return false;

  console.log('parent --- ', Node.parent(editor, editor.selection.anchor.path).type);
  return Node.parent(editor, editor.selection.anchor.path).type === 'variable';
};

export default inVariable;
