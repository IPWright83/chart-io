import { chartActions, chartSelectors, IState } from "@chart-io/core";
import type { ICompassPosition, ILegendFormatter } from "@chart-io/core";

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getDockPosition } from "./getDockPosition";
import { getLegendMaxDimensions } from "./getLegendMaxDimensions";
import { getLegendPosition, LEGEND_MARGIN } from "./getLegendPosition";
import { Legend } from "./Legend";

export interface ILegendOverlayProps {
    /**
     * The compass position to dock the legend at initially. Dragging the legend re-docks it at
     * whichever of the 8 compass positions it's dropped nearest to, which takes over from this
     * @default "E"
     */
    position?: ICompassPosition;
    /**
     * A set of custom formatters for the Legend
     */
    formatters?: Record<string, ILegendFormatter>;
}

export function LegendOverlay({ position = "E", formatters = {} }: ILegendOverlayProps) {
    const dispatch = useDispatch();
    const width = useSelector((s: IState) => chartSelectors.dimensions.width(s));
    const height = useSelector((s: IState) => chartSelectors.dimensions.height(s));
    const items = useSelector((s: IState) => chartSelectors.legend.items(s));
    const showLegend = useSelector((s: IState) => chartSelectors.legend.isVisible(s));
    const dockedPosition = useSelector((s: IState) => chartSelectors.legend.position(s));
    const sizeLegend = useSelector((s: IState) => chartSelectors.legend.sizeLegend(s));
    const theme = useSelector((s: IState) => chartSelectors.theme(s));

    // Seeds the initial docked position into the store - a plain prop can't drive positioning
    // itself once the user starts dragging, since from that point the store is the source of truth
    useEffect(() => {
        dispatch(chartActions.setLegendPosition(position));
    }, [dispatch, position]);

    const containerRef = useRef<SVGForeignObjectElement>(null);
    const grabOffset = useRef({ x: 0, y: 0 });
    const [dragPosition, setDragPosition] = useState<{ left: number; top: number } | null>(null);

    if (!showLegend) {
        return null;
    }

    const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
        if (event.button !== 0 || !containerRef.current) {
            return;
        }

        const containerRect = containerRef.current.getBoundingClientRect();
        const legendRect = event.currentTarget.getBoundingClientRect();

        grabOffset.current = {
            x: event.clientX - legendRect.left,
            y: event.clientY - legendRect.top,
        };

        event.currentTarget.setPointerCapture(event.pointerId);
        setDragPosition({
            left: legendRect.left - containerRect.left,
            top: legendRect.top - containerRect.top,
        });
    };

    const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
        if (!dragPosition || !containerRef.current) {
            return;
        }

        const containerRect = containerRef.current.getBoundingClientRect();

        setDragPosition({
            left: event.clientX - containerRect.left - grabOffset.current.x,
            top: event.clientY - containerRect.top - grabOffset.current.y,
        });
    };

    const onPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
        if (!dragPosition || !containerRef.current) {
            return;
        }

        const containerRect = containerRef.current.getBoundingClientRect();
        const dropX = event.clientX - containerRect.left;
        const dropY = event.clientY - containerRect.top;

        dispatch(chartActions.setLegendPosition(getDockPosition(dropX, dropY, containerRect.width, containerRect.height)));
        setDragPosition(null);
    };

    const isHorizontal = dockedPosition !== "E" && dockedPosition !== "W";
    // A size legend can be considerably taller than the default row of color swatches - let it grow
    // to fit rather than clipping it against the (deliberately small) theme default
    const defaultMaxHeight = sizeLegend ? height - 4 * LEGEND_MARGIN : theme.legend.defaultMaxHeight;

    const positionStyle = dragPosition
        ? { position: "absolute" as const, left: dragPosition.left, top: dragPosition.top }
        : {
              ...getLegendPosition(dockedPosition),
              ...getLegendMaxDimensions(dockedPosition, width, height, theme.legend.defaultMaxWidth, defaultMaxHeight),
          };

    const style = {
        width: "100%",
        height: "100%",
        pointerEvents: "none" as const,
    };

    return (
        <foreignObject ref={containerRef} width={width} height={height} style={style}>
            <Legend
                items={items}
                sizeLegend={sizeLegend}
                horizontal={isHorizontal}
                positionStyle={positionStyle}
                formatters={formatters}
                dragging={!!dragPosition}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
            />
        </foreignObject>
    );
}
