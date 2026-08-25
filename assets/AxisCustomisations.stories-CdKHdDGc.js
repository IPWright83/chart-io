import{j as i}from"./jsx-runtime-BjG_zV1W.js";import{K as E,l as s}from"./index.es-DoiyW41S.js";import{r as u}from"./index-DpTt3J-R.js";import{u as X}from"./react-redux-lkBMRsz6.js";import{C as V}from"./index-Gn9jQ5lq.js";import{A as _,X as R}from"./index-VyfXoxD0.js";import"./index-DVqBs4fh.js";import{a as I}from"./axisData-DyH6sPTU.js";import{X as U}from"./XAxis-CgOaLwq3.js";import"./lodash-DOJiQ2Wu.js";import"./index-DzcEfe_2.js";import"./index-5Gl1ki1p.js";import"./calculateScale-CBIGWBP9.js";const ie={title:"Components/Axis/Customization",component:_,parameters:{docs:{transformSource:e=>(e=e.replace(/data={\[.*?\]}/gs,"data={[ ...dataset ]}"),e=e.replaceAll(/undefined,?/g,""),e=e.replace(/^\s*\n/gm,""),e)},chromatic:{delay:300}}},v=({fields:e})=>{const l=u.useRef(null),j=e[0],t=X(c=>E.scales.getScale(c,j,"plot"));return u.useEffect(()=>{if(l.current&&t){const c=s.select(l.current),H=s.timeFormat("%H:%M"),p=s.axisBottom(t).ticks(s.timeHour.every(1)).tickSizeInner(30).tickSizeOuter(30).tickFormat((y,F)=>F%3===0?H(y):null);p.scale(t),c.call(p)}},[t]),i.jsx("g",{className:"customAxis",ref:l})},B=e=>i.jsxs(V,{...e,data:I,children:[i.jsx(R,{fields:e.fields,scaleType:"time"}),i.jsx(v,{fields:e.fields})]}),m=e=>i.jsx(V,{...e,data:I,children:i.jsx(U,{fields:e.fields,tickSizeInner:e.tickSizeInner,tickSizeOuter:e.tickSizeOuter,tickPadding:e.tickPadding,showGridlines:e.showGridlines,title:e.title,position:e.position})}),n={name:"Outer Tick Size",render:m,args:{position:"bottom",fields:["integerValue"],height:100,width:800,tickSizeOuter:40,showGridlines:!1}},r={name:"Inner Tick Size",render:m,args:{position:"bottom",fields:["integerValue"],height:100,width:800,tickSizeInner:20,showGridlines:!1}},o={name:"Tick Padding",render:m,args:{position:"bottom",fields:["integerValue"],height:100,width:800,tickPadding:20,showGridlines:!1}},a={name:"Gridlines",render:m,args:{position:"bottom",fields:["integerValue"],height:200,width:800,tickPadding:20,showGridlines:!0}},d={name:"Using a Custom Axis Component",render:B,args:{position:"bottom",fields:["dateTimeValue"],height:50,width:800}};var h,g,f;n.parameters={...n.parameters,docs:{...(h=n.parameters)==null?void 0:h.docs,source:{originalSource:`{
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
}`,...(G=(C=a.parameters)==null?void 0:C.docs)==null?void 0:G.source}}};var b,O,P;d.parameters={...d.parameters,docs:{...(b=d.parameters)==null?void 0:b.docs,source:{originalSource:`{
  name: "Using a Custom Axis Component",
  render: CustomAxisTemplate,
  args: {
    position: "bottom",
    fields: ["dateTimeValue"],
    height: 50,
    width: 800
  }
}`,...(P=(O=d.parameters)==null?void 0:O.docs)==null?void 0:P.source}}};const te=["OuterTickSize","InnerTickSize","TickPadding","Gridlines","FullyCustomAxis"];export{d as FullyCustomAxis,a as Gridlines,r as InnerTickSize,n as OuterTickSize,o as TickPadding,te as __namedExportsOrder,ie as default};
//# sourceMappingURL=AxisCustomisations.stories-CdKHdDGc.js.map
