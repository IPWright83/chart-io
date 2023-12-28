import{j as o}from"./jsx-runtime-vNq4Oc-g.js";import{l as P}from"./index-CnLlP05v.js";import{t as l}from"./Provider--AC3n3ro.js";import{a as V}from"./argTypes-85zPIrV9.js";import{s as I}from"./sales_records_dataset-6YEpZKGQ.js";import{a as u,C as q}from"./Columns-GXlf9bAA.js";import{X as E}from"./index-H7nlrqdg.js";import"./index-Qdriakje.js";import{a as d,b as z}from"./storybook-JflYOSSi.js";import{Y as A}from"./YAxis-EYrVkw1t.js";import{X as R}from"./XAxis-r21t602H.js";import"./index-4g5l5LRQ.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./index-jmm5gWkb.js";import"./index-CTVlSsFV.js";import"./getParentKey-EyapHLH0.js";import"./index-K4Hn1GGT.js";import"./defaultLocale-4fp4Qluw.js";import"./useStore-5GkWK8oz.js";import"./renderCanvas-mvVrqX_A.js";import"./ensureNoScaleOverflow-0H3eBhJa.js";import"./array-5Vj4K6aY.js";import"./index-7Eg7ybPU.js";import"./defaultLocale-RGkPOkAo.js";import"./index-A_rqIulo.js";import"./index-3lT3xPrt.js";import"./index-rbFQVUQr.js";import"./index-gu_448hd.js";import"./Legend-AepxjzR_.js";import"./index-qFq04NJk.js";import"./index-RAAq-Dtz.js";import"./Circle-2MkuDq74.js";import"./Line-cari06pN.js";import"./Square-_dp0HJFb.js";import"./index-N5QiI7wA.js";import"./index-ibvSOphJ.js";import"./index-0hCrwOlf.js";import"./Tooltip-CF66P4Pc.js";import"./index-W-Z_0x6I.js";import"./TooltipItem-SVu_bEZv.js";import"./index-rmVHmJse.js";import"./index-dosLtsPy.js";import"./index-fcJ2LOVC.js";import"./client-vNP-bS9o.js";import"./index-PPLHz8o0.js";import"./_baseIsEqual-ujzER7rs.js";import"./index-oRJpL3FP.js";import"./uniq-dzufyT16.js";import"./index-AKtXjuxE.js";const{width:H,height:J,margin:n,useCanvas:K,theme:L,color:N}=V,He={title:"XYCharts/Column",component:u,parameters:{docs:{transformSource:e=>(e=e.replace(/data={\[.*?\]}/gs,"data={[ ...dataset ]}"),e=e.replaceAll(/undefined,?/g,""),e=e.replace(/^\s*\n/gm,""),e)},chromatic:{delay:300}},argTypes:{useCanvas:K,width:H,height:J,theme:L,color:N,leftMargin:n,rightMargin:n,topMargin:n,bottomMargin:n,onClick:{action:"clicked"},onMouseOver:{action:"onMouseOver"},onMouseOut:{action:"onMouseOut"}}},_=P.uniqBy(I,e=>e["Item Type"]),p=e=>o.jsxs(E,{data:_,plotMargin:{left:e.leftMargin,right:e.rightMargin,top:e.topMargin,bottom:e.bottomMargin},width:e.width,height:e.height,animationDuration:e.animationDuration,useCanvas:e.useCanvas,theme:e.theme,onClick:e.onClick,onMouseOver:e.onMouseOver,onMouseOut:e.onMouseOut,children:[o.jsx(A,{fields:[e.y,e.y2,e.y3]}),o.jsx(R,{fields:[e.x],scaleType:"band",showGridlines:!1}),o.jsx(u,{x:e.x,y:e.y,color:e.color}),e.y2&&o.jsx(u,{x:e.x,y:e.y2,color:e.color2})]}),C=e=>o.jsxs(E,{data:_,plotMargin:{left:e.leftMargin,right:e.rightMargin,top:e.topMargin,bottom:e.bottomMargin},width:e.width,height:e.height,animationDuration:e.animationDuration,useCanvas:e.useCanvas,theme:e.theme,onClick:e.onClick,onMouseOver:e.onMouseOver,onMouseOut:e.onMouseOut,children:[o.jsx(A,{fields:[e.y,e.y2,e.y3],aggregate:e.stacked}),o.jsx(R,{fields:[e.x],scaleType:"band",showGridlines:!1}),o.jsx(q,{x:e.x,ys:[e.y,e.y2],grouped:e.grouped,stacked:e.stacked})]}),t={name:"Basic Plot",render:p,args:{useCanvas:!1,width:800,height:500,animationDuration:250,color:"#99C1DC",color2:"#fc998e",leftMargin:70,rightMargin:40,topMargin:40,bottomMargin:40,y:"Unit Price",x:"Item Type"},play:d("rect.column",{clientX:107,clientY:396})},r={name:"Custom Color",render:p,args:{...t.args,color:"orange"}},a={name:"Using Canvas",render:p,args:{...t.args,useCanvas:!0},play:z({clientX:107,clientY:396})},s={name:"Ratio Columns",render:p,args:{...t.args,y2:"Unit Cost",theme:{...l.light,series:{...l.light.series,opacity:1}}}},i={name:"Stacked Columns",render:C,args:{...t.args,y2:"Unit Cost",stacked:!0},play:d("rect.column",{clientX:107,clientY:396})},m={name:"Grouped Columns",render:C,args:{...t.args,y2:"Unit Cost",grouped:!0},play:d("rect.column",{clientX:107,clientY:396})},c={name:"Custom Theme",render:C,args:{...t.args,y2:"Unit Cost",grouped:!0,theme:{...l.dark,background:"#F3F1E5",axis:{stroke:"#969495"},gridlines:{stroke:"#969495"},colors:["#2FC2AF","#433F3E"]}}};var h,g,y;t.parameters={...t.parameters,docs:{...(h=t.parameters)==null?void 0:h.docs,source:{originalSource:`{
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
}`,...(y=(g=t.parameters)==null?void 0:g.docs)==null?void 0:y.source}}};var M,f,x;r.parameters={...r.parameters,docs:{...(M=r.parameters)==null?void 0:M.docs,source:{originalSource:`{
  name: "Custom Color",
  render: ColumnTemplate,
  args: {
    ...Basic.args,
    color: "orange"
  }
}`,...(x=(f=r.parameters)==null?void 0:f.docs)==null?void 0:x.source}}};var T,k,v;a.parameters={...a.parameters,docs:{...(T=a.parameters)==null?void 0:T.docs,source:{originalSource:`{
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
}`,...(v=(k=a.parameters)==null?void 0:k.docs)==null?void 0:v.source}}};var S,O,X;s.parameters={...s.parameters,docs:{...(S=s.parameters)==null?void 0:S.docs,source:{originalSource:`{
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
}`,...(X=(O=s.parameters)==null?void 0:O.docs)==null?void 0:X.source}}};var b,U,Y;i.parameters={...i.parameters,docs:{...(b=i.parameters)==null?void 0:b.docs,source:{originalSource:`{
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
}`,...(Y=(U=i.parameters)==null?void 0:U.docs)==null?void 0:Y.source}}};var j,B,F;m.parameters={...m.parameters,docs:{...(j=m.parameters)==null?void 0:j.docs,source:{originalSource:`{
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
}`,...(F=(B=m.parameters)==null?void 0:B.docs)==null?void 0:F.source}}};var G,w,D;c.parameters={...c.parameters,docs:{...(G=c.parameters)==null?void 0:G.docs,source:{originalSource:`{
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
}`,...(D=(w=c.parameters)==null?void 0:w.docs)==null?void 0:D.source}}};const Je=["Basic","Color","Canvas","Ratio","Stacked","Grouped","CustomTheme"];export{t as Basic,a as Canvas,r as Color,c as CustomTheme,m as Grouped,s as Ratio,i as Stacked,Je as __namedExportsOrder,He as default};
//# sourceMappingURL=Column.stories-7roXuGSa.js.map
