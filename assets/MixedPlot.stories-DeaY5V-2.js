import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{a as j}from"./argTypes-DuN6ki1s.js";import{w as l}from"./waves-BDt9gctZ.js";import"./index-B8eXPVPV.js";import{X as m}from"./index-53SPihoZ.js";import"./index-DwL5j-mS.js";import{a as u}from"./Lines-DLDdBXC5.js";import{a as D,A as B}from"./Areas-mZCDmN45.js";import{S as s}from"./Scatters-3-avvN77.js";import{Y as h}from"./YAxis-BLu4jwFE.js";import{X as g}from"./XAxis-yIVuvz3U.js";import{a as k,C as S}from"./Columns-DCzCoYDu.js";import"./index-DpTt3J-R.js";import"./index-BRXO1njn.js";import"./react-redux-SPeguAgb.js";import"./lodash-DOJiQ2Wu.js";import"./index-9431aKHi.js";import"./index-DhP8WHXK.js";import"./index-Bdes0qwq.js";import"./index-BLxOKznu.js";import"./index-BAzb9S1k.js";import"./Legend-z40re8h9.js";import"./index-Dub0Swig.js";import"./index-BmYvQTbQ.js";import"./Circle-Qf3Tu8hN.js";import"./Line-BjKan0E4.js";import"./Square-CZVurtTs.js";import"./index-DxXlV5JW.js";import"./index-CErv1lK-.js";import"./index-9usyF_v_.js";import"./Tooltip-aPd-LmbL.js";import"./index-CRhM32cg.js";import"./TooltipItem-OfChlkFL.js";import"./index-rx8DGN-B.js";import"./index-Dd_IEiRF.js";import"./index-sBPFWXw6.js";import"./index-yAu6bW1V.js";import"./renderCanvas-CR85T-h9.js";const{width:G,height:A,margin:n,useCanvas:X,theme:z,color:Y}=j,Oo={title:"Charts/XYCharts/MixedPlots",component:u,parameters:{docs:{transformSource:o=>(o=o.replace(/data={\[.*?\]}/gs,"data={[ ...dataset ]}"),o=o.replaceAll(/undefined,?/g,""),o=o.replace(/^\s*\n/gm,""),o)},chromatic:{delay:300}},argTypes:{useCanvas:X,width:G,height:A,theme:z,color:Y,leftMargin:n,rightMargin:n,topMargin:n,bottomMargin:n,onClick:{action:"clicked"},onMouseOver:{action:"onMouseOver"},onMouseOut:{action:"onMouseOut"}}},P=o=>e.jsxs(m,{data:l,plotMargin:{left:o.leftMargin,right:o.rightMargin,top:o.topMargin,bottom:o.bottomMargin},width:o.width,height:o.height,animationDuration:o.animationDuration,theme:o.theme,useCanvas:o.useCanvas,onClick:o.onClick,onMouseOver:o.onMouseOver,onMouseOut:o.onMouseOut,zoomBrush:o.zoomBrush,children:[e.jsx(D,{x:o.x,y:o.y2}),e.jsx(u,{x:o.x,y:o.y,color:"steelblue"}),e.jsx(s,{x:o.x,y:o.y,color:"steelblue"}),e.jsx(h,{fields:[o.y,o.y2],showGridlines:!1}),e.jsx(g,{fields:[o.x],showGridlines:!1})]}),L=o=>e.jsxs(m,{data:l,plotMargin:{left:o.leftMargin,right:o.rightMargin,top:o.topMargin,bottom:o.bottomMargin},width:o.width,height:o.height,animationDuration:o.animationDuration,theme:o.theme,useCanvas:o.useCanvas,onClick:o.onClick,onMouseOver:o.onMouseOver,onMouseOut:o.onMouseOut,zoomBrush:o.zoomBrush,children:[e.jsx(k,{x:o.x,y:o.y2,color:"orange"}),e.jsx(u,{x:o.x,y:o.y,color:"steelblue"}),e.jsx(s,{x:o.x,y:o.y,color:"steelblue"}),e.jsx(s,{x:o.x,y:o.y2,color:"orange"}),e.jsx(h,{fields:[o.y,o.y2],showGridlines:!1}),e.jsx(g,{fields:[o.x],scaleType:"band",showGridlines:!1})]}),T=o=>e.jsxs(m,{data:l,plotMargin:{left:o.leftMargin,right:o.rightMargin,top:o.topMargin,bottom:o.bottomMargin},width:o.width,height:o.height,animationDuration:o.animationDuration,theme:o.theme,useCanvas:o.useCanvas,onClick:o.onClick,onMouseOver:o.onMouseOver,onMouseOut:o.onMouseOut,zoomBrush:o.zoomBrush,children:[e.jsx(k,{x:o.x,y:o.y,color:"orange"}),e.jsx(u,{x:o.x,y:o.y2,color:"steelblue"}),e.jsx(s,{x:o.x,y:o.y,color:"orange"}),e.jsx(s,{x:o.x,y:o.y2,color:"steelblue"}),e.jsx(h,{fields:[o.y,o.y2],showGridlines:!1}),e.jsx(g,{fields:o.x,showGridlines:!1})]}),N=o=>e.jsxs(m,{data:l,plotMargin:{left:o.leftMargin,right:o.rightMargin,top:o.topMargin,bottom:o.bottomMargin},width:o.width,height:o.height,animationDuration:o.animationDuration,theme:o.theme,useCanvas:o.useCanvas,onClick:o.onClick,onMouseOver:o.onMouseOver,onMouseOut:o.onMouseOut,zoomBrush:o.zoomBrush,children:[e.jsx(B,{x:o.x,ys:[o.y,o.y2],stacked:o.stacked}),e.jsx(S,{x:o.x,ys:[o.y,o.y2],grouped:o.grouped,stacked:o.stacked}),e.jsx(s,{x:o.x,y:o.y2,color:"steelblue"}),e.jsx(h,{fields:[o.y,o.y2,o.y3,o.y4],aggregate:o.stacked,showGridlines:!1}),e.jsx(g,{fields:[o.x],showGridlines:!1,scaleType:"band"})]}),t=P.bind({});t.storyName="Mixed Continuous Plots";t.args={useCanvas:!1,width:800,height:500,animationDuration:500,color:"#99C1DC",theme:"light",leftMargin:70,rightMargin:40,topMargin:40,bottomMargin:40,y:"sin",y2:"cos",x:"x"};const a=L.bind({});a.storyName="Mixing Continuous Plots with a Band scale";a.args={...t.args};const r=T.bind({});r.storyName="Mixing Discrete Plots using a Linear Scale";r.args={useCanvas:!1,width:800,height:500,animationDuration:500,color:"#99C1DC",theme:"light",leftMargin:70,rightMargin:40,topMargin:40,bottomMargin:40,y:"sin",y2:"cos",x:"x"};const i=N.bind({});i.storyName="Groupled Column & Scatter";i.args={useCanvas:!1,width:800,height:500,animationDuration:500,color:"#99C1DC",theme:"light",leftMargin:70,rightMargin:40,topMargin:40,bottomMargin:40,y:"sin",y2:"cos",x:"x",grouped:!0,stacked:!1};var d,x,c;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`args => <XYChart data={waves} plotMargin={{
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
  </XYChart>`,...(c=(x=t.parameters)==null?void 0:x.docs)==null?void 0:c.source}}};var p,M,y;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`args => <XYChart data={waves} plotMargin={{
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
  </XYChart>`,...(y=(M=a.parameters)==null?void 0:M.docs)==null?void 0:y.source}}};var f,C,v;r.parameters={...r.parameters,docs:{...(f=r.parameters)==null?void 0:f.docs,source:{originalSource:`args => <XYChart data={waves} plotMargin={{
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
  </XYChart>`,...(O=(b=i.parameters)==null?void 0:b.docs)==null?void 0:O.source}}};const ko=["MixedLineAreaScatter","MixedScaleBand","MixedColumnPlotsLinear","MixedGroupedColumnPlots"];export{r as MixedColumnPlotsLinear,i as MixedGroupedColumnPlots,t as MixedLineAreaScatter,a as MixedScaleBand,ko as __namedExportsOrder,Oo as default};
//# sourceMappingURL=MixedPlot.stories-DeaY5V-2.js.map
