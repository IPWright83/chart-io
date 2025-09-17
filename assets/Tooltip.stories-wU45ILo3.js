import{j as m}from"./jsx-runtime-BjG_zV1W.js";import{P as E}from"./react-redux-QXbQKOoW.js";import{T as _}from"./Tooltip-DL_pUHjQ.js";import{c as A}from"./renderChart-BLsEhK0I.js";import"./index-Dcm7olAB.js";import"./index-DpTt3J-R.js";import"./index-BH_8yRl6.js";import"./TooltipItem-CWwi-etI.js";import"./index-BmYvQTbQ.js";import"./Circle-Qf3Tu8hN.js";import"./Line-BjKan0E4.js";import"./Square-CZVurtTs.js";import"./test-utils-C-DEfvFY.js";import"./index-D5nvoAmD.js";import"./client-CbGTh6y2.js";const G={title:"Components/TooltipOverlay/Tooltip",component:_,parameters:{docs:{transformSource:e=>(e=e.replace(/data={\[.*?\]}/gs,"data={[ ...dataset ]}"),e=e.replaceAll(/undefined,?/g,""),e=e.replace(/^\s*\n/gm,""),e)},chromatic:{delay:300}}},n=e=>{const s=A({});return m.jsx(E,{store:s,children:m.jsx(_,{items:e.items,borderColor:e.borderColor,formatters:e.formatters})})},a={name:"All Series Types",render:n,args:{items:[{name:"Line Series with a very long title that should be truncated at some point",icon:"line",fill:"steelblue",value:12355e3},{name:"Scatter Series",icon:"circle",fill:"steelblue",value:"foobar"},{name:"Bar Series",icon:"square",fill:"steelblue",value:!0},{name:"Column Series",icon:"square",fill:"steelblue",value:1500},{name:"Area Series",icon:"square",fill:"steelblue",value:5e-4},{name:"Timestamp",fill:"steeblue",icon:"none",value:new Date(2023,1,1)}]}},o={name:"Numerical Examples",render:n,args:{items:[{name:"Billions",icon:"none",value:22178905132},{name:"Millions",icon:"none",value:78905132},{name:"100's Thousands",icon:"none",value:391290},{name:"10's Thousands",icon:"none",value:91290},{name:"Hundreds",icon:"none",value:546},{name:"Tens",icon:"none",value:45},{name:"Units",icon:"none",value:4},{name:"Sub-zero",icon:"none",value:.4},{name:"Mili",icon:"none",value:.00465},{name:"Micro",icon:"none",value:254e-8},{name:"Nano",icon:"none",value:354e-11},{name:"Pico",icon:"none",value:748e-14}]}},r={name:"Date Examples",render:n,args:{items:[{name:"Years",icon:"none",value:new Date(2023,0)},{name:"Months",icon:"none",value:new Date(2023,11)},{name:"Day",icon:"none",value:new Date(2023,11,25)},{name:"Hours",icon:"none",value:new Date(2023,11,25,9)},{name:"Minutes",icon:"none",value:new Date(2023,11,25,9,30)},{name:"Seconds",icon:"none",value:new Date(2023,11,25,9,30,30)}]}},l={name:"With a Title",render:n,args:{items:[{name:"Title",value:5},{name:"Line Series with a very long title that should be truncated at some point",icon:"line",fill:"steelblue",value:155e3},{name:"Scatter Series",icon:"circle",fill:"steelblue",value:"foobar"},{name:"Bar Series",icon:"square",fill:"steelblue",value:!0},{name:"Column Series",icon:"square",fill:"steelblue",value:1500},{name:"Area Series",icon:"square",fill:"steelblue",value:1500}]}},t={render:n,args:{items:[{name:"x",icon:"none",value:5},{name:"y",icon:"none",value:15e4}],borderColor:"steelblue"}},i={name:"Custom Formatting",render:n,args:{items:[{name:"x",icon:"none",value:15e4},{name:"y",icon:"none",value:16e4},{name:"z",icon:"none",value:17e4}],formatters:{x:{prefix:"£"},y:{suffix:" pounds"},z:{format:(e,s)=>`~~~${s}~~~`}}}};var u,c,p;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`{
  name: "All Series Types",
  render: TooltipTemplate,
  args: {
    items: [{
      name: "Line Series with a very long title that should be truncated at some point",
      icon: "line",
      fill: "steelblue",
      value: 12355000
    }, {
      name: "Scatter Series",
      icon: "circle",
      fill: "steelblue",
      value: "foobar"
    }, {
      name: "Bar Series",
      icon: "square",
      fill: "steelblue",
      value: true
    }, {
      name: "Column Series",
      icon: "square",
      fill: "steelblue",
      value: 1500
    }, {
      name: "Area Series",
      icon: "square",
      fill: "steelblue",
      value: 0.0005
    }, {
      name: "Timestamp",
      fill: "steeblue",
      icon: "none",
      value: new Date(2023, 1, 1)
    }]
  }
}`,...(p=(c=a.parameters)==null?void 0:c.docs)==null?void 0:p.source}}};var v,d,f;o.parameters={...o.parameters,docs:{...(v=o.parameters)==null?void 0:v.docs,source:{originalSource:`{
  name: "Numerical Examples",
  render: TooltipTemplate,
  args: {
    items: [{
      name: "Billions",
      icon: "none",
      value: 22_178_905_132
    }, {
      name: "Millions",
      icon: "none",
      value: 78_905_132
    }, {
      name: "100's Thousands",
      icon: "none",
      value: 391_290
    }, {
      name: "10's Thousands",
      icon: "none",
      value: 91_290
    }, {
      name: "Hundreds",
      icon: "none",
      value: 546
    }, {
      name: "Tens",
      icon: "none",
      value: 45
    }, {
      name: "Units",
      icon: "none",
      value: 4
    }, {
      name: "Sub-zero",
      icon: "none",
      value: 0.4
    }, {
      name: "Mili",
      icon: "none",
      value: 0.00465
    }, {
      name: "Micro",
      icon: "none",
      value: 0.00000254
    }, {
      name: "Nano",
      icon: "none",
      value: 0.00000000354
    }, {
      name: "Pico",
      icon: "none",
      value: 0.00000000000748
    }]
  }
}`,...(f=(d=o.parameters)==null?void 0:d.docs)==null?void 0:f.source}}};var b,S,T;r.parameters={...r.parameters,docs:{...(b=r.parameters)==null?void 0:b.docs,source:{originalSource:`{
  name: "Date Examples",
  render: TooltipTemplate,
  args: {
    items: [{
      name: "Years",
      icon: "none",
      value: new Date(2023, 0)
    }, {
      name: "Months",
      icon: "none",
      value: new Date(2023, 11)
    }, {
      name: "Day",
      icon: "none",
      value: new Date(2023, 11, 25)
    }, {
      name: "Hours",
      icon: "none",
      value: new Date(2023, 11, 25, 9)
    }, {
      name: "Minutes",
      icon: "none",
      value: new Date(2023, 11, 25, 9, 30)
    }, {
      name: "Seconds",
      icon: "none",
      value: new Date(2023, 11, 25, 9, 30, 30)
    }]
  }
}`,...(T=(S=r.parameters)==null?void 0:S.docs)==null?void 0:T.source}}};var g,h,x;l.parameters={...l.parameters,docs:{...(g=l.parameters)==null?void 0:g.docs,source:{originalSource:`{
  name: "With a Title",
  render: TooltipTemplate,
  args: {
    items: [{
      name: "Title",
      value: 5
    }, {
      name: "Line Series with a very long title that should be truncated at some point",
      icon: "line",
      fill: "steelblue",
      value: 155000
    }, {
      name: "Scatter Series",
      icon: "circle",
      fill: "steelblue",
      value: "foobar"
    }, {
      name: "Bar Series",
      icon: "square",
      fill: "steelblue",
      value: true
    }, {
      name: "Column Series",
      icon: "square",
      fill: "steelblue",
      value: 1500
    }, {
      name: "Area Series",
      icon: "square",
      fill: "steelblue",
      value: 1500
    }]
  }
}`,...(x=(h=l.parameters)==null?void 0:h.docs)==null?void 0:x.source}}};var D,w,y;t.parameters={...t.parameters,docs:{...(D=t.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: TooltipTemplate,
  args: {
    items: [{
      name: "x",
      icon: "none",
      value: 5
    }, {
      name: "y",
      icon: "none",
      value: 150000
    }],
    borderColor: "steelblue"
  }
}`,...(y=(w=t.parameters)==null?void 0:w.docs)==null?void 0:y.source}}};var C,q,M;i.parameters={...i.parameters,docs:{...(C=i.parameters)==null?void 0:C.docs,source:{originalSource:`{
  name: "Custom Formatting",
  render: TooltipTemplate,
  args: {
    items: [{
      name: "x",
      icon: "none",
      value: 150000
    }, {
      name: "y",
      icon: "none",
      value: 160000
    }, {
      name: "z",
      icon: "none",
      value: 170000
    }],
    formatters: {
      x: {
        prefix: "£"
      },
      y: {
        suffix: " pounds"
      },
      z: {
        format: (name, value) => \`~~~\${value}~~~\`
      }
    }
  }
}`,...(M=(q=i.parameters)==null?void 0:q.docs)==null?void 0:M.source}}};const I=["Default","NumberExamples","DateExamples","WithTitle","Scatter","CustomFormatters"];export{i as CustomFormatters,r as DateExamples,a as Default,o as NumberExamples,t as Scatter,l as WithTitle,I as __namedExportsOrder,G as default};
//# sourceMappingURL=Tooltip.stories-wU45ILo3.js.map
