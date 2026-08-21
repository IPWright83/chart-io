import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{useMDXComponents as a}from"./index-D-2zTmTn.js";import{M as s}from"./index-9yemNRWz.js";import"./index-DpTt3J-R.js";import"./iframe-BCeR5QkD.js";import"./index-D5nvoAmD.js";import"./index-B77L4dcM.js";import"./index-DrFu-skq.js";function r(t){const n={blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",p:"p",...a(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"Errors & Warnings/Warnings/W009"}),`
`,e.jsx(n.h1,{id:"w009-negative-values-not-supported",children:"W009 Negative Values Not Supported"}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsx(n.p,{children:e.jsx(n.code,{children:"Negative values in the ${value} field aren't supported by <${componentName}> and have been treated as 0."})}),`
`]}),`
`,e.jsxs(n.p,{children:[`This warning indicates that the dataset contains one or more negative values in the field used for a
chart's `,e.jsx(n.code,{children:"value"}),"."]}),`
`,e.jsx(n.h2,{id:"cause",children:"Cause"}),`
`,e.jsxs(n.p,{children:[`Some charts size each element using an angular span, a rectangle's area, a font-size, or similar - none
of which can represent a negative size. This includes hierarchical charts (e.g. `,e.jsx(n.code,{children:"<StackedDonut>"}),`,
`,e.jsx(n.code,{children:"<Treemap>"}),", ",e.jsx(n.code,{children:"<CirclePacking>"}),", and others built on the same shared hierarchy) as well as ",e.jsx(n.code,{children:"<WordCloud>"}),`.
Negative values are treated as `,e.jsx(n.code,{children:"0"}),` so the chart still renders, rather than producing a broken or
degenerate layout.`]}),`
`,e.jsx(n.h2,{id:"fix",children:"Fix"}),`
`,e.jsxs(n.p,{children:["Filter out or clamp negative values in your dataset before passing it to the chart, if the ",e.jsx(n.code,{children:"0"}),`
treatment doesn't already give you the result you want.`]})]})}function m(t={}){const{wrapper:n}={...a(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(r,{...t})}):r(t)}export{m as default};
//# sourceMappingURL=W009-C2rQS_yZ.js.map
