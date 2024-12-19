import{j as e}from"./jsx-runtime-DEdD30eg.js";import{useMDXComponents as o}from"./index-CcnH5Kt0.js";import{ae as n,af as i}from"./index-C07OB8Tc.js";import{Default as d}from"./Crosshair.stories-DNC6ynSj.js";import"./index-RYns6xqu.js";import"./iframe-D6CtwA3E.js";import"../sb-preview/runtime.js";import"./index-sbqOYYIm.js";import"./index-D-8MO0q_.js";import"./index-XRC4JhzV.js";import"./index-DrFu-skq.js";import"./index-b9bwP9Bh.js";import"./index-ASiZ4-uZ.js";import"./index-CXvrs8Eg.js";import"./renderChart-C4tDReWK.js";import"./test-utils-pcsCGetG.js";import"./client-BylhC-KR.js";import"./index-CPFb5ytF.js";function t(s){const r={code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...o(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(n,{title:"Components/Crosshair"}),`
`,e.jsx(r.h1,{id:"crosshair-component",children:"Crosshair Component"}),`
`,e.jsxs(r.p,{children:["The ",e.jsx(r.code,{children:"<Crosshair>"})," component allows us to define a layer to render a crosshair at the mouse position. It is normally used in conjunction with the ",e.jsx(r.code,{children:"<EventReceiver>"})," component to provide mouse events."]}),`
`,e.jsx(i,{of:d}),`
`,e.jsxs(r.h3,{id:"crosshair-props",children:[e.jsx(r.code,{children:"<Crosshair>"})," Props"]}),`
`,e.jsxs(r.table,{children:[e.jsx(r.thead,{children:e.jsxs(r.tr,{children:[e.jsx(r.th,{children:"Prop"}),e.jsx(r.th,{children:"Type"}),e.jsx(r.th,{children:"Default"}),e.jsx(r.th,{children:"Note"})]})}),e.jsxs(r.tbody,{children:[e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"showHorizontal"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"boolean"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"true"})}),e.jsx(r.td,{children:"Should a horizontal crosshair line be shown?"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"showVertical"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"boolean"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"true"})}),e.jsx(r.td,{children:"Should a vertical crosshair line be shown?"})]})]})]}),`
`,e.jsx("br",{}),`
`,e.jsx(r.h2,{id:"adding-a-crosshair-programatically",children:"Adding a Crosshair Programatically"}),`
`,e.jsxs(r.p,{children:["To adjust the crosshair programatically you should call the ",e.jsx(r.code,{children:"eventActions.mouseEnter"})," function or the ",e.jsx(r.code,{children:"eventActions.mouseMove"})," function:"]}),`
`,e.jsx(r.pre,{children:e.jsx(r.code,{className:"language-javascript",children:`eventActions.mouseEnter({ offsetX: 50, offsetY: 100 });
eventActions.mouseMove({ offsetX: 52, offsetY: 102 });
`})}),`
`,e.jsx(r.h2,{id:"visual-styling",children:"Visual Styling"}),`
`,e.jsx(r.p,{children:"The colour and styles of the Crosshair comes straight from the theme object."}),`
`,e.jsxs(r.p,{children:["It is possible to style the following properties by changing the ",e.jsx(r.code,{children:"theme.crosshair"})," object:"]}),`
`,e.jsxs(r.table,{children:[e.jsx(r.thead,{children:e.jsxs(r.tr,{children:[e.jsx(r.th,{children:"Property"}),e.jsx(r.th,{children:"Type"}),e.jsx(r.th,{children:"Default"}),e.jsx(r.th,{children:"Note"})]})}),e.jsxs(r.tbody,{children:[e.jsxs(r.tr,{children:[e.jsxs(r.td,{children:[e.jsx(r.code,{children:"stroke"}),"*"]}),e.jsx(r.td,{children:e.jsx(r.code,{children:"string"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:'"#000000"'})}),e.jsx(r.td,{children:"The color of the crosshair"})]}),e.jsxs(r.tr,{children:[e.jsxs(r.td,{children:[e.jsx(r.code,{children:"strokeDasharray"}),"*"]}),e.jsx(r.td,{children:e.jsx(r.code,{children:"number"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"0"})}),e.jsx(r.td,{children:"The dash array pattern to use for the crosshair"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"strokeOpacity"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"number"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"0.5"})}),e.jsx(r.td,{children:"The opacity to use for the crosshair"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"strokeWidth"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"number"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"1"})}),e.jsx(r.td,{children:"The stroke width to use for the crosshair"})]})]})]})]})}function M(s={}){const{wrapper:r}={...o(),...s.components};return r?e.jsx(r,{...s,children:e.jsx(t,{...s})}):t(s)}export{M as default};
//# sourceMappingURL=Crosshair-D81MJxtp.js.map
