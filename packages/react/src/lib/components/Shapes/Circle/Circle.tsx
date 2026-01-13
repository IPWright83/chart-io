import type { IColor } from "@chart-io/core";
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

    return <div className="chart-io indicator-circle" style={style} />;
}
