import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{useMDXComponents as n}from"./index-D-2zTmTn.js";import{M as o,C as s}from"./index-BbU07fcW.js";import{Line as d}from"./JsonChart.stories-C8DPfdlR.js";import"./index-DpTt3J-R.js";import"./iframe-Craxk075.js";import"./index-D5nvoAmD.js";import"./index-B77L4dcM.js";import"./index-DrFu-skq.js";import"./JsonChart-DTo_XfKa.js";import"./index-Bl9paP-p.js";import"./Lines-7z9s4wNn.js";import"./Scatters-CWMQ6d13.js";import"./react-redux-BIxttMao.js";import"./index-DrZFwq_W.js";import"./index-DnlDykCR.js";import"./renderCanvas-DgN6C2Td.js";import"./index-D6EDLvj9.js";import"./Columns-C6MdJ0W5.js";import"./Areas-YrYkQUqw.js";import"./Bars-CbRSn-69.js";import"./index-CaZ68rVx.js";import"./interpolateArc-C5p3tsSp.js";import"./useTooltip-3W5NWBIO.js";import"./index-Bitjf20_.js";import"./Radar-BIVuLbZS.js";import"./index-BrTJ4RzG.js";import"./index-Bd68MpUk.js";import"./index-Dr9RXvgl.js";import"./XAxis-D7Bs4h5a.js";import"./index-DDyQNOMu.js";import"./YAxis-PGCYKAdu.js";import"./index-OT6NwBHW.js";import"./index-CWwNrbNA.js";import"./lodash-DOJiQ2Wu.js";import"./index-BZCcI5Qt.js";import"./index-9P8qsy9Z.js";import"./index-BqtyGhDH.js";import"./index-CZ4pHQb2.js";import"./Legend-DQ9XwNwf.js";import"./index-BVPNhhj4.js";import"./index-BmYvQTbQ.js";import"./Circle-Qf3Tu8hN.js";import"./Line-BjKan0E4.js";import"./Square-CZVurtTs.js";import"./index-C_mwV-nm.js";import"./index-BljJ1e5J.js";import"./index-DSMIYGhk.js";import"./Tooltip-BrSlbkqa.js";import"./index-CIJ69QRa.js";import"./TooltipItem-C8j0DJCa.js";import"./index-C2WdQQJ3.js";import"./sales_records_dataset-WHK6HSqq.js";function i(r){const t={code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...n(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{title:"Components/JsonChart"}),`
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
`,e.jsxs(t.p,{children:["It's worth noting that a few fields that you can specify within the configuration, you will not be able to serialize to a database. Examples of these are the event handlers (",e.jsx(t.code,{children:"onMouseOver"}),", ",e.jsx(t.code,{children:"onMouseOut"}),", ",e.jsx(t.code,{children:"onClick"}),") and also some of the more advanced properties such as the Axis ",e.jsx(t.code,{children:"tickFormat"})," prop which requires a function."]})]})}function de(r={}){const{wrapper:t}={...n(),...r.components};return t?e.jsx(t,{...r,children:e.jsx(i,{...r})}):i(r)}export{de as default};
//# sourceMappingURL=JsonChart-eJbuQynZ.js.map
