import type { IOnMouseOver, IOnMouseOut, IOnClick } from "@d3-chart/types";
import React from "react";

export type renderVirtualCanvasFunc = (
    update: d3.Transition<Element, unknown, any, unknown>,
    events: {
        onMouseOver: IOnMouseOver;
        onMouseOut: IOnMouseOut;
        onClick: IOnClick;
    }
) => void;

/**
 * Adds some additional props all the children
 * @param  children                    The children of the component
 * @param  renderVirtualCanvas         Function to call to update the virtual canvas
 * @return                             The new children
 */
export function getChildrenWithProps(children: any, renderVirtualCanvas: renderVirtualCanvasFunc): any {
    if (!children) {
        return children;
    }

    if (children.length > 0) {
        return children.map((child) => {
            if (React.isValidElement(child)) {
                // @ts-expect-error: We're dealing with really dynamic stuff here we can't really type against
                return React.cloneElement(child, { renderVirtualCanvas });
            }

            return child;
        });
    }

    if (React.isValidElement(children)) {
        // @ts-expect-error: We're dealing with really dynamic stuff here we can't really type against
        return React.cloneElement(children, { renderVirtualCanvas });
    }

    return children;
}
