import { Types } from "./Types";

/**
 * Find the name of the data type
 * @param  {Number} number  The enum value to lookup
 * @return {String}         The name of the data type
 */
const typeEnumToName = (number) => Object.entries(Types).find(([, value]) => value === number)[0];

export { typeEnumToName };
