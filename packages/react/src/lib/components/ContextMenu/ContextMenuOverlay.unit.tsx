import { Provider } from "react-redux";
import React from "react";
import { fireEvent, render } from "@testing-library/react";

import { createMockStore } from "../../testUtils";

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
        const store = createMockStore({});
        const { container } = renderOverlay(store);

        expect(container.querySelector(".context-menu")).toBeNull();
    });

    it("opens the default background menu on right-click, and prevents the native menu", () => {
        const store = createMockStore({});
        const { container } = renderOverlay(store);

        const event = fireEvent.contextMenu(container.querySelector("svg"), { clientX: 50, clientY: 60 });

        expect(container.querySelector(".context-menu")).not.toBeNull();
        expect(container.textContent).toContain("Reset zoom");
        expect(container.textContent).toContain("Pivot");
        expect(container.textContent).toContain("Draw polygon");
        expect(container.textContent).toContain("Hide legend");
        // fireEvent.contextMenu returns false when preventDefault() was called
        expect(event).toBe(false);
    });

    it("disables 'Reset zoom' while nothing is zoomed in, and dispatches resetZoom when it is", () => {
        const zoomedStore = createMockStore({ chart: { zoom: { path: ["North America"] } } });
        const { container } = renderOverlay(zoomedStore);

        fireEvent.contextMenu(container.querySelector("svg"), { clientX: 0, clientY: 0 });

        const items = container.querySelectorAll(".context-menu-item");
        const resetZoomItem = Array.from(items).find((item) => item.textContent === "Reset zoom");

        fireEvent.click(resetZoomItem.querySelector("path"));

        expect(zoomedStore.dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: "chart/resetZoom" }));
    });

    it("does not dispatch resetZoom when nothing is zoomed in", () => {
        const store = createMockStore({});
        const { container } = renderOverlay(store);

        fireEvent.contextMenu(container.querySelector("svg"), { clientX: 0, clientY: 0 });

        const items = container.querySelectorAll(".context-menu-item");
        const resetZoomItem = Array.from(items).find((item) => item.textContent === "Reset zoom");

        fireEvent.click(resetZoomItem.querySelector("path"));

        expect(store.dispatch).not.toHaveBeenCalledWith(expect.objectContaining({ type: "chart/resetZoom" }));
    });

    it("dispatches setLegendVisible(false) when 'Hide legend' is selected", () => {
        const store = createMockStore({});
        const { container } = renderOverlay(store);

        fireEvent.contextMenu(container.querySelector("svg"), { clientX: 0, clientY: 0 });

        const items = container.querySelectorAll(".context-menu-item");
        const legendItem = Array.from(items).find((item) => item.textContent === "Hide legend");
        fireEvent.click(legendItem.querySelector("path"));

        expect(store.dispatch).toHaveBeenCalledWith(
            expect.objectContaining({ type: "chart/setLegendVisible", payload: false }),
        );
    });

    it("shows 'Show legend' once the legend has been hidden", () => {
        const store = createMockStore({ chart: { legend: { items: [], position: "E", hidden: true } } });
        const { container } = renderOverlay(store);

        fireEvent.contextMenu(container.querySelector("svg"), { clientX: 0, clientY: 0 });

        expect(container.textContent).toContain("Show legend");
    });

    it("supports overriding the set of items via getItems", () => {
        const store = createMockStore({});
        const onSelect = jest.fn();
        const getItems = jest.fn().mockReturnValue([
            { id: "custom", label: "Custom Action", icon: <svg />, onSelect },
        ]);

        const { container } = renderOverlay(store, { getItems });

        fireEvent.contextMenu(container.querySelector("svg"), { clientX: 0, clientY: 0 });

        expect(container.textContent).toContain("Custom Action");
        expect(container.textContent).not.toContain("Reset zoom");

        fireEvent.click(container.querySelector("path"));
        expect(onSelect).toHaveBeenCalledWith(store.dispatch, { type: "background" });
    });
});
