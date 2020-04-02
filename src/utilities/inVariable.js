import { Node } from 'slate';
import { isEqual } from 'lodash';

const inVariable = (editor) => {
  const { selection } = editor;

  if (!selection) return false;
  console.log('node --- ', Node.get(editor, editor.selection.focus.path));

  console.log('parent --- ', Node.parent(editor, editor.selection.focus.path));

  // check if the user has selected more than just a variable
  if (!isEqual(selection.anchor.path, selection.focus.path)) return false;
  return Node.parent(editor, editor.selection.focus.path).type === 'variable';
};

export default inVariable;
