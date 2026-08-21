import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{useMDXComponents as n}from"./index-D-2zTmTn.js";import{M as l,C as i}from"./index-9yemNRWz.js";import{Basic as o,Canvas as t,MultipleSeries as a}from"./RadialArea.stories-DJ6Vy7AZ.js";import"./index-DpTt3J-R.js";import"./iframe-BCeR5QkD.js";import"./index-D5nvoAmD.js";import"./index-B77L4dcM.js";import"./index-DrFu-skq.js";import"./react-redux-SPeguAgb.js";import"./index-Dcm7olAB.js";import"./argTypes-DuN6ki1s.js";import"./dataControls-DatG45sm.js";import"./isChromatic-VqprqId_.js";import"./renderChart-D1szSHoV.js";import"./test-utils-C-DEfvFY.js";import"./client-CbGTh6y2.js";import"./storybook-CxwCI9RW.js";import"./index-DwL5j-mS.js";import"./index-Dd_IEiRF.js";import"./index-BRXO1njn.js";import"./lodash-DOJiQ2Wu.js";import"./index-9431aKHi.js";import"./index-sBPFWXw6.js";import"./XAxis-yIVuvz3U.js";import"./index-yAu6bW1V.js";import"./YAxis-BLu4jwFE.js";import"./index-CvJ_dlQX.js";import"./index-B6Lr3Qa8.js";import"./index-BLxOKznu.js";import"./index-BAzb9S1k.js";import"./Legend-z40re8h9.js";import"./index-Dub0Swig.js";import"./index-BmYvQTbQ.js";import"./Circle-Qf3Tu8hN.js";import"./Line-BjKan0E4.js";import"./Square-CZVurtTs.js";import"./index-DxXlV5JW.js";import"./index-9usyF_v_.js";import"./Tooltip-aPd-LmbL.js";import"./index-CRhM32cg.js";import"./TooltipItem-OfChlkFL.js";import"./index-BBDmPaB_.js";import"./RadialAreas-3Hf8RTIB.js";function d(s){const r={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...n(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(l,{title:"Charts/RadialCharts/RadialArea"}),`
`,e.jsx(r.h1,{id:"radialarea-plots",children:"RadialArea Plots"}),`
`,e.jsxs(r.p,{children:["A ",e.jsx(r.code,{children:"<RadialArea>"}),` fills the area from the center outward to a value, following a continuous angular
domain around the circle - the polar equivalent of `,e.jsx(r.code,{children:"<Area>"}),`. It's a good fit for data with a
natural, continuous ordering around a circle - most commonly a full year of dates, but any
continuous (date or number) field works.`]}),`
`,e.jsx(i,{of:o}),`
`,e.jsxs(r.h2,{id:"radialarea-vs-radar",children:[e.jsx(r.code,{children:"<RadialArea>"})," vs ",e.jsx(r.code,{children:"<Radar>"})]}),`
`,e.jsx(r.p,{children:"Both plot data around a circle, but for different shapes of data:"}),`
`,e.jsxs(r.ul,{children:[`
`,e.jsxs(r.li,{children:[e.jsx(r.strong,{children:e.jsx(r.code,{children:"<Radar>"})}),` compares a handful of named categories (e.g. "Speed", "Power", "Defense") across one
or more series - each category is a fixed spoke, so a Radar with 5 categories always has exactly
5 points per series, connected by straight lines. Good for "how do these things compare across
these attributes?".`]}),`
`,e.jsxs(r.li,{children:[e.jsx(r.strong,{children:e.jsx(r.code,{children:"<RadialArea>"})}),` plots a continuous measurement (e.g. a value per day across a year) as a smooth
filled area - there's no fixed set of categories, just as many points as there are rows of data,
and hovering anywhere shows the nearest one. Good for "how does this value trend over a cycle?".`]}),`
`]}),`
`,e.jsxs(r.p,{children:["If your x-axis is a list of named things, reach for ",e.jsx(r.code,{children:"<Radar>"}),`. If it's a continuous range of dates
or numbers, reach for `,e.jsx(r.code,{children:"<RadialArea>"}),"."]}),`
`,e.jsxs(r.h2,{id:"angleaxis-and-radialaxis",children:[e.jsx(r.code,{children:"<AngleAxis>"})," and ",e.jsx(r.code,{children:"<RadialAxis>"})]}),`
`,e.jsxs(r.p,{children:["Since the angular domain here is continuous rather than categorical, pass a continuous ",e.jsx(r.code,{children:"scaleType"}),`
(`,e.jsx(r.code,{children:'"time"'})," for dates, ",e.jsx(r.code,{children:'"linear"'})," for numbers) to ",e.jsx(r.code,{children:"<AngleAxis>"}),":"]}),`
`,e.jsx(r.pre,{children:e.jsx(r.code,{className:"language-jsx",children:`<AngleAxis fields="date" scaleType="time" />
<RadialAxis fields="temperature" />
<RadialArea x="date" y="temperature" />
`})}),`
`,e.jsxs(r.p,{children:[e.jsx(r.code,{children:"<AngleAxis>"})," then draws an evenly-spaced set of spokes (controlled by ",e.jsx(r.code,{children:"ticks"}),`) rather than one per
raw data point, the same way a `,e.jsx(r.code,{children:"<XAxis>"}),"/",e.jsx(r.code,{children:"<YAxis>"})," would for a linear/time scale."]}),`
`,e.jsxs(r.h2,{id:"radialarea-component",children:[e.jsx(r.code,{children:"<RadialArea>"})," Component"]}),`
`,e.jsx(r.h3,{id:"props",children:"Props"}),`
`,e.jsxs(r.table,{children:[e.jsx(r.thead,{children:e.jsxs(r.tr,{children:[e.jsx(r.th,{children:"Prop"}),e.jsx(r.th,{children:"Type"}),e.jsx(r.th,{children:"Default"}),e.jsx(r.th,{children:"Note"})]})}),e.jsxs(r.tbody,{children:[e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsxs(r.strong,{children:[e.jsx(r.code,{children:"x"}),"*"]})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"string"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"null"})}),e.jsx(r.td,{children:"The key of the field used for the angular position, e.g. a date or number."})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsxs(r.strong,{children:[e.jsx(r.code,{children:"y"}),"*"]})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"string"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"null"})}),e.jsxs(r.td,{children:["The key of the field used for the radial position, measured from the baseline (",e.jsx(r.code,{children:"0"}),") outward."]})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"color"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"string"})}),e.jsx(r.td,{children:"Derived from Theme"}),e.jsx(r.td,{children:"Override the colour of the series."})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"closed"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"boolean"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"false"})}),e.jsx(r.td,{children:"Draw the area as a closed loop, joining the last point back to the first. Only appropriate for a fully cyclical domain (e.g. a full year of dates) - for a partial domain, closing the loop draws an incorrect line straight across the chart."})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"filled"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"boolean"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"true"})}),e.jsxs(r.td,{children:["Whether the area is filled. Set to ",e.jsx(r.code,{children:"false"}),' for a stroke-only outline - see "Overlapping Series" below.']})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"fillOpacity"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"number"})}),e.jsx(r.td,{children:"The theme's series opacity"}),e.jsxs(r.td,{children:["The opacity of the filled area, when ",e.jsx(r.code,{children:"filled"})," is true."]})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"interactive"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"boolean"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"true"})}),e.jsx(r.td,{children:"Whether the plot should be interactive. Setting this to false will disable tooltips & markers from this plot."})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"showInLegend"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"boolean"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"true"})}),e.jsx(r.td,{children:"Whether the plot should feature in the legend or not."})]})]})]}),`
`,e.jsx(r.h3,{id:"using-canvas",children:"Using Canvas"}),`
`,e.jsxs(r.p,{children:["Like other plots, a ",e.jsx(r.code,{children:"<RadialArea>"})," can be rendered using an HTML Canvas instead of SVG by setting ",e.jsx(r.code,{children:"useCanvas"})," on the parent ",e.jsx(r.code,{children:"<RadialChart>"}),"."]}),`
`,e.jsx(i,{of:t}),`
`,e.jsxs(r.h2,{id:"radialareas-component",children:[e.jsx(r.code,{children:"<RadialAreas>"})," Component"]}),`
`,e.jsxs(r.p,{children:[e.jsx(r.code,{children:"<RadialAreas>"})," renders one ",e.jsx(r.code,{children:"<RadialArea>"})," per field in ",e.jsx(r.code,{children:"ys"}),", all sharing the same angular (",e.jsx(r.code,{children:"x"}),`)
scale - useful for comparing multiple series, e.g. the same measurement across several locations.`]}),`
`,e.jsx(r.h3,{id:"props-1",children:"Props"}),`
`,e.jsxs(r.table,{children:[e.jsx(r.thead,{children:e.jsxs(r.tr,{children:[e.jsx(r.th,{children:"Prop"}),e.jsx(r.th,{children:"Type"}),e.jsx(r.th,{children:"Default"}),e.jsx(r.th,{children:"Note"})]})}),e.jsxs(r.tbody,{children:[e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsxs(r.strong,{children:[e.jsx(r.code,{children:"x"}),"*"]})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"string"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"null"})}),e.jsx(r.td,{children:"The key of the field used for the angular position."})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsxs(r.strong,{children:[e.jsx(r.code,{children:"ys"}),"*"]})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"string[]"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"null"})}),e.jsx(r.td,{children:"The keys of the fields used for the radial position, one per series."})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"colors"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"string[]"})}),e.jsx(r.td,{children:"Derived from Theme"}),e.jsx(r.td,{children:"Override the colours for the series."})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"closed"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"boolean"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"false"})}),e.jsxs(r.td,{children:["See ",e.jsx(r.code,{children:"<RadialArea>"}),"'s own ",e.jsx(r.code,{children:"closed"})," prop."]})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"filled"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"boolean"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"true"})}),e.jsxs(r.td,{children:["See ",e.jsx(r.code,{children:"<RadialArea>"}),"'s own ",e.jsx(r.code,{children:"filled"})," prop."]})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"fillOpacity"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"number"})}),e.jsx(r.td,{children:"The theme's series opacity"}),e.jsxs(r.td,{children:["See ",e.jsx(r.code,{children:"<RadialArea>"}),"'s own ",e.jsx(r.code,{children:"fillOpacity"})," prop."]})]})]})]}),`
`,e.jsxs(r.p,{children:[`Since each field is otherwise scaled independently (so, for example, a Radar spoke can mix
different units), pass an explicit `,e.jsx(r.code,{children:"domain"})," to ",e.jsx(r.code,{children:"<RadialAxis>"})," to keep multiple ",e.jsx(r.code,{children:"<RadialArea>"}),`
series measured in the same units directly comparable at the same radius:`]}),`
`,e.jsx(r.pre,{children:e.jsx(r.code,{className:"language-jsx",children:`<RadialAxis fields={["Miami", "New York"]} domain={[0, 35]} />
<RadialAreas x="date" ys={["Miami", "New York"]} closed={true} />
`})}),`
`,e.jsx(r.h3,{id:"overlapping-series",children:"Overlapping series"}),`
`,e.jsxs(r.p,{children:[`A filled series completely covers whatever's behind it wherever its own values are greater, at
every angle - `,e.jsx(r.code,{children:"fillOpacity"}),` alone doesn't reliably fix this, since a buried series only shows
through as a faint colour blend, easy to miss (or invisible entirely once a shape is fully
contained). We deliberately don't try to detect or fix this automatically (e.g. reordering by size,
or warning when one series fully contains another) - reliably detecting "always greater at every
angle" needs per-point comparison across every series pair, which is a lot of bookkeeping for a
case with a couple of simple manual fixes:`]}),`
`,e.jsxs(r.ul,{children:[`
`,e.jsxs(r.li,{children:[`
`,e.jsxs(r.p,{children:[e.jsxs(r.strong,{children:["List the larger series first in ",e.jsx(r.code,{children:"ys"})]})," (",e.jsx(r.code,{children:"RadialAreas"}),` draws series in that order, so the first
is furthest back). Miami is warmer than New York at every point of the year, so it's listed first
here - New York, drawn on top, stays fully visible, and Miami still shows through wherever it
extends beyond New York's range:`]}),`
`,e.jsx(i,{of:a}),`
`]}),`
`,e.jsxs(r.li,{children:[`
`,e.jsxs(r.p,{children:[e.jsx(r.strong,{children:"If no single order works"}),` - e.g. two series that cross over, each larger than the other at
different angles - reach for `,e.jsx(r.code,{children:"filled={false}"}),` instead, for a stroke-only outline that stays
visible regardless of how the series overlap:`]}),`
`,e.jsx(r.pre,{children:e.jsx(r.code,{className:"language-jsx",children:`<RadialAreas x="date" ys={["Miami", "New York"]} closed={true} filled={false} />
`})}),`
`]}),`
`]})]})}function ee(s={}){const{wrapper:r}={...n(),...s.components};return r?e.jsx(r,{...s,children:e.jsx(d,{...s})}):d(s)}export{ee as default};
//# sourceMappingURL=RadialArea-D91aW8TW.js.map
