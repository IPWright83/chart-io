import{j as r}from"./jsx-runtime-vNq4Oc-g.js";import"./index-CnLlP05v.js";import{t as n,P as x}from"./Provider--AC3n3ro.js";import{i as M}from"./isChromatic-DUXhsG00.js";import{M as f}from"./index-N5QiI7wA.js";import{c as g}from"./index-Qdriakje.js";import"./index-4g5l5LRQ.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./index-jmm5gWkb.js";import"./index-CTVlSsFV.js";import"./client-vNP-bS9o.js";import"./index-PPLHz8o0.js";const P={title:"Components/Markers",component:f,parameters:{chromatic:{delay:300}}},o=e=>{const w=g({chart:{animationDuration:M()?0:1e3,theme:{...n.light,markers:{...n.light.markers,shadow:e.shadow,stroke:e.stroke,strokeWidth:e.strokeWidth}}},event:{markers:[{fill:e.fill,stroke:e.stroke,r1:10,r2:40,cx:50,cy:50}]}});return r.jsx(x,{store:w,children:r.jsx("svg",{width:"300px",height:"300px",children:r.jsx("g",{transform:"translate(50,50)",children:r.jsx(f,{})})})})},s={name:"Markers",render:o,args:{fill:"steelblue",stroke:"white",shadow:!1}},t={name:"Outline",render:o,args:{stroke:"steelblue",fill:null,shadow:!1}},a={name:"Shadow",render:o,args:{fill:"steelblue",shadow:!0,strokeWidth:3,stroke:"white"}};var l,i,m;s.parameters={...s.parameters,docs:{...(l=s.parameters)==null?void 0:l.docs,source:{originalSource:`{
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
}`,...(p=(c=t.parameters)==null?void 0:c.docs)==null?void 0:p.source}}};var h,u,k;a.parameters={...a.parameters,docs:{...(h=a.parameters)==null?void 0:h.docs,source:{originalSource:`{
  name: "Shadow",
  render: MarkersTemplate,
  args: {
    fill: "steelblue",
    shadow: true,
    strokeWidth: 3,
    stroke: "white"
  }
}`,...(k=(u=a.parameters)==null?void 0:u.docs)==null?void 0:k.source}}};const R=["Default","Outline","Shadow"];export{s as Default,t as Outline,a as Shadow,R as __namedExportsOrder,P as default};
//# sourceMappingURL=Markers.stories-YipTSlWa.js.map
