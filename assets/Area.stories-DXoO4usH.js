import{j as t}from"./jsx-runtime-BjG_zV1W.js";import{f,w as a,e as i}from"./index-CFMwmiIJ.js";import{w as s}from"./waves-BDt9gctZ.js";import{a as ne}from"./argTypes-DuN6ki1s.js";import{w as oe,j as re}from"./dataControls-DatG45sm.js";import"./index.es-DoiyW41S.js";import"./renderChart-DJ6bXfoi.js";import{c}from"./storybook-Cl2DMVpH.js";import"./index-CBSNT1TE.js";import{X as x}from"./index-DMa6aJSy.js";import{a as V,A as Z}from"./Areas-BBI5eHNA.js";import{Y as A}from"./YAxis-CRYvaCDj.js";import{X as B}from"./XAxis-CgOaLwq3.js";import"./isChromatic-VqprqId_.js";import"./index-DpTt3J-R.js";import"./react-redux-lkBMRsz6.js";import"./test-utils-C-DEfvFY.js";import"./index-D5nvoAmD.js";import"./client-CbGTh6y2.js";import"./index-VyfXoxD0.js";import"./index-5Gl1ki1p.js";import"./index-DzcEfe_2.js";import"./calculateScale-CBIGWBP9.js";import"./index-DVqBs4fh.js";import"./index-C8nU8Xpn.js";import"./index-DC1bvwxr.js";import"./index-Gn9jQ5lq.js";import"./lodash-DOJiQ2Wu.js";import"./index-CaWU7ljP.js";import"./ContextMenu-Dkh4zLYP.js";import"./index-HNMvlCFe.js";import"./index-DVRV05yR.js";import"./index-CsGapHqM.js";import"./index-CFwzIhDn.js";import"./Legend-DQjp6Mmo.js";import"./index-Bp2RIjag.js";import"./index-BmYvQTbQ.js";import"./Circle-Qf3Tu8hN.js";import"./Line-BjKan0E4.js";import"./Square-CZVurtTs.js";import"./index-BkBTUWQV.js";import"./index-CCgpevYr.js";import"./index-DVli7D7_.js";import"./Tooltip-aFreqMLS.js";import"./index-iwe53Xj-.js";import"./TooltipItem-D41oQ2An.js";import"./index-Dn87vz0y.js";const{width:ae,height:ie,margin:m,useCanvas:se,theme:ce,color:me}=ne,it={title:"Charts/XYCharts/Area",component:V,parameters:{docs:{transformSource:e=>(e=e.replace(/data={\[.*?\]}/gs,"data={[ ...dataset ]}"),e=e.replaceAll(/undefined,?/g,""),e=e.replace(/^\s*\n/gm,""),e)},chromatic:{delay:300}},args:{onClick:f(),onMouseOver:f(),onMouseOut:f()},argTypes:{useCanvas:se,width:ae,height:ie,theme:ce,color:me,leftMargin:m,rightMargin:m,topMargin:m,bottomMargin:m}},v=e=>t.jsxs(x,{contextMenu:!1,data:e.data??s,plotMargin:{left:e.leftMargin,right:e.rightMargin,top:e.topMargin,bottom:e.bottomMargin},height:e.height,width:e.width,animationDuration:e.animationDuration,useCanvas:e.useCanvas,zoomBrush:e.zoomBrush,children:[t.jsx(V,{x:e.x,y:e.y,y2:e.y2,color:e.color}),t.jsx(A,{fields:[e.y]}),t.jsx(B,{fields:[e.x]})]}),le=["sin","cos","tan","sinh","cosh"];function pe(e){const C=(e[e.length-1]??s[0]).x+10,r=C*(Math.PI/180);return{x:C,sin:Math.sin(r),cos:Math.cos(r),tan:Math.tan(r),sinh:Math.sinh(r),cosh:Math.cosh(r)}}const ue={initialData:s,randomize:e=>re(e,le,.3),createPoint:pe,minLength:5},$=oe(v,ue),ee=e=>t.jsxs(x,{contextMenu:!1,plotMargin:{left:e.leftMargin,right:e.rightMargin,top:e.topMargin,bottom:e.bottomMargin},data:s,height:e.height,width:e.width,animationDuration:e.animationDuration,useCanvas:e.useCanvas,theme:e.theme,onClick:e.onClick,onMouseOver:e.onMouseOver,onMouseOut:e.onMouseOut,zoomBrush:e.zoomBrush,groupEvents:e.groupEvents,children:[t.jsx(A,{fields:[e.y,e.y2]}),t.jsx(B,{fields:[e.x]}),t.jsx(Z,{x:e.x,ys:[e.y,e.y2]})]}),te=e=>t.jsxs(x,{contextMenu:!1,plotMargin:{left:e.leftMargin,right:e.rightMargin,top:e.topMargin,bottom:e.bottomMargin},data:s,height:e.height,width:e.width,animationDuration:e.animationDuration,theme:e.theme,useCanvas:e.useCanvas,onClick:e.onClick,onMouseOver:e.onMouseOver,onMouseOut:e.onMouseOut,zoomBrush:e.zoomBrush,children:[t.jsx(A,{fields:[e.y,e.y2],aggregate:!0}),t.jsx(B,{fields:[e.x]}),t.jsx(Z,{x:e.x,ys:[e.y,e.y2],stacked:!0})]}),n={name:"Basic Plot",render:$,args:{useCanvas:!1,width:800,height:500,animationDuration:250,color:"#99C1DC",theme:"light",leftMargin:70,rightMargin:40,topMargin:40,bottomMargin:40,y:"sin",x:"x",y2:void 0},play:c({clientX:273,clientY:408},async e=>{a(e);const o=e.querySelector(".tooltip-item");i(o).toBeDefined()})},l={name:"Custom Color",render:v,args:{...n.args,color:"orange"}},p={name:"Stream Graph",render:v,args:{...n.args,y2:"cos"}},u={name:"Using Canvas",render:$,args:{...n.args,useCanvas:!0},play:c({clientX:273,clientY:408},async e=>{a(e);const o=e.querySelector(".tooltip-item");i(o).toBeDefined()})},d={name:"Area with Brush",render:v,args:{...n.args,zoomBrush:"inline",bottomMargin:10}},h={name:"Mutiple Area Plots",render:ee,args:{...n.args,y:"sin",y2:"cos"},play:c({clientX:273,clientY:408},async e=>{a(e);const o=e.querySelector(".tooltip-item");i(o).toBeDefined()})},y={name:"Mutiple Area Plots with Grouped Tooltips",render:ee,args:{...n.args,groupEvents:!0,y:"sin",y2:"cos"},play:c({clientX:273,clientY:408},async e=>{a(e);const o=e.querySelector(".tooltip-item");i(o).toBeDefined()})},g={name:"Stacked Area Plots",render:te,args:{...n.args,y:"sin",y2:"cos"},play:c({clientX:273,clientY:408},async e=>{a(e);const o=e.querySelector(".tooltip-item");i(o).toBeDefined()})},M={name:"Stacked Area Plots with a Brush",render:te,args:{...n.args,y:"sin",y2:"cos",zoomBrush:"inline",bottomMargin:10}};var S,w,D;n.parameters={...n.parameters,docs:{...(S=n.parameters)==null?void 0:S.docs,source:{originalSource:`{
  name: "Basic Plot",
  render: AreaTemplateWithControls,
  args: {
    useCanvas: false,
    width: 800,
    height: 500,
    animationDuration: 250,
    color: "#99C1DC",
    theme: "light",
    leftMargin: 70,
    rightMargin: 40,
    topMargin: 40,
    bottomMargin: 40,
    y: "sin",
    x: "x",
    y2: undefined
  },
  play: createEventReceiverTest({
    clientX: 273,
    clientY: 408
  }, async canvasElement => {
    const canvas = within(canvasElement);
    const tooltip = canvasElement.querySelector(".tooltip-item");
    expect(tooltip).toBeDefined();
  })
}`,...(D=(w=n.parameters)==null?void 0:w.docs)==null?void 0:D.source}}};var T,E,k;l.parameters={...l.parameters,docs:{...(T=l.parameters)==null?void 0:T.docs,source:{originalSource:`{
  name: "Custom Color",
  render: AreaTemplate,
  args: {
    ...Basic.args,
    color: "orange"
  }
}`,...(k=(E=l.parameters)==null?void 0:E.docs)==null?void 0:k.source}}};var j,X,Y;p.parameters={...p.parameters,docs:{...(j=p.parameters)==null?void 0:j.docs,source:{originalSource:`{
  name: "Stream Graph",
  render: AreaTemplate,
  args: {
    ...Basic.args,
    y2: "cos"
  }
}`,...(Y=(X=p.parameters)==null?void 0:X.docs)==null?void 0:Y.source}}};var b,P,z;u.parameters={...u.parameters,docs:{...(b=u.parameters)==null?void 0:b.docs,source:{originalSource:`{
  name: "Using Canvas",
  render: AreaTemplateWithControls,
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
}`,...(z=(P=u.parameters)==null?void 0:P.docs)==null?void 0:z.source}}};var O,q,W;d.parameters={...d.parameters,docs:{...(O=d.parameters)==null?void 0:O.docs,source:{originalSource:`{
  name: "Area with Brush",
  render: AreaTemplate,
  args: {
    ...Basic.args,
    zoomBrush: "inline",
    bottomMargin: 10
  }
}`,...(W=(q=d.parameters)==null?void 0:q.docs)==null?void 0:W.source}}};var R,G,_;h.parameters={...h.parameters,docs:{...(R=h.parameters)==null?void 0:R.docs,source:{originalSource:`{
  name: "Mutiple Area Plots",
  render: AreasTemplate,
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
}`,...(_=(G=h.parameters)==null?void 0:G.docs)==null?void 0:_.source}}};var F,U,I;y.parameters={...y.parameters,docs:{...(F=y.parameters)==null?void 0:F.docs,source:{originalSource:`{
  name: "Mutiple Area Plots with Grouped Tooltips",
  render: AreasTemplate,
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
}`,...(I=(U=y.parameters)==null?void 0:U.docs)==null?void 0:I.source}}};var L,H,J;g.parameters={...g.parameters,docs:{...(L=g.parameters)==null?void 0:L.docs,source:{originalSource:`{
  name: "Stacked Area Plots",
  render: StackedAreasTemplate,
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
}`,...(J=(H=g.parameters)==null?void 0:H.docs)==null?void 0:J.source}}};var K,N,Q;M.parameters={...M.parameters,docs:{...(K=M.parameters)==null?void 0:K.docs,source:{originalSource:`{
  name: "Stacked Area Plots with a Brush",
  render: StackedAreasTemplate,
  args: {
    ...Basic.args,
    y: "sin",
    y2: "cos",
    zoomBrush: "inline",
    bottomMargin: 10
  }
}`,...(Q=(N=M.parameters)==null?void 0:N.docs)==null?void 0:Q.source}}};const st=["Basic","Color","Stream","Canvas","AreaWithBrush","MultipleAreas","MultipleAreasGrouped","StackedAreas","StackedAreasWithBrush"];export{d as AreaWithBrush,n as Basic,u as Canvas,l as Color,h as MultipleAreas,y as MultipleAreasGrouped,g as StackedAreas,M as StackedAreasWithBrush,p as Stream,st as __namedExportsOrder,it as default};
//# sourceMappingURL=Area.stories-DXoO4usH.js.map
