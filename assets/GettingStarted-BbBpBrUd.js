import{j as e}from"./jsx-runtime-CB_V9I5Y.js";import{useMDXComponents as o}from"./index-DSkyVWTJ.js";import{M as r,C as s}from"./index-DXysM4eg.js";import{Basic as a}from"./Column.stories-D-TUmWYE.js";import"./index-CTjT7uj6.js";import"./iframe-drV2x4lN.js";import"./index-Cywu29Xx.js";import"./index-DiMW2NzS.js";import"./index-DrFu-skq.js";import"./index-D1OPLCpq.js";import"./index-Dcm7olAB.js";import"./sales_records_dataset-WHK6HSqq.js";import"./argTypes-DuN6ki1s.js";import"./renderChart-BAvMHNLK.js";import"./test-utils-Be8GUZmg.js";import"./client-BipHwt7r.js";import"./storybook-BRKXWPEB.js";import"./index-DWjDrBH7.js";import"./index-ChfY_KWg.js";import"./index-DyxbUYfF.js";import"./defaultLocale-D2nGpDRe.js";import"./useStore-D42TxdHf.js";import"./index-Bs4_CWqv.js";import"./defaultLocale-YZNTexTf.js";import"./index-C73EMPtE.js";import"./index-BNKFbkco.js";import"./index-D8HK0Iw4.js";import"./index-BcuBy6DH.js";import"./Legend-DQ2LjqGu.js";import"./index-COgl75ap.js";import"./index-BQDzJjLo.js";import"./Circle-D2bUPI43.js";import"./Line-cv_TynKV.js";import"./Square-DM8ZByYb.js";import"./index-CD7MXqKa.js";import"./index-BOxme2CB.js";import"./index-Cn1GUACH.js";import"./Tooltip-BNhJ7WJH.js";import"./index-BK_JY7l-.js";import"./TooltipItem-Ds3NZ-zA.js";import"./index-e8nDjrQd.js";import"./index-DomMj_LS.js";import"./XAxis-NdVBz2bD.js";import"./index-DqBBfSd8.js";import"./YAxis-DVfVxPRN.js";import"./Columns-7YBzAFul.js";import"./getParentKey-Dt0KjBfq.js";import"./renderCanvas-B3vh6D0b.js";import"./ensureNoScaleOverflow-BVrwbjHS.js";import"./array-2GBN5xbU.js";function n(i){const t={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...o(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{title:"Getting Started"}),`
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
`})})]})}function oe(i={}){const{wrapper:t}={...o(),...i.components};return t?e.jsx(t,{...i,children:e.jsx(n,{...i})}):n(i)}export{oe as default};
//# sourceMappingURL=GettingStarted-BbBpBrUd.js.map
