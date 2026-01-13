/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { chartSelectors, IState } from "../store";
import { logDebug } from "../utils";

/**
 * Wraps a plot and handles some of the basics such as missing layers or scales
 * @param  WrappedComponent     The D3 layer to render
 * @return                      The wrapped layer
 */
const withXYPlot = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
    /**
     * Wraps a component and handles some of the potentially missing parts
     * @param  {...any}    options.props        The rest of the props
     * @return {ReactDOMComponent}              The wrapped layer
     */
    return function withXYPlot({ x, y, xs, ys, ...props }) {
        const xScale = useSelector((s: IState) => chartSelectors.scales.getScale(s, x || xs[0]));
        const yScale = useSelector((s: IState) => chartSelectors.scales.getScale(s, y || ys[0]));

        // TODO: need to do the same with the virtual canvas

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

        if (!xScale) {
            logDebug("Skipping render - X scale not avaliable");
        } else if (!yScale) {
            logDebug("Skipping render - Y scale not avaliable");
        }

        if (!xScale || !yScale) {
            return null;
        }

        // https://stackoverflow.com/a/54583335/21061
        return <WrappedComponent layer={layer} x={x} y={y} ys={ys} xs={xs} {...(props as P)} />;
    };
};

export { withXYPlot };
