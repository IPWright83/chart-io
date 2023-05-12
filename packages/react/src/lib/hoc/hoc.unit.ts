import React from "react";

import { withCanvas } from "./withCanvas";
import { withSVG } from "./withSVG";

describe("Higher Order Components", () => {
    describe("withCanvas", () => {
        fit("should warn if no classname is provided", () => {
            const mockElement = React.createElement("div");

            const spy = jest.spyOn(console, "warn").mockImplementation();
            // @ts-expect-error: Validating a runtime warning
            withCanvas(mockElement);

            expect(spy.mock.calls[0][0]).toMatchInlineSnapshot(
                `"@chart-it/react encountered an warning. W003: className is required when using the withCanvas higher order component. You can read more about this http://localhost:6006/?path=/docs/errors-warnings-warnings-W003."`
            );
        });
    });

    describe("withSVG", () => {
        it("should warn if no classname is provided", () => {
            const mockElement = React.createElement("div");

            const spy = jest.spyOn(console, "warn").mockImplementation();
            // @ts-expect-error: Validating a runtime warning
            withSVG(mockElement);

            expect(spy.mock.calls[0][0]).toMatchInlineSnapshot();
        });
    });
});
