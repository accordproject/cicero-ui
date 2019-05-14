export default function ToggleBlockTypeChange(editor, type) {
  const isType = editor.value.blocks.some(block => block.type === type);
  editor.setBlocks(isType ? 'paragraph' : type);
}
