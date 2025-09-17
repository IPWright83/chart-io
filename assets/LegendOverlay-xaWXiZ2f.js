import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{useMDXComponents as d}from"./index-D-2zTmTn.js";import{M as o,C as i}from"./index-Dw1MpZ3G.js";import{Left as s}from"./LegendOverlay.stories-BuanvUtl.js";import"./index-DpTt3J-R.js";import"./iframe-Bho3GZXG.js";import"./index-D5nvoAmD.js";import"./index-B77L4dcM.js";import"./index-DrFu-skq.js";import"./react-redux-QXbQKOoW.js";import"./index-gt7zBpiH.js";import"./Legend-pimTzOFw.js";import"./index-D4-eAyeX.js";import"./index-BmYvQTbQ.js";import"./Circle-Qf3Tu8hN.js";import"./Line-BjKan0E4.js";import"./Square-CZVurtTs.js";import"./index-_rl-6daV.js";import"./renderChart-BLsEhK0I.js";import"./test-utils-C-DEfvFY.js";import"./client-CbGTh6y2.js";import"./index-Dcm7olAB.js";function r(t){const n={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...d(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{title:"Components/LegendOverlay"}),`
`,e.jsx(n.h1,{id:"legendoverlay-component",children:"LegendOverlay Component"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"<LegendOverlay>"})," component allows us to overlay a ",e.jsx(n.a,{href:"?path=/docs/components-legendoverlay-legend--docs",children:"Legend"})," component containing multiple entries, which is useful for showing the information about the different series on a chart."]}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"<LegendOverlay>"})," extracts out legend item information from the Redux store to determine when the legend should be shown, and the content that should be presented."]}),`
`,e.jsx(i,{of:s}),`
`,e.jsxs(n.h3,{id:"legendoverlay-props",children:[e.jsx(n.code,{children:"<LegendOverlay>"})," Props"]}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Prop"}),e.jsx(n.th,{children:"Type"}),e.jsx(n.th,{children:"Default"}),e.jsx(n.th,{children:"Note"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"horizontalPosition"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"string"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"RIGHT"})}),e.jsx(n.td,{children:'The horizontal position of the legend. One of "LEFT", "RIGHT" or "CENTER"'})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"verticalPosition"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"string"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"CENTER"})}),e.jsx(n.td,{children:'The vertical position of the legend. One of "TOP", "BOTTOM" or "CENTER"'})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"formatters"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"object"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"{}"})}),e.jsxs(n.td,{children:["A keyed collection of formatter functions. Key should align with ",e.jsx(n.code,{children:"x"})," or ",e.jsx(n.code,{children:"y"})," fields provided to axis/scales or plots. The format function should be of the signature ",e.jsx(n.code,{children:"(name: string) => string"})]})]})]})]}),`
`,e.jsx("br",{}),`
`,e.jsx(n.h2,{id:"adding-legend-items-programatically",children:"Adding Legend items Programatically"}),`
`,e.jsx(n.p,{children:"To add a LegendItem programatically, typically each plot that wishes to display an item in the tooltip dispatches an action to to the redux store, and is responsible for removing it later using the following pattern;"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-javascript",children:`useEffect(() => {
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
`,e.jsx("br",{})]})}function N(t={}){const{wrapper:n}={...d(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(r,{...t})}):r(t)}export{N as default};
//# sourceMappingURL=LegendOverlay-xaWXiZ2f.js.map
