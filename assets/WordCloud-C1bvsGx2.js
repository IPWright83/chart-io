import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{useMDXComponents as o}from"./index-D-2zTmTn.js";import{M as i,C as t}from"./index-9yemNRWz.js";import{Basic as s,Canvas as c,Rotated as l}from"./WordCloud.stories-D72AN9Sg.js";import"./index-DpTt3J-R.js";import"./iframe-BCeR5QkD.js";import"./index-D5nvoAmD.js";import"./index-B77L4dcM.js";import"./index-DrFu-skq.js";import"./react-redux-SPeguAgb.js";import"./index-Dcm7olAB.js";import"./argTypes-DuN6ki1s.js";import"./dataControls-DatG45sm.js";import"./isChromatic-VqprqId_.js";import"./renderChart-D1szSHoV.js";import"./test-utils-C-DEfvFY.js";import"./client-CbGTh6y2.js";import"./storybook-CxwCI9RW.js";import"./index-Cl-eCd-x.js";import"./index-BRXO1njn.js";import"./lodash-DOJiQ2Wu.js";import"./index-9431aKHi.js";import"./index-BAzb9S1k.js";import"./Legend-z40re8h9.js";import"./index-Dub0Swig.js";import"./index-BmYvQTbQ.js";import"./Circle-Qf3Tu8hN.js";import"./Line-BjKan0E4.js";import"./Square-CZVurtTs.js";import"./index-9usyF_v_.js";import"./Tooltip-aPd-LmbL.js";import"./index-CRhM32cg.js";import"./TooltipItem-OfChlkFL.js";import"./renderCanvas-CR85T-h9.js";import"./useTooltip-BlFpqfM-.js";function n(d){const r={blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...o(),...d.components};return e.jsxs(e.Fragment,{children:[e.jsx(i,{title:"Charts/Miscellaneous/WordCloud"}),`
`,e.jsx(r.h1,{id:"wordcloud-plots",children:"WordCloud Plots"}),`
`,e.jsxs(r.p,{children:["The ",e.jsx(r.code,{children:"<WordCloud>"})," component sizes each word in a flat dataset's ",e.jsx(r.code,{children:"category"}),` field proportionally to
`,e.jsx(r.code,{children:"value"}),`, and packs the words - largest first, working outward from the center - into the available
space without overlapping. It's a self-contained chart - like `,e.jsx(r.code,{children:"<Treemap>"}),"/",e.jsx(r.code,{children:"<CirclePacking>"}),`, it accepts
chart-level props like `,e.jsx(r.code,{children:"data"}),"/",e.jsx(r.code,{children:"width"}),"/",e.jsx(r.code,{children:"height"})," directly, since it only ever has a single plot."]}),`
`,e.jsx(t,{of:s}),`
`,e.jsxs(r.h2,{id:"wordcloud-component",children:[e.jsx(r.code,{children:"<WordCloud>"})," Component"]}),`
`,e.jsx(r.h3,{id:"props",children:"Props"}),`
`,e.jsxs(r.table,{children:[e.jsx(r.thead,{children:e.jsxs(r.tr,{children:[e.jsx(r.th,{children:"Prop"}),e.jsx(r.th,{children:"Type"}),e.jsx(r.th,{children:"Default"}),e.jsx(r.th,{children:"Note"})]})}),e.jsxs(r.tbody,{children:[e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsxs(r.strong,{children:[e.jsx(r.code,{children:"category"}),"*"]})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"string"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"null"})}),e.jsx(r.td,{children:"The key of the field that contains the text for each word."})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsxs(r.strong,{children:[e.jsx(r.code,{children:"value"}),"*"]})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"string"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"null"})}),e.jsx(r.td,{children:"The key of the field that contains the size for each word."})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"minFontSize"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"number"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"12"})}),e.jsx(r.td,{children:"The font-size, in pixels, given to the word with the smallest value."})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"maxFontSize"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"number"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"60"})}),e.jsx(r.td,{children:"The font-size, in pixels, given to the word with the largest value."})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"padding"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"number"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"2"})}),e.jsx(r.td,{children:"The gap, in pixels, kept clear around every word, so neighbouring words never visually touch."})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"fontFamily"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"string"})}),e.jsx(r.td,{children:"Derived from Theme"}),e.jsx(r.td,{children:"The font family words are rendered in."})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"rotate"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"boolean"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"false"})}),e.jsx(r.td,{children:"Should alternating words be rotated 90 degrees, for a more traditional word cloud look?"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"colors"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"string[]"})}),e.jsx(r.td,{children:"Derived from Theme"}),e.jsx(r.td,{children:"The set of colors to cycle through for each word."})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"measureText"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"function"})}),e.jsxs(r.td,{children:["A ",e.jsx(r.code,{children:"<canvas>"}),"-based measurer"]}),e.jsx(r.td,{children:"Measures the pixel dimensions a word would take up at a given font-size - see below."})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"interactive"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"boolean"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"true"})}),e.jsx(r.td,{children:"Whether the plot should be interactive. Setting this to false will disable tooltips from this plot."})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"showInLegend"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"boolean"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"false"})}),e.jsx(r.td,{children:"Whether the plot should feature in the legend or not."})]})]})]}),`
`,e.jsxs(r.p,{children:[e.jsx(r.code,{children:"<WordCloud>"})," also accepts the usual chart-level props - ",e.jsx(r.code,{children:"data"}),", ",e.jsx(r.code,{children:"width"}),", ",e.jsx(r.code,{children:"height"}),", ",e.jsx(r.code,{children:"plotMargin"}),`,
`,e.jsx(r.code,{children:"theme"}),", ",e.jsx(r.code,{children:"animationDuration"}),", ",e.jsx(r.code,{children:"onClick"}),"/",e.jsx(r.code,{children:"onMouseOver"}),"/",e.jsx(r.code,{children:"onMouseOut"}),` and so on - directly, since it's a
self-contained chart.`]}),`
`,e.jsxs(r.blockquote,{children:[`
`,e.jsxs(r.p,{children:[e.jsx(r.strong,{children:"Note"}),": Every value in the ",e.jsx(r.code,{children:"category"}),` field should be unique in the data. If your data has multiple
rows for the same word, aggregate it first.`]}),`
`]}),`
`,e.jsx(r.h3,{id:"placement-order",children:"Placement order"}),`
`,e.jsxs(r.p,{children:[`Words are always placed largest-first, working outward from the center along an Archimedean spiral -
unlike `,e.jsx(r.code,{children:"<Treemap>"}),"/",e.jsx(r.code,{children:"<CirclePacking>"}),"'s ",e.jsx(r.code,{children:"sort"}),`, this isn't a cosmetic option: a spiral layout only
produces a tightly packed cloud when the most prominent words claim the center first, so there's no
`,e.jsx(r.code,{children:"sort"})," prop to turn it off."]}),`
`,e.jsxs(r.p,{children:[`If a word's bounding box can't be placed anywhere in the available space without overlapping another
word - most often because there are too many words, or `,e.jsx(r.code,{children:"minFontSize"}),"/",e.jsx(r.code,{children:"maxFontSize"}),` are set too large
for the chart's `,e.jsx(r.code,{children:"width"}),"/",e.jsx(r.code,{children:"height"})," - it's dropped from the layout entirely and a ",e.jsx(r.code,{children:"W010"}),` warning is
logged. Widen the chart, shrink the font-size range, reduce `,e.jsx(r.code,{children:"padding"}),", or trim the dataset to fix it."]}),`
`,e.jsx(r.h3,{id:"using-canvas",children:"Using Canvas"}),`
`,e.jsxs(r.p,{children:["Like other plots, a ",e.jsx(r.code,{children:"<WordCloud>"})," can be rendered using an HTML Canvas instead of SVG by setting ",e.jsx(r.code,{children:"useCanvas"}),"."]}),`
`,e.jsx(t,{of:c}),`
`,e.jsx(r.h3,{id:"rotated-words",children:"Rotated words"}),`
`,e.jsxs(r.p,{children:["Set ",e.jsx(r.code,{children:"rotate"}),` to alternate every other placed word between horizontal and vertical, for the more
traditional word cloud look:`]}),`
`,e.jsx(t,{of:l}),`
`,e.jsx(r.pre,{children:e.jsx(r.code,{className:"language-jsx",children:`<WordCloud category="word" value="count" rotate={true} />
`})}),`
`,e.jsx(r.h3,{id:"custom-text-measurement",children:"Custom text measurement"}),`
`,e.jsxs(r.p,{children:["By default, each word's rendered width/height is measured with a detached ",e.jsx(r.code,{children:"<canvas>"}),` 2D context - the
standard way to measure text in a browser. If `,e.jsx(r.code,{children:"<canvas>"}),` isn't available in your environment, or your
font needs custom letter-spacing/loading behaviour accounted for, pass your own `,e.jsx(r.code,{children:"measureText"}),` matching
the signature used internally by `,e.jsx(r.code,{children:"computeWordCloudLayout"}),", exported from ",e.jsx(r.code,{children:"@chart-io/core"}),":"]}),`
`,e.jsx(r.pre,{children:e.jsx(r.code,{className:"language-jsx",children:`import { computeWordCloudLayout } from "@chart-io/core";

<WordCloud
    category="word"
    value="count"
    measureText={(text, fontSize, fontFamily) => {
        // Return the pixel dimensions \`text\` would take up at \`fontSize\`/\`fontFamily\`
        return { width: text.length * fontSize * 0.6, height: fontSize * 1.1 };
    }}
/>
`})})]})}function H(d={}){const{wrapper:r}={...o(),...d.components};return r?e.jsx(r,{...d,children:e.jsx(n,{...d})}):n(d)}export{H as default};
//# sourceMappingURL=WordCloud-C1bvsGx2.js.map
