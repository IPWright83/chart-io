import type { IMouseEventType } from "@chart-io/types";

import { defaultEventState, eventActions, eventSlice } from "..";

describe("eventSlice.reducer", () => {
    describe("MOUSE actions", () => {
        it("mouseMove()", () => {
            const previousState = {
                ...defaultEventState,
                mouse: { x: 5, y: 10, mode: "ENTER" as IMouseEventType },
            };
            const action = eventActions.mouseMove({ offsetX: 5, offsetY: 10 });

            expect(eventSlice.reducer(previousState, action)).toEqual({
                ...defaultEventState,
                mouse: { x: 5, y: 10, mode: "MOVE" },
            });
        });

        it("mouseMove() action if not recieved a previous mouseEnter()", () => {
            const previousState = defaultEventState;
            const action = eventActions.mouseMove({ offsetX: 5, offsetY: 10 });

            expect(eventSlice.reducer(previousState, action)).toEqual({
                ...defaultEventState,
            });
        });

        it("mouseEnter() action", () => {
            const previousState = defaultEventState;
            const action = eventActions.mouseEnter({ offsetX: 5, offsetY: 10 });

            expect(eventSlice.reducer(previousState, action)).toEqual({
                ...defaultEventState,
                mouse: { x: 5, y: 10, mode: "ENTER" },
            });
        });

        it("mouseExit()", () => {
            const previousState = {
                ...defaultEventState,
                mouse: { x: 5, y: 10, mode: "ENTER" as IMouseEventType },
            };
            const action = eventActions.mouseExit();

            expect(eventSlice.reducer(previousState, action)).toEqual({
                ...defaultEventState,
                droplines: [],
                markers: [],
                mouse: undefined,
            });
        });
    });

    describe("MARKER actions", () => {
        it("addMarker()", () => {
            const previousState = {
                ...defaultEventState,
                markers: [{ fill: "red" as const, r1: 5, r2: 10, cx: 3, cy: 4 }],
            };
            const action = eventActions.addMarker({ fill: "blue", r1: 15, r2: 20, cx: 14, cy: 54 });

            expect(eventSlice.reducer(previousState, action)).toEqual({
                ...defaultEventState,
                markers: [
                    { fill: "red", r1: 5, r2: 10, cx: 3, cy: 4 },
                    { fill: "blue", r1: 15, r2: 20, cx: 14, cy: 54 },
                ],
            });
        });

        it("removeMarker()", () => {
            const previousState = {
                ...defaultEventState,
                markers: [
                    { fill: "blue" as const, r1: 15, r2: 20, cx: 14, cy: 54 },
                    { fill: "red" as const, r1: 5, r2: 10, cx: 3, cy: 4 },
                ],
            };
            const action = eventActions.removeMarker({ fill: "blue", r1: 15, r2: 20, cx: 14, cy: 54 });

            expect(eventSlice.reducer(previousState, action)).toEqual({
                ...defaultEventState,
                markers: [{ fill: "red", r1: 5, r2: 10, cx: 3, cy: 4 }],
            });
        });
    });

    describe("DROPLINE actions", () => {
        it("addDropline()", () => {
            const previousState = {
                ...defaultEventState,
                droplines: [{ isHorizontal: true, color: "red" as const, x1: 0, x2: 1, y1: 2, y2: 3 }],
            };
            const action = eventActions.addDropline({ isVertical: true, color: "blue", x1: 1, x2: 2, y1: 3, y2: 4 });

            expect(eventSlice.reducer(previousState, action)).toEqual({
                ...defaultEventState,
                droplines: [
                    { isHorizontal: true, color: "red", x1: 0, x2: 1, y1: 2, y2: 3 },
                    { isVertical: true, color: "blue", x1: 1, x2: 2, y1: 3, y2: 4 },
                ],
            });
        });

        it("removeDropline()", () => {
            const previousState = {
                ...defaultEventState,
                droplines: [
                    { isVertical: true, color: "blue" as const, x1: 1, x2: 2, y1: 3, y2: 4 },
                    { isHorizontal: true, color: "red" as const, x1: 0, x2: 1, y1: 2, y2: 3 },
                ],
            };

            const action = eventActions.removeDropline({ isVertical: true, color: "blue", x1: 1, x2: 2, y1: 3, y2: 4 });

            expect(eventSlice.reducer(previousState, action)).toEqual({
                ...defaultEventState,
                droplines: [{ isHorizontal: true, color: "red", x1: 0, x2: 1, y1: 2, y2: 3 }],
            });
        });
    });

    describe("TOOLTIP actions", () => {
        it("setTooltipBorderColor()", () => {
            const previousState = {
                ...defaultEventState,
                tooltip: {
                    items: [],
                },
            };
            const action = eventActions.setTooltipBorderColor("#FF0000")

            expect(eventSlice.reducer(previousState, action)).toEqual({
                ...defaultEventState,
                tooltip: {
                    items: [],
                    color: "#FF0000",
                },
            });
        });

        it("addTooltipItem()", () => {
            const previousState = {
                ...defaultEventState,
                tooltip: {
                    items: [],
                },
            };
            const action = eventActions.addTooltipItem({ name: "A", value: 0 });

            expect(eventSlice.reducer(previousState, action)).toEqual({
                ...defaultEventState,
                tooltip: {
                    items: [{ name: "A", value: 0 }],
                },
            });
        });

        it("addTooltipItem() skips duplicates", () => {
            const previousState = {
                ...defaultEventState,
                tooltip: {
                    items: [{ name: "A", value: 0 }],
                },
            };
            const action = eventActions.addTooltipItem({ name: "A", value: 0 });

            expect(eventSlice.reducer(previousState, action)).toEqual({
                ...defaultEventState,
                tooltip: {
                    items: [{ name: "A", value: 0 }],
                },
            });
        });

        it("removeTooltipItem()", () => {
            const previousState = {
                ...defaultEventState,
                tooltip: {
                    items: [{ name: "A", value: 0 }],
                },
            };
            const action = eventActions.removeTooltipItem({ name: "A", value: 0 });

            expect(eventSlice.reducer(previousState, action)).toEqual({
                ...defaultEventState,
                tooltip: {
                    items: [],
                },
            });
        });

        it("setPositionEvent()", () => {
            const previousState = {
                ...defaultEventState,
                tooltip: {
                    items: [],
                },
            };
            const action = eventActions.setPositionEvent({ x: 5, y: 10 });

            expect(eventSlice.reducer(previousState, action)).toEqual({
                ...defaultEventState,
                tooltip: {
                    items: [],
                    position: { x: 5, y: 10 },
                },
            });
        });
    });
});
