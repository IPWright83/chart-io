import { themes } from "../../themes";
import type { Margin, Theme, Data } from "../../types";

import type { SetDimensionAction, SetAnimationDurationAction, SetDataAction } from "./types";

/**
 * Sets the dimensions in the Redux store
 * @param  width   The width of the chart
 * @param  height  The height of the chart
 * @param  margin  The margin for the chart
 * @return         A redux action object
 */
const setDimensions = (width: number, height: number, margin: Margin): SetDimensionAction => {
    if (!margin) {
        // TODO: Margin is incorrect shape
        // Margin is not provided
        console.warn();
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
const setScales = (fields: string[], scale: Function, fromAxis: boolean) => (dispatch) => {
    // TODO log this case?
    if (!scale) return;

    dispatch({
        type: "CHART.SET_SCALES",
        payload: { fields, scale, fromAxis },
    });
};

/**
 * Sets the theme for the chart in the Redux store
 * @param  theme   The theme object
 * @return         A redux action object
 */
const setTheme = (theme: Theme | "light" | "dark") => (dispatch) => {
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
const setData = (data: Data = []): SetDataAction => {
    // TODO: Enforce arrays
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
};

export { chartActions };
