import type { Meta, StoryObj } from '@storybook/svelte';
import MarkersStory from './MarkersStory.svelte';

const meta = {
    title: 'Components/Markers',
    component: MarkersStory,
    parameters: {
        chromatic: { delay: 300 },
    },
} satisfies Meta<typeof MarkersStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    name: 'Markers',
    args: {
        fill: "steelblue",
        stroke: "white",
        shadow: false,
    },
};

export const Outline: Story = {
    name: 'Outline',
    args: {
        stroke: "steelblue",
        fill: null,
        shadow: false,
    },
};

export const Shadow: Story = {
    name: 'Shadow',
    args: {
        fill: "steelblue",
        shadow: true,
        strokeWidth: 3,
        stroke: "white",
    },
}; 