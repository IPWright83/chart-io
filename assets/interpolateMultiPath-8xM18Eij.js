import{c as d,a as S}from"./array-2GBN5xbU.js";import{p as L}from"./index-b9bwP9Bh.js";const g=Math.PI,m=2*g,c=1e-6,q=m-c;function E(i){this._+=i[0];for(let t=1,e=i.length;t<e;++t)this._+=arguments[t]+i[t]}function A(i){let t=Math.floor(i);if(!(t>=0))throw new Error(`invalid digits: ${i}`);if(t>15)return E;const e=10**t;return function(n){this._+=n[0];for(let o=1,h=n.length;o<h;++o)this._+=Math.round(arguments[o]*e)/e+n[o]}}class k{constructor(t){this._x0=this._y0=this._x1=this._y1=null,this._="",this._append=t==null?E:A(t)}moveTo(t,e){this._append`M${this._x0=this._x1=+t},${this._y0=this._y1=+e}`}closePath(){this._x1!==null&&(this._x1=this._x0,this._y1=this._y0,this._append`Z`)}lineTo(t,e){this._append`L${this._x1=+t},${this._y1=+e}`}quadraticCurveTo(t,e,n,o){this._append`Q${+t},${+e},${this._x1=+n},${this._y1=+o}`}bezierCurveTo(t,e,n,o,h,u){this._append`C${+t},${+e},${+n},${+o},${this._x1=+h},${this._y1=+u}`}arcTo(t,e,n,o,h){if(t=+t,e=+e,n=+n,o=+o,h=+h,h<0)throw new Error(`negative radius: ${h}`);let u=this._x1,a=this._y1,s=n-t,l=o-e,f=u-t,_=a-e,r=f*f+_*_;if(this._x1===null)this._append`M${this._x1=t},${this._y1=e}`;else if(r>c)if(!(Math.abs(_*s-l*f)>c)||!h)this._append`L${this._x1=t},${this._y1=e}`;else{let p=n-u,$=o-a,x=s*s+l*l,P=p*p+$*$,v=Math.sqrt(x),b=Math.sqrt(r),w=h*Math.tan((g-Math.acos((x+r-P)/(2*v*b)))/2),M=w/b,y=w/v;Math.abs(M-1)>c&&this._append`L${t+M*f},${e+M*_}`,this._append`A${h},${h},0,0,${+(_*p>f*$)},${this._x1=t+y*s},${this._y1=e+y*l}`}}arc(t,e,n,o,h,u){if(t=+t,e=+e,n=+n,u=!!u,n<0)throw new Error(`negative radius: ${n}`);let a=n*Math.cos(o),s=n*Math.sin(o),l=t+a,f=e+s,_=1^u,r=u?o-h:h-o;this._x1===null?this._append`M${l},${f}`:(Math.abs(this._x1-l)>c||Math.abs(this._y1-f)>c)&&this._append`L${l},${f}`,n&&(r<0&&(r=r%m+m),r>q?this._append`A${n},${n},0,1,${_},${t-a},${e-s}A${n},${n},0,1,${_},${this._x1=l},${this._y1=f}`:r>c&&this._append`A${n},${n},0,${+(r>=g)},${_},${this._x1=t+n*Math.cos(h)},${this._y1=e+n*Math.sin(h)}`)}rect(t,e,n,o){this._append`M${this._x0=this._x1=+t},${this._y0=this._y1=+e}h${n=+n}v${+o}h${-n}Z`}toString(){return this._}}function C(i){let t=3;return i.digits=function(e){if(!arguments.length)return t;if(e==null)t=null;else{const n=Math.floor(e);if(!(n>=0))throw new RangeError(`invalid digits: ${e}`);t=n}return i},()=>new k(t)}function T(i){this._context=i}T.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._point=0},lineEnd:function(){(this._line||this._line!==0&&this._point===1)&&this._context.closePath(),this._line=1-this._line},point:function(i,t){switch(i=+i,t=+t,this._point){case 0:this._point=1,this._line?this._context.lineTo(i,t):this._context.moveTo(i,t);break;case 1:this._point=2;default:this._context.lineTo(i,t);break}}};function D(i){return new T(i)}function N(i){return i[0]}function R(i){return i[1]}function z(i,t){var e=d(!0),n=null,o=D,h=null,u=C(a);i=typeof i=="function"?i:i===void 0?N:d(i),t=typeof t=="function"?t:t===void 0?R:d(t);function a(s){var l,f=(s=S(s)).length,_,r=!1,p;for(n==null&&(h=o(p=u())),l=0;l<=f;++l)!(l<f&&e(_=s[l],l,s))===r&&((r=!r)?h.lineStart():h.lineEnd()),r&&h.point(+i(_,l,s),+t(_,l,s));if(p)return h=null,p+""||null}return a.x=function(s){return arguments.length?(i=typeof s=="function"?s:d(+s),a):i},a.y=function(s){return arguments.length?(t=typeof s=="function"?s:d(+s),a):t},a.defined=function(s){return arguments.length?(e=typeof s=="function"?s:d(!!s),a):e},a.curve=function(s){return arguments.length?(o=s,n!=null&&(h=o(n)),a):o},a.context=function(s){return arguments.length?(s==null?n=h=null:h=o(n=s),a):n},a}function I(i,t,e,n){const o=Math.abs(i-e),h=Math.abs(t-n);return Math.sqrt(o*o+h*h)}function O(i){return i==null}function Q(i,t){const e=i.split(/(?=M)/g),n=t.split(/(?=M)/g),o=Math.max(i.length,t.length),h=[];for(let u=0;u<o;++u)h.push(L(e[u],n[u]));return function(a){const s=[];for(let l=0;l<h.length;++l)s[l]=h[l](a);return s.join(" ")}}export{Q as a,D as c,I as g,O as i,z as l,C as w,N as x,R as y};
//# sourceMappingURL=interpolateMultiPath-8xM18Eij.js.map
