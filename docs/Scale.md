# `<Scale />` Component API

Used to define a scale to render data values to screen. Each [`<Axis>`](Axis.md) needs at least one scale which are automatically generated for `<XAxis>` and `<YAxis>` components.

## Props

| Prop        | Type            | Default | Note                                                                                                                                                                                 |
| ----------- | --------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `fields`    | `Array<string>` |         | The set of fields that this scale represents. These should correspond to the fields being displayed on this scale within the data.                                                   |
| `range`     | `Array<number>` | 6       | Sets the physical dimension in pixels that this scale occupies.                                                                                                                      |
| `scaleType` | `number`        | 6       | The type of scale that should be used. One of `linear`, `time`, `power`, `log`, `band` or `point`. This will determine the type of [d3 scale](https://github.com/d3/d3-scale) to use |
| `aggregate` | `boolean`       | false   | Set to `true` if the scale values should be aggregated together. See [`<Scale>`](Scale.md) for more information.                                                                     |
