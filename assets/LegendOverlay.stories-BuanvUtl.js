import{j as s}from"./jsx-runtime-BjG_zV1W.js";import{P as y,M as z}from"./react-redux-QXbQKOoW.js";import{L as f}from"./index-gt7zBpiH.js";import{c as B}from"./renderChart-BLsEhK0I.js";import"./index-Dcm7olAB.js";import"./index-DpTt3J-R.js";import"./Legend-pimTzOFw.js";import"./index-D4-eAyeX.js";import"./index-BmYvQTbQ.js";import"./Circle-Qf3Tu8hN.js";import"./Line-BjKan0E4.js";import"./Square-CZVurtTs.js";import"./index-_rl-6daV.js";import"./test-utils-C-DEfvFY.js";import"./index-D5nvoAmD.js";import"./client-CbGTh6y2.js";const J={title:"Components/LegendOverlay",component:f,parameters:{docs:{transformSource:e=>(e=e.replace(/data={\[.*?\]}/gs,"data={[ ...dataset ]}"),e=e.replaceAll(/undefined,?/g,""),e=e.replace(/^\s*\n/gm,""),e)},chromatic:{delay:300}}},o=e=>{const b=B({chart:{theme:z.light,dimensions:{width:800,height:400},legend:{items:[{name:"Line Series with a very long title that should be truncated at some point",icon:"line",color:"steelblue"},{name:"Series 2",icon:"circle",color:"steelblue"},{name:"Series 3",icon:"square",color:"steelblue"},{name:"Series 4",icon:"circle",color:"steelblue"},{name:"Series 5",icon:"circle",color:"steelblue"},{name:"Series 6",icon:"circle",color:"steelblue"},{name:"Series 7",icon:"circle",color:"steelblue"},{name:"Series 8",icon:"circle",color:"steelblue"},{name:"Series 9",icon:"circle",color:"steelblue"},{name:"Series 10",icon:"circle",color:"steelblue"}]}}});return s.jsx(y,{store:b,children:s.jsx("svg",{width:"1600px",height:"400px",style:{background:"#CCC"},children:s.jsx(f,{verticalPosition:e.verticalPosition,horizontalPosition:e.horizontalPosition,formatters:e.formatters})})})},r={name:"Left Aligned",render:o,args:{horizontalPosition:"LEFT"}},t={name:"Right Aligned",render:o,args:{horizontalPosition:"RIGHT"}},n={name:"Top Aligned",render:o,args:{verticalPosition:"TOP",horizontalPosition:"CENTER"}},i={name:"Bottom Aligned",render:o,args:{verticalPosition:"BOTTOM",horizontalPosition:"CENTER"}},a={name:"BottomRight Aligned",render:o,args:{verticalPosition:"BOTTOM",horizontalPosition:"RIGHT"}};var l,c,m;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`{
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
}`,...(g=(p=t.parameters)==null?void 0:p.docs)==null?void 0:g.source}}};var u,h,T;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`{
  name: "Top Aligned",
  render: LegendOverlayTemplate,
  args: {
    verticalPosition: "TOP",
    horizontalPosition: "CENTER"
  }
}`,...(T=(h=n.parameters)==null?void 0:h.docs)==null?void 0:T.source}}};var P,v,O;i.parameters={...i.parameters,docs:{...(P=i.parameters)==null?void 0:P.docs,source:{originalSource:`{
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
}`,...(R=(L=a.parameters)==null?void 0:L.docs)==null?void 0:R.source}}};const K=["Left","Right","Top","Bottom","BottomRight"];export{i as Bottom,a as BottomRight,r as Left,t as Right,n as Top,K as __namedExportsOrder,J as default};
//# sourceMappingURL=LegendOverlay.stories-BuanvUtl.js.map
