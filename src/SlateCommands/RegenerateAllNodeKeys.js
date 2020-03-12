/*make a new node by changing the keys */
export default function regenerateKey(node) {
	node = node.regenerateKey();
	return {
		data: node.data,
		key: node.key,
		object: node.object,
		text: node.text,
		type: node.type,
		nodes: (node.nodes || []).map(regenerateKey)
	};
}
