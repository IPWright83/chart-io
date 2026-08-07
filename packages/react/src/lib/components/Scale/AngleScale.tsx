import { chartSelectors, IState } from "@chart-io/core";

import React, { useMemo } from "react";
import { useSelector } from "react-redux";

import { AutoScale, IAutoScaleProps } from "./AutoScale";
import { useArray } from "../../hooks";

export type IAngleScaleProps = Omit<IAutoScaleProps, "range">;

// Continuous scales (e.g. a date or number field) have no discrete categories to space out - the
// domain should map onto the full circle, unlike a point/band scale (see below)
const CONTINUOUS_SCALE_TYPES = ["linear", "time", "power", "log"];

/**
 * Represents an AngleScale, mapping a field to an angle (in radians) around a circle. Used by
 * radial plots such as `<Radar>` and `<RadialArea>`, and their `<AngleAxis>`.
 *
 * For a categorical field (the default, `scaleType="point"`), the range stops one step short of a
 * full circle - a point scale placed around a full circle would otherwise put the first and last
 * category at the same angle (0 and 2*PI are the same position on a circle). A continuous field
 * (`scaleType` of `"linear"`, `"time"`, `"power"` or `"log"`, e.g. plotting a full year of dates)
 * has no such concept of discrete categories, so maps onto the full `[0, 2*PI]` circle instead
 * @param  props   Props for the scale
 * @return         A scale component
 */
export function AngleScale({ fields, scaleType = "point", domain, aggregate }: IAngleScaleProps) {
    const data = useSelector((s: IState) => chartSelectors.data(s));
    const fieldsArray = useArray(fields);
    const field = fieldsArray[0];

    const categoryCount = useMemo(
        () => domain?.length ?? new Set(data.map((d) => d[field])).size,
        [data, field, domain],
    );

    const isContinuous = CONTINUOUS_SCALE_TYPES.includes(scaleType);
    const range = isContinuous
        ? [0, 2 * Math.PI]
        : categoryCount > 0
          ? [0, (2 * Math.PI * (categoryCount - 1)) / categoryCount]
          : [0, 0];

    return <AutoScale fields={fieldsArray} range={range} scaleType={scaleType} domain={domain} aggregate={aggregate} />;
}
