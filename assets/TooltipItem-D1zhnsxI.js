import{j as c}from"./jsx-runtime-DEdD30eg.js";import{u as x,c as g}from"./index-b9bwP9Bh.js";import{t as a}from"./defaultLocale-C7xJETwF.js";import{f as p}from"./defaultLocale-D2nGpDRe.js";import{g as b}from"./index-CW0FTg2B.js";function T(e){const t=e.getMilliseconds()===0,l=e.getSeconds()===0,i=e.getMinutes()===0,s=e.getHours()===0,o=e.getDate()===1,r=e.getMonth()===0;return t?l?!i||!s?a("%x %H:%M")(e):o?r?a("%Y")(e):a("%b-%y")(e):a("%x")(e):a("%x %H:%M:%S")(e):a("%x %H:%M:%S.%L")(e)}const d=4,f=/(.*)(\.0+)([^\d]*)$/;function S(e){return e>1?p(`.${d}s`)(e).replace(f,"$1$3"):e<.01?p(`.${d}s`)(e).replace(f,"$1$3"):e.toString()}function I(e,t){return t==null?"-":typeof t=="number"?S(t):t instanceof Date?T(t):`${t}`}function n(){var e="/home/runner/work/chart-io/chart-io/packages/react/src/lib/components/TooltipOverlay/Tooltip/TooltipItem/TooltipItem.tsx",t="2113adcdaabac1fd8d182c0f251e737c6f712d89",l=window,i="__coverage__",s={path:"/home/runner/work/chart-io/chart-io/packages/react/src/lib/components/TooltipOverlay/Tooltip/TooltipItem/TooltipItem.tsx",statementMap:{0:{start:{line:6,column:16},end:{line:6,column:59}},1:{start:{line:6,column:35},end:{line:6,column:58}},2:{start:{line:7,column:16},end:{line:7,column:30}},3:{start:{line:8,column:25},end:{line:8,column:79}},4:{start:{line:9,column:17},end:{line:40,column:3}},5:{start:{line:41,column:2},end:{line:50,column:7}},6:{start:{line:52,column:0},end:{line:58,column:50}},7:{start:{line:54,column:4},end:{line:54,column:44}},8:{start:{line:56,column:4},end:{line:56,column:1679}}},fnMap:{0:{name:"TooltipItem",decl:{start:{line:5,column:16},end:{line:5,column:27}},loc:{start:{line:5,column:95},end:{line:51,column:1}},line:5},1:{name:"(anonymous_1)",decl:{start:{line:6,column:28},end:{line:6,column:29}},loc:{start:{line:6,column:35},end:{line:6,column:58}},line:6}},branchMap:{0:{loc:{start:{line:5,column:71},end:{line:5,column:91}},type:"default-arg",locations:[{start:{line:5,column:80},end:{line:5,column:91}}],line:5},1:{loc:{start:{line:8,column:28},end:{line:8,column:40}},type:"binary-expr",locations:[{start:{line:8,column:28},end:{line:8,column:34}},{start:{line:8,column:38},end:{line:8,column:40}}],line:8},2:{loc:{start:{line:8,column:65},end:{line:8,column:77}},type:"binary-expr",locations:[{start:{line:8,column:65},end:{line:8,column:71}},{start:{line:8,column:75},end:{line:8,column:77}}],line:8},3:{loc:{start:{line:38,column:18},end:{line:38,column:31}},type:"cond-expr",locations:[{start:{line:38,column:26},end:{line:38,column:27}},{start:{line:38,column:30},end:{line:38,column:31}}],line:38},4:{loc:{start:{line:42,column:4},end:{line:42,column:49}},type:"binary-expr",locations:[{start:{line:42,column:4},end:{line:42,column:9}},{start:{line:42,column:29},end:{line:42,column:49}}],line:42}},s:{0:0,1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0},f:{0:0,1:0},b:{0:[0],1:[0,0],2:[0,0],3:[0,0],4:[0,0]},inputSourceMap:{version:3,file:null,sources:["/home/runner/work/chart-io/chart-io/packages/react/src/lib/components/TooltipOverlay/Tooltip/TooltipItem/TooltipItem.tsx"],names:[],mappings:"AAuDsB;AAvDtB;AAIA;AAEA;AAQO;AACH;AAEA;AACA;AAEA;AAAe;AACE;AACA;AACM;AACR;AACK;AACG;AACoB;AACd;AACE;AAC3B;AACe;AACF;AACM;AACC;AACT;AACG;AACE;AAChB;AACmB;AACF;AACH;AACC;AACC;AACF;AACI;AACC;AACL;AACE;AACY;AAC5B;AAGJ;AAES;AAA4B;AAEzB;AACK;AAAA;AAAK;AACV;AACgE;AACpE;AAGZ;"},_coverageSchema:"1a1c01bbd47fc00a2c39e90264f33305004495a9",hash:"2113adcdaabac1fd8d182c0f251e737c6f712d89"},o=l[i]||(l[i]={});(!o[e]||o[e].hash!==t)&&(o[e]=s);var r=o[e];return n=function(){return r},r}n();function h({name:e,value:t,icon:l,fill:i,prefix:s,suffix:o,format:r=(n().b[0][0]++,I)}){n().f[0]++;const m=(n().s[0]++,x(y=>(n().f[1]++,n().s[1]++,g.theme(y)))),u=(n().s[2]++,b(l)),C=(n().s[3]++,`${n().b[1][0]++,s??(n().b[1][1]++,"")}${r(e,t)}${n().b[2][0]++,o??(n().b[2][1]++,"")}`),A=(n().s[4]++,{tooltipItem:{display:"flex",flexDirection:"row",width:"100%",userSelect:"none",pointerEvents:"none",color:m.tooltip.text.toString(),fontSize:m.font.size,fontFamily:m.font.family},tooltipValues:{display:"flex",flexDirection:"row",justifyContent:"space-between",width:"100%",flexGrow:1,flexShrink:1},tooltipSeriesName:{marginRight:15,maxWidth:215,marginTop:2,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",verticalAlign:"middle",flexGrow:1,flexShrink:1,marginLeft:u?(n().b[3][0]++,0):(n().b[3][1]++,5)}});return n().s[5]++,c.jsxs("div",{className:"chart-io tooltip-item",style:A.tooltipItem,children:[(n().b[4][0]++,u&&(n().b[4][1]++,c.jsx(u,{fill:i}))),c.jsxs("div",{className:"chart-io tooltip-values",style:A.tooltipValues,children:[c.jsxs("span",{className:"chart-io tooltip-series-name",style:A.tooltipSeriesName,children:[e,":"]}),c.jsx("span",{className:"chart-io tooltip-series-value",children:C})]})]})}n().s[6]++;try{n().s[7]++,h.displayName="TooltipItem",n().s[8]++,h.__docgenInfo={description:"Represents a row within a Tooltip",displayName:"TooltipItem",props:{name:{defaultValue:null,description:"The name of the series being display",name:"name",required:!0,type:{name:"string"}},value:{defaultValue:null,description:"The value for the datum for the series",name:"value",required:!0,type:{name:"IValue"}},icon:{defaultValue:null,description:"The icon type for the tooltip",name:"icon",required:!1,type:{name:"enum",value:[{value:'"circle"'},{value:'"line"'},{value:'"square"'},{value:'"none"'}]}},fill:{defaultValue:null,description:"The colour of the icon",name:"fill",required:!1,type:{name:"IColor"}},distance:{defaultValue:null,description:"Optional distance to the datum, if provided only the nearest marker will be shown",name:"distance",required:!1,type:{name:"number"}},prefix:{defaultValue:null,description:"An optional prefix to place in-front of formatted text",name:"prefix",required:!1,type:{name:"string"}},suffix:{defaultValue:null,description:"An optional suffix to place in-front of formatted text",name:"suffix",required:!1,type:{name:"string"}},format:{defaultValue:null,description:`A completely custom format function
@param name The key of the series value being formatted
@param value The value to format`,name:"format",required:!1,type:{name:"(name: string, value: IValue) => string"}}}}}catch{}export{h as T};
//# sourceMappingURL=TooltipItem-D1zhnsxI.js.map
