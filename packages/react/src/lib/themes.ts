import type { IColor } from "@d3-chart/types";

const light = {
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

const dark = {
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
