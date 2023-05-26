import type { IData, ILegendItem, IMargin, IScale, ITheme } from "@chart-it/types";

import type { SetAnimationDurationAction, SetDataAction, SetDimensionAction } from "./types";
import { chartSelectors } from "./chartSelectors";

import { logWarning } from "../../utils";
import { themes } from "../../themes";

/**
 * Validates the the margin is correct, returning true if so
 * @param  value     The value for the margin
 * @param  side      The side of the margin we are checking [top, left, bottom, right]
 * @return           True if the margin is valid, false otherwise
 */
const validateMargin = (value: number, side: string): boolean => {
    if (value === null || value === undefined) {
        logWarning("W005", `The ${side} of the margin was not specified and is required`);
        return false;
    }

    return true;
};

/**
 * Sets the dimensions in the Redux store
 * @param  width   The width of the chart
 * @param  height  The height of the chart
 * @param  margin  The margin for the chart
 * @return         A redux action object
 */
const setDimensions = (width: number, height: number, margin: IMargin): SetDimensionAction => {
    if (!margin) {
        logWarning("W004", "A margin was not provided but is required");
        return;
    }

    // prettier-ignore
    if (!validateMargin(margin.left, "left") || 
        !validateMargin(margin.top, "top") ||
        !validateMargin(margin.bottom, "bottom") ||
        !validateMargin(margin.right, "right")) 
    {
        return;
    }

    return {
        type: "CHART.SET_DIMENSIONS",
        payload: { width, height, margin },
    };
};

/**
 * Sets the scale for this field in the Redux store
 * @param  fields     The names of the fields to set the scale for
 * @param  scale      A d3.Scale function
 * @param  fromAxis   Has this scale been autogenerated from an axis?
 * @return            A redux action object
 */
const setScales = (fields: string[], scale: IScale, fromAxis: boolean) => (dispatch) => {
    if (!scale) return;

    dispatch({
        type: "CHART.SET_SCALES",
        payload: { fields, scale, fromAxis },
    });
};

/**
 * Creates a range to use for Scales with a Brush enabled in the Redux store
 * @param  field      The names of the field to set the scale for
 * @param  range      The new range to use for this scale
 * @return            A redux action object
 */
const setBrushRange = (field: string, range: number[]) => ({
    type: "CHART.SET_BRUSH_RANGE",
    payload: { field, range },
});

/**
 * Zooms a particular scale to the given domain
 * @param  field      The names of the field to zoom the scale for
 * @param  range      The new domain for the scale
 * @return            A redux action object
 */
const setScaleZoom = (field: string, domain: number[] | Date[]) => ({
    type: "CHART.SET_SCALE_ZOOM",
    payload: { field, domain },
});

/**
 * Adds a Legend item to the chart
 * @param  item    The legend item
 * @return         A redux action object
 */
const addLegendItem = (item: ILegendItem) => ({
    type: "CHART.ADD_LEGEND_ITEM",
    payload: item,
});

/**
 * Removes a Legend item from the chart
 * @param  item    The legend item
 * @return         A redux action object
 */
const removeLegendItem = (item: ILegendItem) => ({
    type: "CHART.REMOVE_LEGEND_ITEM",
    payload: item,
});

/**
 * Sets the theme for the chart in the Redux store
 * @param  theme   The theme object
 * @return         A redux action object
 */
const setTheme = (theme: ITheme | "light" | "dark") => (dispatch) => {
    if (theme === "light") {
        dispatch({
            type: "CHART.SET_THEME",
            payload: themes.light,
        });

        return;
    }

    if (theme === "dark") {
        dispatch({
            type: "CHART.SET_THEME",
            payload: themes.dark,
        });

        return;
    }

    dispatch({
        type: "CHART.SET_THEME",
        payload: theme,
    });
};

/**
 * Sets the duration for animations in the Redux store
 * @param  duration     The duration in miliseconds
 * @return              A redux action object
 */
const setAnimationDuration = (duration: number): SetAnimationDurationAction => ({
    type: "CHART.SET_ANIMATION_DURATION",
    payload: duration,
});

/**
 * Sets the data for the chart in the Redux store
 * @param  data         An array of the data for the chart
 * @return              A redux action object
 */
const setData = (data: IData = []): SetDataAction => {
    return {
        type: "CHART.SET_DATA",
        payload: data,
    };
};

const chartActions = {
    setDimensions,
    setScales,
    setData,
    setTheme,
    setAnimationDuration,
    addLegendItem,
    removeLegendItem,
    setBrushRange,
    setScaleZoom,
};

export { chartActions };
