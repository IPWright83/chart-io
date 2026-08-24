import { chartActions, chartSelectors } from "../store/chart";
import type { IDispatch, IState } from "../store/types";
import type { IContextMenuContext, IContextMenuItem } from "../types";

import { contextMenuIcons } from "./icons";

/**
 * Resets any zoom applied to the chart - both a zoomable hierarchical plot's zoom path (see
 * `zoomable`/`useZoom`) and any scale zoomed in via a `<HorizontalZoomBrush>`/`<VerticalZoomBrush>`.
 * Shown disabled while nothing is zoomed in, fully wired up to the store via `chartActions.resetZoom`
 * @param  state     The current Redux state, used to disable the action while nothing is zoomed
 * @return           The "Reset zoom" `<ContextMenu>` item
 */
export function createResetZoomAction(state: IState): IContextMenuItem {
    return {
        id: "reset-zoom",
        label: "Reset zoom",
        icon: contextMenuIcons.resetZoom,
        disabled: !chartSelectors.isZoomed(state),
        onSelect: (dispatch: IDispatch) => dispatch(chartActions.resetZoom()),
    };
}

/**
 * Toggles whether the Legend is shown, fully wired up to the store via `chartActions.setLegendVisible`.
 * Labelled/iconed according to the legend's current visibility
 * @param  state     The current Redux state, used to read the legend's current visibility
 * @return           The "Hide legend"/"Show legend" `<ContextMenu>` item
 */
export function createToggleLegendAction(state: IState): IContextMenuItem {
    const hidden = chartSelectors.legend.isHidden(state);

    return {
        id: "toggle-legend",
        label: hidden ? "Show legend" : "Hide legend",
        icon: hidden ? contextMenuIcons.eye : contextMenuIcons.eyeOff,
        onSelect: (dispatch: IDispatch) => dispatch(chartActions.setLegendVisible(hidden)),
    };
}

/**
 * Placeholder for pivoting a heatmap-style plot between column/row/grid orientations. There's no
 * store concept of a pivot to dispatch to yet, so this just logs - replace `onSelect` with a real
 * dispatch once one exists
 * @return           The "Pivot" `<ContextMenu>` item
 */
export function createPivotAction(): IContextMenuItem {
    return {
        id: "pivot",
        label: "Pivot",
        icon: contextMenuIcons.pivot,
        onSelect: () => console.debug("[ContextMenu] 'Pivot' isn't wired up to anything yet"),
    };
}

/**
 * Placeholder for entering an interactive polygon-drawing mode, e.g. to define a custom
 * selection/threshold band (see `<Polygon>`). There's no store concept of a drawing mode to
 * dispatch to yet, so this just logs - replace `onSelect` with a real dispatch once one exists
 * @return           The "Draw polygon" `<ContextMenu>` item
 */
export function createDrawPolygonAction(): IContextMenuItem {
    return {
        id: "draw-polygon",
        label: "Draw polygon",
        icon: contextMenuIcons.drawPolygon,
        onSelect: () => console.debug("[ContextMenu] 'Draw polygon' isn't wired up to anything yet"),
    };
}

/**
 * Placeholder for hiding the datum the menu was opened on. Intended for a menu opened with a
 * `"datum"` context (e.g. wired up to a plot's own `onClick` via `eventActions.openContextMenu`).
 * There's no store concept of a hidden/excluded datum yet, so this just logs
 * @return           The "Hide data point" `<ContextMenu>` item
 */
export function createHideDataPointAction(): IContextMenuItem {
    return {
        id: "hide-data-point",
        label: "Hide data point",
        icon: contextMenuIcons.eyeOff,
        onSelect: (dispatch: IDispatch, context?: IContextMenuContext) =>
            console.debug("[ContextMenu] 'Hide data point' isn't wired up to anything yet", context?.datum),
    };
}

/**
 * Placeholder for focusing (highlighting) the datum the menu was opened on. There's no store
 * concept of a persistently focused datum yet, so this just logs
 * @return           The "Focus data point" `<ContextMenu>` item
 */
export function createFocusDataPointAction(): IContextMenuItem {
    return {
        id: "focus-data-point",
        label: "Focus data point",
        icon: contextMenuIcons.focus,
        onSelect: (dispatch: IDispatch, context?: IContextMenuContext) =>
            console.debug("[ContextMenu] 'Focus data point' isn't wired up to anything yet", context?.datum),
    };
}

/**
 * Placeholder for attaching an annotation to the datum the menu was opened on. There's no store
 * concept of annotations yet, so this just logs
 * @return           The "Add annotation" `<ContextMenu>` item
 */
export function createAddAnnotationAction(): IContextMenuItem {
    return {
        id: "add-annotation",
        label: "Add annotation",
        icon: contextMenuIcons.annotation,
        onSelect: (dispatch: IDispatch, context?: IContextMenuContext) =>
            console.debug("[ContextMenu] 'Add annotation' isn't wired up to anything yet", context?.datum),
    };
}

/**
 * The default set of items shown when right-clicking the chart background - see `<ContextMenuOverlay>`
 * @param  state     The current Redux state
 * @return           The default background `<ContextMenu>` items
 */
export function getDefaultBackgroundItems(state: IState): IContextMenuItem[] {
    return [
        createResetZoomAction(state),
        createPivotAction(),
        createDrawPolygonAction(),
        createToggleLegendAction(state),
    ];
}

/**
 * A default set of items suited to a menu opened on a specific datum, e.g. wired up to a plot's
 * `onClick`. None of these have real behaviour yet - see each action's own docs
 * @return           A default set of per-datum `<ContextMenu>` items
 */
export function getDefaultDatumItems(): IContextMenuItem[] {
    return [createHideDataPointAction(), createFocusDataPointAction(), createAddAnnotationAction()];
}
