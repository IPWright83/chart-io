import{j as i}from"./jsx-runtime-BjG_zV1W.js";import{u as E,n as X,l as s}from"./react-redux-BIxttMao.js";import{r as u}from"./index-DpTt3J-R.js";import{C as V}from"./index-CWwNrbNA.js";import{A as _,X as R}from"./index-Bd68MpUk.js";import"./index-Dr9RXvgl.js";import{a as I}from"./axisData-DyH6sPTU.js";import{X as U}from"./XAxis-D7Bs4h5a.js";import"./lodash-DOJiQ2Wu.js";import"./index-DnlDykCR.js";import"./index-DrZFwq_W.js";const $={title:"Components/Axis/Customization",component:_,parameters:{docs:{transformSource:e=>(e=e.replace(/data={\[.*?\]}/gs,"data={[ ...dataset ]}"),e=e.replaceAll(/undefined,?/g,""),e=e.replace(/^\s*\n/gm,""),e)},chromatic:{delay:300}}},v=({fields:e})=>{const m=u.useRef(null),j=e[0],t=E(c=>X.scales.getScale(c,j,"plot"));return u.useEffect(()=>{if(m.current&&t){const c=s.select(m.current),H=s.timeFormat("%H:%M"),p=s.axisBottom(t).ticks(s.timeHour.every(1)).tickSizeInner(30).tickSizeOuter(30).tickFormat((y,F)=>F%3===0?H(y):null);p.scale(t),c.call(p)}},[t]),i.jsx("g",{className:"customAxis",ref:m})},B=e=>i.jsxs(V,{...e,data:I,children:[i.jsx(R,{fields:e.fields,scaleType:"time"}),i.jsx(v,{fields:e.fields})]}),l=e=>i.jsx(V,{...e,data:I,children:i.jsx(U,{fields:e.fields,tickSizeInner:e.tickSizeInner,tickSizeOuter:e.tickSizeOuter,tickPadding:e.tickPadding,showGridlines:e.showGridlines,title:e.title,position:e.position})}),n={name:"Outer Tick Size",render:l,args:{position:"bottom",fields:["integerValue"],height:100,width:800,tickSizeOuter:40,showGridlines:!1}},r={name:"Inner Tick Size",render:l,args:{position:"bottom",fields:["integerValue"],height:100,width:800,tickSizeInner:20,showGridlines:!1}},o={name:"Tick Padding",render:l,args:{position:"bottom",fields:["integerValue"],height:100,width:800,tickPadding:20,showGridlines:!1}},a={name:"Gridlines",render:l,args:{position:"bottom",fields:["integerValue"],height:200,width:800,tickPadding:20,showGridlines:!0}},d={name:"Using a Custom Axis Component",render:B,args:{position:"bottom",fields:["dateTimeValue"],height:50,width:800}};var h,g,f;n.parameters={...n.parameters,docs:{...(h=n.parameters)==null?void 0:h.docs,source:{originalSource:`{
  name: "Outer Tick Size",
  render: HorizontalAxisTemplate,
  args: {
    position: "bottom",
    fields: ["integerValue"],
    height: 100,
    width: 800,
    tickSizeOuter: 40,
    showGridlines: false
  }
}`,...(f=(g=n.parameters)==null?void 0:g.docs)==null?void 0:f.source}}};var x,k,S;r.parameters={...r.parameters,docs:{...(x=r.parameters)==null?void 0:x.docs,source:{originalSource:`{
  name: "Inner Tick Size",
  render: HorizontalAxisTemplate,
  args: {
    position: "bottom",
    fields: ["integerValue"],
    height: 100,
    width: 800,
    tickSizeInner: 20,
    showGridlines: false
  }
}`,...(S=(k=r.parameters)==null?void 0:k.docs)==null?void 0:S.source}}};var z,T,w;o.parameters={...o.parameters,docs:{...(z=o.parameters)==null?void 0:z.docs,source:{originalSource:`{
  name: "Tick Padding",
  render: HorizontalAxisTemplate,
  args: {
    position: "bottom",
    fields: ["integerValue"],
    height: 100,
    width: 800,
    tickPadding: 20,
    showGridlines: false
  }
}`,...(w=(T=o.parameters)==null?void 0:T.docs)==null?void 0:w.source}}};var A,C,G;a.parameters={...a.parameters,docs:{...(A=a.parameters)==null?void 0:A.docs,source:{originalSource:`{
  name: "Gridlines",
  render: HorizontalAxisTemplate,
  args: {
    position: "bottom",
    fields: ["integerValue"],
    height: 200,
    width: 800,
    tickPadding: 20,
    showGridlines: true
  }
}`,...(G=(C=a.parameters)==null?void 0:C.docs)==null?void 0:G.source}}};var O,b,P;d.parameters={...d.parameters,docs:{...(O=d.parameters)==null?void 0:O.docs,source:{originalSource:`{
  name: "Using a Custom Axis Component",
  render: CustomAxisTemplate,
  args: {
    position: "bottom",
    fields: ["dateTimeValue"],
    height: 50,
    width: 800
  }
}`,...(P=(b=d.parameters)==null?void 0:b.docs)==null?void 0:P.source}}};const ee=["OuterTickSize","InnerTickSize","TickPadding","Gridlines","FullyCustomAxis"];export{d as FullyCustomAxis,a as Gridlines,r as InnerTickSize,n as OuterTickSize,o as TickPadding,ee as __namedExportsOrder,$ as default};
//# sourceMappingURL=AxisCustomisations.stories-CkpGNLTt.js.map
