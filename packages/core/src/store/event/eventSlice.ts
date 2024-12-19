import type { IColor, IDropline, IMarker, IMouseEvent, ITooltipItem } from "@chart-io/types";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { isEqual } from "lodash";

import type { IEventState } from "../types";

// https://stackoverflow.com/questions/54099633/filter-out-actions-in-redux-devtool-extension#:~:text=In%20the%20Redux%20DevTools%20Extension,the%20Chrome%20Extension%20details%20screen.
export const defaultEventState = {
    droplines: [],
    markers: [],
    tooltip: {
        items: [],
    },
};

const eventSlice = createSlice({
    name: "event",
    initialState: defaultEventState,
    reducers: {
        /**
         * Sets the mouse move event as being active in the store
         * @param state The current Redux store state
         * @param action Payload containing the arguments from the mouse event
         */
        mouseMove: (state: IEventState, action: PayloadAction<IMouseEvent>) => {
            // Ignore events if no MOUSE_ENTER was recieved. This prevents
            // bugs where a MouseMove fires straight after a MouseExit
            if (!state.mouse) {
                return;
            }

            // Optimisation
            if (
                state.mouse.x === action.payload.offsetX &&
                state.mouse.y === action.payload.offsetY &&
                state.mouse.mode === "MOVE"
            ) {
                // istanbul ignore next
                return;
            }

            state.mouse = {
                x: action.payload.offsetX,
                y: action.payload.offsetY,
                mode: "MOVE"
            };
        },

        /**
         * Sets the mouse enter event as being active in the store
         * @param state The current Redux store state
         * @param action Payload containing the arguments from the mouse event
         */
        mouseEnter: (state: IEventState, action: PayloadAction<IMouseEvent>) => {
            state.mouse = {
                x: action.payload.offsetX,
                y: action.payload.offsetY,
                mode: "ENTER"
            };
        },

        /**
         * Sets the mouse exit event as being active in the store
         * @param state The current Redux store state
         * @param action Payload containing the arguments from the mouse event
         */
        mouseExit: (state: IEventState) => {
            delete state.mouse;
            state.droplines = [];
            state.markers = [];
        },

        /**
         * Adds a dropline to the store
         * @param state The current Redux store state
         * @param action Payload containing the arguments for the dropline
         */
        addDropline: (state: IEventState, action: PayloadAction<IDropline>) => {
            state.droplines.push(action.payload);
        },

        /**
         * Removes a dropline to the store
         * @param state The current Redux store state
         * @param action Payload containing the arguments for the dropline
         */
        removeDropline: (state: IEventState, action: PayloadAction<IDropline>) => {
            state.droplines = state.droplines.filter((d) => !isEqual(d, action.payload));
        },

        /**
         * Adds a marker to the store
         * @param state The current Redux store state
         * @param action Payload containing the arguments for the marker
         */
        addMarker: (state: IEventState, action: PayloadAction<IMarker>) => {
            state.markers.push(action.payload);
        },

        /**
         * Removes a marker to the store
         * @param state The current Redux store state
         * @param action Payload containing the arguments for the marker
         */
        removeMarker: (state: IEventState, action: PayloadAction<IMarker>) => {
            state.markers = state.markers.filter((m) => !isEqual(m, action.payload));
        },

        /**
         * Sets the color of the tooltip border
         * @param state The current Redux store state
         * @param action Payload containing the hex color to use for the tooltip border
         */
        setTooltipBorderColor: (state: IEventState, action: PayloadAction<IColor | undefined>) => {
            if (state.tooltip) {
                state.tooltip.color = action.payload;
            }
        },

        /**
         * Adds a tooltip item to the list of entries the tooltip should display
         * @param state The current Redux store state
         * @param action Payload containing the tooltip item to add
         */
        addTooltipItem: (state: IEventState, action: PayloadAction<ITooltipItem>) => {
            // Don't add duplicate items (e.g. the x for multiple series)
            if (state?.tooltip?.items?.map((item) => item.name).includes(action.payload.name)) {
                return;
            }

            if (state.tooltip && state.tooltip.items) {
                state.tooltip.items.push(action.payload);
            }
        },

        /**
         * Removes a tooltip item from the list of entries the tooltip should display
         * @param state The current Redux store state
         * @param action Payload containing the tooltip item to remove
         */
        removeTooltipItem: (state: IEventState, action: PayloadAction<ITooltipItem>) => {
            if (state.tooltip && state.tooltip.items) {
                state.tooltip.items = state.tooltip.items.filter((t) => !isEqual(t, action.payload));
            }
        },

        /**
         * Updates the position of the tooltip based on the given mouse event
         * @param state The current Redux store state
         * @param action Payload containing the { x, y } mouse location
         */
        setPositionEvent: (state: IEventState, action: PayloadAction<{ x: number, y: number }>) => {
            state.tooltip = state.tooltip ?? { items: [] };
            state.tooltip.position = action.payload;
        }
    },
},
);


const eventActions = eventSlice.actions;

export { eventActions, eventSlice };

