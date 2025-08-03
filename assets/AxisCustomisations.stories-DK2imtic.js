import{j as i}from"./jsx-runtime-BjG_zV1W.js";import{u as F,c as E}from"./react-redux-D2XHiCFH.js";import{r as p}from"./index-DpTt3J-R.js";import"./index-C_9ZH6Qa.js";import{A as X,C as P,X as _,b as R,t as U}from"./index-lEWDzjaj.js";import{a as V}from"./axisData-DyH6sPTU.js";import{X as v}from"./XAxis-DPoLBJUO.js";import{s as B}from"./index-BLkjqt2D.js";import{t as D}from"./defaultLocale-YZNTexTf.js";import"./index-Cmxt2A0f.js";import"./defaultLocale-D2nGpDRe.js";const te={title:"Components/Axis/Customization",component:X,parameters:{docs:{transformSource:e=>(e=e.replace(/data={\[.*?\]}/gs,"data={[ ...dataset ]}"),e=e.replaceAll(/undefined,?/g,""),e=e.replace(/^\s*\n/gm,""),e)},chromatic:{delay:300}}},M=({fields:e})=>{const c=p.useRef(null),I=e[0],t=F(l=>E.scales.getScale(l,I,"plot"));return p.useEffect(()=>{if(c.current&&t){const l=B(c.current),j=D("%H:%M"),m=R(t).ticks(U.every(1)).tickSizeInner(30).tickSizeOuter(30).tickFormat((H,y)=>y%3===0?j(H):null);m.scale(t),l.call(m)}},[t]),i.jsx("g",{className:"customAxis",ref:c})},N=e=>i.jsxs(P,{...e,data:V,children:[i.jsx(_,{fields:e.fields,scaleType:"time"}),i.jsx(M,{fields:e.fields})]}),d=e=>i.jsx(P,{...e,data:V,children:i.jsx(v,{fields:e.fields,tickSizeInner:e.tickSizeInner,tickSizeOuter:e.tickSizeOuter,tickPadding:e.tickPadding,showGridlines:e.showGridlines,title:e.title,position:e.position})}),s={name:"Outer Tick Size",render:d,args:{position:"bottom",fields:["integerValue"],height:100,width:800,tickSizeOuter:40,showGridlines:!1}},n={name:"Inner Tick Size",render:d,args:{position:"bottom",fields:["integerValue"],height:100,width:800,tickSizeInner:20,showGridlines:!1}},r={name:"Tick Padding",render:d,args:{position:"bottom",fields:["integerValue"],height:100,width:800,tickPadding:20,showGridlines:!1}},o={name:"Gridlines",render:d,args:{position:"bottom",fields:["integerValue"],height:200,width:800,tickPadding:20,showGridlines:!0}},a={name:"Using a Custom Axis Component",render:N,args:{position:"bottom",fields:["dateTimeValue"],height:50,width:800}};var u,h,g;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
}`,...(g=(h=s.parameters)==null?void 0:h.docs)==null?void 0:g.source}}};var f,x,k;n.parameters={...n.parameters,docs:{...(f=n.parameters)==null?void 0:f.docs,source:{originalSource:`{
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
}`,...(k=(x=n.parameters)==null?void 0:x.docs)==null?void 0:k.source}}};var S,z,T;r.parameters={...r.parameters,docs:{...(S=r.parameters)==null?void 0:S.docs,source:{originalSource:`{
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
}`,...(T=(z=r.parameters)==null?void 0:z.docs)==null?void 0:T.source}}};var w,A,C;o.parameters={...o.parameters,docs:{...(w=o.parameters)==null?void 0:w.docs,source:{originalSource:`{
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
}`,...(C=(A=o.parameters)==null?void 0:A.docs)==null?void 0:C.source}}};var G,b,O;a.parameters={...a.parameters,docs:{...(G=a.parameters)==null?void 0:G.docs,source:{originalSource:`{
  name: "Using a Custom Axis Component",
  render: CustomAxisTemplate,
  args: {
    position: "bottom",
    fields: ["dateTimeValue"],
    height: 50,
    width: 800
  }
}`,...(O=(b=a.parameters)==null?void 0:b.docs)==null?void 0:O.source}}};const se=["OuterTickSize","InnerTickSize","TickPadding","Gridlines","FullyCustomAxis"];export{a as FullyCustomAxis,o as Gridlines,n as InnerTickSize,s as OuterTickSize,r as TickPadding,se as __namedExportsOrder,te as default};
//# sourceMappingURL=AxisCustomisations.stories-DK2imtic.js.map
