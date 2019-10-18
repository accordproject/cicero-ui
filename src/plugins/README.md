## Cicero-UI - VariablePlugin

### What it does?

A custom Slate plugin for using editable, highlighted variables within a clause

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

where augmentSchema, isEditable and renderInline are functions

