import{j as e}from"./jsx-runtime-DEdD30eg.js";import{useMDXComponents as s}from"./index-CcnH5Kt0.js";import{ae as o}from"./index-C07OB8Tc.js";import"./index-RYns6xqu.js";import"./iframe-D6CtwA3E.js";import"../sb-preview/runtime.js";import"./index-sbqOYYIm.js";import"./index-D-8MO0q_.js";import"./index-XRC4JhzV.js";import"./index-DrFu-skq.js";function r(i){const n={a:"a",blockquote:"blockquote",br:"br",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...s(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{title:"Errors & Warnings/Warnings/W005"}),`
`,e.jsx(n.h1,{id:"w005-invalid-margin",children:"W005 Invalid Margin"}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"The left of the margin was not specified and is required"}),e.jsx(n.br,{}),`
`,e.jsx(n.code,{children:"The right of the margin was not specified and is required"}),e.jsx(n.br,{}),`
`,e.jsx(n.code,{children:"The top of the margin was not specified and is required"}),e.jsx(n.br,{}),`
`,e.jsx(n.code,{children:"The bottom of the margin was not specified and is required"})]}),`
`]}),`
`,e.jsxs(n.p,{children:["For charts to operate properly they need a valid margin set via the ",e.jsx(n.code,{children:"plotMargin"})," prop. This warning protects against a margin that is missing one of the sides."]}),`
`,e.jsxs(n.p,{children:["We use the D3 margin convention - ",e.jsx(n.a,{href:"https://observablehq.com/@d3/margin-convention",rel:"nofollow",children:"https://observablehq.com/@d3/margin-convention"})]}),`
`,e.jsx(n.h2,{id:"cause",children:"Cause"}),`
`,e.jsx(n.p,{children:"The margin is missing one of the sides that are required, as specified in the error message. A margin requires a non null value for all sides and should take the shape:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-javascript",children:`{
    left: number;
    top: number;
    right: number;
    bottom: number;
}
`})}),`
`,e.jsx(n.h2,{id:"fix",children:"Fix"}),`
`,e.jsxs(n.p,{children:["Provide a value for the missing side of the margin, using ",e.jsx(n.code,{children:"0"})," if no margin is required."]})]})}function g(i={}){const{wrapper:n}={...s(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(r,{...i})}):r(i)}export{g as default};
//# sourceMappingURL=W005-DNMVihK_.js.map