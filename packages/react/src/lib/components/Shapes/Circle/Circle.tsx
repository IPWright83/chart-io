import type { IColor } from "@d3-chart/types";
import React from "react";

export interface ICircleProps {
    /**
     * The fill color of the Circle
     */
    fill: IColor;
}

export function Circle({ fill }: ICircleProps) {
    const style = {
        background: `${fill}`,
        width: 10,
        height: 10,
        marginTop: 4,
        marginLeft: 5,
        marginRight: 5,
        borderRadius: "50%",
        flexShrink: 0,
    };

    return <div className="d3-chart indicator-circle" style={style} />;
}
