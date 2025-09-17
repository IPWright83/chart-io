import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{useMDXComponents as n}from"./index-D-2zTmTn.js";import{M as s,C as o}from"./index-Dw1MpZ3G.js";import{Line as d}from"./JsonChart.stories-Cx5evLoy.js";import"./index-DpTt3J-R.js";import"./iframe-Bho3GZXG.js";import"./index-D5nvoAmD.js";import"./index-B77L4dcM.js";import"./index-DrFu-skq.js";import"./JsonChart-CudaRnwQ.js";import"./index-r1ySBL9M.js";import"./Lines-BtR_OUgn.js";import"./Scatters-t7a3qHKk.js";import"./react-redux-QXbQKOoW.js";import"./index-_rl-6daV.js";import"./index-CRk78wGA.js";import"./renderCanvas-Cl5RbTFF.js";import"./index-C3dhlPHa.js";import"./Columns-Dzd93bGI.js";import"./Areas-DNR506EA.js";import"./Bars-CA0K2ZMO.js";import"./index-Bg6IsbDW.js";import"./index-D50cK_1g.js";import"./lodash-DOJiQ2Wu.js";import"./index-D53rF_3R.js";import"./index-Du5VnEcz.js";import"./index-CJyk9Ty5.js";import"./index-gt7zBpiH.js";import"./Legend-pimTzOFw.js";import"./index-D4-eAyeX.js";import"./index-BmYvQTbQ.js";import"./Circle-Qf3Tu8hN.js";import"./Line-BjKan0E4.js";import"./Square-CZVurtTs.js";import"./index-B2ADnR9i.js";import"./index-mxfEYTca.js";import"./index-BEVv-T-d.js";import"./Tooltip-DL_pUHjQ.js";import"./index-BH_8yRl6.js";import"./TooltipItem-CWwi-etI.js";import"./index-BXRhMbPE.js";import"./index-C_QuCFx-.js";import"./XAxis-ChDwRgF9.js";import"./index-DIhe8qvN.js";import"./YAxis-DSGnzgTy.js";import"./sales_records_dataset-WHK6HSqq.js";function i(r){const t={code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...n(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"Components/JsonChart"}),`
`,e.jsx(t.h1,{id:"jsonchart-component",children:"JsonChart Component"}),`
`,e.jsxs(t.p,{children:["The ",e.jsx(t.code,{children:"<JsonChart>"})," component allows us to define an XYChart with a configuration that is more easily serialized to a database by splitting out all the props into a large JSON object. Using this approach we can build most charts like so:"]}),`
`,e.jsx(o,{of:d}),`
`,e.jsx("br",{}),`
`,e.jsx(t.h2,{id:"creating-a-jsonchart",children:"Creating a JsonChart"}),`
`,e.jsxs(t.p,{children:["To create a JsonChart you simply need to provide it with 2 simple props ",e.jsx(t.code,{children:"config"})," and ",e.jsx(t.code,{children:"data"}),". The ",e.jsx(t.code,{children:"config"})," prop however contains multiple settings within, depending on the type of chart you want:"]}),`
`,e.jsxs(t.table,{children:[e.jsx(t.thead,{children:e.jsxs(t.tr,{children:[e.jsx(t.th,{children:"Prop"}),e.jsx(t.th,{children:"Type"}),e.jsx(t.th,{children:"Note"})]})}),e.jsxs(t.tbody,{children:[e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"data"})}),e.jsx(t.td,{children:e.jsx(t.code,{children:"IData"})}),e.jsx(t.td,{children:"The data for the chart"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"config"})}),e.jsx(t.td,{children:e.jsx(t.code,{children:"object"})}),e.jsx(t.td,{children:"The full configuration for the chart"})]})]})]}),`
`,e.jsxs(t.p,{children:["Breaking down the ",e.jsx(t.code,{children:"config"})," object further:"]}),`
`,e.jsxs(t.table,{children:[e.jsx(t.thead,{children:e.jsxs(t.tr,{children:[e.jsx(t.th,{children:"Prop"}),e.jsx(t.th,{children:"Type"}),e.jsx(t.th,{children:"Note"})]})}),e.jsxs(t.tbody,{children:[e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"chart"})}),e.jsx(t.td,{children:e.jsx(t.code,{children:"IXYChartProps"})}),e.jsx(t.td,{children:"All the chart propers (except data)"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"series"})}),e.jsx(t.td,{children:e.jsx(t.code,{children:"ISeriesConfig"})}),e.jsxs(t.td,{children:["The config for the series (split by ",e.jsx(t.code,{children:"lines"}),", ",e.jsx(t.code,{children:"areas"}),", ",e.jsx(t.code,{children:"scatters"}),", ",e.jsx(t.code,{children:"columns"})," & ",e.jsx(t.code,{children:"bars"})," )"]})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"series.lines"})}),e.jsx(t.td,{children:e.jsx(t.code,{children:"object"})}),e.jsx(t.td,{children:"The config for the line plots"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"series.scatters"})}),e.jsx(t.td,{children:e.jsx(t.code,{children:"object"})}),e.jsx(t.td,{children:"The config for the scatter plots"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"axis"})}),e.jsx(t.td,{children:e.jsx(t.code,{children:"object"})}),e.jsx(t.td,{children:"The axis config"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"axis.x"})}),e.jsx(t.td,{children:e.jsx(t.code,{children:"IXAxisProps"})}),e.jsx(t.td,{children:"The config for the x-axis"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"axis.y"})}),e.jsx(t.td,{children:e.jsx(t.code,{children:"IXAxisProps"})}),e.jsx(t.td,{children:"The config for the x-axis"})]})]})]}),`
`,e.jsx(t.p,{children:"An example of the config for the above chart is:"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-javascript",children:`const config = useMemo({
    {
        chart: {
            width: 800,
        },
        axis: {
            x: {
                fields: "Order Date",
            },
        },
        series: {
            lines: {
                ys: ["Total Cost", "Total Profit"],
            },
        },
    },
});
`})}),`
`,e.jsx(t.p,{children:"You should remember to memoize objects when dealing with large config objects to prevent unnecessary re-renders."}),`
`,e.jsx(t.h3,{id:"limitations",children:"Limitations:"}),`
`,e.jsxs(t.p,{children:["It's worth noting that a few fields that you can specify within the configuration, you will not be able to serialize to a database. Examples of these are the event handlers (",e.jsx(t.code,{children:"onMouseOver"}),", ",e.jsx(t.code,{children:"onMouseOut"}),", ",e.jsx(t.code,{children:"onClick"}),") and also some of the more advanced properties such as the Axis ",e.jsx(t.code,{children:"tickFormat"})," prop which requires a function."]})]})}function ee(r={}){const{wrapper:t}={...n(),...r.components};return t?e.jsx(t,{...r,children:e.jsx(i,{...r})}):i(r)}export{ee as default};
//# sourceMappingURL=JsonChart-3LNYTp4B.js.map
