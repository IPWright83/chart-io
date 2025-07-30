import{j as t}from"./jsx-runtime-CB_V9I5Y.js";import{useMDXComponents as i}from"./index-DSkyVWTJ.js";import{M as s,C as n}from"./index-DXysM4eg.js";import{Dashboard as p}from"./Dashboards.stories-C3g2jc1W.js";import"./index-CTjT7uj6.js";import"./iframe-drV2x4lN.js";import"./index-Cywu29Xx.js";import"./index-DiMW2NzS.js";import"./index-DrFu-skq.js";import"./index-D1OPLCpq.js";import"./defaultLocale-YZNTexTf.js";import"./index-B0KhbJdb.js";import"./index-DaP2QGcy.js";import"./Lines-C5HE8H6Y.js";import"./Scatters-BJwZW5dN.js";import"./index-Bs4_CWqv.js";import"./useStore-D42TxdHf.js";import"./index-DyxbUYfF.js";import"./defaultLocale-D2nGpDRe.js";import"./renderCanvas-B3vh6D0b.js";import"./interpolateMultiPath-CX2TmtXQ.js";import"./array-2GBN5xbU.js";import"./index-MSSoR4im.js";import"./Columns-7YBzAFul.js";import"./getParentKey-Dt0KjBfq.js";import"./ensureNoScaleOverflow-BVrwbjHS.js";import"./Areas-C0BRo5lG.js";import"./Bars-Xnowt69k.js";import"./index-DWjDrBH7.js";import"./index-ChfY_KWg.js";import"./index-C73EMPtE.js";import"./index-BNKFbkco.js";import"./index-D8HK0Iw4.js";import"./index-BcuBy6DH.js";import"./Legend-DQ2LjqGu.js";import"./index-COgl75ap.js";import"./index-BQDzJjLo.js";import"./Circle-D2bUPI43.js";import"./Line-cv_TynKV.js";import"./Square-DM8ZByYb.js";import"./index-CD7MXqKa.js";import"./index-BOxme2CB.js";import"./index-Cn1GUACH.js";import"./Tooltip-BNhJ7WJH.js";import"./index-BK_JY7l-.js";import"./TooltipItem-Ds3NZ-zA.js";import"./index-e8nDjrQd.js";import"./index-DomMj_LS.js";import"./XAxis-NdVBz2bD.js";import"./index-DqBBfSd8.js";import"./YAxis-DVfVxPRN.js";import"./index-Bm83amPP.js";import"./index-BmbHlpXZ.js";import"./index-uU7U5txR.js";import"./index-Df5kvydP.js";import"./index-C0P4d-tU.js";import"./JsonChart-isj1dlf7.js";function e(r){const o={blockquote:"blockquote",code:"code",h1:"h1",p:"p",pre:"pre",strong:"strong",...i(),...r.components};return t.jsxs(t.Fragment,{children:[t.jsx(s,{title:"Dashboards"}),`
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
`,t.jsx(n,{of:p})]})}function ct(r={}){const{wrapper:o}={...i(),...r.components};return o?t.jsx(o,{...r,children:t.jsx(e,{...r})}):e(r)}export{ct as default};
//# sourceMappingURL=Dashboards-BO0trA5x.js.map
