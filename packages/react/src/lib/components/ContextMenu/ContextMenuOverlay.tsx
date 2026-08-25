import { chartSelectors, eventActions, eventSelectors, getDefaultItems } from "@chart-io/core";
import type { IContextMenuContext, IContextMenuItem, IState } from "@chart-io/core";

import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";

import { ContextMenu } from "./ContextMenu";

export interface IContextMenuOverlayProps {
    /**
     * Builds the set of items to show, given the current Redux state and the context the menu was
     * opened with - override this to add/replace actions. Defaults to `getDefaultItems`, which shows
     * `getDefaultBackgroundItems` ("Reset zoom", "Reset filters", "Pivot", "Draw polygon" and
     * "Hide/Show legend") when opened on the chart background, or `getDefaultDatumItems` ("Hide data
     * point" and stubbed out "Focus data point"/"Add annotation" actions) when opened on a specific
     * datum (see `eventActions.openContextMenu`)
     * @default getDefaultItems
     */
    getItems?: (state: IState, context?: IContextMenuContext) => IContextMenuItem[];
    /**
     * The inner radius of the ring, in pixels. See `<ContextMenu>`
     */
    radius?: number;
    /**
     * The depth of each segment, in pixels. See `<ContextMenu>`
     */
    thickness?: number;
    /**
     * The angular gap, in radians, to leave between each segment. See `<ContextMenu>`
     */
    padAngle?: number;
    /**
     * The angular gap, in radians, to leave at the bottom of the ring. See `<ContextMenu>`
     */
    gapAngle?: number;
    /**
     * The size, in pixels, that each item's icon is scaled to. See `<ContextMenu>`
     */
    iconSize?: number;
    /**
     * How long, in milliseconds, the show/hide animation takes. See `<ContextMenu>`
     */
    animationDuration?: number;
}

/**
 * Wires a `<ContextMenu>` up to a chart: right-clicking the chart's background (not a plot mark, an
 * axis brush, or any other interactive element sitting on top of it) opens it - suppressing the
 * native browser context menu for just that click - populated with `getItems`' pluggable set of
 * actions, themed to match the chart, and dispatching whichever action is selected into the store.
 * Enabled by default on `<XYChart>`/`<RadialChart>` - see their `contextMenu` prop - so you typically
 * don't add this directly; do so only if you want to place/configure it yourself
 *
 * Its open/closed state, position and context live in the Redux store (`eventSelectors.contextMenu`)
 * rather than local component state - the same convention as the mouse position/tooltip/droplines/
 * markers it sits alongside, and it means opening a `<ContextMenu>` isn't something only this
 * component's own click handler can do
 *
 * Plots that support it (e.g. `<Scatter>`, `<Bar>`, `<Donut>`) dispatch `eventActions.openContextMenu`
 * with a `"datum"` context from their own right-click handler on each mark, which this menu also picks
 * up and shows `getDefaultDatumItems` for by default - see the Storybook docs for an example of wiring
 * this up on a custom plot
 * @return             The ContextMenuOverlay component
 */
export function ContextMenuOverlay({
    getItems = getDefaultItems,
    radius,
    thickness,
    padAngle,
    gapAngle,
    iconSize,
    animationDuration,
}: IContextMenuOverlayProps) {
    const dispatch = useDispatch();
    const store = useStore<IState>();
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const isOpen = useSelector((s: IState) => eventSelectors.contextMenu.isOpen(s));
    const position = useSelector((s: IState) => eventSelectors.contextMenu.position(s));
    const context = useSelector((s: IState) => eventSelectors.contextMenu.context(s)) as
        | IContextMenuContext
        | undefined;
    const containerRef = useRef<SVGGElement>(null);

    const close = useCallback(() => dispatch(eventActions.closeContextMenu()), [dispatch]);

    useEffect(() => {
        const svg = containerRef.current?.closest("svg");

        if (!svg) {
            return;
        }

        // "Background" means the click landed on the bare <svg> itself or the invisible hit-target
        // rect XYChart/RadialChart render behind everything else (see <EventReceiver>) - anything
        // else means it hit a real mark, axis, brush or other interactive element sitting on top,
        // which either opens its own "datum" context menu (see the plot's own right-click handler)
        // or keeps the browser's native menu if it doesn't support one
        const isBackground = (target: EventTarget | null) =>
            target === svg || (target instanceof Element && target.classList.contains("event-receiver"));

        // clientX/clientY (viewport space) is all `<ContextMenu>` needs now that it's portaled to
        // document.body and positioned with `position: fixed` - no SVG coordinate-space conversion
        const onContextMenu = (event: MouseEvent) => {
            if (!isBackground(event.target)) {
                return;
            }

            event.preventDefault();
            dispatch(eventActions.openContextMenu({ x: event.clientX, y: event.clientY, context: { type: "background" } }));
        };

        svg.addEventListener("contextmenu", onContextMenu);
        return () => svg.removeEventListener("contextmenu", onContextMenu);
    }, [dispatch]);

    // Snapshot the items when the menu opens, rather than continuously recomputing them on every
    // store update - a right-click captures "what's true right now", same as a native context menu
    const items = useMemo(() => (isOpen ? getItems(store.getState(), context) : []), [isOpen, getItems, store, context]);

    const onSelect = useCallback(
        (item: IContextMenuItem) => {
            item.onSelect(dispatch, context);
            close();
        },
        [dispatch, context, close],
    );

    return (
        <g ref={containerRef} className="chart-io context-menu-overlay">
            <ContextMenu
                x={position?.x ?? 0}
                y={position?.y ?? 0}
                open={isOpen}
                items={items}
                colors={theme.menu}
                radius={radius}
                thickness={thickness}
                padAngle={padAngle}
                gapAngle={gapAngle}
                iconSize={iconSize}
                animationDuration={animationDuration}
                onSelect={onSelect}
                onClose={close}
            />
        </g>
    );
}
