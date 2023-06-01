import { IScale } from "@chart-it/types";

import { BAND_PADDING } from "../constants";

/**
 * Ensures that the scale is a valid band scale. If it is not it will attempt to
 * make it valid. If that fails it will log an issue
 * @param  {d3.Scale} scale          The d3 scale
 * @param  {String} field            The field that the scale represents
 * @param  {Array} data              The data for the plot
 * @returns {boolean}                The calculated bandwidth or undefined
 */
export function getBandwidthAndOffset(scale: IScale, field: string, data: any) {
    // @ts-ignore: Runtime validation
    if (scale.bandwidth) {
        return {
            // @ts-ignore: Runtime validation
            bandwidth: scale.bandwidth(),
            offset: 0,
        };
    }

    if (data.length > 2) {
        const value0 = data[0][field];
        const value1 = data[1][field];

        if (value0 !== null && value0 !== undefined && value1 !== null && value1 !== undefined) {
            // @ts-ignore: Dynamically modifying our scale
            const diff = scale(value1) - scale(value0);

            return {
                bandwidth: diff - BAND_PADDING,
                offset: diff / 2 - BAND_PADDING / 2,
            };
        }
    }

    return { bandwidth: 0, offset: 0 };
}
