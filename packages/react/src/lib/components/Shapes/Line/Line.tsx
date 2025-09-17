import type { IColor } from "@chart-io/core";
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

    return <div className="chart-io indicator-line" style={style} />;
}
