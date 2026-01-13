import type { ICoordinate } from "@d3-chart/types";

/**
 * Obtain the x, y offsets from a transform string
 * @param  {String} transform    The transform string
 * @return {Object}              The x,y offsets
 */
export function getXYFromTransform(transform: string): ICoordinate {
    if (transform && transform.match) {
        const result = transform.match(/translate\(([\d.]+),\s?([\d.]+)\)/);
        if (result) {
            return { x: +result[1], y: +result[2] };
        }
    }

    return { x: 0, y: 0 };
}
