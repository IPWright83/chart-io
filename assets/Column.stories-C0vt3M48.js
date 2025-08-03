import{j as n}from"./jsx-runtime-BjG_zV1W.js";import{t as u,l as V}from"./react-redux-D2XHiCFH.js";import{f as p}from"./index-Dcm7olAB.js";import{s as I}from"./sales_records_dataset-WHK6HSqq.js";import{a as q}from"./argTypes-DuN6ki1s.js";import"./renderChart-BZI9ut8k.js";import{a as C,b as z}from"./storybook-iplj5BUQ.js";import{X as A}from"./index-B3xvD3KM.js";import{a as d,C as H}from"./Columns-BkWdU0h9.js";import{Y as R}from"./YAxis-Di6E_Z0O.js";import{X as _}from"./XAxis-DPoLBJUO.js";import"./index-DpTt3J-R.js";import"./test-utils-C-DEfvFY.js";import"./index-D5nvoAmD.js";import"./client-CbGTh6y2.js";import"./index-lEWDzjaj.js";import"./index-Cmxt2A0f.js";import"./defaultLocale-D2nGpDRe.js";import"./index-BLkjqt2D.js";import"./defaultLocale-YZNTexTf.js";import"./index-D2Yg9nHg.js";import"./index-CormuWgM.js";import"./index-B83mH7RW.js";import"./index--IH0qLMi.js";import"./Legend-BfppGThJ.js";import"./index-DSanPm5k.js";import"./index-BmYvQTbQ.js";import"./Circle-Qf3Tu8hN.js";import"./Line-BjKan0E4.js";import"./Square-CZVurtTs.js";import"./index-DCrWobO-.js";import"./index-Dm9U4OvN.js";import"./index-D9WwHXYw.js";import"./Tooltip-DKHk2rGT.js";import"./index-Dnwqjl04.js";import"./TooltipItem-DpodgMXu.js";import"./index-idqV8wj_.js";import"./index-C_9ZH6Qa.js";import"./index-nsWK1wQc.js";import"./getParentKey-CJpMRI3M.js";import"./renderCanvas-DfhBB9Lh.js";import"./ensureNoScaleOverflow-_ke7A8wI.js";import"./array-2GBN5xbU.js";const{width:J,height:K,margin:o,useCanvas:L,theme:N,color:Q}=q,Pe={title:"XYCharts/Column",component:d,parameters:{docs:{transformSource:e=>(e=e.replace(/data={\[.*?\]}/gs,"data={[ ...dataset ]}"),e=e.replaceAll(/undefined,?/g,""),e=e.replace(/^\s*\n/gm,""),e)},chromatic:{delay:300}},args:{onClick:p(),onMouseOver:p(),onMouseOut:p()},argTypes:{useCanvas:L,width:J,height:K,theme:N,color:Q,leftMargin:o,rightMargin:o,topMargin:o,bottomMargin:o}},P=V.uniqBy(I,e=>e["Item Type"]),l=e=>n.jsxs(A,{data:P,plotMargin:{left:e.leftMargin,right:e.rightMargin,top:e.topMargin,bottom:e.bottomMargin},width:e.width,height:e.height,animationDuration:e.animationDuration,useCanvas:e.useCanvas,theme:e.theme,onClick:e.onClick,onMouseOver:e.onMouseOver,onMouseOut:e.onMouseOut,children:[n.jsx(R,{fields:[e.y,e.y2,e.y3]}),n.jsx(_,{fields:[e.x],scaleType:"band",showGridlines:!1}),n.jsx(d,{x:e.x,y:e.y,color:e.color}),e.y2&&n.jsx(d,{x:e.x,y:e.y2,color:e.color2})]}),h=e=>n.jsxs(A,{data:P,plotMargin:{left:e.leftMargin,right:e.rightMargin,top:e.topMargin,bottom:e.bottomMargin},width:e.width,height:e.height,animationDuration:e.animationDuration,useCanvas:e.useCanvas,theme:e.theme,onClick:e.onClick,onMouseOver:e.onMouseOver,onMouseOut:e.onMouseOut,children:[n.jsx(R,{fields:[e.y,e.y2,e.y3],aggregate:e.stacked}),n.jsx(_,{fields:[e.x],scaleType:"band",showGridlines:!1}),n.jsx(H,{x:e.x,ys:[e.y,e.y2],grouped:e.grouped,stacked:e.stacked})]}),t={name:"Basic Plot",render:l,args:{useCanvas:!1,width:800,height:500,animationDuration:250,color:"#99C1DC",color2:"#fc998e",leftMargin:70,rightMargin:40,topMargin:40,bottomMargin:40,y:"Unit Price",x:"Item Type"},play:C("rect.column",{clientX:107,clientY:396})},r={name:"Custom Color",render:l,args:{...t.args,color:"orange"}},a={name:"Using Canvas",render:l,args:{...t.args,useCanvas:!0},play:z({clientX:107,clientY:396})},s={name:"Ratio Columns",render:l,args:{...t.args,y2:"Unit Cost",theme:{...u.light,series:{...u.light.series,opacity:1}}}},i={name:"Stacked Columns",render:h,args:{...t.args,y2:"Unit Cost",stacked:!0},play:C("rect.column",{clientX:107,clientY:396})},m={name:"Grouped Columns",render:h,args:{...t.args,y2:"Unit Cost",grouped:!0},play:C("rect.column",{clientX:107,clientY:396})},c={name:"Custom Theme",render:h,args:{...t.args,y2:"Unit Cost",grouped:!0,theme:{...u.dark,background:"#F3F1E5",axis:{stroke:"#969495"},gridlines:{stroke:"#969495"},colors:["#2FC2AF","#433F3E"]}}};var g,y,f;t.parameters={...t.parameters,docs:{...(g=t.parameters)==null?void 0:g.docs,source:{originalSource:`{
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
}`,...(E=(D=c.parameters)==null?void 0:D.docs)==null?void 0:E.source}}};const Ve=["Basic","Color","Canvas","Ratio","Stacked","Grouped","CustomTheme"];export{t as Basic,a as Canvas,r as Color,c as CustomTheme,m as Grouped,s as Ratio,i as Stacked,Ve as __namedExportsOrder,Pe as default};
//# sourceMappingURL=Column.stories-C0vt3M48.js.map
