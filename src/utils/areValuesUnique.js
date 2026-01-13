/**
 * Determines if all the values are unique
 * @param  {Array} values   The values to check
 * @return {Boolean}        True if the values are unique
 */
const areValuesUnique = (values = []) => {
    const valueSet = new Set();
    values.forEach((v) => valueSet.add(v));

    return valueSet.size === values.length;
};

export { areValuesUnique };
