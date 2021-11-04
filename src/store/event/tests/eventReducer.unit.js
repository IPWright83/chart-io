import { eventReducer } from "../eventReducer";

describe("eventReducer", () => {
    it("EVENT.MOUSE_MOVE action", () => {
        const previousState = {
            mouse: { x: 5, y: 10, mode: "ENTER" },
        };
        const action = {
            type: "EVENT.MOUSE_MOVE",
            payload: { offsetX: 5, offsetY: 10, mode: "MOVE" },
        };

        expect(eventReducer(previousState, action)).toEqual({
            mouse: { x: 5, y: 10, mode: "MOVE" },
        });
    });

    it("EVENT.MOUSE_ENTER action", () => {
        const previousState = {};

        const action = {
            type: "EVENT.MOUSE_ENTER",
            payload: { offsetX: 5, offsetY: 10, mode: "ENTER" },
        };

        expect(eventReducer(previousState, action)).toEqual({
            mouse: { x: 5, y: 10, mode: "ENTER" },
        });
    });

    it("EVENT.MOUSE_EXIT", () => {
        const previousState = {
            mouse: { x: 5, y: 10, mode: "ENTER" },
        };

        const action = {
            type: "EVENT.MOUSE_EXIT",
        };

        expect(eventReducer(previousState, action)).toEqual({
            droplines: [],
            markers: [],
            mouse: undefined,
        });
    });

    it("EVENT.ADD_MARKER", () => {
        const previousState = {
            markers: [{ fill: "red", r1: 5, r2: 10, cx: 3, cy: 4 }],
        };

        const action = {
            type: "EVENT.ADD_MARKER",
            payload: { fill: "blue", r1: 15, r2: 20, cx: 14, cy: 54 },
        };

        expect(eventReducer(previousState, action)).toEqual({
            markers: [
                { fill: "red", r1: 5, r2: 10, cx: 3, cy: 4 },
                { fill: "blue", r1: 15, r2: 20, cx: 14, cy: 54 },
            ],
        });
    });

    it("EVENT.REMOVE_MARKER", () => {
        const previousState = {
            markers: [
                { fill: "blue", r1: 15, r2: 20, cx: 14, cy: 54 },
                { fill: "red", r1: 5, r2: 10, cx: 3, cy: 4 },
            ],
        };

        const action = {
            type: "EVENT.REMOVE_MARKER",
            payload: { fill: "blue", r1: 15, r2: 20, cx: 14, cy: 54 },
        };

        expect(eventReducer(previousState, action)).toEqual({
            markers: [{ fill: "red", r1: 5, r2: 10, cx: 3, cy: 4 }],
        });
    });

    it("EVENT.ADD_DROPLINE", () => {
        const previousState = {
            droplines: [{ isHorizontal: true, color: "red", x1: 0, x2: 1, y1: 2, y2: 3 }],
        };

        const action = {
            type: "EVENT.ADD_DROPLINE",
            payload: { isVertical: true, color: "blue", x1: 1, x2: 2, y1: 3, y2: 4 },
        };

        expect(eventReducer(previousState, action)).toEqual({
            droplines: [
                { isHorizontal: true, color: "red", x1: 0, x2: 1, y1: 2, y2: 3 },
                { isVertical: true, color: "blue", x1: 1, x2: 2, y1: 3, y2: 4 },
            ],
        });
    });

    it("EVENT.REMOVE_DROPLINE", () => {
        const previousState = {
            droplines: [
                { isVertical: true, color: "blue", x1: 1, x2: 2, y1: 3, y2: 4 },
                { isHorizontal: true, color: "red", x1: 0, x2: 1, y1: 2, y2: 3 },
            ],
        };

        const action = {
            type: "EVENT.REMOVE_DROPLINE",
            payload: { isVertical: true, color: "blue", x1: 1, x2: 2, y1: 3, y2: 4 },
        };

        expect(eventReducer(previousState, action)).toEqual({
            droplines: [{ isHorizontal: true, color: "red", x1: 0, x2: 1, y1: 2, y2: 3 }],
        });
    });

    it("returns state for unknown action", () => {
        const previousState = {};
        const action = {
            type: "RANDOM_ACTION",
        };
        expect(eventReducer(previousState, action)).toEqual(previousState);
    });
});
