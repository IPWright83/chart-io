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

describe("ContextMenuOverlay", () => {
    it("renders nothing until the chart is right-clicked", () => {
        const store = createStore();
        const { container } = renderOverlay(store);

        expect(container.querySelectorAll(".context-menu-item")).toHaveLength(0);
    });

    it("opens the default background menu on right-click, and prevents the native menu", () => {
        const store = createStore();
        const { container } = renderOverlay(store);

        const event = fireEvent.contextMenu(container.querySelector("svg"), { clientX: 50, clientY: 60 });

        expect(container.querySelectorAll(".context-menu-item")).toHaveLength(4);
        expect(container.textContent).toContain("Reset zoom");
        expect(container.textContent).toContain("Pivot");
        expect(container.textContent).toContain("Draw polygon");
        expect(container.textContent).toContain("Hide legend");
        // fireEvent.contextMenu returns false when preventDefault() was called
        expect(event).toBe(false);
    });

    it("stores the open menu's position/context in Redux rather than local state", () => {
        const store = createStore();
        const { container } = renderOverlay(store);

        fireEvent.contextMenu(container.querySelector("svg"), { clientX: 50, clientY: 60 });

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

        fireEvent.contextMenu(container.querySelector("svg"), { clientX: 0, clientY: 0 });

        const items = container.querySelectorAll(".context-menu-item");
        const resetZoomItem = Array.from(items).find((item) => item.textContent.trim() === "Reset zoom");

        fireEvent.click(resetZoomItem.querySelector("path"));

        expect(zoomedStore.getState().chart.zoom.path).toEqual([]);
    });

    it("does not dispatch resetZoom when nothing is zoomed in", () => {
        const store = createStore();
        const dispatch = jest.spyOn(store, "dispatch");
        const { container } = renderOverlay(store);

        fireEvent.contextMenu(container.querySelector("svg"), { clientX: 0, clientY: 0 });
        dispatch.mockClear();

        const items = container.querySelectorAll(".context-menu-item");
        const resetZoomItem = Array.from(items).find((item) => item.textContent.trim() === "Reset zoom");

        fireEvent.click(resetZoomItem.querySelector("path"));

        expect(dispatch).not.toHaveBeenCalledWith(expect.objectContaining({ type: "chart/resetZoom" }));
    });

    it("dispatches setLegendVisible(false) when 'Hide legend' is selected", () => {
        const store = createStore();
        const { container } = renderOverlay(store);

        fireEvent.contextMenu(container.querySelector("svg"), { clientX: 0, clientY: 0 });

        const items = container.querySelectorAll(".context-menu-item");
        const legendItem = Array.from(items).find((item) => item.textContent.trim() === "Hide legend");
        fireEvent.click(legendItem.querySelector("path"));

        expect(store.getState().chart.legend.hidden).toBe(true);
    });

    it("shows 'Show legend' once the legend has been hidden", () => {
        const store = createStore();
        store.dispatch(chartActions.setLegendVisible(false));
        const { container } = renderOverlay(store);

        fireEvent.contextMenu(container.querySelector("svg"), { clientX: 0, clientY: 0 });

        expect(container.textContent).toContain("Show legend");
    });

    it("supports overriding the set of items via getItems", () => {
        const store = createStore();
        const dispatch = jest.spyOn(store, "dispatch");
        const onSelect = jest.fn();
        const getItems = jest.fn().mockReturnValue([
            { id: "custom", label: "Custom Action", icon: "<svg></svg>", onSelect },
        ]);

        const { container } = renderOverlay(store, { getItems });

        fireEvent.contextMenu(container.querySelector("svg"), { clientX: 0, clientY: 0 });

        expect(container.textContent).toContain("Custom Action");
        expect(container.textContent).not.toContain("Reset zoom");

        fireEvent.click(container.querySelector("path"));
        expect(onSelect).toHaveBeenCalledWith(dispatch, { type: "background" });
    });
});
