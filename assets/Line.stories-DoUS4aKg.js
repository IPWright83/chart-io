import{j as n}from"./jsx-runtime-BjG_zV1W.js";import{f as y,w as u}from"./index-CFMwmiIJ.js";import{w as h}from"./waves-BDt9gctZ.js";import{a as I}from"./argTypes-DuN6ki1s.js";import{w as H,j as J}from"./dataControls-DatG45sm.js";import"./index.es-DoiyW41S.js";import"./renderChart-DJ6bXfoi.js";import{c as d}from"./storybook-Cl2DMVpH.js";import"./index-CBSNT1TE.js";import{X as k}from"./index-DMa6aJSy.js";import{a as G,L as K}from"./Lines-B6-CZOIj.js";import{S as N}from"./Scatters-CtuKNgxe.js";import{Y as A}from"./YAxis-CRYvaCDj.js";import{X as _}from"./XAxis-CgOaLwq3.js";import"./isChromatic-VqprqId_.js";import"./index-DpTt3J-R.js";import"./react-redux-lkBMRsz6.js";import"./test-utils-C-DEfvFY.js";import"./index-D5nvoAmD.js";import"./client-CbGTh6y2.js";import"./index-VyfXoxD0.js";import"./index-5Gl1ki1p.js";import"./index-DzcEfe_2.js";import"./calculateScale-CBIGWBP9.js";import"./index-DVqBs4fh.js";import"./index-C8nU8Xpn.js";import"./index-DC1bvwxr.js";import"./index-Gn9jQ5lq.js";import"./lodash-DOJiQ2Wu.js";import"./index-CaWU7ljP.js";import"./ContextMenu-Dkh4zLYP.js";import"./index-HNMvlCFe.js";import"./index-DVRV05yR.js";import"./index-CsGapHqM.js";import"./index-CFwzIhDn.js";import"./Legend-DQjp6Mmo.js";import"./index-Bp2RIjag.js";import"./index-BmYvQTbQ.js";import"./Circle-Qf3Tu8hN.js";import"./Line-BjKan0E4.js";import"./Square-CZVurtTs.js";import"./index-BkBTUWQV.js";import"./index-CCgpevYr.js";import"./index-DVli7D7_.js";import"./Tooltip-aFreqMLS.js";import"./index-iwe53Xj-.js";import"./TooltipItem-D41oQ2An.js";import"./index-Dn87vz0y.js";import"./renderCanvas-DSAxZURY.js";const{width:Q,height:V,margin:r,useCanvas:Z,theme:$,color:ee}=I,$e={title:"Charts/XYCharts/Line",component:G,parameters:{docs:{transformSource:e=>(e=e.replace(/data={\[.*?\]}/gs,"data={[ ...dataset ]}"),e=e.replaceAll(/undefined,?/g,""),e=e.replace(/^\s*\n/gm,""),e)},chromatic:{delay:300}},args:{onClick:y(),onMouseOver:y(),onMouseOut:y()},argTypes:{useCanvas:Z,width:Q,height:V,theme:$,color:ee,leftMargin:r,rightMargin:r,topMargin:r,bottomMargin:r}},v=e=>n.jsxs(k,{contextMenu:!1,data:e.data??h,plotMargin:{left:e.leftMargin,right:e.rightMargin,top:e.topMargin,bottom:e.bottomMargin},width:e.width,height:e.height,animationDuration:e.animationDuration,theme:e.theme,useCanvas:e.useCanvas,onClick:e.onClick,onMouseOver:e.onMouseOver,onMouseOut:e.onMouseOut,zoomBrush:e.zoomBrush,children:[n.jsx(G,{x:e.x,y:e.y,color:e.color,interactive:!e.withScatter}),e.withScatter?n.jsx(N,{x:e.x,y:e.y}):null,n.jsx(A,{fields:[e.y,e.y2,e.y3]}),n.jsx(_,{fields:[e.x]})]}),te=["sin","cos","tan","sinh","cosh"];function ne(e){const M=(e[e.length-1]??h[0]).x+10,i=M*(Math.PI/180);return{x:M,sin:Math.sin(i),cos:Math.cos(i),tan:Math.tan(i),sinh:Math.sinh(i),cosh:Math.cosh(i)}}const oe={initialData:h,randomize:e=>J(e,te,.3),createPoint:ne,minLength:5},F=H(v,oe),U=e=>n.jsxs(k,{contextMenu:!1,data:h,plotMargin:{left:e.leftMargin,right:e.rightMargin,top:e.topMargin,bottom:e.bottomMargin},width:e.width,height:e.height,animationDuration:e.animationDuration,theme:e.theme,useCanvas:e.useCanvas,onClick:e.onClick,onMouseOver:e.onMouseOver,onMouseOut:e.onMouseOut,zoomBrush:e.zoomBrush,groupEvents:e.groupEvents,children:[n.jsx(A,{fields:[e.y,e.y2]}),n.jsx(_,{fields:[e.x]}),n.jsx(K,{x:e.x,ys:[e.y,e.y2]})]}),t={name:"Basic Plot",render:F,args:{useCanvas:!1,width:800,height:500,animationDuration:500,color:"#99C1DC",theme:"light",leftMargin:70,rightMargin:40,topMargin:40,bottomMargin:40,y:"sin",x:"x"},play:d({clientX:273,clientY:408},async e=>{u(e);const o=e.querySelector(".tooltip-item");expect(o).toBeDefined()})},a={name:"Line with Points",render:v,args:{...t.args,withScatter:!0}},s={name:"Custom Color",render:v,args:{...t.args,color:"orange"}},c={name:"Using Canvas",render:F,args:{...t.args,useCanvas:!0},play:d({clientX:273,clientY:408},async e=>{u(e);const o=e.querySelector(".tooltip-item");expect(o).toBeDefined()})},m={name:"Line with Brush",render:v,args:{...t.args,withScatter:!0,zoomBrush:"inline"}},l={name:"Multiple Line Plots",render:U,args:{...t.args,y:"sin",y2:"cos"},play:d({clientX:273,clientY:408},async e=>{u(e);const o=e.querySelector(".tooltip-item");expect(o).toBeDefined()})},p={name:"Multiple Line Plots with Grouped Tooltips",render:U,args:{...t.args,groupEvents:!0,y:"sin",y2:"cos"},play:d({clientX:273,clientY:408},async e=>{u(e);const o=e.querySelector(".tooltip-item");expect(o).toBeDefined()})};var g,f,x;t.parameters={...t.parameters,docs:{...(g=t.parameters)==null?void 0:g.docs,source:{originalSource:`{
  name: "Basic Plot",
  render: LineTemplateWithControls,
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
}`,...(x=(f=t.parameters)==null?void 0:f.docs)==null?void 0:x.source}}};var C,L,w;a.parameters={...a.parameters,docs:{...(C=a.parameters)==null?void 0:C.docs,source:{originalSource:`{
  name: "Line with Points",
  render: LineTemplate,
  args: {
    ...Basic.args,
    withScatter: true
  }
}`,...(w=(L=a.parameters)==null?void 0:L.docs)==null?void 0:w.source}}};var B,S,D;s.parameters={...s.parameters,docs:{...(B=s.parameters)==null?void 0:B.docs,source:{originalSource:`{
  name: "Custom Color",
  render: LineTemplate,
  args: {
    ...Basic.args,
    color: "orange"
  }
}`,...(D=(S=s.parameters)==null?void 0:S.docs)==null?void 0:D.source}}};var E,T,j;c.parameters={...c.parameters,docs:{...(E=c.parameters)==null?void 0:E.docs,source:{originalSource:`{
  name: "Using Canvas",
  render: LineTemplateWithControls,
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
}`,...(j=(T=c.parameters)==null?void 0:T.docs)==null?void 0:j.source}}};var P,X,Y;m.parameters={...m.parameters,docs:{...(P=m.parameters)==null?void 0:P.docs,source:{originalSource:`{
  name: "Line with Brush",
  render: LineTemplate,
  args: {
    ...Basic.args,
    withScatter: true,
    zoomBrush: "inline"
  }
}`,...(Y=(X=m.parameters)==null?void 0:X.docs)==null?void 0:Y.source}}};var O,W,q;l.parameters={...l.parameters,docs:{...(O=l.parameters)==null?void 0:O.docs,source:{originalSource:`{
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
}`,...(q=(W=l.parameters)==null?void 0:W.docs)==null?void 0:q.source}}};var b,z,R;p.parameters={...p.parameters,docs:{...(b=p.parameters)==null?void 0:b.docs,source:{originalSource:`{
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
}`,...(R=(z=p.parameters)==null?void 0:z.docs)==null?void 0:R.source}}};const et=["Basic","LineWithPoints","Color","Canvas","LineWithBrush","MultipleLines","MultipleLinesWithGrouping"];export{t as Basic,c as Canvas,s as Color,m as LineWithBrush,a as LineWithPoints,l as MultipleLines,p as MultipleLinesWithGrouping,et as __namedExportsOrder,$e as default};
//# sourceMappingURL=Line.stories-DoUS4aKg.js.map
