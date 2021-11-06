(self.webpackChunkuiuc_mcs_org=self.webpackChunkuiuc_mcs_org||[]).push([[409],{5409:(ke,ee,A)=>{"use strict";A.r(ee);var P,u=A(4762),U=A(417),x=A(8391),y=A(8305),G=A(4995),F="0.4.32",D="w:"+F,L="FIS_v2",te=((P={})["missing-app-config-values"]='Missing App configuration value: "{$valueName}"',P["not-registered"]="Firebase Installation is not registered.",P["installation-not-found"]="Firebase Installation not found.",P["request-failed"]='{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',P["app-offline"]="Could not process request. Application offline.",P["delete-pending-registration"]="Can't delete installation while there is a pending registration request.",P),l=new y.LL("installations","Installations",te);function d(e){return e instanceof y.ZR&&e.code.includes("request-failed")}function p(e){return"https://firebaseinstallations.googleapis.com/v1/projects/"+e.projectId+"/installations"}function m(e){return{token:e.token,requestStatus:2,expiresIn:Oe(e.expiresIn),creationTime:Date.now()}}function h(e,t){return(0,u.mG)(this,void 0,void 0,function(){var r,n;return(0,u.Jh)(this,function(i){switch(i.label){case 0:return[4,t.json()];case 1:return r=i.sent(),[2,l.create("request-failed",{requestName:e,serverCode:(n=r.error).code,serverMessage:n.message,serverStatus:n.status})]}})})}function C(e){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e.apiKey})}function M(e,t){var r=t.refreshToken,n=C(e);return n.append("Authorization",function(e){return L+" "+e}(r)),n}function re(e){return(0,u.mG)(this,void 0,void 0,function(){var t;return(0,u.Jh)(this,function(r){switch(r.label){case 0:return[4,e()];case 1:return(t=r.sent()).status>=500&&t.status<600?[2,e()]:[2,t]}})})}function Oe(e){return Number(e.replace("s","000"))}function Pe(e,t){var r=t.fid;return(0,u.mG)(this,void 0,void 0,function(){var n,i,a,o,c;return(0,u.Jh)(this,function(v){switch(v.label){case 0:return n=p(e),i=C(e),a={method:"POST",headers:i,body:JSON.stringify({fid:r,authVersion:L,appId:e.appId,sdkVersion:D})},[4,re(function(){return fetch(n,a)})];case 1:return(o=v.sent()).ok?[4,o.json()]:[3,3];case 2:return[2,{fid:(c=v.sent()).fid||r,registrationStatus:2,refreshToken:c.refreshToken,authToken:m(c.authToken)}];case 3:return[4,h("Create Installation",o)];case 4:throw v.sent()}})})}function fe(e){return new Promise(function(t){setTimeout(t,e)})}var Ge=/^[cdef][\w-]{21}$/;function Le(){try{var e=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(e),e[0]=112+e[0]%16;var r=function(e){return function(e){return btoa(String.fromCharCode.apply(String,(0,u.ev)([],(0,u.CR)(e)))).replace(/\+/g,"-").replace(/\//g,"_")}(e).substr(0,22)}(e);return Ge.test(r)?r:""}catch(n){return""}}function J(e){return e.appName+"!"+e.appId}var B=new Map;function de(e,t){var r=J(e);he(r,t),function(e,t){var r=pe();r&&r.postMessage({key:e,fid:t}),ve()}(r,t)}function he(e,t){var r,n,i=B.get(e);if(i)try{for(var s=(0,u.XA)(i),a=s.next();!a.done;a=s.next())(0,a.value)(t)}catch(c){r={error:c}}finally{try{a&&!a.done&&(n=s.return)&&n.call(s)}finally{if(r)throw r.error}}}var N=null;function pe(){return!N&&"BroadcastChannel"in self&&((N=new BroadcastChannel("[Firebase] FID Change")).onmessage=function(e){he(e.data.key,e.data.fid)}),N}function ve(){0===B.size&&N&&(N.close(),N=null)}var e,q="firebase-installations-store",ie=null;function se(){return ie||(ie=(0,G.openDb)("firebase-installations-database",1,function(e){0===e.oldVersion&&e.createObjectStore(q)})),ie}function Y(e,t){return(0,u.mG)(this,void 0,void 0,function(){var r,n,i,s,a;return(0,u.Jh)(this,function(o){switch(o.label){case 0:return r=J(e),[4,se()];case 1:return n=o.sent(),i=n.transaction(q,"readwrite"),[4,(s=i.objectStore(q)).get(r)];case 2:return a=o.sent(),[4,s.put(t,r)];case 3:return o.sent(),[4,i.complete];case 4:return o.sent(),(!a||a.fid!==t.fid)&&de(e,t.fid),[2,t]}})})}function ae(e){return(0,u.mG)(this,void 0,void 0,function(){var t,r,n;return(0,u.Jh)(this,function(i){switch(i.label){case 0:return t=J(e),[4,se()];case 1:return r=i.sent(),[4,(n=r.transaction(q,"readwrite")).objectStore(q).delete(t)];case 2:return i.sent(),[4,n.complete];case 3:return i.sent(),[2]}})})}function W(e,t){return(0,u.mG)(this,void 0,void 0,function(){var r,n,i,s,a,o;return(0,u.Jh)(this,function(c){switch(c.label){case 0:return r=J(e),[4,se()];case 1:return n=c.sent(),i=n.transaction(q,"readwrite"),[4,(s=i.objectStore(q)).get(r)];case 2:return a=c.sent(),void 0!==(o=t(a))?[3,4]:[4,s.delete(r)];case 3:return c.sent(),[3,6];case 4:return[4,s.put(o,r)];case 5:c.sent(),c.label=6;case 6:return[4,i.complete];case 7:return c.sent(),o&&(!a||a.fid!==o.fid)&&de(e,o.fid),[2,o]}})})}function oe(e){return(0,u.mG)(this,void 0,void 0,function(){var t,r,n;return(0,u.Jh)(this,function(i){switch(i.label){case 0:return[4,W(e,function(s){var a=function(e){return ge(e||{fid:Le(),registrationStatus:0})}(s),o=function(e,t){if(0===t.registrationStatus){if(!navigator.onLine)return{installationEntry:t,registrationPromise:Promise.reject(l.create("app-offline"))};var n={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},i=function(e,t){return(0,u.mG)(this,void 0,void 0,function(){var r,n;return(0,u.Jh)(this,function(i){switch(i.label){case 0:return i.trys.push([0,2,,7]),[4,Pe(e,t)];case 1:return r=i.sent(),[2,Y(e,r)];case 2:return d(n=i.sent())&&409===n.customData.serverCode?[4,ae(e)]:[3,4];case 3:return i.sent(),[3,6];case 4:return[4,Y(e,{fid:t.fid,registrationStatus:0})];case 5:i.sent(),i.label=6;case 6:throw n;case 7:return[2]}})})}(e,n);return{installationEntry:n,registrationPromise:i}}return 1===t.registrationStatus?{installationEntry:t,registrationPromise:Ue(e)}:{installationEntry:t}}(e,a);return t=o.registrationPromise,o.installationEntry})];case 1:return""!==(r=i.sent()).fid?[3,3]:(n={},[4,t]);case 2:return[2,(n.installationEntry=i.sent(),n)];case 3:return[2,{installationEntry:r,registrationPromise:t}]}})})}function Ue(e){return(0,u.mG)(this,void 0,void 0,function(){var t,r,n,i;return(0,u.Jh)(this,function(s){switch(s.label){case 0:return[4,me(e)];case 1:t=s.sent(),s.label=2;case 2:return 1!==t.registrationStatus?[3,5]:[4,fe(100)];case 3:return s.sent(),[4,me(e)];case 4:return t=s.sent(),[3,2];case 5:return 0!==t.registrationStatus?[3,7]:[4,oe(e)];case 6:return r=s.sent(),n=r.installationEntry,(i=r.registrationPromise)?[2,i]:[2,n];case 7:return[2,t]}})})}function me(e){return W(e,function(t){if(!t)throw l.create("installation-not-found");return ge(t)})}function ge(e){return function(e){return 1===e.registrationStatus&&e.registrationTime+1e4<Date.now()}(e)?{fid:e.fid,registrationStatus:0}:e}function He(e,t){var r=e.appConfig,n=e.platformLoggerProvider;return(0,u.mG)(this,void 0,void 0,function(){var i,s,a,c,f;return(0,u.Jh)(this,function(b){switch(b.label){case 0:return i=function(e,t){var r=t.fid;return p(e)+"/"+r+"/authTokens:generate"}(r,t),s=M(r,t),(a=n.getImmediate({optional:!0}))&&s.append("x-firebase-client",a.getPlatformInfoString()),c={method:"POST",headers:s,body:JSON.stringify({installation:{sdkVersion:D}})},[4,re(function(){return fetch(i,c)})];case 1:return(f=b.sent()).ok?[4,f.json()]:[3,3];case 2:return[2,m(b.sent())];case 3:return[4,h("Generate Auth Token",f)];case 4:throw b.sent()}})})}function ue(e,t){return void 0===t&&(t=!1),(0,u.mG)(this,void 0,void 0,function(){var r,n,s;return(0,u.Jh)(this,function(a){switch(a.label){case 0:return[4,W(e.appConfig,function(o){if(!ye(o))throw l.create("not-registered");var c=o.authToken;if(!t&&function(e){return 2===e.requestStatus&&!function(e){var t=Date.now();return t<e.creationTime||e.creationTime+e.expiresIn<t+36e5}(e)}(c))return o;if(1===c.requestStatus)return r=function(e,t){return(0,u.mG)(this,void 0,void 0,function(){var r,n;return(0,u.Jh)(this,function(i){switch(i.label){case 0:return[4,Ie(e.appConfig)];case 1:r=i.sent(),i.label=2;case 2:return 1!==r.authToken.requestStatus?[3,5]:[4,fe(100)];case 3:return i.sent(),[4,Ie(e.appConfig)];case 4:return r=i.sent(),[3,2];case 5:return 0===(n=r.authToken).requestStatus?[2,ue(e,t)]:[2,n]}})})}(e,t),o;if(!navigator.onLine)throw l.create("app-offline");var f=function(e){var t={requestStatus:1,requestTime:Date.now()};return(0,u.pi)((0,u.pi)({},e),{authToken:t})}(o);return r=function(e,t){return(0,u.mG)(this,void 0,void 0,function(){var r,i,n;return(0,u.Jh)(this,function(s){switch(s.label){case 0:return s.trys.push([0,3,,8]),[4,He(e,t)];case 1:return r=s.sent(),n=(0,u.pi)((0,u.pi)({},t),{authToken:r}),[4,Y(e.appConfig,n)];case 2:return s.sent(),[2,r];case 3:return!d(i=s.sent())||401!==i.customData.serverCode&&404!==i.customData.serverCode?[3,5]:[4,ae(e.appConfig)];case 4:return s.sent(),[3,7];case 5:return n=(0,u.pi)((0,u.pi)({},t),{authToken:{requestStatus:0}}),[4,Y(e.appConfig,n)];case 6:s.sent(),s.label=7;case 7:throw i;case 8:return[2]}})})}(e,f),f})];case 1:return n=a.sent(),r?[4,r]:[3,3];case 2:return s=a.sent(),[3,4];case 3:s=n.authToken,a.label=4;case 4:return[2,s]}})})}function Ie(e){return W(e,function(t){if(!ye(t))throw l.create("not-registered");return function(e){return 1===e.requestStatus&&e.requestTime+1e4<Date.now()}(t.authToken)?(0,u.pi)((0,u.pi)({},t),{authToken:{requestStatus:0}}):t})}function ye(e){return void 0!==e&&2===e.registrationStatus}function rt(e){return(0,u.mG)(this,void 0,void 0,function(){var t;return(0,u.Jh)(this,function(r){switch(r.label){case 0:return[4,oe(e)];case 1:return(t=r.sent().registrationPromise)?[4,t]:[3,3];case 2:r.sent(),r.label=3;case 3:return[2]}})})}function nt(e,t){return(0,u.mG)(this,void 0,void 0,function(){var r,n,i,s;return(0,u.Jh)(this,function(a){switch(a.label){case 0:return r=function(e,t){var r=t.fid;return p(e)+"/"+r}(e,t),n=M(e,t),i={method:"DELETE",headers:n},[4,re(function(){return fetch(r,i)})];case 1:return(s=a.sent()).ok?[3,3]:[4,h("Delete Installation",s)];case 2:throw a.sent();case 3:return[2]}})})}function ce(e){return l.create("missing-app-config-values",{valueName:e})}(e=U.Z).INTERNAL.registerComponent(new x.wA("installations",function(r){var n=r.getProvider("app").getImmediate(),i=function(e){var t,r;if(!e||!e.options)throw ce("App Configuration");if(!e.name)throw ce("App Name");try{for(var i=(0,u.XA)(["projectId","apiKey","appId"]),s=i.next();!s.done;s=i.next()){var a=s.value;if(!e.options[a])throw ce(a)}}catch(o){t={error:o}}finally{try{s&&!s.done&&(r=i.return)&&r.call(i)}finally{if(t)throw t.error}}return{appName:e.name,projectId:e.options.projectId,apiKey:e.options.apiKey,appId:e.options.appId}}(n),a={appConfig:i,platformLoggerProvider:r.getProvider("platform-logger")},o={app:n,getId:function(){return function(e){return(0,u.mG)(this,void 0,void 0,function(){var t,r,n;return(0,u.Jh)(this,function(i){switch(i.label){case 0:return[4,oe(e.appConfig)];case 1:return t=i.sent(),r=t.installationEntry,(n=t.registrationPromise)?n.catch(console.error):ue(e).catch(console.error),[2,r.fid]}})})}(a)},getToken:function(c){return function(e,t){return void 0===t&&(t=!1),(0,u.mG)(this,void 0,void 0,function(){return(0,u.Jh)(this,function(n){switch(n.label){case 0:return[4,rt(e.appConfig)];case 1:return n.sent(),[4,ue(e,t)];case 2:return[2,n.sent().token]}})})}(a,c)},delete:function(){return function(e){return(0,u.mG)(this,void 0,void 0,function(){var t,r;return(0,u.Jh)(this,function(n){switch(n.label){case 0:return[4,W(t=e.appConfig,function(i){if(!i||0!==i.registrationStatus)return i})];case 1:if(!(r=n.sent()))return[3,6];if(1!==r.registrationStatus)return[3,2];throw l.create("delete-pending-registration");case 2:if(2!==r.registrationStatus)return[3,6];if(navigator.onLine)return[3,3];throw l.create("app-offline");case 3:return[4,nt(t,r)];case 4:return n.sent(),[4,ae(t)];case 5:n.sent(),n.label=6;case 6:return[2]}})})}(a)},onIdChange:function(c){return function(e,t){var r=e.appConfig;return function(e,t){pe();var r=J(e),n=B.get(r);n||(n=new Set,B.set(r,n)),n.add(t)}(r,t),function(){!function(e,t){var r=J(e),n=B.get(r);!n||(n.delete(t),0===n.size&&B.delete(r),ve())}(r,t)}}(a,c)}};return o},"PUBLIC")),e.registerVersion("@firebase/installations",F);var ct=A(6433),we="https://www.googletagmanager.com/gtag/js",g=(()=>(function(e){e.EVENT="event",e.SET="set",e.CONFIG="config"}(g||(g={})),g))(),X=(()=>(function(e){e.ADD_SHIPPING_INFO="add_shipping_info",e.ADD_PAYMENT_INFO="add_payment_info",e.ADD_TO_CART="add_to_cart",e.ADD_TO_WISHLIST="add_to_wishlist",e.BEGIN_CHECKOUT="begin_checkout",e.CHECKOUT_PROGRESS="checkout_progress",e.EXCEPTION="exception",e.GENERATE_LEAD="generate_lead",e.LOGIN="login",e.PAGE_VIEW="page_view",e.PURCHASE="purchase",e.REFUND="refund",e.REMOVE_FROM_CART="remove_from_cart",e.SCREEN_VIEW="screen_view",e.SEARCH="search",e.SELECT_CONTENT="select_content",e.SELECT_ITEM="select_item",e.SELECT_PROMOTION="select_promotion",e.SET_CHECKOUT_OPTION="set_checkout_option",e.SHARE="share",e.SIGN_UP="sign_up",e.TIMING_COMPLETE="timing_complete",e.VIEW_CART="view_cart",e.VIEW_ITEM="view_item",e.VIEW_ITEM_LIST="view_item_list",e.VIEW_PROMOTION="view_promotion",e.VIEW_SEARCH_RESULTS="view_search_results"}(X||(X={})),X))(),I=new ct.Yd("@firebase/analytics");function bt(e,t,r,n,i,s){return(0,u.mG)(this,void 0,void 0,function(){var a,o,c,f;return(0,u.Jh)(this,function(v){switch(v.label){case 0:a=n[i],v.label=1;case 1:return v.trys.push([1,7,,8]),a?[4,t[a]]:[3,3];case 2:return v.sent(),[3,6];case 3:return[4,Promise.all(r)];case 4:return o=v.sent(),(c=o.find(function(w){return w.measurementId===i}))?[4,t[c.appId]]:[3,6];case 5:v.sent(),v.label=6;case 6:return[3,8];case 7:return f=v.sent(),I.error(f),[3,8];case 8:return e(g.CONFIG,i,s),[2]}})})}function Tt(e,t,r,n,i){return(0,u.mG)(this,void 0,void 0,function(){var s,a,o,c,f,v,S;return(0,u.Jh)(this,function(T){switch(T.label){case 0:return T.trys.push([0,4,,5]),s=[],i&&i.send_to?(a=i.send_to,Array.isArray(a)||(a=[a]),[4,Promise.all(r)]):[3,2];case 1:for(o=T.sent(),c=function(Kt){var Ee=o.find(function(Ht){return Ht.measurementId===Kt}),Re=Ee&&t[Ee.appId];if(!Re)return s=[],"break";s.push(Re)},f=0,v=a;f<v.length&&"break"!==c(v[f]);f++);T.label=2;case 2:return 0===s.length&&(s=Object.values(t)),[4,Promise.all(s)];case 3:return T.sent(),e(g.EVENT,n,i||{}),[3,5];case 4:return S=T.sent(),I.error(S),[3,5];case 5:return[2]}})})}var k,Et=((k={})["already-exists"]="A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.",k["already-initialized"]="Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.",k["interop-component-reg-failed"]="Firebase Analytics Interop Component failed to instantiate: {$reason}",k["invalid-analytics-context"]="Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}",k["indexeddb-unavailable"]="IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}",k["fetch-throttle"]="The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.",k["config-fetch-failed"]="Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}",k["no-api-key"]='The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',k["no-app-id"]='The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',k),R=new y.LL("analytics","Analytics",Et),Ot=function(){function e(t,r){void 0===t&&(t={}),void 0===r&&(r=1e3),this.throttleMetadata=t,this.intervalMillis=r}return e.prototype.getThrottleMetadata=function(t){return this.throttleMetadata[t]},e.prototype.setThrottleMetadata=function(t,r){this.throttleMetadata[t]=r},e.prototype.deleteThrottleMetadata=function(t){delete this.throttleMetadata[t]},e}(),be=new Ot;function Dt(e){return new Headers({Accept:"application/json","x-goog-api-key":e})}function Pt(e){var t;return(0,u.mG)(this,void 0,void 0,function(){var r,i,s,a,o,c;return(0,u.Jh)(this,function(f){switch(f.label){case 0:return r=e.appId,i={method:"GET",headers:Dt(e.apiKey)},s="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig".replace("{app-id}",r),[4,fetch(s,i)];case 1:if(200===(a=f.sent()).status||304===a.status)return[3,6];o="",f.label=2;case 2:return f.trys.push([2,4,,5]),[4,a.json()];case 3:return c=f.sent(),(null===(t=c.error)||void 0===t?void 0:t.message)&&(o=c.error.message),[3,5];case 4:return f.sent(),[3,5];case 5:throw R.create("config-fetch-failed",{httpStatus:a.status,responseMessage:o});case 6:return[2,a.json()]}})})}function Te(e,t,r,n){var i=t.throttleEndTimeMillis,s=t.backoffCount;return void 0===n&&(n=be),(0,u.mG)(this,void 0,void 0,function(){var a,o,c,f,v,w,b;return(0,u.Jh)(this,function(S){switch(S.label){case 0:a=e.appId,o=e.measurementId,S.label=1;case 1:return S.trys.push([1,3,,4]),[4,Gt(r,i)];case 2:return S.sent(),[3,4];case 3:if(c=S.sent(),o)return I.warn("Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID "+o+' provided in the "measurementId" field in the local Firebase config. ['+c.message+"]"),[2,{appId:a,measurementId:o}];throw c;case 4:return S.trys.push([4,6,,7]),[4,Pt(e)];case 5:return f=S.sent(),n.deleteThrottleMetadata(a),[2,f];case 6:if(!function(e){if(!(e instanceof y.ZR&&e.customData))return!1;var t=Number(e.customData.httpStatus);return 429===t||500===t||503===t||504===t}(v=S.sent())){if(n.deleteThrottleMetadata(a),o)return I.warn("Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID "+o+' provided in the "measurementId" field in the local Firebase config. ['+v.message+"]"),[2,{appId:a,measurementId:o}];throw v}return w=503===Number(v.customData.httpStatus)?(0,y.$s)(s,n.intervalMillis,30):(0,y.$s)(s,n.intervalMillis),b={throttleEndTimeMillis:Date.now()+w,backoffCount:s+1},n.setThrottleMetadata(a,b),I.debug("Calling attemptFetch again in "+w+" millis"),[2,Te(e,b,r,n)];case 7:return[2]}})})}function Gt(e,t){return new Promise(function(r,n){var i=Math.max(t-Date.now(),0),s=setTimeout(r,i);e.addEventListener(function(){clearTimeout(s),n(R.create("fetch-throttle",{throttleEndTimeMillis:t}))})})}var Mt=function(){function e(){this.listeners=[]}return e.prototype.addEventListener=function(t){this.listeners.push(t)},e.prototype.abort=function(){this.listeners.forEach(function(t){return t()})},e}();var Se,z,O={},Z=[],Ce={},$="dataLayer",le="gtag",Q=!1;function Nt(e){if(Q)throw R.create("already-initialized");e.dataLayerName&&($=e.dataLayerName),e.gtagName&&(le=e.gtagName)}function jt(e,t){!function(){var e=[];if((0,y.ru)()&&e.push("This is a browser extension environment."),(0,y.zI)()||e.push("Cookies are not available."),e.length>0){var t=e.map(function(n,i){return"("+(i+1)+") "+n}).join(" "),r=R.create("invalid-analytics-context",{errorInfo:t});I.warn(r.message)}}();var r=e.options.appId;if(!r)throw R.create("no-app-id");if(!e.options.apiKey){if(!e.options.measurementId)throw R.create("no-api-key");I.warn('The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID '+e.options.measurementId+' provided in the "measurementId" field in the local Firebase config.')}if(null!=O[r])throw R.create("already-exists",{id:r});if(!Q){!function(e){var t=[];Array.isArray(window[e])?t=window[e]:window[e]=t}($);var n=function(e,t,r,n,i){var s=function(){for(var a=[],o=0;o<arguments.length;o++)a[o]=arguments[o];window[n].push(arguments)};return window[i]&&"function"==typeof window[i]&&(s=window[i]),window[i]=function(e,t,r,n){return function(s,a,o){return(0,u.mG)(this,void 0,void 0,function(){var c;return(0,u.Jh)(this,function(f){switch(f.label){case 0:return f.trys.push([0,6,,7]),s!==g.EVENT?[3,2]:[4,Tt(e,t,r,a,o)];case 1:return f.sent(),[3,5];case 2:return s!==g.CONFIG?[3,4]:[4,bt(e,t,r,n,a,o)];case 3:return f.sent(),[3,5];case 4:e(g.SET,a),f.label=5;case 5:return[3,7];case 6:return c=f.sent(),I.error(c),[3,7];case 7:return[2]}})})}}(s,e,t,r),{gtagCore:s,wrappedGtag:window[i]}}(O,Z,Ce,$,le);z=n.wrappedGtag,Se=n.gtagCore,Q=!0}O[r]=function(e,t,r,n,i,s){return(0,u.mG)(this,void 0,void 0,function(){var a,o,c,f,v,w,b;return(0,u.Jh)(this,function(S){switch(S.label){case 0:return a=function(e,t,r){return void 0===t&&(t=be),(0,u.mG)(this,void 0,void 0,function(){var n,i,s,a,o,c,f=this;return(0,u.Jh)(this,function(v){if(s=(n=e.options).apiKey,a=n.measurementId,!(i=n.appId))throw R.create("no-app-id");if(!s){if(a)return[2,{measurementId:a,appId:i}];throw R.create("no-api-key")}return o=t.getThrottleMetadata(i)||{backoffCount:0,throttleEndTimeMillis:Date.now()},c=new Mt,setTimeout(function(){return(0,u.mG)(f,void 0,void 0,function(){return(0,u.Jh)(this,function(w){return c.abort(),[2]})})},6e4),[2,Te({appId:i,apiKey:s,measurementId:a},o,c,t)]})})}(e),a.then(function(T){r[T.measurementId]=T.appId,e.options.measurementId&&T.measurementId!==e.options.measurementId&&I.warn("The measurement ID in the local Firebase config ("+e.options.measurementId+") does not match the measurement ID fetched from the server ("+T.measurementId+"). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.")}).catch(function(T){return I.error(T)}),t.push(a),o=function(){return(0,u.mG)(this,void 0,void 0,function(){var e;return(0,u.Jh)(this,function(t){switch(t.label){case 0:return(0,y.hl)()?[3,1]:(I.warn(R.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),[2,!1]);case 1:return t.trys.push([1,3,,4]),[4,(0,y.eu)()];case 2:return t.sent(),[3,4];case 3:return e=t.sent(),I.warn(R.create("indexeddb-unavailable",{errorInfo:e}).message),[2,!1];case 4:return[2,!0]}})})}().then(function(T){if(T)return n.getId()}),[4,Promise.all([a,o])];case 1:return c=S.sent(),f=c[0],v=c[1],function(){for(var e=window.document.getElementsByTagName("script"),t=0,r=Object.values(e);t<r.length;t++){var n=r[t];if(n.src&&n.src.includes(we))return n}return null}()||function(e,t){var r=document.createElement("script");r.src=we+"?l="+e+"&id="+t,r.async=!0,document.head.appendChild(r)}(s,f.measurementId),i("js",new Date),(b={}).origin="firebase",b.update=!0,w=b,null!=v&&(w.firebase_id=v),i(g.CONFIG,f.measurementId,w),[2,f.measurementId]}})})}(e,Z,Ce,t,Se,$);var a={app:e,logEvent:function(o,c,f){(function(e,t,r,n,i){return(0,u.mG)(this,void 0,void 0,function(){var s,a;return(0,u.Jh)(this,function(o){switch(o.label){case 0:return i&&i.global?(e(g.EVENT,r,n),[2]):[3,1];case 1:return[4,t];case 2:s=o.sent(),a=(0,u.pi)((0,u.pi)({},n),{send_to:s}),e(g.EVENT,r,a),o.label=3;case 3:return[2]}})})})(z,O[r],o,c,f).catch(function(v){return I.error(v)})},setCurrentScreen:function(o,c){(function(e,t,r,n){return(0,u.mG)(this,void 0,void 0,function(){var i;return(0,u.Jh)(this,function(s){switch(s.label){case 0:return n&&n.global?(e(g.SET,{screen_name:r}),[2,Promise.resolve()]):[3,1];case 1:return[4,t];case 2:i=s.sent(),e(g.CONFIG,i,{update:!0,screen_name:r}),s.label=3;case 3:return[2]}})})})(z,O[r],o,c).catch(function(f){return I.error(f)})},setUserId:function(o,c){(function(e,t,r,n){return(0,u.mG)(this,void 0,void 0,function(){var i;return(0,u.Jh)(this,function(s){switch(s.label){case 0:return n&&n.global?(e(g.SET,{user_id:r}),[2,Promise.resolve()]):[3,1];case 1:return[4,t];case 2:i=s.sent(),e(g.CONFIG,i,{update:!0,user_id:r}),s.label=3;case 3:return[2]}})})})(z,O[r],o,c).catch(function(f){return I.error(f)})},setUserProperties:function(o,c){(function(e,t,r,n){return(0,u.mG)(this,void 0,void 0,function(){var i,s,a,o,c;return(0,u.Jh)(this,function(f){switch(f.label){case 0:if(!n||!n.global)return[3,1];for(i={},s=0,a=Object.keys(r);s<a.length;s++)i["user_properties."+(o=a[s])]=r[o];return e(g.SET,i),[2,Promise.resolve()];case 1:return[4,t];case 2:c=f.sent(),e(g.CONFIG,c,{update:!0,user_properties:r}),f.label=3;case 3:return[2]}})})})(z,O[r],o,c).catch(function(f){return I.error(f)})},setAnalyticsCollectionEnabled:function(o){(function(e,t){return(0,u.mG)(this,void 0,void 0,function(){var r;return(0,u.Jh)(this,function(n){switch(n.label){case 0:return[4,e];case 1:return r=n.sent(),window["ga-disable-"+r]=!t,[2]}})})})(O[r],o).catch(function(c){return I.error(c)})},INTERNAL:{delete:function(){return delete O[r],Promise.resolve()}}};return a}var Ae="analytics";function Ut(){return(0,u.mG)(this,void 0,void 0,function(){return(0,u.Jh)(this,function(t){switch(t.label){case 0:if((0,y.ru)())return[2,!1];if(!(0,y.zI)())return[2,!1];if(!(0,y.hl)())return[2,!1];t.label=1;case 1:return t.trys.push([1,3,,4]),[4,(0,y.eu)()];case 2:return[2,t.sent()];case 3:return t.sent(),[2,!1];case 4:return[2]}})})}!function(e){e.INTERNAL.registerComponent(new x.wA(Ae,function(r){return jt(r.getProvider("app").getImmediate(),r.getProvider("installations").getImmediate())},"PUBLIC").setServiceProps({settings:Nt,EventName:X,isSupported:Ut})),e.INTERNAL.registerComponent(new x.wA("analytics-internal",function(r){try{return{logEvent:r.getProvider(Ae).getImmediate().logEvent}}catch(i){throw R.create("interop-component-reg-failed",{reason:i})}},"PRIVATE")),e.registerVersion("@firebase/analytics","0.6.18")}(U.Z)},4995:function(ke,ee){!function(A){"use strict";function u(l){return Array.prototype.slice.call(l)}function U(l){return new Promise(function(d,p){l.onsuccess=function(){d(l.result)},l.onerror=function(){p(l.error)}})}function x(l,d,p){var m,h=new Promise(function(C,M){U(m=l[d].apply(l,p)).then(C,M)});return h.request=m,h}function y(l,d,p){var m=x(l,d,p);return m.then(function(h){if(h)return new L(h,m.request)})}function G(l,d,p){p.forEach(function(m){Object.defineProperty(l.prototype,m,{get:function(){return this[d][m]},set:function(h){this[d][m]=h}})})}function K(l,d,p,m){m.forEach(function(h){h in p.prototype&&(l.prototype[h]=function(){return x(this[d],h,arguments)})})}function F(l,d,p,m){m.forEach(function(h){h in p.prototype&&(l.prototype[h]=function(){return this[d][h].apply(this[d],arguments)})})}function H(l,d,p,m){m.forEach(function(h){h in p.prototype&&(l.prototype[h]=function(){return y(this[d],h,arguments)})})}function D(l){this._index=l}function L(l,d){this._cursor=l,this._request=d}function E(l){this._store=l}function _(l){this._tx=l,this.complete=new Promise(function(d,p){l.oncomplete=function(){d()},l.onerror=function(){p(l.error)},l.onabort=function(){p(l.error)}})}function j(l,d,p){this._db=l,this.oldVersion=d,this.transaction=new _(p)}function V(l){this._db=l}G(D,"_index",["name","keyPath","multiEntry","unique"]),K(D,"_index",IDBIndex,["get","getKey","getAll","getAllKeys","count"]),H(D,"_index",IDBIndex,["openCursor","openKeyCursor"]),G(L,"_cursor",["direction","key","primaryKey","value"]),K(L,"_cursor",IDBCursor,["update","delete"]),["advance","continue","continuePrimaryKey"].forEach(function(l){l in IDBCursor.prototype&&(L.prototype[l]=function(){var d=this,p=arguments;return Promise.resolve().then(function(){return d._cursor[l].apply(d._cursor,p),U(d._request).then(function(m){if(m)return new L(m,d._request)})})})}),E.prototype.createIndex=function(){return new D(this._store.createIndex.apply(this._store,arguments))},E.prototype.index=function(){return new D(this._store.index.apply(this._store,arguments))},G(E,"_store",["name","keyPath","indexNames","autoIncrement"]),K(E,"_store",IDBObjectStore,["put","add","delete","clear","get","getAll","getKey","getAllKeys","count"]),H(E,"_store",IDBObjectStore,["openCursor","openKeyCursor"]),F(E,"_store",IDBObjectStore,["deleteIndex"]),_.prototype.objectStore=function(){return new E(this._tx.objectStore.apply(this._tx,arguments))},G(_,"_tx",["objectStoreNames","mode"]),F(_,"_tx",IDBTransaction,["abort"]),j.prototype.createObjectStore=function(){return new E(this._db.createObjectStore.apply(this._db,arguments))},G(j,"_db",["name","version","objectStoreNames"]),F(j,"_db",IDBDatabase,["deleteObjectStore","close"]),V.prototype.transaction=function(){return new _(this._db.transaction.apply(this._db,arguments))},G(V,"_db",["name","version","objectStoreNames"]),F(V,"_db",IDBDatabase,["close"]),["openCursor","openKeyCursor"].forEach(function(l){[E,D].forEach(function(d){l in d.prototype&&(d.prototype[l.replace("open","iterate")]=function(){var p=u(arguments),m=p[p.length-1],h=this._store||this._index,C=h[l].apply(h,p.slice(0,-1));C.onsuccess=function(){m(C.result)}})})}),[D,E].forEach(function(l){l.prototype.getAll||(l.prototype.getAll=function(d,p){var m=this,h=[];return new Promise(function(C){m.iterateCursor(d,function(M){M?(h.push(M.value),void 0===p||h.length!=p?M.continue():C(h)):C(h)})})})}),A.openDb=function(l,d,p){var m=x(indexedDB,"open",[l,d]),h=m.request;return h&&(h.onupgradeneeded=function(C){p&&p(new j(h.result,C.oldVersion,h.transaction))}),m.then(function(C){return new V(C)})},A.deleteDb=function(l){return x(indexedDB,"deleteDatabase",[l])},Object.defineProperty(A,"__esModule",{value:!0})}(ee)}}]);