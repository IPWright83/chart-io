import{j as a}from"./jsx-runtime-BjG_zV1W.js";import{J as Z}from"./index.es-DoiyW41S.js";import{P as b}from"./react-redux-lkBMRsz6.js";import{Z as h}from"./index-DrWhuguZ.js";import{c as f}from"./renderChart-DJ6bXfoi.js";import"./index-CFMwmiIJ.js";import"./index-DpTt3J-R.js";import"./test-utils-C-DEfvFY.js";import"./index-D5nvoAmD.js";import"./client-CbGTh6y2.js";const T={title:"Components/ZoomBreadcrumb",component:h,parameters:{chromatic:{delay:300}}},t=g=>{const v=f({chart:{theme:Z.light,zoom:{path:g.path}}});return a.jsx(b,{store:v,children:a.jsx("svg",{width:"600px",height:"200px",style:{background:"#EEE"},children:a.jsx(h,{})})})},e={name:"One Level Deep",render:t,args:{path:["Europe"]}},r={name:"Several Levels Deep",render:t,args:{path:["Europe","Germany","Software"]}},o={name:"Fully Zoomed Out",render:t,args:{path:[]}};var m,s,n;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`{
  name: "One Level Deep",
  render: ZoomBreadcrumbTemplate,
  args: {
    path: ["Europe"]
  }
}`,...(n=(s=e.parameters)==null?void 0:s.docs)==null?void 0:n.source}}};var p,c,d;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`{
  name: "Several Levels Deep",
  render: ZoomBreadcrumbTemplate,
  args: {
    path: ["Europe", "Germany", "Software"]
  }
}`,...(d=(c=r.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};var l,u,i;o.parameters={...o.parameters,docs:{...(l=o.parameters)==null?void 0:l.docs,source:{originalSource:`{
  name: "Fully Zoomed Out",
  render: ZoomBreadcrumbTemplate,
  args: {
    path: []
  }
}`,...(i=(u=o.parameters)==null?void 0:u.docs)==null?void 0:i.source}}};const _=["OneLevel","NestedLevels","FullyZoomedOut"];export{o as FullyZoomedOut,r as NestedLevels,e as OneLevel,_ as __namedExportsOrder,T as default};
//# sourceMappingURL=ZoomBreadcrumb.stories-BwX2BBCU.js.map
