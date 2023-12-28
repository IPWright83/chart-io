import{j as t}from"./jsx-runtime-vNq4Oc-g.js";import"./index-CnLlP05v.js";import{l as k}from"./index-CTVlSsFV.js";import{r as a}from"./index-4g5l5LRQ.js";import{e as T}from"./example_dataset-9KkeoQ7M.js";import"./index-2EgrradX.js";import{a as C}from"./Lines-zns-_vZ9.js";import{X as h}from"./index-H7nlrqdg.js";import{Y as d}from"./YAxis-EYrVkw1t.js";import{X as l}from"./XAxis-r21t602H.js";import{a as m}from"./Areas-FRBGw0vI.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./index-jmm5gWkb.js";import"./Provider--AC3n3ro.js";import"./defaultLocale-RGkPOkAo.js";import"./index-azpHdaSR.js";import"./index-ibNuBTkY.js";import"./Columns-GXlf9bAA.js";import"./getParentKey-EyapHLH0.js";import"./index-K4Hn1GGT.js";import"./defaultLocale-4fp4Qluw.js";import"./useStore-5GkWK8oz.js";import"./renderCanvas-mvVrqX_A.js";import"./ensureNoScaleOverflow-0H3eBhJa.js";import"./array-5Vj4K6aY.js";import"./Bars-lINfJt2r.js";import"./index-7Eg7ybPU.js";import"./index-rbFQVUQr.js";import"./index-3lT3xPrt.js";import"./index-N5QiI7wA.js";import"./index-gu_448hd.js";import"./Legend-AepxjzR_.js";import"./index-qFq04NJk.js";import"./index-RAAq-Dtz.js";import"./Circle-2MkuDq74.js";import"./Line-cari06pN.js";import"./Square-_dp0HJFb.js";import"./index-A_rqIulo.js";import"./index-Xb1Ra2vk.js";import"./index-v73ZDDtW.js";import"./index--Wj4XuxC.js";import"./index-XC53K80T.js";import"./index-J4REAcBl.js";import"./JsonChart-GMbEZAhy.js";import"./Scatters-UnyHYjD2.js";import"./interpolateMultiPath-fX-sCjeh.js";import"./index-ibvSOphJ.js";import"./index-0hCrwOlf.js";import"./Tooltip-CF66P4Pc.js";import"./index-W-Z_0x6I.js";import"./TooltipItem-SVu_bEZv.js";import"./index-rmVHmJse.js";import"./index-dosLtsPy.js";import"./index-fcJ2LOVC.js";function N(e=[],g=/EVENT\.MOUSE*/){const S=[],p=r=>s=>{let o=s.type;if(s.type==="PERFORM_ACTION"&&(o=s==null?void 0:s.action.type),o&&o.match(g)){S.forEach(c=>c(s));return}r(s)},n=r=>{const s=r.liftedStore??r;if(!s)return;s.chartItOverride&&k("E008","The linkStores() function can strictly only be called once during initialisation");const o=s.dispatch;S.push(o),s.dispatch=p(o),s.chartItOverride=!0};e.forEach(r=>n(r))}const Bt={title:"Dashboards",component:C,parameters:{docs:{transformSource:e=>(e=e.replace(/data={\[.*?\]}/gs,"data={[ ...dataset ]}"),e=e.replaceAll(/undefined,?/g,""),e=e.replace(/^\s*\n/gm,""),e)},chromatic:{delay:300}}},R=e=>{const g="Month",S=e.filter(n=>["Aperture","Black Mesa"].includes(n.Owner)).reduce((n,r)=>{const s=n[r[g]]||{};for(let o in r)typeof r[o]=="number"?(s[o]=s[o]||0,s[o]+=r[o]):s[o]=r[o];return n[r[g]]=s,n},{});return Object.keys(S).flatMap(n=>({[g]:new Date(n),...S[n]}))},F=e=>{const[p,n]=a.useState(),[r,s]=a.useState(),[o,c]=a.useState(),[x,D]=a.useState(),[f,b]=a.useState(),[M,E]=a.useState(),[y,O]=a.useState(),[j,U]=a.useState(),[w,V]=a.useState(),[v,G]=a.useState(),[X,_]=a.useState(),[Y,L]=a.useState();a.useEffect(()=>{p&&r&&o&&x&&f&&M&&y&&j&&w&&v&&X&&Y&&N([p,r,o,x,f,M,y,j,w,v,X,Y])},[p,r,o,x,f,M,y,j,w,v,X,Y]);const i=R(T);return t.jsxs("div",{children:[t.jsxs(h,{data:i,useCanvas:e.useCanvas,plotMargin:e.margin,width:400,height:300,onStoreCreated:n,children:[t.jsx(C,{x:"Month",y:"Unit Sales"}),t.jsx(d,{fields:["Unit Sales"]}),t.jsx(l,{fields:["Month"]})]}),t.jsxs(h,{data:i,useCanvas:e.useCanvas,plotMargin:e.margin,width:400,height:300,onStoreCreated:s,children:[t.jsx(m,{x:"Month",y:"Sales Value"}),t.jsx(d,{fields:["Sales Value"]}),t.jsx(l,{fields:["Month"]})]}),t.jsxs(h,{data:i,useCanvas:e.useCanvas,plotMargin:e.margin,width:400,height:300,onStoreCreated:c,children:[t.jsx(C,{x:"Month",y:"Cost of Sales"}),t.jsx(d,{fields:["Cost of Sales"]}),t.jsx(l,{fields:["Month"]})]}),t.jsxs(h,{data:i,useCanvas:e.useCanvas,plotMargin:e.margin,width:400,height:300,onStoreCreated:D,children:[t.jsx(m,{x:"Month",y:"Price"}),t.jsx(d,{fields:["Price"]}),t.jsx(l,{fields:["Month"]})]}),t.jsxs(h,{data:i,useCanvas:e.useCanvas,plotMargin:e.margin,width:400,height:300,onStoreCreated:b,children:[t.jsx(C,{x:"Month",y:"Gross Profit"}),t.jsx(d,{fields:["Gross Profit"]}),t.jsx(l,{fields:["Month"]})]}),t.jsxs(h,{data:i,useCanvas:e.useCanvas,plotMargin:e.margin,width:400,height:300,onStoreCreated:E,children:[t.jsx(m,{x:"Month",y:"Indirect Costs"}),t.jsx(d,{fields:["Indirect Costs"]}),t.jsx(l,{fields:["Month"]})]}),t.jsxs(h,{data:i,useCanvas:e.useCanvas,plotMargin:e.margin,width:400,height:300,onStoreCreated:O,children:[t.jsx(m,{x:"Month",y:"Operating Profit"}),t.jsx(d,{fields:["Operating Profit"]}),t.jsx(l,{fields:["Month"]})]}),t.jsxs(h,{data:i,useCanvas:e.useCanvas,plotMargin:e.margin,width:400,height:300,onStoreCreated:U,children:[t.jsx(C,{x:"Month",y:"Unit Sales Monthly Change"}),t.jsx(d,{fields:["Unit Sales Monthly Change"]}),t.jsx(l,{fields:["Month"]})]}),t.jsxs(h,{data:i,useCanvas:e.useCanvas,plotMargin:e.margin,width:400,height:300,onStoreCreated:V,children:[t.jsx(m,{x:"Month",y:"Sales Value Monthly Change"}),t.jsx(d,{fields:["Sales Value Monthly Change"]}),t.jsx(l,{fields:["Month"]})]}),t.jsxs(h,{data:i,useCanvas:e.useCanvas,plotMargin:e.margin,width:400,height:300,onStoreCreated:G,children:[t.jsx(C,{x:"Month",y:"Distribution Monthly Change"}),t.jsx(d,{fields:["Distribution Monthly Change"]}),t.jsx(l,{fields:["Month"]})]}),t.jsxs(h,{data:i,useCanvas:e.useCanvas,plotMargin:e.margin,width:400,height:300,onStoreCreated:_,children:[t.jsx(m,{x:"Month",y:"Price Monthly Change"}),t.jsx(d,{fields:["Price Monthly Change"]}),t.jsx(l,{fields:["Month"]})]}),t.jsxs(h,{data:i,useCanvas:e.useCanvas,plotMargin:e.margin,width:400,height:300,onStoreCreated:L,children:[t.jsx(C,{x:"Month",y:"Gross Profit Monthly Change"}),t.jsx(d,{fields:["Gross Profit Monthly Change"]}),t.jsx(l,{fields:["Month"]})]})]})},u=F.bind({});u.storyName="Dashboard";u.args={useCanvas:!1,width:800,height:500,animationDuration:500,color:"#99C1DC",theme:"light",margin:{left:80,right:40,top:40,bottom:40}};var A,P,I;u.parameters={...u.parameters,docs:{...(A=u.parameters)==null?void 0:A.docs,source:{originalSource:`args => {
  const width = 400;
  const height = 300;
  const [store1, setStore1] = useState<IStore>();
  const [store2, setStore2] = useState<IStore>();
  const [store3, setStore3] = useState<IStore>();
  const [store4, setStore4] = useState<IStore>();
  const [store5, setStore5] = useState<IStore>();
  const [store6, setStore6] = useState<IStore>();
  const [store7, setStore7] = useState<IStore>();
  const [store8, setStore8] = useState<IStore>();
  const [store9, setStore9] = useState<IStore>();
  const [store10, setStore10] = useState<IStore>();
  const [store11, setStore11] = useState<IStore>();
  const [store12, setStore12] = useState<IStore>();
  useEffect(() => {
    if (store1 && store2 && store3 && store4 && store5 && store6 && store7 && store8 && store9 && store10 && store11 && store12) {
      linkStores([store1, store2, store3, store4, store5, store6, store7, store8, store9, store10, store11, store12]);
    }
  }, [store1, store2, store3, store4, store5, store6, store7, store8, store9, store10, store11, store12]);
  const data = processData(example_dataset);
  return <div>
            <XYChart data={data} useCanvas={args.useCanvas} plotMargin={args.margin} width={width} height={height} onStoreCreated={setStore1}>
                <Line x="Month" y="Unit Sales" />
                <YAxis fields={["Unit Sales"]} />
                <XAxis fields={["Month"]} />
            </XYChart>
            <XYChart data={data} useCanvas={args.useCanvas} plotMargin={args.margin} width={width} height={height} onStoreCreated={setStore2}>
                <Area x="Month" y="Sales Value" />
                <YAxis fields={["Sales Value"]} />
                <XAxis fields={["Month"]} />
            </XYChart>
            <XYChart data={data} useCanvas={args.useCanvas} plotMargin={args.margin} width={width} height={height} onStoreCreated={setStore3}>
                <Line x="Month" y="Cost of Sales" />
                <YAxis fields={["Cost of Sales"]} />
                <XAxis fields={["Month"]} />
            </XYChart>
            <XYChart data={data} useCanvas={args.useCanvas} plotMargin={args.margin} width={width} height={height} onStoreCreated={setStore4}>
                <Area x="Month" y="Price" />
                <YAxis fields={["Price"]} />
                <XAxis fields={["Month"]} />
            </XYChart>
            <XYChart data={data} useCanvas={args.useCanvas} plotMargin={args.margin} width={width} height={height} onStoreCreated={setStore5}>
                <Line x="Month" y="Gross Profit" />
                <YAxis fields={["Gross Profit"]} />
                <XAxis fields={["Month"]} />
            </XYChart>
            <XYChart data={data} useCanvas={args.useCanvas} plotMargin={args.margin} width={width} height={height} onStoreCreated={setStore6}>
                <Area x="Month" y="Indirect Costs" />
                <YAxis fields={["Indirect Costs"]} />
                <XAxis fields={["Month"]} />
            </XYChart>
            <XYChart data={data} useCanvas={args.useCanvas} plotMargin={args.margin} width={width} height={height} onStoreCreated={setStore7}>
                <Area x="Month" y="Operating Profit" />
                <YAxis fields={["Operating Profit"]} />
                <XAxis fields={["Month"]} />
            </XYChart>
            <XYChart data={data} useCanvas={args.useCanvas} plotMargin={args.margin} width={width} height={height} onStoreCreated={setStore8}>
                <Line x="Month" y="Unit Sales Monthly Change" />
                <YAxis fields={["Unit Sales Monthly Change"]} />
                <XAxis fields={["Month"]} />
            </XYChart>
            <XYChart data={data} useCanvas={args.useCanvas} plotMargin={args.margin} width={width} height={height} onStoreCreated={setStore9}>
                <Area x="Month" y="Sales Value Monthly Change" />
                <YAxis fields={["Sales Value Monthly Change"]} />
                <XAxis fields={["Month"]} />
            </XYChart>
            <XYChart data={data} useCanvas={args.useCanvas} plotMargin={args.margin} width={width} height={height} onStoreCreated={setStore10}>
                <Line x="Month" y="Distribution Monthly Change" />
                <YAxis fields={["Distribution Monthly Change"]} />
                <XAxis fields={["Month"]} />
            </XYChart>
            <XYChart data={data} useCanvas={args.useCanvas} plotMargin={args.margin} width={width} height={height} onStoreCreated={setStore11}>
                <Area x="Month" y="Price Monthly Change" />
                <YAxis fields={["Price Monthly Change"]} />
                <XAxis fields={["Month"]} />
            </XYChart>
            <XYChart data={data} useCanvas={args.useCanvas} plotMargin={args.margin} width={width} height={height} onStoreCreated={setStore12}>
                <Line x="Month" y="Gross Profit Monthly Change" />
                <YAxis fields={["Gross Profit Monthly Change"]} />
                <XAxis fields={["Month"]} />
            </XYChart>
        </div>;
}`,...(I=(P=u.parameters)==null?void 0:P.docs)==null?void 0:I.source}}};const qt=["Dashboard"];export{u as Dashboard,qt as __namedExportsOrder,Bt as default};
//# sourceMappingURL=Dashboards.stories-B47A34OY.js.map
