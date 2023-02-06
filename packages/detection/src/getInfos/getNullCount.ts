import { IData } from "@d3-chart/types";

/**
 * Obtain the number of null values in the column
 * @param  data        The dataset
 * @return             The number of null values found in the column
 */
export function getNullCount(data: any[] = []): number {
    return data.filter((d) => d === null || d === undefined).length;
}
