import * as d3 from "@d3-chart/d3";
import type { IScale, IData } from "@d3-chart/types";

/**
 * Validates that the scale can cope with aggregated data
 * @param  scale                The d3 scale
 * @param  data                 The full dataset
 * @param  fields               The set of fields to check
 * @param  componentName        The name of the component that requires the band scale
 * @return                      True if the domain can cope with the aggregated dataset
 */
const ensureNoScaleOverflow = (scale: IScale, data: IData, fields: string[], componentName: string): boolean => {
    // @ts-ignore: Unsure how to fix this line
    const maxValue = d3.max(data.map((d) => fields.reduce((sum, key) => sum + d[key], 0)));

    if (maxValue > scale.domain()[1]) {
        console.warn(
            `W001 - The scale for ${componentName} appears too small for the dataset. Are you missing the \`aggregate={true}\` in your <Axis /> or <AutoScale /> component?`,
            fields
        );

        return false;
    }

    return true;
};

export { ensureNoScaleOverflow };
