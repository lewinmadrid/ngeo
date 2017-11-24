(function(){'use strict';var aa="function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){a!=Array.prototype&&a!=Object.prototype&&(a[b]=c.value)},ba="undefined"!=typeof window&&window===this?this:"undefined"!=typeof global&&null!=global?global:this;function ca(a,b){if(b){var c=ba;a=a.split(".");for(var d=0;d<a.length-1;d++){var g=a[d];g in c||(c[g]={});c=c[g]}a=a[a.length-1];d=c[a];b=b(d);b!=d&&null!=b&&aa(c,a,{configurable:!0,writable:!0,value:b})}}
ca("Math.cosh",function(a){if(a)return a;var b=Math.exp;return function(a){a=Number(a);return(b(a)+b(-a))/2}});ca("Object.is",function(a){return a?a:function(a,c){return a===c?0!==a||1/a===1/c:a!==a&&c!==c}});var da=this;function m(a,b){a=a.split(".");var c=da;a[0]in c||!c.execScript||c.execScript("var "+a[0]);for(var d;a.length&&(d=a.shift());)a.length||void 0===b?c[d]&&c[d]!==Object.prototype[d]?c=c[d]:c=c[d]={}:c[d]=b}
function ea(a,b){function c(){}c.prototype=b.prototype;a.Pa=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.La=function(a,c,e){for(var d=Array(arguments.length-2),g=2;g<arguments.length;g++)d[g-2]=arguments[g];return b.prototype[c].apply(a,d)}};function r(a,b){a.prototype=Object.create(b.prototype);a.prototype.constructor=a}function fa(){};function t(a){this.message="Assertion failed. See https://openlayers.org/en/latest/doc/errors/#"+a+" for details.";this.code=a;this.name="AssertionError"}r(t,Error);function ha(a){for(var b in a)delete a[b]};function ia(a){function b(b){var c=a.listener,g=a.bindTo||a.target;if(a.fa&&a&&a.target){a.target.removeEventListener(a.type,a.ea);var e=ja(a.target,a.type);if(e){var f="deleteIndex"in a?a.deleteIndex:e.indexOf(a);-1!==f&&e.splice(f,1);if(0===e.length){e=a.target;f=a.type;var n=ja(e,f);if(n){for(var q=0,D=n.length;q<D;++q)e.removeEventListener(f,n[q].ea),ha(n[q]);n.length=0;if(n=e.K)delete n[f],0===Object.keys(n).length&&delete e.K}}}ha(a)}return c.call(g,b)}return a.ea=b}
function ja(a,b){return(a=a.K)?a[b]:void 0}function u(a,b,c,d,g){var e=a.K;e||(e=a.K={});var f=e;(e=f[b])||(e=f[b]=[]);a:{f=e;for(var n,q=0,D=f.length;q<D;++q)if(n=f[q],n.listener===c&&n.bindTo===d){f=n;break a}f=void 0}f?g||(f.fa=!1):(f={bindTo:d,fa:!!g,listener:c,target:a,type:b},a.addEventListener(b,ia(f)),e.push(f));return f};function ka(){};function v(a){this.type=a;this.target=null}v.prototype.preventDefault=v.prototype.stopPropagation=function(){this.Aa=!0};function w(){this.F={};this.u={};this.D={}}r(w,ka);w.prototype.addEventListener=function(a,b){var c=this.D[a];c||(c=this.D[a]=[]);-1===c.indexOf(b)&&c.push(b)};function la(a,b){var c="string"===typeof b?new v(b):b;b=c.type;c.target=a;var d=a.D[b];if(d){b in a.u||(a.u[b]=0,a.F[b]=0);++a.u[b];for(var g=0,e=d.length;g<e&&!1!==d[g].call(a,c)&&!c.Aa;++g);--a.u[b];if(0===a.u[b]){c=a.F[b];for(delete a.F[b];c--;)a.removeEventListener(b,fa);delete a.u[b]}}}
w.prototype.removeEventListener=function(a,b){var c=this.D[a];c&&(b=c.indexOf(b),a in this.F?(c[b]=fa,++this.F[a]):(c.splice(b,1),0===c.length&&delete this.D[a]))};function x(){w.call(this)}r(x,w);x.prototype.once=function(a,b,c){if(Array.isArray(a)){for(var d=a.length,g=Array(d),e=0;e<d;++e)g[e]=u(this,a[e],b,c,!0);return g}return u(this,a,b,c,!0)};var ma=function(){var a;"cosh"in Math?a=Math.cosh:a=function(a){a=Math.exp(a);return(a+1/a)/2};return a}();/*

 Latitude/longitude spherical geodesy formulae taken from
 http://www.movable-type.co.uk/scripts/latlong.html
 Licensed under CC-BY-3.0.
*/
function y(a){a=this.a=a.code;var b=window.proj4;"function"==typeof b&&b.defs(a)};function A(a){y.call(this,{code:a,units:"m",extent:na,global:!0,Da:oa,Ma:function(a,c){return a/ma(c[1]/6378137)}})}r(A,y);var B=6378137*Math.PI,na=[-B,-B,B,B],oa=[-180,-85,180,85],pa=[new A("EPSG:3857"),new A("EPSG:102100"),new A("EPSG:102113"),new A("EPSG:900913"),new A("urn:ogc:def:crs:EPSG:6.18:3:3857"),new A("urn:ogc:def:crs:EPSG::3857"),new A("http://www.opengis.net/gml/srs/epsg.xml#3857")];
function sa(a,b,c){var d=a.length;c=1<c?c:2;void 0===b&&(2<c?b=a.slice():b=Array(d));for(var g=0;g<d;g+=c){b[g]=B*a[g]/180;var e=6378137*Math.log(Math.tan(Math.PI*(a[g+1]+90)/360));e>B?e=B:e<-B&&(e=-B);b[g+1]=e}return b}function ta(a,b,c){var d=a.length;c=1<c?c:2;void 0===b&&(2<c?b=a.slice():b=Array(d));for(var g=0;g<d;g+=c)b[g]=180*a[g]/B,b[g+1]=360*Math.atan(Math.exp(a[g+1]/6378137))/Math.PI-90;return b};function C(a,b){y.call(this,{code:a,units:"degrees",extent:ua,Ka:b,global:!0,Oa:va,Da:ua})}r(C,y);var ua=[-180,-90,180,90],va=6378137*Math.PI/180,wa=[new C("CRS:84"),new C("EPSG:4326","neu"),new C("urn:ogc:def:crs:EPSG::4326","neu"),new C("urn:ogc:def:crs:EPSG:6.6:4326","neu"),new C("urn:ogc:def:crs:OGC:1.3:CRS84"),new C("urn:ogc:def:crs:OGC:2:84"),new C("http://www.opengis.net/gml/srs/epsg.xml#4326","neu"),new C("urn:x-ogc:def:crs:EPSG:4326","neu")];var E={};function G(a,b,c){a=a.a;b=b.a;a in E||(E[a]={});E[a][b]=c};function xa(a){a.forEach(ya);a.forEach(function(b){a.forEach(function(a){b!==a&&G(b,a,za)})})}function ya(a){G(a,a,za)}function za(a,b){if(void 0!==b){for(var c=0,d=a.length;c<d;++c)b[c]=a[c];a=b}else a=a.slice();return a}xa(pa);xa(wa);wa.forEach(function(a){pa.forEach(function(b){G(a,b,sa);G(b,a,ta)})});function I(){return document.createElement("CANVAS").getContext("2d")};var J="undefined"!==typeof navigator?navigator.userAgent.toLowerCase():"";J.indexOf("firefox");-1!==J.indexOf("safari")&&J.indexOf("chrom");-1!==J.indexOf("webkit")&&J.indexOf("edge");J.indexOf("macintosh");(function(){if(!("HTMLCanvasElement"in window))return!1;try{return document.createElement("CANVAS").getContext("2d")?!0:!1}catch(a){return!1}})();function K(a){w.call(this);this.highWaterMark=void 0!==a?a:2048;this.v={};this.a=this.b=null}r(K,w);K.prototype.clear=function(){this.v={};this.a=this.b=null;la(this,"clear")};K.prototype.forEach=function(a,b){for(var c=this.b;c;)a.call(b,c.O,c.ga,this),c=c.l};K.prototype.get=function(a){a=this.v[a];if(void 0===a)throw new t(15);if(a===this.a)return a.O;a===this.b?(this.b=this.b.l,this.b.B=null):(a.l.B=a.B,a.B.l=a.l);a.l=null;a.B=this.a;this.a=this.a.l=a;return a.O};
K.prototype.pop=function(){var a=this.b;delete this.v[a.ga];a.l&&(a.l.B=null);this.b=a.l;this.b||(this.a=null);return a.O};K.prototype.set=function(a,b){if(a in this.v)throw new t(16);b={ga:a,l:null,B:this.a,O:b};this.a?this.a.l=b:this.b=b;this.a=b;this.v[a]=b};var Aa=new K;var L={V:{}};L.V.W=function(){};
(function(a){function b(a,b,c){if(f)return new ImageData(a,b,c);b=n.createImageData(b,c);b.data.set(a);return b}function c(a){var b=!0;try{new ImageData(10,10)}catch(Q){b=!1}return function(c){var d=c.buffers,g=c.meta,e=c.width,q=c.height,f=d.length,h=d[0].byteLength;if(c.imageOps){h=Array(f);for(c=0;c<f;++c){var k=c;var l=new Uint8ClampedArray(d[c]);var p=e,z=q;l=b?new ImageData(l,p,z):{data:l,width:p,height:z};h[k]=l}e=a(h,g).data}else{e=new Uint8ClampedArray(h);q=Array(f);k=Array(f);for(c=0;c<
f;++c)q[c]=new Uint8ClampedArray(d[c]),k[c]=[0,0,0,0];for(d=0;d<h;d+=4){for(c=0;c<f;++c)l=q[c],k[c][0]=l[d],k[c][1]=l[d+1],k[c][2]=l[d+2],k[c][3]=l[d+3];c=a(k,g);e[d]=c[0];e[d+1]=c[1];e[d+2]=c[2];e[d+3]=c[3]}}return e.buffer}}function d(a,b){var d=Object.keys(a.va||{}).map(function(b){return"var "+b+" = "+a.va[b].toString()+";"}).concat(["var __minion__ = ("+c.toString()+")(",a.za.toString(),");",'self.addEventListener("message", function(event) {',"  var buffer = __minion__(event.data);","  self.postMessage({buffer: buffer, meta: event.data.meta}, [buffer]);",
"});"]);d=URL.createObjectURL(new Blob(d,{type:"text/javascript"}));d=new Worker(d);d.addEventListener("message",b);return d}function g(a,b){var d=c(a.za);return{postMessage:function(a){setTimeout(function(){b({data:{buffer:d(a),meta:a.meta}})},0)}}}function e(a){this.P=!!a.Na;var b;0===a.Ca?b=0:this.P?b=1:b=a.Ca||1;var c=[];if(b)for(var e=0;e<b;++e)c[e]=d(a,this.ba.bind(this,e));else c[0]=g(a,this.ba.bind(this,0));this.J=c;this.ca=[];this.I=0;this.A={};this.R=null}var f=!0;try{new ImageData(10,10)}catch(q){f=
!1}var n=document.createElement("canvas").getContext("2d");e.prototype.destroy=function(){for(var a in this)this[a]=null;this.na=!0};e.prototype.oa=function(){if(0===this.I&&0<this.ca.length){var a=this.R=this.ca.shift(),b=a.inputs[0].width,c=a.inputs[0].height,d=a.inputs.map(function(a){return a.data.buffer}),e=this.J.length;this.I=e;if(1===e)this.J[0].postMessage({buffers:d,meta:a.wa,imageOps:this.P,width:b,height:c},d);else for(var g=4*Math.ceil(a.inputs[0].data.length/4/e),f=0;f<e;++f){for(var n=
f*g,h=[],k=0,l=d.length;k<l;++k)h.push(d[f].slice(n,n+g));this.J[f].postMessage({buffers:h,meta:a.wa,imageOps:this.P,width:b,height:c},h)}}};e.prototype.ba=function(a,b){this.na||(this.A[a]=b.data,--this.I,0===this.I&&this.qa())};e.prototype.qa=function(){var a=this.R,c=this.J.length;if(1===c){var d=new Uint8ClampedArray(this.A[0].buffer);var e=this.A[0].meta}else{var g=a.inputs[0].data.length;d=new Uint8ClampedArray(g);e=Array(g);g=4*Math.ceil(g/4/c);for(var f=0;f<c;++f){var n=f*g;d.set(new Uint8ClampedArray(this.A[f].buffer),
n);e[f]=this.A[f].meta}}this.R=null;this.A={};a.callback(null,b(d,a.inputs[0].width,a.inputs[0].height),e);this.oa()};a["default"]={W:e};a.W=e})(L.V=L.V||{});function M(a){w.call(this);this.a=a}r(M,x);function N(a){M.call(this,a)}r(N,M);function O(a){M.call(this,a)}r(O,N);function P(a){M.call(this,a)}r(P,O);P.handles=function(a,b){return"canvas"===a&&"IMAGE"===b.getType()};P.create=function(a,b){return new P(b)};function S(a){M.call(this,a);this.context=null===this.context?null:I()}r(S,O);S.handles=function(a,b){return"canvas"===a&&"TILE"===b.getType()};S.create=function(a,b){return new S(b)};try{new MouseEvent("click",{buttons:1})}catch(a){};var Ba=[],Ca=[];function Da(a,b){switch(a){case "MAP_RENDERER":a=Ba;a.push(b);break;case "LAYER_RENDERER":a=Ca;a.push(b);break;default:throw Error("Unsupported plugin type: "+a);}};function Ea(){}r(Ea,ka);function T(a){this.b=I();this.a=this.b.canvas;this.a.style.width="100%";this.a.style.height="100%";this.a.style.display="block";this.a.className="ol-unselectable";a.insertBefore(this.a,a.childNodes[0]||null)}r(T,Ea);T.handles=function(a){return"canvas"===a};T.create=function(a){return new T(a)};T.prototype.getType=function(){return"canvas"};L.C=function(){};
(function(a){function b(a,k,l,p,e){l=l||0;p=p||a.length-1;for(e=e||d;p>l;){if(600<p-l){var h=p-l+1,g=k-l+1,z=Math.log(h),f=.5*Math.exp(2*z/3);z=.5*Math.sqrt(z*f*(h-f)/h)*(0>g-h/2?-1:1);b(a,k,Math.max(l,Math.floor(k-g*f/h+z)),Math.min(p,Math.floor(k+(h-g)*f/h+z)),e)}h=a[k];g=l;f=p;c(a,l,k);for(0<e(a[p],h)&&c(a,l,p);g<f;){c(a,g,f);g++;for(f--;0>e(a[g],h);)g++;for(;0<e(a[f],h);)f--}0===e(a[l],h)?c(a,l,f):(f++,c(a,f,p));f<=k&&(l=f+1);k<=f&&(p=f-1)}}function c(a,b,c){var h=a[b];a[b]=a[c];a[c]=h}function d(a,
b){return a<b?-1:a>b?1:0}function g(a,b){if(!(this instanceof g))return new g(a,b);this.S=Math.max(4,a||9);this.aa=Math.max(2,Math.ceil(.4*this.S));b&&this.pa(b);this.clear()}function e(a,b){f(a,0,a.children.length,b,a)}function f(a,b,c,d,e){e||(e=F(null));e.c=Infinity;e.f=Infinity;e.g=-Infinity;e.i=-Infinity;for(var h;b<c;b++)h=a.children[b],n(e,a.j?d(h):h);return e}function n(a,b){a.c=Math.min(a.c,b.c);a.f=Math.min(a.f,b.f);a.g=Math.max(a.g,b.g);a.i=Math.max(a.i,b.i)}function q(a,b){return a.c-
b.c}function D(a,b){return a.f-b.f}function Q(a){return(a.g-a.c)*(a.i-a.f)}function R(a){return a.g-a.c+(a.i-a.f)}function qa(a,b){return b.c<=a.g&&b.f<=a.i&&b.g>=a.c&&b.i>=a.f}function F(a){return{children:a,height:1,j:!0,c:Infinity,f:Infinity,g:-Infinity,i:-Infinity}}function ra(a,b,c,d,e){for(var h=[b,c],k;h.length;)c=h.pop(),b=h.pop(),c-b<=d||(k=b+Math.ceil((c-b)/d/2)*d,Ia(a,k,b,c,e),h.push(b,k,k,c))}var Ia=b;g.prototype={search:function(a){var b=this.data,c=[],h=this.o;if(!qa(a,b))return c;for(var d=
[],e,g,f,H;b;){e=0;for(g=b.children.length;e<g;e++)f=b.children[e],H=b.j?h(f):f,qa(a,H)&&(b.j?c.push(f):a.c<=H.c&&a.f<=H.f&&H.g<=a.g&&H.i<=a.i?this.ja(f,c):d.push(f));b=d.pop()}return c},load:function(a){if(!a||!a.length)return this;if(a.length<this.aa){for(var b=0,c=a.length;b<c;b++)this.insert(a[b]);return this}a=this.Y(a.slice(),0,a.length-1,0);this.data.children.length?this.data.height===a.height?this.da(this.data,a):(this.data.height<a.height&&(b=this.data,this.data=a,a=b),this.Z(a,this.data.height-
a.height-1,!0)):this.data=a;return this},insert:function(a){a&&this.Z(a,this.data.height-1);return this},clear:function(){this.data=F([]);return this},o:function(a){return a},T:q,U:D,toJSON:function(){return this.data},ja:function(a,b){for(var c=[];a;)a.j?b.push.apply(b,a.children):c.push.apply(c,a.children),a=c.pop();return b},Y:function(a,b,c,d){var h=c-b+1,g=this.S;if(h<=g){var f=F(a.slice(b,c+1));e(f,this.o);return f}d||(d=Math.ceil(Math.log(h)/Math.log(g)),g=Math.ceil(h/Math.pow(g,d-1)));f=F([]);
f.j=!1;f.height=d;h=Math.ceil(h/g);g=h*Math.ceil(Math.sqrt(g));var k;for(ra(a,b,c,g,this.T);b<=c;b+=g){var l=Math.min(b+g-1,c);ra(a,b,l,h,this.U);for(k=b;k<=l;k+=h){var p=Math.min(k+h-1,l);f.children.push(this.Y(a,k,p,d-1))}}e(f,this.o);return f},ma:function(a,b,c,d){for(var e,g,f,h,k,l,p,n;;){d.push(b);if(b.j||d.length-1===c)break;p=n=Infinity;e=0;for(g=b.children.length;e<g;e++)f=b.children[e],k=Q(f),l=(Math.max(f.g,a.g)-Math.min(f.c,a.c))*(Math.max(f.i,a.i)-Math.min(f.f,a.f))-k,l<n?(n=l,p=k<p?
k:p,h=f):l===n&&k<p&&(p=k,h=f);b=h||b.children[0]}return b},Z:function(a,b,c){var d=this.o;c=c?a:d(a);d=[];var e=this.ma(c,this.data,b,d);e.children.push(a);for(n(e,c);0<=b;)if(d[b].children.length>this.S)this.ra(d,b),b--;else break;this.ia(c,d,b)},ra:function(a,b){var c=a[b],d=c.children.length,f=this.aa;this.ka(c,f,d);d=this.la(c,f,d);d=F(c.children.splice(d,c.children.length-d));d.height=c.height;d.j=c.j;e(c,this.o);e(d,this.o);b?a[b-1].children.push(d):this.da(c,d)},da:function(a,b){this.data=
F([a,b]);this.data.height=a.height+1;this.data.j=!1;e(this.data,this.o)},la:function(a,b,c){var d,e;var g=e=Infinity;for(d=b;d<=c-b;d++){var h=f(a,0,d,this.o);var k=f(a,d,c,this.o);var l=Math.max(0,Math.min(h.g,k.g)-Math.max(h.c,k.c))*Math.max(0,Math.min(h.i,k.i)-Math.max(h.f,k.f));h=Q(h)+Q(k);if(l<g){g=l;var n=d;e=h<e?h:e}else l===g&&h<e&&(e=h,n=d)}return n},ka:function(a,b,c){var d=a.j?this.T:q,e=a.j?this.U:D,f=this.X(a,b,c,d);b=this.X(a,b,c,e);f<b&&a.children.sort(d)},X:function(a,b,c,d){a.children.sort(d);
d=this.o;var e=f(a,0,b,d),g=f(a,c-b,c,d),h=R(e)+R(g),k;for(k=b;k<c-b;k++){var l=a.children[k];n(e,a.j?d(l):l);h+=R(e)}for(k=c-b-1;k>=b;k--)l=a.children[k],n(g,a.j?d(l):l),h+=R(g);return h},ia:function(a,b,c){for(;0<=c;c--)n(b[c],a)},pa:function(a){var b=["return a"," - b",";"];this.T=new Function("a","b",b.join(a[0]));this.U=new Function("a","b",b.join(a[1]));this.o=new Function("a","return {minX: a"+a[0]+", minY: a"+a[1]+", maxX: a"+a[2]+", maxY: a"+a[3]+"};")}};a["default"]=g})(L.C=L.C||{});
L.C=L.C.default;function U(a){M.call(this,a);a.a()&&L.C(9);I();u(Aa,"clear",this.b,this)}r(U,N);U.handles=function(a,b){return"canvas"===a&&"VECTOR"===b.getType()};U.create=function(a,b){return new U(b)};U.prototype.b=function(){this.a.b()};function V(a){this.context=null;S.call(this,a);a.a()&&L.C(9);a.v();u(Aa,"clear",this.b,this)}r(V,S);V.handles=function(a,b){return"canvas"===a&&"VECTOR_TILE"===b.getType()};V.create=function(a,b){return new V(b)};V.prototype.b=function(){var a=this.a;a.b()&&void 0!==this.v&&la(a,"change")};Da("MAP_RENDERER",T);for(var Fa=[P,S,U,V],Ga=0,Ha=Fa.length;Ga<Ha;++Ga)Da("LAYER_RENDERER",Fa[Ga]);var W=angular.module("ngeo",["gettext","ui.date","floatThead"]);m("ngeo.AttributeType",{Ea:"boolean",Fa:"date",Ga:"datetime",Ha:"geometry",Ia:"number",Ja:"select",TEXT:"text"});m("ngeo.FeatureProperties",{ANGLE:"a",COLOR:"c",IS_CIRCLE:"l",IS_RECTANGLE:"r",IS_TEXT:"t",NAME:"n",OPACITY:"o",AZIMUT:"z",SHOW_MEASURE:"m",SIZE:"s",STROKE:"k"});m("ngeo.FilterCondition",{AND:"&&",NOT:"!",OR:"||"});
m("ngeo.GeometryType",{CIRCLE:"Circle",LINE_STRING:"LineString",MULTI_LINE_STRING:"MultiLineString",MULTI_POINT:"MultiPoint",MULTI_POLYGON:"MultiPolygon",POINT:"Point",POLYGON:"Polygon",RECTANGLE:"Rectangle",TEXT:"Text"});m("ngeo.NumberType",{FLOAT:"float",INTEGER:"integer"});(function(){function a(a){a.put("ngeo/popup.html",'<h4 class="popover-title ngeo-popup-title"> <span ng-bind-html=title></span> <button type=button class=close ng-click="open = false"> &times;</button> </h4> <div class=popover-content ng-bind-html=content></div> ');a.put("ngeo/grid.html",'<div class=ngeo-grid-table-container> <table float-thead=ctrl.floatTheadConfig ng-model=ctrl.configuration.data class="table table-bordered table-striped table-hover"> <thead class=table-header> <tr> <th ng-repeat="columnDefs in ctrl.configuration.columnDefs" ng-click=ctrl.sort(columnDefs.name) ng-bind-html="columnDefs.name | ngeoTrustHtml | translate"> <i ng-show="ctrl.sortedBy !== columnDefs.name" class="fa fa-fw"></i> <i ng-show="ctrl.sortedBy === columnDefs.name && ctrl.sortAscending === true" class="fa fa-caret-up"></i> <i ng-show="ctrl.sortedBy === columnDefs.name && ctrl.sortAscending === false" class="fa fa-caret-down"></i> </th> </tr> </thead> <tbody> <tr ng-repeat="attributes in ctrl.configuration.data" ng-class="[\'row-\' + ctrl.configuration.getRowUid(attributes), ctrl.configuration.isRowSelected(attributes) ? \'ngeo-grid-active\': \'\']" ng-click="ctrl.clickRow(attributes, $event)" ng-mousedown=ctrl.preventTextSelection($event)> <td ng-repeat="columnDefs in ctrl.configuration.columnDefs" ng-bind-html="attributes[columnDefs.name] | ngeoTrustHtml"></td> </tr> </tbody> </table> </div> ');
a.put("ngeo/attributes.html",'<fieldset ng-disabled=attrCtrl.disabled> <div class=form-group ng-repeat="attribute in ::attrCtrl.attributes"> <div ng-if="attribute.type !== \'geometry\'"> <label ng-if="::attribute.type !== \'boolean\'" class=control-label>{{ ::attribute.name | translate }} <span class=text-muted>{{::attribute.required ? "*" : ""}}</span> </label> <div ng-switch=::attribute.type> <div ng-switch-when=boolean class=checkbox> <label> <input name={{::attribute.name}} ng-required=attribute.required ng-model=attrCtrl.properties[attribute.name] ng-change=attrCtrl.handleInputChange(attribute.name); type=checkbox> <span> {{ ::attribute.name | translate }} <span class=text-muted>{{::attribute.required ? "*" : ""}}</span></span> </label> </div> <select name={{::attribute.name}} ng-required=attribute.required ng-switch-when=select ng-model=attrCtrl.properties[attribute.name] ng-change=attrCtrl.handleInputChange(attribute.name); class=form-control type=text> <option ng-repeat="attribute in ::attribute.choices" value="{{ ::attribute }}"> {{ ::attribute }} </option> </select> <input name={{::attribute.name}} ng-required=attribute.required ng-switch-when=date ui-date=attrCtrl.dateOptions ng-model=attrCtrl.properties[attribute.name] ng-change=attrCtrl.handleInputChange(attribute.name); class=form-control type=text> <input name={{::attribute.name}} ng-required=attribute.required ng-switch-when=datetime ui-date=attrCtrl.dateOptions ng-model=attrCtrl.properties[attribute.name] ng-change=attrCtrl.handleInputChange(attribute.name); class=form-control type=text> <div ng-switch-when=number ng-switch=::attribute.numType> <input name={{::attribute.name}} ng-required=attribute.required ng-switch-when=integer ng-model=attrCtrl.properties[attribute.name] ng-change=attrCtrl.handleInputChange(attribute.name); class=form-control step=1 type=number> <input name={{::attribute.name}} ng-required=attribute.required ng-switch-default ng-model=attrCtrl.properties[attribute.name] ng-change=attrCtrl.handleInputChange(attribute.name); class=form-control type=number> </div> <input name={{::attribute.name}} ng-required=attribute.required ng-switch-default ng-model=attrCtrl.properties[attribute.name] ng-change=attrCtrl.handleInputChange(attribute.name); ng-maxlength=attribute.maxLength class=form-control type=text> <div ng-show="attrCtrl.form.$submitted || attrCtrl.form[attribute.name].$touched"> <p class=text-danger ng-show=attrCtrl.form[attribute.name].$error.required> {{\'This field is required\' | translate}} </p> </div> </div> </div> </div> </fieldset> ');
a.put("ngeo/rule.html",'<div class=dropdown ng-class="{open: $ctrl.rule.active}"> <a class="btn btn-default btn-sm dropdown-toggle" type=button ng-click=$ctrl.toggle()> <span>{{ ::$ctrl.clone.name | translate }}</span> <span class=caret></span> </a> <div class="dropdown-menu form-group"> <select class="form-control input-sm ngeo-rule-operators-list" ng-disabled=$ctrl.drawActive ng-if=::$ctrl.clone.operators ng-model=$ctrl.clone.operator ng-options="$ctrl.operators[operator] | translate for operator in ::$ctrl.clone.operators track by operator"> </select> <div ng-switch=::$ctrl.clone.type> <div class="ngeo-rule-type-date form-group" ng-if=$ctrl.rule.active ng-switch-when=date|datetime ng-switch-when-separator=|> <div ng-switch=$ctrl.clone.operator> <div ng-switch-when=..> <ngeo-date-picker time=$ctrl.timeRangeMode on-date-selected=$ctrl.onDateRangeSelected(time)> </ngeo-date-picker> </div> <div ng-switch-default> <ngeo-date-picker time=$ctrl.timeValueMode on-date-selected=$ctrl.onDateSelected(time)> </ngeo-date-picker> </div> </div> </div> <div class="ngeo-rule-type-geometry form-group" ng-switch-when=geometry> <div ng-switch=$ctrl.geomType> <span class="gmf-icon gmf-icon-point" ng-switch-when=Point> </span> <span class="gmf-icon gmf-icon-line" ng-switch-when=LineString> </span> <span class="gmf-icon gmf-icon-polygon" ng-switch-when=Polygon> </span> <span class="gmf-icon gmf-icon-circle" ng-switch-when=Circle> </span> <span class="gmf-icon gmf-icon-rectangle" ng-switch-when=Rectangle> </span> </div> <ngeo-drawfeature ngeo-drawfeature-active=$ctrl.drawActive ngeo-drawfeature-features=$ctrl.drawnFeatures ngeo-drawfeature-map=$ctrl.map> <div ngeo-btn-group class=btn-group> <a data-toggle=tooltip title="{{\'Draw a point on the map\' | translate}}" href ngeo-btn ngeo-drawpoint class="btn btn-sm btn-default ngeo-drawfeature-point" ng-show="[\'intersects\', \'within\'].indexOf($ctrl.clone.operator) !== -1" ng-class="{active: dfCtrl.drawPoint.active}" ng-model=dfCtrl.drawPoint.active> <span class="gmf-icon gmf-icon-point"></span> </a> <a data-toggle=tooltip title="{{\'Draw a line on the map\' | translate}}" href ngeo-btn ngeo-measurelength class="btn btn-sm btn-default ngeo-drawfeature-linestring" ng-show="[\'intersects\', \'within\'].indexOf($ctrl.clone.operator) !== -1" ng-class="{active: dfCtrl.measureLength.active}" ng-model=dfCtrl.measureLength.active> <span class="gmf-icon gmf-icon-line"></span> </a> <a data-toggle=tooltip title="{{\'Draw a polygon on the map\' | translate}}" href ngeo-btn ngeo-measurearea class="btn btn-sm btn-default ngeo-drawfeature-polygon" ng-class="{active: dfCtrl.measureArea.active}" ng-model=dfCtrl.measureArea.active> <span class="gmf-icon gmf-icon-polygon"></span> </a> <a data-toggle=tooltip title="{{\'Draw a circle on the map\' | translate}}" href ngeo-btn ngeo-measureazimut class="btn btn-sm btn-default ngeo-drawfeature-circle" ng-class="{active: dfCtrl.measureAzimut.active}" ng-model=dfCtrl.measureAzimut.active> <span class="gmf-icon gmf-icon-circle"></span> </a> <a data-toggle=tooltip title="{{\'Draw a rectangle on the map\' | translate}}" href ngeo-btn ngeo-drawrectangle class="btn btn-sm btn-default ngeo-drawfeature-rectangle" ng-class="{active: dfCtrl.drawRectangle.active}" ng-model=dfCtrl.drawRectangle.active> <span class="gmf-icon gmf-icon-rectangle"></span> </a> </div> <div class=ngeo-rule-type-geometry-instructions ng-if=$ctrl.drawActive> <span ng-if=dfCtrl.drawPoint.active> {{ \'Draw a point on the map.\' | translate }} </span> <span ng-if=dfCtrl.measureLength.active> {{ \'Draw a line string on the map.\' | translate }} </span> <span ng-if=dfCtrl.measureArea.active> {{ \'Draw a polygon on the map.\' | translate }} </span> <span ng-if=dfCtrl.measureAzimut.active> {{ \'Draw a circle on the map.\' | translate }} </span> <span ng-if=dfCtrl.drawRectangle.active> {{ \'Draw a rectangle on the map.\' | translate }} </span> </div> </ngeo-drawfeature> </div> <div class="checkbox ngeo-rule-type-select" ng-switch-when=select> <a ng-click=$ctrl.selectAllChoices() href>{{ All | translate}} </a> <label class="form-group ol-unselectable" ng-repeat="choice in ::$ctrl.clone.choices"> <input ng-checked="$ctrl.clone.getExpression() && $ctrl.clone.getExpression().split(\',\').indexOf(choice) > -1" ng-click=$ctrl.toggleChoiceSelection(choice) type=checkbox value=choice> <span>{{ choice | translate }}</span> </label> </div> <div class="form-group ngeo-rule-type-text" ng-switch-default> <div ng-switch=$ctrl.clone.operator> <div ng-switch-when=..> <input type=number class="form-control input-sm" ng-model=$ctrl.clone.lowerBoundary> <input type=number class="form-control input-sm" ng-model=$ctrl.clone.upperBoundary> </div> <div ng-switch-default> <input type=number class="form-control input-sm" ng-if="$ctrl.clone.type === \'number\'" ng-model=$ctrl.clone.expression> <input type=text class="form-control input-sm" ng-if="$ctrl.clone.type !== \'number\'" ng-model=$ctrl.clone.expression> </div> </div> </div> <div class=ngeo-rule-btns> <button class="btn btn-xs btn-default" ng-click=$ctrl.apply() type=button>{{\'Apply\' | translate}}</button> <button class="btn btn-xs btn-default" ng-click=$ctrl.cancel() type=button>{{\'Cancel\' | translate}}</button> </div> </div> </div> </div> <div class=ngeo-rule-value ng-if="$ctrl.rule.value !== null"> <a class="btn btn-xs btn-link" ng-click="!$ctrl.rule.active && $ctrl.reset()" ng-disabled=$ctrl.rule.active href> <span class="fa fa-remove"></span> </a> <div ng-switch=::$ctrl.rule.type> <div ng-switch-when=date|datetime ng-switch-when-separator=|> <div ng-switch=$ctrl.rule.operator> <div ng-switch-when=..> <span translate>From </span> <span>{{ $ctrl.timeToDate($ctrl.rule.lowerBoundary) }}</span> <span translate> to </span> <span>{{ $ctrl.timeToDate($ctrl.rule.upperBoundary) }}</span> </div> <div ng-switch-default> <span>{{ $ctrl.rule.operator }}</span> <span>{{ $ctrl.timeToDate($ctrl.rule.getExpression()) }}</span> </div> </div> </div> <div ng-switch-when=geometry> <span>{{ $ctrl.operators[$ctrl.rule.operator] }}</span> <span ng-switch=$ctrl.getRuleGeometryType()> <span class="gmf-icon gmf-icon-point" ng-switch-when=Point> </span> <span class="gmf-icon gmf-icon-line" ng-switch-when=LineString> </span> <span class="gmf-icon gmf-icon-polygon" ng-switch-when=Polygon> </span> <span class="gmf-icon gmf-icon-circle" ng-switch-when=Circle> </span> <span class="gmf-icon gmf-icon-rectangle" ng-switch-when=Rectangle> </span> </span> </div> <div ng-switch-when=select> <span ng-repeat="choice in $ctrl.rule.getExpression().split(\',\')"> {{ choice | translate }}{{ $last ? \'\' : \', \' }} </span> </div> <div ng-switch-default> <div ng-switch=$ctrl.rule.operator> <div ng-switch-when=..> <span translate>Between </span> <span>{{ $ctrl.rule.lowerBoundary }}</span> <span translate> and </span> <span>{{ $ctrl.rule.upperBoundary }}</span> </div> <div ng-switch-default> <span>{{ $ctrl.rule.operator }}</span> <span>{{ $ctrl.rule.getExpression() }}</span> </div> </div> </div> </div> </div> ');
a.put("ngeomodule/olcs/controls3d.html",'<div class=ngeo-tools> <div class=ngeo-angle><div class=ngeo-angle3d></div></div> <button class="ngeo-left ngeo-tilt-left" ng-click=$ctrl.tilt(5)></button> <button class="ngeo-right ngeo-tilt-right" ng-click=$ctrl.tilt(-5)></button> </div> <div class=ngeo-zoom> <button class=ol-zoom-in ng-click=$ctrl.zoom(1)></button> <button class=ol-zoom-out ng-click=$ctrl.zoom(-1)></button> </div> <div class=ngeo-tools> <div class=ngeo-rotation><div class=ngeo-rotation3d></div></div> <button class=ngeo-left ng-click=$ctrl.rotate(-15)></button> <button class=ngeo-right ng-click=$ctrl.rotate(15)></button> </div> ');
a.put("ngeo/googlestreetview.html",'<div class=ngeo-googlestreetview-instructions ng-if="$ctrl.location === null" translate> Click on a road on the map to start StreetView. </div> <div class=ngeo-googlestreetview-nodata ng-if=$ctrl.noDataAtLocation translate> Street View data not found for this location. </div> ');a.put("ngeo/colorpicker.html",'<table class=ngeo-colorpicker-palette> <tr ng-repeat="colors in ::ctrl.colors"> <td ng-repeat="color in ::colors" ng-click=ctrl.setColor(color) ng-class="{\'ngeo-colorpicker-selected\': color == ctrl.color}"> <div ng-style="::{\'background-color\': color}"></div> </td> </tr> </table> ');
a.put("ngeo/scaleselector.html",'<div class="btn-group btn-block" ng-class="::{\'dropup\': scaleselectorCtrl.options.dropup}"> <button type=button class="btn btn-default dropdown-toggle" data-toggle=dropdown aria-expanded=false> <span ng-bind-html="scaleselectorCtrl.currentScale | ngeoScalify | ngeoTrustHtml"></span>&nbsp;<i class=caret></i> </button> <ul class="dropdown-menu btn-block" role=menu> <li ng-repeat="zoomLevel in ::scaleselectorCtrl.zoomLevels"> <a href ng-click=scaleselectorCtrl.changeZoom(zoomLevel) ng-bind-html="scaleselectorCtrl.getScale(zoomLevel) | ngeoScalify | ngeoTrustHtml"> </a> </li> </ul> </div> ');
a.put("ngeo/filter.html",'<div class=dropdown> <a class="btn btn-link dropdown-toggle ngeo-filter-condition-button" ng-class="{disabled: $ctrl.aRuleIsActive}" type=button data-toggle=dropdown ng-disabled=$ctrl.aRuleIsActive> <span class="fa fa-cog"></span> <span class=caret></span> </a> <ul class=dropdown-menu> <li class=ngeo-filter-condition-criteria-header translate>Criteria taken into account</li> <li ng-repeat="condition in ::$ctrl.conditions"> <a href ng-click=$ctrl.setCondition(condition)> <span ng-class="{\'ngeo-filter-condition-criteria-active\': condition.value == $ctrl.datasource.filterCondition}" class="fa fa-check ngeo-filter-condition-criteria"> </span> <span>{{::condition.text | translate}}</span> </a> </li> </ul> </div> <ngeo-rule ng-repeat="rule in $ctrl.directedRules" feature-overlay=::$ctrl.featureOverlay class=ngeo-filter-rule-directed map=$ctrl.map rule=rule tool-group=$ctrl.toolGroup> </ngeo-rule> <hr class=ngeo-filter-separator-rules> <div ng-repeat="rule in $ctrl.customRules"> <a class="btn btn-xs btn-link ngeo-filter-rule-custom-rm-btn" ng-click="!$ctrl.aRuleIsActive && $ctrl.removeCustomRule(rule)" ng-disabled=$ctrl.aRuleIsActive href> <span class="fa fa-remove"></span> </a> <ngeo-rule feature-overlay=::$ctrl.featureOverlay class=ngeo-filter-rule-custom map=$ctrl.map rule=rule tool-group=$ctrl.toolGroup> </ngeo-rule> </div> <div class=dropdown> <a class="btn btn-link dropdown-toggle" ng-class="{disabled: $ctrl.aRuleIsActive}" type=button data-toggle=dropdown ng-disabled=$ctrl.aRuleIsActive> <span translate>+ Add a new criteria</span> <span class=caret></span> </a> <ul class=dropdown-menu> <li ng-repeat="attribute in ::$ctrl.geometryAttributes"> <a href ng-click=$ctrl.createAndAddCustomRule(attribute)> <span translate>Spatial filter</span> </a> </li> <li role=presentation class=divider></li> <li ng-repeat="attribute in ::$ctrl.otherAttributes"> <a href ng-click=$ctrl.createAndAddCustomRule(attribute)> <span>{{::attribute.name | translate}}</span> </a> </li> </ul> </div> <hr class=ngeo-filter-separator-criteria> <a class="btn btn-link" type=button ng-click="!$ctrl.aRuleIsActive && $ctrl.apply()" ng-disabled=$ctrl.aRuleIsActive> <span class="fa fa-check"></span> <span translate>Apply filter</span> </a> <a class="btn btn-link" type=button ng-click="!$ctrl.aRuleIsActive && $ctrl.getData()" ng-disabled=$ctrl.aRuleIsActive> <span class="fa fa-chevron-right"></span> <span translate>Get data</span> </a> ');
a.put("ngeo/datepicker.html","<div class=ngeo-datepicker> <form name=dateForm class=ngeo-datepicker-form novalidate> <div ng-if=\"::datepickerCtrl.time.widget === 'datepicker'\"> <div class=ngeo-datepicker-start-date> <span ng-if=\"::datepickerCtrl.time.mode === 'range'\" translate>From:</span> <span ng-if=\"::datepickerCtrl.time.mode !== 'range'\" translate>Date:</span> <input name=sdate ui-date=datepickerCtrl.sdateOptions ng-model=datepickerCtrl.sdate required> </div> <div class=ngeo-datepicker-end-date ng-if=\"::datepickerCtrl.time.mode === 'range'\"> <span translate>To:</span> <input name=edate ui-date=datepickerCtrl.edateOptions ng-model=datepickerCtrl.edate required> </div> </div> </form> </div> ");
a.put("ngeo/layertree.html",'<span ng-if=::!layertreeCtrl.isRoot>{{::layertreeCtrl.node.name}}</span> <input type=checkbox ng-if="::layertreeCtrl.node && !layertreeCtrl.node.children" ng-model=layertreeCtrl.getSetActive ng-model-options="{getterSetter: true}"> <ul ng-if=::layertreeCtrl.node.children> <li ng-repeat="node in ::layertreeCtrl.node.children" ngeo-layertree=::node ngeo-layertree-notroot ngeo-layertree-map=layertreeCtrl.map ngeo-layertree-nodelayerexpr=layertreeCtrl.nodelayerExpr ngeo-layertree-listenersexpr=layertreeCtrl.listenersExpr> </li> </ul> ')}
a.$inject=["$templateCache"];W.run(a)})();function X(a){if(Error.captureStackTrace)Error.captureStackTrace(this,X);else{var b=Error().stack;b&&(this.stack=b)}a&&(this.message=String(a))}ea(X,Error);X.prototype.name="CustomError";function Ja(a,b){for(var c=a.split("%s"),d="",g=Array.prototype.slice.call(arguments,1);g.length&&1<c.length;)d+=c.shift()+g.shift();return d+c.join("%s")};function Ka(a,b){b.unshift(a);X.call(this,Ja.apply(null,b));b.shift()}ea(Ka,X);Ka.prototype.name="AssertionError";function La(a,b){throw new Ka("Failure"+(a?": "+a:""),Array.prototype.slice.call(arguments,1));};W.value("ngeoPopupTemplateUrl",function(a,b){a=b.ngeoPopupTemplateurl;return void 0!==a?a:"ngeo/popup.html"});function Ma(a){return{restrict:"A",templateUrl:a,link:function(a,c){c.addClass("popover");a.close=function(a){a&&(a.stopPropagation(),a.preventDefault());c.addClass("hidden")};a.$watch("open",function(a){c.css("display",a?"block":"none")})}}}Ma.$inject=["ngeoPopupTemplateUrl"];W.directive("ngeoPopup",Ma);function Y(a,b,c,d){var g=this;this.scope=b.$new(!0);this.scope.$watch(function(){return g.scope.open},function(a){!a&&g.u&&g.v(function(){g.destroy()})});this.b=c;this.v=d;this.a=angular.element("<div ngeo-popup></div>");this.u=!1;a(this.a)(this.scope);angular.element(document.body).append(this.a)}Y.prototype.sa=function(){return this.scope.open};Y.prototype.getOpen=Y.prototype.sa;Y.prototype.H=function(a){this.scope.open=a};Y.prototype.setOpen=Y.prototype.H;
Y.prototype.destroy=function(){this.scope.$destroy();this.a.remove()};Y.prototype.destroy=Y.prototype.destroy;Y.prototype.setTitle=function(a){a=this.b.trustAsHtml(a);this.scope.title=a};Y.prototype.setTitle=Y.prototype.setTitle;Y.prototype.setContent=function(a,b){this.scope.content=b?this.b.trustAsHtml(a):a};Y.prototype.setContent=Y.prototype.setContent;Y.prototype.setUrl=function(a){a=this.b.trustAsHtml('<iframe src="'+a+'" width="100%" height="100%"></iframe>');this.setContent(a)};
Y.prototype.setUrl=Y.prototype.setUrl;Y.prototype.N=function(a){this.a.width(a)};Y.prototype.setWidth=Y.prototype.N;Y.prototype.L=function(a){this.a.height(a)};Y.prototype.setHeight=Y.prototype.L;Y.prototype.ha=function(a,b){this.N(a);this.L(b)};Y.prototype.setSize=Y.prototype.ha;Y.prototype.G=function(a){this.u=a};Y.prototype.setAutoDestroy=Y.prototype.G;Y.prototype.addClass=function(a){this.a.addClass(a)};Y.prototype.addClass=Y.prototype.addClass;
Y.prototype.open=function(a){a.url?this.setUrl(a.url):a.content?this.setContent(a.content):La('ngeo.Popup options requirest "url" or "content".');void 0!==a.autoDestroy&&this.G(a.autoDestroy);void 0!==a.cls&&this.addClass(a.cls);void 0!==a.height&&this.L(a.height);void 0!==a.title&&this.setTitle(a.title);void 0!==a.width&&this.N(a.width);this.H(!0)};Y.prototype.open=Y.prototype.open;function Na(a,b,c,d){return function(){return new Y(a,b,c,d)}}Na.$inject=["$compile","$rootScope","$sce","$timeout"];
W.factory("ngeoCreatePopup",Na);var Oa=angular.module("app",["ngeo"]);function Z(a,b){this.b=a;this.a=b;$('[data-toggle="tooltip"]').tooltip({container:"body",trigger:"hover"})}Z.$inject=["$sce","ngeoCreatePopup"];Z.prototype.Ba=function(){var a=this.a();a.G(!0);a.setTitle("Simple popup");var b=this.b.trustAsHtml("This is a simple 400x300 px popup.");a.setContent(b);a.N("400px");a.L("300px");a.H(!0)};Z.prototype.simplePopup=Z.prototype.Ba;
Z.prototype.ua=function(){var a=this.a();a.G(!0);a.addClass("popup-with-iframe");a.setTitle("Iframe popup");a.setUrl("http://geomapfish.org/");a.ha("400px","300px");a.H(!0)};Z.prototype.iframePopup=Z.prototype.ua;
Z.prototype.ta=function(){var a=this.a();a.G(!0);a.setTitle("This is a popup with lots and lots of content and a very long title");var b=this.b.trustAsHtml("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla egetquam at ex euismod bibendum et eget enim. Nulla sodales tortor acsagittis aliquet. Ut malesuada quam vitae pulvinar porta. Nunc idmagna id risus malesuada elementum eget id purus. Curabitur vel augueblandit, faucibus nulla quis, consequat tellus. Phasellus commodo,tellus et vulputate ultricies, nulla libero ornare arcu, quisfermentum sem diam quis tellus. Aliquam ut sapien tristique, laciniaante et, lacinia arcu. Quisque sagittis eros at quam blanditgravida. Nulla sit amet enim semper, efficitur eros sit amet,porttitor libero. Fusce quis tellus est. Quisque ornare, ex egetluctus pharetra, nisl leo lobortis purus, sed tristique neque leo egetodio. Maecenas lobortis nisl ac magna mollis, ac pulvinar risusconvallis. Donec ullamcorper sollicitudin maximus. Quisque bibendumelit sit amet ultrices ornare. Donec aliquam felis id urna ultricesscelerisque.");a.setContent(b);
a.H(!0)};Z.prototype.heavyPopup=Z.prototype.ta;Z.prototype.xa=function(){var a=this.a(),b=this.b.trustAsHtml("This popup was opened using the <code>open</code> method.");a.open({autoDestroy:!0,content:b,height:"200px",title:'Opened with "open"',width:"300px"})};Z.prototype.openPopupWithContent=Z.prototype.xa;Z.prototype.ya=function(){this.a().open({autoDestroy:!0,cls:"popup-with-iframe",height:"300px",title:'Opened with "open" and "iframe"',url:"http://geomapfish.org/",width:"400px"})};
Z.prototype.openPopupWithUrl=Z.prototype.ya;Oa.controller("MainController",Z);}).call(window);
//# sourceMappingURL=popupservice.js.map
