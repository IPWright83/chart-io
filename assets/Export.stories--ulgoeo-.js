import{j as a}from"./jsx-runtime-BjG_zV1W.js";import{r as C}from"./index-DpTt3J-R.js";import{s as v}from"./sales_records_dataset-WHK6HSqq.js";import"./index-C2UDZNuU.js";import{X as S}from"./index-B3xvD3KM.js";import{Y as b}from"./YAxis-Di6E_Z0O.js";import{X as O}from"./XAxis-DPoLBJUO.js";import{a as E}from"./Scatters-CjVkOVqA.js";import"./index-BK967JOf.js";import"./Lines-CTewFJaC.js";import"./react-redux-D2XHiCFH.js";import"./index-BLkjqt2D.js";import"./interpolateMultiPath-HMcFf6tI.js";import"./array-2GBN5xbU.js";import"./index-Cmxt2A0f.js";import"./defaultLocale-D2nGpDRe.js";import"./index-SUJzco65.js";import"./Columns-BkWdU0h9.js";import"./getParentKey-CJpMRI3M.js";import"./renderCanvas-DfhBB9Lh.js";import"./ensureNoScaleOverflow-_ke7A8wI.js";import"./Areas-Bs_w_X2y.js";import"./Bars-DuzADUAB.js";import"./index-lEWDzjaj.js";import"./defaultLocale-YZNTexTf.js";import"./index-B83mH7RW.js";import"./index-CormuWgM.js";import"./index-DCrWobO-.js";import"./index--IH0qLMi.js";import"./Legend-BfppGThJ.js";import"./index-DSanPm5k.js";import"./index-BmYvQTbQ.js";import"./Circle-Qf3Tu8hN.js";import"./Line-BjKan0E4.js";import"./Square-CZVurtTs.js";import"./index-D2Yg9nHg.js";import"./index-CqmfD0_h.js";import"./index-C4dUuWS8.js";import"./index-DUjAVP1E.js";import"./index--xsHF6YT.js";import"./index-CM6SMzqP.js";import"./JsonChart-BEPTQr2r.js";import"./index-Dm9U4OvN.js";import"./index-D9WwHXYw.js";import"./Tooltip-DKHk2rGT.js";import"./index-Dnwqjl04.js";import"./TooltipItem-DpodgMXu.js";import"./index-idqV8wj_.js";import"./index-C_9ZH6Qa.js";import"./index-nsWK1wQc.js";const Sr={title:"Exporting"},n=r=>{const i=C.useRef(null);return a.jsxs("div",{children:[a.jsxs(S,{ref:i,plotMargin:{left:r.leftMargin,right:r.rightMargin,top:r.topMargin,bottom:r.bottomMargin},data:v,width:r.width,height:r.height,animationDuration:r.animationDuration,theme:r.theme,useCanvas:r.useCanvas,onClick:r.onClick,onMouseOver:r.onMouseOver,onMouseOut:r.onMouseOut,children:[a.jsx(b,{fields:[r.y,r.y2,r.y3]}),a.jsx(O,{fields:[r.x]}),a.jsx(E,{x:r.x,ys:[r.y,r.y2,r.y3],radius:r.radius})]}),a.jsx("button",{type:"button",onClick:()=>{i.current.exportImage(r.exportName,r.exportFormat,r.exportScale)},children:"Save Image"})]})},t=n.bind({});t.storyName="Exporting SVG charts to a PNG";t.args={useCanvas:!1,exportName:"svgExport",exportFormat:"PNG",exportScale:1,width:800,height:500,animationDuration:0,leftMargin:70,rightMargin:40,topMargin:40,bottomMargin:40,data:v,y:"Total Profit",x:"Units Sold",y2:"Total Revenue",y3:"Total Cost"};const o=n.bind({});o.storyName="Exporting SVG charts to a JPG";o.args={...t.args,exportFormat:"JPG"};const e=n.bind({});e.storyName="Exporting SVG charts with a larger scale";e.args={...t.args,exportScale:5};const s=n.bind({});s.storyName="Exporting Canvas charts to a PNG";s.args={...t.args,exportName:"canvasExport",exportFormat:"PNG",useCanvas:!0};var g,m,p;t.parameters={...t.parameters,docs:{...(g=t.parameters)==null?void 0:g.docs,source:{originalSource:`args => {
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
}`,...(y=(M=s.parameters)==null?void 0:M.docs)==null?void 0:y.source}}};const br=["ExportSVGPNG","ExportSVGJPG","ExportSVGScale","ExportCanvas"];export{s as ExportCanvas,o as ExportSVGJPG,t as ExportSVGPNG,e as ExportSVGScale,br as __namedExportsOrder,Sr as default};
//# sourceMappingURL=Export.stories--ulgoeo-.js.map
