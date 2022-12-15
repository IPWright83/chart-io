import * as d3 from "d3";

import type { IScaleFunction, IData } from "../../types";

/**
 * Validates that the scale can cope with aggregated data
 * @param  scale        The d3 scale
 * @param  data         The full dataset
 * @param  fields       The set of fields to check
 * @return              True if the domain can cope with the aggregated dataset
 */
const ensureNoScaleOverflow = (scale: IScaleFunction, data: IData, fields: Array<string>): boolean => {
    const maxValue = d3.max(data.map((d) => fields.reduce((sum, key) => { 
        // @ts-ignore: Unsure how to fix this line
        return sum + d[key];
    }, 0)));
    
    if (maxValue > scale.domain()[1]) {
        console.warn(
            "W001 - The scale appears too small for the dataset. Are you missing the `aggregate={true}` in your <Axis /> or <Scale /> component?",
            fields
        );

        return false;
    }

    return true;
};

export { ensureNoScaleOverflow };
