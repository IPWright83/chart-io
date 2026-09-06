import { eventActions, eventSelectors, getDefaultDatumItems, themes } from "@chart-io/core";
import type { IContextMenuContext, IState, IStore } from "@chart-io/core";

import type { Meta } from "@storybook/react";
import { fireEvent } from "@storybook/test";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { wait } from "../../testUtils";
import { XAxis, YAxis } from "../Axis";
import { Bar } from "../Plots/Bar";
import { usePivot } from "../Plots/usePivot";
import { XYChart } from "../XYChart";

import { ContextMenu } from "./ContextMenu";
import { ContextMenuOverlay } from "./ContextMenuOverlay";

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

/**
 * `<XYChart>`/`<RadialChart>` enable `<ContextMenuOverlay>` by default (see their `contextMenu`
 * prop) - no need to add it explicitly
 */
export const OnChartBackground = {
    name: "Right-Click the Background",
    render: () => (
        <XYChart data={data} width={500} height={350} theme={themes.light}>
            <YAxis fields={["category"]} scaleType="band" showGridlines={false} />
            <XAxis fields={["value"]} />
            <Bar x="value" y="category" color="#99C1DC" />
        </XYChart>
    ),
    play: async ({ canvasElement }) => {
        await wait(300);
        const svg = canvasElement.querySelector("svg");
        fireEvent.contextMenu(svg, { bubbles: true, clientX: 300, clientY: 150 });
    },
};

/**
 * Reads the open menu's position/context from Redux (`eventSelectors.contextMenu`) and renders it -
 * the same convention `<ContextMenuOverlay>` uses. Rendered as a child of `<XYChart>` so it shares
 * its Provider
 */
function DatumMenu() {
    const dispatch = useDispatch();
    const state = useSelector((s: IState) => s);
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
            items={getDefaultDatumItems(state)}
            colors={themes.light.menu}
            onSelect={(item) => {
                item.onSelect(dispatch, context);
                close();
            }}
            onClose={close}
        />
    );
}

// `pivotable` is dispatched into the store by `usePivot` (the same hook `<HeatmapAxes>` calls) -
// there's no generic chart-level prop for it, since only `<Heatmap>` currently has a layout that
// reacts to `pivot`. Rendered as a plain child so it registers on mount without affecting layout
function EnablePivotable() {
    usePivot(true);
    return null;
}

/**
 * Demonstrates opening a per-datum menu ("Hide data point"/"Focus data point"/"Add annotation"/
 * "Pivot") by dispatching `eventActions.openContextMenu` from a plot's existing `onClick` prop - the
 * same extension point already used for tooltips. `x`/`y` are just the click event's own `clientX`/
 * `clientY` - `<ContextMenu>` is portaled to `document.body` and positioned in viewport space, so
 * no coordinate-space conversion is needed. `contextMenu={false}` turns off the chart's own default
 * background menu here, since both would otherwise race to open on the same click. `<EnablePivotable>`
 * is included so "Pivot" shows enabled rather than disabled - it's included in the datum menu (see
 * `getDefaultDatumItems`) since a pivotable chart's cells are themselves the data points a
 * left-click would open this menu on
 *
 * The click handler needs the store before `<XYChart>` has rendered it into context, so it grabs it
 * via `onStoreCreated` rather than `useDispatch` - inside a chart, a plot's own click handler would
 * normally just receive `dispatch` some other way (e.g. already have it in scope)
 */
