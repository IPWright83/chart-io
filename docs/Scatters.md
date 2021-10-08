# `<Scatters />` Component API

Used to represent multiple Scatter plots

## Props

Also includes all props from [XY Plots Components API](XYPlots.md)

| Prop     | Type            | Default | Note                                                                             |
| -------- | --------------- | ------- | -------------------------------------------------------------------------------- |
| `x`      | `string`        | null    | The key of the field that contains the value along the x-axis                    |
| `ys`     | `Array<string>` | null    | The set of keys that represent the fields containing the values along the y-axis |
| `radius` | `number`        | 5       | The radius to use for each data point on the Scatter chart.                      |
