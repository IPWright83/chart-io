import{j as U}from"./jsx-runtime-BjG_zV1W.js";import{J as M}from"./JsonChart-CsR6MqHu.js";import{s as w}from"./sales_records_dataset-WHK6HSqq.js";import"./index-DpTt3J-R.js";import"./index-Cd3EKKNL.js";import"./Lines-B6-CZOIj.js";import"./Scatters-CtuKNgxe.js";import"./index.es-DoiyW41S.js";import"./react-redux-lkBMRsz6.js";import"./index-DzcEfe_2.js";import"./index-5Gl1ki1p.js";import"./renderCanvas-DSAxZURY.js";import"./index-u8wY-fXO.js";import"./Columns-BwyQb29h.js";import"./Areas-BBI5eHNA.js";import"./index-B6be1P4a.js";import"./Bars-gIikB3lP.js";import"./index-CE94rE7I.js";import"./interpolateArc-BeeJJFCD.js";import"./useTooltip-B4jsLD3t.js";import"./index-1M3q30jN.js";import"./index-DrWhuguZ.js";import"./Radar-CN15cyaY.js";import"./interpolatePoints-DwMMV_8i.js";import"./index-CQRKux3Q.js";import"./index-Gn9jQ5lq.js";import"./lodash-DOJiQ2Wu.js";import"./index-CFwzIhDn.js";import"./Legend-DQjp6Mmo.js";import"./index-Bp2RIjag.js";import"./index-BmYvQTbQ.js";import"./Circle-Qf3Tu8hN.js";import"./Line-BjKan0E4.js";import"./Square-CZVurtTs.js";import"./index-DVli7D7_.js";import"./Tooltip-aFreqMLS.js";import"./index-iwe53Xj-.js";import"./TooltipItem-D41oQ2An.js";import"./index-fTNMVVp7.js";import"./RadialAreas-DY8RWhRu.js";import"./index-CBcXhfcM.js";import"./index-vFMZ7B83.js";import"./index-D1GbqKuK.js";import"./index-CaWU7ljP.js";import"./ContextMenu-Dkh4zLYP.js";import"./index-D5nvoAmD.js";import"./index-CsGapHqM.js";import"./index-BkBTUWQV.js";import"./LabelsPlot-C9OJe8VL.js";import"./LinksPlot-CoPVhndq.js";import"./NodesPlot-cB_M2zll.js";import"./index-Cw8P14OC.js";import"./index-DKCuWQPk.js";import"./index-BO0R6WYt.js";import"./index-CV3FwEcA.js";import"./index-DC1bvwxr.js";import"./calculateScale-CBIGWBP9.js";import"./index-DaTy74M5.js";import"./index-CBSNT1TE.js";import"./index-VyfXoxD0.js";import"./index-DVqBs4fh.js";import"./XAxis-CgOaLwq3.js";import"./index-C8nU8Xpn.js";import"./YAxis-CRYvaCDj.js";import"./index-DMa6aJSy.js";import"./index-HNMvlCFe.js";import"./index-DVRV05yR.js";import"./index-CCgpevYr.js";import"./index-Dn87vz0y.js";const qt={title:"Components/JsonChart",component:M,parameters:{chromatic:{delay:300}}},t=P=>U.jsx(M,{config:P.config,data:w}),r={name:"Line",render:t,args:{config:{chart:{contextMenu:!1,width:800},axis:{x:{fields:"Order Date"}},series:{lines:{ys:["Total Cost","Total Profit"]}}}}},e={name:"Area",render:t,args:{config:{chart:{contextMenu:!1,width:800,zoomBrush:"inline"},axis:{x:{fields:"Order Date"}},series:{areas:{ys:["Total Cost","Total Profit"],stacked:!0}}}}},n={name:"Scatter",render:t,args:{config:{chart:{contextMenu:!1,width:800},axis:{x:{fields:"Order Date"}},series:{scatters:{ys:["Total Cost","Total Profit"],radius:10}}}}},o={name:"Columns",render:t,args:{config:{chart:{contextMenu:!1,width:800,plotMargin:{left:60,right:40,top:40,bottom:40}},axis:{x:{fields:"Item Type"}},series:{columns:{ys:["Unit Price","Unit Cost"],grouped:!0}}}}},s={name:"Bars",render:t,args:{config:{chart:{contextMenu:!1,width:800,plotMargin:{left:100,right:40,top:40,bottom:40}},axis:{y:{fields:"Item Type"},x:{fields:["Unit Price","Unit Cost"],aggregate:!0}},series:{bars:{xs:["Unit Price","Unit Cost"],stacked:!0}}}}};var i,a,m;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
  name: "Line",
  render: JsonChartTemplate,
  args: {
    config: {
      chart: {
        contextMenu: false,
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
}`,...(m=(a=r.parameters)==null?void 0:a.docs)==null?void 0:m.source}}};var p,c,d;e.parameters={...e.parameters,docs:{...(p=e.parameters)==null?void 0:p.docs,source:{originalSource:`{
  name: "Area",
  render: JsonChartTemplate,
  args: {
    config: {
      chart: {
        contextMenu: false,
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
}`,...(d=(c=e.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};var l,f,u;n.parameters={...n.parameters,docs:{...(l=n.parameters)==null?void 0:l.docs,source:{originalSource:`{
  name: "Scatter",
  render: JsonChartTemplate,
  args: {
    config: {
      chart: {
        contextMenu: false,
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
}`,...(u=(f=n.parameters)==null?void 0:f.docs)==null?void 0:u.source}}};var g,x,h;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:`{
  name: "Columns",
  render: JsonChartTemplate,
  args: {
    config: {
      chart: {
        contextMenu: false,
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
}`,...(h=(x=o.parameters)==null?void 0:x.docs)==null?void 0:h.source}}};var C,T,y;s.parameters={...s.parameters,docs:{...(C=s.parameters)==null?void 0:C.docs,source:{originalSource:`{
  name: "Bars",
  render: JsonChartTemplate,
  args: {
    config: {
      chart: {
        contextMenu: false,
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
}`,...(y=(T=s.parameters)==null?void 0:T.docs)==null?void 0:y.source}}};const vt=["Line","Area","Scatter","Columns","Bars"];export{e as Area,s as Bars,o as Columns,r as Line,n as Scatter,vt as __namedExportsOrder,qt as default};
//# sourceMappingURL=JsonChart.stories-MLbgklVk.js.map
