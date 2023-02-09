import type { ReactChildren } from "react";

/**
 * Determine if a Virtual Canvas is required or not
 * @param  children  The child or children of the virtual canvas
 * @return           True if a virtual canvas is required, otherwise false
 */
export const isVirtualCanvasRequired = (children: any): boolean => {
    if (!children) {
        return false;
    }

    // Array of children
    if (children.length) {
        return children.filter((c) => c?.type?.requiresVirtualCanvas).length > 0;
    }

    // Single child
    return children.requiresVirtualCanvas || children.type?.requiresVirtualCanvas;
};
