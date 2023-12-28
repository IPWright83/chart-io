import{j as e}from"./jsx-runtime-vNq4Oc-g.js";import{M as s,C as i,b as o}from"./index-foGeVojo.js";import{r as c}from"./index-aq5z0-XK.js";import{u as r}from"./index-Dbo06S9W.js";import"./index-4g5l5LRQ.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./iframe-5ZQv1v1p.js";import"../sb-preview/runtime.js";import"./index-jmm5gWkb.js";import"./index-GCvOZpsZ.js";import"./index-bjdz4q3G.js";import"./_baseIsEqual-ujzER7rs.js";import"./uniq-dzufyT16.js";import"./index-PPLHz8o0.js";function d(t){const n=Object.assign({h1:"h1",p:"p",code:"code",h3:"h3",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td",h2:"h2",pre:"pre",blockquote:"blockquote",strong:"strong"},r(),t.components);return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"Components/LegendOverlay"}),`
`,e.jsx(n.h1,{id:"legendoverlay-component",children:"LegendOverlay Component"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"<LegendOverlay>"})," component allows us to overlay a ",e.jsx(c,{kind:"components-legendoverlay-legend",children:e.jsx(n.code,{children:"<Legend>"})})," component containing multiple entries, which is useful for showing the information about the different series on a chart."]}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"<LegendOverlay>"})," extracts out legend item information from the Redux store to determine when the legend should be shown, and the content that should be presented."]}),`
`,e.jsx(i,{children:e.jsx(o,{id:"components-legendoverlay--left"})}),`
`,e.jsxs(n.h3,{id:"legendoverlay-props",children:[e.jsx(n.code,{children:"<LegendOverlay>"})," Props"]}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Prop"}),e.jsx(n.th,{children:"Type"}),e.jsx(n.th,{children:"Default"}),e.jsx(n.th,{children:"Note"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"horizontalPosition"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"string"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"RIGHT"})}),e.jsx(n.td,{children:'The horizontal position of the legend. One of "LEFT", "RIGHT" or "CENTER"'})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"verticalPosition"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"string"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"CENTER"})}),e.jsx(n.td,{children:'The vertical position of the legend. One of "TOP", "BOTTOM" or "CENTER"'})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"formatters"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"object"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"{}"})}),e.jsxs(n.td,{children:["A keyed collection of formatter functions. Key should align with ",e.jsx(n.code,{children:"x"})," or ",e.jsx(n.code,{children:"y"})," fields provided to axis/scales or plots. The format function should be of the signature ",e.jsx(n.code,{children:"(name: string) => string"})]})]})]})]}),`
`,e.jsx("br",{}),`
`,e.jsx(n.h2,{id:"adding-legend-items-programatically",children:"Adding Legend items Programatically"}),`
`,e.jsx(n.p,{children:"To add a LegendItem programatically, typically each plot that wishes to display an item in the tooltip dispatches an action to to the redux store, and is responsible for removing it later using the following pattern;"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`useEffect(() => {
    // Add the legend item
    dispatch(chartActions.addLegendItem(legendItem));

    // Remove the legend item next time the useEffect is called.
    return () => {
        dispatch(chartActions.removeLegendItem(legendItem));
    }
}, [legendItem])
`})}),`
`,e.jsx(n.h3,{id:"legenditem-schema",children:"LegendItem Schema:"}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Note"}),": This is referring to the shape of the data in the Redux store. Not the ",e.jsx(n.code,{children:"<LegendItem>"})," component."]}),`
`]}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Prop"}),e.jsx(n.th,{children:"Type"}),e.jsx(n.th,{children:"Note"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.strong,{children:e.jsx(n.code,{children:"name*"})})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"string"})}),e.jsx(n.td,{children:"The name of the series being shown in the legend"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"icon"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"string"})}),e.jsx(n.td,{children:'The shape that should be used for the icon. One of ["circle", "square", "line", "none"]'})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"color"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"string"})}),e.jsx(n.td,{children:"The colour of the series"})]})]})]}),`
`,e.jsx("br",{})]})}function L(t={}){const{wrapper:n}=Object.assign({},r(),t.components);return n?e.jsx(n,Object.assign({},t,{children:e.jsx(d,t)})):d(t)}export{L as default};
//# sourceMappingURL=LegendOverlay-lpdHXUfg.js.map
