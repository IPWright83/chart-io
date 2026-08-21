import{j as t}from"./jsx-runtime-BjG_zV1W.js";import{V as l}from"./react-redux-SPeguAgb.js";import{f as p}from"./index-Dcm7olAB.js";import{s as P}from"./sales_records_dataset-WHK6HSqq.js";import{a as z}from"./argTypes-DuN6ki1s.js";import{w as L,j as R}from"./dataControls-DatG45sm.js";import"./renderChart-D1szSHoV.js";import{a as u,b as N}from"./storybook-CxwCI9RW.js";import"./index-DwL5j-mS.js";import{X as V}from"./index-53SPihoZ.js";import{a as d,B as $}from"./Bars-B28Is7JF.js";import{l as H}from"./lodash-DOJiQ2Wu.js";import{Y as _}from"./YAxis-BLu4jwFE.js";import{X as A}from"./XAxis-yIVuvz3U.js";import"./index-DpTt3J-R.js";import"./isChromatic-VqprqId_.js";import"./test-utils-C-DEfvFY.js";import"./index-D5nvoAmD.js";import"./client-CbGTh6y2.js";import"./index-Dd_IEiRF.js";import"./index-BRXO1njn.js";import"./index-9431aKHi.js";import"./index-sBPFWXw6.js";import"./index-yAu6bW1V.js";import"./index-DhP8WHXK.js";import"./index-Bdes0qwq.js";import"./index-BLxOKznu.js";import"./index-BAzb9S1k.js";import"./Legend-z40re8h9.js";import"./index-Dub0Swig.js";import"./index-BmYvQTbQ.js";import"./Circle-Qf3Tu8hN.js";import"./Line-BjKan0E4.js";import"./Square-CZVurtTs.js";import"./index-DxXlV5JW.js";import"./index-CErv1lK-.js";import"./index-9usyF_v_.js";import"./Tooltip-aPd-LmbL.js";import"./index-CRhM32cg.js";import"./TooltipItem-OfChlkFL.js";import"./index-rx8DGN-B.js";import"./renderCanvas-CR85T-h9.js";const{width:J,height:K,margin:a,useCanvas:Q,theme:Z,color:ee}=z,ze={title:"Charts/XYCharts/Bar",component:d,parameters:{docs:{transformSource:e=>(e=e.replace(/data={\[.*?\]}/gs,"data={[ ...dataset ]}"),e=e.replaceAll(/undefined,?/g,""),e=e.replace(/^\s*\n/gm,""),e)},chromatic:{delay:300}},args:{onClick:p(),onMouseOver:p(),onMouseOut:p()},argTypes:{useCanvas:Q,width:J,height:K,theme:Z,color:ee,leftMargin:a,rightMargin:a,topMargin:a,bottomMargin:a}},h=H.uniqBy(P,e=>e["Item Type"]),E=["Units Sold","Unit Price","Unit Cost","Total Revenue","Total Cost","Total Profit"];function te(e){const q=new Set(e.map(c=>c["Item Type"])),C=P.find(c=>!q.has(c["Item Type"]));if(C)return C;const f=e[Math.floor(Math.random()*e.length)];return R({...f,"Item Type":`${f["Item Type"]} (New)`},E,.3)}const re={initialData:h,randomize:e=>R(e,E,.3),createPoint:te,minLength:2},g=e=>t.jsxs(V,{data:e.data??h,plotMargin:{left:e.leftMargin,right:e.rightMargin,top:e.topMargin,bottom:e.bottomMargin},width:e.width,height:e.height,animationDuration:e.animationDuration,theme:e.theme,useCanvas:e.useCanvas,onClick:e.onClick,onMouseOver:e.onMouseOver,onMouseOut:e.onMouseOut,children:[t.jsx(_,{fields:[e.y],scaleType:"band",showGridlines:!1}),t.jsx(A,{fields:[e.x,e.x2,e.x3]}),t.jsx(d,{x:e.x,y:e.y,color:e.color}),e.x2&&t.jsx(d,{x:e.x2,y:e.y,color:e.color2})]}),W=L(g,re),F=e=>t.jsxs(V,{data:h,plotMargin:{left:e.leftMargin,right:e.rightMargin,top:e.topMargin,bottom:e.bottomMargin},width:e.width,height:e.height,animationDuration:e.animationDuration,useCanvas:e.useCanvas,theme:e.theme,onClick:e.onClick,onMouseOver:e.onMouseOver,onMouseOut:e.onMouseOut,children:[t.jsx(_,{fields:[e.y],scaleType:"band",showGridlines:!1}),t.jsx(A,{fields:[e.x,e.x2,e.x3],aggregate:e.stacked}),t.jsx($,{y:e.y,xs:[e.x,e.x2],grouped:e.grouped,stacked:e.stacked})]}),r={name:"Basic Plot",render:W,args:{useCanvas:!1,width:800,height:500,animationDuration:250,color:"#99C1DC",color2:"#fc998e",theme:l.light,leftMargin:120,rightMargin:40,topMargin:40,bottomMargin:40,x:"Unit Price",y:"Item Type"},play:u("rect.bar",{clientX:107,clientY:396})},o={name:"Custom Color",render:g,args:{...r.args,color:"orange"}},n={name:"Using Canvas",render:W,args:{...r.args,useCanvas:!0},play:N({clientX:245,clientY:455})},s={name:"Ratio Bars",render:g,args:{...r.args,x2:"Unit Cost",theme:{...l.light,series:{...l.light.series,opacity:1}}}},i={name:"Stacked Bars",render:F,args:{...r.args,x2:"Unit Cost",stacked:!0},play:u("rect.bar",{clientX:107,clientY:396})},m={name:"Grouped Bars",render:F,args:{...r.args,x2:"Unit Cost",grouped:!0},play:u("rect.bar",{clientX:107,clientY:396})};var x,y,M;r.parameters={...r.parameters,docs:{...(x=r.parameters)==null?void 0:x.docs,source:{originalSource:`{
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
}`,...(M=(y=r.parameters)==null?void 0:y.docs)==null?void 0:M.source}}};var B,T,v;o.parameters={...o.parameters,docs:{...(B=o.parameters)==null?void 0:B.docs,source:{originalSource:`{
  name: "Custom Color",
  render: BarTemplate,
  args: {
    ...Basic.args,
    color: "orange"
  }
}`,...(v=(T=o.parameters)==null?void 0:T.docs)==null?void 0:v.source}}};var S,b,k;n.parameters={...n.parameters,docs:{...(S=n.parameters)==null?void 0:S.docs,source:{originalSource:`{
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
}`,...(k=(b=n.parameters)==null?void 0:b.docs)==null?void 0:k.source}}};var w,j,U;s.parameters={...s.parameters,docs:{...(w=s.parameters)==null?void 0:w.docs,source:{originalSource:`{
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
}`,...(U=(j=s.parameters)==null?void 0:j.docs)==null?void 0:U.source}}};var X,Y,D;i.parameters={...i.parameters,docs:{...(X=i.parameters)==null?void 0:X.docs,source:{originalSource:`{
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
}`,...(D=(Y=i.parameters)==null?void 0:Y.docs)==null?void 0:D.source}}};var O,G,I;m.parameters={...m.parameters,docs:{...(O=m.parameters)==null?void 0:O.docs,source:{originalSource:`{
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
}`,...(I=(G=m.parameters)==null?void 0:G.docs)==null?void 0:I.source}}};const Le=["Basic","Color","Canvas","Ratio","Stacked","Grouped"];export{r as Basic,n as Canvas,o as Color,m as Grouped,s as Ratio,i as Stacked,Le as __namedExportsOrder,ze as default};
//# sourceMappingURL=Bar.stories-CPZT3CL1.js.map
