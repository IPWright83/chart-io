import{j as i}from"./jsx-runtime-BjG_zV1W.js";import{V as a}from"./react-redux-SPeguAgb.js";import{l as b}from"./lodash-DOJiQ2Wu.js";import{s as X}from"./sales_records_dataset-WHK6HSqq.js";import"./index-hk_X2HOq.js";import{X as Y}from"./index-53SPihoZ.js";import{Y as A}from"./YAxis-BLu4jwFE.js";import{X as w}from"./XAxis-yIVuvz3U.js";import{C as U}from"./Columns-DCzCoYDu.js";import"./index-DpTt3J-R.js";import"./index-DfK4SF6L.js";import"./Lines-DLDdBXC5.js";import"./Scatters-3-avvN77.js";import"./index-9431aKHi.js";import"./index-BRXO1njn.js";import"./renderCanvas-CR85T-h9.js";import"./index-B8eXPVPV.js";import"./Areas-mZCDmN45.js";import"./Bars-B28Is7JF.js";import"./index-Ete-KSn1.js";import"./interpolateArc-BeeJJFCD.js";import"./useTooltip-BlFpqfM-.js";import"./index-cvfhMktw.js";import"./index-BBDmPaB_.js";import"./Radar-CXAo-9wZ.js";import"./interpolatePoints-DwMMV_8i.js";import"./index-CmKRTxUI.js";import"./index-BAzb9S1k.js";import"./Legend-z40re8h9.js";import"./index-Dub0Swig.js";import"./index-BmYvQTbQ.js";import"./Circle-Qf3Tu8hN.js";import"./Line-BjKan0E4.js";import"./Square-CZVurtTs.js";import"./index-9usyF_v_.js";import"./Tooltip-aPd-LmbL.js";import"./index-CRhM32cg.js";import"./TooltipItem-OfChlkFL.js";import"./index-B_99FLAR.js";import"./RadialAreas-3Hf8RTIB.js";import"./index-B-3-hfbS.js";import"./index-CvJ_dlQX.js";import"./index-B6Lr3Qa8.js";import"./index-BLxOKznu.js";import"./index-DxXlV5JW.js";import"./LabelsPlot-Co4tuujP.js";import"./LinksPlot-EyWHfZA0.js";import"./NodesPlot-BCoyNFhJ.js";import"./index-DPqJA-7V.js";import"./index-BInKuQeD.js";import"./index-Cl-eCd-x.js";import"./index-DnRZR6m4.js";import"./index-DwL5j-mS.js";import"./index-Dd_IEiRF.js";import"./index-sBPFWXw6.js";import"./index-yAu6bW1V.js";import"./index-Bdes0qwq.js";import"./index-DhP8WHXK.js";import"./index-3tf1K2oi.js";import"./index-BLHBaSmk.js";import"./index-CGJDsSgY.js";import"./index-Bat0u2Jd.js";import"./index-Bst5UcPv.js";import"./JsonChart-Bk8HP8Mx.js";import"./index-CErv1lK-.js";import"./index-rx8DGN-B.js";const Wt={title:"Theming",parameters:{docs:{transformSource:t=>(t=t.replace(/data={\[.*?\]}/gs,"data={[ ...dataset ]}"),t=t.replaceAll(/undefined,?/g,""),t=t.replace(/^\s*\n/gm,""),t)},chromatic:{delay:300}}},j=b.uniqBy(X,t=>t["Item Type"]),m=t=>{const n="Item Type",p="Unit Price",d="Unit Cost";return i.jsxs(Y,{data:j,plotMargin:{left:30,right:10,top:10,bottom:30},width:800,height:500,theme:t.theme,children:[i.jsx(A,{fields:[p,d]}),i.jsx(w,{fields:[n],scaleType:"band",showGridlines:!1}),i.jsx(U,{x:n,ys:[p,d],grouped:!0})]})},r=m.bind({});r.storyName="Light (Default)";r.args={theme:a.light};const e=m.bind({});e.storyName="Dark";e.args={theme:a.dark};const o=m.bind({});o.storyName="Theme 1";o.args={theme:{...a.dark,background:"#F3F1E5",axis:{stroke:"#969495"},gridlines:{stroke:"#969495"},series:{colors:["#2FC2AF","#433F3E"]}}};const s=m.bind({});s.storyName="Theme 2";s.args={theme:{...a.dark,background:"#000000",axis:{stroke:"#FFFFFF",strokeOpacity:1,strokeWidth:2},droplines:{strokeWidth:5,strokeDasharray:8},gridlines:{stroke:"#FFFFFF",strokeOpacity:.2,strokeWidth:3},series:{opacity:.7,selectedOpacity:1,colors:["#682B8F","#FF8B35"]}}};var h,c,l;r.parameters={...r.parameters,docs:{...(h=r.parameters)==null?void 0:h.docs,source:{originalSource:`args => {
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
}`,...(l=(c=r.parameters)==null?void 0:c.docs)==null?void 0:l.source}}};var y,g,u;e.parameters={...e.parameters,docs:{...(y=e.parameters)==null?void 0:y.docs,source:{originalSource:`args => {
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
}`,...(u=(g=e.parameters)==null?void 0:g.docs)==null?void 0:u.source}}};var x,f,T;o.parameters={...o.parameters,docs:{...(x=o.parameters)==null?void 0:x.docs,source:{originalSource:`args => {
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
}`,...(k=(F=s.parameters)==null?void 0:F.docs)==null?void 0:k.source}}};const Vt=["LightTheme","DarkTheme","Theme1","Theme2"];export{e as DarkTheme,r as LightTheme,o as Theme1,s as Theme2,Vt as __namedExportsOrder,Wt as default};
//# sourceMappingURL=Theme.stories-BRXSUu5j.js.map
