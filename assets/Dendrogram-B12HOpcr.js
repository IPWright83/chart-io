import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{useMDXComponents as s}from"./index-D-2zTmTn.js";import{M as i,C as r}from"./index-9yemNRWz.js";import{Basic as o,Canvas as l,ThreeLevel as c,SizedByValue as a,Zoomable as h,Radial as x,RadialThreeLevel as j,RadialZoomable as m}from"./Dendrogram.stories-CEPwKKQ-.js";import"./index-DpTt3J-R.js";import"./iframe-BCeR5QkD.js";import"./index-D5nvoAmD.js";import"./index-B77L4dcM.js";import"./index-DrFu-skq.js";import"./react-redux-SPeguAgb.js";import"./index-Dcm7olAB.js";import"./gdp_dataset-DV7KFYC9.js";import"./argTypes-DuN6ki1s.js";import"./renderChart-D1szSHoV.js";import"./test-utils-C-DEfvFY.js";import"./client-CbGTh6y2.js";import"./storybook-CxwCI9RW.js";import"./index-B-3-hfbS.js";import"./index-BRXO1njn.js";import"./lodash-DOJiQ2Wu.js";import"./index-9431aKHi.js";import"./index-BAzb9S1k.js";import"./Legend-z40re8h9.js";import"./index-Dub0Swig.js";import"./index-BmYvQTbQ.js";import"./Circle-Qf3Tu8hN.js";import"./Line-BjKan0E4.js";import"./Square-CZVurtTs.js";import"./index-CvJ_dlQX.js";import"./index-B6Lr3Qa8.js";import"./index-BLxOKznu.js";import"./index-DxXlV5JW.js";import"./index-9usyF_v_.js";import"./Tooltip-aPd-LmbL.js";import"./index-CRhM32cg.js";import"./TooltipItem-OfChlkFL.js";import"./index-BBDmPaB_.js";import"./LabelsPlot-Co4tuujP.js";import"./renderCanvas-CR85T-h9.js";import"./LinksPlot-EyWHfZA0.js";import"./NodesPlot-BCoyNFhJ.js";import"./useTooltip-BlFpqfM-.js";function t(d){const n={blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...s(),...d.components};return e.jsxs(e.Fragment,{children:[e.jsx(i,{title:"Charts/Hierarchical/Dendrogram"}),`
`,e.jsx(n.h1,{id:"dendrogram-plots",children:"Dendrogram Plots"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"<Dendrogram>"})," component draws a tree of nodes from a flat dataset: ",e.jsx(n.code,{children:"categories"}),` is an ordered list
of fields, outermost group first. Every node at every level is drawn - unlike `,e.jsx(n.code,{children:"<Treemap>"}),`, which only
draws leaves - connected by links, with every leaf aligned at the same depth. It's a self-contained
chart - like `,e.jsx(n.code,{children:"<Treemap>"}),", it accepts chart-level props like ",e.jsx(n.code,{children:"data"}),"/",e.jsx(n.code,{children:"width"}),"/",e.jsx(n.code,{children:"height"}),` directly, since it
only ever has a single plot. Set `,e.jsx(n.code,{children:"radial"}),` to lay the same tree out radiating outward from the center
instead, with every leaf aligned at the same radius.`]}),`
`,e.jsx(r,{of:o}),`
`,e.jsxs(n.h2,{id:"dendrogram-component",children:[e.jsx(n.code,{children:"<Dendrogram>"})," Component"]}),`
`,e.jsx(n.h3,{id:"props",children:"Props"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Prop"}),e.jsx(n.th,{children:"Type"}),e.jsx(n.th,{children:"Default"}),e.jsx(n.th,{children:"Note"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsxs(n.strong,{children:[e.jsx(n.code,{children:"categories"}),"*"]})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"string[]"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"null"})}),e.jsx(n.td,{children:"The ordered list of fields to build each level from, outermost group first."})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsxs(n.strong,{children:[e.jsx(n.code,{children:"value"}),"*"]})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"string"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"null"})}),e.jsx(n.td,{children:"The key of the field that contains the size for each leaf, shown in its tooltip."})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"nodeRadius"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"number | [number, number]"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"4"})}),e.jsxs(n.td,{children:["The radius, in pixels, of each node's circle. Pass a ",e.jsx(n.code,{children:"[min, max]"})," tuple instead to scale each node's circle by its own value."]})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"labels"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"boolean"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"true"})}),e.jsx(n.td,{children:"Should node labels be shown?"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"sort"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"boolean"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"false"})}),e.jsx(n.td,{children:"Should the nodes be sorted by value (descending), rather than using the order of the data?"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"colors"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"string[]"})}),e.jsx(n.td,{children:"Derived from Theme"}),e.jsx(n.td,{children:"Override the colours used for each top-level category. Deeper nodes inherit their parent's colour."})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"interactive"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"boolean"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"true"})}),e.jsx(n.td,{children:"Whether the plot should be interactive. Setting this to false will disable tooltips from this plot"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"showInLegend"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"boolean"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"false"})}),e.jsx(n.td,{children:"Whether the plot should feature in the legend or not. Off by default since node labels already identify each value. Only the top-level categories appear in the legend when enabled."})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"buildHierarchy"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"function"})}),e.jsxs(n.td,{children:[e.jsx(n.code,{children:"buildHierarchy"})," from ",e.jsx(n.code,{children:"@chart-io/core"})]}),e.jsxs(n.td,{children:["Builds the hierarchy from the flat dataset. Override this if your data doesn't fit the flat, group-by-",e.jsx(n.code,{children:"categories"})," shape - see the ",e.jsx(n.code,{children:"<Treemap>"})," docs for an example."]})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"radial"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"boolean"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"false"})}),e.jsx(n.td,{children:"Lays the tree out radiating outward from the center instead of growing left-to-right, with every leaf aligned at the same radius instead of the same depth."})]})]})]}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Note"}),": Every combination of the fields listed in ",e.jsx(n.code,{children:"categories"}),` should be unique in the data. If your
data has multiple rows for the same combination, aggregate it first.`]}),`
`]}),`
`,e.jsx(n.h3,{id:"using-canvas",children:"Using Canvas"}),`
`,e.jsxs(n.p,{children:["Like other plots, a ",e.jsx(n.code,{children:"<Dendrogram>"}),` can be rendered using an HTML Canvas instead of SVG by setting
`,e.jsx(n.code,{children:"useCanvas"}),". Labels render identically in both modes."]}),`
`,e.jsx(r,{of:l}),`
`,e.jsx(n.h3,{id:"labels",children:"Labels"}),`
`,e.jsxs(n.p,{children:[`Node labels are on by default, but with deep or wide hierarchies they can get crowded and start to
overlap. Set `,e.jsx(n.code,{children:"labels={false}"})," to turn them off entirely:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`<Dendrogram categories={["continent", "country", "sector"]} value="gdp" labels={false} />
`})}),`
`,e.jsxs(n.p,{children:["Label color, font size and font family come from the theme's ",e.jsx(n.code,{children:"label"}),` section rather than the general
`,e.jsx(n.code,{children:"font"}),"/",e.jsx(n.code,{children:"axis"})," settings, so they can be styled independently:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`<Dendrogram
    categories={["continent", "country"]}
    value="gdp"
    theme={{
        ...themes.light,
        label: { color: "#555555", fontSize: 11, fontFamily: "monospace" },
    }}
/>
`})}),`
`,e.jsx(n.h3,{id:"n-level-hierarchies",children:"N-level hierarchies"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"categories"})," isn't limited to two levels - pass as many fields as your data has levels of hierarchy."]}),`
`,e.jsx(r,{of:c}),`
`,e.jsx(n.h3,{id:"sizing-nodes-by-value",children:"Sizing nodes by value"}),`
`,e.jsxs(n.p,{children:["By default every node's circle is the same fixed ",e.jsx(n.code,{children:"nodeRadius"}),". Pass a ",e.jsx(n.code,{children:"[min, max]"}),` tuple instead to
size each node's circle by its own value (summed from its descendants) - the smallest node gets `,e.jsx(n.code,{children:"min"}),`,
the largest gets `,e.jsx(n.code,{children:"max"}),", and everything in between is scaled proportionally by area:"]}),`
`,e.jsx(r,{of:a}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`<Dendrogram categories={["continent", "country"]} value="gdp" nodeRadius={[3, 24]} />
`})}),`
`,e.jsx(n.h3,{id:"zooming",children:"Zooming"}),`
`,e.jsxs(n.p,{children:["Set ",e.jsx(n.code,{children:"zoomable"}),` to let a click on a node zoom in and refocus the chart on just its subtree - the layout
re-runs framed to that node, so its descendants expand to fill the available space. Clicking the
current top-level node zooms back out one level.`]}),`
`,e.jsxs(n.p,{children:["Add ",e.jsx(n.code,{children:"breadcrumb"}),` to also show the current zoom path as a clickable trail above the chart, letting you
jump back to any ancestor level (or all the way out via "All") in one click, rather than stepping out
one level at a time:`]}),`
`,e.jsx(r,{of:h}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`<Dendrogram categories={["continent", "country", "sector"]} value="gdp" zoomable={true} breadcrumb={true} />
`})}),`
`,e.jsx(n.h3,{id:"radial-layout",children:"Radial layout"}),`
`,e.jsxs(n.p,{children:["Set ",e.jsx(n.code,{children:"radial"}),` to lay the same tree out radiating outward from the center instead, with every leaf
aligned at the same radius instead of the same depth. All the other props - `,e.jsx(n.code,{children:"categories"}),", ",e.jsx(n.code,{children:"value"}),`,
`,e.jsx(n.code,{children:"nodeRadius"}),", ",e.jsx(n.code,{children:"labels"}),", ",e.jsx(n.code,{children:"sort"}),", ",e.jsx(n.code,{children:"colors"}),", ",e.jsx(n.code,{children:"interactive"}),", ",e.jsx(n.code,{children:"showInLegend"}),", ",e.jsx(n.code,{children:"buildHierarchy"}),", ",e.jsx(n.code,{children:"zoomable"}),`
and `,e.jsx(n.code,{children:"breadcrumb"})," - mean the same thing here, just laid out radially:"]}),`
`,e.jsx(r,{of:x}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`<Dendrogram categories={["continent", "country"]} value="gdp" radial={true} />
`})}),`
`,e.jsx(n.p,{children:"Radial N-level hierarchies work the same way as the linear layout:"}),`
`,e.jsx(r,{of:j}),`
`,e.jsx(n.p,{children:"Zooming and the breadcrumb trail work identically too:"}),`
`,e.jsx(r,{of:m}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`<Dendrogram
    categories={["continent", "country", "sector"]}
    value="gdp"
    radial={true}
    zoomable={true}
    breadcrumb={true}
/>
`})})]})}function de(d={}){const{wrapper:n}={...s(),...d.components};return n?e.jsx(n,{...d,children:e.jsx(t,{...d})}):t(d)}export{de as default};
//# sourceMappingURL=Dendrogram-B12HOpcr.js.map
