import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{useMDXComponents as c}from"./index-D-2zTmTn.js";import{M as i}from"./index-Dw1MpZ3G.js";import"./index-DpTt3J-R.js";import"./iframe-Bho3GZXG.js";import"./index-D5nvoAmD.js";import"./index-B77L4dcM.js";import"./index-DrFu-skq.js";function o(n){const t={blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",p:"p",...c(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(i,{title:"Errors & Warnings/Errors/E001"}),`
`,e.jsx(t.h1,{id:"e001-incompatible-scale",children:"E001 Incompatible Scale"}),`
`,e.jsxs(t.blockquote,{children:[`
`,e.jsx(t.p,{children:e.jsx(t.code,{children:`Incompatible scale for a <\${componentName} />. Are you missing the 'scaleType="band"' in your <Axis /> or <AutoScale /> component?`})}),`
`]}),`
`,e.jsx(t.h2,{id:"cause",children:"Cause"}),`
`,e.jsx(t.p,{children:"The cause of this is because a non discrete scale has typically been used with a discrete plot (e.g. a time scale with a column chart)."}),`
`,e.jsx(t.h2,{id:"fix",children:"Fix"}),`
`,e.jsx(t.p,{children:`Inform the scale that it should be discrete by adding the 'scaleType="band"' property to the appropriate Scale or Axis component.`})]})}function u(n={}){const{wrapper:t}={...c(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(o,{...n})}):o(n)}export{u as default};
//# sourceMappingURL=E001-pjw0-TKN.js.map
