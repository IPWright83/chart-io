import{j as i}from"./jsx-runtime-BjG_zV1W.js";import{J as m}from"./index.es-DoiyW41S.js";import{l as b}from"./lodash-DOJiQ2Wu.js";import{s as X}from"./sales_records_dataset-WHK6HSqq.js";import"./index-Bb4cVd6Q.js";import{X as Y}from"./index-DMa6aJSy.js";import{Y as A}from"./YAxis-CRYvaCDj.js";import{X as w}from"./XAxis-CgOaLwq3.js";import{C as M}from"./Columns-BwyQb29h.js";import"./index-DpTt3J-R.js";import"./index-Cd3EKKNL.js";import"./Lines-B6-CZOIj.js";import"./Scatters-CtuKNgxe.js";import"./react-redux-lkBMRsz6.js";import"./index-DzcEfe_2.js";import"./index-5Gl1ki1p.js";import"./renderCanvas-DSAxZURY.js";import"./index-u8wY-fXO.js";import"./Areas-BBI5eHNA.js";import"./index-B6be1P4a.js";import"./Bars-gIikB3lP.js";import"./index-CE94rE7I.js";import"./interpolateArc-BeeJJFCD.js";import"./useTooltip-B4jsLD3t.js";import"./index-1M3q30jN.js";import"./index-DrWhuguZ.js";import"./Radar-CN15cyaY.js";import"./interpolatePoints-DwMMV_8i.js";import"./index-CQRKux3Q.js";import"./index-Gn9jQ5lq.js";import"./index-CFwzIhDn.js";import"./Legend-DQjp6Mmo.js";import"./index-Bp2RIjag.js";import"./index-BmYvQTbQ.js";import"./Circle-Qf3Tu8hN.js";import"./Line-BjKan0E4.js";import"./Square-CZVurtTs.js";import"./index-DVli7D7_.js";import"./Tooltip-aFreqMLS.js";import"./index-iwe53Xj-.js";import"./TooltipItem-D41oQ2An.js";import"./index-fTNMVVp7.js";import"./RadialAreas-DY8RWhRu.js";import"./index-CBcXhfcM.js";import"./index-vFMZ7B83.js";import"./index-D1GbqKuK.js";import"./index-CaWU7ljP.js";import"./ContextMenu-Dkh4zLYP.js";import"./index-D5nvoAmD.js";import"./index-CsGapHqM.js";import"./index-BkBTUWQV.js";import"./LabelsPlot-C9OJe8VL.js";import"./LinksPlot-CoPVhndq.js";import"./NodesPlot-cB_M2zll.js";import"./index-Cw8P14OC.js";import"./index-DKCuWQPk.js";import"./index-BO0R6WYt.js";import"./index-CV3FwEcA.js";import"./index-DC1bvwxr.js";import"./calculateScale-CBIGWBP9.js";import"./index-DaTy74M5.js";import"./index-CBSNT1TE.js";import"./index-VyfXoxD0.js";import"./index-DVqBs4fh.js";import"./index-C8nU8Xpn.js";import"./index-DVRV05yR.js";import"./index-HNMvlCFe.js";import"./index-DG7nEBGO.js";import"./index-qlwqufkG.js";import"./index-VkI0TnhY.js";import"./index-DRUZ2D2R.js";import"./index-Q1UG5Y4D.js";import"./JsonChart-CsR6MqHu.js";import"./index-CCgpevYr.js";import"./index-Dn87vz0y.js";const Vt={title:"Theming",parameters:{docs:{transformSource:t=>(t=t.replace(/data={\[.*?\]}/gs,"data={[ ...dataset ]}"),t=t.replaceAll(/undefined,?/g,""),t=t.replace(/^\s*\n/gm,""),t)},chromatic:{delay:300}}},U=b.uniqBy(X,t=>t["Item Type"]),a=t=>{const n="Item Type",p="Unit Price",d="Unit Cost";return i.jsxs(Y,{contextMenu:!1,data:U,plotMargin:{left:30,right:10,top:10,bottom:30},width:800,height:500,theme:t.theme,children:[i.jsx(A,{fields:[p,d]}),i.jsx(w,{fields:[n],scaleType:"band",showGridlines:!1}),i.jsx(M,{x:n,ys:[p,d],grouped:!0})]})},r=a.bind({});r.storyName="Light (Default)";r.args={theme:m.light};const e=a.bind({});e.storyName="Dark";e.args={theme:m.dark};const o=a.bind({});o.storyName="Theme 1";o.args={theme:{...m.dark,background:"#F3F1E5",axis:{stroke:"#969495"},gridlines:{stroke:"#969495"},series:{colors:["#2FC2AF","#433F3E"]}}};const s=a.bind({});s.storyName="Theme 2";s.args={theme:{...m.dark,background:"#000000",axis:{stroke:"#FFFFFF",strokeOpacity:1,strokeWidth:2},droplines:{strokeWidth:5,strokeDasharray:8},gridlines:{stroke:"#FFFFFF",strokeOpacity:.2,strokeWidth:3},series:{opacity:.7,selectedOpacity:1,colors:["#682B8F","#FF8B35"]}}};var c,h,l;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`args => {
  const x = "Item Type";
  const y = "Unit Price";
  const y2 = "Unit Cost";
  return <XYChart contextMenu={false} data={data} plotMargin={{
    left: 30,
    right: 10,
    top: 10,
    bottom: 30
  }} width={800} height={500} theme={args.theme}>
      <YAxis fields={[y, y2]} />
      <XAxis fields={[x]} scaleType="band" showGridlines={false} />
      <Columns x={x} ys={[y, y2]} grouped={true} />
    </XYChart>;
}`,...(l=(h=r.parameters)==null?void 0:h.docs)==null?void 0:l.source}}};var y,g,u;e.parameters={...e.parameters,docs:{...(y=e.parameters)==null?void 0:y.docs,source:{originalSource:`args => {
  const x = "Item Type";
  const y = "Unit Price";
  const y2 = "Unit Cost";
  return <XYChart contextMenu={false} data={data} plotMargin={{
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
  return <XYChart contextMenu={false} data={data} plotMargin={{
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
  return <XYChart contextMenu={false} data={data} plotMargin={{
    left: 30,
    right: 10,
    top: 10,
    bottom: 30
  }} width={800} height={500} theme={args.theme}>
      <YAxis fields={[y, y2]} />
      <XAxis fields={[x]} scaleType="band" showGridlines={false} />
      <Columns x={x} ys={[y, y2]} grouped={true} />
    </XYChart>;
}`,...(k=(F=s.parameters)==null?void 0:F.docs)==null?void 0:k.source}}};const Zt=["LightTheme","DarkTheme","Theme1","Theme2"];export{e as DarkTheme,r as LightTheme,o as Theme1,s as Theme2,Zt as __namedExportsOrder,Vt as default};
//# sourceMappingURL=Theme.stories-Du8IOQ1u.js.map
