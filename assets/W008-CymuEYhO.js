import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{useMDXComponents as i}from"./index-D-2zTmTn.js";import{M as r}from"./index-9yemNRWz.js";import"./index-DpTt3J-R.js";import"./iframe-BCeR5QkD.js";import"./index-D5nvoAmD.js";import"./index-B77L4dcM.js";import"./index-DrFu-skq.js";function o(t){const n={blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",p:"p",...i(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{title:"Errors & Warnings/Warnings/W008"}),`
`,e.jsx(n.h1,{id:"w008-duplicate-category-combination",children:"W008 Duplicate Category Combination"}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsx(n.p,{children:e.jsx(n.code,{children:"There are duplicate combinations of the ${fields} fields. This may cause rendering artifacts with a <${componentName}>."})}),`
`]}),`
`,e.jsxs(n.p,{children:["This warning indicates that the same combination of the fields listed in ",e.jsx(n.code,{children:"categories"})," (one per ring, from the innermost ring outward) appears more than once in the dataset."]}),`
`,e.jsx(n.h2,{id:"cause",children:"Cause"}),`
`,e.jsxs(n.p,{children:["A ",e.jsx(n.code,{children:"<StackedDonut>"})," expects at most one row per unique combination of the ",e.jsx(n.code,{children:"categories"})," fields, since each combination maps to a single slice on the outermost ring."]}),`
`,e.jsx(n.h2,{id:"fix",children:"Fix"}),`
`,e.jsxs(n.p,{children:["Aggregate your data so that there is only one row per ",e.jsx(n.code,{children:"categories"})," combination before passing it to the chart."]})]})}function x(t={}){const{wrapper:n}={...i(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(o,{...t})}):o(t)}export{x as default};
//# sourceMappingURL=W008-CymuEYhO.js.map
