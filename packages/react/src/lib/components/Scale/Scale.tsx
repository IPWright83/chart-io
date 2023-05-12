import React, { useEffect } from "react";
import type { IScale } from "@chart-it/types";
import { useStore } from "react-redux";

import { chartActions } from "../../store";
import { logAndThrowError } from "../../utils";
import { useArray } from "../../hooks";

export interface IScaleProps {
    /**
     * The keys of the fields that will share this scale
     */
    fields: string | Array<string>;
    /**
     * Has this scale been created automatically from an Axis?
     */
    fromAxis?: boolean;
    /**
     * (Optional) Force the type of d3 scale to use - https://github.com/d3/d3-scale
     */
    scale: IScale;
}

/**
 * Represents a Scale
 * @return A scale component
 */
export function Scale({ fields, scale, fromAxis }: IScaleProps) {
    const store = useStore();

    const fieldsArray = useArray(fields);
    if (fieldsArray.length === 0) {
        logAndThrowError(
            "E006",
            "Unable to create a Scale without a field. Ensure that you have provided at least one field in the 'fields' prop"
        );
    }

    useEffect(() => {
        // @ts-ignore: TODO: Fix this
        store.dispatch(chartActions.setScales(fieldsArray, scale, fromAxis));
    }, [fieldsArray, scale, store.dispatch]);

    return <React.Fragment />;
}

Scale.defaultProps = {
    fromAxis: false,
};
