import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{a as j}from"./argTypes-DuN6ki1s.js";import{w as l}from"./waves-BDt9gctZ.js";import"./index-SUJzco65.js";import{X as m}from"./index-B3xvD3KM.js";import{a as u}from"./Lines-CTewFJaC.js";import{a as D,A as B}from"./Areas-Bs_w_X2y.js";import{S as s}from"./Scatters-CjVkOVqA.js";import{Y as h}from"./YAxis-Di6E_Z0O.js";import{X as g}from"./XAxis-DPoLBJUO.js";import{a as k,C as S}from"./Columns-BkWdU0h9.js";import"./index-DpTt3J-R.js";import"./index-lEWDzjaj.js";import"./react-redux-D2XHiCFH.js";import"./index-Cmxt2A0f.js";import"./defaultLocale-D2nGpDRe.js";import"./index-BLkjqt2D.js";import"./defaultLocale-YZNTexTf.js";import"./index-D2Yg9nHg.js";import"./index-CormuWgM.js";import"./index-B83mH7RW.js";import"./index--IH0qLMi.js";import"./Legend-BfppGThJ.js";import"./index-DSanPm5k.js";import"./index-BmYvQTbQ.js";import"./Circle-Qf3Tu8hN.js";import"./Line-BjKan0E4.js";import"./Square-CZVurtTs.js";import"./index-DCrWobO-.js";import"./index-Dm9U4OvN.js";import"./index-D9WwHXYw.js";import"./Tooltip-DKHk2rGT.js";import"./index-Dnwqjl04.js";import"./TooltipItem-DpodgMXu.js";import"./index-idqV8wj_.js";import"./index-C_9ZH6Qa.js";import"./index-nsWK1wQc.js";import"./interpolateMultiPath-HMcFf6tI.js";import"./array-2GBN5xbU.js";import"./ensureNoScaleOverflow-_ke7A8wI.js";import"./renderCanvas-DfhBB9Lh.js";import"./getParentKey-CJpMRI3M.js";const{width:G,height:A,margin:n,useCanvas:X,theme:z,color:Y}=j,Bo={title:"XYCharts/MixedPlots",component:u,parameters:{docs:{transformSource:o=>(o=o.replace(/data={\[.*?\]}/gs,"data={[ ...dataset ]}"),o=o.replaceAll(/undefined,?/g,""),o=o.replace(/^\s*\n/gm,""),o)},chromatic:{delay:300}},argTypes:{useCanvas:X,width:G,height:A,theme:z,color:Y,leftMargin:n,rightMargin:n,topMargin:n,bottomMargin:n,onClick:{action:"clicked"},onMouseOver:{action:"onMouseOver"},onMouseOut:{action:"onMouseOut"}}},P=o=>e.jsxs(m,{data:l,plotMargin:{left:o.leftMargin,right:o.rightMargin,top:o.topMargin,bottom:o.bottomMargin},width:o.width,height:o.height,animationDuration:o.animationDuration,theme:o.theme,useCanvas:o.useCanvas,onClick:o.onClick,onMouseOver:o.onMouseOver,onMouseOut:o.onMouseOut,zoomBrush:o.zoomBrush,children:[e.jsx(D,{x:o.x,y:o.y2}),e.jsx(u,{x:o.x,y:o.y,color:"steelblue"}),e.jsx(s,{x:o.x,y:o.y,color:"steelblue"}),e.jsx(h,{fields:[o.y,o.y2],showGridlines:!1}),e.jsx(g,{fields:[o.x],showGridlines:!1})]}),L=o=>e.jsxs(m,{data:l,plotMargin:{left:o.leftMargin,right:o.rightMargin,top:o.topMargin,bottom:o.bottomMargin},width:o.width,height:o.height,animationDuration:o.animationDuration,theme:o.theme,useCanvas:o.useCanvas,onClick:o.onClick,onMouseOver:o.onMouseOver,onMouseOut:o.onMouseOut,zoomBrush:o.zoomBrush,children:[e.jsx(k,{x:o.x,y:o.y2,color:"orange"}),e.jsx(u,{x:o.x,y:o.y,color:"steelblue"}),e.jsx(s,{x:o.x,y:o.y,color:"steelblue"}),e.jsx(s,{x:o.x,y:o.y2,color:"orange"}),e.jsx(h,{fields:[o.y,o.y2],showGridlines:!1}),e.jsx(g,{fields:[o.x],scaleType:"band",showGridlines:!1})]}),T=o=>e.jsxs(m,{data:l,plotMargin:{left:o.leftMargin,right:o.rightMargin,top:o.topMargin,bottom:o.bottomMargin},width:o.width,height:o.height,animationDuration:o.animationDuration,theme:o.theme,useCanvas:o.useCanvas,onClick:o.onClick,onMouseOver:o.onMouseOver,onMouseOut:o.onMouseOut,zoomBrush:o.zoomBrush,children:[e.jsx(k,{x:o.x,y:o.y,color:"orange"}),e.jsx(u,{x:o.x,y:o.y2,color:"steelblue"}),e.jsx(s,{x:o.x,y:o.y,color:"orange"}),e.jsx(s,{x:o.x,y:o.y2,color:"steelblue"}),e.jsx(h,{fields:[o.y,o.y2],showGridlines:!1}),e.jsx(g,{fields:o.x,showGridlines:!1})]}),N=o=>e.jsxs(m,{data:l,plotMargin:{left:o.leftMargin,right:o.rightMargin,top:o.topMargin,bottom:o.bottomMargin},width:o.width,height:o.height,animationDuration:o.animationDuration,theme:o.theme,useCanvas:o.useCanvas,onClick:o.onClick,onMouseOver:o.onMouseOver,onMouseOut:o.onMouseOut,zoomBrush:o.zoomBrush,children:[e.jsx(B,{x:o.x,ys:[o.y,o.y2],stacked:o.stacked}),e.jsx(S,{x:o.x,ys:[o.y,o.y2],grouped:o.grouped,stacked:o.stacked}),e.jsx(s,{x:o.x,y:o.y2,color:"steelblue"}),e.jsx(h,{fields:[o.y,o.y2,o.y3,o.y4],aggregate:o.stacked,showGridlines:!1}),e.jsx(g,{fields:[o.x],showGridlines:!1,scaleType:"band"})]}),t=P.bind({});t.storyName="Mixed Continuous Plots";t.args={useCanvas:!1,width:800,height:500,animationDuration:500,color:"#99C1DC",theme:"light",leftMargin:70,rightMargin:40,topMargin:40,bottomMargin:40,y:"sin",y2:"cos",x:"x"};const a=L.bind({});a.storyName="Mixing Continuous Plots with a Band scale";a.args={...t.args};const r=T.bind({});r.storyName="Mixing Discrete Plots using a Linear Scale";r.args={useCanvas:!1,width:800,height:500,animationDuration:500,color:"#99C1DC",theme:"light",leftMargin:70,rightMargin:40,topMargin:40,bottomMargin:40,y:"sin",y2:"cos",x:"x"};const i=N.bind({});i.storyName="Groupled Column & Scatter";i.args={useCanvas:!1,width:800,height:500,animationDuration:500,color:"#99C1DC",theme:"light",leftMargin:70,rightMargin:40,topMargin:40,bottomMargin:40,y:"sin",y2:"cos",x:"x",grouped:!0,stacked:!1};var d,x,c;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`args => <XYChart data={waves} plotMargin={{
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
  </XYChart>`,...(O=(b=i.parameters)==null?void 0:b.docs)==null?void 0:O.source}}};const So=["MixedLineAreaScatter","MixedScaleBand","MixedColumnPlotsLinear","MixedGroupedColumnPlots"];export{r as MixedColumnPlotsLinear,i as MixedGroupedColumnPlots,t as MixedLineAreaScatter,a as MixedScaleBand,So as __namedExportsOrder,Bo as default};
//# sourceMappingURL=MixedPlot.stories-Bt_KMYqp.js.map
