import type { IColor } from "@chart-io/core";
import { d3 } from "@chart-io/core";
import { Provider } from "react-redux";
import React from "react";
import { render } from "@testing-library/react";

import { createMockStore } from "../../../testUtils";

import { Legend } from "./Legend";

describe("Legend", () => {
    const store = createMockStore({});

    it("should render correctly", async () => {
        const positionStyle = {
            position: "absolute",
            left: 10,
            right: 20,
            top: 30,
            bottom: 40,
        };

        const items = [
            { name: "a", icon: "circle" as const, color: "blue" as IColor },
            { name: "b", icon: "square" as const, color: "orange" as IColor },
            { name: "c", icon: "line" as const, color: "green" as IColor },
        ];

        const { asFragment } = render(
            <Provider store={store}>
                <Legend items={items} positionStyle={positionStyle} />
            </Provider>
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it("should render nothing if there are no items", async () => {
        const { asFragment } = render(
            <Provider store={store}>
                <Legend items={[]} />
            </Provider>
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it("should render the size legend at the bottom, even with no color items", async () => {
        const storeWithScale = createMockStore({
            chart: {
                scales: {
                    population: {
                        scale: d3.scaleLinear().domain([0, 100]).range([5, 25]),
                        domain: [0, 100],
                        range: [5, 25],
                    },
                },
            },
        });

        const { asFragment } = render(
            <Provider store={storeWithScale}>
                <Legend items={[]} sizeLegend={{ field: "population", ticks: 3 }} />
            </Provider>
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it("should color its circles using the first color item plotted against the same field", async () => {
        const storeWithScale = createMockStore({
            chart: {
                scales: {
                    population: {
                        scale: d3.scaleLinear().domain([0, 100]).range([5, 25]),
                        domain: [0, 100],
                        range: [5, 25],
                    },
                },
                legend: {
                    items: [
                        { name: "Other Series", icon: "square" as const, color: "orange" as IColor },
                        { name: "Cities", icon: "circle" as const, color: "steelblue" as IColor, zField: "population" },
                    ],
                },
            },
        });

        const { container } = render(
            <Provider store={storeWithScale}>
                <Legend items={[]} sizeLegend={{ field: "population", ticks: 3 }} />
            </Provider>
        );

        const rings = container.querySelectorAll(".size-legend-ring");
        expect(rings.length).toBeGreaterThan(0);
        rings.forEach((ring) => expect(ring).toHaveAttribute("stroke", "steelblue"));
    });

    it("should show a grabbing cursor while being dragged", async () => {
        const items = [{ name: "a", icon: "circle" as const, color: "blue" as IColor }];

        const { container } = render(
            <Provider store={store}>
                <Legend items={items} onPointerDown={jest.fn()} dragging />
            </Provider>
        );

        expect(container.querySelector(".legend")).toHaveStyle({ cursor: "grabbing" });
    });
});
