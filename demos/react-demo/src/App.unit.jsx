import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

function wait(duration = 200) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

test("renders learn react link", async () => {
  const { asFragment } = render(<App />);

  await wait(500);

  expect(asFragment()).toMatchSnapshot();
});
