import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{useMDXComponents as o}from"./index-D-2zTmTn.js";import{M as s}from"./index-Dw1MpZ3G.js";import"./index-DpTt3J-R.js";import"./iframe-Bho3GZXG.js";import"./index-D5nvoAmD.js";import"./index-B77L4dcM.js";import"./index-DrFu-skq.js";function t(r){const n={blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...o(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"Errors & Warnings/Errors/E005"}),`
`,e.jsx(n.h1,{id:"e005-axis-requires-at-least-one-field",children:"E005 Axis requires at least one field"}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsx(n.p,{children:e.jsx(n.code,{children:"Unable to render an Axis without a field. Ensure that you have provided at least one field in the 'fields' prop"})}),`
`]}),`
`,e.jsx(n.h2,{id:"cause",children:"Cause"}),`
`,e.jsxs(n.p,{children:["To render an ",e.jsx(n.code,{children:"<Axis>"})," a field that keys into the data is required. This is needed to allow a scale to be calculated so the data range can be converted to screen co-ordinates. It appears that no field was provided."]}),`
`,e.jsx(n.h2,{id:"fix",children:"Fix"}),`
`,e.jsxs(n.p,{children:["Supply one or more fields as either a string or string array, that refer to values in your data objects. For example in the following data ",e.jsx(n.code,{children:"x"})," or ",e.jsx(n.code,{children:"y"})," could be used:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-javascript",children:`[
    { x: 1, y: 1 },
    { x: 2, y: 2 },
    { x: 3, y: 3 },
    { x: 4, y: 4 },
    { x: 5, y: 5 },
]
`})})]})}function u(r={}){const{wrapper:n}={...o(),...r.components};return n?e.jsx(n,{...r,children:e.jsx(t,{...r})}):t(r)}export{u as default};
//# sourceMappingURL=E005-feP14-2Q.js.map
