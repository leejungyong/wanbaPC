(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-377ca714"],{"3b8d":function(t,e,n){"use strict";n.d(e,"a",function(){return a});var r=n("795b"),o=n.n(r);function i(t,e,n,r,i,a,c){try{var s=t[a](c),u=s.value}catch(h){return void n(h)}s.done?e(u):o.a.resolve(u).then(r,i)}function a(t){return function(){var e=this,n=arguments;return new o.a(function(r,o){var a=t.apply(e,n);function c(t){i(a,r,o,c,s,"next",t)}function s(t){i(a,r,o,c,s,"throw",t)}c(void 0)})}}},"96cf":function(t,e){!function(e){"use strict";var n,r=Object.prototype,o=r.hasOwnProperty,i="function"===typeof Symbol?Symbol:{},a=i.iterator||"@@iterator",c=i.asyncIterator||"@@asyncIterator",s=i.toStringTag||"@@toStringTag",u="object"===typeof t,h=e.regeneratorRuntime;if(h)u&&(t.exports=h);else{h=e.regeneratorRuntime=u?t.exports:{},h.wrap=L;var l="suspendedStart",f="suspendedYield",p="executing",d="completed",v={},y={};y[a]=function(){return this};var g=Object.getPrototypeOf,m=g&&g(g(G([])));m&&m!==r&&o.call(m,a)&&(y=m);var w=P.prototype=b.prototype=Object.create(y);E.prototype=w.constructor=P,P.constructor=E,P[s]=E.displayName="GeneratorFunction",h.isGeneratorFunction=function(t){var e="function"===typeof t&&t.constructor;return!!e&&(e===E||"GeneratorFunction"===(e.displayName||e.name))},h.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,P):(t.__proto__=P,s in t||(t[s]="GeneratorFunction")),t.prototype=Object.create(w),t},h.awrap=function(t){return{__await:t}},_(k.prototype),k.prototype[c]=function(){return this},h.AsyncIterator=k,h.async=function(t,e,n,r){var o=new k(L(t,e,n,r));return h.isGeneratorFunction(e)?o:o.next().then(function(t){return t.done?t.value:o.next()})},_(w),w[s]="Generator",w[a]=function(){return this},w.toString=function(){return"[object Generator]"},h.keys=function(t){var e=[];for(var n in t)e.push(n);return e.reverse(),function n(){while(e.length){var r=e.pop();if(r in t)return n.value=r,n.done=!1,n}return n.done=!0,n}},h.values=G,S.prototype={constructor:S,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=n,this.done=!1,this.delegate=null,this.method="next",this.arg=n,this.tryEntries.forEach(T),!t)for(var e in this)"t"===e.charAt(0)&&o.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=n)},stop:function(){this.done=!0;var t=this.tryEntries[0],e=t.completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function r(r,o){return c.type="throw",c.arg=t,e.next=r,o&&(e.method="next",e.arg=n),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],c=a.completion;if("root"===a.tryLoc)return r("end");if(a.tryLoc<=this.prev){var s=o.call(a,"catchLoc"),u=o.call(a,"finallyLoc");if(s&&u){if(this.prev<a.catchLoc)return r(a.catchLoc,!0);if(this.prev<a.finallyLoc)return r(a.finallyLoc)}else if(s){if(this.prev<a.catchLoc)return r(a.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return r(a.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var r=this.tryEntries[n];if(r.tryLoc<=this.prev&&o.call(r,"finallyLoc")&&this.prev<r.finallyLoc){var i=r;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,v):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),v},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),T(n),v}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var o=r.arg;T(n)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:G(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=n),v}}}function L(t,e,n,r){var o=e&&e.prototype instanceof b?e:b,i=Object.create(o.prototype),a=new S(r||[]);return i._invoke=q(t,n,a),i}function x(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(r){return{type:"throw",arg:r}}}function b(){}function E(){}function P(){}function _(t){["next","throw","return"].forEach(function(e){t[e]=function(t){return this._invoke(e,t)}})}function k(t){function e(n,r,i,a){var c=x(t[n],t,r);if("throw"!==c.type){var s=c.arg,u=s.value;return u&&"object"===typeof u&&o.call(u,"__await")?Promise.resolve(u.__await).then(function(t){e("next",t,i,a)},function(t){e("throw",t,i,a)}):Promise.resolve(u).then(function(t){s.value=t,i(s)},a)}a(c.arg)}var n;function r(t,r){function o(){return new Promise(function(n,o){e(t,r,n,o)})}return n=n?n.then(o,o):o()}this._invoke=r}function q(t,e,n){var r=l;return function(o,i){if(r===p)throw new Error("Generator is already running");if(r===d){if("throw"===o)throw i;return N()}n.method=o,n.arg=i;while(1){var a=n.delegate;if(a){var c=O(a,n);if(c){if(c===v)continue;return c}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(r===l)throw r=d,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r=p;var s=x(t,e,n);if("normal"===s.type){if(r=n.done?d:f,s.arg===v)continue;return{value:s.arg,done:n.done}}"throw"===s.type&&(r=d,n.method="throw",n.arg=s.arg)}}}function O(t,e){var r=t.iterator[e.method];if(r===n){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=n,O(t,e),"throw"===e.method))return v;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return v}var o=x(r,t.iterator,e.arg);if("throw"===o.type)return e.method="throw",e.arg=o.arg,e.delegate=null,v;var i=o.arg;return i?i.done?(e[t.resultName]=i.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=n),e.delegate=null,v):i:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,v)}function j(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function T(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function S(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(j,this),this.reset(!0)}function G(t){if(t){var e=t[a];if(e)return e.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var r=-1,i=function e(){while(++r<t.length)if(o.call(t,r))return e.value=t[r],e.done=!1,e;return e.value=n,e.done=!0,e};return i.next=i}}return{next:N}}function N(){return{value:n,done:!0}}}(function(){return this}()||Function("return this")())},e2f4:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"poialter"}},[n("div",{staticStyle:{"text-align":"right"}},[n("Button",{attrs:{type:"primary"},on:{click:t.save}},[t._v("保存")]),n("Button",{staticStyle:{"margin-left":"10px"},on:{click:t.cancel}},[t._v("取消")])],1),n("div",{staticStyle:{width:"100%",height:"500px","margin-top":"10px"},attrs:{id:"container"}})])},o=[],i=(n("96cf"),n("3b8d")),a=(n("7f7f"),n("28a5"),n("795b")),c=n.n(a),s=n("cebc"),u=n("69d9"),h=n("bc3a"),l=n.n(h),f=(n("1c46"),n("2f62")),p={data:function(){return{aid:"",poiList:[],makersArray:[],newPoiList:[]}},created:function(){},mounted:function(){this.aid=this.$route.params.aid,this.init()},methods:Object(s["a"])({},Object(f["d"])(["closeTag"]),{fetchData:function(){var t=this;return new c.a(function(e,n){l.a.post(u["serverUrl"]+"/api/pcindex.php?act=getRoutePoiList",{aid:t.aid}).then(function(n){console.log(n.data),t.poiList=n.data;var r=n.data;e(r)})})},initMap:function(){var t=this,e=t.poiList[4].latlng.split(","),n=new qq.maps.LatLng(e[0],e[1]),r={zoom:17,center:n,mapTypeId:qq.maps.MapTypeId.ROADMAP},o=new qq.maps.Map(document.getElementById("container"),r),i=t.poiList.map(function(e){var n=e.latlng.split(","),r=n[0],i=n[1],a=new qq.maps.Marker({position:new qq.maps.LatLng(r,i),map:o,draggable:!0,data:e.name}),c=new qq.maps.InfoWindow({map:o});return c.open(),c.setContent("<div style=\"text-align:center;white-space:nowrap;' +\n                    'margin:10px;\">".concat(e.displayorder+".").concat(e.name,"</div>")),c.setPosition(a.getPosition()),qq.maps.event.addListener(a,"dragend",function(){var t=a.getPosition(),n=t.lat,r=t.lng;e.latlng=n+","+r,c.open(),c.setContent("<div style=\"text-align:center;white-space:nowrap;' +\n                    'margin:10px;\">".concat(e.displayorder+".").concat(e.name,"</div>")),c.setPosition(t)}),qq.maps.event.addListener(a,"click",function(){c.open(),c.setContent("<div style=\"text-align:center;white-space:nowrap;' +\n                    'margin:10px;\">".concat(e.displayorder+".").concat(e.name,"</div>")),c.setPosition(a.getPosition())}),t.makersArray.push(a),e});t.newPoiList=i},init:function(){var t=Object(i["a"])(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.fetchData();case 2:this.initMap();case 3:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),save:function(){var t=this,e=this;l.a.post(u["serverUrl"]+"/api/pcindex.php?act=updateRoutePoiList",{aid:e.aid,poiList:e.newPoiList}).then(function(e){console.log(e.data),e.data.status&&(t.$Message.success("修改成功！"),t.closeTag(t.$route))})},cancel:function(){this.closeTag(this.$route)}})},d=p,v=n("2877"),y=Object(v["a"])(d,r,o,!1,null,null,null);e["default"]=y.exports}}]);