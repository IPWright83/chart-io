import type { Meta, StoryObj } from "@storybook/svelte";
import AreaStory from "./AreaStory.svelte";

const meta = {
    title: "XYCharts/Area",
    component: AreaStory,
    parameters: {
        chromatic: { delay: 300 },
    },
} satisfies Meta<typeof AreaStory>;

export default meta;
type Story = StoryObj<typeof AreaStory>;

export const Basic: Story = {
    name: "Basic Plot",
    args: {
        x: "x",
        y: "sin",
        width: 800,
        height: 500,
        color: "#99C1DC",
        useAreas: false,
    },
};

export const CustomColor: Story = {
    name: "Custom Color",
    args: {
        ...Basic.args,
        color: "orange",
    },
};

export const Stream: Story = {
    name: "Stream Graph",
    args: {
        ...Basic.args,
        y2: "cos",
    },
};

export const MultipleAreas: Story = {
    name: "Multiple Area Plots",
    args: {
        ...Basic.args,
        y2: "cos",
        useAreas: true,
    },
};
