import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{J as m,y as v,k as c,Q as Y}from"./index.es-DoiyW41S.js";import{a as b}from"./index-CFMwmiIJ.js";import{r as D}from"./index-DpTt3J-R.js";import{a as B,u as l}from"./react-redux-lkBMRsz6.js";import{w as M}from"./renderChart-DJ6bXfoi.js";import"./index-CBSNT1TE.js";import"./index-B6be1P4a.js";import{X as k}from"./index-DMa6aJSy.js";import{C as E}from"./ContextMenu-Dkh4zLYP.js";import{C as S}from"./index-CaWU7ljP.js";import{Y as w}from"./YAxis-CRYvaCDj.js";import{X as j}from"./XAxis-CgOaLwq3.js";import{B as X}from"./Bars-gIikB3lP.js";import"./test-utils-C-DEfvFY.js";import"./index-D5nvoAmD.js";import"./client-CbGTh6y2.js";import"./index-VyfXoxD0.js";import"./index-5Gl1ki1p.js";import"./index-DzcEfe_2.js";import"./calculateScale-CBIGWBP9.js";import"./index-DVqBs4fh.js";import"./index-C8nU8Xpn.js";import"./index-DC1bvwxr.js";import"./index-Gn9jQ5lq.js";import"./lodash-DOJiQ2Wu.js";import"./index-HNMvlCFe.js";import"./index-DVRV05yR.js";import"./index-CsGapHqM.js";import"./index-CFwzIhDn.js";import"./Legend-DQjp6Mmo.js";import"./index-Bp2RIjag.js";import"./index-BmYvQTbQ.js";import"./Circle-Qf3Tu8hN.js";import"./Line-BjKan0E4.js";import"./Square-CZVurtTs.js";import"./index-BkBTUWQV.js";import"./index-CCgpevYr.js";import"./index-DVli7D7_.js";import"./Tooltip-aFreqMLS.js";import"./index-iwe53Xj-.js";import"./TooltipItem-D41oQ2An.js";import"./index-Dn87vz0y.js";import"./renderCanvas-DSAxZURY.js";const je={title:"Components/ContextMenuOverlay",component:S,parameters:{chromatic:{delay:300}}},O=[{category:"Fruit",value:42},{category:"Vegetables",value:68},{category:"Grains",value:35},{category:"Dairy",value:51}],s={name:"Right-Click the Background",render:()=>e.jsxs(k,{data:O,width:500,height:350,theme:m.light,children:[e.jsx(w,{fields:["category"],scaleType:"band",showGridlines:!1}),e.jsx(j,{fields:["value"]}),e.jsx(X,{x:"value",y:"category",color:"#99C1DC"})]}),play:async({canvasElement:t})=>{await M(300);const n=t.querySelector("svg");b.contextMenu(n,{bubbles:!0,clientX:300,clientY:150})}};function A(){const t=B(),n=l(o=>c.contextMenu.isOpen(o)),r=l(o=>c.contextMenu.position(o)),p=l(o=>c.contextMenu.context(o)),a=()=>t(v.closeContextMenu());return e.jsx(E,{x:(r==null?void 0:r.x)??0,y:(r==null?void 0:r.y)??0,open:n,items:Y(),colors:m.light.menu,onSelect:o=>{o.onSelect(t,p),a()},onClose:a})}function R(){const t=D.useRef(),n=(r,p,a)=>{t.current&&t.current.dispatch(v.openContextMenu({x:a.clientX,y:a.clientY,context:{type:"datum",datum:r}}))};return e.jsxs(k,{data:O,width:500,height:350,theme:m.light,contextMenu:!1,onClick:n,onStoreCreated:r=>{t.current=r},children:[e.jsx(w,{fields:["category"],scaleType:"band",showGridlines:!1}),e.jsx(j,{fields:["value"]}),e.jsx(X,{x:"value",y:"category",color:"#fc998e"}),e.jsx(A,{})]})}const i={name:"Click a Bar",render:()=>e.jsx(R,{}),play:async({canvasElement:t})=>{await M(300);const n=t.querySelector("rect.bar");b.click(n,{bubbles:!0,clientX:300,clientY:150})}};var u,d,x,y,h;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
  name: "Right-Click the Background",
  render: () => <XYChart data={data} width={500} height={350} theme={themes.light}>
            <YAxis fields={["category"]} scaleType="band" showGridlines={false} />
            <XAxis fields={["value"]} />
            <Bar x="value" y="category" color="#99C1DC" />
        </XYChart>,
  play: async ({
    canvasElement
  }) => {
    await wait(300);
    const svg = canvasElement.querySelector("svg");
    fireEvent.contextMenu(svg, {
      bubbles: true,
      clientX: 300,
      clientY: 150
    });
  }
}`,...(x=(d=s.parameters)==null?void 0:d.docs)==null?void 0:x.source},description:{story:"`<XYChart>`/`<RadialChart>` enable `<ContextMenuOverlay>` by default (see their `contextMenu`\nprop) - no need to add it explicitly",...(h=(y=s.parameters)==null?void 0:y.docs)==null?void 0:h.description}}};var f,g,C;i.parameters={...i.parameters,docs:{...(f=i.parameters)==null?void 0:f.docs,source:{originalSource:`{
  name: "Click a Bar",
  render: () => <DatumMenuDemo />,
  play: async ({
    canvasElement
  }) => {
    await wait(300);
    const bar = canvasElement.querySelector("rect.bar");
    fireEvent.click(bar, {
      bubbles: true,
      clientX: 300,
      clientY: 150
    });
  }
}`,...(C=(g=i.parameters)==null?void 0:g.docs)==null?void 0:C.source}}};const Xe=["OnChartBackground","OnADataPoint"];export{i as OnADataPoint,s as OnChartBackground,Xe as __namedExportsOrder,je as default};
//# sourceMappingURL=ContextMenuOverlay.stories-DGwdvXi-.js.map
