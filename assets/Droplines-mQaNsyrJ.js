import{j as e}from"./jsx-runtime-vNq4Oc-g.js";import{M as i,C as t,b as l}from"./index-foGeVojo.js";import{u as s}from"./index-Dbo06S9W.js";import"./index-4g5l5LRQ.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./iframe-5ZQv1v1p.js";import"../sb-preview/runtime.js";import"./index-jmm5gWkb.js";import"./index-GCvOZpsZ.js";import"./index-bjdz4q3G.js";import"./_baseIsEqual-ujzER7rs.js";import"./uniq-dzufyT16.js";import"./index-PPLHz8o0.js";function r(d){const n=Object.assign({h1:"h1",p:"p",code:"code",h3:"h3",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td",h2:"h2",pre:"pre"},s(),d.components);return e.jsxs(e.Fragment,{children:[e.jsx(i,{title:"Components/Droplines"}),`
`,e.jsx(n.h1,{id:"droplines-component",children:"Droplines Component"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"<Droplines>"})," component allows us to define a layer to render drop lines on top of the plots. This is useful in highlighting a particular data point and can be combined with the ",e.jsx(n.code,{children:"<Markers>"})," layer for additional affect."]}),`
`,e.jsx(t,{children:e.jsx(l,{id:"components-droplines--default"})}),`
`,e.jsxs(n.h3,{id:"droplines-props",children:[e.jsx(n.code,{children:"<Droplines>"})," Props"]}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Prop"}),e.jsx(n.th,{children:"Type"}),e.jsx(n.th,{children:"Default"}),e.jsx(n.th,{children:"Note"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"showHorizontal"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"boolean"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"true"})}),e.jsx(n.td,{children:"Should horizontal droplines be shown?"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"showVertical"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"boolean"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"true"})}),e.jsx(n.td,{children:"Should vertical droplines be shown?"})]})]})]}),`
`,e.jsx("br",{}),`
`,e.jsx(n.h2,{id:"adding-droplines-programatically",children:"Adding Droplines Programatically"}),`
`,e.jsxs(n.p,{children:["To add a dropline programatically you should call the ",e.jsx(n.code,{children:"eventActions.addDropline"})," function and ",e.jsx(n.code,{children:"eventActions.removeDropline"})," function for clean up:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`const dropline = {
    isHorizontal: true,
    isVertical: false,
    x1: 0,
    x2: 100,
    y1: 100,
    y2: 100,
    color: "steelblue"
};

eventActions.addDropline(dropline);
eventActions.removeDropline(dropline);
`})}),`
`,e.jsx(n.h3,{id:"dropline-schema",children:"Dropline Schema:"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Prop"}),e.jsx(n.th,{children:"Type"}),e.jsx(n.th,{children:"Note"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"isHorizontal"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"boolean"})}),e.jsx(n.td,{children:"Is this a horizontal dropline?"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"isVertical"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"boolean"})}),e.jsx(n.td,{children:"Is this a vertical dropline?"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"color"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"string"})}),e.jsx(n.td,{children:"The color of the dropline"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"x1"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"number"})}),e.jsx(n.td,{children:"The start x-coordinate of the dropline"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"x2"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"number"})}),e.jsx(n.td,{children:"The end x-coordinate of the dropline"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"y1"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"number"})}),e.jsx(n.td,{children:"The start y-coordinate of the dropline"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"y2"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"number"})}),e.jsx(n.td,{children:"The end y-coordinate of the dropline"})]})]})]}),`
`,e.jsx("br",{}),`
`,e.jsx(n.h2,{id:"visual-styling",children:"Visual Styling"}),`
`,e.jsx(n.p,{children:"The colour of the Droplines is usually derived from the colour of the data point and is set per dropline entry in the Redux store."}),`
`,e.jsxs(n.p,{children:["It is possible to style the following properties by changing the ",e.jsx(n.code,{children:"theme.droplines"})," object:"]}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Property"}),e.jsx(n.th,{children:"Type"}),e.jsx(n.th,{children:"Default"}),e.jsx(n.th,{children:"Note"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsxs(n.td,{children:[e.jsx(n.code,{children:"strokeDasharray"}),"*"]}),e.jsx(n.td,{children:e.jsx(n.code,{children:"number"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"4"})}),e.jsx(n.td,{children:"The dash array pattern to use for the droplines"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"strokeOpacity"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"number"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"1"})}),e.jsx(n.td,{children:"The opacity to use for the droplines"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"strokeWidth"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"number"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"2"})}),e.jsx(n.td,{children:"The stroke width to use for the droplines"})]})]})]})]})}function D(d={}){const{wrapper:n}=Object.assign({},s(),d.components);return n?e.jsx(n,Object.assign({},d,{children:e.jsx(r,d)})):r(d)}export{D as default};
//# sourceMappingURL=Droplines-mQaNsyrJ.js.map
