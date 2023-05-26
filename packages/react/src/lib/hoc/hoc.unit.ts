import React from "react";

import { withCanvas } from "./withCanvas";
import { withSVG } from "./withSVG";

describe("Higher Order Components", () => {
    describe("withCanvas", () => {
        it("should warn if no classname is provided", () => {
            const mockElement = React.createElement("div");

            const spy = jest.spyOn(console, "warn").mockImplementation();
            // @ts-expect-error: Validating a runtime warning
            withCanvas(mockElement);

            expect(spy.mock.calls[0][0]).toMatchSnapshot();
        });
    });

    describe("withSVG", () => {
        it("should warn if no classname is provided", () => {
            const mockElement = React.createElement("div");

            const spy = jest.spyOn(console, "warn").mockImplementation();
            // @ts-expect-error: Validating a runtime warning
            withSVG(mockElement);

            expect(spy.mock.calls[0][0]).toMatchSnapshot();
        });
    });
});
