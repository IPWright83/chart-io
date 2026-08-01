import { chartSelectors, IState } from "@chart-io/core";

import React, { useMemo } from "react";
import { useSelector } from "react-redux";

import { AutoScale, IAutoScaleProps } from "./AutoScale";
import { useArray } from "../../hooks";

export type IAngleScaleProps = Omit<IAutoScaleProps, "range">;

/**
 * Represents an AngleScale, mapping a categorical field to an angle (in radians) around a circle.
 * Used by radial plots such as `<Radar>` and their `<AngleAxis>`
 * @param  props   Props for the scale
 * @return         A scale component
 */
export function AngleScale({ fields, scaleType = "point", domain, aggregate }: IAngleScaleProps) {
    const data = useSelector((s: IState) => chartSelectors.data(s));
    const fieldsArray = useArray(fields);
    const field = fieldsArray[0];

    // A point scale placed around a full circle would put the first and last category at the same
    // angle (0 and 2*PI are the same position on a circle), so the range stops one step short of a
    // full circle to leave an even gap between the last category and the first
    const categoryCount = useMemo(
        () => domain?.length ?? new Set(data.map((d) => d[field])).size,
        [data, field, domain],
    );
    const range = categoryCount > 0 ? [0, (2 * Math.PI * (categoryCount - 1)) / categoryCount] : [0, 0];

    return <AutoScale fields={fieldsArray} range={range} scaleType={scaleType} domain={domain} aggregate={aggregate} />;
}
