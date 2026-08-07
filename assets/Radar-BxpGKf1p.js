import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{useMDXComponents as a}from"./index-D-2zTmTn.js";import{M as x,C as i}from"./index-BbU07fcW.js";import{Basic as j,DifferentDomains as p,Canvas as m,SingleSeries as f,ThreeSeries as u,Unfilled as g}from"./Radar.stories-DcH_B6OI.js";import"./index-DpTt3J-R.js";import"./iframe-Craxk075.js";import"./index-D5nvoAmD.js";import"./index-B77L4dcM.js";import"./index-DrFu-skq.js";import"./react-redux-BIxttMao.js";import"./index-Dcm7olAB.js";import"./argTypes-DuN6ki1s.js";import"./renderChart-HUqSO_BQ.js";import"./test-utils-C-DEfvFY.js";import"./client-CbGTh6y2.js";import"./storybook-C6VSxOor.js";import"./index-BrTJ4RzG.js";import"./index-Bd68MpUk.js";import"./index-DnlDykCR.js";import"./index-DrZFwq_W.js";import"./index-Dr9RXvgl.js";import"./XAxis-D7Bs4h5a.js";import"./index-DDyQNOMu.js";import"./YAxis-PGCYKAdu.js";import"./index-Q6O9tYEF.js";import"./index-CWwNrbNA.js";import"./lodash-DOJiQ2Wu.js";import"./index-BqtyGhDH.js";import"./index-CZ4pHQb2.js";import"./Legend-DQ9XwNwf.js";import"./index-BVPNhhj4.js";import"./index-BmYvQTbQ.js";import"./Circle-Qf3Tu8hN.js";import"./Line-BjKan0E4.js";import"./Square-CZVurtTs.js";import"./index-C_mwV-nm.js";import"./index-DSMIYGhk.js";import"./Tooltip-BrSlbkqa.js";import"./index-CIJ69QRa.js";import"./TooltipItem-C8j0DJCa.js";import"./Radar-BIVuLbZS.js";import"./renderCanvas-DgN6C2Td.js";import"./useTooltip-3W5NWBIO.js";function o(n){const r={blockquote:"blockquote",circle:"circle",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",li:"li",line:"line",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",text:"text",th:"th",thead:"thead",tr:"tr",ul:"ul",...a(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(x,{title:"RadialCharts/Radar"}),`
`,e.jsx(r.h1,{id:"radar-plots",children:"Radar Plots"}),`
`,e.jsxs(r.p,{children:["The ",e.jsx(r.code,{children:"<Radar>"}),` component plots one closed polygon per series, connecting a point for every field in
`,e.jsx(r.code,{children:"ys"}),` around a shared angular scale - useful for comparing several entities across multiple
quantitative variables. Unlike `,e.jsx(r.code,{children:"<Pie>"}),"/",e.jsx(r.code,{children:"<Donut>"}),"/",e.jsx(r.code,{children:"<StackedDonut>"}),`, a Radar plot needs an
`,e.jsx(r.code,{children:"<AngleAxis>"})," (spokes/category labels) and a ",e.jsx(r.code,{children:"<RadialAxis>"}),` (concentric rings/value labels) to
provide its angular and radial scales, similar to how `,e.jsx(r.code,{children:"<Line>"})," needs an ",e.jsx(r.code,{children:"<XAxis>"}),"/",e.jsx(r.code,{children:"<YAxis>"}),` within
an `,e.jsx(r.code,{children:"<XYChart>"}),". All three should be used within a ",e.jsx(r.code,{children:"<RadialChart>"}),"."]}),`
`,e.jsx(i,{of:j}),`
`,e.jsxs(r.blockquote,{children:[`
`,e.jsxs(r.p,{children:[`Comparing a fixed set of named categories? You're in the right place. Plotting a continuous
measurement instead (e.g. a value per day across a year)? See `,e.jsx(r.code,{children:"<RadialArea>"}),"."]}),`
`]}),`
`,e.jsx(r.h2,{id:"data-shape-one-row-per-series",children:"Data shape: one row per series"}),`
`,e.jsxs(r.p,{children:["Unlike most other plots, ",e.jsx(r.code,{children:"data"})," should have ",e.jsx(r.strong,{children:"one row per series"}),`, with the value for each spoke
read directly off that row. For example, comparing players across five skills:`]}),`
`,e.jsx(r.pre,{children:e.jsx(r.code,{className:"language-js",children:`const data = [
    { player: "Player A", Speed: 80, Power: 65, Defense: 70, Stamina: 85, Agility: 60 },
    { player: "Player B", Speed: 60, Power: 90, Defense: 75, Stamina: 55, Agility: 80 },
];

const ys = ["Speed", "Power", "Defense", "Stamina", "Agility"];

<Radar name="player" ys={ys} />
`})}),`
`,e.jsxs(r.p,{children:[e.jsx(r.code,{children:"name"})," is the field that identifies each row's series (",e.jsx(r.code,{children:'"player"'})," above), and ",e.jsx(r.code,{children:"ys"}),` is the ordered
list of fields to plot - one spoke per field, read from that series' own row. `,e.jsx(r.code,{children:"category"}),` is an
arbitrary key used to register the shared angular scale in the store, matching the `,e.jsx(r.code,{children:"fields"}),` prop of
the sibling `,e.jsx(r.code,{children:"<AngleAxis>"}),"; it defaults to ",e.jsx(r.code,{children:'"category"'}),` so it usually doesn't need to be set at all.
Only pass it explicitly when a chart has more than one independent Radar - e.g. two separate
`,e.jsx(r.code,{children:"<Radar>"}),"/",e.jsx(r.code,{children:"<AngleAxis>"})," pairs on the same ",e.jsx(r.code,{children:"<RadialChart>"}),` - since each pair would otherwise register
its scale under the same default key and overwrite one another:`]}),`
`,e.jsx(r.pre,{children:e.jsx(r.code,{className:"language-jsx",children:`<AngleAxis fields="skills" domain={skillFields} />
<Radar category="skills" name="player" ys={skillFields} />
<AngleAxis fields="metrics" domain={metricFields} />
<Radar category="metrics" name="player" ys={metricFields} />
`})}),`
`,e.jsxs(r.h2,{id:"angleaxis-vs-radialaxis",children:[e.jsx(r.code,{children:"<AngleAxis>"})," vs ",e.jsx(r.code,{children:"<RadialAxis>"})]}),`
`,e.jsx(r.p,{children:`These two axes are easy to mix up since they're both "radial", but they scale different things:`}),`
`,e.jsxs(r.ul,{children:[`
`,e.jsxs(r.li,{children:[e.jsx(r.strong,{children:e.jsx(r.code,{children:"<AngleAxis>"})})," places one spoke around the circle per entry in its ",e.jsx(r.code,{children:"domain"}),` (typically
`,e.jsx(r.code,{children:"domain={ys}"}),") - it controls ",e.jsx(r.em,{children:"where around the circle"})," each field's point is drawn."]}),`
`,e.jsxs(r.li,{children:[e.jsx(r.strong,{children:e.jsx(r.code,{children:"<RadialAxis>"})})," draws the concentric rings ",e.jsx(r.em,{children:"outward from the center"})," - it controls ",e.jsx(r.em,{children:`how far
out`})," a value sits. Because each field in ",e.jsx(r.code,{children:"ys"}),` can have its own independent domain (see below),
the rings are always normalized to 0-100%, rather than any one field's raw values.`]}),`
`]}),`
`,e.jsxs("svg",{viewBox:"0 0 520 260",width:"100%",style:{maxWidth:520,height:"auto"},children:[e.jsx("text",{x:"130",y:"20",textAnchor:"middle",fontSize:"13",fontWeight:"bold",fill:"currentColor",children:e.jsx(r.p,{children:"AngleAxis: spokes"})}),e.jsxs("g",{transform:"translate(130, 140)",children:[e.jsx("circle",{r:"90",fill:"none",stroke:"currentColor",strokeOpacity:"0.25"}),[0,72,144,216,288].map(s=>{const d=(s-90)*(Math.PI/180),t=90*Math.cos(d),l=90*Math.sin(d);return e.jsx(r.line,{x1:"0",y1:"0",x2:t,y2:l,stroke:"currentColor",strokeWidth:"1.5"},s)}),["Speed","Power","Defense","Stamina","Agility"].map((s,d)=>{const l=(d*72-90)*(Math.PI/180),c=108*Math.cos(l),h=108*Math.sin(l);return e.jsx(r.text,{x:c,y:h,textAnchor:"middle",fontSize:"11",fill:"currentColor",children:s},s)})]}),e.jsx("text",{x:"390",y:"20",textAnchor:"middle",fontSize:"13",fontWeight:"bold",fill:"currentColor",children:e.jsx(r.p,{children:"RadialAxis: rings"})}),e.jsxs("g",{transform:"translate(390, 140)",children:[[90,67.5,45,22.5].map(s=>e.jsx(r.circle,{r:s,fill:"none",stroke:"currentColor",strokeOpacity:"0.35"},s)),e.jsx("text",{x:"6",y:"-92",fontSize:"10",fill:"currentColor",children:"100%"}),e.jsx("text",{x:"6",y:"-47",fontSize:"10",fill:"currentColor",children:"50%"}),e.jsx("text",{x:"6",y:"-2",fontSize:"10",fill:"currentColor",children:"0%"})]})]}),`
`,e.jsx(r.h3,{id:"per-spoke-independent-domains",children:"Per-spoke independent domains"}),`
`,e.jsxs(r.p,{children:["Each field in ",e.jsx(r.code,{children:"ys"}),` gets its own independently-computed d3 scale (its own domain, automatically
typed - so a boolean or string field naturally becomes a band/point scale). This means one spoke
can represent a `,e.jsx(r.code,{children:"1-5"}),` rating while another represents a raw count or a percentage, and they'll
still land on the same normalized rings so they stay visually comparable - handy for something like
comparing GPUs across memory size, CUDA core count, and a benchmark score:`]}),`
`,e.jsx(i,{of:p}),`
`,e.jsxs(r.p,{children:[`If you'd rather all fields share one literal domain/scale unchanged (e.g. every field is already a
`,e.jsx(r.code,{children:"1-10"})," score), pass an explicit ",e.jsx(r.code,{children:"domain"})," to ",e.jsx(r.code,{children:"<RadialAxis>"})," instead - ",e.jsx(r.code,{children:"aggregate"}),` computes a domain
from the `,e.jsx(r.em,{children:"sum"})," of every field's value per row (the same aggregation ",e.jsx(r.code,{children:"<YAxis aggregate>"}),` uses to fit
a `,e.jsx(r.code,{children:"<StackedArea>"}),"'s stacked total), which is rarely what you want for independent Radar fields."]}),`
`,e.jsx(r.h3,{id:"labelling-fields",children:"Labelling fields"}),`
`,e.jsxs(r.p,{children:[e.jsx(r.code,{children:"ys"})," field keys are often not fit for display (",e.jsx(r.code,{children:"memory_gb"})," rather than ",e.jsx(r.code,{children:'"Memory (GB)"'}),`). Build a
labeller with `,e.jsx(r.code,{children:"createLabeller"})," and pass it to ",e.jsx(r.code,{children:"<RadialChart labeller>"})," - as with ",e.jsx(r.code,{children:"theme"}),`, this makes
it available to every plot/axis within that chart, not just `,e.jsx(r.code,{children:"<Radar>"}),":"]}),`
`,e.jsx(r.pre,{children:e.jsx(r.code,{className:"language-jsx",children:`const labeller = createLabeller({
    memory_gb: "Memory (GB)",
    cuda_cores: "CUDA Cores",
});

<RadialChart labeller={labeller}>
    <AngleAxis fields="category" domain={gpuFields} tickFormat={labeller} />
    <RadialAxis fields={gpuFields} />
    <Radar name="gpu" ys={gpuFields} />
</RadialChart>
`})}),`
`,e.jsxs(r.p,{children:[e.jsx(r.code,{children:"<Radar>"})," also accepts its own ",e.jsx(r.code,{children:"labeller"}),` prop directly, which overrides the chart-level one for
just that series if you need a different mapping for a specific plot.`]}),`
`,e.jsxs(r.h2,{id:"radar-component",children:[e.jsx(r.code,{children:"<Radar>"})," Component"]}),`
`,e.jsx(r.h3,{id:"props",children:"Props"}),`
`,e.jsxs(r.table,{children:[e.jsx(r.thead,{children:e.jsxs(r.tr,{children:[e.jsx(r.th,{children:"Prop"}),e.jsx(r.th,{children:"Type"}),e.jsx(r.th,{children:"Default"}),e.jsx(r.th,{children:"Note"})]})}),e.jsxs(r.tbody,{children:[e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"category"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"string"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:'"category"'})}),e.jsxs(r.td,{children:["An arbitrary store key for the shared angular scale; should match the sibling ",e.jsx(r.code,{children:"<AngleAxis>"}),"'s ",e.jsx(r.code,{children:"fields"}),". Only needs to be set when a chart has more than one independent Radar."]})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsxs(r.strong,{children:[e.jsx(r.code,{children:"name"}),"*"]})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"string"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"null"})}),e.jsxs(r.td,{children:["The key of the field that identifies each series - ",e.jsx(r.code,{children:"data"})," should have one row per series."]})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsxs(r.strong,{children:[e.jsx(r.code,{children:"ys"}),"*"]})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"string[]"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"null"})}),e.jsx(r.td,{children:"The ordered list of fields to plot, one spoke per field, read from each series' own row."})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"labeller"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"(field: string) => string"})}),e.jsx(r.td,{children:"the chart-level labeller, or identity"}),e.jsxs(r.td,{children:["Maps a ",e.jsx(r.code,{children:"ys"})," field key to a display label, used for the tooltip name shown when hovering a vertex. Overrides the chart-level labeller set via ",e.jsx(r.code,{children:"<RadialChart labeller>"}),", if any."]})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"colors"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"string[]"})}),e.jsx(r.td,{children:"Derived from Theme"}),e.jsx(r.td,{children:"Override the colours used for each series."})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"filled"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"boolean"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"true"})}),e.jsxs(r.td,{children:["Whether the series' area is filled. Set to ",e.jsx(r.code,{children:"false"})," for a stroke-only outline - useful when overlaying many series to compare trends without the fills obscuring one another."]})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"fillOpacity"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"number"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"0.15"})}),e.jsxs(r.td,{children:["The opacity of each series' filled area, when ",e.jsx(r.code,{children:"filled"})," is true."]})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"markerRadius"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"number"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"4"})}),e.jsx(r.td,{children:"The radius, in pixels, of each vertex marker."})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"interactive"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"boolean"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"true"})}),e.jsx(r.td,{children:"Whether the plot should be interactive. Setting this to false will disable tooltips from this plot"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"showInLegend"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"boolean"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"true"})}),e.jsx(r.td,{children:"Whether the plot should feature in the legend or not."})]})]})]}),`
`,e.jsx(r.h3,{id:"using-canvas",children:"Using Canvas"}),`
`,e.jsxs(r.p,{children:["Like other plots, a ",e.jsx(r.code,{children:"<Radar>"})," can be rendered using an HTML Canvas instead of SVG by setting ",e.jsx(r.code,{children:"useCanvas"}),"."]}),`
`,e.jsx(i,{of:m}),`
`,e.jsx(r.h3,{id:"single-series",children:"Single Series"}),`
`,e.jsxs(r.p,{children:[e.jsx(r.code,{children:"data"})," accepts a single row for a single-series Radar."]}),`
`,e.jsx(i,{of:f}),`
`,e.jsx(r.h3,{id:"multiple-series",children:"Multiple Series"}),`
`,e.jsxs(r.p,{children:["Add more rows to ",e.jsx(r.code,{children:"data"})," to compare several series on the same axes."]}),`
`,e.jsx(i,{of:u}),`
`,e.jsx(r.h3,{id:"unfilled-series",children:"Unfilled Series"}),`
`,e.jsxs(r.p,{children:["Set ",e.jsx(r.code,{children:"filled={false}"}),` to draw a stroke-only outline instead of a filled area. This keeps many
overlapping series readable, since the fills no longer stack up and obscure one another - useful
for spotting trends across a larger number of series at once.`]}),`
`,e.jsx(i,{of:g})]})}function oe(n={}){const{wrapper:r}={...a(),...n.components};return r?e.jsx(r,{...n,children:e.jsx(o,{...n})}):o(n)}export{oe as default};
//# sourceMappingURL=Radar-BxpGKf1p.js.map
