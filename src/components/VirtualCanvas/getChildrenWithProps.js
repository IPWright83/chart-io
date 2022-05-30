import React from "react";

/**
 * Adds some additional props all the children
 * @param  {Array} options.children                     The children of the component
 * @param  {Function} options.renderVirtualCanvas       Function to call to update the virtual canvas
 * @return {Array}                                      The new children
 */
export const getChildrenWithProps = ({ children, renderVirtualCanvas }) => {
    if (children.length > 0) {
        return children.map((child) => {
            if (React.isValidElement(child)) {
                return React.cloneElement(child, { renderVirtualCanvas });
            }

            return child;
        });
    }

    if (React.isValidElement(children)) {
        return React.cloneElement(children, { renderVirtualCanvas });
    }

    return children;
};
