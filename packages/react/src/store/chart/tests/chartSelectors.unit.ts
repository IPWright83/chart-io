import { PROGRESSIVE_RENDER_THRESHOLD } from "../../../constants";
import { themes } from "../../../themes";
import { chartSelectors } from "../chartSelectors";
import { defaultState as defaultChartState } from "../chartReducer";
import { defaultState as defaultEventState } from "../../event/eventReducer";

describe("chartSelectors", () => {
    it("store gets the correct part of state", () => {
        const state = {
            event: defaultEventState,
            chart: defaultChartState,
        };

        expect(chartSelectors.store(state)).toEqual(state.chart);
    });

    describe("data", () => {
        it("returns the data", () => {
            const data = [{ a: "foo" }];
            const state = {
                event: defaultEventState,
                chart: { ...defaultChartState, data },
            };

            expect(chartSelectors.data(state)).toEqual(data);
        });

        it("returns an empty array with no data", () => {
            expect(chartSelectors.data({})).toEqual([]);
        });
    });

    describe("scales", () => {
        it("store returns all the scales", () => {
            const state = {
                event: defaultEventState,
                chart: {
                    ...defaultChartState,
                    scales: {
                        a: { fakeScale: 1 },
                        b: { fakeScale: 2 },
                    },
                },
            };

            expect(chartSelectors.scales.store(state)).toEqual(state.chart.scales);
        });

        it("getScale returns the correct scale", () => {
            const state = {
                event: defaultEventState,
                chart: {
                    ...defaultChartState,
                    scales: {
                        a: { fakeScale: 1 },
                        b: { fakeScale: 2 },
                    },
                },
            };

            expect(chartSelectors.scales.getScale(state, "a")).toBe(state.chart.scales.a);
        });

        it("getScale returns undefined for an missing scale", () => {
            expect(chartSelectors.scales.getScale({}, "a")).toBe(undefined);
        });
    });

    describe("dimensions", () => {
        const width = 1000;
        const height = 500;
        const margin = { top: 10, left: 10, right: 10, bottom: 10 };

        const state = {
            event: defaultEventState,
            chart: {
                ...defaultChartState,
                dimensions: {
                    width,
                    height,
                    margin,
                },
            },
        };

        it("store returns all the dimensions", () => {
            expect(chartSelectors.dimensions.store(state)).toEqual({
                width,
                height,
                margin,
            });
        });

        it("width returns the value from the store", () => {
            expect(chartSelectors.dimensions.width(state)).toBe(width);
        });

        it("height returns the value from the store", () => {
            expect(chartSelectors.dimensions.height(state)).toBe(height);
        });

        it("margin returns the value from the store", () => {
            expect(chartSelectors.dimensions.margin(state)).toBe(margin);
        });
    });

    it("theme", () => {
        const state = {
            event: defaultEventState,
            chart: {
                ...defaultChartState,
                theme: themes.dark,
            },
        };

        expect(chartSelectors.theme(state)).toEqual(themes.dark);
    });

    describe("animationDuration", () => {
        it("returns value", () => {
            const state = {
                event: defaultEventState,
                chart: {
                    ...defaultChartState,
                    animationDuration: 185,
                },
            };

            expect(chartSelectors.animationDuration(state)).toBe(185);
        });

        it("returns 0 for large data set", () => {
            const state = {
                event: defaultEventState,
                chart: {
                    ...defaultChartState,
                    animationDuration: 350,
                    data: new Array(PROGRESSIVE_RENDER_THRESHOLD + 10),
                },
            };

            expect(chartSelectors.animationDuration(state)).toBe(0);
        });
    });
});
