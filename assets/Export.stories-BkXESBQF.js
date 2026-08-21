import{j as a}from"./jsx-runtime-BjG_zV1W.js";import{r as C}from"./index-DpTt3J-R.js";import{s as v}from"./sales_records_dataset-WHK6HSqq.js";import"./index-hk_X2HOq.js";import{X as S}from"./index-53SPihoZ.js";import{Y as b}from"./YAxis-BLu4jwFE.js";import{X as O}from"./XAxis-yIVuvz3U.js";import{a as E}from"./Scatters-3-avvN77.js";import"./index-DfK4SF6L.js";import"./Lines-DLDdBXC5.js";import"./react-redux-SPeguAgb.js";import"./index-9431aKHi.js";import"./index-BRXO1njn.js";import"./lodash-DOJiQ2Wu.js";import"./index-B8eXPVPV.js";import"./Columns-DCzCoYDu.js";import"./renderCanvas-CR85T-h9.js";import"./Areas-mZCDmN45.js";import"./Bars-B28Is7JF.js";import"./index-Ete-KSn1.js";import"./interpolateArc-BeeJJFCD.js";import"./useTooltip-BlFpqfM-.js";import"./index-cvfhMktw.js";import"./index-BBDmPaB_.js";import"./Radar-CXAo-9wZ.js";import"./interpolatePoints-DwMMV_8i.js";import"./index-CmKRTxUI.js";import"./index-BAzb9S1k.js";import"./Legend-z40re8h9.js";import"./index-Dub0Swig.js";import"./index-BmYvQTbQ.js";import"./Circle-Qf3Tu8hN.js";import"./Line-BjKan0E4.js";import"./Square-CZVurtTs.js";import"./index-9usyF_v_.js";import"./Tooltip-aPd-LmbL.js";import"./index-CRhM32cg.js";import"./TooltipItem-OfChlkFL.js";import"./index-B_99FLAR.js";import"./RadialAreas-3Hf8RTIB.js";import"./index-B-3-hfbS.js";import"./index-CvJ_dlQX.js";import"./index-B6Lr3Qa8.js";import"./index-BLxOKznu.js";import"./index-DxXlV5JW.js";import"./LabelsPlot-Co4tuujP.js";import"./LinksPlot-EyWHfZA0.js";import"./NodesPlot-BCoyNFhJ.js";import"./index-DPqJA-7V.js";import"./index-BInKuQeD.js";import"./index-Cl-eCd-x.js";import"./index-DnRZR6m4.js";import"./index-DwL5j-mS.js";import"./index-Dd_IEiRF.js";import"./index-sBPFWXw6.js";import"./index-yAu6bW1V.js";import"./index-Bdes0qwq.js";import"./index-DhP8WHXK.js";import"./index-3tf1K2oi.js";import"./index-BLHBaSmk.js";import"./index-CGJDsSgY.js";import"./index-Bat0u2Jd.js";import"./index-Bst5UcPv.js";import"./JsonChart-Bk8HP8Mx.js";import"./index-CErv1lK-.js";import"./index-rx8DGN-B.js";const Vr={title:"Exporting"},n=r=>{const i=C.useRef(null);return a.jsxs("div",{children:[a.jsxs(S,{ref:i,plotMargin:{left:r.leftMargin,right:r.rightMargin,top:r.topMargin,bottom:r.bottomMargin},data:v,width:r.width,height:r.height,animationDuration:r.animationDuration,theme:r.theme,useCanvas:r.useCanvas,onClick:r.onClick,onMouseOver:r.onMouseOver,onMouseOut:r.onMouseOut,children:[a.jsx(b,{fields:[r.y,r.y2,r.y3]}),a.jsx(O,{fields:[r.x]}),a.jsx(E,{x:r.x,ys:[r.y,r.y2,r.y3],radius:r.radius})]}),a.jsx("button",{type:"button",onClick:()=>{i.current.exportImage(r.exportName,r.exportFormat,r.exportScale)},children:"Save Image"})]})},t=n.bind({});t.storyName="Exporting SVG charts to a PNG";t.args={useCanvas:!1,exportName:"svgExport",exportFormat:"PNG",exportScale:1,width:800,height:500,animationDuration:0,leftMargin:70,rightMargin:40,topMargin:40,bottomMargin:40,data:v,y:"Total Profit",x:"Units Sold",y2:"Total Revenue",y3:"Total Cost"};const o=n.bind({});o.storyName="Exporting SVG charts to a JPG";o.args={...t.args,exportFormat:"JPG"};const e=n.bind({});e.storyName="Exporting SVG charts with a larger scale";e.args={...t.args,exportScale:5};const s=n.bind({});s.storyName="Exporting Canvas charts to a PNG";s.args={...t.args,exportName:"canvasExport",exportFormat:"PNG",useCanvas:!0};var g,m,p;t.parameters={...t.parameters,docs:{...(g=t.parameters)==null?void 0:g.docs,source:{originalSource:`args => {
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
}`,...(y=(M=s.parameters)==null?void 0:M.docs)==null?void 0:y.source}}};const jr=["ExportSVGPNG","ExportSVGJPG","ExportSVGScale","ExportCanvas"];export{s as ExportCanvas,o as ExportSVGJPG,t as ExportSVGPNG,e as ExportSVGScale,jr as __namedExportsOrder,Vr as default};
//# sourceMappingURL=Export.stories-BkXESBQF.js.map
