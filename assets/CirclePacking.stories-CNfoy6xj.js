import{j as y}from"./jsx-runtime-BjG_zV1W.js";import{J as T}from"./index.es-DoiyW41S.js";import{f as c}from"./index-CFMwmiIJ.js";import{g as P}from"./gdp_dataset-DV7KFYC9.js";import{a as B}from"./argTypes-DuN6ki1s.js";import"./renderChart-DJ6bXfoi.js";import{a as s}from"./storybook-Cl2DMVpH.js";import{C as k}from"./index-Cw8P14OC.js";import"./react-redux-lkBMRsz6.js";import"./index-DpTt3J-R.js";import"./test-utils-C-DEfvFY.js";import"./index-D5nvoAmD.js";import"./client-CbGTh6y2.js";import"./index-Gn9jQ5lq.js";import"./lodash-DOJiQ2Wu.js";import"./index-DzcEfe_2.js";import"./index-CFwzIhDn.js";import"./Legend-DQjp6Mmo.js";import"./index-Bp2RIjag.js";import"./index-BmYvQTbQ.js";import"./Circle-Qf3Tu8hN.js";import"./Line-BjKan0E4.js";import"./Square-CZVurtTs.js";import"./index-DVli7D7_.js";import"./Tooltip-aFreqMLS.js";import"./index-iwe53Xj-.js";import"./TooltipItem-D41oQ2An.js";import"./index-DrWhuguZ.js";import"./index-5Gl1ki1p.js";import"./LabelsPlot-C9OJe8VL.js";import"./renderCanvas-DSAxZURY.js";import"./NodesPlot-cB_M2zll.js";import"./useTooltip-B4jsLD3t.js";const{width:S,height:w,margin:a,useCanvas:O,theme:z}=B,le={title:"Charts/Hierarchical/CirclePacking",component:k,parameters:{docs:{transformSource:e=>(e=e.replace(/data={\[.*?\]}/gs,"data={[ ...dataset ]}"),e=e.replaceAll(/undefined,?/g,""),e=e.replace(/^\s*\n/gm,""),e)},chromatic:{delay:300}},args:{onClick:c(),onMouseOver:c(),onMouseOut:c()},argTypes:{useCanvas:O,width:S,height:w,theme:z,leftMargin:a,rightMargin:a,topMargin:a,bottomMargin:a}},X=P,i=e=>y.jsx(k,{data:e.data??X,plotMargin:{left:e.leftMargin,right:e.rightMargin,top:e.topMargin,bottom:e.bottomMargin},width:e.width,height:e.height,animationDuration:e.animationDuration,theme:e.theme,useCanvas:e.useCanvas,zoomable:e.zoomable,breadcrumb:e.breadcrumb,onClick:e.onClick,onMouseOver:e.onMouseOver,onMouseOut:e.onMouseOut,categories:e.categories,value:e.value,sort:e.sort}),r={name:"Basic Plot",render:i,args:{useCanvas:!1,width:600,height:600,animationDuration:250,theme:T.light,leftMargin:40,rightMargin:40,topMargin:40,bottomMargin:40,categories:["continent","country"],value:"gdp",sort:!0,zoomable:!1,breadcrumb:!1},play:s("circle.circle-packing-node",{clientX:150,clientY:300})},t={name:"Using Canvas",render:i,args:{...r.args,useCanvas:!0}},n={name:"3-level Circle Packing",render:i,args:{...r.args,categories:["continent","country","sector"]},play:s("circle.circle-packing-node",{clientX:150,clientY:300})},o={name:"Zoomable with Breadcrumb",render:i,args:{...r.args,categories:["continent","country","sector"],zoomable:!0,breadcrumb:!0},play:s("circle.circle-packing-node",{clientX:150,clientY:300})};var m,l,p;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:`{
  name: "Basic Plot",
  render: CirclePackingTemplate,
  args: {
    useCanvas: false,
    width: 600,
    height: 600,
    animationDuration: 250,
    theme: themes.light,
    leftMargin: 40,
    rightMargin: 40,
    topMargin: 40,
    bottomMargin: 40,
    categories: ["continent", "country"],
    value: "gdp",
    sort: true,
    zoomable: false,
    breadcrumb: false
  },
  play: createSVGTest("circle.circle-packing-node", {
    clientX: 150,
    clientY: 300
  })
}`,...(p=(l=r.parameters)==null?void 0:l.docs)==null?void 0:p.source}}};var g,u,d;t.parameters={...t.parameters,docs:{...(g=t.parameters)==null?void 0:g.docs,source:{originalSource:`{
  name: "Using Canvas",
  render: CirclePackingTemplate,
  args: {
    ...Basic.args,
    useCanvas: true
  }
}`,...(d=(u=t.parameters)==null?void 0:u.docs)==null?void 0:d.source}}};var h,b,C;n.parameters={...n.parameters,docs:{...(h=n.parameters)==null?void 0:h.docs,source:{originalSource:`{
  name: "3-level Circle Packing",
  render: CirclePackingTemplate,
  args: {
    ...Basic.args,
    categories: ["continent", "country", "sector"]
  },
  play: createSVGTest("circle.circle-packing-node", {
    clientX: 150,
    clientY: 300
  })
}`,...(C=(b=n.parameters)==null?void 0:b.docs)==null?void 0:C.source}}};var f,M,v;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`{
  name: "Zoomable with Breadcrumb",
  render: CirclePackingTemplate,
  args: {
    ...Basic.args,
    categories: ["continent", "country", "sector"],
    zoomable: true,
    breadcrumb: true
  },
  play: createSVGTest("circle.circle-packing-node", {
    clientX: 150,
    clientY: 300
  })
}`,...(v=(M=o.parameters)==null?void 0:M.docs)==null?void 0:v.source}}};const pe=["Basic","Canvas","ThreeLevel","Zoomable"];export{r as Basic,t as Canvas,n as ThreeLevel,o as Zoomable,pe as __namedExportsOrder,le as default};
//# sourceMappingURL=CirclePacking.stories-CNfoy6xj.js.map
