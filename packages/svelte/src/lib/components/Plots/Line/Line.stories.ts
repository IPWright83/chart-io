import type { Meta, StoryObj } from "@storybook/svelte";
import LineStory from "./LineStory.svelte";

const meta = {
    title: "XYCharts/Line",
    component: LineStory,
    parameters: {
        chromatic: { delay: 300 },
    },
} satisfies Meta<typeof LineStory>;

export default meta;
type Story = StoryObj<typeof LineStory>;

export const Basic: Story = {
    name: "Basic Plot",
    args: {
        x: "x",
        y: "sin",
        width: 800,
        height: 500,
        color: "#99C1DC",
        useLines: false,
    },
};

export const CustomColor: Story = {
    name: "Custom Color",
    args: {
        ...Basic.args,
        color: "orange",
    },
};

export const MultipleLines: Story = {
    name: "Multiple Line Plots",
    args: {
        ...Basic.args,
        y2: "cos",
        useLines: true,
    },
};
