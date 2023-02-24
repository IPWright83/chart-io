import * as d3 from "@d3-chart/d3";
import { throttle } from "lodash";
import React, { useEffect } from "react";
import { useStore, useSelector } from "react-redux";

import { chartSelectors, eventActions, IState } from "../../store";
import { MOUSE_MOVE_THROTTLE } from "../../constants";

export interface IEventReceiverBaseProps {
    /**
     * The layer to be rendered upon. Typically this is an `<svg:g>` or a fake HTMLElement when using canvas.
     * @default undefined
     */
    layer: React.MutableRefObject<Element>;
}

/**
 * Creates a background layer which is used to capture mouse events
 * @return The EventReceiver component
 */
export function EventReceiver({ layer }: IEventReceiverBaseProps) {
    const store = useStore();
    const width = useSelector((s: IState) => chartSelectors.dimensions.width(s));
    const height = useSelector((s: IState) => chartSelectors.dimensions.height(s));
    const margin = useSelector((s: IState) => chartSelectors.dimensions.margin(s));

    // Runs whenever the dimensions change
    useEffect(() => {
        if (!layer.current || !width || !height) {
            return;
        }

        const mouseMove = throttle(
            (e) => {
                store.dispatch(eventActions.mouseMove(e));
            },
            MOUSE_MOVE_THROTTLE,
            { leading: true }
        );

        // prettier-ignore
        d3.select(layer.current)
            .select("rect")
            .attr("width", width - margin.left - margin.right)
            .attr("height", height - margin.top - margin.bottom)
            .on("mouseout", (e) => { store.dispatch(eventActions.mouseExit(e)); })
            .on("mouseover", (e) => { store.dispatch(eventActions.mouseEnter(e)); })
            .on("mousemove", mouseMove);

        // Wire up events
    }, [store.dispatch, layer, width, height, margin]);

    const transform = `translate(${margin.left || 0}, ${margin.top || 0})`;
    const style = { fill: "none", pointerEvents: "all" as const };

    return <rect className="d3-chart event-receiver" transform={transform} style={style} />;
}
