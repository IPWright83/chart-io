import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{a as j}from"./argTypes-DuN6ki1s.js";import{w as l}from"./waves-BDt9gctZ.js";import"./index-C3dhlPHa.js";import{X as u}from"./index-Bg6IsbDW.js";import{a as m}from"./Lines-BtR_OUgn.js";import{a as D,A as B}from"./Areas-DNR506EA.js";import{S as s}from"./Scatters-t7a3qHKk.js";import{Y as h}from"./YAxis-DSGnzgTy.js";import{X as g}from"./XAxis-ChDwRgF9.js";import{a as k,C as S}from"./Columns-Dzd93bGI.js";import"./index-DpTt3J-R.js";import"./index-D50cK_1g.js";import"./react-redux-QXbQKOoW.js";import"./index-CRk78wGA.js";import"./index-_rl-6daV.js";import"./lodash-DOJiQ2Wu.js";import"./index-D53rF_3R.js";import"./index-Du5VnEcz.js";import"./index-CJyk9Ty5.js";import"./index-gt7zBpiH.js";import"./Legend-pimTzOFw.js";import"./index-D4-eAyeX.js";import"./index-BmYvQTbQ.js";import"./Circle-Qf3Tu8hN.js";import"./Line-BjKan0E4.js";import"./Square-CZVurtTs.js";import"./index-B2ADnR9i.js";import"./index-mxfEYTca.js";import"./index-BEVv-T-d.js";import"./Tooltip-DL_pUHjQ.js";import"./index-BH_8yRl6.js";import"./TooltipItem-CWwi-etI.js";import"./index-BXRhMbPE.js";import"./index-C_QuCFx-.js";import"./index-DIhe8qvN.js";import"./renderCanvas-Cl5RbTFF.js";const{width:G,height:A,margin:n,useCanvas:X,theme:z,color:Y}=j,bo={title:"XYCharts/MixedPlots",component:m,parameters:{docs:{transformSource:o=>(o=o.replace(/data={\[.*?\]}/gs,"data={[ ...dataset ]}"),o=o.replaceAll(/undefined,?/g,""),o=o.replace(/^\s*\n/gm,""),o)},chromatic:{delay:300}},argTypes:{useCanvas:X,width:G,height:A,theme:z,color:Y,leftMargin:n,rightMargin:n,topMargin:n,bottomMargin:n,onClick:{action:"clicked"},onMouseOver:{action:"onMouseOver"},onMouseOut:{action:"onMouseOut"}}},P=o=>e.jsxs(u,{data:l,plotMargin:{left:o.leftMargin,right:o.rightMargin,top:o.topMargin,bottom:o.bottomMargin},width:o.width,height:o.height,animationDuration:o.animationDuration,theme:o.theme,useCanvas:o.useCanvas,onClick:o.onClick,onMouseOver:o.onMouseOver,onMouseOut:o.onMouseOut,zoomBrush:o.zoomBrush,children:[e.jsx(D,{x:o.x,y:o.y2}),e.jsx(m,{x:o.x,y:o.y,color:"steelblue"}),e.jsx(s,{x:o.x,y:o.y,color:"steelblue"}),e.jsx(h,{fields:[o.y,o.y2],showGridlines:!1}),e.jsx(g,{fields:[o.x],showGridlines:!1})]}),L=o=>e.jsxs(u,{data:l,plotMargin:{left:o.leftMargin,right:o.rightMargin,top:o.topMargin,bottom:o.bottomMargin},width:o.width,height:o.height,animationDuration:o.animationDuration,theme:o.theme,useCanvas:o.useCanvas,onClick:o.onClick,onMouseOver:o.onMouseOver,onMouseOut:o.onMouseOut,zoomBrush:o.zoomBrush,children:[e.jsx(k,{x:o.x,y:o.y2,color:"orange"}),e.jsx(m,{x:o.x,y:o.y,color:"steelblue"}),e.jsx(s,{x:o.x,y:o.y,color:"steelblue"}),e.jsx(s,{x:o.x,y:o.y2,color:"orange"}),e.jsx(h,{fields:[o.y,o.y2],showGridlines:!1}),e.jsx(g,{fields:[o.x],scaleType:"band",showGridlines:!1})]}),T=o=>e.jsxs(u,{data:l,plotMargin:{left:o.leftMargin,right:o.rightMargin,top:o.topMargin,bottom:o.bottomMargin},width:o.width,height:o.height,animationDuration:o.animationDuration,theme:o.theme,useCanvas:o.useCanvas,onClick:o.onClick,onMouseOver:o.onMouseOver,onMouseOut:o.onMouseOut,zoomBrush:o.zoomBrush,children:[e.jsx(k,{x:o.x,y:o.y,color:"orange"}),e.jsx(m,{x:o.x,y:o.y2,color:"steelblue"}),e.jsx(s,{x:o.x,y:o.y,color:"orange"}),e.jsx(s,{x:o.x,y:o.y2,color:"steelblue"}),e.jsx(h,{fields:[o.y,o.y2],showGridlines:!1}),e.jsx(g,{fields:o.x,showGridlines:!1})]}),N=o=>e.jsxs(u,{data:l,plotMargin:{left:o.leftMargin,right:o.rightMargin,top:o.topMargin,bottom:o.bottomMargin},width:o.width,height:o.height,animationDuration:o.animationDuration,theme:o.theme,useCanvas:o.useCanvas,onClick:o.onClick,onMouseOver:o.onMouseOver,onMouseOut:o.onMouseOut,zoomBrush:o.zoomBrush,children:[e.jsx(B,{x:o.x,ys:[o.y,o.y2],stacked:o.stacked}),e.jsx(S,{x:o.x,ys:[o.y,o.y2],grouped:o.grouped,stacked:o.stacked}),e.jsx(s,{x:o.x,y:o.y2,color:"steelblue"}),e.jsx(h,{fields:[o.y,o.y2,o.y3,o.y4],aggregate:o.stacked,showGridlines:!1}),e.jsx(g,{fields:[o.x],showGridlines:!1,scaleType:"band"})]}),t=P.bind({});t.storyName="Mixed Continuous Plots";t.args={useCanvas:!1,width:800,height:500,animationDuration:500,color:"#99C1DC",theme:"light",leftMargin:70,rightMargin:40,topMargin:40,bottomMargin:40,y:"sin",y2:"cos",x:"x"};const a=L.bind({});a.storyName="Mixing Continuous Plots with a Band scale";a.args={...t.args};const r=T.bind({});r.storyName="Mixing Discrete Plots using a Linear Scale";r.args={useCanvas:!1,width:800,height:500,animationDuration:500,color:"#99C1DC",theme:"light",leftMargin:70,rightMargin:40,topMargin:40,bottomMargin:40,y:"sin",y2:"cos",x:"x"};const i=N.bind({});i.storyName="Groupled Column & Scatter";i.args={useCanvas:!1,width:800,height:500,animationDuration:500,color:"#99C1DC",theme:"light",leftMargin:70,rightMargin:40,topMargin:40,bottomMargin:40,y:"sin",y2:"cos",x:"x",grouped:!0,stacked:!1};var d,x,c;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`args => <XYChart data={waves} plotMargin={{
  left: args.leftMargin,
  right: args.rightMargin,
  top: args.topMargin,
  bottom: args.bottomMargin
}} width={args.width} height={args.height} animationDuration={args.animationDuration} theme={args.theme} useCanvas={args.useCanvas} onClick={args.onClick} onMouseOver={args.onMouseOver} onMouseOut={args.onMouseOut} zoomBrush={args.zoomBrush}>
    <Area x={args.x} y={args.y2} />
    <Line x={args.x} y={args.y} color="steelblue" />
    <Scatter x={args.x} y={args.y} color="steelblue" />
    <YAxis fields={[args.y, args.y2]} showGridlines={false} />
    <XAxis fields={[args.x]} showGridlines={false} />
  </XYChart>`,...(c=(x=t.parameters)==null?void 0:x.docs)==null?void 0:c.source}}};var M,p,y;a.parameters={...a.parameters,docs:{...(M=a.parameters)==null?void 0:M.docs,source:{originalSource:`args => <XYChart data={waves} plotMargin={{
  left: args.leftMargin,
  right: args.rightMargin,
  top: args.topMargin,
  bottom: args.bottomMargin
}} width={args.width} height={args.height} animationDuration={args.animationDuration} theme={args.theme} useCanvas={args.useCanvas} onClick={args.onClick} onMouseOver={args.onMouseOver} onMouseOut={args.onMouseOut} zoomBrush={args.zoomBrush}>
    <Column x={args.x} y={args.y2} color="orange" />
    <Line x={args.x} y={args.y} color="steelblue" />
    <Scatter x={args.x} y={args.y} color="steelblue" />
    <Scatter x={args.x} y={args.y2} color="orange" />
    <YAxis fields={[args.y, args.y2]} showGridlines={false} />
    <XAxis fields={[args.x]} scaleType="band" showGridlines={false} />
  </XYChart>`,...(y=(p=a.parameters)==null?void 0:p.docs)==null?void 0:y.source}}};var f,C,v;r.parameters={...r.parameters,docs:{...(f=r.parameters)==null?void 0:f.docs,source:{originalSource:`args => <XYChart data={waves} plotMargin={{
  left: args.leftMargin,
  right: args.rightMargin,
  top: args.topMargin,
  bottom: args.bottomMargin
}} width={args.width} height={args.height} animationDuration={args.animationDuration} theme={args.theme} useCanvas={args.useCanvas} onClick={args.onClick} onMouseOver={args.onMouseOver} onMouseOut={args.onMouseOut} zoomBrush={args.zoomBrush}>
    <Column x={args.x} y={args.y} color="orange" />
    <Line x={args.x} y={args.y2} color="steelblue" />
    <Scatter x={args.x} y={args.y} color="orange" />
    <Scatter x={args.x} y={args.y2} color="steelblue" />
    <YAxis fields={[args.y, args.y2]} showGridlines={false} />
    <XAxis fields={args.x} showGridlines={false} />
  </XYChart>`,...(v=(C=r.parameters)==null?void 0:C.docs)==null?void 0:v.source}}};var w,b,O;i.parameters={...i.parameters,docs:{...(w=i.parameters)==null?void 0:w.docs,source:{originalSource:`args => <XYChart data={waves} plotMargin={{
  left: args.leftMargin,
  right: args.rightMargin,
  top: args.topMargin,
  bottom: args.bottomMargin
}} width={args.width} height={args.height} animationDuration={args.animationDuration} theme={args.theme} useCanvas={args.useCanvas} onClick={args.onClick} onMouseOver={args.onMouseOver} onMouseOut={args.onMouseOut} zoomBrush={args.zoomBrush}>
    <Areas x={args.x} ys={[args.y, args.y2]} stacked={args.stacked} />
    <Columns x={args.x} ys={[args.y, args.y2]} grouped={args.grouped} stacked={args.stacked} />
    <Scatter x={args.x} y={args.y2} color="steelblue" />
    <YAxis fields={[args.y, args.y2, args.y3, args.y4]} aggregate={args.stacked} showGridlines={false} />
    <XAxis fields={[args.x]} showGridlines={false} scaleType="band" />
  </XYChart>`,...(O=(b=i.parameters)==null?void 0:b.docs)==null?void 0:O.source}}};const Oo=["MixedLineAreaScatter","MixedScaleBand","MixedColumnPlotsLinear","MixedGroupedColumnPlots"];export{r as MixedColumnPlotsLinear,i as MixedGroupedColumnPlots,t as MixedLineAreaScatter,a as MixedScaleBand,Oo as __namedExportsOrder,bo as default};
//# sourceMappingURL=MixedPlot.stories-CJvCYmMi.js.map
