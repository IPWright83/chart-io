import{j as r}from"./jsx-runtime-BjG_zV1W.js";import{P as T,b as N,V as z}from"./react-redux-SPeguAgb.js";import{L as m}from"./index-BAzb9S1k.js";import{c as C}from"./renderChart-D1szSHoV.js";import"./index-Dcm7olAB.js";import"./index-DpTt3J-R.js";import"./Legend-z40re8h9.js";import"./index-Dub0Swig.js";import"./index-BmYvQTbQ.js";import"./Circle-Qf3Tu8hN.js";import"./Line-BjKan0E4.js";import"./Square-CZVurtTs.js";import"./index-9431aKHi.js";import"./test-utils-C-DEfvFY.js";import"./index-D5nvoAmD.js";import"./client-CbGTh6y2.js";const U={title:"Components/LegendOverlay",component:m,parameters:{docs:{transformSource:e=>(e=e.replace(/data={\[.*?\]}/gs,"data={[ ...dataset ]}"),e=e.replaceAll(/undefined,?/g,""),e=e.replace(/^\s*\n/gm,""),e)},chromatic:{delay:300}}},o=e=>{const l=C({chart:{theme:z.light,dimensions:{width:800,height:400},legend:{items:[{name:"Line Series with a very long title that should be truncated at some point",icon:"line",color:"steelblue"},{name:"Series 2",icon:"circle",color:"steelblue"},{name:"Series 3",icon:"square",color:"steelblue"},{name:"Series 4",icon:"circle",color:"steelblue"},{name:"Series 5",icon:"circle",color:"steelblue"},{name:"Series 6",icon:"circle",color:"steelblue"},{name:"Series 7",icon:"circle",color:"steelblue"},{name:"Series 8",icon:"circle",color:"steelblue"},{name:"Series 9",icon:"circle",color:"steelblue"},{name:"Series 10",icon:"circle",color:"steelblue"}]}}});return r.jsx(T,{store:l,children:r.jsx("svg",{width:"1600px",height:"400px",style:{background:"#CCC"},children:r.jsx(m,{position:e.position,formatters:e.formatters})})})},t={name:"Docked West",render:o,args:{position:"W"}},s={name:"Docked East (the default)",render:o,args:{position:"E"}},n={name:"Docked North",render:o,args:{position:"N"}},a={name:"Docked South",render:o,args:{position:"S"}},i={name:"Docked SouthEast",render:o,args:{position:"SE"}},w=e=>{const l=C({chart:{theme:z.light,dimensions:{width:800,height:400},scales:{population:{scale:N.scaleLinear().domain([0,500]).range([5,25]),domain:[0,500],range:[5,25]}},legend:{items:[{name:"Series 1",icon:"circle",color:"steelblue"}],sizeLegend:{field:"population",ticks:3}}}});return r.jsx(T,{store:l,children:r.jsx("svg",{width:"1600px",height:"400px",style:{background:"#CCC"},children:r.jsx(m,{position:e.position})})})},c={name:"With a Size Legend (from ZAxis)",render:w,args:{position:"E"}};var d,p,u;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`{
  name: "Docked West",
  render: LegendOverlayTemplate,
  args: {
    position: "W"
  }
}`,...(u=(p=t.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};var g,h,S;s.parameters={...s.parameters,docs:{...(g=s.parameters)==null?void 0:g.docs,source:{originalSource:`{
  name: "Docked East (the default)",
  render: LegendOverlayTemplate,
  args: {
    position: "E"
  }
}`,...(S=(h=s.parameters)==null?void 0:h.docs)==null?void 0:S.source}}};var L,b,f;n.parameters={...n.parameters,docs:{...(L=n.parameters)==null?void 0:L.docs,source:{originalSource:`{
  name: "Docked North",
  render: LegendOverlayTemplate,
  args: {
    position: "N"
  }
}`,...(f=(b=n.parameters)==null?void 0:b.docs)==null?void 0:f.source}}};var x,E,k;a.parameters={...a.parameters,docs:{...(x=a.parameters)==null?void 0:x.docs,source:{originalSource:`{
  name: "Docked South",
  render: LegendOverlayTemplate,
  args: {
    position: "S"
  }
}`,...(k=(E=a.parameters)==null?void 0:E.docs)==null?void 0:k.source}}};var y,v,O;i.parameters={...i.parameters,docs:{...(y=i.parameters)==null?void 0:y.docs,source:{originalSource:`{
  name: "Docked SouthEast",
  render: LegendOverlayTemplate,
  args: {
    position: "SE"
  }
}`,...(O=(v=i.parameters)==null?void 0:v.docs)==null?void 0:O.source}}};var D,W,j;c.parameters={...c.parameters,docs:{...(D=c.parameters)==null?void 0:D.docs,source:{originalSource:`{
  name: "With a Size Legend (from ZAxis)",
  render: SizeLegendTemplate,
  args: {
    position: "E"
  }
}`,...(j=(W=c.parameters)==null?void 0:W.docs)==null?void 0:j.source}}};const X=["West","East","North","South","SouthEast","WithSizeLegend"];export{s as East,n as North,a as South,i as SouthEast,t as West,c as WithSizeLegend,X as __namedExportsOrder,U as default};
//# sourceMappingURL=LegendOverlay.stories-CX1viC01.js.map
