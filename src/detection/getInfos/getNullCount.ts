/**
 * Obtain the number of null values in the column
 * @param  data     The dataset
 * @return          The number of null values found in the column
 */
export const getNullCount = (data: Array<object>): number =>
  data.filter((d) => d === null || d === undefined).length;
