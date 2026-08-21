/**
 * The layout a `<Heatmap>` is currently rendered in:
 * - `"grid"` - the full 2D grid, one cell per row/column combination
 * - `"rows"` - rows keep their band scale/order, columns collapse into a single cumulative value per
 *   row - each row becomes a horizontal stacked bar
 * - `"columns"` - columns keep their band scale/order, rows collapse into a single cumulative value
 *   per column - each column becomes a vertical stacked bar
 */
export type IPivot = "grid" | "rows" | "columns";
