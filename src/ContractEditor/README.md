## Cicero-UI - ContractEditor

### Usage

```shell
npm install @accordproject/cicero-ui
```

```js
import { ContractEditor } from '@accordproject/cicero-ui';

const clausePropsObject = {
    BODY_FONT (string),
    CLAUSE_BACKGROUND (string),
    CLAUSE_BORDER (string),
    CLAUSE_DELETE_FUNCTION (function),
    CLAUSE_EDIT_FUNCTION (function),
    CLAUSE_TEST_FUNCTION (function),
    CLAUSE_ICONS (string),
    COMPUTED_COLOR (string),
    HEADER_FONT (string),
    HEADER_TITLE (string),
    VARIABLE_COLOR (string),
    CONDITIONAL_COLOR (string),
}

const editorPropsObject = {
    BUTTON_BACKGROUND_INACTIVE (string),
    BUTTON_BACKGROUND_ACTIVE (string),
    BUTTON_SYMBOL_INACTIVE (string),
    BUTTON_SYMBOL_ACTIVE (string),
    DROPDOWN_COLOR (string),
    EDITOR_BORDER (string),
    EDITOR_BORDER_RADIUS (string),
    EDITOR_HEIGHT (string),
    EDITOR_MARGIN (string),
    EDITOR_SHADOW (string),
    EDITOR_WIDTH (string),
    TOOLBAR_BACKGROUND (string),
    TOOLTIP_BACKGROUND (string),
    TOOLTIP (string),
    TOOLBAR_SHADOW (string),
}

const givenState = {
    value: 'value information',
    templateObjs: 'template information'
}

function parseClauseFunction() { /* ... */ }
function loadTemplateObjectFunction() { /* ... */ }
function pasteToContractFunction() { /* ... */ }
function storeLocal(editor) {
    localStorage.setItem('markdown-editor', editor.getMarkdown());
    /* Or some other function */
}

ReactDOM.render(<ContractEditor
    onChange={storeLocal}
    editorProps={editorPropsObject}
    clauseProps={clausePropsObject}
    loadTemplateObject={loadTemplateObjectFunction}
    pasteToContract={pasteToContractFunction}
    onClauseUpdated={parseClauseFunction}
    value={givenState.value}
    lockText={false}
    />,
  document.getElementById('root'));
```


## Props

### Expected Properties

#### Values

- `value`: An `object` which is the initial contents of the editor.
- `lockText`: A `boolean` to lock all non variable text.
- `readOnly`: A `boolean` to lock all text and remove the formatting toolbar.

#### Functionality

- `loadTemplateObject`: A callback `function` to load a template.
- `onChange`: A callback `function` called when the contents of the editor change.
- `onClauseUpdated`: A callback `function` called when text inside of a clause is changed.
- `pasteToContract`: A callback `function` to load a clause template via copy/paste.

- `plugins`:
Array of plugins into the underlying `markdown-editor`:
```js
plugins = [
    onEnter,       // (Function)
    onKeyDown,     // (Function)
    renderBlock,   // (Function: Required)
    toMarkdown,    // (Function: Required)
    fromMarkdown,  // (Function: Required)
    fromHTML,      // (Function: Required)
    plugin,        // (String: Required)
    tags,          // (Array of Strings: Required)
    schema,        // (Object: Required)
]
```

### Optional Styling

- `editorProps`: An optional `object` for the contract editor styling passed down through an object to Markdown Editor, see below.
- `clauseProps`: An `object` for the clauses in the editor which contains a deletion function, see below.

#### Specifications

`editorProps`:
You can style the toolbar of this components, as well as the width of the editor. An object may be passed down this component which will then be picked up by our `markdown-editor`, with the following possible CSS inputs as strings:
```js
editorProps = {
    BUTTON_BACKGROUND_INACTIVE, // (String)
    BUTTON_BACKGROUND_ACTIVE,   // (String)
    BUTTON_SYMBOL_INACTIVE,     // (String)
    BUTTON_SYMBOL_ACTIVE,       // (String)
    DROPDOWN_COLOR,             // (String)
    EDITOR_BORDER,              // (String)
    EDITOR_BORDER_RADIUS,       // (String)
    EDITOR_HEIGHT,              // (String)
    EDITOR_MARGIN,              // (String)
    EDITOR_SHADOW,              // (String)
    EDITOR_WIDTH,               // (String)
    TOOLBAR_BACKGROUND,         // (String)
    TOOLTIP_BACKGROUND,         // (String)
    TOOLTIP,                    // (String)
    TOOLBAR_SHADOW,             // (String)
}
```

`clauseProps`:
You can style the Clause Components within the `ContractEditor`. An object may be passed down this component with the following possible CSS inputs as strings, as well as a deletion function:
```js
clauseProps = {
    BODY_FONT,               // (String)
    CLAUSE_BACKGROUND,       // (String)
    CLAUSE_BORDER,           // (String)
    CLAUSE_DELETE_FUNCTION,  // (Function)
    CLAUSE_EDIT_FUNCTION,    // (Function)
    CLAUSE_TEST_FUNCTION,    // (Function)
    CLAUSE_ICONS,            // (String)
    COMPUTED_COLOR,          // (String)
    HEADER_FONT,             // (String)
    HEADER_TITLE,            // (String)
    VARIABLE_COLOR,          // (String)
    CONDITIONAL_COLOR,       // (String)
}
```