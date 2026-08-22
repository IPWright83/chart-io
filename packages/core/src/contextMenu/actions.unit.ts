import { defaultChartState } from "../store/chart";
import { defaultEventState } from "../store/event";

import {
    createAddAnnotationAction,
    createDrawPolygonAction,
    createFocusDataPointAction,
    createHideDataPointAction,
    createPivotAction,
    createResetZoomAction,
    createToggleLegendAction,
    getDefaultBackgroundItems,
    getDefaultDatumItems,
} from "./actions";

const notZoomedState = { event: defaultEventState, chart: defaultChartState };
const zoomedState = { event: defaultEventState, chart: { ...defaultChartState, zoom: { path: ["Europe"] } } };
const hiddenLegendState = {
    event: defaultEventState,
    chart: { ...defaultChartState, legend: { ...defaultChartState.legend, hidden: true } },
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

describe("stubbed actions", () => {
    // These don't have any store state to wire up to yet - they should still be safely callable
    // and not throw
    it.each([
        ["pivot", createPivotAction()],
        ["draw-polygon", createDrawPolygonAction()],
        ["hide-data-point", createHideDataPointAction()],
        ["focus-data-point", createFocusDataPointAction()],
        ["add-annotation", createAddAnnotationAction()],
    ])("%s is safely callable", (_, action) => {
        const dispatch = jest.fn();
        expect(() => action.onSelect(dispatch, { type: "datum", datum: { a: 1 } })).not.toThrow();
    });
});

describe("getDefaultBackgroundItems", () => {
    it("includes reset zoom, pivot, draw polygon and toggle legend", () => {
        const ids = getDefaultBackgroundItems(notZoomedState).map((item) => item.id);
        expect(ids).toEqual(["reset-zoom", "pivot", "draw-polygon", "toggle-legend"]);
    });
});

describe("getDefaultDatumItems", () => {
    it("includes hide, focus and annotate", () => {
        const ids = getDefaultDatumItems().map((item) => item.id);
        expect(ids).toEqual(["hide-data-point", "focus-data-point", "add-annotation"]);
    });
});
