import { chartActions, chartSelectors } from "../store/chart";
import type { IDispatch, IState } from "../store/types";
import type { IContextMenuContext, IContextMenuItem } from "../types";
import { nextPivot } from "../utils";

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
 * Clears every filter set via `chartActions.setFilter` (e.g. a `<ParallelCoordinates>` axis' brush
 * selection) and every datum hidden via `chartActions.hideDataPoint` (e.g. the "Hide data point"
 * action below). Shown disabled while neither is currently set, fully wired up to the store via
 * `chartActions.clearFilters`/`chartActions.clearHiddenData`
 * @param  state     The current Redux state, used to disable the action while nothing is filtered
 * @return           The "Reset filters" `<ContextMenu>` item
 */
export function createResetFiltersAction(state: IState): IContextMenuItem {
    const hasFilters = Object.keys(chartSelectors.filters.all(state)).length > 0;
    const hasHiddenData = chartSelectors.hiddenData.any(state);

    return {
        id: "reset-filters",
        label: "Reset filters",
        icon: contextMenuIcons.resetFilters,
        disabled: !hasFilters && !hasHiddenData,
        onSelect: (dispatch: IDispatch) => {
            dispatch(chartActions.clearFilters());
            dispatch(chartActions.clearHiddenData());
        },
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
 * Cycles a pivotable chart (currently `<Heatmap>`) between the full grid and each axis collapsed
 * into a single cumulative linear scale, fully wired up to the store via `chartActions.setPivot`.
 * Disabled unless a chart has opted in via `pivotable`, since there's nothing to pivot otherwise.
 * Labelled with the pivot selecting it will switch to
 * @param  state     The current Redux state, used to read whether pivoting is enabled and the
 *                    current pivot
 * @return           The "Pivot" `<ContextMenu>` item
 */
export function createPivotAction(state: IState): IContextMenuItem {
    const pivotable = chartSelectors.pivotable(state);
    const pivot = chartSelectors.pivot(state);
    const next = nextPivot(pivot);

    return {
        id: "pivot",
        label: `Pivot: ${next ?? "grid"}`,
        icon: contextMenuIcons.pivot,
        // The two mini segments hint at the two collapsed-axis layouts ("x"/rows and "y"/columns)
        // pivoting cycles between, alongside the grid
        activeSegments: 2,
        disabled: !pivotable,
        onSelect: (dispatch: IDispatch) => dispatch(chartActions.setPivot(next)),
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
 * Removes the datum the menu was opened on from the chart entirely, via `chartActions.hideDataPoint`
 * - see `chartSelectors.data`, which every plot reads its rows through. Intended for a menu opened
 * with a `"datum"` context (e.g. wired up to a plot's own left-click handler via
 * `eventActions.openContextMenu`); a no-op if opened without one. Undone via the background's
 * "Reset filters" action (`createResetFiltersAction`)
 * @return           The "Hide data point" `<ContextMenu>` item
 */
export function createHideDataPointAction(): IContextMenuItem {
    return {
        id: "hide-data-point",
        label: "Hide data point",
        icon: contextMenuIcons.eyeOff,
        onSelect: (dispatch: IDispatch, context?: IContextMenuContext) => {
            if (context?.datum) {
                dispatch(chartActions.hideDataPoint(context.datum));
            }
        },
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
        createResetFiltersAction(state),
        createPivotAction(state),
        createDrawPolygonAction(),
        createToggleLegendAction(state),
    ];
}

/**
 * A default set of items suited to a menu opened on a specific datum, e.g. wired up to a plot's
 * left-click handler - "Hide data point" is fully wired up (see `createHideDataPointAction`);
 * "Focus data point"/"Add annotation" are placeholders - see each action's own docs
 * @return           A default set of per-datum `<ContextMenu>` items
 */
export function getDefaultDatumItems(): IContextMenuItem[] {
    return [createHideDataPointAction(), createFocusDataPointAction(), createAddAnnotationAction()];
}

/**
 * The default `getItems` used by `<ContextMenuOverlay>` - dispatches between `getDefaultBackgroundItems`
 * and `getDefaultDatumItems` based on what the menu was opened on
 * @param  state     The current Redux state
 * @param  context   The context the menu was opened with
 * @return           The default `<ContextMenu>` items for that context
 */
export function getDefaultItems(state: IState, context?: IContextMenuContext): IContextMenuItem[] {
    return context?.type === "datum" ? getDefaultDatumItems() : getDefaultBackgroundItems(state);
}
