

// This story is just for testing purposes, please remove this!

import React from "react";
import { Button } from "@storybook/react/demo";
import docs from "./docs.md";
import { storiesOf } from '@storybook/react'
import { withA11y } from '@storybook/addon-a11y'

export default { title: "'Components/Contract Editor" };

export const contractEditor = () => <Button>Cicero-UI</Button>;



contractEditor.story={
    
    component: contractEditor,
    decorators: [ withA11y ],
   
    parameters: {
        notes: docs,
      },
}
// storiesOf('Components/ContractEditor', module)
//   .addDecorator(withA11y)
//   .addParameters({notes: docs})
//   .add(
//     'Contract Editor',
//    (ContractEditorComponent)
//   )
