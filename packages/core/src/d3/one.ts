import type { Selection } from "d3-selection";

/**
 * Selects (or creates) at most a single child element of the given name/class under `selection`,
 * joining it against a single-item (or empty) datum so it behaves like any other D3 join - see
 * https://github.com/d3/d3-selection/pull/300. Useful for a one-off element (e.g. a hit target) that
 * needs the same enter/update/exit handling as a data-bound selection, without the boilerplate of
 * `selectAll(...).data(...).join(...)` for a single, optionally-present item
 * @param  selection    The parent selection to select/create the element under
 * @param  name         The tag name of the element, e.g. "circle"
 * @param  className    An optional class name, to disambiguate from sibling elements of the same tag
 * @param  present      Should the element exist at all? Defaults to true - pass false to remove it
 * @return               The (possibly newly-created) single-element selection
 */
export function one<GElement extends Element, PElement extends Element, PDatum>(
    selection: Selection<PElement, PDatum, any, any>,
    name: string,
    className?: string,
    present = true,
): Selection<GElement, null, PElement, PDatum> {
    const selector = className ? `${name}.${className}` : name;

    const joined = selection
        .selectAll<GElement, null>(selector)
        .data(present ? [null] : [])
        .join(name);

    return (className ? joined.attr("class", className) : joined) as Selection<GElement, null, PElement, PDatum>;
}
