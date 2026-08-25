import{j as a}from"./jsx-runtime-BjG_zV1W.js";import{J as W,n as I}from"./index.es-DoiyW41S.js";import{f as g}from"./index-CFMwmiIJ.js";import{a as J}from"./argTypes-DuN6ki1s.js";import{w as z,j as $}from"./dataControls-DatG45sm.js";import"./renderChart-DJ6bXfoi.js";import{a as n,b as q}from"./storybook-Cl2DMVpH.js";import{A as G,R as U}from"./index-CBSNT1TE.js";import{R as V}from"./index-vFMZ7B83.js";import{R as y}from"./Radar-CN15cyaY.js";import"./isChromatic-VqprqId_.js";import"./index-DpTt3J-R.js";import"./react-redux-lkBMRsz6.js";import"./test-utils-C-DEfvFY.js";import"./index-D5nvoAmD.js";import"./client-CbGTh6y2.js";import"./index-VyfXoxD0.js";import"./index-5Gl1ki1p.js";import"./index-DzcEfe_2.js";import"./calculateScale-CBIGWBP9.js";import"./index-DVqBs4fh.js";import"./XAxis-CgOaLwq3.js";import"./index-C8nU8Xpn.js";import"./YAxis-CRYvaCDj.js";import"./index-DC1bvwxr.js";import"./index-D1GbqKuK.js";import"./index-Gn9jQ5lq.js";import"./lodash-DOJiQ2Wu.js";import"./index-CaWU7ljP.js";import"./ContextMenu-Dkh4zLYP.js";import"./index-CsGapHqM.js";import"./index-CFwzIhDn.js";import"./Legend-DQjp6Mmo.js";import"./index-Bp2RIjag.js";import"./index-BmYvQTbQ.js";import"./Circle-Qf3Tu8hN.js";import"./Line-BjKan0E4.js";import"./Square-CZVurtTs.js";import"./index-BkBTUWQV.js";import"./index-DVli7D7_.js";import"./Tooltip-aFreqMLS.js";import"./index-iwe53Xj-.js";import"./TooltipItem-D41oQ2An.js";import"./index-DrWhuguZ.js";import"./interpolatePoints-DwMMV_8i.js";import"./renderCanvas-DSAxZURY.js";import"./useTooltip-B4jsLD3t.js";const{width:H,height:K,margin:i,useCanvas:N,theme:Q}=J,Qe={title:"Charts/RadialCharts/Radar",component:y,parameters:{chromatic:{delay:300}},args:{onClick:g(),onMouseOver:g(),onMouseOut:g()},argTypes:{useCanvas:N,width:H,height:K,theme:Q,leftMargin:i,rightMargin:i,topMargin:i,bottomMargin:i}},d=["Speed","Power","Defense","Stamina","Agility"],h=[{player:"Player A",Speed:80,Power:65,Defense:70,Stamina:85,Agility:60},{player:"Player B",Speed:60,Power:90,Defense:75,Stamina:55,Agility:80}],E=[...h,{player:"Player C",Speed:75,Power:70,Defense:85,Stamina:65,Agility:90}],Z=[...E,{player:"Player D",Speed:55,Power:60,Defense:50,Stamina:90,Agility:45},{player:"Player E",Speed:90,Power:45,Defense:60,Stamina:50,Agility:85}];function ee(e){const t=String.fromCharCode(65+e.length),o=Object.fromEntries(d.map(L=>[L,Math.round(40+Math.random()*55)]));return{player:`Player ${t}`,...o}}function re(e){const t=$(e,d,.2);for(const o of d)t[o]=Math.min(100,Math.max(0,Math.round(t[o])));return t}const ae={initialData:h,randomize:re,createPoint:ee,minLength:1},f=e=>a.jsxs(V,{contextMenu:!1,data:e.data,plotMargin:{left:e.leftMargin,right:e.rightMargin,top:e.topMargin,bottom:e.bottomMargin},width:e.width,height:e.height,animationDuration:e.animationDuration,theme:e.theme,useCanvas:e.useCanvas,onClick:e.onClick,onMouseOver:e.onMouseOver,onMouseOut:e.onMouseOut,children:[a.jsx(G,{fields:"category",domain:e.ys}),a.jsx(U,{fields:e.ys}),a.jsx(y,{name:"player",ys:e.ys,filled:e.filled})]}),F=z(f,ae),r={name:"Basic Plot",render:F,args:{useCanvas:!1,width:800,height:500,animationDuration:250,theme:W.light,leftMargin:60,rightMargin:60,topMargin:60,bottomMargin:60,data:h,ys:d,filled:!0},play:n("circle.radar-marker",{clientX:416,clientY:76})},s={name:"Using Canvas",render:F,args:{...r.args,useCanvas:!0},play:q({clientX:416,clientY:76})},l={name:"Single Series",render:f,args:{...r.args,data:[h[0]]},play:n("circle.radar-marker",{clientX:416,clientY:76})},m={name:"Three Series",render:f,args:{...r.args,data:E},play:n("circle.radar-marker",{clientX:416,clientY:76})},c={name:"Unfilled (Overlapping Trends)",render:f,args:{...r.args,data:Z,filled:!1},play:n("circle.radar-marker",{clientX:416,clientY:97})},u=["memory_gb","cuda_cores","tensor_tflops","ai_score"],te=[{gpu:"RTX 4060 Ti 16GB",memory_gb:16,cuda_cores:4352,tensor_tflops:22,ai_score:8},{gpu:"RTX 4060 Ti 8GB",memory_gb:8,cuda_cores:4352,tensor_tflops:22,ai_score:7},{gpu:"RTX 3060 Ti",memory_gb:8,cuda_cores:4864,tensor_tflops:16,ai_score:5}],S=I({memory_gb:"Memory (GB)",cuda_cores:"CUDA Cores",tensor_tflops:"Tensor Perf (TFLOPS)",ai_score:"AI Score (1-10)"}),ne=e=>a.jsxs(V,{contextMenu:!1,data:te,plotMargin:{left:e.leftMargin,right:e.rightMargin,top:e.topMargin,bottom:e.bottomMargin},width:e.width,height:e.height,animationDuration:e.animationDuration,theme:e.theme,useCanvas:e.useCanvas,onClick:e.onClick,onMouseOver:e.onMouseOver,onMouseOut:e.onMouseOut,labeller:S,children:[a.jsx(G,{fields:"category",domain:u,tickFormat:S}),a.jsx(U,{fields:u}),a.jsx(y,{name:"gpu",ys:u})]}),p={name:"Different Domains per Spoke",render:ne,args:{...r.args},play:n("circle.radar-marker",{clientX:416,clientY:76})};var M,T,C;r.parameters={...r.parameters,docs:{...(M=r.parameters)==null?void 0:M.docs,source:{originalSource:`{
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
}`,...(v=(D=s.parameters)==null?void 0:D.docs)==null?void 0:v.source}}};var k,x,_;l.parameters={...l.parameters,docs:{...(k=l.parameters)==null?void 0:k.docs,source:{originalSource:`{
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
}`,...(_=(x=l.parameters)==null?void 0:x.docs)==null?void 0:_.source}}};var R,w,A;m.parameters={...m.parameters,docs:{...(R=m.parameters)==null?void 0:R.docs,source:{originalSource:`{
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
}`,...(A=(w=m.parameters)==null?void 0:w.docs)==null?void 0:A.source}}};var b,O,j;c.parameters={...c.parameters,docs:{...(b=c.parameters)==null?void 0:b.docs,source:{originalSource:`{
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
}`,...(j=(O=c.parameters)==null?void 0:O.docs)==null?void 0:j.source}}};var X,B,Y;p.parameters={...p.parameters,docs:{...(X=p.parameters)==null?void 0:X.docs,source:{originalSource:`{
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
}`,...(Y=(B=p.parameters)==null?void 0:B.docs)==null?void 0:Y.source}}};const Ze=["Basic","Canvas","SingleSeries","ThreeSeries","Unfilled","DifferentDomains"];export{r as Basic,s as Canvas,p as DifferentDomains,l as SingleSeries,m as ThreeSeries,c as Unfilled,Ze as __namedExportsOrder,Qe as default};
//# sourceMappingURL=Radar.stories-B9YrTsDg.js.map
