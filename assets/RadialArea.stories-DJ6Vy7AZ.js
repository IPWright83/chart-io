import{j as a}from"./jsx-runtime-BjG_zV1W.js";import{V as Y}from"./react-redux-SPeguAgb.js";import{f as l}from"./index-Dcm7olAB.js";import{a as B}from"./argTypes-DuN6ki1s.js";import{w as E,j as X}from"./dataControls-DatG45sm.js";import"./renderChart-D1szSHoV.js";import{c as p}from"./storybook-CxwCI9RW.js";import{A as w,R as T}from"./index-DwL5j-mS.js";import{R as j}from"./index-CvJ_dlQX.js";import{R as y,a as P}from"./RadialAreas-3Hf8RTIB.js";import"./index-DpTt3J-R.js";import"./isChromatic-VqprqId_.js";import"./test-utils-C-DEfvFY.js";import"./index-D5nvoAmD.js";import"./client-CbGTh6y2.js";import"./index-Dd_IEiRF.js";import"./index-BRXO1njn.js";import"./lodash-DOJiQ2Wu.js";import"./index-9431aKHi.js";import"./index-sBPFWXw6.js";import"./XAxis-yIVuvz3U.js";import"./index-yAu6bW1V.js";import"./YAxis-BLu4jwFE.js";import"./index-B6Lr3Qa8.js";import"./index-BLxOKznu.js";import"./index-BAzb9S1k.js";import"./Legend-z40re8h9.js";import"./index-Dub0Swig.js";import"./index-BmYvQTbQ.js";import"./Circle-Qf3Tu8hN.js";import"./Line-BjKan0E4.js";import"./Square-CZVurtTs.js";import"./index-DxXlV5JW.js";import"./index-9usyF_v_.js";import"./Tooltip-aPd-LmbL.js";import"./index-CRhM32cg.js";import"./TooltipItem-OfChlkFL.js";import"./index-BBDmPaB_.js";const{width:F,height:U,margin:o,useCanvas:_,theme:L}=B,Ot={title:"Charts/RadialCharts/RadialArea",component:y,parameters:{chromatic:{delay:300}},args:{onClick:l(),onMouseOver:l(),onMouseOut:l()},argTypes:{useCanvas:_,width:F,height:U,theme:L,leftMargin:o,rightMargin:o,topMargin:o,bottomMargin:o}};function A(t,e,i){return Array.from({length:365},(u,n)=>{const S=new Date(2024,0,n+1),O=i-e*Math.cos(2*Math.PI*n/365),b=Math.sin(n*.15+t)*2+Math.sin(n*.37+t)*1;return{date:S,temperature:Math.max(0,Math.round((O+b)*10)/10)}})}const c=A(0,12,15),D=A(0,12,15).map((t,e)=>({date:t.date,"New York":t.temperature,Miami:Math.max(0,Math.round((24-6*Math.cos(2*Math.PI*e/365)+Math.sin(e*.15)*1.5)*10)/10)}));function N(t){const e=t[t.length-1]??c[0],i=new Date(e.date);i.setDate(i.getDate()+1);const u=Math.max(0,Math.round((e.temperature+(Math.random()*4-2))*10)/10);return{date:i,temperature:u}}function W(t){const e=X(t,["temperature"],.15);return{...e,temperature:Math.max(0,e.temperature)}}const I={initialData:c,randomize:W,createPoint:N,minLength:30},V=t=>a.jsxs(j,{data:t.data,plotMargin:{left:t.leftMargin,right:t.rightMargin,top:t.topMargin,bottom:t.bottomMargin},width:t.width,height:t.height,animationDuration:t.animationDuration,theme:t.theme,useCanvas:t.useCanvas,onClick:t.onClick,onMouseOver:t.onMouseOver,onMouseOut:t.onMouseOut,children:[a.jsx(w,{fields:"date",scaleType:"time",ticks:12,tickFormat:e=>e.toLocaleString("en-US",{month:"short"})}),a.jsx(T,{fields:"temperature",tickFormat:e=>`${e}°`}),a.jsx(y,{x:"date",y:"temperature",closed:!0})]}),z=t=>a.jsxs(j,{data:D,plotMargin:{left:t.leftMargin,right:t.rightMargin,top:t.topMargin,bottom:t.bottomMargin},width:t.width,height:t.height,animationDuration:t.animationDuration,theme:t.theme,useCanvas:t.useCanvas,onClick:t.onClick,onMouseOver:t.onMouseOver,onMouseOut:t.onMouseOut,children:[a.jsx(w,{fields:"date",scaleType:"time",ticks:12,tickFormat:e=>e.toLocaleString("en-US",{month:"short"})}),a.jsx(T,{fields:["Miami","New York"],domain:[0,35]}),a.jsx(P,{x:"date",ys:["Miami","New York"],closed:!0})]}),k=E(V,I),r={name:"Basic Plot",render:k,args:{useCanvas:!1,width:800,height:500,animationDuration:250,theme:Y.light,leftMargin:60,rightMargin:60,topMargin:60,bottomMargin:60,data:c},play:p({clientX:400,clientY:60})},s={name:"Using Canvas",render:k,args:{...r.args,useCanvas:!0},play:p({clientX:400,clientY:60})},m={name:"Multiple Series",render:z,args:{...r.args,data:D},play:p({clientX:400,clientY:60})};var h,d,M;r.parameters={...r.parameters,docs:{...(h=r.parameters)==null?void 0:h.docs,source:{originalSource:`{
  name: "Basic Plot",
  render: RadialAreaTemplateWithControls,
  args: {
    useCanvas: false,
    width: 800,
    height: 500,
    animationDuration: 250,
    theme: themes.light,
    leftMargin: 60,
    rightMargin: 60,
    topMargin: 60,
    bottomMargin: 60,
    data: singleCity
  },
  play: createEventReceiverTest({
    clientX: 400,
    clientY: 60
  })
}`,...(M=(d=r.parameters)==null?void 0:d.docs)==null?void 0:M.source}}};var g,f,C;s.parameters={...s.parameters,docs:{...(g=s.parameters)==null?void 0:g.docs,source:{originalSource:`{
  name: "Using Canvas",
  render: RadialAreaTemplateWithControls,
  args: {
    ...Basic.args,
    useCanvas: true
  },
  play: createEventReceiverTest({
    clientX: 400,
    clientY: 60
  })
}`,...(C=(f=s.parameters)==null?void 0:f.docs)==null?void 0:C.source}}};var v,x,R;m.parameters={...m.parameters,docs:{...(v=m.parameters)==null?void 0:v.docs,source:{originalSource:`{
  name: "Multiple Series",
  render: MultiSeriesTemplate,
  args: {
    ...Basic.args,
    data: twoCities
  },
  play: createEventReceiverTest({
    clientX: 400,
    clientY: 60
  })
}`,...(R=(x=m.parameters)==null?void 0:x.docs)==null?void 0:R.source}}};const bt=["Basic","Canvas","MultipleSeries"];export{r as Basic,s as Canvas,m as MultipleSeries,bt as __namedExportsOrder,Ot as default};
//# sourceMappingURL=RadialArea.stories-DJ6Vy7AZ.js.map
