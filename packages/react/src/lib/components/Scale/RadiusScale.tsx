import { chartSelectors, IState } from "@chart-io/core";

import React from "react";
import { useSelector } from "react-redux";

import { AutoScale, IAutoScaleProps } from "./AutoScale";
import { useArray } from "../../hooks";

export type IRadiusScaleProps = Omit<IAutoScaleProps, "range">;

/**
 * Represents a RadiusScale, mapping value field(s) to a radius (in pixels) from the center of a
 * circle. Used by radial plots such as `<Radar>` and their `<RadialAxis>`.
 *
 * Unless `aggregate` is set, each field is given its own independently computed domain (e.g. a
 * "1-5" field and a "percentage" field can coexist), all sharing the same `[0, maxRadius]` range -
 * this is what lets each spoke of a `<Radar>` represent a different domain
 * @param  props   Props for the scale
 * @return         A scale component
 */
export function RadiusScale({ fields, scaleType, domain, aggregate = false }: IRadiusScaleProps) {
    const plotWidth = useSelector((s: IState) => chartSelectors.dimensions.plot.width(s));
    const plotHeight = useSelector((s: IState) => chartSelectors.dimensions.plot.height(s));
    const maxRadius = Math.max(0, Math.min(plotWidth, plotHeight) / 2);

    const range = [0, maxRadius];
    const fieldsArray = useArray(fields);

    if (aggregate) {
        return <AutoScale fields={fieldsArray} range={range} scaleType={scaleType} domain={domain} aggregate={true} />;
    }

    return (
        <React.Fragment>
            {fieldsArray.map((field) => (
                <AutoScale key={field} fields={[field]} range={range} scaleType={scaleType} domain={domain} />
            ))}
        </React.Fragment>
    );
}
