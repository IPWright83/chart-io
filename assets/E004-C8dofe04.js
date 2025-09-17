import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{useMDXComponents as n}from"./index-D-2zTmTn.js";import{M as s}from"./index-Dw1MpZ3G.js";import"./index-DpTt3J-R.js";import"./iframe-Bho3GZXG.js";import"./index-D5nvoAmD.js";import"./index-B77L4dcM.js";import"./index-DrFu-skq.js";function r(o){const t={blockquote:"blockquote",br:"br",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",ul:"ul",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"Errors & Warnings/Errors/E004"}),`
`,e.jsx(t.h1,{id:"e004-multiple-plots-must-be-stacked-or-grouped",children:"E004 Multiple Plots must be Stacked or Grouped"}),`
`,e.jsxs(t.blockquote,{children:[`
`,e.jsxs(t.p,{children:[e.jsx(t.code,{children:"Multiple Bar plots must be either stacked or grouped"}),e.jsx(t.br,{}),`
`,e.jsx(t.code,{children:"Multiple Column plots must be either stacked or grouped"})]}),`
`]}),`
`,e.jsx(t.h2,{id:"cause",children:"Cause"}),`
`,e.jsx(t.p,{children:`When multiple plots are created for a bar on column chart they must be either stacked or grouped otherwise they would
render on top of each other.`}),`
`,e.jsx(t.h2,{id:"fix",children:"Fix"}),`
`,e.jsx(t.p,{children:"Decide whether you want to apply:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"Stacking (bars/columns) sit on top of each other"}),`
`,e.jsx(t.li,{children:"Grouping (bars/columns) sit side by side"}),`
`]}),`
`,e.jsxs(t.p,{children:["Then set either the ",e.jsx(t.code,{children:"grouped"})," or ",e.jsx(t.code,{children:"stacked"})," option to ",e.jsx(t.code,{children:"true"}),"."]})]})}function m(o={}){const{wrapper:t}={...n(),...o.components};return t?e.jsx(t,{...o,children:e.jsx(r,{...o})}):r(o)}export{m as default};
//# sourceMappingURL=E004-C8dofe04.js.map
