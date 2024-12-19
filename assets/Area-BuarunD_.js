import{j as e}from"./jsx-runtime-DEdD30eg.js";import{useMDXComponents as i}from"./index-CcnH5Kt0.js";import{ae as o,af as t}from"./index-C07OB8Tc.js";import{Basic as d,Stream as l,Color as h,MultipleAreas as c,StackedAreas as a,StackedAreasWithBrush as x}from"./Area.stories-DFTuiPHN.js";import"./index-RYns6xqu.js";import"./iframe-D6CtwA3E.js";import"../sb-preview/runtime.js";import"./index-sbqOYYIm.js";import"./index-D-8MO0q_.js";import"./index-XRC4JhzV.js";import"./index-DrFu-skq.js";import"./index-CPFb5ytF.js";import"./waves-BDt9gctZ.js";import"./argTypes-bxm3gCeR.js";import"./index-b9bwP9Bh.js";import"./renderChart-C4tDReWK.js";import"./test-utils-pcsCGetG.js";import"./client-BylhC-KR.js";import"./storybook-DsatEiwt.js";import"./index-CdkoYB7w.js";import"./index-DBRTqYFH.js";import"./index-COLyWrXh.js";import"./defaultLocale-D2nGpDRe.js";import"./useStore-DWdQsrPN.js";import"./index-CXvrs8Eg.js";import"./defaultLocale-C7xJETwF.js";import"./index-ASiZ4-uZ.js";import"./index-BZ_hkuv1.js";import"./index-9Z0J-FDy.js";import"./index-BPZQwoq3.js";import"./Legend-DEyrexXZ.js";import"./index-DhwMs0bd.js";import"./index-CW0FTg2B.js";import"./Circle-CWMyz_tz.js";import"./Line-B_2MgdvN.js";import"./Square-CektPBZh.js";import"./index-CKF-7MCu.js";import"./index-DQ1aKZo6.js";import"./index-CLSe-My4.js";import"./Tooltip-GS-CvhnY.js";import"./index-hvi0fNyA.js";import"./TooltipItem-D1zhnsxI.js";import"./index-BQ4jfyHA.js";import"./index-D888O4bb.js";import"./XAxis-B_MFapNx.js";import"./index-B2undoSo.js";import"./YAxis-DuDb07NW.js";import"./Areas-B3IBuDft.js";import"./interpolateMultiPath-8xM18Eij.js";import"./array-2GBN5xbU.js";import"./ensureNoScaleOverflow-li5UC7Oh.js";function n(s){const r={blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...i(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{title:"XYCharts/Area"}),`
`,e.jsx(r.h1,{id:"area-plots",children:"Area Plots"}),`
`,e.jsx(r.p,{children:"There are two different Area based components, these include:"}),`
`,e.jsxs(r.ul,{children:[`
`,e.jsxs(r.li,{children:[e.jsx(r.code,{children:"<Area>"})," - allows us to define an area plot on our chart"]}),`
`,e.jsxs(r.li,{children:[e.jsx(r.code,{children:"<Areas>"})," - allows us to define multiple area series, or a stacked plot"]}),`
`]}),`
`,e.jsxs(r.blockquote,{children:[`
`,e.jsxs(r.p,{children:[e.jsx(r.strong,{children:"Note"}),": To ensure interactivity this component should be used with the ",e.jsx(r.code,{children:"<EventRecorder>"})," component which picks up events on the background and pipes them to the plot."]}),`
`]}),`
`,e.jsxs(r.h2,{id:"area-component",children:[e.jsx(r.code,{children:"<Area>"})," Component"]}),`
`,e.jsxs(r.p,{children:["The ",e.jsx(r.code,{children:"<Area>"})," component should be used when you want to plot a single area plot on a chart."]}),`
`,e.jsx(t,{of:d}),`
`,e.jsx(r.h3,{id:"props",children:"Props"}),`
`,e.jsxs(r.table,{children:[e.jsx(r.thead,{children:e.jsxs(r.tr,{children:[e.jsx(r.th,{children:"Prop"}),e.jsx(r.th,{children:"Type"}),e.jsx(r.th,{children:"Default"}),e.jsx(r.th,{children:"Note"})]})}),e.jsxs(r.tbody,{children:[e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsxs(r.strong,{children:[e.jsx(r.code,{children:"x"}),"*"]})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"string"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"null"})}),e.jsx(r.td,{children:"The key of the field that contains the value along the x-axis."})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsxs(r.strong,{children:[e.jsx(r.code,{children:"y"}),"*"]})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"string"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"null"})}),e.jsx(r.td,{children:"The key of the field that contains the value along the y-axis."})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"y2"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"string"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"null"})}),e.jsx(r.td,{children:"The key of the field that contains the y2 value for a stream graph style."})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"color"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"string"})}),e.jsx(r.td,{children:"Derived from Theme"}),e.jsx(r.td,{children:"Override the colour of the series"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"interactive"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"boolean"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"true"})}),e.jsx(r.td,{children:"Whether the plot should be interactive. Setting this to false will disable tooltips & markers from this plot"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"showInLegend"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"boolean"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"true"})}),e.jsx(r.td,{children:"Whether the plot should feature in the legend or not."})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"noClip"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"boolean"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"false"})}),e.jsx(r.td,{children:"Supress clipping of the plot."})]})]})]}),`
`,e.jsx(r.h3,{id:"stream-graph",children:"Stream Graph"}),`
`,e.jsx(r.pre,{children:e.jsx(r.code,{className:"language-javascript",children:`export const StreamAreaTemplate = (args) => (
    <Chart {...args} data={sales_records_dataset}>
        <YAxis fields={[args.y, args.y2]} />
        <XAxis fields={[args.x]} showGridlines={false} />
        <Area
            x={args.x}
            y={args.y}
            y2={args.y2}
            radius={args.radius}
            color={args.color}
            animationDuration={args.animationDuration}
        />
    </Chart>
);
`})}),`
`,e.jsxs(r.p,{children:["The ",e.jsx(r.code,{children:"<Area>"})," component also allows us to represent a Stream plot."]}),`
`,e.jsx(t,{of:l}),`
`,e.jsx(r.h3,{id:"visual-styling",children:"Visual Styling"}),`
`,e.jsxs(r.p,{children:["Most of the configuration for a ",e.jsx(r.code,{children:"<Area>"})," is similar to other plots. Currently the only styling property avaliable is the colour option."]}),`
`,e.jsx(t,{of:h}),`
`,e.jsx(r.h2,{id:"areas-component",children:e.jsx(r.code,{children:"<Areas> Component"})}),`
`,e.jsxs(r.p,{children:["The ",e.jsx(r.code,{children:"<Areas>"})," component allows us to define multiple area series. There are two ways to combine multiple area plots, either:"]}),`
`,e.jsxs(r.ul,{children:[`
`,e.jsx(r.li,{children:"Overlapping Areas"}),`
`,e.jsx(r.li,{children:"Stacked Areas"}),`
`]}),`
`,e.jsx(r.h2,{id:"props-1",children:"Props"}),`
`,e.jsxs(r.table,{children:[e.jsx(r.thead,{children:e.jsxs(r.tr,{children:[e.jsx(r.th,{children:"Prop"}),e.jsx(r.th,{children:"Type"}),e.jsx(r.th,{children:"Default"}),e.jsx(r.th,{children:"Note"})]})}),e.jsxs(r.tbody,{children:[e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsxs(r.strong,{children:[e.jsx(r.code,{children:"x"}),"*"]})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"string"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"null"})}),e.jsx(r.td,{children:"The key of the field that contains the value along the x-axis."})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsxs(r.strong,{children:[e.jsx(r.code,{children:"ys"}),"*"]})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"string[]"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"null"})}),e.jsx(r.td,{children:"The keys of the fields that contains values along the y-axis."})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"colors"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"string[]"})}),e.jsx(r.td,{children:"Derived from Theme"}),e.jsx(r.td,{children:"Override the colours for the series"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"stacked"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"boolean"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"false"})}),e.jsx(r.td,{children:"Whether the plots should be stacked. If false they will be overlayed"})]})]})]}),`
`,e.jsx(r.h3,{id:"overlapping-areas",children:"Overlapping Areas"}),`
`,e.jsxs(r.p,{children:["The simplest way is to use the ",e.jsx(r.code,{children:"<Areas>"})," (plural) component. The ",e.jsx(r.code,{children:"<Areas>"})," component allows us to define multiple series at once and takes care of automaticallying layering and assigning colors. It is however possible to do this manually if required by defining multiple ",e.jsx(r.code,{children:"<Area>"})," components, configuring with a colour manually."]}),`
`,e.jsx(r.p,{children:"The results of either approach, render in exactly the same way:"}),`
`,e.jsx(t,{of:c}),`
`,e.jsx(r.h3,{id:"stacked-charts",children:"Stacked Charts"}),`
`,e.jsxs(r.p,{children:["Another way to to combine area plots is to stack them on top of each other. To stack area plots you ",e.jsx(r.strong,{children:"must"})," use the ",e.jsx(r.code,{children:"<Areas>"})," (plural) component and ensure that you set stacked field ",e.jsx(r.code,{children:"<Areas ... stacked={true} />"}),"."]}),`
`,e.jsxs(r.p,{children:["The chart will attempt to warn you, but you should also set the ",e.jsx(r.code,{children:"aggregate"})," field on your X Axis/Scale as otherwise the data will overflow of the top of the scale ",e.jsx(r.code,{children:"<XAxis ... aggregate={true} />"}),"."]}),`
`,e.jsx(t,{of:a}),`
`,e.jsx(r.h3,{id:"zooming",children:"Zooming"}),`
`,e.jsxs(r.p,{children:['It is also possible to enable "brush" zooming on an Area chart. To do this simply provide a the following prop to the ',e.jsx(r.code,{children:"<XYChart>"})," component:"]}),`
`,e.jsx(r.pre,{children:e.jsx(r.code,{className:"language-javascript",children:`<XYChart zoomBrush="inline" />
`})}),`
`,e.jsx(t,{of:x})]})}function ce(s={}){const{wrapper:r}={...i(),...s.components};return r?e.jsx(r,{...s,children:e.jsx(n,{...s})}):n(s)}export{ce as default};
//# sourceMappingURL=Area-BuarunD_.js.map
