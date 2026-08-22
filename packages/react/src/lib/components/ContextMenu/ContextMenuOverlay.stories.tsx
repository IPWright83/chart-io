import { themes } from "@chart-io/core";

import type { Meta } from "@storybook/react";
import { fireEvent } from "@storybook/test";
import React from "react";

import { wait } from "../../testUtils";
import { XAxis, YAxis } from "../Axis";
import { Bar } from "../Plots/Bar";
import { XYChart } from "../XYChart";

import { ContextMenu } from "./ContextMenu";
import { ContextMenuOverlay } from "./ContextMenuOverlay";
import { getDefaultDatumItems } from "./actions";
import { getSvgPoint } from "./getSvgPoint";
import type { IContextMenuContext } from "./types";
import { useContextMenu } from "./useContextMenu";

export default {
    title: "Components/ContextMenuOverlay",
    component: ContextMenuOverlay,
    parameters: {
        chromatic: { delay: 300 },
    },
} as Meta<typeof ContextMenuOverlay>;

const data = [
    { category: "Fruit", value: 42 },
    { category: "Vegetables", value: 68 },
    { category: "Grains", value: 35 },
    { category: "Dairy", value: 51 },
];

export const OnChartBackground = {
    name: "Right-click the Background",
    render: () => (
        <XYChart data={data} width={500} height={350} theme={themes.light}>
            <YAxis fields={["category"]} scaleType="band" showGridlines={false} />
            <XAxis fields={["value"]} />
            <Bar x="value" y="category" color="#99C1DC" />
            <ContextMenuOverlay />
        </XYChart>
    ),
    play: async ({ canvasElement }) => {
        await wait(300);
        const svg = canvasElement.querySelector("svg");
        fireEvent(svg, new MouseEvent("contextmenu", { bubbles: true, clientX: 300, clientY: 150 }));
    },
};

/**
 * Demonstrates wiring up a per-datum menu ("Hide data point"/"Focus data point"/"Add annotation")
 * using `useContextMenu` and `<ContextMenu>` directly, triggered from a plot's existing `onClick`
 * prop - the same extension point already used for tooltips. `<ContextMenuOverlay>` only covers the
 * chart background; a datum-level menu like this is a few lines to add to any plot
 */
function DatumMenuDemo() {
    const { isOpen, x, y, context, open, close } = useContextMenu<IContextMenuContext>();
    const items = getDefaultDatumItems();

    const onBarClick: React.ComponentProps<typeof Bar>["onClick"] = (datum, element, event) => {
        const svg = (element as Element).closest("svg");
        if (!svg) return;

        const point = getSvgPoint(svg as SVGSVGElement, event.clientX, event.clientY);
        open(point.x, point.y, { type: "datum", datum });
    };

    return (
        <XYChart data={data} width={500} height={350} theme={themes.light} onClick={onBarClick}>
            <YAxis fields={["category"]} scaleType="band" showGridlines={false} />
            <XAxis fields={["value"]} />
            <Bar x="value" y="category" color="#fc998e" />
            <ContextMenu
                x={x}
                y={y}
                open={isOpen}
                items={items}
                colors={themes.light.menu}
                onSelect={(item) => {
                    item.onSelect(undefined, context);
                    close();
                }}
                onClose={close}
            />
        </XYChart>
    );
}

export const OnADataPoint = {
    name: "Click a Bar",
    render: () => <DatumMenuDemo />,
    play: async ({ canvasElement }) => {
        await wait(300);
        const bar = canvasElement.querySelector("rect.bar");
        fireEvent.click(bar, { bubbles: true, clientX: 300, clientY: 150 });
    },
};
