import{j as a}from"./jsx-runtime-BjG_zV1W.js";import{r as C}from"./index-DpTt3J-R.js";import{s as v}from"./sales_records_dataset-WHK6HSqq.js";import"./index-Bb4cVd6Q.js";import{X as S}from"./index-DMa6aJSy.js";import{Y as b}from"./YAxis-CRYvaCDj.js";import{X as O}from"./XAxis-CgOaLwq3.js";import{a as E}from"./Scatters-CtuKNgxe.js";import"./index-Cd3EKKNL.js";import"./Lines-B6-CZOIj.js";import"./index.es-DoiyW41S.js";import"./react-redux-lkBMRsz6.js";import"./index-DzcEfe_2.js";import"./index-5Gl1ki1p.js";import"./index-u8wY-fXO.js";import"./Columns-BwyQb29h.js";import"./renderCanvas-DSAxZURY.js";import"./Areas-BBI5eHNA.js";import"./index-B6be1P4a.js";import"./Bars-gIikB3lP.js";import"./index-CE94rE7I.js";import"./interpolateArc-BeeJJFCD.js";import"./useTooltip-B4jsLD3t.js";import"./index-1M3q30jN.js";import"./index-DrWhuguZ.js";import"./Radar-CN15cyaY.js";import"./interpolatePoints-DwMMV_8i.js";import"./index-CQRKux3Q.js";import"./index-Gn9jQ5lq.js";import"./lodash-DOJiQ2Wu.js";import"./index-CFwzIhDn.js";import"./Legend-DQjp6Mmo.js";import"./index-Bp2RIjag.js";import"./index-BmYvQTbQ.js";import"./Circle-Qf3Tu8hN.js";import"./Line-BjKan0E4.js";import"./Square-CZVurtTs.js";import"./index-DVli7D7_.js";import"./Tooltip-aFreqMLS.js";import"./index-iwe53Xj-.js";import"./TooltipItem-D41oQ2An.js";import"./index-fTNMVVp7.js";import"./RadialAreas-DY8RWhRu.js";import"./index-CBcXhfcM.js";import"./index-vFMZ7B83.js";import"./index-D1GbqKuK.js";import"./index-CaWU7ljP.js";import"./ContextMenu-Dkh4zLYP.js";import"./index-D5nvoAmD.js";import"./index-CsGapHqM.js";import"./index-BkBTUWQV.js";import"./LabelsPlot-C9OJe8VL.js";import"./LinksPlot-CoPVhndq.js";import"./NodesPlot-cB_M2zll.js";import"./index-Cw8P14OC.js";import"./index-DKCuWQPk.js";import"./index-BO0R6WYt.js";import"./index-CV3FwEcA.js";import"./index-DC1bvwxr.js";import"./calculateScale-CBIGWBP9.js";import"./index-DaTy74M5.js";import"./index-CBSNT1TE.js";import"./index-VyfXoxD0.js";import"./index-DVqBs4fh.js";import"./index-C8nU8Xpn.js";import"./index-DVRV05yR.js";import"./index-HNMvlCFe.js";import"./index-DG7nEBGO.js";import"./index-qlwqufkG.js";import"./index-VkI0TnhY.js";import"./index-DRUZ2D2R.js";import"./index-Q1UG5Y4D.js";import"./JsonChart-CsR6MqHu.js";import"./index-CCgpevYr.js";import"./index-Dn87vz0y.js";const Hr={title:"Exporting"},n=r=>{const i=C.useRef(null);return a.jsxs("div",{children:[a.jsxs(S,{contextMenu:!1,ref:i,plotMargin:{left:r.leftMargin,right:r.rightMargin,top:r.topMargin,bottom:r.bottomMargin},data:v,width:r.width,height:r.height,animationDuration:r.animationDuration,theme:r.theme,useCanvas:r.useCanvas,onClick:r.onClick,onMouseOver:r.onMouseOver,onMouseOut:r.onMouseOut,children:[a.jsx(b,{fields:[r.y,r.y2,r.y3]}),a.jsx(O,{fields:[r.x]}),a.jsx(E,{x:r.x,ys:[r.y,r.y2,r.y3],radius:r.radius})]}),a.jsx("button",{type:"button",onClick:()=>{i.current.exportImage(r.exportName,r.exportFormat,r.exportScale)},children:"Save Image"})]})},t=n.bind({});t.storyName="Exporting SVG charts to a PNG";t.args={useCanvas:!1,exportName:"svgExport",exportFormat:"PNG",exportScale:1,width:800,height:500,animationDuration:0,leftMargin:70,rightMargin:40,topMargin:40,bottomMargin:40,data:v,y:"Total Profit",x:"Units Sold",y2:"Total Revenue",y3:"Total Cost"};const o=n.bind({});o.storyName="Exporting SVG charts to a JPG";o.args={...t.args,exportFormat:"JPG"};const e=n.bind({});e.storyName="Exporting SVG charts with a larger scale";e.args={...t.args,exportScale:5};const s=n.bind({});s.storyName="Exporting Canvas charts to a PNG";s.args={...t.args,exportName:"canvasExport",exportFormat:"PNG",useCanvas:!0};var m,p,g;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
  const chartRef = useRef(null);
  return <div>
      <XYChart contextMenu={false} ref={chartRef} plotMargin={{
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
}`,...(g=(p=t.parameters)==null?void 0:p.docs)==null?void 0:g.source}}};var u,c,l;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
  const chartRef = useRef(null);
  return <div>
      <XYChart contextMenu={false} ref={chartRef} plotMargin={{
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
}`,...(l=(c=o.parameters)==null?void 0:c.docs)==null?void 0:l.source}}};var x,h,d;e.parameters={...e.parameters,docs:{...(x=e.parameters)==null?void 0:x.docs,source:{originalSource:`args => {
  const chartRef = useRef(null);
  return <div>
      <XYChart contextMenu={false} ref={chartRef} plotMargin={{
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
}`,...(d=(h=e.parameters)==null?void 0:h.docs)==null?void 0:d.source}}};var f,M,y;s.parameters={...s.parameters,docs:{...(f=s.parameters)==null?void 0:f.docs,source:{originalSource:`args => {
  const chartRef = useRef(null);
  return <div>
      <XYChart contextMenu={false} ref={chartRef} plotMargin={{
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
}`,...(y=(M=s.parameters)==null?void 0:M.docs)==null?void 0:y.source}}};const Kr=["ExportSVGPNG","ExportSVGJPG","ExportSVGScale","ExportCanvas"];export{s as ExportCanvas,o as ExportSVGJPG,t as ExportSVGPNG,e as ExportSVGScale,Kr as __namedExportsOrder,Hr as default};
//# sourceMappingURL=Export.stories-DbRNMLrQ.js.map
