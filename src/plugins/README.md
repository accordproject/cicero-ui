# Cicero-UI

```js
import {
	ClausePlugin,
	VariablePlugin,
	ConditionalPlugin,
	ComputedPlugin
} from "@accordproject/cicero-ui";

const plugins = React.useMemo(
	() =>
		props.plugins
			? props.plugins.concat([
					VariablePlugin(),
					ConditionalPlugin(),
					ClausePlugin(),
					ComputedPlugin()
			  ])
			: [VariablePlugin(), ConditionalPlugin(), ClausePlugin(), ComputedPlugin()],
	[props.plugins]
);
```

## VariablePlugin

### What it does?

A custom Slate plugin for using editable, highlighted variables within a clause.
Using VariablePlugin to add a variable and define schema for the addition of variable in the format defined by [slate.js](https://docs.slatejs.org/) as its used in the markdown-editor.

### Usage

```shell
npm install @accordproject/cicero-ui
```

```js
import { VariablePlugin } from '@accordproject/cicero-ui';
import { Editor } from 'slate-react'

const plugins = [VariablePlugin()];

<Editor
  ...
  plugins={plugins}
/>

```

### What it returns?

It returns an object like this:

```js
{
    name,
    augmentSchema,
    isEditable,
    renderInline,
}

```

where `augmentSchema`, `isEditable` and `renderInline` are functions.

### augmentSchema function

`augmentSchema` function returns a new schema for the addition of variable in the markdown editor in the format suggested by [slate.js](https://docs.slatejs.org/).

### isEditable function

`isEditable` function returns a boolean on checking whether the variable in the markdown editor is editable or not.

### renderInline function

`renderInline` function renders a variable inline to the text in the editor by returning a span tag with the props.

```js
return (
	<span id={id} {...attributes} className='variable'>
		{" "}
		{children}{" "}
	</span>
);
```

## ComputedPlugin

### What it does?

A custom Slate plugin for using non-editable, highlighted computed fields within a clause.
Use ComputedPlugin to add a computed field and define schema for the addition of a computed field in the format defined by [slate.js](https://docs.slatejs.org/) as its used in the markdown-editor.

### Usage

```shell
npm install @accordproject/cicero-ui
```

```js
import { ComputedPlugin } from '@accordproject/cicero-ui';
import { Editor } from 'slate-react'

const plugins = [ComputedPlugin()];

<Editor
  ...
  plugins={plugins}
/>

```

### What it returns?

It returns an object like this:

```js
{
    name,
    augmentSchema,
    isEditable,
    renderInline,
}

```

where `augmentSchema`, `isEditable` and `renderInline` are functions.

### augmentSchema function

`augmentSchema` function returns a new schema for the addition of computed in the markdown editor in the format suggested by [slate.js](https://docs.slatejs.org/).

### isEditable function

`isEditable` function returns a boolean on checking whether the computed field in the markdown editor is editable or not.

### renderInline function

`renderInline` function renders a computed inline to the text in the editor by returning a span tag with the props.

```js
return (
	<span id={id} {...attributes} className='computed'>
		{" "}
		{children}{" "}
	</span>
);
```

## ClausePlugin

A custom Slate plugin for embedding a clause node within a document. View the `demo` directory for more of an example.

### Usage

```shell
npm install @accordproject/cicero-ui
```

```js
import { ClausePlugin } from '@accordproject/cicero-ui';
import { Editor } from 'slate-react'

const plugins = [ClausePlugin()];


<Editor
  ...
  plugins={plugins}
/>
```

### Props

```js
    clausePluginProps={{
      loadTemplateObject: props.loadTemplateObject,
      onClauseUpdated: props.parseClause,
      pasteToContract: props.pasteToContract,
      clauseProps: props.clauseProps,
      clauseMap: props.clauseMap
    }}
```

- `loadTemplateObject` : `Function` (Required) - Loads a template
- `onClauseUpdated` : `Function` (Required) - Called when the text of a clause changes
- `pasteToContract` : `Function` (Required) - Loads a template via copy/paste
- `clauseProps`: (Required) - Props passed to the `ClauseComponent`

### What it returns?

```js
{
    name,
    augmentSchema,
    renderBlock,
    isEditable,
    onChange,
    onPaste,
    queries: {
      findClauseNode,
      isOutsideOfClause: isEditable,
      isClauseSupported
    }
}
```

where `augmentSchema`, `renderBlock`, `onChange`, `onPaste`, `findClauseNode`, `isOutsideOfClause`, and `isClauseSupported` are functions.

### augmentSchema function

`augmentSchema` function returns a new schema for the addition of clause type in the markdown editor in the format suggested by [slate.js](https://docs.slatejs.org/).

### renderBlock function

`renderBlock` function renders a clause inline to the text in the editor by returning a span tag with the props.

### onChange function

`onChange` function handles the changes to the document.

### onPaste function

`onPaste` function keep track of all the things that just got pasted.

### findClauseNode function

`findClauseNode` function is used to find the clause node by clauseId.

### isOutsideOfClause

`isOutsideOfClause` function returns a boolean which allows us editing if we are outside of a Clause.

### isClauseSupported

`isClauseSupported` function returns a boolean which tells if the UI is valid.

## ConditionalPlugin

### What it does?

A plugin to support variables corresponding to conditional blocks in templates enabling text which depends on a value of a Boolean variable in the model.

### Usage

```shell
npm install @accordproject/cicero-ui
```

```js
import { ConditionalPlugin } from '@accordproject/cicero-ui';
import { Editor } from 'slate-react'

const plugins = [ConditionalPlugin()];

<Editor
  ...
  plugins={plugins}
/>
```

### What it returns

```js
{
  name,
  augmentSchema,
  isEditable,
  renderInline,
}
```

where `augmentSchema`, `isEditable` and `renderInline` are functions.

### augmentSchema function

`augmentSchema` function returns a new schema for the addition of conditional type in the markdown editor in the format suggested by [slate.js](https://docs.slatejs.org/).

### isEditable function

`isEditable` function returns a boolean on checking whether the conditional field in the markdown editor is editable or not.

### renderInline function

`renderInline` function renders a conditional inline to the text in the editor by returning a span tag with the props.

```js
return (
	<span id={id} {...attributes} className='computed'>
		{" "}
		{children}{" "}
	</span>
);
```
