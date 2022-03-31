import { isEqual } from "lodash";

// https://stackoverflow.com/questions/54099633/filter-out-actions-in-redux-devtool-extension#:~:text=In%20the%20Redux%20DevTools%20Extension,the%20Chrome%20Extension%20details%20screen.
const defaultState = {
    droplines: [],
    markers: [],
};

/**
 * Defines a reducer to handle the global chart events
 * @param  {Object} state   The current state
 * @param  {Object} action  The current action being triggerered
 * @return {Object}         The new state
 */
const eventReducer = (state = defaultState, action) => {
    const payload = action.payload || {};
    switch (action.type) {
        case "EVENT.MOUSE_MOVE":
            return {
                ...state,
                mouse: { x: payload.offsetX, y: payload.offsetY, mode: "MOVE" },
            };

        case "EVENT.MOUSE_ENTER":
            return {
                ...state,
                mouse: { x: payload.offsetX, y: payload.offsetY, mode: "ENTER" },
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
                droplines: [...state.droplines, payload],
            };

        case "EVENT.REMOVE_DROPLINE":
            return {
                ...state,
                droplines: state.droplines.filter((d) => !isEqual(d, payload)),
            };

        case "EVENT.ADD_MARKER":
            return {
                ...state,
                markers: [...state.markers, payload],
            };

        case "EVENT.REMOVE_MARKER":
            return {
                ...state,
                markers: state.markers.filter((m) => !isEqual(m, payload)),
            };

        default:
            return state;
    }
};

export { eventReducer };
