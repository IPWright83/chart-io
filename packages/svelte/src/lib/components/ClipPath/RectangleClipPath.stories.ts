import type { Meta, StoryObj } from "@storybook/svelte";
import RectangleClipPathStory from "./RectangleClipPathStory.svelte";

const meta = {
    title: "Components/RectangleClipPath",
    component: RectangleClipPathStory,
    parameters: {
        chromatic: { delay: 300 },
    },
} satisfies Meta<typeof RectangleClipPathStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    name: "Rectangle ClipPath",
};
