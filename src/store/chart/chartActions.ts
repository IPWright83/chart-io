import { themes } from "../../themes";
import { IMargin, ITheme, IData } from "../../types";

import {
  ISetDimensionAction,
  ISetAnimationDurationAction,
  ISetDataAction,
  ISetScaleAction,
  ISetThemeAction,
} from "./types";

/**
 * Sets the dimensions in the Redux store
 * @param  width   The width of the chart
 * @param  height  The height of the chart
 * @param  margin  The margin for the chart
 * @return         A redux action object
 */
const setDimensions = (width: number, height: number, margin: IMargin): ISetDimensionAction => ({
  type: "CHART.SET_DIMENSIONS",
  payload: { width, height, margin },
});

/**
 * Sets the scale for this field in the Redux store
 * @param  fields   The names of the fields to set the scale for
 * @param  scale    A d3.Scale function
 * @return {Object}                 A redux action object
 */
const setScales = (fields: string[], scale: Function): ISetScaleAction => {
  // TODO : Ensure return of undefined doesn't cause an error
  if (!scale) return;

  return {
    type: "CHART.SET_SCALES",
    payload: { fields, scale },
  };
};

/**
 * Sets the theme for the chart in the Redux store
 * @param  theme      The theme object
 * @return            A redux action object
 */
const setTheme = (theme: ITheme | "light" | "dark"): ISetThemeAction => {
  if (theme === "light") {
    return { type: "CHART.SET_THEME", payload: themes.light };
  }

  if (theme === "dark") {
    return { type: "CHART.SET_THEME", payload: themes.dark };
  }

  return { type: "CHART.SET_THEME", payload: theme };
};

/**
 * Sets the duration for animations in the Redux store
 * @param  duration The duration in miliseconds
 * @return          A redux action object
 */
const setAnimationDuration = (duration: number): ISetAnimationDurationAction => ({
  type: "CHART.SET_ANIMATION_DURATION",
  payload: duration,
});

/**
 * Sets the data for the chart in the Redux store
 * @param  data   An array of the data for the chart
 * @return        A redux action object
 */
const setData = (data: IData = []): ISetDataAction => ({
  type: "CHART.SET_DATA",
  payload: data,
});

const chartActions = {
  setDimensions,
  setScales,
  setData,
  setTheme,
  setAnimationDuration,
};

export { chartActions };
