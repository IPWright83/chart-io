import{j as e}from"./jsx-runtime-DEdD30eg.js";import{useMDXComponents as i}from"./index-CcnH5Kt0.js";import{ae as r}from"./index-C07OB8Tc.js";import"./index-RYns6xqu.js";import"./iframe-D6CtwA3E.js";import"../sb-preview/runtime.js";import"./index-sbqOYYIm.js";import"./index-D-8MO0q_.js";import"./index-XRC4JhzV.js";import"./index-DrFu-skq.js";function t(s){const n={blockquote:"blockquote",br:"br",code:"code",h1:"h1",h2:"h2",p:"p",...i(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{title:"Errors & Warnings/Warnings/W003"}),`
`,e.jsx(n.h1,{id:"w003-missing-class-name",children:"W003 Missing Class Name"}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"className is required when using the withCanvas higher order component"}),e.jsx(n.br,{}),`
`,e.jsx(n.code,{children:"className is required when using the withSVG higher order component"})]}),`
`]}),`
`,e.jsxs(n.p,{children:["Class names in @chart-io are generally used to help identify elements within the DOM, but can also be used for CSS styling if neccessary. As we assume they are set, the lack of a value causes ",e.jsx(n.code,{children:"g-undefined"})," to appear in the DOM. This warning is trying to prevent this from happening."]}),`
`,e.jsx(n.h2,{id:"cause",children:"Cause"}),`
`,e.jsxs(n.p,{children:["This warning indicates that you are attempting to use the ",e.jsx(n.code,{children:"withSVG"})," or ",e.jsx(n.code,{children:"withCanvas"})," higher order component, and that the expected class name was not provided."]}),`
`,e.jsx(n.h2,{id:"fix",children:"Fix"}),`
`,e.jsxs(n.p,{children:["Pass a class name as the 2nd parameter to the ",e.jsx(n.code,{children:"withSVG"})," or ",e.jsx(n.code,{children:"withCanvas"})," higher order function."]})]})}function j(s={}){const{wrapper:n}={...i(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(t,{...s})}):t(s)}export{j as default};
//# sourceMappingURL=W003-CGLFd-J1.js.map