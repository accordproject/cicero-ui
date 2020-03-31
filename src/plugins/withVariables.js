import inVariableHelper from '../utilities/inVariable';
import isToolbarMethodHelper from '../utilities/isToolbarMethod';

// export const isEditable = ((editor, code) => {
//   const { selection } = editor;
//   console.log('EDITOR - ', editor);
//   const inVariable = inVariableHelper(editor);

//   console.log(`${code} - in variable ${inVariable}`);

//   if (inVariable && isToolbarMethodHelper(code)) {
//     return false;
//   }

//   // if (code === 'backspace') {
//   //   if (inVariable) {
//   //     // if we hit backspace and are at the zeroth
//   //     // position of a variable prevent deleting the char
//   //     // that precedes the variable
//   //     return anchor.offset > 0;
//   //   }

//   //   // if we hit backspace and are outside of a variable
//   //   // allow deleting the last char of the variable
//   //   // IFF the variable has more than 1 char
//   //   // AND IFF the selection does not include anything outside the variable
//   //   const prev = value.document.getPreviousSibling(anchor.path);
//   //   return prev && anchor.offset === 0
//   //       && prev.type === 'variable'
//   //       && prev.getFirstText().text.length > 1
//   //       && value.selection.start.key === value.selection.end.key;
//   // }

//   // if (!inVariable && code === 'input') {
//   //   // if are outside of a variable allowing
//   //   // extending the variable
//   //   const prev = value.document.getPreviousSibling(anchor.path);

//   //   const extendingVar = prev && anchor.offset === 0 && prev.type === 'variable';
//   //   if (extendingVar) {
//   //     editor.moveToEndOfNode(prev);
//   //   }
//   //   return extendingVar;
//   // }

//   // disallow enter within variables!
//   return code !== 'enter' && inVariable;
// });

const withVariables = editor => editor;

export default withVariables;
