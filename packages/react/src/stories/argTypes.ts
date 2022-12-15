export const argTypes = {
    color: { control: "color" },
    theme: {
        control: { type: "radio" },
        options: ["light", "dark"],
    },
    margin: {
        control: { type: "range", min: 0, max: 100 },
    },
    width: {
        description: "The width of the chart",
        control: { type: "range", min: 250, max: 1000 },
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
        defaultValue: { summary: 250 },
    },
    useCanvas: {
        description: "Should the chart use canvas instead of SVG?",
        defaultValue: { summary: false },
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
};
