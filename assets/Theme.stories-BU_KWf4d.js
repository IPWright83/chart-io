import{j as i}from"./jsx-runtime-BjG_zV1W.js";import{M as a}from"./react-redux-QXbQKOoW.js";import{l as b}from"./lodash-DOJiQ2Wu.js";import{s as X}from"./sales_records_dataset-WHK6HSqq.js";import"./index-C41cK2st.js";import{X as Y}from"./index-Bg6IsbDW.js";import{Y as A}from"./YAxis-DSGnzgTy.js";import{X as w}from"./XAxis-ChDwRgF9.js";import{C as U}from"./Columns-Dzd93bGI.js";import"./index-DpTt3J-R.js";import"./index-r1ySBL9M.js";import"./Lines-BtR_OUgn.js";import"./Scatters-t7a3qHKk.js";import"./index-_rl-6daV.js";import"./index-CRk78wGA.js";import"./renderCanvas-Cl5RbTFF.js";import"./index-C3dhlPHa.js";import"./Areas-DNR506EA.js";import"./Bars-CA0K2ZMO.js";import"./index-D50cK_1g.js";import"./index-CJyk9Ty5.js";import"./index-Du5VnEcz.js";import"./index-B2ADnR9i.js";import"./index-gt7zBpiH.js";import"./Legend-pimTzOFw.js";import"./index-D4-eAyeX.js";import"./index-BmYvQTbQ.js";import"./Circle-Qf3Tu8hN.js";import"./Line-BjKan0E4.js";import"./Square-CZVurtTs.js";import"./index-D53rF_3R.js";import"./index-rMEleilL.js";import"./index-BzVFGtYN.js";import"./index-CeelFCKr.js";import"./index-BmoeoWur.js";import"./index-H0MMxKo2.js";import"./JsonChart-CudaRnwQ.js";import"./index-mxfEYTca.js";import"./index-BEVv-T-d.js";import"./Tooltip-DL_pUHjQ.js";import"./index-BH_8yRl6.js";import"./TooltipItem-CWwi-etI.js";import"./index-BXRhMbPE.js";import"./index-C_QuCFx-.js";import"./index-DIhe8qvN.js";const Ft={title:"Theming",parameters:{docs:{transformSource:t=>(t=t.replace(/data={\[.*?\]}/gs,"data={[ ...dataset ]}"),t=t.replaceAll(/undefined,?/g,""),t=t.replace(/^\s*\n/gm,""),t)},chromatic:{delay:300}}},M=b.uniqBy(X,t=>t["Item Type"]),n=t=>{const m="Item Type",p="Unit Price",d="Unit Cost";return i.jsxs(Y,{data:M,plotMargin:{left:30,right:10,top:10,bottom:30},width:800,height:500,theme:t.theme,children:[i.jsx(A,{fields:[p,d]}),i.jsx(w,{fields:[m],scaleType:"band",showGridlines:!1}),i.jsx(U,{x:m,ys:[p,d],grouped:!0})]})},e=n.bind({});e.storyName="Light (Default)";e.args={theme:a.light};const r=n.bind({});r.storyName="Dark";r.args={theme:a.dark};const s=n.bind({});s.storyName="Theme 1";s.args={theme:{...a.dark,background:"#F3F1E5",axis:{stroke:"#969495"},gridlines:{stroke:"#969495"},series:{colors:["#2FC2AF","#433F3E"]}}};const o=n.bind({});o.storyName="Theme 2";o.args={theme:{...a.dark,background:"#000000",axis:{stroke:"#FFFFFF",strokeOpacity:1,strokeWidth:2},droplines:{strokeWidth:5,strokeDasharray:8},gridlines:{stroke:"#FFFFFF",strokeOpacity:.2,strokeWidth:3},series:{opacity:.7,selectedOpacity:1,colors:["#682B8F","#FF8B35"]}}};var h,c,l;e.parameters={...e.parameters,docs:{...(h=e.parameters)==null?void 0:h.docs,source:{originalSource:`args => {
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
}`,...(u=(g=r.parameters)==null?void 0:g.docs)==null?void 0:u.source}}};var x,f,T;s.parameters={...s.parameters,docs:{...(x=s.parameters)==null?void 0:x.docs,source:{originalSource:`args => {
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
}`,...(T=(f=s.parameters)==null?void 0:f.docs)==null?void 0:T.source}}};var C,F,k;o.parameters={...o.parameters,docs:{...(C=o.parameters)==null?void 0:C.docs,source:{originalSource:`args => {
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
}`,...(k=(F=o.parameters)==null?void 0:F.docs)==null?void 0:k.source}}};const kt=["LightTheme","DarkTheme","Theme1","Theme2"];export{r as DarkTheme,e as LightTheme,s as Theme1,o as Theme2,kt as __namedExportsOrder,Ft as default};
//# sourceMappingURL=Theme.stories-BU_KWf4d.js.map
