import type { IValue, IScaleType, IPosition } from "@d3-chart/types";
import React from "react";
import { Axis, IAxisProps } from "../Axis";
import { YScale } from "../../Scale";

export interface IYAxisProps extends Omit<IAxisProps, "position"> {
    /**
     * The position of the axis [top, bottom]
     */
    position?: Omit<IPosition, "top" | "bottom">;
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
 * Represents a YAxis component
 * @return The Y Axis component
 */
export function YAxis({
    position = "left",
    fields,
    scaleType,
    aggregate = false,
    domain,
    showGridlines = true,
    title,
    tickSizeInner,
    tickSizeOuter,
    tickPadding,
    ticks,
    tickFormat,
    tickValues,
}: IYAxisProps) {
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
                ticks={ticks}
                tickFormat={tickFormat}
                tickValues={tickValues}
            />
            <YScale fields={fields} scaleType={scaleType} aggregate={aggregate} domain={domain} fromAxis={true} />
        </React.Fragment>
    );
}
