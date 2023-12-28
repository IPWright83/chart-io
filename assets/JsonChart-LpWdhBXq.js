import{j as e}from"./jsx-runtime-vNq4Oc-g.js";import{M as i,C as c,b as d}from"./index-foGeVojo.js";import{u as r}from"./index-Dbo06S9W.js";import"./index-4g5l5LRQ.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./iframe-5ZQv1v1p.js";import"../sb-preview/runtime.js";import"./index-jmm5gWkb.js";import"./index-GCvOZpsZ.js";import"./index-bjdz4q3G.js";import"./_baseIsEqual-ujzER7rs.js";import"./uniq-dzufyT16.js";import"./index-PPLHz8o0.js";function t(s){const n=Object.assign({h1:"h1",p:"p",code:"code",h2:"h2",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td",pre:"pre",h3:"h3"},r(),s.components);return e.jsxs(e.Fragment,{children:[e.jsx(i,{title:"Components/JsonChart"}),`
`,e.jsx(n.h1,{id:"jsonchart-component",children:"JsonChart Component"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"<JsonChart>"})," component allows us to define an XYChart with a configuration that is more easily serialized to a database by splitting out all the props into a large JSON object. Using this approach we can build most charts like so:"]}),`
`,e.jsx(c,{children:e.jsx(d,{id:"components-jsonchart--line"})}),`
`,e.jsx("br",{}),`
`,e.jsx(n.h2,{id:"creating-a-jsonchart",children:"Creating a JsonChart"}),`
`,e.jsxs(n.p,{children:["To create a JsonChart you simply need to provide it with 2 simple props ",e.jsx(n.code,{children:"config"})," and ",e.jsx(n.code,{children:"data"}),". The ",e.jsx(n.code,{children:"config"})," prop however contains multiple settings within, depending on the type of chart you want:"]}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Prop"}),e.jsx(n.th,{children:"Type"}),e.jsx(n.th,{children:"Note"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"data"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"IData"})}),e.jsx(n.td,{children:"The data for the chart"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"config"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"object"})}),e.jsx(n.td,{children:"The full configuration for the chart"})]})]})]}),`
`,e.jsxs(n.p,{children:["Breaking down the ",e.jsx(n.code,{children:"config"})," object further:"]}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Prop"}),e.jsx(n.th,{children:"Type"}),e.jsx(n.th,{children:"Note"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"chart"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"IXYChartProps"})}),e.jsx(n.td,{children:"All the chart propers (except data)"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"series"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"ISeriesConfig"})}),e.jsxs(n.td,{children:["The config for the series (split by ",e.jsx(n.code,{children:"lines"}),", ",e.jsx(n.code,{children:"areas"}),", ",e.jsx(n.code,{children:"scatters"}),", ",e.jsx(n.code,{children:"columns"})," & ",e.jsx(n.code,{children:"bars"})," )"]})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"series.lines"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"object"})}),e.jsx(n.td,{children:"The config for the line plots"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"series.scatters"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"object"})}),e.jsx(n.td,{children:"The config for the scatter plots"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"axis"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"object"})}),e.jsx(n.td,{children:"The axis config"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"axis.x"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"IXAxisProps"})}),e.jsx(n.td,{children:"The config for the x-axis"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"axis.y"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"IXAxisProps"})}),e.jsx(n.td,{children:"The config for the x-axis"})]})]})]}),`
`,e.jsx(n.p,{children:"An example of the config for the above chart is:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`const config = useMemo({
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
`,e.jsx(n.p,{children:"You should remember to memoize objects when dealing with large config objects to prevent unnecessary re-renders."}),`
`,e.jsx(n.h3,{id:"limitations",children:"Limitations:"}),`
`,e.jsxs(n.p,{children:["It's worth noting that a few fields that you can specify within the configuration, you will not be able to serialize to a database. Examples of these are the event handlers (",e.jsx(n.code,{children:"onMouseOver"}),", ",e.jsx(n.code,{children:"onMouseOut"}),", ",e.jsx(n.code,{children:"onClick"}),") and also some of the more advanced properties such as the Axis ",e.jsx(n.code,{children:"tickFormat"})," prop which requires a function."]})]})}function C(s={}){const{wrapper:n}=Object.assign({},r(),s.components);return n?e.jsx(n,Object.assign({},s,{children:e.jsx(t,s)})):t(s)}export{C as default};
//# sourceMappingURL=JsonChart-LpWdhBXq.js.map
