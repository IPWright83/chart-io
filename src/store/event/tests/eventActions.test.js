import { eventActions } from "../eventActions";

describe("eventActions", () => {
    const mouseEventArgs = {};

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
});
