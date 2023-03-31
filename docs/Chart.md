# `<Chart />` Component API

Used to represent a Chart. The chart itself contains all the common & high level configuration that is typically passed into a Redux store. The actual layers or plots that are rendered within a chart should be passed as children to a chart.

```
<Chart>
    <XAxis fields="x" />
    <YAxis fields={["y1", "y2"]} />
    <Scatter x="x" y="y1" radius={10} />
</Chart>
```

## Props

Also includes all props from [XY Plots Components API](XYPlots.md)

| Prop                | Type            | Default   | Note                                                                                      |
| ------------------- | --------------- | --------- | ----------------------------------------------------------------------------------------- |
| `width`             | `number`        | 500       | The width of the chart                                                                    |
| `height`            | `number`        | 500       | The height of the chart                                                                   |
| `animationDuration` | `number`        | 250       | The number of mili-seconds that animations should run for                                 |
| `margin`            |                 |           | Margins are set using d3-margin convention https://observablehq.com/@d3/margin-convention |
| `margin.top`        | `number`        | 30        | The top margin                                                                            |
| `margin.right`      | `number`        | 30        | The right hand margin                                                                     |
| `margin.bottom`     | `number`        | 30        | The bottom margin                                                                         |
| `margin.left`       | `number`        | 30        | The left hand margin                                                                      |
| `data`              | `Array<object>` | []        | The data that the chart uses                                                              |
| `useCanvas`         | `bool`          | false     | Whether the chart should render the data using Canvas instead of SVG.                     |
| `onMouseOver`       | `Function`      | undefined | A function to trigger when the mouse enters a data point.                                 |
| `onMouseOut`        | `Function`      | undefined | A function to trigger when the mouse exits a data point.                                  |
| `onClick`           | `Function`      | undefined | A function to trigger when the mouse clicks a data point.                                 |
