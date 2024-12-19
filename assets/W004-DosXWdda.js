import{j as e}from"./jsx-runtime-DEdD30eg.js";import{useMDXComponents as t}from"./index-CcnH5Kt0.js";import{ae as o}from"./index-C07OB8Tc.js";import"./index-RYns6xqu.js";import"./iframe-D6CtwA3E.js";import"../sb-preview/runtime.js";import"./index-sbqOYYIm.js";import"./index-D-8MO0q_.js";import"./index-XRC4JhzV.js";import"./index-DrFu-skq.js";function r(i){const n={blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",p:"p",...t(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{title:"Errors & Warnings/Warnings/W004"}),`
`,e.jsx(n.h1,{id:"w004-missing-margin",children:"W004 Missing Margin"}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsx(n.p,{children:e.jsx(n.code,{children:"A margin was not provided but is required"})}),`
`]}),`
`,e.jsx(n.p,{children:"For charts to operate properly they need a margin. This warning protects against a missing margin."}),`
`,e.jsx(n.h2,{id:"cause",children:"Cause"}),`
`,e.jsxs(n.p,{children:["The margin provided to the ",e.jsx(n.code,{children:"setDimensions"})," redux action was ",e.jsx(n.code,{children:"null"})," or ",e.jsx(n.code,{children:"undefined"}),". This usually indicates that you specified an empty margin when creating an instance of the chart."]}),`
`,e.jsx(n.h2,{id:"fix",children:"Fix"}),`
`,e.jsxs(n.p,{children:["Ensure that you either leave the ",e.jsx(n.code,{children:"plotMargin"})," prop blank, or provide a correctly shaped margin object."]})]})}function j(i={}){const{wrapper:n}={...t(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(r,{...i})}):r(i)}export{j as default};
//# sourceMappingURL=W004-DosXWdda.js.map
