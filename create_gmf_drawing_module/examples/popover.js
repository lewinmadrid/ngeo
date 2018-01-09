(function(){'use strict';var aa="function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){a!=Array.prototype&&a!=Object.prototype&&(a[b]=c.value)},ba="undefined"!=typeof window&&window===this?this:"undefined"!=typeof global&&null!=global?global:this;function ca(a,b){if(b){var c=ba;a=a.split(".");for(var d=0;d<a.length-1;d++){var f=a[d];f in c||(c[f]={});c=c[f]}a=a[a.length-1];d=c[a];b=b(d);b!=d&&null!=b&&aa(c,a,{configurable:!0,writable:!0,value:b})}}
ca("Math.cosh",function(a){if(a)return a;var b=Math.exp;return function(a){a=Number(a);return(b(a)+b(-a))/2}});ca("Object.is",function(a){return a?a:function(a,c){return a===c?0!==a||1/a===1/c:a!==a&&c!==c}});var da=this;function q(a,b){a=a.split(".");var c=da;a[0]in c||!c.execScript||c.execScript("var "+a[0]);for(var d;a.length&&(d=a.shift());)a.length||void 0===b?c[d]&&c[d]!==Object.prototype[d]?c=c[d]:c=c[d]={}:c[d]=b};function r(a,b){a.prototype=Object.create(b.prototype);a.prototype.constructor=a}function ea(){};function t(a){this.message="Assertion failed. See https://openlayers.org/en/latest/doc/errors/#"+a+" for details.";this.code=a;this.name="AssertionError"}r(t,Error);function fa(a){for(var b in a)delete a[b]};function ha(a){function b(b){var c=a.listener,f=a.bindTo||a.target;if(a.da&&a&&a.target){a.target.removeEventListener(a.type,a.ca);var e=ia(a.target,a.type);if(e){var g="deleteIndex"in a?a.deleteIndex:e.indexOf(a);-1!==g&&e.splice(g,1);if(0===e.length){e=a.target;g=a.type;var m=ia(e,g);if(m){for(var p=0,D=m.length;p<D;++p)e.removeEventListener(g,m[p].ca),fa(m[p]);m.length=0;if(m=e.I)delete m[g],0===Object.keys(m).length&&delete e.I}}}fa(a)}return c.call(f,b)}return a.ca=b}
function ia(a,b){return(a=a.I)?a[b]:void 0}function u(a,b,c,d,f){var e=a.I;e||(e=a.I={});var g=e;(e=g[b])||(e=g[b]=[]);a:{g=e;for(var m,p=0,D=g.length;p<D;++p)if(m=g[p],m.listener===c&&m.bindTo===d){g=m;break a}g=void 0}g?f||(g.da=!1):(g={bindTo:d,da:!!f,listener:c,target:a,type:b},a.addEventListener(b,ha(g)),e.push(g));return g};function ja(){};function v(a){this.type=a;this.target=null}v.prototype.preventDefault=v.prototype.stopPropagation=function(){this.ra=!0};function w(){this.F={};this.v={};this.D={}}r(w,ja);w.prototype.addEventListener=function(a,b){var c=this.D[a];c||(c=this.D[a]=[]);-1===c.indexOf(b)&&c.push(b)};function x(a,b){var c="string"===typeof b?new v(b):b;b=c.type;c.target=a;var d=a.D[b];if(d){b in a.v||(a.v[b]=0,a.F[b]=0);++a.v[b];for(var f=0,e=d.length;f<e&&!1!==d[f].call(a,c)&&!c.ra;++f);--a.v[b];if(0===a.v[b]){c=a.F[b];for(delete a.F[b];c--;)a.removeEventListener(b,ea);delete a.v[b]}}}
w.prototype.removeEventListener=function(a,b){var c=this.D[a];c&&(b=c.indexOf(b),a in this.F?(c[b]=ea,++this.F[a]):(c.splice(b,1),0===c.length&&delete this.D[a]))};function y(){w.call(this)}r(y,w);y.prototype.on=function(a,b,c){if(Array.isArray(a)){for(var d=a.length,f=Array(d),e=0;e<d;++e)f[e]=u(this,a[e],b,c);return f}return u(this,a,b,c)};y.prototype.once=function(a,b,c){if(Array.isArray(a)){for(var d=a.length,f=Array(d),e=0;e<d;++e)f[e]=u(this,a[e],b,c,!0);return f}return u(this,a,b,c,!0)};var ka=function(){var a;"cosh"in Math?a=Math.cosh:a=function(a){a=Math.exp(a);return(a+1/a)/2};return a}();/*

 Latitude/longitude spherical geodesy formulae taken from
 http://www.movable-type.co.uk/scripts/latlong.html
 Licensed under CC-BY-3.0.
*/
function A(a){a=this.a=a.code;var b=window.proj4;"function"==typeof b&&b.defs(a)};function B(a){A.call(this,{code:a,units:"m",extent:la,global:!0,ta:ma,Ca:function(a,c){return a/ka(c[1]/6378137)}})}r(B,A);var C=6378137*Math.PI,la=[-C,-C,C,C],ma=[-180,-85,180,85],na=[new B("EPSG:3857"),new B("EPSG:102100"),new B("EPSG:102113"),new B("EPSG:900913"),new B("urn:ogc:def:crs:EPSG:6.18:3:3857"),new B("urn:ogc:def:crs:EPSG::3857"),new B("http://www.opengis.net/gml/srs/epsg.xml#3857")];
function qa(a,b,c){var d=a.length;c=1<c?c:2;void 0===b&&(2<c?b=a.slice():b=Array(d));for(var f=0;f<d;f+=c){b[f]=C*a[f]/180;var e=6378137*Math.log(Math.tan(Math.PI*(a[f+1]+90)/360));e>C?e=C:e<-C&&(e=-C);b[f+1]=e}return b}function ra(a,b,c){var d=a.length;c=1<c?c:2;void 0===b&&(2<c?b=a.slice():b=Array(d));for(var f=0;f<d;f+=c)b[f]=180*a[f]/C,b[f+1]=360*Math.atan(Math.exp(a[f+1]/6378137))/Math.PI-90;return b};function E(a,b){A.call(this,{code:a,units:"degrees",extent:sa,Ba:b,global:!0,Ea:ta,ta:sa})}r(E,A);var sa=[-180,-90,180,90],ta=6378137*Math.PI/180,ua=[new E("CRS:84"),new E("EPSG:4326","neu"),new E("urn:ogc:def:crs:EPSG::4326","neu"),new E("urn:ogc:def:crs:EPSG:6.6:4326","neu"),new E("urn:ogc:def:crs:OGC:1.3:CRS84"),new E("urn:ogc:def:crs:OGC:2:84"),new E("http://www.opengis.net/gml/srs/epsg.xml#4326","neu"),new E("urn:x-ogc:def:crs:EPSG:4326","neu")];var G={};function H(a,b,c){a=a.a;b=b.a;a in G||(G[a]={});G[a][b]=c};function va(a){a.forEach(wa);a.forEach(function(b){a.forEach(function(a){b!==a&&H(b,a,xa)})})}function wa(a){H(a,a,xa)}function xa(a,b){if(void 0!==b){for(var c=0,d=a.length;c<d;++c)b[c]=a[c];a=b}else a=a.slice();return a}va(na);va(ua);ua.forEach(function(a){na.forEach(function(b){H(a,b,qa);H(b,a,ra)})});function J(){return document.createElement("CANVAS").getContext("2d")};var K="undefined"!==typeof navigator?navigator.userAgent.toLowerCase():"";K.indexOf("firefox");-1!==K.indexOf("safari")&&K.indexOf("chrom");-1!==K.indexOf("webkit")&&K.indexOf("edge");K.indexOf("macintosh");(function(){if(!("HTMLCanvasElement"in window))return!1;try{return document.createElement("CANVAS").getContext("2d")?!0:!1}catch(a){return!1}})();function L(a){w.call(this);this.highWaterMark=void 0!==a?a:2048;this.l={};this.a=this.b=null}r(L,w);L.prototype.clear=function(){this.l={};this.a=this.b=null;x(this,"clear")};L.prototype.forEach=function(a,b){for(var c=this.b;c;)a.call(b,c.J,c.ea,this),c=c.o};L.prototype.get=function(a){a=this.l[a];if(void 0===a)throw new t(15);if(a===this.a)return a.J;a===this.b?(this.b=this.b.o,this.b.B=null):(a.o.B=a.B,a.B.o=a.o);a.o=null;a.B=this.a;this.a=this.a.o=a;return a.J};
L.prototype.pop=function(){var a=this.b;delete this.l[a.ea];a.o&&(a.o.B=null);this.b=a.o;this.b||(this.a=null);return a.J};L.prototype.set=function(a,b){if(a in this.l)throw new t(16);b={ea:a,o:null,B:this.a,J:b};this.a?this.a.o=b:this.b=b;this.a=b;this.l[a]=b};var ya=new L;var M={S:{}};M.S.T=function(){};
(function(a){function b(a,b,c){if(g)return new ImageData(a,b,c);b=m.createImageData(b,c);b.data.set(a);return b}function c(a){var b=!0;try{new ImageData(10,10)}catch(Q){b=!1}return function(c){var d=c.buffers,e=c.meta,f=c.width,p=c.height,g=d.length,h=d[0].byteLength;if(c.imageOps){h=Array(g);for(c=0;c<g;++c){var k=c;var l=new Uint8ClampedArray(d[c]);var n=f,z=p;l=b?new ImageData(l,n,z):{data:l,width:n,height:z};h[k]=l}f=a(h,e).data}else{f=new Uint8ClampedArray(h);p=Array(g);k=Array(g);for(c=0;c<
g;++c)p[c]=new Uint8ClampedArray(d[c]),k[c]=[0,0,0,0];for(d=0;d<h;d+=4){for(c=0;c<g;++c)l=p[c],k[c][0]=l[d],k[c][1]=l[d+1],k[c][2]=l[d+2],k[c][3]=l[d+3];c=a(k,e);f[d]=c[0];f[d+1]=c[1];f[d+2]=c[2];f[d+3]=c[3]}}return f.buffer}}function d(a,b){var d=Object.keys(a.oa||{}).map(function(b){return"var "+b+" = "+a.oa[b].toString()+";"}).concat(["var __minion__ = ("+c.toString()+")(",a.qa.toString(),");",'self.addEventListener("message", function(event) {',"  var buffer = __minion__(event.data);","  self.postMessage({buffer: buffer, meta: event.data.meta}, [buffer]);",
"});"]);d=URL.createObjectURL(new Blob(d,{type:"text/javascript"}));d=new Worker(d);d.addEventListener("message",b);return d}function f(a,b){var d=c(a.qa);return{postMessage:function(a){setTimeout(function(){b({data:{buffer:d(a),meta:a.meta}})},0)}}}function e(a){this.K=!!a.Da;var b;0===a.sa?b=0:this.K?b=1:b=a.sa||1;var c=[];if(b)for(var e=0;e<b;++e)c[e]=d(a,this.Z.bind(this,e));else c[0]=f(a,this.Z.bind(this,0));this.H=c;this.aa=[];this.G=0;this.A={};this.L=null}var g=!0;try{new ImageData(10,10)}catch(p){g=
!1}var m=document.createElement("canvas").getContext("2d");e.prototype.ja=function(){if(0===this.G&&0<this.aa.length){var a=this.L=this.aa.shift(),b=a.inputs[0].width,c=a.inputs[0].height,d=a.inputs.map(function(a){return a.data.buffer}),e=this.H.length;this.G=e;if(1===e)this.H[0].postMessage({buffers:d,meta:a.pa,imageOps:this.K,width:b,height:c},d);else for(var f=4*Math.ceil(a.inputs[0].data.length/4/e),g=0;g<e;++g){for(var m=g*f,h=[],k=0,l=d.length;k<l;++k)h.push(d[g].slice(m,m+f));this.H[g].postMessage({buffers:h,
meta:a.pa,imageOps:this.K,width:b,height:c},h)}}};e.prototype.Z=function(a,b){this.Aa||(this.A[a]=b.data,--this.G,0===this.G&&this.la())};e.prototype.la=function(){var a=this.L,c=this.H.length;if(1===c){var d=new Uint8ClampedArray(this.A[0].buffer);var e=this.A[0].meta}else{var f=a.inputs[0].data.length;d=new Uint8ClampedArray(f);e=Array(f);f=4*Math.ceil(f/4/c);for(var g=0;g<c;++g){var m=g*f;d.set(new Uint8ClampedArray(this.A[g].buffer),m);e[g]=this.A[g].meta}}this.L=null;this.A={};a.callback(null,
b(d,a.inputs[0].width,a.inputs[0].height),e);this.ja()};a["default"]={T:e};a.T=e})(M.S=M.S||{});var za=[],N=[];function Aa(a,b){switch(a){case "MAP_RENDERER":a=za;a.push(b);break;case "LAYER_RENDERER":a=N;a.push(b);break;default:throw Error("Unsupported plugin type: "+a);}};function O(a){w.call(this);this.a=a}r(O,y);O.prototype.b=function(a){2===a.target.getState()&&(a=this.a,a.a()&&"ready"==a.na()&&x(this,"change"))};O.prototype.loadImage=function(a){var b=a.getState();2!=b&&3!=b&&u(a,"change",this.b,this);0==b&&(a.load(),b=a.getState());return 2==b};function P(a){O.call(this,a)}r(P,O);function S(a){O.call(this,a)}r(S,P);function T(a){O.call(this,a)}r(T,S);T.handles=function(a,b){return"canvas"===a&&("IMAGE"===b.getType()||"VECTOR"===b.getType()&&"image"===b.l())};T.create=function(a,b){var c=new T(b);if("VECTOR"===b.getType())for(var d=0,f=N.length;d<f;++d){var e=N[d];e!==T&&e.handles("canvas",b)&&e.create(a,b)}return c};function U(a){O.call(this,a);this.context=null===this.context?null:J()}r(U,S);U.handles=function(a,b){return"canvas"===a&&"TILE"===b.getType()};U.create=function(a,b){return new U(b)};try{new MouseEvent("click",{buttons:1})}catch(a){};function Ba(){}r(Ba,ja);function V(a){this.b=J();this.a=this.b.canvas;this.a.style.width="100%";this.a.style.height="100%";this.a.style.display="block";this.a.className="ol-unselectable";a.insertBefore(this.a,a.childNodes[0]||null)}r(V,Ba);V.handles=function(a){return"canvas"===a};V.create=function(a,b){return new V(a,b)};V.prototype.getType=function(){return"canvas"};M.C=function(){};
(function(a){function b(a,k,l,n,e){l=l||0;n=n||a.length-1;for(e=e||d;n>l;){if(600<n-l){var h=n-l+1,f=k-l+1,z=Math.log(h),g=.5*Math.exp(2*z/3);z=.5*Math.sqrt(z*g*(h-g)/h)*(0>f-h/2?-1:1);b(a,k,Math.max(l,Math.floor(k-f*g/h+z)),Math.min(n,Math.floor(k+(h-f)*g/h+z)),e)}h=a[k];f=l;g=n;c(a,l,k);for(0<e(a[n],h)&&c(a,l,n);f<g;){c(a,f,g);f++;for(g--;0>e(a[f],h);)f++;for(;0<e(a[g],h);)g--}0===e(a[l],h)?c(a,l,g):(g++,c(a,g,n));g<=k&&(l=g+1);k<=g&&(n=g-1)}}function c(a,b,c){var h=a[b];a[b]=a[c];a[c]=h}function d(a,
b){return a<b?-1:a>b?1:0}function f(a,b){if(!(this instanceof f))return new f(a,b);this.N=Math.max(4,a||9);this.Y=Math.max(2,Math.ceil(.4*this.N));b&&this.ka(b);this.clear()}function e(a,b){g(a,0,a.children.length,b,a)}function g(a,b,c,d,e){e||(e=F(null));e.c=Infinity;e.f=Infinity;e.g=-Infinity;e.i=-Infinity;for(var h;b<c;b++)h=a.children[b],m(e,a.j?d(h):h);return e}function m(a,b){a.c=Math.min(a.c,b.c);a.f=Math.min(a.f,b.f);a.g=Math.max(a.g,b.g);a.i=Math.max(a.i,b.i);return a}function p(a,b){return a.c-
b.c}function D(a,b){return a.f-b.f}function Q(a){return(a.g-a.c)*(a.i-a.f)}function R(a){return a.g-a.c+(a.i-a.f)}function oa(a,b){return b.c<=a.g&&b.f<=a.i&&b.g>=a.c&&b.i>=a.f}function F(a){return{children:a,height:1,j:!0,c:Infinity,f:Infinity,g:-Infinity,i:-Infinity}}function pa(a,b,c,d,e){for(var h=[b,c],k;h.length;)c=h.pop(),b=h.pop(),c-b<=d||(k=b+Math.ceil((c-b)/d/2)*d,Ea(a,k,b,c,e),h.push(b,k,k,c))}var Ea=b;f.prototype={all:function(){return this.U(this.data,[])},search:function(a){var b=this.data,
c=[],h=this.u;if(!oa(a,b))return c;for(var d=[],e,f,g,I;b;){e=0;for(f=b.children.length;e<f;e++)g=b.children[e],I=b.j?h(g):g,oa(a,I)&&(b.j?c.push(g):a.c<=I.c&&a.f<=I.f&&I.g<=a.g&&I.i<=a.i?this.U(g,c):d.push(g));b=d.pop()}return c},load:function(a){if(!a||!a.length)return this;if(a.length<this.Y){for(var b=0,c=a.length;b<c;b++)this.insert(a[b]);return this}a=this.W(a.slice(),0,a.length-1,0);this.data.children.length?this.data.height===a.height?this.ba(this.data,a):(this.data.height<a.height&&(b=this.data,
this.data=a,a=b),this.X(a,this.data.height-a.height-1,!0)):this.data=a;return this},insert:function(a){a&&this.X(a,this.data.height-1);return this},clear:function(){this.data=F([]);return this},u:function(a){return a},O:p,P:D,toJSON:function(){return this.data},U:function(a,b){for(var c=[];a;)a.j?b.push.apply(b,a.children):c.push.apply(c,a.children),a=c.pop();return b},W:function(a,b,c,d){var h=c-b+1,g=this.N;if(h<=g){var f=F(a.slice(b,c+1));e(f,this.u);return f}d||(d=Math.ceil(Math.log(h)/Math.log(g)),
g=Math.ceil(h/Math.pow(g,d-1)));f=F([]);f.j=!1;f.height=d;h=Math.ceil(h/g);g=h*Math.ceil(Math.sqrt(g));var k;for(pa(a,b,c,g,this.O);b<=c;b+=g){var l=Math.min(b+g-1,c);pa(a,b,l,h,this.P);for(k=b;k<=l;k+=h){var n=Math.min(k+h-1,l);f.children.push(this.W(a,k,n,d-1))}}e(f,this.u);return f},ia:function(a,b,c,d){for(var e,g,f,h,k,l,n,m;;){d.push(b);if(b.j||d.length-1===c)break;n=m=Infinity;e=0;for(g=b.children.length;e<g;e++)f=b.children[e],k=Q(f),l=(Math.max(f.g,a.g)-Math.min(f.c,a.c))*(Math.max(f.i,a.i)-
Math.min(f.f,a.f))-k,l<m?(m=l,n=k<n?k:n,h=f):l===m&&k<n&&(n=k,h=f);b=h||b.children[0]}return b},X:function(a,b,c){var d=this.u;c=c?a:d(a);d=[];var e=this.ia(c,this.data,b,d);e.children.push(a);for(m(e,c);0<=b;)if(d[b].children.length>this.N)this.ma(d,b),b--;else break;this.fa(c,d,b)},ma:function(a,b){var c=a[b],d=c.children.length,f=this.Y;this.ga(c,f,d);d=this.ha(c,f,d);d=F(c.children.splice(d,c.children.length-d));d.height=c.height;d.j=c.j;e(c,this.u);e(d,this.u);b?a[b-1].children.push(d):this.ba(c,
d)},ba:function(a,b){this.data=F([a,b]);this.data.height=a.height+1;this.data.j=!1;e(this.data,this.u)},ha:function(a,b,c){var d,e;var f=e=Infinity;for(d=b;d<=c-b;d++){var h=g(a,0,d,this.u);var k=g(a,d,c,this.u);var l=Math.max(0,Math.min(h.g,k.g)-Math.max(h.c,k.c))*Math.max(0,Math.min(h.i,k.i)-Math.max(h.f,k.f));h=Q(h)+Q(k);if(l<f){f=l;var m=d;e=h<e?h:e}else l===f&&h<e&&(e=h,m=d)}return m},ga:function(a,b,c){var d=a.j?this.O:p,e=a.j?this.P:D,f=this.V(a,b,c,d);b=this.V(a,b,c,e);f<b&&a.children.sort(d)},
V:function(a,b,c,d){a.children.sort(d);d=this.u;var e=g(a,0,b,d),f=g(a,c-b,c,d),h=R(e)+R(f),k;for(k=b;k<c-b;k++){var l=a.children[k];m(e,a.j?d(l):l);h+=R(e)}for(k=c-b-1;k>=b;k--)l=a.children[k],m(f,a.j?d(l):l),h+=R(f);return h},fa:function(a,b,c){for(;0<=c;c--)m(b[c],a)},ka:function(a){var b=["return a"," - b",";"];this.O=new Function("a","b",b.join(a[0]));this.P=new Function("a","b",b.join(a[1]));this.u=new Function("a","return {minX: a"+a[0]+", minY: a"+a[1]+", maxX: a"+a[2]+", maxY: a"+a[3]+"};")}};
a["default"]=f})(M.C=M.C||{});M.C=M.C.default;function W(a){O.call(this,a);a.b()&&M.C(9);this.context=J();u(ya,"clear",this.l,this)}r(W,P);W.handles=function(a,b){return"canvas"===a&&"VECTOR"===b.getType()};W.create=function(a,b){return new W(b)};W.prototype.l=function(){this.a.a()};function X(a){this.context=null;U.call(this,a);a.b()&&M.C(9);a.l();u(ya,"clear",this.l,this)}r(X,U);X.handles=function(a,b){return"canvas"===a&&"VECTOR_TILE"===b.getType()};X.create=function(a,b){return new X(b)};X.prototype.l=function(){var a=this.a;a.a()&&void 0!==this.na&&x(a,"change")};Aa("MAP_RENDERER",V);for(var Ca=[T,U,W,X],Da=0,Fa=Ca.length;Da<Fa;++Da)Aa("LAYER_RENDERER",Ca[Da]);var Ga=angular.module("ngeo",["gettext","ui.date","floatThead"]);q("ngeo.AttributeType",{ua:"boolean",va:"date",wa:"datetime",xa:"geometry",ya:"number",za:"select",TEXT:"text"});q("ngeo.FeatureProperties",{ANGLE:"a",COLOR:"c",IS_CIRCLE:"l",IS_RECTANGLE:"r",IS_TEXT:"t",NAME:"n",SHOW_LABEL:"b",OPACITY:"o",AZIMUT:"z",SHOW_MEASURE:"m",SIZE:"s",STROKE:"k"});q("ngeo.FilterCondition",{AND:"&&",NOT:"!",OR:"||"});
q("ngeo.GeometryType",{CIRCLE:"Circle",LINE_STRING:"LineString",MULTI_LINE_STRING:"MultiLineString",MULTI_POINT:"MultiPoint",MULTI_POLYGON:"MultiPolygon",POINT:"Point",POLYGON:"Polygon",RECTANGLE:"Rectangle",TEXT:"Text"});q("ngeo.NumberType",{FLOAT:"float",INTEGER:"integer"});(function(){function a(a){a.put("ngeomodule/olcs/controls3d.html",'<div class=ngeo-tools> <div class=ngeo-angle><div class=ngeo-angle3d></div></div> <button class="ngeo-left ngeo-tilt-left" ng-click=$ctrl.tilt(5)></button> <button class="ngeo-right ngeo-tilt-right" ng-click=$ctrl.tilt(-5)></button> </div> <div class=ngeo-zoom> <button class=ol-zoom-in ng-click=$ctrl.zoom(1)></button> <button class=ol-zoom-out ng-click=$ctrl.zoom(-1)></button> </div> <div class=ngeo-tools> <div class=ngeo-rotation><div class=ngeo-rotation3d></div></div> <button class=ngeo-left ng-click=$ctrl.rotate(-15)></button> <button class=ngeo-right ng-click=$ctrl.rotate(15)></button> </div> ');
a.put("ngeomodule/googlestreetview/component.html",'<div class=ngeo-googlestreetview-instructions ng-if="$ctrl.location === null" translate> Click on a road on the map to start StreetView. </div> <div class=ngeo-googlestreetview-nodata ng-if=$ctrl.noDataAtLocation translate> Street View data not found for this location. </div> ');a.put("ngeomodule/editing/attributescomponent.html",'<fieldset ng-disabled=attrCtrl.disabled> <div class=form-group ng-repeat="attribute in ::attrCtrl.attributes"> <div ng-if="attribute.type !== \'geometry\'"> <label ng-if="::attribute.type !== \'boolean\'" class=control-label>{{ ::attribute.name | translate }} <span class=text-muted>{{::attribute.required ? "*" : ""}}</span> </label> <div ng-switch=::attribute.type> <div ng-switch-when=boolean class=checkbox> <label> <input name={{::attribute.name}} ng-required=attribute.required ng-model=attrCtrl.properties[attribute.name] ng-change=attrCtrl.handleInputChange(attribute.name); type=checkbox> <span> {{ ::attribute.name | translate }} <span class=text-muted>{{::attribute.required ? "*" : ""}}</span></span> </label> </div> <select name={{::attribute.name}} ng-required=attribute.required ng-switch-when=select ng-model=attrCtrl.properties[attribute.name] ng-change=attrCtrl.handleInputChange(attribute.name); class=form-control type=text> <option ng-repeat="attribute in ::attribute.choices" value="{{ ::attribute }}"> {{ ::attribute }} </option> </select> <input name={{::attribute.name}} ng-required=attribute.required ng-switch-when=date ui-date=attrCtrl.dateOptions ng-model=attrCtrl.properties[attribute.name] ng-change=attrCtrl.handleInputChange(attribute.name); class=form-control type=text> <input name={{::attribute.name}} ng-required=attribute.required ng-switch-when=datetime ui-date=attrCtrl.dateOptions ng-model=attrCtrl.properties[attribute.name] ng-change=attrCtrl.handleInputChange(attribute.name); class=form-control type=text> <div ng-switch-when=number ng-switch=::attribute.numType> <input name={{::attribute.name}} ng-required=attribute.required ng-switch-when=integer ng-model=attrCtrl.properties[attribute.name] ng-change=attrCtrl.handleInputChange(attribute.name); class=form-control step=1 type=number> <input name={{::attribute.name}} ng-required=attribute.required ng-switch-default ng-model=attrCtrl.properties[attribute.name] ng-change=attrCtrl.handleInputChange(attribute.name); class=form-control type=number> </div> <input name={{::attribute.name}} ng-required=attribute.required ng-switch-default ng-model=attrCtrl.properties[attribute.name] ng-change=attrCtrl.handleInputChange(attribute.name); ng-maxlength=attribute.maxLength class=form-control type=text> <div ng-show="attrCtrl.form.$submitted || attrCtrl.form[attribute.name].$touched"> <p class=text-danger ng-show=attrCtrl.form[attribute.name].$error.required> {{\'This field is required\' | translate}} </p> </div> </div> </div> </div> </fieldset> ');
a.put("ngeomodule/grid/component.html",'<div class=ngeo-grid-table-container> <table float-thead=ctrl.floatTheadConfig ng-model=ctrl.configuration.data class="table table-bordered table-striped table-hover"> <thead class=table-header> <tr> <th ng-repeat="columnDefs in ctrl.configuration.columnDefs" ng-click=ctrl.sort(columnDefs.name) ng-bind-html="columnDefs.name | ngeoTrustHtml | translate"> <i ng-show="ctrl.sortedBy !== columnDefs.name" class="fa fa-fw"></i> <i ng-show="ctrl.sortedBy === columnDefs.name && ctrl.sortAscending === true" class="fa fa-caret-up"></i> <i ng-show="ctrl.sortedBy === columnDefs.name && ctrl.sortAscending === false" class="fa fa-caret-down"></i> </th> </tr> </thead> <tbody> <tr ng-repeat="attributes in ctrl.configuration.data" ng-class="[\'row-\' + ctrl.configuration.getRowUid(attributes), ctrl.configuration.isRowSelected(attributes) ? \'ngeo-grid-active\': \'\']" ng-click="ctrl.clickRow(attributes, $event)" ng-mousedown=ctrl.preventTextSelection($event)> <td ng-repeat="columnDefs in ctrl.configuration.columnDefs" ng-bind-html="attributes[columnDefs.name] | ngeoTrustHtml"></td> </tr> </tbody> </table> </div> ');
a.put("ngeomodule/message/popupcomponent.html",'<h4 class="popover-title ngeo-popup-title"> <span ng-bind-html=title></span> <button type=button class=close ng-click="open = false"> &times;</button> </h4> <div class=popover-content ng-bind-html=content></div> ');a.put("ngeomodule/map/scaleselector.html",'<div class="btn-group btn-block" ng-class="::{\'dropup\': scaleselectorCtrl.options.dropup}"> <button type=button class="btn btn-default dropdown-toggle" data-toggle=dropdown aria-expanded=false> <span ng-bind-html="scaleselectorCtrl.currentScale | ngeoScalify | ngeoTrustHtml"></span>&nbsp;<i class=caret></i> </button> <ul class="dropdown-menu btn-block" role=menu> <li ng-repeat="zoomLevel in ::scaleselectorCtrl.zoomLevels"> <a href ng-click=scaleselectorCtrl.changeZoom(zoomLevel) ng-bind-html="scaleselectorCtrl.getScale(zoomLevel) | ngeoScalify | ngeoTrustHtml"> </a> </li> </ul> </div> ');
a.put("ngeomodule/filter/rulecomponent.html",'<div class=dropdown ng-class="{open: $ctrl.rule.active}"> <a class="btn btn-default btn-sm dropdown-toggle" type=button ng-click=$ctrl.toggle()> <span>{{ ::$ctrl.clone.name | translate }}</span> <span class=caret></span> </a> <div class="dropdown-menu form-group"> <select class="form-control input-sm ngeo-rule-operators-list" ng-disabled=$ctrl.drawActive ng-if=::$ctrl.clone.operators ng-model=$ctrl.clone.operator ng-options="$ctrl.operators[operator] | translate for operator in ::$ctrl.clone.operators track by operator"> </select> <div ng-switch=::$ctrl.clone.type> <div class="ngeo-rule-type-date form-group" ng-if=$ctrl.rule.active ng-switch-when=date|datetime ng-switch-when-separator=|> <div ng-switch=$ctrl.clone.operator> <div ng-switch-when=..> <ngeo-date-picker time=$ctrl.timeRangeMode on-date-selected=$ctrl.onDateRangeSelected(time)> </ngeo-date-picker> </div> <div ng-switch-default> <ngeo-date-picker time=$ctrl.timeValueMode on-date-selected=$ctrl.onDateSelected(time)> </ngeo-date-picker> </div> </div> </div> <div class="ngeo-rule-type-geometry form-group" ng-switch-when=geometry> <div ng-switch=$ctrl.geomType> <span class="gmf-icon gmf-icon-point" ng-switch-when=Point> </span> <span class="gmf-icon gmf-icon-line" ng-switch-when=LineString> </span> <span class="gmf-icon gmf-icon-polygon" ng-switch-when=Polygon> </span> <span class="gmf-icon gmf-icon-circle" ng-switch-when=Circle> </span> <span class="gmf-icon gmf-icon-rectangle" ng-switch-when=Rectangle> </span> </div> <ngeo-drawfeature ngeo-drawfeature-active=$ctrl.drawActive ngeo-drawfeature-features=$ctrl.drawnFeatures ngeo-drawfeature-map=$ctrl.map> <div ngeo-btn-group class=btn-group> <a data-toggle=tooltip title="{{\'Draw a point on the map\' | translate}}" href ngeo-btn ngeo-drawpoint class="btn btn-sm btn-default ngeo-drawfeature-point" ng-show="[\'intersects\', \'within\'].indexOf($ctrl.clone.operator) !== -1" ng-class="{active: dfCtrl.drawPoint.active}" ng-model=dfCtrl.drawPoint.active> <span class="gmf-icon gmf-icon-point"></span> </a> <a data-toggle=tooltip title="{{\'Draw a line on the map\' | translate}}" href ngeo-btn ngeo-measurelength class="btn btn-sm btn-default ngeo-drawfeature-linestring" ng-show="[\'intersects\', \'within\'].indexOf($ctrl.clone.operator) !== -1" ng-class="{active: dfCtrl.measureLength.active}" ng-model=dfCtrl.measureLength.active> <span class="gmf-icon gmf-icon-line"></span> </a> <a data-toggle=tooltip title="{{\'Draw a polygon on the map\' | translate}}" href ngeo-btn ngeo-measurearea class="btn btn-sm btn-default ngeo-drawfeature-polygon" ng-class="{active: dfCtrl.measureArea.active}" ng-model=dfCtrl.measureArea.active> <span class="gmf-icon gmf-icon-polygon"></span> </a> <a data-toggle=tooltip title="{{\'Draw a circle on the map\' | translate}}" href ngeo-btn ngeo-measureazimut class="btn btn-sm btn-default ngeo-drawfeature-circle" ng-class="{active: dfCtrl.measureAzimut.active}" ng-model=dfCtrl.measureAzimut.active> <span class="gmf-icon gmf-icon-circle"></span> </a> <a data-toggle=tooltip title="{{\'Draw a rectangle on the map\' | translate}}" href ngeo-btn ngeo-drawrectangle class="btn btn-sm btn-default ngeo-drawfeature-rectangle" ng-class="{active: dfCtrl.drawRectangle.active}" ng-model=dfCtrl.drawRectangle.active> <span class="gmf-icon gmf-icon-rectangle"></span> </a> </div> <div class=ngeo-rule-type-geometry-instructions ng-if=$ctrl.drawActive> <span ng-if=dfCtrl.drawPoint.active> {{ \'Draw a point on the map.\' | translate }} </span> <span ng-if=dfCtrl.measureLength.active> {{ \'Draw a line string on the map.\' | translate }} </span> <span ng-if=dfCtrl.measureArea.active> {{ \'Draw a polygon on the map.\' | translate }} </span> <span ng-if=dfCtrl.measureAzimut.active> {{ \'Draw a circle on the map.\' | translate }} </span> <span ng-if=dfCtrl.drawRectangle.active> {{ \'Draw a rectangle on the map.\' | translate }} </span> </div> </ngeo-drawfeature> </div> <div class="checkbox ngeo-rule-type-select" ng-switch-when=select> <a ng-click=$ctrl.selectAllChoices() href>{{ All | translate}} </a> <label class="form-group ol-unselectable" ng-repeat="choice in ::$ctrl.clone.choices"> <input ng-checked="$ctrl.clone.getExpression() && $ctrl.clone.getExpression().split(\',\').indexOf(choice) > -1" ng-click=$ctrl.toggleChoiceSelection(choice) type=checkbox value=choice> <span>{{ choice | translate }}</span> </label> </div> <div class="form-group ngeo-rule-type-text" ng-switch-default> <div ng-switch=$ctrl.clone.operator> <div ng-switch-when=..> <input type=number class="form-control input-sm" ng-model=$ctrl.clone.lowerBoundary> <input type=number class="form-control input-sm" ng-model=$ctrl.clone.upperBoundary> </div> <div ng-switch-default> <input type=number class="form-control input-sm" ng-if="$ctrl.clone.type === \'number\'" ng-model=$ctrl.clone.expression> <input type=text class="form-control input-sm" ng-if="$ctrl.clone.type !== \'number\'" ng-model=$ctrl.clone.expression> </div> </div> </div> <div class=ngeo-rule-btns> <button class="btn btn-xs btn-default" ng-click=$ctrl.apply() type=button>{{\'Apply\' | translate}}</button> <button class="btn btn-xs btn-default" ng-click=$ctrl.cancel() type=button>{{\'Cancel\' | translate}}</button> </div> </div> </div> </div> <div class=ngeo-rule-value ng-if="$ctrl.rule.value !== null"> <a class="btn btn-xs btn-link" ng-click="!$ctrl.rule.active && $ctrl.reset()" ng-disabled=$ctrl.rule.active href> <span class="fa fa-remove"></span> </a> <div ng-switch=::$ctrl.rule.type> <div ng-switch-when=date|datetime ng-switch-when-separator=|> <div ng-switch=$ctrl.rule.operator> <div ng-switch-when=..> <span translate>From </span> <span>{{ $ctrl.timeToDate($ctrl.rule.lowerBoundary) }}</span> <span translate> to </span> <span>{{ $ctrl.timeToDate($ctrl.rule.upperBoundary) }}</span> </div> <div ng-switch-default> <span>{{ $ctrl.rule.operator }}</span> <span>{{ $ctrl.timeToDate($ctrl.rule.getExpression()) }}</span> </div> </div> </div> <div ng-switch-when=geometry> <span>{{ $ctrl.operators[$ctrl.rule.operator] }}</span> <span ng-switch=$ctrl.getRuleGeometryType()> <span class="gmf-icon gmf-icon-point" ng-switch-when=Point> </span> <span class="gmf-icon gmf-icon-line" ng-switch-when=LineString> </span> <span class="gmf-icon gmf-icon-polygon" ng-switch-when=Polygon> </span> <span class="gmf-icon gmf-icon-circle" ng-switch-when=Circle> </span> <span class="gmf-icon gmf-icon-rectangle" ng-switch-when=Rectangle> </span> </span> </div> <div ng-switch-when=select> <span ng-repeat="choice in $ctrl.rule.getExpression().split(\',\')"> {{ choice | translate }}{{ $last ? \'\' : \', \' }} </span> </div> <div ng-switch-default> <div ng-switch=$ctrl.rule.operator> <div ng-switch-when=..> <span translate>Between </span> <span>{{ $ctrl.rule.lowerBoundary }}</span> <span translate> and </span> <span>{{ $ctrl.rule.upperBoundary }}</span> </div> <div ng-switch-default> <span>{{ $ctrl.rule.operator }}</span> <span>{{ $ctrl.rule.getExpression() }}</span> </div> </div> </div> </div> </div> ');
a.put("ngeomodule/misc/datepickerComponent.html","<div class=ngeo-datepicker> <form name=dateForm class=ngeo-datepicker-form novalidate> <div ng-if=\"::datepickerCtrl.time.widget === 'datepicker'\"> <div class=ngeo-datepicker-start-date> <span ng-if=\"::datepickerCtrl.time.mode === 'range'\" translate>From:</span> <span ng-if=\"::datepickerCtrl.time.mode !== 'range'\" translate>Date:</span> <input name=sdate ui-date=datepickerCtrl.sdateOptions ng-model=datepickerCtrl.sdate required> </div> <div class=ngeo-datepicker-end-date ng-if=\"::datepickerCtrl.time.mode === 'range'\"> <span translate>To:</span> <input name=edate ui-date=datepickerCtrl.edateOptions ng-model=datepickerCtrl.edate required> </div> </div> </form> </div> ");
a.put("ngeomodule/filter/component.html",'<div class=dropdown> <a class="btn btn-link dropdown-toggle ngeo-filter-condition-button" ng-class="{disabled: $ctrl.aRuleIsActive}" type=button data-toggle=dropdown ng-disabled=$ctrl.aRuleIsActive> <span class="fa fa-cog"></span> <span class=caret></span> </a> <ul class=dropdown-menu> <li class=ngeo-filter-condition-criteria-header translate>Criteria taken into account</li> <li ng-repeat="condition in ::$ctrl.conditions"> <a href ng-click=$ctrl.setCondition(condition)> <span ng-class="{\'ngeo-filter-condition-criteria-active\': condition.value == $ctrl.datasource.filterCondition}" class="fa fa-check ngeo-filter-condition-criteria"> </span> <span>{{::condition.text | translate}}</span> </a> </li> </ul> </div> <ngeo-rule ng-repeat="rule in $ctrl.directedRules" feature-overlay=::$ctrl.featureOverlay class=ngeo-filter-rule-directed map=$ctrl.map rule=rule tool-group=$ctrl.toolGroup> </ngeo-rule> <hr class=ngeo-filter-separator-rules> <div ng-repeat="rule in $ctrl.customRules"> <a class="btn btn-xs btn-link ngeo-filter-rule-custom-rm-btn" ng-click="!$ctrl.aRuleIsActive && $ctrl.removeCustomRule(rule)" ng-disabled=$ctrl.aRuleIsActive href> <span class="fa fa-remove"></span> </a> <ngeo-rule feature-overlay=::$ctrl.featureOverlay class=ngeo-filter-rule-custom map=$ctrl.map rule=rule tool-group=$ctrl.toolGroup> </ngeo-rule> </div> <div class=dropdown> <a class="btn btn-link dropdown-toggle" ng-class="{disabled: $ctrl.aRuleIsActive}" type=button data-toggle=dropdown ng-disabled=$ctrl.aRuleIsActive> <span translate>+ Add a new criteria</span> <span class=caret></span> </a> <ul class=dropdown-menu> <li ng-repeat="attribute in ::$ctrl.geometryAttributes"> <a href ng-click=$ctrl.createAndAddCustomRule(attribute)> <span translate>Spatial filter</span> </a> </li> <li role=presentation class=divider></li> <li ng-repeat="attribute in ::$ctrl.otherAttributes"> <a href ng-click=$ctrl.createAndAddCustomRule(attribute)> <span>{{::attribute.name | translate}}</span> </a> </li> </ul> </div> <hr class=ngeo-filter-separator-criteria> <a class="btn btn-link" type=button ng-click="!$ctrl.aRuleIsActive && $ctrl.apply()" ng-disabled=$ctrl.aRuleIsActive> <span class="fa fa-check"></span> <span translate>Apply filter</span> </a> <a class="btn btn-link" type=button ng-click="!$ctrl.aRuleIsActive && $ctrl.getData()" ng-disabled=$ctrl.aRuleIsActive> <span class="fa fa-chevron-right"></span> <span translate>Get data</span> </a> ');
a.put("ngeomodule/misc/colorpickerComponent.html",'<table class=ngeo-colorpicker-palette> <tr ng-repeat="colors in ::ctrl.colors"> <td ng-repeat="color in ::colors" ng-click=ctrl.setColor(color) ng-class="{\'ngeo-colorpicker-selected\': color == ctrl.color}"> <div ng-style="::{\'background-color\': color}"></div> </td> </tr> </table> ');a.put("ngeomodule/layertree/component.html",'<span ng-if=::!layertreeCtrl.isRoot>{{::layertreeCtrl.node.name}}</span> <input type=checkbox ng-if="::layertreeCtrl.node && !layertreeCtrl.node.children" ng-model=layertreeCtrl.getSetActive ng-model-options="{getterSetter: true}"> <ul ng-if=::layertreeCtrl.node.children> <li ng-repeat="node in ::layertreeCtrl.node.children" ngeo-layertree=::node ngeo-layertree-notroot ngeo-layertree-map=layertreeCtrl.map ngeo-layertree-nodelayerexpr=layertreeCtrl.nodelayerExpr ngeo-layertree-listenersexpr=layertreeCtrl.listenersExpr> </li> </ul> ')}
a.$inject=["$templateCache"];Ga.run(a)})();var Y=angular.module("ngeoPopover",[]);Ga.requires.push(Y.name);
Y.b=function(){return{restrict:"A",scope:!0,controller:"NgeoPopoverController as popoverCtrl",link:function(a,b,c,d){d.anchorElm.on("hidden.bs.popover",function(){d.anchorElm.data("bs.popover").inState.click=!1});d.anchorElm.on("inserted.bs.popover",function(){d.bodyElm.show();d.shown=!0});d.anchorElm.popover({container:"body",html:!0,content:d.bodyElm,placement:c.ngeoPopoverPlacement||"right"});if(c.ngeoPopoverDismiss)$(c.ngeoPopoverDismiss).on("scroll",function(){d.R()});a.$on("$destroy",function(){d.anchorElm.popover("destroy");
d.anchorElm.unbind("inserted.bs.popover");d.anchorElm.unbind("hidden.bs.popover")})}}};Y.a=function(){return{restrict:"A",require:"^^ngeoPopover",link:function(a,b,c,d){d.anchorElm=b}}};Y.v=function(){return{restrict:"A",require:"^^ngeoPopover",link:function(a,b,c,d){d.bodyElm=b;b.hide()}}};
function Z(a){function b(a){this.anchorElm[0]!==a.target&&this.bodyElm.parent()[0]!==a.target&0===this.bodyElm.parent().find(a.target).length&&this.shown&&this.R()}this.shown=!1;this.bodyElm=this.anchorElm=void 0;angular.element("body").on("mousedown",b.bind(this));a.$on("$destroy",function(){angular.element("body").off("mousedown",b)})}Z.$inject=["$scope"];Z.prototype.R=function(){this.shown=!1;this.anchorElm.popover("hide")};Z.prototype.dismissPopover=Z.prototype.R;
Y.controller("NgeoPopoverController",Z);Y.directive("ngeoPopover",Y.b);Y.directive("ngeoPopoverAnchor",Y.a);Y.directive("ngeoPopoverContent",Y.v);angular.module("app",[Ga.name,Y.name]);}).call(window);
//# sourceMappingURL=popover.js.map
