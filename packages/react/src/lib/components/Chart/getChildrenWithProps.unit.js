import React from "react";

import { getChildrenWithProps } from "./getChildrenWithProps";

describe("getChildrenWithProps", () => {
    const onMouseOver = jest.fn();
    const onMouseOut = jest.fn();
    const onClick = jest.fn();

    it("correctly augments props on a single child", () => {
        const mockElement = React.createElement("div");

        const children = getChildrenWithProps({
            children: mockElement,
            useCanvas: true,
            animationDuration: 500,
            onMouseOver,
            onMouseOut,
            onClick,
        });

        expect(children.length).toBe(1);

        const child = children[0];

        expect(child.type).toBe(mockElement.type);
        expect(child.props.useCanvas).toBe(true);
        expect(child.props.animationDuration).toBe(500);
        expect(child.props.onMouseOver).toBe(onMouseOver);
        expect(child.props.onMouseOut).toBe(onMouseOut);
        expect(child.props.onClick).toBe(onClick);
    });

    it("correctly augments a set of children", () => {
        const mockElement1 = React.createElement("div");
        const mockElement2 = React.createElement("p");

        const children = getChildrenWithProps({
            children: [mockElement1, mockElement2],
            useCanvas: true,
            animationDuration: 500,
            onMouseOver,
            onMouseOut,
            onClick,
        });

        expect(children.length).toBe(2);

        const child1 = children[0];
        expect(child1.type).toBe(mockElement1.type);
        expect(child1.props.useCanvas).toBe(true);
        expect(child1.props.animationDuration).toBe(500);
        expect(child1.props.onMouseOver).toBe(onMouseOver);
        expect(child1.props.onMouseOut).toBe(onMouseOut);
        expect(child1.props.onClick).toBe(onClick);

        const child2 = children[1];
        expect(child2.type).toBe(mockElement2.type);
        expect(child2.props.useCanvas).toBe(true);
        expect(child2.props.animationDuration).toBe(500);
        expect(child2.props.onMouseOver).toBe(onMouseOver);
        expect(child2.props.onMouseOut).toBe(onMouseOut);
        expect(child2.props.onClick).toBe(onClick);
    });

    it("correctly skips non React elements", () => {
        const notMockElement = {};

        const children = getChildrenWithProps({
            children: [notMockElement],
            useCanvas: true,
            animationDuration: 500,
            onMouseOver,
            onMouseOut,
            onClick,
        });

        expect(children.length).toBe(1);

        const child = children[0];
        expect(child).toBe(notMockElement);
        expect(child).toEqual({});
    });
});
