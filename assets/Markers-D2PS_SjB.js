import{j as e}from"./jsx-runtime-DEdD30eg.js";import{useMDXComponents as t}from"./index-CcnH5Kt0.js";import{ae as s,af as i}from"./index-C07OB8Tc.js";import{Default as h}from"./Markers.stories-BXpDY14P.js";import"./index-RYns6xqu.js";import"./iframe-D6CtwA3E.js";import"../sb-preview/runtime.js";import"./index-sbqOYYIm.js";import"./index-D-8MO0q_.js";import"./index-XRC4JhzV.js";import"./index-DrFu-skq.js";import"./index-b9bwP9Bh.js";import"./isChromatic-VqprqId_.js";import"./index-CKF-7MCu.js";import"./index-CXvrs8Eg.js";import"./renderChart-C4tDReWK.js";import"./test-utils-pcsCGetG.js";import"./client-BylhC-KR.js";import"./index-CPFb5ytF.js";function n(d){const r={code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...t(),...d.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"Components/Markers"}),`
`,e.jsx(r.h1,{id:"markers-component",children:"Markers Component"}),`
`,e.jsxs(r.p,{children:["The ",e.jsx(r.code,{children:"<Markers>"})," component allows us to define a layer to render markers on top of the plots. This is useful in highlighting a particular data point and can be combined with the ",e.jsx(r.code,{children:"<Droplines>"})," layer for additional affect."]}),`
`,e.jsx(i,{of:h}),`
`,e.jsx("br",{}),`
`,e.jsxs(r.h3,{id:"markers-props",children:[e.jsx(r.code,{children:"<Markers>"})," Props"]}),`
`,e.jsxs(r.table,{children:[e.jsx(r.thead,{children:e.jsxs(r.tr,{children:[e.jsx(r.th,{children:"Prop"}),e.jsx(r.th,{children:"Type"}),e.jsx(r.th,{children:"Default"}),e.jsx(r.th,{children:"Note"})]})}),e.jsx(r.tbody,{children:e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"onlyNearest"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"boolean"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"true"})}),e.jsx(r.td,{children:"Should only the nearest markers be shown? This is used to enforce only the nearest marker when multiple points could be shown such as with multi Line or Area charts"})]})})]}),`
`,e.jsx(r.h2,{id:"adding-markers-programatically",children:"Adding Markers Programatically"}),`
`,e.jsxs(r.p,{children:["To add a marker programatically you should call the ",e.jsx(r.code,{children:"eventActions.addMarker"})," function and ",e.jsx(r.code,{children:"eventActions.removeMarker"})," function for clean up:"]}),`
`,e.jsx(r.pre,{children:e.jsx(r.code,{className:"language-javascript",children:`const marker = {
    fill: "steelblue",
    stroke: "lightblue",
    cx: 50,
    cy: 50,
    r1: 10,
    r2: 30,
};

eventActions.addMarker(marker);
eventActions.removeMarker(marker);  // clean up
`})}),`
`,e.jsx(r.h3,{id:"markers-schema",children:"Markers Schema:"}),`
`,e.jsxs(r.table,{children:[e.jsx(r.thead,{children:e.jsxs(r.tr,{children:[e.jsx(r.th,{children:"Prop"}),e.jsx(r.th,{children:"Type"}),e.jsx(r.th,{children:"Note"})]})}),e.jsxs(r.tbody,{children:[e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"fill"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"string"})}),e.jsx(r.td,{children:"The fill color of the marker"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"stroke"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"string"})}),e.jsx(r.td,{children:"The stroke color of the marker"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsxs(r.strong,{children:[e.jsx(r.code,{children:"cx"}),"*"]})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"number"})}),e.jsx(r.td,{children:"The x-coordinate of the marker"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsxs(r.strong,{children:[e.jsx(r.code,{children:"cy"}),"*"]})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"number"})}),e.jsx(r.td,{children:"The y-coordinate of the marker"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"r1"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"number"})}),e.jsx(r.td,{children:"The start radius of the marker (used to animate a growing marker)"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"r2"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"number"})}),e.jsx(r.td,{children:"The end radius of the marker (derived from theme if not provided)"})]})]})]}),`
`,e.jsx(r.h2,{id:"visual-styling",children:"Visual Styling"}),`
`,e.jsx(r.p,{children:"The colour of the Droplines is usually derived from the colour of the data point and is set per dropline entry in the Redux store."}),`
`,e.jsxs(r.p,{children:["It is possible to style the following properties by changing the ",e.jsx(r.code,{children:"theme.droplines"})," object:"]}),`
`,e.jsxs(r.table,{children:[e.jsx(r.thead,{children:e.jsxs(r.tr,{children:[e.jsx(r.th,{children:"Property"}),e.jsx(r.th,{children:"Type"}),e.jsx(r.th,{children:"Default"}),e.jsx(r.th,{children:"Note"})]})}),e.jsxs(r.tbody,{children:[e.jsxs(r.tr,{children:[e.jsxs(r.td,{children:[e.jsx(r.code,{children:"size"}),"*"]}),e.jsx(r.td,{children:e.jsx(r.code,{children:"number"})}),e.jsx(r.td,{children:"6"}),e.jsx(r.td,{children:"The default size of a marker if not specified by the plot"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"stroke"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"string"})}),e.jsx(r.td,{children:"Dervied from theme"}),e.jsx(r.td,{children:"The default stroke to apply if not specified by the plot"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"strokeWidth"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"number"})}),e.jsx(r.td,{children:"2"}),e.jsx(r.td,{children:"The default stroke with to apply"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"shadow"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"boolean"})}),e.jsx(r.td,{children:"false"}),e.jsx(r.td,{children:"Whether a shadow blur should be applied to the marker"})]})]})]})]})}function A(d={}){const{wrapper:r}={...t(),...d.components};return r?e.jsx(r,{...d,children:e.jsx(n,{...d})}):n(d)}export{A as default};
//# sourceMappingURL=Markers-D2PS_SjB.js.map