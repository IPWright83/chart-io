import{j as r}from"./jsx-runtime-BjG_zV1W.js";import{J as n}from"./index.es-DoiyW41S.js";import{i as x}from"./isChromatic-VqprqId_.js";import{P as M}from"./react-redux-lkBMRsz6.js";import{M as f}from"./index-BkBTUWQV.js";import{c as g}from"./renderChart-DJ6bXfoi.js";import"./index-CFMwmiIJ.js";import"./index-DpTt3J-R.js";import"./index-5Gl1ki1p.js";import"./index-DzcEfe_2.js";import"./test-utils-C-DEfvFY.js";import"./index-D5nvoAmD.js";import"./client-CbGTh6y2.js";const P={title:"Components/Markers",component:f,parameters:{chromatic:{delay:300}}},a=e=>{const w=g({chart:{animationDuration:x()?0:1e3,theme:{...n.light,markers:{...n.light.markers,shadow:e.shadow,stroke:e.stroke,strokeWidth:e.strokeWidth}}},event:{markers:[{fill:e.fill,stroke:e.stroke,r1:10,r2:40,cx:50,cy:50}]}});return r.jsx(M,{store:w,children:r.jsx("svg",{width:"300px",height:"300px",children:r.jsx("g",{transform:"translate(50,50)",children:r.jsx(f,{})})})})},s={name:"Markers",render:a,args:{fill:"steelblue",stroke:"white",shadow:!1}},t={name:"Outline",render:a,args:{stroke:"steelblue",fill:null,shadow:!1}},o={name:"Shadow",render:a,args:{fill:"steelblue",shadow:!0,strokeWidth:3,stroke:"white"}};var l,i,m;s.parameters={...s.parameters,docs:{...(l=s.parameters)==null?void 0:l.docs,source:{originalSource:`{
  name: "Markers",
  render: MarkersTemplate,
  args: {
    fill: "steelblue",
    stroke: "white",
    shadow: false
  }
}`,...(m=(i=s.parameters)==null?void 0:i.docs)==null?void 0:m.source}}};var d,c,p;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`{
  name: "Outline",
  render: MarkersTemplate,
  args: {
    stroke: "steelblue",
    fill: null,
    shadow: false
  }
}`,...(p=(c=t.parameters)==null?void 0:c.docs)==null?void 0:p.source}}};var h,u,k;o.parameters={...o.parameters,docs:{...(h=o.parameters)==null?void 0:h.docs,source:{originalSource:`{
  name: "Shadow",
  render: MarkersTemplate,
  args: {
    fill: "steelblue",
    shadow: true,
    strokeWidth: 3,
    stroke: "white"
  }
}`,...(k=(u=o.parameters)==null?void 0:u.docs)==null?void 0:k.source}}};const R=["Default","Outline","Shadow"];export{s as Default,t as Outline,o as Shadow,R as __namedExportsOrder,P as default};
//# sourceMappingURL=Markers.stories-folZNySS.js.map
