import * as d3 from "d3";
import { throttle } from "lodash";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { chartSelectors, eventActions } from "../../store";

/**
 * Creates a background layer which is used to capture mouse events
 * @return {ReactDOMComponent}  The Background component
 */
const Background = () => {
    const dispatch = useDispatch();
    const width = useSelector((s) => chartSelectors.dimensions.width(s));
    const height = useSelector((s) => chartSelectors.dimensions.height(s));
    const margin = useSelector((s) => chartSelectors.dimensions.margin(s));

    // React will own the background container, but D3 will manage the events
    const background = useRef(null);

    // Runs once on first load
    useEffect(() => {
        if (!background.current) {
            return;
        }

        // prettier-ignore
        d3.select(background.current)
          .append("rect")
          .attr("fill", "none")
          .attr("pointer-events", "all");
    }, []);

    // Runs whenever the dimensions change
    useEffect(() => {
        if (!background.current) {
            return;
        }

        if (!width || !height) {
            return;
        }

        const mouseMove = throttle(
            (e) => {
                dispatch(eventActions.mouseMove(e));
            },
            25,
            { leading: true }
        );

        // prettier-ignore
        d3.select(background.current)
            .select("rect")
            .attr("width", width - margin.left - margin.right)
            .attr("height", height - margin.top - margin.bottom)
            .on("mouseout", (e) => { dispatch(eventActions.mouseExit(e)); })
            .on("mouseover", (e) => { dispatch(eventActions.mouseEnter(e)); })
            .on("mousemove", mouseMove);

        // Wire up events
    }, [dispatch, background, width, height, margin]);

    const transform = `translate(${margin.left || 0}, ${margin.top || 0})`;
    return <g ref={background} transform={transform} />;
};

export { Background };
