import{j as t}from"./jsx-runtime-CB_V9I5Y.js";import{P as z,t as H}from"./index-D1OPLCpq.js";import{i as V}from"./isChromatic-VqprqId_.js";import{D}from"./index-BNKFbkco.js";import{c as f}from"./renderChart-BAvMHNLK.js";import"./index-Dcm7olAB.js";import"./index-CTjT7uj6.js";import"./index-Cywu29Xx.js";import"./index-Bs4_CWqv.js";import"./test-utils-Be8GUZmg.js";import"./client-BipHwt7r.js";const E={title:"Components/Droplines",component:D,parameters:{chromatic:{delay:300}}},s=a=>{const w=f({chart:{animationDuration:V()?0:1e3,theme:H.light},event:{droplines:[{isHorizontal:!0,color:"steelblue",x1:150,x2:0,y1:50,y2:50},{isVertical:!0,color:"steelblue",x1:150,x2:150,y1:50,y2:150}]}});return t.jsx(z,{store:w,children:t.jsx("svg",{children:t.jsx(D,{showVertical:a.showVertical,showHorizontal:a.showHorizontal})})})},r={name:"Horizontal & Vertical Droplines",render:s,args:{showVertical:!0,showHorizontal:!0}},e={name:"Vertical Droplines",render:s,args:{showVertical:!0,showHorizontal:!1}},o={name:"Horizontal Droplines",render:s,args:{showVertical:!1,showHorizontal:!0}};var n,i,l;r.parameters={...r.parameters,docs:{...(n=r.parameters)==null?void 0:n.docs,source:{originalSource:`{
  name: "Horizontal & Vertical Droplines",
  render: DroplinesTemplate,
  args: {
    showVertical: true,
    showHorizontal: true
  }
}`,...(l=(i=r.parameters)==null?void 0:i.docs)==null?void 0:l.source}}};var c,p,m;e.parameters={...e.parameters,docs:{...(c=e.parameters)==null?void 0:c.docs,source:{originalSource:`{
  name: "Vertical Droplines",
  render: DroplinesTemplate,
  args: {
    showVertical: true,
    showHorizontal: false
  }
}`,...(m=(p=e.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};var u,h,d;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`{
  name: "Horizontal Droplines",
  render: DroplinesTemplate,
  args: {
    showVertical: false,
    showHorizontal: true
  }
}`,...(d=(h=o.parameters)==null?void 0:h.docs)==null?void 0:d.source}}};const P=["Default","VerticalDroplines","HorizontalDroplines"];export{r as Default,o as HorizontalDroplines,e as VerticalDroplines,P as __namedExportsOrder,E as default};
//# sourceMappingURL=Droplines.stories-BPr4idNL.js.map
