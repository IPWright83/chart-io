import{j as o}from"./jsx-runtime-vNq4Oc-g.js";import{w as y}from"./index-Qdriakje.js";import{a as I}from"./argTypes-85zPIrV9.js";import{e as A}from"./example_dataset-9KkeoQ7M.js";import{a as G,L as J}from"./Lines-zns-_vZ9.js";import{X as U}from"./index-H7nlrqdg.js";import"./index-CnLlP05v.js";import{c as M}from"./storybook-JflYOSSi.js";import{S as K}from"./Scatters-UnyHYjD2.js";import{Y as V}from"./YAxis-EYrVkw1t.js";import{X as _}from"./XAxis-r21t602H.js";import"./index-4g5l5LRQ.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./Provider--AC3n3ro.js";import"./index-jmm5gWkb.js";import"./client-vNP-bS9o.js";import"./index-PPLHz8o0.js";import"./defaultLocale-RGkPOkAo.js";import"./index-CTVlSsFV.js";import"./interpolateMultiPath-fX-sCjeh.js";import"./array-5Vj4K6aY.js";import"./index-K4Hn1GGT.js";import"./defaultLocale-4fp4Qluw.js";import"./useStore-5GkWK8oz.js";import"./index-7Eg7ybPU.js";import"./index-A_rqIulo.js";import"./index-3lT3xPrt.js";import"./index-rbFQVUQr.js";import"./index-gu_448hd.js";import"./Legend-AepxjzR_.js";import"./index-qFq04NJk.js";import"./index-RAAq-Dtz.js";import"./Circle-2MkuDq74.js";import"./Line-cari06pN.js";import"./Square-_dp0HJFb.js";import"./index-N5QiI7wA.js";import"./index-ibvSOphJ.js";import"./index-0hCrwOlf.js";import"./Tooltip-CF66P4Pc.js";import"./index-W-Z_0x6I.js";import"./TooltipItem-SVu_bEZv.js";import"./index-rmVHmJse.js";import"./index-dosLtsPy.js";import"./index-fcJ2LOVC.js";import"./_baseIsEqual-ujzER7rs.js";import"./index-oRJpL3FP.js";import"./uniq-dzufyT16.js";import"./index-AKtXjuxE.js";import"./renderCanvas-mvVrqX_A.js";const{width:N,height:Q,margin:p,useCanvas:Z,theme:$,color:ee}=I,Qe={title:"XYCharts/Line",component:G,parameters:{docs:{transformSource:e=>(e=e.replace(/data={\[.*?\]}/gs,"data={[ ...dataset ]}"),e=e.replaceAll(/undefined,?/g,""),e=e.replace(/^\s*\n/gm,""),e)},chromatic:{delay:300}},argTypes:{useCanvas:Z,width:N,height:Q,theme:$,color:ee,leftMargin:p,rightMargin:p,topMargin:p,bottomMargin:p,onClick:{action:"clicked"},onMouseOver:{action:"onMouseOver"},onMouseOut:{action:"onMouseOut"}}},F=e=>{const t="Month",f=e.filter(i=>["Aperture","Black Mesa"].includes(i.Owner)).reduce((i,a)=>{const s=i[a[t]]||{};for(let r in a)typeof a[r]=="number"?(s[r]=s[r]||0,s[r]+=a[r]):s[r]=a[r];return i[a[t]]=s,i},{});return Object.keys(f).flatMap(i=>({[t]:new Date(i),...f[i]}))},c=e=>o.jsxs(U,{data:F(A),plotMargin:{left:e.leftMargin,right:e.rightMargin,top:e.topMargin,bottom:e.bottomMargin},width:e.width,height:e.height,animationDuration:e.animationDuration,theme:e.theme,useCanvas:e.useCanvas,onClick:e.onClick,onMouseOver:e.onMouseOver,onMouseOut:e.onMouseOut,zoomBrush:e.zoomBrush,children:[o.jsx(G,{x:e.x,y:e.y,color:e.color,interactive:!e.withScatter}),e.withScatter?o.jsx(K,{x:e.x,y:e.y}):null,o.jsx(V,{fields:[e.y,e.y2,e.y3]}),o.jsx(_,{fields:[e.x]})]}),H=e=>o.jsxs(U,{data:F(A),plotMargin:{left:e.leftMargin,right:e.rightMargin,top:e.topMargin,bottom:e.bottomMargin},width:e.width,height:e.height,animationDuration:e.animationDuration,theme:e.theme,useCanvas:e.useCanvas,onClick:e.onClick,onMouseOver:e.onMouseOver,onMouseOut:e.onMouseOut,zoomBrush:e.zoomBrush,groupEvents:e.groupEvents,children:[o.jsx(V,{fields:[e.y,e.y2]}),o.jsx(_,{fields:[e.x]}),o.jsx(J,{x:e.x,ys:[e.y,e.y2]})]}),n={name:"Basic Plot",render:c,args:{useCanvas:!1,width:800,height:500,animationDuration:500,color:"#99C1DC",theme:"light",leftMargin:70,rightMargin:40,topMargin:40,bottomMargin:40,y:"Unit Sales",x:"Month"},play:M({clientX:273,clientY:408},async e=>{y(e);const t=e.querySelector(".tooltip-item");expect(t).toBeDefined()})},m={name:"Line with Points",render:c,args:{...n.args,withScatter:!0}},l={name:"Custom Color",render:c,args:{...n.args,color:"orange"}},u={name:"Using Canvas",render:c,args:{...n.args,useCanvas:!0},play:M({clientX:273,clientY:408},async e=>{y(e);const t=e.querySelector(".tooltip-item");expect(t).toBeDefined()})},h={name:"Line with Brush",render:c,args:{...n.args,withScatter:!0,zoomBrush:"inline"}},d={name:"Multiple Line Plots",render:H,args:{...n.args,y:"Operating Profit",y2:"Sales Value"},play:M({clientX:273,clientY:408},async e=>{y(e);const t=e.querySelector(".tooltip-item");expect(t).toBeDefined()})},g={name:"Multiple Line Plots with Grouped Tooltips",render:H,args:{...n.args,groupEvents:!0,y:"Operating Profit",y2:"Sales Value"},play:M({clientX:273,clientY:408},async e=>{y(e);const t=e.querySelector(".tooltip-item");expect(t).toBeDefined()})};var v,x,C;n.parameters={...n.parameters,docs:{...(v=n.parameters)==null?void 0:v.docs,source:{originalSource:`{
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
    y: "Unit Sales",
    x: "Month"
  },
  play: createEventReceiverTest({
    clientX: 273,
    clientY: 408
  }, async canvasElement => {
    const canvas = within(canvasElement);
    const tooltip = canvasElement.querySelector(".tooltip-item");
    expect(tooltip).toBeDefined();
  })
}`,...(C=(x=n.parameters)==null?void 0:x.docs)==null?void 0:C.source}}};var L,S,B;m.parameters={...m.parameters,docs:{...(L=m.parameters)==null?void 0:L.docs,source:{originalSource:`{
  name: "Line with Points",
  render: LineTemplate,
  args: {
    ...Basic.args,
    withScatter: true
  }
}`,...(B=(S=m.parameters)==null?void 0:S.docs)==null?void 0:B.source}}};var w,E,O;l.parameters={...l.parameters,docs:{...(w=l.parameters)==null?void 0:w.docs,source:{originalSource:`{
  name: "Custom Color",
  render: LineTemplate,
  args: {
    ...Basic.args,
    color: "orange"
  }
}`,...(O=(E=l.parameters)==null?void 0:E.docs)==null?void 0:O.source}}};var D,T,P;u.parameters={...u.parameters,docs:{...(D=u.parameters)==null?void 0:D.docs,source:{originalSource:`{
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
}`,...(P=(T=u.parameters)==null?void 0:T.docs)==null?void 0:P.source}}};var X,j,Y;h.parameters={...h.parameters,docs:{...(X=h.parameters)==null?void 0:X.docs,source:{originalSource:`{
  name: "Line with Brush",
  render: LineTemplate,
  args: {
    ...Basic.args,
    withScatter: true,
    zoomBrush: "inline"
  }
}`,...(Y=(j=h.parameters)==null?void 0:j.docs)==null?void 0:Y.source}}};var b,k,q;d.parameters={...d.parameters,docs:{...(b=d.parameters)==null?void 0:b.docs,source:{originalSource:`{
  name: "Multiple Line Plots",
  render: LinesTemplate,
  args: {
    ...Basic.args,
    y: "Operating Profit",
    y2: "Sales Value"
  },
  play: createEventReceiverTest({
    clientX: 273,
    clientY: 408
  }, async canvasElement => {
    const canvas = within(canvasElement);
    const tooltip = canvasElement.querySelector(".tooltip-item");
    expect(tooltip).toBeDefined();
  })
}`,...(q=(k=d.parameters)==null?void 0:k.docs)==null?void 0:q.source}}};var z,R,W;g.parameters={...g.parameters,docs:{...(z=g.parameters)==null?void 0:z.docs,source:{originalSource:`{
  name: "Multiple Line Plots with Grouped Tooltips",
  render: LinesTemplate,
  args: {
    ...Basic.args,
    groupEvents: true,
    y: "Operating Profit",
    y2: "Sales Value"
  },
  play: createEventReceiverTest({
    clientX: 273,
    clientY: 408
  }, async canvasElement => {
    const canvas = within(canvasElement);
    const tooltip = canvasElement.querySelector(".tooltip-item");
    expect(tooltip).toBeDefined();
  })
}`,...(W=(R=g.parameters)==null?void 0:R.docs)==null?void 0:W.source}}};const Ze=["Basic","LineWithPoints","Color","Canvas","LineWithBrush","MultipleLines","MultipleLinesWithGrouping"];export{n as Basic,u as Canvas,l as Color,h as LineWithBrush,m as LineWithPoints,d as MultipleLines,g as MultipleLinesWithGrouping,Ze as __namedExportsOrder,Qe as default};
//# sourceMappingURL=Line.stories-splOAg53.js.map
