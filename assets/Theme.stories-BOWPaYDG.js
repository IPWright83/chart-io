import{j as i}from"./jsx-runtime-DEdD30eg.js";import{l as b,t as a}from"./index-b9bwP9Bh.js";import{s as X}from"./sales_records_dataset-WHK6HSqq.js";import"./index-B_773EAy.js";import{X as Y}from"./index-CdkoYB7w.js";import{Y as A}from"./YAxis-DuDb07NW.js";import{X as w}from"./XAxis-B_MFapNx.js";import{C as U}from"./Columns-DvhU7O36.js";import"./index-RYns6xqu.js";import"./index-sbqOYYIm.js";import"./index-BHTGSyHG.js";import"./Lines-PAT6BPU_.js";import"./Scatters-CPmcphPq.js";import"./index-CXvrs8Eg.js";import"./useStore-DWdQsrPN.js";import"./index-COLyWrXh.js";import"./defaultLocale-D2nGpDRe.js";import"./renderCanvas-BCjHZwb6.js";import"./interpolateMultiPath-8xM18Eij.js";import"./array-2GBN5xbU.js";import"./index-Bcnion2k.js";import"./Areas-B3IBuDft.js";import"./ensureNoScaleOverflow-li5UC7Oh.js";import"./Bars-DBTbwrTG.js";import"./getParentKey-CcCYm4V6.js";import"./index-DBRTqYFH.js";import"./defaultLocale-C7xJETwF.js";import"./index-9Z0J-FDy.js";import"./index-BZ_hkuv1.js";import"./index-CKF-7MCu.js";import"./index-BPZQwoq3.js";import"./Legend-DEyrexXZ.js";import"./index-DhwMs0bd.js";import"./index-CW0FTg2B.js";import"./Circle-CWMyz_tz.js";import"./Line-B_2MgdvN.js";import"./Square-CektPBZh.js";import"./index-ASiZ4-uZ.js";import"./index-Dm2y6j_S.js";import"./index-KIEdaOUM.js";import"./index-C6pQJBQg.js";import"./index-XNVCW8wB.js";import"./index-CnnvqzWa.js";import"./JsonChart-CnTWs4w1.js";import"./index-DQ1aKZo6.js";import"./index-CLSe-My4.js";import"./Tooltip-GS-CvhnY.js";import"./index-hvi0fNyA.js";import"./TooltipItem-D1zhnsxI.js";import"./index-BQ4jfyHA.js";import"./index-D888O4bb.js";import"./index-B2undoSo.js";const Ut={title:"Theming",parameters:{docs:{transformSource:t=>(t=t.replace(/data={\[.*?\]}/gs,"data={[ ...dataset ]}"),t=t.replaceAll(/undefined,?/g,""),t=t.replace(/^\s*\n/gm,""),t)},chromatic:{delay:300}}},j=b.uniqBy(X,t=>t["Item Type"]),n=t=>{const m="Item Type",p="Unit Price",d="Unit Cost";return i.jsxs(Y,{data:j,plotMargin:{left:30,right:10,top:10,bottom:30},width:800,height:500,theme:t.theme,children:[i.jsx(A,{fields:[p,d]}),i.jsx(w,{fields:[m],scaleType:"band",showGridlines:!1}),i.jsx(U,{x:m,ys:[p,d],grouped:!0})]})},e=n.bind({});e.storyName="Light (Default)";e.args={theme:a.light};const r=n.bind({});r.storyName="Dark";r.args={theme:a.dark};const o=n.bind({});o.storyName="Theme 1";o.args={theme:{...a.dark,background:"#F3F1E5",axis:{stroke:"#969495"},gridlines:{stroke:"#969495"},series:{colors:["#2FC2AF","#433F3E"]}}};const s=n.bind({});s.storyName="Theme 2";s.args={theme:{...a.dark,background:"#000000",axis:{stroke:"#FFFFFF",strokeOpacity:1,strokeWidth:2},droplines:{strokeWidth:5,strokeDasharray:8},gridlines:{stroke:"#FFFFFF",strokeOpacity:.2,strokeWidth:3},series:{opacity:.7,selectedOpacity:1,colors:["#682B8F","#FF8B35"]}}};var h,c,l;e.parameters={...e.parameters,docs:{...(h=e.parameters)==null?void 0:h.docs,source:{originalSource:`args => {
  const x = "Item Type";
  const y = "Unit Price";
  const y2 = "Unit Cost";
  return <XYChart data={data} plotMargin={{
    left: 30,
    right: 10,
    top: 10,
    bottom: 30
  }} width={800} height={500} theme={args.theme}>
      <YAxis fields={[y, y2]} />
      <XAxis fields={[x]} scaleType="band" showGridlines={false} />
      <Columns x={x} ys={[y, y2]} grouped={true} />
    </XYChart>;
}`,...(l=(c=e.parameters)==null?void 0:c.docs)==null?void 0:l.source}}};var y,g,u;r.parameters={...r.parameters,docs:{...(y=r.parameters)==null?void 0:y.docs,source:{originalSource:`args => {
  const x = "Item Type";
  const y = "Unit Price";
  const y2 = "Unit Cost";
  return <XYChart data={data} plotMargin={{
    left: 30,
    right: 10,
    top: 10,
    bottom: 30
  }} width={800} height={500} theme={args.theme}>
      <YAxis fields={[y, y2]} />
      <XAxis fields={[x]} scaleType="band" showGridlines={false} />
      <Columns x={x} ys={[y, y2]} grouped={true} />
    </XYChart>;
}`,...(u=(g=r.parameters)==null?void 0:g.docs)==null?void 0:u.source}}};var x,f,T;o.parameters={...o.parameters,docs:{...(x=o.parameters)==null?void 0:x.docs,source:{originalSource:`args => {
  const x = "Item Type";
  const y = "Unit Price";
  const y2 = "Unit Cost";
  return <XYChart data={data} plotMargin={{
    left: 30,
    right: 10,
    top: 10,
    bottom: 30
  }} width={800} height={500} theme={args.theme}>
      <YAxis fields={[y, y2]} />
      <XAxis fields={[x]} scaleType="band" showGridlines={false} />
      <Columns x={x} ys={[y, y2]} grouped={true} />
    </XYChart>;
}`,...(T=(f=o.parameters)==null?void 0:f.docs)==null?void 0:T.source}}};var C,F,k;s.parameters={...s.parameters,docs:{...(C=s.parameters)==null?void 0:C.docs,source:{originalSource:`args => {
  const x = "Item Type";
  const y = "Unit Price";
  const y2 = "Unit Cost";
  return <XYChart data={data} plotMargin={{
    left: 30,
    right: 10,
    top: 10,
    bottom: 30
  }} width={800} height={500} theme={args.theme}>
      <YAxis fields={[y, y2]} />
      <XAxis fields={[x]} scaleType="band" showGridlines={false} />
      <Columns x={x} ys={[y, y2]} grouped={true} />
    </XYChart>;
}`,...(k=(F=s.parameters)==null?void 0:F.docs)==null?void 0:k.source}}};const jt=["LightTheme","DarkTheme","Theme1","Theme2"];export{r as DarkTheme,e as LightTheme,o as Theme1,s as Theme2,jt as __namedExportsOrder,Ut as default};
//# sourceMappingURL=Theme.stories-BOWPaYDG.js.map
