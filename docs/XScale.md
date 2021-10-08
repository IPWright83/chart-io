# `<XScale />` Component API

Used to represent a horizontal [`<Scale>`](Scale.md)

## Props

| Prop        | Type            | Default | Note                                                                                                                                                                                 |
| ----------- | --------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `fields`    | `Array<string>` |         | The set of fields that this scale represents. These should correspond to the fields being displayed on this scale within the data.                                                   |
| `scaleType` | `number`        | 6       | The type of scale that should be used. One of `linear`, `time`, `power`, `log`, `band` or `point`. This will determine the type of [d3 scale](https://github.com/d3/d3-scale) to use |
| `aggregate` | `boolean`       | false   | Set to `true` if the scale values should be aggregated together. See [`<Scale>`](Scale.md) for more information.                                                                     |
