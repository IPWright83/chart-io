import { defaultChartState } from "../store/chart";
import { defaultEventState } from "../store/event";

import {
    createAddAnnotationAction,
    createDrawPolygonAction,
    createFocusDataPointAction,
    createHideDataPointAction,
    createPivotAction,
    createResetFiltersAction,
    createResetZoomAction,
    createToggleLegendAction,
    getDefaultBackgroundItems,
    getDefaultDatumItems,
    getDefaultItems,
} from "./actions";

const notZoomedState = { event: defaultEventState, chart: defaultChartState };
const zoomedState = { event: defaultEventState, chart: { ...defaultChartState, zoom: { path: ["Europe"] } } };
const hiddenLegendState = {
    event: defaultEventState,
    chart: { ...defaultChartState, legend: { ...defaultChartState.legend, hidden: true } },
};
const noFiltersState = { event: defaultEventState, chart: defaultChartState };
const filteredState = {
    event: defaultEventState,
    chart: { ...defaultChartState, filters: { calories: [10, 20] } },
};
const hiddenDataState = {
    event: defaultEventState,
    chart: { ...defaultChartState, hiddenData: [{ a: 1 }] },
};

describe("createResetZoomAction", () => {
    it("is disabled while nothing is zoomed in", () => {
        expect(createResetZoomAction(notZoomedState).disabled).toBe(true);
    });

    it("is enabled once something is zoomed in", () => {
        expect(createResetZoomAction(zoomedState).disabled).toBe(false);
    });

    it("dispatches chartActions.resetZoom when selected", () => {
        const dispatch = jest.fn();
        createResetZoomAction(zoomedState).onSelect(dispatch);

        expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: "chart/resetZoom" }));
    });
});

describe("createResetFiltersAction", () => {
    it("is disabled while nothing is filtered or hidden", () => {
        expect(createResetFiltersAction(noFiltersState).disabled).toBe(true);
    });

    it("is enabled once a filter is set", () => {
        expect(createResetFiltersAction(filteredState).disabled).toBe(false);
    });

    it("is enabled once a datum is hidden", () => {
        expect(createResetFiltersAction(hiddenDataState).disabled).toBe(false);
    });

    it("dispatches chartActions.clearFilters and chartActions.clearHiddenData when selected", () => {
        const dispatch = jest.fn();
        createResetFiltersAction(filteredState).onSelect(dispatch);

        expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: "chart/clearFilters" }));
        expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: "chart/clearHiddenData" }));
    });
});

describe("createHideDataPointAction", () => {
    it("dispatches chartActions.hideDataPoint with the context's datum when selected", () => {
        const dispatch = jest.fn();
        const datum = { a: 1 };
        createHideDataPointAction().onSelect(dispatch, { type: "datum", datum });

        expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: "chart/hideDataPoint", payload: datum }));
    });

    it("is safely callable without a datum context", () => {
        const dispatch = jest.fn();
        expect(() => createHideDataPointAction().onSelect(dispatch)).not.toThrow();
        expect(dispatch).not.toHaveBeenCalled();
    });
});

describe("createToggleLegendAction", () => {
    it("labels itself 'Hide legend' while the legend is visible", () => {
        expect(createToggleLegendAction(notZoomedState).label).toBe("Hide legend");
    });

    it("labels itself 'Show legend' once the legend has been hidden", () => {
        expect(createToggleLegendAction(hiddenLegendState).label).toBe("Show legend");
    });

    it("dispatches setLegendVisible(false) to hide a visible legend", () => {
        const dispatch = jest.fn();
        createToggleLegendAction(notZoomedState).onSelect(dispatch);

        expect(dispatch).toHaveBeenCalledWith(
            expect.objectContaining({ type: "chart/setLegendVisible", payload: false }),
        );
    });

    it("dispatches setLegendVisible(true) to show a hidden legend", () => {
        const dispatch = jest.fn();
        createToggleLegendAction(hiddenLegendState).onSelect(dispatch);

        expect(dispatch).toHaveBeenCalledWith(
            expect.objectContaining({ type: "chart/setLegendVisible", payload: true }),
        );
    });
});

describe("createPivotAction", () => {
    it("is disabled while the heatmap isn't pivotable", () => {
        expect(createPivotAction(notZoomedState).disabled).toBe(true);
    });

    it("is enabled once pivotable is set", () => {
        const pivotableState = { event: defaultEventState, chart: { ...defaultChartState, pivotable: true } };
        expect(createPivotAction(pivotableState).disabled).toBe(false);
    });

    it("labels itself with the pivot it will switch to, cycling grid -> x -> y -> grid", () => {
        const gridState = { event: defaultEventState, chart: { ...defaultChartState, pivotable: true, pivot: undefined } };
        const xState = { event: defaultEventState, chart: { ...defaultChartState, pivotable: true, pivot: "x" as const } };
        const yState = { event: defaultEventState, chart: { ...defaultChartState, pivotable: true, pivot: "y" as const } };

        expect(createPivotAction(gridState).label).toBe("Pivot: x");
        expect(createPivotAction(xState).label).toBe("Pivot: y");
        expect(createPivotAction(yState).label).toBe("Pivot: grid");
    });

    it("dispatches chartActions.setPivot with the next pivot when selected", () => {
        const xState = { event: defaultEventState, chart: { ...defaultChartState, pivotable: true, pivot: "x" as const } };
        const dispatch = jest.fn();
        createPivotAction(xState).onSelect(dispatch);

        expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: "chart/setPivot", payload: "y" }));
    });
});

describe("stubbed actions", () => {
    // These don't have any store state to wire up to yet - they should still be safely callable
    // and not throw
    it.each([
        ["draw-polygon", createDrawPolygonAction()],
        ["focus-data-point", createFocusDataPointAction()],
        ["add-annotation", createAddAnnotationAction()],
    ])("%s is safely callable", (_, action) => {
        const dispatch = jest.fn();
        expect(() => action.onSelect(dispatch, { type: "datum", datum: { a: 1 } })).not.toThrow();
    });
});

describe("getDefaultBackgroundItems", () => {
    it("includes reset zoom, reset filters, pivot, draw polygon and toggle legend", () => {
        const ids = getDefaultBackgroundItems(notZoomedState).map((item) => item.id);
        expect(ids).toEqual(["reset-zoom", "reset-filters", "pivot", "draw-polygon", "toggle-legend"]);
    });
});

describe("getDefaultDatumItems", () => {
    it("includes hide, focus and annotate", () => {
        const ids = getDefaultDatumItems().map((item) => item.id);
        expect(ids).toEqual(["hide-data-point", "focus-data-point", "add-annotation"]);
    });
});

describe("getDefaultItems", () => {
    it("returns the background items when opened without a context, or with a background context", () => {
        expect(getDefaultItems(notZoomedState).map((item) => item.id)).toEqual(
            getDefaultBackgroundItems(notZoomedState).map((item) => item.id),
        );
        expect(getDefaultItems(notZoomedState, { type: "background" }).map((item) => item.id)).toEqual(
            getDefaultBackgroundItems(notZoomedState).map((item) => item.id),
        );
    });

    it("returns the datum items when opened with a datum context", () => {
        const ids = getDefaultItems(notZoomedState, { type: "datum", datum: { a: 1 } }).map((item) => item.id);
        expect(ids).toEqual(getDefaultDatumItems().map((item) => item.id));
    });
});
