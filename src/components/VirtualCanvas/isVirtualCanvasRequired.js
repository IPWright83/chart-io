/**
 * Determine if a Virtual Canvas is required or not
 * @param  {Object|Array} children  The child or children of the virtual canvas
 * @return {Boolean}                True if a virtual canvas is required, otherwise false
 */
export const isVirtualCanvasRequired = (children) => {
    // Array of children
    if (children.length) {
        return children.filter((c) => c.requiresVirtualCanvas).length > 0;
    }

    // Single child
    return children.needsVirtualCanvas;
};
