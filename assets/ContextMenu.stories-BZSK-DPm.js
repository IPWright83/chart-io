import{j as m}from"./jsx-runtime-BjG_zV1W.js";import{B as S,Y as O,G as T,q as v,Q as y,J as P}from"./index.es-DoiyW41S.js";import{f as c}from"./index-CFMwmiIJ.js";import{C as B}from"./ContextMenu-Dkh4zLYP.js";import"./index-DpTt3J-R.js";import"./index-D5nvoAmD.js";const Q={title:"Components/ContextMenu",component:B,parameters:{chromatic:{delay:300}},args:{onSelect:c(),onClose:c()}},A={chart:{zoom:{path:[]},scales:{},legend:{items:[],hidden:!1}}},z={chart:{zoom:{path:["Europe"]},scales:{},legend:{items:[],hidden:!1}}},s=[S(z),O(),T(),v(A)],E=y(),e=j=>m.jsx("svg",{width:"400px",height:"400px",style:{background:P.light.background.toString()},children:m.jsx(B,{...j,x:200,y:200})}),r={name:"Background Menu",render:e,args:{open:!0,items:s}},n={name:"Datum Menu",render:e,args:{open:!0,items:E}},t={name:"With a Disabled Item",render:e,args:{open:!0,items:[S(A),O(),T()]}},o={name:"Closed",render:e,args:{open:!1,items:s}},a={name:"Custom Colors",render:e,args:{open:!0,items:s,colors:{background:"#7c3aed",backgroundHover:"#9d5cf5",backgroundDisabled:"#c4b5fd",text:"#ffffff",border:"#ffffff"}}};var d,u,i;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`{
  name: "Background Menu",
  render: ContextMenuTemplate,
  args: {
    open: true,
    items: backgroundItems
  }
}`,...(i=(u=r.parameters)==null?void 0:u.docs)==null?void 0:i.source}}};var p,l,g;n.parameters={...n.parameters,docs:{...(p=n.parameters)==null?void 0:p.docs,source:{originalSource:`{
  name: "Datum Menu",
  render: ContextMenuTemplate,
  args: {
    open: true,
    items: datumItems
  }
}`,...(g=(l=n.parameters)==null?void 0:l.docs)==null?void 0:g.source}}};var f,b,C;t.parameters={...t.parameters,docs:{...(f=t.parameters)==null?void 0:f.docs,source:{originalSource:`{
  name: "With a Disabled Item",
  render: ContextMenuTemplate,
  args: {
    open: true,
    items: [createResetZoomAction(backgroundState), createPivotAction(), createDrawPolygonAction()]
  }
}`,...(C=(b=t.parameters)==null?void 0:b.docs)==null?void 0:C.source}}};var x,k,h;o.parameters={...o.parameters,docs:{...(x=o.parameters)==null?void 0:x.docs,source:{originalSource:`{
  name: "Closed",
  render: ContextMenuTemplate,
  args: {
    open: false,
    items: backgroundItems
  }
}`,...(h=(k=o.parameters)==null?void 0:k.docs)==null?void 0:h.source}}};var M,D,I;a.parameters={...a.parameters,docs:{...(M=a.parameters)==null?void 0:M.docs,source:{originalSource:`{
  name: "Custom Colors",
  render: ContextMenuTemplate,
  args: {
    open: true,
    items: backgroundItems,
    colors: {
      background: "#7c3aed",
      backgroundHover: "#9d5cf5",
      backgroundDisabled: "#c4b5fd",
      text: "#ffffff",
      border: "#ffffff"
    }
  }
}`,...(I=(D=a.parameters)==null?void 0:D.docs)==null?void 0:I.source}}};const R=["Background","OnADataPoint","DisabledItem","Closed","CustomTheme"];export{r as Background,o as Closed,a as CustomTheme,t as DisabledItem,n as OnADataPoint,R as __namedExportsOrder,Q as default};
//# sourceMappingURL=ContextMenu.stories-BZSK-DPm.js.map
