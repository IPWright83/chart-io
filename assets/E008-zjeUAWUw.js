import{j as e}from"./jsx-runtime-vNq4Oc-g.js";import{M as s}from"./index-foGeVojo.js";import{u as o}from"./index-Dbo06S9W.js";import"./index-4g5l5LRQ.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./iframe-5ZQv1v1p.js";import"../sb-preview/runtime.js";import"./index-jmm5gWkb.js";import"./index-GCvOZpsZ.js";import"./index-bjdz4q3G.js";import"./_baseIsEqual-ujzER7rs.js";import"./uniq-dzufyT16.js";import"./index-PPLHz8o0.js";function i(t){const n=Object.assign({h1:"h1",blockquote:"blockquote",p:"p",code:"code",h2:"h2"},o(),t.components);return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"Errors & Warnings/Errors/E008"}),`
`,e.jsx(n.h1,{id:"e008-redux-link-stores-called-multiple-times",children:"E008 Redux Link Stores called multiple times"}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsx(n.p,{children:e.jsx(n.code,{children:"The linkStores() function can strictly only be called once during initialisation"})}),`
`]}),`
`,e.jsx(n.h2,{id:"cause",children:"Cause"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"linkStores"})," function used to link chart events together must only be called once during the initialisation of your page. In this instance it was called multiple times"]}),`
`,e.jsx(n.h2,{id:"fix",children:"Fix"}),`
`,e.jsxs(n.p,{children:["Ensure you only call the ",e.jsx(n.code,{children:"linkStores()"})," function once, if necessary delaying this call until all the stores are available."]})]})}function b(t={}){const{wrapper:n}=Object.assign({},o(),t.components);return n?e.jsx(n,Object.assign({},t,{children:e.jsx(i,t)})):i(t)}export{b as default};
//# sourceMappingURL=E008-zjeUAWUw.js.map
