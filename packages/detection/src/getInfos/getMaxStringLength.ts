/**
 * Gets the maximum length of a string in the data
 * @param  {Array<Object>}  data     The dataset
 * @return {Number}                  The max length of a string in the data
 */
const getMaxStringLength = (data = []) => {
    if (data.length === 0) {
        return 0;
    }

    return Math.max(...data.map((d) => (d ? d.length : 0)));
};

export { getMaxStringLength };
