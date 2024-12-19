import{j as e}from"./jsx-runtime-DEdD30eg.js";import{useMDXComponents as o}from"./index-CcnH5Kt0.js";import{ae as i,af as r}from"./index-C07OB8Tc.js";import{Default as c}from"./RectangleClipPath.stories-4fkVXtHU.js";import"./index-RYns6xqu.js";import"./iframe-D6CtwA3E.js";import"../sb-preview/runtime.js";import"./index-sbqOYYIm.js";import"./index-D-8MO0q_.js";import"./index-XRC4JhzV.js";import"./index-DrFu-skq.js";import"./index-b9bwP9Bh.js";import"./index-DQ1aKZo6.js";import"./renderChart-C4tDReWK.js";import"./test-utils-pcsCGetG.js";import"./client-BylhC-KR.js";import"./index-CPFb5ytF.js";function a(t){const n={code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...o(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(i,{title:"Components/RectangleClipPath"}),`
`,e.jsx(n.h1,{id:"rectangleclippath-component",children:"RectangleClipPath Component"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"<RectangleClipPath>"})," component allows us to create a clip path to ensure that any artifacts that appear outside the visible range are not rendered. This is especially useful when zooming into the domain on a chart so is frequently used with Brushes."]}),`
`,e.jsxs(n.p,{children:["In the example below a black rectangle has been added to show the dimensions of the ",e.jsx(n.code,{children:"<RectangleClipPath>"})," component. You can see how the circle has been chopped in half and anything outside of the clip path does not render."]}),`
`,e.jsx(r,{of:c}),`
`,e.jsx(n.h2,{id:"adding-a-rectangleclippath",children:"Adding a RectangleClipPath"}),`
`,e.jsxs(n.p,{children:["To use a ",e.jsx(n.code,{children:"<RectangleClipPath>"})," component you should wrap it around all your children that require clipping. For example you may wrap several plots like so:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-javascript",children:`<RectangleClipPath>
    <Line x="x" y="y" />
    <Line x="x" y="y2" />
</RectangleClipPath>
`})}),`
`,e.jsxs(n.p,{children:["This will dynamically inject a ",e.jsx(n.code,{children:"clipPath"})," prop into the components which can be consumed using the form:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-javascript",children:"const MyClippedComponent = ({ clipPath }: { clipPath?: string }) => {\n    return <circle clipPath={`url(#${clipPath})`} ... />;\n};\n"})})]})}function M(t={}){const{wrapper:n}={...o(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(a,{...t})}):a(t)}export{M as default};
//# sourceMappingURL=RectangleClipPath-B0tQXs24.js.map
