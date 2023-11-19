/**
 * Returns the items which are nearest
 * @param items         The items to check
 * @param getDistance   A function to calculate the distance
 * @returns The closest items
 */
export function findNearest<T>(items: T[], getDistance: (item: T) => number): T[] {
    if (!items || items.length === 0) {
        return [];
    }

    // Find the smallest value
    let closestDistance = Number.MAX_VALUE;

    for (let i = 0; i < items.length; i++) {
        const value = getDistance(items[i]);
        if (value !== undefined && value < closestDistance) {
            closestDistance = value;
        }
    }

    // Take into account that some items may not have a distance, so we should
    // probably show them anyway. This happens on mixed plots showing markers etc.
    return items.filter((item) => {
        const distance = getDistance(item);
        return distance === undefined || distance === closestDistance;
    });
}
