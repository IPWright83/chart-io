import { chartSelectors, IState, logAndThrowError } from "@chart-io/core";
import type { IScaleType, IValue } from "@chart-io/core";

import React, { useMemo } from "react";
import { useSelector, useStore } from "react-redux";

import { calculateScale } from "./calculateScale";
import { Scale } from "./Scale";
import { useArray } from "../../hooks";

export interface IAutoScaleProps {
    /**
     * The keys of the fields that will share this scale
     */
    fields: string | Array<string>;
    /**
     * Force the range of the scale, this is required if you haven't provided a type
     */
    range?: number[];
    /**
     * (Optional) Force the type of d3 scale to use - https://github.com/d3/d3-scale
     */
    scaleType?: IScaleType;
    /**
     * Whether this scale is an aggregate (of multiple y values)
     */
    aggregate?: boolean;
    /**
     * (Optional) An override of the domain to use with the d3 scale
     */
    domain?: Array<IValue>;
}

/**
 * Represents a Scale that is automatically generated
 * @return A scale component
 */
export function AutoScale({ fields, range, scaleType, aggregate = false, domain }: IAutoScaleProps) {
    const store = useStore();
    const data = useSelector((s: IState) => chartSelectors.data(s));

    const fieldsArray = useArray(fields).filter((f) => !!f);
    if (fieldsArray.length === 0) {
        // prettier-ignore
        logAndThrowError("E006", "Unable to create a Scale without a field. Ensure that you have provided at least one field in the 'fields' prop");
    }

    // TODO: Ensure we set a manual range in the Redux store

    const scale = useMemo(() => {
        if (!range) return;
        if (isNaN(range[0]) || isNaN(range[1])) return;

        // Use the fixed range if one was provided
        return calculateScale(data, fieldsArray, range, domain, aggregate, scaleType);
    }, [fieldsArray, data, range, scaleType, aggregate, store.dispatch]);

    return <Scale fields={fieldsArray} scale={scale} />;
}
