import * as d3 from "d3";
import { IPrimitive } from "../../types";

/**
 * Validates that the scale can cope with aggregated data
 * @param  {d3.Scale} scale             The d3 scale
 * @param  data         The full dataset
 * @param  fields       The set of fields to check
 * @return              True if the domain can cope with the aggregated dataset
 */
export const ensureNoScaleOverflow = (
  scale,
  data: Array<IPrimitive>,
  fields: Array<string>
): boolean => {
  const maxValue = d3.max(
    data.map((d) => fields.reduce((sum, key) => sum + d[key], 0))
  );
  if (maxValue > scale.domain()[1]) {
    console.warn(
      "The scale appears too small for the dataset. Are you missing the `aggregate={true}` in your <Axis /> or <Scale /> component?"
    );

    return false;
  }

  return true;
};
