import React from "react";
import { Button } from "@storybook/react/demo";
import docs from "./docs.md";
import { withA11y } from "@storybook/addon-a11y";

export default { title: "'Components/Contract Editor" };

export const contractEditor = () => <Button>Cicero-UI</Button>; // Please add contractEditor Component definition here

contractEditor.story = {
  component: contractEditor,
  decorators: [withA11y],

  parameters: {
    notes: docs
  }
};
