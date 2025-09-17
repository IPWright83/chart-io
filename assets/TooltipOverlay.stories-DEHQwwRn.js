import{j as o}from"./jsx-runtime-BjG_zV1W.js";import{P as x,M as h}from"./react-redux-QXbQKOoW.js";import{T}from"./index-BEVv-T-d.js";import{c as C}from"./renderChart-BLsEhK0I.js";import"./index-Dcm7olAB.js";import{T as b}from"./TooltipItem-CWwi-etI.js";import"./index-DpTt3J-R.js";import"./Tooltip-DL_pUHjQ.js";import"./index-BH_8yRl6.js";import"./index-_rl-6daV.js";import"./test-utils-C-DEfvFY.js";import"./index-D5nvoAmD.js";import"./client-CbGTh6y2.js";import"./index-BmYvQTbQ.js";import"./Circle-Qf3Tu8hN.js";import"./Line-BjKan0E4.js";import"./Square-CZVurtTs.js";const P={title:"Components/TooltipOverlay",component:T,parameters:{docs:{transformSource:e=>(e=e.replace(/data={\[.*?\]}/gs,"data={[ ...dataset ]}"),e=e.replaceAll(/undefined,?/g,""),e=e.replace(/^\s*\n/gm,""),e)},chromatic:{delay:300}}},l=e=>{const t=C({chart:{theme:h.light},event:{tooltip:{items:[{name:"Line Series with a very long title that should be truncated at some point",icon:"line",fill:"steelblue",value:155e3},{name:"Scatter Series",icon:"circle",fill:"steelblue",value:"foobar"},{name:"Bar Series",icon:"square",fill:"steelblue",value:!0},{name:"Column Series",icon:"square",fill:"steelblue",value:1500},{name:"Area Series",icon:"square",fill:"steelblue",value:1500},{name:"Timestamp",fill:"steeblue",icon:"none",value:new Date(2023,1,1)}],color:"green"}}});return o.jsx(x,{store:t,children:o.jsx("svg",{width:"400px",children:o.jsx(T,{borderColor:e.borderColor,tooltipComponent:e.tooltipComponent,tooltipItemComponent:e.tooltipItemComponent})})})},r={name:"TooltipOverlay",render:l},n={name:"Custom Tooltip",render:l,args:{tooltipComponent:({items:e})=>o.jsxs("div",{style:{opacity:.8,border:"1px solid black",borderRadius:5,padding:5,fontSize:18,lineHeight:1.2,backgroundColor:"#EEE",boxShadow:"rgba(0, 0, 0, 0.3) 0 2px 10px"},children:[o.jsx("div",{children:"This is a Custom Tooltip"}),e.map(t=>o.jsx(b,{...t},`${t.name}`))]})}},i={name:"Custom Tooltip Items",render:l,args:{tooltipItemComponent:({name:e,value:t,icon:S,fill:y})=>o.jsx("div",{style:{width:"100%",flexGrow:1,flexShrink:1,fontSize:12,display:"flex",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},children:`${t}`})}};var a,s,p;r.parameters={...r.parameters,docs:{...(a=r.parameters)==null?void 0:a.docs,source:{originalSource:`{
  name: "TooltipOverlay",
  render: TooltipOverlayTemplate
}`,...(p=(s=r.parameters)==null?void 0:s.docs)==null?void 0:p.source}}};var m,d,c;n.parameters={...n.parameters,docs:{...(m=n.parameters)==null?void 0:m.docs,source:{originalSource:`{
  name: "Custom Tooltip",
  render: TooltipOverlayTemplate,
  args: {
    tooltipComponent: ({
      items
    }) => {
      return <div style={{
        opacity: 0.8,
        border: "1px solid black",
        borderRadius: 5,
        padding: 5,
        fontSize: 18,
        lineHeight: 1.2,
        backgroundColor: "#EEE",
        boxShadow: "rgba(0, 0, 0, 0.3) 0 2px 10px"
      }}>
          <div>This is a Custom Tooltip</div>
          {items.map(item => <TooltipItem key={\`\${item.name}\`} {...item} />)}
        </div>;
    }
  }
}`,...(c=(d=n.parameters)==null?void 0:d.docs)==null?void 0:c.source}}};var u,f,v;i.parameters={...i.parameters,docs:{...(u=i.parameters)==null?void 0:u.docs,source:{originalSource:`{
  name: "Custom Tooltip Items",
  render: TooltipOverlayTemplate,
  args: {
    tooltipItemComponent: ({
      name,
      value,
      icon,
      fill
    }) => {
      return <div style={{
        width: "100%",
        flexGrow: 1,
        flexShrink: 1,
        fontSize: 12,
        display: "flex",
        whiteSpace: "nowrap" as const,
        overflow: "hidden" as const,
        textOverflow: "ellipsis" as const
      }}>
          {\`\${value}\`}
        </div>;
    }
  }
}`,...(v=(f=i.parameters)==null?void 0:f.docs)==null?void 0:v.source}}};const B=["Default","CustomTooltip","CustomTooltipItems"];export{n as CustomTooltip,i as CustomTooltipItems,r as Default,B as __namedExportsOrder,P as default};
//# sourceMappingURL=TooltipOverlay.stories-DEHQwwRn.js.map
