import{j as t}from"./jsx-runtime-BjG_zV1W.js";import{useMDXComponents as i}from"./index-D-2zTmTn.js";import{M as s,C as n}from"./index-BbU07fcW.js";import{Dashboard as p}from"./Dashboards.stories-BTg3sV1d.js";import"./index-DpTt3J-R.js";import"./iframe-Craxk075.js";import"./index-D5nvoAmD.js";import"./index-B77L4dcM.js";import"./index-DrFu-skq.js";import"./react-redux-BIxttMao.js";import"./index-DHjc8n8F.js";import"./index-Bl9paP-p.js";import"./Lines-7z9s4wNn.js";import"./Scatters-CWMQ6d13.js";import"./index-DrZFwq_W.js";import"./index-DnlDykCR.js";import"./renderCanvas-DgN6C2Td.js";import"./index-D6EDLvj9.js";import"./Columns-C6MdJ0W5.js";import"./Areas-YrYkQUqw.js";import"./Bars-CbRSn-69.js";import"./index-CaZ68rVx.js";import"./interpolateArc-C5p3tsSp.js";import"./useTooltip-3W5NWBIO.js";import"./index-Bitjf20_.js";import"./Radar-BIVuLbZS.js";import"./index-BrTJ4RzG.js";import"./index-Bd68MpUk.js";import"./index-Dr9RXvgl.js";import"./XAxis-D7Bs4h5a.js";import"./index-DDyQNOMu.js";import"./YAxis-PGCYKAdu.js";import"./index-CWwNrbNA.js";import"./lodash-DOJiQ2Wu.js";import"./index-BqtyGhDH.js";import"./index-9P8qsy9Z.js";import"./index-C_mwV-nm.js";import"./index-CZ4pHQb2.js";import"./Legend-DQ9XwNwf.js";import"./index-BVPNhhj4.js";import"./index-BmYvQTbQ.js";import"./Circle-Qf3Tu8hN.js";import"./Line-BjKan0E4.js";import"./Square-CZVurtTs.js";import"./index-OT6NwBHW.js";import"./index-BZCcI5Qt.js";import"./index-BljJ1e5J.js";import"./index-DSMIYGhk.js";import"./Tooltip-BrSlbkqa.js";import"./index-CIJ69QRa.js";import"./TooltipItem-C8j0DJCa.js";import"./index-C2WdQQJ3.js";import"./index-Q6O9tYEF.js";import"./index-DoNFvadr.js";import"./index-sMHBXfkq.js";import"./index-CZdmoXDL.js";import"./index-Bslg3-kY.js";import"./index-dgjSRpfb.js";import"./JsonChart-DTo_XfKa.js";function e(r){const o={blockquote:"blockquote",code:"code",h1:"h1",p:"p",pre:"pre",strong:"strong",...i(),...r.components};return t.jsxs(t.Fragment,{children:[t.jsx(s,{title:"Dashboards"}),`
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
`,t.jsx(n,{of:p})]})}function dt(r={}){const{wrapper:o}={...i(),...r.components};return o?t.jsx(o,{...r,children:t.jsx(e,{...r})}):e(r)}export{dt as default};
//# sourceMappingURL=Dashboards-t_g52iXy.js.map
