import "./EventReceiver.css";

import * as d3 from "d3";
import { throttle } from "lodash";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { chartSelectors, eventActions } from "../../store";
import { MOUSE_MOVE_THROTTLE } from "../../constants";

/**
 * Creates a background layer which is used to capture mouse events
 * @return {ReactElement}  The EventReceiver component
 */
const EventReceiver = ({ layer }) => {
    const dispatch = useDispatch();
    const width = useSelector((s) => chartSelectors.dimensions.width(s));
    const height = useSelector((s) => chartSelectors.dimensions.height(s));
    const margin = useSelector((s) => chartSelectors.dimensions.margin(s));

    // Runs whenever the dimensions change
    useEffect(() => {
        if (!layer.current || !width || !height) {
            return;
        }

        const mouseMove = throttle(
            (e) => {
                dispatch(eventActions.mouseMove(e));
            },
            MOUSE_MOVE_THROTTLE,
            { leading: true }
        );

        // prettier-ignore
        d3.select(layer.current)
            .select("rect")
            .attr("width", width - margin.left - margin.right)
            .attr("height", height - margin.top - margin.bottom)
            .on("mouseout", (e) => { dispatch(eventActions.mouseExit(e)); })
            .on("mouseover", (e) => { dispatch(eventActions.mouseEnter(e)); })
            .on("mousemove", mouseMove);

        // Wire up events
    }, [dispatch, layer, width, height, margin]);

    const transform = `translate(${margin.left || 0}, ${margin.top || 0})`;
    return <rect className="chart-it event-receiver" transform={transform} />;
};

EventReceiver.propTypes = {
    /**
     * The layer to be rendered upon. Typically this is an `<svg:g>` or a fake HTMLElement when using canvas.
     * @default undefined
     * @type {HTMLElement}
     */
    layer: PropTypes.object,
};

export { EventReceiver };
