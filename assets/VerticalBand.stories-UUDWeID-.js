import{j as t}from"./jsx-runtime-DEdD30eg.js";import{t as d,P as h}from"./index-b9bwP9Bh.js";import{V as o}from"./index-KIEdaOUM.js";import{s as x}from"./sales_records_dataset-WHK6HSqq.js";import"./index-BHTGSyHG.js";import{X as f}from"./index-CdkoYB7w.js";import{c as S}from"./renderChart-C4tDReWK.js";import"./index-CPFb5ytF.js";import{l as u}from"./index-COLyWrXh.js";import{Y as g}from"./YAxis-DuDb07NW.js";import{X as j}from"./XAxis-B_MFapNx.js";import{S as T}from"./Scatters-CPmcphPq.js";import"./index-RYns6xqu.js";import"./index-sbqOYYIm.js";import"./index-CXvrs8Eg.js";import"./Lines-PAT6BPU_.js";import"./interpolateMultiPath-8xM18Eij.js";import"./array-2GBN5xbU.js";import"./useStore-DWdQsrPN.js";import"./index-Bcnion2k.js";import"./Columns-DvhU7O36.js";import"./getParentKey-CcCYm4V6.js";import"./renderCanvas-BCjHZwb6.js";import"./ensureNoScaleOverflow-li5UC7Oh.js";import"./Areas-B3IBuDft.js";import"./Bars-DBTbwrTG.js";import"./index-DBRTqYFH.js";import"./defaultLocale-D2nGpDRe.js";import"./defaultLocale-C7xJETwF.js";import"./index-ASiZ4-uZ.js";import"./index-BZ_hkuv1.js";import"./index-9Z0J-FDy.js";import"./index-BPZQwoq3.js";import"./Legend-DEyrexXZ.js";import"./index-DhwMs0bd.js";import"./index-CW0FTg2B.js";import"./Circle-CWMyz_tz.js";import"./Line-B_2MgdvN.js";import"./Square-CektPBZh.js";import"./index-CKF-7MCu.js";import"./index-DQ1aKZo6.js";import"./index-CLSe-My4.js";import"./Tooltip-GS-CvhnY.js";import"./index-hvi0fNyA.js";import"./TooltipItem-D1zhnsxI.js";import"./index-BQ4jfyHA.js";import"./index-D888O4bb.js";import"./index-B2undoSo.js";import"./test-utils-pcsCGetG.js";import"./client-BylhC-KR.js";const jt={title:"Components/Bands/VerticalBand",component:o,parameters:{chromatic:{delay:300}}},B=()=>{const e=S({chart:{theme:d.light,dimensions:{width:500,height:200},scales:{"Units Sold":{scale:u(),domain:[0,1e3],range:[0,200]}}}});return t.jsx(h,{store:e,children:t.jsx("svg",{width:"500",height:"200",children:t.jsx(o,{xStop:500,x:"Units Sold",fill:"steelblue",stroke:"red",opacity:.3})})})},V=()=>{const e="Total Profit",r="Units Sold";return t.jsxs(f,{data:x,plotMargin:{left:70,top:20,bottom:40,right:20},width:800,height:400,children:[t.jsx(g,{fields:[e]}),t.jsx(j,{fields:[r]}),t.jsx(o,{x:r,xStop:2e3,fill:"red",opacity:.1}),t.jsx(o,{x:r,xStart:2e3,xStop:7e3,fill:"orange",opacity:.1}),t.jsx(o,{x:r,xStart:7e3,fill:"green",opacity:.1}),t.jsx(T,{x:r,y:e})]})},i={name:"VerticalBand",render:B},m={name:"Thresholds Example",render:V};var a,s,p;i.parameters={...i.parameters,docs:{...(a=i.parameters)==null?void 0:a.docs,source:{originalSource:`{
  name: "VerticalBand",
  render: VerticalBandTemplate
}`,...(p=(s=i.parameters)==null?void 0:s.docs)==null?void 0:p.source}}};var n,l,c;m.parameters={...m.parameters,docs:{...(n=m.parameters)==null?void 0:n.docs,source:{originalSource:`{
  name: "Thresholds Example",
  render: ScatterWithRectsTemplate
}`,...(c=(l=m.parameters)==null?void 0:l.docs)==null?void 0:c.source}}};const Tt=["Default","ThresholdsExample"];export{i as Default,m as ThresholdsExample,Tt as __namedExportsOrder,jt as default};
//# sourceMappingURL=VerticalBand.stories-UUDWeID-.js.map
