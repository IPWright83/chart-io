/**
 * Determine the cardinality of the given data column
 * @param  data     The dataset
 * @return          The cardinality (unique values) of the data column
 */
export function getDataCardinality(data: any[] = []): number {
    return new Set(data).size;
}
