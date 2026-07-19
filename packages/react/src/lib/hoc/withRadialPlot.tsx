/* eslint-disable react/prop-types */
import { chartSelectors, IState, logDebug } from "@chart-io/core";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

/**
 * Wraps a radial plot (e.g. Pie/Donut) and handles some of the basics such as missing layers,
 * along with calculating the center point & maximum radius available to the plot
 * @param  WrappedComponent     The D3 layer to render
 * @return                      The wrapped layer
 */
const withRadialPlot = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
    /**
     * Wraps a component and handles some of the potentially missing parts
     * @param  {...any}    props        The rest of the props
     * @return {ReactDOMComponent}      The wrapped layer
     */
    return function withRadialPlot(props) {
        const plotWidth = useSelector((s: IState) => chartSelectors.dimensions.plot.width(s));
        const plotHeight = useSelector((s: IState) => chartSelectors.dimensions.plot.height(s));
        const plotLeft = useSelector((s: IState) => chartSelectors.dimensions.plot.left(s));
        const plotTop = useSelector((s: IState) => chartSelectors.dimensions.plot.top(s));

        // We need to pass the ref through a useState due to the problem
        // of forwarding refs - https://reactjs.org/docs/forwarding-refs.html
        const [layer, setLayer] = useState({ current: undefined });
        useEffect(() => {
            setLayer(props.layer);
        }, [props.layer]);

        // Unable to render without the layer avaliable
        if (!layer.current) {
            logDebug("Skipping render - layer not yet avaliable");
            return null;
        }

        const cx = plotLeft + plotWidth / 2;
        const cy = plotTop + plotHeight / 2;
        const maxRadius = Math.max(0, Math.min(plotWidth, plotHeight) / 2);

        return <WrappedComponent layer={layer} cx={cx} cy={cy} maxRadius={maxRadius} {...(props as P)} />;
    };
};

export { withRadialPlot };
