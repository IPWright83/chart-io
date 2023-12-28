import{j as e}from"./jsx-runtime-vNq4Oc-g.js";import{M as r,C as s,b as a}from"./index-foGeVojo.js";import{u as o}from"./index-Dbo06S9W.js";import"./index-4g5l5LRQ.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./iframe-5ZQv1v1p.js";import"../sb-preview/runtime.js";import"./index-jmm5gWkb.js";import"./index-GCvOZpsZ.js";import"./index-bjdz4q3G.js";import"./_baseIsEqual-ujzER7rs.js";import"./uniq-dzufyT16.js";import"./index-PPLHz8o0.js";function i(t){const n=Object.assign({h1:"h1",p:"p",code:"code",pre:"pre",h2:"h2",ul:"ul",li:"li",strong:"strong"},o(),t.components);return e.jsxs(e.Fragment,{children:[e.jsx(r,{title:"Getting Started"}),`
`,e.jsx(n.h1,{id:"getting-started",children:"Getting Started"}),`
`,e.jsxs(n.p,{children:["To get started with ",e.jsx(n.code,{children:"@chart-io"})," first ensure that you've installed the package using one of the following commands:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`npm install @chart-io/react  //npm
yarn add @chart-io/react     // yarn
pnpm add @chart-io/react     // pnpm
`})}),`
`,e.jsx(n.h2,{id:"deciding-on-your-chart-type",children:"Deciding on your chart type"}),`
`,e.jsx(n.p,{children:"Then you can start building your first chart. There are two ways to go about doing this, you can either use:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"<XYChart>"})," - simpler setup for charts with 2 Axis"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"<Chart>"})," - allows other chart types, or provides more granular control for charts with 2 Axis"]}),`
`]}),`
`,e.jsx(n.p,{children:"Typically the process of building a chart then involves:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Deciding on the fields you wish to plot"}),`
`,e.jsx(n.li,{children:"Define some Scales or Axis for these components"}),`
`,e.jsx(n.li,{children:'Creating a "Plot" for each series'}),`
`]}),`
`,e.jsxs(n.h2,{id:"basic-example-using-xychart-component",children:["Basic Example using ",e.jsx(n.code,{children:"<XYChart>"})," component"]}),`
`,e.jsxs(n.p,{children:["Here is a basic example of a column chart using the ",e.jsx(n.code,{children:"<XYChart>"})," component:"]}),`
`,e.jsx(s,{children:e.jsx(a,{id:"xycharts-column--basic"})}),`
`,e.jsx(n.p,{children:"In the code below we can see that we do a few things:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Provide the data to the chart as an array of objects"}),`
`,e.jsx(n.li,{children:"Set some margins (this provides space for the axis labels)"}),`
`,e.jsx(n.li,{children:"Set the x/y fields"}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`const data = [{ itemType: "Baby Food", price: 255 }, { itemType: "Cereal", price: 205 }, ...]
const plotMargin = { left: 70, top: 40, right: 40, bottom: 40 };

<XYChart data={data} plotMargin={plotMargin} width={800} height={500}>
    <YAxis fields="price" />
    <XAxis fields="itemType" scaleType="band" />
    <Column x="itemType" y="price" />
</XYChart>
`})}),`
`,e.jsxs(n.h2,{id:"using-the-chart-component",children:["Using the ",e.jsx(n.code,{children:"<Chart>"})," component"]}),`
`,e.jsxs(n.p,{children:["You can also build a visualization using the ",e.jsx(n.code,{children:"<Chart>"})," component, including the column chart above. However it's a little more complex. The ",e.jsx(n.code,{children:"<XYChart>"})," component takes care of adding a number of the core components that you typically want."]}),`
`,e.jsxs(n.p,{children:["To build the example above you would use the following code. You can read about the different components and what they do in the ",e.jsx(n.strong,{children:"Components"})," section of this Storybook."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`const data = [{ itemType: "Baby Food", price: 255 }, { itemType: "Cereal", price: 205 }, ...]

<Chart {...props}>
    <EventReceiver />
    <YAxis fields="price" />
    <XAxis fields="itemType" scaleType="band" />
    <Column x="itemType" y="price" />
    <Markers />
    <Droplines />
    <TooltipOverlay />
</Chart>
`})})]})}function C(t={}){const{wrapper:n}=Object.assign({},o(),t.components);return n?e.jsx(n,Object.assign({},t,{children:e.jsx(i,t)})):i(t)}export{C as default};
//# sourceMappingURL=GettingStarted-bRHQHBOA.js.map
