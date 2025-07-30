import{j as t}from"./jsx-runtime-CB_V9I5Y.js";import{useMDXComponents as s}from"./index-DSkyVWTJ.js";import{M as i}from"./index-DXysM4eg.js";import"./index-CTjT7uj6.js";import"./iframe-drV2x4lN.js";import"./index-Cywu29Xx.js";import"./index-DiMW2NzS.js";import"./index-DrFu-skq.js";function n(o){const e={blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",p:"p",...s(),...o.components};return t.jsxs(t.Fragment,{children:[t.jsx(i,{title:"Errors & Warnings/Warnings/W007"}),`
`,t.jsx(e.h1,{id:"w007-incompatible-scale",children:"W007 Incompatible Scale"}),`
`,t.jsxs(e.blockquote,{children:[`
`,t.jsx(e.p,{children:t.jsx(e.code,{children:"An incompatible scale was used with a <HorizontalBrush>"})}),`
`]}),`
`,t.jsxs(e.p,{children:["This warning indicates that a brush was being used, but the scale associated with it does not support the ",t.jsx(e.code,{children:".invert()"})," function, which is required to translate from screen coordinates back to data coordinates."]}),`
`,t.jsx(e.h2,{id:"cause",children:"Cause"}),`
`,t.jsx(e.p,{children:"The cause of this is usually that you're trying to include a brush for zooming, with a type of plot that doesn't support it."}),`
`,t.jsx(e.h2,{id:"fix",children:"Fix"}),`
`,t.jsxs(e.p,{children:["Remove the ",t.jsx(e.code,{children:"<Brush>"})," component or swap out the plots that you are using to ones which support brushes."]})]})}function m(o={}){const{wrapper:e}={...s(),...o.components};return e?t.jsx(e,{...o,children:t.jsx(n,{...o})}):n(o)}export{m as default};
//# sourceMappingURL=W007-CxjCB24R.js.map
