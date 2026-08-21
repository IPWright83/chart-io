import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{useMDXComponents as s}from"./index-D-2zTmTn.js";import{M as d,C as i}from"./index-9yemNRWz.js";import{Basic as o,Canvas as c,ThreeLevel as l,DeepTreemap as a,Zoomable as h}from"./Treemap.stories-DNPpelGz.js";import"./index-DpTt3J-R.js";import"./iframe-BCeR5QkD.js";import"./index-D5nvoAmD.js";import"./index-B77L4dcM.js";import"./index-DrFu-skq.js";import"./react-redux-SPeguAgb.js";import"./index-Dcm7olAB.js";import"./gdp_dataset-DV7KFYC9.js";import"./argTypes-DuN6ki1s.js";import"./dataControls-DatG45sm.js";import"./isChromatic-VqprqId_.js";import"./renderChart-D1szSHoV.js";import"./test-utils-C-DEfvFY.js";import"./client-CbGTh6y2.js";import"./storybook-CxwCI9RW.js";import"./index-CmKRTxUI.js";import"./index-BRXO1njn.js";import"./lodash-DOJiQ2Wu.js";import"./index-9431aKHi.js";import"./index-BAzb9S1k.js";import"./Legend-z40re8h9.js";import"./index-Dub0Swig.js";import"./index-BmYvQTbQ.js";import"./Circle-Qf3Tu8hN.js";import"./Line-BjKan0E4.js";import"./Square-CZVurtTs.js";import"./index-9usyF_v_.js";import"./Tooltip-aPd-LmbL.js";import"./index-CRhM32cg.js";import"./TooltipItem-OfChlkFL.js";import"./index-BBDmPaB_.js";import"./renderCanvas-CR85T-h9.js";import"./useTooltip-BlFpqfM-.js";function t(n){const r={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...s(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(d,{title:"Charts/Hierarchical/Treemap"}),`
`,e.jsx(r.h1,{id:"treemap-plots",children:"Treemap Plots"}),`
`,e.jsxs(r.p,{children:["The ",e.jsx(r.code,{children:"<Treemap>"}),` component subdivides the plot area into nested rectangles from a flat dataset:
`,e.jsx(r.code,{children:"categories"}),` is an ordered list of fields, outermost group first. Each level subdivides its parent's
rectangle, with every leaf cell's area proportional to its value. It's a self-contained chart - unlike
`,e.jsx(r.code,{children:"<Bar>"}),"/",e.jsx(r.code,{children:"<Line>"})," (which need an ",e.jsx(r.code,{children:"<XYChart>"})," wrapper) or ",e.jsx(r.code,{children:"<Pie>"}),"/",e.jsx(r.code,{children:"<Radar>"})," (which need a ",e.jsx(r.code,{children:"<RadialChart>"}),`
wrapper), `,e.jsx(r.code,{children:"<Treemap>"})," accepts chart-level props like ",e.jsx(r.code,{children:"data"}),"/",e.jsx(r.code,{children:"width"}),"/",e.jsx(r.code,{children:"height"}),` directly, since it only
ever has a single plot.`]}),`
`,e.jsx(i,{of:o}),`
`,e.jsxs(r.h2,{id:"treemap-component",children:[e.jsx(r.code,{children:"<Treemap>"})," Component"]}),`
`,e.jsx(r.h3,{id:"props",children:"Props"}),`
`,e.jsxs(r.table,{children:[e.jsx(r.thead,{children:e.jsxs(r.tr,{children:[e.jsx(r.th,{children:"Prop"}),e.jsx(r.th,{children:"Type"}),e.jsx(r.th,{children:"Default"}),e.jsx(r.th,{children:"Note"})]})}),e.jsxs(r.tbody,{children:[e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsxs(r.strong,{children:[e.jsx(r.code,{children:"categories"}),"*"]})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"string[]"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"null"})}),e.jsx(r.td,{children:"The ordered list of fields to build each level from, outermost group first."})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsxs(r.strong,{children:[e.jsx(r.code,{children:"value"}),"*"]})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"string"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"null"})}),e.jsx(r.td,{children:"The key of the field that contains the size for each cell."})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"padding"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"number"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"2"})}),e.jsx(r.td,{children:"The gap, in pixels, to leave between cells, at every level of the hierarchy."})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"cornerRadius"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"number"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"0"})}),e.jsx(r.td,{children:"The corner radius, in pixels, to apply to each cell."})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"sort"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"boolean"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"false"})}),e.jsx(r.td,{children:"Should the cells be sorted by value (descending), rather than using the order of the data?"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"colors"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"string[]"})}),e.jsx(r.td,{children:"Derived from Theme"}),e.jsx(r.td,{children:"Override the colours used for each top-level category. Deeper cells inherit their parent's colour."})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"interactive"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"boolean"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"true"})}),e.jsx(r.td,{children:"Whether the plot should be interactive. Setting this to false will disable tooltips from this plot"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"showInLegend"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"boolean"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"true"})}),e.jsx(r.td,{children:"Whether the plot should feature in the legend or not. Only the top-level categories appear in the legend."})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"buildHierarchy"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"function"})}),e.jsxs(r.td,{children:[e.jsx(r.code,{children:"buildHierarchy"})," from ",e.jsx(r.code,{children:"@chart-io/core"})]}),e.jsxs(r.td,{children:["Builds the hierarchy from the flat dataset. Override this if your data doesn't fit the flat, group-by-",e.jsx(r.code,{children:"categories"})," shape - see below."]})]})]})]}),`
`,e.jsxs(r.p,{children:[e.jsx(r.code,{children:"<Treemap>"})," also accepts the usual chart-level props - ",e.jsx(r.code,{children:"data"}),", ",e.jsx(r.code,{children:"width"}),", ",e.jsx(r.code,{children:"height"}),", ",e.jsx(r.code,{children:"plotMargin"}),`,
`,e.jsx(r.code,{children:"theme"}),", ",e.jsx(r.code,{children:"animationDuration"}),", ",e.jsx(r.code,{children:"onClick"}),"/",e.jsx(r.code,{children:"onMouseOver"}),"/",e.jsx(r.code,{children:"onMouseOut"}),` and so on - directly, since it's a
self-contained chart.`]}),`
`,e.jsxs(r.blockquote,{children:[`
`,e.jsxs(r.p,{children:[e.jsx(r.strong,{children:"Note"}),": Every combination of the fields listed in ",e.jsx(r.code,{children:"categories"}),` should be unique in the data. If your
data has multiple rows for the same combination, aggregate it first.`]}),`
`]}),`
`,e.jsx(r.p,{children:`Only the deepest level of the hierarchy is drawn as a cell - the nesting of the levels above it is
still visible from the grouping and padding, without needing separate rectangles drawn for each group.`}),`
`,e.jsx(r.h3,{id:"using-canvas",children:"Using Canvas"}),`
`,e.jsxs(r.p,{children:["Like other plots, a ",e.jsx(r.code,{children:"<Treemap>"})," can be rendered using an HTML Canvas instead of SVG by setting ",e.jsx(r.code,{children:"useCanvas"}),"."]}),`
`,e.jsx(i,{of:c}),`
`,e.jsx(r.h3,{id:"n-level-hierarchies",children:"N-level hierarchies"}),`
`,e.jsxs(r.p,{children:[e.jsx(r.code,{children:"categories"}),` isn't limited to two levels - pass as many fields as your data has levels of hierarchy to
build further nesting. For example `,e.jsx(r.code,{children:'categories={["continent", "country", "sector"]}'}),` produces a 3-level
treemap.`]}),`
`,e.jsx(i,{of:l}),`
`,e.jsxs(r.p,{children:["There's no fixed limit on the number of levels - ",e.jsx(r.code,{children:"categories"})," accepts any number of fields."]}),`
`,e.jsx(i,{of:a}),`
`,e.jsx(r.h3,{id:"zooming",children:"Zooming"}),`
`,e.jsxs(r.p,{children:["Since only leaf cells are drawn, a group never has a cell of its own to click on - so set ",e.jsx(r.code,{children:"zoomable"}),` to
let a click on any cell zoom in and refocus on that cell's immediate parent group instead, expanding it
to fill the available space. Clicking a cell whose parent is already the focused group zooms back out
one level. Add `,e.jsx(r.code,{children:"breadcrumb"})," to also show the current zoom path as a clickable trail:"]}),`
`,e.jsx(i,{of:h}),`
`,e.jsx(r.pre,{children:e.jsx(r.code,{className:"language-jsx",children:`<Treemap
    categories={["continent", "country", "sector"]}
    value="gdp"
    zoomable={true}
    breadcrumb={true}
/>
`})}),`
`,e.jsx(r.h3,{id:"negative-values",children:"Negative values"}),`
`,e.jsxs(r.p,{children:["None of the fields in ",e.jsx(r.code,{children:"categories"}),` can be negatively sized - a rectangle's area can't represent a
negative value. If the dataset contains negative values in the `,e.jsx(r.code,{children:"value"})," field, they're treated as ",e.jsx(r.code,{children:"0"}),`
and a `,e.jsx(r.code,{children:"W009"})," warning is logged - see ",e.jsxs(r.a,{href:"/docs/radialcharts-stackeddonut--docs",children:["the ",e.jsx(r.code,{children:"<StackedDonut>"})," docs"]}),`
for the same behaviour on the polar equivalent of this chart.`]}),`
`,e.jsx(r.h3,{id:"custom-hierarchy-building",children:"Custom hierarchy building"}),`
`,e.jsxs(r.p,{children:["By default ",e.jsx(r.code,{children:"<Treemap>"})," builds its hierarchy by grouping the flat dataset by each field in ",e.jsx(r.code,{children:"categories"}),`
in turn, summing `,e.jsx(r.code,{children:"value"})," at every level - the same shared ",e.jsx(r.code,{children:"buildHierarchy"})," used by ",e.jsx(r.code,{children:"<StackedDonut>"}),`. If
your data doesn't fit that shape - it's already nested, or needs some custom aggregation - pass your own
`,e.jsx(r.code,{children:"buildHierarchy"})," function instead, matching the signature of the one exported from ",e.jsx(r.code,{children:"@chart-io/core"}),":"]}),`
`,e.jsx(r.pre,{children:e.jsx(r.code,{className:"language-jsx",children:`import { buildHierarchy } from "@chart-io/core";

<Treemap
    categories={["region", "product"]}
    value="sales"
    buildHierarchy={(data, categories, value, sort, componentName) => {
        // Delegate to the default implementation, or build a d3.hierarchy some other way entirely
        return buildHierarchy(data, categories, value, sort, componentName);
    }}
/>
`})})]})}function Y(n={}){const{wrapper:r}={...s(),...n.components};return r?e.jsx(r,{...n,children:e.jsx(t,{...n})}):t(n)}export{Y as default};
//# sourceMappingURL=Treemap-ikAg6ZpT.js.map
