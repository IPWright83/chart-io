import{j as e}from"./jsx-runtime-DEdD30eg.js";import{useMDXComponents as t}from"./index-CcnH5Kt0.js";import{ae as n,af as r}from"./index-C07OB8Tc.js";import{YAxisStory as c}from"./YAxis.stories-C46MM9pc.js";import"./index-RYns6xqu.js";import"./iframe-D6CtwA3E.js";import"../sb-preview/runtime.js";import"./index-sbqOYYIm.js";import"./index-D-8MO0q_.js";import"./index-XRC4JhzV.js";import"./index-DrFu-skq.js";import"./index-DBRTqYFH.js";import"./index-b9bwP9Bh.js";import"./index-COLyWrXh.js";import"./defaultLocale-D2nGpDRe.js";import"./useStore-DWdQsrPN.js";import"./index-CXvrs8Eg.js";import"./defaultLocale-C7xJETwF.js";import"./YAxis-DuDb07NW.js";function s(d){const i={a:"a",code:"code",h1:"h1",h3:"h3",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...t(),...d.components};return e.jsxs(e.Fragment,{children:[e.jsx(n,{title:"Components/Axis/YAxis"}),`
`,e.jsx(i.h1,{id:"y-axis-component",children:"Y Axis Component"}),`
`,e.jsxs(i.p,{children:["This ",e.jsx(i.code,{children:"<YAxis>"})," component allows you to define a vertical Axis on a chart. This is a utility component that combines both an ",e.jsx(i.a,{href:"?path=/docs/components-axis--docs",children:"Axis"})," component, along with a ",e.jsx(i.code,{children:"<AutoScale>"})," component. It is recommended to use this component where possible to save duplicate configuration for a ",e.jsx(i.code,{children:"<AutoScale>"}),"."]}),`
`,e.jsxs(i.p,{children:["Please see the ",e.jsx(i.a,{href:"?path=/docs/components-axis--docs",children:"Axis"})," component for more information on it's capabilities and configuration."]}),`
`,e.jsx(r,{of:c}),`
`,e.jsx(i.h3,{id:"props",children:"Props"}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Prop"}),e.jsx(i.th,{children:"Type"}),e.jsx(i.th,{children:"Default"}),e.jsx(i.th,{children:"Note"})]})}),e.jsxs(i.tbody,{children:[e.jsxs(i.tr,{children:[e.jsx(i.td,{children:e.jsx(i.code,{children:"aggregate"})}),e.jsx(i.td,{children:e.jsx(i.code,{children:"boolean"})}),e.jsx(i.td,{children:e.jsx(i.code,{children:"false"})}),e.jsx(i.td,{children:"Whether the scale should be aggregated (used for stacked charts)"})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:e.jsx(i.code,{children:"domain"})}),e.jsx(i.td,{children:e.jsx(i.code,{children:"Array<number/string/date>"})}),e.jsx(i.td,{children:e.jsx(i.code,{children:"null"})}),e.jsxs(i.td,{children:["An optional override of the domain for the scale. This will replace any auto calculated domain. See ",e.jsx(i.a,{href:"https://github.com/d3/d3-scale#continuous_domain",rel:"nofollow",children:"https://github.com/d3/d3-scale#continuous_domain"})]})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:e.jsxs(i.strong,{children:[e.jsx(i.code,{children:"fields"}),"*"]})}),e.jsx(i.td,{children:e.jsx(i.code,{children:"string/Array<string>"})}),e.jsx(i.td,{}),e.jsx(i.td,{children:"The field or set of fields that this axis represents. These should correspond to the fields being displayed on this Axis within the data."})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:e.jsx(i.code,{children:"position"})}),e.jsx(i.td,{children:e.jsx(i.code,{children:"string"})}),e.jsx(i.td,{children:e.jsx(i.code,{children:'"left"'})}),e.jsxs(i.td,{children:["The position of the axis. One of ",e.jsx(i.code,{children:"left"})," or ",e.jsx(i.code,{children:"right"}),". This will use the appropriate ",e.jsx(i.a,{href:"https://github.com/d3/d3-axis#axisTop",rel:"nofollow",children:"d3.axis"})," orientation function."]})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:e.jsx(i.code,{children:"scaleType"})}),e.jsx(i.td,{children:e.jsx(i.code,{children:"string"})}),e.jsx(i.td,{children:e.jsx(i.code,{children:"null"})}),e.jsx(i.td,{children:'An optional override of the type of scale that should be used. One of "linear", "time", "power", "log", "band", "point"'})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:e.jsx(i.code,{children:"showGridlines"})}),e.jsx(i.td,{children:e.jsx(i.code,{children:"boolean"})}),e.jsx(i.td,{children:e.jsx(i.code,{children:"true"})}),e.jsx(i.td,{children:"Determines whether gridlines should be shown against this axis."})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:e.jsx(i.code,{children:"tickFormat"})}),e.jsx(i.td,{children:e.jsx(i.code,{children:"function"})}),e.jsx(i.td,{children:e.jsx(i.code,{children:"null"})}),e.jsxs(i.td,{children:["See ",e.jsx(i.a,{href:"https://github.com/d3/d3-axis#axis_tickFormat",rel:"nofollow",children:"https://github.com/d3/d3-axis#axis_tickFormat"})]})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:e.jsx(i.code,{children:"tickSizeInner"})}),e.jsx(i.td,{children:e.jsx(i.code,{children:"number"})}),e.jsx(i.td,{children:e.jsx(i.code,{children:"6"})}),e.jsxs(i.td,{children:["See ",e.jsx(i.a,{href:"https://github.com/d3/d3-axis#axis_tickSizeInner",rel:"nofollow",children:"https://github.com/d3/d3-axis#axis_tickSizeInner"}),"."]})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:e.jsx(i.code,{children:"tickSizeOuter"})}),e.jsx(i.td,{children:e.jsx(i.code,{children:"number"})}),e.jsx(i.td,{children:e.jsx(i.code,{children:"6"})}),e.jsxs(i.td,{children:["See ",e.jsx(i.a,{href:"https://github.com/d3/d3-axis#axis_tickSizeOuter",rel:"nofollow",children:"https://github.com/d3/d3-axis#axis_tickSizeOuter"}),"."]})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:e.jsx(i.code,{children:"tickPadding"})}),e.jsx(i.td,{children:e.jsx(i.code,{children:"number"})}),e.jsx(i.td,{children:e.jsx(i.code,{children:"3"})}),e.jsxs(i.td,{children:["See ",e.jsx(i.a,{href:"https://github.com/d3/d3-axis#axis_tickPadding",rel:"nofollow",children:"https://github.com/d3/d3-axis#axis_tickPadding"}),"."]})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:e.jsx(i.code,{children:"ticks"})}),e.jsx(i.td,{children:e.jsx(i.code,{children:"any[]"})}),e.jsx(i.td,{children:e.jsx(i.code,{children:"null"})}),e.jsxs(i.td,{children:["See ",e.jsx(i.a,{href:"https://github.com/d3/d3-axis#axis_ticks",rel:"nofollow",children:"https://github.com/d3/d3-axis#axis_ticks"})]})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:e.jsx(i.code,{children:"tickValues"})}),e.jsx(i.td,{children:e.jsx(i.code,{children:"string[]"})}),e.jsx(i.td,{children:e.jsx(i.code,{children:"null"})}),e.jsxs(i.td,{children:["See ",e.jsx(i.a,{href:"https://github.com/d3/d3-axis#axis_tickValues",rel:"nofollow",children:"https://github.com/d3/d3-axis#axis_tickValues"})]})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:e.jsx(i.code,{children:"title"})}),e.jsx(i.td,{children:e.jsx(i.code,{children:"string"})}),e.jsx(i.td,{children:e.jsx(i.code,{children:"null"})}),e.jsx(i.td,{children:"The title of the axis. This will default to the value in field(s)"})]})]})]}),`
`,e.jsx("br",{})]})}function v(d={}){const{wrapper:i}={...t(),...d.components};return i?e.jsx(i,{...d,children:e.jsx(s,{...d})}):s(d)}export{v as default};
//# sourceMappingURL=YAxis-5_Vl5xS4.js.map