function DatumMenuDemo() {
    const store = useRef<IStore>();

    const onBarClick: React.ComponentProps<typeof Bar>["onClick"] = (datum, _element, event) => {
        if (!store.current) return;
        store.current.dispatch(
            eventActions.openContextMenu({ x: event.clientX, y: event.clientY, context: { type: "datum", datum } }),
        );
    };

    return (
        <XYChart
            data={data}
            width={500}
            height={350}
            theme={themes.light}
            contextMenu={false}
            onClick={onBarClick}
            onStoreCreated={(createdStore) => {
                store.current = createdStore;
            }}
        >
            <YAxis fields={["category"]} scaleType="band" showGridlines={false} />
            <XAxis fields={["value"]} />
            <Bar x="value" y="category" color="#fc998e" />
            <DatumMenu />
            <EnablePivotable />
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

/**
 * The "Pivot" action (see `createPivotAction`) is enabled purely by a chart's `pivotable` flag - it
 * doesn't need an actual `<Heatmap>` to demonstrate, just any pivotable chart. Tested here in
 * isolation (leaving the menu open, rather than selecting anything) so its icon/label are easy to
 * review on their own, without needing to right-click a full Heatmap first
 */
export const PivotAction = {
    name: "Pivot Action",
    render: () => (
        <XYChart data={data} width={500} height={350} theme={themes.light}>
            <YAxis fields={["category"]} scaleType="band" showGridlines={false} />
            <XAxis fields={["value"]} />
            <Bar x="value" y="category" color="#99C1DC" />
            <EnablePivotable />
        </XYChart>
    ),
    play: async ({ canvasElement }) => {
        await wait(300);
        const svg = canvasElement.querySelector("svg");
        fireEvent.contextMenu(svg, { bubbles: true, clientX: 300, clientY: 150 });
    },
};

// The menu renders imperatively via D3 inside a useEffect, so an item can take an extra tick to
// appear after the opening event returns - poll briefly rather than assuming it's there immediately
// (see the Heatmap Pivotable story's own findPivotItem for the same pattern)
async function findMenuItem(label: string): Promise<Element> {
    for (let attempt = 0; attempt < 10; attempt++) {
        const items = Array.from(document.body.querySelectorAll(".context-menu-item"));
        const item = items.find((el) => el.textContent.trim().startsWith(label));
        if (item) return item;
        await wait(50);
    }

    throw new Error(`The '${label}' context-menu item never appeared`);
}

/**
 * The same menu as `PivotAction`, but with the "Pivot" segment left hovered - its two `activeSegments`
 * reveal as an outer ring band on hover (see `IContextMenuItem`), so this is the easiest way to
 * review the hovered state without a human actually having to hold the mouse over it
 */
export const PivotActionHovered = {
    name: "Pivot Action (Hovered)",
    render: PivotAction.render,
    play: async ({ canvasElement }) => {
        await wait(300);
        const svg = canvasElement.querySelector("svg");
        fireEvent.contextMenu(svg, { bubbles: true, clientX: 300, clientY: 150 });

        const pivotItem = await findMenuItem("Pivot");
        fireEvent.mouseEnter(pivotItem.querySelector("path"));
    },
};

// Pre-pivots to "y" (columns) on mount, rather than leaving it at the grid - `usePivot`'s own
// `pivotTo` is what a real interaction (e.g. selecting "Pivot" itself, or the cycle completing)
// would call, so this reuses it rather than reaching into the store directly
function EnablePivotedState() {
    const { pivotTo } = usePivot(true);

    useEffect(() => {
        pivotTo("y");
    }, [pivotTo]);

    return null;
}

/**
 * The same menu as `PivotAction`, but pre-pivoted to "y" (columns) rather than left at the grid - so
 * the "Pivot" item's label reads "Pivot: grid" instead of "Pivot: x", showing the "cancel" step of
 * the same cycle (see `nextPivot`) that resets a pivoted chart back to its full grid
 */
export const PivotActionCancel = {
    name: "Pivot Action (Cancel)",
    render: () => (
        <XYChart data={data} width={500} height={350} theme={themes.light}>
            <YAxis fields={["category"]} scaleType="band" showGridlines={false} />
            <XAxis fields={["value"]} />
            <Bar x="value" y="category" color="#99C1DC" />
            <EnablePivotedState />
        </XYChart>
    ),
    play: async ({ canvasElement }) => {
        await wait(300);
        const svg = canvasElement.querySelector("svg");
        fireEvent.contextMenu(svg, { bubbles: true, clientX: 300, clientY: 150 });
    },
};
