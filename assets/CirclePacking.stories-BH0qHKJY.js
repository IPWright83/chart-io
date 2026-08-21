import{j as y}from"./jsx-runtime-BjG_zV1W.js";import{V as T}from"./react-redux-SPeguAgb.js";import{f as c}from"./index-Dcm7olAB.js";import{g as P}from"./gdp_dataset-DV7KFYC9.js";import{a as B}from"./argTypes-DuN6ki1s.js";import"./renderChart-D1szSHoV.js";import{a as s}from"./storybook-CxwCI9RW.js";import{C as k}from"./index-DPqJA-7V.js";import"./index-DpTt3J-R.js";import"./test-utils-C-DEfvFY.js";import"./index-D5nvoAmD.js";import"./client-CbGTh6y2.js";import"./index-BRXO1njn.js";import"./lodash-DOJiQ2Wu.js";import"./index-9431aKHi.js";import"./index-BAzb9S1k.js";import"./Legend-z40re8h9.js";import"./index-Dub0Swig.js";import"./index-BmYvQTbQ.js";import"./Circle-Qf3Tu8hN.js";import"./Line-BjKan0E4.js";import"./Square-CZVurtTs.js";import"./index-9usyF_v_.js";import"./Tooltip-aPd-LmbL.js";import"./index-CRhM32cg.js";import"./TooltipItem-OfChlkFL.js";import"./index-BBDmPaB_.js";import"./LabelsPlot-Co4tuujP.js";import"./renderCanvas-CR85T-h9.js";import"./NodesPlot-BCoyNFhJ.js";import"./useTooltip-BlFpqfM-.js";const{width:S,height:w,margin:a,useCanvas:O,theme:z}=B,se={title:"Charts/Hierarchical/CirclePacking",component:k,parameters:{docs:{transformSource:e=>(e=e.replace(/data={\[.*?\]}/gs,"data={[ ...dataset ]}"),e=e.replaceAll(/undefined,?/g,""),e=e.replace(/^\s*\n/gm,""),e)},chromatic:{delay:300}},args:{onClick:c(),onMouseOver:c(),onMouseOut:c()},argTypes:{useCanvas:O,width:S,height:w,theme:z,leftMargin:a,rightMargin:a,topMargin:a,bottomMargin:a}},V=P,i=e=>y.jsx(k,{data:e.data??V,plotMargin:{left:e.leftMargin,right:e.rightMargin,top:e.topMargin,bottom:e.bottomMargin},width:e.width,height:e.height,animationDuration:e.animationDuration,theme:e.theme,useCanvas:e.useCanvas,zoomable:e.zoomable,breadcrumb:e.breadcrumb,onClick:e.onClick,onMouseOver:e.onMouseOver,onMouseOut:e.onMouseOut,categories:e.categories,value:e.value,sort:e.sort}),r={name:"Basic Plot",render:i,args:{useCanvas:!1,width:600,height:600,animationDuration:250,theme:T.light,leftMargin:40,rightMargin:40,topMargin:40,bottomMargin:40,categories:["continent","country"],value:"gdp",sort:!0,zoomable:!1,breadcrumb:!1},play:s("circle.circle-packing-node",{clientX:150,clientY:300})},t={name:"Using Canvas",render:i,args:{...r.args,useCanvas:!0}},n={name:"3-level Circle Packing",render:i,args:{...r.args,categories:["continent","country","sector"]},play:s("circle.circle-packing-node",{clientX:150,clientY:300})},o={name:"Zoomable with Breadcrumb",render:i,args:{...r.args,categories:["continent","country","sector"],zoomable:!0,breadcrumb:!0},play:s("circle.circle-packing-node",{clientX:150,clientY:300})};var m,l,p;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:`{
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
}`,...(v=(M=o.parameters)==null?void 0:M.docs)==null?void 0:v.source}}};const me=["Basic","Canvas","ThreeLevel","Zoomable"];export{r as Basic,t as Canvas,n as ThreeLevel,o as Zoomable,me as __namedExportsOrder,se as default};
//# sourceMappingURL=CirclePacking.stories-BH0qHKJY.js.map
