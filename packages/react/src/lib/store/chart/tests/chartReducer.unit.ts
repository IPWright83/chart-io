import * as d3 from "@chart-it/d3";

import { themes } from "../../../themes";

import { chartReducer, defaultChartState } from "../chartReducer";

import type {
    AddLegendItemAction,
    RemoveLegendItemAction,
    SetAnimationDurationAction,
    SetBrushDimensionsAction,
    SetBrushRangeAction,
    SetChartIDAction,
    SetDataAction,
    SetDimensionAction,
    SetScaleAction,
    SetScaleZoomAction,
    SetThemeAction,
} from "../types";

describe("chartReducer", () => {
    const previousState = {
        ...defaultChartState,
        dimensions: {
            width: 1000,
            height: 500,
            plotMargin: { top: 10, left: 10, right: 10, bottom: 10 },
        },
        data: [{ a: "foo" }, { b: "bar" }],
        scales: {
            a: d3.scaleLinear(),
            b: d3.scaleBand(),
        },
    };

    it("CHART.SET_DIMENSIONS action", () => {
        const action = {
            type: "CHART.SET_DIMENSIONS",
            payload: {
                width: 900,
                height: 400,
                margin: { top: 5, left: 5, right: 5, bottom: 5 },
            },
        } as SetDimensionAction;

        expect(chartReducer(previousState, action)).toEqual({
            ...previousState,
            dimensions: {
                width: 900,
                height: 400,
                plotMargin: { top: 5, left: 5, right: 5, bottom: 5 },
            },
            data: previousState.data,
            scales: previousState.scales,
        });
    });

    it("CHART.SET_DIMENSIONS action skips if identical", () => {
        const previousLocalState = {
            ...previousState,
            dimensions: {
                width: 900,
                height: 400,
                plotMargin: { top: 5, left: 5, right: 5, bottom: 5 },
            },
        };

        const action = {
            type: "CHART.SET_DIMENSIONS",
            payload: {
                width: 900,
                height: 400,
                margin: { top: 5, left: 5, right: 5, bottom: 5 },
            },
        } as SetDimensionAction;

        expect(chartReducer(previousLocalState, action)).toEqual({
            ...previousState,
            dimensions: {
                width: 900,
                height: 400,
                plotMargin: { top: 5, left: 5, right: 5, bottom: 5 },
            },
            data: previousState.data,
            scales: previousState.scales,
        });
    });

    it("CHART.SET_BRUSH_RANGE", () => {
        const action = {
            type: "CHART.SET_BRUSH_RANGE",
            payload: {
                field: "a",
                range: [0, 100],
            },
        } as SetBrushRangeAction;

        expect(chartReducer(previousState, action)).toEqual({
            ...previousState,
            scales: {
                ...previousState.scales,
                a: {
                    ...previousState.scales.a,
                    brush: {
                        range: [0, 100],
                    },
                },
            },
        });
    });

    it("CHART.SET_SCALE_ZOOM", () => {
        const action = {
            type: "CHART.SET_SCALE_ZOOM",
            payload: {
                field: "a",
                domain: [3, 7],
            },
        } as SetScaleZoomAction;

        expect(chartReducer(previousState, action)).toEqual({
            ...previousState,
            scales: {
                ...previousState.scales,
                a: {
                    ...previousState.scales.a,
                    zoomedDomain: [3, 7],
                },
            },
        });
    });

    it("CHART.SET_BRUSH_DIMENSIONS", () => {
        const action = {
            type: "CHART.SET_BRUSH_DIMENSIONS",
            payload: {
                width: 25,
                height: 75,
                margin: { left: 10, right: 10, top: 10, bottom: 10 },
            },
        } as SetBrushDimensionsAction;

        expect(chartReducer(previousState, action)).toEqual({
            ...previousState,
            brush: {
                ...previousState.brush,
                width: 25,
                height: 75,
                margin: { left: 10, right: 10, top: 10, bottom: 10 },
            },
        });
    });

    it("CHART.SET_CHART_ID", () => {
        const action = {
            type: "CHART.SET_CHART_ID",
            payload: "foo",
        } as SetChartIDAction;

        expect(chartReducer(previousState, action)).toEqual({
            ...previousState,
            id: "foo",
        });
    });

    it("CHART.SET_DATA action", () => {
        const action = {
            type: "CHART.SET_DATA",
            payload: [{ a: "baz" }],
        } as SetDataAction;

        expect(chartReducer(previousState, action)).toEqual({
            ...previousState,
            dimensions: previousState.dimensions,
            data: [{ a: "baz" }],
            scales: previousState.scales,
        });
    });

    it("CHART.SET_SCALES", () => {
        const logScale = d3.scaleLog();

        const action = {
            type: "CHART.SET_SCALES",
            payload: {
                fields: ["x", "y"],
                scale: logScale,
            },
        } as SetScaleAction;

        expect(chartReducer(previousState, action)).toEqual({
            ...previousState,
            dimensions: previousState.dimensions,
            data: previousState.data,
            scales: {
                ...previousState.scales,
                x: {
                    domain: [1, 10],
                    range: [0, 1],
                    scale: logScale,
                },
                y: {
                    domain: [1, 10],
                    range: [0, 1],
                    scale: logScale,
                },
            },
        });
    });

    it("CHART.SET_ANIMATION_DURATION", () => {
        const action = {
            type: "CHART.SET_ANIMATION_DURATION",
            payload: 12549,
        } as SetAnimationDurationAction;

        expect(chartReducer(previousState, action)).toEqual({
            ...previousState,
            animationDuration: 12549,
        });
    });

    it("CHART.ADD_LEGEND_ITEM", () => {
        const item = {
            name: "legend item",
            icon: "circle" as const,
            color: "#fff" as const,
        };

        const action = {
            type: "CHART.ADD_LEGEND_ITEM",
            payload: item,
        } as AddLegendItemAction;

        expect(chartReducer(previousState, action)).toEqual({
            ...previousState,
            legend: {
                items: [item],
            },
        });
    });

    it("CHART.REMOVE_LEGEND_ITEM", () => {
        const item = {
            name: "legend item",
            icon: "circle" as const,
            color: "#fff" as const,
        };

        const previousLocalState = {
            ...previousState,
            legend: {
                items: [item],
            },
        };

        const action = {
            type: "CHART.REMOVE_LEGEND_ITEM",
            payload: item,
        } as RemoveLegendItemAction;

        expect(chartReducer(previousLocalState, action)).toEqual({
            ...previousState,
            legend: { items: [] },
        });
    });

    it("CHART.SET_THEME", () => {
        const action = {
            type: "CHART.SET_THEME",
            payload: themes.dark,
        } as SetThemeAction;

        expect(chartReducer(previousState, action)).toEqual({
            ...previousState,
            theme: themes.dark,
        });
    });

    it("returns state for unknown action", () => {
        const action = {
            type: "RANDOM_ACTION",
        };

        // @ts-expect-error Testing that random actions are ignored
        expect(chartReducer(previousState, action)).toEqual(previousState);
    });
});
