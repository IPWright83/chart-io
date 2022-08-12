import { getSampleSize } from "./getSampleSize";

/**
 * Obtain a sample set of the data
 * @param  {Array<Object>}  data     The complete dataset
 * @return {Array<Object>}           A subset of the data based on a calculated sample size
 */
const getDataSample = (data) => {
    const sampleSize = getSampleSize(data);
    return data.filter((d, index) => index % sampleSize === 0);
};

export { getDataSample };
