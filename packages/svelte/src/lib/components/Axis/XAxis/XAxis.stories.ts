import type { Meta, StoryObj } from "@storybook/svelte";
import XAxisStory from "./XAxisStory.svelte";

const meta = {
    title: "Components/Axis/XAxis",
    component: XAxisStory,
    parameters: {
        chromatic: { delay: 300 },
    },
} satisfies Meta<typeof XAxisStory>;

export default meta;
type Story = StoryObj<typeof XAxisStory>;

export const XAxisStoryDefault: Story = {
    name: "X Axis",
    args: {
        fields: ["x"],
        position: "bottom",
        showGridlines: false,
    },
};
