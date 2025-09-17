import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{useMDXComponents as r}from"./index-D-2zTmTn.js";import{M as s}from"./index-Dw1MpZ3G.js";import"./index-DpTt3J-R.js";import"./iframe-Bho3GZXG.js";import"./index-D5nvoAmD.js";import"./index-B77L4dcM.js";import"./index-DrFu-skq.js";function n(t){const o={blockquote:"blockquote",br:"br",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",ul:"ul",...r(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"Errors & Warnings/Errors/E003"}),`
`,e.jsx(o.h1,{id:"e003-stacked--grouped-not-supported",children:"E003 Stacked & Grouped not supported"}),`
`,e.jsxs(o.blockquote,{children:[`
`,e.jsxs(o.p,{children:[e.jsx(o.code,{children:"Bar plots do not support both being stacked and grouped"}),e.jsx(o.br,{}),`
`,e.jsx(o.code,{children:"Column plots do not support both being stacked and grouped"})]}),`
`]}),`
`,e.jsx(o.h2,{id:"cause",children:"Cause"}),`
`,e.jsx(o.p,{children:"When multiple plots are created for a bar on column chart they can be either stacked or grouped. @chart-io does not support both of these options being set at the same time."}),`
`,e.jsx(o.h2,{id:"fix",children:"Fix"}),`
`,e.jsx(o.p,{children:"Decide whether you want to apply:"}),`
`,e.jsxs(o.ul,{children:[`
`,e.jsx(o.li,{children:"Stacking (bars/columns) sit on top of each other"}),`
`,e.jsx(o.li,{children:"Grouping (bars/columns) sit side by side"}),`
`]}),`
`,e.jsxs(o.p,{children:["Then set either the ",e.jsx(o.code,{children:"grouped"})," or ",e.jsx(o.code,{children:"stacked"})," option to ",e.jsx(o.code,{children:"true"}),", but not both options at the same time."]})]})}function x(t={}){const{wrapper:o}={...r(),...t.components};return o?e.jsx(o,{...t,children:e.jsx(n,{...t})}):n(t)}export{x as default};
//# sourceMappingURL=E003-BT6cTFSW.js.map
