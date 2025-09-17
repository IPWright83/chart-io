import{j as w}from"./jsx-runtime-BjG_zV1W.js";import{J as P}from"./JsonChart-CudaRnwQ.js";import{s as J}from"./sales_records_dataset-WHK6HSqq.js";import"./index-DpTt3J-R.js";import"./index-r1ySBL9M.js";import"./Lines-BtR_OUgn.js";import"./Scatters-t7a3qHKk.js";import"./react-redux-QXbQKOoW.js";import"./index-_rl-6daV.js";import"./index-CRk78wGA.js";import"./renderCanvas-Cl5RbTFF.js";import"./index-C3dhlPHa.js";import"./Columns-Dzd93bGI.js";import"./Areas-DNR506EA.js";import"./Bars-CA0K2ZMO.js";import"./index-Bg6IsbDW.js";import"./index-D50cK_1g.js";import"./lodash-DOJiQ2Wu.js";import"./index-D53rF_3R.js";import"./index-Du5VnEcz.js";import"./index-CJyk9Ty5.js";import"./index-gt7zBpiH.js";import"./Legend-pimTzOFw.js";import"./index-D4-eAyeX.js";import"./index-BmYvQTbQ.js";import"./Circle-Qf3Tu8hN.js";import"./Line-BjKan0E4.js";import"./Square-CZVurtTs.js";import"./index-B2ADnR9i.js";import"./index-mxfEYTca.js";import"./index-BEVv-T-d.js";import"./Tooltip-DL_pUHjQ.js";import"./index-BH_8yRl6.js";import"./TooltipItem-CWwi-etI.js";import"./index-BXRhMbPE.js";import"./index-C_QuCFx-.js";import"./XAxis-ChDwRgF9.js";import"./index-DIhe8qvN.js";import"./YAxis-DSGnzgTy.js";const cr={title:"Components/JsonChart",component:P,parameters:{chromatic:{delay:300}}},r=U=>w.jsx(P,{config:U.config,data:J}),t={name:"Line",render:r,args:{config:{chart:{width:800},axis:{x:{fields:"Order Date"}},series:{lines:{ys:["Total Cost","Total Profit"]}}}}},n={name:"Area",render:r,args:{config:{chart:{width:800,zoomBrush:"inline"},axis:{x:{fields:"Order Date"}},series:{areas:{ys:["Total Cost","Total Profit"],stacked:!0}}}}},e={name:"Scatter",render:r,args:{config:{chart:{width:800},axis:{x:{fields:"Order Date"}},series:{scatters:{ys:["Total Cost","Total Profit"],radius:10}}}}},s={name:"Columns",render:r,args:{config:{chart:{width:800,plotMargin:{left:60,right:40,top:40,bottom:40}},axis:{x:{fields:"Item Type"}},series:{columns:{ys:["Unit Price","Unit Cost"],grouped:!0}}}}},o={name:"Bars",render:r,args:{config:{chart:{width:800,plotMargin:{left:100,right:40,top:40,bottom:40}},axis:{y:{fields:"Item Type"},x:{fields:["Unit Price","Unit Cost"],aggregate:!0}},series:{bars:{xs:["Unit Price","Unit Cost"],stacked:!0}}}}};var a,i,m;t.parameters={...t.parameters,docs:{...(a=t.parameters)==null?void 0:a.docs,source:{originalSource:`{
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
}`,...(y=(T=o.parameters)==null?void 0:T.docs)==null?void 0:y.source}}};const dr=["Line","Area","Scatter","Columns","Bars"];export{n as Area,o as Bars,s as Columns,t as Line,e as Scatter,dr as __namedExportsOrder,cr as default};
//# sourceMappingURL=JsonChart.stories-Cx5evLoy.js.map
