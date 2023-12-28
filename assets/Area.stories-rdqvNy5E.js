import{j as t}from"./jsx-runtime-vNq4Oc-g.js";import{c as r,e as a}from"./storybook-JflYOSSi.js";import{w as i}from"./index-Qdriakje.js";import{a as Z}from"./argTypes-85zPIrV9.js";import{s as g}from"./sales_records_dataset-6YEpZKGQ.js";import{a as L,A as N}from"./Areas-FRBGw0vI.js";import{X as M}from"./index-H7nlrqdg.js";import"./index-CnLlP05v.js";import{Y as f}from"./YAxis-EYrVkw1t.js";import{X as T}from"./XAxis-r21t602H.js";import"./index-4g5l5LRQ.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./_baseIsEqual-ujzER7rs.js";import"./index-oRJpL3FP.js";import"./uniq-dzufyT16.js";import"./index-AKtXjuxE.js";import"./Provider--AC3n3ro.js";import"./index-jmm5gWkb.js";import"./client-vNP-bS9o.js";import"./index-PPLHz8o0.js";import"./interpolateMultiPath-fX-sCjeh.js";import"./array-5Vj4K6aY.js";import"./useStore-5GkWK8oz.js";import"./index-K4Hn1GGT.js";import"./defaultLocale-4fp4Qluw.js";import"./index-CTVlSsFV.js";import"./ensureNoScaleOverflow-0H3eBhJa.js";import"./index-7Eg7ybPU.js";import"./defaultLocale-RGkPOkAo.js";import"./index-A_rqIulo.js";import"./index-3lT3xPrt.js";import"./index-rbFQVUQr.js";import"./index-gu_448hd.js";import"./Legend-AepxjzR_.js";import"./index-qFq04NJk.js";import"./index-RAAq-Dtz.js";import"./Circle-2MkuDq74.js";import"./Line-cari06pN.js";import"./Square-_dp0HJFb.js";import"./index-N5QiI7wA.js";import"./index-ibvSOphJ.js";import"./index-0hCrwOlf.js";import"./Tooltip-CF66P4Pc.js";import"./index-W-Z_0x6I.js";import"./TooltipItem-SVu_bEZv.js";import"./index-rmVHmJse.js";import"./index-dosLtsPy.js";import"./index-fcJ2LOVC.js";const{width:$,height:ee,margin:c,useCanvas:te,theme:oe,color:ne}=Z,Ze={title:"XYCharts/Area",component:L,parameters:{docs:{transformSource:e=>(e=e.replace(/data={\[.*?\]}/gs,"data={[ ...dataset ]}"),e=e.replaceAll(/undefined,?/g,""),e=e.replace(/^\s*\n/gm,""),e)},chromatic:{delay:300}},argTypes:{useCanvas:te,width:$,height:ee,theme:oe,color:ne,leftMargin:c,rightMargin:c,topMargin:c,bottomMargin:c,onClick:{action:"clicked"},onMouseOver:{action:"onMouseOver"},onMouseOut:{action:"onMouseOut"}}},s=e=>t.jsxs(M,{data:g,plotMargin:{left:e.leftMargin,right:e.rightMargin,top:e.topMargin,bottom:e.bottomMargin},height:e.height,width:e.width,animationDuration:e.animationDuration,useCanvas:e.useCanvas,zoomBrush:e.zoomBrush,children:[t.jsx(L,{x:e.x,y:e.y,y2:e.y2,color:e.color}),t.jsx(f,{fields:[e.y,e.y2,e.y3]}),t.jsx(T,{fields:[e.x]})]}),Q=e=>t.jsxs(M,{plotMargin:{left:e.leftMargin,right:e.rightMargin,top:e.topMargin,bottom:e.bottomMargin},data:g,height:e.height,width:e.width,animationDuration:e.animationDuration,useCanvas:e.useCanvas,theme:e.theme,onClick:e.onClick,onMouseOver:e.onMouseOver,onMouseOut:e.onMouseOut,zoomBrush:e.zoomBrush,groupEvents:e.groupEvents,children:[t.jsx(f,{fields:[e.y,e.y2,e.y3]}),t.jsx(T,{fields:[e.x]}),t.jsx(N,{x:e.x,ys:[e.y,e.y2,e.y3]})]}),V=e=>t.jsxs(M,{plotMargin:{left:e.leftMargin,right:e.rightMargin,top:e.topMargin,bottom:e.bottomMargin},data:g,height:e.height,width:e.width,animationDuration:e.animationDuration,theme:e.theme,useCanvas:e.useCanvas,onClick:e.onClick,onMouseOver:e.onMouseOver,onMouseOut:e.onMouseOut,zoomBrush:e.zoomBrush,children:[t.jsx(f,{fields:[e.y,e.y2,e.y3],aggregate:!0}),t.jsx(T,{fields:[e.x]}),t.jsx(N,{x:e.x,ys:[e.y,e.y2,e.y3],stacked:!0})]}),o={name:"Basic Plot",render:s,args:{useCanvas:!1,width:800,height:500,animationDuration:250,color:"#99C1DC",theme:"light",leftMargin:70,rightMargin:40,topMargin:40,bottomMargin:40,y:"Total Profit",x:"Order Date",y2:void 0},play:r({clientX:273,clientY:408},async e=>{i(e);const n=e.querySelector(".tooltip-item");a(n).toBeDefined()})},l={name:"Custom Color",render:s,args:{...o.args,color:"orange"}},m={name:"Stream Graph",render:s,args:{...o.args,y2:"Total Cost"}},p={name:"Using Canvas",render:s,args:{...o.args,useCanvas:!0},play:r({clientX:273,clientY:408},async e=>{i(e);const n=e.querySelector(".tooltip-item");a(n).toBeDefined()})},u={name:"Area with Brush",render:s,args:{...o.args,zoomBrush:"inline",bottomMargin:10}},d={name:"Mutiple Area Plots",render:Q,args:{...o.args,y:"Total Revenue",y2:"Total Cost",y3:"Total Profit"},play:r({clientX:273,clientY:408},async e=>{i(e);const n=e.querySelector(".tooltip-item");a(n).toBeDefined()})},h={name:"Mutiple Area Plots with Grouped Tooltips",render:Q,args:{...o.args,groupEvents:!0,y:"Total Revenue",y2:"Total Cost",y3:"Total Profit"},play:r({clientX:273,clientY:408},async e=>{i(e);const n=e.querySelector(".tooltip-item");a(n).toBeDefined()})},y={name:"Stacked Area Plots",render:V,args:{...o.args,y:"Total Revenue",y2:"Total Cost",y3:"Total Profit"},play:r({clientX:273,clientY:408},async e=>{i(e);const n=e.querySelector(".tooltip-item");a(n).toBeDefined()})},v={name:"Stacked Area Plots with a Brush",render:V,args:{...o.args,y:"Total Revenue",y2:"Total Cost",y3:"Total Profit",zoomBrush:"inline",bottomMargin:10}};var C,A,B;o.parameters={...o.parameters,docs:{...(C=o.parameters)==null?void 0:C.docs,source:{originalSource:`{
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
    y: "Total Profit",
    x: "Order Date",
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
}`,...(B=(A=o.parameters)==null?void 0:A.docs)==null?void 0:B.source}}};var x,S,w;l.parameters={...l.parameters,docs:{...(x=l.parameters)==null?void 0:x.docs,source:{originalSource:`{
  name: "Custom Color",
  render: AreaTemplate,
  args: {
    ...Basic.args,
    color: "orange"
  }
}`,...(w=(S=l.parameters)==null?void 0:S.docs)==null?void 0:w.source}}};var D,E,P;m.parameters={...m.parameters,docs:{...(D=m.parameters)==null?void 0:D.docs,source:{originalSource:`{
  name: "Stream Graph",
  render: AreaTemplate,
  args: {
    ...Basic.args,
    y2: "Total Cost"
  }
}`,...(P=(E=m.parameters)==null?void 0:E.docs)==null?void 0:P.source}}};var k,O,R;p.parameters={...p.parameters,docs:{...(k=p.parameters)==null?void 0:k.docs,source:{originalSource:`{
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
}`,...(R=(O=p.parameters)==null?void 0:O.docs)==null?void 0:R.source}}};var X,j,Y;u.parameters={...u.parameters,docs:{...(X=u.parameters)==null?void 0:X.docs,source:{originalSource:`{
  name: "Area with Brush",
  render: AreaTemplate,
  args: {
    ...Basic.args,
    zoomBrush: "inline",
    bottomMargin: 10
  }
}`,...(Y=(j=u.parameters)==null?void 0:j.docs)==null?void 0:Y.source}}};var b,q,z;d.parameters={...d.parameters,docs:{...(b=d.parameters)==null?void 0:b.docs,source:{originalSource:`{
  name: "Mutiple Area Plots",
  render: AreasTemplate,
  args: {
    ...Basic.args,
    y: "Total Revenue",
    y2: "Total Cost",
    y3: "Total Profit"
  },
  play: createEventReceiverTest({
    clientX: 273,
    clientY: 408
  }, async canvasElement => {
    const canvas = within(canvasElement);
    const tooltip = canvasElement.querySelector(".tooltip-item");
    expect(tooltip).toBeDefined();
  })
}`,...(z=(q=d.parameters)==null?void 0:q.docs)==null?void 0:z.source}}};var G,_,W;h.parameters={...h.parameters,docs:{...(G=h.parameters)==null?void 0:G.docs,source:{originalSource:`{
  name: "Mutiple Area Plots with Grouped Tooltips",
  render: AreasTemplate,
  args: {
    ...Basic.args,
    groupEvents: true,
    y: "Total Revenue",
    y2: "Total Cost",
    y3: "Total Profit"
  },
  play: createEventReceiverTest({
    clientX: 273,
    clientY: 408
  }, async canvasElement => {
    const canvas = within(canvasElement);
    const tooltip = canvasElement.querySelector(".tooltip-item");
    expect(tooltip).toBeDefined();
  })
}`,...(W=(_=h.parameters)==null?void 0:_.docs)==null?void 0:W.source}}};var U,F,H;y.parameters={...y.parameters,docs:{...(U=y.parameters)==null?void 0:U.docs,source:{originalSource:`{
  name: "Stacked Area Plots",
  render: StackedAreasTemplate,
  args: {
    ...Basic.args,
    y: "Total Revenue",
    y2: "Total Cost",
    y3: "Total Profit"
  },
  play: createEventReceiverTest({
    clientX: 273,
    clientY: 408
  }, async canvasElement => {
    const canvas = within(canvasElement);
    const tooltip = canvasElement.querySelector(".tooltip-item");
    expect(tooltip).toBeDefined();
  })
}`,...(H=(F=y.parameters)==null?void 0:F.docs)==null?void 0:H.source}}};var I,J,K;v.parameters={...v.parameters,docs:{...(I=v.parameters)==null?void 0:I.docs,source:{originalSource:`{
  name: "Stacked Area Plots with a Brush",
  render: StackedAreasTemplate,
  args: {
    ...Basic.args,
    y: "Total Revenue",
    y2: "Total Cost",
    y3: "Total Profit",
    zoomBrush: "inline",
    bottomMargin: 10
  }
}`,...(K=(J=v.parameters)==null?void 0:J.docs)==null?void 0:K.source}}};const $e=["Basic","Color","Stream","Canvas","AreaWithBrush","MultipleAreas","MultipleAreasGrouped","StackedAreas","StackedAreasWithBrush"];export{u as AreaWithBrush,o as Basic,p as Canvas,l as Color,d as MultipleAreas,h as MultipleAreasGrouped,y as StackedAreas,v as StackedAreasWithBrush,m as Stream,$e as __namedExportsOrder,Ze as default};
//# sourceMappingURL=Area.stories-rdqvNy5E.js.map
