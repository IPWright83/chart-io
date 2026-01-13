import type { IColor } from "@d3-chart/types";
import React from "react";

export interface ILineProps {
    /**
     * The fill color of the Line
     */
    fill: IColor;
}

export function Line({ fill }: ILineProps) {
    const style = {
        background: `${fill}`,
        width: 10,
        height: 3,
        marginTop: 7,
        marginLeft: 5,
        marginRight: 5,
        flexShrink: 0,
    };

    return <div className="d3-chart indicator-line" style={style} />;
}
