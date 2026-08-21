import{j as C}from"./jsx-runtime-BjG_zV1W.js";import{f as p}from"./index-Dcm7olAB.js";import{s as h}from"./sales_records_dataset-WHK6HSqq.js";import{a as ee}from"./argTypes-DuN6ki1s.js";import{w as Ce,j as x}from"./dataControls-DatG45sm.js";import"./react-redux-SPeguAgb.js";import"./renderChart-D1szSHoV.js";import{a as te,b as ae}from"./storybook-CxwCI9RW.js";import{Z as Ae}from"./index-DwL5j-mS.js";import{X as g}from"./index-53SPihoZ.js";import{S as v,a as re}from"./Scatters-3-avvN77.js";import{Y as M}from"./YAxis-BLu4jwFE.js";import{X as f}from"./XAxis-yIVuvz3U.js";import"./isChromatic-VqprqId_.js";import"./index-DpTt3J-R.js";import"./test-utils-C-DEfvFY.js";import"./index-D5nvoAmD.js";import"./client-CbGTh6y2.js";import"./index-Dd_IEiRF.js";import"./index-BRXO1njn.js";import"./lodash-DOJiQ2Wu.js";import"./index-9431aKHi.js";import"./index-sBPFWXw6.js";import"./index-yAu6bW1V.js";import"./index-DhP8WHXK.js";import"./index-Bdes0qwq.js";import"./index-BLxOKznu.js";import"./index-BAzb9S1k.js";import"./Legend-z40re8h9.js";import"./index-Dub0Swig.js";import"./index-BmYvQTbQ.js";import"./Circle-Qf3Tu8hN.js";import"./Line-BjKan0E4.js";import"./Square-CZVurtTs.js";import"./index-DxXlV5JW.js";import"./index-CErv1lK-.js";import"./index-9usyF_v_.js";import"./Tooltip-aPd-LmbL.js";import"./index-CRhM32cg.js";import"./TooltipItem-OfChlkFL.js";import"./index-rx8DGN-B.js";import"./renderCanvas-CR85T-h9.js";function a(){var e="/home/runner/work/chart-io/chart-io/packages/react/src/data/huge_data_set.js",d="d28d8a9f43bbac5cd7a7dd734ba138037549784c",S=window,b="__coverage__",Q={path:"/home/runner/work/chart-io/chart-io/packages/react/src/data/huge_data_set.js",statementMap:{0:{start:{line:1,column:20},end:{line:1,column:22}},1:{start:{line:3,column:0},end:{line:8,column:1}},2:{start:{line:3,column:13},end:{line:3,column:14}},3:{start:{line:4,column:4},end:{line:7,column:7}}},fnMap:{},branchMap:{},s:{0:0,1:0,2:0,3:0},f:{},b:{},inputSourceMap:{version:3,sources:["/home/runner/work/chart-io/chart-io/packages/react/src/data/huge_data_set.js"],names:[],mappings:"AAAA,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;;AAEtB,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AAChC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AACvB,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AAC3C,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AAC/C,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AACN;;AAEA,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;"},_coverageSchema:"1a1c01bbd47fc00a2c39e90264f33305004495a9",hash:"d28d8a9f43bbac5cd7a7dd734ba138037549784c"},A=S[b]||(S[b]={});(!A[e]||A[e].hash!==d)&&(A[e]=Q);var y=A[e];return a=function(){return y},y}a();let I=(a().s[0]++,[]);a().s[1]++;for(let e=(a().s[2]++,0);e<2e4;e++)a().s[3]++,I.push({"Units Sold":Math.random()*1e4,"Total Profit":Math.random()*16e5});const{width:ne,height:oe,margin:r,useCanvas:se,theme:ie,color:ce}=ee,CC={title:"Charts/XYCharts/Scatter",component:v,parameters:{docs:{transformSource:e=>(e=e.replace(/data={\[.*?\]}/gs,"data={[ ...dataset ]}"),e=e.replaceAll(/undefined,?/g,""),e=e.replace(/^\s*\n/gm,""),e)},chromatic:{delay:300}},args:{onClick:p(),onMouseOver:p(),onMouseOut:p()},argTypes:{useCanvas:se,width:ne,height:oe,theme:ie,color:ce,leftMargin:r,rightMargin:r,topMargin:r,bottomMargin:r,radius:{description:"The radius of the points on the chart",control:{type:"range",min:1,max:100},defaultValue:{summary:5}}}},u=e=>C.jsxs(g,{data:e.data,plotMargin:{left:e.leftMargin,right:e.rightMargin,top:e.topMargin,bottom:e.bottomMargin},width:e.width,height:e.height,animationDuration:e.animationDuration,theme:e.theme,useCanvas:e.useCanvas,onClick:e.onClick,onMouseOver:e.onMouseOver,onMouseOut:e.onMouseOut,children:[C.jsx(M,{fields:[e.y,e.y2,e.y3]}),C.jsx(f,{fields:[e.x]}),C.jsx(v,{x:e.x,y:e.y,radius:e.radius,color:e.color,noClip:!0})]}),T=["Units Sold","Unit Price","Unit Cost","Total Revenue","Total Cost","Total Profit"],me={initialData:h,randomize:e=>x(e,T,.3),createPoint:e=>x(e[Math.floor(Math.random()*e.length)],T,.3),minLength:5},J=Ce(u,me),K=e=>C.jsxs(g,{plotMargin:{left:e.leftMargin,right:e.rightMargin,top:e.topMargin,bottom:e.bottomMargin},data:h,width:e.width,height:e.height,animationDuration:e.animationDuration,theme:e.theme,useCanvas:e.useCanvas,onClick:e.onClick,onMouseOver:e.onMouseOver,onMouseOut:e.onMouseOut,children:[C.jsx(M,{fields:[e.y,e.y2,e.y3]}),C.jsx(f,{fields:[e.x]}),C.jsx(re,{x:e.x,ys:[e.y,e.y2,e.y3],radius:e.radius})]}),t={name:"Basic Plot",render:J,args:{useCanvas:!1,width:800,height:500,animationDuration:250,color:"#99C1DC",theme:"light",radius:5,leftMargin:70,rightMargin:40,topMargin:40,bottomMargin:40,data:h,y:"Total Profit",x:"Units Sold"},play:te("circle",{clientX:773,clientY:227})},n={name:"Custom Radius",render:u,args:{...t.args,radius:15}},o={name:"Custom Color",render:u,args:{...t.args,color:"orange"}},s={name:"Using Canvas",render:J,args:{...t.args,useCanvas:!0},play:ae({clientX:773,clientY:227})},i={name:"Mutiple Scatter Plots",render:K,args:{...t.args,y2:"Total Revenue",y3:"Total Cost"}},c={name:"Mutiple Scatter Plots using Canvas",render:K,args:{...t.args,y2:"Total Revenue",y3:"Total Cost",useCanvas:!0}},le=e=>C.jsxs(g,{data:e.data,plotMargin:{left:e.leftMargin,right:e.rightMargin,top:e.topMargin,bottom:e.bottomMargin},width:e.width,height:e.height,animationDuration:e.animationDuration,theme:e.theme,useCanvas:e.useCanvas,children:[C.jsx(M,{fields:[e.y]}),C.jsx(f,{fields:[e.x]}),C.jsx(Ae,{fields:[e.z],tickFormat:d=>`$${d}`}),C.jsx(v,{x:e.x,y:e.y,z:e.z,color:e.color,noClip:!0})]}),m={name:"Sizing bubbles with ZAxis",render:le,args:{...t.args,z:"Unit Price"}},l={name:"Progressive Rendering large datasets",render:u,args:{...t.args,animationDuration:0,data:I,height:500,useCanvas:!0,radius:3,width:800},parameters:{chromatic:{disableSnapshot:!0}}};var _,j,w;t.parameters={...t.parameters,docs:{...(_=t.parameters)==null?void 0:_.docs,source:{originalSource:`{
  name: "Basic Plot",
  render: ScatterTemplateWithControls,
  args: {
    useCanvas: false,
    width: 800,
    height: 500,
    animationDuration: 250,
    color: "#99C1DC",
    theme: "light",
    radius: 5,
    leftMargin: 70,
    rightMargin: 40,
    topMargin: 40,
    bottomMargin: 40,
    data: sales_records_dataset,
    y: "Total Profit",
    x: "Units Sold"
  },
  play: createSVGTest("circle", {
    clientX: 773,
    clientY: 227
  })
}`,...(w=(j=t.parameters)==null?void 0:j.docs)==null?void 0:w.source}}};var P,B,D;n.parameters={...n.parameters,docs:{...(P=n.parameters)==null?void 0:P.docs,source:{originalSource:`{
  name: "Custom Radius",
  render: ScatterTemplate,
  args: {
    ...Basic.args,
    radius: 15
  }
}`,...(D=(B=n.parameters)==null?void 0:B.docs)==null?void 0:D.source}}};var R,k,z;o.parameters={...o.parameters,docs:{...(R=o.parameters)==null?void 0:R.docs,source:{originalSource:`{
  name: "Custom Color",
  render: ScatterTemplate,
  args: {
    ...Basic.args,
    color: "orange"
  }
}`,...(z=(k=o.parameters)==null?void 0:k.docs)==null?void 0:z.source}}};var O,U,X;s.parameters={...s.parameters,docs:{...(O=s.parameters)==null?void 0:O.docs,source:{originalSource:`{
  name: "Using Canvas",
  render: ScatterTemplateWithControls,
  args: {
    ...Basic.args,
    useCanvas: true
  },
  play: createCanvasTest({
    clientX: 773,
    clientY: 227
  })
}`,...(X=(U=s.parameters)==null?void 0:U.docs)==null?void 0:X.source}}};var Y,E,Z;i.parameters={...i.parameters,docs:{...(Y=i.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  name: "Mutiple Scatter Plots",
  render: ScattersTemplate,
  args: {
    ...Basic.args,
    y2: "Total Revenue",
    y3: "Total Cost"
  }
}`,...(Z=(E=i.parameters)==null?void 0:E.docs)==null?void 0:Z.source}}};var F,V,W;c.parameters={...c.parameters,docs:{...(F=c.parameters)==null?void 0:F.docs,source:{originalSource:`{
  name: "Mutiple Scatter Plots using Canvas",
  render: ScattersTemplate,
  args: {
    ...Basic.args,
    y2: "Total Revenue",
    y3: "Total Cost",
    useCanvas: true
  }
}`,...(W=(V=c.parameters)==null?void 0:V.docs)==null?void 0:W.source}}};var G,$,L;m.parameters={...m.parameters,docs:{...(G=m.parameters)==null?void 0:G.docs,source:{originalSource:`{
  name: "Sizing bubbles with ZAxis",
  render: BubbleSizeTemplate,
  args: {
    ...Basic.args,
    z: "Unit Price"
  }
}`,...(L=($=m.parameters)==null?void 0:$.docs)==null?void 0:L.source}}};var N,q,H;l.parameters={...l.parameters,docs:{...(N=l.parameters)==null?void 0:N.docs,source:{originalSource:`{
  name: "Progressive Rendering large datasets",
  render: ScatterTemplate,
  args: {
    ...Basic.args,
    animationDuration: 0,
    data: huge_data_set,
    height: 500,
    useCanvas: true,
    radius: 3,
    width: 800
  },
  parameters: {
    chromatic: {
      disableSnapshot: true
    }
  }
}`,...(H=(q=l.parameters)==null?void 0:q.docs)==null?void 0:H.source}}};const tC=["Basic","Radius","Color","Canvas","MultipleScatter","MultipleScatterCanvas","BubbleSize","ProgresssiveRendering"];export{t as Basic,m as BubbleSize,s as Canvas,o as Color,i as MultipleScatter,c as MultipleScatterCanvas,l as ProgresssiveRendering,n as Radius,tC as __namedExportsOrder,CC as default};
//# sourceMappingURL=Scatter.stories-By_PT8zA.js.map
