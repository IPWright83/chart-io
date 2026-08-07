import{j as a}from"./jsx-runtime-BjG_zV1W.js";import{k as U,R as V}from"./react-redux-BIxttMao.js";import{f as p}from"./index-Dcm7olAB.js";import{a as E}from"./argTypes-DuN6ki1s.js";import"./renderChart-HUqSO_BQ.js";import{a as t,b as F}from"./storybook-C6VSxOor.js";import{A as O,R as Y}from"./index-BrTJ4RzG.js";import{R as G}from"./index-Q6O9tYEF.js";import{R as g}from"./Radar-BIVuLbZS.js";import"./index-DpTt3J-R.js";import"./test-utils-C-DEfvFY.js";import"./index-D5nvoAmD.js";import"./client-CbGTh6y2.js";import"./index-Bd68MpUk.js";import"./index-DnlDykCR.js";import"./index-DrZFwq_W.js";import"./index-Dr9RXvgl.js";import"./XAxis-D7Bs4h5a.js";import"./index-DDyQNOMu.js";import"./YAxis-PGCYKAdu.js";import"./index-CWwNrbNA.js";import"./lodash-DOJiQ2Wu.js";import"./index-BqtyGhDH.js";import"./index-CZ4pHQb2.js";import"./Legend-DQ9XwNwf.js";import"./index-BVPNhhj4.js";import"./index-BmYvQTbQ.js";import"./Circle-Qf3Tu8hN.js";import"./Line-BjKan0E4.js";import"./Square-CZVurtTs.js";import"./index-C_mwV-nm.js";import"./index-DSMIYGhk.js";import"./Tooltip-BrSlbkqa.js";import"./index-CIJ69QRa.js";import"./TooltipItem-C8j0DJCa.js";import"./renderCanvas-DgN6C2Td.js";import"./useTooltip-3W5NWBIO.js";const{width:I,height:L,margin:i,useCanvas:q,theme:z}=E,Be={title:"RadialCharts/Radar",component:g,parameters:{chromatic:{delay:300}},args:{onClick:p(),onMouseOver:p(),onMouseOut:p()},argTypes:{useCanvas:q,width:I,height:L,theme:z,leftMargin:i,rightMargin:i,topMargin:i,bottomMargin:i}},H=["Speed","Power","Defense","Stamina","Agility"],h=[{player:"Player A",Speed:80,Power:65,Defense:70,Stamina:85,Agility:60},{player:"Player B",Speed:60,Power:90,Defense:75,Stamina:55,Agility:80}],j=[...h,{player:"Player C",Speed:75,Power:70,Defense:85,Stamina:65,Agility:90}],J=[...j,{player:"Player D",Speed:55,Power:60,Defense:50,Stamina:90,Agility:45},{player:"Player E",Speed:90,Power:45,Defense:60,Stamina:50,Agility:85}],n=e=>a.jsxs(G,{data:e.data,plotMargin:{left:e.leftMargin,right:e.rightMargin,top:e.topMargin,bottom:e.bottomMargin},width:e.width,height:e.height,animationDuration:e.animationDuration,theme:e.theme,useCanvas:e.useCanvas,onClick:e.onClick,onMouseOver:e.onMouseOver,onMouseOut:e.onMouseOut,children:[a.jsx(O,{fields:"category",domain:e.ys}),a.jsx(Y,{fields:e.ys}),a.jsx(g,{name:"player",ys:e.ys,filled:e.filled})]}),r={name:"Basic Plot",render:n,args:{useCanvas:!1,width:800,height:500,animationDuration:250,theme:U.light,leftMargin:60,rightMargin:60,topMargin:60,bottomMargin:60,data:h,ys:H,filled:!0},play:t("circle.radar-marker",{clientX:416,clientY:76})},o={name:"Using Canvas",render:n,args:{...r.args,useCanvas:!0},play:F({clientX:416,clientY:76})},s={name:"Single Series",render:n,args:{...r.args,data:[h[0]]},play:t("circle.radar-marker",{clientX:416,clientY:76})},l={name:"Three Series",render:n,args:{...r.args,data:j},play:t("circle.radar-marker",{clientX:416,clientY:76})},m={name:"Unfilled (Overlapping Trends)",render:n,args:{...r.args,data:J,filled:!1},play:t("circle.radar-marker",{clientX:416,clientY:97})},d=["memory_gb","cuda_cores","tensor_tflops","ai_score"],K=[{gpu:"RTX 4060 Ti 16GB",memory_gb:16,cuda_cores:4352,tensor_tflops:22,ai_score:8},{gpu:"RTX 4060 Ti 8GB",memory_gb:8,cuda_cores:4352,tensor_tflops:22,ai_score:7},{gpu:"RTX 3060 Ti",memory_gb:8,cuda_cores:4864,tensor_tflops:16,ai_score:5}],f=V({memory_gb:"Memory (GB)",cuda_cores:"CUDA Cores",tensor_tflops:"Tensor Perf (TFLOPS)",ai_score:"AI Score (1-10)"}),N=e=>a.jsxs(G,{data:K,plotMargin:{left:e.leftMargin,right:e.rightMargin,top:e.topMargin,bottom:e.bottomMargin},width:e.width,height:e.height,animationDuration:e.animationDuration,theme:e.theme,useCanvas:e.useCanvas,onClick:e.onClick,onMouseOver:e.onMouseOver,onMouseOut:e.onMouseOut,labeller:f,children:[a.jsx(O,{fields:"category",domain:d,tickFormat:f}),a.jsx(Y,{fields:d}),a.jsx(g,{name:"gpu",ys:d})]}),c={name:"Different Domains per Spoke",render:N,args:{...r.args},play:t("circle.radar-marker",{clientX:416,clientY:76})};var u,y,S;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`{
  name: "Basic Plot",
  render: RadarTemplate,
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
}`,...(S=(y=r.parameters)==null?void 0:y.docs)==null?void 0:S.source}}};var T,M,k;o.parameters={...o.parameters,docs:{...(T=o.parameters)==null?void 0:T.docs,source:{originalSource:`{
  name: "Using Canvas",
  render: RadarTemplate,
  args: {
    ...Basic.args,
    useCanvas: true
  },
  // Targets the "Speed" vertex marker for Player A, near the top of the chart
  play: createCanvasTest({
    clientX: 416,
    clientY: 76
  })
}`,...(k=(M=o.parameters)==null?void 0:M.docs)==null?void 0:k.source}}};var v,P,D;s.parameters={...s.parameters,docs:{...(v=s.parameters)==null?void 0:v.docs,source:{originalSource:`{
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
}`,...(D=(P=s.parameters)==null?void 0:P.docs)==null?void 0:D.source}}};var C,_,R;l.parameters={...l.parameters,docs:{...(C=l.parameters)==null?void 0:C.docs,source:{originalSource:`{
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
}`,...(R=(_=l.parameters)==null?void 0:_.docs)==null?void 0:R.source}}};var x,A,w;m.parameters={...m.parameters,docs:{...(x=m.parameters)==null?void 0:x.docs,source:{originalSource:`{
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
}`,...(w=(A=m.parameters)==null?void 0:A.docs)==null?void 0:w.source}}};var b,X,B;c.parameters={...c.parameters,docs:{...(b=c.parameters)==null?void 0:b.docs,source:{originalSource:`{
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
}`,...(B=(X=c.parameters)==null?void 0:X.docs)==null?void 0:B.source}}};const Oe=["Basic","Canvas","SingleSeries","ThreeSeries","Unfilled","DifferentDomains"];export{r as Basic,o as Canvas,c as DifferentDomains,s as SingleSeries,l as ThreeSeries,m as Unfilled,Oe as __namedExportsOrder,Be as default};
//# sourceMappingURL=Radar.stories-DcH_B6OI.js.map
