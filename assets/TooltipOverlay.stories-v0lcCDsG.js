import{j as o}from"./jsx-runtime-vNq4Oc-g.js";import"./index-CnLlP05v.js";import{P as h,t as x}from"./Provider--AC3n3ro.js";import{T}from"./index-0hCrwOlf.js";import{c as C}from"./index-Qdriakje.js";import{T as b}from"./TooltipItem-SVu_bEZv.js";import"./index-4g5l5LRQ.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./index-jmm5gWkb.js";import"./Tooltip-CF66P4Pc.js";import"./index-W-Z_0x6I.js";import"./index-CTVlSsFV.js";import"./client-vNP-bS9o.js";import"./index-PPLHz8o0.js";import"./defaultLocale-RGkPOkAo.js";import"./defaultLocale-4fp4Qluw.js";import"./index-RAAq-Dtz.js";import"./Circle-2MkuDq74.js";import"./Line-cari06pN.js";import"./Square-_dp0HJFb.js";const F={title:"Components/TooltipOverlay",component:T,parameters:{docs:{transformSource:e=>(e=e.replace(/data={\[.*?\]}/gs,"data={[ ...dataset ]}"),e=e.replaceAll(/undefined,?/g,""),e=e.replace(/^\s*\n/gm,""),e)},chromatic:{delay:300}}},l=e=>{const t=C({chart:{theme:x.light},event:{tooltip:{items:[{name:"Line Series with a very long title that should be truncated at some point",icon:"line",fill:"steelblue",value:155e3},{name:"Scatter Series",icon:"circle",fill:"steelblue",value:"foobar"},{name:"Bar Series",icon:"square",fill:"steelblue",value:!0},{name:"Column Series",icon:"square",fill:"steelblue",value:1500},{name:"Area Series",icon:"square",fill:"steelblue",value:1500},{name:"Timestamp",fill:"steeblue",icon:"none",value:new Date(2023,1,1)}],color:"green"}}});return o.jsx(h,{store:t,children:o.jsx("svg",{width:"400px",children:o.jsx(T,{borderColor:e.borderColor,tooltipComponent:e.tooltipComponent,tooltipItemComponent:e.tooltipItemComponent})})})},r={name:"TooltipOverlay",render:l},n={name:"Custom Tooltip",render:l,args:{tooltipComponent:({items:e})=>o.jsxs("div",{style:{opacity:.8,border:"1px solid black",borderRadius:5,padding:5,fontSize:18,lineHeight:1.2,backgroundColor:"#EEE",boxShadow:"rgba(0, 0, 0, 0.3) 0 2px 10px"},children:[o.jsx("div",{children:"This is a Custom Tooltip"}),e.map(t=>o.jsx(b,{...t},`${t.name}`))]})}},i={name:"Custom Tooltip Items",render:l,args:{tooltipItemComponent:({name:e,value:t,icon:S,fill:y})=>o.jsx("div",{style:{width:"100%",flexGrow:1,flexShrink:1,fontSize:12,display:"flex",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},children:`${t}`})}};var a,s,m;r.parameters={...r.parameters,docs:{...(a=r.parameters)==null?void 0:a.docs,source:{originalSource:`{
  name: "TooltipOverlay",
  render: TooltipOverlayTemplate
}`,...(m=(s=r.parameters)==null?void 0:s.docs)==null?void 0:m.source}}};var p,d,c;n.parameters={...n.parameters,docs:{...(p=n.parameters)==null?void 0:p.docs,source:{originalSource:`{
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
}`,...(c=(d=n.parameters)==null?void 0:d.docs)==null?void 0:c.source}}};var u,v,f;i.parameters={...i.parameters,docs:{...(u=i.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
        whiteSpace: ("nowrap" as const),
        overflow: ("hidden" as const),
        textOverflow: ("ellipsis" as const)
      }}>
                    {\`\${value}\`}
                </div>;
    }
  }
}`,...(f=(v=i.parameters)==null?void 0:v.docs)==null?void 0:f.source}}};const J=["Default","CustomTooltip","CustomTooltipItems"];export{n as CustomTooltip,i as CustomTooltipItems,r as Default,J as __namedExportsOrder,F as default};
//# sourceMappingURL=TooltipOverlay.stories-v0lcCDsG.js.map
