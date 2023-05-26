import React, { useRef } from "react";
import { logWarning } from "../utils";

import { logWarning } from "../utils";

/**
 * Wraps a D3 layer to make it work as an SVG component
 * @param  WrappedComponent     The D3 layer to render to the SVG
 * @param  className            An optional class name to add to the DOM
 * @return                      The wrapped layer
 */
const withSVG = <P extends object>(WrappedComponent: React.ComponentType<P>, className: string) => {
    if (!className) {
        logWarning("W003", "className is required when using the withSVG higher order component");
    }

    /**
     * Wraps a component within an SVG group
     * @param  {...any}            props        The rest of the props
     * @return {ReactDOMComponent}              The wrapped layer
     */
    return function withSVG(props) {
        const layer = useRef(null);

        return (
            <g ref={layer} className={`g-${className}`}>
                <React.StrictMode>
                    <WrappedComponent {...props} layer={layer} />
                </React.StrictMode>
            </g>
        );
    };
};

export { withSVG };
