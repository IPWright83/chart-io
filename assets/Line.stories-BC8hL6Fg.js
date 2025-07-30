import{j as n}from"./jsx-runtime-CB_V9I5Y.js";import{f as d,w as u}from"./index-Dcm7olAB.js";import{w as z}from"./waves-BDt9gctZ.js";import{a as _}from"./argTypes-DuN6ki1s.js";import"./index-D1OPLCpq.js";import"./renderChart-BAvMHNLK.js";import{c as h}from"./storybook-BRKXWPEB.js";import{X as R}from"./index-DWjDrBH7.js";import{a as W,L as U}from"./Lines-C5HE8H6Y.js";import{S as F}from"./Scatters-BJwZW5dN.js";import{Y as k}from"./YAxis-DVfVxPRN.js";import{X as G}from"./XAxis-NdVBz2bD.js";import"./index-CTjT7uj6.js";import"./index-Cywu29Xx.js";import"./test-utils-Be8GUZmg.js";import"./client-BipHwt7r.js";import"./index-ChfY_KWg.js";import"./index-DyxbUYfF.js";import"./defaultLocale-D2nGpDRe.js";import"./useStore-D42TxdHf.js";import"./index-Bs4_CWqv.js";import"./defaultLocale-YZNTexTf.js";import"./index-C73EMPtE.js";import"./index-BNKFbkco.js";import"./index-D8HK0Iw4.js";import"./index-BcuBy6DH.js";import"./Legend-DQ2LjqGu.js";import"./index-COgl75ap.js";import"./index-BQDzJjLo.js";import"./Circle-D2bUPI43.js";import"./Line-cv_TynKV.js";import"./Square-DM8ZByYb.js";import"./index-CD7MXqKa.js";import"./index-BOxme2CB.js";import"./index-Cn1GUACH.js";import"./Tooltip-BNhJ7WJH.js";import"./index-BK_JY7l-.js";import"./TooltipItem-Ds3NZ-zA.js";import"./index-e8nDjrQd.js";import"./index-DomMj_LS.js";import"./index-DqBBfSd8.js";import"./interpolateMultiPath-CX2TmtXQ.js";import"./array-2GBN5xbU.js";import"./renderCanvas-B3vh6D0b.js";const{width:H,height:I,margin:r,useCanvas:J,theme:K,color:N}=_,Ge={title:"XYCharts/Line",component:W,parameters:{docs:{transformSource:e=>(e=e.replace(/data={\[.*?\]}/gs,"data={[ ...dataset ]}"),e=e.replaceAll(/undefined,?/g,""),e=e.replace(/^\s*\n/gm,""),e)},chromatic:{delay:300}},args:{onClick:d(),onMouseOver:d(),onMouseOut:d()},argTypes:{useCanvas:J,width:H,height:I,theme:K,color:N,leftMargin:r,rightMargin:r,topMargin:r,bottomMargin:r}},i=e=>n.jsxs(R,{data:z,plotMargin:{left:e.leftMargin,right:e.rightMargin,top:e.topMargin,bottom:e.bottomMargin},width:e.width,height:e.height,animationDuration:e.animationDuration,theme:e.theme,useCanvas:e.useCanvas,onClick:e.onClick,onMouseOver:e.onMouseOver,onMouseOut:e.onMouseOut,zoomBrush:e.zoomBrush,children:[n.jsx(W,{x:e.x,y:e.y,color:e.color,interactive:!e.withScatter}),e.withScatter?n.jsx(F,{x:e.x,y:e.y}):null,n.jsx(k,{fields:[e.y,e.y2,e.y3]}),n.jsx(G,{fields:[e.x]})]}),A=e=>n.jsxs(R,{data:z,plotMargin:{left:e.leftMargin,right:e.rightMargin,top:e.topMargin,bottom:e.bottomMargin},width:e.width,height:e.height,animationDuration:e.animationDuration,theme:e.theme,useCanvas:e.useCanvas,onClick:e.onClick,onMouseOver:e.onMouseOver,onMouseOut:e.onMouseOut,zoomBrush:e.zoomBrush,groupEvents:e.groupEvents,children:[n.jsx(k,{fields:[e.y,e.y2]}),n.jsx(G,{fields:[e.x]}),n.jsx(U,{x:e.x,ys:[e.y,e.y2]})]}),t={name:"Basic Plot",render:i,args:{useCanvas:!1,width:800,height:500,animationDuration:500,color:"#99C1DC",theme:"light",leftMargin:70,rightMargin:40,topMargin:40,bottomMargin:40,y:"sin",x:"x"},play:h({clientX:273,clientY:408},async e=>{u(e);const o=e.querySelector(".tooltip-item");expect(o).toBeDefined()})},a={name:"Line with Points",render:i,args:{...t.args,withScatter:!0}},s={name:"Custom Color",render:i,args:{...t.args,color:"orange"}},c={name:"Using Canvas",render:i,args:{...t.args,useCanvas:!0},play:h({clientX:273,clientY:408},async e=>{u(e);const o=e.querySelector(".tooltip-item");expect(o).toBeDefined()})},m={name:"Line with Brush",render:i,args:{...t.args,withScatter:!0,zoomBrush:"inline"}},p={name:"Multiple Line Plots",render:A,args:{...t.args,y:"sin",y2:"cos"},play:h({clientX:273,clientY:408},async e=>{u(e);const o=e.querySelector(".tooltip-item");expect(o).toBeDefined()})},l={name:"Multiple Line Plots with Grouped Tooltips",render:A,args:{...t.args,groupEvents:!0,y:"sin",y2:"cos"},play:h({clientX:273,clientY:408},async e=>{u(e);const o=e.querySelector(".tooltip-item");expect(o).toBeDefined()})};var y,g,v;t.parameters={...t.parameters,docs:{...(y=t.parameters)==null?void 0:y.docs,source:{originalSource:`{
  name: "Basic Plot",
  render: LineTemplate,
  args: {
    useCanvas: false,
    width: 800,
    height: 500,
    animationDuration: 500,
    color: "#99C1DC",
    theme: "light",
    leftMargin: 70,
    rightMargin: 40,
    topMargin: 40,
    bottomMargin: 40,
    y: "sin",
    x: "x"
  },
  play: createEventReceiverTest({
    clientX: 273,
    clientY: 408
  }, async canvasElement => {
    const canvas = within(canvasElement);
    const tooltip = canvasElement.querySelector(".tooltip-item");
    expect(tooltip).toBeDefined();
  })
}`,...(v=(g=t.parameters)==null?void 0:g.docs)==null?void 0:v.source}}};var M,f,x;a.parameters={...a.parameters,docs:{...(M=a.parameters)==null?void 0:M.docs,source:{originalSource:`{
  name: "Line with Points",
  render: LineTemplate,
  args: {
    ...Basic.args,
    withScatter: true
  }
}`,...(x=(f=a.parameters)==null?void 0:f.docs)==null?void 0:x.source}}};var C,L,B;s.parameters={...s.parameters,docs:{...(C=s.parameters)==null?void 0:C.docs,source:{originalSource:`{
  name: "Custom Color",
  render: LineTemplate,
  args: {
    ...Basic.args,
    color: "orange"
  }
}`,...(B=(L=s.parameters)==null?void 0:L.docs)==null?void 0:B.source}}};var w,S,E;c.parameters={...c.parameters,docs:{...(w=c.parameters)==null?void 0:w.docs,source:{originalSource:`{
  name: "Using Canvas",
  render: LineTemplate,
  args: {
    ...Basic.args,
    useCanvas: true
  },
  play: createEventReceiverTest({
    clientX: 273,
    clientY: 408
  }, async canvasElement => {
    const canvas = within(canvasElement);
    const tooltip = canvasElement.querySelector(".tooltip-item");
    expect(tooltip).toBeDefined();
  })
}`,...(E=(S=c.parameters)==null?void 0:S.docs)==null?void 0:E.source}}};var T,D,X;m.parameters={...m.parameters,docs:{...(T=m.parameters)==null?void 0:T.docs,source:{originalSource:`{
  name: "Line with Brush",
  render: LineTemplate,
  args: {
    ...Basic.args,
    withScatter: true,
    zoomBrush: "inline"
  }
}`,...(X=(D=m.parameters)==null?void 0:D.docs)==null?void 0:X.source}}};var Y,j,O;p.parameters={...p.parameters,docs:{...(Y=p.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  name: "Multiple Line Plots",
  render: LinesTemplate,
  args: {
    ...Basic.args,
    y: "sin",
    y2: "cos"
  },
  play: createEventReceiverTest({
    clientX: 273,
    clientY: 408
  }, async canvasElement => {
    const canvas = within(canvasElement);
    const tooltip = canvasElement.querySelector(".tooltip-item");
    expect(tooltip).toBeDefined();
  })
}`,...(O=(j=p.parameters)==null?void 0:j.docs)==null?void 0:O.source}}};var P,q,b;l.parameters={...l.parameters,docs:{...(P=l.parameters)==null?void 0:P.docs,source:{originalSource:`{
  name: "Multiple Line Plots with Grouped Tooltips",
  render: LinesTemplate,
  args: {
    ...Basic.args,
    groupEvents: true,
    y: "sin",
    y2: "cos"
  },
  play: createEventReceiverTest({
    clientX: 273,
    clientY: 408
  }, async canvasElement => {
    const canvas = within(canvasElement);
    const tooltip = canvasElement.querySelector(".tooltip-item");
    expect(tooltip).toBeDefined();
  })
}`,...(b=(q=l.parameters)==null?void 0:q.docs)==null?void 0:b.source}}};const Ae=["Basic","LineWithPoints","Color","Canvas","LineWithBrush","MultipleLines","MultipleLinesWithGrouping"];export{t as Basic,c as Canvas,s as Color,m as LineWithBrush,a as LineWithPoints,p as MultipleLines,l as MultipleLinesWithGrouping,Ae as __namedExportsOrder,Ge as default};
//# sourceMappingURL=Line.stories-BC8hL6Fg.js.map
