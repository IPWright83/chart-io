import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{useMDXComponents as s}from"./index-D-2zTmTn.js";import{M as i}from"./index-Dw1MpZ3G.js";import"./index-DpTt3J-R.js";import"./iframe-Bho3GZXG.js";import"./index-D5nvoAmD.js";import"./index-B77L4dcM.js";import"./index-DrFu-skq.js";function n(r){const t={code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...s(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(i,{title:"Exporting"}),`
`,e.jsx(t.h1,{id:"exporting-charts",children:"Exporting Charts"}),`
`,e.jsx(t.p,{children:"chart-io provides the ability to export a chart to an image file so you can download and save charts for later. While embedding charts usually provides a better experience this is a great fallback alternative."}),`
`,e.jsx(t.h2,{id:"accessing-the-chart-ref",children:"Accessing the chart-ref"}),`
`,e.jsx(t.p,{children:"Firstly to trigger the export function, you are going to need to get a reference to the chart instance itself. This can simply be done by using the following:"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{children:`const chartRef = useRef(null);

// Assuming you have a button to trigger the export
const onExportClick = useCallback(() => {
    if (chartRef.current) {
        chartRef.current.exportImage(...);
    }
});

return (<XYChart ref={chartRef} .../>)
`})}),`
`,e.jsxs(t.h2,{id:"exportimage-parameters",children:[e.jsx(t.code,{children:"exportImage"})," parameters"]}),`
`,e.jsxs(t.p,{children:["These are the parameters that you can pass to ",e.jsx(t.code,{children:"exportImage"}),". Note that ",e.jsx(t.code,{children:"filename"})," is required."]}),`
`,e.jsxs(t.table,{children:[e.jsx(t.thead,{children:e.jsxs(t.tr,{children:[e.jsx(t.th,{children:"Category"}),e.jsx(t.th,{children:"Type"}),e.jsx(t.th,{children:"Default"}),e.jsx(t.th,{children:"Note"})]})}),e.jsxs(t.tbody,{children:[e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsxs(t.strong,{children:[e.jsx(t.code,{children:"filename"}),"*"]})}),e.jsx(t.td,{children:"string"}),e.jsx(t.td,{children:e.jsx(t.code,{children:"undefined"})}),e.jsx(t.td,{children:"The filename to save the chart to. Note that you do not need to provide the extension"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"format"})}),e.jsx(t.td,{children:"string"}),e.jsx(t.td,{children:e.jsx(t.code,{children:'"PNG"'})}),e.jsx(t.td,{children:'The format to save the chart to, either "JPG" or "PNG"'})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"scale"})}),e.jsx(t.td,{children:"number"}),e.jsx(t.td,{children:e.jsx(t.code,{children:"1"})}),e.jsx(t.td,{children:"The scale to save the chart to. Increasing this increases the dimensions and file size of the image"})]})]})]})]})}function p(r={}){const{wrapper:t}={...s(),...r.components};return t?e.jsx(t,{...r,children:e.jsx(n,{...r})}):n(r)}export{p as default};
//# sourceMappingURL=Export-C4pReqs7.js.map
