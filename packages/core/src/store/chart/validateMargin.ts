import type { IMargin } from "@Types";

import { logWarning } from "../../utils";

/**
 * Validates the the margin
 * @param  margin    The margin
 * @return           True if the margin is valid, false otherwise
 */
export const validateMargin = (margin: IMargin): boolean => {
    if (!margin) {
        logWarning("W004", "A margin was not provided but is required");
        return false;
    }

    // prettier-ignore
    if (!validateMarginValue(margin.left, "left") ||
        !validateMarginValue(margin.top, "top") ||
        !validateMarginValue(margin.bottom, "bottom") ||
        !validateMarginValue(margin.right, "right")) {
        return false;
    }

    return true;
};

/**
 * Validates the the margin value is correct, returning true if so
 * @param  value     The value for the margin
 * @param  side      The side of the margin we are checking [top, left, bottom, right]
 * @return           True if the margin is valid, false otherwise
 */
const validateMarginValue = (value: number, side: string): boolean => {
    if (value === null || value === undefined) {
        logWarning("W005", `The ${side} of the margin was not specified and is required`);
        return false;
    }

    return true;
}
