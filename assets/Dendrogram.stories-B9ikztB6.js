import{j as J}from"./jsx-runtime-BjG_zV1W.js";import{J as P}from"./index.es-DoiyW41S.js";import{f as p}from"./index-CFMwmiIJ.js";import{g as A}from"./gdp_dataset-DV7KFYC9.js";import{a as H}from"./argTypes-DuN6ki1s.js";import"./renderChart-DJ6bXfoi.js";import{a as t,b as W}from"./storybook-Cl2DMVpH.js";import{D as E}from"./index-CBcXhfcM.js";import"./react-redux-lkBMRsz6.js";import"./index-DpTt3J-R.js";import"./test-utils-C-DEfvFY.js";import"./index-D5nvoAmD.js";import"./client-CbGTh6y2.js";import"./index-Gn9jQ5lq.js";import"./lodash-DOJiQ2Wu.js";import"./index-DzcEfe_2.js";import"./index-CFwzIhDn.js";import"./Legend-DQjp6Mmo.js";import"./index-Bp2RIjag.js";import"./index-BmYvQTbQ.js";import"./Circle-Qf3Tu8hN.js";import"./Line-BjKan0E4.js";import"./Square-CZVurtTs.js";import"./index-vFMZ7B83.js";import"./index-D1GbqKuK.js";import"./index-CaWU7ljP.js";import"./ContextMenu-Dkh4zLYP.js";import"./index-CsGapHqM.js";import"./index-BkBTUWQV.js";import"./index-5Gl1ki1p.js";import"./index-DVli7D7_.js";import"./Tooltip-aFreqMLS.js";import"./index-iwe53Xj-.js";import"./TooltipItem-D41oQ2An.js";import"./index-DrWhuguZ.js";import"./LabelsPlot-C9OJe8VL.js";import"./renderCanvas-DSAxZURY.js";import"./LinksPlot-CoPVhndq.js";import"./NodesPlot-cB_M2zll.js";import"./useTooltip-B4jsLD3t.js";const{width:q,height:F,margin:o,useCanvas:I,theme:K}=H,Le={title:"Charts/Hierarchical/Dendrogram",component:E,parameters:{docs:{transformSource:e=>(e=e.replace(/data={\[.*?\]}/gs,"data={[ ...dataset ]}"),e=e.replaceAll(/undefined,?/g,""),e=e.replace(/^\s*\n/gm,""),e)},chromatic:{delay:300}},args:{onClick:p(),onMouseOver:p(),onMouseOut:p()},argTypes:{useCanvas:I,width:q,height:F,theme:K,leftMargin:o,rightMargin:o,topMargin:o,bottomMargin:o}},N=A,a=e=>J.jsx(E,{data:e.data??N,plotMargin:{left:e.leftMargin,right:e.rightMargin,top:e.topMargin,bottom:e.bottomMargin},width:e.width,height:e.height,animationDuration:e.animationDuration,theme:e.theme,useCanvas:e.useCanvas,radial:e.radial,zoomable:e.zoomable,breadcrumb:e.breadcrumb,onClick:e.onClick,onMouseOver:e.onMouseOver,onMouseOut:e.onMouseOut,categories:e.categories,value:e.value,sort:e.sort,nodeRadius:e.nodeRadius}),r={name:"Basic Plot",render:a,args:{useCanvas:!1,width:800,height:500,animationDuration:250,theme:P.light,leftMargin:40,rightMargin:100,topMargin:40,bottomMargin:40,categories:["continent","country"],value:"gdp",sort:!0,zoomable:!1,breadcrumb:!1},play:t("circle.dendrogram-node",{clientX:100,clientY:250})},i={name:"Using Canvas",render:a,args:{...r.args,useCanvas:!0},play:W({clientX:346,clientY:108.5})},s={name:"3-level Dendrogram",render:a,args:{...r.args,categories:["continent","country","sector"]},play:t("circle.dendrogram-node",{clientX:100,clientY:250})},c={name:"Sized by Value",render:a,args:{...r.args,categories:["continent","country"],nodeRadius:[3,24]},play:t("circle.dendrogram-node",{clientX:100,clientY:250})},m={name:"Zoomable with Breadcrumb",render:a,args:{...r.args,categories:["continent","country","sector"],zoomable:!0,breadcrumb:!0},play:t("circle.dendrogram-node",{clientX:100,clientY:250})},n={name:"Radial",render:a,args:{...r.args,radial:!0,width:700,height:700,leftMargin:60,rightMargin:60,topMargin:60,bottomMargin:60},play:t("circle.radial-dendrogram-node",{clientX:447,clientY:285})},l={name:"Radial, Using Canvas",render:a,args:{...n.args,useCanvas:!0}},d={name:"Radial, 3-level",render:a,args:{...n.args,categories:["continent","country","sector"]},play:t("circle.radial-dendrogram-node",{clientX:447,clientY:285})},g={name:"Radial, Zoomable with Breadcrumb",render:a,args:{...n.args,categories:["continent","country","sector"],zoomable:!0,breadcrumb:!0},play:t("circle.radial-dendrogram-node",{clientX:447,clientY:285})};var u,h,b;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`{
  name: "Basic Plot",
  render: DendrogramTemplate,
  args: {
    useCanvas: false,
    width: 800,
    height: 500,
    animationDuration: 250,
    theme: themes.light,
    leftMargin: 40,
    rightMargin: 100,
    topMargin: 40,
    bottomMargin: 40,
    categories: ["continent", "country"],
    value: "gdp",
    sort: true,
    zoomable: false,
    breadcrumb: false
  },
  play: createSVGTest("circle.dendrogram-node", {
    clientX: 100,
    clientY: 250
  })
}`,...(b=(h=r.parameters)==null?void 0:h.docs)==null?void 0:b.source}}};var y,v,M;i.parameters={...i.parameters,docs:{...(y=i.parameters)==null?void 0:y.docs,source:{originalSource:`{
  name: "Using Canvas",
  render: DendrogramTemplate,
  args: {
    ...Basic.args,
    useCanvas: true
  },
  // Unlike createSVGTest (which grabs a DOM node directly by selector), this fires a real
  // mousemove/click at these page coordinates and relies on the virtual canvas's pixel-color hit
  // testing - so it has to land exactly on a rendered node. With \`categories={["continent",
  // "country"]}\` the first-level (continent) nodes sit at local SVG (330, 92.5); +16 accounts for
  // the Storybook root's own padding
  play: createCanvasTest({
    clientX: 346,
    clientY: 108.5
  })
}`,...(M=(v=i.parameters)==null?void 0:v.docs)==null?void 0:M.source}}};var f,T,S;s.parameters={...s.parameters,docs:{...(f=s.parameters)==null?void 0:f.docs,source:{originalSource:`{
  name: "3-level Dendrogram",
  render: DendrogramTemplate,
  args: {
    ...Basic.args,
    categories: ["continent", "country", "sector"]
  },
  play: createSVGTest("circle.dendrogram-node", {
    clientX: 100,
    clientY: 250
  })
}`,...(S=(T=s.parameters)==null?void 0:T.docs)==null?void 0:S.source}}};var R,C,D;c.parameters={...c.parameters,docs:{...(R=c.parameters)==null?void 0:R.docs,source:{originalSource:`{
  name: "Sized by Value",
  render: DendrogramTemplate,
  args: {
    ...Basic.args,
    categories: ["continent", "country"],
    nodeRadius: [3, 24]
  },
  play: createSVGTest("circle.dendrogram-node", {
    clientX: 100,
    clientY: 250
  })
}`,...(D=(C=c.parameters)==null?void 0:C.docs)==null?void 0:D.source}}};var X,Y,B;m.parameters={...m.parameters,docs:{...(X=m.parameters)==null?void 0:X.docs,source:{originalSource:`{
  name: "Zoomable with Breadcrumb",
  render: DendrogramTemplate,
  args: {
    ...Basic.args,
    categories: ["continent", "country", "sector"],
    zoomable: true,
    breadcrumb: true
  },
  play: createSVGTest("circle.dendrogram-node", {
    clientX: 100,
    clientY: 250
  })
}`,...(B=(Y=m.parameters)==null?void 0:Y.docs)==null?void 0:B.source}}};var V,w,z;n.parameters={...n.parameters,docs:{...(V=n.parameters)==null?void 0:V.docs,source:{originalSource:`{
  name: "Radial",
  render: DendrogramTemplate,
  args: {
    ...Basic.args,
    radial: true,
    width: 700,
    height: 700,
    leftMargin: 60,
    rightMargin: 60,
    topMargin: 60,
    bottomMargin: 60
  },
  play: createSVGTest("circle.radial-dendrogram-node", {
    clientX: 447,
    clientY: 285
  })
}`,...(z=(w=n.parameters)==null?void 0:w.docs)==null?void 0:z.source}}};var G,O,Z;l.parameters={...l.parameters,docs:{...(G=l.parameters)==null?void 0:G.docs,source:{originalSource:`{
  name: "Radial, Using Canvas",
  render: DendrogramTemplate,
  args: {
    ...Radial.args,
    useCanvas: true
  }
}`,...(Z=(O=l.parameters)==null?void 0:O.docs)==null?void 0:Z.source}}};var x,k,U;d.parameters={...d.parameters,docs:{...(x=d.parameters)==null?void 0:x.docs,source:{originalSource:`{
  name: "Radial, 3-level",
  render: DendrogramTemplate,
  args: {
    ...Radial.args,
    categories: ["continent", "country", "sector"]
  },
  play: createSVGTest("circle.radial-dendrogram-node", {
    clientX: 447,
    clientY: 285
  })
}`,...(U=(k=d.parameters)==null?void 0:k.docs)==null?void 0:U.source}}};var L,_,j;g.parameters={...g.parameters,docs:{...(L=g.parameters)==null?void 0:L.docs,source:{originalSource:`{
  name: "Radial, Zoomable with Breadcrumb",
  render: DendrogramTemplate,
  args: {
    ...Radial.args,
    categories: ["continent", "country", "sector"],
    zoomable: true,
    breadcrumb: true
  },
  play: createSVGTest("circle.radial-dendrogram-node", {
    clientX: 447,
    clientY: 285
  })
}`,...(j=(_=g.parameters)==null?void 0:_.docs)==null?void 0:j.source}}};const _e=["Basic","Canvas","ThreeLevel","SizedByValue","Zoomable","Radial","RadialCanvas","RadialThreeLevel","RadialZoomable"];export{r as Basic,i as Canvas,n as Radial,l as RadialCanvas,d as RadialThreeLevel,g as RadialZoomable,c as SizedByValue,s as ThreeLevel,m as Zoomable,_e as __namedExportsOrder,Le as default};
//# sourceMappingURL=Dendrogram.stories-B9ikztB6.js.map
