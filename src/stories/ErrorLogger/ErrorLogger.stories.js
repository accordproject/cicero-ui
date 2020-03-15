import React from "react";
import { Button } from "@storybook/react/demo";
import docs from "./docs.md";
import { withA11y } from "@storybook/addon-a11y";

export default { title: "'Components/Error Logger" };

export const errorLogger = () => <Button>Cicero-UI</Button>; // Please add errorLogger Component definition here

errorLogger.story = {
  component: errorLogger,
  decorators: [withA11y],

  parameters: {
    notes: docs
  }
};
