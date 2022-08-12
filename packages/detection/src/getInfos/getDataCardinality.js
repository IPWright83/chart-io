/**
 * Determine the cardinality of the given data column
 * @param  {Array<Object>}  data     The dataset
 * @return {Number}                  The cardinality (unique values) of the data column
 */
const getDataCardinality = (data) => new Set(data).size;

export { getDataCardinality };
