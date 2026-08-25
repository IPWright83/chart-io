import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{useMDXComponents as i}from"./index-D-2zTmTn.js";import{M as s,C as o}from"./index-3it-_4RI.js";import{Basic as d,Canvas as c,ThreeColumn as l}from"./Sankey.stories-CMUAPhSV.js";import"./index-DpTt3J-R.js";import"./iframe-BCCGJMhD.js";import"./index-D5nvoAmD.js";import"./index-B77L4dcM.js";import"./index-DrFu-skq.js";import"./index.es-DoiyW41S.js";import"./index-CFMwmiIJ.js";import"./gdp_dataset-DV7KFYC9.js";import"./argTypes-DuN6ki1s.js";import"./dataControls-DatG45sm.js";import"./isChromatic-VqprqId_.js";import"./renderChart-DJ6bXfoi.js";import"./react-redux-lkBMRsz6.js";import"./test-utils-C-DEfvFY.js";import"./client-CbGTh6y2.js";import"./storybook-Cl2DMVpH.js";import"./index-DaTy74M5.js";import"./index-Gn9jQ5lq.js";import"./lodash-DOJiQ2Wu.js";import"./index-DzcEfe_2.js";import"./index-CFwzIhDn.js";import"./Legend-DQjp6Mmo.js";import"./index-Bp2RIjag.js";import"./index-BmYvQTbQ.js";import"./Circle-Qf3Tu8hN.js";import"./Line-BjKan0E4.js";import"./Square-CZVurtTs.js";import"./index-DVli7D7_.js";import"./Tooltip-aFreqMLS.js";import"./index-iwe53Xj-.js";import"./TooltipItem-D41oQ2An.js";import"./index-5Gl1ki1p.js";import"./LabelsPlot-C9OJe8VL.js";import"./renderCanvas-DSAxZURY.js";import"./LinksPlot-CoPVhndq.js";import"./useTooltip-B4jsLD3t.js";function t(r){const n={a:"a",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...i(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"Charts/Flow/Sankey"}),`
`,e.jsx(n.h1,{id:"sankey-plots",children:"Sankey Plots"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"<Sankey>"})," component lays out a flow diagram from a flat dataset: ",e.jsx(n.code,{children:"categories"}),` is an ordered list of
fields, first column first. Each row flows left-to-right through its fields, contributing `,e.jsx(n.code,{children:"value"}),` to the
link between every consecutive pair of columns - flows between the same pair of node values are summed
together into a single, wider band rather than drawn as separate parallel flows. It's a self-contained
chart - unlike `,e.jsx(n.code,{children:"<Bar>"}),"/",e.jsx(n.code,{children:"<Line>"})," (which need an ",e.jsx(n.code,{children:"<XYChart>"})," wrapper) or ",e.jsx(n.code,{children:"<Pie>"}),"/",e.jsx(n.code,{children:"<Radar>"}),` (which need a
`,e.jsx(n.code,{children:"<RadialChart>"})," wrapper), ",e.jsx(n.code,{children:"<Sankey>"})," accepts chart-level props like ",e.jsx(n.code,{children:"data"}),"/",e.jsx(n.code,{children:"width"}),"/",e.jsx(n.code,{children:"height"}),` directly,
since it only ever has a single plot.`]}),`
`,e.jsx(o,{of:d}),`
`,e.jsxs(n.h2,{id:"sankey-component",children:[e.jsx(n.code,{children:"<Sankey>"})," Component"]}),`
`,e.jsx(n.h3,{id:"props",children:"Props"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Prop"}),e.jsx(n.th,{children:"Type"}),e.jsx(n.th,{children:"Default"}),e.jsx(n.th,{children:"Note"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsxs(n.strong,{children:[e.jsx(n.code,{children:"categories"}),"*"]})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"string[]"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"null"})}),e.jsx(n.td,{children:"The ordered list of fields to build each column of nodes from, first column first."})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsxs(n.strong,{children:[e.jsx(n.code,{children:"value"}),"*"]})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"string"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"null"})}),e.jsx(n.td,{children:"The key of the field that contains the size of each flow."})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"cornerRadius"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"number"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"0"})}),e.jsx(n.td,{children:"The corner radius, in pixels, to apply to each node's rectangle."})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"colors"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"string[]"})}),e.jsx(n.td,{children:"Derived from Theme"}),e.jsx(n.td,{children:"Override the colours used for each first-column node. Every other node takes the colour of whichever incoming flow contributes the most value to it."})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"labels"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"boolean"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"true"})}),e.jsx(n.td,{children:"Should node labels be shown?"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"interactive"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"boolean"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"true"})}),e.jsx(n.td,{children:"Whether the plot should be interactive. Setting this to false will disable tooltips from this plot."})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"showInLegend"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"boolean"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"false"})}),e.jsx(n.td,{children:"Whether the plot should feature in the legend or not. Only the first-column categories appear in the legend."})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"buildSankeyGraph"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"function"})}),e.jsxs(n.td,{children:[e.jsx(n.code,{children:"buildSankeyGraph"})," from ",e.jsx(n.code,{children:"@chart-io/core"})]}),e.jsxs(n.td,{children:["Builds the node/link graph from the flat dataset. Override this if your data doesn't fit that flat, group-by-",e.jsx(n.code,{children:"categories"})," shape - see below."]})]})]})]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"<Sankey>"})," also accepts the usual chart-level props - ",e.jsx(n.code,{children:"data"}),", ",e.jsx(n.code,{children:"width"}),", ",e.jsx(n.code,{children:"height"}),", ",e.jsx(n.code,{children:"plotMargin"}),", ",e.jsx(n.code,{children:"theme"}),`,
`,e.jsx(n.code,{children:"animationDuration"}),", ",e.jsx(n.code,{children:"onClick"}),"/",e.jsx(n.code,{children:"onMouseOver"}),"/",e.jsx(n.code,{children:"onMouseOut"}),` and so on - directly, since it's a
self-contained chart. `,e.jsx(n.code,{children:"onClick"}),"/",e.jsx(n.code,{children:"onMouseOver"}),"/",e.jsx(n.code,{children:"onMouseOut"}),` fire for both nodes and flows - a node's
datum is `,e.jsx(n.code,{children:"{ [category]: key }"}),", and a flow's is ",e.jsx(n.code,{children:"{ [sourceCategory]: sourceKey, [targetCategory]: targetKey, [value]: amount }"}),"."]}),`
`,e.jsx(n.h3,{id:"using-canvas",children:"Using Canvas"}),`
`,e.jsxs(n.p,{children:["Like other plots, a ",e.jsx(n.code,{children:"<Sankey>"})," can be rendered using an HTML Canvas instead of SVG by setting ",e.jsx(n.code,{children:"useCanvas"}),"."]}),`
`,e.jsx(o,{of:c}),`
`,e.jsx(n.h3,{id:"more-than-two-columns",children:"More than two columns"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"categories"}),` isn't limited to two columns - pass as many fields as your data has stages to build further
columns of nodes. Every row still only contributes to the link between `,e.jsx(n.em,{children:"consecutive"}),` columns, so a
3-column Sankey like this one draws two "hops" per row: continent -> country, and country -> sector.`]}),`
`,e.jsx(o,{of:l}),`
`,e.jsxs(n.p,{children:["There's no fixed limit on the number of columns - ",e.jsx(n.code,{children:"categories"})," accepts any number of fields."]}),`
`,e.jsx(n.h3,{id:"coloring",children:"Coloring"}),`
`,e.jsxs(n.p,{children:["A first-column node takes its color from the palette (",e.jsx(n.code,{children:"colors"}),`, or the theme's series colors by
default). Every other node has no single parent to inherit a color from - unlike `,e.jsx(n.code,{children:"<Treemap>"}),` or
`,e.jsx(n.code,{children:"<Dendrogram>"}),`, a Sankey node can be fed by several incoming flows - so instead it takes the color of
whichever incoming flow contributes the most value to it, tracing back to a first-column node. Each
flow itself is drawn in its source node's color, semi-transparent so overlapping bands stay
distinguishable from one another.`]}),`
`,e.jsx(n.h3,{id:"negative-values",children:"Negative values"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"value"}),` can't be negatively sized - a flow's width can't represent a negative value. If the dataset
contains negative values in the `,e.jsx(n.code,{children:"value"})," field, they're treated as ",e.jsx(n.code,{children:"0"})," and a ",e.jsx(n.code,{children:"W009"}),` warning is logged -
see `,e.jsxs(n.a,{href:"/docs/hierarchical-treemap--docs",children:["the ",e.jsx(n.code,{children:"<Treemap>"})," docs"]}),` for the same behaviour on the hierarchical
equivalent of this chart.`]}),`
`,e.jsx(n.h3,{id:"custom-graph-building",children:"Custom graph building"}),`
`,e.jsxs(n.p,{children:["By default ",e.jsx(n.code,{children:"<Sankey>"}),` builds its node/link graph by walking the flat dataset through each field in
`,e.jsx(n.code,{children:"categories"})," in turn, summing ",e.jsx(n.code,{children:"value"}),` into the link between every consecutive pair of columns - the
shared `,e.jsx(n.code,{children:"buildSankeyGraph"})," from ",e.jsx(n.code,{children:"@chart-io/core"}),`. If your data doesn't fit that shape - it's already a
graph of nodes/links - pass your own `,e.jsx(n.code,{children:"buildSankeyGraph"}),` function instead, matching the signature of the
one exported from `,e.jsx(n.code,{children:"@chart-io/core"}),":"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`import { buildSankeyGraph } from "@chart-io/core";

<Sankey
    categories={["source", "destination"]}
    value="amount"
    buildSankeyGraph={(data, categories, value, componentName) => {
        // Delegate to the default implementation, or build the { nodes, links } graph some other way entirely
        return buildSankeyGraph(data, categories, value, componentName);
    }}
/>
`})})]})}function $(r={}){const{wrapper:n}={...i(),...r.components};return n?e.jsx(n,{...r,children:e.jsx(t,{...r})}):t(r)}export{$ as default};
//# sourceMappingURL=Sankey-BkiEzFqi.js.map
