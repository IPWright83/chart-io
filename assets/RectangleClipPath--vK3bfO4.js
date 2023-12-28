import{j as e}from"./jsx-runtime-vNq4Oc-g.js";import{M as a,C as c,b as s}from"./index-foGeVojo.js";import{u as o}from"./index-Dbo06S9W.js";import"./index-4g5l5LRQ.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./iframe-5ZQv1v1p.js";import"../sb-preview/runtime.js";import"./index-jmm5gWkb.js";import"./index-GCvOZpsZ.js";import"./index-bjdz4q3G.js";import"./_baseIsEqual-ujzER7rs.js";import"./uniq-dzufyT16.js";import"./index-PPLHz8o0.js";function i(t){const n=Object.assign({h1:"h1",p:"p",code:"code",h2:"h2",pre:"pre"},o(),t.components);return e.jsxs(e.Fragment,{children:[e.jsx(a,{title:"Components/RectangleClipPath"}),`
`,e.jsx(n.h1,{id:"rectangleclippath-component",children:"RectangleClipPath Component"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"<RectangleClipPath>"})," component allows us to create a clip path to ensure that any artifacts that appear outside the visible range are not rendered. This is especially useful when zooming into the domain on a chart so is frequently used with Brushes."]}),`
`,e.jsxs(n.p,{children:["In the example below a black rectangle has been added to show the dimensions of the ",e.jsx(n.code,{children:"<RectangleClipPath>"})," component. You can see how the circle has been chopped in half and anything outside of the clip path does not render."]}),`
`,e.jsx(c,{children:e.jsx(s,{id:"components-rectangleclippath--default"})}),`
`,e.jsx(n.h2,{id:"adding-a-rectangleclippath",children:"Adding a RectangleClipPath"}),`
`,e.jsxs(n.p,{children:["To use a ",e.jsx(n.code,{children:"<RectangleClipPath>"})," component you should wrap it around all your children that require clipping. For example you may wrap several plots like so:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`<RectangleClipPath>
    <Line x="x" y="y" />
    <Line x="x" y="y2" />
</RectangleClipPath>
`})}),`
`,e.jsxs(n.p,{children:["This will dynamically inject a ",e.jsx(n.code,{children:"clipPath"})," prop into the components which can be consumed using the form:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:"const MyClippedComponent = ({ clipPath }: { clipPath?: string }) => {\n    return <circle clipPath={`url(#${clipPath})`} ... />;\n};\n"})})]})}function P(t={}){const{wrapper:n}=Object.assign({},o(),t.components);return n?e.jsx(n,Object.assign({},t,{children:e.jsx(i,t)})):i(t)}export{P as default};
//# sourceMappingURL=RectangleClipPath--vK3bfO4.js.map
