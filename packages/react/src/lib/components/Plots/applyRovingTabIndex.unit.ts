import { d3 } from "@chart-io/core";

import { fireEvent } from "@testing-library/react";

import { applyRovingTabIndex } from "./applyRovingTabIndex";

describe("applyRovingTabIndex", () => {
    function renderCircles(count: number) {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        document.body.appendChild(svg);

        const selection = d3
            .select(svg)
            .selectAll("circle")
            .data(Array.from({ length: count }, (_, i) => i))
            .enter()
            .append("circle");

        return { svg, selection, nodes: selection.nodes() };
    }

    afterEach(() => {
        document.body.innerHTML = "";
    });

    it("only puts the mark at the roving index in the Tab order", () => {
        const { nodes } = renderCircles(3);
        const rovingIndexRef = { current: 1 };

        applyRovingTabIndex(d3.selectAll(nodes), rovingIndexRef, true);

        expect(nodes[0]).toHaveAttribute("tabindex", "-1");
        expect(nodes[1]).toHaveAttribute("tabindex", "0");
        expect(nodes[2]).toHaveAttribute("tabindex", "-1");
    });

    it("removes tabindex entirely when not interactive", () => {
        const { nodes } = renderCircles(2);
        const rovingIndexRef = { current: 0 };

        applyRovingTabIndex(d3.selectAll(nodes), rovingIndexRef, false);

        expect(nodes[0]).not.toHaveAttribute("tabindex");
        expect(nodes[1]).not.toHaveAttribute("tabindex");
    });

    it("clamps the roving index if the dataset has shrunk since the last render", () => {
        const { nodes } = renderCircles(2);
        const rovingIndexRef = { current: 5 };

        applyRovingTabIndex(d3.selectAll(nodes), rovingIndexRef, true);

        expect(rovingIndexRef.current).toBe(1);
        expect(nodes[1]).toHaveAttribute("tabindex", "0");
    });

    it("moves the roving tabindex forward on ArrowRight/ArrowDown and focuses the new node", () => {
        const { nodes } = renderCircles(3);
        const rovingIndexRef = { current: 0 };

        applyRovingTabIndex(d3.selectAll(nodes), rovingIndexRef, true);
        fireEvent.keyDown(nodes[0], { key: "ArrowRight" });

        expect(rovingIndexRef.current).toBe(1);
        expect(nodes[0]).toHaveAttribute("tabindex", "-1");
        expect(nodes[1]).toHaveAttribute("tabindex", "0");
        expect(document.activeElement).toBe(nodes[1]);
    });

    it("moves the roving tabindex backward on ArrowLeft/ArrowUp", () => {
        const { nodes } = renderCircles(3);
        const rovingIndexRef = { current: 1 };

        applyRovingTabIndex(d3.selectAll(nodes), rovingIndexRef, true);
        fireEvent.keyDown(nodes[1], { key: "ArrowLeft" });

        expect(rovingIndexRef.current).toBe(0);
        expect(document.activeElement).toBe(nodes[0]);
    });

    it("does not move past the first or last mark", () => {
        const { nodes } = renderCircles(3);
        const rovingIndexRef = { current: 0 };

        applyRovingTabIndex(d3.selectAll(nodes), rovingIndexRef, true);
        fireEvent.keyDown(nodes[0], { key: "ArrowLeft" });

        expect(rovingIndexRef.current).toBe(0);
    });

    it("jumps to the last mark on End and the first on Home", () => {
        const { nodes } = renderCircles(4);
        const rovingIndexRef = { current: 0 };

        applyRovingTabIndex(d3.selectAll(nodes), rovingIndexRef, true);
        fireEvent.keyDown(nodes[0], { key: "End" });

        expect(rovingIndexRef.current).toBe(3);
        expect(document.activeElement).toBe(nodes[3]);

        fireEvent.keyDown(nodes[3], { key: "Home" });

        expect(rovingIndexRef.current).toBe(0);
        expect(document.activeElement).toBe(nodes[0]);
    });

    it("ignores unrelated keys and keydowns while not interactive", () => {
        const { nodes } = renderCircles(2);
        const rovingIndexRef = { current: 0 };

        applyRovingTabIndex(d3.selectAll(nodes), rovingIndexRef, true);
        fireEvent.keyDown(nodes[0], { key: "a" });
        expect(rovingIndexRef.current).toBe(0);

        applyRovingTabIndex(d3.selectAll(nodes), rovingIndexRef, false);
        fireEvent.keyDown(nodes[0], { key: "ArrowRight" });
        expect(rovingIndexRef.current).toBe(0);
    });
});
