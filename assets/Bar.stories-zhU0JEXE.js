import{j as t}from"./jsx-runtime-BjG_zV1W.js";import{M as l}from"./react-redux-QXbQKOoW.js";import{f as p}from"./index-Dcm7olAB.js";import{s as P}from"./sales_records_dataset-WHK6HSqq.js";import{a as V}from"./argTypes-DuN6ki1s.js";import"./renderChart-BLsEhK0I.js";import{a as u,b as A}from"./storybook-CmUtk8-_.js";import{X as U}from"./index-Bg6IsbDW.js";import{a as d,B as E}from"./Bars-CA0K2ZMO.js";import{l as I}from"./lodash-DOJiQ2Wu.js";import{Y as w}from"./YAxis-DSGnzgTy.js";import{X as D}from"./XAxis-ChDwRgF9.js";import"./index-DpTt3J-R.js";import"./test-utils-C-DEfvFY.js";import"./index-D5nvoAmD.js";import"./client-CbGTh6y2.js";import"./index-D50cK_1g.js";import"./index-CRk78wGA.js";import"./index-_rl-6daV.js";import"./index-D53rF_3R.js";import"./index-Du5VnEcz.js";import"./index-CJyk9Ty5.js";import"./index-gt7zBpiH.js";import"./Legend-pimTzOFw.js";import"./index-D4-eAyeX.js";import"./index-BmYvQTbQ.js";import"./Circle-Qf3Tu8hN.js";import"./Line-BjKan0E4.js";import"./Square-CZVurtTs.js";import"./index-B2ADnR9i.js";import"./index-mxfEYTca.js";import"./index-BEVv-T-d.js";import"./Tooltip-DL_pUHjQ.js";import"./index-BH_8yRl6.js";import"./TooltipItem-CWwi-etI.js";import"./index-BXRhMbPE.js";import"./index-C_QuCFx-.js";import"./index-DIhe8qvN.js";import"./renderCanvas-Cl5RbTFF.js";const{width:q,height:z,margin:a,useCanvas:F,theme:H,color:J}=V,Ue={title:"XYCharts/Bar",component:d,parameters:{docs:{transformSource:e=>(e=e.replace(/data={\[.*?\]}/gs,"data={[ ...dataset ]}"),e=e.replaceAll(/undefined,?/g,""),e=e.replace(/^\s*\n/gm,""),e)},chromatic:{delay:300}},args:{onClick:p(),onMouseOver:p(),onMouseOut:p()},argTypes:{useCanvas:F,width:q,height:z,theme:H,color:J,leftMargin:a,rightMargin:a,topMargin:a,bottomMargin:a}},R=I.uniqBy(P,e=>e["Item Type"]),c=e=>t.jsxs(U,{data:R,plotMargin:{left:e.leftMargin,right:e.rightMargin,top:e.topMargin,bottom:e.bottomMargin},width:e.width,height:e.height,animationDuration:e.animationDuration,theme:e.theme,useCanvas:e.useCanvas,onClick:e.onClick,onMouseOver:e.onMouseOver,onMouseOut:e.onMouseOut,children:[t.jsx(w,{fields:[e.y],scaleType:"band",showGridlines:!1}),t.jsx(D,{fields:[e.x,e.x2,e.x3]}),t.jsx(d,{x:e.x,y:e.y,color:e.color}),e.x2&&t.jsx(d,{x:e.x2,y:e.y,color:e.color2})]}),_=e=>t.jsxs(U,{data:R,plotMargin:{left:e.leftMargin,right:e.rightMargin,top:e.topMargin,bottom:e.bottomMargin},width:e.width,height:e.height,animationDuration:e.animationDuration,useCanvas:e.useCanvas,theme:e.theme,onClick:e.onClick,onMouseOver:e.onMouseOver,onMouseOut:e.onMouseOut,children:[t.jsx(w,{fields:[e.y],scaleType:"band",showGridlines:!1}),t.jsx(D,{fields:[e.x,e.x2,e.x3],aggregate:e.stacked}),t.jsx(E,{y:e.y,xs:[e.x,e.x2],grouped:e.grouped,stacked:e.stacked})]}),r={name:"Basic Plot",render:c,args:{useCanvas:!1,width:800,height:500,animationDuration:250,color:"#99C1DC",color2:"#fc998e",theme:l.light,leftMargin:120,rightMargin:40,topMargin:40,bottomMargin:40,x:"Unit Price",y:"Item Type"},play:u("rect.bar",{clientX:107,clientY:396})},n={name:"Custom Color",render:c,args:{...r.args,color:"orange"}},o={name:"Using Canvas",render:c,args:{...r.args,useCanvas:!0},play:A({clientX:245,clientY:455})},i={name:"Ratio Bars",render:c,args:{...r.args,x2:"Unit Cost",theme:{...l.light,series:{...l.light.series,opacity:1}}}},s={name:"Stacked Bars",render:_,args:{...r.args,x2:"Unit Cost",stacked:!0},play:u("rect.bar",{clientX:107,clientY:396})},m={name:"Grouped Bars",render:_,args:{...r.args,x2:"Unit Cost",grouped:!0},play:u("rect.bar",{clientX:107,clientY:396})};var h,g,x;r.parameters={...r.parameters,docs:{...(h=r.parameters)==null?void 0:h.docs,source:{originalSource:`{
  name: "Basic Plot",
  render: BarTemplate,
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
}`,...(x=(g=r.parameters)==null?void 0:g.docs)==null?void 0:x.source}}};var C,f,M;n.parameters={...n.parameters,docs:{...(C=n.parameters)==null?void 0:C.docs,source:{originalSource:`{
  name: "Custom Color",
  render: BarTemplate,
  args: {
    ...Basic.args,
    color: "orange"
  }
}`,...(M=(f=n.parameters)==null?void 0:f.docs)==null?void 0:M.source}}};var y,B,T;o.parameters={...o.parameters,docs:{...(y=o.parameters)==null?void 0:y.docs,source:{originalSource:`{
  name: "Using Canvas",
  render: BarTemplate,
  args: {
    ...Basic.args,
    useCanvas: true
  },
  play: createCanvasTest({
    clientX: 245,
    clientY: 455
  })
}`,...(T=(B=o.parameters)==null?void 0:B.docs)==null?void 0:T.source}}};var v,b,S;i.parameters={...i.parameters,docs:{...(v=i.parameters)==null?void 0:v.docs,source:{originalSource:`{
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
}`,...(S=(b=i.parameters)==null?void 0:b.docs)==null?void 0:S.source}}};var k,X,Y;s.parameters={...s.parameters,docs:{...(k=s.parameters)==null?void 0:k.docs,source:{originalSource:`{
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
}`,...(Y=(X=s.parameters)==null?void 0:X.docs)==null?void 0:Y.source}}};var j,O,G;m.parameters={...m.parameters,docs:{...(j=m.parameters)==null?void 0:j.docs,source:{originalSource:`{
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
}`,...(G=(O=m.parameters)==null?void 0:O.docs)==null?void 0:G.source}}};const we=["Basic","Color","Canvas","Ratio","Stacked","Grouped"];export{r as Basic,o as Canvas,n as Color,m as Grouped,i as Ratio,s as Stacked,we as __namedExportsOrder,Ue as default};
//# sourceMappingURL=Bar.stories-zhU0JEXE.js.map
