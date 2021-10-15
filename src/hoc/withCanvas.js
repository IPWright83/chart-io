import React, { useEffect, useRef, useState } from "react";

import { useSelector } from "react-redux";
import { chartSelectors } from "../store";

/**
 * Wraps a D3 layer to make it work as a Canvas component
 * @param  {ReactDOMComponent} WrappedComponent     The D3 layer to render to the Canvas
 * @param  {String}            className            An optional class name to add to the DOM
 * @return {ReactDOMComponent}                      The wrapped layer
 */
const withCanvas = (WrappedComponent, className) =>
    /**
     * Wraps a component within a Canvas
     * @param  {...any}    options.props        The rest of the props
     * @return {ReactDOMComponent}              The wrapped layer
     */
    (props) => {
        const canvas = useRef(null);
        const [layer, setLayer] = useState({});

        const width = useSelector((s) => chartSelectors.dimensions.width(s));
        const height = useSelector((s) => chartSelectors.dimensions.height(s));

        useEffect(() => {
            const element = document.createElement("custom");
            document.body.appendChild(element);
            element.className = `g-${className}`;
            console.log(element.className);
            setLayer({ current: element });
        }, []);

        return (
            <React.Fragment>
                <foreignObject width={width} height={height} style={styles.foreignObject}>
                    <canvas width={width} height={height} ref={canvas} style={styles.canvas}></canvas>
                </foreignObject>
                <WrappedComponent {...props} layer={layer} canvas={canvas.current} />
            </React.Fragment>
        );
    };

const styles = {
    canvas: {
        position: "absolute",
    },
    foreignObject: {
        pointerEvents: "none",
    },
};

export { withCanvas };
