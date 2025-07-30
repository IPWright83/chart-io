import{j as e}from"./jsx-runtime-CB_V9I5Y.js";import{useMDXComponents as s}from"./index-DSkyVWTJ.js";import{M as a,C as o}from"./index-DXysM4eg.js";import{MixedLineAreaScatter as l,MixedScaleBand as r,MixedColumnPlotsLinear as c,MixedGroupedColumnPlots as d}from"./MixedPlot.stories-BGruP_bG.js";import"./index-CTjT7uj6.js";import"./iframe-drV2x4lN.js";import"./index-Cywu29Xx.js";import"./index-DiMW2NzS.js";import"./index-DrFu-skq.js";import"./argTypes-DuN6ki1s.js";import"./waves-BDt9gctZ.js";import"./index-MSSoR4im.js";import"./Columns-7YBzAFul.js";import"./index-D1OPLCpq.js";import"./index-Bs4_CWqv.js";import"./getParentKey-Dt0KjBfq.js";import"./index-DyxbUYfF.js";import"./defaultLocale-D2nGpDRe.js";import"./useStore-D42TxdHf.js";import"./renderCanvas-B3vh6D0b.js";import"./ensureNoScaleOverflow-BVrwbjHS.js";import"./array-2GBN5xbU.js";import"./Lines-C5HE8H6Y.js";import"./Scatters-BJwZW5dN.js";import"./interpolateMultiPath-CX2TmtXQ.js";import"./Areas-C0BRo5lG.js";import"./index-DWjDrBH7.js";import"./index-ChfY_KWg.js";import"./defaultLocale-YZNTexTf.js";import"./index-C73EMPtE.js";import"./index-BNKFbkco.js";import"./index-D8HK0Iw4.js";import"./index-BcuBy6DH.js";import"./Legend-DQ2LjqGu.js";import"./index-COgl75ap.js";import"./index-BQDzJjLo.js";import"./Circle-D2bUPI43.js";import"./Line-cv_TynKV.js";import"./Square-DM8ZByYb.js";import"./index-CD7MXqKa.js";import"./index-BOxme2CB.js";import"./index-Cn1GUACH.js";import"./Tooltip-BNhJ7WJH.js";import"./index-BK_JY7l-.js";import"./TooltipItem-Ds3NZ-zA.js";import"./index-e8nDjrQd.js";import"./index-DomMj_LS.js";import"./XAxis-NdVBz2bD.js";import"./index-DqBBfSd8.js";import"./YAxis-DVfVxPRN.js";function n(i){const t={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...s(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{title:"XYCharts/MixedPlots"}),`
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
`,e.jsx(o,{of:void 0})]})}function le(i={}){const{wrapper:t}={...s(),...i.components};return t?e.jsx(t,{...i,children:e.jsx(n,{...i})}):n(i)}export{le as default};
//# sourceMappingURL=MixedPlots-C-Uw9e3J.js.map
