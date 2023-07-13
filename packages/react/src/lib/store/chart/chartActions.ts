import type { IData, ILegendItem, IMargin, IScale, ITheme } from "@chart-io/types";

import type {
    AddLegendItemAction,
    RemoveLegendItemAction,
    SetAnimationDurationAction,
    SetBrushRangeAction,
    SetBrushDimensionsAction,
    SetChartIDAction,
    SetDataAction,
    SetDimensionAction,
    SetScaleAction,
    SetScaleZoomAction,
    SetThemeAction,
} from "./types";

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
 * @param  width       The width of the chart
 * @param  height      The height of the chart
 * @param  plotMargin  The margin for the plot
 * @return             A redux action object
 */
const setDimensions = (width: number, height: number, plotMargin: IMargin): SetDimensionAction => {
    if (!plotMargin) {
        logWarning("W004", "A margin was not provided but is required");
        return;
    }

    // prettier-ignore
    if (!validateMargin(plotMargin.left, "left") || 
        !validateMargin(plotMargin.top, "top") ||
        !validateMargin(plotMargin.bottom, "bottom") ||
        !validateMargin(plotMargin.right, "right")) 
    {
        return;
    }

    return {
        type: "CHART.SET_DIMENSIONS",
        payload: { width, height, margin: plotMargin },
    };
};

/**
 * Sets the margin that should be applied to the brush in the Redux store
 * @param  width       The width of the brush
 * @param  height      The height of the brush
 * @param  brushMargin The margin for the brush
 * @return             A redux action object
 */
const setBrushDimensions = (width: number, height: number, brushMargin: IMargin): SetBrushDimensionsAction => {
    // prettier-ignore
    if (!validateMargin(brushMargin.left, "left") || 
        !validateMargin(brushMargin.top, "top") ||
        !validateMargin(brushMargin.bottom, "bottom") ||
        !validateMargin(brushMargin.right, "right")) 
    {
        return;
    }

    return {
        type: "CHART.SET_BRUSH_DIMENSIONS",
        payload: {
            width,
            height,
            margin: brushMargin,
        },
    };
};

/**
 * Sets the scale for this field in the Redux store
 * @param  fields     The names of the fields to set the scale for
 * @param  scale      A d3.Scale function
 * @return            A redux action object
 */
const setScales =
    (fields: string[], scale: IScale) =>
    (dispatch): SetScaleAction => {
        if (!scale) return;

        dispatch({
            type: "CHART.SET_SCALES",
            payload: { fields, scale },
        });
    };

/**
 * Creates a range to use for Scales with a Brush enabled in the Redux store
 * @param  field      The names of the field to set the scale for
 * @param  range      The new range to use for this scale
 * @return            A redux action object
 */
const setBrushRange = (field: string, range: number[]): SetBrushRangeAction => ({
    type: "CHART.SET_BRUSH_RANGE",
    payload: { field, range },
});

/**
 * Reserves some space for the brush to be rendered on the chart
 * @param width     The amount of space that needs reserving in the width for the brush
 * @param height    The amount of space that needs reserving in the height for the brush
 * @return            A redux action object
 */
const setBrushReservedDimensions = (width: number, height: number): SetBrushReservedDimensionsAction => ({
    type: "CHART.SET_BRUSH_RESERVED_DIMENSIONS",
    payload: { width, height },
});

/**
 * Zooms a particular scale to the given domain
 * @param  field      The names of the field to zoom the scale for
 * @param  domain     The new domain for the scale
 * @return            A redux action object
 */
const setScaleZoom = (field: string, domain: number[] | Date[]): SetScaleZoomAction => ({
    type: "CHART.SET_SCALE_ZOOM",
    payload: { field, domain },
});

/**
 * Adds a Legend item to the chart
 * @param  item    The legend item
 * @return         A redux action object
 */
const addLegendItem = (item: ILegendItem): AddLegendItemAction => ({
    type: "CHART.ADD_LEGEND_ITEM",
    payload: item,
});

/**
 * Removes a Legend item from the chart
 * @param  item    The legend item
 * @return         A redux action object
 */
const removeLegendItem = (item: ILegendItem): RemoveLegendItemAction => ({
    type: "CHART.REMOVE_LEGEND_ITEM",
    payload: item,
});

/**
 * Sets the theme for the chart in the Redux store
 * @param  theme   The theme object
 * @return         A redux action object
 */
const setTheme =
    (theme: ITheme | "light" | "dark") =>
    (dispatch): SetThemeAction => {
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

/**
 * Sets a unique ID for the chart in the Redux store
 * @param chartID   The ID of the chart
 * @return          A redux action object
 */
const setChartID = (chartID: string): SetChartIDAction => {
    return {
        type: "CHART.SET_CHART_ID",
        payload: chartID,
    };
};

const chartActions = {
    setDimensions,
    setBrushDimensions,
    setScales,
    setData,
    setTheme,
    setAnimationDuration,
    addLegendItem,
    removeLegendItem,
    setBrushRange,
    setScaleZoom,
    setChartID,
    setBrushReservedDimensions,
};

export { chartActions };
