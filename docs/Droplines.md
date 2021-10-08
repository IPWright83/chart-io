# `<Droplines />` Component API

Used to represent droplines on a chart, these are useful for indicating the current mouse location.

## Structure

The droplines that are rendered are pulled from the chart's Redux store. The interface of a dropline is as follows:
| Field | Type | Note|
| ------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `x1` | `number` | This is the start x-coordinate of the dropline |
| `y1` | `number` | This is the start y-coordinate of the dropline |
| `x2` | `number` | This is the end x-coordinate of the dropline |
| `y2` | `number` | This is the end y-coordinate of the dropline |
| `color` | `string` | This is the color to use for the dropline |
| `isHorizontal` | `boolean` | Whether the dropline is horizontal |
| `isVertical` | `boolean` | Whether the dropline is vertical |

## Props

| Prop             | Type          | Default | Note                                                                                                                                       |
| ---------------- | ------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `layer`          | `HTMLElement` |         | This is an internal field and should not need setting manually. It is populated by the `withSVG` and `withCanvas` higher order components. |
| `showVertical`   | `boolean`     | true    | Whether vertical droplines should be shown.                                                                                                |
| `showHorizontal` | `boolean`     | true    | Whether horizontal droplines should be shown.                                                                                              |
