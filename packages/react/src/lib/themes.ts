import type { IColor, ITheme } from "@chart-io/types";

const light: ITheme = {
    axis: {
        stroke: "#333333" as IColor,
        strokeOpacity: 0.8,
        strokeWidth: 1,
    },

    droplines: {
        strokeDasharray: 4,
        strokeOpacity: 1,
        strokeWidth: 2,
    },

    markers: {
        size: 6,
        stroke: "white" as IColor,
        strokeWidth: 2,
        shadow: false,
    },

    font: {
        family: "sans-serif",
        size: 12,
    },

    background: "#ffffff" as IColor,

    crosshair: {
        stroke: "#000000" as IColor,
        strokeOpacity: 0.5,
        strokeWidth: 1,
        strokeDasharray: 0,
    },

    gridlines: {
        stroke: "#d3d3d3" as IColor,
        strokeOpacity: 0.8,
        strokeWidth: 1,
    },

    tooltip: {
        background: "#ffffff" as IColor,
        text: "#000000" as IColor,
        opacity: 0.8,
        padding: 8,
    },

    legend: {
        background: "#ffffff" as IColor,
        text: "#000000" as IColor,
        opacity: 1,
        padding: 8,
        border: "#ccc",
        defaultMaxWidth: 200,
        defaultMaxHeight: 50,
    },

    series: {
        opacity: 0.7,
        selectedOpacity: 1,
        colors: [
            "#99c1dc",
            "#fc998e",
            "#fdc381",
            "#c2e587",
            "#fff18c",
            "#c999ca",
            "#a4dcd2",
            "#d6efd1",
            "#ffffc2",
            "#cbc8e1",
            "#fdd7ea",
            "#e1e1e1",
        ] as IColor[],
    },
};

const dark: ITheme = {
    axis: {
        stroke: "#cccccc" as IColor,
        strokeOpacity: 0.8,
        strokeWidth: 1,
    },

    droplines: {
        strokeDasharray: 4,
        strokeOpacity: 1,
        strokeWidth: 2,
    },

    background: "#333333" as IColor,

    font: {
        family: "sans-serif",
        size: 12,
    },

    crosshair: {
        stroke: "#cccccc" as IColor,
        strokeOpacity: 0.8,
        strokeWidth: 1,
        strokeDasharray: 0,
    },

    markers: {
        size: 6,
        stroke: "white" as IColor,
        strokeWidth: 2,
        shadow: false,
    },

    gridlines: {
        stroke: "#555555" as IColor,
        strokeOpacity: 0.8,
        strokeWidth: 1,
    },

    tooltip: {
        background: "#333333" as IColor,
        text: "#ffffff" as IColor,
        opacity: 0.8,
        padding: 8,
    },

    legend: {
        background: "#333333" as IColor,
        text: "#ffffff" as IColor,
        opacity: 1,
        padding: 8,
        border: "#ccc",
        defaultMaxWidth: 200,
        defaultMaxHeight: 50,
    },

    series: {
        opacity: 1,
        selectedOpacity: 0.7,
        colors: [
            "#51cbdf",
            "#ee709d",
            "#f8c86c",
            "#677be7",
            "#90e5a4",
            "#91564b",
            "#ec73c1",
            "#7f7f7f",
            "#bdbf2f",
            "#00becf",
        ] as IColor[],
    },
};

const themes = {
    light,
    dark,
};

export { themes };
