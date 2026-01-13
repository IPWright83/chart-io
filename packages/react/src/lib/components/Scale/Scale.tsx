import React, { useEffect } from "react";
import type { IScale } from "@chart-io/types";
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
     * (Optional) Force the type of d3 scale to use - https://github.com/d3/d3-scale
     */
    scale: IScale;
}

/**
 * Represents a Scale
 * @return A scale component
 */
export function Scale({ fields, scale }: IScaleProps) {
    const store = useStore();

    const fieldsArray = useArray(fields).filter((f) => !!f);
    if (fieldsArray.length === 0) {
        // prettier-ignore
        logAndThrowError("E006", "Unable to create a Scale without a field. Ensure that you have provided at least one field in the 'fields' prop");
    }

    useEffect(() => {
        // @ts-ignore: TODO: Fix this
        store.dispatch(chartActions.setScales(fieldsArray, scale));
    }, [fieldsArray, scale, store.dispatch]);

    return <React.Fragment />;
}
