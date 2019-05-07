import { Mark } from 'slate';

export default function RemoveErrorMark(editor, node, length) {
  editor.withoutSaving(() => {
    editor.removeMarkByKey(node.getFirstText().key, 0, length, Mark.create({ type: 'error' }));
  });
}
