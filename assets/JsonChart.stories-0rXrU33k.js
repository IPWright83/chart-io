import{j as w}from"./jsx-runtime-BjG_zV1W.js";import{J as P}from"./JsonChart-Bk8HP8Mx.js";import{s as J}from"./sales_records_dataset-WHK6HSqq.js";import"./index-DpTt3J-R.js";import"./index-DfK4SF6L.js";import"./Lines-DLDdBXC5.js";import"./Scatters-3-avvN77.js";import"./react-redux-SPeguAgb.js";import"./index-9431aKHi.js";import"./index-BRXO1njn.js";import"./lodash-DOJiQ2Wu.js";import"./renderCanvas-CR85T-h9.js";import"./index-B8eXPVPV.js";import"./Columns-DCzCoYDu.js";import"./Areas-mZCDmN45.js";import"./Bars-B28Is7JF.js";import"./index-Ete-KSn1.js";import"./interpolateArc-BeeJJFCD.js";import"./useTooltip-BlFpqfM-.js";import"./index-cvfhMktw.js";import"./index-BBDmPaB_.js";import"./Radar-CXAo-9wZ.js";import"./interpolatePoints-DwMMV_8i.js";import"./index-CmKRTxUI.js";import"./index-BAzb9S1k.js";import"./Legend-z40re8h9.js";import"./index-Dub0Swig.js";import"./index-BmYvQTbQ.js";import"./Circle-Qf3Tu8hN.js";import"./Line-BjKan0E4.js";import"./Square-CZVurtTs.js";import"./index-9usyF_v_.js";import"./Tooltip-aPd-LmbL.js";import"./index-CRhM32cg.js";import"./TooltipItem-OfChlkFL.js";import"./index-B_99FLAR.js";import"./RadialAreas-3Hf8RTIB.js";import"./index-B-3-hfbS.js";import"./index-CvJ_dlQX.js";import"./index-B6Lr3Qa8.js";import"./index-BLxOKznu.js";import"./index-DxXlV5JW.js";import"./LabelsPlot-Co4tuujP.js";import"./LinksPlot-EyWHfZA0.js";import"./NodesPlot-BCoyNFhJ.js";import"./index-DPqJA-7V.js";import"./index-BInKuQeD.js";import"./index-Cl-eCd-x.js";import"./index-DnRZR6m4.js";import"./index-DwL5j-mS.js";import"./index-Dd_IEiRF.js";import"./index-sBPFWXw6.js";import"./XAxis-yIVuvz3U.js";import"./index-yAu6bW1V.js";import"./YAxis-BLu4jwFE.js";import"./index-53SPihoZ.js";import"./index-DhP8WHXK.js";import"./index-Bdes0qwq.js";import"./index-CErv1lK-.js";import"./index-rx8DGN-B.js";const kr={title:"Components/JsonChart",component:P,parameters:{chromatic:{delay:300}}},r=U=>w.jsx(P,{config:U.config,data:J}),t={name:"Line",render:r,args:{config:{chart:{width:800},axis:{x:{fields:"Order Date"}},series:{lines:{ys:["Total Cost","Total Profit"]}}}}},n={name:"Area",render:r,args:{config:{chart:{width:800,zoomBrush:"inline"},axis:{x:{fields:"Order Date"}},series:{areas:{ys:["Total Cost","Total Profit"],stacked:!0}}}}},e={name:"Scatter",render:r,args:{config:{chart:{width:800},axis:{x:{fields:"Order Date"}},series:{scatters:{ys:["Total Cost","Total Profit"],radius:10}}}}},o={name:"Columns",render:r,args:{config:{chart:{width:800,plotMargin:{left:60,right:40,top:40,bottom:40}},axis:{x:{fields:"Item Type"}},series:{columns:{ys:["Unit Price","Unit Cost"],grouped:!0}}}}},s={name:"Bars",render:r,args:{config:{chart:{width:800,plotMargin:{left:100,right:40,top:40,bottom:40}},axis:{y:{fields:"Item Type"},x:{fields:["Unit Price","Unit Cost"],aggregate:!0}},series:{bars:{xs:["Unit Price","Unit Cost"],stacked:!0}}}}};var i,a,m;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`{
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
}`,...(m=(a=t.parameters)==null?void 0:a.docs)==null?void 0:m.source}}};var p,c,d;n.parameters={...n.parameters,docs:{...(p=n.parameters)==null?void 0:p.docs,source:{originalSource:`{
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
}`,...(y=(T=s.parameters)==null?void 0:T.docs)==null?void 0:y.source}}};const Ar=["Line","Area","Scatter","Columns","Bars"];export{n as Area,s as Bars,o as Columns,t as Line,e as Scatter,Ar as __namedExportsOrder,kr as default};
//# sourceMappingURL=JsonChart.stories-0rXrU33k.js.map
