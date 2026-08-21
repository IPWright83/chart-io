import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{useMDXComponents as t}from"./index-D-2zTmTn.js";import{M as i}from"./index-9yemNRWz.js";import"./index-DpTt3J-R.js";import"./iframe-BCeR5QkD.js";import"./index-D5nvoAmD.js";import"./index-B77L4dcM.js";import"./index-DrFu-skq.js";function r(n){const o={blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",p:"p",...t(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(i,{title:"Errors & Warnings/Warnings/W010"}),`
`,e.jsx(o.h1,{id:"w010-words-didnt-fit",children:"W010 Words Didn't Fit"}),`
`,e.jsxs(o.blockquote,{children:[`
`,e.jsx(o.p,{children:e.jsx(o.code,{children:"${omitted} word(s) didn't fit within the available space and were omitted from the <${componentName}>."})}),`
`]}),`
`,e.jsxs(o.p,{children:["This warning indicates that a ",e.jsx(o.code,{children:"<WordCloud>"}),` couldn't find room for one or more words without overlapping
another word already placed.`]}),`
`,e.jsx(o.h2,{id:"cause",children:"Cause"}),`
`,e.jsxs(o.p,{children:[e.jsx(o.code,{children:"<WordCloud>"}),` places words - largest first - along a spiral search outward from the center, stopping
once it finds a non-overlapping spot. Once the spiral has searched the whole chart without success, the
word is dropped rather than forced to overlap another word or spill outside the plot area. This usually
happens when there are too many words for the available space, or `,e.jsx(o.code,{children:"minFontSize"}),"/",e.jsx(o.code,{children:"maxFontSize"}),` are set
too large for the chart's `,e.jsx(o.code,{children:"width"}),"/",e.jsx(o.code,{children:"height"}),"."]}),`
`,e.jsx(o.h2,{id:"fix",children:"Fix"}),`
`,e.jsxs(o.p,{children:["Widen or heighten the chart, lower ",e.jsx(o.code,{children:"minFontSize"}),"/",e.jsx(o.code,{children:"maxFontSize"}),", reduce ",e.jsx(o.code,{children:"padding"}),`, or trim the dataset
down to fewer words.`]})]})}function x(n={}){const{wrapper:o}={...t(),...n.components};return o?e.jsx(o,{...n,children:e.jsx(r,{...n})}):r(n)}export{x as default};
//# sourceMappingURL=W010-DtUNp5x3.js.map
