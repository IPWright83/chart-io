import{j as o}from"./jsx-runtime-BjG_zV1W.js";import{V as u}from"./react-redux-SPeguAgb.js";import{f as p}from"./index-Dcm7olAB.js";import{s as A}from"./sales_records_dataset-WHK6HSqq.js";import{a as H}from"./argTypes-DuN6ki1s.js";import{w as J,j as _}from"./dataControls-DatG45sm.js";import"./renderChart-D1szSHoV.js";import{a as C,b as K}from"./storybook-CxwCI9RW.js";import"./index-DwL5j-mS.js";import{X as W}from"./index-53SPihoZ.js";import{a as d,C as Q}from"./Columns-DCzCoYDu.js";import{l as Z}from"./lodash-DOJiQ2Wu.js";import{Y as q}from"./YAxis-BLu4jwFE.js";import{X as z}from"./XAxis-yIVuvz3U.js";import"./index-DpTt3J-R.js";import"./isChromatic-VqprqId_.js";import"./test-utils-C-DEfvFY.js";import"./index-D5nvoAmD.js";import"./client-CbGTh6y2.js";import"./index-Dd_IEiRF.js";import"./index-BRXO1njn.js";import"./index-9431aKHi.js";import"./index-sBPFWXw6.js";import"./index-yAu6bW1V.js";import"./index-DhP8WHXK.js";import"./index-Bdes0qwq.js";import"./index-BLxOKznu.js";import"./index-BAzb9S1k.js";import"./Legend-z40re8h9.js";import"./index-Dub0Swig.js";import"./index-BmYvQTbQ.js";import"./Circle-Qf3Tu8hN.js";import"./Line-BjKan0E4.js";import"./Square-CZVurtTs.js";import"./index-DxXlV5JW.js";import"./index-CErv1lK-.js";import"./index-9usyF_v_.js";import"./Tooltip-aPd-LmbL.js";import"./index-CRhM32cg.js";import"./TooltipItem-OfChlkFL.js";import"./index-rx8DGN-B.js";import"./renderCanvas-CR85T-h9.js";const{width:ee,height:te,margin:n,useCanvas:oe,theme:ne,color:re}=H,He={title:"Charts/XYCharts/Column",component:d,parameters:{docs:{transformSource:e=>(e=e.replace(/data={\[.*?\]}/gs,"data={[ ...dataset ]}"),e=e.replaceAll(/undefined,?/g,""),e=e.replace(/^\s*\n/gm,""),e)},chromatic:{delay:300}},args:{onClick:p(),onMouseOver:p(),onMouseOut:p()},argTypes:{useCanvas:oe,width:ee,height:te,theme:ne,color:re,leftMargin:n,rightMargin:n,topMargin:n,bottomMargin:n}},h=Z.uniqBy(A,e=>e["Item Type"]),L=["Units Sold","Unit Price","Unit Cost","Total Revenue","Total Cost","Total Profit"];function ae(e){const $=new Set(e.map(l=>l["Item Type"])),f=A.find(l=>!$.has(l["Item Type"]));if(f)return f;const T=e[Math.floor(Math.random()*e.length)];return _({...T,"Item Type":`${T["Item Type"]} (New)`},L,.3)}const se={initialData:h,randomize:e=>_(e,L,.3),createPoint:ae,minLength:2},g=e=>o.jsxs(W,{data:e.data??h,plotMargin:{left:e.leftMargin,right:e.rightMargin,top:e.topMargin,bottom:e.bottomMargin},width:e.width,height:e.height,animationDuration:e.animationDuration,useCanvas:e.useCanvas,theme:e.theme,onClick:e.onClick,onMouseOver:e.onMouseOver,onMouseOut:e.onMouseOut,children:[o.jsx(q,{fields:[e.y,e.y2,e.y3]}),o.jsx(z,{fields:[e.x],scaleType:"band",showGridlines:!1}),o.jsx(d,{x:e.x,y:e.y,color:e.color}),e.y2&&o.jsx(d,{x:e.x,y:e.y2,color:e.color2})]}),N=J(g,se),y=e=>o.jsxs(W,{data:h,plotMargin:{left:e.leftMargin,right:e.rightMargin,top:e.topMargin,bottom:e.bottomMargin},width:e.width,height:e.height,animationDuration:e.animationDuration,useCanvas:e.useCanvas,theme:e.theme,onClick:e.onClick,onMouseOver:e.onMouseOver,onMouseOut:e.onMouseOut,children:[o.jsx(q,{fields:[e.y,e.y2,e.y3],aggregate:e.stacked}),o.jsx(z,{fields:[e.x],scaleType:"band",showGridlines:!1}),o.jsx(Q,{x:e.x,ys:[e.y,e.y2],grouped:e.grouped,stacked:e.stacked})]}),t={name:"Basic Plot",render:N,args:{useCanvas:!1,width:800,height:500,animationDuration:250,color:"#99C1DC",color2:"#fc998e",leftMargin:70,rightMargin:40,topMargin:40,bottomMargin:40,y:"Unit Price",x:"Item Type"},play:C("rect.column",{clientX:107,clientY:396})},r={name:"Custom Color",render:g,args:{...t.args,color:"orange"}},a={name:"Using Canvas",render:N,args:{...t.args,useCanvas:!0},play:K({clientX:107,clientY:396})},s={name:"Ratio Columns",render:g,args:{...t.args,y2:"Unit Cost",theme:{...u.light,series:{...u.light.series,opacity:1}}}},i={name:"Stacked Columns",render:y,args:{...t.args,y2:"Unit Cost",stacked:!0},play:C("rect.column",{clientX:107,clientY:396})},m={name:"Grouped Columns",render:y,args:{...t.args,y2:"Unit Cost",grouped:!0},play:C("rect.column",{clientX:107,clientY:396})},c={name:"Custom Theme",render:y,args:{...t.args,y2:"Unit Cost",grouped:!0,theme:{...u.dark,background:"#F3F1E5",axis:{stroke:"#969495"},gridlines:{stroke:"#969495"},colors:["#2FC2AF","#433F3E"]}}};var M,x,k;t.parameters={...t.parameters,docs:{...(M=t.parameters)==null?void 0:M.docs,source:{originalSource:`{
  name: "Basic Plot",
  render: ColumnTemplateWithControls,
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
}`,...(k=(x=t.parameters)==null?void 0:x.docs)==null?void 0:k.source}}};var v,S,U;r.parameters={...r.parameters,docs:{...(v=r.parameters)==null?void 0:v.docs,source:{originalSource:`{
  name: "Custom Color",
  render: ColumnTemplate,
  args: {
    ...Basic.args,
    color: "orange"
  }
}`,...(U=(S=r.parameters)==null?void 0:S.docs)==null?void 0:U.source}}};var w,b,j;a.parameters={...a.parameters,docs:{...(w=a.parameters)==null?void 0:w.docs,source:{originalSource:`{
  name: "Using Canvas",
  render: ColumnTemplateWithControls,
  args: {
    ...Basic.args,
    useCanvas: true
  },
  play: createCanvasTest({
    clientX: 107,
    clientY: 396
  })
}`,...(j=(b=a.parameters)==null?void 0:b.docs)==null?void 0:j.source}}};var X,F,Y;s.parameters={...s.parameters,docs:{...(X=s.parameters)==null?void 0:X.docs,source:{originalSource:`{
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
}`,...(Y=(F=s.parameters)==null?void 0:F.docs)==null?void 0:Y.source}}};var B,D,O;i.parameters={...i.parameters,docs:{...(B=i.parameters)==null?void 0:B.docs,source:{originalSource:`{
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
}`,...(O=(D=i.parameters)==null?void 0:D.docs)==null?void 0:O.source}}};var G,E,I;m.parameters={...m.parameters,docs:{...(G=m.parameters)==null?void 0:G.docs,source:{originalSource:`{
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
}`,...(I=(E=m.parameters)==null?void 0:E.docs)==null?void 0:I.source}}};var P,R,V;c.parameters={...c.parameters,docs:{...(P=c.parameters)==null?void 0:P.docs,source:{originalSource:`{
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
}`,...(V=(R=c.parameters)==null?void 0:R.docs)==null?void 0:V.source}}};const Je=["Basic","Color","Canvas","Ratio","Stacked","Grouped","CustomTheme"];export{t as Basic,a as Canvas,r as Color,c as CustomTheme,m as Grouped,s as Ratio,i as Stacked,Je as __namedExportsOrder,He as default};
//# sourceMappingURL=Column.stories-CTP0yCsD.js.map
