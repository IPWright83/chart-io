import type { IMarker, IDropline } from "@d3-chart/types";

import { eventActions } from "../eventActions";

describe("eventActions", () => {
    const mouseEventArgs = {};
    const dropline = { isHorizontal: true, color: "red", x1: 0, x2: 1, y1: 2, y2: 3 } as IDropline;
    const marker = { fill: "red", r1: 5, r2: 10, cx: 3, cy: 4 } as IMarker;

    it("mouseMove returns the correct action", () => {
        expect(eventActions.mouseMove(mouseEventArgs)).toEqual({
            type: "EVENT.MOUSE_MOVE",
            payload: mouseEventArgs,
        });
    });

    it("mouseEnter returns the correct action", () => {
        expect(eventActions.mouseEnter(mouseEventArgs)).toEqual({
            type: "EVENT.MOUSE_ENTER",
            payload: mouseEventArgs,
        });
    });

    it("mouseExit returns the correct action", () => {
        expect(eventActions.mouseExit(mouseEventArgs)).toEqual({
            type: "EVENT.MOUSE_EXIT",
            payload: mouseEventArgs,
        });
    });

    it("addDropline returns the correct action", () => {
        expect(eventActions.addDropline(dropline)).toEqual({
            type: "EVENT.ADD_DROPLINE",
            payload: dropline,
        });
    });

    it("removeDropline returns the correct action", () => {
        expect(eventActions.removeDropline(dropline)).toEqual({
            type: "EVENT.REMOVE_DROPLINE",
            payload: dropline,
        });
    });

    it("addMarker returns the correct action", () => {
        expect(eventActions.addMarker(marker)).toEqual({
            type: "EVENT.ADD_MARKER",
            payload: marker,
        });
    });

    it("removeMarker returns the correct action", () => {
        expect(eventActions.removeMarker(marker)).toEqual({
            type: "EVENT.REMOVE_MARKER",
            payload: marker,
        });
    });
});
