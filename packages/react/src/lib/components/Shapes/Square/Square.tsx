import type { IColor } from "@d3-chart/types";
import React from "react";

export interface ISquareProps {
    /**
     * The fill color of the Square
     */
    fill: IColor;
}

export function Square({ fill }: ISquareProps) {
    const style = {
        background: `${fill}`,
        height: 10,
        width: 10,
        marginTop: 4,
        marginRight: 5,
        marginLeft: 5,
        flexShrink: 0,
    };

    return <div className="d3-chart indicator-square" style={style} />;
}
