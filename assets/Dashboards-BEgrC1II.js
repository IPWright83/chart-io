import{j as t}from"./jsx-runtime-BjG_zV1W.js";import{useMDXComponents as i}from"./index-D-2zTmTn.js";import{M as s,C as n}from"./index-BNVfokjH.js";import{Dashboard as p}from"./Dashboards.stories-zNvgKSvw.js";import"./index-DpTt3J-R.js";import"./iframe-BGkn9Ops.js";import"./index-D5nvoAmD.js";import"./index-B77L4dcM.js";import"./index-DrFu-skq.js";import"./react-redux-D2XHiCFH.js";import"./defaultLocale-YZNTexTf.js";import"./index-C2UDZNuU.js";import"./index-BK967JOf.js";import"./Lines-CTewFJaC.js";import"./Scatters-CjVkOVqA.js";import"./index-BLkjqt2D.js";import"./index-Cmxt2A0f.js";import"./defaultLocale-D2nGpDRe.js";import"./renderCanvas-DfhBB9Lh.js";import"./interpolateMultiPath-HMcFf6tI.js";import"./array-2GBN5xbU.js";import"./index-SUJzco65.js";import"./Columns-BkWdU0h9.js";import"./getParentKey-CJpMRI3M.js";import"./ensureNoScaleOverflow-_ke7A8wI.js";import"./Areas-Bs_w_X2y.js";import"./Bars-DuzADUAB.js";import"./index-B3xvD3KM.js";import"./index-lEWDzjaj.js";import"./index-D2Yg9nHg.js";import"./index-CormuWgM.js";import"./index-B83mH7RW.js";import"./index--IH0qLMi.js";import"./Legend-BfppGThJ.js";import"./index-DSanPm5k.js";import"./index-BmYvQTbQ.js";import"./Circle-Qf3Tu8hN.js";import"./Line-BjKan0E4.js";import"./Square-CZVurtTs.js";import"./index-DCrWobO-.js";import"./index-Dm9U4OvN.js";import"./index-D9WwHXYw.js";import"./Tooltip-DKHk2rGT.js";import"./index-Dnwqjl04.js";import"./TooltipItem-DpodgMXu.js";import"./index-idqV8wj_.js";import"./index-C_9ZH6Qa.js";import"./XAxis-DPoLBJUO.js";import"./index-nsWK1wQc.js";import"./YAxis-Di6E_Z0O.js";import"./index-CqmfD0_h.js";import"./index-C4dUuWS8.js";import"./index-DUjAVP1E.js";import"./index--xsHF6YT.js";import"./index-CM6SMzqP.js";import"./JsonChart-BEPTQr2r.js";function r(e){const o={blockquote:"blockquote",code:"code",h1:"h1",p:"p",pre:"pre",strong:"strong",...i(),...e.components};return t.jsxs(t.Fragment,{children:[t.jsx(s,{title:"Dashboards"}),`
`,t.jsx(o.h1,{id:"dashboards",children:"Dashboards"}),`
`,t.jsxs(o.p,{children:["One of the benefits of ",t.jsx(o.code,{children:"@chart-io"}),"'s extensibility is that it is simple to customize behaviour, including linking multiple charts together."]}),`
`,t.jsx(o.p,{children:'The example below shows a number of different charts, that all have linked tooltips and markers. To link these together we "link" the redux stores together using a helper function provided.'}),`
`,t.jsxs(o.blockquote,{children:[`
`,t.jsxs(o.p,{children:[t.jsx(o.strong,{children:"Note"}),": It is only possible to call this function once, so ensure all your charts have been initialised before linking them."]}),`
`]}),`
`,t.jsx(o.p,{children:"To link 2 stores together."}),`
`,t.jsx(o.pre,{children:t.jsx(o.code,{className:"language-javascript",children:` useEffect(() => {
        if (store1 && store2) {
            linkStores([store1,store2]);
        }
    }, [store1, store2,
`})}),`
`,t.jsxs(o.p,{children:["By default linking a store only links moust events, however the ",t.jsx(o.code,{children:"linkStores"})," function takes a second parameter, which is a Regex that can be used to match other events. For example to include all tooltip values across charts you could use:"]}),`
`,t.jsx(o.p,{children:t.jsx(o.code,{children:"linkStores([store1, store2], /EVENT.(MOUSE|ADD_TOOLTIP_ITEM|REMOVE_TOOLTIP_ITEM)/);"})}),`
`,t.jsx(n,{of:p})]})}function at(e={}){const{wrapper:o}={...i(),...e.components};return o?t.jsx(o,{...e,children:t.jsx(r,{...e})}):r(e)}export{at as default};
//# sourceMappingURL=Dashboards-BEgrC1II.js.map
