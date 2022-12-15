import React from "react";
import PropTypes from "prop-types";

import type { IColor } from "../../../../../types";

import "./Line.css";

export interface ILineProps {
    /**
     * The fill color of the Line
     * @type {String}
     */
    fill: IColor;
}

const Line = ({ fill }: ILineProps) => {
    const style = {
        background: fill,
    };

    return <div className="chart-it indicator-line" style={style} />;
};

export { Line };
