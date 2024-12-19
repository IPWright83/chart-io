import{j as n}from"./jsx-runtime-DEdD30eg.js";import{l as V,t as u}from"./index-b9bwP9Bh.js";import{f as p}from"./index-CPFb5ytF.js";import{s as I}from"./sales_records_dataset-WHK6HSqq.js";import{a as q}from"./argTypes-bxm3gCeR.js";import"./renderChart-C4tDReWK.js";import{a as C,b as z}from"./storybook-DsatEiwt.js";import{X as A}from"./index-CdkoYB7w.js";import{a as d,C as H}from"./Columns-DvhU7O36.js";import{Y as R}from"./YAxis-DuDb07NW.js";import{X as _}from"./XAxis-B_MFapNx.js";import"./index-RYns6xqu.js";import"./index-sbqOYYIm.js";import"./test-utils-pcsCGetG.js";import"./client-BylhC-KR.js";import"./index-DBRTqYFH.js";import"./index-COLyWrXh.js";import"./defaultLocale-D2nGpDRe.js";import"./useStore-DWdQsrPN.js";import"./index-CXvrs8Eg.js";import"./defaultLocale-C7xJETwF.js";import"./index-ASiZ4-uZ.js";import"./index-BZ_hkuv1.js";import"./index-9Z0J-FDy.js";import"./index-BPZQwoq3.js";import"./Legend-DEyrexXZ.js";import"./index-DhwMs0bd.js";import"./index-CW0FTg2B.js";import"./Circle-CWMyz_tz.js";import"./Line-B_2MgdvN.js";import"./Square-CektPBZh.js";import"./index-CKF-7MCu.js";import"./index-DQ1aKZo6.js";import"./index-CLSe-My4.js";import"./Tooltip-GS-CvhnY.js";import"./index-hvi0fNyA.js";import"./TooltipItem-D1zhnsxI.js";import"./index-BQ4jfyHA.js";import"./index-D888O4bb.js";import"./index-B2undoSo.js";import"./getParentKey-CcCYm4V6.js";import"./renderCanvas-BCjHZwb6.js";import"./ensureNoScaleOverflow-li5UC7Oh.js";import"./array-2GBN5xbU.js";const{width:J,height:K,margin:o,useCanvas:L,theme:N,color:Q}=q,Ve={title:"XYCharts/Column",component:d,parameters:{docs:{transformSource:e=>(e=e.replace(/data={\[.*?\]}/gs,"data={[ ...dataset ]}"),e=e.replaceAll(/undefined,?/g,""),e=e.replace(/^\s*\n/gm,""),e)},chromatic:{delay:300}},args:{onClick:p(),onMouseOver:p(),onMouseOut:p()},argTypes:{useCanvas:L,width:J,height:K,theme:N,color:Q,leftMargin:o,rightMargin:o,topMargin:o,bottomMargin:o}},P=V.uniqBy(I,e=>e["Item Type"]),l=e=>n.jsxs(A,{data:P,plotMargin:{left:e.leftMargin,right:e.rightMargin,top:e.topMargin,bottom:e.bottomMargin},width:e.width,height:e.height,animationDuration:e.animationDuration,useCanvas:e.useCanvas,theme:e.theme,onClick:e.onClick,onMouseOver:e.onMouseOver,onMouseOut:e.onMouseOut,children:[n.jsx(R,{fields:[e.y,e.y2,e.y3]}),n.jsx(_,{fields:[e.x],scaleType:"band",showGridlines:!1}),n.jsx(d,{x:e.x,y:e.y,color:e.color}),e.y2&&n.jsx(d,{x:e.x,y:e.y2,color:e.color2})]}),h=e=>n.jsxs(A,{data:P,plotMargin:{left:e.leftMargin,right:e.rightMargin,top:e.topMargin,bottom:e.bottomMargin},width:e.width,height:e.height,animationDuration:e.animationDuration,useCanvas:e.useCanvas,theme:e.theme,onClick:e.onClick,onMouseOver:e.onMouseOver,onMouseOut:e.onMouseOut,children:[n.jsx(R,{fields:[e.y,e.y2,e.y3],aggregate:e.stacked}),n.jsx(_,{fields:[e.x],scaleType:"band",showGridlines:!1}),n.jsx(H,{x:e.x,ys:[e.y,e.y2],grouped:e.grouped,stacked:e.stacked})]}),t={name:"Basic Plot",render:l,args:{useCanvas:!1,width:800,height:500,animationDuration:250,color:"#99C1DC",color2:"#fc998e",leftMargin:70,rightMargin:40,topMargin:40,bottomMargin:40,y:"Unit Price",x:"Item Type"},play:C("rect.column",{clientX:107,clientY:396})},r={name:"Custom Color",render:l,args:{...t.args,color:"orange"}},a={name:"Using Canvas",render:l,args:{...t.args,useCanvas:!0},play:z({clientX:107,clientY:396})},s={name:"Ratio Columns",render:l,args:{...t.args,y2:"Unit Cost",theme:{...u.light,series:{...u.light.series,opacity:1}}}},i={name:"Stacked Columns",render:h,args:{...t.args,y2:"Unit Cost",stacked:!0},play:C("rect.column",{clientX:107,clientY:396})},m={name:"Grouped Columns",render:h,args:{...t.args,y2:"Unit Cost",grouped:!0},play:C("rect.column",{clientX:107,clientY:396})},c={name:"Custom Theme",render:h,args:{...t.args,y2:"Unit Cost",grouped:!0,theme:{...u.dark,background:"#F3F1E5",axis:{stroke:"#969495"},gridlines:{stroke:"#969495"},colors:["#2FC2AF","#433F3E"]}}};var g,y,f;t.parameters={...t.parameters,docs:{...(g=t.parameters)==null?void 0:g.docs,source:{originalSource:`{
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
//# sourceMappingURL=Column.stories-D4lEetFn.js.map
