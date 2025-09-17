import { d3 } from "@chart-io/core";
import type { IOnClick, IOnMouseOut, IOnMouseOver } from "@chart-io/core";

import { extendChildrenProps } from "../../utils";

export type IRenderVirtualCanvasFunc = (
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
export function getChildrenWithProps(children: any, renderVirtualCanvas: IRenderVirtualCanvasFunc): any {
    return extendChildrenProps(children, { renderVirtualCanvas });
}
