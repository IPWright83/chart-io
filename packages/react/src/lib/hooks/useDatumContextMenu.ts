import { eventActions } from "@chart-io/core";
import type { IDatum } from "@chart-io/core";

import { useCallback } from "react";
import { useDispatch } from "react-redux";

/**
 * Returns a handler that opens a `<ContextMenu>` for a specific datum - wire it up to a plot's own
 * marks via `.on("click", ...)` (or the Canvas/virtual-canvas equivalent), alongside whatever the
 * plot's own `onClick` prop already does, so left-clicking a mark shows `getDefaultDatumItems` (e.g.
 * "Hide data point"). Right-clicking is reserved for the chart's own background menu - see
 * `<ContextMenuOverlay>` - so a mark never opens one of its own on right-click
 * @return              A handler to open the datum `<ContextMenu>`, given the datum and the mouse event
 */
export function useDatumContextMenu() {
    const dispatch = useDispatch();

    return useCallback(
        (datum: IDatum, event: MouseEvent) => {
            dispatch(
                eventActions.openContextMenu({
                    x: event.clientX,
                    y: event.clientY,
                    context: { type: "datum", datum },
                }),
            );
        },
        [dispatch],
    );
}
