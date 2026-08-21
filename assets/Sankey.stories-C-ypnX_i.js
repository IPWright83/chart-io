import{j as S}from"./jsx-runtime-BjG_zV1W.js";import{V as T}from"./react-redux-SPeguAgb.js";import{f as o}from"./index-Dcm7olAB.js";import{g as w}from"./gdp_dataset-DV7KFYC9.js";import{a as b}from"./argTypes-DuN6ki1s.js";import{w as D,j as s}from"./dataControls-DatG45sm.js";import"./renderChart-D1szSHoV.js";import{a as M,b as O}from"./storybook-CxwCI9RW.js";import{S as C}from"./index-DnRZR6m4.js";import"./index-DpTt3J-R.js";import"./isChromatic-VqprqId_.js";import"./test-utils-C-DEfvFY.js";import"./index-D5nvoAmD.js";import"./client-CbGTh6y2.js";import"./index-BRXO1njn.js";import"./lodash-DOJiQ2Wu.js";import"./index-9431aKHi.js";import"./index-BAzb9S1k.js";import"./Legend-z40re8h9.js";import"./index-Dub0Swig.js";import"./index-BmYvQTbQ.js";import"./Circle-Qf3Tu8hN.js";import"./Line-BjKan0E4.js";import"./Square-CZVurtTs.js";import"./index-9usyF_v_.js";import"./Tooltip-aPd-LmbL.js";import"./index-CRhM32cg.js";import"./TooltipItem-OfChlkFL.js";import"./LabelsPlot-Co4tuujP.js";import"./renderCanvas-CR85T-h9.js";import"./LinksPlot-EyWHfZA0.js";import"./useTooltip-BlFpqfM-.js";const{width:B,height:X,margin:n,useCanvas:Y,theme:j}=b,le={title:"Charts/Flow/Sankey",component:C,parameters:{docs:{transformSource:e=>(e=e.replace(/data={\[.*?\]}/gs,"data={[ ...dataset ]}"),e=e.replaceAll(/undefined,?/g,""),e=e.replace(/^\s*\n/gm,""),e)},chromatic:{delay:300}},args:{onClick:o(),onMouseOver:o(),onMouseOut:o()},argTypes:{useCanvas:Y,width:B,height:X,theme:j,leftMargin:n,rightMargin:n,topMargin:n,bottomMargin:n}},f=w,x={initialData:f,randomize:e=>s(e,["gdp"],.3),createPoint:e=>{const i=e[Math.floor(Math.random()*e.length)];return s({...i,country:`${i.country} (New)`},["gdp"],.3)},minLength:6},v=e=>S.jsx(C,{data:e.data??f,plotMargin:{left:e.leftMargin,right:e.rightMargin,top:e.topMargin,bottom:e.bottomMargin},width:e.width,height:e.height,animationDuration:e.animationDuration,theme:e.theme,useCanvas:e.useCanvas,onClick:e.onClick,onMouseOver:e.onMouseOver,onMouseOut:e.onMouseOut,categories:e.categories,value:e.value}),k=D(v,x),t={name:"Basic Plot",render:k,args:{useCanvas:!1,width:800,height:500,animationDuration:250,theme:T.light,leftMargin:40,rightMargin:40,topMargin:40,bottomMargin:40,categories:["continent","sector"],value:"gdp"},play:M("rect.sankey-node",{clientX:150,clientY:150})},a={name:"Using Canvas",render:k,args:{...t.args,useCanvas:!0},play:O({clientX:150,clientY:150})},r={name:"3-column Sankey",render:v,args:{...t.args,categories:["continent","country","sector"]},play:M("rect.sankey-node",{clientX:150,clientY:150})};var m,c,p;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`{
  name: "Basic Plot",
  render: SankeyTemplateWithControls,
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
    categories: ["continent", "sector"],
    value: "gdp"
  },
  play: createSVGTest("rect.sankey-node", {
    clientX: 150,
    clientY: 150
  })
}`,...(p=(c=t.parameters)==null?void 0:c.docs)==null?void 0:p.source}}};var l,g,u;a.parameters={...a.parameters,docs:{...(l=a.parameters)==null?void 0:l.docs,source:{originalSource:`{
  name: "Using Canvas",
  render: SankeyTemplateWithControls,
  args: {
    ...Basic.args,
    useCanvas: true
  },
  play: createCanvasTest({
    clientX: 150,
    clientY: 150
  })
}`,...(u=(g=a.parameters)==null?void 0:g.docs)==null?void 0:u.source}}};var d,h,y;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`{
  name: "3-column Sankey",
  render: SankeyTemplate,
  args: {
    ...Basic.args,
    categories: ["continent", "country", "sector"]
  },
  play: createSVGTest("rect.sankey-node", {
    clientX: 150,
    clientY: 150
  })
}`,...(y=(h=r.parameters)==null?void 0:h.docs)==null?void 0:y.source}}};const ge=["Basic","Canvas","ThreeColumn"];export{t as Basic,a as Canvas,r as ThreeColumn,ge as __namedExportsOrder,le as default};
//# sourceMappingURL=Sankey.stories-C-ypnX_i.js.map
