import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{useMDXComponents as o}from"./index-D-2zTmTn.js";import{M as r,C as s}from"./index-3it-_4RI.js";import{Basic as a}from"./Column.stories-gxpLHo91.js";import"./index-DpTt3J-R.js";import"./iframe-BCCGJMhD.js";import"./index-D5nvoAmD.js";import"./index-B77L4dcM.js";import"./index-DrFu-skq.js";import"./index.es-DoiyW41S.js";import"./index-CFMwmiIJ.js";import"./sales_records_dataset-WHK6HSqq.js";import"./argTypes-DuN6ki1s.js";import"./dataControls-DatG45sm.js";import"./isChromatic-VqprqId_.js";import"./renderChart-DJ6bXfoi.js";import"./react-redux-lkBMRsz6.js";import"./test-utils-C-DEfvFY.js";import"./client-CbGTh6y2.js";import"./storybook-Cl2DMVpH.js";import"./index-CBSNT1TE.js";import"./index-VyfXoxD0.js";import"./index-5Gl1ki1p.js";import"./index-DzcEfe_2.js";import"./calculateScale-CBIGWBP9.js";import"./index-DVqBs4fh.js";import"./XAxis-CgOaLwq3.js";import"./index-C8nU8Xpn.js";import"./YAxis-CRYvaCDj.js";import"./index-DC1bvwxr.js";import"./index-DMa6aJSy.js";import"./index-Gn9jQ5lq.js";import"./lodash-DOJiQ2Wu.js";import"./index-CaWU7ljP.js";import"./ContextMenu-Dkh4zLYP.js";import"./index-HNMvlCFe.js";import"./index-DVRV05yR.js";import"./index-CsGapHqM.js";import"./index-CFwzIhDn.js";import"./Legend-DQjp6Mmo.js";import"./index-Bp2RIjag.js";import"./index-BmYvQTbQ.js";import"./Circle-Qf3Tu8hN.js";import"./Line-BjKan0E4.js";import"./Square-CZVurtTs.js";import"./index-BkBTUWQV.js";import"./index-CCgpevYr.js";import"./index-DVli7D7_.js";import"./Tooltip-aFreqMLS.js";import"./index-iwe53Xj-.js";import"./TooltipItem-D41oQ2An.js";import"./index-Dn87vz0y.js";import"./Columns-BwyQb29h.js";import"./renderCanvas-DSAxZURY.js";function n(i){const t={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...o(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{title:"Getting Started"}),`
`,e.jsx(t.h1,{id:"getting-started",children:"Getting Started"}),`
`,e.jsxs(t.p,{children:["To get started with ",e.jsx(t.code,{children:"@chart-io"})," first ensure that you've installed the package using one of the following commands:"]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-bash",children:`npm install @chart-io/react  //npm
yarn add @chart-io/react     // yarn
pnpm add @chart-io/react     // pnpm
`})}),`
`,e.jsx(t.h2,{id:"deciding-on-your-chart-type",children:"Deciding on your chart type"}),`
`,e.jsx(t.p,{children:"Then you can start building your first chart. There are two ways to go about doing this, you can either use:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:[e.jsx(t.code,{children:"<XYChart>"})," - simpler setup for charts with 2 Axis"]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.code,{children:"<Chart>"})," - allows other chart types, or provides more granular control for charts with 2 Axis"]}),`
`]}),`
`,e.jsx(t.p,{children:"Typically the process of building a chart then involves:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"Deciding on the fields you wish to plot"}),`
`,e.jsx(t.li,{children:"Define some Scales or Axis for these components"}),`
`,e.jsx(t.li,{children:'Creating a "Plot" for each series'}),`
`]}),`
`,e.jsxs(t.h2,{id:"basic-example-using-xychart-component",children:["Basic Example using ",e.jsx(t.code,{children:"<XYChart>"})," component"]}),`
`,e.jsxs(t.p,{children:["Here is a basic example of a column chart using the ",e.jsx(t.code,{children:"<XYChart>"})," component:"]}),`
`,e.jsx(s,{of:a}),`
`,e.jsx(t.p,{children:"In the code below we can see that we do a few things:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"Provide the data to the chart as an array of objects"}),`
`,e.jsx(t.li,{children:"Set some margins (this provides space for the axis labels)"}),`
`,e.jsx(t.li,{children:"Set the x/y fields"}),`
`]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-javascript",children:`const data = [{ itemType: "Baby Food", price: 255 }, { itemType: "Cereal", price: 205 }, ...]
const plotMargin = { left: 70, top: 40, right: 40, bottom: 40 };

<XYChart data={data} plotMargin={plotMargin} width={800} height={500}>
    <YAxis fields="price" />
    <XAxis fields="itemType" scaleType="band" />
    <Column x="itemType" y="price" />
</XYChart>
`})}),`
`,e.jsxs(t.h2,{id:"using-the-chart-component",children:["Using the ",e.jsx(t.code,{children:"<Chart>"})," component"]}),`
`,e.jsxs(t.p,{children:["You can also build a visualization using the ",e.jsx(t.code,{children:"<Chart>"})," component, including the column chart above. However it's a little more complex. The ",e.jsx(t.code,{children:"<XYChart>"})," component takes care of adding a number of the core components that you typically want."]}),`
`,e.jsxs(t.p,{children:["To build the example above you would use the following code. You can read about the different components and what they do in the ",e.jsx(t.strong,{children:"Components"})," section of this Storybook."]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-javascript",children:`const data = [{ itemType: "Baby Food", price: 255 }, { itemType: "Cereal", price: 205 }, ...]

<Chart {...props}>
    <EventReceiver />
    <YAxis fields="price" />
    <XAxis fields="itemType" scaleType="band" />
    <Column x="itemType" y="price" />
    <Markers />
    <Droplines />
    <TooltipOverlay />
</Chart>
`})})]})}function ce(i={}){const{wrapper:t}={...o(),...i.components};return t?e.jsx(t,{...i,children:e.jsx(n,{...i})}):n(i)}export{ce as default};
//# sourceMappingURL=GettingStarted-RKrf-iXB.js.map
