import{j as t}from"./jsx-runtime-BjG_zV1W.js";import{J as l}from"./index.es-DoiyW41S.js";import{f as p}from"./index-CFMwmiIJ.js";import{s as P}from"./sales_records_dataset-WHK6HSqq.js";import{a as q}from"./argTypes-DuN6ki1s.js";import{w as z,j as R}from"./dataControls-DatG45sm.js";import"./renderChart-DJ6bXfoi.js";import{a as u,b as L}from"./storybook-Cl2DMVpH.js";import"./index-CBSNT1TE.js";import{X as _}from"./index-DMa6aJSy.js";import{B as d,a as N}from"./Bars-gIikB3lP.js";import{l as $}from"./lodash-DOJiQ2Wu.js";import{Y as V}from"./YAxis-CRYvaCDj.js";import{X as A}from"./XAxis-CgOaLwq3.js";import"./isChromatic-VqprqId_.js";import"./index-DpTt3J-R.js";import"./react-redux-lkBMRsz6.js";import"./test-utils-C-DEfvFY.js";import"./index-D5nvoAmD.js";import"./client-CbGTh6y2.js";import"./index-VyfXoxD0.js";import"./index-5Gl1ki1p.js";import"./index-DzcEfe_2.js";import"./calculateScale-CBIGWBP9.js";import"./index-DVqBs4fh.js";import"./index-C8nU8Xpn.js";import"./index-DC1bvwxr.js";import"./index-Gn9jQ5lq.js";import"./index-CaWU7ljP.js";import"./ContextMenu-Dkh4zLYP.js";import"./index-HNMvlCFe.js";import"./index-DVRV05yR.js";import"./index-CsGapHqM.js";import"./index-CFwzIhDn.js";import"./Legend-DQjp6Mmo.js";import"./index-Bp2RIjag.js";import"./index-BmYvQTbQ.js";import"./Circle-Qf3Tu8hN.js";import"./Line-BjKan0E4.js";import"./Square-CZVurtTs.js";import"./index-BkBTUWQV.js";import"./index-CCgpevYr.js";import"./index-DVli7D7_.js";import"./Tooltip-aFreqMLS.js";import"./index-iwe53Xj-.js";import"./TooltipItem-D41oQ2An.js";import"./index-Dn87vz0y.js";import"./renderCanvas-DSAxZURY.js";const{width:H,height:K,margin:o,useCanvas:Q,theme:Z,color:ee}=q,Ke={title:"Charts/XYCharts/Bar",component:d,parameters:{docs:{transformSource:e=>(e=e.replace(/data={\[.*?\]}/gs,"data={[ ...dataset ]}"),e=e.replaceAll(/undefined,?/g,""),e=e.replace(/^\s*\n/gm,""),e)},chromatic:{delay:300}},args:{onClick:p(),onMouseOver:p(),onMouseOut:p()},argTypes:{useCanvas:Q,width:H,height:K,theme:Z,color:ee,leftMargin:o,rightMargin:o,topMargin:o,bottomMargin:o}},h=$.uniqBy(P,e=>e["Item Type"]),E=["Units Sold","Unit Price","Unit Cost","Total Revenue","Total Cost","Total Profit"];function te(e){const J=new Set(e.map(c=>c["Item Type"])),C=P.find(c=>!J.has(c["Item Type"]));if(C)return C;const f=e[Math.floor(Math.random()*e.length)];return R({...f,"Item Type":`${f["Item Type"]} (New)`},E,.3)}const re={initialData:h,randomize:e=>R(e,E,.3),createPoint:te,minLength:2},g=e=>t.jsxs(_,{contextMenu:!1,data:e.data??h,plotMargin:{left:e.leftMargin,right:e.rightMargin,top:e.topMargin,bottom:e.bottomMargin},width:e.width,height:e.height,animationDuration:e.animationDuration,theme:e.theme,useCanvas:e.useCanvas,onClick:e.onClick,onMouseOver:e.onMouseOver,onMouseOut:e.onMouseOut,children:[t.jsx(V,{fields:[e.y],scaleType:"band",showGridlines:!1}),t.jsx(A,{fields:[e.x,e.x2,e.x3]}),t.jsx(d,{x:e.x,y:e.y,color:e.color}),e.x2&&t.jsx(d,{x:e.x2,y:e.y,color:e.color2})]}),W=z(g,re),F=e=>t.jsxs(_,{contextMenu:!1,data:h,plotMargin:{left:e.leftMargin,right:e.rightMargin,top:e.topMargin,bottom:e.bottomMargin},width:e.width,height:e.height,animationDuration:e.animationDuration,useCanvas:e.useCanvas,theme:e.theme,onClick:e.onClick,onMouseOver:e.onMouseOver,onMouseOut:e.onMouseOut,children:[t.jsx(V,{fields:[e.y],scaleType:"band",showGridlines:!1}),t.jsx(A,{fields:[e.x,e.x2,e.x3],aggregate:e.stacked}),t.jsx(N,{y:e.y,xs:[e.x,e.x2],grouped:e.grouped,stacked:e.stacked})]}),r={name:"Basic Plot",render:W,args:{useCanvas:!1,width:800,height:500,animationDuration:250,color:"#99C1DC",color2:"#fc998e",theme:l.light,leftMargin:120,rightMargin:40,topMargin:40,bottomMargin:40,x:"Unit Price",y:"Item Type"},play:u("rect.bar",{clientX:107,clientY:396})},a={name:"Custom Color",render:g,args:{...r.args,color:"orange"}},n={name:"Using Canvas",render:W,args:{...r.args,useCanvas:!0},play:L({clientX:245,clientY:455})},i={name:"Ratio Bars",render:g,args:{...r.args,x2:"Unit Cost",theme:{...l.light,series:{...l.light.series,opacity:1}}}},s={name:"Stacked Bars",render:F,args:{...r.args,x2:"Unit Cost",stacked:!0},play:u("rect.bar",{clientX:107,clientY:396})},m={name:"Grouped Bars",render:F,args:{...r.args,x2:"Unit Cost",grouped:!0},play:u("rect.bar",{clientX:107,clientY:396})};var x,M,y;r.parameters={...r.parameters,docs:{...(x=r.parameters)==null?void 0:x.docs,source:{originalSource:`{
  name: "Basic Plot",
  render: BarTemplateWithControls,
  args: {
    useCanvas: false,
    width: 800,
    height: 500,
    animationDuration: 250,
    color: "#99C1DC",
    color2: "#fc998e",
    theme: themes.light,
    leftMargin: 120,
    rightMargin: 40,
    topMargin: 40,
    bottomMargin: 40,
    x: "Unit Price",
    y: "Item Type"
  },
  play: createSVGTest("rect.bar", {
    clientX: 107,
    clientY: 396
  })
}`,...(y=(M=r.parameters)==null?void 0:M.docs)==null?void 0:y.source}}};var B,T,v;a.parameters={...a.parameters,docs:{...(B=a.parameters)==null?void 0:B.docs,source:{originalSource:`{
  name: "Custom Color",
  render: BarTemplate,
  args: {
    ...Basic.args,
    color: "orange"
  }
}`,...(v=(T=a.parameters)==null?void 0:T.docs)==null?void 0:v.source}}};var S,b,k;n.parameters={...n.parameters,docs:{...(S=n.parameters)==null?void 0:S.docs,source:{originalSource:`{
  name: "Using Canvas",
  render: BarTemplateWithControls,
  args: {
    ...Basic.args,
    useCanvas: true
  },
  play: createCanvasTest({
    clientX: 245,
    clientY: 455
  })
}`,...(k=(b=n.parameters)==null?void 0:b.docs)==null?void 0:k.source}}};var w,j,U;i.parameters={...i.parameters,docs:{...(w=i.parameters)==null?void 0:w.docs,source:{originalSource:`{
  name: "Ratio Bars",
  render: BarTemplate,
  args: {
    ...Basic.args,
    x2: "Unit Cost",
    theme: {
      ...themes.light,
      series: {
        ...themes.light.series,
        opacity: 1
      }
    }
  }
}`,...(U=(j=i.parameters)==null?void 0:j.docs)==null?void 0:U.source}}};var X,Y,D;s.parameters={...s.parameters,docs:{...(X=s.parameters)==null?void 0:X.docs,source:{originalSource:`{
  name: "Stacked Bars",
  render: BarsTemplate,
  args: {
    ...Basic.args,
    x2: "Unit Cost",
    stacked: true
  },
  play: createSVGTest("rect.bar", {
    clientX: 107,
    clientY: 396
  })
}`,...(D=(Y=s.parameters)==null?void 0:Y.docs)==null?void 0:D.source}}};var O,G,I;m.parameters={...m.parameters,docs:{...(O=m.parameters)==null?void 0:O.docs,source:{originalSource:`{
  name: "Grouped Bars",
  render: BarsTemplate,
  args: {
    ...Basic.args,
    x2: "Unit Cost",
    grouped: true
  },
  play: createSVGTest("rect.bar", {
    clientX: 107,
    clientY: 396
  })
}`,...(I=(G=m.parameters)==null?void 0:G.docs)==null?void 0:I.source}}};const Qe=["Basic","Color","Canvas","Ratio","Stacked","Grouped"];export{r as Basic,n as Canvas,a as Color,m as Grouped,i as Ratio,s as Stacked,Qe as __namedExportsOrder,Ke as default};
//# sourceMappingURL=Bar.stories-DCQ5E5yY.js.map
