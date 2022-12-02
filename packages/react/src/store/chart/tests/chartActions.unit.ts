import * as d3 from "d3";

import { themes } from "../../../themes";
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

            chartActions.setScales(fields, scale, false)(dispatch);
            expect(dispatch).toHaveBeenCalledWith({
                type: "CHART.SET_SCALES",
                payload: { fields, scale },
            });
        });

        it("does not do anything if passed no scale", () => {
            const fields = ["a", "b", "c"];
            const dispatch = jest.fn();

            // @ts-expect-error Testing the safety of the interface
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

    it("setAnimationDuration returns the correct action", () => {
        expect(chartActions.setAnimationDuration(500)).toEqual({
            type: "CHART.SET_ANIMATION_DURATION",
            payload: 500,
        });
    });

    describe("setTheme", () => {
        it("for light theme returns correct action", () => {
            const dispatch = jest.fn();

            chartActions.setTheme("light")(dispatch);

            expect(dispatch).toHaveBeenCalledWith({
                type: "CHART.SET_THEME",
                payload: themes.light,
            });
        });

        it("for dark theme returns correct action", () => {
            const dispatch = jest.fn();

            chartActions.setTheme("dark")(dispatch);

            expect(dispatch).toHaveBeenCalledWith({
                type: "CHART.SET_THEME",
                payload: themes.dark,
            });
        });

        it("for custom theme returns correct action", () => {
            const dispatch = jest.fn();

            chartActions.setTheme(themes.dark)(dispatch);

            expect(dispatch).toHaveBeenCalledWith({
                type: "CHART.SET_THEME",
                payload: { foo: "bar" },
            });
        });
    });
});
