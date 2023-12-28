import{j as e}from"./jsx-runtime-vNq4Oc-g.js";import{M as i}from"./index-foGeVojo.js";import{u as s}from"./index-Dbo06S9W.js";import"./index-4g5l5LRQ.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./iframe-5ZQv1v1p.js";import"../sb-preview/runtime.js";import"./index-jmm5gWkb.js";import"./index-GCvOZpsZ.js";import"./index-bjdz4q3G.js";import"./_baseIsEqual-ujzER7rs.js";import"./uniq-dzufyT16.js";import"./index-PPLHz8o0.js";function n(r){const t=Object.assign({h1:"h1",p:"p",h2:"h2",pre:"pre",code:"code",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td",strong:"strong"},s(),r.components);return e.jsxs(e.Fragment,{children:[e.jsx(i,{title:"Exporting"}),`
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
`,e.jsxs(t.table,{children:[e.jsx(t.thead,{children:e.jsxs(t.tr,{children:[e.jsx(t.th,{children:"Category"}),e.jsx(t.th,{children:"Type"}),e.jsx(t.th,{children:"Default"}),e.jsx(t.th,{children:"Note"})]})}),e.jsxs(t.tbody,{children:[e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsxs(t.strong,{children:[e.jsx(t.code,{children:"filename"}),"*"]})}),e.jsx(t.td,{children:"string"}),e.jsx(t.td,{children:e.jsx(t.code,{children:"undefined"})}),e.jsx(t.td,{children:"The filename to save the chart to. Note that you do not need to provide the extension"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"format"})}),e.jsx(t.td,{children:"string"}),e.jsx(t.td,{children:e.jsx(t.code,{children:'"PNG"'})}),e.jsx(t.td,{children:'The format to save the chart to, either "JPG" or "PNG"'})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"scale"})}),e.jsx(t.td,{children:"number"}),e.jsx(t.td,{children:e.jsx(t.code,{children:"1"})}),e.jsx(t.td,{children:"The scale to save the chart to. Increasing this increases the dimensions and file size of the image"})]})]})]})]})}function b(r={}){const{wrapper:t}=Object.assign({},s(),r.components);return t?e.jsx(t,Object.assign({},r,{children:e.jsx(n,r)})):n(r)}export{b as default};
//# sourceMappingURL=Export-ZnQD-2O6.js.map
