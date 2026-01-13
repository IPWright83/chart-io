# `<Columns />` Component API

Used to represent a vertical Column plot

## Props

Also includes all props from [XY Plots Components API](XYPlots.md)

| Prop      | Type            | Default | Note                                                                             |
| --------- | --------------- | ------- | -------------------------------------------------------------------------------- |
| `ys`      | `Array<string>` | null    | The set of keys that represent the fields containing the values along the y-axis |
| `stacked` | `bool`          | false   | Whether the series should render as a stacked columns.                           |
| `grouped` | `bool`          | false   | Whether the series should render as side by side columns.                        |
