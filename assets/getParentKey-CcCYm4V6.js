import{j as s,i as o,B as u}from"./index-b9bwP9Bh.js";function f(n=[]){const t=new Set;return n.forEach(e=>t.add(e)),t.size===n.length}function c(n){if(n&&n.match){const t=n.match(/translate\(([\d.]+),\s?([\d.]+)\)/);if(t)return{x:+t[1],y:+t[2]}}return{x:0,y:0}}function h(n,t){return n===0?(s("E001",`Incompatible scale for a <${t} />. Are you missing the \`scaleType="band"\` in your <Axis /> or <AutoScale /> component?`),!1):!0}const l=(n,t,e)=>f(n.map(r=>r[t]))===!1?(o("W002",`There are duplicate values in the ${t} field. This may cause rendering artifacts with a <${e}>.`),!1):!0;function g(n,t,e){if(n.bandwidth)return{bandwidth:n.bandwidth(),offset:0};if(e.length>=2){const r=e[0][t],a=e[1][t];if(r!=null&&a!==null&&a!==void 0){const i=n(a)-n(r);return{bandwidth:i-u,offset:i/2-u/2}}}return{bandwidth:0,offset:0}}function w(n){var t,e;return(e=(t=n==null?void 0:n.parentNode)==null?void 0:t.__data__)==null?void 0:e.key}export{l as a,w as b,c,h as e,g};
//# sourceMappingURL=getParentKey-CcCYm4V6.js.map
