import type { Meta, StoryObj } from "@storybook/svelte";
import YAxisStory from "./YAxisStory.svelte";

const meta = {
    title: "Components/Axis/YAxis",
    component: YAxisStory,
    parameters: {
        chromatic: { delay: 300 },
    },
} satisfies Meta<typeof YAxisStory>;

export default meta;
type Story = StoryObj<typeof YAxisStory>;

export const YAxisStoryDefault: Story = {
    name: "Y Axis",
    args: {
        fields: ["y"],
        position: "left",
        showGridlines: false,
    },
};
