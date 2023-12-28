import{j as e}from"./jsx-runtime-vNq4Oc-g.js";import{M as s}from"./index-foGeVojo.js";import{u as r}from"./index-Dbo06S9W.js";import"./index-4g5l5LRQ.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./iframe-5ZQv1v1p.js";import"../sb-preview/runtime.js";import"./index-jmm5gWkb.js";import"./index-GCvOZpsZ.js";import"./index-bjdz4q3G.js";import"./_baseIsEqual-ujzER7rs.js";import"./uniq-dzufyT16.js";import"./index-PPLHz8o0.js";function n(i){const t=Object.assign({h1:"h1",blockquote:"blockquote",p:"p",code:"code",h2:"h2"},r(),i.components);return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"Errors & Warnings/Warnings/W002"}),`
`,e.jsx(t.h1,{id:"w002-duplicate-values",children:"W002 Duplicate Values"}),`
`,e.jsxs(t.blockquote,{children:[`
`,e.jsx(t.p,{children:e.jsx(t.code,{children:"There are duplicate values in the ${field} field. This may cause rendering artifacts with a <${componentName}>."})}),`
`]}),`
`,e.jsx(t.p,{children:"This warning indicates that there were unexpected duplicate values along an axis (within the same series). For some charts this is perfectly acceptable (such as a Scatter where more than 1 point can share the same x value). However for many charts such as Line or Column charts, this could lead to a rendering artifiact where you attempt to render 2 items at that same point."}),`
`,e.jsx(t.h2,{id:"cause",children:"Cause"}),`
`,e.jsxs(t.p,{children:["Within the field mentioned there were duplicate values (e.g. multiple x values of 5 - ",e.jsx(t.code,{children:"{ x: 5, y: 2 }, { x: 5, y: 3 }"}),") which the plot selected can not support."]}),`
`,e.jsx(t.h2,{id:"fix",children:"Fix"}),`
`,e.jsx(t.p,{children:"Choose a different plot type, or filter out the duplicate records from the dataset."})]})}function w(i={}){const{wrapper:t}=Object.assign({},r(),i.components);return t?e.jsx(t,Object.assign({},i,{children:e.jsx(n,i)})):n(i)}export{w as default};
//# sourceMappingURL=W002-9b94Skhp.js.map
