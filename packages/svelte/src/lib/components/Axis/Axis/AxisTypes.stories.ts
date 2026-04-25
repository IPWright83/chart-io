import type { Meta, StoryObj } from "@storybook/svelte";
import AxisStory from "./AxisStory.svelte";

const meta = {
    title: "Components/Axis/Types",
    component: AxisStory,
    parameters: {
        chromatic: { delay: 300 },
    },
} satisfies Meta<typeof AxisStory>;

export default meta;
type Story = StoryObj<typeof AxisStory>;

export const StringAxis: Story = {
    name: "String Axis",
    args: {
        position: "bottom",
        fields: ["stringValue"],
        showGridlines: false,
    },
};

export const BooleanAxis: Story = {
    name: "Boolean Axis",
    args: {
        position: "bottom",
        fields: ["boolValue"],
        showGridlines: false,
    },
};

export const IntegerAxis: Story = {
    name: "Integer Axis",
    args: {
        position: "bottom",
        fields: ["integerValue"],
        showGridlines: false,
    },
};

export const DoubleAxis: Story = {
    name: "Double Axis",
    args: {
        position: "bottom",
        fields: ["doubleValue"],
        showGridlines: false,
    },
};

export const DoubleAxisOnlyNegative: Story = {
    name: "Double Axis (with exclusive negative values)",
    args: {
        position: "bottom",
        fields: ["negativeDoubleValue"],
        showGridlines: false,
    },
};

export const DoubleAxisMixedSign: Story = {
    name: "Double Axis (with mixed positive and negative values)",
    args: {
        position: "bottom",
        fields: ["positiveAndNegativeDoubleValue"],
        showGridlines: false,
    },
};

export const DateAxis: Story = {
    name: "Date Axis",
    args: {
        position: "bottom",
        fields: ["dateValue"],
        showGridlines: false,
    },
};

export const DateTimeAxis: Story = {
    name: "DateTime Axis",
    args: {
        position: "bottom",
        fields: ["dateTimeValue"],
        showGridlines: false,
    },
};
