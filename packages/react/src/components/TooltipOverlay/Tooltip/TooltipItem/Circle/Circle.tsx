import React from "react";
import PropTypes from "prop-types";

import type { IColor } from "../../../../../types";

import "./Circle.css";

export interface ICircleProps {
    /**
     * The fill color of the Circle
     * @type {String}
     */
    fill: IColor;
}

const Circle = ({ fill }: ICircleProps) => {
    const style = {
        background: fill,
    };

    return <div className="chart-it indicator-circle" style={style} />;
};

export { Circle };
