import{j as w}from"./jsx-runtime-vNq4Oc-g.js";import{J as P}from"./JsonChart-GMbEZAhy.js";import{s as J}from"./sales_records_dataset-6YEpZKGQ.js";import"./index-4g5l5LRQ.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./index-azpHdaSR.js";import"./Lines-zns-_vZ9.js";import"./Scatters-UnyHYjD2.js";import"./index-CnLlP05v.js";import"./index-jmm5gWkb.js";import"./index-CTVlSsFV.js";import"./Provider--AC3n3ro.js";import"./useStore-5GkWK8oz.js";import"./index-K4Hn1GGT.js";import"./defaultLocale-4fp4Qluw.js";import"./renderCanvas-mvVrqX_A.js";import"./interpolateMultiPath-fX-sCjeh.js";import"./array-5Vj4K6aY.js";import"./index-ibNuBTkY.js";import"./Columns-GXlf9bAA.js";import"./getParentKey-EyapHLH0.js";import"./ensureNoScaleOverflow-0H3eBhJa.js";import"./Areas-FRBGw0vI.js";import"./Bars-lINfJt2r.js";import"./index-H7nlrqdg.js";import"./index-7Eg7ybPU.js";import"./defaultLocale-RGkPOkAo.js";import"./index-A_rqIulo.js";import"./index-3lT3xPrt.js";import"./index-rbFQVUQr.js";import"./index-gu_448hd.js";import"./Legend-AepxjzR_.js";import"./index-qFq04NJk.js";import"./index-RAAq-Dtz.js";import"./Circle-2MkuDq74.js";import"./Line-cari06pN.js";import"./Square-_dp0HJFb.js";import"./index-N5QiI7wA.js";import"./index-ibvSOphJ.js";import"./index-0hCrwOlf.js";import"./Tooltip-CF66P4Pc.js";import"./index-W-Z_0x6I.js";import"./TooltipItem-SVu_bEZv.js";import"./index-rmVHmJse.js";import"./index-dosLtsPy.js";import"./XAxis-r21t602H.js";import"./index-fcJ2LOVC.js";import"./YAxis-EYrVkw1t.js";const Tr={title:"Components/JsonChart",component:P,parameters:{chromatic:{delay:300}}},r=U=>w.jsx(P,{config:U.config,data:J}),t={name:"Line",render:r,args:{config:{chart:{width:800},axis:{x:{fields:"Order Date"}},series:{lines:{ys:["Total Cost","Total Profit"]}}}}},n={name:"Area",render:r,args:{config:{chart:{width:800,zoomBrush:"inline"},axis:{x:{fields:"Order Date"}},series:{areas:{ys:["Total Cost","Total Profit"],stacked:!0}}}}},e={name:"Scatter",render:r,args:{config:{chart:{width:800},axis:{x:{fields:"Order Date"}},series:{scatters:{ys:["Total Cost","Total Profit"],radius:10}}}}},o={name:"Columns",render:r,args:{config:{chart:{width:800,plotMargin:{left:60,right:40,top:40,bottom:40}},axis:{x:{fields:"Item Type"}},series:{columns:{ys:["Unit Price","Unit Cost"],grouped:!0}}}}},s={name:"Bars",render:r,args:{config:{chart:{width:800,plotMargin:{left:100,right:40,top:40,bottom:40}},axis:{y:{fields:"Item Type"},x:{fields:["Unit Price","Unit Cost"],aggregate:!0}},series:{bars:{xs:["Unit Price","Unit Cost"],stacked:!0}}}}};var a,i,m;t.parameters={...t.parameters,docs:{...(a=t.parameters)==null?void 0:a.docs,source:{originalSource:`{
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
}`,...(y=(T=s.parameters)==null?void 0:T.docs)==null?void 0:y.source}}};const yr=["Line","Area","Scatter","Columns","Bars"];export{n as Area,s as Bars,o as Columns,t as Line,e as Scatter,yr as __namedExportsOrder,Tr as default};
//# sourceMappingURL=JsonChart.stories-EDVRfrvo.js.map
