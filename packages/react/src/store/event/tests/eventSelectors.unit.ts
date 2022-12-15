import { eventSelectors } from "../eventSelectors";
import { defaultChartState } from "../../chart/chartReducer";
import { defaultEventState } from "../eventReducer";
import type { IMarker, IDropline, IColor, IMouseMode } from "../../../types";

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
                    mouse: { x: 5, y: 10, mode: "NONE" as IMouseMode },
                },
            };

            expect(eventSelectors.position(state)).toEqual({ x: 5, y: 10 });
        });

        it("returns empty with no position", () => {
            // @ts-expect-error: Checking runtime safety
            expect(eventSelectors.position({})).toEqual({});
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
                    mouse: { x: 5, y: 10, mode: "ENTER" as IMouseMode },
                },
            };
            expect(eventSelectors.mode(state)).toBe("ENTER");
        });
    });

    it("droplines", () => {
        const state = {
            chart: defaultChartState,
            event: {
                ...defaultEventState,
                droplines: [{ isHorizontal: true, color: "#FF0000", x1: 0, x2: 1, y1: 2, y2: 3 }] as Array<IDropline>,
            },
        };

        expect(eventSelectors.droplines(state)).toEqual([
            { isHorizontal: true, color: "#FF0000", x1: 0, x2: 1, y1: 2, y2: 3 },
        ]);
    });

    it("markers", () => {
        const state = {
            chart: defaultChartState,
            event: {
                ...defaultEventState,
                markers: [{ fill: "#FF0000", r1: 5, r2: 10, cx: 3, cy: 4 }] as Array<IMarker>,
            },
        };

        expect(eventSelectors.markers(state)).toEqual([{ fill: "#FF0000", r1: 5, r2: 10, cx: 3, cy: 4 }]);
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

        it("items", () => {
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

            expect(eventSelectors.tooltip.items(state)).toEqual([{ name: "A", value: 0 }]);
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
