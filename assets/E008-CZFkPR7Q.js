import{j as e}from"./jsx-runtime-DEdD30eg.js";import{useMDXComponents as o}from"./index-CcnH5Kt0.js";import{ae as s}from"./index-C07OB8Tc.js";import"./index-RYns6xqu.js";import"./iframe-D6CtwA3E.js";import"../sb-preview/runtime.js";import"./index-sbqOYYIm.js";import"./index-D-8MO0q_.js";import"./index-XRC4JhzV.js";import"./index-DrFu-skq.js";function i(t){const n={blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",p:"p",...o(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"Errors & Warnings/Errors/E008"}),`
`,e.jsx(n.h1,{id:"e008-redux-link-stores-called-multiple-times",children:"E008 Redux Link Stores called multiple times"}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsx(n.p,{children:e.jsx(n.code,{children:"The linkStores() function can strictly only be called once during initialisation"})}),`
`]}),`
`,e.jsx(n.h2,{id:"cause",children:"Cause"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"linkStores"})," function used to link chart events together must only be called once during the initialisation of your page. In this instance it was called multiple times"]}),`
`,e.jsx(n.h2,{id:"fix",children:"Fix"}),`
`,e.jsxs(n.p,{children:["Ensure you only call the ",e.jsx(n.code,{children:"linkStores()"})," function once, if necessary delaying this call until all the stores are available."]})]})}function j(t={}){const{wrapper:n}={...o(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(i,{...t})}):i(t)}export{j as default};
//# sourceMappingURL=E008-CZFkPR7Q.js.map
