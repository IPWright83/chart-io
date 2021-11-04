import { PROGRESSIVE_RENDER_THRESHOLD } from "../../../constants";
import { chartSelectors } from "../chartSelectors";

describe("chartSelectors", () => {
    it("store gets the correct part of state", () => {
        const state = {
            chart: {
                data: [],
            },
        };

        expect(chartSelectors.store(state)).toEqual(state.chart);
    });

    describe("data", () => {
        it("returns the data", () => {
            const data = [{ a: "foo" }];
            const state = { chart: { data } };

            expect(chartSelectors.data(state)).toEqual(data);
        });

        it("returns an empty array with no data", () => {
            expect(chartSelectors.data({})).toEqual([]);
        });
    });

    describe("scales", () => {
        it("store returns all the scales", () => {
            const state = {
                chart: {
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
                chart: {
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
            chart: {
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
            chart: {
                theme: {
                    foo: "bar",
                },
            },
        };

        expect(chartSelectors.theme(state)).toEqual({ foo: "bar" });
    });

    describe("animationDuration", () => {
        it("returns value", () => {
            const state = {
                chart: {
                    animationDuration: 185,
                },
            };

            expect(chartSelectors.animationDuration(state)).toBe(185);
        });

        it("returns 0 for large data set", () => {
            const state = {
                chart: {
                    animationDuration: 350,
                    // Note this is a faked array interface
                    data: { length: PROGRESSIVE_RENDER_THRESHOLD + 10 },
                },
            };

            expect(chartSelectors.animationDuration(state)).toBe(0);
        });
    });
});
