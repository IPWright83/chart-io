const commonDefaultArgTypes = {
    width: {
        description: "The width of the chart",
        control: { type: "range", min: 250, max: 1500 },
        defaultValue: { summary: 500 },
    },
    height: {
        description: "The height of the chart",
        control: { type: "range", min: 250, max: 1000 },
        defaultValue: { summary: 500 },
    },
    animationDuration: {
        description: "The number of milliseconds that should be used for animations",
        control: { type: "range", min: 0, max: 5000 },
        defaultValue: { summary: 500 },
    },
    useCanvas: {
        description: "Should the chart use canvas instead of SVG?",
    },
    plotMargin: {
        description:
            "The margins to apply on the chart using D3 margin convention https://observablehq.com/@d3/margin-convention",
        defaultValue: { summary: JSON.stringify({ left: 30, right: 30, bottom: 30, top: 30 }) },
    },
    onClick: {
        table: {
            disable: true,
        },
    },
    onMouseOver: {
        table: {
            disable: true,
        },
    },
    onMouseOut: {
        table: {
            disable: true,
        },
    },
    theme: {
        control: {
            type: "select",
            options: ["light", "dark"],
        },
        defaultValue: { summary: "light" },
    },
};

export { commonDefaultArgTypes };
