import * as d3 from "d3";

import { chartActions } from "../chartActions";

describe("chartActions", () => {
    it("setDimensions returns correct action", () => {
        const width = 1000;
        const height = 500;
        const margin = { top: 10, left: 10, right: 10, bottom: 10 };

        expect(chartActions.setDimensions(width, height, margin)).toEqual({
            type: "CHART.SET_DIMENSIONS",
            payload: { width, height, margin },
        });
    });

    describe("setScales", () => {
        it("triggers dispatch correctly", () => {
            const fields = ["a", "b", "c"];
            const scale = d3.scaleLinear();
            const dispatch = jest.fn();

            chartActions.setScales(fields, scale)(dispatch);
            expect(dispatch).toHaveBeenCalledWith({
                type: "CHART.SET_SCALES",
                payload: { fields, scale },
            });
        });

        it("does not do anything if passed no scale", () => {
            const fields = ["a", "b", "c"];
            const dispatch = jest.fn();

            chartActions.setScales(fields, null)(dispatch);
            expect(dispatch).not.toHaveBeenCalled();
        });
    });

    describe("setData", () => {
        it("returns the correct action", () => {
            const data = [{ a: "foo" }];
            expect(chartActions.setData(data)).toEqual({
                type: "CHART.SET_DATA",
                payload: data,
            });
        });

        it("defaults to an empty dataset", () => {
            expect(chartActions.setData(undefined)).toEqual({
                type: "CHART.SET_DATA",
                payload: [],
            });
        });
    });
});
