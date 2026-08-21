import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{useMDXComponents as a}from"./index-D-2zTmTn.js";import{M as c,C as r}from"./index-9yemNRWz.js";import{OneLevel as d,NestedLevels as i,FullyZoomedOut as s}from"./ZoomBreadcrumb.stories-DwygStJ0.js";import"./index-DpTt3J-R.js";import"./iframe-BCeR5QkD.js";import"./index-D5nvoAmD.js";import"./index-B77L4dcM.js";import"./index-DrFu-skq.js";import"./react-redux-SPeguAgb.js";import"./index-BBDmPaB_.js";import"./renderChart-D1szSHoV.js";import"./test-utils-C-DEfvFY.js";import"./client-CbGTh6y2.js";import"./index-Dcm7olAB.js";function t(n){const o={code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...a(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(c,{title:"Components/ZoomBreadcrumb"}),`
`,e.jsx(o.h1,{id:"zoombreadcrumb-component",children:"ZoomBreadcrumb Component"}),`
`,e.jsxs(o.p,{children:["The ",e.jsx(o.code,{children:"<ZoomBreadcrumb>"}),` component displays the current zoom path of a zoomable hierarchical plot (e.g.
`,e.jsx(o.code,{children:"<StackedDonut zoomable>"}),", ",e.jsx(o.code,{children:"<Treemap zoomable>"}),", ",e.jsx(o.code,{children:"<Dendrogram zoomable>"}),`) as a clickable trail, letting
you jump back to any ancestor level - or all the way out via "All" - in one click. It renders nothing
while fully zoomed out.`]}),`
`,e.jsx(r,{of:d}),`
`,e.jsx(o.h2,{id:"usage",children:"Usage"}),`
`,e.jsxs(o.p,{children:[e.jsx(o.code,{children:"<ZoomBreadcrumb>"})," isn't added directly - pass ",e.jsx(o.code,{children:"breadcrumb"})," to ",e.jsx(o.code,{children:"<RadialChart>"})," (or ",e.jsx(o.code,{children:"<XYChart>"}),`, for
`,e.jsx(o.code,{children:"<Treemap>"}),"/",e.jsx(o.code,{children:"<Dendrogram>"}),`) and it's rendered for you, reading the same zoom state the plot itself
writes to when a slice/cell/node is clicked:`]}),`
`,e.jsx(o.pre,{children:e.jsx(o.code,{className:"language-jsx",children:`<RadialChart breadcrumb={true}>
    <StackedDonut categories={["continent", "country", "sector"]} value="gdp" />
</RadialChart>
`})}),`
`,e.jsx(r,{of:i}),`
`,e.jsx(o.h2,{id:"fully-zoomed-out",children:"Fully Zoomed Out"}),`
`,e.jsxs(o.p,{children:["With an empty zoom path there's nothing to navigate back to, so ",e.jsx(o.code,{children:"<ZoomBreadcrumb>"}),` renders nothing at
all rather than an empty trail.`]}),`
`,e.jsx(r,{of:s})]})}function D(n={}){const{wrapper:o}={...a(),...n.components};return o?e.jsx(o,{...n,children:e.jsx(t,{...n})}):t(n)}export{D as default};
//# sourceMappingURL=ZoomBreadcrumb-DLhqBmH8.js.map
