import{j as t}from"./jsx-runtime-CB_V9I5Y.js";import{t as l,l as P}from"./index-D1OPLCpq.js";import{f as p}from"./index-Dcm7olAB.js";import{s as V}from"./sales_records_dataset-WHK6HSqq.js";import{a as A}from"./argTypes-DuN6ki1s.js";import"./renderChart-BAvMHNLK.js";import{a as u,b as E}from"./storybook-BRKXWPEB.js";import{X as U}from"./index-DWjDrBH7.js";import{a as d,B as I}from"./Bars-Xnowt69k.js";import{Y as w}from"./YAxis-DVfVxPRN.js";import{X as D}from"./XAxis-NdVBz2bD.js";import"./index-CTjT7uj6.js";import"./index-Cywu29Xx.js";import"./test-utils-Be8GUZmg.js";import"./client-BipHwt7r.js";import"./index-ChfY_KWg.js";import"./index-DyxbUYfF.js";import"./defaultLocale-D2nGpDRe.js";import"./useStore-D42TxdHf.js";import"./index-Bs4_CWqv.js";import"./defaultLocale-YZNTexTf.js";import"./index-C73EMPtE.js";import"./index-BNKFbkco.js";import"./index-D8HK0Iw4.js";import"./index-BcuBy6DH.js";import"./Legend-DQ2LjqGu.js";import"./index-COgl75ap.js";import"./index-BQDzJjLo.js";import"./Circle-D2bUPI43.js";import"./Line-cv_TynKV.js";import"./Square-DM8ZByYb.js";import"./index-CD7MXqKa.js";import"./index-BOxme2CB.js";import"./index-Cn1GUACH.js";import"./Tooltip-BNhJ7WJH.js";import"./index-BK_JY7l-.js";import"./TooltipItem-Ds3NZ-zA.js";import"./index-e8nDjrQd.js";import"./index-DomMj_LS.js";import"./index-DqBBfSd8.js";import"./getParentKey-Dt0KjBfq.js";import"./renderCanvas-B3vh6D0b.js";import"./ensureNoScaleOverflow-BVrwbjHS.js";import"./array-2GBN5xbU.js";const{width:q,height:z,margin:a,useCanvas:F,theme:H,color:J}=A,Pe={title:"XYCharts/Bar",component:d,parameters:{docs:{transformSource:e=>(e=e.replace(/data={\[.*?\]}/gs,"data={[ ...dataset ]}"),e=e.replaceAll(/undefined,?/g,""),e=e.replace(/^\s*\n/gm,""),e)},chromatic:{delay:300}},args:{onClick:p(),onMouseOver:p(),onMouseOut:p()},argTypes:{useCanvas:F,width:q,height:z,theme:H,color:J,leftMargin:a,rightMargin:a,topMargin:a,bottomMargin:a}},R=P.uniqBy(V,e=>e["Item Type"]),c=e=>t.jsxs(U,{data:R,plotMargin:{left:e.leftMargin,right:e.rightMargin,top:e.topMargin,bottom:e.bottomMargin},width:e.width,height:e.height,animationDuration:e.animationDuration,theme:e.theme,useCanvas:e.useCanvas,onClick:e.onClick,onMouseOver:e.onMouseOver,onMouseOut:e.onMouseOut,children:[t.jsx(w,{fields:[e.y],scaleType:"band",showGridlines:!1}),t.jsx(D,{fields:[e.x,e.x2,e.x3]}),t.jsx(d,{x:e.x,y:e.y,color:e.color}),e.x2&&t.jsx(d,{x:e.x2,y:e.y,color:e.color2})]}),_=e=>t.jsxs(U,{data:R,plotMargin:{left:e.leftMargin,right:e.rightMargin,top:e.topMargin,bottom:e.bottomMargin},width:e.width,height:e.height,animationDuration:e.animationDuration,useCanvas:e.useCanvas,theme:e.theme,onClick:e.onClick,onMouseOver:e.onMouseOver,onMouseOut:e.onMouseOut,children:[t.jsx(w,{fields:[e.y],scaleType:"band",showGridlines:!1}),t.jsx(D,{fields:[e.x,e.x2,e.x3],aggregate:e.stacked}),t.jsx(I,{y:e.y,xs:[e.x,e.x2],grouped:e.grouped,stacked:e.stacked})]}),r={name:"Basic Plot",render:c,args:{useCanvas:!1,width:800,height:500,animationDuration:250,color:"#99C1DC",color2:"#fc998e",theme:l.light,leftMargin:120,rightMargin:40,topMargin:40,bottomMargin:40,x:"Unit Price",y:"Item Type"},play:u("rect.bar",{clientX:107,clientY:396})},o={name:"Custom Color",render:c,args:{...r.args,color:"orange"}},n={name:"Using Canvas",render:c,args:{...r.args,useCanvas:!0},play:E({clientX:245,clientY:455})},i={name:"Ratio Bars",render:c,args:{...r.args,x2:"Unit Cost",theme:{...l.light,series:{...l.light.series,opacity:1}}}},s={name:"Stacked Bars",render:_,args:{...r.args,x2:"Unit Cost",stacked:!0},play:u("rect.bar",{clientX:107,clientY:396})},m={name:"Grouped Bars",render:_,args:{...r.args,x2:"Unit Cost",grouped:!0},play:u("rect.bar",{clientX:107,clientY:396})};var h,g,x;r.parameters={...r.parameters,docs:{...(h=r.parameters)==null?void 0:h.docs,source:{originalSource:`{
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
}`,...(x=(g=r.parameters)==null?void 0:g.docs)==null?void 0:x.source}}};var C,f,M;o.parameters={...o.parameters,docs:{...(C=o.parameters)==null?void 0:C.docs,source:{originalSource:`{
  name: "Custom Color",
  render: BarTemplate,
  args: {
    ...Basic.args,
    color: "orange"
  }
}`,...(M=(f=o.parameters)==null?void 0:f.docs)==null?void 0:M.source}}};var y,B,T;n.parameters={...n.parameters,docs:{...(y=n.parameters)==null?void 0:y.docs,source:{originalSource:`{
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
}`,...(T=(B=n.parameters)==null?void 0:B.docs)==null?void 0:T.source}}};var v,b,S;i.parameters={...i.parameters,docs:{...(v=i.parameters)==null?void 0:v.docs,source:{originalSource:`{
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
}`,...(G=(O=m.parameters)==null?void 0:O.docs)==null?void 0:G.source}}};const Ve=["Basic","Color","Canvas","Ratio","Stacked","Grouped"];export{r as Basic,n as Canvas,o as Color,m as Grouped,i as Ratio,s as Stacked,Ve as __namedExportsOrder,Pe as default};
//# sourceMappingURL=Bar.stories-BzojGWjS.js.map
