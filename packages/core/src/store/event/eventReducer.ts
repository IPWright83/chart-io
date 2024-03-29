import { isEqual } from "lodash";

import type { EventAction } from "./types";
import type { IEventState } from "../types";

// https://stackoverflow.com/questions/54099633/filter-out-actions-in-redux-devtool-extension#:~:text=In%20the%20Redux%20DevTools%20Extension,the%20Chrome%20Extension%20details%20screen.
export const defaultEventState = {
    droplines: [],
    markers: [],
    tooltip: {
        items: [],
    },
};

/**
 * Defines a reducer to handle the global chart events
 * @param  state   The current state
 * @param  action  The current action being triggerered
 * @return         The new state
 */
const eventReducer = (state: IEventState = defaultEventState, action: EventAction): IEventState => {
    // const payload = action.payload;

    switch (action.type) {
        case "EVENT.MOUSE_MOVE":
            // Ignore events if no MOUSE_ENTER was recieved. This prevents
            // bugs where a MouseMove fires straight after a MouseExit
            if (!state.mouse) {
                return state;
            }

            // Optimisation
            if (
                state.mouse.x === action.payload.offsetX &&
                state.mouse.y === action.payload.offsetY &&
                state.mouse.mode === "MOVE"
            ) {
                // istanbul ignore next
                return state;
            }

            return {
                ...state,
                mouse: { x: action.payload.offsetX, y: action.payload.offsetY, mode: "MOVE" },
            };

        case "EVENT.MOUSE_ENTER":
            return {
                ...state,
                mouse: { x: action.payload.offsetX, y: action.payload.offsetY, mode: "ENTER" },
            };

        case "EVENT.MOUSE_EXIT":
            return {
                ...state,
                mouse: undefined,
                droplines: [],
                markers: [],
            };

        case "EVENT.ADD_DROPLINE":
            return {
                ...state,
                droplines: [...state.droplines, action.payload],
            };

        case "EVENT.REMOVE_DROPLINE":
            return {
                ...state,
                droplines: state.droplines.filter((d) => !isEqual(d, action.payload)),
            };

        case "EVENT.ADD_MARKER":
            return {
                ...state,
                markers: [...state.markers, action.payload],
            };

        case "EVENT.REMOVE_MARKER":
            return {
                ...state,
                markers: state.markers.filter((m) => !isEqual(m, action.payload)),
            };

        case "EVENT.SET_TOOLTIP_COLOR":
            return {
                ...state,
                tooltip: {
                    ...state.tooltip,
                    color: action.payload,
                },
            };

        case "EVENT.ADD_TOOLTIP_ITEM":
            // Don't add duplicate items (e.g. the x for multiple series)
            if (state?.tooltip?.items?.map((item) => item.name).includes(action.payload.name)) {
                return state;
            }

            return {
                ...state,
                tooltip: {
                    ...state.tooltip,
                    items: [...state.tooltip.items, action.payload],
                },
            };

        case "EVENT.REMOVE_TOOLTIP_ITEM":
            return {
                ...state,
                tooltip: {
                    ...state.tooltip,
                    items: state.tooltip.items.filter((t) => !isEqual(t, action.payload)),
                },
            };

        case "EVENT.SET_POSITION_TOOLTIP_ITEM_EVENT":
            return {
                ...state,
                tooltip: {
                    ...state.tooltip,
                    position: action.payload,
                },
            };

        default:
            return state;
    }
};

export { eventReducer };
