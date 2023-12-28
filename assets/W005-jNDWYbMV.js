import{j as e}from"./jsx-runtime-vNq4Oc-g.js";import{M as o}from"./index-foGeVojo.js";import{u as s}from"./index-Dbo06S9W.js";import"./index-4g5l5LRQ.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./iframe-5ZQv1v1p.js";import"../sb-preview/runtime.js";import"./index-jmm5gWkb.js";import"./index-GCvOZpsZ.js";import"./index-bjdz4q3G.js";import"./_baseIsEqual-ujzER7rs.js";import"./uniq-dzufyT16.js";import"./index-PPLHz8o0.js";function i(r){const n=Object.assign({h1:"h1",blockquote:"blockquote",p:"p",code:"code",br:"br",a:"a",h2:"h2",pre:"pre"},s(),r.components);return e.jsxs(e.Fragment,{children:[e.jsx(o,{title:"Errors & Warnings/Warnings/W005"}),`
`,e.jsx(n.h1,{id:"w005-invalid-margin",children:"W005 Invalid Margin"}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"The left of the margin was not specified and is required"}),e.jsx(n.br,{}),`
`,e.jsx(n.code,{children:"The right of the margin was not specified and is required"}),e.jsx(n.br,{}),`
`,e.jsx(n.code,{children:"The top of the margin was not specified and is required"}),e.jsx(n.br,{}),`
`,e.jsx(n.code,{children:"The bottom of the margin was not specified and is required"})]}),`
`]}),`
`,e.jsxs(n.p,{children:["For charts to operate properly they need a valid margin set via the ",e.jsx(n.code,{children:"plotMargin"})," prop. This warning protects against a margin that is missing one of the sides."]}),`
`,e.jsxs(n.p,{children:["We use the D3 margin convention - ",e.jsx(n.a,{href:"https://observablehq.com/@d3/margin-convention",target:"_blank",rel:"nofollow noopener noreferrer",children:"https://observablehq.com/@d3/margin-convention"})]}),`
`,e.jsx(n.h2,{id:"cause",children:"Cause"}),`
`,e.jsx(n.p,{children:"The margin is missing one of the sides that are required, as specified in the error message. A margin requires a non null value for all sides and should take the shape:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`{
    left: number;
    top: number;
    right: number;
    bottom: number;
}
`})}),`
`,e.jsx(n.h2,{id:"fix",children:"Fix"}),`
`,e.jsxs(n.p,{children:["Provide a value for the missing side of the margin, using ",e.jsx(n.code,{children:"0"})," if no margin is required."]})]})}function b(r={}){const{wrapper:n}=Object.assign({},s(),r.components);return n?e.jsx(n,Object.assign({},r,{children:e.jsx(i,r)})):i(r)}export{b as default};
//# sourceMappingURL=W005-jNDWYbMV.js.map
