import{j as e}from"./jsx-runtime-vNq4Oc-g.js";import{M as s}from"./index-foGeVojo.js";import{u as r}from"./index-Dbo06S9W.js";import"./index-4g5l5LRQ.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./iframe-5ZQv1v1p.js";import"../sb-preview/runtime.js";import"./index-jmm5gWkb.js";import"./index-GCvOZpsZ.js";import"./index-bjdz4q3G.js";import"./_baseIsEqual-ujzER7rs.js";import"./uniq-dzufyT16.js";import"./index-PPLHz8o0.js";function n(o){const t=Object.assign({h1:"h1",blockquote:"blockquote",p:"p",code:"code",br:"br",h2:"h2",ul:"ul",li:"li"},r(),o.components);return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"Errors & Warnings/Errors/E003"}),`
`,e.jsx(t.h1,{id:"e003-stacked--grouped-not-supported",children:"E003 Stacked & Grouped not supported"}),`
`,e.jsxs(t.blockquote,{children:[`
`,e.jsxs(t.p,{children:[e.jsx(t.code,{children:"Bar plots do not support both being stacked and grouped"}),e.jsx(t.br,{}),`
`,e.jsx(t.code,{children:"Column plots do not support both being stacked and grouped"})]}),`
`]}),`
`,e.jsx(t.h2,{id:"cause",children:"Cause"}),`
`,e.jsx(t.p,{children:"When multiple plots are created for a bar on column chart they can be either stacked or grouped. @chart-io does not support both of these options being set at the same time."}),`
`,e.jsx(t.h2,{id:"fix",children:"Fix"}),`
`,e.jsx(t.p,{children:"Decide whether you want to apply:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"Stacking (bars/columns) sit on top of each other"}),`
`,e.jsx(t.li,{children:"Grouping (bars/columns) sit side by side"}),`
`]}),`
`,e.jsxs(t.p,{children:["Then set either the ",e.jsx(t.code,{children:"grouped"})," or ",e.jsx(t.code,{children:"stacked"})," option to ",e.jsx(t.code,{children:"true"}),", but not both options at the same time."]})]})}function f(o={}){const{wrapper:t}=Object.assign({},r(),o.components);return t?e.jsx(t,Object.assign({},o,{children:e.jsx(n,o)})):n(o)}export{f as default};
//# sourceMappingURL=E003-bj4dd5ad.js.map
