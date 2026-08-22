import React from "react";
import { fireEvent, render } from "@testing-library/react";

import { ContextMenu } from "./ContextMenu";
import type { IContextMenuItem } from "./types";

const items: IContextMenuItem[] = [
    { id: "a", label: "Action A", icon: <svg data-testid="icon-a" />, onSelect: jest.fn() },
    { id: "b", label: "Action B", icon: <svg data-testid="icon-b" />, onSelect: jest.fn() },
    { id: "c", label: "Action C (disabled)", icon: <svg data-testid="icon-c" />, disabled: true, onSelect: jest.fn() },
];

describe("ContextMenu", () => {
    it("renders nothing while closed", () => {
        const { container } = render(
            <svg>
                <ContextMenu x={0} y={0} open={false} items={items} onSelect={jest.fn()} />
            </svg>,
        );

        expect(container.querySelector(".context-menu")).toBeNull();
    });

    it("renders a segment with a title and a sized icon for every item", () => {
        const { container, getByTestId } = render(
            <svg>
                <ContextMenu x={10} y={20} open items={items} iconSize={24} onSelect={jest.fn()} />
            </svg>,
        );

        expect(container.querySelectorAll(".context-menu-item")).toHaveLength(3);
        expect(container.querySelectorAll("path")).toHaveLength(3);
        expect(container.textContent).toContain("Action A");
        expect(container.textContent).toContain("Action B");
        expect(container.textContent).toContain("Action C (disabled)");

        const icon = getByTestId("icon-a");
        expect(icon).toHaveAttribute("width", "24");
        expect(icon).toHaveAttribute("height", "24");
    });

    it("positions the menu at the given coordinates", () => {
        const { container } = render(
            <svg>
                <ContextMenu x={42} y={99} open items={items} onSelect={jest.fn()} />
            </svg>,
        );

        expect(container.querySelector(".context-menu")).toHaveAttribute("transform", "translate(42, 99)");
    });

    it("calls onSelect with the item when an enabled segment is clicked", () => {
        const onSelect = jest.fn();
        const { container } = render(
            <svg>
                <ContextMenu x={0} y={0} open items={items} onSelect={onSelect} />
            </svg>,
        );

        const paths = container.querySelectorAll("path");
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

        const paths = container.querySelectorAll("path");
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

        fireEvent.pointerDown(container.querySelector("path"));

        expect(onClose).not.toHaveBeenCalled();
    });
});
