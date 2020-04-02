import isHotkey from 'is-hotkey';
import { Transforms, Node, Editor } from 'slate';
import inVariable from '../utilities/inVariable';

import isToolbarMethodHelper from '../utilities/isToolbarMethod';

// export const isEditable = ((editor, code) => {
//   const { selection } = editor;
//   console.log('EDITOR - ', editor);
//   const inVariable = inVariableHelper(editor);

//   console.log(`${code} - in variable ${inVariable}`);

//   if (inVariable && isToolbarMethodHelper(code)) {
//     return false;
//   }

//   if (code === 'backspace') {
//     if (inVariable) {
//       // if we hit backspace and are at the zeroth
//       // position of a variable prevent deleting the char
//       // that precedes the variable
//       return anchor.offset > 0;
//     }

//     // if we hit backspace and are outside of a variable
//     // allow deleting the last char of the variable
//     // IFF the variable has more than 1 char
//     // AND IFF the selection does not include anything outside the variable
//     const prev = value.document.getPreviousSibling(anchor.path);
//     return prev && anchor.offset === 0
//         && prev.type === 'variable'
//         && prev.getFirstText().text.length > 1
//         && value.selection.start.key === value.selection.end.key;
//   }

//   if (!inVariable && code === 'input') {
//     // if are outside of a variable allowing
//     // extending the variable
//     const prev = value.document.getPreviousSibling(anchor.path);

//     const extendingVar = prev && anchor.offset === 0 && prev.type === 'variable';
//     if (extendingVar) {
//       editor.moveToEndOfNode(prev);
//     }
//     return extendingVar;
//   }

//   // disallow enter within variables!
//   return code !== 'enter' && inVariable;
// });

/* eslint no-param-reassign: 0 */
const withVariables = editor => editor;

export const isEditable = (lockText, editor, event) => {
  if (!lockText || !editor.isInsideClause()) return true;
  const { selection } = editor;
  const textLength = Node.get(editor, editor.selection.focus.path).text.length;
  if (inVariable(editor)) {
    if (isHotkey('backspace', event)) {
      // Do not allow user to delete variable if only 1 char left
      if (textLength === 1) {
        return false;
      }

      // if we hit backspace and are at the zeroth
      // position of a variable prevent deleting the char
      // that precedes the variable
      return selection.anchor.offset > 0;
    }

    // Do not allow user to type at end of variable
    // because that change will happen outside variable
    if (textLength === selection.focus.offset) return false;
  }

  // if (inVariable(editor) && selection.anchor.offset === 0) {
  //   // if at the 0th index of the variable, move to start of variable
  //   // otherwise our change will be applied outside of the variable
  //   Transforms.move(editor, { edge: 'start' });
  // }
  return inVariable(editor);
};

export default withVariables;
