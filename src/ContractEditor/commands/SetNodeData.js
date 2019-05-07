/**
 * Updates the value of a key in a Node's metadata, turning off the undo history.
 * Note that you *cannot* chain these calls as the node's data will not have been updated.
 * @param {*} change the root change
 * @param {*} node the node to be updated
 * @param {*} newData the new data field
 */
export default function SetNodeData(editor, node, newData) {
  editor.withoutSaving(() => {
    editor.setNodeByKey(node.key, { data: newData });
  });
}
