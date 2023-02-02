import type { IData } from "@d3-chart/types";

import { areValuesUnique } from "../areValuesUnique";

/**
 * /**
 * Ensures that all the values are unique and logs a warning if not
 * @param  data                 The full dataset
 * @param  field                The name of the field
 * @param  componentName        The name of the component that requires the band scale
 * @return                      True if all the values are unique
 */
const ensureValuesAreUnique = (data: IData, field: string, componentName: string): boolean => {
    if (areValuesUnique(data.map((d) => d[field])) === false) {
        console.warn(
            `W002 - There are duplicate values in the ${field} field. This may cause rendering artifacts with a <${componentName}>.`
        );

        return false;
    }

    return true;
};

export { ensureValuesAreUnique };