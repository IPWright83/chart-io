import{j as n}from"./jsx-runtime-CB_V9I5Y.js";import{t as u,l as V}from"./index-D1OPLCpq.js";import{f as p}from"./index-Dcm7olAB.js";import{s as I}from"./sales_records_dataset-WHK6HSqq.js";import{a as q}from"./argTypes-DuN6ki1s.js";import"./renderChart-BAvMHNLK.js";import{a as C,b as z}from"./storybook-BRKXWPEB.js";import{X as A}from"./index-DWjDrBH7.js";import{a as d,C as H}from"./Columns-7YBzAFul.js";import{Y as R}from"./YAxis-DVfVxPRN.js";import{X as _}from"./XAxis-NdVBz2bD.js";import"./index-CTjT7uj6.js";import"./index-Cywu29Xx.js";import"./test-utils-Be8GUZmg.js";import"./client-BipHwt7r.js";import"./index-ChfY_KWg.js";import"./index-DyxbUYfF.js";import"./defaultLocale-D2nGpDRe.js";import"./useStore-D42TxdHf.js";import"./index-Bs4_CWqv.js";import"./defaultLocale-YZNTexTf.js";import"./index-C73EMPtE.js";import"./index-BNKFbkco.js";import"./index-D8HK0Iw4.js";import"./index-BcuBy6DH.js";import"./Legend-DQ2LjqGu.js";import"./index-COgl75ap.js";import"./index-BQDzJjLo.js";import"./Circle-D2bUPI43.js";import"./Line-cv_TynKV.js";import"./Square-DM8ZByYb.js";import"./index-CD7MXqKa.js";import"./index-BOxme2CB.js";import"./index-Cn1GUACH.js";import"./Tooltip-BNhJ7WJH.js";import"./index-BK_JY7l-.js";import"./TooltipItem-Ds3NZ-zA.js";import"./index-e8nDjrQd.js";import"./index-DomMj_LS.js";import"./index-DqBBfSd8.js";import"./getParentKey-Dt0KjBfq.js";import"./renderCanvas-B3vh6D0b.js";import"./ensureNoScaleOverflow-BVrwbjHS.js";import"./array-2GBN5xbU.js";const{width:J,height:K,margin:o,useCanvas:L,theme:N,color:Q}=q,Ve={title:"XYCharts/Column",component:d,parameters:{docs:{transformSource:e=>(e=e.replace(/data={\[.*?\]}/gs,"data={[ ...dataset ]}"),e=e.replaceAll(/undefined,?/g,""),e=e.replace(/^\s*\n/gm,""),e)},chromatic:{delay:300}},args:{onClick:p(),onMouseOver:p(),onMouseOut:p()},argTypes:{useCanvas:L,width:J,height:K,theme:N,color:Q,leftMargin:o,rightMargin:o,topMargin:o,bottomMargin:o}},P=V.uniqBy(I,e=>e["Item Type"]),l=e=>n.jsxs(A,{data:P,plotMargin:{left:e.leftMargin,right:e.rightMargin,top:e.topMargin,bottom:e.bottomMargin},width:e.width,height:e.height,animationDuration:e.animationDuration,useCanvas:e.useCanvas,theme:e.theme,onClick:e.onClick,onMouseOver:e.onMouseOver,onMouseOut:e.onMouseOut,children:[n.jsx(R,{fields:[e.y,e.y2,e.y3]}),n.jsx(_,{fields:[e.x],scaleType:"band",showGridlines:!1}),n.jsx(d,{x:e.x,y:e.y,color:e.color}),e.y2&&n.jsx(d,{x:e.x,y:e.y2,color:e.color2})]}),h=e=>n.jsxs(A,{data:P,plotMargin:{left:e.leftMargin,right:e.rightMargin,top:e.topMargin,bottom:e.bottomMargin},width:e.width,height:e.height,animationDuration:e.animationDuration,useCanvas:e.useCanvas,theme:e.theme,onClick:e.onClick,onMouseOver:e.onMouseOver,onMouseOut:e.onMouseOut,children:[n.jsx(R,{fields:[e.y,e.y2,e.y3],aggregate:e.stacked}),n.jsx(_,{fields:[e.x],scaleType:"band",showGridlines:!1}),n.jsx(H,{x:e.x,ys:[e.y,e.y2],grouped:e.grouped,stacked:e.stacked})]}),t={name:"Basic Plot",render:l,args:{useCanvas:!1,width:800,height:500,animationDuration:250,color:"#99C1DC",color2:"#fc998e",leftMargin:70,rightMargin:40,topMargin:40,bottomMargin:40,y:"Unit Price",x:"Item Type"},play:C("rect.column",{clientX:107,clientY:396})},r={name:"Custom Color",render:l,args:{...t.args,color:"orange"}},a={name:"Using Canvas",render:l,args:{...t.args,useCanvas:!0},play:z({clientX:107,clientY:396})},s={name:"Ratio Columns",render:l,args:{...t.args,y2:"Unit Cost",theme:{...u.light,series:{...u.light.series,opacity:1}}}},i={name:"Stacked Columns",render:h,args:{...t.args,y2:"Unit Cost",stacked:!0},play:C("rect.column",{clientX:107,clientY:396})},m={name:"Grouped Columns",render:h,args:{...t.args,y2:"Unit Cost",grouped:!0},play:C("rect.column",{clientX:107,clientY:396})},c={name:"Custom Theme",render:h,args:{...t.args,y2:"Unit Cost",grouped:!0,theme:{...u.dark,background:"#F3F1E5",axis:{stroke:"#969495"},gridlines:{stroke:"#969495"},colors:["#2FC2AF","#433F3E"]}}};var g,y,f;t.parameters={...t.parameters,docs:{...(g=t.parameters)==null?void 0:g.docs,source:{originalSource:`{
  name: "Basic Plot",
  render: ColumnTemplate,
  args: {
    useCanvas: false,
    width: 800,
    height: 500,
    animationDuration: 250,
    color: "#99C1DC",
    color2: "#fc998e",
    leftMargin: 70,
    rightMargin: 40,
    topMargin: 40,
    bottomMargin: 40,
    y: "Unit Price",
    x: "Item Type"
  },
  play: createSVGTest("rect.column", {
    clientX: 107,
    clientY: 396
  })
}`,...(f=(y=t.parameters)==null?void 0:y.docs)==null?void 0:f.source}}};var M,x,T;r.parameters={...r.parameters,docs:{...(M=r.parameters)==null?void 0:M.docs,source:{originalSource:`{
  name: "Custom Color",
  render: ColumnTemplate,
  args: {
    ...Basic.args,
    color: "orange"
  }
}`,...(T=(x=r.parameters)==null?void 0:x.docs)==null?void 0:T.source}}};var k,v,S;a.parameters={...a.parameters,docs:{...(k=a.parameters)==null?void 0:k.docs,source:{originalSource:`{
  name: "Using Canvas",
  render: ColumnTemplate,
  args: {
    ...Basic.args,
    useCanvas: true
  },
  play: createCanvasTest({
    clientX: 107,
    clientY: 396
  })
}`,...(S=(v=a.parameters)==null?void 0:v.docs)==null?void 0:S.source}}};var X,b,U;s.parameters={...s.parameters,docs:{...(X=s.parameters)==null?void 0:X.docs,source:{originalSource:`{
  name: "Ratio Columns",
  render: ColumnTemplate,
  args: {
    ...Basic.args,
    y2: "Unit Cost",
    theme: {
      ...themes.light,
      series: {
        ...themes.light.series,
        opacity: 1
      }
    }
  }
}`,...(U=(b=s.parameters)==null?void 0:b.docs)==null?void 0:U.source}}};var Y,j,B;i.parameters={...i.parameters,docs:{...(Y=i.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  name: "Stacked Columns",
  render: ColumnsTemplate,
  args: {
    ...Basic.args,
    y2: "Unit Cost",
    stacked: true
  },
  play: createSVGTest("rect.column", {
    clientX: 107,
    clientY: 396
  })
}`,...(B=(j=i.parameters)==null?void 0:j.docs)==null?void 0:B.source}}};var O,F,G;m.parameters={...m.parameters,docs:{...(O=m.parameters)==null?void 0:O.docs,source:{originalSource:`{
  name: "Grouped Columns",
  render: ColumnsTemplate,
  args: {
    ...Basic.args,
    y2: "Unit Cost",
    grouped: true
  },
  play: createSVGTest("rect.column", {
    clientX: 107,
    clientY: 396
  })
}`,...(G=(F=m.parameters)==null?void 0:F.docs)==null?void 0:G.source}}};var w,D,E;c.parameters={...c.parameters,docs:{...(w=c.parameters)==null?void 0:w.docs,source:{originalSource:`{
  name: "Custom Theme",
  render: ColumnsTemplate,
  args: {
    ...Basic.args,
    y2: "Unit Cost",
    grouped: true,
    theme: {
      ...themes.dark,
      background: "#F3F1E5",
      axis: {
        stroke: "#969495"
      },
      gridlines: {
        stroke: "#969495"
      },
      colors: ["#2FC2AF", "#433F3E"]
    }
  }
}`,...(E=(D=c.parameters)==null?void 0:D.docs)==null?void 0:E.source}}};const Ie=["Basic","Color","Canvas","Ratio","Stacked","Grouped","CustomTheme"];export{t as Basic,a as Canvas,r as Color,c as CustomTheme,m as Grouped,s as Ratio,i as Stacked,Ie as __namedExportsOrder,Ve as default};
//# sourceMappingURL=Column.stories-D-TUmWYE.js.map
