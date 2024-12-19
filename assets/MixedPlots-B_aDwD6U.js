import{j as e}from"./jsx-runtime-DEdD30eg.js";import{useMDXComponents as s}from"./index-CcnH5Kt0.js";import{ae as a,af as o}from"./index-C07OB8Tc.js";import{MixedLineAreaScatter as l,MixedScaleBand as r,MixedColumnPlotsLinear as c,MixedGroupedColumnPlots as d}from"./MixedPlot.stories-DFrOOfjX.js";import"./index-RYns6xqu.js";import"./iframe-D6CtwA3E.js";import"../sb-preview/runtime.js";import"./index-sbqOYYIm.js";import"./index-D-8MO0q_.js";import"./index-XRC4JhzV.js";import"./index-DrFu-skq.js";import"./argTypes-bxm3gCeR.js";import"./waves-BDt9gctZ.js";import"./index-Bcnion2k.js";import"./Columns-DvhU7O36.js";import"./index-b9bwP9Bh.js";import"./index-CXvrs8Eg.js";import"./getParentKey-CcCYm4V6.js";import"./index-COLyWrXh.js";import"./defaultLocale-D2nGpDRe.js";import"./useStore-DWdQsrPN.js";import"./renderCanvas-BCjHZwb6.js";import"./ensureNoScaleOverflow-li5UC7Oh.js";import"./array-2GBN5xbU.js";import"./Lines-PAT6BPU_.js";import"./Scatters-CPmcphPq.js";import"./interpolateMultiPath-8xM18Eij.js";import"./Areas-B3IBuDft.js";import"./index-CdkoYB7w.js";import"./index-DBRTqYFH.js";import"./defaultLocale-C7xJETwF.js";import"./index-ASiZ4-uZ.js";import"./index-BZ_hkuv1.js";import"./index-9Z0J-FDy.js";import"./index-BPZQwoq3.js";import"./Legend-DEyrexXZ.js";import"./index-DhwMs0bd.js";import"./index-CW0FTg2B.js";import"./Circle-CWMyz_tz.js";import"./Line-B_2MgdvN.js";import"./Square-CektPBZh.js";import"./index-CKF-7MCu.js";import"./index-DQ1aKZo6.js";import"./index-CLSe-My4.js";import"./Tooltip-GS-CvhnY.js";import"./index-hvi0fNyA.js";import"./TooltipItem-D1zhnsxI.js";import"./index-BQ4jfyHA.js";import"./index-D888O4bb.js";import"./XAxis-B_MFapNx.js";import"./index-B2undoSo.js";import"./YAxis-DuDb07NW.js";function n(i){const t={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...s(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{title:"XYCharts/MixedPlots"}),`
`,e.jsx(t.h1,{id:"mixed-plots",children:"Mixed Plots"}),`
`,e.jsx(t.p,{children:"It is possible to mix plot types, although depending on the scales @chart-io has to do a little bit of manipulation to try and obtain a sufficient layout due to limitations in D3. To begin with it's worth understanding the difference between continuous and discrete plots."}),`
`,e.jsx(t.p,{children:"Continuous plots are those which have a linear scales without any gaps, examples are typically:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"Line"}),`
`,e.jsx(t.li,{children:"Area"}),`
`,e.jsx(t.li,{children:"Scatter"}),`
`]}),`
`,e.jsx(t.p,{children:"Discrete plots have a finite number of values and are typically:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"Column"}),`
`,e.jsx(t.li,{children:"Bar"}),`
`]}),`
`,e.jsx(t.h2,{id:"mixing-continuous-plots",children:"Mixing Continuous Plots"}),`
`,e.jsxs(t.p,{children:["When attempting to mix continuous plots, typically a linear type scale has been selected (",e.jsx(t.code,{children:"d3.scaleLinear"})," for example) and data will line up nicely and just work."]}),`
`,e.jsx(o,{of:l}),`
`,e.jsx(t.h2,{id:"mixing-continuous-plots-with-a-band-scale",children:"Mixing Continuous Plots with a Band scale"}),`
`,e.jsxs(t.p,{children:["Using a Band scale is preferred for Column & Bar plots (set by applying ",e.jsx(t.code,{children:'scaleType="band"'})," in your ",e.jsx(t.code,{children:"<Axis>"})," or ",e.jsx(t.code,{children:"<AutoScale>"}),") adding a continuous plot will attempt to offset the data to ensure it lines up with the columns or bars."]}),`
`,e.jsxs(t.blockquote,{children:[`
`,e.jsx(t.p,{children:"You can see this affect, by noting how the line does not meet the y-axis in this example."}),`
`]}),`
`,e.jsx(o,{of:r}),`
`,e.jsx(t.h2,{id:"mixing-a-discrete-plot-with-a-continuous-scale",children:"Mixing a Discrete Plot with a Continuous Scale"}),`
`,e.jsxs(t.p,{children:["You may prefer to use a continuous scale however. In the example above we can see how the axis labels are not formatted nicely. A ",e.jsx(t.code,{children:"d3.scaleTime"})," does a much better job of formatting the labels automatically as per the first example, however this can cause bars to be cut off."]}),`
`,e.jsx(t.p,{children:"When using a discrete plot such as a Column plot witha a linear scale, @chart-io will attempt to manually calculate the width of bars as it's unable to rely on the D3 scale functionality. This relies on the first 2 data points having valid values. If it is unable to do so it will display an error in the console."}),`
`,e.jsx(o,{of:c}),`
`,e.jsxs(t.blockquote,{children:[`
`,e.jsxs(t.p,{children:["The reason for the manual calculation is Bar & Column plots typically need to use a ",e.jsx(t.a,{href:"https://github.com/d3/d3-scale#band-scales",rel:"nofollow",children:"scaleBand"}),". These scales aren't as powerful for plotting continuous data such as time, but they do provide the nice functions for padding/width of bars. So instead these are manually derived from the data."]}),`
`]}),`
`,e.jsxs(t.p,{children:["The preferred approach for mixing Columns & other plots is to stick with a ",e.jsx(t.code,{children:"band"})," scale and apply some custom formatting."]}),`
`,e.jsx(t.h2,{id:"custom-formatting",children:"Custom formatting"}),`
`,e.jsxs(t.p,{children:["Therefore it's recommended to use D3 helper functions to manually define your ",e.jsx(t.code,{children:"tickValues"})," that you want to present, and potentially the ",e.jsx(t.code,{children:"tickFormat"})," as well. The next examples do this by providing the following two props:"]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-javascript",children:`const tickFormat = useCallback((tickValue, index) => {
    return index % 3 !== 0 ?       // Only show every 3rd tick
        null :
        d3.utcFormat("%b")(value); // Use the D3 short month format
}, []);

const tickValues = useMemo(() => d3.utcMonths(...d3.extent(data.map(d => d[x]))), [data, x]);

...
<XAxis fields={args.x} scaleType="band" tickFormat={tickFormat} tickValues={tickValues} />
`})}),`
`,e.jsxs(t.h2,{id:"example-with-a-column-plot",children:["Example with a ",e.jsx(t.code,{children:"<Column>"})," plot"]}),`
`,e.jsx(o,{of:void 0}),`
`,e.jsxs(t.h2,{id:"example-with-a-grouped-columns-plot",children:["Example with a grouped ",e.jsx(t.code,{children:"<Columns>"})," plot"]}),`
`,e.jsx(o,{of:d}),`
`,e.jsxs(t.h2,{id:"example-with-a-stacked-columns-plot",children:["Example with a stacked ",e.jsx(t.code,{children:"<Columns>"})," plot"]}),`
`,e.jsx(o,{of:void 0})]})}function ce(i={}){const{wrapper:t}={...s(),...i.components};return t?e.jsx(t,{...i,children:e.jsx(n,{...i})}):n(i)}export{ce as default};
//# sourceMappingURL=MixedPlots-B_aDwD6U.js.map
