import * as d3 from "@chart-it/d3";
import React, { useEffect } from "react";
import { useSelector, useStore } from "react-redux";
import { throttle } from "lodash";

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
    const plotMargin = useSelector((s: IState) => chartSelectors.dimensions.plotMargin(s));

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
            .attr("width", width - plotMargin.left - plotMargin.right)
            .attr("height", height - plotMargin.top - plotMargin.bottom)
            .on("mouseout", (e) => { store.dispatch(eventActions.mouseExit(e)); })
            .on("mouseover", (e) => { store.dispatch(eventActions.mouseEnter(e)); })
            .on("mousemove", mouseMove);

        // Wire up events
    }, [store.dispatch, layer, width, height, plotMargin]);

    const transform = `translate(${plotMargin.left || 0}, ${plotMargin.top || 0})`;
    const style = { fill: "none", pointerEvents: "all" as const };

    return <rect className="chart-it event-receiver" transform={transform} style={style} />;
}
