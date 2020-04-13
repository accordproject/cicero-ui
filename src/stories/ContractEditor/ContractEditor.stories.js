import React from "react";
import { Button } from "@storybook/react/demo";
import docs from "./docs.md";
import { withA11y } from "@storybook/addon-a11y";

import Demo from '../../../demo/src';

export default { title: "'Components/Contract Editor" };

export const contractEditor = () => <Demo/>; // Please add contractEditor Component definition here

/** Using exisiting Demo file for testing if webpack config is workig fine*/

contractEditor.story = {
  component: contractEditor,
  decorators: [withA11y],

  parameters: {
    notes: docs
  }
};