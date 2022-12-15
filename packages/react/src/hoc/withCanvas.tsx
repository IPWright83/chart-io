import React, { useEffect, useRef, useState } from "react";

import { useSelector } from "react-redux";
import { chartSelectors, IStore } from "../store";

/**
 * Wraps a D3 layer to make it work as a Canvas component
 * @param  WrappedComponent     The D3 layer to render to the Canvas
 * @param  className            An optional class name to add to the DOM
 * @return                      The wrapped layer
 */
const withCanvas =
    <P extends object>(WrappedComponent: React.ComponentType<P>, className: string) =>
    /**
     * Wraps a component within a Canvas
     * @param  {...any}    options.props        The rest of the props
     * @return {ReactDOMComponent}              The wrapped layer
     */
    (props) => {
        const canvas = useRef(null);
        const [layer, setLayer] = useState({});

        const width = useSelector((s: IStore) => chartSelectors.dimensions.width(s));
        const height = useSelector((s: IStore) => chartSelectors.dimensions.height(s));

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

const styles = {
    canvas: {
        position: "absolute" as const,
    },
    foreignObject: {
        pointerEvents: "none" as const,
    },
};

export { withCanvas };
