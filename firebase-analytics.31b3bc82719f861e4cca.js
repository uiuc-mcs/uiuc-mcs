(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{AAub:function(e,t,n){"use strict";n.r(t);var r,i=n("mrSG"),a=n("zIRd"),o=n("/6Yf"),s=n("qOnz"),c=n("nbvr"),u="0.4.26",l=1e4,f="w:0.4.26",d="FIS_v2",p=36e5,h=((r={})["missing-app-config-values"]='Missing App configuration value: "{$valueName}"',r["not-registered"]="Firebase Installation is not registered.",r["installation-not-found"]="Firebase Installation not found.",r["request-failed"]='{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',r["app-offline"]="Could not process request. Application offline.",r["delete-pending-registration"]="Can't delete installation while there is a pending registration request.",r),b=new s.b("installations","Installations",h);function v(e){return e instanceof s.c&&e.code.includes("request-failed")}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function m(e){return"https://firebaseinstallations.googleapis.com/v1/projects/"+e.projectId+"/installations"}function g(e){return{token:e.token,requestStatus:2,expiresIn:(t=e.expiresIn,Number(t.replace("s","000"))),creationTime:Date.now()};var t}function w(e,t){return Object(i.b)(this,void 0,void 0,function(){var n,r;return Object(i.d)(this,function(i){switch(i.label){case 0:return[4,t.json()];case 1:return n=i.sent(),r=n.error,[2,b.create("request-failed",{requestName:e,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})]}})})}function y(e){var t=e.apiKey;return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t})}function I(e,t){var n=t.refreshToken,r=y(e);return r.append("Authorization",function(e){return"FIS_v2 "+e}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(n)),r}function O(e){return Object(i.b)(this,void 0,void 0,function(){var t;return Object(i.d)(this,function(n){switch(n.label){case 0:return[4,e()];case 1:return(t=n.sent()).status>=500&&t.status<600?[2,e()]:[2,t]}})})}function j(e,t){var n=t.fid;return Object(i.b)(this,void 0,void 0,function(){var t,r,a,o,s,c;return Object(i.d)(this,function(i){switch(i.label){case 0:return t=m(e),r=y(e),a={fid:n,authVersion:d,appId:e.appId,sdkVersion:f},o={method:"POST",headers:r,body:JSON.stringify(a)},[4,O(function(){return fetch(t,o)})];case 1:return(s=i.sent()).ok?[4,s.json()]:[3,3];case 2:return c=i.sent(),[2,{fid:c.fid||n,registrationStatus:2,refreshToken:c.refreshToken,authToken:g(c.authToken)}];case 3:return[4,w("Create Installation",s)];case 4:throw i.sent()}})})}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _(e){return new Promise(function(t){setTimeout(t,e)})}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var E=/^[cdef][\w-]{21}$/;function T(){try{var e=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(e),e[0]=112+e[0]%16;var t=function(e){return(t=e,btoa(String.fromCharCode.apply(String,Object(i.f)([],Object(i.e)(t)))).replace(/\+/g,"-").replace(/\//g,"_")).substr(0,22);var t}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e);return E.test(t)?t:""}catch(n){return""}}function S(e){return e.appName+"!"+e.appId}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var C=new Map;function D(e,t){var n=S(e);N(n,t),function(e,t){var n=A();n&&n.postMessage({key:e,fid:t});k()}(n,t)}function N(e,t){var n,r,a=C.get(e);if(a)try{for(var o=Object(i.g)(a),s=o.next();!s.done;s=o.next()){(0,s.value)(t)}}catch(c){n={error:c}}finally{try{s&&!s.done&&(r=o.return)&&r.call(o)}finally{if(n)throw n.error}}}var P=null;function A(){return!P&&"BroadcastChannel"in self&&((P=new BroadcastChannel("[Firebase] FID Change")).onmessage=function(e){N(e.data.key,e.data.fid)}),P}function k(){0===C.size&&P&&(P.close(),P=null)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var x,F="firebase-installations-store",M=null;function q(){return M||(M=Object(c.openDb)("firebase-installations-database",1,function(e){switch(e.oldVersion){case 0:e.createObjectStore(F)}})),M}function L(e,t){return Object(i.b)(this,void 0,void 0,function(){var n,r,a,o,s;return Object(i.d)(this,function(i){switch(i.label){case 0:return n=S(e),[4,q()];case 1:return r=i.sent(),a=r.transaction(F,"readwrite"),[4,(o=a.objectStore(F)).get(n)];case 2:return s=i.sent(),[4,o.put(t,n)];case 3:return i.sent(),[4,a.complete];case 4:return i.sent(),s&&s.fid===t.fid||D(e,t.fid),[2,t]}})})}function R(e){return Object(i.b)(this,void 0,void 0,function(){var t,n,r;return Object(i.d)(this,function(i){switch(i.label){case 0:return t=S(e),[4,q()];case 1:return n=i.sent(),[4,(r=n.transaction(F,"readwrite")).objectStore(F).delete(t)];case 2:return i.sent(),[4,r.complete];case 3:return i.sent(),[2]}})})}function V(e,t){return Object(i.b)(this,void 0,void 0,function(){var n,r,a,o,s,c;return Object(i.d)(this,function(i){switch(i.label){case 0:return n=S(e),[4,q()];case 1:return r=i.sent(),a=r.transaction(F,"readwrite"),[4,(o=a.objectStore(F)).get(n)];case 2:return s=i.sent(),void 0!==(c=t(s))?[3,4]:[4,o.delete(n)];case 3:return i.sent(),[3,6];case 4:return[4,o.put(c,n)];case 5:i.sent(),i.label=6;case 6:return[4,a.complete];case 7:return i.sent(),!c||s&&s.fid===c.fid||D(e,c.fid),[2,c]}})})}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function K(e){return Object(i.b)(this,void 0,void 0,function(){var t,n,r;return Object(i.d)(this,function(a){switch(a.label){case 0:return[4,V(e,function(n){var r=function(e){return z(e||{fid:T(),registrationStatus:0})}(n),a=function(e,t){if(0===t.registrationStatus){if(!navigator.onLine)return{installationEntry:t,registrationPromise:Promise.reject(b.create("app-offline"))};var n={fid:t.fid,registrationStatus:1,registrationTime:Date.now()};return{installationEntry:n,registrationPromise:function(e,t){return Object(i.b)(this,void 0,void 0,function(){var n,r;return Object(i.d)(this,function(i){switch(i.label){case 0:return i.trys.push([0,2,,7]),[4,j(e,t)];case 1:return n=i.sent(),[2,L(e,n)];case 2:return v(r=i.sent())&&409===r.customData.serverCode?[4,R(e)]:[3,4];case 3:return i.sent(),[3,6];case 4:return[4,L(e,{fid:t.fid,registrationStatus:0})];case 5:i.sent(),i.label=6;case 6:throw r;case 7:return[2]}})})}(e,n)}}return 1===t.registrationStatus?{installationEntry:t,registrationPromise:B(e)}:{installationEntry:t}}(e,r);return t=a.registrationPromise,a.installationEntry})];case 1:return""!==(n=a.sent()).fid?[3,3]:(r={},[4,t]);case 2:return[2,(r.installationEntry=a.sent(),r)];case 3:return[2,{installationEntry:n,registrationPromise:t}]}})})}function B(e){return Object(i.b)(this,void 0,void 0,function(){var t,n,r,a;return Object(i.d)(this,function(i){switch(i.label){case 0:return[4,G(e)];case 1:t=i.sent(),i.label=2;case 2:return 1!==t.registrationStatus?[3,5]:[4,_(100)];case 3:return i.sent(),[4,G(e)];case 4:return t=i.sent(),[3,2];case 5:return 0!==t.registrationStatus?[3,7]:[4,K(e)];case 6:return n=i.sent(),r=n.installationEntry,(a=n.registrationPromise)?[2,a]:[2,r];case 7:return[2,t]}})})}function G(e){return V(e,function(e){if(!e)throw b.create("installation-not-found");return z(e)})}function z(e){return 1===(t=e).registrationStatus&&t.registrationTime+l<Date.now()?{fid:e.fid,registrationStatus:0}:e;var t;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}function U(e,t){var n=e.appConfig,r=e.platformLoggerProvider;return Object(i.b)(this,void 0,void 0,function(){var e,a,o,s,c,u,l;return Object(i.d)(this,function(i){switch(i.label){case 0:return e=function(e,t){var n=t.fid;return m(e)+"/"+n+"/authTokens:generate"}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(n,t),a=I(n,t),(o=r.getImmediate({optional:!0}))&&a.append("x-firebase-client",o.getPlatformInfoString()),s={installation:{sdkVersion:f}},c={method:"POST",headers:a,body:JSON.stringify(s)},[4,O(function(){return fetch(e,c)})];case 1:return(u=i.sent()).ok?[4,u.json()]:[3,3];case 2:return l=i.sent(),[2,g(l)];case 3:return[4,w("Generate Auth Token",u)];case 4:throw i.sent()}})})}function $(e,t){return void 0===t&&(t=!1),Object(i.b)(this,void 0,void 0,function(){var n,r,a;return Object(i.d)(this,function(o){switch(o.label){case 0:return[4,V(e.appConfig,function(r){if(!W(r))throw b.create("not-registered");var a=r.authToken;if(!t&&function(e){return 2===e.requestStatus&&!function(e){var t=Date.now();return t<e.creationTime||e.creationTime+e.expiresIn<t+p}(e)}(a))return r;if(1===a.requestStatus)return n=function(e,t){return Object(i.b)(this,void 0,void 0,function(){var n,r;return Object(i.d)(this,function(i){switch(i.label){case 0:return[4,H(e.appConfig)];case 1:n=i.sent(),i.label=2;case 2:return 1!==n.authToken.requestStatus?[3,5]:[4,_(100)];case 3:return i.sent(),[4,H(e.appConfig)];case 4:return n=i.sent(),[3,2];case 5:return 0===(r=n.authToken).requestStatus?[2,$(e,t)]:[2,r]}})})}(e,t),r;if(!navigator.onLine)throw b.create("app-offline");var o=function(e){var t={requestStatus:1,requestTime:Date.now()};return Object(i.a)(Object(i.a)({},e),{authToken:t})}(r);return n=function(e,t){return Object(i.b)(this,void 0,void 0,function(){var n,r,a;return Object(i.d)(this,function(o){switch(o.label){case 0:return o.trys.push([0,3,,8]),[4,U(e,t)];case 1:return n=o.sent(),a=Object(i.a)(Object(i.a)({},t),{authToken:n}),[4,L(e.appConfig,a)];case 2:return o.sent(),[2,n];case 3:return!v(r=o.sent())||401!==r.customData.serverCode&&404!==r.customData.serverCode?[3,5]:[4,R(e.appConfig)];case 4:return o.sent(),[3,7];case 5:return a=Object(i.a)(Object(i.a)({},t),{authToken:{requestStatus:0}}),[4,L(e.appConfig,a)];case 6:o.sent(),o.label=7;case 7:throw r;case 8:return[2]}})})}(e,o),o})];case 1:return r=o.sent(),n?[4,n]:[3,3];case 2:return a=o.sent(),[3,4];case 3:a=r.authToken,o.label=4;case 4:return[2,a]}})})}function H(e){return V(e,function(e){if(!W(e))throw b.create("not-registered");var t,n=e.authToken;return 1===(t=n).requestStatus&&t.requestTime+l<Date.now()?Object(i.a)(Object(i.a)({},e),{authToken:{requestStatus:0}}):e})}function W(e){return void 0!==e&&2===e.registrationStatus}function J(e){return Object(i.b)(this,void 0,void 0,function(){var t;return Object(i.d)(this,function(n){switch(n.label){case 0:return[4,K(e)];case 1:return(t=n.sent().registrationPromise)?[4,t]:[3,3];case 2:n.sent(),n.label=3;case 3:return[2]}})})}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Y(e,t){return Object(i.b)(this,void 0,void 0,function(){var n,r,a,o;return Object(i.d)(this,function(i){switch(i.label){case 0:return n=function(e,t){var n=t.fid;return m(e)+"/"+n}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e,t),r=I(e,t),a={method:"DELETE",headers:r},[4,O(function(){return fetch(n,a)})];case 1:return(o=i.sent()).ok?[3,3]:[4,w("Delete Installation",o)];case 2:throw i.sent();case 3:return[2]}})})}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function X(e,t){var n=e.appConfig;return function(e,t){A();var n=S(e),r=C.get(n);r||(r=new Set,C.set(n,r)),r.add(t)}(n,t),function(){!function(e,t){var n=S(e),r=C.get(n);r&&(r.delete(t),0===r.size&&C.delete(n),k())}(n,t)}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Q(e){return b.create("missing-app-config-values",{valueName:e})}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(x=a.a).INTERNAL.registerComponent(new o.a("installations",function(e){var t=e.getProvider("app").getImmediate(),n={appConfig:function(e){var t,n;if(!e||!e.options)throw Q("App Configuration");if(!e.name)throw Q("App Name");try{for(var r=Object(i.g)(["projectId","apiKey","appId"]),a=r.next();!a.done;a=r.next()){var o=a.value;if(!e.options[o])throw Q(o)}}catch(s){t={error:s}}finally{try{a&&!a.done&&(n=r.return)&&n.call(r)}finally{if(t)throw t.error}}return{appName:e.name,projectId:e.options.projectId,apiKey:e.options.apiKey,appId:e.options.appId}}(t),platformLoggerProvider:e.getProvider("platform-logger")};return{app:t,getId:function(){
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */return function(e){return Object(i.b)(this,void 0,void 0,function(){var t,n,r;return Object(i.d)(this,function(i){switch(i.label){case 0:return[4,K(e.appConfig)];case 1:return t=i.sent(),n=t.installationEntry,(r=t.registrationPromise)?r.catch(console.error):$(e).catch(console.error),[2,n.fid]}})})}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(n)},getToken:function(e){return function(e,t){return void 0===t&&(t=!1),Object(i.b)(this,void 0,void 0,function(){return Object(i.d)(this,function(n){switch(n.label){case 0:return[4,J(e.appConfig)];case 1:return n.sent(),[4,$(e,t)];case 2:return[2,n.sent().token]}})})}(n,e)},delete:function(){return function(e){return Object(i.b)(this,void 0,void 0,function(){var t,n;return Object(i.d)(this,function(r){switch(r.label){case 0:return[4,V(t=e.appConfig,function(e){if(!e||0!==e.registrationStatus)return e})];case 1:if(!(n=r.sent()))return[3,6];if(1!==n.registrationStatus)return[3,2];throw b.create("delete-pending-registration");case 2:if(2!==n.registrationStatus)return[3,6];if(navigator.onLine)return[3,3];throw b.create("app-offline");case 3:return[4,Y(t,n)];case 4:return r.sent(),[4,R(t)];case 5:r.sent(),r.label=6;case 6:return[2]}})})}(n)},onIdChange:function(e){return X(n,e)}}},"PUBLIC")),x.registerVersion("@firebase/installations",u);var Z,ee,te=n("q/0M"),ne="https://www.googletagmanager.com/gtag/js";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */!function(e){e.EVENT="event",e.SET="set",e.CONFIG="config"}(Z||(Z={})),function(e){e.ADD_SHIPPING_INFO="add_shipping_info",e.ADD_PAYMENT_INFO="add_payment_info",e.ADD_TO_CART="add_to_cart",e.ADD_TO_WISHLIST="add_to_wishlist",e.BEGIN_CHECKOUT="begin_checkout",e.CHECKOUT_PROGRESS="checkout_progress",e.EXCEPTION="exception",e.GENERATE_LEAD="generate_lead",e.LOGIN="login",e.PAGE_VIEW="page_view",e.PURCHASE="purchase",e.REFUND="refund",e.REMOVE_FROM_CART="remove_from_cart",e.SCREEN_VIEW="screen_view",e.SEARCH="search",e.SELECT_CONTENT="select_content",e.SELECT_ITEM="select_item",e.SELECT_PROMOTION="select_promotion",e.SET_CHECKOUT_OPTION="set_checkout_option",e.SHARE="share",e.SIGN_UP="sign_up",e.TIMING_COMPLETE="timing_complete",e.VIEW_CART="view_cart",e.VIEW_ITEM="view_item",e.VIEW_ITEM_LIST="view_item_list",e.VIEW_PROMOTION="view_promotion",e.VIEW_SEARCH_RESULTS="view_search_results"}(ee||(ee={}));
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var re,ie=new te.b("@firebase/analytics");
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ae(e,t,n,r,a,o){return Object(i.b)(this,void 0,void 0,function(){var s,c,u,l;return Object(i.d)(this,function(i){switch(i.label){case 0:s=r[a],i.label=1;case 1:return i.trys.push([1,7,,8]),s?[4,t[s]]:[3,3];case 2:return i.sent(),[3,6];case 3:return[4,Promise.all(n)];case 4:return c=i.sent(),(u=c.find(function(e){return e.measurementId===a}))?[4,t[u.appId]]:[3,6];case 5:i.sent(),i.label=6;case 6:return[3,8];case 7:return l=i.sent(),ie.error(l),[3,8];case 8:return e(Z.CONFIG,a,o),[2]}})})}function oe(e,t,n,r,a){return Object(i.b)(this,void 0,void 0,function(){var o,s,c,u,l,f,d,p;return Object(i.d)(this,function(i){switch(i.label){case 0:return i.trys.push([0,4,,5]),o=[],a&&a.send_to?(s=a.send_to,Array.isArray(s)||(s=[s]),[4,Promise.all(n)]):[3,2];case 1:for(c=i.sent(),u=function(e){var n=c.find(function(t){return t.measurementId===e}),r=n&&t[n.appId];if(!r)return o=[],"break";o.push(r)},l=0,f=s;l<f.length&&(d=f[l],"break"!==u(d));l++);i.label=2;case 2:return 0===o.length&&(o=Object.values(t)),[4,Promise.all(o)];case 3:return i.sent(),e(Z.EVENT,r,a||{}),[3,5];case 4:return p=i.sent(),ie.error(p),[3,5];case 5:return[2]}})})}function se(e,t,n,r,a){var o=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];window[r].push(arguments)};return window[a]&&"function"==typeof window[a]&&(o=window[a]),window[a]=function(e,t,n,r){return function(a,o,s){return Object(i.b)(this,void 0,void 0,function(){var c;return Object(i.d)(this,function(i){switch(i.label){case 0:return i.trys.push([0,6,,7]),a!==Z.EVENT?[3,2]:[4,oe(e,t,n,o,s)];case 1:return i.sent(),[3,5];case 2:return a!==Z.CONFIG?[3,4]:[4,ae(e,t,n,r,o,s)];case 3:return i.sent(),[3,5];case 4:e(Z.SET,o),i.label=5;case 5:return[3,7];case 6:return c=i.sent(),ie.error(c),[3,7];case 7:return[2]}})})}}(o,e,t,n),{gtagCore:o,wrappedGtag:window[a]}}var ce=((re={})["already-exists"]="A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.",re["already-initialized"]="Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.",re["interop-component-reg-failed"]="Firebase Analytics Interop Component failed to instantiate: {$reason}",re["invalid-analytics-context"]="Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}",re["indexeddb-unavailable"]="IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}",re["fetch-throttle"]="The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.",re["config-fetch-failed"]="Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}",re["no-api-key"]='The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',re["no-app-id"]='The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',re),ue=new s.b("analytics","Analytics",ce),le=new(function(){function e(e,t){void 0===e&&(e={}),void 0===t&&(t=1e3),this.throttleMetadata=e,this.intervalMillis=t}return e.prototype.getThrottleMetadata=function(e){return this.throttleMetadata[e]},e.prototype.setThrottleMetadata=function(e,t){this.throttleMetadata[e]=t},e.prototype.deleteThrottleMetadata=function(e){delete this.throttleMetadata[e]},e}());function fe(e){return new Headers({Accept:"application/json","x-goog-api-key":e})}function de(e){var t;return Object(i.b)(this,void 0,void 0,function(){var n,r,a,o,s,c,u;return Object(i.d)(this,function(i){switch(i.label){case 0:return n=e.appId,r=e.apiKey,a={method:"GET",headers:fe(r)},o="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig".replace("{app-id}",n),[4,fetch(o,a)];case 1:if(200===(s=i.sent()).status||304===s.status)return[3,6];c="",i.label=2;case 2:return i.trys.push([2,4,,5]),[4,s.json()];case 3:return u=i.sent(),(null===(t=u.error)||void 0===t?void 0:t.message)&&(c=u.error.message),[3,5];case 4:return i.sent(),[3,5];case 5:throw ue.create("config-fetch-failed",{httpStatus:s.status,responseMessage:c});case 6:return[2,s.json()]}})})}function pe(e,t,n,r){var a=t.throttleEndTimeMillis,o=t.backoffCount;return void 0===r&&(r=le),Object(i.b)(this,void 0,void 0,function(){var t,c,u,l,f,d,p;return Object(i.d)(this,function(i){switch(i.label){case 0:t=e.appId,c=e.measurementId,i.label=1;case 1:return i.trys.push([1,3,,4]),[4,he(n,a)];case 2:return i.sent(),[3,4];case 3:if(u=i.sent(),c)return ie.warn("Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID "+c+' provided in the "measurementId" field in the local Firebase config. ['+u.message+"]"),[2,{appId:t,measurementId:c}];throw u;case 4:return i.trys.push([4,6,,7]),[4,de(e)];case 5:return l=i.sent(),r.deleteThrottleMetadata(t),[2,l];case 6:if(!function(e){if(!(e instanceof s.c&&e.customData))return!1;var t=Number(e.customData.httpStatus);return 429===t||500===t||503===t||504===t}(f=i.sent())){if(r.deleteThrottleMetadata(t),c)return ie.warn("Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID "+c+' provided in the "measurementId" field in the local Firebase config. ['+f.message+"]"),[2,{appId:t,measurementId:c}];throw f}return d=503===Number(f.customData.httpStatus)?Object(s.e)(o,r.intervalMillis,30):Object(s.e)(o,r.intervalMillis),p={throttleEndTimeMillis:Date.now()+d,backoffCount:o+1},r.setThrottleMetadata(t,p),ie.debug("Calling attemptFetch again in "+d+" millis"),[2,pe(e,p,n,r)];case 7:return[2]}})})}function he(e,t){return new Promise(function(n,r){var i=Math.max(t-Date.now(),0),a=setTimeout(n,i);e.addEventListener(function(){clearTimeout(a),r(ue.create("fetch-throttle",{throttleEndTimeMillis:t}))})})}var be=function(){function e(){this.listeners=[]}return e.prototype.addEventListener=function(e){this.listeners.push(e)},e.prototype.abort=function(){this.listeners.forEach(function(e){return e()})},e}();
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ve(e,t,n,r,a,o){return Object(i.b)(this,void 0,void 0,function(){var c,u,l,f,d,p,h;return Object(i.d)(this,function(b){switch(b.label){case 0:return(c=function(e,t,n){return void 0===t&&(t=le),Object(i.b)(this,void 0,void 0,function(){var r,a,o,s,c,u,l=this;return Object(i.d)(this,function(f){if(r=e.options,a=r.appId,o=r.apiKey,s=r.measurementId,!a)throw ue.create("no-app-id");if(!o){if(s)return[2,{measurementId:s,appId:a}];throw ue.create("no-api-key")}return c=t.getThrottleMetadata(a)||{backoffCount:0,throttleEndTimeMillis:Date.now()},u=new be,setTimeout(function(){return Object(i.b)(l,void 0,void 0,function(){return Object(i.d)(this,function(e){return u.abort(),[2]})})},void 0!==n?n:6e4),[2,pe({appId:a,apiKey:o,measurementId:s},c,u,t)]})})}(e)).then(function(t){n[t.measurementId]=t.appId,e.options.measurementId&&t.measurementId!==e.options.measurementId&&ie.warn("The measurement ID in the local Firebase config ("+e.options.measurementId+") does not match the measurement ID fetched from the server ("+t.measurementId+"). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.")}).catch(function(e){return ie.error(e)}),t.push(c),u=function(){return Object(i.b)(this,void 0,void 0,function(){var e;return Object(i.d)(this,function(t){switch(t.label){case 0:return Object(s.q)()?[3,1]:(ie.warn(ue.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),[2,!1]);case 1:return t.trys.push([1,3,,4]),[4,Object(s.v)()];case 2:return t.sent(),[3,4];case 3:return e=t.sent(),ie.warn(ue.create("indexeddb-unavailable",{errorInfo:e}).message),[2,!1];case 4:return[2,!0]}})})}().then(function(e){return e?r.getId():void 0}),[4,Promise.all([c,u])];case 1:return l=b.sent(),f=l[0],d=l[1],function(){for(var e=window.document.getElementsByTagName("script"),t=0,n=Object.values(e);t<n.length;t++){var r=n[t];if(r.src&&r.src.includes(ne))return r}return null}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */()||function(e,t){var n=document.createElement("script");n.src=ne+"?l="+e+"&id="+t,n.async=!0,document.head.appendChild(n)}(o,f.measurementId),a("js",new Date),(h={}).origin="firebase",h.update=!0,p=h,null!=d&&(p.firebase_id=d),a(Z.CONFIG,f.measurementId,p),[2,f.measurementId]}})})}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var me,ge,we={},ye=[],Ie={},Oe="dataLayer",je="gtag",_e=!1;function Ee(e){if(_e)throw ue.create("already-initialized");e.dataLayerName&&(Oe=e.dataLayerName),e.gtagName&&(je=e.gtagName)}function Te(e,t){!function(){var e=[];if(Object(s.n)()&&e.push("This is a browser extension environment."),Object(s.d)()||e.push("Cookies are not available."),e.length>0){var t=e.map(function(e,t){return"("+(t+1)+") "+e}).join(" "),n=ue.create("invalid-analytics-context",{errorInfo:t});ie.warn(n.message)}}();var n,r,a=e.options.appId;if(!a)throw ue.create("no-app-id");if(!e.options.apiKey){if(!e.options.measurementId)throw ue.create("no-api-key");ie.warn('The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID '+e.options.measurementId+' provided in the "measurementId" field in the local Firebase config.')}if(null!=we[a])throw ue.create("already-exists",{id:a});if(!_e){n=Oe,r=[],Array.isArray(window[n])?r=window[n]:window[n]=r;var o=se(we,ye,Ie,Oe,je),c=o.wrappedGtag,u=o.gtagCore;ge=c,me=u,_e=!0}return we[a]=ve(e,ye,Ie,t,me,Oe),{app:e,logEvent:function(e,t,n){(
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function(e,t,n,r,a){return Object(i.b)(this,void 0,void 0,function(){var o,s;return Object(i.d)(this,function(c){switch(c.label){case 0:return a&&a.global?(e(Z.EVENT,n,r),[2]):[3,1];case 1:return[4,t];case 2:o=c.sent(),s=Object(i.a)(Object(i.a)({},r),{send_to:o}),e(Z.EVENT,n,s),c.label=3;case 3:return[2]}})})})(ge,we[a],e,t,n).catch(function(e){return ie.error(e)})},setCurrentScreen:function(e,t){(function(e,t,n,r){return Object(i.b)(this,void 0,void 0,function(){var a;return Object(i.d)(this,function(i){switch(i.label){case 0:return r&&r.global?(e(Z.SET,{screen_name:n}),[2,Promise.resolve()]):[3,1];case 1:return[4,t];case 2:a=i.sent(),e(Z.CONFIG,a,{update:!0,screen_name:n}),i.label=3;case 3:return[2]}})})})(ge,we[a],e,t).catch(function(e){return ie.error(e)})},setUserId:function(e,t){(function(e,t,n,r){return Object(i.b)(this,void 0,void 0,function(){var a;return Object(i.d)(this,function(i){switch(i.label){case 0:return r&&r.global?(e(Z.SET,{user_id:n}),[2,Promise.resolve()]):[3,1];case 1:return[4,t];case 2:a=i.sent(),e(Z.CONFIG,a,{update:!0,user_id:n}),i.label=3;case 3:return[2]}})})})(ge,we[a],e,t).catch(function(e){return ie.error(e)})},setUserProperties:function(e,t){(function(e,t,n,r){return Object(i.b)(this,void 0,void 0,function(){var a,o,s,c,u;return Object(i.d)(this,function(i){switch(i.label){case 0:if(!r||!r.global)return[3,1];for(a={},o=0,s=Object.keys(n);o<s.length;o++)c=s[o],a["user_properties."+c]=n[c];return e(Z.SET,a),[2,Promise.resolve()];case 1:return[4,t];case 2:u=i.sent(),e(Z.CONFIG,u,{update:!0,user_properties:n}),i.label=3;case 3:return[2]}})})})(ge,we[a],e,t).catch(function(e){return ie.error(e)})},setAnalyticsCollectionEnabled:function(e){(function(e,t){return Object(i.b)(this,void 0,void 0,function(){var n;return Object(i.d)(this,function(r){switch(r.label){case 0:return[4,e];case 1:return n=r.sent(),window["ga-disable-"+n]=!t,[2]}})})})(we[a],e).catch(function(e){return ie.error(e)})},INTERNAL:{delete:function(){return delete we[a],Promise.resolve()}}}}var Se="analytics";function Ce(){return Object(i.b)(this,void 0,void 0,function(){return Object(i.d)(this,function(e){switch(e.label){case 0:if(Object(s.n)())return[2,!1];if(!Object(s.d)())return[2,!1];if(!Object(s.q)())return[2,!1];e.label=1;case 1:return e.trys.push([1,3,,4]),[4,Object(s.v)()];case 2:return[2,e.sent()];case 3:return e.sent(),[2,!1];case 4:return[2]}})})}!function(e){e.INTERNAL.registerComponent(new o.a(Se,function(e){return Te(e.getProvider("app").getImmediate(),e.getProvider("installations").getImmediate())},"PUBLIC").setServiceProps({settings:Ee,EventName:ee,isSupported:Ce})),e.INTERNAL.registerComponent(new o.a("analytics-internal",function(e){try{return{logEvent:e.getProvider(Se).getImmediate().logEvent}}catch(t){throw ue.create("interop-component-reg-failed",{reason:t})}},"PRIVATE")),e.registerVersion("@firebase/analytics","0.6.10")}(a.a)},nbvr:function(e,t,n){!function(e){"use strict";function t(e){return Array.prototype.slice.call(e)}function n(e){return new Promise(function(t,n){e.onsuccess=function(){t(e.result)},e.onerror=function(){n(e.error)}})}function r(e,t,r){var i,a=new Promise(function(a,o){n(i=e[t].apply(e,r)).then(a,o)});return a.request=i,a}function i(e,t,n){var i=r(e,t,n);return i.then(function(e){if(e)return new l(e,i.request)})}function a(e,t,n){n.forEach(function(n){Object.defineProperty(e.prototype,n,{get:function(){return this[t][n]},set:function(e){this[t][n]=e}})})}function o(e,t,n,i){i.forEach(function(i){i in n.prototype&&(e.prototype[i]=function(){return r(this[t],i,arguments)})})}function s(e,t,n,r){r.forEach(function(r){r in n.prototype&&(e.prototype[r]=function(){return this[t][r].apply(this[t],arguments)})})}function c(e,t,n,r){r.forEach(function(r){r in n.prototype&&(e.prototype[r]=function(){return i(this[t],r,arguments)})})}function u(e){this._index=e}function l(e,t){this._cursor=e,this._request=t}function f(e){this._store=e}function d(e){this._tx=e,this.complete=new Promise(function(t,n){e.oncomplete=function(){t()},e.onerror=function(){n(e.error)},e.onabort=function(){n(e.error)}})}function p(e,t,n){this._db=e,this.oldVersion=t,this.transaction=new d(n)}function h(e){this._db=e}function b(e,t,n){var i=r(indexedDB,"open",[e,t]),a=i.request;return a&&(a.onupgradeneeded=function(e){n&&n(new p(a.result,e.oldVersion,a.transaction))}),i.then(function(e){return new h(e)})}function v(e){return r(indexedDB,"deleteDatabase",[e])}a(u,"_index",["name","keyPath","multiEntry","unique"]),o(u,"_index",IDBIndex,["get","getKey","getAll","getAllKeys","count"]),c(u,"_index",IDBIndex,["openCursor","openKeyCursor"]),a(l,"_cursor",["direction","key","primaryKey","value"]),o(l,"_cursor",IDBCursor,["update","delete"]),["advance","continue","continuePrimaryKey"].forEach(function(e){e in IDBCursor.prototype&&(l.prototype[e]=function(){var t=this,r=arguments;return Promise.resolve().then(function(){return t._cursor[e].apply(t._cursor,r),n(t._request).then(function(e){if(e)return new l(e,t._request)})})})}),f.prototype.createIndex=function(){return new u(this._store.createIndex.apply(this._store,arguments))},f.prototype.index=function(){return new u(this._store.index.apply(this._store,arguments))},a(f,"_store",["name","keyPath","indexNames","autoIncrement"]),o(f,"_store",IDBObjectStore,["put","add","delete","clear","get","getAll","getKey","getAllKeys","count"]),c(f,"_store",IDBObjectStore,["openCursor","openKeyCursor"]),s(f,"_store",IDBObjectStore,["deleteIndex"]),d.prototype.objectStore=function(){return new f(this._tx.objectStore.apply(this._tx,arguments))},a(d,"_tx",["objectStoreNames","mode"]),s(d,"_tx",IDBTransaction,["abort"]),p.prototype.createObjectStore=function(){return new f(this._db.createObjectStore.apply(this._db,arguments))},a(p,"_db",["name","version","objectStoreNames"]),s(p,"_db",IDBDatabase,["deleteObjectStore","close"]),h.prototype.transaction=function(){return new d(this._db.transaction.apply(this._db,arguments))},a(h,"_db",["name","version","objectStoreNames"]),s(h,"_db",IDBDatabase,["close"]),["openCursor","openKeyCursor"].forEach(function(e){[f,u].forEach(function(n){e in n.prototype&&(n.prototype[e.replace("open","iterate")]=function(){var n=t(arguments),r=n[n.length-1],i=this._store||this._index,a=i[e].apply(i,n.slice(0,-1));a.onsuccess=function(){r(a.result)}})})}),[u,f].forEach(function(e){e.prototype.getAll||(e.prototype.getAll=function(e,t){var n=this,r=[];return new Promise(function(i){n.iterateCursor(e,function(e){e?(r.push(e.value),void 0===t||r.length!=t?e.continue():i(r)):i(r)})})})}),e.openDb=b,e.deleteDb=v,Object.defineProperty(e,"__esModule",{value:!0})}(t)}}]);