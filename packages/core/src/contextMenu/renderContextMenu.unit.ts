import type { IContextMenuItem } from "../types";

import { createPieLayout, destroyContextMenu, renderContextMenu } from "./renderContextMenu";

function createContainer(): HTMLElement {
    const div = document.createElement("div");
    document.body.appendChild(div);
    return div;
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

    it("doesn't intercept clicks while closed, since it's portaled outside any clipping container", () => {
        const container = createContainer();
        renderContextMenu(container, { x: 0, y: 0, open: false, items, onSelect: jest.fn() });
        expect(container.style.pointerEvents).toBe("none");

        renderContextMenu(container, { x: 0, y: 0, open: true, items, onSelect: jest.fn() });
        expect(container.style.pointerEvents).toBe("auto");
    });

    it("renders one segment per item, positioning the container (centered) at (x, y)", () => {
        const container = createContainer();
        renderContextMenu(container, { x: 42, y: 99, open: true, items, onSelect: jest.fn() });

        expect(container.style.position).toBe("fixed");
        expect(container.style.left).toBe("42px");
        expect(container.style.top).toBe("99px");
        expect(container.style.transform).toBe("translate(-50%, -50%)");
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

    it("reveals an item's outer active-segments band on hover, and hides it again on mouseleave", () => {
        const itemsWithActive: IContextMenuItem[] = [
            {
                id: "a",
                label: "Action A",
                icon: "<svg><circle /></svg>",
                activeSegments: ["<svg><rect class='mini-a' /></svg>", "<svg><rect class='mini-b' /></svg>"],
                onSelect: jest.fn(),
            },
        ];
        const container = createContainer();
        renderContextMenu(container, { x: 0, y: 0, open: true, items: itemsWithActive, onSelect: jest.fn() });

        const path = container.querySelector(".context-menu-item > path");
        const activeSegments = container.querySelector(".context-menu-active-segments") as HTMLElement;

        expect(activeSegments.style.opacity).toBe("0");
        expect(activeSegments.querySelectorAll(".active-segment").length).toBe(2);
        expect(activeSegments.querySelector(".mini-a")).not.toBeNull();
        expect(activeSegments.querySelector(".mini-b")).not.toBeNull();

        path.dispatchEvent(new MouseEvent("mouseenter"));
        expect(activeSegments.style.opacity).toBe("1");

        path.dispatchEvent(new MouseEvent("mouseleave"));
        expect(activeSegments.style.opacity).toBe("0");
    });

    it("renders as many mini segments as activeSegments has icons", () => {
        const itemsWithActive: IContextMenuItem[] = [
            {
                id: "a",
                label: "Action A",
                icon: "<svg><circle /></svg>",
                activeSegments: ["<svg><rect /></svg>", "<svg><rect /></svg>", "<svg><rect /></svg>"],
                onSelect: jest.fn(),
            },
        ];
        const container = createContainer();
        renderContextMenu(container, { x: 0, y: 0, open: true, items: itemsWithActive, onSelect: jest.fn() });

        const activeSegments = container.querySelector(".context-menu-active-segments") as HTMLElement;
        expect(activeSegments.querySelectorAll(".active-segment").length).toBe(3);
    });

    it("renders no active-segments band for an item without activeSegments", () => {
        const container = createContainer();
        renderContextMenu(container, { x: 0, y: 0, open: true, items, onSelect: jest.fn() });

        const path = container.querySelector(".context-menu-item > path");
        const activeSegments = container.querySelector(".context-menu-active-segments") as HTMLElement;

        path.dispatchEvent(new MouseEvent("mouseenter"));

        expect(activeSegments.style.opacity).toBe("0");
        expect(activeSegments.querySelectorAll(".active-segment").length).toBe(0);
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

describe("renderContextMenu closing", () => {
    afterEach(() => {
        document.body.innerHTML = "";
    });

    // Regression test: a caller often clears its own idea of the menu's position at the same time
    // it flips `open` to false (e.g. <ContextMenuOverlay> reads x/y from Redux state that's deleted
    // as part of closing) - the menu previously jumped to that stale (0, 0) before shrinking away
    it("shrinks away from its last open position, ignoring a stale/reset x and y", () => {
        const container = createContainer();

        renderContextMenu(container, { x: 120, y: 340, open: true, items, onSelect: jest.fn() });
        expect(container.style.left).toBe("120px");
        expect(container.style.top).toBe("340px");

        renderContextMenu(container, { x: 0, y: 0, open: false, items, onSelect: jest.fn() });

        expect(container.style.left).toBe("120px");
        expect(container.style.top).toBe("340px");
    });

    it("doesn't reposition a menu that was never open", () => {
        const container = createContainer();

        renderContextMenu(container, { x: 0, y: 0, open: false, items, onSelect: jest.fn() });

        expect(container.style.left).toBe("");
        expect(container.style.top).toBe("");
    });
});

describe("createPieLayout", () => {
    it("sweeps the full circle when gapAngle is 0", () => {
        const pie = createPieLayout(0, 0);
        const arcs = pie(items);

        const totalSweep = arcs[arcs.length - 1].endAngle - arcs[0].startAngle;
        expect(totalSweep).toBeCloseTo(2 * Math.PI);
    });

    it("leaves a gap centered at the bottom (6 o'clock / angle PI)", () => {
        const gapAngle = Math.PI / 4;
        const pie = createPieLayout(0, gapAngle);
        const arcs = pie(items);

        const expectedStart = Math.PI + gapAngle / 2;
        const expectedEnd = expectedStart + (2 * Math.PI - gapAngle);

        expect(arcs[0].startAngle).toBeCloseTo(expectedStart);
        expect(arcs[arcs.length - 1].endAngle).toBeCloseTo(expectedEnd);

        // The gap itself - nothing covers the angular range either side of the bottom (PI)
        expect(expectedStart).toBeGreaterThan(Math.PI);
        expect(expectedEnd - 2 * Math.PI).toBeLessThan(Math.PI);
    });
});
