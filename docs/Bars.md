# `<Bars />` Component API

Used to represent a horizontal bar plot

## Props

Also includes all props from [XY Plots Components API](XYPlots.md)

| Prop      | Type            | Default | Note                                                                             |
| --------- | --------------- | ------- | -------------------------------------------------------------------------------- |
| `xs`      | `Array<string>` | null    | The set of keys that represent the fields containing the values along the y-axis |
| `y`       | `string`        | null    | The key of the field that contains the value along the x-axis                    |
| `stacked` | `bool`          | false   | Whether the series should render as a stacked bars.                              |
| `grouped` | `bool`          | false   | Whether the series should render as side by side bars.                           |
