import{j as i}from"./jsx-runtime-CB_V9I5Y.js";import{l as b,t as a}from"./index-D1OPLCpq.js";import{s as X}from"./sales_records_dataset-WHK6HSqq.js";import"./index-B0KhbJdb.js";import{X as Y}from"./index-DWjDrBH7.js";import{Y as A}from"./YAxis-DVfVxPRN.js";import{X as w}from"./XAxis-NdVBz2bD.js";import{C as U}from"./Columns-7YBzAFul.js";import"./index-CTjT7uj6.js";import"./index-Cywu29Xx.js";import"./index-DaP2QGcy.js";import"./Lines-C5HE8H6Y.js";import"./Scatters-BJwZW5dN.js";import"./index-Bs4_CWqv.js";import"./useStore-D42TxdHf.js";import"./index-DyxbUYfF.js";import"./defaultLocale-D2nGpDRe.js";import"./renderCanvas-B3vh6D0b.js";import"./interpolateMultiPath-CX2TmtXQ.js";import"./array-2GBN5xbU.js";import"./index-MSSoR4im.js";import"./Areas-C0BRo5lG.js";import"./ensureNoScaleOverflow-BVrwbjHS.js";import"./Bars-Xnowt69k.js";import"./getParentKey-Dt0KjBfq.js";import"./index-ChfY_KWg.js";import"./defaultLocale-YZNTexTf.js";import"./index-D8HK0Iw4.js";import"./index-BNKFbkco.js";import"./index-CD7MXqKa.js";import"./index-BcuBy6DH.js";import"./Legend-DQ2LjqGu.js";import"./index-COgl75ap.js";import"./index-BQDzJjLo.js";import"./Circle-D2bUPI43.js";import"./Line-cv_TynKV.js";import"./Square-DM8ZByYb.js";import"./index-C73EMPtE.js";import"./index-Bm83amPP.js";import"./index-BmbHlpXZ.js";import"./index-uU7U5txR.js";import"./index-Df5kvydP.js";import"./index-C0P4d-tU.js";import"./JsonChart-isj1dlf7.js";import"./index-BOxme2CB.js";import"./index-Cn1GUACH.js";import"./Tooltip-BNhJ7WJH.js";import"./index-BK_JY7l-.js";import"./TooltipItem-Ds3NZ-zA.js";import"./index-e8nDjrQd.js";import"./index-DomMj_LS.js";import"./index-DqBBfSd8.js";const Ut={title:"Theming",parameters:{docs:{transformSource:t=>(t=t.replace(/data={\[.*?\]}/gs,"data={[ ...dataset ]}"),t=t.replaceAll(/undefined,?/g,""),t=t.replace(/^\s*\n/gm,""),t)},chromatic:{delay:300}}},j=b.uniqBy(X,t=>t["Item Type"]),n=t=>{const m="Item Type",p="Unit Price",d="Unit Cost";return i.jsxs(Y,{data:j,plotMargin:{left:30,right:10,top:10,bottom:30},width:800,height:500,theme:t.theme,children:[i.jsx(A,{fields:[p,d]}),i.jsx(w,{fields:[m],scaleType:"band",showGridlines:!1}),i.jsx(U,{x:m,ys:[p,d],grouped:!0})]})},e=n.bind({});e.storyName="Light (Default)";e.args={theme:a.light};const r=n.bind({});r.storyName="Dark";r.args={theme:a.dark};const o=n.bind({});o.storyName="Theme 1";o.args={theme:{...a.dark,background:"#F3F1E5",axis:{stroke:"#969495"},gridlines:{stroke:"#969495"},series:{colors:["#2FC2AF","#433F3E"]}}};const s=n.bind({});s.storyName="Theme 2";s.args={theme:{...a.dark,background:"#000000",axis:{stroke:"#FFFFFF",strokeOpacity:1,strokeWidth:2},droplines:{strokeWidth:5,strokeDasharray:8},gridlines:{stroke:"#FFFFFF",strokeOpacity:.2,strokeWidth:3},series:{opacity:.7,selectedOpacity:1,colors:["#682B8F","#FF8B35"]}}};var h,c,l;e.parameters={...e.parameters,docs:{...(h=e.parameters)==null?void 0:h.docs,source:{originalSource:`args => {
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
//# sourceMappingURL=Theme.stories-DIZN4LCY.js.map
