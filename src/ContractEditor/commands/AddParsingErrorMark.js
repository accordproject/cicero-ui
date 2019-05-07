import { Mark } from 'slate';
import Text from '../utilities/text';

export default function AddParsingErrorMark(editor, node, err) {
  function getLineText(offset) {
    const lines = node.text.split('\n');
    return lines[offset];
  }

  function getLineLength(offset) {
    return getLineText(offset).length;
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
      editor.addMarkByKey(node.getFirstText().key, charIndex, node.text.length, Mark.create({ type: 'error' }));
    });
}
