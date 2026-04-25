import type { Meta, StoryObj } from "@storybook/svelte";
import DroplinesStory from "./DroplinesStory.svelte";

const meta = {
    title: "Components/Droplines",
    component: DroplinesStory,
    parameters: {
        chromatic: { delay: 300 },
    },
} satisfies Meta<typeof DroplinesStory>;

export default meta;
type Story = StoryObj<{
    showHorizontal?: boolean;
    showVertical?: boolean;
}>;

export const Default: Story = {
    name: "Horizontal & Vertical Droplines",
    args: {
        showVertical: true,
        showHorizontal: true,
    },
};

export const VerticalDroplines: Story = {
    name: "Vertical Droplines",
    args: {
        showVertical: true,
        showHorizontal: false,
    },
};

export const HorizontalDroplines: Story = {
    name: "Horizontal Droplines",
    args: {
        showVertical: false,
        showHorizontal: true,
    },
}; 