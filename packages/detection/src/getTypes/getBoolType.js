import { Types } from "../Types";

/**
 * If the value is a boolean, obtain it's Type
 * @param  {Any} value    The value to check for a boolean type
 * @return {Types}        Either a Types.Boolean or null
 */
const getBoolType = (value) => {
    if (value === true || value === false) {
        return Types.Boolean;
    }

    if (value === "Yes" || value === "YES" || value === "yes") {
        return Types.Boolean;
    }

    if (value === "No" || value === "NO" || value === "no") {
        return Types.Boolean;
    }

    return null;
};

export { getBoolType };
