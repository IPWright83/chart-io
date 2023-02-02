import React from "react";

import { withCanvas } from "./withCanvas";
import { withSVG } from "./withSVG";

describe("Higher Order Components", () => {
    describe("withCanvas", () => {
        it("should warn if no classname is provided", () => {
            const mockElement = React.createElement("div");

            const spy = jest.spyOn(console, "warn").mockImplementation();
            withCanvas(mockElement);

            expect(spy).toHaveBeenCalledWith(
                "W003 - className is required when using the withCanvas higher order component"
            );
        });
    });

    describe("withSVG", () => {
        it("should warn if no classname is provided", () => {
            const mockElement = React.createElement("div");

            const spy = jest.spyOn(console, "warn").mockImplementation();
            withSVG(mockElement);

            expect(spy).toHaveBeenCalledWith(
                "W003 - className is required when using the withSVG higher order component"
            );
        });
    });
});
