import type { IScale } from "@chart-it/types";

import { logError } from "../logger";

/**
 * Ensures that the scale is valid and logs if there's a problem
 * @param  {d3.Scale} scale          The d3 scale
 * @param  {String} componentName    The name of the component that requires the band scale
 * @return {Boolean}                 True if the scale is valid
 */
export function ensureBandScale(scale: IScale, componentName: string): boolean {
    // @ts-expect-error: This is a runtime validation
    if (!scale.bandwidth) {
        // prettier-ignore
        logError("E001", `Incompatible scale for a <${componentName} />. Are you missing the \`scaleType="band"\` in your <Axis /> or <AutoScale /> component?`);

        return false;
    }

    return true;
}
