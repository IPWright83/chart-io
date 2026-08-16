import { fireEvent } from "@testing-library/react";
import React from "react";

import { renderChart, testFocus, testKeyboardActivate, wait } from "../../../../testUtils";
import { Donut } from "./Donut";

describe("Donut", () => {
    const data = [
        { category: "A", value: 5 },
        { category: "B", value: 10 },
    ];

    it("should default to a non-zero innerRadius", async () => {
        const { asFragment } = await renderChart({
            children: <Donut category="category" value="value" />,
            data,
        });

        // Wait for the enter transition to settle so the snapshot deterministically
        // captures the final arc geometry rather than a mid-animation frame
        await wait();
        expect(asFragment()).toMatchSnapshot();
    });

    it("should allow the innerRadius to be overridden", async () => {
        const { asFragment } = await renderChart({
            children: <Donut category="category" value="value" innerRadius={0.2} />,
            data,
        });

        await wait();
        expect(asFragment()).toMatchSnapshot();
    });

    it("should expose an accessible role and label on each slice", async () => {
        const { container } = await renderChart({
            children: <Donut category="category" value="value" />,
            data,
        });

        await wait();

        const slices = container.querySelectorAll(".pie-slice");
        expect(slices).toHaveLength(2);
        expect(slices[0]).toHaveAttribute("role", "img");
        expect(slices[0]).toHaveAttribute("tabindex", "0");
        expect(slices[0]).toHaveAttribute("aria-label", "A: 5");
        expect(slices[1]).toHaveAttribute("aria-label", "B: 10");
    });

    it("should only put the first slice in the Tab order (roving tabindex)", async () => {
        const { container } = await renderChart({
            children: <Donut category="category" value="value" />,
            data,
        });

        await wait();

        const slices = container.querySelectorAll(".pie-slice");
        expect(slices[0]).toHaveAttribute("tabindex", "0");
        expect(slices[1]).toHaveAttribute("tabindex", "-1");

        fireEvent.keyDown(slices[0], { key: "ArrowRight" });

        expect(slices[0]).toHaveAttribute("tabindex", "-1");
        expect(slices[1]).toHaveAttribute("tabindex", "0");
        expect(document.activeElement).toBe(slices[1]);
    });

    describe("should handle event", () => {
        it("keyboard focus correctly", async () => {
            const onMouseOver = jest.fn();

            const { container } = await renderChart({
                children: <Donut category="category" value="value" onMouseOver={onMouseOver} />,
                data,
            });

            await wait();
            await testFocus(container, ".pie-slice", onMouseOver, { category: "A", value: 5 });
        });

        it("Enter key correctly", async () => {
            const onClick = jest.fn();

            const { container } = await renderChart({
                children: <Donut category="category" value="value" onClick={onClick} />,
                data,
            });

            await wait();
            await testKeyboardActivate(container, ".pie-slice", onClick, { category: "A", value: 5 }, "Enter");
        });

        it("should not activate on an unrelated key", async () => {
            const onClick = jest.fn();

            const { container } = await renderChart({
                children: <Donut category="category" value="value" onClick={onClick} />,
                data,
            });

            await wait();
            fireEvent.keyDown(container.querySelector(".pie-slice"), { key: "a" });

            expect(onClick).not.toHaveBeenCalled();
        });
    });
});
