import{j as t}from"./jsx-runtime-vNq4Oc-g.js";import{M as i}from"./index-foGeVojo.js";import{u as s}from"./index-Dbo06S9W.js";import"./index-4g5l5LRQ.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./iframe-5ZQv1v1p.js";import"../sb-preview/runtime.js";import"./index-jmm5gWkb.js";import"./index-GCvOZpsZ.js";import"./index-bjdz4q3G.js";import"./_baseIsEqual-ujzER7rs.js";import"./uniq-dzufyT16.js";import"./index-PPLHz8o0.js";function n(o){const e=Object.assign({h1:"h1",blockquote:"blockquote",p:"p",code:"code",h2:"h2"},s(),o.components);return t.jsxs(t.Fragment,{children:[t.jsx(i,{title:"Errors & Warnings/Warnings/W007"}),`
`,t.jsx(e.h1,{id:"w007-incompatible-scale",children:"W007 Incompatible Scale"}),`
`,t.jsxs(e.blockquote,{children:[`
`,t.jsx(e.p,{children:t.jsx(e.code,{children:"An incompatible scale was used with a <HorizontalBrush>"})}),`
`]}),`
`,t.jsxs(e.p,{children:["This warning indicates that a brush was being used, but the scale associated with it does not support the ",t.jsx(e.code,{children:".invert()"})," function, which is required to translate from screen coordinates back to data coordinates."]}),`
`,t.jsx(e.h2,{id:"cause",children:"Cause"}),`
`,t.jsx(e.p,{children:"The cause of this is usually that you're trying to include a brush for zooming, with a type of plot that doesn't support it."}),`
`,t.jsx(e.h2,{id:"fix",children:"Fix"}),`
`,t.jsxs(e.p,{children:["Remove the ",t.jsx(e.code,{children:"<Brush>"})," component or swap out the plots that you are using to ones which support brushes."]})]})}function g(o={}){const{wrapper:e}=Object.assign({},s(),o.components);return e?t.jsx(e,Object.assign({},o,{children:t.jsx(n,o)})):n(o)}export{g as default};
//# sourceMappingURL=W007-lcy6Sw5j.js.map
