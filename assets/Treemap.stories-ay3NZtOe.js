import{j}from"./jsx-runtime-BjG_zV1W.js";import{J as x}from"./index.es-DoiyW41S.js";import{f as c}from"./index-CFMwmiIJ.js";import{g as X}from"./gdp_dataset-DV7KFYC9.js";import{a as G}from"./argTypes-DuN6ki1s.js";import{w as L,j as p}from"./dataControls-DatG45sm.js";import"./renderChart-DJ6bXfoi.js";import{a as s,b as V}from"./storybook-Cl2DMVpH.js";import{T as Y}from"./index-CQRKux3Q.js";import"./isChromatic-VqprqId_.js";import"./index-DpTt3J-R.js";import"./react-redux-lkBMRsz6.js";import"./test-utils-C-DEfvFY.js";import"./index-D5nvoAmD.js";import"./client-CbGTh6y2.js";import"./index-Gn9jQ5lq.js";import"./lodash-DOJiQ2Wu.js";import"./index-DzcEfe_2.js";import"./index-CFwzIhDn.js";import"./Legend-DQjp6Mmo.js";import"./index-Bp2RIjag.js";import"./index-BmYvQTbQ.js";import"./Circle-Qf3Tu8hN.js";import"./Line-BjKan0E4.js";import"./Square-CZVurtTs.js";import"./index-DVli7D7_.js";import"./Tooltip-aFreqMLS.js";import"./index-iwe53Xj-.js";import"./TooltipItem-D41oQ2An.js";import"./index-DrWhuguZ.js";import"./index-5Gl1ki1p.js";import"./renderCanvas-DSAxZURY.js";import"./useTooltip-B4jsLD3t.js";const{width:Z,height:_,margin:a,useCanvas:k,theme:H}=G,ye={title:"Charts/Hierarchical/Treemap",component:Y,parameters:{docs:{transformSource:e=>(e=e.replace(/data={\[.*?\]}/gs,"data={[ ...dataset ]}"),e=e.replaceAll(/undefined,?/g,""),e=e.replace(/^\s*\n/gm,""),e)},chromatic:{delay:300}},args:{onClick:c(),onMouseOver:c(),onMouseOut:c()},argTypes:{useCanvas:k,width:Z,height:_,theme:H,leftMargin:a,rightMargin:a,topMargin:a,bottomMargin:a}},z=X,P=X.flatMap(e=>[{...e,half:"H1",gdp:Math.round(e.gdp*.45)},{...e,half:"H2",gdp:Math.round(e.gdp*.55)}]),W={initialData:z,randomize:e=>p(e,["gdp"],.3),createPoint:e=>{const l=e[Math.floor(Math.random()*e.length)];return p({...l,country:`${l.country} (New)`},["gdp"],.3)},minLength:6},m=e=>j.jsx(Y,{data:e.data??z,plotMargin:{left:e.leftMargin,right:e.rightMargin,top:e.topMargin,bottom:e.bottomMargin},width:e.width,height:e.height,animationDuration:e.animationDuration,theme:e.theme,useCanvas:e.useCanvas,zoomable:e.zoomable,breadcrumb:e.breadcrumb,onClick:e.onClick,onMouseOver:e.onMouseOver,onMouseOut:e.onMouseOut,categories:e.categories,value:e.value,sort:e.sort,padding:e.padding}),O=L(m,W),t={name:"Basic Plot",render:O,args:{useCanvas:!1,width:800,height:500,animationDuration:250,theme:x.light,leftMargin:40,rightMargin:40,topMargin:40,bottomMargin:40,categories:["continent","country"],value:"gdp",sort:!0,padding:2,zoomable:!1,breadcrumb:!1},play:s("rect.treemap-cell",{clientX:150,clientY:150})},r={name:"Using Canvas",render:O,args:{...t.args,useCanvas:!0},play:V({clientX:150,clientY:150})},n={name:"3-level Treemap",render:m,args:{...t.args,categories:["continent","country","sector"]},play:s("rect.treemap-cell",{clientX:150,clientY:150})},o={name:"4-level Treemap",render:m,args:{...t.args,categories:["continent","country","sector","half"],data:P},play:s("rect.treemap-cell",{clientX:150,clientY:150})},i={name:"Zoomable with Breadcrumb",render:m,args:{...t.args,categories:["continent","country","sector"],zoomable:!0,breadcrumb:!0},play:s("rect.treemap-cell",{clientX:150,clientY:150})};var u,d,g;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
}`,...(B=(w=i.parameters)==null?void 0:w.docs)==null?void 0:B.source}}};const Ce=["Basic","Canvas","ThreeLevel","DeepTreemap","Zoomable"];export{t as Basic,r as Canvas,o as DeepTreemap,n as ThreeLevel,i as Zoomable,Ce as __namedExportsOrder,ye as default};
//# sourceMappingURL=Treemap.stories-ay3NZtOe.js.map
