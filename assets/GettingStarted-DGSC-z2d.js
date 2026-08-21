import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{useMDXComponents as o}from"./index-D-2zTmTn.js";import{M as r,C as s}from"./index-9yemNRWz.js";import{Basic as a}from"./Column.stories-CTP0yCsD.js";import"./index-DpTt3J-R.js";import"./iframe-BCeR5QkD.js";import"./index-D5nvoAmD.js";import"./index-B77L4dcM.js";import"./index-DrFu-skq.js";import"./react-redux-SPeguAgb.js";import"./index-Dcm7olAB.js";import"./sales_records_dataset-WHK6HSqq.js";import"./argTypes-DuN6ki1s.js";import"./dataControls-DatG45sm.js";import"./isChromatic-VqprqId_.js";import"./renderChart-D1szSHoV.js";import"./test-utils-C-DEfvFY.js";import"./client-CbGTh6y2.js";import"./storybook-CxwCI9RW.js";import"./index-DwL5j-mS.js";import"./index-Dd_IEiRF.js";import"./index-BRXO1njn.js";import"./lodash-DOJiQ2Wu.js";import"./index-9431aKHi.js";import"./index-sBPFWXw6.js";import"./XAxis-yIVuvz3U.js";import"./index-yAu6bW1V.js";import"./YAxis-BLu4jwFE.js";import"./index-53SPihoZ.js";import"./index-DhP8WHXK.js";import"./index-Bdes0qwq.js";import"./index-BLxOKznu.js";import"./index-BAzb9S1k.js";import"./Legend-z40re8h9.js";import"./index-Dub0Swig.js";import"./index-BmYvQTbQ.js";import"./Circle-Qf3Tu8hN.js";import"./Line-BjKan0E4.js";import"./Square-CZVurtTs.js";import"./index-DxXlV5JW.js";import"./index-CErv1lK-.js";import"./index-9usyF_v_.js";import"./Tooltip-aPd-LmbL.js";import"./index-CRhM32cg.js";import"./TooltipItem-OfChlkFL.js";import"./index-rx8DGN-B.js";import"./Columns-DCzCoYDu.js";import"./renderCanvas-CR85T-h9.js";function n(i){const t={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...o(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{title:"Getting Started"}),`
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
`})})]})}function ie(i={}){const{wrapper:t}={...o(),...i.components};return t?e.jsx(t,{...i,children:e.jsx(n,{...i})}):n(i)}export{ie as default};
//# sourceMappingURL=GettingStarted-DGSC-z2d.js.map
