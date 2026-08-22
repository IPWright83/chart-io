import type { IContextMenuItem } from "@chart-io/core";

import React from "react";
import { fireEvent, render } from "@testing-library/react";

import { ContextMenu } from "./ContextMenu";

const items: IContextMenuItem[] = [
    { id: "a", label: "Action A", icon: "<svg><circle /></svg>", onSelect: jest.fn() },
    { id: "b", label: "Action B", icon: "<svg><rect /></svg>", onSelect: jest.fn() },
    { id: "c", label: "Action C (disabled)", icon: "<svg><path /></svg>", disabled: true, onSelect: jest.fn() },
];

describe("ContextMenu", () => {
    it("renders nothing while closed", () => {
        const { container } = render(
            <svg>
                <ContextMenu x={0} y={0} open={false} items={items} onSelect={jest.fn()} />
            </svg>,
        );

        expect(container.querySelectorAll(".context-menu-item")).toHaveLength(0);
    });

    it("renders a segment with a title and a sized icon for every item", () => {
        const { container, getByText } = render(
            <svg>
                <ContextMenu x={10} y={20} open items={items} iconSize={24} onSelect={jest.fn()} />
            </svg>,
        );

        expect(container.querySelectorAll(".context-menu-item")).toHaveLength(3);
        expect(container.querySelectorAll(".context-menu-item > path")).toHaveLength(3);
        expect(container.textContent).toContain("Action A");
        expect(container.textContent).toContain("Action B");
        expect(container.textContent).toContain("Action C (disabled)");
        expect(getByText("Action A").tagName).toBe("title");

        const icon = container.querySelector(".context-menu-icon svg");
        expect(icon.getAttribute("width")).toBe("24");
        expect(icon.getAttribute("height")).toBe("24");
    });

    it("positions the menu at the given coordinates", () => {
        const { container } = render(
            <svg>
                <ContextMenu x={42} y={99} open items={items} onSelect={jest.fn()} />
            </svg>,
        );

        expect(container.querySelector(".context-menu").getAttribute("transform")).toBe("translate(42, 99)");
    });

    it("calls onSelect with the item when an enabled segment is clicked", () => {
        const onSelect = jest.fn();
        const { container } = render(
            <svg>
                <ContextMenu x={0} y={0} open items={items} onSelect={onSelect} />
            </svg>,
        );

        const paths = container.querySelectorAll(".context-menu-item > path");
        fireEvent.click(paths[0]);

        expect(onSelect).toHaveBeenCalledTimes(1);
        expect(onSelect).toHaveBeenCalledWith(items[0]);
    });

    it("does not call onSelect when a disabled segment is clicked", () => {
        const onSelect = jest.fn();
        const { container } = render(
            <svg>
                <ContextMenu x={0} y={0} open items={items} onSelect={onSelect} />
            </svg>,
        );

        const paths = container.querySelectorAll(".context-menu-item > path");
        fireEvent.click(paths[2]);

        expect(onSelect).not.toHaveBeenCalled();
    });

    it("calls onClose when Escape is pressed", () => {
        const onClose = jest.fn();
        render(
            <svg>
                <ContextMenu x={0} y={0} open items={items} onSelect={jest.fn()} onClose={onClose} />
            </svg>,
        );

        fireEvent.keyDown(window, { key: "Escape" });

        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("calls onClose when clicking outside the menu", () => {
        const onClose = jest.fn();
        render(
            <div>
                <button type="button">outside</button>
                <svg>
                    <ContextMenu x={0} y={0} open items={items} onSelect={jest.fn()} onClose={onClose} />
                </svg>
            </div>,
        );

        fireEvent.pointerDown(document.querySelector("button"));

        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("does not call onClose when clicking inside the menu", () => {
        const onClose = jest.fn();
        const { container } = render(
            <svg>
                <ContextMenu x={0} y={0} open items={items} onSelect={jest.fn()} onClose={onClose} />
            </svg>,
        );

        fireEvent.pointerDown(container.querySelector(".context-menu-item > path"));

        expect(onClose).not.toHaveBeenCalled();
    });

    it("tears down its rendered content on unmount", () => {
        const { container, unmount } = render(
            <svg>
                <ContextMenu x={0} y={0} open items={items} onSelect={jest.fn()} />
            </svg>,
        );

        expect(container.querySelectorAll(".context-menu-item")).toHaveLength(3);

        unmount();

        expect(container.querySelectorAll(".context-menu-item")).toHaveLength(0);
    });
});
