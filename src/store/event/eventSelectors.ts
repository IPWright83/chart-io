import { IMarker, IDropline, ICoordinate } from "../../types";
import { IStore, IEventStore } from "../types";

const eventSelectors = {
    /**
     * Returns the store for the chart part of state
     * @param  state    The application state
     * @return          The state
     */
    store: (state: IStore): IEventStore => state.event,

    /**
     * Returns the set of droplines
     * @param  state   The application state
     * @return         The droplines
     */
    droplines: (state: IStore): IDropline[] => eventSelectors.store(state)?.droplines || [],

    /**
     * Returns the set of markers
     * @param  state   The application state
     * @return         The markers
     */
    markers: (state: IStore): IMarker[] => eventSelectors.store(state)?.markers || [],

    /**
     * The current position of the mouse events
     * @param  state        The application state
     * @return              An object with { x, y } positions or null
     */
    position: (state: IStore): ICoordinate | undefined => {
        const { mouse } = eventSelectors.store(state);
        if (!mouse) {
            return;
        }

        return { x: mouse.x, y: mouse.y };
    },

    /**
     * The current mode for the chart events. This will depend on the last
     * event fired. If the cursor isn't over the chart then this should be "NONE"
     * otherwise it will be either "ENTER" for the first event, or "MOVE" for all future
     * events
     * @param  {Object} state The application state
     * @return {String}       One of "NONE", "MOVE" or "ENTER"
     */
    mode: (state: IStore): "NONE" | "MOVE" | "ENTER" => {
        const { mouse } = eventSelectors.store(state);
        if (!mouse) {
            return "NONE";
        }

        return mouse.mode;
    },
};

export { eventSelectors };
