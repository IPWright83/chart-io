import { eventActions } from "@chart-io/core";
import type { IDatum } from "@chart-io/core";

import { useCallback } from "react";
import { useDispatch } from "react-redux";

/**
 * Returns a handler that opens a `<ContextMenu>` for a specific datum - wire it up to a plot's own
 * marks via `.on("contextmenu", ...)` (or the Canvas/virtual-canvas equivalent) so right-clicking a
 * mark shows `getDefaultDatumItems` (e.g. "Hide data point") instead of the browser's native menu or
 * the chart's own background menu. See `<ContextMenuOverlay>`
 * @return              A handler to open the datum `<ContextMenu>`, given the datum and the mouse event
 */
export function useDatumContextMenu() {
    const dispatch = useDispatch();

    return useCallback(
        (datum: IDatum, event: MouseEvent) => {
            event.preventDefault();
            event.stopPropagation();
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
