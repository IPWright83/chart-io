import{j as e}from"./jsx-runtime-DEdD30eg.js";import{useMDXComponents as i}from"./index-CcnH5Kt0.js";import{ae as a}from"./index-C07OB8Tc.js";import"./index-RYns6xqu.js";import"./iframe-D6CtwA3E.js";import"../sb-preview/runtime.js";import"./index-sbqOYYIm.js";import"./index-D-8MO0q_.js";import"./index-XRC4JhzV.js";import"./index-DrFu-skq.js";function r(n){const t={blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",p:"p",...i(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{title:"Errors & Warnings/Warnings/W002"}),`
`,e.jsx(t.h1,{id:"w002-duplicate-values",children:"W002 Duplicate Values"}),`
`,e.jsxs(t.blockquote,{children:[`
`,e.jsx(t.p,{children:e.jsx(t.code,{children:"There are duplicate values in the ${field} field. This may cause rendering artifacts with a <${componentName}>."})}),`
`]}),`
`,e.jsx(t.p,{children:"This warning indicates that there were unexpected duplicate values along an axis (within the same series). For some charts this is perfectly acceptable (such as a Scatter where more than 1 point can share the same x value). However for many charts such as Line or Column charts, this could lead to a rendering artifiact where you attempt to render 2 items at that same point."}),`
`,e.jsx(t.h2,{id:"cause",children:"Cause"}),`
`,e.jsxs(t.p,{children:["Within the field mentioned there were duplicate values (e.g. multiple x values of 5 - ",e.jsx(t.code,{children:"{ x: 5, y: 2 }, { x: 5, y: 3 }"}),") which the plot selected can not support."]}),`
`,e.jsx(t.h2,{id:"fix",children:"Fix"}),`
`,e.jsx(t.p,{children:"Choose a different plot type, or filter out the duplicate records from the dataset."})]})}function f(n={}){const{wrapper:t}={...i(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(r,{...n})}):r(n)}export{f as default};
//# sourceMappingURL=W002-BQZaGFSA.js.map