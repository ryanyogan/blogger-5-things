import React from "react";
import App from "./App";

import renderer from "react-test-renderer";

it("renders the main <App /> component", () => {
  const rendered = renderer.create(<App />).toJSON();
  expect(rendered).toBeTruthy();
});
