import type { Meta, StoryObj } from "@storybook/svelte";
import PolygonStory from "./PolygonStory.svelte";

const meta = {
    title: "Components/Polygon",
    component: PolygonStory,
    parameters: {
        chromatic: { delay: 300 },
    },
} satisfies Meta<typeof PolygonStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        points: "0,100 50,25 50,75 100,0",
        fill: "steelblue",
        stroke: "red",
        opacity: 0.5,
    },
}; 