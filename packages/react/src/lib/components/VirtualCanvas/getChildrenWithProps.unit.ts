import React from "react";

import { getChildrenWithProps } from "./getChildrenWithProps";

describe("VirtualCanvas getChildrenWithProps", () => {
    const renderVirtualCanvas = jest.fn();

    it("correctly augments props on a single child", () => {
        const mockElement = React.createElement("div");

        const child = getChildrenWithProps(mockElement, renderVirtualCanvas)[0];

        expect(child.type).toBe(mockElement.type);
        expect(child.props.renderVirtualCanvas).toBe(renderVirtualCanvas);
    });

    it("correctly augments a set of children", () => {
        const mockElement1 = React.createElement("div");
        const mockElement2 = React.createElement("p");

        const children = getChildrenWithProps([mockElement1, mockElement2], renderVirtualCanvas);

        expect(children.length).toBe(2);

        const child1 = children[0];
        expect(child1.type).toBe(mockElement1.type);
        expect(child1.props.renderVirtualCanvas).toBe(renderVirtualCanvas);

        const child2 = children[1];
        expect(child2.type).toBe(mockElement2.type);
        expect(child2.props.renderVirtualCanvas).toBe(renderVirtualCanvas);
    });

    it("correctly skips non React elements", () => {
        const notMockElement = {};

        const children = getChildrenWithProps([notMockElement], renderVirtualCanvas);

        expect(children.length).toBe(1);

        const child = children[0];
        expect(child).toBe(notMockElement);
        expect(child).toEqual({});
    });
});
