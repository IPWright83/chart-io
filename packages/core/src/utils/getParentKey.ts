/**
 * Returns the key of the parent element (used for Stacked series)
 * @param  element    The element
 * @return            The key used by the parent
 */
export function getParentKey(element: Element): string {
    // @ts-ignore: TODO: How do we protect against this D3 internal stuff?
    return element?.parentNode?.__data__?.key;
}
