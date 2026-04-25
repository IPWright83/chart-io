import type { Meta, StoryObj } from "@storybook/svelte";
import AxisStory from "./AxisStory.svelte";

const meta = {
    title: "Components/Axis/Orientation",
    component: AxisStory,
    parameters: {
        chromatic: { delay: 300 },
    },
} satisfies Meta<typeof AxisStory>;

export default meta;
type Story = StoryObj<typeof AxisStory>;

export const Left: Story = {
    name: "Left",
    args: {
        position: "left",
        fields: ["integerValue"],
        showGridlines: false,
    },
};

export const Right: Story = {
    name: "Right",
    args: {
        position: "right",
        fields: ["integerValue"],
        showGridlines: false,
    },
};

export const Bottom: Story = {
    name: "Bottom",
    args: {
        position: "bottom",
        fields: ["integerValue"],
        showGridlines: false,
    },
};

export const Top: Story = {
    name: "Top",
    args: {
        position: "top",
        fields: ["integerValue"],
        showGridlines: false,
    },
};
