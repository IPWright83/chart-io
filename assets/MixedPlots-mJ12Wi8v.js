import{j as e}from"./jsx-runtime-vNq4Oc-g.js";import{M as l,C as i,b as s}from"./index-foGeVojo.js";import{u as a}from"./index-Dbo06S9W.js";import"./index-4g5l5LRQ.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./iframe-5ZQv1v1p.js";import"../sb-preview/runtime.js";import"./index-jmm5gWkb.js";import"./index-GCvOZpsZ.js";import"./index-bjdz4q3G.js";import"./_baseIsEqual-ujzER7rs.js";import"./uniq-dzufyT16.js";import"./index-PPLHz8o0.js";function o(n){const t=Object.assign({h1:"h1",p:"p",ul:"ul",li:"li",h2:"h2",code:"code",blockquote:"blockquote",a:"a",pre:"pre"},a(),n.components);return e.jsxs(e.Fragment,{children:[e.jsx(l,{title:"XYCharts/MixedPlots"}),`
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
`,e.jsx(i,{children:e.jsx(s,{id:"xycharts-mixedplots--mixed-line-area-scatter"})}),`
`,e.jsx(t.h2,{id:"mixing-continuous-plots-with-a-band-scale",children:"Mixing Continuous Plots with a Band scale"}),`
`,e.jsxs(t.p,{children:["Using a Band scale is preferred for Column & Bar plots (set by applying ",e.jsx(t.code,{children:'scaleType="band"'})," in your ",e.jsx(t.code,{children:"<Axis>"})," or ",e.jsx(t.code,{children:"<AutoScale>"}),") adding a continuous plot will attempt to offset the data to ensure it lines up with the columns or bars."]}),`
`,e.jsxs(t.blockquote,{children:[`
`,e.jsx(t.p,{children:"You can see this affect, by noting how the line does not meet the y-axis in this example."}),`
`]}),`
`,e.jsx(i,{children:e.jsx(s,{id:"xycharts-mixedplots--mixed-scale-band"})}),`
`,e.jsx(t.h2,{id:"mixing-a-discrete-plot-with-a-continuous-scale",children:"Mixing a Discrete Plot with a Continuous Scale"}),`
`,e.jsxs(t.p,{children:["You may prefer to use a continuous scale however. In the example above we can see how the axis labels are not formatted nicely. A ",e.jsx(t.code,{children:"d3.scaleTime"})," does a much better job of formatting the labels automatically as per the first example, however this can cause bars to be cut off."]}),`
`,e.jsx(t.p,{children:"When using a discrete plot such as a Column plot witha a linear scale, @chart-io will attempt to manually calculate the width of bars as it's unable to rely on the D3 scale functionality. This relies on the first 2 data points having valid values. If it is unable to do so it will display an error in the console."}),`
`,e.jsx(i,{children:e.jsx(s,{id:"xycharts-mixedplots--mixed-column-plots-linear"})}),`
`,e.jsxs(t.blockquote,{children:[`
`,e.jsxs(t.p,{children:["The reason for the manual calculation is Bar & Column plots typically need to use a ",e.jsx(t.a,{href:"https://github.com/d3/d3-scale#band-scales",target:"_blank",rel:"nofollow noopener noreferrer",children:"scaleBand"}),". These scales aren't as powerful for plotting continuous data such as time, but they do provide the nice functions for padding/width of bars. So instead these are manually derived from the data."]}),`
`]}),`
`,e.jsxs(t.p,{children:["The preferred approach for mixing Columns & other plots is to stick with a ",e.jsx(t.code,{children:"band"})," scale and apply some custom formatting."]}),`
`,e.jsx(t.h2,{id:"custom-formatting",children:"Custom formatting"}),`
`,e.jsxs(t.p,{children:["Therefore it's recommended to use D3 helper functions to manually define your ",e.jsx(t.code,{children:"tickValues"})," that you want to present, and potentially the ",e.jsx(t.code,{children:"tickFormat"})," as well. The next examples do this by providing the following two props:"]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{children:`const tickFormat = useCallback((tickValue, index) => {
    return index % 3 !== 0 ?       // Only show every 3rd tick
        null :
        d3.utcFormat("%b")(value); // Use the D3 short month format
}, []);

const tickValues = useMemo(() => d3.utcMonths(...d3.extent(data.map(d => d[x]))), [data, x]);

...
<XAxis fields={args.x} scaleType="band" tickFormat={tickFormat} tickValues={tickValues} />
`})}),`
`,e.jsxs(t.h2,{id:"example-with-a-column-plot",children:["Example with a ",e.jsx(t.code,{children:"<Column>"})," plot"]}),`
`,e.jsx(i,{children:e.jsx(s,{id:"xycharts-mixedplots--mixed-column-plots"})}),`
`,e.jsxs(t.h2,{id:"example-with-a-grouped-columns-plot",children:["Example with a grouped ",e.jsx(t.code,{children:"<Columns>"})," plot"]}),`
`,e.jsx(i,{children:e.jsx(s,{id:"xycharts-mixedplots--mixed-grouped-column-plots"})}),`
`,e.jsxs(t.h2,{id:"example-with-a-stacked-columns-plot",children:["Example with a stacked ",e.jsx(t.code,{children:"<Columns>"})," plot"]}),`
`,e.jsx(i,{children:e.jsx(s,{id:"xycharts-mixedplots--mixed-stacked-column-plots"})})]})}function g(n={}){const{wrapper:t}=Object.assign({},a(),n.components);return t?e.jsx(t,Object.assign({},n,{children:e.jsx(o,n)})):o(n)}export{g as default};
//# sourceMappingURL=MixedPlots-mJ12Wi8v.js.map
