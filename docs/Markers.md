# `<Markers />` Component API

Used to represent markers on a chart, these are useful for indicating the current mouse location.

## Structure

The markers that are rendered are pulled from the chart's Redux store. The interface of a marker is as follows:
| Field | Type | Note|
| ------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `cx` | `number` | This is the x-coordinate of the marker |
| `cy` | `number` | This is the y-coordinate of the marker |
| `fill` | `string` | This is the color of the marker |
| `r1` | `number` | This is the start radius of the marker. The marker will animate in size to the r2 value. |
| `r2` | `number` | This is the end radius of the marker |

## Props

| Prop    | Type          | Default | Note                                                                                                                                       |
| ------- | ------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `layer` | `HTMLElement` |         | This is an internal field and should not need setting manually. It is populated by the `withSVG` and `withCanvas` higher order components. |
