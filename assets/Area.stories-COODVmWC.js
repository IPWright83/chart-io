import{j as t}from"./jsx-runtime-CB_V9I5Y.js";import{f as v,w as r,e as a}from"./index-Dcm7olAB.js";import{w as M}from"./waves-BDt9gctZ.js";import{a as $}from"./argTypes-DuN6ki1s.js";import"./index-D1OPLCpq.js";import"./renderChart-BAvMHNLK.js";import{c as i}from"./storybook-BRKXWPEB.js";import{X as f}from"./index-DWjDrBH7.js";import{a as N,A as Q}from"./Areas-C0BRo5lG.js";import{Y as A}from"./YAxis-DVfVxPRN.js";import{X as B}from"./XAxis-NdVBz2bD.js";import"./index-CTjT7uj6.js";import"./index-Cywu29Xx.js";import"./test-utils-Be8GUZmg.js";import"./client-BipHwt7r.js";import"./index-ChfY_KWg.js";import"./index-DyxbUYfF.js";import"./defaultLocale-D2nGpDRe.js";import"./useStore-D42TxdHf.js";import"./index-Bs4_CWqv.js";import"./defaultLocale-YZNTexTf.js";import"./index-C73EMPtE.js";import"./index-BNKFbkco.js";import"./index-D8HK0Iw4.js";import"./index-BcuBy6DH.js";import"./Legend-DQ2LjqGu.js";import"./index-COgl75ap.js";import"./index-BQDzJjLo.js";import"./Circle-D2bUPI43.js";import"./Line-cv_TynKV.js";import"./Square-DM8ZByYb.js";import"./index-CD7MXqKa.js";import"./index-BOxme2CB.js";import"./index-Cn1GUACH.js";import"./Tooltip-BNhJ7WJH.js";import"./index-BK_JY7l-.js";import"./TooltipItem-Ds3NZ-zA.js";import"./index-e8nDjrQd.js";import"./index-DomMj_LS.js";import"./index-DqBBfSd8.js";import"./interpolateMultiPath-CX2TmtXQ.js";import"./array-2GBN5xbU.js";import"./ensureNoScaleOverflow-BVrwbjHS.js";const{width:ee,height:te,margin:c,useCanvas:ne,theme:oe,color:re}=$,Le={title:"XYCharts/Area",component:N,parameters:{docs:{transformSource:e=>(e=e.replace(/data={\[.*?\]}/gs,"data={[ ...dataset ]}"),e=e.replaceAll(/undefined,?/g,""),e=e.replace(/^\s*\n/gm,""),e)},chromatic:{delay:300}},args:{onClick:v(),onMouseOver:v(),onMouseOut:v()},argTypes:{useCanvas:ne,width:ee,height:te,theme:oe,color:re,leftMargin:c,rightMargin:c,topMargin:c,bottomMargin:c}},s=e=>t.jsxs(f,{data:M,plotMargin:{left:e.leftMargin,right:e.rightMargin,top:e.topMargin,bottom:e.bottomMargin},height:e.height,width:e.width,animationDuration:e.animationDuration,useCanvas:e.useCanvas,zoomBrush:e.zoomBrush,children:[t.jsx(N,{x:e.x,y:e.y,y2:e.y2,color:e.color}),t.jsx(A,{fields:[e.y]}),t.jsx(B,{fields:[e.x]})]}),V=e=>t.jsxs(f,{plotMargin:{left:e.leftMargin,right:e.rightMargin,top:e.topMargin,bottom:e.bottomMargin},data:M,height:e.height,width:e.width,animationDuration:e.animationDuration,useCanvas:e.useCanvas,theme:e.theme,onClick:e.onClick,onMouseOver:e.onMouseOver,onMouseOut:e.onMouseOut,zoomBrush:e.zoomBrush,groupEvents:e.groupEvents,children:[t.jsx(A,{fields:[e.y,e.y2]}),t.jsx(B,{fields:[e.x]}),t.jsx(Q,{x:e.x,ys:[e.y,e.y2]})]}),Z=e=>t.jsxs(f,{plotMargin:{left:e.leftMargin,right:e.rightMargin,top:e.topMargin,bottom:e.bottomMargin},data:M,height:e.height,width:e.width,animationDuration:e.animationDuration,theme:e.theme,useCanvas:e.useCanvas,onClick:e.onClick,onMouseOver:e.onMouseOver,onMouseOut:e.onMouseOut,zoomBrush:e.zoomBrush,children:[t.jsx(A,{fields:[e.y,e.y2],aggregate:!0}),t.jsx(B,{fields:[e.x]}),t.jsx(Q,{x:e.x,ys:[e.y,e.y2],stacked:!0})]}),n={name:"Basic Plot",render:s,args:{useCanvas:!1,width:800,height:500,animationDuration:250,color:"#99C1DC",theme:"light",leftMargin:70,rightMargin:40,topMargin:40,bottomMargin:40,y:"sin",x:"x",y2:void 0},play:i({clientX:273,clientY:408},async e=>{r(e);const o=e.querySelector(".tooltip-item");a(o).toBeDefined()})},m={name:"Custom Color",render:s,args:{...n.args,color:"orange"}},p={name:"Stream Graph",render:s,args:{...n.args,y2:"cos"}},l={name:"Using Canvas",render:s,args:{...n.args,useCanvas:!0},play:i({clientX:273,clientY:408},async e=>{r(e);const o=e.querySelector(".tooltip-item");a(o).toBeDefined()})},u={name:"Area with Brush",render:s,args:{...n.args,zoomBrush:"inline",bottomMargin:10}},d={name:"Mutiple Area Plots",render:V,args:{...n.args,y:"sin",y2:"cos"},play:i({clientX:273,clientY:408},async e=>{r(e);const o=e.querySelector(".tooltip-item");a(o).toBeDefined()})},h={name:"Mutiple Area Plots with Grouped Tooltips",render:V,args:{...n.args,groupEvents:!0,y:"sin",y2:"cos"},play:i({clientX:273,clientY:408},async e=>{r(e);const o=e.querySelector(".tooltip-item");a(o).toBeDefined()})},y={name:"Stacked Area Plots",render:Z,args:{...n.args,y:"sin",y2:"cos"},play:i({clientX:273,clientY:408},async e=>{r(e);const o=e.querySelector(".tooltip-item");a(o).toBeDefined()})},g={name:"Stacked Area Plots with a Brush",render:Z,args:{...n.args,y:"sin",y2:"cos",zoomBrush:"inline",bottomMargin:10}};var x,S,C;n.parameters={...n.parameters,docs:{...(x=n.parameters)==null?void 0:x.docs,source:{originalSource:`{
  name: "Basic Plot",
  render: AreaTemplate,
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
}`,...(C=(S=n.parameters)==null?void 0:S.docs)==null?void 0:C.source}}};var w,E,T;m.parameters={...m.parameters,docs:{...(w=m.parameters)==null?void 0:w.docs,source:{originalSource:`{
  name: "Custom Color",
  render: AreaTemplate,
  args: {
    ...Basic.args,
    color: "orange"
  }
}`,...(T=(E=m.parameters)==null?void 0:E.docs)==null?void 0:T.source}}};var D,k,X;p.parameters={...p.parameters,docs:{...(D=p.parameters)==null?void 0:D.docs,source:{originalSource:`{
  name: "Stream Graph",
  render: AreaTemplate,
  args: {
    ...Basic.args,
    y2: "cos"
  }
}`,...(X=(k=p.parameters)==null?void 0:k.docs)==null?void 0:X.source}}};var j,Y,b;l.parameters={...l.parameters,docs:{...(j=l.parameters)==null?void 0:j.docs,source:{originalSource:`{
  name: "Using Canvas",
  render: AreaTemplate,
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
}`,...(b=(Y=l.parameters)==null?void 0:Y.docs)==null?void 0:b.source}}};var O,q,z;u.parameters={...u.parameters,docs:{...(O=u.parameters)==null?void 0:O.docs,source:{originalSource:`{
  name: "Area with Brush",
  render: AreaTemplate,
  args: {
    ...Basic.args,
    zoomBrush: "inline",
    bottomMargin: 10
  }
}`,...(z=(q=u.parameters)==null?void 0:q.docs)==null?void 0:z.source}}};var P,R,G;d.parameters={...d.parameters,docs:{...(P=d.parameters)==null?void 0:P.docs,source:{originalSource:`{
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
}`,...(G=(R=d.parameters)==null?void 0:R.docs)==null?void 0:G.source}}};var W,_,U;h.parameters={...h.parameters,docs:{...(W=h.parameters)==null?void 0:W.docs,source:{originalSource:`{
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
}`,...(U=(_=h.parameters)==null?void 0:_.docs)==null?void 0:U.source}}};var F,H,I;y.parameters={...y.parameters,docs:{...(F=y.parameters)==null?void 0:F.docs,source:{originalSource:`{
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
}`,...(I=(H=y.parameters)==null?void 0:H.docs)==null?void 0:I.source}}};var J,K,L;g.parameters={...g.parameters,docs:{...(J=g.parameters)==null?void 0:J.docs,source:{originalSource:`{
  name: "Stacked Area Plots with a Brush",
  render: StackedAreasTemplate,
  args: {
    ...Basic.args,
    y: "sin",
    y2: "cos",
    zoomBrush: "inline",
    bottomMargin: 10
  }
}`,...(L=(K=g.parameters)==null?void 0:K.docs)==null?void 0:L.source}}};const Ne=["Basic","Color","Stream","Canvas","AreaWithBrush","MultipleAreas","MultipleAreasGrouped","StackedAreas","StackedAreasWithBrush"];export{u as AreaWithBrush,n as Basic,l as Canvas,m as Color,d as MultipleAreas,h as MultipleAreasGrouped,y as StackedAreas,g as StackedAreasWithBrush,p as Stream,Ne as __namedExportsOrder,Le as default};
//# sourceMappingURL=Area.stories-COODVmWC.js.map
