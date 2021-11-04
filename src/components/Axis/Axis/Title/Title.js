import "./Title.css";

import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import { getTransform } from "./getTransform";

import { chartSelectors } from "../../../../store";

const Title = ({ position, title, fields }) => {
    const width = useSelector((s) => chartSelectors.dimensions.width(s));
    const height = useSelector((s) => chartSelectors.dimensions.height(s));
    const margin = useSelector((s) => chartSelectors.dimensions.margin(s));

    const transform = getTransform(position, width, height, margin);
    const text = title || fields.filter((f) => !!f).join(",");

    return (
        <text className="axis-title" transform={transform}>
            {text}
        </text>
    );
};

Title.propTypes = {
    /**
     * The position of the axis [top, bottom, left, right]
     * @type {String}
     */
    position: PropTypes.oneOf(["top", "bottom", "left", "right"]),
    /**
     * The keys of the fields that will share this scale
     * @type {String[]}
     */
    fields: PropTypes.arrayOf(PropTypes.string).isRequired,
    /**
     * A title for the Axis
     * @type {String}
     */
    title: PropTypes.string,
};

export { Title };
