import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{useMDXComponents as i}from"./index-D-2zTmTn.js";import{M as a,C as t}from"./index-9yemNRWz.js";import{HoveredItem as d,ZoomedNoHover as s,ZoomedAndHovered as l,Empty as c}from"./CenterValueOverlay.stories-CUDlEGPi.js";import"./index-DpTt3J-R.js";import"./iframe-BCeR5QkD.js";import"./index-D5nvoAmD.js";import"./index-B77L4dcM.js";import"./index-DrFu-skq.js";import"./react-redux-SPeguAgb.js";import"./index-B6Lr3Qa8.js";import"./renderChart-D1szSHoV.js";import"./test-utils-C-DEfvFY.js";import"./client-CbGTh6y2.js";import"./index-Dcm7olAB.js";function r(n){const o={code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...i(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{title:"Components/CenterValueOverlay"}),`
`,e.jsx(o.h1,{id:"centervalueoverlay-component",children:"CenterValueOverlay Component"}),`
`,e.jsxs(o.p,{children:["The ",e.jsx(o.code,{children:"<CenterValueOverlay>"}),` component displays the hovered slice's name/value in the center of a
`,e.jsx(o.code,{children:"<Donut>"})," or ",e.jsx(o.code,{children:"<StackedDonut>"}),`'s hole, as an alternative to a floating Tooltip - useful for deep
hierarchies, where a floating tooltip can obscure the chart.`]}),`
`,e.jsx(t,{of:d}),`
`,e.jsx(o.h2,{id:"usage",children:"Usage"}),`
`,e.jsxs(o.p,{children:[e.jsx(o.code,{children:"<CenterValueOverlay>"})," isn't added directly - ",e.jsx(o.code,{children:"<RadialChart>"}),` renders it automatically whenever a
`,e.jsx(o.code,{children:"<Donut>"})," or ",e.jsx(o.code,{children:"<StackedDonut>"})," child is present (or ",e.jsx(o.code,{children:"centerValue"})," is explicitly set to ",e.jsx(o.code,{children:"true"}),`), reading
the same hover state the plot itself writes to on mouseover/mouseout:`]}),`
`,e.jsx(o.pre,{children:e.jsx(o.code,{className:"language-jsx",children:`<RadialChart>
    <Donut category="continent" value="gdp" />
</RadialChart>
`})}),`
`,e.jsxs(o.p,{children:["Set ",e.jsx(o.code,{children:"centerValue={false}"})," on ",e.jsx(o.code,{children:"<RadialChart>"})," to opt back into a traditional floating Tooltip instead."]}),`
`,e.jsx(o.h2,{id:"zoomed-in-nothing-hovered",children:"Zoomed In, Nothing Hovered"}),`
`,e.jsxs(o.p,{children:["For a zoomable ",e.jsx(o.code,{children:"<StackedDonut>"}),`, while zoomed in and nothing's hovered, the overlay shows the name of
the currently focused node instead of nothing:`]}),`
`,e.jsx(t,{of:s}),`
`,e.jsx(o.p,{children:"Hovering a slice still takes priority over the zoomed name:"}),`
`,e.jsx(t,{of:l}),`
`,e.jsx(o.h2,{id:"nothing-hovered-not-zoomed",children:"Nothing Hovered, Not Zoomed"}),`
`,e.jsx(o.p,{children:"With nothing hovered and no zoom in effect, the overlay renders nothing at all."}),`
`,e.jsx(t,{of:c})]})}function M(n={}){const{wrapper:o}={...i(),...n.components};return o?e.jsx(o,{...n,children:e.jsx(r,{...n})}):r(n)}export{M as default};
//# sourceMappingURL=CenterValueOverlay-5YUACOJ5.js.map
