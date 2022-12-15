import type { IMouseMode, IMarker, IDropline } from "../../../types";
import type {
    MouseMoveAction,
    MouseEnterAction,
    MouseExitAction,
    AddDroplineAction,
    RemoveDroplineAction,
    AddMarkerAction,
    RemoveMarkerAction,
    SetTooltipBorderColorAction,
    AddTooltipItemAction,
    RemoveTooltipItemAction,
    SetTooltipPositionAction,
} from "../types";
import { defaultEventState, eventReducer } from "../eventReducer";

describe("eventReducer", () => {
    describe("MOUSE actions", () => {
        it("EVENT.MOUSE_MOVE action", () => {
            const previousState = {
                ...defaultEventState,
                mouse: { x: 5, y: 10, mode: "ENTER" as IMouseMode },
            };

            const action = {
                type: "EVENT.MOUSE_MOVE",
                payload: { offsetX: 5, offsetY: 10, mode: "MOVE" },
            } as MouseMoveAction;

            expect(eventReducer(previousState, action)).toEqual({
                mouse: { x: 5, y: 10, mode: "MOVE" },
            });
        });

        it("EVENT.MOUSE_MOVE action if not recieved a previous MOUSE_ENTER", () => {
            const previousState = defaultEventState;

            const action = {
                type: "EVENT.MOUSE_MOVE",
                payload: { offsetX: 5, offsetY: 10, mode: "MOVE" },
            } as MouseMoveAction;

            expect(eventReducer(previousState, action)).toEqual({});
        });

        it("EVENT.MOUSE_ENTER action", () => {
            const previousState = defaultEventState;

            const action = {
                type: "EVENT.MOUSE_ENTER",
                payload: { offsetX: 5, offsetY: 10, mode: "ENTER" },
            } as MouseEnterAction;

            expect(eventReducer(previousState, action)).toEqual({
                mouse: { x: 5, y: 10, mode: "ENTER" },
            });
        });

        it("EVENT.MOUSE_EXIT", () => {
            const previousState = {
                ...defaultEventState,
                mouse: { x: 5, y: 10, mode: "ENTER" as IMouseMode },
            };

            const action = {
                type: "EVENT.MOUSE_EXIT",
            } as MouseExitAction;

            expect(eventReducer(previousState, action)).toEqual({
                droplines: [],
                markers: [],
                mouse: undefined,
            });
        });
    });

    describe("MARKER actions", () => {
        it("EVENT.ADD_MARKER", () => {
            const previousState = {
                ...defaultEventState,
                markers: [{ fill: "#ff0000", r1: 5, r2: 10, cx: 3, cy: 4 }],
            };

            const action = {
                type: "EVENT.ADD_MARKER",
                payload: { fill: "#0000ff", r1: 15, r2: 20, cx: 14, cy: 54 } as IMarker,
            } as AddMarkerAction;

            expect(eventReducer(previousState, action)).toEqual({
                markers: [
                    { fill: "#ff0000", r1: 5, r2: 10, cx: 3, cy: 4 },
                    { fill: "#0000ff", r1: 15, r2: 20, cx: 14, cy: 54 },
                ],
            });
        });

        it("EVENT.REMOVE_MARKER", () => {
            const previousState = {
                ...defaultEventState,
                markers: [
                    { fill: "#0000ff", r1: 15, r2: 20, cx: 14, cy: 54 },
                    { fill: "#ff0000", r1: 5, r2: 10, cx: 3, cy: 4 },
                ] as Array<IMarker>,
            };

            const action = {
                type: "EVENT.REMOVE_MARKER",
                payload: { fill: "#0000ff", r1: 15, r2: 20, cx: 14, cy: 54 } as IMarker,
            } as RemoveMarkerAction;

            expect(eventReducer(previousState, action)).toEqual({
                markers: [{ fill: "#ff0000", r1: 5, r2: 10, cx: 3, cy: 4 }],
            });
        });
    });

    describe("DROPLINE actions", () => {
        it("EVENT.ADD_DROPLINE", () => {
            const previousState = {
                ...defaultEventState,
                droplines: [{ isHorizontal: true, color: "#ff0000", x1: 0, x2: 1, y1: 2, y2: 3 }] as Array<IDropline>,
            };

            const action = {
                type: "EVENT.ADD_DROPLINE",
                payload: { isVertical: true, color: "#0000ff", x1: 1, x2: 2, y1: 3, y2: 4 } as IDropline,
            } as AddDroplineAction;

            expect(eventReducer(previousState, action)).toEqual({
                droplines: [
                    { isHorizontal: true, color: "#ff0000", x1: 0, x2: 1, y1: 2, y2: 3 },
                    { isVertical: true, color: "#0000ff", x1: 1, x2: 2, y1: 3, y2: 4 },
                ],
            });
        });

        it("EVENT.REMOVE_DROPLINE", () => {
            const previousState = {
                ...defaultEventState,
                droplines: [
                    { isVertical: true, color: "#0000ff", x1: 1, x2: 2, y1: 3, y2: 4 },
                    { isHorizontal: true, color: "#ff0000", x1: 0, x2: 1, y1: 2, y2: 3 },
                ] as Array<IDropline>,
            };

            const action = {
                type: "EVENT.REMOVE_DROPLINE",
                payload: { isVertical: true, color: "#0000ff", x1: 1, x2: 2, y1: 3, y2: 4 } as IDropline,
            } as RemoveDroplineAction;

            expect(eventReducer(previousState, action)).toEqual({
                droplines: [{ isHorizontal: true, color: "#ff0000", x1: 0, x2: 1, y1: 2, y2: 3 }],
            });
        });
    });

    describe("TOOLTIP actions", () => {
        it("EVENT.SET_TOOLTIP_COLOR", () => {
            const previousState = {
                ...defaultEventState,
                tooltip: {
                    items: [],
                },
            };

            const action = {
                type: "EVENT.SET_TOOLTIP_COLOR",
                payload: "#FF0000",
            } as SetTooltipBorderColorAction;

            expect(eventReducer(previousState, action)).toEqual({
                tooltip: {
                    items: [],
                    color: "#FF0000",
                },
            });
        });

        it("EVENT.ADD_TOOLTIP_ITEM", () => {
            const previousState = {
                ...defaultEventState,
                tooltip: {
                    items: [],
                },
            };

            const action = {
                type: "EVENT.ADD_TOOLTIP_ITEM",
                payload: { name: "A", value: 0 },
            } as AddTooltipItemAction;

            expect(eventReducer(previousState, action)).toEqual({
                tooltip: {
                    items: [{ name: "A", value: 0 }],
                },
            });
        });

        it("EVENT.ADD_TOOLTIP_ITEM skips duplicates", () => {
            const previousState = {
                ...defaultEventState,
                tooltip: {
                    items: [{ name: "A", value: 0 }],
                },
            };

            const action = {
                type: "EVENT.ADD_TOOLTIP_ITEM",
                payload: { name: "A", value: 0 },
            } as AddTooltipItemAction;

            expect(eventReducer(previousState, action)).toEqual({
                tooltip: {
                    items: [{ name: "A", value: 0 }],
                },
            });
        });

        it("EVENT.REMOVE_TOOLTIP_ITEM", () => {
            const previousState = {
                ...defaultEventState,
                tooltip: {
                    items: [{ name: "A", value: 0 }],
                },
            };

            const action = {
                type: "EVENT.REMOVE_TOOLTIP_ITEM",
                payload: { name: "A", value: 0 },
            } as RemoveTooltipItemAction;

            expect(eventReducer(previousState, action)).toEqual({
                tooltip: {
                    items: [],
                },
            });
        });

        it("EVENT.SET_POSITION_TOOLTIP_ITEM_EVENT", () => {
            const previousState = {
                ...defaultEventState,
                tooltip: {
                    items: [],
                },
            };

            const action = {
                type: "EVENT.SET_POSITION_TOOLTIP_ITEM_EVENT",
                payload: { x: 5, y: 10 },
            } as SetTooltipPositionAction;

            expect(eventReducer(previousState, action)).toEqual({
                tooltip: {
                    items: [],
                    position: { x: 5, y: 10 },
                },
            });
        });
    });

    it("returns state for unknown action", () => {
        const previousState = defaultEventState;
        const action = {
            type: "RANDOM_ACTION",
        };

        // @ts-expect-error Testing the safety of the interface for a random action
        expect(eventReducer(previousState, action)).toEqual(previousState);
    });
});
