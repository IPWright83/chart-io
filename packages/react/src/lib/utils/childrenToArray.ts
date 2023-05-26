/**
 * Ensures the React children are an array
 * @param {any} children    A single React component, or several sReact child components
 * @returns                 The children as an array
 */
export function childrenToArray(children: any) {
    // Looks like a single child which is an object
    if (children && children.props && children.type) {
        return [children];
    }

    return children ?? [];
}
