import type { IContextMenuItem } from "@chart-io/core";

import React from "react";
import { fireEvent, render } from "@testing-library/react";

import { ContextMenu } from "./ContextMenu";

const items: IContextMenuItem[] = [
    { id: "a", label: "Action A", icon: "<svg><circle /></svg>", onSelect: jest.fn() },
    { id: "b", label: "Action B", icon: "<svg><rect /></svg>", onSelect: jest.fn() },
    { id: "c", label: "Action C (disabled)", icon: "<svg><path /></svg>", disabled: true, onSelect: jest.fn() },
];

// <ContextMenu> is portaled straight into document.body (so it isn't clipped by a chart's own
// bounds), so its rendered content lives outside RTL's own `container` - query document.body instead

describe("ContextMenu", () => {
    it("renders nothing while closed", () => {
        render(<ContextMenu x={0} y={0} open={false} items={items} onSelect={jest.fn()} />);

        expect(document.body.querySelectorAll(".context-menu-item")).toHaveLength(0);
    });

    it("renders a segment with a title and a sized icon for every item", () => {
        const { getByText } = render(<ContextMenu x={10} y={20} open items={items} iconSize={24} onSelect={jest.fn()} />);

        expect(document.body.querySelectorAll(".context-menu-item")).toHaveLength(3);
        expect(document.body.querySelectorAll(".context-menu-item > path")).toHaveLength(3);
        expect(document.body.textContent).toContain("Action A");
        expect(document.body.textContent).toContain("Action B");
        expect(document.body.textContent).toContain("Action C (disabled)");
        expect(getByText("Action A").tagName).toBe("title");

        const icon = document.body.querySelector(".context-menu-icon svg");
        expect(icon.getAttribute("width")).toBe("24");
        expect(icon.getAttribute("height")).toBe("24");
    });

    it("positions the menu (centered) at the given coordinates via a fixed-position portal", () => {
        render(<ContextMenu x={42} y={99} open items={items} onSelect={jest.fn()} />);

        const portal = document.body.querySelector(".context-menu-portal") as HTMLElement;
        expect(portal.style.position).toBe("fixed");
        expect(portal.style.left).toBe("42px");
        expect(portal.style.top).toBe("99px");
        expect(portal.style.transform).toBe("translate(-50%, -50%)");
    });

    it("calls onSelect with the item when an enabled segment is clicked", () => {
        const onSelect = jest.fn();
        render(<ContextMenu x={0} y={0} open items={items} onSelect={onSelect} />);

        const paths = document.body.querySelectorAll(".context-menu-item > path");
        fireEvent.click(paths[0]);

        expect(onSelect).toHaveBeenCalledTimes(1);
        expect(onSelect).toHaveBeenCalledWith(items[0]);
    });

    it("does not call onSelect when a disabled segment is clicked", () => {
        const onSelect = jest.fn();
        render(<ContextMenu x={0} y={0} open items={items} onSelect={onSelect} />);

        const paths = document.body.querySelectorAll(".context-menu-item > path");
        fireEvent.click(paths[2]);

        expect(onSelect).not.toHaveBeenCalled();
    });

    it("calls onClose when Escape is pressed", () => {
        const onClose = jest.fn();
        render(<ContextMenu x={0} y={0} open items={items} onSelect={jest.fn()} onClose={onClose} />);

        fireEvent.keyDown(window, { key: "Escape" });

        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("calls onClose when clicking outside the menu", () => {
        const onClose = jest.fn();
        render(
            <div>
                <button type="button">outside</button>
                <ContextMenu x={0} y={0} open items={items} onSelect={jest.fn()} onClose={onClose} />
            </div>,
        );

        fireEvent.pointerDown(document.body.querySelector("button"));

        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("does not call onClose when clicking inside the menu", () => {
        const onClose = jest.fn();
        render(<ContextMenu x={0} y={0} open items={items} onSelect={jest.fn()} onClose={onClose} />);

        fireEvent.pointerDown(document.body.querySelector(".context-menu-item > path"));

        expect(onClose).not.toHaveBeenCalled();
    });

    it("tears down its rendered content on unmount", () => {
        const { unmount } = render(<ContextMenu x={0} y={0} open items={items} onSelect={jest.fn()} />);

        expect(document.body.querySelectorAll(".context-menu-item")).toHaveLength(3);

        unmount();

        expect(document.body.querySelectorAll(".context-menu-item")).toHaveLength(0);
    });
});
