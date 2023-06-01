import React from "react";

import { childrenToArray } from "./childrenToArray";

/**
 * Adds some additional props to all the children
 * @param  children                        The children of the component
 * @param  extendedProps                   The additional properties to add
 * @return                                 The new children
 */
export function extendChildrenProps(children: any, extendedProps: any) {
    // Children can contain arrays within there, so we want to flatten
    // out the structure so that cloning works correctly
    return childrenToArray(children)
        .flat()
        .map((child, index) => {
            if (React.isValidElement(child)) {
                return React.cloneElement(child, { ...extendedProps, key: index });
            }

            return child;
        });
}
