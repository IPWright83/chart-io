import{j as n}from"./jsx-runtime-vNq4Oc-g.js";import"./index-dosLtsPy.js";import"./index-fcJ2LOVC.js";import{A as w,C as k}from"./index-7Eg7ybPU.js";import{a as S}from"./axisData-5WQIiAoS.js";import{Y as T}from"./YAxis-EYrVkw1t.js";import{X as O}from"./XAxis-r21t602H.js";import"./index-4g5l5LRQ.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./index-CnLlP05v.js";import"./index-jmm5gWkb.js";import"./index-CTVlSsFV.js";import"./Provider--AC3n3ro.js";import"./index-K4Hn1GGT.js";import"./defaultLocale-4fp4Qluw.js";import"./useStore-5GkWK8oz.js";import"./defaultLocale-RGkPOkAo.js";const M={title:"Components/Axis/Orientation",component:w,parameters:{docs:{transformSource:e=>(e=e.replace(/data={\[.*?\]}/gs,"data={[ ...dataset ]}"),e=e.replaceAll(/undefined,?/g,""),e=e.replace(/^\s*\n/gm,""),e)},chromatic:{delay:300}}},z=e=>n.jsx(k,{...e,plotMargin:{left:80,bottom:50,top:50,right:80},data:S,children:n.jsx(T,{fields:e.fields,tickSizeInner:e.tickSizeInner,tickSizeOuter:e.tickSizeOuter,tickPadding:e.tickPadding,showGridlines:e.showGridlines,title:e.title,position:e.position})}),A=e=>n.jsx(k,{...e,data:S,children:n.jsx(O,{fields:e.fields,tickSizeInner:e.tickSizeInner,tickSizeOuter:e.tickSizeOuter,tickPadding:e.tickPadding,showGridlines:e.showGridlines,title:e.title,position:e.position})}),t={name:"Left",render:z,args:{position:"left",fields:["integerValue"],height:400,width:800,showGridlines:!1}},o={name:"Right",render:z,args:{...t.args,position:"right"}},i={name:"Bottom",render:A,args:{position:"bottom",fields:["integerValue"],height:100,width:800,tickSizeInner:6,tickSizeOuter:6,tickPadding:3,showGridlines:!1}},r={name:"Top",render:A,args:{...i.args,position:"top"}};var s,a,m;t.parameters={...t.parameters,docs:{...(s=t.parameters)==null?void 0:s.docs,source:{originalSource:`{
  name: "Left",
  render: VerticalAxisTemplate,
  args: {
    position: "left",
    fields: ["integerValue"],
    height: 400,
    width: 800,
    showGridlines: false
  }
}`,...(m=(a=t.parameters)==null?void 0:a.docs)==null?void 0:m.source}}};var p,d,l;o.parameters={...o.parameters,docs:{...(p=o.parameters)==null?void 0:p.docs,source:{originalSource:`{
  name: "Right",
  render: VerticalAxisTemplate,
  args: {
    ...Left.args,
    position: "right"
  }
}`,...(l=(d=o.parameters)==null?void 0:d.docs)==null?void 0:l.source}}};var c,h,f;i.parameters={...i.parameters,docs:{...(c=i.parameters)==null?void 0:c.docs,source:{originalSource:`{
  name: "Bottom",
  render: HorizontalAxisTemplate,
  args: {
    position: "bottom",
    fields: ["integerValue"],
    height: 100,
    width: 800,
    tickSizeInner: 6,
    tickSizeOuter: 6,
    tickPadding: 3,
    showGridlines: false
  }
}`,...(f=(h=i.parameters)==null?void 0:h.docs)==null?void 0:f.source}}};var g,u,x;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`{
  name: "Top",
  render: HorizontalAxisTemplate,
  args: {
    ...Bottom.args,
    position: "top"
  }
}`,...(x=(u=r.parameters)==null?void 0:u.docs)==null?void 0:x.source}}};const q=["Left","Right","Bottom","Top"];export{i as Bottom,t as Left,o as Right,r as Top,q as __namedExportsOrder,M as default};
//# sourceMappingURL=AxisOrientation.stories-_qFeXwlY.js.map
