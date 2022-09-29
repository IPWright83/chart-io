const light = {
    axis: {
        stroke: "#333333",
        strokeOpacity: 0.8,
        strokeWidth: 1,
    },

    droplines: {
        strokeDasharray: 4,
        strokeOpacity: 1,
        strokeWidth: 2,
    },

    background: "#ffffff",

    crosshair: {
        stroke: "#000000",
        strokeOpacity: 0.5,
        strokeWidth: 1,
        strokeDasharray: 0,
    },

    gridlines: {
        stroke: "#d3d3d3",
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
        ],
    },
};

const dark = {
    axis: {
        stroke: "#cccccc",
        strokeOpacity: 0.8,
        strokeWidth: 1,
    },

    droplines: {
        strokeDasharray: 4,
        strokeOpacity: 1,
        strokeWidth: 2,
    },

    background: "#333333",

    crosshair: {
        stroke: "#cccccc",
        strokeOpacity: 0.8,
        strokeWidth: 1,
        strokeDasharray: 0,
    },

    gridlines: {
        stroke: "#555555",
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
        ],
    },
};

const themes = {
    light,
    dark,
};

export { themes };
