# `<YAxis />` Component API

This component extends the [`<Axis>`](Axis.md) component to control the position but also adds a calculate [`<Scale>`](Scale.md).

## Props

| Prop        | Type            | Default | Note                                                                                                                                                     |
| ----------- | --------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `position`  | `string`        |         | The position of the axis. One of `left` or `right`. This will use the appropriate [d3.axis](https://github.com/d3/d3-axis#axisTop) orientation function. |
| `fields`    | `Array<string>` |         | The set of fields that this axis represents. These should correspond to the fields being displayed on this Axis within the data.                         |
| `scaleType` | `number`        | null    | Describes the type of scale to use. One of `linear`, `time`, `power`, `log`, `band` or `point`. See [`<Scale>`](Scale.md) for more information.          |
| `aggregate` | `bool`          | false   | Set to `true` if the scale values should be aggregated together. See [`<Scale>`](Scale.md) for more information.                                         |
| `title`     | `string`        | null    | The title of the axis. This will default to the value in field(s)                                                                                        |
