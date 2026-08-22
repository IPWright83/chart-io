import { destroyContextMenu, renderContextMenu } from "@chart-io/core";
import type { IContextMenuItem, ITheme } from "@chart-io/core";

import React, { useEffect, useRef } from "react";

export interface IContextMenuProps {
    /**
     * The x-coordinate to anchor the menu at
     */
    x: number;
    /**
     * The y-coordinate to anchor the menu at
     */
    y: number;
    /**
     * Whether the menu should be shown. Segments animate in/out as this changes - the menu stays
     * mounted for `animationDuration` after closing to let the shrink transition play out
     */
    open: boolean;
    /**
     * The pluggable set of actions to show as segments around the ring, in clockwise order starting
     * from 12 o'clock
     */
    items: IContextMenuItem[];
    /**
     * The inner radius of the ring, in pixels
     * @default 28
     */
    radius?: number;
    /**
     * The depth of each segment, in pixels
     * @default 46
     */
    thickness?: number;
    /**
     * The angular gap, in radians, to leave between each segment
     * @default 0.025
     */
    padAngle?: number;
    /**
     * The size, in pixels, that each item's icon is scaled to
     * @default 18
     */
    iconSize?: number;
    /**
     * How long, in milliseconds, the show/hide animation takes
     * @default 220
     */
    animationDuration?: number;
    /**
     * The color palette to render the menu with
     */
    colors?: ITheme["menu"];
    /**
     * Called when an (enabled) item is clicked
     * @param  item     The item that was selected
     */
    onSelect: (item: IContextMenuItem) => void;
    /**
     * Called when the menu should close without an item being selected - clicking outside the
     * menu, or pressing Escape
     */
    onClose?: () => void;
}

/**
 * A pluggable radial (pie-style) context menu. Pass any set of `items` - the icon, label and
 * `onSelect` handler for each segment are entirely up to the caller, so the same component can
 * show a different set of actions depending on what it was opened on (chart background, a specific
 * datum, ...).
 *
 * This is a thin React wrapper around `renderContextMenu`, a framework-agnostic D3 module in
 * `@chart-io/core` that owns the actual rendering/animation/interaction - shared with any other
 * rendering layer built on `@chart-io/core` (e.g. `@chart-io/svelte`). See `<ContextMenuOverlay>`
 * for a Redux-connected version wired up to a chart
 * @param  props    The set of React properties, forwarded as-is to `renderContextMenu`
 * @return          The ContextMenu component
 */
export function ContextMenu(props: IContextMenuProps) {
    const ref = useRef<SVGGElement>(null);

    // Re-render on every commit rather than tracking every individual prop as a dependency -
    // renderContextMenu is cheap and idempotent (it diffs against the container's previous state
    // itself), so this just keeps the rendered menu in sync with the latest props
    useEffect(() => {
        if (ref.current) {
            renderContextMenu(ref.current, props);
        }
    });

    // Full teardown only when this component itself unmounts
    useEffect(() => {
        const container = ref.current;
        return () => {
            if (container) {
                destroyContextMenu(container);
            }
        };
    }, []);

    return <g ref={ref} />;
}
