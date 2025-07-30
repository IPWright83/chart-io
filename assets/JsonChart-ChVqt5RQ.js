import{j as e}from"./jsx-runtime-CB_V9I5Y.js";import{useMDXComponents as n}from"./index-DSkyVWTJ.js";import{M as o,C as s}from"./index-DXysM4eg.js";import{Line as d}from"./JsonChart.stories-CTTKoBYk.js";import"./index-CTjT7uj6.js";import"./iframe-drV2x4lN.js";import"./index-Cywu29Xx.js";import"./index-DiMW2NzS.js";import"./index-DrFu-skq.js";import"./JsonChart-isj1dlf7.js";import"./index-DaP2QGcy.js";import"./Lines-C5HE8H6Y.js";import"./Scatters-BJwZW5dN.js";import"./index-D1OPLCpq.js";import"./index-Bs4_CWqv.js";import"./useStore-D42TxdHf.js";import"./index-DyxbUYfF.js";import"./defaultLocale-D2nGpDRe.js";import"./renderCanvas-B3vh6D0b.js";import"./interpolateMultiPath-CX2TmtXQ.js";import"./array-2GBN5xbU.js";import"./index-MSSoR4im.js";import"./Columns-7YBzAFul.js";import"./getParentKey-Dt0KjBfq.js";import"./ensureNoScaleOverflow-BVrwbjHS.js";import"./Areas-C0BRo5lG.js";import"./Bars-Xnowt69k.js";import"./index-DWjDrBH7.js";import"./index-ChfY_KWg.js";import"./defaultLocale-YZNTexTf.js";import"./index-C73EMPtE.js";import"./index-BNKFbkco.js";import"./index-D8HK0Iw4.js";import"./index-BcuBy6DH.js";import"./Legend-DQ2LjqGu.js";import"./index-COgl75ap.js";import"./index-BQDzJjLo.js";import"./Circle-D2bUPI43.js";import"./Line-cv_TynKV.js";import"./Square-DM8ZByYb.js";import"./index-CD7MXqKa.js";import"./index-BOxme2CB.js";import"./index-Cn1GUACH.js";import"./Tooltip-BNhJ7WJH.js";import"./index-BK_JY7l-.js";import"./TooltipItem-Ds3NZ-zA.js";import"./index-e8nDjrQd.js";import"./index-DomMj_LS.js";import"./XAxis-NdVBz2bD.js";import"./index-DqBBfSd8.js";import"./YAxis-DVfVxPRN.js";import"./sales_records_dataset-WHK6HSqq.js";function i(r){const t={code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...n(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{title:"Components/JsonChart"}),`
`,e.jsx(t.h1,{id:"jsonchart-component",children:"JsonChart Component"}),`
`,e.jsxs(t.p,{children:["The ",e.jsx(t.code,{children:"<JsonChart>"})," component allows us to define an XYChart with a configuration that is more easily serialized to a database by splitting out all the props into a large JSON object. Using this approach we can build most charts like so:"]}),`
`,e.jsx(s,{of:d}),`
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
`,e.jsxs(t.p,{children:["It's worth noting that a few fields that you can specify within the configuration, you will not be able to serialize to a database. Examples of these are the event handlers (",e.jsx(t.code,{children:"onMouseOver"}),", ",e.jsx(t.code,{children:"onMouseOut"}),", ",e.jsx(t.code,{children:"onClick"}),") and also some of the more advanced properties such as the Axis ",e.jsx(t.code,{children:"tickFormat"})," prop which requires a function."]})]})}function se(r={}){const{wrapper:t}={...n(),...r.components};return t?e.jsx(t,{...r,children:e.jsx(i,{...r})}):i(r)}export{se as default};
//# sourceMappingURL=JsonChart-ChVqt5RQ.js.map
