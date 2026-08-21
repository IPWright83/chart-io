import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{useMDXComponents as s}from"./index-D-2zTmTn.js";import{M as a,C as n}from"./index-9yemNRWz.js";import{MixedLineAreaScatter as l,MixedScaleBand as r,MixedColumnPlotsLinear as c,MixedGroupedColumnPlots as d}from"./MixedPlot.stories-DeaY5V-2.js";import"./index-DpTt3J-R.js";import"./iframe-BCeR5QkD.js";import"./index-D5nvoAmD.js";import"./index-B77L4dcM.js";import"./index-DrFu-skq.js";import"./argTypes-DuN6ki1s.js";import"./waves-BDt9gctZ.js";import"./index-B8eXPVPV.js";import"./Columns-DCzCoYDu.js";import"./react-redux-SPeguAgb.js";import"./index-9431aKHi.js";import"./index-BRXO1njn.js";import"./lodash-DOJiQ2Wu.js";import"./renderCanvas-CR85T-h9.js";import"./Lines-DLDdBXC5.js";import"./Scatters-3-avvN77.js";import"./Areas-mZCDmN45.js";import"./index-53SPihoZ.js";import"./index-DhP8WHXK.js";import"./index-Bdes0qwq.js";import"./index-BLxOKznu.js";import"./index-BAzb9S1k.js";import"./Legend-z40re8h9.js";import"./index-Dub0Swig.js";import"./index-BmYvQTbQ.js";import"./Circle-Qf3Tu8hN.js";import"./Line-BjKan0E4.js";import"./Square-CZVurtTs.js";import"./index-DxXlV5JW.js";import"./index-CErv1lK-.js";import"./index-9usyF_v_.js";import"./Tooltip-aPd-LmbL.js";import"./index-CRhM32cg.js";import"./TooltipItem-OfChlkFL.js";import"./index-rx8DGN-B.js";import"./index-DwL5j-mS.js";import"./index-Dd_IEiRF.js";import"./index-sBPFWXw6.js";import"./XAxis-yIVuvz3U.js";import"./index-yAu6bW1V.js";import"./YAxis-BLu4jwFE.js";function o(i){const t={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...s(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{title:"Charts/XYCharts/MixedPlots"}),`
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
`,e.jsx(n,{of:l}),`
`,e.jsx(t.h2,{id:"mixing-continuous-plots-with-a-band-scale",children:"Mixing Continuous Plots with a Band scale"}),`
`,e.jsxs(t.p,{children:["Using a Band scale is preferred for Column & Bar plots (set by applying ",e.jsx(t.code,{children:'scaleType="band"'})," in your ",e.jsx(t.code,{children:"<Axis>"})," or ",e.jsx(t.code,{children:"<AutoScale>"}),") adding a continuous plot will attempt to offset the data to ensure it lines up with the columns or bars."]}),`
`,e.jsxs(t.blockquote,{children:[`
`,e.jsx(t.p,{children:"You can see this affect, by noting how the line does not meet the y-axis in this example."}),`
`]}),`
`,e.jsx(n,{of:r}),`
`,e.jsx(t.h2,{id:"mixing-a-discrete-plot-with-a-continuous-scale",children:"Mixing a Discrete Plot with a Continuous Scale"}),`
`,e.jsxs(t.p,{children:["You may prefer to use a continuous scale however. In the example above we can see how the axis labels are not formatted nicely. A ",e.jsx(t.code,{children:"d3.scaleTime"})," does a much better job of formatting the labels automatically as per the first example, however this can cause bars to be cut off."]}),`
`,e.jsx(t.p,{children:"When using a discrete plot such as a Column plot witha a linear scale, @chart-io will attempt to manually calculate the width of bars as it's unable to rely on the D3 scale functionality. This relies on the first 2 data points having valid values. If it is unable to do so it will display an error in the console."}),`
`,e.jsx(n,{of:c}),`
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
`,e.jsx(n,{of:void 0}),`
`,e.jsxs(t.h2,{id:"example-with-a-grouped-columns-plot",children:["Example with a grouped ",e.jsx(t.code,{children:"<Columns>"})," plot"]}),`
`,e.jsx(n,{of:d}),`
`,e.jsxs(t.h2,{id:"example-with-a-stacked-columns-plot",children:["Example with a stacked ",e.jsx(t.code,{children:"<Columns>"})," plot"]}),`
`,e.jsx(n,{of:void 0})]})}function ie(i={}){const{wrapper:t}={...s(),...i.components};return t?e.jsx(t,{...i,children:e.jsx(o,{...i})}):o(i)}export{ie as default};
//# sourceMappingURL=MixedPlots-vDfCbfY8.js.map
