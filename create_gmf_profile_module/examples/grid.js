(function(){'use strict';var aa="function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){a!=Array.prototype&&a!=Object.prototype&&(a[b]=c.value)},ba="undefined"!=typeof window&&window===this?this:"undefined"!=typeof global&&null!=global?global:this;function ca(a,b){if(b){var c=ba;a=a.split(".");for(var d=0;d<a.length-1;d++){var f=a[d];f in c||(c[f]={});c=c[f]}a=a[a.length-1];d=c[a];b=b(d);b!=d&&null!=b&&aa(c,a,{configurable:!0,writable:!0,value:b})}}
ca("Math.cosh",function(a){if(a)return a;var b=Math.exp;return function(a){a=Number(a);return(b(a)+b(-a))/2}});ca("Object.is",function(a){return a?a:function(a,c){return a===c?0!==a||1/a===1/c:a!==a&&c!==c}});var da=this;function p(a,b){a=a.split(".");var c=da;a[0]in c||!c.execScript||c.execScript("var "+a[0]);for(var d;a.length&&(d=a.shift());)a.length||void 0===b?c[d]&&c[d]!==Object.prototype[d]?c=c[d]:c=c[d]={}:c[d]=b};function r(a,b){a.prototype=Object.create(b.prototype);a.prototype.constructor=a}function ea(){}var fa=0;function u(a){this.message="Assertion failed. See https://openlayers.org/en/latest/doc/errors/#"+a+" for details.";this.code=a;this.name="AssertionError"}r(u,Error);function ha(a){for(var b in a)delete a[b]};function ia(a){function b(b){var c=a.listener,f=a.bindTo||a.target;if(a.da&&a&&a.target){a.target.removeEventListener(a.type,a.ca);var e=ja(a.target,a.type);if(e){var g="deleteIndex"in a?a.deleteIndex:e.indexOf(a);-1!==g&&e.splice(g,1);if(0===e.length){e=a.target;g=a.type;var h=ja(e,g);if(h){for(var n=0,w=h.length;n<w;++n)e.removeEventListener(g,h[n].ca),ha(h[n]);h.length=0;if(h=e.J)delete h[g],0===Object.keys(h).length&&delete e.J}}}ha(a)}return c.call(f,b)}return a.ca=b}
function ja(a,b){return(a=a.J)?a[b]:void 0}function v(a,b,c,d,f){var e=a.J;e||(e=a.J={});var g=e;(e=g[b])||(e=g[b]=[]);a:{g=e;for(var h,n=0,w=g.length;n<w;++n)if(h=g[n],h.listener===c&&h.bindTo===d){g=h;break a}g=void 0}g?f||(g.da=!1):(g={bindTo:d,da:!!f,listener:c,target:a,type:b},a.addEventListener(b,ia(g)),e.push(g));return g};function ka(){};function x(a){this.type=a;this.target=null}x.prototype.preventDefault=x.prototype.stopPropagation=function(){this.ya=!0};function y(){this.G={};this.A={};this.F={}}r(y,ka);y.prototype.addEventListener=function(a,b){var c=this.F[a];c||(c=this.F[a]=[]);-1===c.indexOf(b)&&c.push(b)};function z(a,b){var c="string"===typeof b?new x(b):b;b=c.type;c.target=a;var d=a.F[b];if(d){b in a.A||(a.A[b]=0,a.G[b]=0);++a.A[b];for(var f=0,e=d.length;f<e&&!1!==d[f].call(a,c)&&!c.ya;++f);--a.A[b];if(0===a.A[b]){c=a.G[b];for(delete a.G[b];c--;)a.removeEventListener(b,ea);delete a.A[b]}}}
y.prototype.removeEventListener=function(a,b){var c=this.F[a];c&&(b=c.indexOf(b),a in this.G?(c[b]=ea,++this.G[a]):(c.splice(b,1),0===c.length&&delete this.F[a]))};function A(){y.call(this)}r(A,y);A.prototype.once=function(a,b,c){if(Array.isArray(a)){for(var d=a.length,f=Array(d),e=0;e<d;++e)f[e]=v(this,a[e],b,c,!0);return f}return v(this,a,b,c,!0)};var la=function(){var a;"cosh"in Math?a=Math.cosh:a=function(a){a=Math.exp(a);return(a+1/a)/2};return a}();/*

 Latitude/longitude spherical geodesy formulae taken from
 http://www.movable-type.co.uk/scripts/latlong.html
 Licensed under CC-BY-3.0.
*/
function B(a){a=this.a=a.code;var b=window.proj4;"function"==typeof b&&b.defs(a)};function C(a){B.call(this,{code:a,units:"m",extent:ma,global:!0,Aa:na,Ja:function(a,c){return a/la(c[1]/6378137)}})}r(C,B);var D=6378137*Math.PI,ma=[-D,-D,D,D],na=[-180,-85,180,85],oa=[new C("EPSG:3857"),new C("EPSG:102100"),new C("EPSG:102113"),new C("EPSG:900913"),new C("urn:ogc:def:crs:EPSG:6.18:3:3857"),new C("urn:ogc:def:crs:EPSG::3857"),new C("http://www.opengis.net/gml/srs/epsg.xml#3857")];
function pa(a,b,c){var d=a.length;c=1<c?c:2;void 0===b&&(2<c?b=a.slice():b=Array(d));for(var f=0;f<d;f+=c){b[f]=D*a[f]/180;var e=6378137*Math.log(Math.tan(Math.PI*(a[f+1]+90)/360));e>D?e=D:e<-D&&(e=-D);b[f+1]=e}return b}function qa(a,b,c){var d=a.length;c=1<c?c:2;void 0===b&&(2<c?b=a.slice():b=Array(d));for(var f=0;f<d;f+=c)b[f]=180*a[f]/D,b[f+1]=360*Math.atan(Math.exp(a[f+1]/6378137))/Math.PI-90;return b};function E(a,b){B.call(this,{code:a,units:"degrees",extent:ta,Ia:b,global:!0,La:ua,Aa:ta})}r(E,B);var ta=[-180,-90,180,90],ua=6378137*Math.PI/180,va=[new E("CRS:84"),new E("EPSG:4326","neu"),new E("urn:ogc:def:crs:EPSG::4326","neu"),new E("urn:ogc:def:crs:EPSG:6.6:4326","neu"),new E("urn:ogc:def:crs:OGC:1.3:CRS84"),new E("urn:ogc:def:crs:OGC:2:84"),new E("http://www.opengis.net/gml/srs/epsg.xml#4326","neu"),new E("urn:x-ogc:def:crs:EPSG:4326","neu")];var F={};function G(a,b,c){a=a.a;b=b.a;a in F||(F[a]={});F[a][b]=c};function wa(a){a.forEach(xa);a.forEach(function(b){a.forEach(function(a){b!==a&&G(b,a,ya)})})}function xa(a){G(a,a,ya)}function ya(a,b){if(void 0!==b){for(var c=0,d=a.length;c<d;++c)b[c]=a[c];a=b}else a=a.slice();return a}wa(oa);wa(va);va.forEach(function(a){oa.forEach(function(b){G(a,b,pa);G(b,a,qa)})});function H(){return document.createElement("CANVAS").getContext("2d")};var K="undefined"!==typeof navigator?navigator.userAgent.toLowerCase():"";K.indexOf("firefox");-1!==K.indexOf("safari")&&K.indexOf("chrom");-1!==K.indexOf("webkit")&&K.indexOf("edge");var za=-1!==K.indexOf("macintosh");(function(){if(!("HTMLCanvasElement"in window))return!1;try{return document.createElement("CANVAS").getContext("2d")?!0:!1}catch(a){return!1}})();function L(a){y.call(this);this.highWaterMark=void 0!==a?a:2048;this.l={};this.a=this.b=null}r(L,y);L.prototype.clear=function(){this.l={};this.a=this.b=null;z(this,"clear")};L.prototype.forEach=function(a,b){for(var c=this.b;c;)a.call(b,c.K,c.ea,this),c=c.o};L.prototype.get=function(a){a=this.l[a];if(void 0===a)throw new u(15);if(a===this.a)return a.K;a===this.b?(this.b=this.b.o,this.b.C=null):(a.o.C=a.C,a.C.o=a.o);a.o=null;a.C=this.a;this.a=this.a.o=a;return a.K};
L.prototype.pop=function(){var a=this.b;delete this.l[a.ea];a.o&&(a.o.C=null);this.b=a.o;this.b||(this.a=null);return a.K};L.prototype.set=function(a,b){if(a in this.l)throw new u(16);b={ea:a,o:null,C:this.a,K:b};this.a?this.a.o=b:this.b=b;this.a=b;this.l[a]=b};var Aa=new L;var M={S:{}};M.S.T=function(){};
(function(a){function b(a,b,c){if(g)return new ImageData(a,b,c);b=h.createImageData(b,c);b.data.set(a);return b}function c(a){var b=!0;try{new ImageData(10,10)}catch(I){b=!1}return function(c){var d=c.buffers,e=c.meta,f=c.width,n=c.height,g=d.length,k=d[0].byteLength;if(c.imageOps){k=Array(g);for(c=0;c<g;++c){var m=c;var l=new Uint8ClampedArray(d[c]);var t=f,q=n;l=b?new ImageData(l,t,q):{data:l,width:t,height:q};k[m]=l}f=a(k,e).data}else{f=new Uint8ClampedArray(k);n=Array(g);m=Array(g);for(c=0;c<
g;++c)n[c]=new Uint8ClampedArray(d[c]),m[c]=[0,0,0,0];for(d=0;d<k;d+=4){for(c=0;c<g;++c)l=n[c],m[c][0]=l[d],m[c][1]=l[d+1],m[c][2]=l[d+2],m[c][3]=l[d+3];c=a(m,e);f[d]=c[0];f[d+1]=c[1];f[d+2]=c[2];f[d+3]=c[3]}}return f.buffer}}function d(a,b){var d=Object.keys(a.ta||{}).map(function(b){return"var "+b+" = "+a.ta[b].toString()+";"}).concat(["var __minion__ = ("+c.toString()+")(",a.wa.toString(),");",'self.addEventListener("message", function(event) {',"  var buffer = __minion__(event.data);","  self.postMessage({buffer: buffer, meta: event.data.meta}, [buffer]);",
"});"]);d=URL.createObjectURL(new Blob(d,{type:"text/javascript"}));d=new Worker(d);d.addEventListener("message",b);return d}function f(a,b){var d=c(a.wa);return{postMessage:function(a){setTimeout(function(){b({data:{buffer:d(a),meta:a.meta}})},0)}}}function e(a){this.L=!!a.Ka;var b;0===a.za?b=0:this.L?b=1:b=a.za||1;var c=[];if(b)for(var e=0;e<b;++e)c[e]=d(a,this.Z.bind(this,e));else c[0]=f(a,this.Z.bind(this,0));this.I=c;this.aa=[];this.H=0;this.v={};this.N=null}var g=!0;try{new ImageData(10,10)}catch(n){g=
!1}var h=document.createElement("canvas").getContext("2d");e.prototype.ka=function(){if(0===this.H&&0<this.aa.length){var a=this.N=this.aa.shift(),b=a.inputs[0].width,c=a.inputs[0].height,d=a.inputs.map(function(a){return a.data.buffer}),e=this.I.length;this.H=e;if(1===e)this.I[0].postMessage({buffers:d,meta:a.ua,imageOps:this.L,width:b,height:c},d);else for(var f=4*Math.ceil(a.inputs[0].data.length/4/e),g=0;g<e;++g){for(var h=g*f,k=[],m=0,l=d.length;m<l;++m)k.push(d[g].slice(h,h+f));this.I[g].postMessage({buffers:k,
meta:a.ua,imageOps:this.L,width:b,height:c},k)}}};e.prototype.Z=function(a,b){this.Ha||(this.v[a]=b.data,--this.H,0===this.H&&this.ma())};e.prototype.ma=function(){var a=this.N,c=this.I.length;if(1===c){var d=new Uint8ClampedArray(this.v[0].buffer);var e=this.v[0].meta}else{var f=a.inputs[0].data.length;d=new Uint8ClampedArray(f);e=Array(f);f=4*Math.ceil(f/4/c);for(var g=0;g<c;++g){var h=g*f;d.set(new Uint8ClampedArray(this.v[g].buffer),h);e[g]=this.v[g].meta}}this.N=null;this.v={};a.callback(null,
b(d,a.inputs[0].width,a.inputs[0].height),e);this.ka()};a["default"]={T:e};a.T=e})(M.S=M.S||{});var Ba=[],Ca=[];function Da(a,b){switch(a){case "MAP_RENDERER":a=Ba;a.push(b);break;case "LAYER_RENDERER":a=Ca;a.push(b);break;default:throw Error("Unsupported plugin type: "+a);}};function Ea(a,b){a=void 0!==b?a.toFixed(b):""+a;b=a.indexOf(".");b=-1===b?a.length:b;return 2<b?a:Array(3-b).join("0")+a};function N(a){y.call(this);this.a=a}r(N,A);N.prototype.b=function(a){2===a.target.getState()&&(a=this.a,a.a()&&"ready"==a.sa()&&z(this,"change"))};N.prototype.loadImage=function(a){var b=a.getState();2!=b&&3!=b&&v(a,"change",this.b,this);0==b&&(a.load(),b=a.getState());return 2==b};function Fa(a){N.call(this,a)}r(Fa,N);function Ga(a){N.call(this,a)}r(Ga,Fa);function O(a){N.call(this,a)}r(O,Ga);O.handles=function(a,b){return"canvas"===a&&("IMAGE"===b.getType()||"VECTOR"===b.getType()&&"image"===b.l())};O.create=function(a,b){var c=new O(b);if("VECTOR"===b.getType())for(var d=0,f=Ca.length;d<f;++d){var e=Ca[d];e!==O&&e.handles("canvas",b)&&e.create(a,b)}return c};function P(a){N.call(this,a);this.context=null===this.context?null:H()}r(P,Ga);P.handles=function(a,b){return"canvas"===a&&"TILE"===b.getType()};P.create=function(a,b){return new P(b)};try{new MouseEvent("click",{buttons:1})}catch(a){};function Ha(){}r(Ha,ka);function Q(a){this.b=H();this.a=this.b.canvas;this.a.style.width="100%";this.a.style.height="100%";this.a.style.display="block";this.a.className="ol-unselectable";a.insertBefore(this.a,a.childNodes[0]||null)}r(Q,Ha);Q.handles=function(a){return"canvas"===a};Q.create=function(a,b){return new Q(a,b)};Q.prototype.getType=function(){return"canvas"};M.D=function(){};
(function(a){function b(a,m,l,e,f){l=l||0;e=e||a.length-1;for(f=f||d;e>l;){if(600<e-l){var k=e-l+1,g=m-l+1,t=Math.log(k),q=.5*Math.exp(2*t/3);t=.5*Math.sqrt(t*q*(k-q)/k)*(0>g-k/2?-1:1);b(a,m,Math.max(l,Math.floor(m-g*q/k+t)),Math.min(e,Math.floor(m+(k-g)*q/k+t)),f)}k=a[m];g=l;q=e;c(a,l,m);for(0<f(a[e],k)&&c(a,l,e);g<q;){c(a,g,q);g++;for(q--;0>f(a[g],k);)g++;for(;0<f(a[q],k);)q--}0===f(a[l],k)?c(a,l,q):(q++,c(a,q,e));q<=m&&(l=q+1);m<=q&&(e=q-1)}}function c(a,b,c){var k=a[b];a[b]=a[c];a[c]=k}function d(a,
b){return a<b?-1:a>b?1:0}function f(a,b){if(!(this instanceof f))return new f(a,b);this.O=Math.max(4,a||9);this.Y=Math.max(2,Math.ceil(.4*this.O));b&&this.la(b);this.clear()}function e(a,b){g(a,0,a.children.length,b,a)}function g(a,b,c,d,e){e||(e=J(null));e.c=Infinity;e.f=Infinity;e.g=-Infinity;e.i=-Infinity;for(var k;b<c;b++)k=a.children[b],h(e,a.j?d(k):k);return e}function h(a,b){a.c=Math.min(a.c,b.c);a.f=Math.min(a.f,b.f);a.g=Math.max(a.g,b.g);a.i=Math.max(a.i,b.i);return a}function n(a,b){return a.c-
b.c}function w(a,b){return a.f-b.f}function I(a){return(a.g-a.c)*(a.i-a.f)}function S(a){return a.g-a.c+(a.i-a.f)}function ra(a,b){return b.c<=a.g&&b.f<=a.i&&b.g>=a.c&&b.i>=a.f}function J(a){return{children:a,height:1,j:!0,c:Infinity,f:Infinity,g:-Infinity,i:-Infinity}}function sa(a,b,c,d,e){for(var k=[b,c],f;k.length;)c=k.pop(),b=k.pop(),c-b<=d||(f=b+Math.ceil((c-b)/d/2)*d,Ra(a,f,b,c,e),k.push(b,f,f,c))}var Ra=b;f.prototype={all:function(){return this.U(this.data,[])},search:function(a){var b=this.data,
c=[],d=this.u;if(!ra(a,b))return c;for(var e=[],k,f,g,h;b;){k=0;for(f=b.children.length;k<f;k++)g=b.children[k],h=b.j?d(g):g,ra(a,h)&&(b.j?c.push(g):a.c<=h.c&&a.f<=h.f&&h.g<=a.g&&h.i<=a.i?this.U(g,c):e.push(g));b=e.pop()}return c},load:function(a){if(!a||!a.length)return this;if(a.length<this.Y){for(var b=0,c=a.length;b<c;b++)this.insert(a[b]);return this}a=this.W(a.slice(),0,a.length-1,0);this.data.children.length?this.data.height===a.height?this.ba(this.data,a):(this.data.height<a.height&&(b=this.data,
this.data=a,a=b),this.X(a,this.data.height-a.height-1,!0)):this.data=a;return this},insert:function(a){a&&this.X(a,this.data.height-1);return this},clear:function(){this.data=J([]);return this},u:function(a){return a},P:n,R:w,toJSON:function(){return this.data},U:function(a,b){for(var c=[];a;)a.j?b.push.apply(b,a.children):c.push.apply(c,a.children),a=c.pop();return b},W:function(a,b,c,d){var f=c-b+1,g=this.O;if(f<=g){var k=J(a.slice(b,c+1));e(k,this.u);return k}d||(d=Math.ceil(Math.log(f)/Math.log(g)),
g=Math.ceil(f/Math.pow(g,d-1)));k=J([]);k.j=!1;k.height=d;f=Math.ceil(f/g);g=f*Math.ceil(Math.sqrt(g));var m;for(sa(a,b,c,g,this.P);b<=c;b+=g){var l=Math.min(b+g-1,c);sa(a,b,l,f,this.R);for(m=b;m<=l;m+=f){var h=Math.min(m+f-1,l);k.children.push(this.W(a,m,h,d-1))}}e(k,this.u);return k},ja:function(a,b,c,d){for(var e,f,g,k,l,m,h,t;;){d.push(b);if(b.j||d.length-1===c)break;h=t=Infinity;e=0;for(f=b.children.length;e<f;e++)g=b.children[e],l=I(g),m=(Math.max(g.g,a.g)-Math.min(g.c,a.c))*(Math.max(g.i,a.i)-
Math.min(g.f,a.f))-l,m<t?(t=m,h=l<h?l:h,k=g):m===t&&l<h&&(h=l,k=g);b=k||b.children[0]}return b},X:function(a,b,c){var d=this.u;c=c?a:d(a);d=[];var e=this.ja(c,this.data,b,d);e.children.push(a);for(h(e,c);0<=b;)if(d[b].children.length>this.O)this.na(d,b),b--;else break;this.ga(c,d,b)},na:function(a,b){var c=a[b],d=c.children.length,f=this.Y;this.ha(c,f,d);d=this.ia(c,f,d);d=J(c.children.splice(d,c.children.length-d));d.height=c.height;d.j=c.j;e(c,this.u);e(d,this.u);b?a[b-1].children.push(d):this.ba(c,
d)},ba:function(a,b){this.data=J([a,b]);this.data.height=a.height+1;this.data.j=!1;e(this.data,this.u)},ia:function(a,b,c){var d,e;var f=e=Infinity;for(d=b;d<=c-b;d++){var k=g(a,0,d,this.u);var h=g(a,d,c,this.u);var m=Math.max(0,Math.min(k.g,h.g)-Math.max(k.c,h.c))*Math.max(0,Math.min(k.i,h.i)-Math.max(k.f,h.f));k=I(k)+I(h);if(m<f){f=m;var l=d;e=k<e?k:e}else m===f&&k<e&&(e=k,l=d)}return l},ha:function(a,b,c){var d=a.j?this.P:n,e=a.j?this.R:w,f=this.V(a,b,c,d);b=this.V(a,b,c,e);f<b&&a.children.sort(d)},
V:function(a,b,c,d){a.children.sort(d);d=this.u;var e=g(a,0,b,d),f=g(a,c-b,c,d),k=S(e)+S(f),l;for(l=b;l<c-b;l++){var m=a.children[l];h(e,a.j?d(m):m);k+=S(e)}for(l=c-b-1;l>=b;l--)m=a.children[l],h(f,a.j?d(m):m),k+=S(f);return k},ga:function(a,b,c){for(;0<=c;c--)h(b[c],a)},la:function(a){var b=["return a"," - b",";"];this.P=new Function("a","b",b.join(a[0]));this.R=new Function("a","b",b.join(a[1]));this.u=new Function("a","return {minX: a"+a[0]+", minY: a"+a[1]+", maxX: a"+a[2]+", maxY: a"+a[3]+"};")}};
a["default"]=f})(M.D=M.D||{});M.D=M.D.default;function R(a){N.call(this,a);a.b()&&M.D(9);this.context=H();v(Aa,"clear",this.l,this)}r(R,Fa);R.handles=function(a,b){return"canvas"===a&&"VECTOR"===b.getType()};R.create=function(a,b){return new R(b)};R.prototype.l=function(){this.a.a()};function T(a){this.context=null;P.call(this,a);a.b()&&M.D(9);a.l();v(Aa,"clear",this.l,this)}r(T,P);T.handles=function(a,b){return"canvas"===a&&"VECTOR_TILE"===b.getType()};T.create=function(a,b){return new T(b)};T.prototype.l=function(){var a=this.a;a.a()&&void 0!==this.sa&&z(a,"change")};Da("MAP_RENDERER",Q);for(var Ia=[O,P,R,T],Ja=0,Ka=Ia.length;Ja<Ka;++Ja)Da("LAYER_RENDERER",Ia[Ja]);var U=angular.module("ngeo",["gettext","ui.date","floatThead"]);p("ngeo.AttributeType",{Ba:"boolean",Ca:"date",Da:"datetime",Ea:"geometry",Fa:"number",Ga:"select",TEXT:"text"});p("ngeo.FeatureProperties",{ANGLE:"a",COLOR:"c",IS_CIRCLE:"l",IS_RECTANGLE:"r",IS_TEXT:"t",NAME:"n",SHOW_LABEL:"b",OPACITY:"o",AZIMUT:"z",SHOW_MEASURE:"m",SIZE:"s",STROKE:"k"});p("ngeo.FilterCondition",{AND:"&&",NOT:"!",OR:"||"});
p("ngeo.GeometryType",{CIRCLE:"Circle",LINE_STRING:"LineString",MULTI_LINE_STRING:"MultiLineString",MULTI_POINT:"MultiPoint",MULTI_POLYGON:"MultiPolygon",POINT:"Point",POLYGON:"Polygon",RECTANGLE:"Rectangle",TEXT:"Text"});p("ngeo.NumberType",{FLOAT:"float",INTEGER:"integer"});(function(){function a(a){a.put("ngeomodule/misc/datepickerComponent.html","<div class=ngeo-datepicker> <form name=dateForm class=ngeo-datepicker-form novalidate> <div ng-if=\"::datepickerCtrl.time.widget === 'datepicker'\"> <div class=ngeo-datepicker-start-date> <span ng-if=\"::datepickerCtrl.time.mode === 'range'\" translate>From:</span> <span ng-if=\"::datepickerCtrl.time.mode !== 'range'\" translate>Date:</span> <input name=sdate ui-date=datepickerCtrl.sdateOptions ng-model=datepickerCtrl.sdate required> </div> <div class=ngeo-datepicker-end-date ng-if=\"::datepickerCtrl.time.mode === 'range'\"> <span translate>To:</span> <input name=edate ui-date=datepickerCtrl.edateOptions ng-model=datepickerCtrl.edate required> </div> </div> </form> </div> ");
a.put("ngeomodule/map/scaleselector.html",'<div class="btn-group btn-block" ng-class="::{\'dropup\': scaleselectorCtrl.options.dropup}"> <button type=button class="btn btn-default dropdown-toggle" data-toggle=dropdown aria-expanded=false> <span ng-bind-html="scaleselectorCtrl.currentScale | ngeoScalify | ngeoTrustHtml"></span>&nbsp;<i class=caret></i> </button> <ul class="dropdown-menu btn-block" role=menu> <li ng-repeat="zoomLevel in ::scaleselectorCtrl.zoomLevels"> <a href ng-click=scaleselectorCtrl.changeZoom(zoomLevel) ng-bind-html="scaleselectorCtrl.getScale(zoomLevel) | ngeoScalify | ngeoTrustHtml"> </a> </li> </ul> </div> ');
a.put("ngeomodule/olcs/controls3d.html",'<div class=ngeo-tools> <div class=ngeo-angle><div class=ngeo-angle3d></div></div> <button class="ngeo-left ngeo-tilt-left" ng-click=$ctrl.tilt(5)></button> <button class="ngeo-right ngeo-tilt-right" ng-click=$ctrl.tilt(-5)></button> </div> <div class=ngeo-zoom> <button class=ol-zoom-in ng-click=$ctrl.zoom(1)></button> <button class=ol-zoom-out ng-click=$ctrl.zoom(-1)></button> </div> <div class=ngeo-tools> <div class=ngeo-rotation><div class=ngeo-rotation3d></div></div> <button class=ngeo-left ng-click=$ctrl.rotate(-15)></button> <button class=ngeo-right ng-click=$ctrl.rotate(15)></button> </div> ');
a.put("ngeomodule/message/popupcomponent.html",'<h4 class="popover-title ngeo-popup-title"> <span ng-bind-html=title></span> <button type=button class=close ng-click="open = false"> &times;</button> </h4> <div class=popover-content ng-bind-html=content></div> ');a.put("ngeomodule/filter/rulecomponent.html",'<div class=dropdown ng-class="{open: $ctrl.rule.active}"> <a class="btn btn-default btn-sm dropdown-toggle" type=button ng-click=$ctrl.toggle()> <span>{{ ::$ctrl.clone.name | translate }}</span> <span class=caret></span> </a> <div class="dropdown-menu form-group"> <select class="form-control input-sm ngeo-rule-operators-list" ng-disabled=$ctrl.drawActive ng-if=::$ctrl.clone.operators ng-model=$ctrl.clone.operator ng-options="$ctrl.operators[operator] | translate for operator in ::$ctrl.clone.operators track by operator"> </select> <div ng-switch=::$ctrl.clone.type> <div class="ngeo-rule-type-date form-group" ng-if=$ctrl.rule.active ng-switch-when=date|datetime ng-switch-when-separator=|> <div ng-switch=$ctrl.clone.operator> <div ng-switch-when=..> <ngeo-date-picker time=$ctrl.timeRangeMode on-date-selected=$ctrl.onDateRangeSelected(time)> </ngeo-date-picker> </div> <div ng-switch-default> <ngeo-date-picker time=$ctrl.timeValueMode on-date-selected=$ctrl.onDateSelected(time)> </ngeo-date-picker> </div> </div> </div> <div class="ngeo-rule-type-geometry form-group" ng-switch-when=geometry> <div ng-switch=$ctrl.geomType> <span class="gmf-icon gmf-icon-point" ng-switch-when=Point> </span> <span class="gmf-icon gmf-icon-line" ng-switch-when=LineString> </span> <span class="gmf-icon gmf-icon-polygon" ng-switch-when=Polygon> </span> <span class="gmf-icon gmf-icon-circle" ng-switch-when=Circle> </span> <span class="gmf-icon gmf-icon-rectangle" ng-switch-when=Rectangle> </span> </div> <ngeo-drawfeature ngeo-drawfeature-active=$ctrl.drawActive ngeo-drawfeature-features=$ctrl.drawnFeatures ngeo-drawfeature-map=$ctrl.map> <div ngeo-btn-group class=btn-group> <a data-toggle=tooltip title="{{\'Draw a point on the map\' | translate}}" href ngeo-btn ngeo-drawpoint class="btn btn-sm btn-default ngeo-drawfeature-point" ng-show="[\'intersects\', \'within\'].indexOf($ctrl.clone.operator) !== -1" ng-class="{active: dfCtrl.drawPoint.active}" ng-model=dfCtrl.drawPoint.active> <span class="gmf-icon gmf-icon-point"></span> </a> <a data-toggle=tooltip title="{{\'Draw a line on the map\' | translate}}" href ngeo-btn ngeo-measurelength class="btn btn-sm btn-default ngeo-drawfeature-linestring" ng-show="[\'intersects\', \'within\'].indexOf($ctrl.clone.operator) !== -1" ng-class="{active: dfCtrl.measureLength.active}" ng-model=dfCtrl.measureLength.active> <span class="gmf-icon gmf-icon-line"></span> </a> <a data-toggle=tooltip title="{{\'Draw a polygon on the map\' | translate}}" href ngeo-btn ngeo-measurearea class="btn btn-sm btn-default ngeo-drawfeature-polygon" ng-class="{active: dfCtrl.measureArea.active}" ng-model=dfCtrl.measureArea.active> <span class="gmf-icon gmf-icon-polygon"></span> </a> <a data-toggle=tooltip title="{{\'Draw a circle on the map\' | translate}}" href ngeo-btn ngeo-measureazimut class="btn btn-sm btn-default ngeo-drawfeature-circle" ng-class="{active: dfCtrl.measureAzimut.active}" ng-model=dfCtrl.measureAzimut.active> <span class="gmf-icon gmf-icon-circle"></span> </a> <a data-toggle=tooltip title="{{\'Draw a rectangle on the map\' | translate}}" href ngeo-btn ngeo-drawrectangle class="btn btn-sm btn-default ngeo-drawfeature-rectangle" ng-class="{active: dfCtrl.drawRectangle.active}" ng-model=dfCtrl.drawRectangle.active> <span class="gmf-icon gmf-icon-rectangle"></span> </a> </div> <div class=ngeo-rule-type-geometry-instructions ng-if=$ctrl.drawActive> <span ng-if=dfCtrl.drawPoint.active> {{ \'Draw a point on the map.\' | translate }} </span> <span ng-if=dfCtrl.measureLength.active> {{ \'Draw a line string on the map.\' | translate }} </span> <span ng-if=dfCtrl.measureArea.active> {{ \'Draw a polygon on the map.\' | translate }} </span> <span ng-if=dfCtrl.measureAzimut.active> {{ \'Draw a circle on the map.\' | translate }} </span> <span ng-if=dfCtrl.drawRectangle.active> {{ \'Draw a rectangle on the map.\' | translate }} </span> </div> </ngeo-drawfeature> </div> <div class="checkbox ngeo-rule-type-select" ng-switch-when=select> <a ng-click=$ctrl.selectAllChoices() href>{{ All | translate}} </a> <label class="form-group ol-unselectable" ng-repeat="choice in ::$ctrl.clone.choices"> <input ng-checked="$ctrl.clone.getExpression() && $ctrl.clone.getExpression().split(\',\').indexOf(choice) > -1" ng-click=$ctrl.toggleChoiceSelection(choice) type=checkbox value=choice> <span>{{ choice | translate }}</span> </label> </div> <div class="form-group ngeo-rule-type-text" ng-switch-default> <div ng-switch=$ctrl.clone.operator> <div ng-switch-when=..> <input type=number class="form-control input-sm" ng-model=$ctrl.clone.lowerBoundary> <input type=number class="form-control input-sm" ng-model=$ctrl.clone.upperBoundary> </div> <div ng-switch-default> <input type=number class="form-control input-sm" ng-if="$ctrl.clone.type === \'number\'" ng-model=$ctrl.clone.expression> <input type=text class="form-control input-sm" ng-if="$ctrl.clone.type !== \'number\'" ng-model=$ctrl.clone.expression> </div> </div> </div> <div class=ngeo-rule-btns> <button class="btn btn-xs btn-default" ng-click=$ctrl.apply() type=button>{{\'Apply\' | translate}}</button> <button class="btn btn-xs btn-default" ng-click=$ctrl.cancel() type=button>{{\'Cancel\' | translate}}</button> </div> </div> </div> </div> <div class=ngeo-rule-value ng-if="$ctrl.rule.value !== null"> <a class="btn btn-xs btn-link" ng-click="!$ctrl.rule.active && $ctrl.reset()" ng-disabled=$ctrl.rule.active href> <span class="fa fa-remove"></span> </a> <div ng-switch=::$ctrl.rule.type> <div ng-switch-when=date|datetime ng-switch-when-separator=|> <div ng-switch=$ctrl.rule.operator> <div ng-switch-when=..> <span translate>From </span> <span>{{ $ctrl.timeToDate($ctrl.rule.lowerBoundary) }}</span> <span translate> to </span> <span>{{ $ctrl.timeToDate($ctrl.rule.upperBoundary) }}</span> </div> <div ng-switch-default> <span>{{ $ctrl.rule.operator }}</span> <span>{{ $ctrl.timeToDate($ctrl.rule.getExpression()) }}</span> </div> </div> </div> <div ng-switch-when=geometry> <span>{{ $ctrl.operators[$ctrl.rule.operator] }}</span> <span ng-switch=$ctrl.getRuleGeometryType()> <span class="gmf-icon gmf-icon-point" ng-switch-when=Point> </span> <span class="gmf-icon gmf-icon-line" ng-switch-when=LineString> </span> <span class="gmf-icon gmf-icon-polygon" ng-switch-when=Polygon> </span> <span class="gmf-icon gmf-icon-circle" ng-switch-when=Circle> </span> <span class="gmf-icon gmf-icon-rectangle" ng-switch-when=Rectangle> </span> </span> </div> <div ng-switch-when=select> <span ng-repeat="choice in $ctrl.rule.getExpression().split(\',\')"> {{ choice | translate }}{{ $last ? \'\' : \', \' }} </span> </div> <div ng-switch-default> <div ng-switch=$ctrl.rule.operator> <div ng-switch-when=..> <span translate>Between </span> <span>{{ $ctrl.rule.lowerBoundary }}</span> <span translate> and </span> <span>{{ $ctrl.rule.upperBoundary }}</span> </div> <div ng-switch-default> <span>{{ $ctrl.rule.operator }}</span> <span>{{ $ctrl.rule.getExpression() }}</span> </div> </div> </div> </div> </div> ');
a.put("ngeomodule/googlestreetview/component.html",'<div class=ngeo-googlestreetview-instructions ng-if="$ctrl.location === null" translate> Click on a road on the map to start StreetView. </div> <div class=ngeo-googlestreetview-nodata ng-if=$ctrl.noDataAtLocation translate> Street View data not found for this location. </div> ');a.put("ngeomodule/misc/colorpickerComponent.html",'<table class=ngeo-colorpicker-palette> <tr ng-repeat="colors in ::ctrl.colors"> <td ng-repeat="color in ::colors" ng-click=ctrl.setColor(color) ng-class="{\'ngeo-colorpicker-selected\': color == ctrl.color}"> <div ng-style="::{\'background-color\': color}"></div> </td> </tr> </table> ');
a.put("ngeomodule/filter/component.html",'<div class=dropdown> <a class="btn btn-link dropdown-toggle ngeo-filter-condition-button" ng-class="{disabled: $ctrl.aRuleIsActive}" type=button data-toggle=dropdown ng-disabled=$ctrl.aRuleIsActive> <span class="fa fa-cog"></span> <span class=caret></span> </a> <ul class=dropdown-menu> <li class=ngeo-filter-condition-criteria-header translate>Criteria taken into account</li> <li ng-repeat="condition in ::$ctrl.conditions"> <a href ng-click=$ctrl.setCondition(condition)> <span ng-class="{\'ngeo-filter-condition-criteria-active\': condition.value == $ctrl.datasource.filterCondition}" class="fa fa-check ngeo-filter-condition-criteria"> </span> <span>{{::condition.text | translate}}</span> </a> </li> </ul> </div> <ngeo-rule ng-repeat="rule in $ctrl.directedRules" feature-overlay=::$ctrl.featureOverlay class=ngeo-filter-rule-directed map=$ctrl.map rule=rule tool-group=$ctrl.toolGroup> </ngeo-rule> <hr class=ngeo-filter-separator-rules> <div ng-repeat="rule in $ctrl.customRules"> <a class="btn btn-xs btn-link ngeo-filter-rule-custom-rm-btn" ng-click="!$ctrl.aRuleIsActive && $ctrl.removeCustomRule(rule)" ng-disabled=$ctrl.aRuleIsActive href> <span class="fa fa-remove"></span> </a> <ngeo-rule feature-overlay=::$ctrl.featureOverlay class=ngeo-filter-rule-custom map=$ctrl.map rule=rule tool-group=$ctrl.toolGroup> </ngeo-rule> </div> <div class=dropdown> <a class="btn btn-link dropdown-toggle" ng-class="{disabled: $ctrl.aRuleIsActive}" type=button data-toggle=dropdown ng-disabled=$ctrl.aRuleIsActive> <span translate>+ Add a new criteria</span> <span class=caret></span> </a> <ul class=dropdown-menu> <li ng-repeat="attribute in ::$ctrl.geometryAttributes"> <a href ng-click=$ctrl.createAndAddCustomRule(attribute)> <span translate>Spatial filter</span> </a> </li> <li role=presentation class=divider></li> <li ng-repeat="attribute in ::$ctrl.otherAttributes"> <a href ng-click=$ctrl.createAndAddCustomRule(attribute)> <span>{{::attribute.name | translate}}</span> </a> </li> </ul> </div> <hr class=ngeo-filter-separator-criteria> <a class="btn btn-link" type=button ng-click="!$ctrl.aRuleIsActive && $ctrl.apply()" ng-disabled=$ctrl.aRuleIsActive> <span class="fa fa-check"></span> <span translate>Apply filter</span> </a> <a class="btn btn-link" type=button ng-click="!$ctrl.aRuleIsActive && $ctrl.getData()" ng-disabled=$ctrl.aRuleIsActive> <span class="fa fa-chevron-right"></span> <span translate>Get data</span> </a> ');
a.put("ngeomodule/grid/component.html",'<div class=ngeo-grid-table-container> <table float-thead=ctrl.floatTheadConfig ng-model=ctrl.configuration.data class="table table-bordered table-striped table-hover"> <thead class=table-header> <tr> <th ng-repeat="columnDefs in ctrl.configuration.columnDefs" ng-click=ctrl.sort(columnDefs.name) ng-bind-html="columnDefs.name | ngeoTrustHtml | translate"> <i ng-show="ctrl.sortedBy !== columnDefs.name" class="fa fa-fw"></i> <i ng-show="ctrl.sortedBy === columnDefs.name && ctrl.sortAscending === true" class="fa fa-caret-up"></i> <i ng-show="ctrl.sortedBy === columnDefs.name && ctrl.sortAscending === false" class="fa fa-caret-down"></i> </th> </tr> </thead> <tbody> <tr ng-repeat="attributes in ctrl.configuration.data" ng-class="[\'row-\' + ctrl.configuration.getRowUid(attributes), ctrl.configuration.isRowSelected(attributes) ? \'ngeo-grid-active\': \'\']" ng-click="ctrl.clickRow(attributes, $event)" ng-mousedown=ctrl.preventTextSelection($event)> <td ng-repeat="columnDefs in ctrl.configuration.columnDefs" ng-bind-html="attributes[columnDefs.name] | ngeoTrustHtml"></td> </tr> </tbody> </table> </div> ');
a.put("ngeomodule/editing/attributescomponent.html",'<fieldset ng-disabled=attrCtrl.disabled> <div class=form-group ng-repeat="attribute in ::attrCtrl.attributes"> <div ng-if="attribute.type !== \'geometry\'"> <label ng-if="::attribute.type !== \'boolean\'" class=control-label>{{ ::attribute.name | translate }} <span class=text-muted>{{::attribute.required ? "*" : ""}}</span> </label> <div ng-switch=::attribute.type> <div ng-switch-when=boolean class=checkbox> <label> <input name={{::attribute.name}} ng-required=attribute.required ng-model=attrCtrl.properties[attribute.name] ng-change=attrCtrl.handleInputChange(attribute.name); type=checkbox> <span> {{ ::attribute.name | translate }} <span class=text-muted>{{::attribute.required ? "*" : ""}}</span></span> </label> </div> <select name={{::attribute.name}} ng-required=attribute.required ng-switch-when=select ng-model=attrCtrl.properties[attribute.name] ng-change=attrCtrl.handleInputChange(attribute.name); class=form-control type=text> <option ng-repeat="attribute in ::attribute.choices" value="{{ ::attribute }}"> {{ ::attribute }} </option> </select> <input name={{::attribute.name}} ng-required=attribute.required ng-switch-when=date ui-date=attrCtrl.dateOptions ng-model=attrCtrl.properties[attribute.name] ng-change=attrCtrl.handleInputChange(attribute.name); class=form-control type=text> <input name={{::attribute.name}} ng-required=attribute.required ng-switch-when=datetime ui-date=attrCtrl.dateOptions ng-model=attrCtrl.properties[attribute.name] ng-change=attrCtrl.handleInputChange(attribute.name); class=form-control type=text> <div ng-switch-when=number ng-switch=::attribute.numType> <input name={{::attribute.name}} ng-required=attribute.required ng-switch-when=integer ng-model=attrCtrl.properties[attribute.name] ng-change=attrCtrl.handleInputChange(attribute.name); class=form-control step=1 type=number> <input name={{::attribute.name}} ng-required=attribute.required ng-switch-default ng-model=attrCtrl.properties[attribute.name] ng-change=attrCtrl.handleInputChange(attribute.name); class=form-control type=number> </div> <input name={{::attribute.name}} ng-required=attribute.required ng-switch-default ng-model=attrCtrl.properties[attribute.name] ng-change=attrCtrl.handleInputChange(attribute.name); ng-maxlength=attribute.maxLength class=form-control type=text> <div ng-show="attrCtrl.form.$submitted || attrCtrl.form[attribute.name].$touched"> <p class=text-danger ng-show=attrCtrl.form[attribute.name].$error.required> {{\'This field is required\' | translate}} </p> </div> </div> </div> </div> </fieldset> ');
a.put("ngeomodule/layertree/component.html",'<span ng-if=::!layertreeCtrl.isRoot>{{::layertreeCtrl.node.name}}</span> <input type=checkbox ng-if="::layertreeCtrl.node && !layertreeCtrl.node.children" ng-model=layertreeCtrl.getSetActive ng-model-options="{getterSetter: true}"> <ul ng-if=::layertreeCtrl.node.children> <li ng-repeat="node in ::layertreeCtrl.node.children" ngeo-layertree=::node ngeo-layertree-notroot ngeo-layertree-map=layertreeCtrl.map ngeo-layertree-nodelayerexpr=layertreeCtrl.nodelayerExpr ngeo-layertree-listenersexpr=layertreeCtrl.listenersExpr> </li> </ul> ')}
a.$inject=["$templateCache"];U.run(a)})();function La(a){function b(a){return(a=c(a,0))?"1\u00a0:\u00a0"+a:""}var c=a("number");b.$stateful=!0;return b}La.$inject=["$filter"];U.filter("ngeoScalify",La);
function Ma(a){var b=a.NUMBER_FORMATS;return function(a,d){var c=b.GROUP_SEP,e=b.DECIMAL_SEP;void 0===d&&(d=3);if(Infinity===a)return"\u221e";if(-Infinity===a)return"-\u221e";if(0===a)return"0";var g=0>a;a=Math.abs(a);var h=d-Math.floor(Math.log(a)/Math.log(10))-1,n=Math.pow(10,h);a=Math.round(a*n);d="";n=Math.floor(a/n);if(0<h){for(d=""+a;d.length<h;)d="0"+d;for(d=d.substring(d.length-h);"0"===d[d.length-1];)d=d.substring(0,d.length-1)}a=[];for(h=""+n;3<h.length;)n=h.length-3,a.unshift(h.substring(n)),
h=h.substring(0,n);a.unshift(h);return(g?"-":"")+a.join(c)+(0===d.length?"":e+d)}}Ma.$inject=["$locale"];U.filter("ngeoNumber",Ma);function Na(a){var b=a("ngeoNumber"),c=" k M G T P".split(" "),d=" Ki Mi Gi Ti Pi".split(" ");return function(a,e,g,h){void 0===e&&(e="");var f=1E3,w=c;"square"===g?f=1E6:"binary"===g&&(f=1024,w=d);g=0;for(var I=w.length-1;a>=f&&g<I;)a/=f,g++;e=w[g]+e;f=0==e.length?"":"\u00a0";return b(a,h)+f+e}}Na.$inject=["$filter"];U.filter("ngeoUnitPrefix",Na);
function Oa(a){return function(b,c,d){d=d?d:"{x} {y}";var f=b[0];b=b[1];c=parseInt(c,10)|0;f=a("number")(f,c);b=a("number")(b,c);return d.replace("{x}",f).replace("{y}",b)}}Oa.$inject=["$filter"];U.filter("ngeoNumberCoordinates",Oa);
U.filter("ngeoDMSCoordinates",function(){function a(a,c,d){a=(a+180)%360;a=(0>360*a?a+360:a)-180;var b=Math.abs(3600*a),e=b%60;return Math.floor(b/3600)+"\u00b0 "+Ea(Math.floor(b/60%60))+"\u2032 "+Ea(e,d)+"\u2033 "+c.charAt(0>a?1:0)}return function(b,c,d){c=parseInt(c,10)|0;d=d?d:"{x} {y}";var f=a(b[0],"EW",c);b=a(b[1],"NS",c);return d.replace("{x}",f).replace("{y}",b)}});function Pa(a){return function(b){return void 0!==b&&null!==b?a.trustAsHtml(""+b):a.trustAsHtml("&nbsp;")}}Pa.$inject=["$sce"];
U.filter("ngeoTrustHtml",Pa);function V(a,b){this.data=a;this.columnDefs=b;this.selectedRows={}}p("ngeo.grid.Config",V);function W(a){return""+(a.va||(a.va=++fa))}V.getRowUid=W;V.prototype.B=function(a){return!!this.selectedRows[W(a)]};V.prototype.isRowSelected=V.prototype.B;V.prototype.pa=function(){return Object.keys(this.selectedRows).length};V.prototype.getSelectedCount=V.prototype.pa;V.prototype.qa=function(){var a=this;return this.data.filter(function(b){return a.B(b)})};V.prototype.getSelectedRows=V.prototype.qa;
function X(a,b){var c=W(b);a.selectedRows[c]=b}function Qa(a,b){var c=W(b);a.B(b)?delete a.selectedRows[c]:a.selectedRows[c]=b}V.prototype.selectAll=function(){var a=this;this.data.forEach(function(b){X(a,b)})};V.prototype.selectAll=V.prototype.selectAll;V.prototype.fa=function(){for(var a in this.selectedRows)delete this.selectedRows[a]};V.prototype.unselectAll=V.prototype.fa;V.prototype.ra=function(){var a=this;this.data.forEach(function(b){Qa(a,b)})};V.prototype.invertSelection=V.prototype.ra;
var Sa=angular.module("ngeoGridConfig",[]);U.requires.push(Sa.name);var Y=angular.module("ngeoGrid",[Sa.name]);U.requires.push(Y.name);Y.value("ngeoGridTemplateUrl",function(a,b){a=b.ngeoGridTemplateurl;return void 0!==a?a:"ngeomodule/grid/component.html"});function Ta(a,b,c){return c(a,b)}Ta.$inject=["$element","$attrs","ngeoGridTemplateUrl"];Y.a={controller:"ngeoGridController as ctrl",bindings:{configuration:"=ngeoGridConfiguration"},templateUrl:Ta};Y.component("ngeoGrid",Y.a);
function Z(){this.sortAscending=!0;this.floatTheadConfig={scrollContainer:function(a){return a.closest(".ngeo-grid-table-container")}}}Z.$inject=["$scope"];Z.prototype.$onInit=function(){this.selectedRows=this.configuration.selectedRows};Z.prototype.sort=function(a){this.sortAscending=this.sortedBy===a?!this.sortAscending:!0;this.sortedBy=a;var b=this.sortAscending?1:-1;this.configuration.data.sort(function(c,d){return c[a]?d[a]?c[a]>d[a]?b:-b:-1:1})};Z.prototype.sort=Z.prototype.sort;
Z.prototype.oa=function(a,b){var c=!b.altKey&&!(b.metaKey||b.ctrlKey)&&b.shiftKey;b=!b.altKey&&(za?b.metaKey:b.ctrlKey)&&!b.shiftKey;if(c&&!b){var d=W(a);c=this.configuration.data;if(!this.configuration.B(a)){b=void 0;for(var f=[],e=0;e<c.length;e++){var g=c[e],h=W(g);d===h?b=e:this.configuration.B(g)&&f.push(e)}0==f.length&&X(this.configuration,a);d=Infinity;a=f[0];for(e=0;e<f.length;e++)g=f[e],h=Math.abs(g-b),d>h&&(d=h,a=g);f=b>a?b:a;for(b=b<a?b:a;b<=f;b++)X(this.configuration,c[b])}}else!c&&b?
Qa(this.configuration,a):(c=this.configuration.B(a),this.configuration.fa(),c||X(this.configuration,a))};Z.prototype.clickRow=Z.prototype.oa;Z.prototype.xa=function(a){var b=!a.altKey&&(za?a.metaKey:a.ctrlKey)&&!a.shiftKey;(!a.altKey&&!a.metaKey&&!a.ctrlKey&&a.shiftKey||b)&&a.preventDefault()};Z.prototype.preventTextSelection=Z.prototype.xa;Y.controller("ngeoGridController",Z);var Ua=angular.module("ngeoGridModule",[U.name,Y.name]);angular.module("app",[U.name,Ua.name]).controller("MainController",function(){this.gridConfig=new V([{name:"row_1",display_name:"Row 1",type:12,timestamp:"2010-11-09T22:56:26Z"},{name:"row_2",display_name:"Row 2",type:121,timestamp:"2010-11-07T22:56:26Z"},{name:"row_3",display_name:"Row 3",type:7,timestamp:"2010-11-03T22:56:26Z"},{name:"row_4",display_name:"Row 4",type:5,timestamp:"2010-11-19T22:56:26Z"},{name:"row_5",display_name:"Row 5",type:23,timestamp:"2010-11-23T22:56:26Z"},{name:"row_6",display_name:"Row 6",
type:111,timestamp:"2010-11-17T22:56:26Z"}],[{name:"name"},{name:"display_name"},{name:"timestamp"},{name:"type"}])});}).call(window);
//# sourceMappingURL=grid.js.map
