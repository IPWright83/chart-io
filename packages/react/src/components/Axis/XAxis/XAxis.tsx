import PropTypes from "prop-types";
import React from "react";
import { Axis } from "../Axis";
import { XScale } from "../../Scale";

import type { IVerticalPosition, IPrimitive, IScaleType } from "../../../types";

export interface IXAxisProps {
    /**
     * The position of the axis [top, bottom]
     */
    position?: IVerticalPosition;
    /**
     * (Optional) An override of the domain to use with the d3 scale
     */
    domain?: [IPrimitive, IPrimitive];
    /**
     * The keys of the fields that will share this scale
     */
    fields: string[];
    /**
     * (Optional) Force the type of d3 scale to use - https://github.com/d3/d3-scale
     */
    scaleType?: IScaleType;
    /**
     * Whether this scale is an aggregate (of multiple y values)
     */
    aggregate?: boolean;
    /**
     * https://github.com/d3/d3-axis#axis_tickSizeInner
     */
    tickSizeInner?: number;
    /**
     * https://github.com/d3/d3-axis#axis_tickSizeOuter
     */
    tickSizeOuter?: number;
    /**
     * https://github.com/d3/d3-axis#axis_tickPadding
     */
    tickPadding?: number;
    /**
     * Should gridlines be drawn?
     */
    showGridlines?: boolean;
    /**
     * A title for the Axis
     */
    title?: string;
    /**
     * https://github.com/d3/d3-axis#axis_tickFormat
     */
    tickFormat?: Function;
    /**
     * https://github.com/d3/d3-axis#axis_ticks
     */
    ticks?: any[];
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
            />
            <XScale fields={fields} scaleType={scaleType} aggregate={aggregate} domain={domain} fromAxis={true} />
        </React.Fragment>
    );
}
