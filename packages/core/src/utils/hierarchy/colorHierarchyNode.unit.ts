import { d3 } from "../../d3";

import { buildHierarchy } from "./buildHierarchy";
import { colorHierarchyNode } from "./colorHierarchyNode";

describe("/utils/hierarchy/colorHierarchyNode", () => {
    const colorScale = (key: string) => (key === "North" ? "rgb(153, 193, 220)" : "rgb(252, 153, 142)");

    it("should use the color scale directly for depth-1 nodes", () => {
        const data = [
            { region: "North", product: "Widgets", sales: 5 },
            { region: "South", product: "Widgets", sales: 10 },
        ];
        const root = buildHierarchy(data, ["region", "product"], "sales", false, "unit_test");
        const [north, south] = root.children ?? [];

        expect(colorHierarchyNode(north, colorScale)).toBe("rgb(153, 193, 220)");
        expect(colorHierarchyNode(south, colorScale)).toBe("rgb(252, 153, 142)");
    });

    it("should brighten deeper nodes relative to their parent, varied by sibling position", () => {
        const data = [
            { region: "North", product: "Widgets", sales: 5 },
            { region: "North", product: "Gadgets", sales: 5 },
        ];
        const root = buildHierarchy(data, ["region", "product"], "sales", false, "unit_test");
        const [north] = root.children ?? [];
        const [widgets, gadgets] = north.children ?? [];

        // The first sibling (t=0) doesn't brighten at all, so it matches the parent exactly
        expect(colorHierarchyNode(widgets, colorScale)).toBe(colorHierarchyNode(north, colorScale));

        // The second sibling (t>0) should be a different (brighter) color
        expect(colorHierarchyNode(gadgets, colorScale)).not.toBe(colorHierarchyNode(north, colorScale));
    });

    it("should never brighten past white, however many siblings a node has", () => {
        // A base color that's already fairly light - naive brightening would blow past white for
        // later siblings, e.g. brighter(0.933) already pushes this past lightness 1.0
        const lightScale = () => "rgb(153, 193, 220)";
        const data = Array.from({ length: 6 }, (_, i) => ({ region: "North", product: `Product ${i}`, sales: 1 }));
        const root = buildHierarchy(data, ["region", "product"], "sales", false, "unit_test");
        const [north] = root.children ?? [];
        const children = north.children ?? [];

        for (const child of children) {
            expect(colorHierarchyNode(child, lightScale)).not.toBe("rgb(255, 255, 255)");
        }
    });

    it("should darken (not brighten) deeper nodes against a dark background", () => {
        const data = [
            { region: "North", product: "Widgets", sales: 5 },
            { region: "North", product: "Gadgets", sales: 5 },
        ];
        const root = buildHierarchy(data, ["region", "product"], "sales", false, "unit_test");
        const [north] = root.children ?? [];
        const [, gadgets] = north.children ?? [];

        const lightness = (color: string) => d3.hsl(color).l;

        expect(lightness(colorHierarchyNode(gadgets, colorScale, "#333333"))).toBeLessThan(
            lightness(colorHierarchyNode(north, colorScale, "#333333")),
        );
    });

    it("should never darken past black, however many siblings a node has", () => {
        const darkScale = () => "rgb(81, 203, 223)";
        const data = Array.from({ length: 6 }, (_, i) => ({ region: "North", product: `Product ${i}`, sales: 1 }));
        const root = buildHierarchy(data, ["region", "product"], "sales", false, "unit_test");
        const [north] = root.children ?? [];
        const children = north.children ?? [];

        for (const child of children) {
            expect(colorHierarchyNode(child, darkScale, "#333333")).not.toBe("rgb(0, 0, 0)");
        }
    });
});
