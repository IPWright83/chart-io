import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{P as x,V as E}from"./react-redux-SPeguAgb.js";import{C as H}from"./index-B6Lr3Qa8.js";import{c as N}from"./renderChart-D1szSHoV.js";import"./index-Dcm7olAB.js";import"./index-DpTt3J-R.js";import"./test-utils-C-DEfvFY.js";import"./index-D5nvoAmD.js";import"./client-CbGTh6y2.js";const k={title:"Components/CenterValueOverlay",component:H,parameters:{chromatic:{delay:300}}},n=m=>{const C=N({chart:{theme:E.light,dimensions:{width:300,height:300,plotMargin:{left:0,right:0,top:0,bottom:0}},zoom:{path:m.zoomPath??[]}},event:{tooltip:{items:m.item?[m.item]:[]}}});return e.jsx(x,{store:C,children:e.jsxs("svg",{width:"300px",height:"300px",style:{background:"#EEE"},children:[e.jsx("circle",{cx:150,cy:150,r:110,fill:"#FFF",stroke:"#CCC"}),e.jsx(H,{})]})})},r={name:"Hovered Item",render:n,args:{item:{name:"North America",value:28500,icon:"square",fill:"#99c1dc"}}},o={name:"Zoomed In, Nothing Hovered",render:n,args:{zoomPath:["Europe"]}},a={name:"Zoomed In, Hovering a Slice",render:n,args:{zoomPath:["Europe"],item:{name:"Germany",value:4200,icon:"square",fill:"#fc998e"}}},t={name:"Nothing Hovered, Not Zoomed",render:n,args:{}};var s,i,c;r.parameters={...r.parameters,docs:{...(s=r.parameters)==null?void 0:s.docs,source:{originalSource:`{
  name: "Hovered Item",
  render: CenterValueOverlayTemplate,
  args: {
    item: {
      name: "North America",
      value: 28500,
      icon: "square",
      fill: "#99c1dc"
    }
  }
}`,...(c=(i=r.parameters)==null?void 0:i.docs)==null?void 0:c.source}}};var d,l,p;o.parameters={...o.parameters,docs:{...(d=o.parameters)==null?void 0:d.docs,source:{originalSource:`{
  name: "Zoomed In, Nothing Hovered",
  render: CenterValueOverlayTemplate,
  args: {
    zoomPath: ["Europe"]
  }
}`,...(p=(l=o.parameters)==null?void 0:l.docs)==null?void 0:p.source}}};var u,v,h;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`{
  name: "Zoomed In, Hovering a Slice",
  render: CenterValueOverlayTemplate,
  args: {
    zoomPath: ["Europe"],
    item: {
      name: "Germany",
      value: 4200,
      icon: "square",
      fill: "#fc998e"
    }
  }
}`,...(h=(v=a.parameters)==null?void 0:v.docs)==null?void 0:h.source}}};var g,y,f;t.parameters={...t.parameters,docs:{...(g=t.parameters)==null?void 0:g.docs,source:{originalSource:`{
  name: "Nothing Hovered, Not Zoomed",
  render: CenterValueOverlayTemplate,
  args: {}
}`,...(f=(y=t.parameters)==null?void 0:y.docs)==null?void 0:f.source}}};const q=["HoveredItem","ZoomedNoHover","ZoomedAndHovered","Empty"];export{t as Empty,r as HoveredItem,a as ZoomedAndHovered,o as ZoomedNoHover,q as __namedExportsOrder,k as default};
//# sourceMappingURL=CenterValueOverlay.stories-CUDlEGPi.js.map
