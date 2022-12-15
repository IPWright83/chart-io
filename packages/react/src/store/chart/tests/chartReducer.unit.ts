import { defaultChartState, chartReducer } from "../chartReducer";
import type { IPrimitive } from "../../../types";
import { themes } from "../../../themes";

import type {
    SetDimensionAction,
    SetDataAction,
    SetScaleAction,
    SetAnimationDurationAction,
    SetThemeAction,
} from "../types";

describe("chartReducer", () => {
    const previousState = {
        ...defaultChartState,
        dimensions: {
            width: 1000,
            height: 500,
            margin: { top: 10, left: 10, right: 10, bottom: 10 },
        },
        data: [{ a: "foo" }, { b: "bar" }],
        scales: {
            a: { fakeScale: 1 },
            b: { fakeScale: 2 },
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
            dimensions: {
                width: 900,
                height: 400,
                margin: { top: 5, left: 5, right: 5, bottom: 5 },
            },
            data: previousState.data,
            scales: previousState.scales,
        });
    });

    it("CHART.SET_DATA action", () => {
        const action = {
            type: "CHART.SET_DATA",
            payload: [{ a: "baz" }],
        } as SetDataAction;

        expect(chartReducer(previousState, action)).toEqual({
            dimensions: previousState.dimensions,
            data: [{ a: "baz" }],
            scales: previousState.scales,
        });
    });

    it("CHART.SET_SCALES", () => {
        const action = {
            type: "CHART.SET_SCALES",
            payload: {
                fields: ["x", "y"],
                scale: (t: IPrimitive) => 0,
                fromAxis: false,
            },
        } as SetScaleAction;

        expect(chartReducer(previousState, action)).toEqual({
            dimensions: previousState.dimensions,
            data: previousState.data,
            scales: {
                a: { fakeScale: 1 },
                b: { fakeScale: 2 },
                x: { fakeScale: 3 },
                y: { fakeScale: 3 },
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

    it("CHART.SET_THEME", () => {
        const action = {
            type: "CHART.SET_THEME",
            payload: themes.dark,
        } as SetThemeAction;

        expect(chartReducer(previousState, action)).toEqual({
            ...previousState,
            theme: { foo: "bar" },
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
