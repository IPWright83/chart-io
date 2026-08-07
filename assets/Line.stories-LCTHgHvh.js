import{j as n}from"./jsx-runtime-BjG_zV1W.js";import{f as d,w as u}from"./index-Dcm7olAB.js";import{w as z}from"./waves-BDt9gctZ.js";import{a as _}from"./argTypes-DuN6ki1s.js";import"./react-redux-BIxttMao.js";import"./renderChart-HUqSO_BQ.js";import{c as h}from"./storybook-C6VSxOor.js";import"./index-BrTJ4RzG.js";import{X as R}from"./index-OT6NwBHW.js";import{a as W,L as U}from"./Lines-7z9s4wNn.js";import{S as F}from"./Scatters-CWMQ6d13.js";import{Y as k}from"./YAxis-PGCYKAdu.js";import{X as G}from"./XAxis-D7Bs4h5a.js";import"./index-DpTt3J-R.js";import"./test-utils-C-DEfvFY.js";import"./index-D5nvoAmD.js";import"./client-CbGTh6y2.js";import"./index-Bd68MpUk.js";import"./index-DnlDykCR.js";import"./index-DrZFwq_W.js";import"./index-Dr9RXvgl.js";import"./index-DDyQNOMu.js";import"./index-CWwNrbNA.js";import"./lodash-DOJiQ2Wu.js";import"./index-BZCcI5Qt.js";import"./index-9P8qsy9Z.js";import"./index-BqtyGhDH.js";import"./index-CZ4pHQb2.js";import"./Legend-DQ9XwNwf.js";import"./index-BVPNhhj4.js";import"./index-BmYvQTbQ.js";import"./Circle-Qf3Tu8hN.js";import"./Line-BjKan0E4.js";import"./Square-CZVurtTs.js";import"./index-C_mwV-nm.js";import"./index-BljJ1e5J.js";import"./index-DSMIYGhk.js";import"./Tooltip-BrSlbkqa.js";import"./index-CIJ69QRa.js";import"./TooltipItem-C8j0DJCa.js";import"./index-C2WdQQJ3.js";import"./renderCanvas-DgN6C2Td.js";const{width:H,height:I,margin:r,useCanvas:J,theme:K,color:N}=_,We={title:"XYCharts/Line",component:W,parameters:{docs:{transformSource:e=>(e=e.replace(/data={\[.*?\]}/gs,"data={[ ...dataset ]}"),e=e.replaceAll(/undefined,?/g,""),e=e.replace(/^\s*\n/gm,""),e)},chromatic:{delay:300}},args:{onClick:d(),onMouseOver:d(),onMouseOut:d()},argTypes:{useCanvas:J,width:H,height:I,theme:K,color:N,leftMargin:r,rightMargin:r,topMargin:r,bottomMargin:r}},i=e=>n.jsxs(R,{data:z,plotMargin:{left:e.leftMargin,right:e.rightMargin,top:e.topMargin,bottom:e.bottomMargin},width:e.width,height:e.height,animationDuration:e.animationDuration,theme:e.theme,useCanvas:e.useCanvas,onClick:e.onClick,onMouseOver:e.onMouseOver,onMouseOut:e.onMouseOut,zoomBrush:e.zoomBrush,children:[n.jsx(W,{x:e.x,y:e.y,color:e.color,interactive:!e.withScatter}),e.withScatter?n.jsx(F,{x:e.x,y:e.y}):null,n.jsx(k,{fields:[e.y,e.y2,e.y3]}),n.jsx(G,{fields:[e.x]})]}),A=e=>n.jsxs(R,{data:z,plotMargin:{left:e.leftMargin,right:e.rightMargin,top:e.topMargin,bottom:e.bottomMargin},width:e.width,height:e.height,animationDuration:e.animationDuration,theme:e.theme,useCanvas:e.useCanvas,onClick:e.onClick,onMouseOver:e.onMouseOver,onMouseOut:e.onMouseOut,zoomBrush:e.zoomBrush,groupEvents:e.groupEvents,children:[n.jsx(k,{fields:[e.y,e.y2]}),n.jsx(G,{fields:[e.x]}),n.jsx(U,{x:e.x,ys:[e.y,e.y2]})]}),t={name:"Basic Plot",render:i,args:{useCanvas:!1,width:800,height:500,animationDuration:500,color:"#99C1DC",theme:"light",leftMargin:70,rightMargin:40,topMargin:40,bottomMargin:40,y:"sin",x:"x"},play:h({clientX:273,clientY:408},async e=>{u(e);const o=e.querySelector(".tooltip-item");expect(o).toBeDefined()})},a={name:"Line with Points",render:i,args:{...t.args,withScatter:!0}},s={name:"Custom Color",render:i,args:{...t.args,color:"orange"}},c={name:"Using Canvas",render:i,args:{...t.args,useCanvas:!0},play:h({clientX:273,clientY:408},async e=>{u(e);const o=e.querySelector(".tooltip-item");expect(o).toBeDefined()})},m={name:"Line with Brush",render:i,args:{...t.args,withScatter:!0,zoomBrush:"inline"}},p={name:"Multiple Line Plots",render:A,args:{...t.args,y:"sin",y2:"cos"},play:h({clientX:273,clientY:408},async e=>{u(e);const o=e.querySelector(".tooltip-item");expect(o).toBeDefined()})},l={name:"Multiple Line Plots with Grouped Tooltips",render:A,args:{...t.args,groupEvents:!0,y:"sin",y2:"cos"},play:h({clientX:273,clientY:408},async e=>{u(e);const o=e.querySelector(".tooltip-item");expect(o).toBeDefined()})};var y,g,v;t.parameters={...t.parameters,docs:{...(y=t.parameters)==null?void 0:y.docs,source:{originalSource:`{
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
}`,...(b=(q=l.parameters)==null?void 0:q.docs)==null?void 0:b.source}}};const ke=["Basic","LineWithPoints","Color","Canvas","LineWithBrush","MultipleLines","MultipleLinesWithGrouping"];export{t as Basic,c as Canvas,s as Color,m as LineWithBrush,a as LineWithPoints,p as MultipleLines,l as MultipleLinesWithGrouping,ke as __namedExportsOrder,We as default};
//# sourceMappingURL=Line.stories-LCTHgHvh.js.map
