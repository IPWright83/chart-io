import{j as n}from"./jsx-runtime-BjG_zV1W.js";import{useMDXComponents as t}from"./index-D-2zTmTn.js";import{M as o}from"./index-Dw1MpZ3G.js";import"./index-DpTt3J-R.js";import"./iframe-Bho3GZXG.js";import"./index-D5nvoAmD.js";import"./index-B77L4dcM.js";import"./index-DrFu-skq.js";function r(i){const e={blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",p:"p",...t(),...i.components};return n.jsxs(n.Fragment,{children:[n.jsx(o,{title:"Errors & Warnings/Warnings/W004"}),`
`,n.jsx(e.h1,{id:"w004-missing-margin",children:"W004 Missing Margin"}),`
`,n.jsxs(e.blockquote,{children:[`
`,n.jsx(e.p,{children:n.jsx(e.code,{children:"A margin was not provided but is required"})}),`
`]}),`
`,n.jsx(e.p,{children:"For charts to operate properly they need a margin. This warning protects against a missing margin."}),`
`,n.jsx(e.h2,{id:"cause",children:"Cause"}),`
`,n.jsxs(e.p,{children:["The margin provided to the ",n.jsx(e.code,{children:"setDimensions"})," redux action was ",n.jsx(e.code,{children:"null"})," or ",n.jsx(e.code,{children:"undefined"}),". This usually indicates that you specified an empty margin when creating an instance of the chart."]}),`
`,n.jsx(e.h2,{id:"fix",children:"Fix"}),`
`,n.jsxs(e.p,{children:["Ensure that you either leave the ",n.jsx(e.code,{children:"plotMargin"})," prop blank, or provide a correctly shaped margin object."]})]})}function x(i={}){const{wrapper:e}={...t(),...i.components};return e?n.jsx(e,{...i,children:n.jsx(r,{...i})}):r(i)}export{x as default};
//# sourceMappingURL=W004-DFghdWLb.js.map
