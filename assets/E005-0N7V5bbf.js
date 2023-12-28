import{j as e}from"./jsx-runtime-vNq4Oc-g.js";import{M as i}from"./index-foGeVojo.js";import{u as o}from"./index-Dbo06S9W.js";import"./index-4g5l5LRQ.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./iframe-5ZQv1v1p.js";import"../sb-preview/runtime.js";import"./index-jmm5gWkb.js";import"./index-GCvOZpsZ.js";import"./index-bjdz4q3G.js";import"./_baseIsEqual-ujzER7rs.js";import"./uniq-dzufyT16.js";import"./index-PPLHz8o0.js";function r(t){const n=Object.assign({h1:"h1",blockquote:"blockquote",p:"p",code:"code",h2:"h2",pre:"pre"},o(),t.components);return e.jsxs(e.Fragment,{children:[e.jsx(i,{title:"Errors & Warnings/Errors/E005"}),`
`,e.jsx(n.h1,{id:"e005-axis-requires-at-least-one-field",children:"E005 Axis requires at least one field"}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsx(n.p,{children:e.jsx(n.code,{children:"Unable to render an Axis without a field. Ensure that you have provided at least one field in the 'fields' prop"})}),`
`]}),`
`,e.jsx(n.h2,{id:"cause",children:"Cause"}),`
`,e.jsxs(n.p,{children:["To render an ",e.jsx(n.code,{children:"<Axis>"})," a field that keys into the data is required. This is needed to allow a scale to be calculated so the data range can be converted to screen co-ordinates. It appears that no field was provided."]}),`
`,e.jsx(n.h2,{id:"fix",children:"Fix"}),`
`,e.jsxs(n.p,{children:["Supply one or more fields as either a string or string array, that refer to values in your data objects. For example in the following data ",e.jsx(n.code,{children:"x"})," or ",e.jsx(n.code,{children:"y"})," could be used:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`[
    { x: 1, y: 1 },
    { x: 2, y: 2 },
    { x: 3, y: 3 },
    { x: 4, y: 4 },
    { x: 5, y: 5 },
]
`})})]})}function b(t={}){const{wrapper:n}=Object.assign({},o(),t.components);return n?e.jsx(n,Object.assign({},t,{children:e.jsx(r,t)})):r(t)}export{b as default};
//# sourceMappingURL=E005-0N7V5bbf.js.map
