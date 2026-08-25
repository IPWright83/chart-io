import{j as o}from"./jsx-runtime-BjG_zV1W.js";import{P as d}from"./react-redux-lkBMRsz6.js";import{L as c}from"./Legend-DQjp6Mmo.js";import{c as g}from"./renderChart-DJ6bXfoi.js";import"./index-CFMwmiIJ.js";import"./index.es-DoiyW41S.js";import"./index-DpTt3J-R.js";import"./index-Bp2RIjag.js";import"./index-BmYvQTbQ.js";import"./Circle-Qf3Tu8hN.js";import"./Line-BjKan0E4.js";import"./Square-CZVurtTs.js";import"./test-utils-C-DEfvFY.js";import"./index-D5nvoAmD.js";import"./client-CbGTh6y2.js";const k={title:"Components/LegendOverlay/Legend",component:c,parameters:{docs:{transformSource:e=>(e=e.replace(/data={\[.*?\]}/gs,"data={[ ...dataset ]}"),e=e.replaceAll(/undefined,?/g,""),e=e.replace(/^\s*\n/gm,""),e)},chromatic:{delay:300}}},u=e=>{const p=g({});return o.jsx(d,{store:p,children:o.jsx(c,{items:e.items,formatters:e.formatters})})},r={name:"All Series Types",render:u,args:{items:[{name:"Line Series with a very long title that should be truncated at some point",icon:"line",color:"steelblue"},{name:"Scatter Series",icon:"circle",color:"steelblue"},{name:"Bar Series",icon:"square",color:"steelblue"},{name:"Column Series",icon:"square",color:"steelblue"},{name:"Area Series",icon:"square",color:"steelblue"},{name:"Timestamp",color:"steeblue",icon:"none"}]}},n={name:"Custom Formatting",render:u,args:{items:[{name:"x",icon:"none"}],formatters:{x:e=>`~~~${e}~~~`}}};var t,a,s;r.parameters={...r.parameters,docs:{...(t=r.parameters)==null?void 0:t.docs,source:{originalSource:`{
  name: "All Series Types",
  render: LegendTemplate,
  args: {
    items: [{
      name: "Line Series with a very long title that should be truncated at some point",
      icon: "line",
      color: "steelblue"
    }, {
      name: "Scatter Series",
      icon: "circle",
      color: "steelblue"
    }, {
      name: "Bar Series",
      icon: "square",
      color: "steelblue"
    }, {
      name: "Column Series",
      icon: "square",
      color: "steelblue"
    }, {
      name: "Area Series",
      icon: "square",
      color: "steelblue"
    }, {
      name: "Timestamp",
      color: "steeblue",
      icon: "none"
    }]
  }
}`,...(s=(a=r.parameters)==null?void 0:a.docs)==null?void 0:s.source}}};var m,i,l;n.parameters={...n.parameters,docs:{...(m=n.parameters)==null?void 0:m.docs,source:{originalSource:`{
  name: "Custom Formatting",
  render: LegendTemplate,
  args: {
    items: [{
      name: "x",
      icon: "none"
    }],
    formatters: {
      x: name => \`~~~\${name}~~~\`
    }
  }
}`,...(l=(i=n.parameters)==null?void 0:i.docs)==null?void 0:l.source}}};const w=["Default","CustomFormatters"];export{n as CustomFormatters,r as Default,w as __namedExportsOrder,k as default};
//# sourceMappingURL=Legend.stories-CAUF3biI.js.map
