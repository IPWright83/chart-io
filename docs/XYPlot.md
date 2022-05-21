# XY Plot Components API

This API is common across all the plots that have an XY component such as:

-   [`<Bar>`](Bar.md)
-   [`<Column>`](Column.md)
-   [`<Line>`](Line.md)
-   [`<Area>`](Area.md)
-   [`<Scatter>`](Scatter.md)

## Plot Props

These props are avaliable for all plots.

| Prop      | Type          | Default            | Note                                                                                                                                       |
| --------- | ------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `layer`   | `HTMLElement` |                    | This is an internal field and should not need setting manually. It is populated by the `withSVG` and `withCanvas` higher order components. |
| `x`       | `string`      | null               | The key of the field that contains the value along the x-axis                                                                              |
| `y`       | `string`      | null               | The key of the field that contains the value along the y-axis                                                                              |
| `color`   | `string`      | Derived from Theme | The colour of the data                                                                                                                     |
| `opacity` | `number`      | 1 (0.8 AreaPlot)   | The opacity to use for the data points                                                                                                     |

## Event Props

These props are avaliable for plots that feature elements per data point (for example bars/points) but not for plots where there is a shared element (line/areas).

| Prop           | Type       | Default    | Note                                                                             |
| -------------- | ---------- | ---------- | -------------------------------------------------------------------------------- |
| `onMouseOver`  | `Function` | `() => {}` | Event handler to call when the mouse enter a DataPoint. See [Events](Events.md)  |
| `onMouseOut`   | `Function` | `() => {}` | Event handler to call when the mouse exits a DataPoint. See [Events](Events.md)  |
| `onMouseClick` | `Function` | `() => {}` | Event handler to call when the mouse clicks a DataPoint. See [Events](Events.md) |
