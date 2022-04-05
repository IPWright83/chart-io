/**
 * Determine the cardinality of the given data column
 * @param  data     The dataset
 * @return          The cardinality (unique values) of the data column
 */
export const getDataCardinality = (data: Array<object>): number =>
  new Set(data).size;
