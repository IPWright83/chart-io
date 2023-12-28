import{j as o}from"./jsx-runtime-vNq4Oc-g.js";import"./index-CnLlP05v.js";import{a as H}from"./argTypes-85zPIrV9.js";import{e as I}from"./example_dataset-9KkeoQ7M.js";import"./index-ibNuBTkY.js";import{X as x}from"./index-H7nlrqdg.js";import{a as y}from"./Lines-zns-_vZ9.js";import{a as w}from"./Areas-FRBGw0vI.js";import{S as M}from"./Scatters-UnyHYjD2.js";import{Y as f}from"./YAxis-EYrVkw1t.js";import{X as C}from"./XAxis-r21t602H.js";import{a as O,C as J}from"./Columns-GXlf9bAA.js";import{a as _}from"./defaultLocale-RGkPOkAo.js";import{u as E}from"./index-7Eg7ybPU.js";import"./index-4g5l5LRQ.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./index-jmm5gWkb.js";import"./index-A_rqIulo.js";import"./index-CTVlSsFV.js";import"./Provider--AC3n3ro.js";import"./index-3lT3xPrt.js";import"./index-rbFQVUQr.js";import"./useStore-5GkWK8oz.js";import"./index-gu_448hd.js";import"./Legend-AepxjzR_.js";import"./index-qFq04NJk.js";import"./index-RAAq-Dtz.js";import"./Circle-2MkuDq74.js";import"./Line-cari06pN.js";import"./Square-_dp0HJFb.js";import"./index-N5QiI7wA.js";import"./index-ibvSOphJ.js";import"./index-0hCrwOlf.js";import"./Tooltip-CF66P4Pc.js";import"./index-W-Z_0x6I.js";import"./TooltipItem-SVu_bEZv.js";import"./defaultLocale-4fp4Qluw.js";import"./index-rmVHmJse.js";import"./index-K4Hn1GGT.js";import"./index-dosLtsPy.js";import"./index-fcJ2LOVC.js";import"./interpolateMultiPath-fX-sCjeh.js";import"./array-5Vj4K6aY.js";import"./ensureNoScaleOverflow-0H3eBhJa.js";import"./renderCanvas-mvVrqX_A.js";import"./getParentKey-EyapHLH0.js";function R(e,n){let r,i;if(n===void 0)for(const t of e)t!=null&&(r===void 0?t>=t&&(r=i=t):(r>t&&(r=t),i<t&&(i=t)));else{let t=-1;for(let a of e)(a=n(a,++t,e))!=null&&(r===void 0?a>=a&&(r=i=a):(r>a&&(r=a),i<a&&(i=a)))}return[r,i]}const{width:K,height:Q,margin:b,useCanvas:W,theme:Z,color:$}=H,We={title:"XYCharts/MixedPlots",component:y,parameters:{docs:{transformSource:e=>(e=e.replace(/data={\[.*?\]}/gs,"data={[ ...dataset ]}"),e=e.replaceAll(/undefined,?/g,""),e=e.replace(/^\s*\n/gm,""),e)},chromatic:{delay:300}},argTypes:{useCanvas:W,width:K,height:Q,theme:Z,color:$,leftMargin:b,rightMargin:b,topMargin:b,bottomMargin:b,onClick:{action:"clicked"},onMouseOver:{action:"onMouseOver"},onMouseOut:{action:"onMouseOut"}}},ee=e=>{const n="Month",r=e.filter(t=>["Aperture","Black Mesa"].includes(t.Owner)).reduce((t,a)=>{const p=t[a[n]]||{};for(let s in a)typeof a[s]=="number"?(p[s]=p[s]||0,p[s]+=a[s]):p[s]=a[s];return t[a[n]]=p,t},{});return Object.keys(r).flatMap(t=>({[n]:new Date(t),...r[t]}))},u=ee(I),oe=e=>o.jsxs(x,{data:u,plotMargin:{left:e.leftMargin,right:e.rightMargin,top:e.topMargin,bottom:e.bottomMargin},width:e.width,height:e.height,animationDuration:e.animationDuration,theme:e.theme,useCanvas:e.useCanvas,onClick:e.onClick,onMouseOver:e.onMouseOver,onMouseOut:e.onMouseOut,zoomBrush:e.zoomBrush,children:[o.jsx(y,{x:e.x,y:e.y,color:"steelblue"}),o.jsx(w,{x:e.x,y:e.y4,color:"green"}),o.jsx(M,{x:e.x,y:e.y3,color:"purple"}),o.jsx(f,{fields:[e.y,e.y2,e.y3,e.y4],showGridlines:!1}),o.jsx(C,{fields:[e.x],showGridlines:!1})]}),te=e=>o.jsxs(x,{data:u,plotMargin:{left:e.leftMargin,right:e.rightMargin,top:e.topMargin,bottom:e.bottomMargin},width:e.width,height:e.height,animationDuration:e.animationDuration,theme:e.theme,useCanvas:e.useCanvas,onClick:e.onClick,onMouseOver:e.onMouseOver,onMouseOut:e.onMouseOut,zoomBrush:e.zoomBrush,children:[o.jsx(O,{x:e.x,y:e.y2,color:"orange"}),o.jsx(y,{x:e.x,y:e.y,color:"steelblue"}),o.jsx(w,{x:e.x,y:e.y4,color:"green"}),o.jsx(M,{x:e.x,y:e.y3,color:"purple"}),o.jsx(f,{fields:[e.y,e.y2,e.y3,e.y4],showGridlines:!1}),o.jsx(C,{fields:[e.x],scaleType:"band",showGridlines:!1})]}),re=e=>o.jsxs(x,{data:u,plotMargin:{left:e.leftMargin,right:e.rightMargin,top:e.topMargin,bottom:e.bottomMargin},width:e.width,height:e.height,animationDuration:e.animationDuration,theme:e.theme,useCanvas:e.useCanvas,onClick:e.onClick,onMouseOver:e.onMouseOver,onMouseOut:e.onMouseOut,zoomBrush:e.zoomBrush,children:[o.jsx(O,{x:e.x,y:e.y2,color:"orange"}),o.jsx(y,{x:e.x,y:e.y,color:"steelblue"}),o.jsx(w,{x:e.x,y:e.y4,color:"green"}),o.jsx(M,{x:e.x,y:e.y3,color:"purple"}),o.jsx(f,{fields:[e.y,e.y2,e.y3,e.y4],showGridlines:!1}),o.jsx(C,{fields:e.x,showGridlines:!1})]}),ae=e=>o.jsxs(x,{data:u,plotMargin:{left:e.leftMargin,right:e.rightMargin,top:e.topMargin,bottom:e.bottomMargin},width:e.width,height:e.height,animationDuration:e.animationDuration,theme:e.theme,useCanvas:e.useCanvas,onClick:e.onClick,onMouseOver:e.onMouseOver,onMouseOut:e.onMouseOut,zoomBrush:e.zoomBrush,children:[o.jsx(O,{x:e.x,y:e.y2,color:"orange"}),o.jsx(y,{x:e.x,y:e.y,color:"steelblue"}),o.jsx(w,{x:e.x,y:e.y4,color:"green"}),o.jsx(M,{x:e.x,y:e.y3,color:"purple"}),o.jsx(f,{fields:[e.y,e.y2,e.y3,e.y4],showGridlines:!1}),o.jsx(C,{fields:e.x,scaleType:"band",showGridlines:!1,tickFormat:(n,r)=>r%3!==0?null:_("%b")(n),tickValues:E(...R(u.map(n=>n[e.x])))})]}),q=e=>o.jsxs(x,{data:u,plotMargin:{left:e.leftMargin,right:e.rightMargin,top:e.topMargin,bottom:e.bottomMargin},width:e.width,height:e.height,animationDuration:e.animationDuration,theme:e.theme,useCanvas:e.useCanvas,onClick:e.onClick,onMouseOver:e.onMouseOver,onMouseOut:e.onMouseOut,zoomBrush:e.zoomBrush,children:[o.jsx(J,{x:e.x,ys:[e.y,e.y4,e.y2],grouped:e.grouped,stacked:e.stacked}),o.jsx(M,{x:e.x,y:e.y3,color:"purple"}),o.jsx(f,{fields:[e.y,e.y2,e.y3,e.y4],aggregate:e.stacked,showGridlines:!1}),o.jsx(C,{fields:[e.x],showGridlines:!1,scaleType:"band",tickFormat:(n,r)=>r%3!==0?null:_("%b")(n),tickValues:E(...R(u.map(n=>n[e.x])))})]}),l=oe.bind({});l.storyName="Mixed Continuous Plots";l.args={useCanvas:!1,width:800,height:500,animationDuration:500,color:"#99C1DC",theme:"light",leftMargin:70,rightMargin:40,topMargin:40,bottomMargin:40,y:"Gross Profit",y2:"Sales Value",y3:"Operating Profit",y4:"Unit Sales",x:"Month"};const m=te.bind({});m.storyName="Mixing Continuous Plots with a Band scale";m.args={...l.args};const g=re.bind({});g.storyName="Column, Line, Area & Scatter using a Linear Scale";g.args={useCanvas:!1,width:800,height:500,animationDuration:500,color:"#99C1DC",theme:"light",leftMargin:70,rightMargin:40,topMargin:40,bottomMargin:40,y:"Gross Profit",y2:"Sales Value",y3:"Operating Profit",y4:"Unit Sales",x:"Month"};const h=ae.bind({});h.storyName="Column, Line, Area & Scatter";h.args={useCanvas:!1,width:800,height:500,animationDuration:500,color:"#99C1DC",theme:"light",leftMargin:70,rightMargin:40,topMargin:40,bottomMargin:40,y:"Gross Profit",y2:"Sales Value",y3:"Operating Profit",y4:"Unit Sales",x:"Month"};const d=q.bind({});d.storyName="Groupled Column & Scatter";d.args={useCanvas:!1,width:800,height:500,animationDuration:500,color:"#99C1DC",theme:"light",leftMargin:70,rightMargin:40,topMargin:40,bottomMargin:40,y:"Gross Profit",y2:"Sales Value",y3:"Operating Profit",y4:"Unit Sales",x:"Month",grouped:!0,stacked:!1};const c=q.bind({});c.storyName="Stacked Column & Scatter";c.args={useCanvas:!1,width:800,height:500,animationDuration:500,color:"#99C1DC",theme:"light",leftMargin:70,rightMargin:40,topMargin:40,bottomMargin:40,y:"Gross Profit",y2:"Sales Value",y3:"Operating Profit",y4:"Unit Sales",x:"Month",grouped:!1,stacked:!0};var v,k,S;l.parameters={...l.parameters,docs:{...(v=l.parameters)==null?void 0:v.docs,source:{originalSource:`args => <XYChart data={data} plotMargin={{
  left: args.leftMargin,
  right: args.rightMargin,
  top: args.topMargin,
  bottom: args.bottomMargin
}} width={args.width} height={args.height} animationDuration={args.animationDuration} theme={args.theme} useCanvas={args.useCanvas} onClick={args.onClick} onMouseOver={args.onMouseOver} onMouseOut={args.onMouseOut} zoomBrush={args.zoomBrush}>
        <Line x={args.x} y={args.y} color="steelblue" />
        <Area x={args.x} y={args.y4} color="green" />
        <Scatter x={args.x} y={args.y3} color="purple" />
        <YAxis fields={[args.y, args.y2, args.y3, args.y4]} showGridlines={false} />
        <XAxis fields={[args.x]} showGridlines={false} />
    </XYChart>`,...(S=(k=l.parameters)==null?void 0:k.docs)==null?void 0:S.source}}};var j,D,G;m.parameters={...m.parameters,docs:{...(j=m.parameters)==null?void 0:j.docs,source:{originalSource:`args => <XYChart data={data} plotMargin={{
  left: args.leftMargin,
  right: args.rightMargin,
  top: args.topMargin,
  bottom: args.bottomMargin
}} width={args.width} height={args.height} animationDuration={args.animationDuration} theme={args.theme} useCanvas={args.useCanvas} onClick={args.onClick} onMouseOver={args.onMouseOver} onMouseOut={args.onMouseOut} zoomBrush={args.zoomBrush}>
        <Column x={args.x} y={args.y2} color="orange" />
        <Line x={args.x} y={args.y} color="steelblue" />
        <Area x={args.x} y={args.y4} color="green" />
        <Scatter x={args.x} y={args.y3} color="purple" />
        <YAxis fields={[args.y, args.y2, args.y3, args.y4]} showGridlines={false} />
        <XAxis fields={[args.x]} scaleType="band" showGridlines={false} />
    </XYChart>`,...(G=(D=m.parameters)==null?void 0:D.docs)==null?void 0:G.source}}};var B,A,P;g.parameters={...g.parameters,docs:{...(B=g.parameters)==null?void 0:B.docs,source:{originalSource:`args => <XYChart data={data} plotMargin={{
  left: args.leftMargin,
  right: args.rightMargin,
  top: args.topMargin,
  bottom: args.bottomMargin
}} width={args.width} height={args.height} animationDuration={args.animationDuration} theme={args.theme} useCanvas={args.useCanvas} onClick={args.onClick} onMouseOver={args.onMouseOver} onMouseOut={args.onMouseOut} zoomBrush={args.zoomBrush}>
        <Column x={args.x} y={args.y2} color="orange" />
        <Line x={args.x} y={args.y} color="steelblue" />
        <Area x={args.x} y={args.y4} color="green" />
        <Scatter x={args.x} y={args.y3} color="purple" />
        <YAxis fields={[args.y, args.y2, args.y3, args.y4]} showGridlines={false} />
        <XAxis fields={args.x} showGridlines={false} />
    </XYChart>`,...(P=(A=g.parameters)==null?void 0:A.docs)==null?void 0:P.source}}};var X,z,Y;h.parameters={...h.parameters,docs:{...(X=h.parameters)==null?void 0:X.docs,source:{originalSource:`args => <XYChart data={data} plotMargin={{
  left: args.leftMargin,
  right: args.rightMargin,
  top: args.topMargin,
  bottom: args.bottomMargin
}} width={args.width} height={args.height} animationDuration={args.animationDuration} theme={args.theme} useCanvas={args.useCanvas} onClick={args.onClick} onMouseOver={args.onMouseOver} onMouseOut={args.onMouseOut} zoomBrush={args.zoomBrush}>
        <Column x={args.x} y={args.y2} color="orange" />
        <Line x={args.x} y={args.y} color="steelblue" />
        <Area x={args.x} y={args.y4} color="green" />
        <Scatter x={args.x} y={args.y3} color="purple" />
        <YAxis fields={[args.y, args.y2, args.y3, args.y4]} showGridlines={false} />
        <XAxis fields={args.x} scaleType="band" showGridlines={false} tickFormat={(value, index) => {
    return index % 3 !== 0 ? null : d3.utcFormat("%b")(value);
  }}
  // @ts-expect-error: The typings for utcMonths here are wrong
  tickValues={d3.utcMonths(...d3.extent(data.map(d => d[args.x])))} />
    </XYChart>`,...(Y=(z=h.parameters)==null?void 0:z.docs)==null?void 0:Y.source}}};var T,L,F;d.parameters={...d.parameters,docs:{...(T=d.parameters)==null?void 0:T.docs,source:{originalSource:`args => <XYChart data={data} plotMargin={{
  left: args.leftMargin,
  right: args.rightMargin,
  top: args.topMargin,
  bottom: args.bottomMargin
}} width={args.width} height={args.height} animationDuration={args.animationDuration} theme={args.theme} useCanvas={args.useCanvas} onClick={args.onClick} onMouseOver={args.onMouseOver} onMouseOut={args.onMouseOut} zoomBrush={args.zoomBrush}>
        <Columns x={args.x} ys={[args.y, args.y4, args.y2]} grouped={args.grouped} stacked={args.stacked} />
        <Scatter x={args.x} y={args.y3} color="purple" />
        <YAxis fields={[args.y, args.y2, args.y3, args.y4]} aggregate={args.stacked} showGridlines={false} />
        <XAxis fields={[args.x]} showGridlines={false} scaleType="band" tickFormat={(value, index) => {
    return index % 3 !== 0 ? null : d3.utcFormat("%b")(value);
  }}
  // @ts-expect-error: The typings for utcMonths here are wrong
  tickValues={d3.utcMonths(...d3.extent(data.map(d => d[args.x])))} />
    </XYChart>`,...(F=(L=d.parameters)==null?void 0:L.docs)==null?void 0:F.source}}};var V,N,U;c.parameters={...c.parameters,docs:{...(V=c.parameters)==null?void 0:V.docs,source:{originalSource:`args => <XYChart data={data} plotMargin={{
  left: args.leftMargin,
  right: args.rightMargin,
  top: args.topMargin,
  bottom: args.bottomMargin
}} width={args.width} height={args.height} animationDuration={args.animationDuration} theme={args.theme} useCanvas={args.useCanvas} onClick={args.onClick} onMouseOver={args.onMouseOver} onMouseOut={args.onMouseOut} zoomBrush={args.zoomBrush}>
        <Columns x={args.x} ys={[args.y, args.y4, args.y2]} grouped={args.grouped} stacked={args.stacked} />
        <Scatter x={args.x} y={args.y3} color="purple" />
        <YAxis fields={[args.y, args.y2, args.y3, args.y4]} aggregate={args.stacked} showGridlines={false} />
        <XAxis fields={[args.x]} showGridlines={false} scaleType="band" tickFormat={(value, index) => {
    return index % 3 !== 0 ? null : d3.utcFormat("%b")(value);
  }}
  // @ts-expect-error: The typings for utcMonths here are wrong
  tickValues={d3.utcMonths(...d3.extent(data.map(d => d[args.x])))} />
    </XYChart>`,...(U=(N=c.parameters)==null?void 0:N.docs)==null?void 0:U.source}}};const Ze=["MixedLineAreaScatter","MixedScaleBand","MixedColumnPlotsLinear","MixedColumnPlots","MixedGroupedColumnPlots","MixedStackedColumnPlots"];export{h as MixedColumnPlots,g as MixedColumnPlotsLinear,d as MixedGroupedColumnPlots,l as MixedLineAreaScatter,m as MixedScaleBand,c as MixedStackedColumnPlots,Ze as __namedExportsOrder,We as default};
//# sourceMappingURL=MixedPlot.stories-QBGFD_-s.js.map
