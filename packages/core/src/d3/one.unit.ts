import { select } from "d3-selection";

import { one } from "./one";

describe("one", () => {
    it("should create the element when present is true", () => {
        const root = select(document.createElement("div"));

        const selection = one(root, "span", "my-class", true);

        expect(selection.size()).toBe(1);
        expect(selection.node().tagName.toLowerCase()).toBe("span");
        expect(selection.classed("my-class")).toBe(true);
    });

    it("should default present to true when omitted", () => {
        const root = select(document.createElement("div"));

        const selection = one(root, "span", "my-class");

        expect(selection.size()).toBe(1);
    });

    it("should remove the element when present is false", () => {
        const root = select(document.createElement("div"));

        one(root, "span", "my-class", true);
        const selection = one(root, "span", "my-class", false);

        expect(selection.size()).toBe(0);
        expect(root.selectAll("span").size()).toBe(0);
    });

    it("should reuse the existing element across calls rather than recreating it", () => {
        const root = select(document.createElement("div"));

        const first = one(root, "span", "my-class", true).node();
        const second = one(root, "span", "my-class", true).node();

        expect(second).toBe(first);
    });

    it("should select by tag name alone when no class is provided", () => {
        const root = select(document.createElement("div"));

        const selection = one(root, "span");

        expect(selection.size()).toBe(1);
        expect(selection.attr("class")).toBeNull();
    });
});
