/* eslint-disable react/prop-types */
import { chartSelectors, IState, logDebug } from "@chart-io/core";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

/**
 * Wraps a rectangular plot that lays itself out within the full plot area rather than against
 * x/y scales (e.g. Treemap/Dendrogram) and handles some of the basics such as missing layers,
 * along with calculating the top-left corner & size of the plot area available to it
 * @param  WrappedComponent     The D3 layer to render
 * @return                      The wrapped layer
 */
const withRectangularPlot = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
    /**
     * Wraps a component and handles some of the potentially missing parts
     * @param  {...any}    props        The rest of the props
     * @return {ReactDOMComponent}      The wrapped layer
     */
    return function withRectangularPlot(props) {
        // Named plotLeft/plotTop/plotWidth/plotHeight (rather than left/top/width/height) since the
        // latter are already used elsewhere for the full chart's canvas dimensions
        const plotLeft = useSelector((s: IState) => chartSelectors.dimensions.plot.left(s));
        const plotTop = useSelector((s: IState) => chartSelectors.dimensions.plot.top(s));
        const plotWidth = useSelector((s: IState) => chartSelectors.dimensions.plot.width(s));
        const plotHeight = useSelector((s: IState) => chartSelectors.dimensions.plot.height(s));

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

        return (
            <WrappedComponent layer={layer} plotLeft={plotLeft} plotTop={plotTop} plotWidth={plotWidth} plotHeight={plotHeight} {...(props as P)} />
        );
    };
};

export { withRectangularPlot };
