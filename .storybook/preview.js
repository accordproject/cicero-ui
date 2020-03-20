import React from "react";
import { addDecorator, addParameters } from "@storybook/react";

const styles = {
  position: "relative",
  boxSizing: "border-box",
  margin: "0",
  padding: "48px 32px",
  textAlign: "initial"
};
const WrapperDecorator = storyFn => <div style={styles}>{storyFn()}</div>;

addParameters({
  options: {
    /**
     * display the top-level grouping as a "root" in the sidebar
     * @type {Boolean}
     */
    showRoots: true
  }
});

addDecorator(WrapperDecorator);