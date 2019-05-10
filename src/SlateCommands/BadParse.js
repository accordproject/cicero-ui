import SetNodeData from './SetNodeData';
import AddParsingErrorMark from './AddParsingErrorMark';

export default function BadParse(editor, node, err) {
  const newData = node.data.asMutable();
  newData.set('json', null);
  newData.set('valid', false);
  newData.set('error', err.message);
  editor.command(SetNodeData, node, newData).command(AddParsingErrorMark, node, err);
}
