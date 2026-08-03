/**
 * A function that maps a field key (e.g. "avg_score") to a display label (e.g. "Mean Score"),
 * used anywhere a raw field name would otherwise be shown to a user - tooltip names, axis/spoke
 * labels, legend entries. Since it's a plain function rather than a static dictionary, it can
 * later be backed by something more advanced (translations, locale-aware formatting) without
 * changing how components consume it
 */
export type ILabeller = (field: string) => string;

/**
 * Creates a labeller function from a simple field -> label dictionary, falling back to the field
 * key itself for any field not present in the map
 * @param  labels    A map of field key to display label
 * @return           A labeller function
 */
export function createLabeller(labels: Record<string, string> = {}): ILabeller {
    return (field: string) => labels[field] ?? field;
}
