import type { IColor, IDropline, IMarker, IMouseEventType } from "@Types";

import { defaultChartState } from "../../chart/chartSlice";
import { eventSelectors } from "../eventSelectors";
import { defaultEventState } from "../eventSlice";

describe("eventSelectors", () => {
    it("store gets the correct part of state", () => {
        const state = {
            chart: defaultChartState,
            event: defaultEventState,
        };

        expect(eventSelectors.store(state)).toEqual(state.event);
    });

    describe("position", () => {
        it("returns the data", () => {
            const state = {
                chart: defaultChartState,
                event: {
                    ...defaultEventState,
                    mouse: { x: 5, y: 10, mode: "NONE" as IMouseEventType },
                },
            };

            expect(eventSelectors.position(state)).toEqual({ x: 5, y: 10, mode: "NONE" });
        });

        it("returns empty with no position", () => {
            const state = {
                chart: defaultChartState,
                event: defaultEventState,
            };

            expect(eventSelectors.position(state)).toEqual({});
        });
    });

    describe("mode", () => {
        it("returns NONE if there is no mouse position", () => {
            const state = {
                chart: defaultChartState,
                event: defaultEventState,
            };

            expect(eventSelectors.mode(state)).toBe("NONE");
        });

        it("returns the mode", () => {
            const state = {
                chart: defaultChartState,
                event: {
                    ...defaultEventState,
                    mouse: { x: 5, y: 10, mode: "ENTER" as IMouseEventType },
                },
            };

            expect(eventSelectors.mode(state)).toBe("ENTER");
        });
    });

    describe("droplines", () => {
        const droplines = [
            { isHorizontal: true, color: "red", x1: 0, x2: 1, y1: 2, y2: 3, distance: 50 },
            { isVertical: true, color: "blue", x1: 0, x2: 1, y1: 2, y2: 3, distance: 50 },
            { isHorizontal: true, color: "green", x1: 0, x2: 1, y1: 2, y2: 3, distance: 100 },
        ] as Array<IDropline>;

        it("returns all droplines", () => {
            const state = {
                chart: defaultChartState,
                event: {
                    ...defaultEventState,
                    droplines,
                },
            };

            expect(eventSelectors.droplines(state, false)).toEqual(droplines);
        });

        it("returns nearest droplines only", () => {
            const state = {
                chart: defaultChartState,
                event: {
                    ...defaultEventState,
                    droplines,
                },
            };

            expect(eventSelectors.droplines(state, true)).toEqual([droplines[0], droplines[1]]);
        });
    });

    describe("markers", () => {
        const markers = [
            { fill: "red", r1: 5, r2: 10, cx: 3, cy: 4, distance: 50 },
            { fill: "blue", r1: 5, r2: 10, cx: 3, cy: 4, distance: 100 },
            { fill: "green", r1: 5, r2: 10, cx: 3, cy: 4 },
        ] as Array<IMarker>;

        it("returns all markers", () => {
            const state = {
                chart: defaultChartState,
                event: {
                    ...defaultEventState,
                    markers,
                },
            };

            expect(eventSelectors.markers(state, false)).toEqual(markers);
        });

        it("returns only closest markers", () => {
            const state = {
                chart: defaultChartState,
                event: {
                    ...defaultEventState,
                    markers,
                },
            };

            expect(eventSelectors.markers(state, true)).toEqual([markers[0], markers[2]]);
        });
    });

    describe("tooltip", () => {
        it("show returns true if there are tooltip items", () => {
            const state = {
                chart: defaultChartState,
                event: {
                    ...defaultEventState,
                    tooltip: {
                        items: [{ name: "A", value: 0 }],
                    },
                },
            };

            expect(eventSelectors.tooltip.show(state)).toBe(true);
        });

        it("show returns false if there are no tooltip items", () => {
            const state = {
                chart: defaultChartState,
                event: {
                    ...defaultEventState,
                    tooltip: {
                        items: [],
                    },
                },
            };

            expect(eventSelectors.tooltip.show(state)).toBe(false);
        });

        it("color", () => {
            const state = {
                chart: defaultChartState,
                event: {
                    ...defaultEventState,
                    tooltip: {
                        items: [{ name: "A", value: 0 }],
                        color: "#FF0000" as IColor,
                    },
                },
            };

            expect(eventSelectors.tooltip.color(state)).toBe("#FF0000");
        });

        describe("items", () => {
            const items = [
                { name: "A", value: 0, distance: 50 },
                { name: "B", value: 0, distance: 100 },
                { name: "C", value: 0 },
            ];

            it("returns all items", () => {
                const state = {
                    chart: defaultChartState,
                    event: {
                        ...defaultEventState,
                        tooltip: {
                            items,
                            color: "#FF0000" as IColor,
                        },
                    },
                };

                expect(eventSelectors.tooltip.items(state, false)).toEqual(items);
            });

            it("returns only closest items", () => {
                const state = {
                    chart: defaultChartState,
                    event: {
                        ...defaultEventState,
                        tooltip: {
                            items,
                            color: "#FF0000" as IColor,
                        },
                    },
                };

                expect(eventSelectors.tooltip.items(state, true)).toEqual([items[0], items[2]]);
            });
        });

        it("position", () => {
            const state = {
                chart: defaultChartState,
                event: {
                    ...defaultEventState,
                    tooltip: {
                        items: [{ name: "A", value: 0 }],
                        position: { x: 5, y: 10 },
                    },
                },
            };

            expect(eventSelectors.tooltip.position(state)).toEqual({ x: 5, y: 10 });
        });
    });
});
