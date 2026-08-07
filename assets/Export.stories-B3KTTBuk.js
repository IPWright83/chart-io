import{j as a}from"./jsx-runtime-BjG_zV1W.js";import{r as C}from"./index-DpTt3J-R.js";import{s as v}from"./sales_records_dataset-WHK6HSqq.js";import"./index-DHjc8n8F.js";import{X as S}from"./index-OT6NwBHW.js";import{Y as b}from"./YAxis-PGCYKAdu.js";import{X as O}from"./XAxis-D7Bs4h5a.js";import{a as E}from"./Scatters-CWMQ6d13.js";import"./index-Bl9paP-p.js";import"./Lines-7z9s4wNn.js";import"./react-redux-BIxttMao.js";import"./index-DrZFwq_W.js";import"./index-DnlDykCR.js";import"./index-D6EDLvj9.js";import"./Columns-C6MdJ0W5.js";import"./renderCanvas-DgN6C2Td.js";import"./Areas-YrYkQUqw.js";import"./Bars-CbRSn-69.js";import"./index-CaZ68rVx.js";import"./interpolateArc-C5p3tsSp.js";import"./useTooltip-3W5NWBIO.js";import"./index-Bitjf20_.js";import"./Radar-BIVuLbZS.js";import"./index-BrTJ4RzG.js";import"./index-Bd68MpUk.js";import"./index-Dr9RXvgl.js";import"./index-DDyQNOMu.js";import"./index-CWwNrbNA.js";import"./lodash-DOJiQ2Wu.js";import"./index-BqtyGhDH.js";import"./index-9P8qsy9Z.js";import"./index-C_mwV-nm.js";import"./index-CZ4pHQb2.js";import"./Legend-DQ9XwNwf.js";import"./index-BVPNhhj4.js";import"./index-BmYvQTbQ.js";import"./Circle-Qf3Tu8hN.js";import"./Line-BjKan0E4.js";import"./Square-CZVurtTs.js";import"./index-Q6O9tYEF.js";import"./index-DSMIYGhk.js";import"./Tooltip-BrSlbkqa.js";import"./index-CIJ69QRa.js";import"./TooltipItem-C8j0DJCa.js";import"./index-BZCcI5Qt.js";import"./index-DoNFvadr.js";import"./index-sMHBXfkq.js";import"./index-CZdmoXDL.js";import"./index-Bslg3-kY.js";import"./index-dgjSRpfb.js";import"./JsonChart-DTo_XfKa.js";import"./index-BljJ1e5J.js";import"./index-C2WdQQJ3.js";const Er={title:"Exporting"},n=r=>{const i=C.useRef(null);return a.jsxs("div",{children:[a.jsxs(S,{ref:i,plotMargin:{left:r.leftMargin,right:r.rightMargin,top:r.topMargin,bottom:r.bottomMargin},data:v,width:r.width,height:r.height,animationDuration:r.animationDuration,theme:r.theme,useCanvas:r.useCanvas,onClick:r.onClick,onMouseOver:r.onMouseOver,onMouseOut:r.onMouseOut,children:[a.jsx(b,{fields:[r.y,r.y2,r.y3]}),a.jsx(O,{fields:[r.x]}),a.jsx(E,{x:r.x,ys:[r.y,r.y2,r.y3],radius:r.radius})]}),a.jsx("button",{type:"button",onClick:()=>{i.current.exportImage(r.exportName,r.exportFormat,r.exportScale)},children:"Save Image"})]})},t=n.bind({});t.storyName="Exporting SVG charts to a PNG";t.args={useCanvas:!1,exportName:"svgExport",exportFormat:"PNG",exportScale:1,width:800,height:500,animationDuration:0,leftMargin:70,rightMargin:40,topMargin:40,bottomMargin:40,data:v,y:"Total Profit",x:"Units Sold",y2:"Total Revenue",y3:"Total Cost"};const o=n.bind({});o.storyName="Exporting SVG charts to a JPG";o.args={...t.args,exportFormat:"JPG"};const e=n.bind({});e.storyName="Exporting SVG charts with a larger scale";e.args={...t.args,exportScale:5};const s=n.bind({});s.storyName="Exporting Canvas charts to a PNG";s.args={...t.args,exportName:"canvasExport",exportFormat:"PNG",useCanvas:!0};var g,m,p;t.parameters={...t.parameters,docs:{...(g=t.parameters)==null?void 0:g.docs,source:{originalSource:`args => {
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
}`,...(y=(M=s.parameters)==null?void 0:M.docs)==null?void 0:y.source}}};const Rr=["ExportSVGPNG","ExportSVGJPG","ExportSVGScale","ExportCanvas"];export{s as ExportCanvas,o as ExportSVGJPG,t as ExportSVGPNG,e as ExportSVGScale,Rr as __namedExportsOrder,Er as default};
//# sourceMappingURL=Export.stories-B3KTTBuk.js.map
