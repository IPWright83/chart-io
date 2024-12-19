import{j as e}from"./jsx-runtime-DEdD30eg.js";import{useMDXComponents as i}from"./index-CcnH5Kt0.js";import{ae as r}from"./index-C07OB8Tc.js";import"./index-RYns6xqu.js";import"./iframe-D6CtwA3E.js";import"../sb-preview/runtime.js";import"./index-sbqOYYIm.js";import"./index-D-8MO0q_.js";import"./index-XRC4JhzV.js";import"./index-DrFu-skq.js";function n(o){const t={blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",p:"p",...i(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{title:"Errors & Warnings/Errors/E001"}),`
`,e.jsx(t.h1,{id:"e001-incompatible-scale",children:"E001 Incompatible Scale"}),`
`,e.jsxs(t.blockquote,{children:[`
`,e.jsx(t.p,{children:e.jsx(t.code,{children:`Incompatible scale for a <\${componentName} />. Are you missing the 'scaleType="band"' in your <Axis /> or <AutoScale /> component?`})}),`
`]}),`
`,e.jsx(t.h2,{id:"cause",children:"Cause"}),`
`,e.jsx(t.p,{children:"The cause of this is because a non discrete scale has typically been used with a discrete plot (e.g. a time scale with a column chart)."}),`
`,e.jsx(t.h2,{id:"fix",children:"Fix"}),`
`,e.jsx(t.p,{children:`Inform the scale that it should be discrete by adding the 'scaleType="band"' property to the appropriate Scale or Axis component.`})]})}function j(o={}){const{wrapper:t}={...i(),...o.components};return t?e.jsx(t,{...o,children:e.jsx(n,{...o})}):n(o)}export{j as default};
//# sourceMappingURL=E001-C1wHxAFv.js.map
