export default function RemoveErrorMark(editor, node) {
  editor.withoutSaving(() => {
    node.filterDescendants().forEach((textNode) => {
      try {
        editor.removeMarkByKey(textNode.key, 0, textNode.text.length, 'error');
      } catch (err) { /* ignore */ }
    });
  });
}
