import type { Meta, StoryObj } from "@storybook/svelte";
import CrosshairStory from "./CrosshairStory.svelte";

const meta = {
  title: "Components/Crosshair",
  component: CrosshairStory,
  parameters: {
    chromatic: { delay: 300 },
  },
} satisfies Meta<typeof CrosshairStory>;

export default meta;
type Story = StoryObj<{
  showHorizontal?: boolean;
  showVertical?: boolean;
}>;

export const Default: Story = {
  name: "Crosshair",
};
