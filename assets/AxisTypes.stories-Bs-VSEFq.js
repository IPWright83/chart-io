import{j as m}from"./jsx-runtime-BjG_zV1W.js";import"./index-C_QuCFx-.js";import{A as N,C}from"./index-D50cK_1g.js";import{a as _}from"./axisData-DyH6sPTU.js";import{X as E}from"./XAxis-ChDwRgF9.js";import"./react-redux-QXbQKOoW.js";import"./index-DpTt3J-R.js";import"./index-CRk78wGA.js";import"./index-_rl-6daV.js";import"./lodash-DOJiQ2Wu.js";const U={title:"Components/Axis/Types",component:N,parameters:{docs:{transformSource:e=>(e=e.replace(/data={\[.*?\]}/gs,"data={[ ...dataset ]}"),e=e.replaceAll(/undefined,?/g,""),e=e.replace(/^\s*\n/gm,""),e)},chromatic:{delay:300}}},r=e=>m.jsx(C,{...e,data:_,children:m.jsx(E,{fields:e.fields,tickSizeInner:e.tickSizeInner,tickSizeOuter:e.tickSizeOuter,tickPadding:e.tickPadding,showGridlines:e.showGridlines,title:e.title,position:e.position})}),s={name:"String Axis",render:r,args:{position:"bottom",fields:["stringValue"],height:80,width:800,showGridlines:!1}},a={name:"Boolean Axis",render:r,args:{...s.args,fields:["boolValue"]}},i={name:"Integer Axis",render:r,args:{...s.args,fields:["integerValue"]}},n={name:"Double Axis",render:r,args:{...s.args,fields:["doubleValue"]}},t={name:"Double Axis (with exclusive negative values)",render:r,args:{...s.args,fields:["negativeDoubleValue"]}},o={name:"Double Axis (with mixed positive and negative values)",render:r,args:{...s.args,fields:["positiveAndNegativeDoubleValue"]}},l={name:"Date Axis",render:r,args:{...s.args,fields:["dateValue"]}},d={name:"DateTime Axis",render:r,args:{...s.args,fields:["dateTimeValue"]}};var u,c,p;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
  name: "String Axis",
  render: HorizontalAxisTemplate,
  args: {
    position: "bottom",
    fields: ["stringValue"],
    height: 80,
    width: 800,
    showGridlines: false
  }
}`,...(p=(c=s.parameters)==null?void 0:c.docs)==null?void 0:p.source}}};var g,x,A;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`{
  name: "Boolean Axis",
  render: HorizontalAxisTemplate,
  args: {
    ...StringAxis.args,
    fields: ["boolValue"]
  }
}`,...(A=(x=a.parameters)==null?void 0:x.docs)==null?void 0:A.source}}};var f,S,D;i.parameters={...i.parameters,docs:{...(f=i.parameters)==null?void 0:f.docs,source:{originalSource:`{
  name: "Integer Axis",
  render: HorizontalAxisTemplate,
  args: {
    ...StringAxis.args,
    fields: ["integerValue"]
  }
}`,...(D=(S=i.parameters)==null?void 0:S.docs)==null?void 0:D.source}}};var b,v,h;n.parameters={...n.parameters,docs:{...(b=n.parameters)==null?void 0:b.docs,source:{originalSource:`{
  name: "Double Axis",
  render: HorizontalAxisTemplate,
  args: {
    ...StringAxis.args,
    fields: ["doubleValue"]
  }
}`,...(h=(v=n.parameters)==null?void 0:v.docs)==null?void 0:h.source}}};var T,V,z;t.parameters={...t.parameters,docs:{...(T=t.parameters)==null?void 0:T.docs,source:{originalSource:`{
  name: "Double Axis (with exclusive negative values)",
  render: HorizontalAxisTemplate,
  args: {
    ...StringAxis.args,
    fields: ["negativeDoubleValue"]
  }
}`,...(z=(V=t.parameters)==null?void 0:V.docs)==null?void 0:z.source}}};var w,H,k;o.parameters={...o.parameters,docs:{...(w=o.parameters)==null?void 0:w.docs,source:{originalSource:`{
  name: "Double Axis (with mixed positive and negative values)",
  render: HorizontalAxisTemplate,
  args: {
    ...StringAxis.args,
    fields: ["positiveAndNegativeDoubleValue"]
  }
}`,...(k=(H=o.parameters)==null?void 0:H.docs)==null?void 0:k.source}}};var I,y,O;l.parameters={...l.parameters,docs:{...(I=l.parameters)==null?void 0:I.docs,source:{originalSource:`{
  name: "Date Axis",
  render: HorizontalAxisTemplate,
  args: {
    ...StringAxis.args,
    fields: ["dateValue"]
  }
}`,...(O=(y=l.parameters)==null?void 0:y.docs)==null?void 0:O.source}}};var j,B,G;d.parameters={...d.parameters,docs:{...(j=d.parameters)==null?void 0:j.docs,source:{originalSource:`{
  name: "DateTime Axis",
  render: HorizontalAxisTemplate,
  args: {
    ...StringAxis.args,
    fields: ["dateTimeValue"]
  }
}`,...(G=(B=d.parameters)==null?void 0:B.docs)==null?void 0:G.source}}};const W=["StringAxis","BooleanAxis","IntegerAxis","DoubleAxis","DoubleAxisOnlyNegativeAxis","DoubleAxisMixedSignAxis","DateAxis","DateTimeAxis"];export{a as BooleanAxis,l as DateAxis,d as DateTimeAxis,n as DoubleAxis,o as DoubleAxisMixedSignAxis,t as DoubleAxisOnlyNegativeAxis,i as IntegerAxis,s as StringAxis,W as __namedExportsOrder,U as default};
//# sourceMappingURL=AxisTypes.stories-Bs-VSEFq.js.map
