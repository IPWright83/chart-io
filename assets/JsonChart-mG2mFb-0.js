import{j as e}from"./jsx-runtime-DEdD30eg.js";import{useMDXComponents as n}from"./index-CcnH5Kt0.js";import{ae as o,af as s}from"./index-C07OB8Tc.js";import{Line as d}from"./JsonChart.stories-BDT3CJOx.js";import"./index-RYns6xqu.js";import"./iframe-D6CtwA3E.js";import"../sb-preview/runtime.js";import"./index-sbqOYYIm.js";import"./index-D-8MO0q_.js";import"./index-XRC4JhzV.js";import"./index-DrFu-skq.js";import"./JsonChart-CnTWs4w1.js";import"./index-BHTGSyHG.js";import"./Lines-PAT6BPU_.js";import"./Scatters-CPmcphPq.js";import"./index-b9bwP9Bh.js";import"./index-CXvrs8Eg.js";import"./useStore-DWdQsrPN.js";import"./index-COLyWrXh.js";import"./defaultLocale-D2nGpDRe.js";import"./renderCanvas-BCjHZwb6.js";import"./interpolateMultiPath-8xM18Eij.js";import"./array-2GBN5xbU.js";import"./index-Bcnion2k.js";import"./Columns-DvhU7O36.js";import"./getParentKey-CcCYm4V6.js";import"./ensureNoScaleOverflow-li5UC7Oh.js";import"./Areas-B3IBuDft.js";import"./Bars-DBTbwrTG.js";import"./index-CdkoYB7w.js";import"./index-DBRTqYFH.js";import"./defaultLocale-C7xJETwF.js";import"./index-ASiZ4-uZ.js";import"./index-BZ_hkuv1.js";import"./index-9Z0J-FDy.js";import"./index-BPZQwoq3.js";import"./Legend-DEyrexXZ.js";import"./index-DhwMs0bd.js";import"./index-CW0FTg2B.js";import"./Circle-CWMyz_tz.js";import"./Line-B_2MgdvN.js";import"./Square-CektPBZh.js";import"./index-CKF-7MCu.js";import"./index-DQ1aKZo6.js";import"./index-CLSe-My4.js";import"./Tooltip-GS-CvhnY.js";import"./index-hvi0fNyA.js";import"./TooltipItem-D1zhnsxI.js";import"./index-BQ4jfyHA.js";import"./index-D888O4bb.js";import"./XAxis-B_MFapNx.js";import"./index-B2undoSo.js";import"./YAxis-DuDb07NW.js";import"./sales_records_dataset-WHK6HSqq.js";function i(r){const t={code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...n(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{title:"Components/JsonChart"}),`
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
`,e.jsxs(t.p,{children:["It's worth noting that a few fields that you can specify within the configuration, you will not be able to serialize to a database. Examples of these are the event handlers (",e.jsx(t.code,{children:"onMouseOver"}),", ",e.jsx(t.code,{children:"onMouseOut"}),", ",e.jsx(t.code,{children:"onClick"}),") and also some of the more advanced properties such as the Axis ",e.jsx(t.code,{children:"tickFormat"})," prop which requires a function."]})]})}function ce(r={}){const{wrapper:t}={...n(),...r.components};return t?e.jsx(t,{...r,children:e.jsx(i,{...r})}):i(r)}export{ce as default};
//# sourceMappingURL=JsonChart-mG2mFb-0.js.map
