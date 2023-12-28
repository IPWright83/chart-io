import{j as a}from"./jsx-runtime-vNq4Oc-g.js";import{r as C}from"./index-4g5l5LRQ.js";import{s as v}from"./sales_records_dataset-6YEpZKGQ.js";import"./index-2EgrradX.js";import{X as S}from"./index-H7nlrqdg.js";import{Y as b}from"./YAxis-EYrVkw1t.js";import{X as O}from"./XAxis-r21t602H.js";import{a as E}from"./Scatters-UnyHYjD2.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./index-azpHdaSR.js";import"./Lines-zns-_vZ9.js";import"./index-CnLlP05v.js";import"./index-jmm5gWkb.js";import"./index-CTVlSsFV.js";import"./Provider--AC3n3ro.js";import"./interpolateMultiPath-fX-sCjeh.js";import"./array-5Vj4K6aY.js";import"./index-K4Hn1GGT.js";import"./defaultLocale-4fp4Qluw.js";import"./useStore-5GkWK8oz.js";import"./index-ibNuBTkY.js";import"./Columns-GXlf9bAA.js";import"./getParentKey-EyapHLH0.js";import"./renderCanvas-mvVrqX_A.js";import"./ensureNoScaleOverflow-0H3eBhJa.js";import"./Areas-FRBGw0vI.js";import"./Bars-lINfJt2r.js";import"./index-7Eg7ybPU.js";import"./defaultLocale-RGkPOkAo.js";import"./index-rbFQVUQr.js";import"./index-3lT3xPrt.js";import"./index-N5QiI7wA.js";import"./index-gu_448hd.js";import"./Legend-AepxjzR_.js";import"./index-qFq04NJk.js";import"./index-RAAq-Dtz.js";import"./Circle-2MkuDq74.js";import"./Line-cari06pN.js";import"./Square-_dp0HJFb.js";import"./index-A_rqIulo.js";import"./index-Xb1Ra2vk.js";import"./index-v73ZDDtW.js";import"./index--Wj4XuxC.js";import"./index-XC53K80T.js";import"./index-J4REAcBl.js";import"./JsonChart-GMbEZAhy.js";import"./index-ibvSOphJ.js";import"./index-0hCrwOlf.js";import"./Tooltip-CF66P4Pc.js";import"./index-W-Z_0x6I.js";import"./TooltipItem-SVu_bEZv.js";import"./index-rmVHmJse.js";import"./index-dosLtsPy.js";import"./index-fcJ2LOVC.js";const Rr={title:"Exporting"},n=r=>{const i=C.useRef(null);return a.jsxs("div",{children:[a.jsxs(S,{ref:i,plotMargin:{left:r.leftMargin,right:r.rightMargin,top:r.topMargin,bottom:r.bottomMargin},data:v,width:r.width,height:r.height,animationDuration:r.animationDuration,theme:r.theme,useCanvas:r.useCanvas,onClick:r.onClick,onMouseOver:r.onMouseOver,onMouseOut:r.onMouseOut,children:[a.jsx(b,{fields:[r.y,r.y2,r.y3]}),a.jsx(O,{fields:[r.x]}),a.jsx(E,{x:r.x,ys:[r.y,r.y2,r.y3],radius:r.radius})]}),a.jsx("button",{type:"button",onClick:()=>{i.current.exportImage(r.exportName,r.exportFormat,r.exportScale)},children:"Save Image"})]})},t=n.bind({});t.storyName="Exporting SVG charts to a PNG";t.args={useCanvas:!1,exportName:"svgExport",exportFormat:"PNG",exportScale:1,width:800,height:500,animationDuration:0,leftMargin:70,rightMargin:40,topMargin:40,bottomMargin:40,data:v,y:"Total Profit",x:"Units Sold",y2:"Total Revenue",y3:"Total Cost"};const o=n.bind({});o.storyName="Exporting SVG charts to a JPG";o.args={...t.args,exportFormat:"JPG"};const e=n.bind({});e.storyName="Exporting SVG charts with a larger scale";e.args={...t.args,exportScale:5};const s=n.bind({});s.storyName="Exporting Canvas charts to a PNG";s.args={...t.args,exportName:"canvasExport",exportFormat:"PNG",useCanvas:!0};var g,m,p;t.parameters={...t.parameters,docs:{...(g=t.parameters)==null?void 0:g.docs,source:{originalSource:`args => {
  const chartRef = useRef(null);
  return <div>
            <XYChart ref={chartRef} plotMargin={{
      left: args.leftMargin,
      right: args.rightMargin,
      top: args.topMargin,
      bottom: args.bottomMargin
    }} data={sales_records_dataset} width={args.width} height={args.height} animationDuration={args.animationDuration} theme={args.theme} useCanvas={args.useCanvas} onClick={args.onClick} onMouseOver={args.onMouseOver} onMouseOut={args.onMouseOut}>
                <YAxis fields={[args.y, args.y2, args.y3]} />
                <XAxis fields={[args.x]} />
                <Scatters x={args.x} ys={[args.y, args.y2, args.y3]} radius={args.radius} />
            </XYChart>
            <button type="button" onClick={() => {
      chartRef.current.exportImage(args.exportName, args.exportFormat, args.exportScale);
    }}>
                Save Image
            </button>
        </div>;
}`,...(p=(m=t.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};var u,c,h;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
  const chartRef = useRef(null);
  return <div>
            <XYChart ref={chartRef} plotMargin={{
      left: args.leftMargin,
      right: args.rightMargin,
      top: args.topMargin,
      bottom: args.bottomMargin
    }} data={sales_records_dataset} width={args.width} height={args.height} animationDuration={args.animationDuration} theme={args.theme} useCanvas={args.useCanvas} onClick={args.onClick} onMouseOver={args.onMouseOver} onMouseOut={args.onMouseOut}>
                <YAxis fields={[args.y, args.y2, args.y3]} />
                <XAxis fields={[args.x]} />
                <Scatters x={args.x} ys={[args.y, args.y2, args.y3]} radius={args.radius} />
            </XYChart>
            <button type="button" onClick={() => {
      chartRef.current.exportImage(args.exportName, args.exportFormat, args.exportScale);
    }}>
                Save Image
            </button>
        </div>;
}`,...(h=(c=o.parameters)==null?void 0:c.docs)==null?void 0:h.source}}};var l,x,d;e.parameters={...e.parameters,docs:{...(l=e.parameters)==null?void 0:l.docs,source:{originalSource:`args => {
  const chartRef = useRef(null);
  return <div>
            <XYChart ref={chartRef} plotMargin={{
      left: args.leftMargin,
      right: args.rightMargin,
      top: args.topMargin,
      bottom: args.bottomMargin
    }} data={sales_records_dataset} width={args.width} height={args.height} animationDuration={args.animationDuration} theme={args.theme} useCanvas={args.useCanvas} onClick={args.onClick} onMouseOver={args.onMouseOver} onMouseOut={args.onMouseOut}>
                <YAxis fields={[args.y, args.y2, args.y3]} />
                <XAxis fields={[args.x]} />
                <Scatters x={args.x} ys={[args.y, args.y2, args.y3]} radius={args.radius} />
            </XYChart>
            <button type="button" onClick={() => {
      chartRef.current.exportImage(args.exportName, args.exportFormat, args.exportScale);
    }}>
                Save Image
            </button>
        </div>;
}`,...(d=(x=e.parameters)==null?void 0:x.docs)==null?void 0:d.source}}};var f,M,y;s.parameters={...s.parameters,docs:{...(f=s.parameters)==null?void 0:f.docs,source:{originalSource:`args => {
  const chartRef = useRef(null);
  return <div>
            <XYChart ref={chartRef} plotMargin={{
      left: args.leftMargin,
      right: args.rightMargin,
      top: args.topMargin,
      bottom: args.bottomMargin
    }} data={sales_records_dataset} width={args.width} height={args.height} animationDuration={args.animationDuration} theme={args.theme} useCanvas={args.useCanvas} onClick={args.onClick} onMouseOver={args.onMouseOver} onMouseOut={args.onMouseOut}>
                <YAxis fields={[args.y, args.y2, args.y3]} />
                <XAxis fields={[args.x]} />
                <Scatters x={args.x} ys={[args.y, args.y2, args.y3]} radius={args.radius} />
            </XYChart>
            <button type="button" onClick={() => {
      chartRef.current.exportImage(args.exportName, args.exportFormat, args.exportScale);
    }}>
                Save Image
            </button>
        </div>;
}`,...(y=(M=s.parameters)==null?void 0:M.docs)==null?void 0:y.source}}};const Gr=["ExportSVGPNG","ExportSVGJPG","ExportSVGScale","ExportCanvas"];export{s as ExportCanvas,o as ExportSVGJPG,t as ExportSVGPNG,e as ExportSVGScale,Gr as __namedExportsOrder,Rr as default};
//# sourceMappingURL=Export.stories-9v22XCAz.js.map
