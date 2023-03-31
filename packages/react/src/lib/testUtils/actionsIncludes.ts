/**
 * Assert that all the expected dispatch calls to the Redux store were seen
 * @param {string[]} dispatchCalls The actual calls
 * @param {string[]} expectedCalls The expected calls
 */
export function actionsIncludes(dispatchCalls: string[], expectedCalls: string[]) {
    expectedCalls.forEach((expected) => {
        expect(dispatchCalls).toContain(expected);
        dispatchCalls.splice(dispatchCalls.indexOf(expected), 1);
    });
}
