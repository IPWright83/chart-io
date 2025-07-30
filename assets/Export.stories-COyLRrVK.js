import{j as a}from"./jsx-runtime-CB_V9I5Y.js";import{r as C}from"./index-CTjT7uj6.js";import{s as v}from"./sales_records_dataset-WHK6HSqq.js";import"./index-B0KhbJdb.js";import{X as S}from"./index-DWjDrBH7.js";import{Y as b}from"./YAxis-DVfVxPRN.js";import{X as O}from"./XAxis-NdVBz2bD.js";import{a as E}from"./Scatters-BJwZW5dN.js";import"./index-DaP2QGcy.js";import"./Lines-C5HE8H6Y.js";import"./index-D1OPLCpq.js";import"./index-Cywu29Xx.js";import"./index-Bs4_CWqv.js";import"./interpolateMultiPath-CX2TmtXQ.js";import"./array-2GBN5xbU.js";import"./index-DyxbUYfF.js";import"./defaultLocale-D2nGpDRe.js";import"./useStore-D42TxdHf.js";import"./index-MSSoR4im.js";import"./Columns-7YBzAFul.js";import"./getParentKey-Dt0KjBfq.js";import"./renderCanvas-B3vh6D0b.js";import"./ensureNoScaleOverflow-BVrwbjHS.js";import"./Areas-C0BRo5lG.js";import"./Bars-Xnowt69k.js";import"./index-ChfY_KWg.js";import"./defaultLocale-YZNTexTf.js";import"./index-D8HK0Iw4.js";import"./index-BNKFbkco.js";import"./index-CD7MXqKa.js";import"./index-BcuBy6DH.js";import"./Legend-DQ2LjqGu.js";import"./index-COgl75ap.js";import"./index-BQDzJjLo.js";import"./Circle-D2bUPI43.js";import"./Line-cv_TynKV.js";import"./Square-DM8ZByYb.js";import"./index-C73EMPtE.js";import"./index-Bm83amPP.js";import"./index-BmbHlpXZ.js";import"./index-uU7U5txR.js";import"./index-Df5kvydP.js";import"./index-C0P4d-tU.js";import"./JsonChart-isj1dlf7.js";import"./index-BOxme2CB.js";import"./index-Cn1GUACH.js";import"./Tooltip-BNhJ7WJH.js";import"./index-BK_JY7l-.js";import"./TooltipItem-Ds3NZ-zA.js";import"./index-e8nDjrQd.js";import"./index-DomMj_LS.js";import"./index-DqBBfSd8.js";const Or={title:"Exporting"},n=r=>{const i=C.useRef(null);return a.jsxs("div",{children:[a.jsxs(S,{ref:i,plotMargin:{left:r.leftMargin,right:r.rightMargin,top:r.topMargin,bottom:r.bottomMargin},data:v,width:r.width,height:r.height,animationDuration:r.animationDuration,theme:r.theme,useCanvas:r.useCanvas,onClick:r.onClick,onMouseOver:r.onMouseOver,onMouseOut:r.onMouseOut,children:[a.jsx(b,{fields:[r.y,r.y2,r.y3]}),a.jsx(O,{fields:[r.x]}),a.jsx(E,{x:r.x,ys:[r.y,r.y2,r.y3],radius:r.radius})]}),a.jsx("button",{type:"button",onClick:()=>{i.current.exportImage(r.exportName,r.exportFormat,r.exportScale)},children:"Save Image"})]})},t=n.bind({});t.storyName="Exporting SVG charts to a PNG";t.args={useCanvas:!1,exportName:"svgExport",exportFormat:"PNG",exportScale:1,width:800,height:500,animationDuration:0,leftMargin:70,rightMargin:40,topMargin:40,bottomMargin:40,data:v,y:"Total Profit",x:"Units Sold",y2:"Total Revenue",y3:"Total Cost"};const o=n.bind({});o.storyName="Exporting SVG charts to a JPG";o.args={...t.args,exportFormat:"JPG"};const e=n.bind({});e.storyName="Exporting SVG charts with a larger scale";e.args={...t.args,exportScale:5};const s=n.bind({});s.storyName="Exporting Canvas charts to a PNG";s.args={...t.args,exportName:"canvasExport",exportFormat:"PNG",useCanvas:!0};var g,m,p;t.parameters={...t.parameters,docs:{...(g=t.parameters)==null?void 0:g.docs,source:{originalSource:`args => {
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
}`,...(y=(M=s.parameters)==null?void 0:M.docs)==null?void 0:y.source}}};const Er=["ExportSVGPNG","ExportSVGJPG","ExportSVGScale","ExportCanvas"];export{s as ExportCanvas,o as ExportSVGJPG,t as ExportSVGPNG,e as ExportSVGScale,Er as __namedExportsOrder,Or as default};
//# sourceMappingURL=Export.stories-COyLRrVK.js.map
