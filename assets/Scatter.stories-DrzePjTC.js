import{j as e}from"./jsx-runtime-DEdD30eg.js";import{f as u}from"./index-CPFb5ytF.js";import{s as E}from"./sales_records_dataset-WHK6HSqq.js";import{a as J}from"./argTypes-bxm3gCeR.js";import"./index-b9bwP9Bh.js";import"./renderChart-C4tDReWK.js";import{a as K,b as L}from"./storybook-DsatEiwt.js";import{X as V}from"./index-CdkoYB7w.js";import{S as G,a as Q}from"./Scatters-CPmcphPq.js";import{Y as z}from"./YAxis-DuDb07NW.js";import{X as N}from"./XAxis-B_MFapNx.js";import"./index-RYns6xqu.js";import"./index-sbqOYYIm.js";import"./test-utils-pcsCGetG.js";import"./client-BylhC-KR.js";import"./index-DBRTqYFH.js";import"./index-COLyWrXh.js";import"./defaultLocale-D2nGpDRe.js";import"./useStore-DWdQsrPN.js";import"./index-CXvrs8Eg.js";import"./defaultLocale-C7xJETwF.js";import"./index-ASiZ4-uZ.js";import"./index-BZ_hkuv1.js";import"./index-9Z0J-FDy.js";import"./index-BPZQwoq3.js";import"./Legend-DEyrexXZ.js";import"./index-DhwMs0bd.js";import"./index-CW0FTg2B.js";import"./Circle-CWMyz_tz.js";import"./Line-B_2MgdvN.js";import"./Square-CektPBZh.js";import"./index-CKF-7MCu.js";import"./index-DQ1aKZo6.js";import"./index-CLSe-My4.js";import"./Tooltip-GS-CvhnY.js";import"./index-hvi0fNyA.js";import"./TooltipItem-D1zhnsxI.js";import"./index-BQ4jfyHA.js";import"./index-D888O4bb.js";import"./index-B2undoSo.js";import"./renderCanvas-BCjHZwb6.js";function a(){var C="/home/runner/work/chart-io/chart-io/packages/react/src/data/huge_data_set.js",H="d28d8a9f43bbac5cd7a7dd734ba138037549784c",p=window,d="__coverage__",I={path:"/home/runner/work/chart-io/chart-io/packages/react/src/data/huge_data_set.js",statementMap:{0:{start:{line:1,column:20},end:{line:1,column:22}},1:{start:{line:3,column:0},end:{line:8,column:1}},2:{start:{line:3,column:13},end:{line:3,column:14}},3:{start:{line:4,column:4},end:{line:7,column:7}}},fnMap:{},branchMap:{},s:{0:0,1:0,2:0,3:0},f:{},b:{},inputSourceMap:{version:3,sources:["/home/runner/work/chart-io/chart-io/packages/react/src/data/huge_data_set.js"],names:[],mappings:"AAAA,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;;AAEtB,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AAChC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AACvB,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AAC3C,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AAC/C,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AACN;;AAEA,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;"},_coverageSchema:"1a1c01bbd47fc00a2c39e90264f33305004495a9",hash:"d28d8a9f43bbac5cd7a7dd734ba138037549784c"},r=p[d]||(p[d]={});(!r[C]||r[C].hash!==H)&&(r[C]=I);var h=r[C];return a=function(){return h},h}a();let q=(a().s[0]++,[]);a().s[1]++;for(let C=(a().s[2]++,0);C<2e4;C++)a().s[3]++,q.push({"Units Sold":Math.random()*1e4,"Total Profit":Math.random()*16e5});const{width:W,height:Z,margin:n,useCanvas:$,theme:CC,color:AC}=J,qC={title:"XYCharts/Scatter",component:G,parameters:{docs:{transformSource:C=>(C=C.replace(/data={\[.*?\]}/gs,"data={[ ...dataset ]}"),C=C.replaceAll(/undefined,?/g,""),C=C.replace(/^\s*\n/gm,""),C)},chromatic:{delay:300}},args:{onClick:u(),onMouseOver:u(),onMouseOut:u()},argTypes:{useCanvas:$,width:W,height:Z,theme:CC,color:AC,leftMargin:n,rightMargin:n,topMargin:n,bottomMargin:n,radius:{description:"The radius of the points on the chart",control:{type:"range",min:1,max:100},defaultValue:{summary:5}}}},t=C=>e.jsxs(V,{data:C.data,plotMargin:{left:C.leftMargin,right:C.rightMargin,top:C.topMargin,bottom:C.bottomMargin},width:C.width,height:C.height,animationDuration:C.animationDuration,theme:C.theme,useCanvas:C.useCanvas,onClick:C.onClick,onMouseOver:C.onMouseOver,onMouseOut:C.onMouseOut,children:[e.jsx(z,{fields:[C.y,C.y2,C.y3]}),e.jsx(N,{fields:[C.x]}),e.jsx(G,{x:C.x,y:C.y,radius:C.radius,color:C.color,noClip:!0})]}),F=C=>e.jsxs(V,{plotMargin:{left:C.leftMargin,right:C.rightMargin,top:C.topMargin,bottom:C.bottomMargin},data:E,width:C.width,height:C.height,animationDuration:C.animationDuration,theme:C.theme,useCanvas:C.useCanvas,onClick:C.onClick,onMouseOver:C.onMouseOver,onMouseOut:C.onMouseOut,children:[e.jsx(z,{fields:[C.y,C.y2,C.y3]}),e.jsx(N,{fields:[C.x]}),e.jsx(Q,{x:C.x,ys:[C.y,C.y2,C.y3],radius:C.radius})]}),A={name:"Basic Plot",render:t,args:{useCanvas:!1,width:800,height:500,animationDuration:250,color:"#99C1DC",theme:"light",radius:5,leftMargin:70,rightMargin:40,topMargin:40,bottomMargin:40,data:E,y:"Total Profit",x:"Units Sold"},play:K("circle",{clientX:773,clientY:227})},o={name:"Custom Radius",render:t,args:{...A.args,radius:15}},s={name:"Custom Color",render:t,args:{...A.args,color:"orange"}},i={name:"Using Canvas",render:t,args:{...A.args,useCanvas:!0},play:L({clientX:773,clientY:227})},c={name:"Mutiple Scatter Plots",render:F,args:{...A.args,y2:"Total Revenue",y3:"Total Cost"}},m={name:"Mutiple Scatter Plots using Canvas",render:F,args:{...A.args,y2:"Total Revenue",y3:"Total Cost",useCanvas:!0}},l={name:"Progressive Rendering large datasets",render:t,args:{...A.args,animationDuration:0,data:q,height:500,useCanvas:!0,radius:3,width:800},parameters:{chromatic:{disableSnapshot:!0}}};var g,v,M;A.parameters={...A.parameters,docs:{...(g=A.parameters)==null?void 0:g.docs,source:{originalSource:`{
  name: "Basic Plot",
  render: ScatterTemplate,
  args: {
    useCanvas: false,
    width: 800,
    height: 500,
    animationDuration: 250,
    color: "#99C1DC",
    theme: "light",
    radius: 5,
    leftMargin: 70,
    rightMargin: 40,
    topMargin: 40,
    bottomMargin: 40,
    data: sales_records_dataset,
    y: "Total Profit",
    x: "Units Sold"
  },
  play: createSVGTest("circle", {
    clientX: 773,
    clientY: 227
  })
}`,...(M=(v=A.parameters)==null?void 0:v.docs)==null?void 0:M.source}}};var f,S,y;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`{
  name: "Custom Radius",
  render: ScatterTemplate,
  args: {
    ...Basic.args,
    radius: 15
  }
}`,...(y=(S=o.parameters)==null?void 0:S.docs)==null?void 0:y.source}}};var T,x,_;s.parameters={...s.parameters,docs:{...(T=s.parameters)==null?void 0:T.docs,source:{originalSource:`{
  name: "Custom Color",
  render: ScatterTemplate,
  args: {
    ...Basic.args,
    color: "orange"
  }
}`,...(_=(x=s.parameters)==null?void 0:x.docs)==null?void 0:_.source}}};var b,w,j;i.parameters={...i.parameters,docs:{...(b=i.parameters)==null?void 0:b.docs,source:{originalSource:`{
  name: "Using Canvas",
  render: ScatterTemplate,
  args: {
    ...Basic.args,
    useCanvas: true
  },
  play: createCanvasTest({
    clientX: 773,
    clientY: 227
  })
}`,...(j=(w=i.parameters)==null?void 0:w.docs)==null?void 0:j.source}}};var P,R,k;c.parameters={...c.parameters,docs:{...(P=c.parameters)==null?void 0:P.docs,source:{originalSource:`{
  name: "Mutiple Scatter Plots",
  render: ScattersTemplate,
  args: {
    ...Basic.args,
    y2: "Total Revenue",
    y3: "Total Cost"
  }
}`,...(k=(R=c.parameters)==null?void 0:R.docs)==null?void 0:k.source}}};var B,D,O;m.parameters={...m.parameters,docs:{...(B=m.parameters)==null?void 0:B.docs,source:{originalSource:`{
  name: "Mutiple Scatter Plots using Canvas",
  render: ScattersTemplate,
  args: {
    ...Basic.args,
    y2: "Total Revenue",
    y3: "Total Cost",
    useCanvas: true
  }
}`,...(O=(D=m.parameters)==null?void 0:D.docs)==null?void 0:O.source}}};var X,Y,U;l.parameters={...l.parameters,docs:{...(X=l.parameters)==null?void 0:X.docs,source:{originalSource:`{
  name: "Progressive Rendering large datasets",
  render: ScatterTemplate,
  args: {
    ...Basic.args,
    animationDuration: 0,
    data: huge_data_set,
    height: 500,
    useCanvas: true,
    radius: 3,
    width: 800
  },
  parameters: {
    chromatic: {
      disableSnapshot: true
    }
  }
}`,...(U=(Y=l.parameters)==null?void 0:Y.docs)==null?void 0:U.source}}};const FC=["Basic","Radius","Color","Canvas","MultipleScatter","MultipleScatterCanvas","ProgresssiveRendering"];export{A as Basic,i as Canvas,s as Color,c as MultipleScatter,m as MultipleScatterCanvas,l as ProgresssiveRendering,o as Radius,FC as __namedExportsOrder,qC as default};
//# sourceMappingURL=Scatter.stories-DrzePjTC.js.map
