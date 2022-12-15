import type { IScaleFunction } from "../../types";

/**
 * Ensures that the scale is valid and logs if there's a problem
 * @param  scale            The d3 scale
 * @param  componentName    The name of the component that requires the band scale
 * @return                  True if the scale is valid
 */
const ensureBandScale = (scale: IScaleFunction, componentName: string): boolean => {
    // @ts-expect-error: Verifying at runtime
    if (!scale.bandwidth) {
        console.error(
            `E001 - Incompatible scale for a <${componentName} />. Are you missing the 'scaleType="band"' in your <Axis /> or <Scale /> component?`
        );

        return false;
    }

    return true;
};

export { ensureBandScale };
