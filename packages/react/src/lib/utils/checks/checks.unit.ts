import * as d3 from "@chart-io/d3";
import { ensureBandwidth } from "./ensureBandwidth";
import { ensureNoScaleOverflow } from "./ensureNoScaleOverflow";
import { ensureValuesAreUnique } from "./ensureValuesAreUnique";

describe("/utils/checks", () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    describe("ensureBandScale", () => {
        it("should return false if a zero bandwidth is found", () => {
            const spy = jest.spyOn(console, "error").mockImplementation(jest.fn());

            expect(ensureBandwidth(0, "unit_test")).toBe(false);

            expect(spy.mock.calls[0][0]).toMatchSnapshot();
        });

        it("should return true if a non zero bandwidth is found", () => {
            expect(ensureBandwidth(4, "unit_test")).toBe(true);
        });
    });

    describe("ensureNoScaleOverflow for aggregated data", () => {
        it("should return true if the data is larger than the scale", () => {
            const spy = jest.spyOn(console, "warn").mockImplementation(jest.fn());

            const scale = d3.scaleLinear().domain([0, 10]);
            const data = [
                { x: 2, y: 5 },
                { x: 5, y: 8 },
            ];
            const fields = ["x", "y"];

            expect(ensureNoScaleOverflow(scale, data, fields, "unit_test")).toBe(false);

            expect(spy.mock.calls[0][0]).toMatchSnapshot();
        });

        it("should return false if the data is smaller than the scale", () => {
            const scale = d3.scaleLinear().domain([0, 20]);
            const data = [
                { x: 2, y: 5 },
                { x: 5, y: 8 },
            ];
            const fields = ["x", "y"];

            expect(ensureNoScaleOverflow(scale, data, fields, "unit_test")).toBe(true);
        });
    });

    describe("ensureValuesAreUnique", () => {
        it("should return true if all the values are unique", () => {
            const data = [{ x: "a" }, { x: "b" }, { x: "c" }];
            const field = "x";

            expect(ensureValuesAreUnique(data, field, "unit_test")).toBe(true);
        });

        it("should return false if not all the values are unique", () => {
            const spy = jest.spyOn(console, "warn").mockImplementation(jest.fn());

            const data = [{ x: "a" }, { x: "b" }, { x: "a" }];
            const field = "x";

            expect(ensureValuesAreUnique(data, field, "unit_test")).toBe(false);

            expect(spy.mock.calls[0][0]).toMatchSnapshot();
        });
    });
});
