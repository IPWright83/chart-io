import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";

import { chartActions, chartSelectors, IState } from "../../../store";

const BRUSH_HEIGHT = 100;

export interface IHorizontalBrushProps {
    /**
     * The child components for the chart
     */
    plots?: JSX.Element[];
}

export function HorizontalBrush({ plots }: IHorizontalBrushProps) {
    const x = plots.map((p) => p.props.x)[0];
    const ys = plots.flatMap((p) => p.props.y ?? p.props.ys);

    const dispatch = useDispatch();
    const margin = useSelector((s: IState) => chartSelectors.dimensions.margin(s));
    const width = useSelector((s: IState) => chartSelectors.dimensions.width(s));

    // Need to supress running this when the zoom changes...
    console.log("Rendering");
    useEffect(() => {
        // @ts-ignore
        dispatch(chartActions.createBrushRange(x, [margin.left, width - margin.right]));
    }, [x]);

    useEffect(() => {
        ys.forEach((key) =>
            // height - margin.bottom, height - margin.bottom - BRUSH_HEIGHT

            // @ts-ignore
            // prettier-ignore
            dispatch(chartActions.createBrushRange(key, [0 , 100]))
        );
    }, [ys]);

    // return null;

    const plotClones = plots.map((plot) =>
        React.cloneElement(plot, { interactive: false, color: "#f00", scaleMode: "brush" })
    );

    return <>{plotClones}</>;
}
