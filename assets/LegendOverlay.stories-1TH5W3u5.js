import{j as s}from"./jsx-runtime-vNq4Oc-g.js";import"./index-CnLlP05v.js";import{P as y,t as z}from"./Provider--AC3n3ro.js";import{L as b}from"./index-gu_448hd.js";import{c as B}from"./index-Qdriakje.js";import"./index-4g5l5LRQ.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./index-jmm5gWkb.js";import"./Legend-AepxjzR_.js";import"./index-qFq04NJk.js";import"./index-RAAq-Dtz.js";import"./Circle-2MkuDq74.js";import"./Line-cari06pN.js";import"./Square-_dp0HJFb.js";import"./index-CTVlSsFV.js";import"./client-vNP-bS9o.js";import"./index-PPLHz8o0.js";const K={title:"Components/LegendOverlay",component:b,parameters:{docs:{transformSource:e=>(e=e.replace(/data={\[.*?\]}/gs,"data={[ ...dataset ]}"),e=e.replaceAll(/undefined,?/g,""),e=e.replace(/^\s*\n/gm,""),e)},chromatic:{delay:300}}},o=e=>{const f=B({chart:{theme:z.light,dimensions:{width:800,height:400},legend:{items:[{name:"Line Series with a very long title that should be truncated at some point",icon:"line",color:"steelblue"},{name:"Series 2",icon:"circle",color:"steelblue"},{name:"Series 3",icon:"square",color:"steelblue"},{name:"Series 4",icon:"circle",color:"steelblue"},{name:"Series 5",icon:"circle",color:"steelblue"},{name:"Series 6",icon:"circle",color:"steelblue"},{name:"Series 7",icon:"circle",color:"steelblue"},{name:"Series 8",icon:"circle",color:"steelblue"},{name:"Series 9",icon:"circle",color:"steelblue"},{name:"Series 10",icon:"circle",color:"steelblue"}]}}});return s.jsx(y,{store:f,children:s.jsx("svg",{width:"1600px",height:"400px",style:{background:"#CCC"},children:s.jsx(b,{verticalPosition:e.verticalPosition,horizontalPosition:e.horizontalPosition,formatters:e.formatters})})})},r={name:"Left Aligned",render:o,args:{horizontalPosition:"LEFT"}},t={name:"Right Aligned",render:o,args:{horizontalPosition:"RIGHT"}},n={name:"Top Aligned",render:o,args:{verticalPosition:"TOP",horizontalPosition:"CENTER"}},i={name:"Bottom Aligned",render:o,args:{verticalPosition:"BOTTOM",horizontalPosition:"CENTER"}},a={name:"BottomRight Aligned",render:o,args:{verticalPosition:"BOTTOM",horizontalPosition:"RIGHT"}};var l,c,m;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`{
  name: "Left Aligned",
  render: LegendOverlayTemplate,
  args: {
    horizontalPosition: "LEFT"
  }
}`,...(m=(c=r.parameters)==null?void 0:c.docs)==null?void 0:m.source}}};var d,p,g;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`{
  name: "Right Aligned",
  render: LegendOverlayTemplate,
  args: {
    horizontalPosition: "RIGHT"
  }
}`,...(g=(p=t.parameters)==null?void 0:p.docs)==null?void 0:g.source}}};var h,u,T;n.parameters={...n.parameters,docs:{...(h=n.parameters)==null?void 0:h.docs,source:{originalSource:`{
  name: "Top Aligned",
  render: LegendOverlayTemplate,
  args: {
    verticalPosition: "TOP",
    horizontalPosition: "CENTER"
  }
}`,...(T=(u=n.parameters)==null?void 0:u.docs)==null?void 0:T.source}}};var P,v,O;i.parameters={...i.parameters,docs:{...(P=i.parameters)==null?void 0:P.docs,source:{originalSource:`{
  name: "Bottom Aligned",
  render: LegendOverlayTemplate,
  args: {
    verticalPosition: "BOTTOM",
    horizontalPosition: "CENTER"
  }
}`,...(O=(v=i.parameters)==null?void 0:v.docs)==null?void 0:O.source}}};var S,L,R;a.parameters={...a.parameters,docs:{...(S=a.parameters)==null?void 0:S.docs,source:{originalSource:`{
  name: "BottomRight Aligned",
  render: LegendOverlayTemplate,
  args: {
    verticalPosition: "BOTTOM",
    horizontalPosition: "RIGHT"
  }
}`,...(R=(L=a.parameters)==null?void 0:L.docs)==null?void 0:R.source}}};const Q=["Left","Right","Top","Bottom","BottomRight"];export{i as Bottom,a as BottomRight,r as Left,t as Right,n as Top,Q as __namedExportsOrder,K as default};
//# sourceMappingURL=LegendOverlay.stories-1TH5W3u5.js.map
