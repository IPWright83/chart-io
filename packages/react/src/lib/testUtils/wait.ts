/**
 * Waits for a period of milli-seconds (wraps setTimeout in a Promise)
 * @param  duration    The number of milliseconds to wait
 * @return             A promise that resolves after the set time
 */
export function wait(duration = 200) {
    return new Promise((resolve) => setTimeout(resolve, duration));
}
