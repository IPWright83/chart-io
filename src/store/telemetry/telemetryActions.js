/* eslint-disable */

// import { getColumnInfos } from "lib/detection";
// import { telemetrySelectors } from "./telemetrySelectors";

/**
 * Generates analytics from the dataset provided
 * @param  {Object[]} data          The data for the chart
 * @return {Object}                 A redux action object
 */
const generateDataAnalytics = (data) => (dispatch, getState) => {
    // const state = getState();
    // const chartId = telemetrySelectors.id(state);
    // Grab all the column information using the detection system
    // const columns = getColumnInfos(data);
    // console.log({
    //     id: chartId,
    //     columns,
    // });
};

/**
 * Generates the analytics for the charts
 * @param  {Number} options.height              The height of the chart
 * @param  {Number} options.width               The width of the chart
 * @param  {Number} options.margin              The margin for the chart
 * @param  {Number} options.useCanvas           Whether the chart should use canvas
 * @param  {Number} options.animationDuration   The duration to run animations for
 * @param  {Number} options.children            The child components of the chart
 * @return {Object}                 A redux action object
 */
const generateChartAnalytics = ({ height, width, margin, useCanvas, animationDuration, children }) => () => {
    // console.log({
    //     height,
    //     width,
    //     margin,
    //     useCanvas,
    //     animationDuration,
    //     children: children.map((c) => ({ name: c.type.name, props: c.props })),
    // });
};

const telemetryActions = {
    generateDataAnalytics,
    generateChartAnalytics,
};

export { telemetryActions };
