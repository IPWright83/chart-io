import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{useMDXComponents as r}from"./index-D-2zTmTn.js";import{M as i,C as d}from"./index-9yemNRWz.js";import{East as o,SouthEast as h,WithSizeLegend as c}from"./LegendOverlay.stories-CX1viC01.js";import"./index-DpTt3J-R.js";import"./iframe-BCeR5QkD.js";import"./index-D5nvoAmD.js";import"./index-B77L4dcM.js";import"./index-DrFu-skq.js";import"./react-redux-SPeguAgb.js";import"./index-BAzb9S1k.js";import"./Legend-z40re8h9.js";import"./index-Dub0Swig.js";import"./index-BmYvQTbQ.js";import"./Circle-Qf3Tu8hN.js";import"./Line-BjKan0E4.js";import"./Square-CZVurtTs.js";import"./index-9431aKHi.js";import"./renderChart-D1szSHoV.js";import"./test-utils-C-DEfvFY.js";import"./client-CbGTh6y2.js";import"./index-Dcm7olAB.js";function s(t){const n={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...r(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(i,{title:"Components/LegendOverlay"}),`
`,e.jsx(n.h1,{id:"legendoverlay-component",children:"LegendOverlay Component"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"<LegendOverlay>"})," component allows us to overlay a ",e.jsx(n.a,{href:"?path=/docs/components-legendoverlay-legend--docs",children:"Legend"})," component containing multiple entries, which is useful for showing the information about the different series on a chart."]}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"<LegendOverlay>"})," extracts out legend item information from the Redux store to determine when the legend should be shown, and the content that should be presented."]}),`
`,e.jsx(d,{of:o}),`
`,e.jsxs(n.h3,{id:"legendoverlay-props",children:[e.jsx(n.code,{children:"<LegendOverlay>"})," Props"]}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Prop"}),e.jsx(n.th,{children:"Type"}),e.jsx(n.th,{children:"Default"}),e.jsx(n.th,{children:"Note"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"position"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"string"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:'"E"'})}),e.jsxs(n.td,{children:["The compass position to dock the legend at initially: one of ",e.jsx(n.code,{children:'"N"'}),", ",e.jsx(n.code,{children:'"NE"'}),", ",e.jsx(n.code,{children:'"E"'}),", ",e.jsx(n.code,{children:'"SE"'}),", ",e.jsx(n.code,{children:'"S"'}),", ",e.jsx(n.code,{children:'"SW"'}),", ",e.jsx(n.code,{children:'"W"'}),", ",e.jsx(n.code,{children:'"NW"'}),'. See "Moving the Legend" below.']})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"formatters"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"object"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"{}"})}),e.jsxs(n.td,{children:["A keyed collection of formatter functions. Key should align with ",e.jsx(n.code,{children:"x"})," or ",e.jsx(n.code,{children:"y"})," fields provided to axis/scales or plots. The format function should be of the signature ",e.jsx(n.code,{children:"(name: string) => string"})]})]})]})]}),`
`,e.jsx("br",{}),`
`,e.jsx(n.h2,{id:"moving-the-legend",children:"Moving the Legend"}),`
`,e.jsx(n.p,{children:`The Legend can be dragged to reposition it. Rather than staying wherever it's dropped, it docks to
whichever of the 8 compass positions around the edge of the chart it's released nearest to - so it
always ends up flush against an edge or corner, never floating in the middle of the plot.`}),`
`,e.jsx(d,{of:h}),`
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
`,e.jsx("br",{}),`
`,e.jsx(n.h2,{id:"size-legend",children:"Size Legend"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"<ZAxis>"}),` registers a size legend, which the Legend renders as a nested-circle diagram at its
bottom - see the `,e.jsx(n.a,{href:"?path=/docs/charts-xycharts-scatter--docs",children:"Scatter docs"}),` for sizing bubbles with
`,e.jsx(n.code,{children:"<ZAxis>"}),"."]}),`
`,e.jsx(d,{of:c}),`
`,e.jsx("br",{})]})}function k(t={}){const{wrapper:n}={...r(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(s,{...t})}):s(t)}export{k as default};
//# sourceMappingURL=LegendOverlay-DJCTSqFN.js.map
