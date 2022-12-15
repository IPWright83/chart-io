import React from "react";
import PropTypes from "prop-types";

import type { IColor } from "../../../../../types";

import "./Square.css";

export interface ISquareProps {
    /**
     * The fill color of the Square
     * @type {String}
     */
    fill: IColor;
}

const Square = ({ fill }: ISquareProps) => {
    const style = {
        background: fill,
    };

    return <div className="chart-it indicator-square" style={style} />;
};

export { Square };
