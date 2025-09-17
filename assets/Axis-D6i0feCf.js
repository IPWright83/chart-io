import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{useMDXComponents as d}from"./index-D-2zTmTn.js";import{M as r,C as i}from"./index-Dw1MpZ3G.js";import{StringAxis as c,BooleanAxis as l,IntegerAxis as o,DoubleAxis as h,DoubleAxisOnlyNegativeAxis as a,DoubleAxisMixedSignAxis as x,DateAxis as j,DateTimeAxis as u}from"./AxisTypes.stories-Bs-VSEFq.js";import{Gridlines as p,FullyCustomAxis as m}from"./AxisCustomisations.stories-Cz97cL5i.js";import"./index-DpTt3J-R.js";import"./iframe-Bho3GZXG.js";import"./index-D5nvoAmD.js";import"./index-B77L4dcM.js";import"./index-DrFu-skq.js";import"./index-C_QuCFx-.js";import"./XAxis-ChDwRgF9.js";import"./index-D50cK_1g.js";import"./react-redux-QXbQKOoW.js";import"./index-CRk78wGA.js";import"./index-_rl-6daV.js";import"./lodash-DOJiQ2Wu.js";import"./axisData-DyH6sPTU.js";function t(n){const s={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...d(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{title:"Components/Axis"}),`
`,e.jsx(s.h1,{id:"axis-component",children:"Axis Component"}),`
`,e.jsxs(s.p,{children:["This ",e.jsx(s.code,{children:"<Axis>"})," component allows you to define an Axis on a chart. Underneath this automatically creates a ",e.jsx(s.code,{children:"d3.Scale"})," too, which is used by most plots to correctly translate data to on screen co-ordinates. The component takes an array of fields that you wish to display along that axis, for example:"]}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-javascript",children:`<YAxis fields={["Profit", "Loss"]} />
`})}),`
`,e.jsxs(s.p,{children:["Typically you should use the ",e.jsx(s.code,{children:"<XAxis>"})," or ",e.jsx(s.code,{children:"<YAxis>"})," component depending on the orientation, unless you want more fine grained control in which case you can use an ",e.jsx(s.code,{children:"<Axis>"}),". Each of these components will attempt to automatically determine the best axis & scale type for the data."]}),`
`,e.jsx(s.h3,{id:"props",children:"Props"}),`
`,e.jsxs(s.table,{children:[e.jsx(s.thead,{children:e.jsxs(s.tr,{children:[e.jsx(s.th,{children:"Prop"}),e.jsx(s.th,{children:"Type"}),e.jsx(s.th,{children:"Default"}),e.jsx(s.th,{children:"Note"})]})}),e.jsxs(s.tbody,{children:[e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsxs(s.strong,{children:[e.jsx(s.code,{children:"fields"}),"*"]})}),e.jsx(s.td,{children:e.jsx(s.code,{children:"Array<string>"})}),e.jsx(s.td,{children:e.jsx(s.code,{children:"undefined"})}),e.jsx(s.td,{children:"The set of fields that this axis represents. These should correspond to the fields being displayed on this Axis within the data."})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsxs(s.strong,{children:[e.jsx(s.code,{children:"position"}),"*"]})}),e.jsx(s.td,{children:e.jsx(s.code,{children:"string"})}),e.jsx(s.td,{children:e.jsx(s.code,{children:"undefined"})}),e.jsxs(s.td,{children:["The position of the axis. One of ",e.jsx(s.code,{children:"top"}),", ",e.jsx(s.code,{children:"bottom"}),", ",e.jsx(s.code,{children:"left"})," or ",e.jsx(s.code,{children:"right"}),". This will use the appropriate ",e.jsx(s.a,{href:"https://github.com/d3/d3-axis#axisTop",rel:"nofollow",children:"d3.axis"})," orientation function."]})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"showGridlines"})}),e.jsx(s.td,{children:e.jsx(s.code,{children:"boolean"})}),e.jsx(s.td,{children:e.jsx(s.code,{children:"true"})}),e.jsx(s.td,{children:"Determines whether gridlines should be shown against this axis."})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"tickFormat"})}),e.jsx(s.td,{children:e.jsx(s.code,{children:"function"})}),e.jsx(s.td,{children:e.jsx(s.code,{children:"null"})}),e.jsxs(s.td,{children:["See ",e.jsx(s.a,{href:"https://github.com/d3/d3-axis#axis_tickFormat",rel:"nofollow",children:"https://github.com/d3/d3-axis#axis_tickFormat"})]})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"ticks"})}),e.jsx(s.td,{children:e.jsx(s.code,{children:"any[]"})}),e.jsx(s.td,{children:e.jsx(s.code,{children:"null"})}),e.jsxs(s.td,{children:["See ",e.jsx(s.a,{href:"https://github.com/d3/d3-axis#axis_ticks",rel:"nofollow",children:"https://github.com/d3/d3-axis#axis_ticks"})]})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"tickSizeInner"})}),e.jsx(s.td,{children:e.jsx(s.code,{children:"number"})}),e.jsx(s.td,{children:e.jsx(s.code,{children:"6"})}),e.jsxs(s.td,{children:["See ",e.jsx(s.a,{href:"https://github.com/d3/d3-axis#axis_tickSizeInner",rel:"nofollow",children:"https://github.com/d3/d3-axis#axis_tickSizeInner"}),"."]})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"tickSizeOuter"})}),e.jsx(s.td,{children:e.jsx(s.code,{children:"number"})}),e.jsx(s.td,{children:e.jsx(s.code,{children:"6"})}),e.jsxs(s.td,{children:["See ",e.jsx(s.a,{href:"https://github.com/d3/d3-axis#axis_tickSizeOuter",rel:"nofollow",children:"https://github.com/d3/d3-axis#axis_tickSizeOuter"}),"."]})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"tickPadding"})}),e.jsx(s.td,{children:e.jsx(s.code,{children:"number"})}),e.jsx(s.td,{children:e.jsx(s.code,{children:"3"})}),e.jsxs(s.td,{children:["See ",e.jsx(s.a,{href:"https://github.com/d3/d3-axis#axis_tickPadding",rel:"nofollow",children:"https://github.com/d3/d3-axis#axis_tickPadding"}),"."]})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"tickValues"})}),e.jsx(s.td,{children:e.jsx(s.code,{children:"string[]"})}),e.jsx(s.td,{children:e.jsx(s.code,{children:"null"})}),e.jsxs(s.td,{children:["See ",e.jsx(s.a,{href:"https://github.com/d3/d3-axis#axis_tickValues",rel:"nofollow",children:"https://github.com/d3/d3-axis#axis_tickValues"})]})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"title"})}),e.jsx(s.td,{children:e.jsx(s.code,{children:"string"})}),e.jsx(s.td,{children:e.jsx(s.code,{children:"null"})}),e.jsx(s.td,{children:"The title of the axis. This will default to the value in field(s)"})]})]})]}),`
`,e.jsx("br",{}),`
`,e.jsx(s.h2,{id:"discrete-scales",children:"Discrete Scales"}),`
`,e.jsxs(s.p,{children:["Discrete scales are best suited for ",e.jsx(s.code,{children:"<Bar>"})," or ",e.jsx(s.code,{children:"<Column>"})," plots but can also be used for ",e.jsx(s.code,{children:"<Scatter>"})," plots too and are the usual scale for the following types and will produce axis like the following examples:"]}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsx(s.li,{children:"String"}),`
`,e.jsx(s.li,{children:"Boolean"}),`
`]}),`
`,e.jsx(i,{of:c}),`
`,e.jsx(i,{of:l}),`
`,e.jsx(s.h2,{id:"numerical-axis",children:"Numerical Axis"}),`
`,e.jsxs(s.p,{children:["Numerical continuous scales are best for plotting ",e.jsx(s.code,{children:"<Area>"}),", ",e.jsx(s.code,{children:"<Line>"})," and ",e.jsx(s.code,{children:"<Scatter"})," plots, although are freqeuently the scale of choice for the ",e.jsx(s.code,{children:"<YAxis>"})," on a ",e.jsx(s.code,{children:"<Column>"})," chart for example. Here are some examples showing different data types and ranges:"]}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsx(s.li,{children:"Integer"}),`
`,e.jsx(s.li,{children:"Double"}),`
`]}),`
`,e.jsx(i,{of:o}),`
`,e.jsx(i,{of:h}),`
`,e.jsx(i,{of:a}),`
`,e.jsx(i,{of:x}),`
`,e.jsx(s.h3,{id:"aggregate",children:"Aggregate"}),`
`,e.jsxs(s.p,{children:["Sometimes when using multiple fields, rather than sharing an Axis, you instead want to aggregate those values together. This is often the case if you're stacking your data. To do this you can just set the ",e.jsx(s.code,{children:"aggregate"})," property to true. If you omit this value then plots will attempt to warn you if data is going to be cropped."]}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-javascript",children:`<YAxis fields={["Sales_Revenue", "Consulting_Revenue"]} aggregate />
`})}),`
`,e.jsx(s.h3,{id:"scaletype",children:"ScaleType"}),`
`,e.jsxs(s.p,{children:["There are occasions where you may want to specify the type of d3.Scale that is used underneath. To do this you can specify the ",e.jsx(s.code,{children:"scaleType"})," explicitly. Currently you can choose one of the following options:"]}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsx(s.li,{children:"power"}),`
`,e.jsx(s.li,{children:"linear"}),`
`,e.jsx(s.li,{children:"time"}),`
`,e.jsx(s.li,{children:"log"}),`
`,e.jsx(s.li,{children:"band"}),`
`,e.jsx(s.li,{children:"point"}),`
`]}),`
`,e.jsxs(s.p,{children:["A common example when you may wish to do this is when if you wish to display numerical data on a ",e.jsx(s.code,{children:"<Column>"})," or ",e.jsx(s.code,{children:"<Bar>"})," plot. These plots require a ",e.jsx(s.strong,{children:"band"})," scale but a linear scale would be returned by default."]}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-javascript",children:`<XAxis fields="dayOfWeek" scaleType="band" />
`})}),`
`,e.jsx(s.h2,{id:"time-axis",children:"Time Axis"}),`
`,e.jsxs(s.p,{children:["Time scales are best for plotting ",e.jsx(s.code,{children:"<Area>"}),", ",e.jsx(s.code,{children:"<Line>"})," and showing data across time. The data types supported are:"]}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsx(s.li,{children:"Date"}),`
`,e.jsx(s.li,{children:"DateTime"}),`
`]}),`
`,e.jsx(i,{of:j}),`
`,e.jsx(i,{of:u}),`
`,e.jsx(s.h2,{id:"visual-styling",children:"Visual Styling"}),`
`,e.jsx(s.p,{children:"There are a number of visual styles that can be used to change the apperance of an axis. Some of these settings are controlled via the theme, while others are more specific to the chart and axis type so are controlled at the chart level."}),`
`,e.jsxs(s.p,{children:["It is possible to style the following properties by changing the ",e.jsx(s.code,{children:"theme.axis"})," object:"]}),`
`,e.jsxs(s.table,{children:[e.jsx(s.thead,{children:e.jsxs(s.tr,{children:[e.jsx(s.th,{children:"Property"}),e.jsx(s.th,{children:"Type"}),e.jsx(s.th,{children:"Default"}),e.jsx(s.th,{children:"Note"})]})}),e.jsxs(s.tbody,{children:[e.jsxs(s.tr,{children:[e.jsxs(s.td,{children:[e.jsx(s.code,{children:"stroke"}),"*"]}),e.jsx(s.td,{children:e.jsx(s.code,{children:"string"})}),e.jsx(s.td,{children:e.jsx(s.code,{children:'"#333333"'})}),e.jsx(s.td,{children:"The color of the axis"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"strokeOpacity"})}),e.jsx(s.td,{children:e.jsx(s.code,{children:"number"})}),e.jsx(s.td,{children:e.jsx(s.code,{children:"0.8"})}),e.jsx(s.td,{children:"The opacity to use for the axis"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"strokeWidth"})}),e.jsx(s.td,{children:e.jsx(s.code,{children:"number"})}),e.jsx(s.td,{children:e.jsx(s.code,{children:"1"})}),e.jsx(s.td,{children:"The stroke width to use for the axis"})]})]})]}),`
`,e.jsx(s.p,{children:"You can also enable the insertion of gridlines which is done at the axis level:"}),`
`,e.jsx(i,{of:p}),`
`,e.jsxs(s.p,{children:["You can then use the following properties to style the gridlines by changing the ",e.jsx(s.code,{children:"theme.gridlines"})," object:"]}),`
`,e.jsxs(s.table,{children:[e.jsx(s.thead,{children:e.jsxs(s.tr,{children:[e.jsx(s.th,{children:"Property"}),e.jsx(s.th,{children:"Type"}),e.jsx(s.th,{children:"Default"}),e.jsx(s.th,{children:"Note"})]})}),e.jsxs(s.tbody,{children:[e.jsxs(s.tr,{children:[e.jsxs(s.td,{children:[e.jsx(s.code,{children:"stroke"}),"*"]}),e.jsx(s.td,{children:e.jsx(s.code,{children:"string"})}),e.jsx(s.td,{children:e.jsx(s.code,{children:'"#d3d3d3"'})}),e.jsx(s.td,{children:"The color of the gridlines"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"strokeOpacity"})}),e.jsx(s.td,{children:e.jsx(s.code,{children:"number"})}),e.jsx(s.td,{children:e.jsx(s.code,{children:"0.8"})}),e.jsx(s.td,{children:"The opacity to use for the gridlines"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"strokeWidth"})}),e.jsx(s.td,{children:e.jsx(s.code,{children:"number"})}),e.jsx(s.td,{children:e.jsx(s.code,{children:"1"})}),e.jsx(s.td,{children:"The stroke width to use for the gridlines"})]})]})]}),`
`,e.jsxs(s.p,{children:["You can also adjust the following for your axis - refer to the d3-axis documentation for information on these advanced configuration options ",e.jsx(s.a,{href:"https://github.com/d3/d3-axis",rel:"nofollow",children:"https://github.com/d3/d3-axis"}),":"]}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsx(s.li,{children:e.jsx(s.code,{children:"tickPadding"})}),`
`,e.jsx(s.li,{children:e.jsx(s.code,{children:"tickSizeOuter"})}),`
`,e.jsx(s.li,{children:e.jsx(s.code,{children:"tickSizeInner"})}),`
`,e.jsx(s.li,{children:e.jsx(s.code,{children:"title"})}),`
`]}),`
`,e.jsx(s.h2,{id:"customization",children:"Customization"}),`
`,e.jsxs(s.p,{children:["It is also relatively easy to build a custom Axis that hooks directly into the chart. Note that if you're not using an ",e.jsx(s.code,{children:"XAxis"})," or ",e.jsx(s.code,{children:"YAxis"})," you may need to manually define a ",e.jsx(s.code,{children:"<Scale>"})," for your chart."]}),`
`,e.jsx(i,{of:m}),`
`,e.jsx(s.p,{children:"The above can be produced with:"}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-javascript",children:`const CustomTimeAxis = ({ fields }) => {
    const axis = useRef(null);

    const field = fields[0];
    const scale = useSelector((s) => chartSelectors.scales.getScale(s, field));

    useEffect(() => {
        if (axis.current && scale) {
            const selection = d3.select(axis.current);

            const timeFormat = d3.timeFormat("%H:%M");
            const d3Axis = d3
                .axisBottom(scale)
                .ticks(d3.timeHour.every(1))
                .tickSizeInner(30)
                .tickSizeOuter(30)
                .tickFormat((value, index) => (index % 3 === 0 ? timeFormat(value) : null));

            d3Axis.scale(scale);

            selection.call(d3Axis);
        }
    }, [scale]);

    return <g className="customAxis" ref={axis} />;
};

const CustomAxisTemplate = (args) => (
    <Chart {...args} data={axisData}>
        <XScale fields={args.fields} scaleType="time" />
        <CustomTimeAxis fields={args.fields} />
    </Chart>
);
`})})]})}function P(n={}){const{wrapper:s}={...d(),...n.components};return s?e.jsx(s,{...n,children:e.jsx(t,{...n})}):t(n)}export{P as default};
//# sourceMappingURL=Axis-D6i0feCf.js.map
