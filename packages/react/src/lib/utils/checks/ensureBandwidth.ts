import { logError } from "../logger";

/**
 * Ensures that the scale is a valid band scale. If it is not it will attempt to
 * make it valid. If that fails it will log an issue
 * @param  {Number} bandwidth        The bandwidth either from the scale or calculated
 * @param  {String} componentName    The name of the component that requires the band scale
 * @return {Boolean}                 True if the scale is valid
 */
export function ensureBandwidth(bandwidth: number, componentName: string): boolean {
    if (bandwidth === 0) {
        // prettier-ignore
        logError("E001", `Incompatible scale for a <${componentName} />. Are you missing the \`scaleType="band"\` in your <Axis /> or <AutoScale /> component?`);

        return false;
    }

    return true;
}
