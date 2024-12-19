import{j as n}from"./jsx-runtime-DEdD30eg.js";import{useMDXComponents as s}from"./index-CcnH5Kt0.js";import{ae as r}from"./index-C07OB8Tc.js";import"./index-RYns6xqu.js";import"./iframe-D6CtwA3E.js";import"../sb-preview/runtime.js";import"./index-sbqOYYIm.js";import"./index-D-8MO0q_.js";import"./index-XRC4JhzV.js";import"./index-DrFu-skq.js";function t(o){const e={blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",ul:"ul",...s(),...o.components};return n.jsxs(n.Fragment,{children:[n.jsx(r,{title:"Errors & Warnings/Warnings/W006"}),`
`,n.jsx(e.h1,{id:"w006-canvas-unsupported-node-type",children:"W006 Canvas Unsupported Node Type"}),`
`,n.jsxs(e.blockquote,{children:[`
`,n.jsx(e.p,{children:n.jsx(e.code,{children:"Unsupported node type: ${node.nodeName}"})}),`
`]}),`
`,n.jsx(e.h2,{id:"cause",children:"Cause"}),`
`,n.jsx(e.p,{children:"When using a Canvas instead of SVG only certain node types can be converted to canvas. In this case a node was encountered that @chart-io does not know how to automatically convert to the canvas equivalent"}),`
`,n.jsx(e.h2,{id:"fix",children:"Fix"}),`
`,n.jsx(e.p,{children:"Avoid using unsupported node types when trying to use the automatic canvas conversion. Currently supported node types are:"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:n.jsx(e.code,{children:"svg:circle"})}),`
`,n.jsx(e.li,{children:n.jsx(e.code,{children:"svg:rect"})}),`
`]})]})}function j(o={}){const{wrapper:e}={...s(),...o.components};return e?n.jsx(e,{...o,children:n.jsx(t,{...o})}):t(o)}export{j as default};
//# sourceMappingURL=W006-C9fF5y4o.js.map
