import{j as w}from"./jsx-runtime-BjG_zV1W.js";import{J as P}from"./JsonChart-DTo_XfKa.js";import{s as J}from"./sales_records_dataset-WHK6HSqq.js";import"./index-DpTt3J-R.js";import"./index-Bl9paP-p.js";import"./Lines-7z9s4wNn.js";import"./Scatters-CWMQ6d13.js";import"./react-redux-BIxttMao.js";import"./index-DrZFwq_W.js";import"./index-DnlDykCR.js";import"./renderCanvas-DgN6C2Td.js";import"./index-D6EDLvj9.js";import"./Columns-C6MdJ0W5.js";import"./Areas-YrYkQUqw.js";import"./Bars-CbRSn-69.js";import"./index-CaZ68rVx.js";import"./interpolateArc-C5p3tsSp.js";import"./useTooltip-3W5NWBIO.js";import"./index-Bitjf20_.js";import"./Radar-BIVuLbZS.js";import"./index-BrTJ4RzG.js";import"./index-Bd68MpUk.js";import"./index-Dr9RXvgl.js";import"./XAxis-D7Bs4h5a.js";import"./index-DDyQNOMu.js";import"./YAxis-PGCYKAdu.js";import"./index-OT6NwBHW.js";import"./index-CWwNrbNA.js";import"./lodash-DOJiQ2Wu.js";import"./index-BZCcI5Qt.js";import"./index-9P8qsy9Z.js";import"./index-BqtyGhDH.js";import"./index-CZ4pHQb2.js";import"./Legend-DQ9XwNwf.js";import"./index-BVPNhhj4.js";import"./index-BmYvQTbQ.js";import"./Circle-Qf3Tu8hN.js";import"./Line-BjKan0E4.js";import"./Square-CZVurtTs.js";import"./index-C_mwV-nm.js";import"./index-BljJ1e5J.js";import"./index-DSMIYGhk.js";import"./Tooltip-BrSlbkqa.js";import"./index-CIJ69QRa.js";import"./TooltipItem-C8j0DJCa.js";import"./index-C2WdQQJ3.js";const xr={title:"Components/JsonChart",component:P,parameters:{chromatic:{delay:300}}},r=U=>w.jsx(P,{config:U.config,data:J}),t={name:"Line",render:r,args:{config:{chart:{width:800},axis:{x:{fields:"Order Date"}},series:{lines:{ys:["Total Cost","Total Profit"]}}}}},n={name:"Area",render:r,args:{config:{chart:{width:800,zoomBrush:"inline"},axis:{x:{fields:"Order Date"}},series:{areas:{ys:["Total Cost","Total Profit"],stacked:!0}}}}},e={name:"Scatter",render:r,args:{config:{chart:{width:800},axis:{x:{fields:"Order Date"}},series:{scatters:{ys:["Total Cost","Total Profit"],radius:10}}}}},o={name:"Columns",render:r,args:{config:{chart:{width:800,plotMargin:{left:60,right:40,top:40,bottom:40}},axis:{x:{fields:"Item Type"}},series:{columns:{ys:["Unit Price","Unit Cost"],grouped:!0}}}}},s={name:"Bars",render:r,args:{config:{chart:{width:800,plotMargin:{left:100,right:40,top:40,bottom:40}},axis:{y:{fields:"Item Type"},x:{fields:["Unit Price","Unit Cost"],aggregate:!0}},series:{bars:{xs:["Unit Price","Unit Cost"],stacked:!0}}}}};var a,i,m;t.parameters={...t.parameters,docs:{...(a=t.parameters)==null?void 0:a.docs,source:{originalSource:`{
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
//# sourceMappingURL=JsonChart.stories-C8DPfdlR.js.map
