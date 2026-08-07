import{j as t}from"./jsx-runtime-BjG_zV1W.js";import{k as u}from"./react-redux-BIxttMao.js";import{f as p}from"./index-Dcm7olAB.js";import{s as V}from"./sales_records_dataset-WHK6HSqq.js";import{a as I}from"./argTypes-DuN6ki1s.js";import"./renderChart-HUqSO_BQ.js";import{a as C,b as q}from"./storybook-C6VSxOor.js";import"./index-BrTJ4RzG.js";import{X as A}from"./index-OT6NwBHW.js";import{a as d,C as z}from"./Columns-C6MdJ0W5.js";import{l as H}from"./lodash-DOJiQ2Wu.js";import{Y as R}from"./YAxis-PGCYKAdu.js";import{X as _}from"./XAxis-D7Bs4h5a.js";import"./index-DpTt3J-R.js";import"./test-utils-C-DEfvFY.js";import"./index-D5nvoAmD.js";import"./client-CbGTh6y2.js";import"./index-Bd68MpUk.js";import"./index-DnlDykCR.js";import"./index-DrZFwq_W.js";import"./index-Dr9RXvgl.js";import"./index-DDyQNOMu.js";import"./index-CWwNrbNA.js";import"./index-BZCcI5Qt.js";import"./index-9P8qsy9Z.js";import"./index-BqtyGhDH.js";import"./index-CZ4pHQb2.js";import"./Legend-DQ9XwNwf.js";import"./index-BVPNhhj4.js";import"./index-BmYvQTbQ.js";import"./Circle-Qf3Tu8hN.js";import"./Line-BjKan0E4.js";import"./Square-CZVurtTs.js";import"./index-C_mwV-nm.js";import"./index-BljJ1e5J.js";import"./index-DSMIYGhk.js";import"./Tooltip-BrSlbkqa.js";import"./index-CIJ69QRa.js";import"./TooltipItem-C8j0DJCa.js";import"./index-C2WdQQJ3.js";import"./renderCanvas-DgN6C2Td.js";const{width:J,height:K,margin:o,useCanvas:L,theme:N,color:Q}=I,Re={title:"XYCharts/Column",component:d,parameters:{docs:{transformSource:e=>(e=e.replace(/data={\[.*?\]}/gs,"data={[ ...dataset ]}"),e=e.replaceAll(/undefined,?/g,""),e=e.replace(/^\s*\n/gm,""),e)},chromatic:{delay:300}},args:{onClick:p(),onMouseOver:p(),onMouseOut:p()},argTypes:{useCanvas:L,width:J,height:K,theme:N,color:Q,leftMargin:o,rightMargin:o,topMargin:o,bottomMargin:o}},P=H.uniqBy(V,e=>e["Item Type"]),l=e=>t.jsxs(A,{data:P,plotMargin:{left:e.leftMargin,right:e.rightMargin,top:e.topMargin,bottom:e.bottomMargin},width:e.width,height:e.height,animationDuration:e.animationDuration,useCanvas:e.useCanvas,theme:e.theme,onClick:e.onClick,onMouseOver:e.onMouseOver,onMouseOut:e.onMouseOut,children:[t.jsx(R,{fields:[e.y,e.y2,e.y3]}),t.jsx(_,{fields:[e.x],scaleType:"band",showGridlines:!1}),t.jsx(d,{x:e.x,y:e.y,color:e.color}),e.y2&&t.jsx(d,{x:e.x,y:e.y2,color:e.color2})]}),h=e=>t.jsxs(A,{data:P,plotMargin:{left:e.leftMargin,right:e.rightMargin,top:e.topMargin,bottom:e.bottomMargin},width:e.width,height:e.height,animationDuration:e.animationDuration,useCanvas:e.useCanvas,theme:e.theme,onClick:e.onClick,onMouseOver:e.onMouseOver,onMouseOut:e.onMouseOut,children:[t.jsx(R,{fields:[e.y,e.y2,e.y3],aggregate:e.stacked}),t.jsx(_,{fields:[e.x],scaleType:"band",showGridlines:!1}),t.jsx(z,{x:e.x,ys:[e.y,e.y2],grouped:e.grouped,stacked:e.stacked})]}),n={name:"Basic Plot",render:l,args:{useCanvas:!1,width:800,height:500,animationDuration:250,color:"#99C1DC",color2:"#fc998e",leftMargin:70,rightMargin:40,topMargin:40,bottomMargin:40,y:"Unit Price",x:"Item Type"},play:C("rect.column",{clientX:107,clientY:396})},r={name:"Custom Color",render:l,args:{...n.args,color:"orange"}},a={name:"Using Canvas",render:l,args:{...n.args,useCanvas:!0},play:q({clientX:107,clientY:396})},s={name:"Ratio Columns",render:l,args:{...n.args,y2:"Unit Cost",theme:{...u.light,series:{...u.light.series,opacity:1}}}},i={name:"Stacked Columns",render:h,args:{...n.args,y2:"Unit Cost",stacked:!0},play:C("rect.column",{clientX:107,clientY:396})},m={name:"Grouped Columns",render:h,args:{...n.args,y2:"Unit Cost",grouped:!0},play:C("rect.column",{clientX:107,clientY:396})},c={name:"Custom Theme",render:h,args:{...n.args,y2:"Unit Cost",grouped:!0,theme:{...u.dark,background:"#F3F1E5",axis:{stroke:"#969495"},gridlines:{stroke:"#969495"},colors:["#2FC2AF","#433F3E"]}}};var g,y,f;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:`{
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
}`,...(f=(y=n.parameters)==null?void 0:y.docs)==null?void 0:f.source}}};var M,x,T;r.parameters={...r.parameters,docs:{...(M=r.parameters)==null?void 0:M.docs,source:{originalSource:`{
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
}`,...(E=(D=c.parameters)==null?void 0:D.docs)==null?void 0:E.source}}};const _e=["Basic","Color","Canvas","Ratio","Stacked","Grouped","CustomTheme"];export{n as Basic,a as Canvas,r as Color,c as CustomTheme,m as Grouped,s as Ratio,i as Stacked,_e as __namedExportsOrder,Re as default};
//# sourceMappingURL=Column.stories-RJvxfouk.js.map
