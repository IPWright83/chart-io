import{j as i}from"./jsx-runtime-BjG_zV1W.js";import{l as b,t as a}from"./react-redux-D2XHiCFH.js";import{s as X}from"./sales_records_dataset-WHK6HSqq.js";import"./index-C2UDZNuU.js";import{X as Y}from"./index-B3xvD3KM.js";import{Y as A}from"./YAxis-Di6E_Z0O.js";import{X as w}from"./XAxis-DPoLBJUO.js";import{C as U}from"./Columns-BkWdU0h9.js";import"./index-DpTt3J-R.js";import"./index-BK967JOf.js";import"./Lines-CTewFJaC.js";import"./Scatters-CjVkOVqA.js";import"./index-BLkjqt2D.js";import"./index-Cmxt2A0f.js";import"./defaultLocale-D2nGpDRe.js";import"./renderCanvas-DfhBB9Lh.js";import"./interpolateMultiPath-HMcFf6tI.js";import"./array-2GBN5xbU.js";import"./index-SUJzco65.js";import"./Areas-Bs_w_X2y.js";import"./ensureNoScaleOverflow-_ke7A8wI.js";import"./Bars-DuzADUAB.js";import"./getParentKey-CJpMRI3M.js";import"./index-lEWDzjaj.js";import"./defaultLocale-YZNTexTf.js";import"./index-B83mH7RW.js";import"./index-CormuWgM.js";import"./index-DCrWobO-.js";import"./index--IH0qLMi.js";import"./Legend-BfppGThJ.js";import"./index-DSanPm5k.js";import"./index-BmYvQTbQ.js";import"./Circle-Qf3Tu8hN.js";import"./Line-BjKan0E4.js";import"./Square-CZVurtTs.js";import"./index-D2Yg9nHg.js";import"./index-CqmfD0_h.js";import"./index-C4dUuWS8.js";import"./index-DUjAVP1E.js";import"./index--xsHF6YT.js";import"./index-CM6SMzqP.js";import"./JsonChart-BEPTQr2r.js";import"./index-Dm9U4OvN.js";import"./index-D9WwHXYw.js";import"./Tooltip-DKHk2rGT.js";import"./index-Dnwqjl04.js";import"./TooltipItem-DpodgMXu.js";import"./index-idqV8wj_.js";import"./index-C_9ZH6Qa.js";import"./index-nsWK1wQc.js";const At={title:"Theming",parameters:{docs:{transformSource:t=>(t=t.replace(/data={\[.*?\]}/gs,"data={[ ...dataset ]}"),t=t.replaceAll(/undefined,?/g,""),t=t.replace(/^\s*\n/gm,""),t)},chromatic:{delay:300}}},j=b.uniqBy(X,t=>t["Item Type"]),n=t=>{const m="Item Type",p="Unit Price",d="Unit Cost";return i.jsxs(Y,{data:j,plotMargin:{left:30,right:10,top:10,bottom:30},width:800,height:500,theme:t.theme,children:[i.jsx(A,{fields:[p,d]}),i.jsx(w,{fields:[m],scaleType:"band",showGridlines:!1}),i.jsx(U,{x:m,ys:[p,d],grouped:!0})]})},e=n.bind({});e.storyName="Light (Default)";e.args={theme:a.light};const r=n.bind({});r.storyName="Dark";r.args={theme:a.dark};const o=n.bind({});o.storyName="Theme 1";o.args={theme:{...a.dark,background:"#F3F1E5",axis:{stroke:"#969495"},gridlines:{stroke:"#969495"},series:{colors:["#2FC2AF","#433F3E"]}}};const s=n.bind({});s.storyName="Theme 2";s.args={theme:{...a.dark,background:"#000000",axis:{stroke:"#FFFFFF",strokeOpacity:1,strokeWidth:2},droplines:{strokeWidth:5,strokeDasharray:8},gridlines:{stroke:"#FFFFFF",strokeOpacity:.2,strokeWidth:3},series:{opacity:.7,selectedOpacity:1,colors:["#682B8F","#FF8B35"]}}};var h,c,l;e.parameters={...e.parameters,docs:{...(h=e.parameters)==null?void 0:h.docs,source:{originalSource:`args => {
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
}`,...(k=(F=s.parameters)==null?void 0:F.docs)==null?void 0:k.source}}};const wt=["LightTheme","DarkTheme","Theme1","Theme2"];export{r as DarkTheme,e as LightTheme,o as Theme1,s as Theme2,wt as __namedExportsOrder,At as default};
//# sourceMappingURL=Theme.stories-B4Zd2SZK.js.map
