import{j as i}from"./jsx-runtime-vNq4Oc-g.js";import{l as b}from"./index-CnLlP05v.js";import{t as a}from"./Provider--AC3n3ro.js";import{s as X}from"./sales_records_dataset-6YEpZKGQ.js";import"./index-2EgrradX.js";import{X as Y}from"./index-H7nlrqdg.js";import{Y as A}from"./YAxis-EYrVkw1t.js";import{X as w}from"./XAxis-r21t602H.js";import{C as U}from"./Columns-GXlf9bAA.js";import"./index-4g5l5LRQ.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./index-jmm5gWkb.js";import"./index-azpHdaSR.js";import"./Lines-zns-_vZ9.js";import"./Scatters-UnyHYjD2.js";import"./index-CTVlSsFV.js";import"./useStore-5GkWK8oz.js";import"./index-K4Hn1GGT.js";import"./defaultLocale-4fp4Qluw.js";import"./renderCanvas-mvVrqX_A.js";import"./interpolateMultiPath-fX-sCjeh.js";import"./array-5Vj4K6aY.js";import"./index-ibNuBTkY.js";import"./Areas-FRBGw0vI.js";import"./ensureNoScaleOverflow-0H3eBhJa.js";import"./Bars-lINfJt2r.js";import"./getParentKey-EyapHLH0.js";import"./index-7Eg7ybPU.js";import"./defaultLocale-RGkPOkAo.js";import"./index-rbFQVUQr.js";import"./index-3lT3xPrt.js";import"./index-N5QiI7wA.js";import"./index-gu_448hd.js";import"./Legend-AepxjzR_.js";import"./index-qFq04NJk.js";import"./index-RAAq-Dtz.js";import"./Circle-2MkuDq74.js";import"./Line-cari06pN.js";import"./Square-_dp0HJFb.js";import"./index-A_rqIulo.js";import"./index-Xb1Ra2vk.js";import"./index-v73ZDDtW.js";import"./index--Wj4XuxC.js";import"./index-XC53K80T.js";import"./index-J4REAcBl.js";import"./JsonChart-GMbEZAhy.js";import"./index-ibvSOphJ.js";import"./index-0hCrwOlf.js";import"./Tooltip-CF66P4Pc.js";import"./index-W-Z_0x6I.js";import"./TooltipItem-SVu_bEZv.js";import"./index-rmVHmJse.js";import"./index-dosLtsPy.js";import"./index-fcJ2LOVC.js";const It={title:"Theming",parameters:{docs:{transformSource:t=>(t=t.replace(/data={\[.*?\]}/gs,"data={[ ...dataset ]}"),t=t.replaceAll(/undefined,?/g,""),t=t.replace(/^\s*\n/gm,""),t)},chromatic:{delay:300}}},j=b.uniqBy(X,t=>t["Item Type"]),n=t=>{const m="Item Type",p="Unit Price",d="Unit Cost";return i.jsxs(Y,{data:j,plotMargin:{left:30,right:10,top:10,bottom:30},width:800,height:500,theme:t.theme,children:[i.jsx(A,{fields:[p,d]}),i.jsx(w,{fields:[m],scaleType:"band",showGridlines:!1}),i.jsx(U,{x:m,ys:[p,d],grouped:!0})]})},e=n.bind({});e.storyName="Light (Default)";e.args={theme:a.light};const r=n.bind({});r.storyName="Dark";r.args={theme:a.dark};const o=n.bind({});o.storyName="Theme 1";o.args={theme:{...a.dark,background:"#F3F1E5",axis:{stroke:"#969495"},gridlines:{stroke:"#969495"},series:{colors:["#2FC2AF","#433F3E"]}}};const s=n.bind({});s.storyName="Theme 2";s.args={theme:{...a.dark,background:"#000000",axis:{stroke:"#FFFFFF",strokeOpacity:1,strokeWidth:2},droplines:{strokeWidth:5,strokeDasharray:8},gridlines:{stroke:"#FFFFFF",strokeOpacity:.2,strokeWidth:3},series:{opacity:.7,selectedOpacity:1,colors:["#682B8F","#FF8B35"]}}};var h,c,l;e.parameters={...e.parameters,docs:{...(h=e.parameters)==null?void 0:h.docs,source:{originalSource:`args => {
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
}`,...(k=(F=s.parameters)==null?void 0:F.docs)==null?void 0:k.source}}};const Dt=["LightTheme","DarkTheme","Theme1","Theme2"];export{r as DarkTheme,e as LightTheme,o as Theme1,s as Theme2,Dt as __namedExportsOrder,It as default};
//# sourceMappingURL=Theme.stories-026lsMJg.js.map
