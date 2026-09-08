/**
 * Which axis is currently collapsed into a single cumulative linear scale, `undefined` meaning
 * neither (the full grid). Generic to the chart-level `pivot`/`pivotable` state, not specific to
 * `<Heatmap>` - which axis a given chart treats as "collapsed" is up to that chart:
 * - `"x"` - the x-axis collapses into a single cumulative value (in `<Heatmap>`, each row becomes a
 *   horizontal stacked bar, its columns summed along the x-axis)
 * - `"y"` - the y-axis collapses instead (in `<Heatmap>`, each column becomes a vertical stacked bar,
 *   its rows summed along the y-axis)
 */
export type IPivot = "x" | "y";
