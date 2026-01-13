import React, { useEffect } from "react";
import type { IScale } from "@d3-chart/types";
import { useStore } from "react-redux";

import { chartActions } from "../../store";

export interface IScaleProps {
    /**
     * The keys of the fields that will share this scale
     */
    fields: Array<string>;
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

    useEffect(() => {
        // @ts-ignore: TODO: Fix this
        store.dispatch(chartActions.setScales(fields, scale, fromAxis));
    }, [fields, scale, store.dispatch]);

    return <React.Fragment />;
}

Scale.defaultProps = {
    fromAxis: false,
};
