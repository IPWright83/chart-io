import React, { useRef } from "react";

/**
 * Wraps a D3 layer to make it work as an SVG component
 * @param  {ReactDOMComponent} WrappedComponent     The D3 layer to render to the SVG
 * @return {ReactDOMComponent}                      The wrapped layer
 */
const withSVG = (WrappedComponent) =>
    /**
     * Wraps a component within an SVG group
     * @param  {...any}    options.props        The rest of the props
     * @return {ReactDOMComponent}              The wrapped layer
     */
    (props) => {
        const layer = useRef(null);

        return (
            <g ref={layer}>
                <WrappedComponent {...props} layer={layer} />
            </g>
        );
    };

export { withSVG };
