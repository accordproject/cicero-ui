## Cicero-UI

## VariablePlugin

### What it does?

A custom Slate plugin for using editable, highlighted variables within a clause.
Using VariablePlugin to add a variable and define schema for the addition of variable in the format defined by [slate.js](https://docs.slatejs.org/) as its used in the markdown-editor.

### Usage

```
npm install @accordproject/cicero-ui
```

```
import { VariablePlugin } from '@accordproject/cicero-ui';

const plugins = React.useMemo(() => (props.plugins
    ? props.plugins.concat(
      [VariablePlugin(), ClausePlugin()]
    )
    : [VariablePlugin(), ClausePlugin()]), [props.plugins]);

```

### What it returns?

It returns an object like this:

```
{
    name,
    augmentSchema,
    isEditable,
    renderInline,
}

```

where augmentSchema, isEditable and renderInline are functions.

### augmentSchema function

augmentSchema function returns a new schema for the addition of variable in the markdown editor in the format suggested by [slate.js](https://docs.slatejs.org/).

### isEditable function

isEditable function returns a boolean on checking whether the variable in the markdown editor is editable or not.

### renderInline function

renderInline function renders a variable inline to the text in the editor by returning a span tag with the props.

```
return <span id={id} {...attributes} className='variable'>
            {children}
          </span>;

```


## ClausePlugin

