import type { Meta, StoryObj } from "@storybook/svelte";
import ScatterStory from "./ScatterStory.svelte";

const meta = {
    title: "XYCharts/Scatter",
    component: ScatterStory,
    parameters: {
        chromatic: { delay: 300 },
    },
} satisfies Meta<typeof ScatterStory>;

export default meta;
type Story = StoryObj<typeof ScatterStory>;

export const Basic: Story = {
    name: "Basic Plot",
    args: {
        x: "Units Sold",
        y: "Total Profit",
        width: 800,
        height: 500,
        radius: 5,
        color: "#99C1DC",
        useScatters: false,
    },
};

export const CustomRadius: Story = {
    name: "Custom Radius",
    args: {
        ...Basic.args,
        radius: 15,
    },
};

export const CustomColor: Story = {
    name: "Custom Color",
    args: {
        ...Basic.args,
        color: "orange",
    },
};

export const MultipleScatter: Story = {
    name: "Multiple Scatter Plots",
    args: {
        ...Basic.args,
        y2: "Total Revenue",
        y3: "Total Cost",
        useScatters: true,
    },
};
