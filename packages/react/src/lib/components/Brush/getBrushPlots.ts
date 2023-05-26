import { childrenToArray } from "../../utils";

/**
 * Gets the plots that support a brush
 * @param {any} children    A single React component, or several sReact child components
 * @return The plots that support a brush
 */
export function getBrushPlots(children: any) {
    return childrenToArray(children)
        .filter((c) => c) // filters out nulls that can appear in the React component tree
        .filter((c) => c.type.isPlot)
        .filter((c) => c.props.brush)
        .filter((c) => c.type.brushVertical || c.type.brushHorizontal);
}
