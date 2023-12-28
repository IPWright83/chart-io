import{j as o}from"./jsx-runtime-vNq4Oc-g.js";import"./index-CnLlP05v.js";import{L as c}from"./Legend-AepxjzR_.js";import{c as d}from"./index-Qdriakje.js";import{P as g}from"./Provider--AC3n3ro.js";import"./index-4g5l5LRQ.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./index-jmm5gWkb.js";import"./index-qFq04NJk.js";import"./index-RAAq-Dtz.js";import"./Circle-2MkuDq74.js";import"./Line-cari06pN.js";import"./Square-_dp0HJFb.js";import"./client-vNP-bS9o.js";import"./index-PPLHz8o0.js";const k={title:"Components/LegendOverlay/Legend",component:c,parameters:{docs:{transformSource:e=>(e=e.replace(/data={\[.*?\]}/gs,"data={[ ...dataset ]}"),e=e.replaceAll(/undefined,?/g,""),e=e.replace(/^\s*\n/gm,""),e)},chromatic:{delay:300}}},u=e=>{const p=d({});return o.jsx(g,{store:p,children:o.jsx(c,{items:e.items,formatters:e.formatters})})},r={name:"All Series Types",render:u,args:{items:[{name:"Line Series with a very long title that should be truncated at some point",icon:"line",color:"steelblue"},{name:"Scatter Series",icon:"circle",color:"steelblue"},{name:"Bar Series",icon:"square",color:"steelblue"},{name:"Column Series",icon:"square",color:"steelblue"},{name:"Area Series",icon:"square",color:"steelblue"},{name:"Timestamp",color:"steeblue",icon:"none"}]}},n={name:"Custom Formatting",render:u,args:{items:[{name:"x",icon:"none"}],formatters:{x:e=>`~~~${e}~~~`}}};var t,a,s;r.parameters={...r.parameters,docs:{...(t=r.parameters)==null?void 0:t.docs,source:{originalSource:`{
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
//# sourceMappingURL=Legend.stories-g0tCoAJm.js.map
