import { Mark } from 'slate';
import Text from './text';

export default function AddParsingErrorMark(editor, node, err) {
  function getLineText(offset) {
    const lines = node.text.split('\n');
    return lines[offset];
  }

  function getLineLength(offset) {
    const lineText = getLineText(offset);
    return lineText ? lineText.length : 0;
  }

  function extractTextPosition(message) {
    if (!message) return null;

    const re = /invalid syntax at line (\d+) col (\d+)([^]*)/mi;
    const found = message.match(re);
    if (!found) return { message };

    let col = parseInt(found[2], 10);
    let line = parseInt(found[1], 10);

    if (col === 0 && line > 1) {
      line -= 1;
      col = getLineLength(line) - 1;
    }
    return {
      col,
      line,
      message,
    };
  }

  const parsedError = extractTextPosition(err.message);
  if (!parsedError) return;

  const lc = new Text(node.text);
  const charIndex = lc.indexForLocation({
    line: parsedError.line - 1,
    column: parsedError.col - 1,
  });

  editor
    .withoutSaving(() => {
      const textNode = node.getFirstText();
      editor.addMarkByKey(textNode.key, charIndex, Math.min(5, textNode.text.length), Mark.create({ data: null, type: 'error' }));
    });
}
