import{j as e}from"./jsx-runtime-DEdD30eg.js";import{useMDXComponents as n}from"./index-CcnH5Kt0.js";import{ae as a}from"./index-C07OB8Tc.js";import"./index-RYns6xqu.js";import"./iframe-D6CtwA3E.js";import"../sb-preview/runtime.js";import"./index-sbqOYYIm.js";import"./index-D-8MO0q_.js";import"./index-XRC4JhzV.js";import"./index-DrFu-skq.js";function s(o){const t={blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{title:"Errors & Warnings/Warnings/W001"}),`
`,e.jsx(t.h1,{id:"w001-scale-is-too-small",children:"W001 Scale is too small"}),`
`,e.jsxs(t.blockquote,{children:[`
`,e.jsx(t.p,{children:e.jsx(t.code,{children:"The scale appears too small for the dataset. Are you missing the 'aggregate={true}' in your <Axis /> or <Scale /> component?"})}),`
`]}),`
`,e.jsx(t.p,{children:"This warning indicates that some of the values that need plotting fall outside the range of the scale. While the chart can be plotted, some data may not be visible in the chart."}),`
`,e.jsx(t.h2,{id:"cause",children:"Cause"}),`
`,e.jsx(t.p,{children:"The cause of this is usually that you're showing aggregated data (such as a stacked column chart) but the scale doesn't know it needs to sum the values when calculating the extents of the scale."}),`
`,e.jsx(t.h2,{id:"fix",children:"Fix"}),`
`,e.jsxs(t.p,{children:["Add an ",e.jsx(t.code,{children:"aggregate={true}"})," prop to either the ",e.jsx(t.code,{children:"<Axis>"})," or ",e.jsx(t.code,{children:"<AutoScale>"})," component. The error message should detail the fields affected to help you determine which Axis or Scale is affected."]})]})}function g(o={}){const{wrapper:t}={...n(),...o.components};return t?e.jsx(t,{...o,children:e.jsx(s,{...o})}):s(o)}export{g as default};
//# sourceMappingURL=W001-BkOvJpRR.js.map