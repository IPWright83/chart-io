import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{useMDXComponents as i}from"./index-D-2zTmTn.js";import{M as r}from"./index-Dw1MpZ3G.js";import"./index-DpTt3J-R.js";import"./iframe-Bho3GZXG.js";import"./index-D5nvoAmD.js";import"./index-B77L4dcM.js";import"./index-DrFu-skq.js";function s(o){const n={blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",ul:"ul",...i(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{title:"Errors & Warnings/Errors/E007"}),`
`,e.jsx(n.h1,{id:"e007-unkown-scale-type",children:"E007 Unkown Scale Type"}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsx(n.p,{children:e.jsx(n.code,{children:"Unknown scale type: ${scaleType}"})}),`
`]}),`
`,e.jsx(n.h2,{id:"cause",children:"Cause"}),`
`,e.jsx(n.p,{children:"Only a subset of d3 scale types are currently supported, and the one provided is not in the list of supported scale types"}),`
`,e.jsx(n.h2,{id:"fix",children:"Fix"}),`
`,e.jsxs(n.p,{children:["Change the scaleType you have provided to your ",e.jsx(n.code,{children:"<AutoScale>"})," or ",e.jsx(n.code,{children:"<XAxis>|<YAxis>"})," component to one of:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"band"}),`
`,e.jsx(n.li,{children:"point"}),`
`,e.jsx(n.li,{children:"power"}),`
`,e.jsx(n.li,{children:"linear"}),`
`,e.jsx(n.li,{children:"time"}),`
`,e.jsx(n.li,{children:"log"}),`
`]}),`
`,e.jsxs(n.p,{children:["Alternatively you can define your own scale, and use ",e.jsx(n.code,{children:"<Axis>"})," instead."]})]})}function u(o={}){const{wrapper:n}={...i(),...o.components};return n?e.jsx(n,{...o,children:e.jsx(s,{...o})}):s(o)}export{u as default};
//# sourceMappingURL=E007-4eVa2mT-.js.map
