import React, { useRef } from "react";

/**
 * Wraps a D3 layer to make it work as an SVG component
 * @param  {ReactDOMComponent} WrappedComponent     The D3 layer to render to the SVG
 * @param  {String}            className            An optional class name to add to the DOM
 * @return {ReactDOMComponent}                      The wrapped layer
 */
const withSVG = (WrappedComponent, className) =>
    /**
     * Wraps a component within an SVG group
     * @param  {...any}    options.props        The rest of the props
     * @return {ReactDOMComponent}              The wrapped layer
     */
    (props) => {
        const layer = useRef(null);

        return (
            <g ref={layer} className={`g-${className}`}>
                <React.StrictMode>
                    <WrappedComponent {...props} layer={layer} />
                </React.StrictMode>
            </g>
        );
    };

export { withSVG };
