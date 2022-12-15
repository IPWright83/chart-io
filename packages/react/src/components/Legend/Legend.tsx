import React from "react";
import { useSelector } from "react-redux";

import { chartSelectors, IStore } from "../../store";

const Legend = () => {
    const width = useSelector((s: IStore) => chartSelectors.dimensions.width(s));
    const height = useSelector((s: IStore) => chartSelectors.dimensions.height(s));

    // Only needed if xs or ys defined
    // chartReducer #29 - need to group scales together
    // so they can be retrieved from the selectors as a group
    // and determine which is the "series" fields if there are multiple series

    return (
        <foreignObject width={width} height={height} style={styles.foreignObject}>
            <div>test</div>
        </foreignObject>
    );
};

const styles = {
    canvas: {
        position: "absolute",
    },
    foreignObject: {
        pointerEvents: "none" as const,
    },
};

export { Legend };
