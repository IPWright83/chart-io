import{j as e}from"./jsx-runtime-DEdD30eg.js";import{a as j}from"./argTypes-bxm3gCeR.js";import{w as l}from"./waves-BDt9gctZ.js";import"./index-Bcnion2k.js";import{X as m}from"./index-CdkoYB7w.js";import{a as u}from"./Lines-PAT6BPU_.js";import{a as D,A as B}from"./Areas-B3IBuDft.js";import{S as s}from"./Scatters-CPmcphPq.js";import{Y as h}from"./YAxis-DuDb07NW.js";import{X as g}from"./XAxis-B_MFapNx.js";import{a as k,C as S}from"./Columns-DvhU7O36.js";import"./index-RYns6xqu.js";import"./index-DBRTqYFH.js";import"./index-b9bwP9Bh.js";import"./index-sbqOYYIm.js";import"./index-COLyWrXh.js";import"./defaultLocale-D2nGpDRe.js";import"./useStore-DWdQsrPN.js";import"./index-CXvrs8Eg.js";import"./defaultLocale-C7xJETwF.js";import"./index-ASiZ4-uZ.js";import"./index-BZ_hkuv1.js";import"./index-9Z0J-FDy.js";import"./index-BPZQwoq3.js";import"./Legend-DEyrexXZ.js";import"./index-DhwMs0bd.js";import"./index-CW0FTg2B.js";import"./Circle-CWMyz_tz.js";import"./Line-B_2MgdvN.js";import"./Square-CektPBZh.js";import"./index-CKF-7MCu.js";import"./index-DQ1aKZo6.js";import"./index-CLSe-My4.js";import"./Tooltip-GS-CvhnY.js";import"./index-hvi0fNyA.js";import"./TooltipItem-D1zhnsxI.js";import"./index-BQ4jfyHA.js";import"./index-D888O4bb.js";import"./index-B2undoSo.js";import"./interpolateMultiPath-8xM18Eij.js";import"./array-2GBN5xbU.js";import"./ensureNoScaleOverflow-li5UC7Oh.js";import"./renderCanvas-BCjHZwb6.js";import"./getParentKey-CcCYm4V6.js";const{width:G,height:A,margin:n,useCanvas:X,theme:z,color:Y}=j,Go={title:"XYCharts/MixedPlots",component:u,parameters:{docs:{transformSource:o=>(o=o.replace(/data={\[.*?\]}/gs,"data={[ ...dataset ]}"),o=o.replaceAll(/undefined,?/g,""),o=o.replace(/^\s*\n/gm,""),o)},chromatic:{delay:300}},argTypes:{useCanvas:X,width:G,height:A,theme:z,color:Y,leftMargin:n,rightMargin:n,topMargin:n,bottomMargin:n,onClick:{action:"clicked"},onMouseOver:{action:"onMouseOver"},onMouseOut:{action:"onMouseOut"}}},P=o=>e.jsxs(m,{data:l,plotMargin:{left:o.leftMargin,right:o.rightMargin,top:o.topMargin,bottom:o.bottomMargin},width:o.width,height:o.height,animationDuration:o.animationDuration,theme:o.theme,useCanvas:o.useCanvas,onClick:o.onClick,onMouseOver:o.onMouseOver,onMouseOut:o.onMouseOut,zoomBrush:o.zoomBrush,children:[e.jsx(D,{x:o.x,y:o.y2}),e.jsx(u,{x:o.x,y:o.y,color:"steelblue"}),e.jsx(s,{x:o.x,y:o.y,color:"steelblue"}),e.jsx(h,{fields:[o.y,o.y2],showGridlines:!1}),e.jsx(g,{fields:[o.x],showGridlines:!1})]}),L=o=>e.jsxs(m,{data:l,plotMargin:{left:o.leftMargin,right:o.rightMargin,top:o.topMargin,bottom:o.bottomMargin},width:o.width,height:o.height,animationDuration:o.animationDuration,theme:o.theme,useCanvas:o.useCanvas,onClick:o.onClick,onMouseOver:o.onMouseOver,onMouseOut:o.onMouseOut,zoomBrush:o.zoomBrush,children:[e.jsx(k,{x:o.x,y:o.y2,color:"orange"}),e.jsx(u,{x:o.x,y:o.y,color:"steelblue"}),e.jsx(s,{x:o.x,y:o.y,color:"steelblue"}),e.jsx(s,{x:o.x,y:o.y2,color:"orange"}),e.jsx(h,{fields:[o.y,o.y2],showGridlines:!1}),e.jsx(g,{fields:[o.x],scaleType:"band",showGridlines:!1})]}),T=o=>e.jsxs(m,{data:l,plotMargin:{left:o.leftMargin,right:o.rightMargin,top:o.topMargin,bottom:o.bottomMargin},width:o.width,height:o.height,animationDuration:o.animationDuration,theme:o.theme,useCanvas:o.useCanvas,onClick:o.onClick,onMouseOver:o.onMouseOver,onMouseOut:o.onMouseOut,zoomBrush:o.zoomBrush,children:[e.jsx(k,{x:o.x,y:o.y,color:"orange"}),e.jsx(u,{x:o.x,y:o.y2,color:"steelblue"}),e.jsx(s,{x:o.x,y:o.y,color:"orange"}),e.jsx(s,{x:o.x,y:o.y2,color:"steelblue"}),e.jsx(h,{fields:[o.y,o.y2],showGridlines:!1}),e.jsx(g,{fields:o.x,showGridlines:!1})]}),N=o=>e.jsxs(m,{data:l,plotMargin:{left:o.leftMargin,right:o.rightMargin,top:o.topMargin,bottom:o.bottomMargin},width:o.width,height:o.height,animationDuration:o.animationDuration,theme:o.theme,useCanvas:o.useCanvas,onClick:o.onClick,onMouseOver:o.onMouseOver,onMouseOut:o.onMouseOut,zoomBrush:o.zoomBrush,children:[e.jsx(B,{x:o.x,ys:[o.y,o.y2],stacked:o.stacked}),e.jsx(S,{x:o.x,ys:[o.y,o.y2],grouped:o.grouped,stacked:o.stacked}),e.jsx(s,{x:o.x,y:o.y2,color:"steelblue"}),e.jsx(h,{fields:[o.y,o.y2,o.y3,o.y4],aggregate:o.stacked,showGridlines:!1}),e.jsx(g,{fields:[o.x],showGridlines:!1,scaleType:"band"})]}),t=P.bind({});t.storyName="Mixed Continuous Plots";t.args={useCanvas:!1,width:800,height:500,animationDuration:500,color:"#99C1DC",theme:"light",leftMargin:70,rightMargin:40,topMargin:40,bottomMargin:40,y:"sin",y2:"cos",x:"x"};const a=L.bind({});a.storyName="Mixing Continuous Plots with a Band scale";a.args={...t.args};const r=T.bind({});r.storyName="Mixing Discrete Plots using a Linear Scale";r.args={useCanvas:!1,width:800,height:500,animationDuration:500,color:"#99C1DC",theme:"light",leftMargin:70,rightMargin:40,topMargin:40,bottomMargin:40,y:"sin",y2:"cos",x:"x"};const i=N.bind({});i.storyName="Groupled Column & Scatter";i.args={useCanvas:!1,width:800,height:500,animationDuration:500,color:"#99C1DC",theme:"light",leftMargin:70,rightMargin:40,topMargin:40,bottomMargin:40,y:"sin",y2:"cos",x:"x",grouped:!0,stacked:!1};var d,x,c;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`args => <XYChart data={waves} plotMargin={{
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
//# sourceMappingURL=MixedPlot.stories-DFrOOfjX.js.map
