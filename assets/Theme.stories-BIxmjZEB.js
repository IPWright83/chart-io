import{j as i}from"./jsx-runtime-BjG_zV1W.js";import{k as a}from"./react-redux-BIxttMao.js";import{l as b}from"./lodash-DOJiQ2Wu.js";import{s as X}from"./sales_records_dataset-WHK6HSqq.js";import"./index-DHjc8n8F.js";import{X as Y}from"./index-OT6NwBHW.js";import{Y as A}from"./YAxis-PGCYKAdu.js";import{X as w}from"./XAxis-D7Bs4h5a.js";import{C as U}from"./Columns-C6MdJ0W5.js";import"./index-DpTt3J-R.js";import"./index-Bl9paP-p.js";import"./Lines-7z9s4wNn.js";import"./Scatters-CWMQ6d13.js";import"./index-DrZFwq_W.js";import"./index-DnlDykCR.js";import"./renderCanvas-DgN6C2Td.js";import"./index-D6EDLvj9.js";import"./Areas-YrYkQUqw.js";import"./Bars-CbRSn-69.js";import"./index-CaZ68rVx.js";import"./interpolateArc-C5p3tsSp.js";import"./useTooltip-3W5NWBIO.js";import"./index-Bitjf20_.js";import"./Radar-BIVuLbZS.js";import"./index-BrTJ4RzG.js";import"./index-Bd68MpUk.js";import"./index-Dr9RXvgl.js";import"./index-DDyQNOMu.js";import"./index-CWwNrbNA.js";import"./index-BqtyGhDH.js";import"./index-9P8qsy9Z.js";import"./index-C_mwV-nm.js";import"./index-CZ4pHQb2.js";import"./Legend-DQ9XwNwf.js";import"./index-BVPNhhj4.js";import"./index-BmYvQTbQ.js";import"./Circle-Qf3Tu8hN.js";import"./Line-BjKan0E4.js";import"./Square-CZVurtTs.js";import"./index-Q6O9tYEF.js";import"./index-DSMIYGhk.js";import"./Tooltip-BrSlbkqa.js";import"./index-CIJ69QRa.js";import"./TooltipItem-C8j0DJCa.js";import"./index-BZCcI5Qt.js";import"./index-DoNFvadr.js";import"./index-sMHBXfkq.js";import"./index-CZdmoXDL.js";import"./index-Bslg3-kY.js";import"./index-dgjSRpfb.js";import"./JsonChart-DTo_XfKa.js";import"./index-BljJ1e5J.js";import"./index-C2WdQQJ3.js";const jt={title:"Theming",parameters:{docs:{transformSource:t=>(t=t.replace(/data={\[.*?\]}/gs,"data={[ ...dataset ]}"),t=t.replaceAll(/undefined,?/g,""),t=t.replace(/^\s*\n/gm,""),t)},chromatic:{delay:300}}},j=b.uniqBy(X,t=>t["Item Type"]),n=t=>{const m="Item Type",p="Unit Price",d="Unit Cost";return i.jsxs(Y,{data:j,plotMargin:{left:30,right:10,top:10,bottom:30},width:800,height:500,theme:t.theme,children:[i.jsx(A,{fields:[p,d]}),i.jsx(w,{fields:[m],scaleType:"band",showGridlines:!1}),i.jsx(U,{x:m,ys:[p,d],grouped:!0})]})},e=n.bind({});e.storyName="Light (Default)";e.args={theme:a.light};const r=n.bind({});r.storyName="Dark";r.args={theme:a.dark};const o=n.bind({});o.storyName="Theme 1";o.args={theme:{...a.dark,background:"#F3F1E5",axis:{stroke:"#969495"},gridlines:{stroke:"#969495"},series:{colors:["#2FC2AF","#433F3E"]}}};const s=n.bind({});s.storyName="Theme 2";s.args={theme:{...a.dark,background:"#000000",axis:{stroke:"#FFFFFF",strokeOpacity:1,strokeWidth:2},droplines:{strokeWidth:5,strokeDasharray:8},gridlines:{stroke:"#FFFFFF",strokeOpacity:.2,strokeWidth:3},series:{opacity:.7,selectedOpacity:1,colors:["#682B8F","#FF8B35"]}}};var h,c,l;e.parameters={...e.parameters,docs:{...(h=e.parameters)==null?void 0:h.docs,source:{originalSource:`args => {
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
}`,...(T=(f=o.parameters)==null?void 0:f.docs)==null?void 0:T.source}}};var C,k,F;s.parameters={...s.parameters,docs:{...(C=s.parameters)==null?void 0:C.docs,source:{originalSource:`args => {
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
}`,...(F=(k=s.parameters)==null?void 0:k.docs)==null?void 0:F.source}}};const It=["LightTheme","DarkTheme","Theme1","Theme2"];export{r as DarkTheme,e as LightTheme,o as Theme1,s as Theme2,It as __namedExportsOrder,jt as default};
//# sourceMappingURL=Theme.stories-BIxmjZEB.js.map
