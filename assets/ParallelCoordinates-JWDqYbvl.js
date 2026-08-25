import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{useMDXComponents as i}from"./index-D-2zTmTn.js";import{M as o,C as s}from"./index-3it-_4RI.js";import{Basic as d,Canvas as l,CanvasBrushFiltering as a,LargeDataset as c,WithoutBrushing as h,ContextMenu as x,ColoredByCategory as j}from"./ParallelCoordinates.stories-bL3VLr87.js";import"./index-DpTt3J-R.js";import"./iframe-BCCGJMhD.js";import"./index-D5nvoAmD.js";import"./index-B77L4dcM.js";import"./index-DrFu-skq.js";import"./index.es-DoiyW41S.js";import"./index-CFMwmiIJ.js";import"./argTypes-DuN6ki1s.js";import"./renderChart-DJ6bXfoi.js";import"./react-redux-lkBMRsz6.js";import"./test-utils-C-DEfvFY.js";import"./client-CbGTh6y2.js";import"./index-CV3FwEcA.js";import"./index-Gn9jQ5lq.js";import"./lodash-DOJiQ2Wu.js";import"./index-DzcEfe_2.js";import"./index-CaWU7ljP.js";import"./ContextMenu-Dkh4zLYP.js";import"./index-CFwzIhDn.js";import"./Legend-DQjp6Mmo.js";import"./index-Bp2RIjag.js";import"./index-BmYvQTbQ.js";import"./Circle-Qf3Tu8hN.js";import"./Line-BjKan0E4.js";import"./Square-CZVurtTs.js";import"./index-DVli7D7_.js";import"./Tooltip-aFreqMLS.js";import"./index-iwe53Xj-.js";import"./TooltipItem-D41oQ2An.js";import"./index-DC1bvwxr.js";import"./calculateScale-CBIGWBP9.js";import"./index-5Gl1ki1p.js";import"./interpolatePoints-DwMMV_8i.js";import"./renderCanvas-DSAxZURY.js";import"./useTooltip-B4jsLD3t.js";function t(r){const n={blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...i(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{title:"Charts/Multivariate/ParallelCoordinates"}),`
`,e.jsx(n.h1,{id:"parallelcoordinates-plots",children:"ParallelCoordinates Plots"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"<ParallelCoordinates>"})," component shows one line per row of ",e.jsx(n.code,{children:"data"}),`, connecting a point for each
field in `,e.jsx(n.code,{children:"dimensions"}),` across a set of vertical axes - one per dimension, evenly spaced across the
plot. It supports any number of dimensions, unlike an XY chart which is fixed at two. Each axis is
independently scaled, the same way each spoke of a `,e.jsx(n.code,{children:"<Radar>"}),` is scaled to its own field's domain, so a
"1-5 rating" axis can sit right next to a "percentage" axis. It's a self-contained chart - like
`,e.jsx(n.code,{children:"<Chord>"}),", it accepts chart-level props like ",e.jsx(n.code,{children:"data"}),"/",e.jsx(n.code,{children:"width"}),"/",e.jsx(n.code,{children:"height"}),` directly, since it only ever has a
single plot.`]}),`
`,e.jsxs(n.p,{children:["Internally, ",e.jsx(n.code,{children:"<ParallelCoordinates>"})," composes a ",e.jsx(n.code,{children:"<ParallelCoordinatesPlot>"}),` (the lines) with one
`,e.jsx(n.code,{children:"<ParallelAxis>"}),` per dimension (the ticks, labels and brushes) as separate chart-level children - the
same way an `,e.jsx(n.code,{children:"<XYChart>"})," composes a plot with its own ",e.jsx(n.code,{children:"<XAxis>"}),"/",e.jsx(n.code,{children:"<YAxis>"}),`, rather than the plot owning
its axes.`]}),`
`,e.jsx(s,{of:d}),`
`,e.jsxs(n.h2,{id:"parallelcoordinates-component",children:[e.jsx(n.code,{children:"<ParallelCoordinates>"})," Component"]}),`
`,e.jsx(n.h3,{id:"props",children:"Props"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Prop"}),e.jsx(n.th,{children:"Type"}),e.jsx(n.th,{children:"Default"}),e.jsx(n.th,{children:"Note"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsxs(n.strong,{children:[e.jsx(n.code,{children:"dimensions"}),"*"]})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"string[]"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"null"})}),e.jsx(n.td,{children:"The ordered list of fields to plot, one vertical axis per field. Supports any number of dimensions."})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"name"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"string"})}),e.jsx(n.td,{children:"Row index"}),e.jsx(n.td,{children:"The key of the field used to label each row/line, shown in the tooltip."})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"color"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"string"})}),e.jsx(n.td,{children:"-"}),e.jsx(n.td,{children:"The key of the field used to color each row/line categorically. Every row shares a single color when omitted."})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"ticks"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"number"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"5"})}),e.jsx(n.td,{children:"The number of ticks to aim for on each axis."})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"tickFormat"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"(value, dimension) => string"})}),e.jsxs(n.td,{children:[e.jsx(n.code,{children:"(value) => \\"}),"$",value,"``"]}),e.jsx(n.td,{children:"Formats a tick's/tooltip's value for a given dimension."})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"lineWidth"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"number"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"1.5"})}),e.jsx(n.td,{children:"The width, in pixels, of each row's line."})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"brushable"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"boolean"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"true"})}),e.jsx(n.td,{children:"Should each axis support brush filtering - dragging a range on an axis to fade out every row that doesn't pass through it?"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"interactive"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"boolean"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"true"})}),e.jsxs(n.td,{children:["Whether hovering/clicking a row should highlight it and trigger ",e.jsx(n.code,{children:"onMouseOver"}),"/",e.jsx(n.code,{children:"onMouseOut"}),"/",e.jsx(n.code,{children:"onClick"}),"."]})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"tooltip"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"boolean"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"false"})}),e.jsx(n.td,{children:"Should hovering a row show a tooltip? Off by default, since a tooltip following every hover across potentially hundreds of crossing lines can be more noise than signal."})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"showInLegend"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"boolean"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"false"})}),e.jsxs(n.td,{children:["Whether the plot should feature in the legend. Only meaningful when ",e.jsx(n.code,{children:"color"})," is set."]})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"contextMenu"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"boolean"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"true"})}),e.jsx(n.td,{children:`Shows a radial context menu, with a "Reset filters" action, when right-clicking the chart's background.`})]})]})]}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Note"}),": A row with a missing value on any of ",e.jsx(n.code,{children:"dimensions"}),` is left out entirely, since a line can't
meaningfully pass through a gap. Aggregate or clean the data first if that's not the desired behaviour.`]}),`
`]}),`
`,e.jsx(n.h3,{id:"using-canvas",children:"Using Canvas"}),`
`,e.jsxs(n.p,{children:["Like other plots, a ",e.jsx(n.code,{children:"<ParallelCoordinates>"}),` can be rendered using an HTML Canvas instead of SVG by
setting `,e.jsx(n.code,{children:"useCanvas"}),`. Every row's line is drawn on a single shared Canvas layer, and rendering is
automatically batched into progressive passes for large datasets (see `,e.jsx(n.code,{children:"renderCanvas"}),`) so the browser
stays responsive. The `,e.jsx(n.code,{children:"<ParallelAxis>"}),` components (ticks, labels and brushes) are always rendered as
SVG regardless of `,e.jsx(n.code,{children:"useCanvas"}),", since brushing needs real, draggable DOM elements."]}),`
`,e.jsx(s,{of:l}),`
`,e.jsxs(n.p,{children:["Brushing works exactly the same way on Canvas - only the lines themselves move to a ",e.jsx(n.code,{children:"<canvas>"}),`, the
axes/brushes underneath are unaffected:`]}),`
`,e.jsx(s,{of:a}),`
`,e.jsxs(n.p,{children:["With 5,000+ rows (",e.jsx(n.code,{children:"PROGRESSIVE_RENDER_THRESHOLD"}),`), Canvas rendering automatically switches to
progressively batched passes so the browser stays responsive - brushing keeps working exactly the
same at that scale too. At this density, a single shared colour (rather than `,e.jsx(n.code,{children:"color"}),`) with a low
`,e.jsx(n.code,{children:"theme.series.opacity"}),` reads better than one colour per category - overlapping rows blend into
visibly darker bands wherever the data is denser:`]}),`
`,e.jsx(s,{of:c}),`
`,e.jsx(n.h3,{id:"brush-filtering",children:"Brush Filtering"}),`
`,e.jsxs(n.p,{children:[`Drag vertically on any axis to select a range - every row that doesn't pass through that range on that
axis fades out (and stops responding to hover/click, so a faded-out row can no longer pop up its own
tooltip). Selections on multiple axes combine (a row must satisfy every brushed axis to stay
highlighted), and dragging a selection back to nothing clears that axis' filter. Each `,e.jsx(n.code,{children:"<ParallelAxis>"}),`
writes its brushed extent straight to the chart's Redux store via a generic `,e.jsx(n.code,{children:"chartActions.setFilter({ field, value })"}),`, rather than a prop passed down from the plot - keeping filtering reusable by any
future filterable plot, not just this one. Read `,e.jsx(n.code,{children:"chartSelectors.filters"}),` to react to the current
selection from outside the chart, e.g. to drive a data table alongside it.`]}),`
`,e.jsxs(n.p,{children:["Set ",e.jsx(n.code,{children:"brushable={false}"})," to disable brushing entirely:"]}),`
`,e.jsx(s,{of:h}),`
`,e.jsx(n.h3,{id:"context-menu",children:"Context Menu"}),`
`,e.jsx(n.p,{children:`Right-clicking the chart's background (not a line or an axis) opens a radial context menu with a
"Reset filters" action - clearing every axis' brush selection in one go - alongside the usual
"Hide"/"Show legend" toggle. It's shown disabled while nothing is currently filtered:`}),`
`,e.jsx(s,{of:x}),`
`,e.jsxs(n.p,{children:["Set ",e.jsx(n.code,{children:"contextMenu={false}"})," to turn it off, or pass your own ",e.jsx(n.code,{children:"getItems"})," via ",e.jsx(n.code,{children:"<ContextMenuOverlay>"}),`
directly if you want a different set of actions - see the `,e.jsx(n.code,{children:"<ContextMenuOverlay>"})," docs."]}),`
`,e.jsx(n.h3,{id:"coloring-by-category",children:"Coloring by Category"}),`
`,e.jsxs(n.p,{children:["Set ",e.jsx(n.code,{children:"color"}),` to a field to color each row categorically instead of every row sharing one color, and
`,e.jsx(n.code,{children:"showInLegend"})," to list the categories in the legend:"]}),`
`,e.jsx(s,{of:j}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`<ParallelCoordinates dimensions={dimensions} color="group" showInLegend={true} />
`})})]})}function Z(r={}){const{wrapper:n}={...i(),...r.components};return n?e.jsx(n,{...r,children:e.jsx(t,{...r})}):t(r)}export{Z as default};
//# sourceMappingURL=ParallelCoordinates-JWDqYbvl.js.map
