import{j as T}from"./jsx-runtime-BjG_zV1W.js";import{V as F}from"./react-redux-SPeguAgb.js";import{f as i}from"./index-Dcm7olAB.js";import{a as S}from"./argTypes-DuN6ki1s.js";import{w as V,j as c}from"./dataControls-DatG45sm.js";import"./renderChart-D1szSHoV.js";import{a as s,b as X}from"./storybook-CxwCI9RW.js";import{F as D,P as Y}from"./index-B_99FLAR.js";import"./index-DpTt3J-R.js";import"./isChromatic-VqprqId_.js";import"./test-utils-C-DEfvFY.js";import"./index-D5nvoAmD.js";import"./client-CbGTh6y2.js";import"./index-BRXO1njn.js";import"./lodash-DOJiQ2Wu.js";import"./index-9431aKHi.js";import"./index-BAzb9S1k.js";import"./Legend-z40re8h9.js";import"./index-Dub0Swig.js";import"./index-BmYvQTbQ.js";import"./Circle-Qf3Tu8hN.js";import"./Line-BjKan0E4.js";import"./Square-CZVurtTs.js";import"./index-9usyF_v_.js";import"./Tooltip-aPd-LmbL.js";import"./index-CRhM32cg.js";import"./TooltipItem-OfChlkFL.js";import"./interpolatePoints-DwMMV_8i.js";import"./renderCanvas-CR85T-h9.js";import"./useTooltip-BlFpqfM-.js";const{width:k,height:B,margin:n,useCanvas:j,theme:x}=S,ht={title:"Charts/Funnel/Funnel",component:D,parameters:{docs:{transformSource:t=>(t=t.replace(/data={\[.*?\]}/gs,"data={[ ...dataset ]}"),t=t.replaceAll(/undefined,?/g,""),t=t.replace(/^\s*\n/gm,""),t)},chromatic:{delay:300}},args:{onClick:i(),onMouseOver:i(),onMouseOut:i()},argTypes:{useCanvas:j,width:k,height:B,theme:x,leftMargin:n,rightMargin:n,topMargin:n,bottomMargin:n}},m=[{stage:"Website Visits",count:12e3},{stage:"Product Views",count:6400},{stage:"Added to Cart",count:2300},{stage:"Checkout Started",count:1200},{stage:"Purchases",count:640}],A=[{stage:"Added to Cart",count:2300},{stage:"Website Visits",count:12e3},{stage:"Purchases",count:640},{stage:"Product Views",count:6400},{stage:"Checkout Started",count:1200}],W={initialData:m,randomize:t=>c(t,["count"],.2),createPoint:t=>{const l=t[Math.floor(Math.random()*t.length)];return c({...l,stage:`${l.stage} (New)`},["count"],.2)},minLength:2},w=t=>T.jsx(D,{data:t.data??m,plotMargin:{left:t.leftMargin,right:t.rightMargin,top:t.topMargin,bottom:t.bottomMargin},width:t.width,height:t.height,animationDuration:t.animationDuration,theme:t.theme,useCanvas:t.useCanvas,onClick:t.onClick,onMouseOver:t.onMouseOver,onMouseOut:t.onMouseOut,category:t.category,value:t.value,sort:t.sort,padding:t.padding}),b=V(w,W),G=t=>T.jsx(Y,{data:t.data??m,plotMargin:{left:t.leftMargin,right:t.rightMargin,top:t.topMargin,bottom:t.bottomMargin},width:t.width,height:t.height,animationDuration:t.animationDuration,theme:t.theme,useCanvas:t.useCanvas,onClick:t.onClick,onMouseOver:t.onMouseOver,onMouseOut:t.onMouseOut,category:t.category,value:t.value,sort:t.sort,padding:t.padding}),e={name:"Basic Plot",render:b,args:{useCanvas:!1,width:800,height:500,animationDuration:250,theme:F.light,leftMargin:40,rightMargin:40,topMargin:40,bottomMargin:40,category:"stage",value:"count",sort:!0,padding:2},play:s("polygon.funnel-segment",{clientX:400,clientY:150})},a={name:"Using Canvas",render:b,args:{...e.args,useCanvas:!0},play:X({clientX:400,clientY:150})},o={name:"Pyramid",render:G,args:{...e.args},play:s("polygon.funnel-segment",{clientX:400,clientY:150})},r={name:"Preserving Data Order",render:w,args:{...e.args,data:A,sort:!1},play:s("polygon.funnel-segment",{clientX:400,clientY:150})};var u,p,d;e.parameters={...e.parameters,docs:{...(u=e.parameters)==null?void 0:u.docs,source:{originalSource:`{
  name: "Basic Plot",
  render: FunnelTemplateWithControls,
  args: {
    useCanvas: false,
    width: 800,
    height: 500,
    animationDuration: 250,
    theme: themes.light,
    leftMargin: 40,
    rightMargin: 40,
    topMargin: 40,
    bottomMargin: 40,
    category: "stage",
    value: "count",
    sort: true,
    padding: 2
  },
  play: createSVGTest("polygon.funnel-segment", {
    clientX: 400,
    clientY: 150
  })
}`,...(d=(p=e.parameters)==null?void 0:p.docs)==null?void 0:d.source}}};var g,h,M;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`{
  name: "Using Canvas",
  render: FunnelTemplateWithControls,
  args: {
    ...Basic.args,
    useCanvas: true
  },
  play: createCanvasTest({
    clientX: 400,
    clientY: 150
  })
}`,...(M=(h=a.parameters)==null?void 0:h.docs)==null?void 0:M.source}}};var f,C,y;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`{
  name: "Pyramid",
  render: PyramidTemplate,
  args: {
    ...Basic.args
  },
  play: createSVGTest("polygon.funnel-segment", {
    clientX: 400,
    clientY: 150
  })
}`,...(y=(C=o.parameters)==null?void 0:C.docs)==null?void 0:y.source}}};var v,P,O;r.parameters={...r.parameters,docs:{...(v=r.parameters)==null?void 0:v.docs,source:{originalSource:`{
  name: "Preserving Data Order",
  render: FunnelTemplate,
  args: {
    ...Basic.args,
    data: unsortedData,
    sort: false
  },
  play: createSVGTest("polygon.funnel-segment", {
    clientX: 400,
    clientY: 150
  })
}`,...(O=(P=r.parameters)==null?void 0:P.docs)==null?void 0:O.source}}};const Mt=["Basic","Canvas","AsPyramid","CustomOrder"];export{o as AsPyramid,e as Basic,a as Canvas,r as CustomOrder,Mt as __namedExportsOrder,ht as default};
//# sourceMappingURL=Funnel.stories-CDaiFa5O.js.map
