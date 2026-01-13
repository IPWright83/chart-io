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

        expect(eventReducer(previousState, action)).toEqual({});
    });

    it("returns state for unknown action", () => {
        const previousState = {};
        const action = {
            type: "RANDOM_ACTION",
        };
        expect(eventReducer(previousState, action)).toEqual(previousState);
    });
});
