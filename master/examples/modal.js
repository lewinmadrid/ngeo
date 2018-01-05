(function(){'use strict';var aa="function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){a!=Array.prototype&&a!=Object.prototype&&(a[b]=c.value)},ba="undefined"!=typeof window&&window===this?this:"undefined"!=typeof global&&null!=global?global:this;function ca(a,b){if(b){var c=ba;a=a.split(".");for(var g=0;g<a.length-1;g++){var f=a[g];f in c||(c[f]={});c=c[f]}a=a[a.length-1];g=c[a];b=b(g);b!=g&&null!=b&&aa(c,a,{configurable:!0,writable:!0,value:b})}}
ca("Math.cosh",function(a){if(a)return a;var b=Math.exp;return function(a){a=Number(a);return(b(a)+b(-a))/2}});ca("Object.is",function(a){return a?a:function(a,c){return a===c?0!==a||1/a===1/c:a!==a&&c!==c}});var da=this;function q(a,b){a=a.split(".");var c=da;a[0]in c||!c.execScript||c.execScript("var "+a[0]);for(var g;a.length&&(g=a.shift());)a.length||void 0===b?c[g]&&c[g]!==Object.prototype[g]?c=c[g]:c=c[g]={}:c[g]=b};function r(a,b){a.prototype=Object.create(b.prototype);a.prototype.constructor=a}function ea(){};function t(a){this.message="Assertion failed. See https://openlayers.org/en/latest/doc/errors/#"+a+" for details.";this.code=a;this.name="AssertionError"}r(t,Error);function fa(a){for(var b in a)delete a[b]};function ha(a){function b(b){var c=a.listener,f=a.bindTo||a.target;if(a.ca&&a&&a.target){a.target.removeEventListener(a.type,a.ba);var d=ia(a.target,a.type);if(d){var e="deleteIndex"in a?a.deleteIndex:d.indexOf(a);-1!==e&&d.splice(e,1);if(0===d.length){d=a.target;e=a.type;var m=ia(d,e);if(m){for(var p=0,B=m.length;p<B;++p)d.removeEventListener(e,m[p].ba),fa(m[p]);m.length=0;if(m=d.I)delete m[e],0===Object.keys(m).length&&delete d.I}}}fa(a)}return c.call(f,b)}return a.ba=b}
function ia(a,b){return(a=a.I)?a[b]:void 0}function v(a,b,c,g,f){var d=a.I;d||(d=a.I={});var e=d;(d=e[b])||(d=e[b]=[]);a:{e=d;for(var m,p=0,B=e.length;p<B;++p)if(m=e[p],m.listener===c&&m.bindTo===g){e=m;break a}e=void 0}e?f||(e.ca=!1):(e={bindTo:g,ca:!!f,listener:c,target:a,type:b},a.addEventListener(b,ha(e)),d.push(e));return e};function ja(){};function w(a){this.type=a;this.target=null}w.prototype.preventDefault=w.prototype.stopPropagation=function(){this.qa=!0};function x(){this.F={};this.v={};this.D={}}r(x,ja);x.prototype.addEventListener=function(a,b){var c=this.D[a];c||(c=this.D[a]=[]);-1===c.indexOf(b)&&c.push(b)};function y(a,b){var c="string"===typeof b?new w(b):b;b=c.type;c.target=a;var g=a.D[b];if(g){b in a.v||(a.v[b]=0,a.F[b]=0);++a.v[b];for(var f=0,d=g.length;f<d&&!1!==g[f].call(a,c)&&!c.qa;++f);--a.v[b];if(0===a.v[b]){c=a.F[b];for(delete a.F[b];c--;)a.removeEventListener(b,ea);delete a.v[b]}}}
x.prototype.removeEventListener=function(a,b){var c=this.D[a];c&&(b=c.indexOf(b),a in this.F?(c[b]=ea,++this.F[a]):(c.splice(b,1),0===c.length&&delete this.D[a]))};function z(){x.call(this)}r(z,x);z.prototype.once=function(a,b,c){if(Array.isArray(a)){for(var g=a.length,f=Array(g),d=0;d<g;++d)f[d]=v(this,a[d],b,c,!0);return f}return v(this,a,b,c,!0)};var ka=function(){var a;"cosh"in Math?a=Math.cosh:a=function(a){a=Math.exp(a);return(a+1/a)/2};return a}();/*

 Latitude/longitude spherical geodesy formulae taken from
 http://www.movable-type.co.uk/scripts/latlong.html
 Licensed under CC-BY-3.0.
*/
function A(a){a=this.a=a.code;var b=window.proj4;"function"==typeof b&&b.defs(a)};function C(a){A.call(this,{code:a,units:"m",extent:la,global:!0,sa:oa,Ba:function(a,c){return a/ka(c[1]/6378137)}})}r(C,A);var E=6378137*Math.PI,la=[-E,-E,E,E],oa=[-180,-85,180,85],pa=[new C("EPSG:3857"),new C("EPSG:102100"),new C("EPSG:102113"),new C("EPSG:900913"),new C("urn:ogc:def:crs:EPSG:6.18:3:3857"),new C("urn:ogc:def:crs:EPSG::3857"),new C("http://www.opengis.net/gml/srs/epsg.xml#3857")];
function qa(a,b,c){var g=a.length;c=1<c?c:2;void 0===b&&(2<c?b=a.slice():b=Array(g));for(var f=0;f<g;f+=c){b[f]=E*a[f]/180;var d=6378137*Math.log(Math.tan(Math.PI*(a[f+1]+90)/360));d>E?d=E:d<-E&&(d=-E);b[f+1]=d}return b}function ra(a,b,c){var g=a.length;c=1<c?c:2;void 0===b&&(2<c?b=a.slice():b=Array(g));for(var f=0;f<g;f+=c)b[f]=180*a[f]/E,b[f+1]=360*Math.atan(Math.exp(a[f+1]/6378137))/Math.PI-90;return b};function F(a,b){A.call(this,{code:a,units:"degrees",extent:sa,Aa:b,global:!0,Da:ta,sa:sa})}r(F,A);var sa=[-180,-90,180,90],ta=6378137*Math.PI/180,ua=[new F("CRS:84"),new F("EPSG:4326","neu"),new F("urn:ogc:def:crs:EPSG::4326","neu"),new F("urn:ogc:def:crs:EPSG:6.6:4326","neu"),new F("urn:ogc:def:crs:OGC:1.3:CRS84"),new F("urn:ogc:def:crs:OGC:2:84"),new F("http://www.opengis.net/gml/srs/epsg.xml#4326","neu"),new F("urn:x-ogc:def:crs:EPSG:4326","neu")];var H={};function I(a,b,c){a=a.a;b=b.a;a in H||(H[a]={});H[a][b]=c};function va(a){a.forEach(wa);a.forEach(function(b){a.forEach(function(a){b!==a&&I(b,a,xa)})})}function wa(a){I(a,a,xa)}function xa(a,b){if(void 0!==b){for(var c=0,g=a.length;c<g;++c)b[c]=a[c];a=b}else a=a.slice();return a}va(pa);va(ua);ua.forEach(function(a){pa.forEach(function(b){I(a,b,qa);I(b,a,ra)})});function J(){return document.createElement("CANVAS").getContext("2d")};var K="undefined"!==typeof navigator?navigator.userAgent.toLowerCase():"";K.indexOf("firefox");-1!==K.indexOf("safari")&&K.indexOf("chrom");-1!==K.indexOf("webkit")&&K.indexOf("edge");K.indexOf("macintosh");(function(){if(!("HTMLCanvasElement"in window))return!1;try{return document.createElement("CANVAS").getContext("2d")?!0:!1}catch(a){return!1}})();function L(a){x.call(this);this.highWaterMark=void 0!==a?a:2048;this.l={};this.a=this.b=null}r(L,x);L.prototype.clear=function(){this.l={};this.a=this.b=null;y(this,"clear")};L.prototype.forEach=function(a,b){for(var c=this.b;c;)a.call(b,c.J,c.da,this),c=c.o};L.prototype.get=function(a){a=this.l[a];if(void 0===a)throw new t(15);if(a===this.a)return a.J;a===this.b?(this.b=this.b.o,this.b.B=null):(a.o.B=a.B,a.B.o=a.o);a.o=null;a.B=this.a;this.a=this.a.o=a;return a.J};
L.prototype.pop=function(){var a=this.b;delete this.l[a.da];a.o&&(a.o.B=null);this.b=a.o;this.b||(this.a=null);return a.J};L.prototype.set=function(a,b){if(a in this.l)throw new t(16);b={da:a,o:null,B:this.a,J:b};this.a?this.a.o=b:this.b=b;this.a=b;this.l[a]=b};var ya=new L;var M={R:{}};M.R.S=function(){};
(function(a){function b(a,b,c){if(e)return new ImageData(a,b,c);b=m.createImageData(b,c);b.data.set(a);return b}function c(a){var b=!0;try{new ImageData(10,10)}catch(N){b=!1}return function(c){var d=c.buffers,g=c.meta,f=c.width,p=c.height,e=d.length,h=d[0].byteLength;if(c.imageOps){h=Array(e);for(c=0;c<e;++c){var k=c;var l=new Uint8ClampedArray(d[c]);var n=f,u=p;l=b?new ImageData(l,n,u):{data:l,width:n,height:u};h[k]=l}f=a(h,g).data}else{f=new Uint8ClampedArray(h);p=Array(e);k=Array(e);for(c=0;c<
e;++c)p[c]=new Uint8ClampedArray(d[c]),k[c]=[0,0,0,0];for(d=0;d<h;d+=4){for(c=0;c<e;++c)l=p[c],k[c][0]=l[d],k[c][1]=l[d+1],k[c][2]=l[d+2],k[c][3]=l[d+3];c=a(k,g);f[d]=c[0];f[d+1]=c[1];f[d+2]=c[2];f[d+3]=c[3]}}return f.buffer}}function g(a,b){var d=Object.keys(a.na||{}).map(function(b){return"var "+b+" = "+a.na[b].toString()+";"}).concat(["var __minion__ = ("+c.toString()+")(",a.pa.toString(),");",'self.addEventListener("message", function(event) {',"  var buffer = __minion__(event.data);","  self.postMessage({buffer: buffer, meta: event.data.meta}, [buffer]);",
"});"]);d=URL.createObjectURL(new Blob(d,{type:"text/javascript"}));d=new Worker(d);d.addEventListener("message",b);return d}function f(a,b){var d=c(a.pa);return{postMessage:function(a){setTimeout(function(){b({data:{buffer:d(a),meta:a.meta}})},0)}}}function d(a){this.K=!!a.Ca;var b;0===a.ra?b=0:this.K?b=1:b=a.ra||1;var c=[];if(b)for(var d=0;d<b;++d)c[d]=g(a,this.Y.bind(this,d));else c[0]=f(a,this.Y.bind(this,0));this.H=c;this.Z=[];this.G=0;this.A={};this.L=null}var e=!0;try{new ImageData(10,10)}catch(p){e=
!1}var m=document.createElement("canvas").getContext("2d");d.prototype.ia=function(){if(0===this.G&&0<this.Z.length){var a=this.L=this.Z.shift(),b=a.inputs[0].width,c=a.inputs[0].height,d=a.inputs.map(function(a){return a.data.buffer}),f=this.H.length;this.G=f;if(1===f)this.H[0].postMessage({buffers:d,meta:a.oa,imageOps:this.K,width:b,height:c},d);else for(var g=4*Math.ceil(a.inputs[0].data.length/4/f),e=0;e<f;++e){for(var m=e*g,h=[],k=0,l=d.length;k<l;++k)h.push(d[e].slice(m,m+g));this.H[e].postMessage({buffers:h,
meta:a.oa,imageOps:this.K,width:b,height:c},h)}}};d.prototype.Y=function(a,b){this.za||(this.A[a]=b.data,--this.G,0===this.G&&this.ka())};d.prototype.ka=function(){var a=this.L,c=this.H.length;if(1===c){var d=new Uint8ClampedArray(this.A[0].buffer);var f=this.A[0].meta}else{var g=a.inputs[0].data.length;d=new Uint8ClampedArray(g);f=Array(g);g=4*Math.ceil(g/4/c);for(var e=0;e<c;++e){var m=e*g;d.set(new Uint8ClampedArray(this.A[e].buffer),m);f[e]=this.A[e].meta}}this.L=null;this.A={};a.callback(null,
b(d,a.inputs[0].width,a.inputs[0].height),f);this.ia()};a["default"]={S:d};a.S=d})(M.R=M.R||{});var za=[],P=[];function Aa(a,b){switch(a){case "MAP_RENDERER":a=za;a.push(b);break;case "LAYER_RENDERER":a=P;a.push(b);break;default:throw Error("Unsupported plugin type: "+a);}};function Q(a){x.call(this);this.a=a}r(Q,z);Q.prototype.b=function(a){2===a.target.getState()&&(a=this.a,a.a()&&"ready"==a.ma()&&y(this,"change"))};Q.prototype.loadImage=function(a){var b=a.getState();2!=b&&3!=b&&v(a,"change",this.b,this);0==b&&(a.load(),b=a.getState());return 2==b};function R(a){Q.call(this,a)}r(R,Q);function S(a){Q.call(this,a)}r(S,R);function T(a){Q.call(this,a)}r(T,S);T.handles=function(a,b){return"canvas"===a&&("IMAGE"===b.getType()||"VECTOR"===b.getType()&&"image"===b.l())};T.create=function(a,b){var c=new T(b);if("VECTOR"===b.getType())for(var g=0,f=P.length;g<f;++g){var d=P[g];d!==T&&d.handles("canvas",b)&&d.create(a,b)}return c};function U(a){Q.call(this,a);this.context=null===this.context?null:J()}r(U,S);U.handles=function(a,b){return"canvas"===a&&"TILE"===b.getType()};U.create=function(a,b){return new U(b)};try{new MouseEvent("click",{buttons:1})}catch(a){};function Ba(){}r(Ba,ja);function V(a){this.b=J();this.a=this.b.canvas;this.a.style.width="100%";this.a.style.height="100%";this.a.style.display="block";this.a.className="ol-unselectable";a.insertBefore(this.a,a.childNodes[0]||null)}r(V,Ba);V.handles=function(a){return"canvas"===a};V.create=function(a,b){return new V(a,b)};V.prototype.getType=function(){return"canvas"};M.C=function(){};
(function(a){function b(a,k,l,d,u){l=l||0;d=d||a.length-1;for(u=u||g;d>l;){if(600<d-l){var h=d-l+1,n=k-l+1,f=Math.log(h),e=.5*Math.exp(2*f/3);f=.5*Math.sqrt(f*e*(h-e)/h)*(0>n-h/2?-1:1);b(a,k,Math.max(l,Math.floor(k-n*e/h+f)),Math.min(d,Math.floor(k+(h-n)*e/h+f)),u)}h=a[k];n=l;e=d;c(a,l,k);for(0<u(a[d],h)&&c(a,l,d);n<e;){c(a,n,e);n++;for(e--;0>u(a[n],h);)n++;for(;0<u(a[e],h);)e--}0===u(a[l],h)?c(a,l,e):(e++,c(a,e,d));e<=k&&(l=e+1);k<=e&&(d=e-1)}}function c(a,b,c){var h=a[b];a[b]=a[c];a[c]=h}function g(a,
b){return a<b?-1:a>b?1:0}function f(a,b){if(!(this instanceof f))return new f(a,b);this.N=Math.max(4,a||9);this.X=Math.max(2,Math.ceil(.4*this.N));b&&this.ja(b);this.clear()}function d(a,b){e(a,0,a.children.length,b,a)}function e(a,b,c,d,e){e||(e=D(null));e.c=Infinity;e.f=Infinity;e.g=-Infinity;e.i=-Infinity;for(var h;b<c;b++)h=a.children[b],m(e,a.j?d(h):h);return e}function m(a,b){a.c=Math.min(a.c,b.c);a.f=Math.min(a.f,b.f);a.g=Math.max(a.g,b.g);a.i=Math.max(a.i,b.i);return a}function p(a,b){return a.c-
b.c}function B(a,b){return a.f-b.f}function N(a){return(a.g-a.c)*(a.i-a.f)}function O(a){return a.g-a.c+(a.i-a.f)}function ma(a,b){return b.c<=a.g&&b.f<=a.i&&b.g>=a.c&&b.i>=a.f}function D(a){return{children:a,height:1,j:!0,c:Infinity,f:Infinity,g:-Infinity,i:-Infinity}}function na(a,b,c,d,e){for(var h=[b,c],k;h.length;)c=h.pop(),b=h.pop(),c-b<=d||(k=b+Math.ceil((c-b)/d/2)*d,Da(a,k,b,c,e),h.push(b,k,k,c))}var Da=b;f.prototype={all:function(){return this.T(this.data,[])},search:function(a){var b=this.data,
c=[],h=this.u;if(!ma(a,b))return c;for(var d=[],e,f,g,G;b;){e=0;for(f=b.children.length;e<f;e++)g=b.children[e],G=b.j?h(g):g,ma(a,G)&&(b.j?c.push(g):a.c<=G.c&&a.f<=G.f&&G.g<=a.g&&G.i<=a.i?this.T(g,c):d.push(g));b=d.pop()}return c},load:function(a){if(!a||!a.length)return this;if(a.length<this.X){for(var b=0,c=a.length;b<c;b++)this.insert(a[b]);return this}a=this.V(a.slice(),0,a.length-1,0);this.data.children.length?this.data.height===a.height?this.aa(this.data,a):(this.data.height<a.height&&(b=this.data,
this.data=a,a=b),this.W(a,this.data.height-a.height-1,!0)):this.data=a;return this},insert:function(a){a&&this.W(a,this.data.height-1);return this},clear:function(){this.data=D([]);return this},u:function(a){return a},O:p,P:B,toJSON:function(){return this.data},T:function(a,b){for(var c=[];a;)a.j?b.push.apply(b,a.children):c.push.apply(c,a.children),a=c.pop();return b},V:function(a,b,c,e){var h=c-b+1,k=this.N;if(h<=k){var f=D(a.slice(b,c+1));d(f,this.u);return f}e||(e=Math.ceil(Math.log(h)/Math.log(k)),
k=Math.ceil(h/Math.pow(k,e-1)));f=D([]);f.j=!1;f.height=e;h=Math.ceil(h/k);k=h*Math.ceil(Math.sqrt(k));var g;for(na(a,b,c,k,this.O);b<=c;b+=k){var l=Math.min(b+k-1,c);na(a,b,l,h,this.P);for(g=b;g<=l;g+=h){var n=Math.min(g+h-1,l);f.children.push(this.V(a,g,n,e-1))}}d(f,this.u);return f},ha:function(a,b,c,d){for(var e,h,f,k,g,l,n,m;;){d.push(b);if(b.j||d.length-1===c)break;n=m=Infinity;e=0;for(h=b.children.length;e<h;e++)f=b.children[e],g=N(f),l=(Math.max(f.g,a.g)-Math.min(f.c,a.c))*(Math.max(f.i,a.i)-
Math.min(f.f,a.f))-g,l<m?(m=l,n=g<n?g:n,k=f):l===m&&g<n&&(n=g,k=f);b=k||b.children[0]}return b},W:function(a,b,c){var d=this.u;c=c?a:d(a);d=[];var e=this.ha(c,this.data,b,d);e.children.push(a);for(m(e,c);0<=b;)if(d[b].children.length>this.N)this.la(d,b),b--;else break;this.ea(c,d,b)},la:function(a,b){var c=a[b],e=c.children.length,f=this.X;this.fa(c,f,e);e=this.ga(c,f,e);e=D(c.children.splice(e,c.children.length-e));e.height=c.height;e.j=c.j;d(c,this.u);d(e,this.u);b?a[b-1].children.push(e):this.aa(c,
e)},aa:function(a,b){this.data=D([a,b]);this.data.height=a.height+1;this.data.j=!1;d(this.data,this.u)},ga:function(a,b,c){var d,f;var g=f=Infinity;for(d=b;d<=c-b;d++){var h=e(a,0,d,this.u);var k=e(a,d,c,this.u);var l=Math.max(0,Math.min(h.g,k.g)-Math.max(h.c,k.c))*Math.max(0,Math.min(h.i,k.i)-Math.max(h.f,k.f));h=N(h)+N(k);if(l<g){g=l;var m=d;f=h<f?h:f}else l===g&&h<f&&(f=h,m=d)}return m},fa:function(a,b,c){var d=a.j?this.O:p,e=a.j?this.P:B,f=this.U(a,b,c,d);b=this.U(a,b,c,e);f<b&&a.children.sort(d)},
U:function(a,b,c,d){a.children.sort(d);d=this.u;var f=e(a,0,b,d),g=e(a,c-b,c,d),h=O(f)+O(g),k;for(k=b;k<c-b;k++){var l=a.children[k];m(f,a.j?d(l):l);h+=O(f)}for(k=c-b-1;k>=b;k--)l=a.children[k],m(g,a.j?d(l):l),h+=O(g);return h},ea:function(a,b,c){for(;0<=c;c--)m(b[c],a)},ja:function(a){var b=["return a"," - b",";"];this.O=new Function("a","b",b.join(a[0]));this.P=new Function("a","b",b.join(a[1]));this.u=new Function("a","return {minX: a"+a[0]+", minY: a"+a[1]+", maxX: a"+a[2]+", maxY: a"+a[3]+"};")}};
a["default"]=f})(M.C=M.C||{});M.C=M.C.default;function W(a){Q.call(this,a);a.b()&&M.C(9);this.context=J();v(ya,"clear",this.l,this)}r(W,R);W.handles=function(a,b){return"canvas"===a&&"VECTOR"===b.getType()};W.create=function(a,b){return new W(b)};W.prototype.l=function(){this.a.a()};function X(a){this.context=null;U.call(this,a);a.b()&&M.C(9);a.l();v(ya,"clear",this.l,this)}r(X,U);X.handles=function(a,b){return"canvas"===a&&"VECTOR_TILE"===b.getType()};X.create=function(a,b){return new X(b)};X.prototype.l=function(){var a=this.a;a.a()&&void 0!==this.ma&&y(a,"change")};Aa("MAP_RENDERER",V);for(var Ca=[T,U,W,X],Y=0,Ea=Ca.length;Y<Ea;++Y)Aa("LAYER_RENDERER",Ca[Y]);var Fa=angular.module("ngeo",["gettext","ui.date","floatThead"]);q("ngeo.AttributeType",{ta:"boolean",ua:"date",va:"datetime",wa:"geometry",xa:"number",ya:"select",TEXT:"text"});q("ngeo.FeatureProperties",{ANGLE:"a",COLOR:"c",IS_CIRCLE:"l",IS_RECTANGLE:"r",IS_TEXT:"t",NAME:"n",SHOW_LABEL:"b",OPACITY:"o",AZIMUT:"z",SHOW_MEASURE:"m",SIZE:"s",STROKE:"k"});q("ngeo.FilterCondition",{AND:"&&",NOT:"!",OR:"||"});
q("ngeo.GeometryType",{CIRCLE:"Circle",LINE_STRING:"LineString",MULTI_LINE_STRING:"MultiLineString",MULTI_POINT:"MultiPoint",MULTI_POLYGON:"MultiPolygon",POINT:"Point",POLYGON:"Polygon",RECTANGLE:"Rectangle",TEXT:"Text"});q("ngeo.NumberType",{FLOAT:"float",INTEGER:"integer"});(function(){function a(a){a.put("ngeomodule/layertree/component.html",'<span ng-if=::!layertreeCtrl.isRoot>{{::layertreeCtrl.node.name}}</span> <input type=checkbox ng-if="::layertreeCtrl.node && !layertreeCtrl.node.children" ng-model=layertreeCtrl.getSetActive ng-model-options="{getterSetter: true}"> <ul ng-if=::layertreeCtrl.node.children> <li ng-repeat="node in ::layertreeCtrl.node.children" ngeo-layertree=::node ngeo-layertree-notroot ngeo-layertree-map=layertreeCtrl.map ngeo-layertree-nodelayerexpr=layertreeCtrl.nodelayerExpr ngeo-layertree-listenersexpr=layertreeCtrl.listenersExpr> </li> </ul> ');
a.put("ngeomodule/filter/rulecomponent.html",'<div class=dropdown ng-class="{open: $ctrl.rule.active}"> <a class="btn btn-default btn-sm dropdown-toggle" type=button ng-click=$ctrl.toggle()> <span>{{ ::$ctrl.clone.name | translate }}</span> <span class=caret></span> </a> <div class="dropdown-menu form-group"> <select class="form-control input-sm ngeo-rule-operators-list" ng-disabled=$ctrl.drawActive ng-if=::$ctrl.clone.operators ng-model=$ctrl.clone.operator ng-options="$ctrl.operators[operator] | translate for operator in ::$ctrl.clone.operators track by operator"> </select> <div ng-switch=::$ctrl.clone.type> <div class="ngeo-rule-type-date form-group" ng-if=$ctrl.rule.active ng-switch-when=date|datetime ng-switch-when-separator=|> <div ng-switch=$ctrl.clone.operator> <div ng-switch-when=..> <ngeo-date-picker time=$ctrl.timeRangeMode on-date-selected=$ctrl.onDateRangeSelected(time)> </ngeo-date-picker> </div> <div ng-switch-default> <ngeo-date-picker time=$ctrl.timeValueMode on-date-selected=$ctrl.onDateSelected(time)> </ngeo-date-picker> </div> </div> </div> <div class="ngeo-rule-type-geometry form-group" ng-switch-when=geometry> <div ng-switch=$ctrl.geomType> <span class="gmf-icon gmf-icon-point" ng-switch-when=Point> </span> <span class="gmf-icon gmf-icon-line" ng-switch-when=LineString> </span> <span class="gmf-icon gmf-icon-polygon" ng-switch-when=Polygon> </span> <span class="gmf-icon gmf-icon-circle" ng-switch-when=Circle> </span> <span class="gmf-icon gmf-icon-rectangle" ng-switch-when=Rectangle> </span> </div> <ngeo-drawfeature ngeo-drawfeature-active=$ctrl.drawActive ngeo-drawfeature-features=$ctrl.drawnFeatures ngeo-drawfeature-map=$ctrl.map> <div ngeo-btn-group class=btn-group> <a data-toggle=tooltip title="{{\'Draw a point on the map\' | translate}}" href ngeo-btn ngeo-drawpoint class="btn btn-sm btn-default ngeo-drawfeature-point" ng-show="[\'intersects\', \'within\'].indexOf($ctrl.clone.operator) !== -1" ng-class="{active: dfCtrl.drawPoint.active}" ng-model=dfCtrl.drawPoint.active> <span class="gmf-icon gmf-icon-point"></span> </a> <a data-toggle=tooltip title="{{\'Draw a line on the map\' | translate}}" href ngeo-btn ngeo-measurelength class="btn btn-sm btn-default ngeo-drawfeature-linestring" ng-show="[\'intersects\', \'within\'].indexOf($ctrl.clone.operator) !== -1" ng-class="{active: dfCtrl.measureLength.active}" ng-model=dfCtrl.measureLength.active> <span class="gmf-icon gmf-icon-line"></span> </a> <a data-toggle=tooltip title="{{\'Draw a polygon on the map\' | translate}}" href ngeo-btn ngeo-measurearea class="btn btn-sm btn-default ngeo-drawfeature-polygon" ng-class="{active: dfCtrl.measureArea.active}" ng-model=dfCtrl.measureArea.active> <span class="gmf-icon gmf-icon-polygon"></span> </a> <a data-toggle=tooltip title="{{\'Draw a circle on the map\' | translate}}" href ngeo-btn ngeo-measureazimut class="btn btn-sm btn-default ngeo-drawfeature-circle" ng-class="{active: dfCtrl.measureAzimut.active}" ng-model=dfCtrl.measureAzimut.active> <span class="gmf-icon gmf-icon-circle"></span> </a> <a data-toggle=tooltip title="{{\'Draw a rectangle on the map\' | translate}}" href ngeo-btn ngeo-drawrectangle class="btn btn-sm btn-default ngeo-drawfeature-rectangle" ng-class="{active: dfCtrl.drawRectangle.active}" ng-model=dfCtrl.drawRectangle.active> <span class="gmf-icon gmf-icon-rectangle"></span> </a> </div> <div class=ngeo-rule-type-geometry-instructions ng-if=$ctrl.drawActive> <span ng-if=dfCtrl.drawPoint.active> {{ \'Draw a point on the map.\' | translate }} </span> <span ng-if=dfCtrl.measureLength.active> {{ \'Draw a line string on the map.\' | translate }} </span> <span ng-if=dfCtrl.measureArea.active> {{ \'Draw a polygon on the map.\' | translate }} </span> <span ng-if=dfCtrl.measureAzimut.active> {{ \'Draw a circle on the map.\' | translate }} </span> <span ng-if=dfCtrl.drawRectangle.active> {{ \'Draw a rectangle on the map.\' | translate }} </span> </div> </ngeo-drawfeature> </div> <div class="checkbox ngeo-rule-type-select" ng-switch-when=select> <a ng-click=$ctrl.selectAllChoices() href>{{ All | translate}} </a> <label class="form-group ol-unselectable" ng-repeat="choice in ::$ctrl.clone.choices"> <input ng-checked="$ctrl.clone.getExpression() && $ctrl.clone.getExpression().split(\',\').indexOf(choice) > -1" ng-click=$ctrl.toggleChoiceSelection(choice) type=checkbox value=choice> <span>{{ choice | translate }}</span> </label> </div> <div class="form-group ngeo-rule-type-text" ng-switch-default> <div ng-switch=$ctrl.clone.operator> <div ng-switch-when=..> <input type=number class="form-control input-sm" ng-model=$ctrl.clone.lowerBoundary> <input type=number class="form-control input-sm" ng-model=$ctrl.clone.upperBoundary> </div> <div ng-switch-default> <input type=number class="form-control input-sm" ng-if="$ctrl.clone.type === \'number\'" ng-model=$ctrl.clone.expression> <input type=text class="form-control input-sm" ng-if="$ctrl.clone.type !== \'number\'" ng-model=$ctrl.clone.expression> </div> </div> </div> <div class=ngeo-rule-btns> <button class="btn btn-xs btn-default" ng-click=$ctrl.apply() type=button>{{\'Apply\' | translate}}</button> <button class="btn btn-xs btn-default" ng-click=$ctrl.cancel() type=button>{{\'Cancel\' | translate}}</button> </div> </div> </div> </div> <div class=ngeo-rule-value ng-if="$ctrl.rule.value !== null"> <a class="btn btn-xs btn-link" ng-click="!$ctrl.rule.active && $ctrl.reset()" ng-disabled=$ctrl.rule.active href> <span class="fa fa-remove"></span> </a> <div ng-switch=::$ctrl.rule.type> <div ng-switch-when=date|datetime ng-switch-when-separator=|> <div ng-switch=$ctrl.rule.operator> <div ng-switch-when=..> <span translate>From </span> <span>{{ $ctrl.timeToDate($ctrl.rule.lowerBoundary) }}</span> <span translate> to </span> <span>{{ $ctrl.timeToDate($ctrl.rule.upperBoundary) }}</span> </div> <div ng-switch-default> <span>{{ $ctrl.rule.operator }}</span> <span>{{ $ctrl.timeToDate($ctrl.rule.getExpression()) }}</span> </div> </div> </div> <div ng-switch-when=geometry> <span>{{ $ctrl.operators[$ctrl.rule.operator] }}</span> <span ng-switch=$ctrl.getRuleGeometryType()> <span class="gmf-icon gmf-icon-point" ng-switch-when=Point> </span> <span class="gmf-icon gmf-icon-line" ng-switch-when=LineString> </span> <span class="gmf-icon gmf-icon-polygon" ng-switch-when=Polygon> </span> <span class="gmf-icon gmf-icon-circle" ng-switch-when=Circle> </span> <span class="gmf-icon gmf-icon-rectangle" ng-switch-when=Rectangle> </span> </span> </div> <div ng-switch-when=select> <span ng-repeat="choice in $ctrl.rule.getExpression().split(\',\')"> {{ choice | translate }}{{ $last ? \'\' : \', \' }} </span> </div> <div ng-switch-default> <div ng-switch=$ctrl.rule.operator> <div ng-switch-when=..> <span translate>Between </span> <span>{{ $ctrl.rule.lowerBoundary }}</span> <span translate> and </span> <span>{{ $ctrl.rule.upperBoundary }}</span> </div> <div ng-switch-default> <span>{{ $ctrl.rule.operator }}</span> <span>{{ $ctrl.rule.getExpression() }}</span> </div> </div> </div> </div> </div> ');
a.put("ngeomodule/googlestreetview/component.html",'<div class=ngeo-googlestreetview-instructions ng-if="$ctrl.location === null" translate> Click on a road on the map to start StreetView. </div> <div class=ngeo-googlestreetview-nodata ng-if=$ctrl.noDataAtLocation translate> Street View data not found for this location. </div> ');a.put("ngeomodule/misc/datepickerComponent.html","<div class=ngeo-datepicker> <form name=dateForm class=ngeo-datepicker-form novalidate> <div ng-if=\"::datepickerCtrl.time.widget === 'datepicker'\"> <div class=ngeo-datepicker-start-date> <span ng-if=\"::datepickerCtrl.time.mode === 'range'\" translate>From:</span> <span ng-if=\"::datepickerCtrl.time.mode !== 'range'\" translate>Date:</span> <input name=sdate ui-date=datepickerCtrl.sdateOptions ng-model=datepickerCtrl.sdate required> </div> <div class=ngeo-datepicker-end-date ng-if=\"::datepickerCtrl.time.mode === 'range'\"> <span translate>To:</span> <input name=edate ui-date=datepickerCtrl.edateOptions ng-model=datepickerCtrl.edate required> </div> </div> </form> </div> ");
a.put("ngeomodule/directives/partials/popup.html",'<h4 class="popover-title ngeo-popup-title"> <span ng-bind-html=title></span> <button type=button class=close ng-click="open = false"> &times;</button> </h4> <div class=popover-content ng-bind-html=content></div> ');a.put("ngeomodule/olcs/controls3d.html",'<div class=ngeo-tools> <div class=ngeo-angle><div class=ngeo-angle3d></div></div> <button class="ngeo-left ngeo-tilt-left" ng-click=$ctrl.tilt(5)></button> <button class="ngeo-right ngeo-tilt-right" ng-click=$ctrl.tilt(-5)></button> </div> <div class=ngeo-zoom> <button class=ol-zoom-in ng-click=$ctrl.zoom(1)></button> <button class=ol-zoom-out ng-click=$ctrl.zoom(-1)></button> </div> <div class=ngeo-tools> <div class=ngeo-rotation><div class=ngeo-rotation3d></div></div> <button class=ngeo-left ng-click=$ctrl.rotate(-15)></button> <button class=ngeo-right ng-click=$ctrl.rotate(15)></button> </div> ');
a.put("ngeo/popup.html",'<h4 class="popover-title ngeo-popup-title"> <span ng-bind-html=title></span> <button type=button class=close ng-click="open = false"> &times;</button> </h4> <div class=popover-content ng-bind-html=content></div> ');a.put("ngeomodule/grid/component.html",'<div class=ngeo-grid-table-container> <table float-thead=ctrl.floatTheadConfig ng-model=ctrl.configuration.data class="table table-bordered table-striped table-hover"> <thead class=table-header> <tr> <th ng-repeat="columnDefs in ctrl.configuration.columnDefs" ng-click=ctrl.sort(columnDefs.name) ng-bind-html="columnDefs.name | ngeoTrustHtml | translate"> <i ng-show="ctrl.sortedBy !== columnDefs.name" class="fa fa-fw"></i> <i ng-show="ctrl.sortedBy === columnDefs.name && ctrl.sortAscending === true" class="fa fa-caret-up"></i> <i ng-show="ctrl.sortedBy === columnDefs.name && ctrl.sortAscending === false" class="fa fa-caret-down"></i> </th> </tr> </thead> <tbody> <tr ng-repeat="attributes in ctrl.configuration.data" ng-class="[\'row-\' + ctrl.configuration.getRowUid(attributes), ctrl.configuration.isRowSelected(attributes) ? \'ngeo-grid-active\': \'\']" ng-click="ctrl.clickRow(attributes, $event)" ng-mousedown=ctrl.preventTextSelection($event)> <td ng-repeat="columnDefs in ctrl.configuration.columnDefs" ng-bind-html="attributes[columnDefs.name] | ngeoTrustHtml"></td> </tr> </tbody> </table> </div> ');
a.put("ngeo/attributes.html",'<fieldset ng-disabled=attrCtrl.disabled> <div class=form-group ng-repeat="attribute in ::attrCtrl.attributes"> <div ng-if="attribute.type !== \'geometry\'"> <label ng-if="::attribute.type !== \'boolean\'" class=control-label>{{ ::attribute.name | translate }} <span class=text-muted>{{::attribute.required ? "*" : ""}}</span> </label> <div ng-switch=::attribute.type> <div ng-switch-when=boolean class=checkbox> <label> <input name={{::attribute.name}} ng-required=attribute.required ng-model=attrCtrl.properties[attribute.name] ng-change=attrCtrl.handleInputChange(attribute.name); type=checkbox> <span> {{ ::attribute.name | translate }} <span class=text-muted>{{::attribute.required ? "*" : ""}}</span></span> </label> </div> <select name={{::attribute.name}} ng-required=attribute.required ng-switch-when=select ng-model=attrCtrl.properties[attribute.name] ng-change=attrCtrl.handleInputChange(attribute.name); class=form-control type=text> <option ng-repeat="attribute in ::attribute.choices" value="{{ ::attribute }}"> {{ ::attribute }} </option> </select> <input name={{::attribute.name}} ng-required=attribute.required ng-switch-when=date ui-date=attrCtrl.dateOptions ng-model=attrCtrl.properties[attribute.name] ng-change=attrCtrl.handleInputChange(attribute.name); class=form-control type=text> <input name={{::attribute.name}} ng-required=attribute.required ng-switch-when=datetime ui-date=attrCtrl.dateOptions ng-model=attrCtrl.properties[attribute.name] ng-change=attrCtrl.handleInputChange(attribute.name); class=form-control type=text> <div ng-switch-when=number ng-switch=::attribute.numType> <input name={{::attribute.name}} ng-required=attribute.required ng-switch-when=integer ng-model=attrCtrl.properties[attribute.name] ng-change=attrCtrl.handleInputChange(attribute.name); class=form-control step=1 type=number> <input name={{::attribute.name}} ng-required=attribute.required ng-switch-default ng-model=attrCtrl.properties[attribute.name] ng-change=attrCtrl.handleInputChange(attribute.name); class=form-control type=number> </div> <input name={{::attribute.name}} ng-required=attribute.required ng-switch-default ng-model=attrCtrl.properties[attribute.name] ng-change=attrCtrl.handleInputChange(attribute.name); ng-maxlength=attribute.maxLength class=form-control type=text> <div ng-show="attrCtrl.form.$submitted || attrCtrl.form[attribute.name].$touched"> <p class=text-danger ng-show=attrCtrl.form[attribute.name].$error.required> {{\'This field is required\' | translate}} </p> </div> </div> </div> </div> </fieldset> ');
a.put("ngeomodule/directives/partials/attributes.html",'<fieldset ng-disabled=attrCtrl.disabled> <div class=form-group ng-repeat="attribute in ::attrCtrl.attributes"> <div ng-if="attribute.type !== \'geometry\'"> <label ng-if="::attribute.type !== \'boolean\'" class=control-label>{{ ::attribute.name | translate }} <span class=text-muted>{{::attribute.required ? "*" : ""}}</span> </label> <div ng-switch=::attribute.type> <div ng-switch-when=boolean class=checkbox> <label> <input name={{::attribute.name}} ng-required=attribute.required ng-model=attrCtrl.properties[attribute.name] ng-change=attrCtrl.handleInputChange(attribute.name); type=checkbox> <span> {{ ::attribute.name | translate }} <span class=text-muted>{{::attribute.required ? "*" : ""}}</span></span> </label> </div> <select name={{::attribute.name}} ng-required=attribute.required ng-switch-when=select ng-model=attrCtrl.properties[attribute.name] ng-change=attrCtrl.handleInputChange(attribute.name); class=form-control type=text> <option ng-repeat="attribute in ::attribute.choices" value="{{ ::attribute }}"> {{ ::attribute }} </option> </select> <input name={{::attribute.name}} ng-required=attribute.required ng-switch-when=date ui-date=attrCtrl.dateOptions ng-model=attrCtrl.properties[attribute.name] ng-change=attrCtrl.handleInputChange(attribute.name); class=form-control type=text> <input name={{::attribute.name}} ng-required=attribute.required ng-switch-when=datetime ui-date=attrCtrl.dateOptions ng-model=attrCtrl.properties[attribute.name] ng-change=attrCtrl.handleInputChange(attribute.name); class=form-control type=text> <div ng-switch-when=number ng-switch=::attribute.numType> <input name={{::attribute.name}} ng-required=attribute.required ng-switch-when=integer ng-model=attrCtrl.properties[attribute.name] ng-change=attrCtrl.handleInputChange(attribute.name); class=form-control step=1 type=number> <input name={{::attribute.name}} ng-required=attribute.required ng-switch-default ng-model=attrCtrl.properties[attribute.name] ng-change=attrCtrl.handleInputChange(attribute.name); class=form-control type=number> </div> <input name={{::attribute.name}} ng-required=attribute.required ng-switch-default ng-model=attrCtrl.properties[attribute.name] ng-change=attrCtrl.handleInputChange(attribute.name); ng-maxlength=attribute.maxLength class=form-control type=text> <div ng-show="attrCtrl.form.$submitted || attrCtrl.form[attribute.name].$touched"> <p class=text-danger ng-show=attrCtrl.form[attribute.name].$error.required> {{\'This field is required\' | translate}} </p> </div> </div> </div> </div> </fieldset> ');
a.put("ngeomodule/map/scaleselector.html",'<div class="btn-group btn-block" ng-class="::{\'dropup\': scaleselectorCtrl.options.dropup}"> <button type=button class="btn btn-default dropdown-toggle" data-toggle=dropdown aria-expanded=false> <span ng-bind-html="scaleselectorCtrl.currentScale | ngeoScalify | ngeoTrustHtml"></span>&nbsp;<i class=caret></i> </button> <ul class="dropdown-menu btn-block" role=menu> <li ng-repeat="zoomLevel in ::scaleselectorCtrl.zoomLevels"> <a href ng-click=scaleselectorCtrl.changeZoom(zoomLevel) ng-bind-html="scaleselectorCtrl.getScale(zoomLevel) | ngeoScalify | ngeoTrustHtml"> </a> </li> </ul> </div> ');
a.put("ngeomodule/filter/component.html",'<div class=dropdown> <a class="btn btn-link dropdown-toggle ngeo-filter-condition-button" ng-class="{disabled: $ctrl.aRuleIsActive}" type=button data-toggle=dropdown ng-disabled=$ctrl.aRuleIsActive> <span class="fa fa-cog"></span> <span class=caret></span> </a> <ul class=dropdown-menu> <li class=ngeo-filter-condition-criteria-header translate>Criteria taken into account</li> <li ng-repeat="condition in ::$ctrl.conditions"> <a href ng-click=$ctrl.setCondition(condition)> <span ng-class="{\'ngeo-filter-condition-criteria-active\': condition.value == $ctrl.datasource.filterCondition}" class="fa fa-check ngeo-filter-condition-criteria"> </span> <span>{{::condition.text | translate}}</span> </a> </li> </ul> </div> <ngeo-rule ng-repeat="rule in $ctrl.directedRules" feature-overlay=::$ctrl.featureOverlay class=ngeo-filter-rule-directed map=$ctrl.map rule=rule tool-group=$ctrl.toolGroup> </ngeo-rule> <hr class=ngeo-filter-separator-rules> <div ng-repeat="rule in $ctrl.customRules"> <a class="btn btn-xs btn-link ngeo-filter-rule-custom-rm-btn" ng-click="!$ctrl.aRuleIsActive && $ctrl.removeCustomRule(rule)" ng-disabled=$ctrl.aRuleIsActive href> <span class="fa fa-remove"></span> </a> <ngeo-rule feature-overlay=::$ctrl.featureOverlay class=ngeo-filter-rule-custom map=$ctrl.map rule=rule tool-group=$ctrl.toolGroup> </ngeo-rule> </div> <div class=dropdown> <a class="btn btn-link dropdown-toggle" ng-class="{disabled: $ctrl.aRuleIsActive}" type=button data-toggle=dropdown ng-disabled=$ctrl.aRuleIsActive> <span translate>+ Add a new criteria</span> <span class=caret></span> </a> <ul class=dropdown-menu> <li ng-repeat="attribute in ::$ctrl.geometryAttributes"> <a href ng-click=$ctrl.createAndAddCustomRule(attribute)> <span translate>Spatial filter</span> </a> </li> <li role=presentation class=divider></li> <li ng-repeat="attribute in ::$ctrl.otherAttributes"> <a href ng-click=$ctrl.createAndAddCustomRule(attribute)> <span>{{::attribute.name | translate}}</span> </a> </li> </ul> </div> <hr class=ngeo-filter-separator-criteria> <a class="btn btn-link" type=button ng-click="!$ctrl.aRuleIsActive && $ctrl.apply()" ng-disabled=$ctrl.aRuleIsActive> <span class="fa fa-check"></span> <span translate>Apply filter</span> </a> <a class="btn btn-link" type=button ng-click="!$ctrl.aRuleIsActive && $ctrl.getData()" ng-disabled=$ctrl.aRuleIsActive> <span class="fa fa-chevron-right"></span> <span translate>Get data</span> </a> ');
a.put("ngeomodule/misc/colorpickerComponent.html",'<table class=ngeo-colorpicker-palette> <tr ng-repeat="colors in ::ctrl.colors"> <td ng-repeat="color in ::colors" ng-click=ctrl.setColor(color) ng-class="{\'ngeo-colorpicker-selected\': color == ctrl.color}"> <div ng-style="::{\'background-color\': color}"></div> </td> </tr> </table> ')}a.$inject=["$templateCache"];Fa.run(a)})();function Z(a,b){this.b=b;this.v=a}Z.prototype.$onInit=function(){var a=this;this.a=this.b.children();this.resizable=!!this.resizable;var b=this.a.find(".modal-dialog");b.draggable();this.resizable&&b.resizable();this.ngModel.$render=function(){a.a.modal(a.ngModel.$viewValue?"show":"hide")};this.a.on("shown.bs.modal hidden.bs.modal",function(b){var c=b.type;a.v.$apply(function(){a.ngModel.$setViewValue("shown"==c)})})};
Z.prototype.$onDestroy=function(){var a=this.a.find(".modal-dialog");a.draggable("destroy");this.resizable&&a.resizable("destroy")};Z.$inject=["$scope","$element"];Fa.component("ngeoModal",{template:'<div class="modal fade" tabindex="-1" role="dialog">\n    <div class="modal-dialog">\n      <div class="modal-content">\n        <ng-transclude></ng-transclude>\n      </div>\n    </div>\n  </div>',require:{ngModel:"ngModel"},transclude:!0,controller:Z,bindings:{resizable:"<ngeoModalResizable"}});angular.module("app",["ngeo"]).controller("MainController",function(){this.modalShown=!1});}).call(window);
//# sourceMappingURL=modal.js.map
