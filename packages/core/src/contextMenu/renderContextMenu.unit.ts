import type { IContextMenuItem } from "../types";

import { destroyContextMenu, renderContextMenu } from "./renderContextMenu";

const SVG_NS = "http://www.w3.org/2000/svg";

function createContainer(): SVGGElement {
    const svg = document.createElementNS(SVG_NS, "svg");
    const g = document.createElementNS(SVG_NS, "g") as SVGGElement;
    svg.appendChild(g);
    document.body.appendChild(svg);
    return g;
}

const items: IContextMenuItem[] = [
    { id: "a", label: "Action A", icon: "<svg><circle /></svg>", onSelect: jest.fn() },
    { id: "b", label: "Action B", icon: "<svg><rect /></svg>", onSelect: jest.fn() },
    { id: "c", label: "Action C", icon: "<svg><path /></svg>", disabled: true, onSelect: jest.fn() },
];

describe("renderContextMenu", () => {
    afterEach(() => {
        document.body.innerHTML = "";
    });

    it("renders nothing while closed", () => {
        const container = createContainer();
        renderContextMenu(container, { x: 0, y: 0, open: false, items, onSelect: jest.fn() });

        expect(container.querySelectorAll(".context-menu-item")).toHaveLength(0);
    });

    it("renders one segment per item, positioned at (x, y)", () => {
        const container = createContainer();
        renderContextMenu(container, { x: 42, y: 99, open: true, items, onSelect: jest.fn() });

        expect(container.getAttribute("transform")).toBe("translate(42, 99)");
        expect(container.querySelectorAll(".context-menu-item")).toHaveLength(3);
        expect(container.querySelectorAll(".context-menu-item > path")).toHaveLength(3);
        expect(container.textContent).toContain("Action A");
        expect(container.textContent).toContain("Action B");
        expect(container.textContent).toContain("Action C");
    });

    it("falls back to defaults for optional fields passed as an explicit undefined", () => {
        // A caller forwarding its own optional props through (e.g. <ContextMenu radius={props.radius}>)
        // often passes an *explicit* undefined for an omitted one, rather than omitting the key
        // entirely - this must still fall back to the default, not resolve to NaN geometry
        const container = createContainer();
        renderContextMenu(container, {
            x: 0,
            y: 0,
            open: true,
            items,
            radius: undefined,
            thickness: undefined,
            padAngle: undefined,
            iconSize: undefined,
            animationDuration: undefined,
            colors: undefined,
            onSelect: jest.fn(),
            onClose: undefined,
        });

        const path = container.querySelector(".context-menu-item > path");
        expect(path.getAttribute("d")).not.toContain("NaN");

        const icon = container.querySelector(".context-menu-icon");
        expect(icon.getAttribute("transform")).not.toContain("NaN");
    });

    it("sizes each item's icon to iconSize", () => {
        const container = createContainer();
        renderContextMenu(container, { x: 0, y: 0, open: true, items, iconSize: 24, onSelect: jest.fn() });

        const icon = container.querySelector(".context-menu-icon svg");
        expect(icon.getAttribute("width")).toBe("24");
        expect(icon.getAttribute("height")).toBe("24");
    });

    it("marks disabled items in the DOM and doesn't color them as enabled", () => {
        const container = createContainer();
        renderContextMenu(container, { x: 0, y: 0, open: true, items, onSelect: jest.fn() });

        const disabledItem = Array.from(container.querySelectorAll(".context-menu-item")).find(
            (item) => item.textContent === "Action C",
        );

        expect(disabledItem.getAttribute("data-disabled")).toBe("true");
    });

    it("calls onSelect with the item when an enabled segment is clicked", () => {
        const onSelect = jest.fn();
        const container = createContainer();
        renderContextMenu(container, { x: 0, y: 0, open: true, items, onSelect });

        const paths = container.querySelectorAll(".context-menu-item > path");
        paths[0].dispatchEvent(new MouseEvent("click", { bubbles: true }));

        expect(onSelect).toHaveBeenCalledTimes(1);
        expect(onSelect).toHaveBeenCalledWith(items[0]);
    });

    it("does not call onSelect when a disabled segment is clicked", () => {
        const onSelect = jest.fn();
        const container = createContainer();
        renderContextMenu(container, { x: 0, y: 0, open: true, items, onSelect });

        const paths = container.querySelectorAll(".context-menu-item > path");
        paths[2].dispatchEvent(new MouseEvent("click", { bubbles: true }));

        expect(onSelect).not.toHaveBeenCalled();
    });

    it("calls onClose when Escape is pressed while open", () => {
        const onClose = jest.fn();
        const container = createContainer();
        renderContextMenu(container, { x: 0, y: 0, open: true, items, onSelect: jest.fn(), onClose });

        window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));

        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("calls onClose when clicking outside the menu", () => {
        const onClose = jest.fn();
        const container = createContainer();
        renderContextMenu(container, { x: 0, y: 0, open: true, items, onSelect: jest.fn(), onClose });

        document.body.dispatchEvent(new MouseEvent("pointerdown", { bubbles: true }));

        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("does not call onClose when clicking inside the menu", () => {
        const onClose = jest.fn();
        const container = createContainer();
        renderContextMenu(container, { x: 0, y: 0, open: true, items, onSelect: jest.fn(), onClose });

        container.querySelector(".context-menu-item > path").dispatchEvent(new MouseEvent("pointerdown", { bubbles: true }));

        expect(onClose).not.toHaveBeenCalled();
    });

    it("stops listening for Escape/outside-clicks once closed", () => {
        const onClose = jest.fn();
        const container = createContainer();
        const options = { x: 0, y: 0, items, onSelect: jest.fn(), onClose };

        renderContextMenu(container, { ...options, open: true });
        renderContextMenu(container, { ...options, open: false });

        window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));

        expect(onClose).not.toHaveBeenCalled();
    });

    it("updates in place (e.g. a disabled item becoming enabled) without throwing", () => {
        const container = createContainer();
        const options = { x: 0, y: 0, open: true, items, onSelect: jest.fn() };

        renderContextMenu(container, options);

        const enabledItems = items.map((item) => ({ ...item, disabled: false }));
        expect(() => renderContextMenu(container, { ...options, items: enabledItems })).not.toThrow();

        const formerlyDisabled = Array.from(container.querySelectorAll(".context-menu-item")).find(
            (item) => item.textContent === "Action C",
        );
        expect(formerlyDisabled.getAttribute("data-disabled")).toBe("false");
    });
});

describe("destroyContextMenu", () => {
    afterEach(() => {
        document.body.innerHTML = "";
    });

    it("immediately removes all rendered content", () => {
        const container = createContainer();
        renderContextMenu(container, { x: 0, y: 0, open: true, items, onSelect: jest.fn() });
        expect(container.querySelectorAll(".context-menu-item")).toHaveLength(3);

        destroyContextMenu(container);

        expect(container.querySelectorAll(".context-menu-item")).toHaveLength(0);
    });

    it("detaches the close listeners", () => {
        const onClose = jest.fn();
        const container = createContainer();
        renderContextMenu(container, { x: 0, y: 0, open: true, items, onSelect: jest.fn(), onClose });

        destroyContextMenu(container);
        window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));

        expect(onClose).not.toHaveBeenCalled();
    });
});
