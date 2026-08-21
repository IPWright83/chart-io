import{j as V}from"./jsx-runtime-BjG_zV1W.js";import{V as j}from"./react-redux-SPeguAgb.js";import{f as c}from"./index-Dcm7olAB.js";import{g as X}from"./gdp_dataset-DV7KFYC9.js";import{a as x}from"./argTypes-DuN6ki1s.js";import{w as G,j as p}from"./dataControls-DatG45sm.js";import"./renderChart-D1szSHoV.js";import{a as s,b as L}from"./storybook-CxwCI9RW.js";import{T as Y}from"./index-CmKRTxUI.js";import"./index-DpTt3J-R.js";import"./isChromatic-VqprqId_.js";import"./test-utils-C-DEfvFY.js";import"./index-D5nvoAmD.js";import"./client-CbGTh6y2.js";import"./index-BRXO1njn.js";import"./lodash-DOJiQ2Wu.js";import"./index-9431aKHi.js";import"./index-BAzb9S1k.js";import"./Legend-z40re8h9.js";import"./index-Dub0Swig.js";import"./index-BmYvQTbQ.js";import"./Circle-Qf3Tu8hN.js";import"./Line-BjKan0E4.js";import"./Square-CZVurtTs.js";import"./index-9usyF_v_.js";import"./Tooltip-aPd-LmbL.js";import"./index-CRhM32cg.js";import"./TooltipItem-OfChlkFL.js";import"./index-BBDmPaB_.js";import"./renderCanvas-CR85T-h9.js";import"./useTooltip-BlFpqfM-.js";const{width:Z,height:_,margin:a,useCanvas:k,theme:H}=x,ve={title:"Charts/Hierarchical/Treemap",component:Y,parameters:{docs:{transformSource:e=>(e=e.replace(/data={\[.*?\]}/gs,"data={[ ...dataset ]}"),e=e.replaceAll(/undefined,?/g,""),e=e.replace(/^\s*\n/gm,""),e)},chromatic:{delay:300}},args:{onClick:c(),onMouseOver:c(),onMouseOut:c()},argTypes:{useCanvas:k,width:Z,height:_,theme:H,leftMargin:a,rightMargin:a,topMargin:a,bottomMargin:a}},z=X,P=X.flatMap(e=>[{...e,half:"H1",gdp:Math.round(e.gdp*.45)},{...e,half:"H2",gdp:Math.round(e.gdp*.55)}]),W={initialData:z,randomize:e=>p(e,["gdp"],.3),createPoint:e=>{const l=e[Math.floor(Math.random()*e.length)];return p({...l,country:`${l.country} (New)`},["gdp"],.3)},minLength:6},m=e=>V.jsx(Y,{data:e.data??z,plotMargin:{left:e.leftMargin,right:e.rightMargin,top:e.topMargin,bottom:e.bottomMargin},width:e.width,height:e.height,animationDuration:e.animationDuration,theme:e.theme,useCanvas:e.useCanvas,zoomable:e.zoomable,breadcrumb:e.breadcrumb,onClick:e.onClick,onMouseOver:e.onMouseOver,onMouseOut:e.onMouseOut,categories:e.categories,value:e.value,sort:e.sort,padding:e.padding}),O=G(m,W),t={name:"Basic Plot",render:O,args:{useCanvas:!1,width:800,height:500,animationDuration:250,theme:j.light,leftMargin:40,rightMargin:40,topMargin:40,bottomMargin:40,categories:["continent","country"],value:"gdp",sort:!0,padding:2,zoomable:!1,breadcrumb:!1},play:s("rect.treemap-cell",{clientX:150,clientY:150})},r={name:"Using Canvas",render:O,args:{...t.args,useCanvas:!0},play:L({clientX:150,clientY:150})},n={name:"3-level Treemap",render:m,args:{...t.args,categories:["continent","country","sector"]},play:s("rect.treemap-cell",{clientX:150,clientY:150})},o={name:"4-level Treemap",render:m,args:{...t.args,categories:["continent","country","sector","half"],data:P},play:s("rect.treemap-cell",{clientX:150,clientY:150})},i={name:"Zoomable with Breadcrumb",render:m,args:{...t.args,categories:["continent","country","sector"],zoomable:!0,breadcrumb:!0},play:s("rect.treemap-cell",{clientX:150,clientY:150})};var u,d,g;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`{
  name: "Basic Plot",
  render: TreemapTemplateWithControls,
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
    categories: ["continent", "country"],
    value: "gdp",
    sort: true,
    padding: 2,
    zoomable: false,
    breadcrumb: false
  },
  play: createSVGTest("rect.treemap-cell", {
    clientX: 150,
    clientY: 150
  })
}`,...(g=(d=t.parameters)==null?void 0:d.docs)==null?void 0:g.source}}};var h,T,f;r.parameters={...r.parameters,docs:{...(h=r.parameters)==null?void 0:h.docs,source:{originalSource:`{
  name: "Using Canvas",
  render: TreemapTemplateWithControls,
  args: {
    ...Basic.args,
    useCanvas: true
  },
  play: createCanvasTest({
    clientX: 150,
    clientY: 150
  })
}`,...(f=(T=r.parameters)==null?void 0:T.docs)==null?void 0:f.source}}};var b,v,M;n.parameters={...n.parameters,docs:{...(b=n.parameters)==null?void 0:b.docs,source:{originalSource:`{
  name: "3-level Treemap",
  render: TreemapTemplate,
  args: {
    ...Basic.args,
    categories: ["continent", "country", "sector"]
  },
  play: createSVGTest("rect.treemap-cell", {
    clientX: 150,
    clientY: 150
  })
}`,...(M=(v=n.parameters)==null?void 0:v.docs)==null?void 0:M.source}}};var y,C,D;o.parameters={...o.parameters,docs:{...(y=o.parameters)==null?void 0:y.docs,source:{originalSource:`{
  name: "4-level Treemap",
  render: TreemapTemplate,
  args: {
    ...Basic.args,
    categories: ["continent", "country", "sector", "half"],
    data: fourLevelData
  },
  play: createSVGTest("rect.treemap-cell", {
    clientX: 150,
    clientY: 150
  })
}`,...(D=(C=o.parameters)==null?void 0:C.docs)==null?void 0:D.source}}};var S,w,B;i.parameters={...i.parameters,docs:{...(S=i.parameters)==null?void 0:S.docs,source:{originalSource:`{
  name: "Zoomable with Breadcrumb",
  render: TreemapTemplate,
  args: {
    ...Basic.args,
    categories: ["continent", "country", "sector"],
    zoomable: true,
    breadcrumb: true
  },
  play: createSVGTest("rect.treemap-cell", {
    clientX: 150,
    clientY: 150
  })
}`,...(B=(w=i.parameters)==null?void 0:w.docs)==null?void 0:B.source}}};const Me=["Basic","Canvas","ThreeLevel","DeepTreemap","Zoomable"];export{t as Basic,r as Canvas,o as DeepTreemap,n as ThreeLevel,i as Zoomable,Me as __namedExportsOrder,ve as default};
//# sourceMappingURL=Treemap.stories-DNPpelGz.js.map
