import SetNodeData from './SetNodeData';
import RemoveErrorMark from './RemoveErrorMark';

export default function GoodParse(editor, node, parseResult) {
  const newData = node.data.asMutable();
  newData.set('json', JSON.stringify(parseResult, null, 4));
  newData.set('valid', true);
  newData.set('error', null);
  editor.command(SetNodeData, node, newData).command(RemoveErrorMark, node, node.text.length);
}
