import type { Meta, StoryObj } from "@storybook/svelte";
import AxisStory from "./AxisStory.svelte";

const meta = {
    title: "Components/Axis/Customization",
    component: AxisStory,
    parameters: {
        chromatic: { delay: 300 },
    },
} satisfies Meta<typeof AxisStory>;

export default meta;
type Story = StoryObj<typeof AxisStory>;

export const OuterTickSize: Story = {
    name: "Outer Tick Size",
    args: {
        position: "bottom",
        fields: ["integerValue"],
        tickSizeOuter: 40,
        showGridlines: false,
    },
};

export const InnerTickSize: Story = {
    name: "Inner Tick Size",
    args: {
        position: "bottom",
        fields: ["integerValue"],
        tickSizeInner: 20,
        showGridlines: false,
    },
};

export const TickPadding: Story = {
    name: "Tick Padding",
    args: {
        position: "bottom",
        fields: ["integerValue"],
        tickPadding: 20,
        showGridlines: false,
    },
};

export const Gridlines: Story = {
    name: "Gridlines",
    args: {
        position: "bottom",
        fields: ["integerValue"],
        showGridlines: true,
    },
};
