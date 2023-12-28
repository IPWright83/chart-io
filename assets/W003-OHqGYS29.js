import{j as e}from"./jsx-runtime-vNq4Oc-g.js";import{M as r}from"./index-foGeVojo.js";import{u as i}from"./index-Dbo06S9W.js";import"./index-4g5l5LRQ.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./iframe-5ZQv1v1p.js";import"../sb-preview/runtime.js";import"./index-jmm5gWkb.js";import"./index-GCvOZpsZ.js";import"./index-bjdz4q3G.js";import"./_baseIsEqual-ujzER7rs.js";import"./uniq-dzufyT16.js";import"./index-PPLHz8o0.js";function t(s){const n=Object.assign({h1:"h1",blockquote:"blockquote",p:"p",code:"code",br:"br",h2:"h2"},i(),s.components);return e.jsxs(e.Fragment,{children:[e.jsx(r,{title:"Errors & Warnings/Warnings/W003"}),`
`,e.jsx(n.h1,{id:"w003-missing-class-name",children:"W003 Missing Class Name"}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"className is required when using the withCanvas higher order component"}),e.jsx(n.br,{}),`
`,e.jsx(n.code,{children:"className is required when using the withSVG higher order component"})]}),`
`]}),`
`,e.jsxs(n.p,{children:["Class names in @chart-io are generally used to help identify elements within the DOM, but can also be used for CSS styling if neccessary. As we assume they are set, the lack of a value causes ",e.jsx(n.code,{children:"g-undefined"})," to appear in the DOM. This warning is trying to prevent this from happening."]}),`
`,e.jsx(n.h2,{id:"cause",children:"Cause"}),`
`,e.jsxs(n.p,{children:["This warning indicates that you are attempting to use the ",e.jsx(n.code,{children:"withSVG"})," or ",e.jsx(n.code,{children:"withCanvas"})," higher order component, and that the expected class name was not provided."]}),`
`,e.jsx(n.h2,{id:"fix",children:"Fix"}),`
`,e.jsxs(n.p,{children:["Pass a class name as the 2nd parameter to the ",e.jsx(n.code,{children:"withSVG"})," or ",e.jsx(n.code,{children:"withCanvas"})," higher order function."]})]})}function f(s={}){const{wrapper:n}=Object.assign({},i(),s.components);return n?e.jsx(n,Object.assign({},s,{children:e.jsx(t,s)})):t(s)}export{f as default};
//# sourceMappingURL=W003-OHqGYS29.js.map
