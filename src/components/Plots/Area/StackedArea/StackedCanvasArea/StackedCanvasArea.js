import * as d3 from "d3";
import { useDispatch, useSelector } from "react-redux";

import { useRender } from "../../../../../hooks";
import { chartSelectors, eventSelectors } from "../../../../../store";
import { eventDefaultProps, eventPropTypes, plotsDefaultProps, plotsPropTypes } from "../../../../../types";
import { ensureNoScaleOverflow } from "../../../../../utils";

import { useDatumFocus } from "../useDatumFocus";

const StackedCanvasArea = ({ x, ys, colors, layer, canvas }) => {
    const dispatch = useDispatch();
    const data = useSelector((s) => chartSelectors.data(s));
    const xScale = useSelector((s) => chartSelectors.scales.getScale(s, x));
    const yScale = useSelector((s) => chartSelectors.scales.getScale(s, ys[0]));
    const eventMode = useSelector((s) => eventSelectors.mode(s));
    const position = useSelector((s) => eventSelectors.position(s));
    const width = useSelector((s) => chartSelectors.dimensions.width(s));
    const height = useSelector((s) => chartSelectors.dimensions.height(s));

    const sortedData = data.sort((a, b) => d3.ascending(a[x], b[x]));

    /* On future renders we want to update the path */
    useRender(() => {
        ensureNoScaleOverflow(yScale, data, ys, "StackedSVGArea");
        if (!canvas) {
            console.debug("Skipping render - canvas not yet avaliable");
            return null;
        }

        const keys = ys;
        const stackedData = d3.stack().keys(keys)(sortedData);
        const colorScale = d3.scaleOrdinal().domain(keys).range(colors);

        const context = canvas.getContext("2d");

        // We render canvas areas differently to SVG line in that
        // we use the generator provided by D3
        const area = d3
            .area()
            .curve(d3.curveLinear)
            .x((d) => xScale(d.data[x]))
            .y0((d) => yScale(d[0]))
            .y1((d) => yScale(d[1]))
            .context(context);

        // Create the join to work out the areas we care about
        const join = d3.select(layer.current).selectAll("path").data(stackedData);
        context.clearRect(0, 0, width, height);

        join.enter().each((d) => {
            const color = colorScale(d.key);
            const fillColor = d3.color(color);
            fillColor.opacity = 0.8;

            context.beginPath();
            area(d);
            context.fillStyle = fillColor;
            context.strokeStyle = color;
            context.fill();
            context.stroke();
        });

        // Note that because we've drawn directly to the canvas, there is no need
        // for us to use the canvas render loop
    }, [x, ys, sortedData, xScale, yScale, layer, canvas, width, height]);

    // If possible respond to global mouse events for tooltips etc
    useDatumFocus(dispatch, layer, x, ys, xScale, yScale, sortedData, eventMode, position, colors);

    return null;
};

StackedCanvasArea.propTypes = {
    ...plotsPropTypes,
    ...eventPropTypes,
};

StackedCanvasArea.defaultProps = {
    ...plotsDefaultProps,
    ...eventDefaultProps,
};

export { StackedCanvasArea };
