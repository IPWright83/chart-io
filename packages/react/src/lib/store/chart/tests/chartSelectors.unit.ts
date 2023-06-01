import * as d3 from "@chart-it/d3";

import { PROGRESSIVE_RENDER_THRESHOLD } from "../../../constants";
import { themes } from "../../../themes";

import { chartSelectors } from "../chartSelectors";
import { defaultChartState } from "../chartReducer";
import { defaultEventState } from "../../event/eventReducer";

describe("chartSelectors", () => {
    it("store gets the correct part of state", () => {
        const state = {
            event: defaultEventState,
            chart: defaultChartState,
        };

        expect(chartSelectors.store(state)).toEqual(state.chart);
    });

    it("id returns the id of the chart", () => {
        const state = {
            event: defaultEventState,
            chart: {
                ...defaultChartState,
                id: "foo",
            },
        };

        expect(chartSelectors.id(state)).toEqual("foo");
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
            const state = {
                event: defaultEventState,
                chart: defaultChartState,
            };

            expect(chartSelectors.data(state)).toEqual([]);
        });
    });

    describe("scales", () => {
        const state = {
            event: defaultEventState,
            chart: {
                ...defaultChartState,
                scales: {
                    a: {
                        scale: d3.scaleLinear(),
                        domain: [0, 10],
                        range: [0, 100],
                        brush: {
                            range: [0, 50],
                        },
                    },
                    b: {
                        scale: d3.scaleLinear(),
                        domain: [10, 0],
                        zoomedDomain: [5, 2],
                        range: [0, 500],
                        brush: {
                            range: [0, 250],
                        },
                    },
                },
            },
        };

        it("store returns the state for the correct field", () => {
            expect(chartSelectors.scales.store(state, "a")).toEqual(state.chart.scales.a);
        });

        it("domain returns the domain for the correct field", () => {
            expect(chartSelectors.scales.domain(state, "a")).toEqual([0, 10]);
        });

        describe("zoomedDomain", () => {
            it("returns the zoomed domain for the correct field", () => {
                expect(chartSelectors.scales.zoomedDomain(state, "b")).toEqual([5, 2]);
            });

            it("returns the domain if there is no zoomed domain", () => {
                expect(chartSelectors.scales.zoomedDomain(state, "a")).toEqual([0, 10]);
            });
        });

        describe("range", () => {
            it("returns the range for scaleType=plot", () => {
                expect(chartSelectors.scales.range(state, "a", "plot")).toEqual([0, 100]);
            });

            it("returns the brush range for scaleType=brush", () => {
                expect(chartSelectors.scales.range(state, "a", "brush")).toEqual([0, 50]);
            });
        });

        describe("getScale", () => {
            it("throws for an unknown scaleType", () => {
                expect(() => {
                    chartSelectors.scales.getScale(state, "a", "foo");
                }).toThrow("Unknown scaleMode: foo");
            });

            it("for scaleType=brush returns a correct scale", () => {
                const scale = chartSelectors.scales.getScale(state, "b", "brush");

                expect(scale.domain()).toEqual([10, 0]);
                expect(scale.range()).toEqual([0, 250]);
            });

            it("for scaleType=plot returns a correct scale", () => {
                const scale = chartSelectors.scales.getScale(state, "b", "plot");

                expect(scale.domain()).toEqual([5, 2]);
                expect(scale.range()).toEqual([0, 500]);
            });
        });
    });

    describe("brush", () => {
        const state = {
            event: defaultEventState,
            chart: {
                ...defaultChartState,
                brush: {
                    width: 50,
                    height: 40,
                },
            },
        };

        it("store returns the correct part of state", () => {
            expect(chartSelectors.brush.store(state)).toEqual({
                width: 50,
                height: 40,
            });
        });

        it("height returns the reserved height for the brush", () => {
            expect(chartSelectors.brush.height(state)).toEqual(40);
        });

        it("width returns the reserved width for the brush", () => {
            expect(chartSelectors.brush.width(state)).toEqual(50);
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

        it("width removes any brush reserved spacing", () => {
            const testState = {
                ...state,
                chart: {
                    ...state.chart,
                    brush: {
                        width: 50,
                        height: 0,
                    },
                },
            };

            expect(chartSelectors.dimensions.width(testState)).toBe(width - 50);
        });

        it("height returns the value from the store", () => {
            expect(chartSelectors.dimensions.height(state)).toBe(height);
        });

        it("height removes any brush reserved spacing", () => {
            const testState = {
                ...state,
                chart: {
                    ...state.chart,
                    brush: {
                        width: 0,
                        height: 75,
                    },
                },
            };

            expect(chartSelectors.dimensions.height(testState)).toBe(height - 75);
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

    describe("legend", () => {
        describe("isVisible", () => {
            it("is false if less than 2 items", () => {
                const state = {
                    event: defaultEventState,
                    chart: {
                        ...defaultChartState,
                        legend: {
                            items: [{ name: "legend item 1", icon: "circle" as const }],
                        },
                    },
                };

                expect(chartSelectors.legend.isVisible(state)).toBe(false);
            });

            it("is true if 2 items or more", () => {
                const state = {
                    event: defaultEventState,
                    chart: {
                        ...defaultChartState,
                        legend: {
                            items: [
                                { name: "legend item 1", icon: "circle" as const },
                                { name: "legend item 2", icon: "circle" as const },
                            ],
                        },
                    },
                };

                expect(chartSelectors.legend.isVisible(state)).toBe(true);
            });
        });

        it("items returns the items", () => {
            const items = [
                { name: "legend item 1", icon: "circle" as const },
                { name: "legend item 2", icon: "circle" as const },
            ];

            const state = {
                event: defaultEventState,
                chart: {
                    ...defaultChartState,
                    legend: {
                        items,
                    },
                },
            };

            expect(chartSelectors.legend.items(state)).toEqual(items);
        });
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
