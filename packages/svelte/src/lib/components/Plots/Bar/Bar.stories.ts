import type { Meta, StoryObj } from "@storybook/svelte";

import { sales_records_dataset } from "../../../../data/sales_records_dataset";
import BarStory from "./BarStory.svelte";

const data = sales_records_dataset.filter(
    (d, i, arr) => arr.findIndex((o) => o["Item Type"] === d["Item Type"]) === i,
);

export default {
    title: "XYCharts/Bar",
    component: BarStory,
    parameters: { chromatic: { delay: 300 } },
} as Meta<typeof BarStory>;

type Story = StoryObj<typeof BarStory>;

export const Basic: Story = {
    args: {
        width: 500,
        height: 400,
        data,
        x: "Total Revenue",
        y: "Item Type",
    },
};

export const CustomColor: Story = {
    args: {
        ...Basic.args,
        color: "#f00",
    },
};
