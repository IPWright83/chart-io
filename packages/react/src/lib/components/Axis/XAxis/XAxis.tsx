import type { IPosition, IScaleType, IValue } from "@chart-io/types";
import React from "react";

import { Axis, IAxisProps } from "../Axis";
import { XScale } from "../../Scale";

export interface IXAxisProps extends Omit<IAxisProps, "position"> {
    /**
     * The position of the axis [left, right]
     */
    position?: Omit<IPosition, "left" | "right">;
    /**
     * (Optional) An override of the domain to use with the d3 scale
     */
    domain?: IValue[];
    /**
     * (Optional) An override of the type of d3 scale touse
     */
    scaleType?: IScaleType;
    /**
     * Whether the underlying scale should aggregate the fields (e.g. for stacked charts)
     */
    aggregate?: boolean;
}

/**
 * Represents an XAxis component
 * @return The X Axis component
 */
export function XAxis({
    position = "bottom",
    fields,
    scaleType,
    aggregate = false,
    showGridlines = true,
    title,
    tickSizeInner,
    tickSizeOuter,
    tickPadding,
    tickFormat,
    ticks,
    tickValues,
    domain,
}: IXAxisProps) {
    return (
        <React.Fragment>
            <Axis
                position={position}
                fields={fields}
                showGridlines={showGridlines}
                title={title}
                tickSizeInner={tickSizeInner}
                tickSizeOuter={tickSizeOuter}
                tickPadding={tickPadding}
                tickFormat={tickFormat}
                ticks={ticks}
                tickValues={tickValues}
            />
            <XScale fields={fields} scaleType={scaleType} aggregate={aggregate} domain={domain} />
        </React.Fragment>
    );
}
