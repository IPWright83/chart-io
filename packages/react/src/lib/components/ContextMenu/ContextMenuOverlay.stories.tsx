import { eventActions, eventSelectors, getDefaultDatumItems, themes } from "@chart-io/core";
import type { IContextMenuContext, IState, IStore } from "@chart-io/core";

import type { Meta } from "@storybook/react";
import { fireEvent } from "@storybook/test";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { wait } from "../../testUtils";
import { XAxis, YAxis } from "../Axis";
import { Bar } from "../Plots/Bar";
import { XYChart } from "../XYChart";

import { ContextMenu } from "./ContextMenu";
import { ContextMenuOverlay } from "./ContextMenuOverlay";
import { getSvgPoint } from "./getSvgPoint";

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
 * Reads the open menu's position/context from Redux (`eventSelectors.contextMenu`) and renders it -
 * the same convention `<ContextMenuOverlay>` uses. Rendered as a child of `<XYChart>` so it shares
 * its Provider
 */
function DatumMenu() {
    const dispatch = useDispatch();
    const isOpen = useSelector((s: IState) => eventSelectors.contextMenu.isOpen(s));
    const position = useSelector((s: IState) => eventSelectors.contextMenu.position(s));
    const context = useSelector((s: IState) => eventSelectors.contextMenu.context(s)) as
        | IContextMenuContext
        | undefined;

    const close = () => dispatch(eventActions.closeContextMenu());

    return (
        <ContextMenu
            x={position?.x ?? 0}
            y={position?.y ?? 0}
            open={isOpen}
            items={getDefaultDatumItems()}
            colors={themes.light.menu}
            onSelect={(item) => {
                item.onSelect(dispatch, context);
                close();
            }}
            onClose={close}
        />
    );
}

/**
 * Demonstrates opening a per-datum menu ("Hide data point"/"Focus data point"/"Add annotation") by
 * dispatching `eventActions.openContextMenu` from a plot's existing `onClick` prop - the same
 * extension point already used for tooltips. `<ContextMenuOverlay>` only covers the chart background;
 * a datum-level menu like this is a few lines to add to any plot.
 *
 * The click handler needs the store before `<XYChart>` has rendered it into context, so it grabs it
 * via `onStoreCreated` rather than `useDispatch` - inside a chart, a plot's own click handler would
 * normally just receive `dispatch` some other way (e.g. already have it in scope)
 */
function DatumMenuDemo() {
    const store = useRef<IStore>();

    const onBarClick: React.ComponentProps<typeof Bar>["onClick"] = (datum, element, event) => {
        const svg = (element as Element).closest("svg");
        if (!svg || !store.current) return;

        const point = getSvgPoint(svg as SVGSVGElement, event.clientX, event.clientY);
        store.current.dispatch(eventActions.openContextMenu({ ...point, context: { type: "datum", datum } }));
    };

    return (
        <XYChart
            data={data}
            width={500}
            height={350}
            theme={themes.light}
            onClick={onBarClick}
            onStoreCreated={(createdStore) => {
                store.current = createdStore;
            }}
        >
            <YAxis fields={["category"]} scaleType="band" showGridlines={false} />
            <XAxis fields={["value"]} />
            <Bar x="value" y="category" color="#fc998e" />
            <DatumMenu />
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
