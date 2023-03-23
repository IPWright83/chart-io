import type { IData } from "@d3-chart/types";

import { getDataCardinality } from "./getDataCardinality";
import { getDataPointCount } from "./getDataPointCount";
import { getDataSample } from "./getDataSample";
import { getDataType } from "../getTypes";
import { getNullCount } from "./getNullCount";
import { getTypeSpecificColumnInfo } from "./getTypeSpecificColumnInfo";
import type { IColumnInfo } from "../types";

/**
 * Gets information about each of the columns in the dataset
 * @param  data     The complete dataset
 * @return          An array of the column information objects
 */
export function getColumnInfos(data: IData): Array<IColumnInfo | undefined> {
    // Obtain the number of points in the data
    const dataPointCount = getDataPointCount(data);
    if (dataPointCount === 0) {
        return [];
    }

    // Sample the data to speed up the operations
    const sample = getDataSample(data);
    const columns = Object.keys(sample[0]);

    return columns.map((column) => {
        // Grab all the values for the column
        const values = sample.map((s) => s[column]);

        // Grab the data type
        const type = values.reduce((previousType, value) => getDataType(value, previousType), undefined);

        // The column info object
        return {
            key: column,
            count: dataPointCount,
            nullCount: getNullCount(values),
            cardinality: getDataCardinality(values),
            type,
            ...getTypeSpecificColumnInfo(values, type),
        };
    });
}
