import { getSampleSize } from "./getSampleSize";

/**
 * Obtain a sample set of the data
 * @param  data     The complete dataset
 * @return          A subset of the data based on a calculated sample size
 */
export const getDataSample = (data: Array<object>): Array<object> => {
  const sampleSize = getSampleSize(data);
  return data.filter((d, index) => index % sampleSize === 0);
};
