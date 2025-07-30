import{j as w}from"./jsx-runtime-CB_V9I5Y.js";import{J as P}from"./JsonChart-isj1dlf7.js";import{s as J}from"./sales_records_dataset-WHK6HSqq.js";import"./index-CTjT7uj6.js";import"./index-DaP2QGcy.js";import"./Lines-C5HE8H6Y.js";import"./Scatters-BJwZW5dN.js";import"./index-D1OPLCpq.js";import"./index-Cywu29Xx.js";import"./index-Bs4_CWqv.js";import"./useStore-D42TxdHf.js";import"./index-DyxbUYfF.js";import"./defaultLocale-D2nGpDRe.js";import"./renderCanvas-B3vh6D0b.js";import"./interpolateMultiPath-CX2TmtXQ.js";import"./array-2GBN5xbU.js";import"./index-MSSoR4im.js";import"./Columns-7YBzAFul.js";import"./getParentKey-Dt0KjBfq.js";import"./ensureNoScaleOverflow-BVrwbjHS.js";import"./Areas-C0BRo5lG.js";import"./Bars-Xnowt69k.js";import"./index-DWjDrBH7.js";import"./index-ChfY_KWg.js";import"./defaultLocale-YZNTexTf.js";import"./index-C73EMPtE.js";import"./index-BNKFbkco.js";import"./index-D8HK0Iw4.js";import"./index-BcuBy6DH.js";import"./Legend-DQ2LjqGu.js";import"./index-COgl75ap.js";import"./index-BQDzJjLo.js";import"./Circle-D2bUPI43.js";import"./Line-cv_TynKV.js";import"./Square-DM8ZByYb.js";import"./index-CD7MXqKa.js";import"./index-BOxme2CB.js";import"./index-Cn1GUACH.js";import"./Tooltip-BNhJ7WJH.js";import"./index-BK_JY7l-.js";import"./TooltipItem-Ds3NZ-zA.js";import"./index-e8nDjrQd.js";import"./index-DomMj_LS.js";import"./XAxis-NdVBz2bD.js";import"./index-DqBBfSd8.js";import"./YAxis-DVfVxPRN.js";const xr={title:"Components/JsonChart",component:P,parameters:{chromatic:{delay:300}}},r=U=>w.jsx(P,{config:U.config,data:J}),t={name:"Line",render:r,args:{config:{chart:{width:800},axis:{x:{fields:"Order Date"}},series:{lines:{ys:["Total Cost","Total Profit"]}}}}},n={name:"Area",render:r,args:{config:{chart:{width:800,zoomBrush:"inline"},axis:{x:{fields:"Order Date"}},series:{areas:{ys:["Total Cost","Total Profit"],stacked:!0}}}}},e={name:"Scatter",render:r,args:{config:{chart:{width:800},axis:{x:{fields:"Order Date"}},series:{scatters:{ys:["Total Cost","Total Profit"],radius:10}}}}},o={name:"Columns",render:r,args:{config:{chart:{width:800,plotMargin:{left:60,right:40,top:40,bottom:40}},axis:{x:{fields:"Item Type"}},series:{columns:{ys:["Unit Price","Unit Cost"],grouped:!0}}}}},s={name:"Bars",render:r,args:{config:{chart:{width:800,plotMargin:{left:100,right:40,top:40,bottom:40}},axis:{y:{fields:"Item Type"},x:{fields:["Unit Price","Unit Cost"],aggregate:!0}},series:{bars:{xs:["Unit Price","Unit Cost"],stacked:!0}}}}};var a,i,m;t.parameters={...t.parameters,docs:{...(a=t.parameters)==null?void 0:a.docs,source:{originalSource:`{
  name: "Line",
  render: JsonChartTemplate,
  args: {
    config: {
      chart: {
        width: 800
      },
      axis: {
        x: {
          fields: "Order Date"
        }
      },
      series: {
        lines: {
          ys: ["Total Cost", "Total Profit"]
        }
      }
    }
  }
}`,...(m=(i=t.parameters)==null?void 0:i.docs)==null?void 0:m.source}}};var p,c,d;n.parameters={...n.parameters,docs:{...(p=n.parameters)==null?void 0:p.docs,source:{originalSource:`{
  name: "Area",
  render: JsonChartTemplate,
  args: {
    config: {
      chart: {
        width: 800,
        zoomBrush: "inline"
      },
      axis: {
        x: {
          fields: "Order Date"
        }
      },
      series: {
        areas: {
          ys: ["Total Cost", "Total Profit"],
          stacked: true
        }
      }
    }
  }
}`,...(d=(c=n.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};var l,g,f;e.parameters={...e.parameters,docs:{...(l=e.parameters)==null?void 0:l.docs,source:{originalSource:`{
  name: "Scatter",
  render: JsonChartTemplate,
  args: {
    config: {
      chart: {
        width: 800
      },
      axis: {
        x: {
          fields: "Order Date"
        }
      },
      series: {
        scatters: {
          ys: ["Total Cost", "Total Profit"],
          radius: 10
        }
      }
    }
  }
}`,...(f=(g=e.parameters)==null?void 0:g.docs)==null?void 0:f.source}}};var u,h,x;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`{
  name: "Columns",
  render: JsonChartTemplate,
  args: {
    config: {
      chart: {
        width: 800,
        plotMargin: {
          left: 60,
          right: 40,
          top: 40,
          bottom: 40
        }
      },
      axis: {
        x: {
          fields: "Item Type"
        }
      },
      series: {
        columns: {
          ys: ["Unit Price", "Unit Cost"],
          grouped: true
        }
      }
    }
  }
}`,...(x=(h=o.parameters)==null?void 0:h.docs)==null?void 0:x.source}}};var C,T,y;s.parameters={...s.parameters,docs:{...(C=s.parameters)==null?void 0:C.docs,source:{originalSource:`{
  name: "Bars",
  render: JsonChartTemplate,
  args: {
    config: {
      chart: {
        width: 800,
        plotMargin: {
          left: 100,
          right: 40,
          top: 40,
          bottom: 40
        }
      },
      axis: {
        y: {
          fields: "Item Type"
        },
        x: {
          fields: ["Unit Price", "Unit Cost"],
          aggregate: true
        }
      },
      series: {
        bars: {
          xs: ["Unit Price", "Unit Cost"],
          stacked: true
        }
      }
    }
  }
}`,...(y=(T=s.parameters)==null?void 0:T.docs)==null?void 0:y.source}}};const Cr=["Line","Area","Scatter","Columns","Bars"];export{n as Area,s as Bars,o as Columns,t as Line,e as Scatter,Cr as __namedExportsOrder,xr as default};
//# sourceMappingURL=JsonChart.stories-CTTKoBYk.js.map
