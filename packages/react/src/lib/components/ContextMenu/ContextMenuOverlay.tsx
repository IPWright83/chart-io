import { chartSelectors } from "@chart-io/core";
import type { IState } from "@chart-io/core";

import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";

import { ContextMenu } from "./ContextMenu";
import { getDefaultBackgroundItems } from "./actions";
import { getSvgPoint } from "./getSvgPoint";
import type { IContextMenuContext, IContextMenuItem } from "./types";
import { useContextMenu } from "./useContextMenu";

export interface IContextMenuOverlayProps {
    /**
     * Builds the set of items to show when right-clicking the chart background, given the current
     * Redux state - override this to add/replace actions. Defaults to `getDefaultBackgroundItems`,
     * which includes stubbed out "Reset zoom", "Pivot", "Draw polygon" and "Hide/Show legend" actions
     * @default getDefaultBackgroundItems
     */
    getItems?: (state: IState) => IContextMenuItem[];
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
     * The size, in pixels, that each item's icon is scaled to. See `<ContextMenu>`
     */
    iconSize?: number;
    /**
     * How long, in milliseconds, the show/hide animation takes. See `<ContextMenu>`
     */
    animationDuration?: number;
}

/**
 * Wires a `<ContextMenu>` up to a chart: right-clicking anywhere within the chart (background or
 * on top of a plot) opens it, populated with `getItems`' pluggable set of actions, themed to match
 * the chart, and dispatching whichever action is selected into the store. Add it as a child of
 * `<Chart>` alongside your plots
 *
 * For datum-specific actions (e.g. "Hide data point"), use `useContextMenu` and `<ContextMenu>`
 * directly instead, wired up to a plot's own `onClick` - see the Storybook docs for an example
 * @return             The ContextMenuOverlay component
 */
export function ContextMenuOverlay({
    getItems = getDefaultBackgroundItems,
    radius,
    thickness,
    padAngle,
    iconSize,
    animationDuration,
}: IContextMenuOverlayProps) {
    const dispatch = useDispatch();
    const store = useStore<IState>();
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const containerRef = useRef<SVGGElement>(null);
    const { isOpen, x, y, context, open, close } = useContextMenu<IContextMenuContext>();

    useEffect(() => {
        const svg = containerRef.current?.closest("svg");

        if (!svg) {
            return;
        }

        const onContextMenu = (event: MouseEvent) => {
            event.preventDefault();
            const point = getSvgPoint(svg, event.clientX, event.clientY);
            open(point.x, point.y, { type: "background" });
        };

        svg.addEventListener("contextmenu", onContextMenu);
        return () => svg.removeEventListener("contextmenu", onContextMenu);
    }, [open]);

    // Snapshot the items when the menu opens, rather than continuously recomputing them on every
    // store update - a right-click captures "what's true right now", same as a native context menu
    const items = useMemo(() => (isOpen ? getItems(store.getState()) : []), [isOpen, getItems, store]);

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
                x={x}
                y={y}
                open={isOpen}
                items={items}
                colors={theme.menu}
                radius={radius}
                thickness={thickness}
                padAngle={padAngle}
                iconSize={iconSize}
                animationDuration={animationDuration}
                onSelect={onSelect}
                onClose={close}
            />
        </g>
    );
}
