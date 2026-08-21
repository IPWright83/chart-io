import{j as a}from"./jsx-runtime-BjG_zV1W.js";import{V as L,c as W}from"./react-redux-SPeguAgb.js";import{f as g}from"./index-Dcm7olAB.js";import{a as z}from"./argTypes-DuN6ki1s.js";import{w as $,j as q}from"./dataControls-DatG45sm.js";import"./renderChart-D1szSHoV.js";import{a as n,b as H}from"./storybook-CxwCI9RW.js";import{A as G,R as V}from"./index-DwL5j-mS.js";import{R as U}from"./index-CvJ_dlQX.js";import{R as y}from"./Radar-CXAo-9wZ.js";import"./index-DpTt3J-R.js";import"./isChromatic-VqprqId_.js";import"./test-utils-C-DEfvFY.js";import"./index-D5nvoAmD.js";import"./client-CbGTh6y2.js";import"./index-Dd_IEiRF.js";import"./index-BRXO1njn.js";import"./lodash-DOJiQ2Wu.js";import"./index-9431aKHi.js";import"./index-sBPFWXw6.js";import"./XAxis-yIVuvz3U.js";import"./index-yAu6bW1V.js";import"./YAxis-BLu4jwFE.js";import"./index-B6Lr3Qa8.js";import"./index-BLxOKznu.js";import"./index-BAzb9S1k.js";import"./Legend-z40re8h9.js";import"./index-Dub0Swig.js";import"./index-BmYvQTbQ.js";import"./Circle-Qf3Tu8hN.js";import"./Line-BjKan0E4.js";import"./Square-CZVurtTs.js";import"./index-DxXlV5JW.js";import"./index-9usyF_v_.js";import"./Tooltip-aPd-LmbL.js";import"./index-CRhM32cg.js";import"./TooltipItem-OfChlkFL.js";import"./index-BBDmPaB_.js";import"./interpolatePoints-DwMMV_8i.js";import"./renderCanvas-CR85T-h9.js";import"./useTooltip-BlFpqfM-.js";const{width:J,height:K,margin:i,useCanvas:N,theme:Q}=z,$e={title:"Charts/RadialCharts/Radar",component:y,parameters:{chromatic:{delay:300}},args:{onClick:g(),onMouseOver:g(),onMouseOut:g()},argTypes:{useCanvas:N,width:J,height:K,theme:Q,leftMargin:i,rightMargin:i,topMargin:i,bottomMargin:i}},d=["Speed","Power","Defense","Stamina","Agility"],h=[{player:"Player A",Speed:80,Power:65,Defense:70,Stamina:85,Agility:60},{player:"Player B",Speed:60,Power:90,Defense:75,Stamina:55,Agility:80}],E=[...h,{player:"Player C",Speed:75,Power:70,Defense:85,Stamina:65,Agility:90}],Z=[...E,{player:"Player D",Speed:55,Power:60,Defense:50,Stamina:90,Agility:45},{player:"Player E",Speed:90,Power:45,Defense:60,Stamina:50,Agility:85}];function ee(e){const t=String.fromCharCode(65+e.length),o=Object.fromEntries(d.map(I=>[I,Math.round(40+Math.random()*55)]));return{player:`Player ${t}`,...o}}function re(e){const t=q(e,d,.2);for(const o of d)t[o]=Math.min(100,Math.max(0,Math.round(t[o])));return t}const ae={initialData:h,randomize:re,createPoint:ee,minLength:1},f=e=>a.jsxs(U,{data:e.data,plotMargin:{left:e.leftMargin,right:e.rightMargin,top:e.topMargin,bottom:e.bottomMargin},width:e.width,height:e.height,animationDuration:e.animationDuration,theme:e.theme,useCanvas:e.useCanvas,onClick:e.onClick,onMouseOver:e.onMouseOver,onMouseOut:e.onMouseOut,children:[a.jsx(G,{fields:"category",domain:e.ys}),a.jsx(V,{fields:e.ys}),a.jsx(y,{name:"player",ys:e.ys,filled:e.filled})]}),F=$(f,ae),r={name:"Basic Plot",render:F,args:{useCanvas:!1,width:800,height:500,animationDuration:250,theme:L.light,leftMargin:60,rightMargin:60,topMargin:60,bottomMargin:60,data:h,ys:d,filled:!0},play:n("circle.radar-marker",{clientX:416,clientY:76})},s={name:"Using Canvas",render:F,args:{...r.args,useCanvas:!0},play:H({clientX:416,clientY:76})},l={name:"Single Series",render:f,args:{...r.args,data:[h[0]]},play:n("circle.radar-marker",{clientX:416,clientY:76})},m={name:"Three Series",render:f,args:{...r.args,data:E},play:n("circle.radar-marker",{clientX:416,clientY:76})},c={name:"Unfilled (Overlapping Trends)",render:f,args:{...r.args,data:Z,filled:!1},play:n("circle.radar-marker",{clientX:416,clientY:97})},u=["memory_gb","cuda_cores","tensor_tflops","ai_score"],te=[{gpu:"RTX 4060 Ti 16GB",memory_gb:16,cuda_cores:4352,tensor_tflops:22,ai_score:8},{gpu:"RTX 4060 Ti 8GB",memory_gb:8,cuda_cores:4352,tensor_tflops:22,ai_score:7},{gpu:"RTX 3060 Ti",memory_gb:8,cuda_cores:4864,tensor_tflops:16,ai_score:5}],S=W({memory_gb:"Memory (GB)",cuda_cores:"CUDA Cores",tensor_tflops:"Tensor Perf (TFLOPS)",ai_score:"AI Score (1-10)"}),ne=e=>a.jsxs(U,{data:te,plotMargin:{left:e.leftMargin,right:e.rightMargin,top:e.topMargin,bottom:e.bottomMargin},width:e.width,height:e.height,animationDuration:e.animationDuration,theme:e.theme,useCanvas:e.useCanvas,onClick:e.onClick,onMouseOver:e.onMouseOver,onMouseOut:e.onMouseOut,labeller:S,children:[a.jsx(G,{fields:"category",domain:u,tickFormat:S}),a.jsx(V,{fields:u}),a.jsx(y,{name:"gpu",ys:u})]}),p={name:"Different Domains per Spoke",render:ne,args:{...r.args},play:n("circle.radar-marker",{clientX:416,clientY:76})};var M,T,C;r.parameters={...r.parameters,docs:{...(M=r.parameters)==null?void 0:M.docs,source:{originalSource:`{
  name: "Basic Plot",
  render: RadarTemplateWithControls,
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
    data: twoPlayers,
    ys: skills,
    filled: true
  },
  // Targets the "Speed" vertex marker for Player A, near the top of the chart
  play: createSVGTest("circle.radar-marker", {
    clientX: 416,
    clientY: 76
  })
}`,...(C=(T=r.parameters)==null?void 0:T.docs)==null?void 0:C.source}}};var P,D,v;s.parameters={...s.parameters,docs:{...(P=s.parameters)==null?void 0:P.docs,source:{originalSource:`{
  name: "Using Canvas",
  render: RadarTemplateWithControls,
  args: {
    ...Basic.args,
    useCanvas: true
  },
  // Targets the "Speed" vertex marker for Player A, near the top of the chart
  play: createCanvasTest({
    clientX: 416,
    clientY: 76
  })
}`,...(v=(D=s.parameters)==null?void 0:D.docs)==null?void 0:v.source}}};var k,_,x;l.parameters={...l.parameters,docs:{...(k=l.parameters)==null?void 0:k.docs,source:{originalSource:`{
  name: "Single Series",
  render: RadarTemplate,
  args: {
    ...Basic.args,
    data: [twoPlayers[0]]
  },
  // Targets the "Speed" vertex marker for Player A, near the top of the chart
  play: createSVGTest("circle.radar-marker", {
    clientX: 416,
    clientY: 76
  })
}`,...(x=(_=l.parameters)==null?void 0:_.docs)==null?void 0:x.source}}};var R,w,A;m.parameters={...m.parameters,docs:{...(R=m.parameters)==null?void 0:R.docs,source:{originalSource:`{
  name: "Three Series",
  render: RadarTemplate,
  args: {
    ...Basic.args,
    data: threePlayers
  },
  // Targets the "Speed" vertex marker for Player A, near the top of the chart
  play: createSVGTest("circle.radar-marker", {
    clientX: 416,
    clientY: 76
  })
}`,...(A=(w=m.parameters)==null?void 0:w.docs)==null?void 0:A.source}}};var b,j,O;c.parameters={...c.parameters,docs:{...(b=c.parameters)==null?void 0:b.docs,source:{originalSource:`{
  name: "Unfilled (Overlapping Trends)",
  render: RadarTemplate,
  args: {
    ...Basic.args,
    data: manyPlayers,
    filled: false
  },
  // Targets the "Speed" vertex marker for Player A, near the top of the chart. Its radius (and so
  // its screen position) differs slightly from the other stories, since the shared domain now
  // spans 5 players instead of 2-3
  play: createSVGTest("circle.radar-marker", {
    clientX: 416,
    clientY: 97
  })
}`,...(O=(j=c.parameters)==null?void 0:j.docs)==null?void 0:O.source}}};var X,B,Y;p.parameters={...p.parameters,docs:{...(X=p.parameters)==null?void 0:X.docs,source:{originalSource:`{
  name: "Different Domains per Spoke",
  render: DifferentDomainsTemplate,
  args: {
    ...Basic.args
  },
  // Targets the "Memory (GB)" vertex marker for the first GPU, near the top of the chart
  play: createSVGTest("circle.radar-marker", {
    clientX: 416,
    clientY: 76
  })
}`,...(Y=(B=p.parameters)==null?void 0:B.docs)==null?void 0:Y.source}}};const qe=["Basic","Canvas","SingleSeries","ThreeSeries","Unfilled","DifferentDomains"];export{r as Basic,s as Canvas,p as DifferentDomains,l as SingleSeries,m as ThreeSeries,c as Unfilled,qe as __namedExportsOrder,$e as default};
//# sourceMappingURL=Radar.stories-DvkRMY5u.js.map
