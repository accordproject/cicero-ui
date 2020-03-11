

// This story is just for testing purposes, please remove this!

import React from "react";
import { Button } from "@storybook/react/demo";

export default { title: "Button" };

export const withText = () => <Button>Cicero-UI</Button>;

export const withEmoji = () => (
  <Button>
    <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span>
  </Button>
);

withText.story = {
    parameters: {
      notes: 'A small component',
    },
  };

withEmoji.story = {
    parameters: {
      notes: 'A small component',
    },
  };