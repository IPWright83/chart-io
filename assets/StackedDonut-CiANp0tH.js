import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{useMDXComponents as d}from"./index-D-2zTmTn.js";import{M as s,C as i}from"./index-9yemNRWz.js";import{Basic as o,Canvas as c,Sunburst as l,DeepSunburst as h,Zoomable as a,TraditionalTooltip as x}from"./StackedDonut.stories-BGoN2wAR.js";import"./index-DpTt3J-R.js";import"./iframe-BCeR5QkD.js";import"./index-D5nvoAmD.js";import"./index-B77L4dcM.js";import"./index-DrFu-skq.js";import"./react-redux-SPeguAgb.js";import"./index-Dcm7olAB.js";import"./gdp_dataset-DV7KFYC9.js";import"./argTypes-DuN6ki1s.js";import"./dataControls-DatG45sm.js";import"./isChromatic-VqprqId_.js";import"./renderChart-D1szSHoV.js";import"./test-utils-C-DEfvFY.js";import"./client-CbGTh6y2.js";import"./storybook-CxwCI9RW.js";import"./index-CvJ_dlQX.js";import"./index-B6Lr3Qa8.js";import"./index-BRXO1njn.js";import"./lodash-DOJiQ2Wu.js";import"./index-9431aKHi.js";import"./index-BLxOKznu.js";import"./index-BAzb9S1k.js";import"./Legend-z40re8h9.js";import"./index-Dub0Swig.js";import"./index-BmYvQTbQ.js";import"./Circle-Qf3Tu8hN.js";import"./Line-BjKan0E4.js";import"./Square-CZVurtTs.js";import"./index-DxXlV5JW.js";import"./index-9usyF_v_.js";import"./Tooltip-aPd-LmbL.js";import"./index-CRhM32cg.js";import"./TooltipItem-OfChlkFL.js";import"./index-BBDmPaB_.js";import"./index-cvfhMktw.js";import"./renderCanvas-CR85T-h9.js";import"./interpolateArc-BeeJJFCD.js";import"./useTooltip-BlFpqfM-.js";function t(n){const r={blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...d(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"Charts/RadialCharts/StackedDonut"}),`
`,e.jsx(r.h1,{id:"stackeddonut-plots",children:"StackedDonut Plots"}),`
`,e.jsxs(r.p,{children:["The ",e.jsx(r.code,{children:"<StackedDonut>"}),` component builds an N-level radial subdivision (a "sunburst") from a flat dataset:
`,e.jsx(r.code,{children:"categories"}),` is an ordered list of fields, one per ring, from the innermost ring outward. Each ring
subdivides its parent ring's slices, with every slice's angle proportional to its value. It should be
used within a `,e.jsx(r.code,{children:"<RadialChart>"}),", which is the polar equivalent of the ",e.jsx(r.code,{children:"<XYChart>"}),"."]}),`
`,e.jsx(i,{of:o}),`
`,e.jsxs(r.h2,{id:"stackeddonut-component",children:[e.jsx(r.code,{children:"<StackedDonut>"})," Component"]}),`
`,e.jsx(r.h3,{id:"props",children:"Props"}),`
`,e.jsxs(r.table,{children:[e.jsx(r.thead,{children:e.jsxs(r.tr,{children:[e.jsx(r.th,{children:"Prop"}),e.jsx(r.th,{children:"Type"}),e.jsx(r.th,{children:"Default"}),e.jsx(r.th,{children:"Note"})]})}),e.jsxs(r.tbody,{children:[e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsxs(r.strong,{children:[e.jsx(r.code,{children:"categories"}),"*"]})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"string[]"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"null"})}),e.jsx(r.td,{children:"The ordered list of fields to build each ring from, innermost ring first."})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsxs(r.strong,{children:[e.jsx(r.code,{children:"value"}),"*"]})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"string"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"null"})}),e.jsx(r.td,{children:"The key of the field that contains the value for each slice."})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"innerRadius"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"number"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"0.35"})}),e.jsx(r.td,{children:"The inner radius of the StackedDonut, as a fraction (0-1) of the maximum available radius."})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"outerRadius"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"number"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"1"})}),e.jsx(r.td,{children:"The outer radius of the StackedDonut, as a fraction (0-1) of the maximum available radius."})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"ringPadding"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"number"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"2"})}),e.jsx(r.td,{children:"The gap, in pixels, to leave between each ring."})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"padAngle"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"number"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"0.01"})}),e.jsx(r.td,{children:"The angular gap, in radians, to leave between each slice."})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"cornerRadius"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"number"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"0"})}),e.jsx(r.td,{children:"The corner radius, in pixels, to apply to each slice."})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"sort"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"boolean"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"false"})}),e.jsx(r.td,{children:"Should the slices be sorted by value (descending), rather than using the order of the data?"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"colors"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"string[]"})}),e.jsx(r.td,{children:"Derived from Theme"}),e.jsx(r.td,{children:"Override the colours used for each innermost ring category. Outer ring slices inherit their parent's colour."})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"interactive"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"boolean"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"true"})}),e.jsx(r.td,{children:"Whether the plot should be interactive. Setting this to false will disable tooltips from this plot"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"showInLegend"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"boolean"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"true"})}),e.jsx(r.td,{children:"Whether the plot should feature in the legend or not. Only the innermost ring's categories appear in the legend."})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"buildHierarchy"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"function"})}),e.jsxs(r.td,{children:[e.jsx(r.code,{children:"buildHierarchy"})," from ",e.jsx(r.code,{children:"@chart-io/core"})]}),e.jsxs(r.td,{children:["Builds the hierarchy from the flat dataset. Override this if your data doesn't fit the flat, group-by-",e.jsx(r.code,{children:"categories"})," shape - see below."]})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"zoomable"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"boolean"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"true"})}),e.jsxs(r.td,{children:["Should a click on a non-leaf slice zoom in and refocus on its subtree, and a click on the center hole zoom back out? Add ",e.jsx(r.code,{children:"breadcrumb"})," to the wrapping ",e.jsx(r.code,{children:"<RadialChart>"})," to also show the current zoom path as a clickable trail."]})]})]})]}),`
`,e.jsxs(r.blockquote,{children:[`
`,e.jsxs(r.p,{children:[e.jsx(r.strong,{children:"Note"}),": Every combination of the fields listed in ",e.jsx(r.code,{children:"categories"}),` should be unique in the data. If your
data has multiple rows for the same combination, aggregate it first.`]}),`
`]}),`
`,e.jsx(r.h3,{id:"using-canvas",children:"Using Canvas"}),`
`,e.jsxs(r.p,{children:["Like other plots, a ",e.jsx(r.code,{children:"<StackedDonut>"})," can be rendered using an HTML Canvas instead of SVG by setting ",e.jsx(r.code,{children:"useCanvas"}),"."]}),`
`,e.jsx(i,{of:c}),`
`,e.jsx(r.h3,{id:"n-level-hierarchies",children:"N-level hierarchies"}),`
`,e.jsxs(r.p,{children:[e.jsx(r.code,{children:"categories"}),` isn't limited to two levels - pass as many fields as your data has levels of hierarchy to
build further rings. For example `,e.jsx(r.code,{children:'categories={["continent", "country", "sector"]}'}),` produces a 3-ring
sunburst.`]}),`
`,e.jsx(i,{of:l}),`
`,e.jsxs(r.p,{children:["There's no fixed limit on the number of rings - ",e.jsx(r.code,{children:"categories"})," accepts any number of fields."]}),`
`,e.jsx(i,{of:h}),`
`,e.jsx(r.h3,{id:"zooming",children:"Zooming"}),`
`,e.jsxs(r.p,{children:[e.jsx(r.code,{children:"<StackedDonut>"}),` is zoomable by default - clicking a non-leaf slice zooms in and refocuses the chart on
just its subtree, with the layout re-running framed to that slice so its remaining rings expand to fill
the available radius. While zoomed in, the focused node's name is shown in the center hole whenever
nothing's hovered, and clicking that center hole zooms back out one level. Set `,e.jsx(r.code,{children:"zoomable={false}"}),` to
disable this.`]}),`
`,e.jsxs(r.p,{children:["Add ",e.jsx(r.code,{children:"breadcrumb"})," to the wrapping ",e.jsx(r.code,{children:"<RadialChart>"}),` to also show the current zoom path as a clickable
trail, letting you jump back to any ancestor level (or all the way out via "All") in one click:`]}),`
`,e.jsx(i,{of:a}),`
`,e.jsx(r.pre,{children:e.jsx(r.code,{className:"language-jsx",children:`<RadialChart breadcrumb={true}>
    <StackedDonut categories={["continent", "country", "sector"]} value="gdp" />
</RadialChart>
`})}),`
`,e.jsx(r.h3,{id:"custom-hierarchy-building",children:"Custom hierarchy building"}),`
`,e.jsxs(r.p,{children:["By default ",e.jsx(r.code,{children:"<StackedDonut>"}),` builds its hierarchy by grouping the flat dataset by each field in
`,e.jsx(r.code,{children:"categories"})," in turn, summing ",e.jsx(r.code,{children:"value"}),` at every level. If your data doesn't fit that shape - it's already
nested, or needs some custom aggregation - pass your own `,e.jsx(r.code,{children:"buildHierarchy"}),` function instead, matching the
signature of the one exported from `,e.jsx(r.code,{children:"@chart-io/core"}),":"]}),`
`,e.jsx(r.pre,{children:e.jsx(r.code,{className:"language-jsx",children:`import { buildHierarchy } from "@chart-io/core";

<StackedDonut
    categories={["region", "product"]}
    value="sales"
    buildHierarchy={(data, categories, value, sort, componentName) => {
        // Delegate to the default implementation, or build a d3.hierarchy some other way entirely
        return buildHierarchy(data, categories, value, sort, componentName);
    }}
/>
`})}),`
`,e.jsx(r.h3,{id:"center-value",children:"Center Value"}),`
`,e.jsxs(r.p,{children:["Since a ",e.jsx(r.code,{children:"<StackedDonut>"})," always has a hole in the middle, ",e.jsx(r.code,{children:"<RadialChart>"}),` displays the hovered slice's
name/value there by default, instead of in a floating Tooltip - see the examples above. This is
especially useful for deep hierarchies, where a floating tooltip can obscure the chart. Set
`,e.jsx(r.code,{children:"centerValue={false}"})," on the ",e.jsx(r.code,{children:"<RadialChart>"})," to opt back into the traditional floating Tooltip instead."]}),`
`,e.jsx(i,{of:x})]})}function re(n={}){const{wrapper:r}={...d(),...n.components};return r?e.jsx(r,{...n,children:e.jsx(t,{...n})}):t(n)}export{re as default};
//# sourceMappingURL=StackedDonut-CiANp0tH.js.map
