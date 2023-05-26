import type { IMargin } from "@chart-it/types";

/**
 * Gets the transform for the Brush position
 * @param  height   The height of the chart
 * @param  margin   The margin of the chart
 * @return          The transform for the brush
 */
export function getTransform(height: number, margin: IMargin): string {
    return `translate(0, ${height})`;
}
