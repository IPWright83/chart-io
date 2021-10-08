# XY Plots Components API

This API is common across all the multi series plots. Essentially all these are the plural versions for adding multiple plots with a single component.

-   [`<Columns>`](Columns.md)
-   [`<Lines>`](Lines.md)
-   [`<Areas>`](Areas.md)
-   [`<Scatters>`](Scatters.md)

## Plot Props

These props are avaliable for all plots.

| Prop    | Type          | Default            | Note                                                                                                                                       |
| ------- | ------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `layer` | `HTMLElement` |                    | This is an internal field and should not need setting manually. It is populated by the `withSVG` and `withCanvas` higher order components. |
| `color` | `string`      | Derived from Theme | The colour of the data                                                                                                                     |

## Event Props

These props are avaliable for plots that feature elements per data point (for example bars/points) but not for plots where there is a shared element (line/areas).

| Prop           | Type       | Default    | Note                                                                             |
| -------------- | ---------- | ---------- | -------------------------------------------------------------------------------- |
| `onMouseOver`  | `Function` | `() => {}` | Event handler to call when the mouse enter a DataPoint. See [Events](Events.md)  |
| `onMouseOut`   | `Function` | `() => {}` | Event handler to call when the mouse exits a DataPoint. See [Events](Events.md)  |
| `onMouseClick` | `Function` | `() => {}` | Event handler to call when the mouse clicks a DataPoint. See [Events](Events.md) |
