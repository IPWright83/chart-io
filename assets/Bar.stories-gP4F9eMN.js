import{j as t}from"./jsx-runtime-vNq4Oc-g.js";import{l as _}from"./index-CnLlP05v.js";import{t as p}from"./Provider--AC3n3ro.js";import{a as P}from"./argTypes-85zPIrV9.js";import{s as V}from"./sales_records_dataset-6YEpZKGQ.js";import{a as l,B as A}from"./Bars-lINfJt2r.js";import{X as G}from"./index-H7nlrqdg.js";import"./index-Qdriakje.js";import{a as d,b as E}from"./storybook-JflYOSSi.js";import{Y as U}from"./YAxis-EYrVkw1t.js";import{X as w}from"./XAxis-r21t602H.js";import"./index-4g5l5LRQ.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./index-jmm5gWkb.js";import"./index-CTVlSsFV.js";import"./getParentKey-EyapHLH0.js";import"./index-K4Hn1GGT.js";import"./defaultLocale-4fp4Qluw.js";import"./useStore-5GkWK8oz.js";import"./renderCanvas-mvVrqX_A.js";import"./ensureNoScaleOverflow-0H3eBhJa.js";import"./array-5Vj4K6aY.js";import"./index-7Eg7ybPU.js";import"./defaultLocale-RGkPOkAo.js";import"./index-A_rqIulo.js";import"./index-3lT3xPrt.js";import"./index-rbFQVUQr.js";import"./index-gu_448hd.js";import"./Legend-AepxjzR_.js";import"./index-qFq04NJk.js";import"./index-RAAq-Dtz.js";import"./Circle-2MkuDq74.js";import"./Line-cari06pN.js";import"./Square-_dp0HJFb.js";import"./index-N5QiI7wA.js";import"./index-ibvSOphJ.js";import"./index-0hCrwOlf.js";import"./Tooltip-CF66P4Pc.js";import"./index-W-Z_0x6I.js";import"./TooltipItem-SVu_bEZv.js";import"./index-rmVHmJse.js";import"./index-dosLtsPy.js";import"./index-fcJ2LOVC.js";import"./client-vNP-bS9o.js";import"./index-PPLHz8o0.js";import"./_baseIsEqual-ujzER7rs.js";import"./index-oRJpL3FP.js";import"./uniq-dzufyT16.js";import"./index-AKtXjuxE.js";const{width:I,height:q,margin:o,useCanvas:z,theme:F,color:H}=P,Ie={title:"XYCharts/Bar",component:l,parameters:{docs:{transformSource:e=>(e=e.replace(/data={\[.*?\]}/gs,"data={[ ...dataset ]}"),e=e.replaceAll(/undefined,?/g,""),e=e.replace(/^\s*\n/gm,""),e)},chromatic:{delay:300}},argTypes:{useCanvas:z,width:I,height:q,theme:F,color:H,leftMargin:o,rightMargin:o,topMargin:o,bottomMargin:o,onClick:{action:"clicked"},onMouseOver:{action:"onMouseOver"},onMouseOut:{action:"onMouseOut"}}},D=_.uniqBy(V,e=>e["Item Type"]),c=e=>t.jsxs(G,{data:D,plotMargin:{left:e.leftMargin,right:e.rightMargin,top:e.topMargin,bottom:e.bottomMargin},width:e.width,height:e.height,animationDuration:e.animationDuration,theme:e.theme,useCanvas:e.useCanvas,onClick:e.onClick,onMouseOver:e.onMouseOver,onMouseOut:e.onMouseOut,children:[t.jsx(U,{fields:[e.y],scaleType:"band",showGridlines:!1}),t.jsx(w,{fields:[e.x,e.x2,e.x3]}),t.jsx(l,{x:e.x,y:e.y,color:e.color}),e.x2&&t.jsx(l,{x:e.x2,y:e.y,color:e.color2})]}),R=e=>t.jsxs(G,{data:D,plotMargin:{left:e.leftMargin,right:e.rightMargin,top:e.topMargin,bottom:e.bottomMargin},width:e.width,height:e.height,animationDuration:e.animationDuration,useCanvas:e.useCanvas,theme:e.theme,onClick:e.onClick,onMouseOver:e.onMouseOver,onMouseOut:e.onMouseOut,children:[t.jsx(U,{fields:[e.y],scaleType:"band",showGridlines:!1}),t.jsx(w,{fields:[e.x,e.x2,e.x3],aggregate:e.stacked}),t.jsx(A,{y:e.y,xs:[e.x,e.x2],grouped:e.grouped,stacked:e.stacked})]}),r={name:"Basic Plot",render:c,args:{useCanvas:!1,width:800,height:500,animationDuration:250,color:"#99C1DC",color2:"#fc998e",theme:p.light,leftMargin:120,rightMargin:40,topMargin:40,bottomMargin:40,x:"Unit Price",y:"Item Type"},play:d("rect.bar",{clientX:107,clientY:396})},a={name:"Custom Color",render:c,args:{...r.args,color:"orange"}},n={name:"Using Canvas",render:c,args:{...r.args,useCanvas:!0},play:E({clientX:245,clientY:455})},i={name:"Ratio Bars",render:c,args:{...r.args,x2:"Unit Cost",theme:{...p.light,series:{...p.light.series,opacity:1}}}},s={name:"Stacked Bars",render:R,args:{...r.args,x2:"Unit Cost",stacked:!0},play:d("rect.bar",{clientX:107,clientY:396})},m={name:"Grouped Bars",render:R,args:{...r.args,x2:"Unit Cost",grouped:!0},play:d("rect.bar",{clientX:107,clientY:396})};var u,h,g;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
}`,...(g=(h=r.parameters)==null?void 0:h.docs)==null?void 0:g.source}}};var x,C,M;a.parameters={...a.parameters,docs:{...(x=a.parameters)==null?void 0:x.docs,source:{originalSource:`{
  name: "Custom Color",
  render: BarTemplate,
  args: {
    ...Basic.args,
    color: "orange"
  }
}`,...(M=(C=a.parameters)==null?void 0:C.docs)==null?void 0:M.source}}};var f,y,B;n.parameters={...n.parameters,docs:{...(f=n.parameters)==null?void 0:f.docs,source:{originalSource:`{
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
}`,...(B=(y=n.parameters)==null?void 0:y.docs)==null?void 0:B.source}}};var v,T,b;i.parameters={...i.parameters,docs:{...(v=i.parameters)==null?void 0:v.docs,source:{originalSource:`{
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
}`,...(b=(T=i.parameters)==null?void 0:T.docs)==null?void 0:b.source}}};var k,S,O;s.parameters={...s.parameters,docs:{...(k=s.parameters)==null?void 0:k.docs,source:{originalSource:`{
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
}`,...(O=(S=s.parameters)==null?void 0:S.docs)==null?void 0:O.source}}};var X,Y,j;m.parameters={...m.parameters,docs:{...(X=m.parameters)==null?void 0:X.docs,source:{originalSource:`{
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
}`,...(j=(Y=m.parameters)==null?void 0:Y.docs)==null?void 0:j.source}}};const qe=["Basic","Color","Canvas","Ratio","Stacked","Grouped"];export{r as Basic,n as Canvas,a as Color,m as Grouped,i as Ratio,s as Stacked,qe as __namedExportsOrder,Ie as default};
//# sourceMappingURL=Bar.stories-gP4F9eMN.js.map
