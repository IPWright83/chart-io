import{j as n}from"./jsx-runtime-DEdD30eg.js";import"./index-D888O4bb.js";import"./index-B2undoSo.js";import{A as w,C as k}from"./index-DBRTqYFH.js";import{a as S}from"./axisData-DyH6sPTU.js";import{Y as T}from"./YAxis-DuDb07NW.js";import{X as O}from"./XAxis-B_MFapNx.js";import"./index-RYns6xqu.js";import"./index-b9bwP9Bh.js";import"./index-sbqOYYIm.js";import"./index-COLyWrXh.js";import"./defaultLocale-D2nGpDRe.js";import"./useStore-DWdQsrPN.js";import"./index-CXvrs8Eg.js";import"./defaultLocale-C7xJETwF.js";const y={title:"Components/Axis/Orientation",component:w,parameters:{docs:{transformSource:e=>(e=e.replace(/data={\[.*?\]}/gs,"data={[ ...dataset ]}"),e=e.replaceAll(/undefined,?/g,""),e=e.replace(/^\s*\n/gm,""),e)},chromatic:{delay:300}}},z=e=>n.jsx(k,{...e,plotMargin:{left:80,bottom:50,top:50,right:80},data:S,children:n.jsx(T,{fields:e.fields,tickSizeInner:e.tickSizeInner,tickSizeOuter:e.tickSizeOuter,tickPadding:e.tickPadding,showGridlines:e.showGridlines,title:e.title,position:e.position})}),A=e=>n.jsx(k,{...e,data:S,children:n.jsx(O,{fields:e.fields,tickSizeInner:e.tickSizeInner,tickSizeOuter:e.tickSizeOuter,tickPadding:e.tickPadding,showGridlines:e.showGridlines,title:e.title,position:e.position})}),t={name:"Left",render:z,args:{position:"left",fields:["integerValue"],height:400,width:800,showGridlines:!1}},o={name:"Right",render:z,args:{...t.args,position:"right"}},i={name:"Bottom",render:A,args:{position:"bottom",fields:["integerValue"],height:100,width:800,tickSizeInner:6,tickSizeOuter:6,tickPadding:3,showGridlines:!1}},r={name:"Top",render:A,args:{...i.args,position:"top"}};var s,a,d;t.parameters={...t.parameters,docs:{...(s=t.parameters)==null?void 0:s.docs,source:{originalSource:`{
  name: "Left",
  render: VerticalAxisTemplate,
  args: {
    position: "left",
    fields: ["integerValue"],
    height: 400,
    width: 800,
    showGridlines: false
  }
}`,...(d=(a=t.parameters)==null?void 0:a.docs)==null?void 0:d.source}}};var m,p,l;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`{
  name: "Right",
  render: VerticalAxisTemplate,
  args: {
    ...Left.args,
    position: "right"
  }
}`,...(l=(p=o.parameters)==null?void 0:p.docs)==null?void 0:l.source}}};var c,h,f;i.parameters={...i.parameters,docs:{...(c=i.parameters)==null?void 0:c.docs,source:{originalSource:`{
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
}`,...(x=(u=r.parameters)==null?void 0:u.docs)==null?void 0:x.source}}};const D=["Left","Right","Bottom","Top"];export{i as Bottom,t as Left,o as Right,r as Top,D as __namedExportsOrder,y as default};
//# sourceMappingURL=AxisOrientation.stories-afQtyvUQ.js.map
