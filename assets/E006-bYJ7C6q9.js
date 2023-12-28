import{j as e}from"./jsx-runtime-vNq4Oc-g.js";import{M as i}from"./index-foGeVojo.js";import{u as o}from"./index-Dbo06S9W.js";import"./index-4g5l5LRQ.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./iframe-5ZQv1v1p.js";import"../sb-preview/runtime.js";import"./index-jmm5gWkb.js";import"./index-GCvOZpsZ.js";import"./index-bjdz4q3G.js";import"./_baseIsEqual-ujzER7rs.js";import"./uniq-dzufyT16.js";import"./index-PPLHz8o0.js";function r(n){const t=Object.assign({h1:"h1",blockquote:"blockquote",p:"p",code:"code",h2:"h2",pre:"pre"},o(),n.components);return e.jsxs(e.Fragment,{children:[e.jsx(i,{title:"Errors & Warnings/Errors/E006"}),`
`,e.jsx(t.h1,{id:"e006-scale-requires-at-least-one-field",children:"E006 Scale requires at least one field"}),`
`,e.jsxs(t.blockquote,{children:[`
`,e.jsx(t.p,{children:e.jsx(t.code,{children:"Unable to create a Scale without a field. Ensure that you have provided at least one field in the 'fields' prop"})}),`
`]}),`
`,e.jsx(t.h2,{id:"cause",children:"Cause"}),`
`,e.jsxs(t.p,{children:["To render a ",e.jsx(t.code,{children:"<Scale>"})," a field that keys into the data is required. This is needed to allow a scale to be calculated so the data range can be converted to screen co-ordinates. It appears that no field was provided."]}),`
`,e.jsx(t.h2,{id:"fix",children:"Fix"}),`
`,e.jsxs(t.p,{children:["Supply one or more fields as either a string or string array, that refer to values in your data objects. For example in the following data ",e.jsx(t.code,{children:"x"})," or ",e.jsx(t.code,{children:"y"})," could be used:"]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{children:`[
    { x: 1, y: 1 },
    { x: 2, y: 2 },
    { x: 3, y: 3 },
    { x: 4, y: 4 },
    { x: 5, y: 5 },
]
`})})]})}function b(n={}){const{wrapper:t}=Object.assign({},o(),n.components);return t?e.jsx(t,Object.assign({},n,{children:e.jsx(r,n)})):r(n)}export{b as default};
//# sourceMappingURL=E006-bYJ7C6q9.js.map
