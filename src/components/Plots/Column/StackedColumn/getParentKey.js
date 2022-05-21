/**
 * Returns the key of the parent element (used for Stacked series)
 * @param  {HTMLElement} element    The element
 * @param  {Number} i               The index of the element
 * @return {String}                 The key used by the parent
 */
export const getParentKey = (element) => {
    return element?.parentNode?.__data__?.key;
}
