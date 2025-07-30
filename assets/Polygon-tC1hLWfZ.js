import{j as e}from"./jsx-runtime-CB_V9I5Y.js";import{useMDXComponents as s}from"./index-DSkyVWTJ.js";import{M as r,C as l}from"./index-DXysM4eg.js";import{Default as c}from"./Polygon.stories-Dlbkugrg.js";import"./index-CTjT7uj6.js";import"./iframe-drV2x4lN.js";import"./index-Cywu29Xx.js";import"./index-DiMW2NzS.js";import"./index-DrFu-skq.js";import"./index-uU7U5txR.js";import"./index-Bs4_CWqv.js";import"./index-D1OPLCpq.js";function n(o){const t={a:"a",code:"code",h1:"h1",h3:"h3",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...s(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{title:"Components/Polygon"}),`
`,e.jsx(t.h1,{id:"polygon-component",children:"Polygon Component"}),`
`,e.jsxs(t.p,{children:["The ",e.jsx(t.code,{children:"<Polygon>"})," component allows us to define a layer to render a custom polygon either underneath or on top of the plots. This can be useful for defining threshold bands in the background, along with a variety of other use cases."]}),`
`,e.jsx(l,{of:c}),`
`,e.jsx(t.p,{children:"The points that are provided should be pixel coordinates. If you need to plot based on your data points you can simply access the relevant scale and call the scale function. For example:"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-javascript",children:`import { useSelector } from "react-redux";

// Within a component obtain some scales
const xScale = useSelector((s: IState) => chartSelectors.scales.getScale(s, "x"));
const yScale = useSelector((s: IState) => chartSelectors.scales.getScale(s, "y"));

// Given a data point we can translate this to a co-ordinate
const data = { x : 5000, y: 100000 };
const coordinate = { x: xScale(data.x), y: yScale(data.y) };
`})}),`
`,e.jsx(t.h3,{id:"props",children:"Props"}),`
`,e.jsxs(t.table,{children:[e.jsx(t.thead,{children:e.jsxs(t.tr,{children:[e.jsx(t.th,{children:"Prop"}),e.jsx(t.th,{children:"Type"}),e.jsx(t.th,{children:"Default"}),e.jsx(t.th,{children:"Note"})]})}),e.jsxs(t.tbody,{children:[e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsxs(t.strong,{children:[e.jsx(t.code,{children:"points"}),"*"]})}),e.jsx(t.td,{children:e.jsx(t.code,{children:"string"})}),e.jsx(t.td,{}),e.jsxs(t.td,{children:["The set of points as a string. See ",e.jsx(t.a,{href:"https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/points",rel:"nofollow",children:"https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/points"})]})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"fill"})}),e.jsx(t.td,{children:e.jsx(t.code,{children:"string"})}),e.jsx(t.td,{}),e.jsx(t.td,{children:"An optional fill colour to apply to the polygon"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"stroke"})}),e.jsx(t.td,{children:e.jsx(t.code,{children:"string"})}),e.jsx(t.td,{}),e.jsx(t.td,{children:"An optional stroke color to apply to the polygon"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"opacity"})}),e.jsx(t.td,{children:e.jsx(t.code,{children:"number"})}),e.jsx(t.td,{}),e.jsx(t.td,{children:"The opacity of the polygon"})]})]})]}),`
`,e.jsx("br",{})]})}function b(o={}){const{wrapper:t}={...s(),...o.components};return t?e.jsx(t,{...o,children:e.jsx(n,{...o})}):n(o)}export{b as default};
//# sourceMappingURL=Polygon-tC1hLWfZ.js.map
