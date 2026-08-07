import { chartSelectors, IState } from "@chart-io/core";

import React from "react";
import { useSelector } from "react-redux";

import { AutoScale, IAutoScaleProps } from "./AutoScale";
import { useArray } from "../../hooks";

export type IRadiusScaleProps = Omit<IAutoScaleProps, "range">;

/**
 * Represents a RadiusScale, mapping value field(s) to a radius (in pixels) from the center of a
 * circle. Used by radial plots such as `<Radar>`/`<RadialArea>` and their `<RadialAxis>`.
 *
 * By default each field is given its own independently computed domain (e.g. a "1-5" field and a
 * "percentage" field can coexist), all sharing the same `[0, maxRadius]` range - this is what lets
 * each spoke of a `<Radar>` represent a different domain. There are two ways to instead put
 * multiple fields on one shared domain:
 * - Pass an explicit `domain` override - every field is scaled against that same domain unchanged,
 *   e.g. comparing multiple `<RadialArea>` series measured in the same units.
 * - Pass `aggregate` - the domain is computed from the *sum* of every field's value per row, rather
 *   than their union. This is the same aggregation `<XAxis>`/`<YAxis>` use for a stacked chart (e.g.
 *   `<YAxis aggregate>` sizing the scale to fit a `<StackedArea>`'s stacked total). It's rarely
 *   needed for `<Radar>`/`<RadialArea>` fields, which are usually independent measurements rather
 *   than segments of a whole - reach for it only if you specifically want the scale sized to the
 *   combined total across fields
 * @param  props   Props for the scale
 * @return         A scale component
 */
export function RadiusScale({ fields, scaleType, domain, aggregate = false }: IRadiusScaleProps) {
    const maxRadius = useSelector((s: IState) => chartSelectors.dimensions.plot.maxRadius(s));

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
