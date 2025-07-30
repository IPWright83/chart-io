import{j as e}from"./jsx-runtime-CB_V9I5Y.js";import{a as j}from"./argTypes-DuN6ki1s.js";import{w as l}from"./waves-BDt9gctZ.js";import"./index-MSSoR4im.js";import{X as m}from"./index-DWjDrBH7.js";import{a as u}from"./Lines-C5HE8H6Y.js";import{a as D,A as B}from"./Areas-C0BRo5lG.js";import{S as s}from"./Scatters-BJwZW5dN.js";import{Y as h}from"./YAxis-DVfVxPRN.js";import{X as g}from"./XAxis-NdVBz2bD.js";import{a as k,C as S}from"./Columns-7YBzAFul.js";import"./index-CTjT7uj6.js";import"./index-ChfY_KWg.js";import"./index-D1OPLCpq.js";import"./index-Cywu29Xx.js";import"./index-DyxbUYfF.js";import"./defaultLocale-D2nGpDRe.js";import"./useStore-D42TxdHf.js";import"./index-Bs4_CWqv.js";import"./defaultLocale-YZNTexTf.js";import"./index-C73EMPtE.js";import"./index-BNKFbkco.js";import"./index-D8HK0Iw4.js";import"./index-BcuBy6DH.js";import"./Legend-DQ2LjqGu.js";import"./index-COgl75ap.js";import"./index-BQDzJjLo.js";import"./Circle-D2bUPI43.js";import"./Line-cv_TynKV.js";import"./Square-DM8ZByYb.js";import"./index-CD7MXqKa.js";import"./index-BOxme2CB.js";import"./index-Cn1GUACH.js";import"./Tooltip-BNhJ7WJH.js";import"./index-BK_JY7l-.js";import"./TooltipItem-Ds3NZ-zA.js";import"./index-e8nDjrQd.js";import"./index-DomMj_LS.js";import"./index-DqBBfSd8.js";import"./interpolateMultiPath-CX2TmtXQ.js";import"./array-2GBN5xbU.js";import"./ensureNoScaleOverflow-BVrwbjHS.js";import"./renderCanvas-B3vh6D0b.js";import"./getParentKey-Dt0KjBfq.js";const{width:G,height:A,margin:n,useCanvas:X,theme:z,color:Y}=j,Go={title:"XYCharts/MixedPlots",component:u,parameters:{docs:{transformSource:o=>(o=o.replace(/data={\[.*?\]}/gs,"data={[ ...dataset ]}"),o=o.replaceAll(/undefined,?/g,""),o=o.replace(/^\s*\n/gm,""),o)},chromatic:{delay:300}},argTypes:{useCanvas:X,width:G,height:A,theme:z,color:Y,leftMargin:n,rightMargin:n,topMargin:n,bottomMargin:n,onClick:{action:"clicked"},onMouseOver:{action:"onMouseOver"},onMouseOut:{action:"onMouseOut"}}},P=o=>e.jsxs(m,{data:l,plotMargin:{left:o.leftMargin,right:o.rightMargin,top:o.topMargin,bottom:o.bottomMargin},width:o.width,height:o.height,animationDuration:o.animationDuration,theme:o.theme,useCanvas:o.useCanvas,onClick:o.onClick,onMouseOver:o.onMouseOver,onMouseOut:o.onMouseOut,zoomBrush:o.zoomBrush,children:[e.jsx(D,{x:o.x,y:o.y2}),e.jsx(u,{x:o.x,y:o.y,color:"steelblue"}),e.jsx(s,{x:o.x,y:o.y,color:"steelblue"}),e.jsx(h,{fields:[o.y,o.y2],showGridlines:!1}),e.jsx(g,{fields:[o.x],showGridlines:!1})]}),L=o=>e.jsxs(m,{data:l,plotMargin:{left:o.leftMargin,right:o.rightMargin,top:o.topMargin,bottom:o.bottomMargin},width:o.width,height:o.height,animationDuration:o.animationDuration,theme:o.theme,useCanvas:o.useCanvas,onClick:o.onClick,onMouseOver:o.onMouseOver,onMouseOut:o.onMouseOut,zoomBrush:o.zoomBrush,children:[e.jsx(k,{x:o.x,y:o.y2,color:"orange"}),e.jsx(u,{x:o.x,y:o.y,color:"steelblue"}),e.jsx(s,{x:o.x,y:o.y,color:"steelblue"}),e.jsx(s,{x:o.x,y:o.y2,color:"orange"}),e.jsx(h,{fields:[o.y,o.y2],showGridlines:!1}),e.jsx(g,{fields:[o.x],scaleType:"band",showGridlines:!1})]}),T=o=>e.jsxs(m,{data:l,plotMargin:{left:o.leftMargin,right:o.rightMargin,top:o.topMargin,bottom:o.bottomMargin},width:o.width,height:o.height,animationDuration:o.animationDuration,theme:o.theme,useCanvas:o.useCanvas,onClick:o.onClick,onMouseOver:o.onMouseOver,onMouseOut:o.onMouseOut,zoomBrush:o.zoomBrush,children:[e.jsx(k,{x:o.x,y:o.y,color:"orange"}),e.jsx(u,{x:o.x,y:o.y2,color:"steelblue"}),e.jsx(s,{x:o.x,y:o.y,color:"orange"}),e.jsx(s,{x:o.x,y:o.y2,color:"steelblue"}),e.jsx(h,{fields:[o.y,o.y2],showGridlines:!1}),e.jsx(g,{fields:o.x,showGridlines:!1})]}),N=o=>e.jsxs(m,{data:l,plotMargin:{left:o.leftMargin,right:o.rightMargin,top:o.topMargin,bottom:o.bottomMargin},width:o.width,height:o.height,animationDuration:o.animationDuration,theme:o.theme,useCanvas:o.useCanvas,onClick:o.onClick,onMouseOver:o.onMouseOver,onMouseOut:o.onMouseOut,zoomBrush:o.zoomBrush,children:[e.jsx(B,{x:o.x,ys:[o.y,o.y2],stacked:o.stacked}),e.jsx(S,{x:o.x,ys:[o.y,o.y2],grouped:o.grouped,stacked:o.stacked}),e.jsx(s,{x:o.x,y:o.y2,color:"steelblue"}),e.jsx(h,{fields:[o.y,o.y2,o.y3,o.y4],aggregate:o.stacked,showGridlines:!1}),e.jsx(g,{fields:[o.x],showGridlines:!1,scaleType:"band"})]}),t=P.bind({});t.storyName="Mixed Continuous Plots";t.args={useCanvas:!1,width:800,height:500,animationDuration:500,color:"#99C1DC",theme:"light",leftMargin:70,rightMargin:40,topMargin:40,bottomMargin:40,y:"sin",y2:"cos",x:"x"};const a=L.bind({});a.storyName="Mixing Continuous Plots with a Band scale";a.args={...t.args};const r=T.bind({});r.storyName="Mixing Discrete Plots using a Linear Scale";r.args={useCanvas:!1,width:800,height:500,animationDuration:500,color:"#99C1DC",theme:"light",leftMargin:70,rightMargin:40,topMargin:40,bottomMargin:40,y:"sin",y2:"cos",x:"x"};const i=N.bind({});i.storyName="Groupled Column & Scatter";i.args={useCanvas:!1,width:800,height:500,animationDuration:500,color:"#99C1DC",theme:"light",leftMargin:70,rightMargin:40,topMargin:40,bottomMargin:40,y:"sin",y2:"cos",x:"x",grouped:!0,stacked:!1};var d,x,c;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`args => <XYChart data={waves} plotMargin={{
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
  </XYChart>`,...(O=(b=i.parameters)==null?void 0:b.docs)==null?void 0:O.source}}};const Ao=["MixedLineAreaScatter","MixedScaleBand","MixedColumnPlotsLinear","MixedGroupedColumnPlots"];export{r as MixedColumnPlotsLinear,i as MixedGroupedColumnPlots,t as MixedLineAreaScatter,a as MixedScaleBand,Ao as __namedExportsOrder,Go as default};
//# sourceMappingURL=MixedPlot.stories-BGruP_bG.js.map
