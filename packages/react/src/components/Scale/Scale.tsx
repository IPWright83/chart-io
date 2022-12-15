import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useStore, useSelector } from "react-redux";

import { chartActions, chartSelectors, IStore } from "../../store";
import type { IScaleType, IPrimitive } from "../../types";
import { calculateScale } from "./calculateScale";

export interface IScaleProps {
    /**
     * The keys of the fields that will share this scale
     */
    fields: Array<string>;
    /**
     * Has this scale been created automatically from an Axis?
     */
    fromAxis: boolean;
    /**
     * Force the range of the scale, this is required if you haven't provided a type
     * @type {number[]}
     */
    range?: [number, number];
    /**
     * (Optional) Force the type of d3 scale to use - https://github.com/d3/d3-scale
     * @type {String}
     */
    scaleType?: IScaleType;
    /**
     * Whether this scale is an aggregate (of multiple y values)
     */
    aggregate?: boolean;
    /**
     * (Optional) An override of the domain to use with the d3 scale
     */
    domain: Array<IPrimitive>;
}

/**
 * Represents a Scale component
 * @return {ReactDOMComponent}   A scale component
 */
export const Scale = ({ fields, range, scaleType, aggregate = false, domain, fromAxis }) => {
    const store = useStore();
    const data = useSelector((s: IStore) => chartSelectors.data(s));

    useEffect(() => {
        if (!range) return;
        if (isNaN(range[0]) || isNaN(range[1])) return;

        // Use the fixed range if one was provided
        const scale = calculateScale(data, fields, range, domain, aggregate, scaleType);
        store.dispatch(chartActions.setScales(fields, scale, fromAxis));
    }, [fields, data, range, scaleType, aggregate, store.dispatch]);

    return <React.Fragment />;
};
