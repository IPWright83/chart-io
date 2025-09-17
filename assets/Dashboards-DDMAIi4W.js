import{j as t}from"./jsx-runtime-BjG_zV1W.js";import{useMDXComponents as i}from"./index-D-2zTmTn.js";import{M as s,C as n}from"./index-Dw1MpZ3G.js";import{Dashboard as p}from"./Dashboards.stories-cYDFBi4a.js";import"./index-DpTt3J-R.js";import"./iframe-Bho3GZXG.js";import"./index-D5nvoAmD.js";import"./index-B77L4dcM.js";import"./index-DrFu-skq.js";import"./react-redux-QXbQKOoW.js";import"./index-C41cK2st.js";import"./index-r1ySBL9M.js";import"./Lines-BtR_OUgn.js";import"./Scatters-t7a3qHKk.js";import"./index-_rl-6daV.js";import"./index-CRk78wGA.js";import"./renderCanvas-Cl5RbTFF.js";import"./index-C3dhlPHa.js";import"./Columns-Dzd93bGI.js";import"./Areas-DNR506EA.js";import"./Bars-CA0K2ZMO.js";import"./index-Bg6IsbDW.js";import"./index-D50cK_1g.js";import"./lodash-DOJiQ2Wu.js";import"./index-D53rF_3R.js";import"./index-Du5VnEcz.js";import"./index-CJyk9Ty5.js";import"./index-gt7zBpiH.js";import"./Legend-pimTzOFw.js";import"./index-D4-eAyeX.js";import"./index-BmYvQTbQ.js";import"./Circle-Qf3Tu8hN.js";import"./Line-BjKan0E4.js";import"./Square-CZVurtTs.js";import"./index-B2ADnR9i.js";import"./index-mxfEYTca.js";import"./index-BEVv-T-d.js";import"./Tooltip-DL_pUHjQ.js";import"./index-BH_8yRl6.js";import"./TooltipItem-CWwi-etI.js";import"./index-BXRhMbPE.js";import"./index-C_QuCFx-.js";import"./XAxis-ChDwRgF9.js";import"./index-DIhe8qvN.js";import"./YAxis-DSGnzgTy.js";import"./index-rMEleilL.js";import"./index-BzVFGtYN.js";import"./index-CeelFCKr.js";import"./index-BmoeoWur.js";import"./index-H0MMxKo2.js";import"./JsonChart-CudaRnwQ.js";function r(e){const o={blockquote:"blockquote",code:"code",h1:"h1",p:"p",pre:"pre",strong:"strong",...i(),...e.components};return t.jsxs(t.Fragment,{children:[t.jsx(s,{title:"Dashboards"}),`
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
`,t.jsx(n,{of:p})]})}function st(e={}){const{wrapper:o}={...i(),...e.components};return o?t.jsx(o,{...e,children:t.jsx(r,{...e})}):r(e)}export{st as default};
//# sourceMappingURL=Dashboards-DDMAIi4W.js.map
