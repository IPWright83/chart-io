/**
 * Obtain the number of null values in the column
 * @param  {Array<Object>}  data     The dataset
 * @return {Number}                  The number of null values found in the column
 */
const getNullCount = (data) => data.filter((d) => d === null || d === undefined).length;

export { getNullCount };
