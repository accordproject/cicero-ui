## Cicero-UI - ContractEditor

### Usage

```
npm install @accordproject/cicero-ui
```

```
import { ContractEditor } from '@accordproject/cicero-ui';

const clausePropsObject = {
    BODY_FONT (string),
    CLAUSE_BACKGROUND (string),
    CLAUSE_BORDER (string),
    CLAUSE_DELETE (string),
    CLAUSE_DELETE_FUNCTION (function),
    HEADER_FONT (string),
}

const editorPropsObject = {
    BUTTON_BACKGROUND_INACTIVE (string),
    BUTTON_BACKGROUND_ACTIVE (string),
    BUTTON_SYMBOL_INACTIVE (string),
    BUTTON_SYMBOL_ACTIVE (string),
    DROPDOWN_COLOR (string),
    TOOLBAR_BACKGROUND (string),
    TOOLTIP_BACKGROUND (string),
    TOOLTIP (string),
    TOOLBAR_SHADOW (string),
    WIDTH (string),
}

function storeLocal(editor) {
    localStorage.setItem('markdown-editor', editor.getMarkdown());
}

ReactDOM.render(<ContractEditor 
    clauseProps={clauseProps(props.removeFromContract)}
    editorProps={editorPropsObject}
    onChange={storeLocal} />,
  document.getElementById('root'));
```

### Props

- `value` : An `object` which is the initial contents of the editor.
- `onChange` : A callback `function` called when the contents of the editor change.
- `lockText` : A `boolean` to lock all non variable text.
- `loadTemplateObject` : A callback `function` to load a template.
- `parseClause` : A callback `function` to parse the contents of a clause.
- `templates` : An `array` which contains template objects with the following keys: `uir`, `name`, `version`, `description`.
- `editorProps` : An optional `object` for the contract editor styling passed down through an object to Markdown Editor, see below.
- `clauseProps` : An `object` for the clauses in the editor which contains a deletion function, see below.


### Specifications

`editorProps`:
You can style the toolbar of this components, as well as the width of the editor. An object may be passed down this component which will then be picked up by our `markdown-editor`, with the following possible CSS inputs as strings:
- `BUTTON_BACKGROUND_INACTIVE`
- `BUTTON_BACKGROUND_ACTIVE`
- `BUTTON_SYMBOL_INACTIVE`
- `BUTTON_SYMBOL_ACTIVE`
- `DROPDOWN_COLOR`
- `TOOLBAR_BACKGROUND`
- `TOOLTIP_BACKGROUND`
- `TOOLTIP`
- `TOOLBAR_SHADOW`
- `WIDTH`

`clauseProps`:
You can style the Clause Components within the `ContractEditor`. An object may be passed down this component with the following possible CSS inputs as strings, as well as a deletion function:
- `BODY_FONT`
- `CLAUSE_BACKGROUND`
- `CLAUSE_BORDER`
- `CLAUSE_DELETE`
- `CLAUSE_DELETE_FUNCTION`
- `HEADER_FONT`