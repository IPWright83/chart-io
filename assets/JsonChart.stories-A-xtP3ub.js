import{j as w}from"./jsx-runtime-BjG_zV1W.js";import{J as P}from"./JsonChart-BEPTQr2r.js";import{s as J}from"./sales_records_dataset-WHK6HSqq.js";import"./index-DpTt3J-R.js";import"./index-BK967JOf.js";import"./Lines-CTewFJaC.js";import"./Scatters-CjVkOVqA.js";import"./react-redux-D2XHiCFH.js";import"./index-BLkjqt2D.js";import"./index-Cmxt2A0f.js";import"./defaultLocale-D2nGpDRe.js";import"./renderCanvas-DfhBB9Lh.js";import"./interpolateMultiPath-HMcFf6tI.js";import"./array-2GBN5xbU.js";import"./index-SUJzco65.js";import"./Columns-BkWdU0h9.js";import"./getParentKey-CJpMRI3M.js";import"./ensureNoScaleOverflow-_ke7A8wI.js";import"./Areas-Bs_w_X2y.js";import"./Bars-DuzADUAB.js";import"./index-B3xvD3KM.js";import"./index-lEWDzjaj.js";import"./defaultLocale-YZNTexTf.js";import"./index-D2Yg9nHg.js";import"./index-CormuWgM.js";import"./index-B83mH7RW.js";import"./index--IH0qLMi.js";import"./Legend-BfppGThJ.js";import"./index-DSanPm5k.js";import"./index-BmYvQTbQ.js";import"./Circle-Qf3Tu8hN.js";import"./Line-BjKan0E4.js";import"./Square-CZVurtTs.js";import"./index-DCrWobO-.js";import"./index-Dm9U4OvN.js";import"./index-D9WwHXYw.js";import"./Tooltip-DKHk2rGT.js";import"./index-Dnwqjl04.js";import"./TooltipItem-DpodgMXu.js";import"./index-idqV8wj_.js";import"./index-C_9ZH6Qa.js";import"./XAxis-DPoLBJUO.js";import"./index-nsWK1wQc.js";import"./YAxis-Di6E_Z0O.js";const ur={title:"Components/JsonChart",component:P,parameters:{chromatic:{delay:300}}},r=U=>w.jsx(P,{config:U.config,data:J}),t={name:"Line",render:r,args:{config:{chart:{width:800},axis:{x:{fields:"Order Date"}},series:{lines:{ys:["Total Cost","Total Profit"]}}}}},n={name:"Area",render:r,args:{config:{chart:{width:800,zoomBrush:"inline"},axis:{x:{fields:"Order Date"}},series:{areas:{ys:["Total Cost","Total Profit"],stacked:!0}}}}},e={name:"Scatter",render:r,args:{config:{chart:{width:800},axis:{x:{fields:"Order Date"}},series:{scatters:{ys:["Total Cost","Total Profit"],radius:10}}}}},s={name:"Columns",render:r,args:{config:{chart:{width:800,plotMargin:{left:60,right:40,top:40,bottom:40}},axis:{x:{fields:"Item Type"}},series:{columns:{ys:["Unit Price","Unit Cost"],grouped:!0}}}}},o={name:"Bars",render:r,args:{config:{chart:{width:800,plotMargin:{left:100,right:40,top:40,bottom:40}},axis:{y:{fields:"Item Type"},x:{fields:["Unit Price","Unit Cost"],aggregate:!0}},series:{bars:{xs:["Unit Price","Unit Cost"],stacked:!0}}}}};var a,i,m;t.parameters={...t.parameters,docs:{...(a=t.parameters)==null?void 0:a.docs,source:{originalSource:`{
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
}`,...(f=(g=e.parameters)==null?void 0:g.docs)==null?void 0:f.source}}};var u,h,x;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
}`,...(x=(h=s.parameters)==null?void 0:h.docs)==null?void 0:x.source}}};var C,T,y;o.parameters={...o.parameters,docs:{...(C=o.parameters)==null?void 0:C.docs,source:{originalSource:`{
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
}`,...(y=(T=o.parameters)==null?void 0:T.docs)==null?void 0:y.source}}};const hr=["Line","Area","Scatter","Columns","Bars"];export{n as Area,o as Bars,s as Columns,t as Line,e as Scatter,hr as __namedExportsOrder,ur as default};
//# sourceMappingURL=JsonChart.stories-A-xtP3ub.js.map
