import{j as e}from"./jsx-runtime-vNq4Oc-g.js";import{M as r,C as c,b as d}from"./index-foGeVojo.js";import{u as s}from"./index-Dbo06S9W.js";import"./index-4g5l5LRQ.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./iframe-5ZQv1v1p.js";import"../sb-preview/runtime.js";import"./index-jmm5gWkb.js";import"./index-GCvOZpsZ.js";import"./index-bjdz4q3G.js";import"./_baseIsEqual-ujzER7rs.js";import"./uniq-dzufyT16.js";import"./index-PPLHz8o0.js";function n(o){const t=Object.assign({h1:"h1",p:"p",code:"code",pre:"pre",h3:"h3",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td",strong:"strong",a:"a"},s(),o.components);return e.jsxs(e.Fragment,{children:[e.jsx(r,{title:"Components/Polygon"}),`
`,e.jsx(t.h1,{id:"polygon-component",children:"Polygon Component"}),`
`,e.jsxs(t.p,{children:["The ",e.jsx(t.code,{children:"<Polygon>"})," component allows us to define a layer to render a custom polygon either underneath or on top of the plots. This can be useful for defining threshold bands in the background, along with a variety of other use cases."]}),`
`,e.jsx(c,{children:e.jsx(d,{id:"components-polygon--default"})}),`
`,e.jsx(t.p,{children:"The points that are provided should be pixel coordinates. If you need to plot based on your data points you can simply access the relevant scale and call the scale function. For example:"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{children:`import { useSelector } from "react-redux";

// Within a component obtain some scales
const xScale = useSelector((s: IState) => chartSelectors.scales.getScale(s, "x"));
const yScale = useSelector((s: IState) => chartSelectors.scales.getScale(s, "y"));

// Given a data point we can translate this to a co-ordinate
const data = { x : 5000, y: 100000 };
const coordinate = { x: xScale(data.x), y: yScale(data.y) };
`})}),`
`,e.jsx(t.h3,{id:"props",children:"Props"}),`
`,e.jsxs(t.table,{children:[e.jsx(t.thead,{children:e.jsxs(t.tr,{children:[e.jsx(t.th,{children:"Prop"}),e.jsx(t.th,{children:"Type"}),e.jsx(t.th,{children:"Default"}),e.jsx(t.th,{children:"Note"})]})}),e.jsxs(t.tbody,{children:[e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsxs(t.strong,{children:[e.jsx(t.code,{children:"points"}),"*"]})}),e.jsx(t.td,{children:e.jsx(t.code,{children:"string"})}),e.jsx(t.td,{}),e.jsxs(t.td,{children:["The set of points as a string. See ",e.jsx(t.a,{href:"https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/points",target:"_blank",rel:"nofollow noopener noreferrer",children:"https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/points"})]})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"fill"})}),e.jsx(t.td,{children:e.jsx(t.code,{children:"string"})}),e.jsx(t.td,{}),e.jsx(t.td,{children:"An optional fill colour to apply to the polygon"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"stroke"})}),e.jsx(t.td,{children:e.jsx(t.code,{children:"string"})}),e.jsx(t.td,{}),e.jsx(t.td,{children:"An optional stroke color to apply to the polygon"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"opacity"})}),e.jsx(t.td,{children:e.jsx(t.code,{children:"number"})}),e.jsx(t.td,{}),e.jsx(t.td,{children:"The opacity of the polygon"})]})]})]}),`
`,e.jsx("br",{})]})}function S(o={}){const{wrapper:t}=Object.assign({},s(),o.components);return t?e.jsx(t,Object.assign({},o,{children:e.jsx(n,o)})):n(o)}export{S as default};
//# sourceMappingURL=Polygon-qLY0FMUB.js.map
