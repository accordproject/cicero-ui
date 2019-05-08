## Cicero-UI - TemplateLibrary

### Usage

```
npm install @accordproject/cicero-ui
```

```
import { TemplateLibrary } from '@accordproject/cicero-ui';

const LibraryComponent = props => (
    <TemplateLibrary
        templates={props.templatesArray}
        upload={props.uploadCTA}
        import={props.importTemplate}
        addTemp={props.addNewTemplate}
        addToCont={props.addToContract}
    />
);
```

### Props

- `templates` : An `array` which contains template objects with the following keys: `uir`, `name`, `version`, `description`.
- `upload` : A function which calls for upload functionality within the app this component is embedded in.
- `import` : A function which calls for import functionality within the app this component is embedded in.
- `addTemp` : A function which adds a new blank template to the array of templates in the Redux store of the app this component is embedded in.
- `addToCont` : A function which calls for adding the selected template to the Redux store in the app this component is embedded in. This will result in another component having use of its data.

### Specifications

This component is built to have the following dimensions:

```
height: 700px;
width: 485px;
```