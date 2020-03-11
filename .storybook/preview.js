import React from "react";
import { addDecorator } from "@storybook/react";

const styles = {
  position: "relative",
  boxSizing: "border-box",
  margin: "0",
  padding: "48px 32px",
  textAlign: "initial"
};
const WrapperDecorator = storyFn => <div style={styles}>{storyFn()}</div>;

addDecorator(WrapperDecorator);
