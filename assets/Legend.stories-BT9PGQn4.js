import{j as o}from"./jsx-runtime-DEdD30eg.js";import{P as d}from"./index-b9bwP9Bh.js";import{L as c}from"./Legend-DEyrexXZ.js";import{c as g}from"./renderChart-C4tDReWK.js";import"./index-CPFb5ytF.js";import"./index-RYns6xqu.js";import"./index-sbqOYYIm.js";import"./index-DhwMs0bd.js";import"./index-CW0FTg2B.js";import"./Circle-CWMyz_tz.js";import"./Line-B_2MgdvN.js";import"./Square-CektPBZh.js";import"./test-utils-pcsCGetG.js";import"./client-BylhC-KR.js";const _={title:"Components/LegendOverlay/Legend",component:c,parameters:{docs:{transformSource:e=>(e=e.replace(/data={\[.*?\]}/gs,"data={[ ...dataset ]}"),e=e.replaceAll(/undefined,?/g,""),e=e.replace(/^\s*\n/gm,""),e)},chromatic:{delay:300}}},u=e=>{const p=g({});return o.jsx(d,{store:p,children:o.jsx(c,{items:e.items,formatters:e.formatters})})},n={name:"All Series Types",render:u,args:{items:[{name:"Line Series with a very long title that should be truncated at some point",icon:"line",color:"steelblue"},{name:"Scatter Series",icon:"circle",color:"steelblue"},{name:"Bar Series",icon:"square",color:"steelblue"},{name:"Column Series",icon:"square",color:"steelblue"},{name:"Area Series",icon:"square",color:"steelblue"},{name:"Timestamp",color:"steeblue",icon:"none"}]}},r={name:"Custom Formatting",render:u,args:{items:[{name:"x",icon:"none"}],formatters:{x:e=>`~~~${e}~~~`}}};var t,a,s;n.parameters={...n.parameters,docs:{...(t=n.parameters)==null?void 0:t.docs,source:{originalSource:`{
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
}`,...(s=(a=n.parameters)==null?void 0:a.docs)==null?void 0:s.source}}};var m,i,l;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:`{
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
}`,...(l=(i=r.parameters)==null?void 0:i.docs)==null?void 0:l.source}}};const k=["Default","CustomFormatters"];export{r as CustomFormatters,n as Default,k as __namedExportsOrder,_ as default};
//# sourceMappingURL=Legend.stories-BT9PGQn4.js.map
