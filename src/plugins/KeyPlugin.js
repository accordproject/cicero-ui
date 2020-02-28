import {
  transformParagraphToList,
  isSelectionList,
  transformListToParagraph,
  transformListSwap,
  currentList,
} from "@accordproject/markdown-editor/dist/FormattingToolbar/toolbarMethods";
/**
 * This is a plugin into the markdown editor to handle key shortcuts
 */
function KeyPlugin() {
  var name = "keyPlugin";

  /**
   * @param {Event} event
   * @param {Editor} editor
   * @param {Function} next
   */

//Method to handle bullet points
  let handleList = (event, editor, type) => {
    if (event.ctrlKey) {
      console.log(type);
      if (isSelectionList(editor.value)) {
        if (currentList(editor.value).type === type) {
          return transformListToParagraph(editor, type);
        } else {
          return transformListSwap(editor, type, editor.value);
        }
      } else {
        return transformParagraphToList(editor, type);
      }
    }
  };

  //method to handle keys
  var onKeyDown = function onKeyDown(event, editor, next) {
    switch (event.key.toLowerCase()) {
      case "b":
        if (event.ctrlKey) {
          return editor.toggleMark("bold");
        }
      case "i":
        if (event.ctrlKey) {
          return editor.toggleMark("italic");
        }
      case "c":
        if (event.ctrlKey && event.altKey) {
          return editor.toggleMark("code");
        }
      case "q":
        if (event.ctrlKey) {
          return editor.wrapBlock("block_quote");
        }
      case "&":
        return handleList(event, editor, "ol_list");
      case "*":
        return handleList(event, editor, "ul_list");
      default:
        return next();
    }
  };

  return {
    name: name,
    onKeyDown: onKeyDown
  };
}

export default KeyPlugin;
