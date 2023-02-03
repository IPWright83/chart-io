/**
 * Determine if droplines should be shown based on the plots used
 * @param  children     The array of React elements
 * @return              True if droplines should be enabled
 */
export function shouldShowDroplines(children: any): boolean {
    if (!children) {
        return true;
    }

    // Just a single child
    if (children.props && children.type) {
        return true;
    }

    const names = children
        .flat()
        .filter((c) => !!c) // Remove undefined children (e.g. condition ?? <component>)
        .map((child) => child.type.name);

    // Disable vertical drop lines when we have multiple Line or Area
    if (names.includes("Areas") || names.includes("Lines")) {
        return false;
    }

    // Check for manually added multiple Line or Area plots
    return names.filter((n) => n === "Area" || n === "Line").length <= 1;
}
