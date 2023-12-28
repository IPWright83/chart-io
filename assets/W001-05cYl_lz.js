import{j as e}from"./jsx-runtime-vNq4Oc-g.js";import{M as i}from"./index-foGeVojo.js";import{u as n}from"./index-Dbo06S9W.js";import"./index-4g5l5LRQ.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./iframe-5ZQv1v1p.js";import"../sb-preview/runtime.js";import"./index-jmm5gWkb.js";import"./index-GCvOZpsZ.js";import"./index-bjdz4q3G.js";import"./_baseIsEqual-ujzER7rs.js";import"./uniq-dzufyT16.js";import"./index-PPLHz8o0.js";function s(o){const t=Object.assign({h1:"h1",blockquote:"blockquote",p:"p",code:"code",h2:"h2"},n(),o.components);return e.jsxs(e.Fragment,{children:[e.jsx(i,{title:"Errors & Warnings/Warnings/W001"}),`
`,e.jsx(t.h1,{id:"w001-scale-is-too-small",children:"W001 Scale is too small"}),`
`,e.jsxs(t.blockquote,{children:[`
`,e.jsx(t.p,{children:e.jsx(t.code,{children:"The scale appears too small for the dataset. Are you missing the 'aggregate={true}' in your <Axis /> or <Scale /> component?"})}),`
`]}),`
`,e.jsx(t.p,{children:"This warning indicates that some of the values that need plotting fall outside the range of the scale. While the chart can be plotted, some data may not be visible in the chart."}),`
`,e.jsx(t.h2,{id:"cause",children:"Cause"}),`
`,e.jsx(t.p,{children:"The cause of this is usually that you're showing aggregated data (such as a stacked column chart) but the scale doesn't know it needs to sum the values when calculating the extents of the scale."}),`
`,e.jsx(t.h2,{id:"fix",children:"Fix"}),`
`,e.jsxs(t.p,{children:["Add an ",e.jsx(t.code,{children:"aggregate={true}"})," prop to either the ",e.jsx(t.code,{children:"<Axis>"})," or ",e.jsx(t.code,{children:"<AutoScale>"})," component. The error message should detail the fields affected to help you determine which Axis or Scale is affected."]})]})}function b(o={}){const{wrapper:t}=Object.assign({},n(),o.components);return t?e.jsx(t,Object.assign({},o,{children:e.jsx(s,o)})):s(o)}export{b as default};
//# sourceMappingURL=W001-05cYl_lz.js.map
