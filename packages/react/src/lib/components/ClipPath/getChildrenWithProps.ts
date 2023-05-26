import React from "react";

import { childrenToArray } from "../../utils";

/**
 * Set of props on the children, once extended
 */
interface IExtendedProps {
    clipPath: string;
}

/**
 * Adds some additional props to all the children
 * @param  children                        The children of the component
 * @param  clipPath                        The clippath to use
 * @return                                 The new children
 */
export function getChildrenWithProps(children: any, clipPath: string) {
    // Children can contain arrays within there, so we want to flatten
    // out the structure so that cloning works correctly
    return childrenToArray(children)
        .flat()
        .map((child, index) => {
            const extendedProps: IExtendedProps = {
                clipPath,
            };

            if (React.isValidElement(child)) {
                return React.cloneElement(child, { ...extendedProps, key: index });
            }

            return child;
        });
}
