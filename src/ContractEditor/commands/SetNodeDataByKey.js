/**
 * Updates the value of a key in a Node's metadata, turning off the undo history.
 * Note that you *cannot* chain these calls as the node's data will not have been updated.
 * @param {*} change the root change
 * @param {*} node the node to be updated
 * @param {*} key the key in the node's 'data' field to update
 * @param {*} value the new value
 */
export default function SetNodeDataKey(editor, node, key, value) {
  // clone the existing data, with an updated key/value
  const newData = node.data.set(key, value);
  editor.withoutSaving(() => {
    editor.setNodeByKey(node.key, { data: newData });
  });
}
