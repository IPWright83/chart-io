import { d3, themes } from "@chart-io/core";
import type { ITheme } from "@chart-io/core";

import React, { useEffect, useMemo, useRef, useState } from "react";

import type { IContextMenuItem } from "./types";

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
     * Whether the menu should be shown. Segments animate in growing out from the center when this
     * becomes `true`, and shrink back when it becomes `false` - the menu stays mounted for
     * `animationDuration` after that to let the shrink transition play out
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
     * @default themes.light.menu
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
 * datum, ...). See `<ContextMenuOverlay>` for a Redux-connected version wired up to a chart
 * @return             The ContextMenu component
 */
export function ContextMenu({
    x,
    y,
    open,
    items,
    radius = 28,
    thickness = 46,
    padAngle = 0.025,
    iconSize = 18,
    animationDuration = 220,
    colors = themes.light.menu,
    onSelect,
    onClose,
}: IContextMenuProps) {
    const containerRef = useRef<SVGGElement>(null);
    const [mounted, setMounted] = useState(open);
    const [entered, setEntered] = useState(false);
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    // Grow in on open, shrink out on close - stay mounted while the shrink transition plays
    useEffect(() => {
        if (open) {
            setMounted(true);
            const raf = requestAnimationFrame(() => setEntered(true));
            return () => cancelAnimationFrame(raf);
        }

        setEntered(false);
        const timeout = setTimeout(() => setMounted(false), animationDuration);
        return () => clearTimeout(timeout);
    }, [open, animationDuration]);

    // Close on Escape, or on clicking/tapping anywhere outside the menu
    useEffect(() => {
        if (!open) {
            return;
        }

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose?.();
            }
        };

        const onPointerDown = (event: PointerEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                onClose?.();
            }
        };

        window.addEventListener("keydown", onKeyDown);
        window.addEventListener("pointerdown", onPointerDown);

        return () => {
            window.removeEventListener("keydown", onKeyDown);
            window.removeEventListener("pointerdown", onPointerDown);
        };
    }, [open, onClose]);

    const arcs = useMemo(() => {
        const pie = d3
            .pie<IContextMenuItem>()
            .value(() => 1)
            .padAngle(padAngle)
            .sort(null);

        return pie(items);
    }, [items, padAngle]);

    const arcGenerator = useMemo(
        () =>
            d3
                .arc<d3.PieArcDatum<IContextMenuItem>>()
                .innerRadius(radius)
                .outerRadius(radius + thickness)
                .cornerRadius(3),
        [radius, thickness],
    );

    if (!mounted) {
        return null;
    }

    const scaleStyle: React.CSSProperties = {
        transformOrigin: "0px 0px",
        transform: entered ? "scale(1)" : "scale(0.4)",
        opacity: entered ? 1 : 0,
        transition: `transform ${animationDuration}ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity ${animationDuration}ms ease-out`,
    };

    return (
        <g
            ref={containerRef}
            className="chart-io context-menu"
            transform={`translate(${x}, ${y})`}
            onContextMenu={(event) => event.preventDefault()}
        >
            <g style={scaleStyle}>
                {arcs.map((arc) => {
                    const item = arc.data;
                    const isHovered = !item.disabled && hoveredId === item.id;
                    const [ix, iy] = arcGenerator.centroid(arc);

                    const fill = item.disabled
                        ? colors.backgroundDisabled
                        : isHovered
                          ? colors.backgroundHover
                          : colors.background;

                    const icon = React.isValidElement(item.icon)
                        ? React.cloneElement(item.icon as React.ReactElement, { width: iconSize, height: iconSize })
                        : item.icon;

                    return (
                        <g key={item.id} className="chart-io context-menu-item" data-disabled={!!item.disabled}>
                            <path
                                d={arcGenerator(arc) ?? undefined}
                                fill={fill?.toString()}
                                stroke={colors.border?.toString()}
                                strokeWidth={1}
                                style={{
                                    cursor: item.disabled ? "default" : "pointer",
                                    transition: "fill 120ms ease-out",
                                }}
                                onMouseEnter={() => !item.disabled && setHoveredId(item.id)}
                                onMouseLeave={() => setHoveredId((id) => (id === item.id ? null : id))}
                                onClick={() => !item.disabled && onSelect(item)}
                            >
                                <title>{item.label}</title>
                            </path>
                            <g
                                transform={`translate(${ix - iconSize / 2}, ${iy - iconSize / 2})`}
                                style={{ pointerEvents: "none", color: colors.text?.toString() }}
                            >
                                {icon}
                            </g>
                        </g>
                    );
                })}
            </g>
        </g>
    );
}
