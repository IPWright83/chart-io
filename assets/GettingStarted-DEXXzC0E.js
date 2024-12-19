import{j as e}from"./jsx-runtime-DEdD30eg.js";import{useMDXComponents as o}from"./index-CcnH5Kt0.js";import{ae as r,af as s}from"./index-C07OB8Tc.js";import{Basic as a}from"./Column.stories-D4lEetFn.js";import"./index-RYns6xqu.js";import"./iframe-D6CtwA3E.js";import"../sb-preview/runtime.js";import"./index-sbqOYYIm.js";import"./index-D-8MO0q_.js";import"./index-XRC4JhzV.js";import"./index-DrFu-skq.js";import"./index-b9bwP9Bh.js";import"./index-CPFb5ytF.js";import"./sales_records_dataset-WHK6HSqq.js";import"./argTypes-bxm3gCeR.js";import"./renderChart-C4tDReWK.js";import"./test-utils-pcsCGetG.js";import"./client-BylhC-KR.js";import"./storybook-DsatEiwt.js";import"./index-CdkoYB7w.js";import"./index-DBRTqYFH.js";import"./index-COLyWrXh.js";import"./defaultLocale-D2nGpDRe.js";import"./useStore-DWdQsrPN.js";import"./index-CXvrs8Eg.js";import"./defaultLocale-C7xJETwF.js";import"./index-ASiZ4-uZ.js";import"./index-BZ_hkuv1.js";import"./index-9Z0J-FDy.js";import"./index-BPZQwoq3.js";import"./Legend-DEyrexXZ.js";import"./index-DhwMs0bd.js";import"./index-CW0FTg2B.js";import"./Circle-CWMyz_tz.js";import"./Line-B_2MgdvN.js";import"./Square-CektPBZh.js";import"./index-CKF-7MCu.js";import"./index-DQ1aKZo6.js";import"./index-CLSe-My4.js";import"./Tooltip-GS-CvhnY.js";import"./index-hvi0fNyA.js";import"./TooltipItem-D1zhnsxI.js";import"./index-BQ4jfyHA.js";import"./index-D888O4bb.js";import"./XAxis-B_MFapNx.js";import"./index-B2undoSo.js";import"./YAxis-DuDb07NW.js";import"./Columns-DvhU7O36.js";import"./getParentKey-CcCYm4V6.js";import"./renderCanvas-BCjHZwb6.js";import"./ensureNoScaleOverflow-li5UC7Oh.js";import"./array-2GBN5xbU.js";function n(i){const t={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...o(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{title:"Getting Started"}),`
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
`})})]})}function se(i={}){const{wrapper:t}={...o(),...i.components};return t?e.jsx(t,{...i,children:e.jsx(n,{...i})}):n(i)}export{se as default};
//# sourceMappingURL=GettingStarted-DEXXzC0E.js.map
