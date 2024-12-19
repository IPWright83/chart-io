import * as d3 from "@chart-io/d3";

import { themes } from "../../../themes";

import { chartActions, chartSlice, defaultChartState } from "..";

describe("chartSlice.reducer", () => {
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

    it("setDimensions()", () => {
        const action = chartActions.setDimensions({
            width: 900,
            height: 400,
            margin: { top: 5, left: 5, right: 5, bottom: 5 },
        });

        expect(chartSlice.reducer(previousState, action)).toEqual({
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

    it("setDimensions() action skips if identical", () => {
        const previousLocalState = {
            ...previousState,
            dimensions: {
                width: 900,
                height: 400,
                plotMargin: { top: 5, left: 5, right: 5, bottom: 5 },
            },
        };

        const action = chartActions.setDimensions({
            width: 900,
            height: 400,
            margin: { top: 5, left: 5, right: 5, bottom: 5 },
        });

        expect(chartSlice.reducer(previousLocalState, action)).toEqual({
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

    it("setBrushRange()", () => {
        const action = chartActions.setBrushRange({
            field: "a",
            range: [0, 100],
        });

        expect(chartSlice.reducer(previousState, action)).toEqual({
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

    it("setScaleZoom()", () => {
        const action = chartActions.setScaleZoom({
            field: "a",
            domain: [3, 7],
        });

        expect(chartSlice.reducer(previousState, action)).toEqual({
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

    it("setBrushDimensions()", () => {
        const action = chartActions.setBrushDimensions({
            width: 25,
            height: 75,
            margin: { left: 10, right: 10, top: 10, bottom: 10 },
        });

        expect(chartSlice.reducer(previousState, action)).toEqual({
            ...previousState,
            brush: {
                ...previousState.brush,
                width: 25,
                height: 75,
                margin: { left: 10, right: 10, top: 10, bottom: 10 },
            },
        });
    });

    it("setChartId()", () => {
        const action = chartActions.setChartID("foo");

        expect(chartSlice.reducer(previousState, action)).toEqual({
            ...previousState,
            id: "foo",
        });
    });

    it("setChartData()", () => {
        const action = chartActions.setChartData([{ a: "baz" }]);

        expect(chartSlice.reducer(previousState, action)).toEqual({
            ...previousState,
            dimensions: previousState.dimensions,
            data: [{ a: "baz" }],
            scales: previousState.scales,
        });
    });

    it("setScales()", () => {
        const logScale = d3.scaleLog();

        const action = chartActions.setScales({
            fields: ["x", "y"],
            scale: logScale,
        });

        expect(chartSlice.reducer(previousState, action)).toEqual({
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

    it("SetAnimationDuration()", () => {
        const action = chartActions.setAnimationDuration(12549);

        expect(chartSlice.reducer(previousState, action)).toEqual({
            ...previousState,
            animationDuration: 12549,
        });
    });

    it("addLegendItem()", () => {
        const item = {
            name: "legend item",
            icon: "circle" as const,
            color: "#fff" as const,
        };

        const action = chartActions.addLegendItem(item);

        expect(chartSlice.reducer(previousState, action)).toEqual({
            ...previousState,
            legend: {
                items: [item],
            },
        });
    });

    it("removeLegendItem()", () => {
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

        const action = chartActions.removeLegendItem(item);

        expect(chartSlice.reducer(previousLocalState, action)).toEqual({
            ...previousState,
            legend: { items: [] },
        });
    });

    it("setTheme()", () => {
        const action = chartActions.setTheme(themes.dark);

        expect(chartSlice.reducer(previousState, action)).toEqual({
            ...previousState,
            theme: themes.dark,
        });
    });
});
