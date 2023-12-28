import{j as e}from"./jsx-runtime-vNq4Oc-g.js";import{M as r,C as i,b as a}from"./index-foGeVojo.js";import{u as n}from"./index-Dbo06S9W.js";import"./index-4g5l5LRQ.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./iframe-5ZQv1v1p.js";import"../sb-preview/runtime.js";import"./index-jmm5gWkb.js";import"./index-GCvOZpsZ.js";import"./index-bjdz4q3G.js";import"./_baseIsEqual-ujzER7rs.js";import"./uniq-dzufyT16.js";import"./index-PPLHz8o0.js";function o(s){const t=Object.assign({h1:"h1",p:"p",code:"code",blockquote:"blockquote",strong:"strong",pre:"pre"},n(),s.components);return e.jsxs(e.Fragment,{children:[e.jsx(r,{title:"Dashboards"}),`
`,e.jsx(t.h1,{id:"dashboards",children:"Dashboards"}),`
`,e.jsxs(t.p,{children:["One of the benefits of ",e.jsx(t.code,{children:"@chart-io"}),"'s extensibility is that it is simple to customize behaviour, including linking multiple charts together."]}),`
`,e.jsx(t.p,{children:'The example below shows a number of different charts, that all have linked tooltips and markers. To link these together we "link" the redux stores together using a helper function provided.'}),`
`,e.jsxs(t.blockquote,{children:[`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Note"}),": It is only possible to call this function once, so ensure all your charts have been initialised before linking them."]}),`
`]}),`
`,e.jsx(t.p,{children:"To link 2 stores together."}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{children:` useEffect(() => {
        if (store1 && store2) {
            linkStores([store1,store2]);
        }
    }, [store1, store2,
`})}),`
`,e.jsxs(t.p,{children:["By default linking a store only links moust events, however the ",e.jsx(t.code,{children:"linkStores"})," function takes a second parameter, which is a Regex that can be used to match other events. For example to include all tooltip values across charts you could use:"]}),`
`,e.jsx(t.p,{children:e.jsx(t.code,{children:"linkStores([store1, store2], /EVENT.(MOUSE|ADD_TOOLTIP_ITEM|REMOVE_TOOLTIP_ITEM)/);"})}),`
`,e.jsx(i,{children:e.jsx(a,{id:"dashboards--dashboard"})})]})}function M(s={}){const{wrapper:t}=Object.assign({},n(),s.components);return t?e.jsx(t,Object.assign({},s,{children:e.jsx(o,s)})):o(s)}export{M as default};
//# sourceMappingURL=Dashboards-GlnYavSP.js.map
