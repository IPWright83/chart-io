import { BAND_PADDING } from "../constants";
import { IBandwidthScale, IScale } from "../types";

/**
 * Ensures that the scale is a valid band scale. If it is not it will attempt to
 * make it valid. This helps us support mixing plot types as timeScales for example
 * don't feature a bandwidth https://github.com/d3/d3-axis/issues/85#issuecomment-1126362199
 * @param  {d3.Scale} scale          The d3 scale
 * @param  {String} field            The field that the scale represents
 * @param  {Array} data              The data for the plot
 * @returns {boolean}                The calculated bandwidth or undefined
 */
export function getBandwidthAndOffset(scale: IScale, field: string, data: any) {
    if ((scale as IBandwidthScale).bandwidth) {
        return {
            bandwidth: (scale as IBandwidthScale).bandwidth(),
            offset: 0,
        };
    }

    if (data.length >= 2) {
        const value0 = data[0][field];
        const value1 = data[1][field];

        if (value0 !== null && value0 !== undefined && value1 !== null && value1 !== undefined) {
            const diff = scale(value1) - scale(value0);

            return {
                bandwidth: diff - BAND_PADDING,
                offset: diff / 2 - BAND_PADDING / 2,
            };
        }
    }

    return { bandwidth: 0, offset: 0 };
}
