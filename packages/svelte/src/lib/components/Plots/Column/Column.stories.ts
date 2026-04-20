import type { Meta, StoryObj } from "@storybook/svelte";

import { sales_records_dataset } from "../../../../data/sales_records_dataset";
import ColumnStory from "./ColumnStory.svelte";

const data = sales_records_dataset.filter(
    (d, i, arr) => arr.findIndex((o) => o["Item Type"] === d["Item Type"]) === i,
);

export default {
    title: "XYCharts/Column",
    component: ColumnStory,
    parameters: { chromatic: { delay: 300 } },
} as Meta<typeof ColumnStory>;

type Story = StoryObj<typeof ColumnStory>;

export const Basic: Story = {
    args: {
        width: 500,
        height: 400,
        data,
        x: "Item Type",
        y: "Total Revenue",
    },
};

export const CustomColor: Story = {
    args: {
        ...Basic.args,
        color: "#f00",
    },
};
