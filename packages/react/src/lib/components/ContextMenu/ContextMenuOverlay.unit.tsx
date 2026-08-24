import { chartActions, createStore, eventSelectors } from "@chart-io/core";

import { Provider } from "react-redux";
import React from "react";
import { fireEvent, render } from "@testing-library/react";

import { ContextMenuOverlay } from "./ContextMenuOverlay";

function renderOverlay(store, props = {}) {
    return render(
        <Provider store={store}>
            <svg>
                <ContextMenuOverlay {...props} />
            </svg>
        </Provider>,
    );
}

// <ContextMenu> (rendered by <ContextMenuOverlay>) is portaled straight into document.body, so its
// content lives outside RTL's own `container` - query document.body instead. `container` itself
// still only holds the chart's own <svg>, which is what the click listener attaches to

describe("ContextMenuOverlay", () => {
    it("renders nothing until the chart is clicked", () => {
        const store = createStore();
        renderOverlay(store);

        expect(document.body.querySelectorAll(".context-menu-item")).toHaveLength(0);
    });

    it("opens the default background menu on click", () => {
        const store = createStore();
        const { container } = renderOverlay(store);

        fireEvent.click(container.querySelector("svg"), { clientX: 50, clientY: 60 });

        expect(document.body.querySelectorAll(".context-menu-item")).toHaveLength(4);
        expect(document.body.textContent).toContain("Reset zoom");
        expect(document.body.textContent).toContain("Pivot");
        expect(document.body.textContent).toContain("Draw polygon");
        expect(document.body.textContent).toContain("Hide legend");
    });

    it("stores the open menu's position/context in Redux, in viewport (clientX/clientY) coordinates", () => {
        const store = createStore();
        const { container } = renderOverlay(store);

        fireEvent.click(container.querySelector("svg"), { clientX: 50, clientY: 60 });

        expect(eventSelectors.contextMenu.store(store.getState())).toEqual({
            x: 50,
            y: 60,
            context: { type: "background" },
        });

        fireEvent.keyDown(window, { key: "Escape" });

        expect(eventSelectors.contextMenu.store(store.getState())).toBeUndefined();
    });

    it("disables 'Reset zoom' while nothing is zoomed in, and dispatches resetZoom when it is", () => {
        const zoomedStore = createStore();
        zoomedStore.dispatch(chartActions.setZoomPath(["North America"]));
        const { container } = renderOverlay(zoomedStore);

        fireEvent.click(container.querySelector("svg"), { clientX: 0, clientY: 0 });

        const items = document.body.querySelectorAll(".context-menu-item");
        const resetZoomItem = Array.from(items).find((item) => item.textContent.trim() === "Reset zoom");

        fireEvent.click(resetZoomItem.querySelector("path"));

        expect(zoomedStore.getState().chart.zoom.path).toEqual([]);
    });

    it("does not dispatch resetZoom when nothing is zoomed in", () => {
        const store = createStore();
        const dispatch = jest.spyOn(store, "dispatch");
        const { container } = renderOverlay(store);

        fireEvent.click(container.querySelector("svg"), { clientX: 0, clientY: 0 });
        dispatch.mockClear();

        const items = document.body.querySelectorAll(".context-menu-item");
        const resetZoomItem = Array.from(items).find((item) => item.textContent.trim() === "Reset zoom");

        fireEvent.click(resetZoomItem.querySelector("path"));

        expect(dispatch).not.toHaveBeenCalledWith(expect.objectContaining({ type: "chart/resetZoom" }));
    });

    it("dispatches setLegendVisible(false) when 'Hide legend' is selected", () => {
        const store = createStore();
        const { container } = renderOverlay(store);

        fireEvent.click(container.querySelector("svg"), { clientX: 0, clientY: 0 });

        const items = document.body.querySelectorAll(".context-menu-item");
        const legendItem = Array.from(items).find((item) => item.textContent.trim() === "Hide legend");
        fireEvent.click(legendItem.querySelector("path"));

        expect(store.getState().chart.legend.hidden).toBe(true);
    });

    it("shows 'Show legend' once the legend has been hidden", () => {
        const store = createStore();
        store.dispatch(chartActions.setLegendVisible(false));
        const { container } = renderOverlay(store);

        fireEvent.click(container.querySelector("svg"), { clientX: 0, clientY: 0 });

        expect(document.body.textContent).toContain("Show legend");
    });

    it("supports overriding the set of items via getItems", () => {
        const store = createStore();
        const dispatch = jest.spyOn(store, "dispatch");
        const onSelect = jest.fn();
        const getItems = jest.fn().mockReturnValue([
            { id: "custom", label: "Custom Action", icon: "<svg></svg>", onSelect },
        ]);

        const { container } = renderOverlay(store, { getItems });

        fireEvent.click(container.querySelector("svg"), { clientX: 0, clientY: 0 });

        expect(document.body.textContent).toContain("Custom Action");
        expect(document.body.textContent).not.toContain("Reset zoom");

        fireEvent.click(document.body.querySelector(".context-menu-item > path"));
        expect(onSelect).toHaveBeenCalledWith(dispatch, { type: "background" });
    });
});
