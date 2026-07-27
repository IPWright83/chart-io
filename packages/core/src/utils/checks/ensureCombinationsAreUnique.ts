import type { IData } from "../../types";
import { logWarning } from "../logger";

/**
 * Ensures that every combination of the given fields is unique and logs a warning if not
 * @param  data                 The full dataset
 * @param  fields               The names of the fields that together should form a unique combination
 * @param  componentName        The name of the component that requires the unique combination
 * @return                      True if every combination is unique
 */
const ensureCombinationsAreUnique = (data: IData, fields: string[], componentName: string): boolean => {
    const seen = new Set<string>();

    for (const row of data) {
        const key = fields.map((field) => row[field]).join("|");

        if (seen.has(key)) {
            // prettier-ignore
            logWarning("W008", `There are duplicate combinations of the ${fields.join(", ")} fields. This may cause rendering artifacts with a <${componentName}>.`);

            return false;
        }

        seen.add(key);
    }

    return true;
};

export { ensureCombinationsAreUnique };
