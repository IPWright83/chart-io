import type { Meta, StoryObj } from '@storybook/svelte';
import type { IColor } from "@chart-io/types";
import Circle from './Circle/Circle.svelte';
import Line from './Line/Line.svelte';
import Square from './Square/Square.svelte';

const meta = {
    title: 'Components/Shapes',
    parameters: {
        layout: 'centered',
    },
} satisfies Meta;

export default meta;

interface ShapeArgs {
    fill: IColor;
}

export const CircleShape: StoryObj<typeof Circle> = {
    name: 'Circle',
    render: (args: ShapeArgs) => ({
        Component: Circle,
        props: args,
    }),
    args: {
        fill: '#1f77b4',
    },
};

export const LineShape: StoryObj<typeof Line> = {
    name: 'Line',
    render: (args: ShapeArgs) => ({
        Component: Line,
        props: args,
    }),
    args: {
        fill: '#1f77b4',
    },
};

export const SquareShape: StoryObj<typeof Square> = {
    name: 'Square',
    render: (args: ShapeArgs) => ({
        Component: Square,
        props: args,
    }),
    args: {
        fill: '#1f77b4',
    },
}; 