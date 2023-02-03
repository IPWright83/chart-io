import React, { useEffect, useRef, useState } from "react";

import { useSelector } from "react-redux";
import { chartSelectors, IState } from "../store";

/**
 * Wraps a D3 layer to make it work as a Canvas component
 * @param  WrappedComponent     The D3 layer to render to the Canvas
 * @param  className            An optional class name to add to the DOM
 * @return                      The wrapped layer
 */
const withCanvas = <P extends object>(WrappedComponent: React.ComponentType<P>, className: string) => {
    if (!className) {
        console.warn("W003 - className is required when using the withCanvas higher order component");
    }

    /**
     * Wraps a component within a Canvas
     * @param  {...any}            props        The rest of the props
     * @return {ReactDOMComponent}              The wrapped layer
     */
    return (props) => {
        const canvas = useRef(null);
        const [layer, setLayer] = useState({});

        const width = useSelector((s: IState) => chartSelectors.dimensions.width(s));
        const height = useSelector((s: IState) => chartSelectors.dimensions.height(s));

        useEffect(() => {
            setLayer({ current: document.createElement("custom") });
        }, []);

        return (
            <React.Fragment>
                <foreignObject width={width} height={height} style={styles.foreignObject}>
                    <canvas
                        className={`canvas ${className}`}
                        width={width}
                        height={height}
                        ref={canvas}
                        style={styles.canvas}
                    ></canvas>
                </foreignObject>
                <WrappedComponent {...props} layer={layer} canvas={canvas.current} />
            </React.Fragment>
        );
    };
};

const styles = {
    canvas: {
        position: "absolute" as const,
    },
    foreignObject: {
        pointerEvents: "none" as const,
    },
};

export { withCanvas };
