(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();/**
* @vue/shared v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Hl(n){const e=Object.create(null);for(const t of n.split(","))e[t]=1;return t=>t in e}const ft={},bs=[],On=()=>{},au=()=>!1,Ra=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&(n.charCodeAt(2)>122||n.charCodeAt(2)<97),Vl=n=>n.startsWith("onUpdate:"),Vt=Object.assign,kl=(n,e)=>{const t=n.indexOf(e);t>-1&&n.splice(t,1)},Zh=Object.prototype.hasOwnProperty,at=(n,e)=>Zh.call(n,e),We=Array.isArray,ys=n=>fr(n)==="[object Map]",Pa=n=>fr(n)==="[object Set]",Sc=n=>fr(n)==="[object Date]",$e=n=>typeof n=="function",wt=n=>typeof n=="string",Bn=n=>typeof n=="symbol",gt=n=>n!==null&&typeof n=="object",ou=n=>(gt(n)||$e(n))&&$e(n.then)&&$e(n.catch),lu=Object.prototype.toString,fr=n=>lu.call(n),Jh=n=>fr(n).slice(8,-1),cu=n=>fr(n)==="[object Object]",Gl=n=>wt(n)&&n!=="NaN"&&n[0]!=="-"&&""+parseInt(n,10)===n,Ks=Hl(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Da=n=>{const e=Object.create(null);return(t=>e[t]||(e[t]=n(t)))},Qh=/-\w/g,xi=Da(n=>n.replace(Qh,e=>e.slice(1).toUpperCase())),ef=/\B([A-Z])/g,Xi=Da(n=>n.replace(ef,"-$1").toLowerCase()),du=Da(n=>n.charAt(0).toUpperCase()+n.slice(1)),ja=Da(n=>n?`on${du(n)}`:""),mi=(n,e)=>!Object.is(n,e),ea=(n,...e)=>{for(let t=0;t<n.length;t++)n[t](...e)},uu=(n,e,t,i=!1)=>{Object.defineProperty(n,e,{configurable:!0,enumerable:!1,writable:i,value:t})},ua=n=>{const e=parseFloat(n);return isNaN(e)?n:e};let Ec;const Ia=()=>Ec||(Ec=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function ql(n){if(We(n)){const e={};for(let t=0;t<n.length;t++){const i=n[t],s=wt(i)?rf(i):ql(i);if(s)for(const r in s)e[r]=s[r]}return e}else if(wt(n)||gt(n))return n}const tf=/;(?![^(]*\))/g,nf=/:([^]+)/,sf=/\/\*[^]*?\*\//g;function rf(n){const e={};return n.replace(sf,"").split(tf).forEach(t=>{if(t){const i=t.split(nf);i.length>1&&(e[i[0].trim()]=i[1].trim())}}),e}function xt(n){let e="";if(wt(n))e=n;else if(We(n))for(let t=0;t<n.length;t++){const i=xt(n[t]);i&&(e+=i+" ")}else if(gt(n))for(const t in n)n[t]&&(e+=t+" ");return e.trim()}const af="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",of=Hl(af);function hu(n){return!!n||n===""}function lf(n,e){if(n.length!==e.length)return!1;let t=!0;for(let i=0;t&&i<n.length;i++)t=La(n[i],e[i]);return t}function La(n,e){if(n===e)return!0;let t=Sc(n),i=Sc(e);if(t||i)return t&&i?n.getTime()===e.getTime():!1;if(t=Bn(n),i=Bn(e),t||i)return n===e;if(t=We(n),i=We(e),t||i)return t&&i?lf(n,e):!1;if(t=gt(n),i=gt(e),t||i){if(!t||!i)return!1;const s=Object.keys(n).length,r=Object.keys(e).length;if(s!==r)return!1;for(const a in n){const o=n.hasOwnProperty(a),l=e.hasOwnProperty(a);if(o&&!l||!o&&l||!La(n[a],e[a]))return!1}}return String(n)===String(e)}function cf(n,e){return n.findIndex(t=>La(t,e))}const fu=n=>!!(n&&n.__v_isRef===!0),Se=n=>wt(n)?n:n==null?"":We(n)||gt(n)&&(n.toString===lu||!$e(n.toString))?fu(n)?Se(n.value):JSON.stringify(n,pu,2):String(n),pu=(n,e)=>fu(e)?pu(n,e.value):ys(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((t,[i,s],r)=>(t[$a(i,r)+" =>"]=s,t),{})}:Pa(e)?{[`Set(${e.size})`]:[...e.values()].map(t=>$a(t))}:Bn(e)?$a(e):gt(e)&&!We(e)&&!cu(e)?String(e):e,$a=(n,e="")=>{var t;return Bn(n)?`Symbol(${(t=n.description)!=null?t:e})`:n};/**
* @vue/reactivity v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Jt;class df{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.parent=Jt,!e&&Jt&&(this.index=(Jt.scopes||(Jt.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,t;if(this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].pause();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,t;if(this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].resume();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].resume()}}run(e){if(this._active){const t=Jt;try{return Jt=this,e()}finally{Jt=t}}}on(){++this._on===1&&(this.prevScope=Jt,Jt=this)}off(){this._on>0&&--this._on===0&&(Jt=this.prevScope,this.prevScope=void 0)}stop(e){if(this._active){this._active=!1;let t,i;for(t=0,i=this.effects.length;t<i;t++)this.effects[t].stop();for(this.effects.length=0,t=0,i=this.cleanups.length;t<i;t++)this.cleanups[t]();if(this.cleanups.length=0,this.scopes){for(t=0,i=this.scopes.length;t<i;t++)this.scopes[t].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){const s=this.parent.scopes.pop();s&&s!==this&&(this.parent.scopes[this.index]=s,s.index=this.index)}this.parent=void 0}}}function uf(){return Jt}let mt;const Ya=new WeakSet;class mu{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,Jt&&Jt.active&&Jt.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,Ya.has(this)&&(Ya.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||_u(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Tc(this),vu(this);const e=mt,t=Mn;mt=this,Mn=!0;try{return this.fn()}finally{xu(this),mt=e,Mn=t,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)jl(e);this.deps=this.depsTail=void 0,Tc(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?Ya.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){Bo(this)&&this.run()}get dirty(){return Bo(this)}}let gu=0,Zs,Js;function _u(n,e=!1){if(n.flags|=8,e){n.next=Js,Js=n;return}n.next=Zs,Zs=n}function Wl(){gu++}function Xl(){if(--gu>0)return;if(Js){let e=Js;for(Js=void 0;e;){const t=e.next;e.next=void 0,e.flags&=-9,e=t}}let n;for(;Zs;){let e=Zs;for(Zs=void 0;e;){const t=e.next;if(e.next=void 0,e.flags&=-9,e.flags&1)try{e.trigger()}catch(i){n||(n=i)}e=t}}if(n)throw n}function vu(n){for(let e=n.deps;e;e=e.nextDep)e.version=-1,e.prevActiveLink=e.dep.activeLink,e.dep.activeLink=e}function xu(n){let e,t=n.depsTail,i=t;for(;i;){const s=i.prevDep;i.version===-1?(i===t&&(t=s),jl(i),hf(i)):e=i,i.dep.activeLink=i.prevActiveLink,i.prevActiveLink=void 0,i=s}n.deps=e,n.depsTail=t}function Bo(n){for(let e=n.deps;e;e=e.nextDep)if(e.dep.version!==e.version||e.dep.computed&&(bu(e.dep.computed)||e.dep.version!==e.version))return!0;return!!n._dirty}function bu(n){if(n.flags&4&&!(n.flags&16)||(n.flags&=-17,n.globalVersion===ir)||(n.globalVersion=ir,!n.isSSR&&n.flags&128&&(!n.deps&&!n._dirty||!Bo(n))))return;n.flags|=2;const e=n.dep,t=mt,i=Mn;mt=n,Mn=!0;try{vu(n);const s=n.fn(n._value);(e.version===0||mi(s,n._value))&&(n.flags|=128,n._value=s,e.version++)}catch(s){throw e.version++,s}finally{mt=t,Mn=i,xu(n),n.flags&=-3}}function jl(n,e=!1){const{dep:t,prevSub:i,nextSub:s}=n;if(i&&(i.nextSub=s,n.prevSub=void 0),s&&(s.prevSub=i,n.nextSub=void 0),t.subs===n&&(t.subs=i,!i&&t.computed)){t.computed.flags&=-5;for(let r=t.computed.deps;r;r=r.nextDep)jl(r,!0)}!e&&!--t.sc&&t.map&&t.map.delete(t.key)}function hf(n){const{prevDep:e,nextDep:t}=n;e&&(e.nextDep=t,n.prevDep=void 0),t&&(t.prevDep=e,n.nextDep=void 0)}let Mn=!0;const yu=[];function ti(){yu.push(Mn),Mn=!1}function ni(){const n=yu.pop();Mn=n===void 0?!0:n}function Tc(n){const{cleanup:e}=n;if(n.cleanup=void 0,e){const t=mt;mt=void 0;try{e()}finally{mt=t}}}let ir=0;class ff{constructor(e,t){this.sub=e,this.dep=t,this.version=t.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class $l{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!mt||!Mn||mt===this.computed)return;let t=this.activeLink;if(t===void 0||t.sub!==mt)t=this.activeLink=new ff(mt,this),mt.deps?(t.prevDep=mt.depsTail,mt.depsTail.nextDep=t,mt.depsTail=t):mt.deps=mt.depsTail=t,Mu(t);else if(t.version===-1&&(t.version=this.version,t.nextDep)){const i=t.nextDep;i.prevDep=t.prevDep,t.prevDep&&(t.prevDep.nextDep=i),t.prevDep=mt.depsTail,t.nextDep=void 0,mt.depsTail.nextDep=t,mt.depsTail=t,mt.deps===t&&(mt.deps=i)}return t}trigger(e){this.version++,ir++,this.notify(e)}notify(e){Wl();try{for(let t=this.subs;t;t=t.prevSub)t.sub.notify()&&t.sub.dep.notify()}finally{Xl()}}}function Mu(n){if(n.dep.sc++,n.sub.flags&4){const e=n.dep.computed;if(e&&!n.dep.subs){e.flags|=20;for(let i=e.deps;i;i=i.nextDep)Mu(i)}const t=n.dep.subs;t!==n&&(n.prevSub=t,t&&(t.nextSub=n)),n.dep.subs=n}}const zo=new WeakMap,ki=Symbol(""),Ho=Symbol(""),sr=Symbol("");function Bt(n,e,t){if(Mn&&mt){let i=zo.get(n);i||zo.set(n,i=new Map);let s=i.get(t);s||(i.set(t,s=new $l),s.map=i,s.key=t),s.track()}}function Zn(n,e,t,i,s,r){const a=zo.get(n);if(!a){ir++;return}const o=l=>{l&&l.trigger()};if(Wl(),e==="clear")a.forEach(o);else{const l=We(n),c=l&&Gl(t);if(l&&t==="length"){const d=Number(i);a.forEach((u,f)=>{(f==="length"||f===sr||!Bn(f)&&f>=d)&&o(u)})}else switch((t!==void 0||a.has(void 0))&&o(a.get(t)),c&&o(a.get(sr)),e){case"add":l?c&&o(a.get("length")):(o(a.get(ki)),ys(n)&&o(a.get(Ho)));break;case"delete":l||(o(a.get(ki)),ys(n)&&o(a.get(Ho)));break;case"set":ys(n)&&o(a.get(ki));break}}Xl()}function Zi(n){const e=rt(n);return e===n?e:(Bt(e,"iterate",sr),mn(n)?e:e.map(Ut))}function Ua(n){return Bt(n=rt(n),"iterate",sr),n}const pf={__proto__:null,[Symbol.iterator](){return Ka(this,Symbol.iterator,Ut)},concat(...n){return Zi(this).concat(...n.map(e=>We(e)?Zi(e):e))},entries(){return Ka(this,"entries",n=>(n[1]=Ut(n[1]),n))},every(n,e){return Gn(this,"every",n,e,void 0,arguments)},filter(n,e){return Gn(this,"filter",n,e,t=>t.map(Ut),arguments)},find(n,e){return Gn(this,"find",n,e,Ut,arguments)},findIndex(n,e){return Gn(this,"findIndex",n,e,void 0,arguments)},findLast(n,e){return Gn(this,"findLast",n,e,Ut,arguments)},findLastIndex(n,e){return Gn(this,"findLastIndex",n,e,void 0,arguments)},forEach(n,e){return Gn(this,"forEach",n,e,void 0,arguments)},includes(...n){return Za(this,"includes",n)},indexOf(...n){return Za(this,"indexOf",n)},join(n){return Zi(this).join(n)},lastIndexOf(...n){return Za(this,"lastIndexOf",n)},map(n,e){return Gn(this,"map",n,e,void 0,arguments)},pop(){return Bs(this,"pop")},push(...n){return Bs(this,"push",n)},reduce(n,...e){return Ac(this,"reduce",n,e)},reduceRight(n,...e){return Ac(this,"reduceRight",n,e)},shift(){return Bs(this,"shift")},some(n,e){return Gn(this,"some",n,e,void 0,arguments)},splice(...n){return Bs(this,"splice",n)},toReversed(){return Zi(this).toReversed()},toSorted(n){return Zi(this).toSorted(n)},toSpliced(...n){return Zi(this).toSpliced(...n)},unshift(...n){return Bs(this,"unshift",n)},values(){return Ka(this,"values",Ut)}};function Ka(n,e,t){const i=Ua(n),s=i[e]();return i!==n&&!mn(n)&&(s._next=s.next,s.next=()=>{const r=s._next();return r.done||(r.value=t(r.value)),r}),s}const mf=Array.prototype;function Gn(n,e,t,i,s,r){const a=Ua(n),o=a!==n&&!mn(n),l=a[e];if(l!==mf[e]){const u=l.apply(n,r);return o?Ut(u):u}let c=t;a!==n&&(o?c=function(u,f){return t.call(this,Ut(u),f,n)}:t.length>2&&(c=function(u,f){return t.call(this,u,f,n)}));const d=l.call(a,c,i);return o&&s?s(d):d}function Ac(n,e,t,i){const s=Ua(n);let r=t;return s!==n&&(mn(n)?t.length>3&&(r=function(a,o,l){return t.call(this,a,o,l,n)}):r=function(a,o,l){return t.call(this,a,Ut(o),l,n)}),s[e](r,...i)}function Za(n,e,t){const i=rt(n);Bt(i,"iterate",sr);const s=i[e](...t);return(s===-1||s===!1)&&Zl(t[0])?(t[0]=rt(t[0]),i[e](...t)):s}function Bs(n,e,t=[]){ti(),Wl();const i=rt(n)[e].apply(n,t);return Xl(),ni(),i}const gf=Hl("__proto__,__v_isRef,__isVue"),Su=new Set(Object.getOwnPropertyNames(Symbol).filter(n=>n!=="arguments"&&n!=="caller").map(n=>Symbol[n]).filter(Bn));function _f(n){Bn(n)||(n=String(n));const e=rt(this);return Bt(e,"has",n),e.hasOwnProperty(n)}class Eu{constructor(e=!1,t=!1){this._isReadonly=e,this._isShallow=t}get(e,t,i){if(t==="__v_skip")return e.__v_skip;const s=this._isReadonly,r=this._isShallow;if(t==="__v_isReactive")return!s;if(t==="__v_isReadonly")return s;if(t==="__v_isShallow")return r;if(t==="__v_raw")return i===(s?r?wf:Cu:r?wu:Au).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(i)?e:void 0;const a=We(e);if(!s){let l;if(a&&(l=pf[t]))return l;if(t==="hasOwnProperty")return _f}const o=Reflect.get(e,t,Ht(e)?e:i);if((Bn(t)?Su.has(t):gf(t))||(s||Bt(e,"get",t),r))return o;if(Ht(o)){const l=a&&Gl(t)?o:o.value;return s&&gt(l)?ko(l):l}return gt(o)?s?ko(o):pr(o):o}}class Tu extends Eu{constructor(e=!1){super(!1,e)}set(e,t,i,s){let r=e[t];if(!this._isShallow){const l=bi(r);if(!mn(i)&&!bi(i)&&(r=rt(r),i=rt(i)),!We(e)&&Ht(r)&&!Ht(i))return l||(r.value=i),!0}const a=We(e)&&Gl(t)?Number(t)<e.length:at(e,t),o=Reflect.set(e,t,i,Ht(e)?e:s);return e===rt(s)&&(a?mi(i,r)&&Zn(e,"set",t,i):Zn(e,"add",t,i)),o}deleteProperty(e,t){const i=at(e,t);e[t];const s=Reflect.deleteProperty(e,t);return s&&i&&Zn(e,"delete",t,void 0),s}has(e,t){const i=Reflect.has(e,t);return(!Bn(t)||!Su.has(t))&&Bt(e,"has",t),i}ownKeys(e){return Bt(e,"iterate",We(e)?"length":ki),Reflect.ownKeys(e)}}class vf extends Eu{constructor(e=!1){super(!0,e)}set(e,t){return!0}deleteProperty(e,t){return!0}}const xf=new Tu,bf=new vf,yf=new Tu(!0);const Vo=n=>n,Mr=n=>Reflect.getPrototypeOf(n);function Mf(n,e,t){return function(...i){const s=this.__v_raw,r=rt(s),a=ys(r),o=n==="entries"||n===Symbol.iterator&&a,l=n==="keys"&&a,c=s[n](...i),d=t?Vo:e?ha:Ut;return!e&&Bt(r,"iterate",l?Ho:ki),{next(){const{value:u,done:f}=c.next();return f?{value:u,done:f}:{value:o?[d(u[0]),d(u[1])]:d(u),done:f}},[Symbol.iterator](){return this}}}}function Sr(n){return function(...e){return n==="delete"?!1:n==="clear"?void 0:this}}function Sf(n,e){const t={get(s){const r=this.__v_raw,a=rt(r),o=rt(s);n||(mi(s,o)&&Bt(a,"get",s),Bt(a,"get",o));const{has:l}=Mr(a),c=e?Vo:n?ha:Ut;if(l.call(a,s))return c(r.get(s));if(l.call(a,o))return c(r.get(o));r!==a&&r.get(s)},get size(){const s=this.__v_raw;return!n&&Bt(rt(s),"iterate",ki),s.size},has(s){const r=this.__v_raw,a=rt(r),o=rt(s);return n||(mi(s,o)&&Bt(a,"has",s),Bt(a,"has",o)),s===o?r.has(s):r.has(s)||r.has(o)},forEach(s,r){const a=this,o=a.__v_raw,l=rt(o),c=e?Vo:n?ha:Ut;return!n&&Bt(l,"iterate",ki),o.forEach((d,u)=>s.call(r,c(d),c(u),a))}};return Vt(t,n?{add:Sr("add"),set:Sr("set"),delete:Sr("delete"),clear:Sr("clear")}:{add(s){!e&&!mn(s)&&!bi(s)&&(s=rt(s));const r=rt(this);return Mr(r).has.call(r,s)||(r.add(s),Zn(r,"add",s,s)),this},set(s,r){!e&&!mn(r)&&!bi(r)&&(r=rt(r));const a=rt(this),{has:o,get:l}=Mr(a);let c=o.call(a,s);c||(s=rt(s),c=o.call(a,s));const d=l.call(a,s);return a.set(s,r),c?mi(r,d)&&Zn(a,"set",s,r):Zn(a,"add",s,r),this},delete(s){const r=rt(this),{has:a,get:o}=Mr(r);let l=a.call(r,s);l||(s=rt(s),l=a.call(r,s)),o&&o.call(r,s);const c=r.delete(s);return l&&Zn(r,"delete",s,void 0),c},clear(){const s=rt(this),r=s.size!==0,a=s.clear();return r&&Zn(s,"clear",void 0,void 0),a}}),["keys","values","entries",Symbol.iterator].forEach(s=>{t[s]=Mf(s,n,e)}),t}function Yl(n,e){const t=Sf(n,e);return(i,s,r)=>s==="__v_isReactive"?!n:s==="__v_isReadonly"?n:s==="__v_raw"?i:Reflect.get(at(t,s)&&s in i?t:i,s,r)}const Ef={get:Yl(!1,!1)},Tf={get:Yl(!1,!0)},Af={get:Yl(!0,!1)};const Au=new WeakMap,wu=new WeakMap,Cu=new WeakMap,wf=new WeakMap;function Cf(n){switch(n){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function Rf(n){return n.__v_skip||!Object.isExtensible(n)?0:Cf(Jh(n))}function pr(n){return bi(n)?n:Kl(n,!1,xf,Ef,Au)}function Pf(n){return Kl(n,!1,yf,Tf,wu)}function ko(n){return Kl(n,!0,bf,Af,Cu)}function Kl(n,e,t,i,s){if(!gt(n)||n.__v_raw&&!(e&&n.__v_isReactive))return n;const r=Rf(n);if(r===0)return n;const a=s.get(n);if(a)return a;const o=new Proxy(n,r===2?i:t);return s.set(n,o),o}function Ms(n){return bi(n)?Ms(n.__v_raw):!!(n&&n.__v_isReactive)}function bi(n){return!!(n&&n.__v_isReadonly)}function mn(n){return!!(n&&n.__v_isShallow)}function Zl(n){return n?!!n.__v_raw:!1}function rt(n){const e=n&&n.__v_raw;return e?rt(e):n}function Df(n){return!at(n,"__v_skip")&&Object.isExtensible(n)&&uu(n,"__v_skip",!0),n}const Ut=n=>gt(n)?pr(n):n,ha=n=>gt(n)?ko(n):n;function Ht(n){return n?n.__v_isRef===!0:!1}function zt(n){return If(n,!1)}function If(n,e){return Ht(n)?n:new Lf(n,e)}class Lf{constructor(e,t){this.dep=new $l,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=t?e:rt(e),this._value=t?e:Ut(e),this.__v_isShallow=t}get value(){return this.dep.track(),this._value}set value(e){const t=this._rawValue,i=this.__v_isShallow||mn(e)||bi(e);e=i?e:rt(e),mi(e,t)&&(this._rawValue=e,this._value=i?e:Ut(e),this.dep.trigger())}}function _s(n){return Ht(n)?n.value:n}const Uf={get:(n,e,t)=>e==="__v_raw"?n:_s(Reflect.get(n,e,t)),set:(n,e,t,i)=>{const s=n[e];return Ht(s)&&!Ht(t)?(s.value=t,!0):Reflect.set(n,e,t,i)}};function Ru(n){return Ms(n)?n:new Proxy(n,Uf)}class Nf{constructor(e,t,i){this.fn=e,this.setter=t,this._value=void 0,this.dep=new $l(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=ir-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!t,this.isSSR=i}notify(){if(this.flags|=16,!(this.flags&8)&&mt!==this)return _u(this,!0),!0}get value(){const e=this.dep.track();return bu(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}function Ff(n,e,t=!1){let i,s;return $e(n)?i=n:(i=n.get,s=n.set),new Nf(i,s,t)}const Er={},fa=new WeakMap;let Ni;function Of(n,e=!1,t=Ni){if(t){let i=fa.get(t);i||fa.set(t,i=[]),i.push(n)}}function Bf(n,e,t=ft){const{immediate:i,deep:s,once:r,scheduler:a,augmentJob:o,call:l}=t,c=M=>s?M:mn(M)||s===!1||s===0?Jn(M,1):Jn(M);let d,u,f,p,g=!1,x=!1;if(Ht(n)?(u=()=>n.value,g=mn(n)):Ms(n)?(u=()=>c(n),g=!0):We(n)?(x=!0,g=n.some(M=>Ms(M)||mn(M)),u=()=>n.map(M=>{if(Ht(M))return M.value;if(Ms(M))return c(M);if($e(M))return l?l(M,2):M()})):$e(n)?e?u=l?()=>l(n,2):n:u=()=>{if(f){ti();try{f()}finally{ni()}}const M=Ni;Ni=d;try{return l?l(n,3,[p]):n(p)}finally{Ni=M}}:u=On,e&&s){const M=u,C=s===!0?1/0:s;u=()=>Jn(M(),C)}const m=uf(),h=()=>{d.stop(),m&&m.active&&kl(m.effects,d)};if(r&&e){const M=e;e=(...C)=>{M(...C),h()}}let T=x?new Array(n.length).fill(Er):Er;const w=M=>{if(!(!(d.flags&1)||!d.dirty&&!M))if(e){const C=d.run();if(s||g||(x?C.some((R,P)=>mi(R,T[P])):mi(C,T))){f&&f();const R=Ni;Ni=d;try{const P=[C,T===Er?void 0:x&&T[0]===Er?[]:T,p];T=C,l?l(e,3,P):e(...P)}finally{Ni=R}}}else d.run()};return o&&o(w),d=new mu(u),d.scheduler=a?()=>a(w,!1):w,p=M=>Of(M,!1,d),f=d.onStop=()=>{const M=fa.get(d);if(M){if(l)l(M,4);else for(const C of M)C();fa.delete(d)}},e?i?w(!0):T=d.run():a?a(w.bind(null,!0),!0):d.run(),h.pause=d.pause.bind(d),h.resume=d.resume.bind(d),h.stop=h,h}function Jn(n,e=1/0,t){if(e<=0||!gt(n)||n.__v_skip||(t=t||new Map,(t.get(n)||0)>=e))return n;if(t.set(n,e),e--,Ht(n))Jn(n.value,e,t);else if(We(n))for(let i=0;i<n.length;i++)Jn(n[i],e,t);else if(Pa(n)||ys(n))n.forEach(i=>{Jn(i,e,t)});else if(cu(n)){for(const i in n)Jn(n[i],e,t);for(const i of Object.getOwnPropertySymbols(n))Object.prototype.propertyIsEnumerable.call(n,i)&&Jn(n[i],e,t)}return n}/**
* @vue/runtime-core v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function mr(n,e,t,i){try{return i?n(...i):n()}catch(s){Na(s,e,t)}}function zn(n,e,t,i){if($e(n)){const s=mr(n,e,t,i);return s&&ou(s)&&s.catch(r=>{Na(r,e,t)}),s}if(We(n)){const s=[];for(let r=0;r<n.length;r++)s.push(zn(n[r],e,t,i));return s}}function Na(n,e,t,i=!0){const s=e?e.vnode:null,{errorHandler:r,throwUnhandledErrorInProduction:a}=e&&e.appContext.config||ft;if(e){let o=e.parent;const l=e.proxy,c=`https://vuejs.org/error-reference/#runtime-${t}`;for(;o;){const d=o.ec;if(d){for(let u=0;u<d.length;u++)if(d[u](n,l,c)===!1)return}o=o.parent}if(r){ti(),mr(r,null,10,[n,l,c]),ni();return}}zf(n,t,s,i,a)}function zf(n,e,t,i=!0,s=!1){if(s)throw n;console.error(n)}const Xt=[];let Pn=-1;const Ss=[];let di=null,gs=0;const Pu=Promise.resolve();let pa=null;function Du(n){const e=pa||Pu;return n?e.then(this?n.bind(this):n):e}function Hf(n){let e=Pn+1,t=Xt.length;for(;e<t;){const i=e+t>>>1,s=Xt[i],r=rr(s);r<n||r===n&&s.flags&2?e=i+1:t=i}return e}function Jl(n){if(!(n.flags&1)){const e=rr(n),t=Xt[Xt.length-1];!t||!(n.flags&2)&&e>=rr(t)?Xt.push(n):Xt.splice(Hf(e),0,n),n.flags|=1,Iu()}}function Iu(){pa||(pa=Pu.then(Uu))}function Vf(n){We(n)?Ss.push(...n):di&&n.id===-1?di.splice(gs+1,0,n):n.flags&1||(Ss.push(n),n.flags|=1),Iu()}function wc(n,e,t=Pn+1){for(;t<Xt.length;t++){const i=Xt[t];if(i&&i.flags&2){if(n&&i.id!==n.uid)continue;Xt.splice(t,1),t--,i.flags&4&&(i.flags&=-2),i(),i.flags&4||(i.flags&=-2)}}}function Lu(n){if(Ss.length){const e=[...new Set(Ss)].sort((t,i)=>rr(t)-rr(i));if(Ss.length=0,di){di.push(...e);return}for(di=e,gs=0;gs<di.length;gs++){const t=di[gs];t.flags&4&&(t.flags&=-2),t.flags&8||t(),t.flags&=-2}di=null,gs=0}}const rr=n=>n.id==null?n.flags&2?-1:1/0:n.id;function Uu(n){try{for(Pn=0;Pn<Xt.length;Pn++){const e=Xt[Pn];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),mr(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;Pn<Xt.length;Pn++){const e=Xt[Pn];e&&(e.flags&=-2)}Pn=-1,Xt.length=0,Lu(),pa=null,(Xt.length||Ss.length)&&Uu()}}let pn=null,Nu=null;function ma(n){const e=pn;return pn=n,Nu=n&&n.type.__scopeId||null,e}function kf(n,e=pn,t){if(!e||n._n)return n;const i=(...s)=>{i._d&&Oc(-1);const r=ma(e);let a;try{a=n(...s)}finally{ma(r),i._d&&Oc(1)}return a};return i._n=!0,i._c=!0,i._d=!0,i}function xn(n,e){if(pn===null)return n;const t=za(pn),i=n.dirs||(n.dirs=[]);for(let s=0;s<e.length;s++){let[r,a,o,l=ft]=e[s];r&&($e(r)&&(r={mounted:r,updated:r}),r.deep&&Jn(a),i.push({dir:r,instance:t,value:a,oldValue:void 0,arg:o,modifiers:l}))}return n}function wi(n,e,t,i){const s=n.dirs,r=e&&e.dirs;for(let a=0;a<s.length;a++){const o=s[a];r&&(o.oldValue=r[a].value);let l=o.dir[i];l&&(ti(),zn(l,t,8,[n.el,o,n,e]),ni())}}const Gf=Symbol("_vte"),qf=n=>n.__isTeleport,Wf=Symbol("_leaveCb");function Ql(n,e){n.shapeFlag&6&&n.component?(n.transition=e,Ql(n.component.subTree,e)):n.shapeFlag&128?(n.ssContent.transition=e.clone(n.ssContent),n.ssFallback.transition=e.clone(n.ssFallback)):n.transition=e}function Us(n,e){return $e(n)?Vt({name:n.name},e,{setup:n}):n}function Fu(n){n.ids=[n.ids[0]+n.ids[2]+++"-",0,0]}const ga=new WeakMap;function Qs(n,e,t,i,s=!1){if(We(n)){n.forEach((g,x)=>Qs(g,e&&(We(e)?e[x]:e),t,i,s));return}if(er(i)&&!s){i.shapeFlag&512&&i.type.__asyncResolved&&i.component.subTree.component&&Qs(n,e,t,i.component.subTree);return}const r=i.shapeFlag&4?za(i.component):i.el,a=s?null:r,{i:o,r:l}=n,c=e&&e.r,d=o.refs===ft?o.refs={}:o.refs,u=o.setupState,f=rt(u),p=u===ft?au:g=>at(f,g);if(c!=null&&c!==l){if(Cc(e),wt(c))d[c]=null,p(c)&&(u[c]=null);else if(Ht(c)){c.value=null;const g=e;g.k&&(d[g.k]=null)}}if($e(l))mr(l,o,12,[a,d]);else{const g=wt(l),x=Ht(l);if(g||x){const m=()=>{if(n.f){const h=g?p(l)?u[l]:d[l]:l.value;if(s)We(h)&&kl(h,r);else if(We(h))h.includes(r)||h.push(r);else if(g)d[l]=[r],p(l)&&(u[l]=d[l]);else{const T=[r];l.value=T,n.k&&(d[n.k]=T)}}else g?(d[l]=a,p(l)&&(u[l]=a)):x&&(l.value=a,n.k&&(d[n.k]=a))};if(a){const h=()=>{m(),ga.delete(n)};h.id=-1,ga.set(n,h),rn(h,t)}else Cc(n),m()}}}function Cc(n){const e=ga.get(n);e&&(e.flags|=8,ga.delete(n))}Ia().requestIdleCallback;Ia().cancelIdleCallback;const er=n=>!!n.type.__asyncLoader,Ou=n=>n.type.__isKeepAlive;function Xf(n,e){Bu(n,"a",e)}function jf(n,e){Bu(n,"da",e)}function Bu(n,e,t=jt){const i=n.__wdc||(n.__wdc=()=>{let s=t;for(;s;){if(s.isDeactivated)return;s=s.parent}return n()});if(Fa(e,i,t),t){let s=t.parent;for(;s&&s.parent;)Ou(s.parent.vnode)&&$f(i,e,t,s),s=s.parent}}function $f(n,e,t,i){const s=Fa(e,n,i,!0);Hu(()=>{kl(i[e],s)},t)}function Fa(n,e,t=jt,i=!1){if(t){const s=t[n]||(t[n]=[]),r=e.__weh||(e.__weh=(...a)=>{ti();const o=gr(t),l=zn(e,t,n,a);return o(),ni(),l});return i?s.unshift(r):s.push(r),r}}const ii=n=>(e,t=jt)=>{(!or||n==="sp")&&Fa(n,(...i)=>e(...i),t)},Yf=ii("bm"),ji=ii("m"),Kf=ii("bu"),Zf=ii("u"),zu=ii("bum"),Hu=ii("um"),Jf=ii("sp"),Qf=ii("rtg"),ep=ii("rtc");function tp(n,e=jt){Fa("ec",n,e)}const np=Symbol.for("v-ndc");function Nt(n,e,t,i){let s;const r=t,a=We(n);if(a||wt(n)){const o=a&&Ms(n);let l=!1,c=!1;o&&(l=!mn(n),c=bi(n),n=Ua(n)),s=new Array(n.length);for(let d=0,u=n.length;d<u;d++)s[d]=e(l?c?ha(Ut(n[d])):Ut(n[d]):n[d],d,void 0,r)}else if(typeof n=="number"){s=new Array(n);for(let o=0;o<n;o++)s[o]=e(o+1,o,void 0,r)}else if(gt(n))if(n[Symbol.iterator])s=Array.from(n,(o,l)=>e(o,l,void 0,r));else{const o=Object.keys(n);s=new Array(o.length);for(let l=0,c=o.length;l<c;l++){const d=o[l];s[l]=e(n[d],d,l,r)}}else s=[];return s}const Go=n=>n?lh(n)?za(n):Go(n.parent):null,tr=Vt(Object.create(null),{$:n=>n,$el:n=>n.vnode.el,$data:n=>n.data,$props:n=>n.props,$attrs:n=>n.attrs,$slots:n=>n.slots,$refs:n=>n.refs,$parent:n=>Go(n.parent),$root:n=>Go(n.root),$host:n=>n.ce,$emit:n=>n.emit,$options:n=>ku(n),$forceUpdate:n=>n.f||(n.f=()=>{Jl(n.update)}),$nextTick:n=>n.n||(n.n=Du.bind(n.proxy)),$watch:n=>Ep.bind(n)}),Ja=(n,e)=>n!==ft&&!n.__isScriptSetup&&at(n,e),ip={get({_:n},e){if(e==="__v_skip")return!0;const{ctx:t,setupState:i,data:s,props:r,accessCache:a,type:o,appContext:l}=n;let c;if(e[0]!=="$"){const p=a[e];if(p!==void 0)switch(p){case 1:return i[e];case 2:return s[e];case 4:return t[e];case 3:return r[e]}else{if(Ja(i,e))return a[e]=1,i[e];if(s!==ft&&at(s,e))return a[e]=2,s[e];if((c=n.propsOptions[0])&&at(c,e))return a[e]=3,r[e];if(t!==ft&&at(t,e))return a[e]=4,t[e];qo&&(a[e]=0)}}const d=tr[e];let u,f;if(d)return e==="$attrs"&&Bt(n.attrs,"get",""),d(n);if((u=o.__cssModules)&&(u=u[e]))return u;if(t!==ft&&at(t,e))return a[e]=4,t[e];if(f=l.config.globalProperties,at(f,e))return f[e]},set({_:n},e,t){const{data:i,setupState:s,ctx:r}=n;return Ja(s,e)?(s[e]=t,!0):i!==ft&&at(i,e)?(i[e]=t,!0):at(n.props,e)||e[0]==="$"&&e.slice(1)in n?!1:(r[e]=t,!0)},has({_:{data:n,setupState:e,accessCache:t,ctx:i,appContext:s,propsOptions:r,type:a}},o){let l,c;return!!(t[o]||n!==ft&&o[0]!=="$"&&at(n,o)||Ja(e,o)||(l=r[0])&&at(l,o)||at(i,o)||at(tr,o)||at(s.config.globalProperties,o)||(c=a.__cssModules)&&c[o])},defineProperty(n,e,t){return t.get!=null?n._.accessCache[e]=0:at(t,"value")&&this.set(n,e,t.value,null),Reflect.defineProperty(n,e,t)}};function Rc(n){return We(n)?n.reduce((e,t)=>(e[t]=null,e),{}):n}let qo=!0;function sp(n){const e=ku(n),t=n.proxy,i=n.ctx;qo=!1,e.beforeCreate&&Pc(e.beforeCreate,n,"bc");const{data:s,computed:r,methods:a,watch:o,provide:l,inject:c,created:d,beforeMount:u,mounted:f,beforeUpdate:p,updated:g,activated:x,deactivated:m,beforeDestroy:h,beforeUnmount:T,destroyed:w,unmounted:M,render:C,renderTracked:R,renderTriggered:P,errorCaptured:F,serverPrefetch:E,expose:S,inheritAttrs:L,components:$,directives:J,filters:se}=e;if(c&&rp(c,i,null),a)for(const ne in a){const V=a[ne];$e(V)&&(i[ne]=V.bind(t))}if(s){const ne=s.call(t,t);gt(ne)&&(n.data=pr(ne))}if(qo=!0,r)for(const ne in r){const V=r[ne],me=$e(V)?V.bind(t,t):$e(V.get)?V.get.bind(t,t):On,ye=!$e(V)&&$e(V.set)?V.set.bind(t):On,Le=$t({get:me,set:ye});Object.defineProperty(i,ne,{enumerable:!0,configurable:!0,get:()=>Le.value,set:ke=>Le.value=ke})}if(o)for(const ne in o)Vu(o[ne],i,t,ne);if(l){const ne=$e(l)?l.call(t):l;Reflect.ownKeys(ne).forEach(V=>{up(V,ne[V])})}d&&Pc(d,n,"c");function Q(ne,V){We(V)?V.forEach(me=>ne(me.bind(t))):V&&ne(V.bind(t))}if(Q(Yf,u),Q(ji,f),Q(Kf,p),Q(Zf,g),Q(Xf,x),Q(jf,m),Q(tp,F),Q(ep,R),Q(Qf,P),Q(zu,T),Q(Hu,M),Q(Jf,E),We(S))if(S.length){const ne=n.exposed||(n.exposed={});S.forEach(V=>{Object.defineProperty(ne,V,{get:()=>t[V],set:me=>t[V]=me,enumerable:!0})})}else n.exposed||(n.exposed={});C&&n.render===On&&(n.render=C),L!=null&&(n.inheritAttrs=L),$&&(n.components=$),J&&(n.directives=J),E&&Fu(n)}function rp(n,e,t=On){We(n)&&(n=Wo(n));for(const i in n){const s=n[i];let r;gt(s)?"default"in s?r=ta(s.from||i,s.default,!0):r=ta(s.from||i):r=ta(s),Ht(r)?Object.defineProperty(e,i,{enumerable:!0,configurable:!0,get:()=>r.value,set:a=>r.value=a}):e[i]=r}}function Pc(n,e,t){zn(We(n)?n.map(i=>i.bind(e.proxy)):n.bind(e.proxy),e,t)}function Vu(n,e,t,i){let s=i.includes(".")?th(t,i):()=>t[i];if(wt(n)){const r=e[n];$e(r)&&St(s,r)}else if($e(n))St(s,n.bind(t));else if(gt(n))if(We(n))n.forEach(r=>Vu(r,e,t,i));else{const r=$e(n.handler)?n.handler.bind(t):e[n.handler];$e(r)&&St(s,r,n)}}function ku(n){const e=n.type,{mixins:t,extends:i}=e,{mixins:s,optionsCache:r,config:{optionMergeStrategies:a}}=n.appContext,o=r.get(e);let l;return o?l=o:!s.length&&!t&&!i?l=e:(l={},s.length&&s.forEach(c=>_a(l,c,a,!0)),_a(l,e,a)),gt(e)&&r.set(e,l),l}function _a(n,e,t,i=!1){const{mixins:s,extends:r}=e;r&&_a(n,r,t,!0),s&&s.forEach(a=>_a(n,a,t,!0));for(const a in e)if(!(i&&a==="expose")){const o=ap[a]||t&&t[a];n[a]=o?o(n[a],e[a]):e[a]}return n}const ap={data:Dc,props:Ic,emits:Ic,methods:$s,computed:$s,beforeCreate:qt,created:qt,beforeMount:qt,mounted:qt,beforeUpdate:qt,updated:qt,beforeDestroy:qt,beforeUnmount:qt,destroyed:qt,unmounted:qt,activated:qt,deactivated:qt,errorCaptured:qt,serverPrefetch:qt,components:$s,directives:$s,watch:lp,provide:Dc,inject:op};function Dc(n,e){return e?n?function(){return Vt($e(n)?n.call(this,this):n,$e(e)?e.call(this,this):e)}:e:n}function op(n,e){return $s(Wo(n),Wo(e))}function Wo(n){if(We(n)){const e={};for(let t=0;t<n.length;t++)e[n[t]]=n[t];return e}return n}function qt(n,e){return n?[...new Set([].concat(n,e))]:e}function $s(n,e){return n?Vt(Object.create(null),n,e):e}function Ic(n,e){return n?We(n)&&We(e)?[...new Set([...n,...e])]:Vt(Object.create(null),Rc(n),Rc(e??{})):e}function lp(n,e){if(!n)return e;if(!e)return n;const t=Vt(Object.create(null),n);for(const i in e)t[i]=qt(n[i],e[i]);return t}function Gu(){return{app:null,config:{isNativeTag:au,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let cp=0;function dp(n,e){return function(i,s=null){$e(i)||(i=Vt({},i)),s!=null&&!gt(s)&&(s=null);const r=Gu(),a=new WeakSet,o=[];let l=!1;const c=r.app={_uid:cp++,_component:i,_props:s,_container:null,_context:r,_instance:null,version:Xp,get config(){return r.config},set config(d){},use(d,...u){return a.has(d)||(d&&$e(d.install)?(a.add(d),d.install(c,...u)):$e(d)&&(a.add(d),d(c,...u))),c},mixin(d){return r.mixins.includes(d)||r.mixins.push(d),c},component(d,u){return u?(r.components[d]=u,c):r.components[d]},directive(d,u){return u?(r.directives[d]=u,c):r.directives[d]},mount(d,u,f){if(!l){const p=c._ceVNode||Lt(i,s);return p.appContext=r,f===!0?f="svg":f===!1&&(f=void 0),n(p,d,f),l=!0,c._container=d,d.__vue_app__=c,za(p.component)}},onUnmount(d){o.push(d)},unmount(){l&&(zn(o,c._instance,16),n(null,c._container),delete c._container.__vue_app__)},provide(d,u){return r.provides[d]=u,c},runWithContext(d){const u=Es;Es=c;try{return d()}finally{Es=u}}};return c}}let Es=null;function up(n,e){if(jt){let t=jt.provides;const i=jt.parent&&jt.parent.provides;i===t&&(t=jt.provides=Object.create(i)),t[n]=e}}function ta(n,e,t=!1){const i=Hp();if(i||Es){let s=Es?Es._context.provides:i?i.parent==null||i.ce?i.vnode.appContext&&i.vnode.appContext.provides:i.parent.provides:void 0;if(s&&n in s)return s[n];if(arguments.length>1)return t&&$e(e)?e.call(i&&i.proxy):e}}const qu={},Wu=()=>Object.create(qu),Xu=n=>Object.getPrototypeOf(n)===qu;function hp(n,e,t,i=!1){const s={},r=Wu();n.propsDefaults=Object.create(null),ju(n,e,s,r);for(const a in n.propsOptions[0])a in s||(s[a]=void 0);t?n.props=i?s:Pf(s):n.type.props?n.props=s:n.props=r,n.attrs=r}function fp(n,e,t,i){const{props:s,attrs:r,vnode:{patchFlag:a}}=n,o=rt(s),[l]=n.propsOptions;let c=!1;if((i||a>0)&&!(a&16)){if(a&8){const d=n.vnode.dynamicProps;for(let u=0;u<d.length;u++){let f=d[u];if(Oa(n.emitsOptions,f))continue;const p=e[f];if(l)if(at(r,f))p!==r[f]&&(r[f]=p,c=!0);else{const g=xi(f);s[g]=Xo(l,o,g,p,n,!1)}else p!==r[f]&&(r[f]=p,c=!0)}}}else{ju(n,e,s,r)&&(c=!0);let d;for(const u in o)(!e||!at(e,u)&&((d=Xi(u))===u||!at(e,d)))&&(l?t&&(t[u]!==void 0||t[d]!==void 0)&&(s[u]=Xo(l,o,u,void 0,n,!0)):delete s[u]);if(r!==o)for(const u in r)(!e||!at(e,u))&&(delete r[u],c=!0)}c&&Zn(n.attrs,"set","")}function ju(n,e,t,i){const[s,r]=n.propsOptions;let a=!1,o;if(e)for(let l in e){if(Ks(l))continue;const c=e[l];let d;s&&at(s,d=xi(l))?!r||!r.includes(d)?t[d]=c:(o||(o={}))[d]=c:Oa(n.emitsOptions,l)||(!(l in i)||c!==i[l])&&(i[l]=c,a=!0)}if(r){const l=rt(t),c=o||ft;for(let d=0;d<r.length;d++){const u=r[d];t[u]=Xo(s,l,u,c[u],n,!at(c,u))}}return a}function Xo(n,e,t,i,s,r){const a=n[t];if(a!=null){const o=at(a,"default");if(o&&i===void 0){const l=a.default;if(a.type!==Function&&!a.skipFactory&&$e(l)){const{propsDefaults:c}=s;if(t in c)i=c[t];else{const d=gr(s);i=c[t]=l.call(null,e),d()}}else i=l;s.ce&&s.ce._setProp(t,i)}a[0]&&(r&&!o?i=!1:a[1]&&(i===""||i===Xi(t))&&(i=!0))}return i}const pp=new WeakMap;function $u(n,e,t=!1){const i=t?pp:e.propsCache,s=i.get(n);if(s)return s;const r=n.props,a={},o=[];let l=!1;if(!$e(n)){const d=u=>{l=!0;const[f,p]=$u(u,e,!0);Vt(a,f),p&&o.push(...p)};!t&&e.mixins.length&&e.mixins.forEach(d),n.extends&&d(n.extends),n.mixins&&n.mixins.forEach(d)}if(!r&&!l)return gt(n)&&i.set(n,bs),bs;if(We(r))for(let d=0;d<r.length;d++){const u=xi(r[d]);Lc(u)&&(a[u]=ft)}else if(r)for(const d in r){const u=xi(d);if(Lc(u)){const f=r[d],p=a[u]=We(f)||$e(f)?{type:f}:Vt({},f),g=p.type;let x=!1,m=!0;if(We(g))for(let h=0;h<g.length;++h){const T=g[h],w=$e(T)&&T.name;if(w==="Boolean"){x=!0;break}else w==="String"&&(m=!1)}else x=$e(g)&&g.name==="Boolean";p[0]=x,p[1]=m,(x||at(p,"default"))&&o.push(u)}}const c=[a,o];return gt(n)&&i.set(n,c),c}function Lc(n){return n[0]!=="$"&&!Ks(n)}const ec=n=>n==="_"||n==="_ctx"||n==="$stable",tc=n=>We(n)?n.map(Dn):[Dn(n)],mp=(n,e,t)=>{if(e._n)return e;const i=kf((...s)=>tc(e(...s)),t);return i._c=!1,i},Yu=(n,e,t)=>{const i=n._ctx;for(const s in n){if(ec(s))continue;const r=n[s];if($e(r))e[s]=mp(s,r,i);else if(r!=null){const a=tc(r);e[s]=()=>a}}},Ku=(n,e)=>{const t=tc(e);n.slots.default=()=>t},Zu=(n,e,t)=>{for(const i in e)(t||!ec(i))&&(n[i]=e[i])},gp=(n,e,t)=>{const i=n.slots=Wu();if(n.vnode.shapeFlag&32){const s=e._;s?(Zu(i,e,t),t&&uu(i,"_",s,!0)):Yu(e,i)}else e&&Ku(n,e)},_p=(n,e,t)=>{const{vnode:i,slots:s}=n;let r=!0,a=ft;if(i.shapeFlag&32){const o=e._;o?t&&o===1?r=!1:Zu(s,e,t):(r=!e.$stable,Yu(e,s)),a=e}else e&&(Ku(n,e),a={default:1});if(r)for(const o in s)!ec(o)&&a[o]==null&&delete s[o]},rn=Ip;function vp(n){return xp(n)}function xp(n,e){const t=Ia();t.__VUE__=!0;const{insert:i,remove:s,patchProp:r,createElement:a,createText:o,createComment:l,setText:c,setElementText:d,parentNode:u,nextSibling:f,setScopeId:p=On,insertStaticContent:g}=n,x=(A,_,H,X=null,G=null,O=null,oe=void 0,j=null,ee=!!_.dynamicChildren)=>{if(A===_)return;A&&!zs(A,_)&&(X=Z(A),ke(A,G,O,!0),A=null),_.patchFlag===-2&&(ee=!1,_.dynamicChildren=null);const{type:re,ref:Ee,shapeFlag:b}=_;switch(re){case Ba:m(A,_,H,X);break;case yi:h(A,_,H,X);break;case na:A==null&&T(_,H,X,oe);break;case nt:$(A,_,H,X,G,O,oe,j,ee);break;default:b&1?C(A,_,H,X,G,O,oe,j,ee):b&6?J(A,_,H,X,G,O,oe,j,ee):(b&64||b&128)&&re.process(A,_,H,X,G,O,oe,j,ee,le)}Ee!=null&&G?Qs(Ee,A&&A.ref,O,_||A,!_):Ee==null&&A&&A.ref!=null&&Qs(A.ref,null,O,A,!0)},m=(A,_,H,X)=>{if(A==null)i(_.el=o(_.children),H,X);else{const G=_.el=A.el;_.children!==A.children&&c(G,_.children)}},h=(A,_,H,X)=>{A==null?i(_.el=l(_.children||""),H,X):_.el=A.el},T=(A,_,H,X)=>{[A.el,A.anchor]=g(A.children,_,H,X,A.el,A.anchor)},w=({el:A,anchor:_},H,X)=>{let G;for(;A&&A!==_;)G=f(A),i(A,H,X),A=G;i(_,H,X)},M=({el:A,anchor:_})=>{let H;for(;A&&A!==_;)H=f(A),s(A),A=H;s(_)},C=(A,_,H,X,G,O,oe,j,ee)=>{_.type==="svg"?oe="svg":_.type==="math"&&(oe="mathml"),A==null?R(_,H,X,G,O,oe,j,ee):E(A,_,G,O,oe,j,ee)},R=(A,_,H,X,G,O,oe,j)=>{let ee,re;const{props:Ee,shapeFlag:b,transition:v,dirs:I}=A;if(ee=A.el=a(A.type,O,Ee&&Ee.is,Ee),b&8?d(ee,A.children):b&16&&F(A.children,ee,null,X,G,Qa(A,O),oe,j),I&&wi(A,null,X,"created"),P(ee,A,A.scopeId,oe,X),Ee){for(const te in Ee)te!=="value"&&!Ks(te)&&r(ee,te,null,Ee[te],O,X);"value"in Ee&&r(ee,"value",null,Ee.value,O),(re=Ee.onVnodeBeforeMount)&&Rn(re,X,A)}I&&wi(A,null,X,"beforeMount");const q=bp(G,v);q&&v.beforeEnter(ee),i(ee,_,H),((re=Ee&&Ee.onVnodeMounted)||q||I)&&rn(()=>{re&&Rn(re,X,A),q&&v.enter(ee),I&&wi(A,null,X,"mounted")},G)},P=(A,_,H,X,G)=>{if(H&&p(A,H),X)for(let O=0;O<X.length;O++)p(A,X[O]);if(G){let O=G.subTree;if(_===O||ih(O.type)&&(O.ssContent===_||O.ssFallback===_)){const oe=G.vnode;P(A,oe,oe.scopeId,oe.slotScopeIds,G.parent)}}},F=(A,_,H,X,G,O,oe,j,ee=0)=>{for(let re=ee;re<A.length;re++){const Ee=A[re]=j?ui(A[re]):Dn(A[re]);x(null,Ee,_,H,X,G,O,oe,j)}},E=(A,_,H,X,G,O,oe)=>{const j=_.el=A.el;let{patchFlag:ee,dynamicChildren:re,dirs:Ee}=_;ee|=A.patchFlag&16;const b=A.props||ft,v=_.props||ft;let I;if(H&&Ci(H,!1),(I=v.onVnodeBeforeUpdate)&&Rn(I,H,_,A),Ee&&wi(_,A,H,"beforeUpdate"),H&&Ci(H,!0),(b.innerHTML&&v.innerHTML==null||b.textContent&&v.textContent==null)&&d(j,""),re?S(A.dynamicChildren,re,j,H,X,Qa(_,G),O):oe||V(A,_,j,null,H,X,Qa(_,G),O,!1),ee>0){if(ee&16)L(j,b,v,H,G);else if(ee&2&&b.class!==v.class&&r(j,"class",null,v.class,G),ee&4&&r(j,"style",b.style,v.style,G),ee&8){const q=_.dynamicProps;for(let te=0;te<q.length;te++){const W=q[te],Ae=b[W],ce=v[W];(ce!==Ae||W==="value")&&r(j,W,Ae,ce,G,H)}}ee&1&&A.children!==_.children&&d(j,_.children)}else!oe&&re==null&&L(j,b,v,H,G);((I=v.onVnodeUpdated)||Ee)&&rn(()=>{I&&Rn(I,H,_,A),Ee&&wi(_,A,H,"updated")},X)},S=(A,_,H,X,G,O,oe)=>{for(let j=0;j<_.length;j++){const ee=A[j],re=_[j],Ee=ee.el&&(ee.type===nt||!zs(ee,re)||ee.shapeFlag&198)?u(ee.el):H;x(ee,re,Ee,null,X,G,O,oe,!0)}},L=(A,_,H,X,G)=>{if(_!==H){if(_!==ft)for(const O in _)!Ks(O)&&!(O in H)&&r(A,O,_[O],null,G,X);for(const O in H){if(Ks(O))continue;const oe=H[O],j=_[O];oe!==j&&O!=="value"&&r(A,O,j,oe,G,X)}"value"in H&&r(A,"value",_.value,H.value,G)}},$=(A,_,H,X,G,O,oe,j,ee)=>{const re=_.el=A?A.el:o(""),Ee=_.anchor=A?A.anchor:o("");let{patchFlag:b,dynamicChildren:v,slotScopeIds:I}=_;I&&(j=j?j.concat(I):I),A==null?(i(re,H,X),i(Ee,H,X),F(_.children||[],H,Ee,G,O,oe,j,ee)):b>0&&b&64&&v&&A.dynamicChildren?(S(A.dynamicChildren,v,H,G,O,oe,j),(_.key!=null||G&&_===G.subTree)&&Ju(A,_,!0)):V(A,_,H,Ee,G,O,oe,j,ee)},J=(A,_,H,X,G,O,oe,j,ee)=>{_.slotScopeIds=j,A==null?_.shapeFlag&512?G.ctx.activate(_,H,X,oe,ee):se(_,H,X,G,O,oe,ee):ie(A,_,ee)},se=(A,_,H,X,G,O,oe)=>{const j=A.component=zp(A,X,G);if(Ou(A)&&(j.ctx.renderer=le),Vp(j,!1,oe),j.asyncDep){if(G&&G.registerDep(j,Q,oe),!A.el){const ee=j.subTree=Lt(yi);h(null,ee,_,H),A.placeholder=ee.el}}else Q(j,A,_,H,G,O,oe)},ie=(A,_,H)=>{const X=_.component=A.component;if(Pp(A,_,H))if(X.asyncDep&&!X.asyncResolved){ne(X,_,H);return}else X.next=_,X.update();else _.el=A.el,X.vnode=_},Q=(A,_,H,X,G,O,oe)=>{const j=()=>{if(A.isMounted){let{next:b,bu:v,u:I,parent:q,vnode:te}=A;{const Ce=Qu(A);if(Ce){b&&(b.el=te.el,ne(A,b,oe)),Ce.asyncDep.then(()=>{A.isUnmounted||j()});return}}let W=b,Ae;Ci(A,!1),b?(b.el=te.el,ne(A,b,oe)):b=te,v&&ea(v),(Ae=b.props&&b.props.onVnodeBeforeUpdate)&&Rn(Ae,q,b,te),Ci(A,!0);const ce=Nc(A),we=A.subTree;A.subTree=ce,x(we,ce,u(we.el),Z(we),A,G,O),b.el=ce.el,W===null&&Dp(A,ce.el),I&&rn(I,G),(Ae=b.props&&b.props.onVnodeUpdated)&&rn(()=>Rn(Ae,q,b,te),G)}else{let b;const{el:v,props:I}=_,{bm:q,m:te,parent:W,root:Ae,type:ce}=A,we=er(_);Ci(A,!1),q&&ea(q),!we&&(b=I&&I.onVnodeBeforeMount)&&Rn(b,W,_),Ci(A,!0);{Ae.ce&&Ae.ce._def.shadowRoot!==!1&&Ae.ce._injectChildStyle(ce);const Ce=A.subTree=Nc(A);x(null,Ce,H,X,A,G,O),_.el=Ce.el}if(te&&rn(te,G),!we&&(b=I&&I.onVnodeMounted)){const Ce=_;rn(()=>Rn(b,W,Ce),G)}(_.shapeFlag&256||W&&er(W.vnode)&&W.vnode.shapeFlag&256)&&A.a&&rn(A.a,G),A.isMounted=!0,_=H=X=null}};A.scope.on();const ee=A.effect=new mu(j);A.scope.off();const re=A.update=ee.run.bind(ee),Ee=A.job=ee.runIfDirty.bind(ee);Ee.i=A,Ee.id=A.uid,ee.scheduler=()=>Jl(Ee),Ci(A,!0),re()},ne=(A,_,H)=>{_.component=A;const X=A.vnode.props;A.vnode=_,A.next=null,fp(A,_.props,X,H),_p(A,_.children,H),ti(),wc(A),ni()},V=(A,_,H,X,G,O,oe,j,ee=!1)=>{const re=A&&A.children,Ee=A?A.shapeFlag:0,b=_.children,{patchFlag:v,shapeFlag:I}=_;if(v>0){if(v&128){ye(re,b,H,X,G,O,oe,j,ee);return}else if(v&256){me(re,b,H,X,G,O,oe,j,ee);return}}I&8?(Ee&16&&k(re,G,O),b!==re&&d(H,b)):Ee&16?I&16?ye(re,b,H,X,G,O,oe,j,ee):k(re,G,O,!0):(Ee&8&&d(H,""),I&16&&F(b,H,X,G,O,oe,j,ee))},me=(A,_,H,X,G,O,oe,j,ee)=>{A=A||bs,_=_||bs;const re=A.length,Ee=_.length,b=Math.min(re,Ee);let v;for(v=0;v<b;v++){const I=_[v]=ee?ui(_[v]):Dn(_[v]);x(A[v],I,H,null,G,O,oe,j,ee)}re>Ee?k(A,G,O,!0,!1,b):F(_,H,X,G,O,oe,j,ee,b)},ye=(A,_,H,X,G,O,oe,j,ee)=>{let re=0;const Ee=_.length;let b=A.length-1,v=Ee-1;for(;re<=b&&re<=v;){const I=A[re],q=_[re]=ee?ui(_[re]):Dn(_[re]);if(zs(I,q))x(I,q,H,null,G,O,oe,j,ee);else break;re++}for(;re<=b&&re<=v;){const I=A[b],q=_[v]=ee?ui(_[v]):Dn(_[v]);if(zs(I,q))x(I,q,H,null,G,O,oe,j,ee);else break;b--,v--}if(re>b){if(re<=v){const I=v+1,q=I<Ee?_[I].el:X;for(;re<=v;)x(null,_[re]=ee?ui(_[re]):Dn(_[re]),H,q,G,O,oe,j,ee),re++}}else if(re>v)for(;re<=b;)ke(A[re],G,O,!0),re++;else{const I=re,q=re,te=new Map;for(re=q;re<=v;re++){const Ne=_[re]=ee?ui(_[re]):Dn(_[re]);Ne.key!=null&&te.set(Ne.key,re)}let W,Ae=0;const ce=v-q+1;let we=!1,Ce=0;const de=new Array(ce);for(re=0;re<ce;re++)de[re]=0;for(re=I;re<=b;re++){const Ne=A[re];if(Ae>=ce){ke(Ne,G,O,!0);continue}let Re;if(Ne.key!=null)Re=te.get(Ne.key);else for(W=q;W<=v;W++)if(de[W-q]===0&&zs(Ne,_[W])){Re=W;break}Re===void 0?ke(Ne,G,O,!0):(de[Re-q]=re+1,Re>=Ce?Ce=Re:we=!0,x(Ne,_[Re],H,null,G,O,oe,j,ee),Ae++)}const Me=we?yp(de):bs;for(W=Me.length-1,re=ce-1;re>=0;re--){const Ne=q+re,Re=_[Ne],xe=_[Ne+1],Xe=Ne+1<Ee?xe.el||xe.placeholder:X;de[re]===0?x(null,Re,H,Xe,G,O,oe,j,ee):we&&(W<0||re!==Me[W]?Le(Re,H,Xe,2):W--)}}},Le=(A,_,H,X,G=null)=>{const{el:O,type:oe,transition:j,children:ee,shapeFlag:re}=A;if(re&6){Le(A.component.subTree,_,H,X);return}if(re&128){A.suspense.move(_,H,X);return}if(re&64){oe.move(A,_,H,le);return}if(oe===nt){i(O,_,H);for(let b=0;b<ee.length;b++)Le(ee[b],_,H,X);i(A.anchor,_,H);return}if(oe===na){w(A,_,H);return}if(X!==2&&re&1&&j)if(X===0)j.beforeEnter(O),i(O,_,H),rn(()=>j.enter(O),G);else{const{leave:b,delayLeave:v,afterLeave:I}=j,q=()=>{A.ctx.isUnmounted?s(O):i(O,_,H)},te=()=>{O._isLeaving&&O[Wf](!0),b(O,()=>{q(),I&&I()})};v?v(O,q,te):te()}else i(O,_,H)},ke=(A,_,H,X=!1,G=!1)=>{const{type:O,props:oe,ref:j,children:ee,dynamicChildren:re,shapeFlag:Ee,patchFlag:b,dirs:v,cacheIndex:I}=A;if(b===-2&&(G=!1),j!=null&&(ti(),Qs(j,null,H,A,!0),ni()),I!=null&&(_.renderCache[I]=void 0),Ee&256){_.ctx.deactivate(A);return}const q=Ee&1&&v,te=!er(A);let W;if(te&&(W=oe&&oe.onVnodeBeforeUnmount)&&Rn(W,_,A),Ee&6)_e(A.component,H,X);else{if(Ee&128){A.suspense.unmount(H,X);return}q&&wi(A,null,_,"beforeUnmount"),Ee&64?A.type.remove(A,_,H,le,X):re&&!re.hasOnce&&(O!==nt||b>0&&b&64)?k(re,_,H,!1,!0):(O===nt&&b&384||!G&&Ee&16)&&k(ee,_,H),X&&it(A)}(te&&(W=oe&&oe.onVnodeUnmounted)||q)&&rn(()=>{W&&Rn(W,_,A),q&&wi(A,null,_,"unmounted")},H)},it=A=>{const{type:_,el:H,anchor:X,transition:G}=A;if(_===nt){ot(H,X);return}if(_===na){M(A);return}const O=()=>{s(H),G&&!G.persisted&&G.afterLeave&&G.afterLeave()};if(A.shapeFlag&1&&G&&!G.persisted){const{leave:oe,delayLeave:j}=G,ee=()=>oe(H,O);j?j(A.el,O,ee):ee()}else O()},ot=(A,_)=>{let H;for(;A!==_;)H=f(A),s(A),A=H;s(_)},_e=(A,_,H)=>{const{bum:X,scope:G,job:O,subTree:oe,um:j,m:ee,a:re}=A;Uc(ee),Uc(re),X&&ea(X),G.stop(),O&&(O.flags|=8,ke(oe,A,_,H)),j&&rn(j,_),rn(()=>{A.isUnmounted=!0},_)},k=(A,_,H,X=!1,G=!1,O=0)=>{for(let oe=O;oe<A.length;oe++)ke(A[oe],_,H,X,G)},Z=A=>{if(A.shapeFlag&6)return Z(A.component.subTree);if(A.shapeFlag&128)return A.suspense.next();const _=f(A.anchor||A.el),H=_&&_[Gf];return H?f(H):_};let ue=!1;const ve=(A,_,H)=>{A==null?_._vnode&&ke(_._vnode,null,null,!0):x(_._vnode||null,A,_,null,null,null,H),_._vnode=A,ue||(ue=!0,wc(),Lu(),ue=!1)},le={p:x,um:ke,m:Le,r:it,mt:se,mc:F,pc:V,pbc:S,n:Z,o:n};return{render:ve,hydrate:void 0,createApp:dp(ve)}}function Qa({type:n,props:e},t){return t==="svg"&&n==="foreignObject"||t==="mathml"&&n==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:t}function Ci({effect:n,job:e},t){t?(n.flags|=32,e.flags|=4):(n.flags&=-33,e.flags&=-5)}function bp(n,e){return(!n||n&&!n.pendingBranch)&&e&&!e.persisted}function Ju(n,e,t=!1){const i=n.children,s=e.children;if(We(i)&&We(s))for(let r=0;r<i.length;r++){const a=i[r];let o=s[r];o.shapeFlag&1&&!o.dynamicChildren&&((o.patchFlag<=0||o.patchFlag===32)&&(o=s[r]=ui(s[r]),o.el=a.el),!t&&o.patchFlag!==-2&&Ju(a,o)),o.type===Ba&&o.patchFlag!==-1&&(o.el=a.el),o.type===yi&&!o.el&&(o.el=a.el)}}function yp(n){const e=n.slice(),t=[0];let i,s,r,a,o;const l=n.length;for(i=0;i<l;i++){const c=n[i];if(c!==0){if(s=t[t.length-1],n[s]<c){e[i]=s,t.push(i);continue}for(r=0,a=t.length-1;r<a;)o=r+a>>1,n[t[o]]<c?r=o+1:a=o;c<n[t[r]]&&(r>0&&(e[i]=t[r-1]),t[r]=i)}}for(r=t.length,a=t[r-1];r-- >0;)t[r]=a,a=e[a];return t}function Qu(n){const e=n.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:Qu(e)}function Uc(n){if(n)for(let e=0;e<n.length;e++)n[e].flags|=8}const Mp=Symbol.for("v-scx"),Sp=()=>ta(Mp);function St(n,e,t){return eh(n,e,t)}function eh(n,e,t=ft){const{immediate:i,deep:s,flush:r,once:a}=t,o=Vt({},t),l=e&&i||!e&&r!=="post";let c;if(or){if(r==="sync"){const p=Sp();c=p.__watcherHandles||(p.__watcherHandles=[])}else if(!l){const p=()=>{};return p.stop=On,p.resume=On,p.pause=On,p}}const d=jt;o.call=(p,g,x)=>zn(p,d,g,x);let u=!1;r==="post"?o.scheduler=p=>{rn(p,d&&d.suspense)}:r!=="sync"&&(u=!0,o.scheduler=(p,g)=>{g?p():Jl(p)}),o.augmentJob=p=>{e&&(p.flags|=4),u&&(p.flags|=2,d&&(p.id=d.uid,p.i=d))};const f=Bf(n,e,o);return or&&(c?c.push(f):l&&f()),f}function Ep(n,e,t){const i=this.proxy,s=wt(n)?n.includes(".")?th(i,n):()=>i[n]:n.bind(i,i);let r;$e(e)?r=e:(r=e.handler,t=e);const a=gr(this),o=eh(s,r.bind(i),t);return a(),o}function th(n,e){const t=e.split(".");return()=>{let i=n;for(let s=0;s<t.length&&i;s++)i=i[t[s]];return i}}const Tp=(n,e)=>e==="modelValue"||e==="model-value"?n.modelModifiers:n[`${e}Modifiers`]||n[`${xi(e)}Modifiers`]||n[`${Xi(e)}Modifiers`];function Ap(n,e,...t){if(n.isUnmounted)return;const i=n.vnode.props||ft;let s=t;const r=e.startsWith("update:"),a=r&&Tp(i,e.slice(7));a&&(a.trim&&(s=t.map(d=>wt(d)?d.trim():d)),a.number&&(s=t.map(ua)));let o,l=i[o=ja(e)]||i[o=ja(xi(e))];!l&&r&&(l=i[o=ja(Xi(e))]),l&&zn(l,n,6,s);const c=i[o+"Once"];if(c){if(!n.emitted)n.emitted={};else if(n.emitted[o])return;n.emitted[o]=!0,zn(c,n,6,s)}}const wp=new WeakMap;function nh(n,e,t=!1){const i=t?wp:e.emitsCache,s=i.get(n);if(s!==void 0)return s;const r=n.emits;let a={},o=!1;if(!$e(n)){const l=c=>{const d=nh(c,e,!0);d&&(o=!0,Vt(a,d))};!t&&e.mixins.length&&e.mixins.forEach(l),n.extends&&l(n.extends),n.mixins&&n.mixins.forEach(l)}return!r&&!o?(gt(n)&&i.set(n,null),null):(We(r)?r.forEach(l=>a[l]=null):Vt(a,r),gt(n)&&i.set(n,a),a)}function Oa(n,e){return!n||!Ra(e)?!1:(e=e.slice(2).replace(/Once$/,""),at(n,e[0].toLowerCase()+e.slice(1))||at(n,Xi(e))||at(n,e))}function Nc(n){const{type:e,vnode:t,proxy:i,withProxy:s,propsOptions:[r],slots:a,attrs:o,emit:l,render:c,renderCache:d,props:u,data:f,setupState:p,ctx:g,inheritAttrs:x}=n,m=ma(n);let h,T;try{if(t.shapeFlag&4){const M=s||i,C=M;h=Dn(c.call(C,M,d,u,p,f,g)),T=o}else{const M=e;h=Dn(M.length>1?M(u,{attrs:o,slots:a,emit:l}):M(u,null)),T=e.props?o:Cp(o)}}catch(M){nr.length=0,Na(M,n,1),h=Lt(yi)}let w=h;if(T&&x!==!1){const M=Object.keys(T),{shapeFlag:C}=w;M.length&&C&7&&(r&&M.some(Vl)&&(T=Rp(T,r)),w=Cs(w,T,!1,!0))}return t.dirs&&(w=Cs(w,null,!1,!0),w.dirs=w.dirs?w.dirs.concat(t.dirs):t.dirs),t.transition&&Ql(w,t.transition),h=w,ma(m),h}const Cp=n=>{let e;for(const t in n)(t==="class"||t==="style"||Ra(t))&&((e||(e={}))[t]=n[t]);return e},Rp=(n,e)=>{const t={};for(const i in n)(!Vl(i)||!(i.slice(9)in e))&&(t[i]=n[i]);return t};function Pp(n,e,t){const{props:i,children:s,component:r}=n,{props:a,children:o,patchFlag:l}=e,c=r.emitsOptions;if(e.dirs||e.transition)return!0;if(t&&l>=0){if(l&1024)return!0;if(l&16)return i?Fc(i,a,c):!!a;if(l&8){const d=e.dynamicProps;for(let u=0;u<d.length;u++){const f=d[u];if(a[f]!==i[f]&&!Oa(c,f))return!0}}}else return(s||o)&&(!o||!o.$stable)?!0:i===a?!1:i?a?Fc(i,a,c):!0:!!a;return!1}function Fc(n,e,t){const i=Object.keys(e);if(i.length!==Object.keys(n).length)return!0;for(let s=0;s<i.length;s++){const r=i[s];if(e[r]!==n[r]&&!Oa(t,r))return!0}return!1}function Dp({vnode:n,parent:e},t){for(;e;){const i=e.subTree;if(i.suspense&&i.suspense.activeBranch===n&&(i.el=n.el),i===n)(n=e.vnode).el=t,e=e.parent;else break}}const ih=n=>n.__isSuspense;function Ip(n,e){e&&e.pendingBranch?We(n)?e.effects.push(...n):e.effects.push(n):Vf(n)}const nt=Symbol.for("v-fgt"),Ba=Symbol.for("v-txt"),yi=Symbol.for("v-cmt"),na=Symbol.for("v-stc"),nr=[];let an=null;function Pe(n=!1){nr.push(an=n?null:[])}function Lp(){nr.pop(),an=nr[nr.length-1]||null}let ar=1;function Oc(n,e=!1){ar+=n,n<0&&an&&e&&(an.hasOnce=!0)}function sh(n){return n.dynamicChildren=ar>0?an||bs:null,Lp(),ar>0&&an&&an.push(n),n}function De(n,e,t,i,s,r){return sh(D(n,e,t,i,s,r,!0))}function rh(n,e,t,i,s){return sh(Lt(n,e,t,i,s,!0))}function ah(n){return n?n.__v_isVNode===!0:!1}function zs(n,e){return n.type===e.type&&n.key===e.key}const oh=({key:n})=>n??null,ia=({ref:n,ref_key:e,ref_for:t})=>(typeof n=="number"&&(n=""+n),n!=null?wt(n)||Ht(n)||$e(n)?{i:pn,r:n,k:e,f:!!t}:n:null);function D(n,e=null,t=null,i=0,s=null,r=n===nt?0:1,a=!1,o=!1){const l={__v_isVNode:!0,__v_skip:!0,type:n,props:e,key:e&&oh(e),ref:e&&ia(e),scopeId:Nu,slotScopeIds:null,children:t,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:r,patchFlag:i,dynamicProps:s,dynamicChildren:null,appContext:null,ctx:pn};return o?(nc(l,t),r&128&&n.normalize(l)):t&&(l.shapeFlag|=wt(t)?8:16),ar>0&&!a&&an&&(l.patchFlag>0||r&6)&&l.patchFlag!==32&&an.push(l),l}const Lt=Up;function Up(n,e=null,t=null,i=0,s=null,r=!1){if((!n||n===np)&&(n=yi),ah(n)){const o=Cs(n,e,!0);return t&&nc(o,t),ar>0&&!r&&an&&(o.shapeFlag&6?an[an.indexOf(n)]=o:an.push(o)),o.patchFlag=-2,o}if(Wp(n)&&(n=n.__vccOpts),e){e=Np(e);let{class:o,style:l}=e;o&&!wt(o)&&(e.class=xt(o)),gt(l)&&(Zl(l)&&!We(l)&&(l=Vt({},l)),e.style=ql(l))}const a=wt(n)?1:ih(n)?128:qf(n)?64:gt(n)?4:$e(n)?2:0;return D(n,e,t,i,s,a,r,!0)}function Np(n){return n?Zl(n)||Xu(n)?Vt({},n):n:null}function Cs(n,e,t=!1,i=!1){const{props:s,ref:r,patchFlag:a,children:o,transition:l}=n,c=e?Fp(s||{},e):s,d={__v_isVNode:!0,__v_skip:!0,type:n.type,props:c,key:c&&oh(c),ref:e&&e.ref?t&&r?We(r)?r.concat(ia(e)):[r,ia(e)]:ia(e):r,scopeId:n.scopeId,slotScopeIds:n.slotScopeIds,children:o,target:n.target,targetStart:n.targetStart,targetAnchor:n.targetAnchor,staticCount:n.staticCount,shapeFlag:n.shapeFlag,patchFlag:e&&n.type!==nt?a===-1?16:a|16:a,dynamicProps:n.dynamicProps,dynamicChildren:n.dynamicChildren,appContext:n.appContext,dirs:n.dirs,transition:l,component:n.component,suspense:n.suspense,ssContent:n.ssContent&&Cs(n.ssContent),ssFallback:n.ssFallback&&Cs(n.ssFallback),placeholder:n.placeholder,el:n.el,anchor:n.anchor,ctx:n.ctx,ce:n.ce};return l&&i&&Ql(d,l.clone(d)),d}function Mi(n=" ",e=0){return Lt(Ba,null,n,e)}function vs(n,e){const t=Lt(na,null,n);return t.staticCount=e,t}function vt(n="",e=!1){return e?(Pe(),rh(yi,null,n)):Lt(yi,null,n)}function Dn(n){return n==null||typeof n=="boolean"?Lt(yi):We(n)?Lt(nt,null,n.slice()):ah(n)?ui(n):Lt(Ba,null,String(n))}function ui(n){return n.el===null&&n.patchFlag!==-1||n.memo?n:Cs(n)}function nc(n,e){let t=0;const{shapeFlag:i}=n;if(e==null)e=null;else if(We(e))t=16;else if(typeof e=="object")if(i&65){const s=e.default;s&&(s._c&&(s._d=!1),nc(n,s()),s._c&&(s._d=!0));return}else{t=32;const s=e._;!s&&!Xu(e)?e._ctx=pn:s===3&&pn&&(pn.slots._===1?e._=1:(e._=2,n.patchFlag|=1024))}else $e(e)?(e={default:e,_ctx:pn},t=32):(e=String(e),i&64?(t=16,e=[Mi(e)]):t=8);n.children=e,n.shapeFlag|=t}function Fp(...n){const e={};for(let t=0;t<n.length;t++){const i=n[t];for(const s in i)if(s==="class")e.class!==i.class&&(e.class=xt([e.class,i.class]));else if(s==="style")e.style=ql([e.style,i.style]);else if(Ra(s)){const r=e[s],a=i[s];a&&r!==a&&!(We(r)&&r.includes(a))&&(e[s]=r?[].concat(r,a):a)}else s!==""&&(e[s]=i[s])}return e}function Rn(n,e,t,i=null){zn(n,e,7,[t,i])}const Op=Gu();let Bp=0;function zp(n,e,t){const i=n.type,s=(e?e.appContext:n.appContext)||Op,r={uid:Bp++,vnode:n,type:i,parent:e,appContext:s,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new df(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(s.provides),ids:e?e.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:$u(i,s),emitsOptions:nh(i,s),emit:null,emitted:null,propsDefaults:ft,inheritAttrs:i.inheritAttrs,ctx:ft,data:ft,props:ft,attrs:ft,slots:ft,refs:ft,setupState:ft,setupContext:null,suspense:t,suspenseId:t?t.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return r.ctx={_:r},r.root=e?e.root:r,r.emit=Ap.bind(null,r),n.ce&&n.ce(r),r}let jt=null;const Hp=()=>jt||pn;let va,jo;{const n=Ia(),e=(t,i)=>{let s;return(s=n[t])||(s=n[t]=[]),s.push(i),r=>{s.length>1?s.forEach(a=>a(r)):s[0](r)}};va=e("__VUE_INSTANCE_SETTERS__",t=>jt=t),jo=e("__VUE_SSR_SETTERS__",t=>or=t)}const gr=n=>{const e=jt;return va(n),n.scope.on(),()=>{n.scope.off(),va(e)}},Bc=()=>{jt&&jt.scope.off(),va(null)};function lh(n){return n.vnode.shapeFlag&4}let or=!1;function Vp(n,e=!1,t=!1){e&&jo(e);const{props:i,children:s}=n.vnode,r=lh(n);hp(n,i,r,e),gp(n,s,t||e);const a=r?kp(n,e):void 0;return e&&jo(!1),a}function kp(n,e){const t=n.type;n.accessCache=Object.create(null),n.proxy=new Proxy(n.ctx,ip);const{setup:i}=t;if(i){ti();const s=n.setupContext=i.length>1?qp(n):null,r=gr(n),a=mr(i,n,0,[n.props,s]),o=ou(a);if(ni(),r(),(o||n.sp)&&!er(n)&&Fu(n),o){if(a.then(Bc,Bc),e)return a.then(l=>{zc(n,l)}).catch(l=>{Na(l,n,0)});n.asyncDep=a}else zc(n,a)}else ch(n)}function zc(n,e,t){$e(e)?n.type.__ssrInlineRender?n.ssrRender=e:n.render=e:gt(e)&&(n.setupState=Ru(e)),ch(n)}function ch(n,e,t){const i=n.type;n.render||(n.render=i.render||On);{const s=gr(n);ti();try{sp(n)}finally{ni(),s()}}}const Gp={get(n,e){return Bt(n,"get",""),n[e]}};function qp(n){const e=t=>{n.exposed=t||{}};return{attrs:new Proxy(n.attrs,Gp),slots:n.slots,emit:n.emit,expose:e}}function za(n){return n.exposed?n.exposeProxy||(n.exposeProxy=new Proxy(Ru(Df(n.exposed)),{get(e,t){if(t in e)return e[t];if(t in tr)return tr[t](n)},has(e,t){return t in e||t in tr}})):n.proxy}function Wp(n){return $e(n)&&"__vccOpts"in n}const $t=(n,e)=>Ff(n,e,or),Xp="3.5.22";/**
* @vue/runtime-dom v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let $o;const Hc=typeof window<"u"&&window.trustedTypes;if(Hc)try{$o=Hc.createPolicy("vue",{createHTML:n=>n})}catch{}const dh=$o?n=>$o.createHTML(n):n=>n,jp="http://www.w3.org/2000/svg",$p="http://www.w3.org/1998/Math/MathML",Kn=typeof document<"u"?document:null,Vc=Kn&&Kn.createElement("template"),Yp={insert:(n,e,t)=>{e.insertBefore(n,t||null)},remove:n=>{const e=n.parentNode;e&&e.removeChild(n)},createElement:(n,e,t,i)=>{const s=e==="svg"?Kn.createElementNS(jp,n):e==="mathml"?Kn.createElementNS($p,n):t?Kn.createElement(n,{is:t}):Kn.createElement(n);return n==="select"&&i&&i.multiple!=null&&s.setAttribute("multiple",i.multiple),s},createText:n=>Kn.createTextNode(n),createComment:n=>Kn.createComment(n),setText:(n,e)=>{n.nodeValue=e},setElementText:(n,e)=>{n.textContent=e},parentNode:n=>n.parentNode,nextSibling:n=>n.nextSibling,querySelector:n=>Kn.querySelector(n),setScopeId(n,e){n.setAttribute(e,"")},insertStaticContent(n,e,t,i,s,r){const a=t?t.previousSibling:e.lastChild;if(s&&(s===r||s.nextSibling))for(;e.insertBefore(s.cloneNode(!0),t),!(s===r||!(s=s.nextSibling)););else{Vc.innerHTML=dh(i==="svg"?`<svg>${n}</svg>`:i==="mathml"?`<math>${n}</math>`:n);const o=Vc.content;if(i==="svg"||i==="mathml"){const l=o.firstChild;for(;l.firstChild;)o.appendChild(l.firstChild);o.removeChild(l)}e.insertBefore(o,t)}return[a?a.nextSibling:e.firstChild,t?t.previousSibling:e.lastChild]}},Kp=Symbol("_vtc");function Zp(n,e,t){const i=n[Kp];i&&(e=(e?[e,...i]:[...i]).join(" ")),e==null?n.removeAttribute("class"):t?n.setAttribute("class",e):n.className=e}const kc=Symbol("_vod"),Jp=Symbol("_vsh"),Qp=Symbol(""),em=/(?:^|;)\s*display\s*:/;function tm(n,e,t){const i=n.style,s=wt(t);let r=!1;if(t&&!s){if(e)if(wt(e))for(const a of e.split(";")){const o=a.slice(0,a.indexOf(":")).trim();t[o]==null&&sa(i,o,"")}else for(const a in e)t[a]==null&&sa(i,a,"");for(const a in t)a==="display"&&(r=!0),sa(i,a,t[a])}else if(s){if(e!==t){const a=i[Qp];a&&(t+=";"+a),i.cssText=t,r=em.test(t)}}else e&&n.removeAttribute("style");kc in n&&(n[kc]=r?i.display:"",n[Jp]&&(i.display="none"))}const Gc=/\s*!important$/;function sa(n,e,t){if(We(t))t.forEach(i=>sa(n,e,i));else if(t==null&&(t=""),e.startsWith("--"))n.setProperty(e,t);else{const i=nm(n,e);Gc.test(t)?n.setProperty(Xi(i),t.replace(Gc,""),"important"):n[i]=t}}const qc=["Webkit","Moz","ms"],eo={};function nm(n,e){const t=eo[e];if(t)return t;let i=xi(e);if(i!=="filter"&&i in n)return eo[e]=i;i=du(i);for(let s=0;s<qc.length;s++){const r=qc[s]+i;if(r in n)return eo[e]=r}return e}const Wc="http://www.w3.org/1999/xlink";function Xc(n,e,t,i,s,r=of(e)){i&&e.startsWith("xlink:")?t==null?n.removeAttributeNS(Wc,e.slice(6,e.length)):n.setAttributeNS(Wc,e,t):t==null||r&&!hu(t)?n.removeAttribute(e):n.setAttribute(e,r?"":Bn(t)?String(t):t)}function jc(n,e,t,i,s){if(e==="innerHTML"||e==="textContent"){t!=null&&(n[e]=e==="innerHTML"?dh(t):t);return}const r=n.tagName;if(e==="value"&&r!=="PROGRESS"&&!r.includes("-")){const o=r==="OPTION"?n.getAttribute("value")||"":n.value,l=t==null?n.type==="checkbox"?"on":"":String(t);(o!==l||!("_value"in n))&&(n.value=l),t==null&&n.removeAttribute(e),n._value=t;return}let a=!1;if(t===""||t==null){const o=typeof n[e];o==="boolean"?t=hu(t):t==null&&o==="string"?(t="",a=!0):o==="number"&&(t=0,a=!0)}try{n[e]=t}catch{}a&&n.removeAttribute(s||e)}function Oi(n,e,t,i){n.addEventListener(e,t,i)}function im(n,e,t,i){n.removeEventListener(e,t,i)}const $c=Symbol("_vei");function sm(n,e,t,i,s=null){const r=n[$c]||(n[$c]={}),a=r[e];if(i&&a)a.value=i;else{const[o,l]=rm(e);if(i){const c=r[e]=lm(i,s);Oi(n,o,c,l)}else a&&(im(n,o,a,l),r[e]=void 0)}}const Yc=/(?:Once|Passive|Capture)$/;function rm(n){let e;if(Yc.test(n)){e={};let i;for(;i=n.match(Yc);)n=n.slice(0,n.length-i[0].length),e[i[0].toLowerCase()]=!0}return[n[2]===":"?n.slice(3):Xi(n.slice(2)),e]}let to=0;const am=Promise.resolve(),om=()=>to||(am.then(()=>to=0),to=Date.now());function lm(n,e){const t=i=>{if(!i._vts)i._vts=Date.now();else if(i._vts<=t.attached)return;zn(cm(i,t.value),e,5,[i])};return t.value=n,t.attached=om(),t}function cm(n,e){if(We(e)){const t=n.stopImmediatePropagation;return n.stopImmediatePropagation=()=>{t.call(n),n._stopped=!0},e.map(i=>s=>!s._stopped&&i&&i(s))}else return e}const Kc=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&n.charCodeAt(2)>96&&n.charCodeAt(2)<123,dm=(n,e,t,i,s,r)=>{const a=s==="svg";e==="class"?Zp(n,i,a):e==="style"?tm(n,t,i):Ra(e)?Vl(e)||sm(n,e,t,i,r):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):um(n,e,i,a))?(jc(n,e,i),!n.tagName.includes("-")&&(e==="value"||e==="checked"||e==="selected")&&Xc(n,e,i,a,r,e!=="value")):n._isVueCE&&(/[A-Z]/.test(e)||!wt(i))?jc(n,xi(e),i,r,e):(e==="true-value"?n._trueValue=i:e==="false-value"&&(n._falseValue=i),Xc(n,e,i,a))};function um(n,e,t,i){if(i)return!!(e==="innerHTML"||e==="textContent"||e in n&&Kc(e)&&$e(t));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="autocorrect"||e==="form"||e==="list"&&n.tagName==="INPUT"||e==="type"&&n.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const s=n.tagName;if(s==="IMG"||s==="VIDEO"||s==="CANVAS"||s==="SOURCE")return!1}return Kc(e)&&wt(t)?!1:e in n}const xa=n=>{const e=n.props["onUpdate:modelValue"]||!1;return We(e)?t=>ea(e,t):e};function hm(n){n.target.composing=!0}function Zc(n){const e=n.target;e.composing&&(e.composing=!1,e.dispatchEvent(new Event("input")))}const Ts=Symbol("_assign"),hi={created(n,{modifiers:{lazy:e,trim:t,number:i}},s){n[Ts]=xa(s);const r=i||s.props&&s.props.type==="number";Oi(n,e?"change":"input",a=>{if(a.target.composing)return;let o=n.value;t&&(o=o.trim()),r&&(o=ua(o)),n[Ts](o)}),t&&Oi(n,"change",()=>{n.value=n.value.trim()}),e||(Oi(n,"compositionstart",hm),Oi(n,"compositionend",Zc),Oi(n,"change",Zc))},mounted(n,{value:e}){n.value=e??""},beforeUpdate(n,{value:e,oldValue:t,modifiers:{lazy:i,trim:s,number:r}},a){if(n[Ts]=xa(a),n.composing)return;const o=(r||n.type==="number")&&!/^0\d/.test(n.value)?ua(n.value):n.value,l=e??"";o!==l&&(document.activeElement===n&&n.type!=="range"&&(i&&e===t||s&&n.value.trim()===l)||(n.value=l))}},ic={deep:!0,created(n,{value:e,modifiers:{number:t}},i){const s=Pa(e);Oi(n,"change",()=>{const r=Array.prototype.filter.call(n.options,a=>a.selected).map(a=>t?ua(ba(a)):ba(a));n[Ts](n.multiple?s?new Set(r):r:r[0]),n._assigning=!0,Du(()=>{n._assigning=!1})}),n[Ts]=xa(i)},mounted(n,{value:e}){Jc(n,e)},beforeUpdate(n,e,t){n[Ts]=xa(t)},updated(n,{value:e}){n._assigning||Jc(n,e)}};function Jc(n,e){const t=n.multiple,i=We(e);if(!(t&&!i&&!Pa(e))){for(let s=0,r=n.options.length;s<r;s++){const a=n.options[s],o=ba(a);if(t)if(i){const l=typeof o;l==="string"||l==="number"?a.selected=e.some(c=>String(c)===String(o)):a.selected=cf(e,o)>-1}else a.selected=e.has(o);else if(La(ba(a),e)){n.selectedIndex!==s&&(n.selectedIndex=s);return}}!t&&n.selectedIndex!==-1&&(n.selectedIndex=-1)}}function ba(n){return"_value"in n?n._value:n.value}const fm=Vt({patchProp:dm},Yp);let Qc;function pm(){return Qc||(Qc=vp(fm))}const mm=((...n)=>{const e=pm().createApp(...n),{mount:t}=e;return e.mount=i=>{const s=_m(i);if(!s)return;const r=e._component;!$e(r)&&!r.render&&!r.template&&(r.template=s.innerHTML),s.nodeType===1&&(s.textContent="");const a=t(s,!1,gm(s));return s instanceof Element&&(s.removeAttribute("v-cloak"),s.setAttribute("data-v-app","")),a},e});function gm(n){if(n instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&n instanceof MathMLElement)return"mathml"}function _m(n){return wt(n)?document.querySelector(n):n}class vm{id;name;posicion="";oficio="";oficio_habilidades=[];nivel=1;estilo_marcial="";estilo_marcial_dotes=[];trasfondo="";trasfondo_habilidades=[];raza="";arbol="";constructor(e,t){this.id=e,this.name=t}getName(){return this.name}}class xm{characters=new Map;addCharacter(e){this.characters.set(e.id,e)}getCharacter(e){return this.characters.get(e)}getCharactersList(){return Array.from(this.characters.values())}}const Tr=pr(new xm);function bm(){function n(i,s){const r=pr(new vm(i,s));Tr.addCharacter(r)}const e=$t(()=>Array.from(Tr.characters.values()));function t(i){return Tr.getCharacter(i)}return{partida:Tr,charactersList:e,addCharacter:n,getCharacter:t}}const no="character-in-creation";function _r(){const{addCharacter:n,getCharacter:e}=bm(),t=zt({nombre:"",nivel:1,oficio:"",oficio_habilidades:[],estilo_marcial:"",estilo_marcial_dotes:[],trasfondo:"",trasfondo_habilidades:[],raza:"",arbol:""});function i(){let a=e(no);return a||(n(no,""),a=e(no)),a}function s(){const a=i();a&&(t.value.nombre=a.name||"",t.value.nivel=a.nivel||1,t.value.oficio=a.oficio||"",t.value.oficio_habilidades=a.oficio_habilidades||[],t.value.estilo_marcial=a.estilo_marcial||"",t.value.estilo_marcial_dotes=a.estilo_marcial_dotes||[],t.value.trasfondo=a.trasfondo||"",t.value.trasfondo_habilidades=a.trasfondo_habilidades||[],t.value.raza=a.raza||"",t.value.arbol=a.arbol||"")}function r(){const a=i();a&&(a.name=t.value.nombre,a.nivel=t.value.nivel,a.oficio=t.value.oficio,a.oficio_habilidades=t.value.oficio_habilidades,a.estilo_marcial=t.value.estilo_marcial,a.estilo_marcial_dotes=t.value.estilo_marcial_dotes,a.trasfondo=t.value.trasfondo,a.trasfondo_habilidades=t.value.trasfondo_habilidades,a.raza=t.value.raza,a.arbol=t.value.arbol)}return St(()=>t.value.nombre,()=>r()),St(()=>t.value.nivel,()=>r()),St(()=>t.value.oficio,()=>r()),St(()=>t.value.oficio_habilidades,()=>r(),{deep:!0}),St(()=>t.value.estilo_marcial,()=>r()),St(()=>t.value.estilo_marcial_dotes,()=>r(),{deep:!0}),St(()=>t.value.trasfondo,()=>r()),St(()=>t.value.trasfondo_habilidades,()=>r(),{deep:!0}),St(()=>t.value.raza,()=>r()),St(()=>t.value.arbol,()=>r()),{characterData:t,getCurrentCharacter:i,loadCharacterData:s,saveCharacterData:r}}const ym=Us({__name:"general",setup(n){const{characterData:e,loadCharacterData:t}=_r();return ji(()=>{t()}),(i,s)=>(Pe(),De(nt,null,[D("div",null,[s[2]||(s[2]=D("label",{class:"block text-sm font-semibold text-gray-700 mb-2"}," Nombre del Personaje ",-1)),xn(D("input",{type:"text","onUpdate:modelValue":s[0]||(s[0]=r=>_s(e).nombre=r),class:"w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-500 transition-colors",placeholder:"Introduce el nombre..."},null,512),[[hi,_s(e).nombre]])]),D("div",null,[s[3]||(s[3]=D("label",{class:"block text-sm font-semibold text-gray-700 mb-2"}," Nivel ",-1)),xn(D("input",{type:"number",min:"1",max:"20","onUpdate:modelValue":s[1]||(s[1]=r=>_s(e).nivel=r),class:"w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-gray-500 transition-colors"},null,512),[[hi,_s(e).nivel]])])],64))}}),Mm=[{nombre:"Hijo de vecino",descripcion:"Has nacido en el seno de una familia de clase media, bien alimentado y con todas las necesidades básicas cubiertas. Puedes tener una mascota doméstica y/o puedes no tenerla. Tu infancia ha sido feliz, o no. No tienes ningún trauma, si no quieres.",atributos:[{nombre:"Resistencia",valor:"+3"},{nombre:"Pts de Habilidad",valor:"+3"}],habilidades:["30","6","8","3","4","14"]},{nombre:"Noble",descripcion:"Ya sea en el imperio de Limsa Lomensa o de Lenam, has crecido en una familia acaudalada y llena de privilegios y responsabilidades. Posiblemente seas un antipático, racista y mimado como solo tu sabes.",atributos:[{nombre:"Pts de Habilidad",valor:"+3"},{nombre:"Habilidad extra",valor:"+1"}],habilidades:["13","21","10","7","15","14"]},{nombre:"Desperado",descripcion:"Ya sea en las bulliciosas calles de Limsa Lomensa, los pulcros salones de las Catedrales de Lenam, las estepas rocosas o los desiertos abrasadores, el Desperado aguarda una distraccion para aprovechar su oportunidad y sacar provecho. Buscavidas de nacimiento, la vida no ha tratado bien al querido Desperado, acostumbrado a tener que tirar pa’lante. Se sabe desenvolver con improvisación y sutileza de las situaciones mas inverosímiles.",atributos:[{nombre:"Pts de Habilidad",valor:"+3"},{nombre:"Habilidad extra",valor:"+1"}],habilidades:["12","16","3","7","17","18"]},{nombre:"Trotamundos itinerante y ambulante",descripcion:"No te sabes estar quieto y has viajado por gran parte del mundo conocido. Sabes tratar a la gente según tus intereses y conoces canciones de todas partes y has escuchado muchas historias que se ganarían una ronda de cerveza.",atributos:[{nombre:"Fuerza",valor:"+3"},{nombre:"Pts de Habilidad",valor:"+3"}],habilidades:["30","5","8 ","9","14","31"]},{nombre:"Hijo de la mar",descripcion:"Tu vida ha sido una aventura. Has nacido en un barco y seguramente esperes morir en uno. Te han enseñado las leyes del océano y lo respetas como es debido. Has aprendido a navegar y has visto muchos puertos.",atributos:[{nombre:"Fuerza",valor:"+3"},{nombre:"Pts de Habilidad",valor:"+3"}],habilidades:["2","8","1 ","9","17","6"]},{nombre:"Feligrés",descripcion:"Tu vida ha estado marcada por la fe y la devoción. Has crecido en un entorno religioso y has aprendido a seguir las enseñanzas de tu fe. Tu vida gira en torno a la comunidad y a los rituales que la acompañan.",atributos:[{nombre:"Fuerza",valor:"+3"},{nombre:"Pts de Habilidad",valor:"+3"}],habilidades:["12","7","10","4","14","8"]},{nombre:"Huérfano de Lenam",descripcion:"Has tenido suerte al haber crecido en el Imperio de Lenam siendo huérfano, pues en el resto del mundo te hubieras tenido q apañar sin ayuda alguna. Se te acogió en un orfanato de los Caballeros del Silencio, en el que te educaron y pasaste diferentes pruebas para llegar a formar parte de la orden. Habiendo fracasado en las pruebas para formar parte de la organización de los Caballeros del Silencio, un huérfano en el reino de Lenam está obligado a contribuir a la sociedad. Entrando como aprendiz de algún oficio artesano o en alguna cadena de producción.",atributos:[{nombre:"Fuerza",valor:"+3"},{nombre:"Pts de Habilidad",valor:"+3"}],habilidades:["12","7","10","4","14","8"]},{nombre:"Huérfano de Lenam",descripcion:"Has tenido suerte al haber crecido en el Imperio de Lenam siendo huérfano, pues en el resto del mundo te hubieras tenido q apañar sin ayuda alguna. Se te acogió en un orfanato de los Caballeros del Silencio, en el que te educaron y pasaste diferentes pruebas para llegar a formar parte de la orden. Habiendo fracasado en las pruebas para formar parte de la organización de los Caballeros del Silencio, un huérfano en el reino de Lenam está obligado a contribuir a la sociedad. Entrando como aprendiz de algún oficio artesano o en alguna cadena de producción.",atributos:[{nombre:"Fuerza",valor:"+3"},{nombre:"Pts de Habilidad",valor:"+3"}],habilidades:["7","5","1","10","30","20"]},{nombre:"Feligrés del Molino",descripcion:"Una nueva religión en auge en la que rinden culto y pleitesía en demasía al movimiento de las aspas de El Molino. Se suelen congregar en campos de conreo lejos de las grandes urbes urbanas.",atributos:[{nombre:"Fuerza",valor:"+3"},{nombre:"Pts de Habilidad",valor:"+3"}],habilidades:["12","16","3","17","13","19"]},{nombre:"Monaguillo de la Cofradía de Bharak",descripcion:"La congregación religiosa mas importante de Limsa Lomensa, tienen mucha influéncia política, al nivel de que sin ellos el imperio de Mudab Il Nam no habría podido desarrollarse. Tienen conocimientos muy antiguos y valiosos que se remontan a centenares de años. Muchos eruditos y líderes buscan pasar años estudiando en las bibliotecas de sus templos. Guardan muchos secretos y tienen su propia Orden Militar. Los maestros de armas son integrantes en su mayoría de dicha organización.",atributos:[{nombre:"Fuerza",valor:"+3"},{nombre:"Pts de Habilidad",valor:"+3"}],habilidades:["5","7","31","15","31","19"]},{nombre:"Agojé",descripcion:"Entrenamiento militar obligatorio que los ciudadanos que viven en Lenam deben realizar. En tiempos de guerra, la población debe realizar otro entrenamiento cada año. Los ciudadanos que completan el entrenamiento reciben la oferta de formar parte de la Armatha, el ejercito del imperio. En caso de no querer formar parte de la Armatha, un ciudadano puede reanudar sus actividades previas, pero recibe un permiso a modo de pasaporte que debe llevar siempre encima para poder ser identificado, esto no se suele cumplir por la mayoría, aunque perderlo conlleva un castigo grave en el que se extirpa una oreja. En la ciudad-capital son muy estrictos con esto, pero en las otras regiones del imperio son mas laxos con la vigilancia.",atributos:[{nombre:"Fuerza",valor:"+3"},{nombre:"Pts de Habilidad",valor:"+3"}],habilidades:["1","2","15","30","9","7"]},{nombre:"Protegido de la espina mortecina",descripcion:"Miembro de una organización anárquica que quiere ver en llamas la forma de gobierno de Lenam. Viven en las sombras de los lugares mas recónditos del reino y aguardan su venganza. De cara al mundo, son una organización privada de servicios. Suelen ser contratados para vigilar, escoltar, secuestrar y matar. Pero son muy caros comparados con otras organizaciones, aunque estos son letales y tienen la fama de jamás fracasar en sus misiones. Se dice por las tabernas y los barracones que un asesino de la espina mortecina equivale a veinte asesinos al uso.",atributos:[{nombre:"Fuerza",valor:"+3"},{nombre:"Pts de Habilidad",valor:"+3"}],habilidades:["18","16","3","8","13","19"]},{nombre:"Hijo de lo desconocido",descripcion:"Eres el descendiente de un gran explorador, investigador o cazador. Has crecido en Libertha, una ciudad que se ha ido desarrollando en las últimas décadas. Sus líderes son un poderoso gremio de cazadores que organizan grandes búsquedas y expediciones en las zonas más inhóspitas y peligrosas que se conocen. Abanderado por los logros de tus descendientes, siempre has tenido sed de aventuras y grandes descubrimientos, Libertha, aunque no es de los lugares más seguros para vivir, es en el q te ha tocado crecer y ahora tienes los medios para salir y descubrir que te deparará tu destino.",atributos:[{nombre:"Fuerza",valor:"+3"},{nombre:"Pts de Habilidad",valor:"+3"}],habilidades:["30","9","6","8","4","6"]},{nombre:"Tecnomante de Valanil",descripcion:"La República de Valanil se ha mantenido distante de los conflictos del exterior hasta hace unas décadas. De mentalidad curiosa, expandieron recientemente sus fronteras para conquistar las costas del vasto continente de Ardar. Han formado un pequeño territorio en las estepas rocosas del continente y este, aunque salvaje y brutal, ha cedido ante los ingenios mecánicos y especiales que esta república posee. Ahora el territorio es el centro del comercio con las diferentes civilizaciones autóctonas y están construyendo grandes proyectos arquitectónicos para evitar las constantes incursiones de la vida salvaje de los alrededores.",atributos:[{nombre:"Fuerza",valor:"+3"},{nombre:"Pts de Habilidad",valor:"+3"}],habilidades:["8","17","6","2","13","19"]}],Sm={trasfondos:Mm},Em=[{id:1,nombre:"Atletismo",descripcion:"Habilidad física que abarca correr, saltar, escalar y nadar.",atributo:"Cuerpo"},{id:2,nombre:"Nadar",descripcion:"Capacidad para moverse y mantenerse a flote en el agua.",atributo:"Cuerpo"},{id:3,nombre:"Percepción",descripcion:"Habilidad para notar detalles y cambios en el entorno.",atributo:"Cuerpo"},{id:4,nombre:"Medicina",descripcion:"Conocimiento y habilidades para tratar heridas y enfermedades.",atributo:"Mente"},{id:5,nombre:"Geografía",descripcion:"Conocimiento y habilidades para entender y analizar el entorno físico y humano.",atributo:"Mente"},{id:6,nombre:"Tasación",descripcion:"Habilidad para evaluar el valor de objetos, bienes y propiedades.",atributo:"Mente"},{id:7,nombre:"Historia",descripcion:"Conocimiento y habilidades para entender y analizar eventos pasados.",atributo:"Mente"},{id:8,nombre:"Investigación",descripcion:"Habilidad para buscar, recopilar y analizar información de diversas fuentes.",atributo:"Mente"},{id:8,nombre:"Orientación",descripcion:"Conocimiento y habilidades para encontrar el camino y ubicarse en diferentes entornos.",atributo:"Mente"},{id:9,nombre:"Supervivencia",descripcion:"Conocimiento y habilidades para sobrevivir en entornos hostiles.",atributo:"Mente"},{id:10,nombre:"Persuasión",descripcion:"Conocimiento y habilidades para influir en las decisiones y acciones de otros.",atributo:"Mente"},{id:11,nombre:"Intimidar",descripcion:"Habilidad para provocar miedo a otros.",atributo:"Mente"},{id:12,nombre:"Embaucar",descripcion:"Conocimiento y habilidades para engañar o manipular a otros.",atributo:"Mente"},{id:13,nombre:"Averiguar intenciones",descripcion:"Conocimiento y habilidades para entender las motivaciones y deseos de otros.",atributo:"Mente"},{id:14,nombre:"Performance",descripcion:"Conocimiento y habilidades para actuar, cantar o entretener a una audiencia.",atributo:"Mente"},{id:15,nombre:"Antropología/Politica",descripcion:"Conocimiento y habilidades para entender las culturas, sociedades y sistemas políticos.",atributo:"Mente"},{id:16,nombre:"Sigilo",descripcion:"Conocimiento y habilidades para moverse sin ser detectado.",atributo:"Agilidad"},{id:17,nombre:"Juego de manos",descripcion:"Conocimiento y habilidades para realizar trucos y movimientos rápidos con las manos.",atributo:"Agilidad"},{id:18,nombre:"Acrobacias",descripcion:"Conocimiento y habilidades para realizar trucos y movimientos acrobáticos.",atributo:"Agilidad"},{id:19,nombre:"Sabotaje",descripcion:"Habilidad para dañar, destruir o interferir con equipos, maquinaria o sistemas.",atributo:"Agilidad"},{id:20,nombre:"Montar",descripcion:"Habilidad para montar y manejar animales de monta.",atributo:"Agilidad"},{id:21,nombre:"Alquimia",descripcion:"Habilidad para crear pociones y elixires a partir de ingredientes naturales.",atributo:"Artesania"},{id:22,nombre:"Armería",descripcion:"Habilidad para crear, reparar y mantener armas y armaduras.",atributo:"Artesania"},{id:23,nombre:"Ingenios",descripcion:"Habilidad para crear dispositivos y mecanismos ingeniosos.",atributo:"Artesania"},{id:24,nombre:"Artes",descripcion:"Habilidad para crear obras de arte, como pintura, escultura o música.",atributo:"Artesania"},{id:25,nombre:"Grandes Proyectos",descripcion:"Habilidad para trabajar en proyectos de gran envergadura y coordinar equipos.",atributo:"Artesania"},{id:26,nombre:"Herboristeria",descripcion:"Habilidad para recolectar y utilizar plantas con fines medicinales.",atributo:"Recoleccion"},{id:27,nombre:"Mineria",descripcion:"Habilidad para extraer recursos minerales y gemas del subsuelo.",atributo:"Recoleccion"},{id:28,nombre:"Carniceria",descripcion:"Habilidad para recolectar y procesar cualquier tipo de recursos obtenidos de animales.",atributo:"Recoleccion"},{id:29,nombre:"Información",descripcion:"Habilidad para recolectar y procesar información de diversas fuentes.",atributo:"Recoleccion"},{id:30,nombre:"Aguante",descripcion:"Habilidad para resistir el esfuerzo físico y recuperarse rápidamente.",atributo:"Cuerpo"},{id:31,nombre:"Naturaleza",descripcion:"Habilidad para comprender y relacionarse con el entorno natural.",atributo:"Mente"}],sc={habilidades:Em},Tm=["value"],Am={key:0,style:{"margin-top":"8px"}},wm={key:0,class:"bg-blue-50 border-2 border-blue-200 rounded-lg p-6 space-y-6"},Cm={class:"text-xl font-bold text-blue-700 mb-3"},Rm={class:"text-blue-600 leading-relaxed"},Pm={class:"flex gap-3"},Dm={class:"flex-1 bg-white border-2 border-blue-300 rounded-lg p-4 text-center"},Im={class:"text-2xl font-bold text-blue-600"},Lm={class:"text-sm text-blue-700 font-medium"},Um={class:"flex-1 bg-white border-2 border-blue-300 rounded-lg p-4 text-center"},Nm={class:"text-2xl font-bold text-blue-600"},Fm={class:"text-sm text-blue-700 font-medium"},Om={class:"grid grid-cols-1 md:grid-cols-2 gap-3"},Bm=["onClick","disabled"],zm={class:"flex items-center gap-2"},Hm={key:0,class:"text-blue-500 text-xs"},Vm={class:"text-sm text-blue-600 mt-3"},km=3,Gm={__name:"trasfondo",setup(n){const{characterData:e,loadCharacterData:t}=_r(),i=zt(""),s=$t(()=>{const c={};return sc.habilidades.forEach(d=>{c[d.id.toString()]=d.nombre}),c}),r=$t(()=>Sm.trasfondos.map(c=>({...c,habilidades:c.habilidades.map(d=>{const u=d.trim();return s.value[u]||`Habilidad ${u}`})}))),a=zt([]),o=$t(()=>(console.log("Trasfondo seleccionado:",i.value),r.value.find(c=>c.nombre===i.value)));ji(()=>{t(),i.value=e.value.trasfondo||"",a.value=e.value.trasfondo_habilidades||[]}),St(i,c=>{e.value.trasfondo=c}),St(a,c=>{e.value.trasfondo_habilidades=[...c]},{deep:!0}),St(o,()=>{a.value=[]});function l(c){const d=a.value.indexOf(c);d!==-1?a.value.splice(d,1):a.value.length<km&&a.value.push(c)}return(c,d)=>(Pe(),De(nt,null,[D("div",null,[d[3]||(d[3]=D("label",{class:"block text-sm font-semibold text-blue-700 mb-2"}," Selecciona tu Trasfondo ",-1)),xn(D("select",{"onUpdate:modelValue":d[0]||(d[0]=u=>i.value=u),class:"w-full px-4 py-3 bg-blue-50 border-2 border-blue-200 rounded-lg text-blue-900"},[d[1]||(d[1]=D("option",{value:""},"Elige un trasfondo...",-1)),(Pe(!0),De(nt,null,Nt(r.value,u=>(Pe(),De("option",{key:u.nombre,value:u.nombre},Se(u.nombre),9,Tm))),128))],512),[[ic,i.value]]),i.value?(Pe(),De("p",Am,[d[2]||(d[2]=Mi(" Seleccionaste: ",-1)),D("strong",null,Se(i.value),1)])):vt("",!0)]),o.value?(Pe(),De("div",wm,[D("div",null,[D("h3",Cm,Se(o.value.nombre),1),D("p",Rm,Se(o.value.descripcion),1)]),D("div",null,[d[4]||(d[4]=D("h4",{class:"text-lg font-semibold text-blue-700 mb-3"}," Bonificaciones de Atributos ",-1)),D("div",Pm,[D("div",Dm,[D("div",Im,Se(o.value.atributos[0].valor),1),D("div",Lm,Se(o.value.atributos[0].nombre),1)]),D("div",Um,[D("div",Nm,Se(o.value.atributos[1].valor),1),D("div",Fm,Se(o.value.atributos[1].nombre),1)])])]),D("div",null,[d[5]||(d[5]=D("h4",{class:"text-lg font-semibold text-blue-700 mb-3"}," Habilidades Disponibles (Elige 3) ",-1)),D("div",Om,[(Pe(!0),De(nt,null,Nt(o.value.habilidades,u=>(Pe(),De("button",{key:u,onClick:f=>l(u),class:xt(["text-left px-4 py-3 rounded-lg font-medium transition-all duration-200 border-2",a.value.includes(u)?"bg-blue-500 text-white border-blue-500 shadow-lg":"bg-white text-blue-700 border-blue-200 hover:border-blue-400 hover:bg-blue-50"]),disabled:!a.value.includes(u)&&a.value.length>=3},[D("span",zm,[D("span",{class:xt(["flex items-center justify-center w-5 h-5 rounded border-2 flex-shrink-0",a.value.includes(u)?"bg-white border-white":"bg-transparent border-blue-300"])},[a.value.includes(u)?(Pe(),De("span",Hm,"✓")):vt("",!0)],2),Mi(" "+Se(u),1)])],10,Bm))),128))]),D("p",Vm," Seleccionadas: "+Se(a.value.length)+" / 3 ",1)])])):vt("",!0)],64))}},qm=JSON.parse('[{"id":1,"nombre":"Místic-o","descripcion":"Practicante de artes místicas y espirituales.","habilidades":[1,2,3],"dotes":[{"id":1,"nombre":"Eco de Corazones I","descripcion":"El mero hecho de rozar con tu tacto a una criatura u objeto te confiere información sobre su estado vital y su pureza: si son puros, neutrales o están corruptos. ","requisito_dote":""},{"id":2,"nombre":"Peregrinaje del Asceta","descripcion":"Durante un día de viaje de una Exploración, puedes decidir gastar todo tu tiempo libre en meditar. Si meditas de esta forma, puedes ignorar los requisitos de comida y bebida para ese día.","requisito_dote":""},{"id":3,"nombre":"Percepción extrasensorial I","descripcion":"Puedes percibir entornos cognitivos y te da la posibilidad de captarlos sabiendo si lo que hay es poderoso/peligroso/inofensivo. Anula todas las desventajas a tiradas de Percepción.","requisito_dote":""},{"id":4,"nombre":"Tarot","descripcion":"Una vez por sesión de juego, puedes leer las cartas de un aliado. Entonces, ese aliado realiza dos tiradas en la siguiente tabla. Los efectos de las cartas resultantes se aplican durante el resto del día.","requisito_dote":""},{"id":5,"nombre":"Sueño premonitorio","descripcion":"Una vez por día, a lo largo de una meditación o un sueño profundo, recibes imágenes crípticas de algo que puede suceder en un futuro próximo. El Maestro debe enunciar cómo de alejado en el tiempo parece este hecho, y si es un futuro incierto o si, por el contrario, se va a cumplir con casi toda seguridad.","requisito_dote":""},{"id":6,"nombre":"Incensario","descripcion":"Además de las Formas típicas que pueden tomar tus preparados de Alquimia, como píldoras, bebidas o gases, se añade la Forma de Incienso. Los preparados en forma de Incienso aplican su efecto en un círculo de tres espacios alrededor de la fuente y duran el mismo tiempo que los efectos de la poción o un minuto para los efectos instantáneos. Las criaturas que se mantengan en el área de efecto del incienso se verán afectadas por él, y dejarán de ser afectadas en el momento en el que abandonen el área. Si el incienso aplica efectos instantáneos, cada criatura sólo podrá beneficiarse una vez de este efecto por cada instancia de incienso.","requisito_dote":""},{"id":7,"nombre":"Ritual: Sombra Sosegante","descripcion":"Selecciona un objeto y realiza un ritual de diez minutos alrededor de él. Durante las próximas seis horas, la sombra que proyecte este objeto será una zona donde la temperatura no puede superar la Temperatura Ideal. Cada criatura que descanse durante al menos una hora debajo de esta sombra reducirá en 1 el Cansancio.","requisito_dote":""},{"id":8,"nombre":"Alma tenaz I","descripcion":"Tu Pureza puede alcanzar su valor en negativo sin sufrir ninguno de los efectos de la Corrupción. Tu Pureza mínima se convierte en el doble del valor de tu Pureza en negativo.","requisito_dote":""}]},{"id":2,"nombre":"Agente","descripcion":"La mayoría de gente caza animales. Tu cazas personas. Ya sea para capturar delincuentes, para matar a pobres desgraciados o para obtener información de personajes importantes, siempre sabes la forma mas eficaz de conseguirlo. Amigo de todo el mundo: Siempre sabes cómo conseguir información y como hablar con diferentes tipos de personas según te convengan para tus objetivos.","habilidades":[4,5,6],"dotes":[{"id":1,"nombre":"Red I","descripcion":"Tienes una red de contactos en varias ciudades que te pueden proporcionar información o servicios básicos. Puedes usar esta red para conseguir alojamiento, comida o información sobre sucesos recientes en la ciudad.","requisito_dote":""},{"id":2,"nombre":"Arte del disfraz I","descripcion":"Puedes alterar tu acento, manerismos y atuendo a voluntad si dedicas quince minutos a caracterizarte. Si bien el disfraz no es lo más convincente del mundo, es suficiente para engañar a cualquier persona que no tenga motivos para sospechar. Cuando estás caracterizado, puedes hacer creer a la gente que eres una persona cualquiera, posiblemente procedente de otro lugar; la tapadera no se sostiene ante escrutinio: una tirada exitosa de Averiguar intenciones contra tu Persuasión revelará que tu disfraz es una farsa.","requisito_dote":""},{"id":3,"nombre":"Arte del disfraz II","descripcion":"Puedes caracterizarte de otra persona en concreto, independientemente de su apariencia, estatura o género, siempre y cuando la conozcas a fondo. Sólo gente que sea íntima con la persona a la que estás tratando de suplantar se dará cuenta de que no está hablando con la persona original.","requisito_dote":"2"},{"id":4,"nombre":"Sombra I","descripcion":"Los bonificadores a tu Sigilo se doblan de cara a una persona que estés tratando de rastrear activamente.","requisito_dote":""},{"id":5,"nombre":"Ecos del pasado I","descripcion":"A través de rastros y evidencias circunstanciales, puedes imaginar como si estuvieses allí los últimos momentos de un lugar antes de que la última persona abandonase la zona. Si dedicas 15 minutos a investigar la zona, puedes reproducir en tu mente los últimos cinco minutos anteriores a que la última persona viviente se fuese.","requisito_dote":""},{"id":6,"nombre":"Criptografía","descripcion":"Sabes cómo escribir y descifrar mensajes cifrados. Para cifrar un mensaje, realiza una tirada de Información; el resultado de esta tirada determina la fortaleza del cifrado del mensaje. Si no conoces el cifrado utilizado por un mensaje que no es tuyo, puedes tratar de descifrarlo con ocho horas o el tiempo libre de un día de descanso o viaje: realiza una tirada a desventaja 1 contra la fortaleza del cifrado: en caso de éxito, logras descifrarlo, y si no, debes volver a gastar el mismo tiempo en tratar de descifrar el mensaje antes de repetir la tirada.","requisito_dote":""},{"id":7,"nombre":"Soy una caja","descripcion":"Camuflaje avanzado en formato caja. Ventaja 3 en ocultarse dentro de una caja, tarro, barril o similares. ","requisito_dote":""},{"id":8,"nombre":"Análisis forense","descripcion":"Tirada por medicina que te explica cuándo y cómo ha muerto alguien, y además, permite generar un perfil psicológico del asesino. 5 min o lo que tardes en expresar la deduccion a un público impresionable de tus cualidades intelectuales.","requisito_dote":""}]},{"id":3,"nombre":"Erudito","descripcion":"Dedicado a la preservación del conocimiento. Cada erudito tiene sus propios intereses pues la información es poder. Dependiendo de la orden u organización a la que dediques tus servicios estos, te van a dar búsquedas o misiones en las que tendrás que contribuir a su causa; tales como: buscar una reliquia perdida, llevar una pieza de suma importancia a un lugar seguro…","habilidades":[7,8,9,10,11,12],"dotes":[{"id":1,"nombre":"Cultura con fundamento","descripcion":"Al entrar en algun lugar civilizado, sabes localizar los principales lugares de interés gracias a tus vastos conocimientos, incluidos lugares donde conseguir tinta, papiros y otros utensilios de escriba. Además, (casi) siempre conoces información superficial sobre la historia y situación geopolítica del lugar.","requisito_dote":""},{"id":2,"nombre":"Toque curativo","descripcion":"Sabes cómo realizar primeros auxilios utilizando tan sólo el poder de tus manos. Poseer esta habilidad te permite realizar tiradas de Medicina como si siempre tuvieses un botiquín de Estrato 1 encima. Además, es imposible que falles las tiradas de Medicina realizadas durante un Descanso para curar a otras personas.","requisito_dote":""},{"id":3,"nombre":"Formación profusa","descripcion":"Conoces los secretos de un lenguaje antiguo a tu elección.","requisito_dote":""},{"id":4,"nombre":"Mayéutica","descripcion":"Cuando tratas de persuadir a alguien sobre un tema, puedes sustituir la tirada de Persuasión por el saber o habilidad relacionada con el tema en cuestión.","requisito_dote":""},{"id":5,"nombre":"Verdad absoluta","descripcion":"Si posees una Verdad sobre un tema, puedes convencer a alguien sobre esa Verdad sin necesidad de realizar tiradas de Persuasión.","requisito_dote":""},{"id":6,"nombre":"Clase magistral","descripcion":"Requisitos: tener el nodo de Instruir. Realizas una disertación sobre un tema en el que seas experto. Si tienes al menos un punto en una habilidad, puedes transmitir tus conocimientos a un número de personas igual o inferior a tu nivel de Erudito con una clase de una hora. La gente que haya prestado atención a tu clase puede sumar un punto de habilidad extra a esta habilidad, incluso si este punto fuese a pasar de su límite de habilidad. Cada persona sólo puede beneficiarse de una única instancia del efecto de Clase magistral a la vez.","requisito_dote":""},{"id":7,"nombre":"Aprendizaje apresurado","descripcion":"Si estudias durante 15 minutos al día, puedes aprender una habilidad no clásea a tu elección de la que no seas competente. Cuenta como si tuvieras un punto en la habilidad. Este efecto dura hasta el final del día.","requisito_dote":""},{"id":8,"nombre":"Saber de mucho","descripcion":"Sabes leer y escribir a la perfección, a parte sabes los lenguajes principales de Lenam y de Tharrashmir. Bonos en aprender habilidades si te dedicas a ello, aprendes el doble de rápido y puedes ponerte rangos en habilidades nuevas que hayas te dedicado a aprender durante 2 semanas y hayas conseguido los pertinentes libros u objetos que propicien dicha cosa.","requisito_dote":""},{"id":9,"nombre":"Conocimiento arqueológico avanzado","descripcion":"Puedes localizar reliquias del pasado así como grandes hallazgos de la civilización. Requieres de diferentes categorías según lo distante i/o ignoto a encontrar.","requisito_dote":""},{"id":10,"nombre":"Verborrea","descripcion":"Puedes distraer a un número de personas inferior o igual a tu nivel de Erudito durante un máximo de diez minutos. Sólo puedes distraer a una persona con el uso de Verborrea un máximo de una vez al día.","requisito_dote":""}]},{"id":4,"nombre":"Monster Hunter","descripcion":"Acostumbrado a ser el depredador, has consagrado tu vida al noble arte de la caza ya sea por el romanticismo de perseguir a tu presa durante días para luego asestarle un único golpe certero, como para unirte a otros cazadores y atrapar una pieza mayor. Puedes formar parte de una Gran Cacería, grupos de cazadores a sueldo que se dedican a asegurar las tierras de una población o un noble. O bien puedes trabajar en solitario cogiendo encargos mas accesibles para un único depredador.","habilidades":[13,14,15,16,17,18],"dotes":[{"id":1,"nombre":"Domar bestia","descripcion":"Puedes instruir durante 1 día un animal salvaje de tamaño pequeño y domesticarlo. Con 1 semana, el animal te tiene confianza plena y desbloqueas habilidades y ordenes que puedes usar con ella.","requisito_dote":""},{"id":2,"nombre":"Empatía animal","descripcion":"Entiendes las intenciones de los animales y otras bestias. Sabes el estado anímico con sólo un vistazo, discierniendo si es agresivo o es manso. Si puede domesticarse o es un esfuerzo inútil.","requisito_dote":""},{"id":3,"nombre":"Despiezar","descripcion":"Permite realizar una segunda tirada de recolección hacia una bestia o cadáver de bestia. Si aciertas, obtienes materiales otra vez, y en mejor estado.","requisito_dote":""},{"id":4,"nombre":"Furtivo","descripcion":"Siempre conoces un Rumor de cada tipo de bestia conocida por el hombre. Además, en función de los Datos que tengas sobre un tipo de criatura o criatura específica, puedes saber con más o menos certeza la localización de su hábitat actual.","requisito_dote":""},{"id":5,"nombre":"Acechador sombrío","descripcion":"Requisitos: kit de camuflaje o un entorno recargado. Usas elementos de tu alrededor para mimetizarte con éste. Tardas 10 segundos en camuflarte por completo. Mientras te concentres y no te mueves un ápice, eliminas tu presencia en el ambiente y obtienes camuflaje superior, que permite mimetizarte con el entorno y ser indetectable a menos que usen herramientas o habilidades en específico para ello. Puedes mantener el camuflaje durante máximo un minuto.","requisito_dote":""},{"id":6,"nombre":"Hora de la cacería","descripcion":"Requisito: herir a una bestia, o ver cómo alguien ha herido a una bestia. Conoces la posición exacta de cualquier criatura que haya sido herida por ti o tus aliados, en un máximo de un radio a 500 metros. Si se aleja más de 500 metros, pierdes el rastro.","requisito_dote":""},{"id":7,"nombre":"Diario del cazador","descripcion":"Almacenas información sobre los monstruos que aniquiles o estudies durante al menos una hora, adquiriendo ventajas tanto en conocimientos como en combate con estos. Además, puedes convertir tres Datos de la misma calidad sobre una criatura determinada en un Dato de la siguiente calidad. En función a la calidad de los Datos que poseas sobre una criatura en concreto, puedes obtener información específica.","requisito_dote":""},{"id":8,"nombre":"Tendón de piedra","descripcion":"Resistencia a toxinas, recibes la mitad del daño de los venenos de la flora y la fauna. Al estar expuesto a los mismos venenos en un período de 1 semana, adquieres cada vez mas resistencias a estos y acabas siendo inmune a dichas toxinas específicas. Requiere que hayas estado expuesto a sus toxinas diariamente en el período de 1 semana. Funciona por Instancias traducidas en pulls de tiradas a superar.","requisito_dote":""},{"id":9,"nombre":"Nuez Emboscada","descripcion":"Tienes Ventaja 1 en las tiradas de sigilo frente a una presa que hayas localizado, si superas, puedes deducir sus patrones de movimiento y saber donde estará a 1min vista.","requisito_dote":""}]},{"id":5,"nombre":"Pionero","descripcion":"Explorador experto en recorrer tierras inexploradas y sobrevivir en los entornos más hostiles. Conocedor de los secretos de la naturaleza y capaz de guiar a otros a través de los peligros del mundo salvaje.","habilidades":[19,20,21,22,23,24],"dotes":[{"id":1,"nombre":"Viaje rápido","descripcion":"Reduce en 1 dia el tiempo que se tarda en atravesar casillas que no sean de camino.","requisito_dote":""},{"id":2,"nombre":"Hallar el camino","descripcion":"Sabes orientarte por los vientos, la vegetación, y los astros. Siempre que no tengas un elemento que perturbe gravementre los sentidos, sabes dónde está el norte.","requisito_dote":""},{"id":3,"nombre":"Bienvenido, Mr. Marshal","descripcion":"Al encontrar un Refugio en el que pasar el mal tiempo, aumentas su calidad en 1. Además, puedes encontrar recursos naturales cercanos como agua o comida. Puedes utilizar esa comida y bebida en lugar de las raciones de tu exploración. Si tomas un Descanso en este refugio: el refugio tiene un nivel de Comfort de Estrato 2, y obtienes un nivel de comida de Estrato 1.","requisito_dote":""},{"id":4,"nombre":"Señor del Tiempo","descripcion":"Al observar el entorno durante 1 min, puedes recabar Información que determina los accidentes meteorológicos principales que pueden darse con más antelación. Tu distancia de visión de temporales aumenta en una elevación. Puedes identificar posibles refugios naturales a 1 hexagono de distancia y determinar de antemano la calidad de refugio que van a ser.","requisito_dote":""},{"id":5,"nombre":"Capear el Temporal","descripcion":"Hay eventos climatológicos muy intempestivos y espontáneos. El explorador sabe como protegerse de dichas catástrofes. Puedes construir un refugio improvisado en 15 min para dichas situaciones. Cuenta como refugio de calidad 1 y dependiendo del material usado puede contrarrestar distintos efectos activos.","requisito_dote":""}]}]'),Wm={oficios:qm},Xm=["value"],jm={key:0,style:{"margin-top":"8px"}},$m={key:0,class:"space-y-8"},Ym={class:"bg-blue-50 border-2 border-blue-200 rounded-lg p-6"},Km={class:"text-xl font-bold text-blue-700 mb-3"},Zm={class:"text-blue-600 leading-relaxed"},Jm={class:"bg-blue-50 border-2 border-blue-200 rounded-lg p-6"},Qm={class:"text-lg font-semibold text-blue-700 mb-3"},eg={class:"grid grid-cols-1 md:grid-cols-2 gap-3"},tg=["onClick","disabled"],ng={class:"flex items-center gap-2"},ig={key:0,class:"text-blue-500 text-xs"},sg={class:"text-sm text-blue-600 mt-3"},rg={class:"bg-blue-50 border-2 border-blue-200 rounded-lg p-6"},ag={class:"text-lg font-semibold text-blue-700 mb-4"},og={class:"text-sm text-blue-600 mb-6"},lg={class:"space-y-6"},cg={class:"text-md font-semibold text-blue-700 uppercase tracking-wide border-b border-blue-300 pb-2"},dg={class:"space-y-3"},ug={key:0,class:"flex items-start mb-2"},hg={class:"text-xs text-blue-500 italic"},fg=["onClick","disabled"],pg={class:"flex items-start gap-3"},mg={key:0,class:"text-blue-500 text-xs"},gg={class:"flex-1"},_g={class:"font-semibold mb-1"},vg={__name:"oficio",setup(n){const{characterData:e,loadCharacterData:t}=_r(),i=zt(""),s=zt([]),r=zt([]),a=$t(()=>{const x={};return sc.habilidades.forEach(m=>{x[m.id]=m.nombre}),x}),o=$t(()=>Wm.oficios.map(x=>({...x,habilidadesNombres:x.habilidades.map(m=>a.value[m]||`Habilidad ${m}`),numHabilidades:x.habilidades.length,numDotes:3,gruposDotes:l(x.dotes)})));function l(x){const m=[];return x.filter(h=>!h.requisito_dote||h.requisito_dote===""),x.filter(h=>h.requisito_dote&&h.requisito_dote!==""),x.length>0&&m.push({categoria:"Dotes de Clase",dotes:x.map(h=>({...h,requiere:h.requisito_dote?parseInt(h.requisito_dote):null}))}),m}const c=$t(()=>o.value.find(x=>x.nombre===i.value));ji(()=>{t(),i.value=e.value.oficio||"",r.value=e.value.oficio_habilidades||[]}),St(i,x=>{e.value.oficio=x}),St(r,x=>{e.value.oficio_habilidades=[...x]},{deep:!0}),St(c,()=>{r.value=[],s.value=[]});function d(x){const m=r.value.indexOf(x);m!==-1?r.value.splice(m,1):c.value&&r.value.length<c.value.numHabilidades&&r.value.push(x)}function u(x){const m=s.value.indexOf(x.id);m!==-1?(s.value.splice(m,1),g(x)):c.value&&s.value.length<c.value.numDotes&&s.value.push(x.id)}function f(x){return x.requiere?s.value.includes(x.requiere):!0}function p(x){if(!c.value)return x;for(const m of c.value.gruposDotes)for(const h of m.dotes)if(h.id===x)return h.nombre;return`Dote ${x}`}function g(x){c.value&&c.value.gruposDotes.forEach(m=>{m.dotes.forEach(h=>{if(h.requiere===x.id){const T=s.value.indexOf(h.id);T!==-1&&(s.value.splice(T,1),g(h))}})})}return(x,m)=>(Pe(),De(nt,null,[D("div",null,[m[2]||(m[2]=D("label",{class:"block text-sm font-semibold text-blue-700 mb-2"}," Selecciona tu Oficio ",-1)),xn(D("select",{"onUpdate:modelValue":m[0]||(m[0]=h=>i.value=h),class:"w-full px-4 py-3 bg-blue-50 border-2 border-blue-200 rounded-lg text-blue-900"},[m[1]||(m[1]=D("option",{value:""},"Elige un oficio...",-1)),(Pe(!0),De(nt,null,Nt(o.value,h=>(Pe(),De("option",{key:h.id,value:h.nombre},Se(h.nombre),9,Xm))),128))],512),[[ic,i.value]]),i.value?(Pe(),De("p",jm)):vt("",!0)]),c.value?(Pe(),De("div",$m,[D("div",Ym,[D("h3",Km,Se(c.value.nombre),1),D("p",Zm,Se(c.value.descripcion),1)]),D("div",Jm,[D("h4",Qm," Habilidades de Clase (Elige "+Se(c.value.numHabilidades)+") ",1),D("div",eg,[(Pe(!0),De(nt,null,Nt(c.value.habilidadesNombres,h=>(Pe(),De("button",{key:h,onClick:T=>d(h),class:xt(["text-left px-4 py-3 rounded-lg font-medium transition-all duration-200 border-2",r.value.includes(h)?"bg-blue-500 text-white border-blue-500 shadow-lg":"bg-white text-blue-700 border-blue-200 hover:border-blue-400 hover:bg-blue-50"]),disabled:!r.value.includes(h)&&r.value.length>=c.value.numHabilidades},[D("span",ng,[D("span",{class:xt(["flex items-center justify-center w-5 h-5 rounded border-2 flex-shrink-0",r.value.includes(h)?"bg-white border-white":"bg-transparent border-blue-300"])},[r.value.includes(h)?(Pe(),De("span",ig,"✓")):vt("",!0)],2),Mi(" "+Se(h),1)])],10,tg))),128))]),D("p",sg," Seleccionadas: "+Se(r.value.length)+" / "+Se(c.value.numHabilidades),1)]),D("div",rg,[D("h4",ag," Dotes de Clase (Elige "+Se(c.value.numDotes)+") ",1),D("p",og," Seleccionadas: "+Se(s.value.length)+" / "+Se(c.value.numDotes),1),D("div",lg,[(Pe(!0),De(nt,null,Nt(c.value.gruposDotes,h=>(Pe(),De("div",{key:h.categoria,class:"space-y-4"},[D("h5",cg,Se(h.categoria),1),D("div",dg,[(Pe(!0),De(nt,null,Nt(h.dotes,T=>(Pe(),De("div",{key:T.id,class:"ml-0"},[T.requiere?(Pe(),De("div",ug,[m[3]||(m[3]=D("div",{class:"w-8 border-l-2 border-blue-300 h-4 border-b-2 rounded-bl-lg mr-2"},null,-1)),D("span",hg,"Requiere: "+Se(p(T.requiere)),1)])):vt("",!0),D("button",{onClick:w=>u(T),disabled:!s.value.includes(T.id)&&s.value.length>=c.value.numDotes||!f(T),class:xt(["w-full text-left p-4 rounded-lg transition-all duration-200 border-2",s.value.includes(T.id)?"bg-blue-500 text-white border-blue-500 shadow-lg":f(T)?"bg-white text-blue-700 border-blue-200 hover:border-blue-400 hover:shadow-md":"bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-50",T.requiere?"ml-8":""])},[D("div",pg,[D("span",{class:xt(["flex items-center justify-center w-5 h-5 rounded border-2 flex-shrink-0 mt-0.5",s.value.includes(T.id)?"bg-white border-white":"bg-transparent border-blue-300"])},[s.value.includes(T.id)?(Pe(),De("span",mg,"✓")):vt("",!0)],2),D("div",gg,[D("div",_g,Se(T.nombre),1),D("p",{class:xt(["text-sm",s.value.includes(T.id)?"text-blue-100":"text-blue-600"])},Se(T.descripcion),3)])])],10,fg)]))),128))])]))),128))])])])):vt("",!0)],64))}},xg=JSON.parse('[{"nombre":"Armatha","descripcion":"El estilo de combate propio de Lenam. Simple y directo, sin florituras. Especialidad en combate con escudos y combate grupal.","dotes":[{"id":1,"nombre":"Falange I","descripcion":"Al realizar la acción de carga, los aliados que estén adyacentes a ti cargaran contigo en tu misma dirección, realizando todos ellos 1 acción de carga.","requisito_dote":"","activa":"1","categoria":""},{"id":2,"nombre":"Falange II","descripcion":"Si algun aliado cargando tiene menos movimiento que tu le otorgas tu movimiento","requisito_dote":"1","activa":"1","categoria":""},{"id":3,"nombre":"Falange III","descripcion":"Aumenta el radio a 4 casillas de distancia.","requisito_dote":"2","activa":"1","categoria":""},{"id":4,"nombre":"Falange IV","descripcion":"Duplicas el movimiento de todos los aliados y tu mismo. El radio de efecto de la carga aumenta hasta tu distancia de grito. ","requisito_dote":"3","activa":"1","categoria":""},{"id":5,"nombre":"Tácticas de pelotón I","descripcion":"Duplica el efecto de las Formaciones durante 1 turno. Formaciones disponibles en un radio de 2 casillas por estrato: Testudos (resistencia al daño perforante y proyectiles +2 por estrato), Falange (daño DL +2 por tier), En línea (penetración DE +2 por tier), Abanderada (WL +2 por tier), En Blitz (Iniciativa +2 por tier).","requisito_dote":"","activa":"12","categoria":""},{"id":6,"nombre":"Tácticas de pelotón II","descripcion":"Duplica el efecto de las Formaciones a todos los aliados que estén afectados en el área.","requisito_dote":"5","activa":"12","categoria":""},{"id":7,"nombre":"Tácticas de pelotón III","descripcion":"Triplica el efecto de las Formaciones a todos los aliados implicados dentro del área.","requisito_dote":"6","activa":"12","categoria":""},{"id":8,"nombre":"Palabra de comando","descripcion":"Puedes otorgar 1 acción tuya a un aliado.","requisito_dote":"","activa":"","categoria":""},{"id":9,"nombre":"Alentar","descripcion":"Usas 1 acción para quitar el estado de Atemorizado y Embobado a todos los que te puedan escuchar.","requisito_dote":"","activa":"","categoria":""},{"id":10,"nombre":"¡A mi la Legión!","descripcion":"Usas 1 acción para animar a tus aliados a que se reagrupen a tu alrededor. Estos aliados pueden moverse en dirección hacia ti un máximo de distancia igual a su Movimiento.","requisito_dote":"","activa":"","categoria":""},{"id":11,"nombre":"Discurso motivador","descripcion":"Al hacer un discurso de 5 minutos a un grupo de oyentes, otorga los siguientes bufos durante 10 min: +1 Movimiento, +1 Poderío, +1 Puntería, Tu nivel en sobreescudo.","requisito_dote":"","activa":"","categoria":""},{"id":12,"nombre":"Bricomania","descripcion":"Te permite construir obras de ingenieria militar, sin la necesidad de tener puntos en la artesania de grandes proyectos.","requisito_dote":"","activa":"","categoria":""},{"id":13,"nombre":"Heavy weaponzzz","descripcion":"Levanta la restricción de armas y armaduras con la etiqueta de Pesada.","requisito_dote":"","activa":"","categoria":""}]},{"nombre":"Maestros de armas de Limsa Lomensa","descripcion":"Los mejores guerreros de Limsa Lomensa, especialistas en las armas duales y el uso de múltiples armas rápidas que les dotan de mucha versatilidad en la batalla.","dotes":[{"id":1,"nombre":"Demasiado lento I","descripcion":"Al usar Contraataque, golpeas una vez más con un arma diferente sin coste alguno para desenvainarla.","requisito_dote":"","activa":"10","categoria":""},{"id":2,"nombre":"Demasiado lento II","descripcion":"Una vez por turno puedes usar una reacción gratuita para efectuar el contraataque.","requisito_dote":"1","activa":"10","categoria":""},{"id":3,"nombre":"Poco rápido I","descripcion":"Al usar Parry, si desvías con éxito un golpe, el siguiente ataque que cometa el objetivo contra ti va con desventaja.","requisito_dote":"","activa":"8","categoria":""},{"id":4,"nombre":"Poco rápido II","descripcion":"Si desvías dicho ataque, este va dirigido contra otro enemigo a tu elección.","requisito_dote":"3","activa":"8","categoria":""},{"id":5,"nombre":"Poco rápido III","descripcion":"Como parte de tu reacción, puedes usar, en caso de tenerla, Desarme precoz.","requisito_dote":"4","activa":"8","categoria":""},{"id":6,"nombre":"Truco del almendruco","descripcion":"Puedes intercambiar tus armas actualmente equipadas al principio de cada acción de ataque.","requisito_dote":"","activa":"","categoria":""},{"id":7,"nombre":"Intercambio promiscuo","descripcion":"Al cambiar de armas por un arma no utilizada durante este turno, ganas tu estrato en Poderío hasta final de turno. Se puede acumular.","requisito_dote":"","activa":"","categoria":""},{"id":8,"nombre":"Empuñadura del titán","descripcion":"Ignoras la propiedad A dos manos. Pudiendo llevar un arma en cada mano a merced, además hacen el máximo daño posible que tengan dichas armas.","requisito_dote":"","activa":"","categoria":""},{"id":9,"nombre":"Tormenta de acero","descripcion":"Requisito: tener a dos o más objetivos a rango de al menos una de tus armas cuerpo a cuerpo. Gastas 3 acciones. Dañas a todos los enemigos que estén a rango con el daño de tus armas, siempre y cuando cada ataque sea efectuado con un arma de distinto tipo y los ataques se distribuyan equitativamente entre todos los objetivos que te rodeen.","requisito_dote":"","activa":"","categoria":""},{"id":10,"nombre":"Carga febril","descripcion":"Las armas pesan y ocupan la mitad en tu inventario.","requisito_dote":"","activa":"","categoria":""},{"id":11,"nombre":"Desarme precoz I","descripcion":"Usas una acción de ataque para robar el arma de tu oponente o bien para lanzarla al suelo.","requisito_dote":"","activa":"","categoria":""},{"id":12,"nombre":"Desarme precoz II","descripcion":"Al tener éxito en ello puedes realizar una acción de ataque con el mismo arma robada.","requisito_dote":"11","activa":"","categoria":""}]},{"nombre":"Pugilista","descripcion":"Acceso a las posturas de combate y mejora de las acciones de combate. Desventaja al llevar puesta una armadura.","dotes":[{"id":1,"nombre":"Parry - Desvío perfecto","descripcion":"Si logras desviar con éxito un ataque, consigues hacer que el atacante se golpee a sí mismo con la misma fuerza con la que te iba a golpear.","requisito_dote":"","activa":"8","categoria":""},{"id":2,"nombre":"Parry - Desvío de proyectiles","descripcion":"Te permite desviar proyectiles.","requisito_dote":"1","activa":"8","categoria":""},{"id":3,"nombre":"Parry - Devolución de proyectiles","descripcion":"Te permite devolver proyectiles.","requisito_dote":"2","activa":"8","categoria":""},{"id":4,"nombre":"Adrenalina - La Zona I","descripcion":"Tienes una acción de ataque extra.","requisito_dote":"","activa":"3","categoria":""},{"id":5,"nombre":"Adrenalina - La Zona II","descripcion":"Tienes una reacción extra.","requisito_dote":"4","activa":"3","categoria":""},{"id":6,"nombre":"Inmovilización prensada","descripcion":"Ataque contra su nivel de Estilo Marcial, en caso de ganar aplicas el estado Sometido.","requisito_dote":"","activa":"","categoria":"Escuela de las luxaciones"},{"id":7,"nombre":"Agarre eficiente","descripcion":"Cuando realizas la agarrar, no tienes que elegir entre Maniatado y Enredado.","requisito_dote":"","activa":"","categoria":"Escuela de las luxaciones"},{"id":8,"nombre":"Juri","descripcion":"Puedes utilizar tus piernas como herramienta para causar Maniatado a un enemigo.","requisito_dote":"","activa":"","categoria":"Escuela de las luxaciones"},{"id":9,"nombre":"Juri - Mejora I","descripcion":"Cuando realizas un agarre, ignoras los efectos negativos de Maniatado y/o Enredado que el agarre te causaría.","requisito_dote":"8","activa":"","categoria":"Escuela de las luxaciones"},{"id":10,"nombre":"Danzas Ballerina Longina","descripcion":"Cada acción de ataque con arma permite realizar un ataque sin armas en forma de patada.","requisito_dote":"","activa":"","categoria":"Escuela de las armas"},{"id":11,"nombre":"Danza Vectorial Direccional","descripcion":"Puedes golpear a tus enemigos en direcciones distintas. Si golpeas al mismo enemigo desde direcciones distintas (diferente cara del hexágono), obtienes -4 en tu rango de crítico.","requisito_dote":"","activa":"","categoria":"Escuela de las armas"},{"id":12,"nombre":"Guardia del agua que fluye","descripcion":"Si no has gastado ninguna acción durante tu turno, tu Esquiva se dobla hasta el principio de tu siguiente turno.","requisito_dote":"","activa":"","categoria":"Escuela del desvio que te vio"},{"id":13,"nombre":"Fluyo como el agua","descripcion":"Gastas 1 Reacción. El rival tiene desventaja al atacarte hasta el siguiente turno. En el momento de recibir un golpe enemigo, reaccionas desviándolo, haciendo que el enemigo caiga al suelo.","requisito_dote":"","activa":"","categoria":"Escuela del desvio que te vio"},{"id":14,"nombre":"Fluyo como el agua - Mejora I","descripcion":"Aprovechas como parte del desvío y el enemigo realiza una tirada con desventaja por Juego de Manos sobre Nivel de Pugilista o Juego de manos, si falla, lo desarmas.","requisito_dote":"13","activa":"","categoria":"Escuela del desvio que te vio"},{"id":15,"nombre":"El Directo","descripcion":"Un golpe rápidísimo que requiere de una preparación.","requisito_dote":"","activa":"","categoria":"Escuela del castañazo"},{"id":16,"nombre":"Destrozo visceral","descripcion":"Un forte golpe mezzoforte hecho con el hombro que empuja y realiza en daño tu DL*2, tanto en daño como en distancia de empuje. Si el objetivo se choca con algo durante el recorrido del empuje, recibe tanto daño como movimiento restante.","requisito_dote":"","activa":"","categoria":"Escuela del castañazo"},{"id":17,"nombre":"Contra","descripcion":"Puedes decidir no actuar durante un turno. Como parte de esta maniobra, puedes desplazarte tanto como tu Movimiento. Todo el daño recibido hasta el principio de tu siguiente turno se acumula, y una vez comience tu siguiente turno, se devuelve multiplicado por dos a todos los enemigos que tengas en casillas colindantes.","requisito_dote":"","activa":"","categoria":"Escuela del castañazo"},{"id":18,"nombre":"Efecto Depèche","descripcion":"Tus puñetazos adquieren la propiedad de Rango con una distancia óptima entre cero y tu Poderío, y la propiedad de Área, con daño en cono delante de ti. Este ataque realiza tu Poderío en daño, y cada espacio que te separe del objetivo reduce el daño en uno, hasta cero.","requisito_dote":"","activa":"","categoria":"Escuela del castañazo"},{"id":19,"nombre":"Golpe aturdidor","descripcion":"Una vez por turno puedes realizar un ataque que aplique el estado de Aturdido.","requisito_dote":"","activa":"","categoria":"Escuela del castañazo"},{"id":20,"nombre":"Terremoto","descripcion":"Realizas un pisotón o puñetazo contra el suelo para causar un pequeño cataclismo a tu alrededor. Todos los espacios en un radio de dos se transforman en terreno dificilillo, y todos los enemigos que hubiese en el área se desplazan una casilla hacia ti. Los enemigos desplazados de esta forma deben realizar una tirada de Acrobacia contra tu Nivel de Pugilista + Poderío; si fallan, adquieren el estado Cuerpo a tierra. Además, cualquier trampa en el área del cráter queda inutilizada y destruida.","requisito_dote":"","activa":"","categoria":"Escuela del castañazo"},{"id":21,"nombre":"Galleta galleta metralleta","descripcion":"Una vez por turno, puedes decidir gastar una, dos o tres acciones en realizar los siguientes ataques. Gastando 1 acción: golpeas 3 veces. Gastando 2 acciones: golpeas 5 veces con desventaja 1. Gastando 3 acciones: golpeas 7 veces con desventaja 2.","requisito_dote":"","activa":"","categoria":"Escuela del muda muda"},{"id":22,"nombre":"Arras","descripcion":"Puedes moverte un espacio en cualquier dirección después de cada golpe certero.","requisito_dote":"","activa":"","categoria":"Escuela del muda muda"},{"id":23,"nombre":"Jab I","descripcion":"Golpe rápido al que no se le añade el Poderío y no se le puede reaccionar.","requisito_dote":"","activa":"","categoria":"Escuela del muda muda"},{"id":24,"nombre":"Jab II - Golpe ciclón","descripcion":"Al atacar con jab obtienes ventaja 3.","requisito_dote":"24","activa":"","categoria":"Escuela del muda muda"},{"id":25,"nombre":"Jab III - Golpe Espiral","descripcion":"Ignoras la esquiva, el ataque no puede fallar.","requisito_dote":"25","activa":"","categoria":"Escuela del muda muda"},{"id":26,"nombre":"Patadiña de Boliña","descripcion":"Gastando 1 acción. Patadas especiales realizan 2 de daño + Poderío. En el turno de usar Patadiña de Boliña, puedes moverte gastando acciones y si los enemigos entran en el rango de tu habilidad son golpeados automáticamente, cada ataque golpea 1 vez a un enemigo distinto. Si usas alguna otra acción que no sea moverte Patadiña de Boliña es cancelada.","requisito_dote":"","activa":"","categoria":"Escuela del muda muda"},{"id":27,"nombre":"Patadiña de Boliña I","descripcion":"Golpeas en área realizando una patada en arco enfrente tuyo.","requisito_dote":"27","activa":"","categoria":"Escuela del muda muda"},{"id":28,"nombre":"Patadiña de Boliña II","descripcion":"Patadiña de Boliña golpea dos veces a todos los enemigos golpeados previamente.","requisito_dote":"28","activa":"","categoria":"Escuela del muda muda"},{"id":29,"nombre":"Patadiña de Boliña III","descripcion":"Golpeas en área a todos los enemigos a tu alrededor en ángulo de 360.","requisito_dote":"28","activa":"","categoria":"Escuela del muda muda"}]},{"nombre":"Cruzado","descripcion":"Dispuesto a servir y proteger a los inocentes y castigar a los injustos, este estilo marcial es propio de aquellos que han sido entrenados por los maestros de la Orden de los Caballeros del Silencio. Aprenden tácticas de combate en formaciones y defensa personal. Expertos en aprovechar los errores del rival en su beneficio y en interceder para proteger a sus aliados.","dotes":[{"id":1,"nombre":"Intercepción - Intervención I","descripcion":"Si una criatura está a punto de recibir un golpe a melé y está a 2 casillas o menos, intercedes y golpeas a su agresor.","requisito_dote":"","activa":"4","categoria":""},{"id":2,"nombre":"Intercepción - Intervención II","descripcion":"La distancia de la Intervención aumenta hasta tu velocidad base.","requisito_dote":"1","activa":"4","categoria":""},{"id":3,"nombre":"Intercepción - Intervención III","descripcion":"Puedes intervenir ataques a distancia.","requisito_dote":"2","activa":"4","categoria":""},{"id":4,"nombre":"Intercepción - Intervención IV","descripcion":"El golpe que le causas al agresor va con la furia de la justicia, recibe Ventaja 2 en dicho golpe.","requisito_dote":"3","activa":"4","categoria":""},{"id":5,"nombre":"Intercepción - Intervención V","descripcion":"El golpe es devastador, reduce en 1 el rango de crítico necesario.","requisito_dote":"4","activa":"4","categoria":""},{"id":6,"nombre":"Tensión - Custodio I","descripcion":"Además de otorgar 3 de Resistencia, Tensión también aumenta en 1/Body la Resistencia.","requisito_dote":"","activa":"2","categoria":""},{"id":7,"nombre":"Tensión - Custodio II","descripcion":"Otorga tanto HP como Body tengas.","requisito_dote":"6","activa":"2","categoria":""},{"id":8,"nombre":"Tensión - Custodio III","descripcion":"Si el atacante falla, debe tirar por caer derribado al suelo con Desventaja 1.","requisito_dote":"7","activa":"2","categoria":""},{"id":9,"nombre":"Tensión - Custodio IV","descripcion":"Si falla debe tirar con Desventaja 2 por caer preso del terror.","requisito_dote":"8","activa":"2","categoria":""},{"id":10,"nombre":"Tensión - Custodio V","descripcion":"Aumenta en 1 las Desventajas anteriores.","requisito_dote":"9","activa":"2","categoria":""},{"id":11,"nombre":"Baluarte","descripcion":"Has sido entrenado para proteger, para ser la vanguardia y el escudo que defiende toda la fe. Mientras tus compañeros no reciban daño, tienes Ventaja 1 en las tiradas de dar en combate.","requisito_dote":"","activa":"","categoria":""},{"id":12,"nombre":"Contemplación","descripcion":"Ritual en el que meditas sobre el origen de la fe. (Acción mental) Integras el poder del fuego imperecedero y adquieres diferentes efectos.","requisito_dote":"","activa":"","categoria":""},{"id":13,"nombre":"Juicio","descripcion":"Estado que infliges a un enemigo por nivel de poder con el que todo el mundo tiene una bonificación al dar.","requisito_dote":"","activa":"","categoria":""},{"id":14,"nombre":"Veredicto","descripcion":"Golpe cargado de luz abrasadora. Inflige más daño si el objetivo está en estado juzgado.","requisito_dote":"","activa":"","categoria":""},{"id":15,"nombre":"Bendición","descripcion":"Bendices hasta un número máximo de 1 por nivel de poder de alma y ofreces una mejora a la armadura y la vitalidad.","requisito_dote":"","activa":"","categoria":""},{"id":16,"nombre":"Expiación","descripcion":"Te bendices a ti o una criatura. Cuando alguien ataque a la persona bendecida, un castigo se desatará sobre el atacante, imbuyendo tu arma con el poder del fuego sagrado, podrás infligir un extra de daño al atacante.","requisito_dote":"","activa":"","categoria":""},{"id":17,"nombre":"Choque sagrado","descripcion":"Descargas un rayo de luz desde las yemas de los dedos hacia un único objetivo, sana aliados y daña enemigos.","requisito_dote":"","activa":"","categoria":""},{"id":18,"nombre":"Vínculo de rectitud","descripcion":"Forjas un vínculo con un aliado en el que prometes protegerle ante todo, si el objetivo recibe daño, se divide a la mitad y tú recibes la otra mitad de su daño.","requisito_dote":"","activa":"","categoria":""},{"id":19,"nombre":"Consagrar","descripcion":"Bendice una zona con el poder de la luz, quemando a los infieles y sanando a los aliados.","requisito_dote":"","activa":"","categoria":""},{"id":20,"nombre":"Iniciativa mejorada","descripcion":"Tu Body por 3 se suma a la iniciativa.","requisito_dote":"","activa":"","categoria":""}]},{"nombre":"Vagabond","descripcion":"Eras un guerrero formidable y lo tenias todo…Hasta que algo o alguien se interpuso y ahora lo que mas valorabas te ha sido arrebatado. ¿Recuperarás lo que te pertenece?","dotes":[{"id":1,"nombre":"Contraataque - Oni Giri","descripcion":"A diferencia del contraataque normal, que solo puede ser activado cuando un enemigo te impacta, tú puedes activarlo cuando realizan una acción de ataque contra ti a melé y fallan también. Castigas al oponente que ha fallado su ataque contra ti de manera devastadora, aplicas tu nivel de Vagabond +1 al DL y al dar del golpe del contraataque.","requisito_dote":"","activa":"10","categoria":""},{"id":2,"nombre":"Tensión - Kaioken I","descripcion":"Adoptas una postura de combate y tienes todos tus sentidos al máximo, formas un perímetro al tener tensión de 2 casillas y 1 en diagonal (4 metros). La criatura que te ataque a ti o algún aliado dentro del perímetro se llevará un contraataque extra. Pudiendo ser 2 contraataques en 1 turno si te atacan a ti.","requisito_dote":"","activa":"2","categoria":""},{"id":3,"nombre":"Tensión - Kaioken II","descripcion":"Los contraataques se duplican.","requisito_dote":"2","activa":"2","categoria":""},{"id":4,"nombre":"Sentidos super desarrollados","descripcion":"Gastando 3 acciones, te concentras de tal manera que tienes ventaja 3 al esquivar. Hasta el principio de tu siguiente turno.","requisito_dote":"","activa":"","categoria":""},{"id":5,"nombre":"Defensa personal","descripcion":"Si aciertas un contraataque, en vez de atacar puedes aturdir a tu oponente 1 vez por turno. Causando que haya ventaja 1 al darle y solo pueda moverse la mitad de su movimiento.","requisito_dote":"","activa":"","categoria":""},{"id":6,"nombre":"Abandonar toda esperanza","descripcion":"Con la condición de haber recibido más de la mitad de tu vida en daño. Tus emociones te hacen estallar, convirtiéndote en un torbellino de furia imparable. Tienes ventaja 3 al dar pero desventaja 3 al esquivar. Dura 1 turno pero si quieres alargarlo deberás sufrir en cada uno de los turnos 1 nivel de cansancio extra.","requisito_dote":"","activa":"","categoria":""}]},{"nombre":"Ratero","descripcion":"En toda buena urbe urbana hay rateros, pero estos son profesionales. Expertos en hacer un arma de cualquier cosa que tengan cerca, usan cachivaches y juegan muuy sucio.","dotes":[{"id":1,"nombre":"Intercepción - Abarse I","descripcion":"Cuando eres el objetivo de un ataque cuerpo a cuerpo, puedes realizar un agarre contra una criatura (que no sea la atacante) para usarla como escudo de carne. Si el agarre es exitoso, la criatura agarrada se convierte en el nuevo objetivo del ataque.","requisito_dote":"","activa":"4","categoria":""},{"id":2,"nombre":"Intercepción - Abarse II","descripcion":"Puedes utilizar Abarse contra cualquier ataque, sea o no cuerpo a cuerpo.","requisito_dote":"1","activa":"4","categoria":""},{"id":3,"nombre":"Intercepción - Abarse III","descripcion":"En caso de que el agarre que se realiza como parte de Abarse sea exitoso, puedes intercambiar posiciones con la criatura agarrada. Además, puedes utilizar Abarse en caso de que seas víctima de un ataque en área, permitiendo así evadir por completo el ataque en caso de que se abandone su perímetro.","requisito_dote":"2","activa":"4","categoria":""},{"id":4,"nombre":"Intercepción - Abarse IV","descripcion":"Cuando utilizas Abarse, puedes gastar una reacción extra para escoger a una criatura a una distancia máxima de hasta tu velocidad de movimiento como objetivo de tu agarre. Si el agarre es exitoso, envías a ese pobre desgraciado a tu posición inicial de una patada.","requisito_dote":"3","activa":"4","categoria":""},{"id":5,"nombre":"Intercepción - Abarse V","descripcion":"El agarre utilizado como parte de Abarse siempre se realiza con éxito sin necesidad de tirada.","requisito_dote":"4","activa":"4","categoria":""},{"id":6,"nombre":"Procesar - Picaresca I","descripcion":"Puedes identificar el objeto no ocultado de más valor portado por una criatura con un simple vistazo.","requisito_dote":"","activa":"11","categoria":""},{"id":7,"nombre":"Procesar - Picaresca II","descripcion":"Puedes tirar por Juego de manos para robar un objeto portado pero no equipado de un objetivo, incluso en combate. Si el objeto robado tiene alguna utilidad activa con coste de una acción o inferior, puedes utilizarlo como parte de esta acción. Si el objetivo consiente, no es necesario realizar ninguna tirada de Juego de manos para sustraer el objeto de su inventario.","requisito_dote":"6","activa":"11","categoria":""},{"id":8,"nombre":"Procesar - Picaresca III","descripcion":"Utilizar Juego de manos para sustraer un objeto de un objetivo pasa a ser una acción mental. Tus dedos se mueven más rápidos que tu mente.","requisito_dote":"7","activa":"11","categoria":""},{"id":9,"nombre":"Picapica","descripcion":"Puedes realizar un ataque cuerpo a cuerpo para lanzar arena del suelo (o que se haya quedado atrapada en tus bolsillos o zapatos) a la cara de un rival, causando el estado cegado hasta el final de su turno. Una vez por combate por objetivo, puedes utilizar Picapica como parte de otro ataque cuerpo a cuerpo contra este objetivo.","requisito_dote":"","activa":"","categoria":""},{"id":10,"nombre":"Piesplanos","descripcion":"Como parte de tu tirada de iniciativa al entrar en combate, puedes moverte una distancia igual o menor que tu velocidad de movimiento antes de entrar en el orden de turnos.","requisito_dote":"","activa":"","categoria":""},{"id":11,"nombre":"Trampero trampista","descripcion":"Cualquier trampa que comiences a desplegar cuesta un tercio de las acciones usuales. Mínimo 1 acción.","requisito_dote":"","activa":"","categoria":""},{"id":12,"nombre":"Fallo a favor","descripcion":"Cuando eres afectado por un movimiento forzado, puedes utilizar una reacción para moverte en la misma dirección en la que eres arrastrado una distancia igual o inferior a tu velocidad de movimiento. Además, como parte de esta reacción, puedes incorporarte.","requisito_dote":"","activa":"","categoria":""},{"id":13,"nombre":"Rastrillad el rastro","descripcion":"Como parte de tu acción de movimiento, puedes arrojar trampas con un coste base de una acción (como rodamientos o abrojos) a lo largo de todo tu desplazamiento, sin coste adicional. Además, puedes utilizar esta habilidad con obstáculos del entorno o chatarra de tu inventario (a discreción del Maestro) para causar terreno dificultoso a tu paso.","requisito_dote":"","activa":"","categoria":""}]},{"nombre":"Acechador Letal","descripcion":"Mortíferos artistas de la emboscada y las puñaladitas traperas traviesas. Usan todo tipo de artilugios para acabar con sus mentecatas víctimas.","dotes":[{"id":14,"nombre":"Procesar - Analizar enemigo I","descripcion":"Puedes usar tu habilidad de procesar para analizar a un objetivo. Elige entre: HP actual (Sabes si está a más de la mitad o menos), Nivel (Sabes si tiene más que tú o menos), o 1 estado negativo.","requisito_dote":"","activa":"11","categoria":""},{"id":15,"nombre":"Procesar - Analizar enemigo II","descripcion":"Puedes elegir 2 opciones en vez de una al analizar.","requisito_dote":"14","activa":"11","categoria":""},{"id":16,"nombre":"Procesar - Analizar enemigo III","descripcion":"Aprendes más información al analizar. HP: 1/4, 1/2, 3/4 o full hp. Nivel: Sabes en qué tier está, es decir de 5 en 5 niveles. Estados: todos los estados negativos.","requisito_dote":"15","activa":"11","categoria":""},{"id":17,"nombre":"Procesar - Analizar enemigo IV","descripcion":"Consigues ventaja 2 contra ese objetivo. Puedes compartir esa información para que todos obtengan ventaja.","requisito_dote":"16","activa":"11","categoria":""},{"id":18,"nombre":"Procesar - Analizar enemigo V","descripcion":"Obtienes información precisa del objetivo analizado.","requisito_dote":"17","activa":"11","categoria":""},{"id":19,"nombre":"Apuntar - Combate en las sombras I","descripcion":"Al Apuntar estando en sigilo se reduce en 2 el rango de crítico del siguiente ataque.","requisito_dote":"","activa":"7","categoria":""},{"id":20,"nombre":"Apuntar - Combate en las sombras II","descripcion":"Al apuntar estando en sigilo puedes atacar con ventaja.","requisito_dote":"19","activa":"7","categoria":""},{"id":21,"nombre":"Apuntar - Combate en las sombras III","descripcion":"Apuntar estando en sigilo reduce en 2 más el rango de crítico.","requisito_dote":"20","activa":"7","categoria":""},{"id":22,"nombre":"Apuntar - Atacar al punto débil","descripcion":"Al apuntar a un objetivo estando en sigilo puedes apuntar a partes expuestas de su cuerpo. Duplicas tu Deadeye en ese objetivo.","requisito_dote":"","activa":"7","categoria":"Tier 2"},{"id":23,"nombre":"Apuntar - Precisión mortal","descripcion":"Reduces en 2 el rango de crítico a un objetivo apuntado.","requisito_dote":"","activa":"7","categoria":"Tier 2"},{"id":24,"nombre":"Emboscada","descripcion":"Tu filosofía es quien ataca primero ataca dos veces. Tienes ventaja 1 en atacar si atacas por sorpresa.","requisito_dote":"","activa":"","categoria":""},{"id":25,"nombre":"Manto de Niebla","descripcion":"Eres tan silencioso que los enemigos no saben de dónde les vienen los golpes. Puedes mantener el sigilo después de un ataque.","requisito_dote":"","activa":"","categoria":""},{"id":26,"nombre":"Velocidad de reacción","descripcion":"Tu Agilidad se suma a la iniciativa.","requisito_dote":"","activa":"","categoria":""},{"id":27,"nombre":"Maestro de la planificación I","descripcion":"Si has estudiado la zona del combate antes de que empiece tienes ventaja en todas las tiradas de investigación para encontrar enemigos escondidos y para esconderse.","requisito_dote":"","activa":"","categoria":""},{"id":28,"nombre":"Maestro de la planificación II","descripcion":"Puedes compartir esa información con tantas personas como tu nivel y compartir esa ventaja.","requisito_dote":"27","activa":"","categoria":""},{"id":29,"nombre":"Esconderse sin gastar acción I","descripcion":"Esconderte y moverte la mitad de tu movimiento.","requisito_dote":"","activa":"","categoria":""},{"id":30,"nombre":"Esconderse sin gastar acción II","descripcion":"Esconderte con ventaja.","requisito_dote":"29","activa":"","categoria":""},{"id":31,"nombre":"Esconderse sin gastar acción III","descripcion":"Esconderte con ventaja, moverte y atacar.","requisito_dote":"30","activa":"","categoria":""}]},{"nombre":"Gentilhombre","descripcion":"Gallardos guerreros especialistas del combate montado, sacan el máximo provecho de la fuerza de sus monturas para propiciar golpes devastadores.","dotes":[{"id":1,"nombre":"Instruir - Lección Humillante","descripcion":"Tiene el efecto adverso al homólogo de la habilidad. Sueltas una serie de improperios y críticas que desmoralizan al adversario. Debe hacer una tirada de salvación de mente, si falla, puedes comandarle que suelte el arma, se eche al suelo o que salga despavorido, adquiriendo el estado de Terror.","requisito_dote":"","activa":"12","categoria":""},{"id":2,"nombre":"Carga - Justa","descripcion":"Al realizar una acción de carga, añades el daño de la distancia recorrida hasta tu oponente.","requisito_dote":"","activa":"1","categoria":""},{"id":3,"nombre":"Avasallar","descripcion":"Si el objetivo está asustado, tienes ventaja 1 en las tiradas al dar de ataque y en resistencia.","requisito_dote":"","activa":"","categoria":""},{"id":4,"nombre":"Gallardía I","descripcion":"Si aciertas una acción de ataque, sumas 1 de DL a los siguientes ataques hasta el siguiente turno.","requisito_dote":"","activa":"","categoria":""},{"id":5,"nombre":"Gallardía II","descripcion":"Si fallas una acción de ataque, sumas 1 de Resistencia hasta tu siguiente turno.","requisito_dote":"","activa":"","categoria":""},{"id":6,"nombre":"Crueldad","descripcion":"Si el objetivo está asustado, estás montado o en superioridad numérica, impones desventaja 1 al dar al enemigo o enemigos que puedas ver. Para ello deben de verte los enemigos también.","requisito_dote":"","activa":"","categoria":""},{"id":7,"nombre":"Hidalgo","descripcion":"Si vas montado, puedes aumentar tu movimiento en 1. La montura solo necesita descansar la mitad del tiempo, solo necesita comer y beber la mitad de las cantidades normales y puede ayudarte en el combate. Además su capacidad de carga se duplica.","requisito_dote":"","activa":"","categoria":""},{"id":8,"nombre":"Honorable","descripcion":"Inspiras a los aliados cercanos a 3x3 casillas con un grito de orgullo y valor. Si vas montado y tus aliados también, vuestro movimiento aumenta en 2, si vais a pie aumenta en 1.","requisito_dote":"","activa":"","categoria":""}]},{"nombre":"Ungah Ungah","descripcion":"Guerreros primitivos que canalizan su ira y furia primal en combate, convirtiéndose en máquinas de destrucción imparables.","dotes":[{"id":1,"nombre":"Adrenalina - Furia Primal","descripcion":"Adrenalina también hace que tu resistencia se convierta en daño, pero la resistencia que tuvieras la pierdes de igual manera, hasta que canceles el estado.","requisito_dote":"","activa":"3","categoria":""},{"id":2,"nombre":"Carga - Grappling","descripcion":"Al cargar también aplicas el estado Sometido a una criatura grande o inferior. En ese estado no os podéis mover pero puedes derribarla al suelo o incluso intentar dejarla Inconsciente con una tirada.","requisito_dote":"","activa":"1","categoria":""},{"id":3,"nombre":"Berserker I","descripcion":"Atacas con ventaja 1 pero tienes desventaja 2 al esquivar.","requisito_dote":"","activa":"","categoria":""},{"id":4,"nombre":"Berserker II","descripcion":"Atacas con ventaja 2 ahora.","requisito_dote":"3","activa":"","categoria":""},{"id":5,"nombre":"Berserker III","descripcion":"Tienes una acción de ataque extra.","requisito_dote":"4","activa":"","categoria":""},{"id":6,"nombre":"Berserker IV","descripcion":"Atacas con ventaja 3 y sufres desventaja 3 al esquivar.","requisito_dote":"5","activa":"","categoria":""},{"id":7,"nombre":"Furia primal I","descripcion":"Aumentas en 1 por tier de Ungha Ungha tu resistencia.","requisito_dote":"","activa":"","categoria":""},{"id":8,"nombre":"Furia primal II","descripcion":"Si recibes daño físico, recibes la mitad de este.","requisito_dote":"7","activa":"","categoria":""},{"id":9,"nombre":"Furia primal III","descripcion":"Si recibes daño elemental, recibes la mitad de este.","requisito_dote":"8","activa":"","categoria":""},{"id":10,"nombre":"Odio profundo","descripcion":"Consumiendo 3 acciones y en estado Berserker o de Furia primal, un torrente de ira te invade el cuerpo, haciendo hervir tu sangre y acelerándote. Eliges un área de la que tú eres su centro y en un cono de 45° golpeas a todos los enemigos que hayan sido cogidos por tu área. Los ataques que aciertes puedes volver a tirarlos en forma de nuevos ataques.","requisito_dote":"","activa":"","categoria":""}]},{"nombre":"Depredador","descripcion":"Acecha a sus víctimas y una vez que las ha localizado jamás escapan de su visión letal. Mortífero en el combate a distancia.","dotes":[{"id":1,"nombre":"Parry - Kitear/Poquear","descripcion":"Como parte de la reacción puedes desplazarte tu movimiento.","requisito_dote":"","activa":"8","categoria":""},{"id":2,"nombre":"Adrenalina - Strafing I","descripcion":"Disparar a la carrera. Puedes atacar en tu acción de movimiento.","requisito_dote":"","activa":"3","categoria":""},{"id":3,"nombre":"Adrenalina - Strafing II","descripcion":"Atacas el doble de veces.","requisito_dote":"2","activa":"3","categoria":""},{"id":4,"nombre":"Overwatch I","descripcion":"Cuando alguien use una acción no mental y puedas verle, puedes atacarle usando tu Reacción. El rango es un ataque en cono en frente tuyo.","requisito_dote":"","activa":"","categoria":""},{"id":5,"nombre":"Overwatch II","descripcion":"Si alguien ataca a un aliado que no seas tú, le atacas con ventaja 1.","requisito_dote":"4","activa":"","categoria":""},{"id":6,"nombre":"Overwatch III","descripcion":"Aunque no veas al atacante, puedes atacarle en un radio de 360°.","requisito_dote":"5","activa":"","categoria":""},{"id":7,"nombre":"Overwatch IV","descripcion":"Tienes ventaja 3 al atacar al atacante. Si impactas le aturdes.","requisito_dote":"6","activa":"","categoria":""},{"id":8,"nombre":"Disparo ralentizador I","descripcion":"Al realizar una acción de ataque, una vez por turno, si impactas, reduces a la mitad el movimiento de un enemigo.","requisito_dote":"","activa":"","categoria":""},{"id":9,"nombre":"Disparo ralentizador II","descripcion":"Puedes realizar dicho disparo una vez por turno por objetivo.","requisito_dote":"8","activa":"","categoria":""},{"id":10,"nombre":"Disparo múltiple","descripcion":"Al realizar una acción de ataque, una vez por turno, disparas hasta un máximo de 4 proyectiles con una desventaja proporcional por cada proyectil por encima de 1. Máx desventaja 3.","requisito_dote":"","activa":"","categoria":""},{"id":11,"nombre":"Lluvia de flechas","descripcion":"Its raining man! Gastas un mínimo de 3 acciones para preparar una gran salva de proyectiles; debes indicar un radio de 3x3 donde disparar. Realizando 9 disparos, 1 por casilla con desventaja 1.","requisito_dote":"","activa":"","categoria":""},{"id":12,"nombre":"Aspiradora de flechas I","descripcion":"Puedes atrapar flechas enemigas.","requisito_dote":"","activa":"","categoria":""},{"id":13,"nombre":"Aspiradora de flechas II","descripcion":"Hacerlo en área.","requisito_dote":"12","activa":"","categoria":""}]}]'),bg={estiloMarcial:xg},yg=[{id:1,nombre:"Carga",descripcion:"Ataque a distancia, gastas 2 acciones en correr + Ataque",atributo:"Cuerpo",esMental:!1},{id:2,nombre:"Tensión",descripcion:"(Reacción) +3 a Resistencia",atributo:"Cuerpo",esMental:!1},{id:3,nombre:"Adrenalina",descripcion:"(Mental) +1 Cuerpo hasta próximo turno, una vez por combate.",atributo:"Cuerpo",esMental:!0},{id:4,nombre:"Interceptar",descripcion:"(Reacción) A una criatura adyacente puedes recibir el daño de tu compañero pusilánime.",atributo:"Cuerpo",esMental:!1},{id:5,nombre:"Heal",descripcion:"(Mental) Te curas 12HP",atributo:"Cuerpo",esMental:!0},{id:6,nombre:"Ataque pesado",descripcion:"Esta activa no se puede usar con un arma de categoria Ligera. El personaje usa dos acciones para realizar un ataque pesado, duplicando el daño normal del ataque. En el caso de que el arma usada sea de categoria Pesada, se usaran 3 acciones en vez de dos y el daño se triplicará.",atributo:"Cuerpo",esMental:!1},{id:7,nombre:"Apuntar",descripcion:"(Mental) 2 Acciones sumar Deadeye ToHit (Concentración)",atributo:"Agilidad",esMental:!0},{id:8,nombre:"Parry",descripcion:"(Reacción) Suma tu nivel a tu Esquiva contra ese ataque específico.",atributo:"Agilidad",esMental:!1},{id:9,nombre:"Ataque de oportunidad",descripcion:"(Reacción) Si alguien entra o sale en tu rango de ataque le puedes atacar a cuerpo a cuerpo",atributo:"Agilidad",esMental:!1},{id:10,nombre:"Contraataque",descripcion:"(Reacción) Puedes atacar si te atacan",atributo:"Agilidad",esMental:!1},{id:11,nombre:"Procesar",descripcion:"Permite realizar acciones mentales que de normal costarían 1 accion son gratuitas.",atributo:"Mente",esMental:!0},{id:12,nombre:"Instruir",descripcion:"Gastas 1 accion para darle ventaja 1 a un aliado.",atributo:"Mente",esMental:!0}],Mg={activas:yg},Sg=["value"],Eg={key:0,style:{"margin-top":"8px"}},Tg={key:0,class:"space-y-8"},Ag={class:"bg-blue-50 border-2 border-blue-200 rounded-lg p-6"},wg={class:"text-xl font-bold text-blue-700 mb-3"},Cg={class:"text-blue-600 leading-relaxed"},Rg={class:"bg-blue-50 border-2 border-blue-200 rounded-lg p-6"},Pg={class:"text-lg font-semibold text-blue-700 mb-4"},Dg={class:"text-sm text-blue-600 mb-6"},Ig={class:"space-y-6"},Lg={class:"text-md font-semibold text-blue-700 uppercase tracking-wide border-b border-blue-300 pb-2"},Ug={class:"space-y-3"},Ng={key:0,class:"flex items-start mb-2"},Fg={class:"text-xs text-blue-500 italic"},Og=["onClick","disabled"],Bg={class:"flex items-start gap-3"},zg={key:0,class:"text-blue-500 text-xs"},Hg={class:"flex-1"},Vg={class:"font-semibold mb-1 flex items-center gap-2"},kg={key:0,class:"text-xs px-2 py-0.5 bg-blue-600 text-white rounded-full"},Gg={__name:"estilo_marcial",setup(n){const{characterData:e,loadCharacterData:t}=_r(),i=zt(""),s=zt([]),r=bg.estiloMarcial,a=Mg.activas;$t(()=>{const p=new Map;return a.forEach(g=>{p.set(g.id.toString(),g)}),p});const o=zt([]);ji(()=>{t(),i.value=e.value.estilo_marcial||"",s.value=e.value.estilo_marcial_dotes||[]}),St(i,p=>{e.value.estilo_marcial=p}),St(s,p=>{e.value.estilo_marcial_dotes=[...p]},{deep:!0});const l=$t(()=>{const p=r.find(T=>T.nombre===i.value);if(!p)return null;const g=p.dotes.filter(T=>T.categoria),x=p.dotes.filter(T=>!T.categoria),m=new Map;g.forEach(T=>{m.has(T.categoria)||m.set(T.categoria,[]),m.get(T.categoria).push(T)});const h=[];return x.length>0&&h.push({categoria:"Dotes Generales",dotes:x.map(T=>({id:`${p.nombre}_${T.id}`,nombre:T.nombre,descripcion:T.descripcion,requiere:T.requisito_dote?`${p.nombre}_${T.requisito_dote}`:null,activaId:T.activa}))}),m.forEach((T,w)=>{h.push({categoria:w,dotes:T.map(M=>({id:`${p.nombre}_${M.id}`,nombre:M.nombre,descripcion:M.descripcion,requiere:M.requisito_dote?`${p.nombre}_${M.requisito_dote}`:null,activaId:M.activa}))})}),{nombre:p.nombre,descripcion:p.descripcion,numDotes:3,gruposDotes:h}});function c(p){const g=s.value.indexOf(p.id);g!==-1?(s.value.splice(g,1),f(p)):s.value.length<l.value.numDotes&&s.value.push(p.id)}function d(p){return p.requiere?s.value.includes(p.requiere):!0}function u(p){for(const g of l.value?.gruposDotes||[])for(const x of g.dotes)if(x.id===p)return x.nombre;return p}function f(p){l.value.gruposDotes.forEach(g=>{g.dotes.forEach(x=>{if(x.requiere===p.id){const m=s.value.indexOf(x.id);m!==-1&&(s.value.splice(m,1),f(x))}})})}return St(i,()=>{o.value=[],s.value=[]}),(p,g)=>(Pe(),De(nt,null,[D("div",null,[g[2]||(g[2]=D("label",{class:"block text-sm font-semibold text-blue-700 mb-2"}," Selecciona tu EstiloMarcial ",-1)),xn(D("select",{"onUpdate:modelValue":g[0]||(g[0]=x=>i.value=x),class:"w-full px-4 py-3 bg-blue-50 border-2 border-blue-200 rounded-lg text-blue-900"},[g[1]||(g[1]=D("option",{value:""},"Elige un estiloMarcial...",-1)),(Pe(!0),De(nt,null,Nt(_s(r),x=>(Pe(),De("option",{key:x.nombre,value:x.nombre},Se(x.nombre),9,Sg))),128))],512),[[ic,i.value]]),i.value?(Pe(),De("p",Eg)):vt("",!0)]),l.value?(Pe(),De("div",Tg,[D("div",Ag,[D("h3",wg,Se(l.value.nombre),1),D("p",Cg,Se(l.value.descripcion),1)]),D("div",Rg,[D("h4",Pg," Dotes de Clase (Elige "+Se(l.value.numDotes)+") ",1),D("p",Dg," Seleccionadas: "+Se(s.value.length)+" / "+Se(l.value.numDotes),1),D("div",Ig,[(Pe(!0),De(nt,null,Nt(l.value.gruposDotes,x=>(Pe(),De("div",{key:x.categoria,class:"space-y-4"},[D("h5",Lg,Se(x.categoria),1),D("div",Ug,[(Pe(!0),De(nt,null,Nt(x.dotes,m=>(Pe(),De("div",{key:m.id,class:"ml-0"},[m.requiere?(Pe(),De("div",Ng,[g[3]||(g[3]=D("div",{class:"w-8 border-l-2 border-blue-300 h-4 border-b-2 rounded-bl-lg mr-2"},null,-1)),D("span",Fg,"Requiere: "+Se(u(m.requiere)),1)])):vt("",!0),D("button",{onClick:h=>c(m),disabled:!s.value.includes(m.id)&&s.value.length>=l.value.numDotes||!d(m),class:xt(["w-full text-left p-4 rounded-lg transition-all duration-200 border-2",s.value.includes(m.id)?"bg-blue-500 text-white border-blue-500 shadow-lg":d(m)?"bg-white text-blue-700 border-blue-200 hover:border-blue-400 hover:shadow-md":"bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-50",m.requiere?"ml-8":""])},[D("div",Bg,[D("span",{class:xt(["flex items-center justify-center w-5 h-5 rounded border-2 flex-shrink-0 mt-0.5",s.value.includes(m.id)?"bg-white border-white":"bg-transparent border-blue-300"])},[s.value.includes(m.id)?(Pe(),De("span",zg,"✓")):vt("",!0)],2),D("div",Hg,[D("div",Vg,[Mi(Se(m.nombre)+" ",1),m.activaId?(Pe(),De("span",kg,"ACTIVA")):vt("",!0)]),D("p",{class:xt(["text-sm",s.value.includes(m.id)?"text-blue-100":"text-blue-600"])},Se(m.descripcion),3)])])],10,Og)]))),128))])]))),128))])])])):vt("",!0)],64))}};/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const rc="180",Sn={ROTATE:0,DOLLY:1,PAN:2},Un={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},qg=0,ed=1,Wg=2,uh=1,Xg=2,Yn=3,Si=0,Qt=1,bn=2,gi=0,As=1,td=2,nd=3,id=4,jg=5,Bi=100,$g=101,Yg=102,Kg=103,Zg=104,Jg=200,Qg=201,e_=202,t_=203,Yo=204,Ko=205,n_=206,i_=207,s_=208,r_=209,a_=210,o_=211,l_=212,c_=213,d_=214,Zo=0,Jo=1,Qo=2,Rs=3,el=4,tl=5,nl=6,il=7,hh=0,u_=1,h_=2,_i=0,f_=1,p_=2,m_=3,g_=4,__=5,v_=6,x_=7,fh=300,Ps=301,Ds=302,sl=303,rl=304,Ha=306,al=1e3,Hi=1001,ol=1002,En=1003,b_=1004,Ar=1005,Nn=1006,io=1007,Vi=1008,Hn=1009,ph=1010,mh=1011,lr=1012,ac=1013,Gi=1014,Qn=1015,vr=1016,oc=1017,lc=1018,cr=1020,gh=35902,_h=35899,vh=1021,xh=1022,yn=1023,dr=1026,ur=1027,bh=1028,cc=1029,yh=1030,dc=1031,uc=1033,ra=33776,aa=33777,oa=33778,la=33779,ll=35840,cl=35841,dl=35842,ul=35843,hl=36196,fl=37492,pl=37496,ml=37808,gl=37809,_l=37810,vl=37811,xl=37812,bl=37813,yl=37814,Ml=37815,Sl=37816,El=37817,Tl=37818,Al=37819,wl=37820,Cl=37821,Rl=36492,Pl=36494,Dl=36495,Il=36283,Ll=36284,Ul=36285,Nl=36286,y_=3200,M_=3201,Mh=0,S_=1,pi="",un="srgb",Is="srgb-linear",ya="linear",ct="srgb",Ji=7680,sd=519,E_=512,T_=513,A_=514,Sh=515,w_=516,C_=517,R_=518,P_=519,Fl=35044,rd="300 es",Fn=2e3,Ma=2001;class $i{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const s=i[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const Ft=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],ca=Math.PI/180,Ol=180/Math.PI;function vi(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Ft[n&255]+Ft[n>>8&255]+Ft[n>>16&255]+Ft[n>>24&255]+"-"+Ft[e&255]+Ft[e>>8&255]+"-"+Ft[e>>16&15|64]+Ft[e>>24&255]+"-"+Ft[t&63|128]+Ft[t>>8&255]+"-"+Ft[t>>16&255]+Ft[t>>24&255]+Ft[i&255]+Ft[i>>8&255]+Ft[i>>16&255]+Ft[i>>24&255]).toLowerCase()}function Ze(n,e,t){return Math.max(e,Math.min(t,n))}function D_(n,e){return(n%e+e)%e}function so(n,e,t){return(1-t)*n+t*e}function Ln(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function dt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const I_={DEG2RAD:ca};class He{constructor(e=0,t=0){He.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ze(this.x,e.x,t.x),this.y=Ze(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ze(this.x,e,t),this.y=Ze(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ze(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ze(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*i-a*s+e.x,this.y=r*s+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class qi{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,a,o){let l=i[s+0],c=i[s+1],d=i[s+2],u=i[s+3];const f=r[a+0],p=r[a+1],g=r[a+2],x=r[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=d,e[t+3]=u;return}if(o===1){e[t+0]=f,e[t+1]=p,e[t+2]=g,e[t+3]=x;return}if(u!==x||l!==f||c!==p||d!==g){let m=1-o;const h=l*f+c*p+d*g+u*x,T=h>=0?1:-1,w=1-h*h;if(w>Number.EPSILON){const C=Math.sqrt(w),R=Math.atan2(C,h*T);m=Math.sin(m*R)/C,o=Math.sin(o*R)/C}const M=o*T;if(l=l*m+f*M,c=c*m+p*M,d=d*m+g*M,u=u*m+x*M,m===1-o){const C=1/Math.sqrt(l*l+c*c+d*d+u*u);l*=C,c*=C,d*=C,u*=C}}e[t]=l,e[t+1]=c,e[t+2]=d,e[t+3]=u}static multiplyQuaternionsFlat(e,t,i,s,r,a){const o=i[s],l=i[s+1],c=i[s+2],d=i[s+3],u=r[a],f=r[a+1],p=r[a+2],g=r[a+3];return e[t]=o*g+d*u+l*p-c*f,e[t+1]=l*g+d*f+c*u-o*p,e[t+2]=c*g+d*p+o*f-l*u,e[t+3]=d*g-o*u-l*f-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),d=o(s/2),u=o(r/2),f=l(i/2),p=l(s/2),g=l(r/2);switch(a){case"XYZ":this._x=f*d*u+c*p*g,this._y=c*p*u-f*d*g,this._z=c*d*g+f*p*u,this._w=c*d*u-f*p*g;break;case"YXZ":this._x=f*d*u+c*p*g,this._y=c*p*u-f*d*g,this._z=c*d*g-f*p*u,this._w=c*d*u+f*p*g;break;case"ZXY":this._x=f*d*u-c*p*g,this._y=c*p*u+f*d*g,this._z=c*d*g+f*p*u,this._w=c*d*u-f*p*g;break;case"ZYX":this._x=f*d*u-c*p*g,this._y=c*p*u+f*d*g,this._z=c*d*g-f*p*u,this._w=c*d*u+f*p*g;break;case"YZX":this._x=f*d*u+c*p*g,this._y=c*p*u+f*d*g,this._z=c*d*g-f*p*u,this._w=c*d*u-f*p*g;break;case"XZY":this._x=f*d*u-c*p*g,this._y=c*p*u-f*d*g,this._z=c*d*g+f*p*u,this._w=c*d*u+f*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],d=t[6],u=t[10],f=i+o+u;if(f>0){const p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(d-l)*p,this._y=(r-c)*p,this._z=(a-s)*p}else if(i>o&&i>u){const p=2*Math.sqrt(1+i-o-u);this._w=(d-l)/p,this._x=.25*p,this._y=(s+a)/p,this._z=(r+c)/p}else if(o>u){const p=2*Math.sqrt(1+o-i-u);this._w=(r-c)/p,this._x=(s+a)/p,this._y=.25*p,this._z=(l+d)/p}else{const p=2*Math.sqrt(1+u-i-o);this._w=(a-s)/p,this._x=(r+c)/p,this._y=(l+d)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ze(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,d=t._w;return this._x=i*d+a*o+s*c-r*l,this._y=s*d+a*l+r*o-i*c,this._z=r*d+a*c+i*l-s*o,this._w=a*d-i*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,s=this._y,r=this._z,a=this._w;let o=a*e._w+i*e._x+s*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=i,this._y=s,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const p=1-t;return this._w=p*a+t*this._w,this._x=p*i+t*this._x,this._y=p*s+t*this._y,this._z=p*r+t*this._z,this.normalize(),this}const c=Math.sqrt(l),d=Math.atan2(c,o),u=Math.sin((1-t)*d)/c,f=Math.sin(t*d)/c;return this._w=a*u+this._w*f,this._x=i*u+this._x*f,this._y=s*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class z{constructor(e=0,t=0,i=0){z.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(ad.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(ad.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*i),d=2*(o*t-r*s),u=2*(r*i-a*t);return this.x=t+l*c+a*u-o*d,this.y=i+l*d+o*c-r*u,this.z=s+l*u+r*d-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ze(this.x,e.x,t.x),this.y=Ze(this.y,e.y,t.y),this.z=Ze(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ze(this.x,e,t),this.y=Ze(this.y,e,t),this.z=Ze(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ze(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-i*l,this.z=i*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return ro.copy(this).projectOnVector(e),this.sub(ro)}reflect(e){return this.sub(ro.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ze(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ro=new z,ad=new qi;class Ye{constructor(e,t,i,s,r,a,o,l,c){Ye.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,l,c)}set(e,t,i,s,r,a,o,l,c){const d=this.elements;return d[0]=e,d[1]=s,d[2]=o,d[3]=t,d[4]=r,d[5]=l,d[6]=i,d[7]=a,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],d=i[4],u=i[7],f=i[2],p=i[5],g=i[8],x=s[0],m=s[3],h=s[6],T=s[1],w=s[4],M=s[7],C=s[2],R=s[5],P=s[8];return r[0]=a*x+o*T+l*C,r[3]=a*m+o*w+l*R,r[6]=a*h+o*M+l*P,r[1]=c*x+d*T+u*C,r[4]=c*m+d*w+u*R,r[7]=c*h+d*M+u*P,r[2]=f*x+p*T+g*C,r[5]=f*m+p*w+g*R,r[8]=f*h+p*M+g*P,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8];return t*a*d-t*o*c-i*r*d+i*o*l+s*r*c-s*a*l}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8],u=d*a-o*c,f=o*l-d*r,p=c*r-a*l,g=t*u+i*f+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/g;return e[0]=u*x,e[1]=(s*c-d*i)*x,e[2]=(o*i-s*a)*x,e[3]=f*x,e[4]=(d*t-s*l)*x,e[5]=(s*r-o*t)*x,e[6]=p*x,e[7]=(i*l-c*t)*x,e[8]=(a*t-i*r)*x,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(ao.makeScale(e,t)),this}rotate(e){return this.premultiply(ao.makeRotation(-e)),this}translate(e,t){return this.premultiply(ao.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const ao=new Ye;function Eh(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Sa(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function L_(){const n=Sa("canvas");return n.style.display="block",n}const od={};function hr(n){n in od||(od[n]=!0,console.warn(n))}function U_(n,e,t){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}const ld=new Ye().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),cd=new Ye().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function N_(){const n={enabled:!0,workingColorSpace:Is,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===ct&&(s.r=ei(s.r),s.g=ei(s.g),s.b=ei(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ct&&(s.r=ws(s.r),s.g=ws(s.g),s.b=ws(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===pi?ya:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return hr("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return hr("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Is]:{primaries:e,whitePoint:i,transfer:ya,toXYZ:ld,fromXYZ:cd,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:un},outputColorSpaceConfig:{drawingBufferColorSpace:un}},[un]:{primaries:e,whitePoint:i,transfer:ct,toXYZ:ld,fromXYZ:cd,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:un}}}),n}const tt=N_();function ei(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function ws(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Qi;class F_{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Qi===void 0&&(Qi=Sa("canvas")),Qi.width=e.width,Qi.height=e.height;const s=Qi.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),i=Qi}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Sa("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=ei(r[a]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(ei(t[i]/255)*255):t[i]=ei(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let O_=0;class hc{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:O_++}),this.uuid=vi(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(oo(s[a].image)):r.push(oo(s[a]))}else r=oo(s);i.url=r}return t||(e.images[this.uuid]=i),i}}function oo(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?F_.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let B_=0;const lo=new z;class Yt extends $i{constructor(e=Yt.DEFAULT_IMAGE,t=Yt.DEFAULT_MAPPING,i=Hi,s=Hi,r=Nn,a=Vi,o=yn,l=Hn,c=Yt.DEFAULT_ANISOTROPY,d=pi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:B_++}),this.uuid=vi(),this.name="",this.source=new hc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new He(0,0),this.repeat=new He(1,1),this.center=new He(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ye,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(lo).x}get height(){return this.source.getSize(lo).y}get depth(){return this.source.getSize(lo).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==fh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case al:e.x=e.x-Math.floor(e.x);break;case Hi:e.x=e.x<0?0:1;break;case ol:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case al:e.y=e.y-Math.floor(e.y);break;case Hi:e.y=e.y<0?0:1;break;case ol:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Yt.DEFAULT_IMAGE=null;Yt.DEFAULT_MAPPING=fh;Yt.DEFAULT_ANISOTROPY=1;class Tt{constructor(e=0,t=0,i=0,s=1){Tt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*i+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r;const l=e.elements,c=l[0],d=l[4],u=l[8],f=l[1],p=l[5],g=l[9],x=l[2],m=l[6],h=l[10];if(Math.abs(d-f)<.01&&Math.abs(u-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(d+f)<.1&&Math.abs(u+x)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+h-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const w=(c+1)/2,M=(p+1)/2,C=(h+1)/2,R=(d+f)/4,P=(u+x)/4,F=(g+m)/4;return w>M&&w>C?w<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(w),s=R/i,r=P/i):M>C?M<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(M),i=R/s,r=F/s):C<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(C),i=P/r,s=F/r),this.set(i,s,r,t),this}let T=Math.sqrt((m-g)*(m-g)+(u-x)*(u-x)+(f-d)*(f-d));return Math.abs(T)<.001&&(T=1),this.x=(m-g)/T,this.y=(u-x)/T,this.z=(f-d)/T,this.w=Math.acos((c+p+h-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ze(this.x,e.x,t.x),this.y=Ze(this.y,e.y,t.y),this.z=Ze(this.z,e.z,t.z),this.w=Ze(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ze(this.x,e,t),this.y=Ze(this.y,e,t),this.z=Ze(this.z,e,t),this.w=Ze(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ze(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class z_ extends $i{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Nn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new Tt(0,0,e,t),this.scissorTest=!1,this.viewport=new Tt(0,0,e,t);const s={width:e,height:t,depth:i.depth},r=new Yt(s);this.textures=[];const a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){const t={minFilter:Nn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new hc(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Wi extends z_{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Th extends Yt{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=En,this.minFilter=En,this.wrapR=Hi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class H_ extends Yt{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=En,this.minFilter=En,this.wrapR=Hi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class xr{constructor(e=new z(1/0,1/0,1/0),t=new z(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(gn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(gn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=gn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,gn):gn.fromBufferAttribute(r,a),gn.applyMatrix4(e.matrixWorld),this.expandByPoint(gn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),wr.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),wr.copy(i.boundingBox)),wr.applyMatrix4(e.matrixWorld),this.union(wr)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,gn),gn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Hs),Cr.subVectors(this.max,Hs),es.subVectors(e.a,Hs),ts.subVectors(e.b,Hs),ns.subVectors(e.c,Hs),si.subVectors(ts,es),ri.subVectors(ns,ts),Ri.subVectors(es,ns);let t=[0,-si.z,si.y,0,-ri.z,ri.y,0,-Ri.z,Ri.y,si.z,0,-si.x,ri.z,0,-ri.x,Ri.z,0,-Ri.x,-si.y,si.x,0,-ri.y,ri.x,0,-Ri.y,Ri.x,0];return!co(t,es,ts,ns,Cr)||(t=[1,0,0,0,1,0,0,0,1],!co(t,es,ts,ns,Cr))?!1:(Rr.crossVectors(si,ri),t=[Rr.x,Rr.y,Rr.z],co(t,es,ts,ns,Cr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,gn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(gn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(qn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),qn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),qn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),qn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),qn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),qn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),qn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),qn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(qn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const qn=[new z,new z,new z,new z,new z,new z,new z,new z],gn=new z,wr=new xr,es=new z,ts=new z,ns=new z,si=new z,ri=new z,Ri=new z,Hs=new z,Cr=new z,Rr=new z,Pi=new z;function co(n,e,t,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){Pi.fromArray(n,r);const o=s.x*Math.abs(Pi.x)+s.y*Math.abs(Pi.y)+s.z*Math.abs(Pi.z),l=e.dot(Pi),c=t.dot(Pi),d=i.dot(Pi);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>o)return!1}return!0}const V_=new xr,Vs=new z,uo=new z;class Va{constructor(e=new z,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):V_.setFromPoints(e).getCenter(i);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Vs.subVectors(e,this.center);const t=Vs.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(Vs,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(uo.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Vs.copy(e.center).add(uo)),this.expandByPoint(Vs.copy(e.center).sub(uo))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const Wn=new z,ho=new z,Pr=new z,ai=new z,fo=new z,Dr=new z,po=new z;class ka{constructor(e=new z,t=new z(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Wn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Wn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Wn.copy(this.origin).addScaledVector(this.direction,t),Wn.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){ho.copy(e).add(t).multiplyScalar(.5),Pr.copy(t).sub(e).normalize(),ai.copy(this.origin).sub(ho);const r=e.distanceTo(t)*.5,a=-this.direction.dot(Pr),o=ai.dot(this.direction),l=-ai.dot(Pr),c=ai.lengthSq(),d=Math.abs(1-a*a);let u,f,p,g;if(d>0)if(u=a*l-o,f=a*o-l,g=r*d,u>=0)if(f>=-g)if(f<=g){const x=1/d;u*=x,f*=x,p=u*(u+a*f+2*o)+f*(a*u+f+2*l)+c}else f=r,u=Math.max(0,-(a*f+o)),p=-u*u+f*(f+2*l)+c;else f=-r,u=Math.max(0,-(a*f+o)),p=-u*u+f*(f+2*l)+c;else f<=-g?(u=Math.max(0,-(-a*r+o)),f=u>0?-r:Math.min(Math.max(-r,-l),r),p=-u*u+f*(f+2*l)+c):f<=g?(u=0,f=Math.min(Math.max(-r,-l),r),p=f*(f+2*l)+c):(u=Math.max(0,-(a*r+o)),f=u>0?r:Math.min(Math.max(-r,-l),r),p=-u*u+f*(f+2*l)+c);else f=a>0?-r:r,u=Math.max(0,-(a*f+o)),p=-u*u+f*(f+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(ho).addScaledVector(Pr,f),p}intersectSphere(e,t){Wn.subVectors(e.center,this.origin);const i=Wn.dot(this.direction),s=Wn.dot(Wn)-i*i,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,a,o,l;const c=1/this.direction.x,d=1/this.direction.y,u=1/this.direction.z,f=this.origin;return c>=0?(i=(e.min.x-f.x)*c,s=(e.max.x-f.x)*c):(i=(e.max.x-f.x)*c,s=(e.min.x-f.x)*c),d>=0?(r=(e.min.y-f.y)*d,a=(e.max.y-f.y)*d):(r=(e.max.y-f.y)*d,a=(e.min.y-f.y)*d),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(e.min.z-f.z)*u,l=(e.max.z-f.z)*u):(o=(e.max.z-f.z)*u,l=(e.min.z-f.z)*u),i>l||o>s)||((o>i||i!==i)&&(i=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,Wn)!==null}intersectTriangle(e,t,i,s,r){fo.subVectors(t,e),Dr.subVectors(i,e),po.crossVectors(fo,Dr);let a=this.direction.dot(po),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;ai.subVectors(this.origin,e);const l=o*this.direction.dot(Dr.crossVectors(ai,Dr));if(l<0)return null;const c=o*this.direction.dot(fo.cross(ai));if(c<0||l+c>a)return null;const d=-o*ai.dot(po);return d<0?null:this.at(d/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class bt{constructor(e,t,i,s,r,a,o,l,c,d,u,f,p,g,x,m){bt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,l,c,d,u,f,p,g,x,m)}set(e,t,i,s,r,a,o,l,c,d,u,f,p,g,x,m){const h=this.elements;return h[0]=e,h[4]=t,h[8]=i,h[12]=s,h[1]=r,h[5]=a,h[9]=o,h[13]=l,h[2]=c,h[6]=d,h[10]=u,h[14]=f,h[3]=p,h[7]=g,h[11]=x,h[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new bt().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,s=1/is.setFromMatrixColumn(e,0).length(),r=1/is.setFromMatrixColumn(e,1).length(),a=1/is.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,s=e.y,r=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(s),c=Math.sin(s),d=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const f=a*d,p=a*u,g=o*d,x=o*u;t[0]=l*d,t[4]=-l*u,t[8]=c,t[1]=p+g*c,t[5]=f-x*c,t[9]=-o*l,t[2]=x-f*c,t[6]=g+p*c,t[10]=a*l}else if(e.order==="YXZ"){const f=l*d,p=l*u,g=c*d,x=c*u;t[0]=f+x*o,t[4]=g*o-p,t[8]=a*c,t[1]=a*u,t[5]=a*d,t[9]=-o,t[2]=p*o-g,t[6]=x+f*o,t[10]=a*l}else if(e.order==="ZXY"){const f=l*d,p=l*u,g=c*d,x=c*u;t[0]=f-x*o,t[4]=-a*u,t[8]=g+p*o,t[1]=p+g*o,t[5]=a*d,t[9]=x-f*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const f=a*d,p=a*u,g=o*d,x=o*u;t[0]=l*d,t[4]=g*c-p,t[8]=f*c+x,t[1]=l*u,t[5]=x*c+f,t[9]=p*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const f=a*l,p=a*c,g=o*l,x=o*c;t[0]=l*d,t[4]=x-f*u,t[8]=g*u+p,t[1]=u,t[5]=a*d,t[9]=-o*d,t[2]=-c*d,t[6]=p*u+g,t[10]=f-x*u}else if(e.order==="XZY"){const f=a*l,p=a*c,g=o*l,x=o*c;t[0]=l*d,t[4]=-u,t[8]=c*d,t[1]=f*u+x,t[5]=a*d,t[9]=p*u-g,t[2]=g*u-p,t[6]=o*d,t[10]=x*u+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(k_,e,G_)}lookAt(e,t,i){const s=this.elements;return nn.subVectors(e,t),nn.lengthSq()===0&&(nn.z=1),nn.normalize(),oi.crossVectors(i,nn),oi.lengthSq()===0&&(Math.abs(i.z)===1?nn.x+=1e-4:nn.z+=1e-4,nn.normalize(),oi.crossVectors(i,nn)),oi.normalize(),Ir.crossVectors(nn,oi),s[0]=oi.x,s[4]=Ir.x,s[8]=nn.x,s[1]=oi.y,s[5]=Ir.y,s[9]=nn.y,s[2]=oi.z,s[6]=Ir.z,s[10]=nn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],d=i[1],u=i[5],f=i[9],p=i[13],g=i[2],x=i[6],m=i[10],h=i[14],T=i[3],w=i[7],M=i[11],C=i[15],R=s[0],P=s[4],F=s[8],E=s[12],S=s[1],L=s[5],$=s[9],J=s[13],se=s[2],ie=s[6],Q=s[10],ne=s[14],V=s[3],me=s[7],ye=s[11],Le=s[15];return r[0]=a*R+o*S+l*se+c*V,r[4]=a*P+o*L+l*ie+c*me,r[8]=a*F+o*$+l*Q+c*ye,r[12]=a*E+o*J+l*ne+c*Le,r[1]=d*R+u*S+f*se+p*V,r[5]=d*P+u*L+f*ie+p*me,r[9]=d*F+u*$+f*Q+p*ye,r[13]=d*E+u*J+f*ne+p*Le,r[2]=g*R+x*S+m*se+h*V,r[6]=g*P+x*L+m*ie+h*me,r[10]=g*F+x*$+m*Q+h*ye,r[14]=g*E+x*J+m*ne+h*Le,r[3]=T*R+w*S+M*se+C*V,r[7]=T*P+w*L+M*ie+C*me,r[11]=T*F+w*$+M*Q+C*ye,r[15]=T*E+w*J+M*ne+C*Le,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],d=e[2],u=e[6],f=e[10],p=e[14],g=e[3],x=e[7],m=e[11],h=e[15];return g*(+r*l*u-s*c*u-r*o*f+i*c*f+s*o*p-i*l*p)+x*(+t*l*p-t*c*f+r*a*f-s*a*p+s*c*d-r*l*d)+m*(+t*c*u-t*o*p-r*a*u+i*a*p+r*o*d-i*c*d)+h*(-s*o*d-t*l*u+t*o*f+s*a*u-i*a*f+i*l*d)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8],u=e[9],f=e[10],p=e[11],g=e[12],x=e[13],m=e[14],h=e[15],T=u*m*c-x*f*c+x*l*p-o*m*p-u*l*h+o*f*h,w=g*f*c-d*m*c-g*l*p+a*m*p+d*l*h-a*f*h,M=d*x*c-g*u*c+g*o*p-a*x*p-d*o*h+a*u*h,C=g*u*l-d*x*l-g*o*f+a*x*f+d*o*m-a*u*m,R=t*T+i*w+s*M+r*C;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const P=1/R;return e[0]=T*P,e[1]=(x*f*r-u*m*r-x*s*p+i*m*p+u*s*h-i*f*h)*P,e[2]=(o*m*r-x*l*r+x*s*c-i*m*c-o*s*h+i*l*h)*P,e[3]=(u*l*r-o*f*r-u*s*c+i*f*c+o*s*p-i*l*p)*P,e[4]=w*P,e[5]=(d*m*r-g*f*r+g*s*p-t*m*p-d*s*h+t*f*h)*P,e[6]=(g*l*r-a*m*r-g*s*c+t*m*c+a*s*h-t*l*h)*P,e[7]=(a*f*r-d*l*r+d*s*c-t*f*c-a*s*p+t*l*p)*P,e[8]=M*P,e[9]=(g*u*r-d*x*r-g*i*p+t*x*p+d*i*h-t*u*h)*P,e[10]=(a*x*r-g*o*r+g*i*c-t*x*c-a*i*h+t*o*h)*P,e[11]=(d*o*r-a*u*r-d*i*c+t*u*c+a*i*p-t*o*p)*P,e[12]=C*P,e[13]=(d*x*s-g*u*s+g*i*f-t*x*f-d*i*m+t*u*m)*P,e[14]=(g*o*s-a*x*s-g*i*l+t*x*l+a*i*m-t*o*m)*P,e[15]=(a*u*s-d*o*s+d*i*l-t*u*l-a*i*f+t*o*f)*P,this}scale(e){const t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),s=Math.sin(t),r=1-i,a=e.x,o=e.y,l=e.z,c=r*a,d=r*o;return this.set(c*a+i,c*o-s*l,c*l+s*o,0,c*o+s*l,d*o+i,d*l-s*a,0,c*l-s*o,d*l+s*a,r*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,a){return this.set(1,i,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){const s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,d=a+a,u=o+o,f=r*c,p=r*d,g=r*u,x=a*d,m=a*u,h=o*u,T=l*c,w=l*d,M=l*u,C=i.x,R=i.y,P=i.z;return s[0]=(1-(x+h))*C,s[1]=(p+M)*C,s[2]=(g-w)*C,s[3]=0,s[4]=(p-M)*R,s[5]=(1-(f+h))*R,s[6]=(m+T)*R,s[7]=0,s[8]=(g+w)*P,s[9]=(m-T)*P,s[10]=(1-(f+x))*P,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){const s=this.elements;let r=is.set(s[0],s[1],s[2]).length();const a=is.set(s[4],s[5],s[6]).length(),o=is.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],_n.copy(this);const c=1/r,d=1/a,u=1/o;return _n.elements[0]*=c,_n.elements[1]*=c,_n.elements[2]*=c,_n.elements[4]*=d,_n.elements[5]*=d,_n.elements[6]*=d,_n.elements[8]*=u,_n.elements[9]*=u,_n.elements[10]*=u,t.setFromRotationMatrix(_n),i.x=r,i.y=a,i.z=o,this}makePerspective(e,t,i,s,r,a,o=Fn,l=!1){const c=this.elements,d=2*r/(t-e),u=2*r/(i-s),f=(t+e)/(t-e),p=(i+s)/(i-s);let g,x;if(l)g=r/(a-r),x=a*r/(a-r);else if(o===Fn)g=-(a+r)/(a-r),x=-2*a*r/(a-r);else if(o===Ma)g=-a/(a-r),x=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=u,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=x,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,s,r,a,o=Fn,l=!1){const c=this.elements,d=2/(t-e),u=2/(i-s),f=-(t+e)/(t-e),p=-(i+s)/(i-s);let g,x;if(l)g=1/(a-r),x=a/(a-r);else if(o===Fn)g=-2/(a-r),x=-(a+r)/(a-r);else if(o===Ma)g=-1/(a-r),x=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=0,c[12]=f,c[1]=0,c[5]=u,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=g,c[14]=x,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const is=new z,_n=new bt,k_=new z(0,0,0),G_=new z(1,1,1),oi=new z,Ir=new z,nn=new z,dd=new bt,ud=new qi;class Vn{constructor(e=0,t=0,i=0,s=Vn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],d=s[9],u=s[2],f=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(Ze(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ze(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ze(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ze(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Ze(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Ze(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-d,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return dd.makeRotationFromQuaternion(e),this.setFromRotationMatrix(dd,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return ud.setFromEuler(this),this.setFromQuaternion(ud,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Vn.DEFAULT_ORDER="XYZ";class fc{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let q_=0;const hd=new z,ss=new qi,Xn=new bt,Lr=new z,ks=new z,W_=new z,X_=new qi,fd=new z(1,0,0),pd=new z(0,1,0),md=new z(0,0,1),gd={type:"added"},j_={type:"removed"},rs={type:"childadded",child:null},mo={type:"childremoved",child:null};class It extends $i{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:q_++}),this.uuid=vi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=It.DEFAULT_UP.clone();const e=new z,t=new Vn,i=new qi,s=new z(1,1,1);function r(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new bt},normalMatrix:{value:new Ye}}),this.matrix=new bt,this.matrixWorld=new bt,this.matrixAutoUpdate=It.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=It.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new fc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ss.setFromAxisAngle(e,t),this.quaternion.multiply(ss),this}rotateOnWorldAxis(e,t){return ss.setFromAxisAngle(e,t),this.quaternion.premultiply(ss),this}rotateX(e){return this.rotateOnAxis(fd,e)}rotateY(e){return this.rotateOnAxis(pd,e)}rotateZ(e){return this.rotateOnAxis(md,e)}translateOnAxis(e,t){return hd.copy(e).applyQuaternion(this.quaternion),this.position.add(hd.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(fd,e)}translateY(e){return this.translateOnAxis(pd,e)}translateZ(e){return this.translateOnAxis(md,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Xn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Lr.copy(e):Lr.set(e,t,i);const s=this.parent;this.updateWorldMatrix(!0,!1),ks.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Xn.lookAt(ks,Lr,this.up):Xn.lookAt(Lr,ks,this.up),this.quaternion.setFromRotationMatrix(Xn),s&&(Xn.extractRotation(s.matrixWorld),ss.setFromRotationMatrix(Xn),this.quaternion.premultiply(ss.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(gd),rs.child=e,this.dispatchEvent(rs),rs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(j_),mo.child=e,this.dispatchEvent(mo),mo.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Xn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Xn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Xn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(gd),rs.child=e,this.dispatchEvent(rs),rs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ks,e,W_),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ks,X_,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,d=l.length;c<d;c++){const u=l[c];r(e.shapes,u)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),d=a(e.images),u=a(e.shapes),f=a(e.skeletons),p=a(e.animations),g=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),d.length>0&&(i.images=d),u.length>0&&(i.shapes=u),f.length>0&&(i.skeletons=f),p.length>0&&(i.animations=p),g.length>0&&(i.nodes=g)}return i.object=s,i;function a(o){const l=[];for(const c in o){const d=o[c];delete d.metadata,l.push(d)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}}It.DEFAULT_UP=new z(0,1,0);It.DEFAULT_MATRIX_AUTO_UPDATE=!0;It.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const vn=new z,jn=new z,go=new z,$n=new z,as=new z,os=new z,_d=new z,_o=new z,vo=new z,xo=new z,bo=new Tt,yo=new Tt,Mo=new Tt;class fn{constructor(e=new z,t=new z,i=new z){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),vn.subVectors(e,t),s.cross(vn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){vn.subVectors(s,t),jn.subVectors(i,t),go.subVectors(e,t);const a=vn.dot(vn),o=vn.dot(jn),l=vn.dot(go),c=jn.dot(jn),d=jn.dot(go),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;const f=1/u,p=(c*l-o*d)*f,g=(a*d-o*l)*f;return r.set(1-p-g,g,p)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,$n)===null?!1:$n.x>=0&&$n.y>=0&&$n.x+$n.y<=1}static getInterpolation(e,t,i,s,r,a,o,l){return this.getBarycoord(e,t,i,s,$n)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,$n.x),l.addScaledVector(a,$n.y),l.addScaledVector(o,$n.z),l)}static getInterpolatedAttribute(e,t,i,s,r,a){return bo.setScalar(0),yo.setScalar(0),Mo.setScalar(0),bo.fromBufferAttribute(e,t),yo.fromBufferAttribute(e,i),Mo.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(bo,r.x),a.addScaledVector(yo,r.y),a.addScaledVector(Mo,r.z),a}static isFrontFacing(e,t,i,s){return vn.subVectors(i,t),jn.subVectors(e,t),vn.cross(jn).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return vn.subVectors(this.c,this.b),jn.subVectors(this.a,this.b),vn.cross(jn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return fn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return fn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return fn.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return fn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return fn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,s=this.b,r=this.c;let a,o;as.subVectors(s,i),os.subVectors(r,i),_o.subVectors(e,i);const l=as.dot(_o),c=os.dot(_o);if(l<=0&&c<=0)return t.copy(i);vo.subVectors(e,s);const d=as.dot(vo),u=os.dot(vo);if(d>=0&&u<=d)return t.copy(s);const f=l*u-d*c;if(f<=0&&l>=0&&d<=0)return a=l/(l-d),t.copy(i).addScaledVector(as,a);xo.subVectors(e,r);const p=as.dot(xo),g=os.dot(xo);if(g>=0&&p<=g)return t.copy(r);const x=p*c-l*g;if(x<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(i).addScaledVector(os,o);const m=d*g-p*u;if(m<=0&&u-d>=0&&p-g>=0)return _d.subVectors(r,s),o=(u-d)/(u-d+(p-g)),t.copy(s).addScaledVector(_d,o);const h=1/(m+x+f);return a=x*h,o=f*h,t.copy(i).addScaledVector(as,a).addScaledVector(os,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Ah={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},li={h:0,s:0,l:0},Ur={h:0,s:0,l:0};function So(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Qe{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=un){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,tt.colorSpaceToWorking(this,t),this}setRGB(e,t,i,s=tt.workingColorSpace){return this.r=e,this.g=t,this.b=i,tt.colorSpaceToWorking(this,s),this}setHSL(e,t,i,s=tt.workingColorSpace){if(e=D_(e,1),t=Ze(t,0,1),i=Ze(i,0,1),t===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+t):i+t-i*t,a=2*i-r;this.r=So(a,r,e+1/3),this.g=So(a,r,e),this.b=So(a,r,e-1/3)}return tt.colorSpaceToWorking(this,s),this}setStyle(e,t=un){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=un){const i=Ah[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ei(e.r),this.g=ei(e.g),this.b=ei(e.b),this}copyLinearToSRGB(e){return this.r=ws(e.r),this.g=ws(e.g),this.b=ws(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=un){return tt.workingToColorSpace(Ot.copy(this),e),Math.round(Ze(Ot.r*255,0,255))*65536+Math.round(Ze(Ot.g*255,0,255))*256+Math.round(Ze(Ot.b*255,0,255))}getHexString(e=un){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=tt.workingColorSpace){tt.workingToColorSpace(Ot.copy(this),t);const i=Ot.r,s=Ot.g,r=Ot.b,a=Math.max(i,s,r),o=Math.min(i,s,r);let l,c;const d=(o+a)/2;if(o===a)l=0,c=0;else{const u=a-o;switch(c=d<=.5?u/(a+o):u/(2-a-o),a){case i:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-i)/u+2;break;case r:l=(i-s)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=d,e}getRGB(e,t=tt.workingColorSpace){return tt.workingToColorSpace(Ot.copy(this),t),e.r=Ot.r,e.g=Ot.g,e.b=Ot.b,e}getStyle(e=un){tt.workingToColorSpace(Ot.copy(this),e);const t=Ot.r,i=Ot.g,s=Ot.b;return e!==un?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(li),this.setHSL(li.h+e,li.s+t,li.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(li),e.getHSL(Ur);const i=so(li.h,Ur.h,t),s=so(li.s,Ur.s,t),r=so(li.l,Ur.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ot=new Qe;Qe.NAMES=Ah;let $_=0;class Yi extends $i{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:$_++}),this.uuid=vi(),this.name="",this.type="Material",this.blending=As,this.side=Si,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Yo,this.blendDst=Ko,this.blendEquation=Bi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Qe(0,0,0),this.blendAlpha=0,this.depthFunc=Rs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=sd,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ji,this.stencilZFail=Ji,this.stencilZPass=Ji,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==As&&(i.blending=this.blending),this.side!==Si&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Yo&&(i.blendSrc=this.blendSrc),this.blendDst!==Ko&&(i.blendDst=this.blendDst),this.blendEquation!==Bi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Rs&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==sd&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ji&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Ji&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Ji&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Ea extends Yi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Qe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Vn,this.combine=hh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const At=new z,Nr=new He;let Y_=0;class Tn{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Y_++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Fl,this.updateRanges=[],this.gpuType=Qn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Nr.fromBufferAttribute(this,t),Nr.applyMatrix3(e),this.setXY(t,Nr.x,Nr.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)At.fromBufferAttribute(this,t),At.applyMatrix3(e),this.setXYZ(t,At.x,At.y,At.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)At.fromBufferAttribute(this,t),At.applyMatrix4(e),this.setXYZ(t,At.x,At.y,At.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)At.fromBufferAttribute(this,t),At.applyNormalMatrix(e),this.setXYZ(t,At.x,At.y,At.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)At.fromBufferAttribute(this,t),At.transformDirection(e),this.setXYZ(t,At.x,At.y,At.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Ln(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=dt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ln(t,this.array)),t}setX(e,t){return this.normalized&&(t=dt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ln(t,this.array)),t}setY(e,t){return this.normalized&&(t=dt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ln(t,this.array)),t}setZ(e,t){return this.normalized&&(t=dt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ln(t,this.array)),t}setW(e,t){return this.normalized&&(t=dt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=dt(t,this.array),i=dt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=dt(t,this.array),i=dt(i,this.array),s=dt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=dt(t,this.array),i=dt(i,this.array),s=dt(s,this.array),r=dt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Fl&&(e.usage=this.usage),e}}class wh extends Tn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Ch extends Tn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class An extends Tn{constructor(e,t,i){super(new Float32Array(e),t,i)}}let K_=0;const dn=new bt,Eo=new It,ls=new z,sn=new xr,Gs=new xr,Dt=new z;class wn extends $i{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:K_++}),this.uuid=vi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Eh(e)?Ch:wh)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Ye().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return dn.makeRotationFromQuaternion(e),this.applyMatrix4(dn),this}rotateX(e){return dn.makeRotationX(e),this.applyMatrix4(dn),this}rotateY(e){return dn.makeRotationY(e),this.applyMatrix4(dn),this}rotateZ(e){return dn.makeRotationZ(e),this.applyMatrix4(dn),this}translate(e,t,i){return dn.makeTranslation(e,t,i),this.applyMatrix4(dn),this}scale(e,t,i){return dn.makeScale(e,t,i),this.applyMatrix4(dn),this}lookAt(e){return Eo.lookAt(e),Eo.updateMatrix(),this.applyMatrix4(Eo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ls).negate(),this.translate(ls.x,ls.y,ls.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new An(i,3))}else{const i=Math.min(e.length,t.count);for(let s=0;s<i;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new xr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new z(-1/0,-1/0,-1/0),new z(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){const r=t[i];sn.setFromBufferAttribute(r),this.morphTargetsRelative?(Dt.addVectors(this.boundingBox.min,sn.min),this.boundingBox.expandByPoint(Dt),Dt.addVectors(this.boundingBox.max,sn.max),this.boundingBox.expandByPoint(Dt)):(this.boundingBox.expandByPoint(sn.min),this.boundingBox.expandByPoint(sn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Va);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new z,1/0);return}if(e){const i=this.boundingSphere.center;if(sn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];Gs.setFromBufferAttribute(o),this.morphTargetsRelative?(Dt.addVectors(sn.min,Gs.min),sn.expandByPoint(Dt),Dt.addVectors(sn.max,Gs.max),sn.expandByPoint(Dt)):(sn.expandByPoint(Gs.min),sn.expandByPoint(Gs.max))}sn.getCenter(i);let s=0;for(let r=0,a=e.count;r<a;r++)Dt.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(Dt));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],l=this.morphTargetsRelative;for(let c=0,d=o.count;c<d;c++)Dt.fromBufferAttribute(o,c),l&&(ls.fromBufferAttribute(e,c),Dt.add(ls)),s=Math.max(s,i.distanceToSquared(Dt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Tn(new Float32Array(4*i.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let F=0;F<i.count;F++)o[F]=new z,l[F]=new z;const c=new z,d=new z,u=new z,f=new He,p=new He,g=new He,x=new z,m=new z;function h(F,E,S){c.fromBufferAttribute(i,F),d.fromBufferAttribute(i,E),u.fromBufferAttribute(i,S),f.fromBufferAttribute(r,F),p.fromBufferAttribute(r,E),g.fromBufferAttribute(r,S),d.sub(c),u.sub(c),p.sub(f),g.sub(f);const L=1/(p.x*g.y-g.x*p.y);isFinite(L)&&(x.copy(d).multiplyScalar(g.y).addScaledVector(u,-p.y).multiplyScalar(L),m.copy(u).multiplyScalar(p.x).addScaledVector(d,-g.x).multiplyScalar(L),o[F].add(x),o[E].add(x),o[S].add(x),l[F].add(m),l[E].add(m),l[S].add(m))}let T=this.groups;T.length===0&&(T=[{start:0,count:e.count}]);for(let F=0,E=T.length;F<E;++F){const S=T[F],L=S.start,$=S.count;for(let J=L,se=L+$;J<se;J+=3)h(e.getX(J+0),e.getX(J+1),e.getX(J+2))}const w=new z,M=new z,C=new z,R=new z;function P(F){C.fromBufferAttribute(s,F),R.copy(C);const E=o[F];w.copy(E),w.sub(C.multiplyScalar(C.dot(E))).normalize(),M.crossVectors(R,E);const L=M.dot(l[F])<0?-1:1;a.setXYZW(F,w.x,w.y,w.z,L)}for(let F=0,E=T.length;F<E;++F){const S=T[F],L=S.start,$=S.count;for(let J=L,se=L+$;J<se;J+=3)P(e.getX(J+0)),P(e.getX(J+1)),P(e.getX(J+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Tn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let f=0,p=i.count;f<p;f++)i.setXYZ(f,0,0,0);const s=new z,r=new z,a=new z,o=new z,l=new z,c=new z,d=new z,u=new z;if(e)for(let f=0,p=e.count;f<p;f+=3){const g=e.getX(f+0),x=e.getX(f+1),m=e.getX(f+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,x),a.fromBufferAttribute(t,m),d.subVectors(a,r),u.subVectors(s,r),d.cross(u),o.fromBufferAttribute(i,g),l.fromBufferAttribute(i,x),c.fromBufferAttribute(i,m),o.add(d),l.add(d),c.add(d),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(x,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,p=t.count;f<p;f+=3)s.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),a.fromBufferAttribute(t,f+2),d.subVectors(a,r),u.subVectors(s,r),d.cross(u),i.setXYZ(f+0,d.x,d.y,d.z),i.setXYZ(f+1,d.x,d.y,d.z),i.setXYZ(f+2,d.x,d.y,d.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Dt.fromBufferAttribute(e,t),Dt.normalize(),e.setXYZ(t,Dt.x,Dt.y,Dt.z)}toNonIndexed(){function e(o,l){const c=o.array,d=o.itemSize,u=o.normalized,f=new c.constructor(l.length*d);let p=0,g=0;for(let x=0,m=l.length;x<m;x++){o.isInterleavedBufferAttribute?p=l[x]*o.data.stride+o.offset:p=l[x]*d;for(let h=0;h<d;h++)f[g++]=c[p++]}return new Tn(f,d,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new wn,i=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=e(l,i);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let d=0,u=c.length;d<u;d++){const f=c[d],p=e(f,i);l.push(p)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],d=[];for(let u=0,f=c.length;u<f;u++){const p=c[u];d.push(p.toJSON(e.data))}d.length>0&&(s[l]=d,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const s=e.attributes;for(const c in s){const d=s[c];this.setAttribute(c,d.clone(t))}const r=e.morphAttributes;for(const c in r){const d=[],u=r[c];for(let f=0,p=u.length;f<p;f++)d.push(u[f].clone(t));this.morphAttributes[c]=d}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,d=a.length;c<d;c++){const u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const vd=new bt,Di=new ka,Fr=new Va,xd=new z,Or=new z,Br=new z,zr=new z,To=new z,Hr=new z,bd=new z,Vr=new z;class on extends It{constructor(e=new wn,t=new Ea){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){Hr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const d=o[l],u=r[l];d!==0&&(To.fromBufferAttribute(u,e),a?Hr.addScaledVector(To,d):Hr.addScaledVector(To.sub(t),d))}t.add(Hr)}return t}raycast(e,t){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Fr.copy(i.boundingSphere),Fr.applyMatrix4(r),Di.copy(e.ray).recast(e.near),!(Fr.containsPoint(Di.origin)===!1&&(Di.intersectSphere(Fr,xd)===null||Di.origin.distanceToSquared(xd)>(e.far-e.near)**2))&&(vd.copy(r).invert(),Di.copy(e.ray).applyMatrix4(vd),!(i.boundingBox!==null&&Di.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Di)))}_computeIntersections(e,t,i){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,d=r.attributes.uv1,u=r.attributes.normal,f=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,x=f.length;g<x;g++){const m=f[g],h=a[m.materialIndex],T=Math.max(m.start,p.start),w=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let M=T,C=w;M<C;M+=3){const R=o.getX(M),P=o.getX(M+1),F=o.getX(M+2);s=kr(this,h,e,i,c,d,u,R,P,F),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,p.start),x=Math.min(o.count,p.start+p.count);for(let m=g,h=x;m<h;m+=3){const T=o.getX(m),w=o.getX(m+1),M=o.getX(m+2);s=kr(this,a,e,i,c,d,u,T,w,M),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,x=f.length;g<x;g++){const m=f[g],h=a[m.materialIndex],T=Math.max(m.start,p.start),w=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let M=T,C=w;M<C;M+=3){const R=M,P=M+1,F=M+2;s=kr(this,h,e,i,c,d,u,R,P,F),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,p.start),x=Math.min(l.count,p.start+p.count);for(let m=g,h=x;m<h;m+=3){const T=m,w=m+1,M=m+2;s=kr(this,a,e,i,c,d,u,T,w,M),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function Z_(n,e,t,i,s,r,a,o){let l;if(e.side===Qt?l=i.intersectTriangle(a,r,s,!0,o):l=i.intersectTriangle(s,r,a,e.side===Si,o),l===null)return null;Vr.copy(o),Vr.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(Vr);return c<t.near||c>t.far?null:{distance:c,point:Vr.clone(),object:n}}function kr(n,e,t,i,s,r,a,o,l,c){n.getVertexPosition(o,Or),n.getVertexPosition(l,Br),n.getVertexPosition(c,zr);const d=Z_(n,e,t,i,Or,Br,zr,bd);if(d){const u=new z;fn.getBarycoord(bd,Or,Br,zr,u),s&&(d.uv=fn.getInterpolatedAttribute(s,o,l,c,u,new He)),r&&(d.uv1=fn.getInterpolatedAttribute(r,o,l,c,u,new He)),a&&(d.normal=fn.getInterpolatedAttribute(a,o,l,c,u,new z),d.normal.dot(i.direction)>0&&d.normal.multiplyScalar(-1));const f={a:o,b:l,c,normal:new z,materialIndex:0};fn.getNormal(Or,Br,zr,f.normal),d.face=f,d.barycoord=u}return d}class Ns extends wn{constructor(e=1,t=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],d=[],u=[];let f=0,p=0;g("z","y","x",-1,-1,i,t,e,a,r,0),g("z","y","x",1,-1,i,t,-e,a,r,1),g("x","z","y",1,1,e,i,t,s,a,2),g("x","z","y",1,-1,e,i,-t,s,a,3),g("x","y","z",1,-1,e,t,i,s,r,4),g("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new An(c,3)),this.setAttribute("normal",new An(d,3)),this.setAttribute("uv",new An(u,2));function g(x,m,h,T,w,M,C,R,P,F,E){const S=M/P,L=C/F,$=M/2,J=C/2,se=R/2,ie=P+1,Q=F+1;let ne=0,V=0;const me=new z;for(let ye=0;ye<Q;ye++){const Le=ye*L-J;for(let ke=0;ke<ie;ke++){const it=ke*S-$;me[x]=it*T,me[m]=Le*w,me[h]=se,c.push(me.x,me.y,me.z),me[x]=0,me[m]=0,me[h]=R>0?1:-1,d.push(me.x,me.y,me.z),u.push(ke/P),u.push(1-ye/F),ne+=1}}for(let ye=0;ye<F;ye++)for(let Le=0;Le<P;Le++){const ke=f+Le+ie*ye,it=f+Le+ie*(ye+1),ot=f+(Le+1)+ie*(ye+1),_e=f+(Le+1)+ie*ye;l.push(ke,it,_e),l.push(it,ot,_e),V+=6}o.addGroup(p,V,E),p+=V,f+=ne}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ns(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Ls(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const s=n[t][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone():Array.isArray(s)?e[t][i]=s.slice():e[t][i]=s}}return e}function Wt(n){const e={};for(let t=0;t<n.length;t++){const i=Ls(n[t]);for(const s in i)e[s]=i[s]}return e}function J_(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Rh(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:tt.workingColorSpace}const Q_={clone:Ls,merge:Wt};var ev=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,tv=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ei extends Yi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ev,this.fragmentShader=tv,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ls(e.uniforms),this.uniformsGroups=J_(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class Ph extends It{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new bt,this.projectionMatrix=new bt,this.projectionMatrixInverse=new bt,this.coordinateSystem=Fn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const ci=new z,yd=new He,Md=new He;class hn extends Ph{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Ol*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ca*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ol*2*Math.atan(Math.tan(ca*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){ci.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ci.x,ci.y).multiplyScalar(-e/ci.z),ci.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(ci.x,ci.y).multiplyScalar(-e/ci.z)}getViewSize(e,t){return this.getViewBounds(e,yd,Md),t.subVectors(Md,yd)}setViewOffset(e,t,i,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(ca*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*i/c,s*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const cs=-90,ds=1;class nv extends It{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new hn(cs,ds,e,t);s.layers=this.layers,this.add(s);const r=new hn(cs,ds,e,t);r.layers=this.layers,this.add(r);const a=new hn(cs,ds,e,t);a.layers=this.layers,this.add(a);const o=new hn(cs,ds,e,t);o.layers=this.layers,this.add(o);const l=new hn(cs,ds,e,t);l.layers=this.layers,this.add(l);const c=new hn(cs,ds,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,s,r,a,o,l]=t;for(const c of t)this.remove(c);if(e===Fn)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Ma)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,d]=this.children,u=e.getRenderTarget(),f=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,s),e.render(t,r),e.setRenderTarget(i,1,s),e.render(t,a),e.setRenderTarget(i,2,s),e.render(t,o),e.setRenderTarget(i,3,s),e.render(t,l),e.setRenderTarget(i,4,s),e.render(t,c),i.texture.generateMipmaps=x,e.setRenderTarget(i,5,s),e.render(t,d),e.setRenderTarget(u,f,p),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class Dh extends Yt{constructor(e=[],t=Ps,i,s,r,a,o,l,c,d){super(e,t,i,s,r,a,o,l,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class iv extends Wi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new Dh(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Ns(5,5,5),r=new Ei({name:"CubemapFromEquirect",uniforms:Ls(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Qt,blending:gi});r.uniforms.tEquirect.value=t;const a=new on(s,r),o=t.minFilter;return t.minFilter===Vi&&(t.minFilter=Nn),new nv(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,s);e.setRenderTarget(r)}}class Gr extends It{constructor(){super(),this.isGroup=!0,this.type="Group"}}const sv={type:"move"};class Ao{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Gr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Gr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new z,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new z),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Gr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new z,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new z),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const x of e.hand.values()){const m=t.getJointPose(x,i),h=this._getHandJoint(c,x);m!==null&&(h.matrix.fromArray(m.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,h.jointRadius=m.radius),h.visible=m!==null}const d=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],f=d.position.distanceTo(u.position),p=.02,g=.005;c.inputState.pinching&&f>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(sv)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Gr;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class rv extends It{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Vn,this.environmentIntensity=1,this.environmentRotation=new Vn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class av{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Fl,this.updateRanges=[],this.version=0,this.uuid=vi()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[i+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=vi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=vi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Gt=new z;class Ta{constructor(e,t,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)Gt.fromBufferAttribute(this,t),Gt.applyMatrix4(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Gt.fromBufferAttribute(this,t),Gt.applyNormalMatrix(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Gt.fromBufferAttribute(this,t),Gt.transformDirection(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}getComponent(e,t){let i=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(i=Ln(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=dt(i,this.array)),this.data.array[e*this.data.stride+this.offset+t]=i,this}setX(e,t){return this.normalized&&(t=dt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=dt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=dt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=dt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Ln(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Ln(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Ln(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Ln(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=dt(t,this.array),i=dt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=dt(t,this.array),i=dt(i,this.array),s=dt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=dt(t,this.array),i=dt(i,this.array),s=dt(s,this.array),r=dt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Tn(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Ta(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Ih extends Yi{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Qe(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let us;const qs=new z,hs=new z,fs=new z,ps=new He,Ws=new He,Lh=new bt,qr=new z,Xs=new z,Wr=new z,Sd=new He,wo=new He,Ed=new He;class ov extends It{constructor(e=new Ih){if(super(),this.isSprite=!0,this.type="Sprite",us===void 0){us=new wn;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new av(t,5);us.setIndex([0,1,2,0,2,3]),us.setAttribute("position",new Ta(i,3,0,!1)),us.setAttribute("uv",new Ta(i,2,3,!1))}this.geometry=us,this.material=e,this.center=new He(.5,.5),this.count=1}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),hs.setFromMatrixScale(this.matrixWorld),Lh.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),fs.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&hs.multiplyScalar(-fs.z);const i=this.material.rotation;let s,r;i!==0&&(r=Math.cos(i),s=Math.sin(i));const a=this.center;Xr(qr.set(-.5,-.5,0),fs,a,hs,s,r),Xr(Xs.set(.5,-.5,0),fs,a,hs,s,r),Xr(Wr.set(.5,.5,0),fs,a,hs,s,r),Sd.set(0,0),wo.set(1,0),Ed.set(1,1);let o=e.ray.intersectTriangle(qr,Xs,Wr,!1,qs);if(o===null&&(Xr(Xs.set(-.5,.5,0),fs,a,hs,s,r),wo.set(0,1),o=e.ray.intersectTriangle(qr,Wr,Xs,!1,qs),o===null))return;const l=e.ray.origin.distanceTo(qs);l<e.near||l>e.far||t.push({distance:l,point:qs.clone(),uv:fn.getInterpolation(qs,qr,Xs,Wr,Sd,wo,Ed,new He),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Xr(n,e,t,i,s,r){ps.subVectors(n,t).addScalar(.5).multiply(i),s!==void 0?(Ws.x=r*ps.x-s*ps.y,Ws.y=s*ps.x+r*ps.y):Ws.copy(ps),n.copy(e),n.x+=Ws.x,n.y+=Ws.y,n.applyMatrix4(Lh)}const Co=new z,lv=new z,cv=new Ye;class fi{constructor(e=new z(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const s=Co.subVectors(i,t).cross(lv.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(Co),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(i,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||cv.getNormalMatrix(e),s=this.coplanarPoint(Co).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ii=new Va,dv=new He(.5,.5),jr=new z;class pc{constructor(e=new fi,t=new fi,i=new fi,s=new fi,r=new fi,a=new fi){this.planes=[e,t,i,s,r,a]}set(e,t,i,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Fn,i=!1){const s=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],d=r[4],u=r[5],f=r[6],p=r[7],g=r[8],x=r[9],m=r[10],h=r[11],T=r[12],w=r[13],M=r[14],C=r[15];if(s[0].setComponents(c-a,p-d,h-g,C-T).normalize(),s[1].setComponents(c+a,p+d,h+g,C+T).normalize(),s[2].setComponents(c+o,p+u,h+x,C+w).normalize(),s[3].setComponents(c-o,p-u,h-x,C-w).normalize(),i)s[4].setComponents(l,f,m,M).normalize(),s[5].setComponents(c-l,p-f,h-m,C-M).normalize();else if(s[4].setComponents(c-l,p-f,h-m,C-M).normalize(),t===Fn)s[5].setComponents(c+l,p+f,h+m,C+M).normalize();else if(t===Ma)s[5].setComponents(l,f,m,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ii.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ii.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ii)}intersectsSprite(e){Ii.center.set(0,0,0);const t=dv.distanceTo(e.center);return Ii.radius=.7071067811865476+t,Ii.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ii)}intersectsSphere(e){const t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const s=t[i];if(jr.x=s.normal.x>0?e.max.x:e.min.x,jr.y=s.normal.y>0?e.max.y:e.min.y,jr.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(jr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Uh extends Yi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Qe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Aa=new z,wa=new z,Td=new bt,js=new ka,$r=new Va,Ro=new z,Ad=new z;class uv extends It{constructor(e=new wn,t=new Uh){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let s=1,r=t.count;s<r;s++)Aa.fromBufferAttribute(t,s-1),wa.fromBufferAttribute(t,s),i[s]=i[s-1],i[s]+=Aa.distanceTo(wa);e.setAttribute("lineDistance",new An(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),$r.copy(i.boundingSphere),$r.applyMatrix4(s),$r.radius+=r,e.ray.intersectsSphere($r)===!1)return;Td.copy(s).invert(),js.copy(e.ray).applyMatrix4(Td);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,d=i.index,f=i.attributes.position;if(d!==null){const p=Math.max(0,a.start),g=Math.min(d.count,a.start+a.count);for(let x=p,m=g-1;x<m;x+=c){const h=d.getX(x),T=d.getX(x+1),w=Yr(this,e,js,l,h,T,x);w&&t.push(w)}if(this.isLineLoop){const x=d.getX(g-1),m=d.getX(p),h=Yr(this,e,js,l,x,m,g-1);h&&t.push(h)}}else{const p=Math.max(0,a.start),g=Math.min(f.count,a.start+a.count);for(let x=p,m=g-1;x<m;x+=c){const h=Yr(this,e,js,l,x,x+1,x);h&&t.push(h)}if(this.isLineLoop){const x=Yr(this,e,js,l,g-1,p,g-1);x&&t.push(x)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Yr(n,e,t,i,s,r,a){const o=n.geometry.attributes.position;if(Aa.fromBufferAttribute(o,s),wa.fromBufferAttribute(o,r),t.distanceSqToSegment(Aa,wa,Ro,Ad)>i)return;Ro.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(Ro);if(!(c<e.near||c>e.far))return{distance:c,point:Ad.clone().applyMatrix4(n.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:n}}class hv extends Yt{constructor(e,t,i,s,r,a,o,l,c){super(e,t,i,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Nh extends Yt{constructor(e,t,i=Gi,s,r,a,o=En,l=En,c,d=dr,u=1){if(d!==dr&&d!==ur)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:e,height:t,depth:u};super(f,s,r,a,o,l,d,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new hc(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Fh extends Yt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Ca extends wn{constructor(e=1,t=32,i=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:s},t=Math.max(3,t);const r=[],a=[],o=[],l=[],c=new z,d=new He;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let u=0,f=3;u<=t;u++,f+=3){const p=i+u/t*s;c.x=e*Math.cos(p),c.y=e*Math.sin(p),a.push(c.x,c.y,c.z),o.push(0,0,1),d.x=(a[f]/e+1)/2,d.y=(a[f+1]/e+1)/2,l.push(d.x,d.y)}for(let u=1;u<=t;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new An(a,3)),this.setAttribute("normal",new An(o,3)),this.setAttribute("uv",new An(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ca(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Ga extends wn{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(i),l=Math.floor(s),c=o+1,d=l+1,u=e/o,f=t/l,p=[],g=[],x=[],m=[];for(let h=0;h<d;h++){const T=h*f-a;for(let w=0;w<c;w++){const M=w*u-r;g.push(M,-T,0),x.push(0,0,1),m.push(w/o),m.push(1-h/l)}}for(let h=0;h<l;h++)for(let T=0;T<o;T++){const w=T+c*h,M=T+c*(h+1),C=T+1+c*(h+1),R=T+1+c*h;p.push(w,M,R),p.push(M,C,R)}this.setIndex(p),this.setAttribute("position",new An(g,3)),this.setAttribute("normal",new An(x,3)),this.setAttribute("uv",new An(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ga(e.width,e.height,e.widthSegments,e.heightSegments)}}class fv extends Yi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Qe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Qe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Mh,this.normalScale=new He(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Vn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class pv extends Yi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=y_,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class mv extends Yi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Oh extends It{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Qe(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}const Po=new bt,wd=new z,Cd=new z;class gv{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new He(512,512),this.mapType=Hn,this.map=null,this.mapPass=null,this.matrix=new bt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new pc,this._frameExtents=new He(1,1),this._viewportCount=1,this._viewports=[new Tt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;wd.setFromMatrixPosition(e.matrixWorld),t.position.copy(wd),Cd.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Cd),t.updateMatrixWorld(),Po.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Po,t.coordinateSystem,t.reversedDepth),t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Po)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Bh extends Ph{constructor(e=-1,t=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-e,a=i+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=d*this.view.offsetY,l=o-d*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class _v extends gv{constructor(){super(new Bh(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class vv extends Oh{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(It.DEFAULT_UP),this.updateMatrix(),this.target=new It,this.shadow=new _v}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class xv extends Oh{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class bv extends hn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const Rd=new bt;class yv{constructor(e,t,i=0,s=1/0){this.ray=new ka(e,t),this.near=i,this.far=s,this.camera=null,this.layers=new fc,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Rd.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Rd),this}intersectObject(e,t=!0,i=[]){return Bl(e,this,i,t),i.sort(Pd),i}intersectObjects(e,t=!0,i=[]){for(let s=0,r=e.length;s<r;s++)Bl(e[s],this,i,t);return i.sort(Pd),i}}function Pd(n,e){return n.distance-e.distance}function Bl(n,e,t,i){let s=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(s=!1),s===!0&&i===!0){const r=n.children;for(let a=0,o=r.length;a<o;a++)Bl(r[a],e,t,!0)}}class Dd{constructor(e=1,t=0,i=0){this.radius=e,this.phi=t,this.theta=i}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Ze(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(Ze(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class Mv extends $i{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function Id(n,e,t,i){const s=Sv(i);switch(t){case vh:return n*e;case bh:return n*e/s.components*s.byteLength;case cc:return n*e/s.components*s.byteLength;case yh:return n*e*2/s.components*s.byteLength;case dc:return n*e*2/s.components*s.byteLength;case xh:return n*e*3/s.components*s.byteLength;case yn:return n*e*4/s.components*s.byteLength;case uc:return n*e*4/s.components*s.byteLength;case ra:case aa:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case oa:case la:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case cl:case ul:return Math.max(n,16)*Math.max(e,8)/4;case ll:case dl:return Math.max(n,8)*Math.max(e,8)/2;case hl:case fl:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case pl:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case ml:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case gl:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case _l:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case vl:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case xl:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case bl:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case yl:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Ml:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Sl:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case El:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Tl:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Al:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case wl:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Cl:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Rl:case Pl:case Dl:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Il:case Ll:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Ul:case Nl:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Sv(n){switch(n){case Hn:case ph:return{byteLength:1,components:1};case lr:case mh:case vr:return{byteLength:2,components:1};case oc:case lc:return{byteLength:2,components:4};case Gi:case ac:case Qn:return{byteLength:4,components:1};case gh:case _h:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:rc}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=rc);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function zh(){let n=null,e=!1,t=null,i=null;function s(r,a){t(r,a),i=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function Ev(n){const e=new WeakMap;function t(o,l){const c=o.array,d=o.usage,u=c.byteLength,f=n.createBuffer();n.bindBuffer(l,f),n.bufferData(l,c,d),o.onUploadCallback();let p;if(c instanceof Float32Array)p=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=n.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=n.SHORT;else if(c instanceof Uint32Array)p=n.UNSIGNED_INT;else if(c instanceof Int32Array)p=n.INT;else if(c instanceof Int8Array)p=n.BYTE;else if(c instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function i(o,l,c){const d=l.array,u=l.updateRanges;if(n.bindBuffer(c,o),u.length===0)n.bufferSubData(c,0,d);else{u.sort((p,g)=>p.start-g.start);let f=0;for(let p=1;p<u.length;p++){const g=u[f],x=u[p];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++f,u[f]=x)}u.length=f+1;for(let p=0,g=u.length;p<g;p++){const x=u[p];n.bufferSubData(c,x.start*d.BYTES_PER_ELEMENT,d,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(n.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const d=e.get(o);(!d||d.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var Tv=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Av=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,wv=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Cv=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Rv=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Pv=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Dv=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Iv=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Lv=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Uv=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Nv=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Fv=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Ov=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Bv=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,zv=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Hv=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Vv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,kv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Gv=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,qv=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Wv=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Xv=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,jv=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,$v=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Yv=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Kv=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Zv=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Jv=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Qv=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,e0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,t0="gl_FragColor = linearToOutputTexel( gl_FragColor );",n0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,i0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,s0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,r0=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,a0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,o0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,l0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,c0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,d0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,u0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,h0=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,f0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,p0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,m0=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,g0=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,_0=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,v0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,x0=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,b0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,y0=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,M0=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,S0=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,E0=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,T0=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,A0=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,w0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,C0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,R0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,P0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,D0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,I0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,L0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,U0=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,N0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,F0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,O0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,B0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,z0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,H0=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,V0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,k0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,G0=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,q0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,W0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,X0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,j0=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,$0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Y0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,K0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Z0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,J0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Q0=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,ex=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,tx=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,nx=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,ix=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,sx=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,rx=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,ax=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,ox=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,lx=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,cx=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,dx=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,ux=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,hx=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,fx=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,px=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,mx=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,gx=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,_x=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,vx=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,xx=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,bx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,yx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Mx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Sx=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Ex=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Tx=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ax=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,wx=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Cx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Rx=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Px=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Dx=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Ix=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Lx=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Ux=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Nx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Fx=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Ox=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Bx=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,zx=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Hx=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Vx=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,kx=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Gx=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,qx=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Wx=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Xx=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,jx=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$x=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Yx=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Kx=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Zx=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Jx=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Qx=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,eb=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,tb=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,nb=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,ib=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ke={alphahash_fragment:Tv,alphahash_pars_fragment:Av,alphamap_fragment:wv,alphamap_pars_fragment:Cv,alphatest_fragment:Rv,alphatest_pars_fragment:Pv,aomap_fragment:Dv,aomap_pars_fragment:Iv,batching_pars_vertex:Lv,batching_vertex:Uv,begin_vertex:Nv,beginnormal_vertex:Fv,bsdfs:Ov,iridescence_fragment:Bv,bumpmap_pars_fragment:zv,clipping_planes_fragment:Hv,clipping_planes_pars_fragment:Vv,clipping_planes_pars_vertex:kv,clipping_planes_vertex:Gv,color_fragment:qv,color_pars_fragment:Wv,color_pars_vertex:Xv,color_vertex:jv,common:$v,cube_uv_reflection_fragment:Yv,defaultnormal_vertex:Kv,displacementmap_pars_vertex:Zv,displacementmap_vertex:Jv,emissivemap_fragment:Qv,emissivemap_pars_fragment:e0,colorspace_fragment:t0,colorspace_pars_fragment:n0,envmap_fragment:i0,envmap_common_pars_fragment:s0,envmap_pars_fragment:r0,envmap_pars_vertex:a0,envmap_physical_pars_fragment:_0,envmap_vertex:o0,fog_vertex:l0,fog_pars_vertex:c0,fog_fragment:d0,fog_pars_fragment:u0,gradientmap_pars_fragment:h0,lightmap_pars_fragment:f0,lights_lambert_fragment:p0,lights_lambert_pars_fragment:m0,lights_pars_begin:g0,lights_toon_fragment:v0,lights_toon_pars_fragment:x0,lights_phong_fragment:b0,lights_phong_pars_fragment:y0,lights_physical_fragment:M0,lights_physical_pars_fragment:S0,lights_fragment_begin:E0,lights_fragment_maps:T0,lights_fragment_end:A0,logdepthbuf_fragment:w0,logdepthbuf_pars_fragment:C0,logdepthbuf_pars_vertex:R0,logdepthbuf_vertex:P0,map_fragment:D0,map_pars_fragment:I0,map_particle_fragment:L0,map_particle_pars_fragment:U0,metalnessmap_fragment:N0,metalnessmap_pars_fragment:F0,morphinstance_vertex:O0,morphcolor_vertex:B0,morphnormal_vertex:z0,morphtarget_pars_vertex:H0,morphtarget_vertex:V0,normal_fragment_begin:k0,normal_fragment_maps:G0,normal_pars_fragment:q0,normal_pars_vertex:W0,normal_vertex:X0,normalmap_pars_fragment:j0,clearcoat_normal_fragment_begin:$0,clearcoat_normal_fragment_maps:Y0,clearcoat_pars_fragment:K0,iridescence_pars_fragment:Z0,opaque_fragment:J0,packing:Q0,premultiplied_alpha_fragment:ex,project_vertex:tx,dithering_fragment:nx,dithering_pars_fragment:ix,roughnessmap_fragment:sx,roughnessmap_pars_fragment:rx,shadowmap_pars_fragment:ax,shadowmap_pars_vertex:ox,shadowmap_vertex:lx,shadowmask_pars_fragment:cx,skinbase_vertex:dx,skinning_pars_vertex:ux,skinning_vertex:hx,skinnormal_vertex:fx,specularmap_fragment:px,specularmap_pars_fragment:mx,tonemapping_fragment:gx,tonemapping_pars_fragment:_x,transmission_fragment:vx,transmission_pars_fragment:xx,uv_pars_fragment:bx,uv_pars_vertex:yx,uv_vertex:Mx,worldpos_vertex:Sx,background_vert:Ex,background_frag:Tx,backgroundCube_vert:Ax,backgroundCube_frag:wx,cube_vert:Cx,cube_frag:Rx,depth_vert:Px,depth_frag:Dx,distanceRGBA_vert:Ix,distanceRGBA_frag:Lx,equirect_vert:Ux,equirect_frag:Nx,linedashed_vert:Fx,linedashed_frag:Ox,meshbasic_vert:Bx,meshbasic_frag:zx,meshlambert_vert:Hx,meshlambert_frag:Vx,meshmatcap_vert:kx,meshmatcap_frag:Gx,meshnormal_vert:qx,meshnormal_frag:Wx,meshphong_vert:Xx,meshphong_frag:jx,meshphysical_vert:$x,meshphysical_frag:Yx,meshtoon_vert:Kx,meshtoon_frag:Zx,points_vert:Jx,points_frag:Qx,shadow_vert:eb,shadow_frag:tb,sprite_vert:nb,sprite_frag:ib},be={common:{diffuse:{value:new Qe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ye},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ye}},envmap:{envMap:{value:null},envMapRotation:{value:new Ye},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ye}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ye}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ye},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ye},normalScale:{value:new He(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ye},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ye}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ye}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ye}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Qe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Qe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0},uvTransform:{value:new Ye}},sprite:{diffuse:{value:new Qe(16777215)},opacity:{value:1},center:{value:new He(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ye},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0}}},In={basic:{uniforms:Wt([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.fog]),vertexShader:Ke.meshbasic_vert,fragmentShader:Ke.meshbasic_frag},lambert:{uniforms:Wt([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.fog,be.lights,{emissive:{value:new Qe(0)}}]),vertexShader:Ke.meshlambert_vert,fragmentShader:Ke.meshlambert_frag},phong:{uniforms:Wt([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.fog,be.lights,{emissive:{value:new Qe(0)},specular:{value:new Qe(1118481)},shininess:{value:30}}]),vertexShader:Ke.meshphong_vert,fragmentShader:Ke.meshphong_frag},standard:{uniforms:Wt([be.common,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.roughnessmap,be.metalnessmap,be.fog,be.lights,{emissive:{value:new Qe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ke.meshphysical_vert,fragmentShader:Ke.meshphysical_frag},toon:{uniforms:Wt([be.common,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.gradientmap,be.fog,be.lights,{emissive:{value:new Qe(0)}}]),vertexShader:Ke.meshtoon_vert,fragmentShader:Ke.meshtoon_frag},matcap:{uniforms:Wt([be.common,be.bumpmap,be.normalmap,be.displacementmap,be.fog,{matcap:{value:null}}]),vertexShader:Ke.meshmatcap_vert,fragmentShader:Ke.meshmatcap_frag},points:{uniforms:Wt([be.points,be.fog]),vertexShader:Ke.points_vert,fragmentShader:Ke.points_frag},dashed:{uniforms:Wt([be.common,be.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ke.linedashed_vert,fragmentShader:Ke.linedashed_frag},depth:{uniforms:Wt([be.common,be.displacementmap]),vertexShader:Ke.depth_vert,fragmentShader:Ke.depth_frag},normal:{uniforms:Wt([be.common,be.bumpmap,be.normalmap,be.displacementmap,{opacity:{value:1}}]),vertexShader:Ke.meshnormal_vert,fragmentShader:Ke.meshnormal_frag},sprite:{uniforms:Wt([be.sprite,be.fog]),vertexShader:Ke.sprite_vert,fragmentShader:Ke.sprite_frag},background:{uniforms:{uvTransform:{value:new Ye},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ke.background_vert,fragmentShader:Ke.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ye}},vertexShader:Ke.backgroundCube_vert,fragmentShader:Ke.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ke.cube_vert,fragmentShader:Ke.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ke.equirect_vert,fragmentShader:Ke.equirect_frag},distanceRGBA:{uniforms:Wt([be.common,be.displacementmap,{referencePosition:{value:new z},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ke.distanceRGBA_vert,fragmentShader:Ke.distanceRGBA_frag},shadow:{uniforms:Wt([be.lights,be.fog,{color:{value:new Qe(0)},opacity:{value:1}}]),vertexShader:Ke.shadow_vert,fragmentShader:Ke.shadow_frag}};In.physical={uniforms:Wt([In.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ye},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ye},clearcoatNormalScale:{value:new He(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ye},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ye},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ye},sheen:{value:0},sheenColor:{value:new Qe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ye},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ye},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ye},transmissionSamplerSize:{value:new He},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ye},attenuationDistance:{value:0},attenuationColor:{value:new Qe(0)},specularColor:{value:new Qe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ye},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ye},anisotropyVector:{value:new He},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ye}}]),vertexShader:Ke.meshphysical_vert,fragmentShader:Ke.meshphysical_frag};const Kr={r:0,b:0,g:0},Li=new Vn,sb=new bt;function rb(n,e,t,i,s,r,a){const o=new Qe(0);let l=r===!0?0:1,c,d,u=null,f=0,p=null;function g(w){let M=w.isScene===!0?w.background:null;return M&&M.isTexture&&(M=(w.backgroundBlurriness>0?t:e).get(M)),M}function x(w){let M=!1;const C=g(w);C===null?h(o,l):C&&C.isColor&&(h(C,1),M=!0);const R=n.xr.getEnvironmentBlendMode();R==="additive"?i.buffers.color.setClear(0,0,0,1,a):R==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(n.autoClear||M)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(w,M){const C=g(M);C&&(C.isCubeTexture||C.mapping===Ha)?(d===void 0&&(d=new on(new Ns(1,1,1),new Ei({name:"BackgroundCubeMaterial",uniforms:Ls(In.backgroundCube.uniforms),vertexShader:In.backgroundCube.vertexShader,fragmentShader:In.backgroundCube.fragmentShader,side:Qt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(R,P,F){this.matrixWorld.copyPosition(F.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(d)),Li.copy(M.backgroundRotation),Li.x*=-1,Li.y*=-1,Li.z*=-1,C.isCubeTexture&&C.isRenderTargetTexture===!1&&(Li.y*=-1,Li.z*=-1),d.material.uniforms.envMap.value=C,d.material.uniforms.flipEnvMap.value=C.isCubeTexture&&C.isRenderTargetTexture===!1?-1:1,d.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(sb.makeRotationFromEuler(Li)),d.material.toneMapped=tt.getTransfer(C.colorSpace)!==ct,(u!==C||f!==C.version||p!==n.toneMapping)&&(d.material.needsUpdate=!0,u=C,f=C.version,p=n.toneMapping),d.layers.enableAll(),w.unshift(d,d.geometry,d.material,0,0,null)):C&&C.isTexture&&(c===void 0&&(c=new on(new Ga(2,2),new Ei({name:"BackgroundMaterial",uniforms:Ls(In.background.uniforms),vertexShader:In.background.vertexShader,fragmentShader:In.background.fragmentShader,side:Si,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=C,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.toneMapped=tt.getTransfer(C.colorSpace)!==ct,C.matrixAutoUpdate===!0&&C.updateMatrix(),c.material.uniforms.uvTransform.value.copy(C.matrix),(u!==C||f!==C.version||p!==n.toneMapping)&&(c.material.needsUpdate=!0,u=C,f=C.version,p=n.toneMapping),c.layers.enableAll(),w.unshift(c,c.geometry,c.material,0,0,null))}function h(w,M){w.getRGB(Kr,Rh(n)),i.buffers.color.setClear(Kr.r,Kr.g,Kr.b,M,a)}function T(){d!==void 0&&(d.geometry.dispose(),d.material.dispose(),d=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(w,M=1){o.set(w),l=M,h(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(w){l=w,h(o,l)},render:x,addToRenderList:m,dispose:T}}function ab(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=f(null);let r=s,a=!1;function o(S,L,$,J,se){let ie=!1;const Q=u(J,$,L);r!==Q&&(r=Q,c(r.object)),ie=p(S,J,$,se),ie&&g(S,J,$,se),se!==null&&e.update(se,n.ELEMENT_ARRAY_BUFFER),(ie||a)&&(a=!1,M(S,L,$,J),se!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(se).buffer))}function l(){return n.createVertexArray()}function c(S){return n.bindVertexArray(S)}function d(S){return n.deleteVertexArray(S)}function u(S,L,$){const J=$.wireframe===!0;let se=i[S.id];se===void 0&&(se={},i[S.id]=se);let ie=se[L.id];ie===void 0&&(ie={},se[L.id]=ie);let Q=ie[J];return Q===void 0&&(Q=f(l()),ie[J]=Q),Q}function f(S){const L=[],$=[],J=[];for(let se=0;se<t;se++)L[se]=0,$[se]=0,J[se]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:$,attributeDivisors:J,object:S,attributes:{},index:null}}function p(S,L,$,J){const se=r.attributes,ie=L.attributes;let Q=0;const ne=$.getAttributes();for(const V in ne)if(ne[V].location>=0){const ye=se[V];let Le=ie[V];if(Le===void 0&&(V==="instanceMatrix"&&S.instanceMatrix&&(Le=S.instanceMatrix),V==="instanceColor"&&S.instanceColor&&(Le=S.instanceColor)),ye===void 0||ye.attribute!==Le||Le&&ye.data!==Le.data)return!0;Q++}return r.attributesNum!==Q||r.index!==J}function g(S,L,$,J){const se={},ie=L.attributes;let Q=0;const ne=$.getAttributes();for(const V in ne)if(ne[V].location>=0){let ye=ie[V];ye===void 0&&(V==="instanceMatrix"&&S.instanceMatrix&&(ye=S.instanceMatrix),V==="instanceColor"&&S.instanceColor&&(ye=S.instanceColor));const Le={};Le.attribute=ye,ye&&ye.data&&(Le.data=ye.data),se[V]=Le,Q++}r.attributes=se,r.attributesNum=Q,r.index=J}function x(){const S=r.newAttributes;for(let L=0,$=S.length;L<$;L++)S[L]=0}function m(S){h(S,0)}function h(S,L){const $=r.newAttributes,J=r.enabledAttributes,se=r.attributeDivisors;$[S]=1,J[S]===0&&(n.enableVertexAttribArray(S),J[S]=1),se[S]!==L&&(n.vertexAttribDivisor(S,L),se[S]=L)}function T(){const S=r.newAttributes,L=r.enabledAttributes;for(let $=0,J=L.length;$<J;$++)L[$]!==S[$]&&(n.disableVertexAttribArray($),L[$]=0)}function w(S,L,$,J,se,ie,Q){Q===!0?n.vertexAttribIPointer(S,L,$,se,ie):n.vertexAttribPointer(S,L,$,J,se,ie)}function M(S,L,$,J){x();const se=J.attributes,ie=$.getAttributes(),Q=L.defaultAttributeValues;for(const ne in ie){const V=ie[ne];if(V.location>=0){let me=se[ne];if(me===void 0&&(ne==="instanceMatrix"&&S.instanceMatrix&&(me=S.instanceMatrix),ne==="instanceColor"&&S.instanceColor&&(me=S.instanceColor)),me!==void 0){const ye=me.normalized,Le=me.itemSize,ke=e.get(me);if(ke===void 0)continue;const it=ke.buffer,ot=ke.type,_e=ke.bytesPerElement,k=ot===n.INT||ot===n.UNSIGNED_INT||me.gpuType===ac;if(me.isInterleavedBufferAttribute){const Z=me.data,ue=Z.stride,ve=me.offset;if(Z.isInstancedInterleavedBuffer){for(let le=0;le<V.locationSize;le++)h(V.location+le,Z.meshPerAttribute);S.isInstancedMesh!==!0&&J._maxInstanceCount===void 0&&(J._maxInstanceCount=Z.meshPerAttribute*Z.count)}else for(let le=0;le<V.locationSize;le++)m(V.location+le);n.bindBuffer(n.ARRAY_BUFFER,it);for(let le=0;le<V.locationSize;le++)w(V.location+le,Le/V.locationSize,ot,ye,ue*_e,(ve+Le/V.locationSize*le)*_e,k)}else{if(me.isInstancedBufferAttribute){for(let Z=0;Z<V.locationSize;Z++)h(V.location+Z,me.meshPerAttribute);S.isInstancedMesh!==!0&&J._maxInstanceCount===void 0&&(J._maxInstanceCount=me.meshPerAttribute*me.count)}else for(let Z=0;Z<V.locationSize;Z++)m(V.location+Z);n.bindBuffer(n.ARRAY_BUFFER,it);for(let Z=0;Z<V.locationSize;Z++)w(V.location+Z,Le/V.locationSize,ot,ye,Le*_e,Le/V.locationSize*Z*_e,k)}}else if(Q!==void 0){const ye=Q[ne];if(ye!==void 0)switch(ye.length){case 2:n.vertexAttrib2fv(V.location,ye);break;case 3:n.vertexAttrib3fv(V.location,ye);break;case 4:n.vertexAttrib4fv(V.location,ye);break;default:n.vertexAttrib1fv(V.location,ye)}}}}T()}function C(){F();for(const S in i){const L=i[S];for(const $ in L){const J=L[$];for(const se in J)d(J[se].object),delete J[se];delete L[$]}delete i[S]}}function R(S){if(i[S.id]===void 0)return;const L=i[S.id];for(const $ in L){const J=L[$];for(const se in J)d(J[se].object),delete J[se];delete L[$]}delete i[S.id]}function P(S){for(const L in i){const $=i[L];if($[S.id]===void 0)continue;const J=$[S.id];for(const se in J)d(J[se].object),delete J[se];delete $[S.id]}}function F(){E(),a=!0,r!==s&&(r=s,c(r.object))}function E(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:F,resetDefaultState:E,dispose:C,releaseStatesOfGeometry:R,releaseStatesOfProgram:P,initAttributes:x,enableAttribute:m,disableUnusedAttributes:T}}function ob(n,e,t){let i;function s(c){i=c}function r(c,d){n.drawArrays(i,c,d),t.update(d,i,1)}function a(c,d,u){u!==0&&(n.drawArraysInstanced(i,c,d,u),t.update(d,i,u))}function o(c,d,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,d,0,u);let p=0;for(let g=0;g<u;g++)p+=d[g];t.update(p,i,1)}function l(c,d,u,f){if(u===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<c.length;g++)a(c[g],d[g],f[g]);else{p.multiDrawArraysInstancedWEBGL(i,c,0,d,0,f,0,u);let g=0;for(let x=0;x<u;x++)g+=d[x]*f[x];t.update(g,i,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function lb(n,e,t,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const P=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(P){return!(P!==yn&&i.convert(P)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(P){const F=P===vr&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(P!==Hn&&i.convert(P)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==Qn&&!F)}function l(P){if(P==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const d=l(c);d!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",d,"instead."),c=d);const u=t.logarithmicDepthBuffer===!0,f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),h=n.getParameter(n.MAX_VERTEX_ATTRIBS),T=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),w=n.getParameter(n.MAX_VARYING_VECTORS),M=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),C=g>0,R=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:m,maxAttributes:h,maxVertexUniforms:T,maxVaryings:w,maxFragmentUniforms:M,vertexTextures:C,maxSamples:R}}function cb(n){const e=this;let t=null,i=0,s=!1,r=!1;const a=new fi,o=new Ye,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const p=u.length!==0||f||i!==0||s;return s=f,i=u.length,p},this.beginShadows=function(){r=!0,d(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){t=d(u,f,0)},this.setState=function(u,f,p){const g=u.clippingPlanes,x=u.clipIntersection,m=u.clipShadows,h=n.get(u);if(!s||g===null||g.length===0||r&&!m)r?d(null):c();else{const T=r?0:i,w=T*4;let M=h.clippingState||null;l.value=M,M=d(g,f,w,p);for(let C=0;C!==w;++C)M[C]=t[C];h.clippingState=M,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=T}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function d(u,f,p,g){const x=u!==null?u.length:0;let m=null;if(x!==0){if(m=l.value,g!==!0||m===null){const h=p+x*4,T=f.matrixWorldInverse;o.getNormalMatrix(T),(m===null||m.length<h)&&(m=new Float32Array(h));for(let w=0,M=p;w!==x;++w,M+=4)a.copy(u[w]).applyMatrix4(T,o),a.normal.toArray(m,M),m[M+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,m}}function db(n){let e=new WeakMap;function t(a,o){return o===sl?a.mapping=Ps:o===rl&&(a.mapping=Ds),a}function i(a){if(a&&a.isTexture){const o=a.mapping;if(o===sl||o===rl)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new iv(l.height);return c.fromEquirectangularTexture(n,a),e.set(a,c),a.addEventListener("dispose",s),t(c.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function r(){e=new WeakMap}return{get:i,dispose:r}}const xs=4,Ld=[.125,.215,.35,.446,.526,.582],zi=20,Do=new Bh,Ud=new Qe;let Io=null,Lo=0,Uo=0,No=!1;const Fi=(1+Math.sqrt(5))/2,ms=1/Fi,Nd=[new z(-Fi,ms,0),new z(Fi,ms,0),new z(-ms,0,Fi),new z(ms,0,Fi),new z(0,Fi,-ms),new z(0,Fi,ms),new z(-1,1,-1),new z(1,1,-1),new z(-1,1,1),new z(1,1,1)],ub=new z;class Fd{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,s=100,r={}){const{size:a=256,position:o=ub}=r;Io=this._renderer.getRenderTarget(),Lo=this._renderer.getActiveCubeFace(),Uo=this._renderer.getActiveMipmapLevel(),No=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,s,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=zd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Bd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Io,Lo,Uo),this._renderer.xr.enabled=No,e.scissorTest=!1,Zr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ps||e.mapping===Ds?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Io=this._renderer.getRenderTarget(),Lo=this._renderer.getActiveCubeFace(),Uo=this._renderer.getActiveMipmapLevel(),No=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Nn,minFilter:Nn,generateMipmaps:!1,type:vr,format:yn,colorSpace:Is,depthBuffer:!1},s=Od(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Od(e,t,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=hb(r)),this._blurMaterial=fb(r,e,t)}return s}_compileMaterial(e){const t=new on(this._lodPlanes[0],e);this._renderer.compile(t,Do)}_sceneToCubeUV(e,t,i,s,r){const l=new hn(90,1,t,i),c=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,p=u.toneMapping;u.getClearColor(Ud),u.toneMapping=_i,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null));const x=new Ea({name:"PMREM.Background",side:Qt,depthWrite:!1,depthTest:!1}),m=new on(new Ns,x);let h=!1;const T=e.background;T?T.isColor&&(x.color.copy(T),e.background=null,h=!0):(x.color.copy(Ud),h=!0);for(let w=0;w<6;w++){const M=w%3;M===0?(l.up.set(0,c[w],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+d[w],r.y,r.z)):M===1?(l.up.set(0,0,c[w]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+d[w],r.z)):(l.up.set(0,c[w],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+d[w]));const C=this._cubeSize;Zr(s,M*C,w>2?C:0,C,C),u.setRenderTarget(s),h&&u.render(m,l),u.render(e,l)}m.geometry.dispose(),m.material.dispose(),u.toneMapping=p,u.autoClear=f,e.background=T}_textureToCubeUV(e,t){const i=this._renderer,s=e.mapping===Ps||e.mapping===Ds;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=zd()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Bd());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new on(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;const l=this._cubeSize;Zr(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(a,Do)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Nd[(s-r-1)%Nd.length];this._blur(e,r-1,r,a,o)}t.autoClear=i}_blur(e,t,i,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,s,"latitudinal",r),this._halfBlur(a,e,i,i,s,"longitudinal",r)}_halfBlur(e,t,i,s,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const d=3,u=new on(this._lodPlanes[s],c),f=c.uniforms,p=this._sizeLods[i]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*zi-1),x=r/g,m=isFinite(r)?1+Math.floor(d*x):zi;m>zi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${zi}`);const h=[];let T=0;for(let P=0;P<zi;++P){const F=P/x,E=Math.exp(-F*F/2);h.push(E),P===0?T+=E:P<m&&(T+=2*E)}for(let P=0;P<h.length;P++)h[P]=h[P]/T;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=h,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:w}=this;f.dTheta.value=g,f.mipInt.value=w-i;const M=this._sizeLods[s],C=3*M*(s>w-xs?s-w+xs:0),R=4*(this._cubeSize-M);Zr(t,C,R,3*M,2*M),l.setRenderTarget(t),l.render(u,Do)}}function hb(n){const e=[],t=[],i=[];let s=n;const r=n-xs+1+Ld.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);t.push(o);let l=1/o;a>n-xs?l=Ld[a-n+xs-1]:a===0&&(l=0),i.push(l);const c=1/(o-2),d=-c,u=1+c,f=[d,d,u,d,u,u,d,d,u,u,d,u],p=6,g=6,x=3,m=2,h=1,T=new Float32Array(x*g*p),w=new Float32Array(m*g*p),M=new Float32Array(h*g*p);for(let R=0;R<p;R++){const P=R%3*2/3-1,F=R>2?0:-1,E=[P,F,0,P+2/3,F,0,P+2/3,F+1,0,P,F,0,P+2/3,F+1,0,P,F+1,0];T.set(E,x*g*R),w.set(f,m*g*R);const S=[R,R,R,R,R,R];M.set(S,h*g*R)}const C=new wn;C.setAttribute("position",new Tn(T,x)),C.setAttribute("uv",new Tn(w,m)),C.setAttribute("faceIndex",new Tn(M,h)),e.push(C),s>xs&&s--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function Od(n,e,t){const i=new Wi(n,e,t);return i.texture.mapping=Ha,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Zr(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function fb(n,e,t){const i=new Float32Array(zi),s=new z(0,1,0);return new Ei({name:"SphericalGaussianBlur",defines:{n:zi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:mc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:gi,depthTest:!1,depthWrite:!1})}function Bd(){return new Ei({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:mc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:gi,depthTest:!1,depthWrite:!1})}function zd(){return new Ei({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:mc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:gi,depthTest:!1,depthWrite:!1})}function mc(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function pb(n){let e=new WeakMap,t=null;function i(o){if(o&&o.isTexture){const l=o.mapping,c=l===sl||l===rl,d=l===Ps||l===Ds;if(c||d){let u=e.get(o);const f=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==f)return t===null&&(t=new Fd(n)),u=c?t.fromEquirectangular(o,u):t.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),u.texture;if(u!==void 0)return u.texture;{const p=o.image;return c&&p&&p.height>0||d&&p&&s(p)?(t===null&&(t=new Fd(n)),u=c?t.fromEquirectangular(o):t.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),o.addEventListener("dispose",r),u.texture):null}}}return o}function s(o){let l=0;const c=6;for(let d=0;d<c;d++)o[d]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:a}}function mb(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const s=t(i);return s===null&&hr("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function gb(n,e,t,i){const s={},r=new WeakMap;function a(u){const f=u.target;f.index!==null&&e.remove(f.index);for(const g in f.attributes)e.remove(f.attributes[g]);f.removeEventListener("dispose",a),delete s[f.id];const p=r.get(f);p&&(e.remove(p),r.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function o(u,f){return s[f.id]===!0||(f.addEventListener("dispose",a),s[f.id]=!0,t.memory.geometries++),f}function l(u){const f=u.attributes;for(const p in f)e.update(f[p],n.ARRAY_BUFFER)}function c(u){const f=[],p=u.index,g=u.attributes.position;let x=0;if(p!==null){const T=p.array;x=p.version;for(let w=0,M=T.length;w<M;w+=3){const C=T[w+0],R=T[w+1],P=T[w+2];f.push(C,R,R,P,P,C)}}else if(g!==void 0){const T=g.array;x=g.version;for(let w=0,M=T.length/3-1;w<M;w+=3){const C=w+0,R=w+1,P=w+2;f.push(C,R,R,P,P,C)}}else return;const m=new(Eh(f)?Ch:wh)(f,1);m.version=x;const h=r.get(u);h&&e.remove(h),r.set(u,m)}function d(u){const f=r.get(u);if(f){const p=u.index;p!==null&&f.version<p.version&&c(u)}else c(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:d}}function _b(n,e,t){let i;function s(f){i=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function l(f,p){n.drawElements(i,p,r,f*a),t.update(p,i,1)}function c(f,p,g){g!==0&&(n.drawElementsInstanced(i,p,r,f*a,g),t.update(p,i,g))}function d(f,p,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,r,f,0,g);let m=0;for(let h=0;h<g;h++)m+=p[h];t.update(m,i,1)}function u(f,p,g,x){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let h=0;h<f.length;h++)c(f[h]/a,p[h],x[h]);else{m.multiDrawElementsInstancedWEBGL(i,p,0,r,f,0,x,0,g);let h=0;for(let T=0;T<g;T++)h+=p[T]*x[T];t.update(h,i,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=d,this.renderMultiDrawInstances=u}function vb(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(r/3);break;case n.LINES:t.lines+=o*(r/2);break;case n.LINE_STRIP:t.lines+=o*(r-1);break;case n.LINE_LOOP:t.lines+=o*r;break;case n.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function xb(n,e,t){const i=new WeakMap,s=new Tt;function r(a,o,l){const c=a.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=d!==void 0?d.length:0;let f=i.get(o);if(f===void 0||f.count!==u){let S=function(){F.dispose(),i.delete(o),o.removeEventListener("dispose",S)};var p=S;f!==void 0&&f.texture.dispose();const g=o.morphAttributes.position!==void 0,x=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,h=o.morphAttributes.position||[],T=o.morphAttributes.normal||[],w=o.morphAttributes.color||[];let M=0;g===!0&&(M=1),x===!0&&(M=2),m===!0&&(M=3);let C=o.attributes.position.count*M,R=1;C>e.maxTextureSize&&(R=Math.ceil(C/e.maxTextureSize),C=e.maxTextureSize);const P=new Float32Array(C*R*4*u),F=new Th(P,C,R,u);F.type=Qn,F.needsUpdate=!0;const E=M*4;for(let L=0;L<u;L++){const $=h[L],J=T[L],se=w[L],ie=C*R*4*L;for(let Q=0;Q<$.count;Q++){const ne=Q*E;g===!0&&(s.fromBufferAttribute($,Q),P[ie+ne+0]=s.x,P[ie+ne+1]=s.y,P[ie+ne+2]=s.z,P[ie+ne+3]=0),x===!0&&(s.fromBufferAttribute(J,Q),P[ie+ne+4]=s.x,P[ie+ne+5]=s.y,P[ie+ne+6]=s.z,P[ie+ne+7]=0),m===!0&&(s.fromBufferAttribute(se,Q),P[ie+ne+8]=s.x,P[ie+ne+9]=s.y,P[ie+ne+10]=s.z,P[ie+ne+11]=se.itemSize===4?s.w:1)}}f={count:u,texture:F,size:new He(C,R)},i.set(o,f),o.addEventListener("dispose",S)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const x=o.morphTargetsRelative?1:1-g;l.getUniforms().setValue(n,"morphTargetBaseInfluence",x),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",f.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:r}}function bb(n,e,t,i){let s=new WeakMap;function r(l){const c=i.render.frame,d=l.geometry,u=e.get(l,d);if(s.get(u)!==c&&(e.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;s.get(f)!==c&&(f.update(),s.set(f,c))}return u}function a(){s=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:a}}const Hh=new Yt,Hd=new Nh(1,1),Vh=new Th,kh=new H_,Gh=new Dh,Vd=[],kd=[],Gd=new Float32Array(16),qd=new Float32Array(9),Wd=new Float32Array(4);function Fs(n,e,t){const i=n[0];if(i<=0||i>0)return n;const s=e*t;let r=Vd[s];if(r===void 0&&(r=new Float32Array(s),Vd[s]=r),e!==0){i.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(r,o)}return r}function Rt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Pt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function qa(n,e){let t=kd[e];t===void 0&&(t=new Int32Array(e),kd[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function yb(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function Mb(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Rt(t,e))return;n.uniform2fv(this.addr,e),Pt(t,e)}}function Sb(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Rt(t,e))return;n.uniform3fv(this.addr,e),Pt(t,e)}}function Eb(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Rt(t,e))return;n.uniform4fv(this.addr,e),Pt(t,e)}}function Tb(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Rt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Pt(t,e)}else{if(Rt(t,i))return;Wd.set(i),n.uniformMatrix2fv(this.addr,!1,Wd),Pt(t,i)}}function Ab(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Rt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Pt(t,e)}else{if(Rt(t,i))return;qd.set(i),n.uniformMatrix3fv(this.addr,!1,qd),Pt(t,i)}}function wb(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Rt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Pt(t,e)}else{if(Rt(t,i))return;Gd.set(i),n.uniformMatrix4fv(this.addr,!1,Gd),Pt(t,i)}}function Cb(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function Rb(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Rt(t,e))return;n.uniform2iv(this.addr,e),Pt(t,e)}}function Pb(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Rt(t,e))return;n.uniform3iv(this.addr,e),Pt(t,e)}}function Db(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Rt(t,e))return;n.uniform4iv(this.addr,e),Pt(t,e)}}function Ib(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function Lb(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Rt(t,e))return;n.uniform2uiv(this.addr,e),Pt(t,e)}}function Ub(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Rt(t,e))return;n.uniform3uiv(this.addr,e),Pt(t,e)}}function Nb(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Rt(t,e))return;n.uniform4uiv(this.addr,e),Pt(t,e)}}function Fb(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(Hd.compareFunction=Sh,r=Hd):r=Hh,t.setTexture2D(e||r,s)}function Ob(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||kh,s)}function Bb(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||Gh,s)}function zb(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||Vh,s)}function Hb(n){switch(n){case 5126:return yb;case 35664:return Mb;case 35665:return Sb;case 35666:return Eb;case 35674:return Tb;case 35675:return Ab;case 35676:return wb;case 5124:case 35670:return Cb;case 35667:case 35671:return Rb;case 35668:case 35672:return Pb;case 35669:case 35673:return Db;case 5125:return Ib;case 36294:return Lb;case 36295:return Ub;case 36296:return Nb;case 35678:case 36198:case 36298:case 36306:case 35682:return Fb;case 35679:case 36299:case 36307:return Ob;case 35680:case 36300:case 36308:case 36293:return Bb;case 36289:case 36303:case 36311:case 36292:return zb}}function Vb(n,e){n.uniform1fv(this.addr,e)}function kb(n,e){const t=Fs(e,this.size,2);n.uniform2fv(this.addr,t)}function Gb(n,e){const t=Fs(e,this.size,3);n.uniform3fv(this.addr,t)}function qb(n,e){const t=Fs(e,this.size,4);n.uniform4fv(this.addr,t)}function Wb(n,e){const t=Fs(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function Xb(n,e){const t=Fs(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function jb(n,e){const t=Fs(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function $b(n,e){n.uniform1iv(this.addr,e)}function Yb(n,e){n.uniform2iv(this.addr,e)}function Kb(n,e){n.uniform3iv(this.addr,e)}function Zb(n,e){n.uniform4iv(this.addr,e)}function Jb(n,e){n.uniform1uiv(this.addr,e)}function Qb(n,e){n.uniform2uiv(this.addr,e)}function ey(n,e){n.uniform3uiv(this.addr,e)}function ty(n,e){n.uniform4uiv(this.addr,e)}function ny(n,e,t){const i=this.cache,s=e.length,r=qa(t,s);Rt(i,r)||(n.uniform1iv(this.addr,r),Pt(i,r));for(let a=0;a!==s;++a)t.setTexture2D(e[a]||Hh,r[a])}function iy(n,e,t){const i=this.cache,s=e.length,r=qa(t,s);Rt(i,r)||(n.uniform1iv(this.addr,r),Pt(i,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||kh,r[a])}function sy(n,e,t){const i=this.cache,s=e.length,r=qa(t,s);Rt(i,r)||(n.uniform1iv(this.addr,r),Pt(i,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||Gh,r[a])}function ry(n,e,t){const i=this.cache,s=e.length,r=qa(t,s);Rt(i,r)||(n.uniform1iv(this.addr,r),Pt(i,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Vh,r[a])}function ay(n){switch(n){case 5126:return Vb;case 35664:return kb;case 35665:return Gb;case 35666:return qb;case 35674:return Wb;case 35675:return Xb;case 35676:return jb;case 5124:case 35670:return $b;case 35667:case 35671:return Yb;case 35668:case 35672:return Kb;case 35669:case 35673:return Zb;case 5125:return Jb;case 36294:return Qb;case 36295:return ey;case 36296:return ty;case 35678:case 36198:case 36298:case 36306:case 35682:return ny;case 35679:case 36299:case 36307:return iy;case 35680:case 36300:case 36308:case 36293:return sy;case 36289:case 36303:case 36311:case 36292:return ry}}class oy{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Hb(t.type)}}class ly{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=ay(t.type)}}class cy{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],i)}}}const Fo=/(\w+)(\])?(\[|\.)?/g;function Xd(n,e){n.seq.push(e),n.map[e.id]=e}function dy(n,e,t){const i=n.name,s=i.length;for(Fo.lastIndex=0;;){const r=Fo.exec(i),a=Fo.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){Xd(t,c===void 0?new oy(o,n,e):new ly(o,n,e));break}else{let u=t.map[o];u===void 0&&(u=new cy(o),Xd(t,u)),t=u}}}class da{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const r=e.getActiveUniform(t,s),a=e.getUniformLocation(t,r.name);dy(r,a,this)}}setValue(e,t,i,s){const r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){const s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){const i=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&i.push(a)}return i}}function jd(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const uy=37297;let hy=0;function fy(n,e){const t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}const $d=new Ye;function py(n){tt._getMatrix($d,tt.workingColorSpace,n);const e=`mat3( ${$d.elements.map(t=>t.toFixed(4))} )`;switch(tt.getTransfer(n)){case ya:return[e,"LinearTransferOETF"];case ct:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Yd(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=(n.getShaderInfoLog(e)||"").trim();if(i&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+fy(n.getShaderSource(e),o)}else return r}function my(n,e){const t=py(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function gy(n,e){let t;switch(e){case f_:t="Linear";break;case p_:t="Reinhard";break;case m_:t="Cineon";break;case g_:t="ACESFilmic";break;case v_:t="AgX";break;case x_:t="Neutral";break;case __:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Jr=new z;function _y(){tt.getLuminanceCoefficients(Jr);const n=Jr.x.toFixed(4),e=Jr.y.toFixed(4),t=Jr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function vy(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ys).join(`
`)}function xy(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function by(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(e,s),a=r.name;let o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function Ys(n){return n!==""}function Kd(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Zd(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const yy=/^[ \t]*#include +<([\w\d./]+)>/gm;function zl(n){return n.replace(yy,Sy)}const My=new Map;function Sy(n,e){let t=Ke[e];if(t===void 0){const i=My.get(e);if(i!==void 0)t=Ke[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return zl(t)}const Ey=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Jd(n){return n.replace(Ey,Ty)}function Ty(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Qd(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Ay(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===uh?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===Xg?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Yn&&(e="SHADOWMAP_TYPE_VSM"),e}function wy(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Ps:case Ds:e="ENVMAP_TYPE_CUBE";break;case Ha:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Cy(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case Ds:e="ENVMAP_MODE_REFRACTION";break}return e}function Ry(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case hh:e="ENVMAP_BLENDING_MULTIPLY";break;case u_:e="ENVMAP_BLENDING_MIX";break;case h_:e="ENVMAP_BLENDING_ADD";break}return e}function Py(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function Dy(n,e,t,i){const s=n.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=Ay(t),c=wy(t),d=Cy(t),u=Ry(t),f=Py(t),p=vy(t),g=xy(r),x=s.createProgram();let m,h,T=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Ys).join(`
`),m.length>0&&(m+=`
`),h=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Ys).join(`
`),h.length>0&&(h+=`
`)):(m=[Qd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ys).join(`
`),h=[Qd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+d:"",t.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==_i?"#define TONE_MAPPING":"",t.toneMapping!==_i?Ke.tonemapping_pars_fragment:"",t.toneMapping!==_i?gy("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ke.colorspace_pars_fragment,my("linearToOutputTexel",t.outputColorSpace),_y(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ys).join(`
`)),a=zl(a),a=Kd(a,t),a=Zd(a,t),o=zl(o),o=Kd(o,t),o=Zd(o,t),a=Jd(a),o=Jd(o),t.isRawShaderMaterial!==!0&&(T=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,h=["#define varying in",t.glslVersion===rd?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===rd?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+h);const w=T+m+a,M=T+h+o,C=jd(s,s.VERTEX_SHADER,w),R=jd(s,s.FRAGMENT_SHADER,M);s.attachShader(x,C),s.attachShader(x,R),t.index0AttributeName!==void 0?s.bindAttribLocation(x,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function P(L){if(n.debug.checkShaderErrors){const $=s.getProgramInfoLog(x)||"",J=s.getShaderInfoLog(C)||"",se=s.getShaderInfoLog(R)||"",ie=$.trim(),Q=J.trim(),ne=se.trim();let V=!0,me=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(V=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,x,C,R);else{const ye=Yd(s,C,"vertex"),Le=Yd(s,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+ie+`
`+ye+`
`+Le)}else ie!==""?console.warn("THREE.WebGLProgram: Program Info Log:",ie):(Q===""||ne==="")&&(me=!1);me&&(L.diagnostics={runnable:V,programLog:ie,vertexShader:{log:Q,prefix:m},fragmentShader:{log:ne,prefix:h}})}s.deleteShader(C),s.deleteShader(R),F=new da(s,x),E=by(s,x)}let F;this.getUniforms=function(){return F===void 0&&P(this),F};let E;this.getAttributes=function(){return E===void 0&&P(this),E};let S=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=s.getProgramParameter(x,uy)),S},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=hy++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=C,this.fragmentShader=R,this}let Iy=0;class Ly{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new Uy(e),t.set(e,i)),i}}class Uy{constructor(e){this.id=Iy++,this.code=e,this.usedTimes=0}}function Ny(n,e,t,i,s,r,a){const o=new fc,l=new Ly,c=new Set,d=[],u=s.logarithmicDepthBuffer,f=s.vertexTextures;let p=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(E){return c.add(E),E===0?"uv":`uv${E}`}function m(E,S,L,$,J){const se=$.fog,ie=J.geometry,Q=E.isMeshStandardMaterial?$.environment:null,ne=(E.isMeshStandardMaterial?t:e).get(E.envMap||Q),V=ne&&ne.mapping===Ha?ne.image.height:null,me=g[E.type];E.precision!==null&&(p=s.getMaxPrecision(E.precision),p!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",p,"instead."));const ye=ie.morphAttributes.position||ie.morphAttributes.normal||ie.morphAttributes.color,Le=ye!==void 0?ye.length:0;let ke=0;ie.morphAttributes.position!==void 0&&(ke=1),ie.morphAttributes.normal!==void 0&&(ke=2),ie.morphAttributes.color!==void 0&&(ke=3);let it,ot,_e,k;if(me){const st=In[me];it=st.vertexShader,ot=st.fragmentShader}else it=E.vertexShader,ot=E.fragmentShader,l.update(E),_e=l.getVertexShaderID(E),k=l.getFragmentShaderID(E);const Z=n.getRenderTarget(),ue=n.state.buffers.depth.getReversed(),ve=J.isInstancedMesh===!0,le=J.isBatchedMesh===!0,Be=!!E.map,A=!!E.matcap,_=!!ne,H=!!E.aoMap,X=!!E.lightMap,G=!!E.bumpMap,O=!!E.normalMap,oe=!!E.displacementMap,j=!!E.emissiveMap,ee=!!E.metalnessMap,re=!!E.roughnessMap,Ee=E.anisotropy>0,b=E.clearcoat>0,v=E.dispersion>0,I=E.iridescence>0,q=E.sheen>0,te=E.transmission>0,W=Ee&&!!E.anisotropyMap,Ae=b&&!!E.clearcoatMap,ce=b&&!!E.clearcoatNormalMap,we=b&&!!E.clearcoatRoughnessMap,Ce=I&&!!E.iridescenceMap,de=I&&!!E.iridescenceThicknessMap,Me=q&&!!E.sheenColorMap,Ne=q&&!!E.sheenRoughnessMap,Re=!!E.specularMap,xe=!!E.specularColorMap,Xe=!!E.specularIntensityMap,U=te&&!!E.transmissionMap,pe=te&&!!E.thicknessMap,ge=!!E.gradientMap,Ue=!!E.alphaMap,he=E.alphaTest>0,ae=!!E.alphaHash,Oe=!!E.extensions;let je=_i;E.toneMapped&&(Z===null||Z.isXRRenderTarget===!0)&&(je=n.toneMapping);const pt={shaderID:me,shaderType:E.type,shaderName:E.name,vertexShader:it,fragmentShader:ot,defines:E.defines,customVertexShaderID:_e,customFragmentShaderID:k,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:p,batching:le,batchingColor:le&&J._colorsTexture!==null,instancing:ve,instancingColor:ve&&J.instanceColor!==null,instancingMorph:ve&&J.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:Z===null?n.outputColorSpace:Z.isXRRenderTarget===!0?Z.texture.colorSpace:Is,alphaToCoverage:!!E.alphaToCoverage,map:Be,matcap:A,envMap:_,envMapMode:_&&ne.mapping,envMapCubeUVHeight:V,aoMap:H,lightMap:X,bumpMap:G,normalMap:O,displacementMap:f&&oe,emissiveMap:j,normalMapObjectSpace:O&&E.normalMapType===S_,normalMapTangentSpace:O&&E.normalMapType===Mh,metalnessMap:ee,roughnessMap:re,anisotropy:Ee,anisotropyMap:W,clearcoat:b,clearcoatMap:Ae,clearcoatNormalMap:ce,clearcoatRoughnessMap:we,dispersion:v,iridescence:I,iridescenceMap:Ce,iridescenceThicknessMap:de,sheen:q,sheenColorMap:Me,sheenRoughnessMap:Ne,specularMap:Re,specularColorMap:xe,specularIntensityMap:Xe,transmission:te,transmissionMap:U,thicknessMap:pe,gradientMap:ge,opaque:E.transparent===!1&&E.blending===As&&E.alphaToCoverage===!1,alphaMap:Ue,alphaTest:he,alphaHash:ae,combine:E.combine,mapUv:Be&&x(E.map.channel),aoMapUv:H&&x(E.aoMap.channel),lightMapUv:X&&x(E.lightMap.channel),bumpMapUv:G&&x(E.bumpMap.channel),normalMapUv:O&&x(E.normalMap.channel),displacementMapUv:oe&&x(E.displacementMap.channel),emissiveMapUv:j&&x(E.emissiveMap.channel),metalnessMapUv:ee&&x(E.metalnessMap.channel),roughnessMapUv:re&&x(E.roughnessMap.channel),anisotropyMapUv:W&&x(E.anisotropyMap.channel),clearcoatMapUv:Ae&&x(E.clearcoatMap.channel),clearcoatNormalMapUv:ce&&x(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:we&&x(E.clearcoatRoughnessMap.channel),iridescenceMapUv:Ce&&x(E.iridescenceMap.channel),iridescenceThicknessMapUv:de&&x(E.iridescenceThicknessMap.channel),sheenColorMapUv:Me&&x(E.sheenColorMap.channel),sheenRoughnessMapUv:Ne&&x(E.sheenRoughnessMap.channel),specularMapUv:Re&&x(E.specularMap.channel),specularColorMapUv:xe&&x(E.specularColorMap.channel),specularIntensityMapUv:Xe&&x(E.specularIntensityMap.channel),transmissionMapUv:U&&x(E.transmissionMap.channel),thicknessMapUv:pe&&x(E.thicknessMap.channel),alphaMapUv:Ue&&x(E.alphaMap.channel),vertexTangents:!!ie.attributes.tangent&&(O||Ee),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!ie.attributes.color&&ie.attributes.color.itemSize===4,pointsUvs:J.isPoints===!0&&!!ie.attributes.uv&&(Be||Ue),fog:!!se,useFog:E.fog===!0,fogExp2:!!se&&se.isFogExp2,flatShading:E.flatShading===!0&&E.wireframe===!1,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:ue,skinning:J.isSkinnedMesh===!0,morphTargets:ie.morphAttributes.position!==void 0,morphNormals:ie.morphAttributes.normal!==void 0,morphColors:ie.morphAttributes.color!==void 0,morphTargetsCount:Le,morphTextureStride:ke,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:E.dithering,shadowMapEnabled:n.shadowMap.enabled&&L.length>0,shadowMapType:n.shadowMap.type,toneMapping:je,decodeVideoTexture:Be&&E.map.isVideoTexture===!0&&tt.getTransfer(E.map.colorSpace)===ct,decodeVideoTextureEmissive:j&&E.emissiveMap.isVideoTexture===!0&&tt.getTransfer(E.emissiveMap.colorSpace)===ct,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===bn,flipSided:E.side===Qt,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:Oe&&E.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Oe&&E.extensions.multiDraw===!0||le)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return pt.vertexUv1s=c.has(1),pt.vertexUv2s=c.has(2),pt.vertexUv3s=c.has(3),c.clear(),pt}function h(E){const S=[];if(E.shaderID?S.push(E.shaderID):(S.push(E.customVertexShaderID),S.push(E.customFragmentShaderID)),E.defines!==void 0)for(const L in E.defines)S.push(L),S.push(E.defines[L]);return E.isRawShaderMaterial===!1&&(T(S,E),w(S,E),S.push(n.outputColorSpace)),S.push(E.customProgramCacheKey),S.join()}function T(E,S){E.push(S.precision),E.push(S.outputColorSpace),E.push(S.envMapMode),E.push(S.envMapCubeUVHeight),E.push(S.mapUv),E.push(S.alphaMapUv),E.push(S.lightMapUv),E.push(S.aoMapUv),E.push(S.bumpMapUv),E.push(S.normalMapUv),E.push(S.displacementMapUv),E.push(S.emissiveMapUv),E.push(S.metalnessMapUv),E.push(S.roughnessMapUv),E.push(S.anisotropyMapUv),E.push(S.clearcoatMapUv),E.push(S.clearcoatNormalMapUv),E.push(S.clearcoatRoughnessMapUv),E.push(S.iridescenceMapUv),E.push(S.iridescenceThicknessMapUv),E.push(S.sheenColorMapUv),E.push(S.sheenRoughnessMapUv),E.push(S.specularMapUv),E.push(S.specularColorMapUv),E.push(S.specularIntensityMapUv),E.push(S.transmissionMapUv),E.push(S.thicknessMapUv),E.push(S.combine),E.push(S.fogExp2),E.push(S.sizeAttenuation),E.push(S.morphTargetsCount),E.push(S.morphAttributeCount),E.push(S.numDirLights),E.push(S.numPointLights),E.push(S.numSpotLights),E.push(S.numSpotLightMaps),E.push(S.numHemiLights),E.push(S.numRectAreaLights),E.push(S.numDirLightShadows),E.push(S.numPointLightShadows),E.push(S.numSpotLightShadows),E.push(S.numSpotLightShadowsWithMaps),E.push(S.numLightProbes),E.push(S.shadowMapType),E.push(S.toneMapping),E.push(S.numClippingPlanes),E.push(S.numClipIntersection),E.push(S.depthPacking)}function w(E,S){o.disableAll(),S.supportsVertexTextures&&o.enable(0),S.instancing&&o.enable(1),S.instancingColor&&o.enable(2),S.instancingMorph&&o.enable(3),S.matcap&&o.enable(4),S.envMap&&o.enable(5),S.normalMapObjectSpace&&o.enable(6),S.normalMapTangentSpace&&o.enable(7),S.clearcoat&&o.enable(8),S.iridescence&&o.enable(9),S.alphaTest&&o.enable(10),S.vertexColors&&o.enable(11),S.vertexAlphas&&o.enable(12),S.vertexUv1s&&o.enable(13),S.vertexUv2s&&o.enable(14),S.vertexUv3s&&o.enable(15),S.vertexTangents&&o.enable(16),S.anisotropy&&o.enable(17),S.alphaHash&&o.enable(18),S.batching&&o.enable(19),S.dispersion&&o.enable(20),S.batchingColor&&o.enable(21),S.gradientMap&&o.enable(22),E.push(o.mask),o.disableAll(),S.fog&&o.enable(0),S.useFog&&o.enable(1),S.flatShading&&o.enable(2),S.logarithmicDepthBuffer&&o.enable(3),S.reversedDepthBuffer&&o.enable(4),S.skinning&&o.enable(5),S.morphTargets&&o.enable(6),S.morphNormals&&o.enable(7),S.morphColors&&o.enable(8),S.premultipliedAlpha&&o.enable(9),S.shadowMapEnabled&&o.enable(10),S.doubleSided&&o.enable(11),S.flipSided&&o.enable(12),S.useDepthPacking&&o.enable(13),S.dithering&&o.enable(14),S.transmission&&o.enable(15),S.sheen&&o.enable(16),S.opaque&&o.enable(17),S.pointsUvs&&o.enable(18),S.decodeVideoTexture&&o.enable(19),S.decodeVideoTextureEmissive&&o.enable(20),S.alphaToCoverage&&o.enable(21),E.push(o.mask)}function M(E){const S=g[E.type];let L;if(S){const $=In[S];L=Q_.clone($.uniforms)}else L=E.uniforms;return L}function C(E,S){let L;for(let $=0,J=d.length;$<J;$++){const se=d[$];if(se.cacheKey===S){L=se,++L.usedTimes;break}}return L===void 0&&(L=new Dy(n,S,E,r),d.push(L)),L}function R(E){if(--E.usedTimes===0){const S=d.indexOf(E);d[S]=d[d.length-1],d.pop(),E.destroy()}}function P(E){l.remove(E)}function F(){l.dispose()}return{getParameters:m,getProgramCacheKey:h,getUniforms:M,acquireProgram:C,releaseProgram:R,releaseShaderCache:P,programs:d,dispose:F}}function Fy(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function s(a,o,l){n.get(a)[o]=l}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:r}}function Oy(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function eu(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function tu(){const n=[];let e=0;const t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function a(u,f,p,g,x,m){let h=n[e];return h===void 0?(h={id:u.id,object:u,geometry:f,material:p,groupOrder:g,renderOrder:u.renderOrder,z:x,group:m},n[e]=h):(h.id=u.id,h.object=u,h.geometry=f,h.material=p,h.groupOrder=g,h.renderOrder=u.renderOrder,h.z=x,h.group=m),e++,h}function o(u,f,p,g,x,m){const h=a(u,f,p,g,x,m);p.transmission>0?i.push(h):p.transparent===!0?s.push(h):t.push(h)}function l(u,f,p,g,x,m){const h=a(u,f,p,g,x,m);p.transmission>0?i.unshift(h):p.transparent===!0?s.unshift(h):t.unshift(h)}function c(u,f){t.length>1&&t.sort(u||Oy),i.length>1&&i.sort(f||eu),s.length>1&&s.sort(f||eu)}function d(){for(let u=e,f=n.length;u<f;u++){const p=n[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:o,unshift:l,finish:d,sort:c}}function By(){let n=new WeakMap;function e(i,s){const r=n.get(i);let a;return r===void 0?(a=new tu,n.set(i,[a])):s>=r.length?(a=new tu,r.push(a)):a=r[s],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function zy(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new z,color:new Qe};break;case"SpotLight":t={position:new z,direction:new z,color:new Qe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new z,color:new Qe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new z,skyColor:new Qe,groundColor:new Qe};break;case"RectAreaLight":t={color:new Qe,position:new z,halfWidth:new z,halfHeight:new z};break}return n[e.id]=t,t}}}function Hy(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new He};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new He};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new He,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let Vy=0;function ky(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function Gy(n){const e=new zy,t=Hy(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new z);const s=new z,r=new bt,a=new bt;function o(c){let d=0,u=0,f=0;for(let E=0;E<9;E++)i.probe[E].set(0,0,0);let p=0,g=0,x=0,m=0,h=0,T=0,w=0,M=0,C=0,R=0,P=0;c.sort(ky);for(let E=0,S=c.length;E<S;E++){const L=c[E],$=L.color,J=L.intensity,se=L.distance,ie=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)d+=$.r*J,u+=$.g*J,f+=$.b*J;else if(L.isLightProbe){for(let Q=0;Q<9;Q++)i.probe[Q].addScaledVector(L.sh.coefficients[Q],J);P++}else if(L.isDirectionalLight){const Q=e.get(L);if(Q.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const ne=L.shadow,V=t.get(L);V.shadowIntensity=ne.intensity,V.shadowBias=ne.bias,V.shadowNormalBias=ne.normalBias,V.shadowRadius=ne.radius,V.shadowMapSize=ne.mapSize,i.directionalShadow[p]=V,i.directionalShadowMap[p]=ie,i.directionalShadowMatrix[p]=L.shadow.matrix,T++}i.directional[p]=Q,p++}else if(L.isSpotLight){const Q=e.get(L);Q.position.setFromMatrixPosition(L.matrixWorld),Q.color.copy($).multiplyScalar(J),Q.distance=se,Q.coneCos=Math.cos(L.angle),Q.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),Q.decay=L.decay,i.spot[x]=Q;const ne=L.shadow;if(L.map&&(i.spotLightMap[C]=L.map,C++,ne.updateMatrices(L),L.castShadow&&R++),i.spotLightMatrix[x]=ne.matrix,L.castShadow){const V=t.get(L);V.shadowIntensity=ne.intensity,V.shadowBias=ne.bias,V.shadowNormalBias=ne.normalBias,V.shadowRadius=ne.radius,V.shadowMapSize=ne.mapSize,i.spotShadow[x]=V,i.spotShadowMap[x]=ie,M++}x++}else if(L.isRectAreaLight){const Q=e.get(L);Q.color.copy($).multiplyScalar(J),Q.halfWidth.set(L.width*.5,0,0),Q.halfHeight.set(0,L.height*.5,0),i.rectArea[m]=Q,m++}else if(L.isPointLight){const Q=e.get(L);if(Q.color.copy(L.color).multiplyScalar(L.intensity),Q.distance=L.distance,Q.decay=L.decay,L.castShadow){const ne=L.shadow,V=t.get(L);V.shadowIntensity=ne.intensity,V.shadowBias=ne.bias,V.shadowNormalBias=ne.normalBias,V.shadowRadius=ne.radius,V.shadowMapSize=ne.mapSize,V.shadowCameraNear=ne.camera.near,V.shadowCameraFar=ne.camera.far,i.pointShadow[g]=V,i.pointShadowMap[g]=ie,i.pointShadowMatrix[g]=L.shadow.matrix,w++}i.point[g]=Q,g++}else if(L.isHemisphereLight){const Q=e.get(L);Q.skyColor.copy(L.color).multiplyScalar(J),Q.groundColor.copy(L.groundColor).multiplyScalar(J),i.hemi[h]=Q,h++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=be.LTC_FLOAT_1,i.rectAreaLTC2=be.LTC_FLOAT_2):(i.rectAreaLTC1=be.LTC_HALF_1,i.rectAreaLTC2=be.LTC_HALF_2)),i.ambient[0]=d,i.ambient[1]=u,i.ambient[2]=f;const F=i.hash;(F.directionalLength!==p||F.pointLength!==g||F.spotLength!==x||F.rectAreaLength!==m||F.hemiLength!==h||F.numDirectionalShadows!==T||F.numPointShadows!==w||F.numSpotShadows!==M||F.numSpotMaps!==C||F.numLightProbes!==P)&&(i.directional.length=p,i.spot.length=x,i.rectArea.length=m,i.point.length=g,i.hemi.length=h,i.directionalShadow.length=T,i.directionalShadowMap.length=T,i.pointShadow.length=w,i.pointShadowMap.length=w,i.spotShadow.length=M,i.spotShadowMap.length=M,i.directionalShadowMatrix.length=T,i.pointShadowMatrix.length=w,i.spotLightMatrix.length=M+C-R,i.spotLightMap.length=C,i.numSpotLightShadowsWithMaps=R,i.numLightProbes=P,F.directionalLength=p,F.pointLength=g,F.spotLength=x,F.rectAreaLength=m,F.hemiLength=h,F.numDirectionalShadows=T,F.numPointShadows=w,F.numSpotShadows=M,F.numSpotMaps=C,F.numLightProbes=P,i.version=Vy++)}function l(c,d){let u=0,f=0,p=0,g=0,x=0;const m=d.matrixWorldInverse;for(let h=0,T=c.length;h<T;h++){const w=c[h];if(w.isDirectionalLight){const M=i.directional[u];M.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),u++}else if(w.isSpotLight){const M=i.spot[p];M.position.setFromMatrixPosition(w.matrixWorld),M.position.applyMatrix4(m),M.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),p++}else if(w.isRectAreaLight){const M=i.rectArea[g];M.position.setFromMatrixPosition(w.matrixWorld),M.position.applyMatrix4(m),a.identity(),r.copy(w.matrixWorld),r.premultiply(m),a.extractRotation(r),M.halfWidth.set(w.width*.5,0,0),M.halfHeight.set(0,w.height*.5,0),M.halfWidth.applyMatrix4(a),M.halfHeight.applyMatrix4(a),g++}else if(w.isPointLight){const M=i.point[f];M.position.setFromMatrixPosition(w.matrixWorld),M.position.applyMatrix4(m),f++}else if(w.isHemisphereLight){const M=i.hemi[x];M.direction.setFromMatrixPosition(w.matrixWorld),M.direction.transformDirection(m),x++}}}return{setup:o,setupView:l,state:i}}function nu(n){const e=new Gy(n),t=[],i=[];function s(d){c.camera=d,t.length=0,i.length=0}function r(d){t.push(d)}function a(d){i.push(d)}function o(){e.setup(t)}function l(d){e.setupView(t,d)}const c={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function qy(n){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new nu(n),e.set(s,[o])):r>=a.length?(o=new nu(n),a.push(o)):o=a[r],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const Wy=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Xy=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function jy(n,e,t){let i=new pc;const s=new He,r=new He,a=new Tt,o=new pv({depthPacking:M_}),l=new mv,c={},d=t.maxTextureSize,u={[Si]:Qt,[Qt]:Si,[bn]:bn},f=new Ei({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new He},radius:{value:4}},vertexShader:Wy,fragmentShader:Xy}),p=f.clone();p.defines.HORIZONTAL_PASS=1;const g=new wn;g.setAttribute("position",new Tn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new on(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=uh;let h=this.type;this.render=function(R,P,F){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||R.length===0)return;const E=n.getRenderTarget(),S=n.getActiveCubeFace(),L=n.getActiveMipmapLevel(),$=n.state;$.setBlending(gi),$.buffers.depth.getReversed()===!0?$.buffers.color.setClear(0,0,0,0):$.buffers.color.setClear(1,1,1,1),$.buffers.depth.setTest(!0),$.setScissorTest(!1);const J=h!==Yn&&this.type===Yn,se=h===Yn&&this.type!==Yn;for(let ie=0,Q=R.length;ie<Q;ie++){const ne=R[ie],V=ne.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",ne,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;s.copy(V.mapSize);const me=V.getFrameExtents();if(s.multiply(me),r.copy(V.mapSize),(s.x>d||s.y>d)&&(s.x>d&&(r.x=Math.floor(d/me.x),s.x=r.x*me.x,V.mapSize.x=r.x),s.y>d&&(r.y=Math.floor(d/me.y),s.y=r.y*me.y,V.mapSize.y=r.y)),V.map===null||J===!0||se===!0){const Le=this.type!==Yn?{minFilter:En,magFilter:En}:{};V.map!==null&&V.map.dispose(),V.map=new Wi(s.x,s.y,Le),V.map.texture.name=ne.name+".shadowMap",V.camera.updateProjectionMatrix()}n.setRenderTarget(V.map),n.clear();const ye=V.getViewportCount();for(let Le=0;Le<ye;Le++){const ke=V.getViewport(Le);a.set(r.x*ke.x,r.y*ke.y,r.x*ke.z,r.y*ke.w),$.viewport(a),V.updateMatrices(ne,Le),i=V.getFrustum(),M(P,F,V.camera,ne,this.type)}V.isPointLightShadow!==!0&&this.type===Yn&&T(V,F),V.needsUpdate=!1}h=this.type,m.needsUpdate=!1,n.setRenderTarget(E,S,L)};function T(R,P){const F=e.update(x);f.defines.VSM_SAMPLES!==R.blurSamples&&(f.defines.VSM_SAMPLES=R.blurSamples,p.defines.VSM_SAMPLES=R.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new Wi(s.x,s.y)),f.uniforms.shadow_pass.value=R.map.texture,f.uniforms.resolution.value=R.mapSize,f.uniforms.radius.value=R.radius,n.setRenderTarget(R.mapPass),n.clear(),n.renderBufferDirect(P,null,F,f,x,null),p.uniforms.shadow_pass.value=R.mapPass.texture,p.uniforms.resolution.value=R.mapSize,p.uniforms.radius.value=R.radius,n.setRenderTarget(R.map),n.clear(),n.renderBufferDirect(P,null,F,p,x,null)}function w(R,P,F,E){let S=null;const L=F.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(L!==void 0)S=L;else if(S=F.isPointLight===!0?l:o,n.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){const $=S.uuid,J=P.uuid;let se=c[$];se===void 0&&(se={},c[$]=se);let ie=se[J];ie===void 0&&(ie=S.clone(),se[J]=ie,P.addEventListener("dispose",C)),S=ie}if(S.visible=P.visible,S.wireframe=P.wireframe,E===Yn?S.side=P.shadowSide!==null?P.shadowSide:P.side:S.side=P.shadowSide!==null?P.shadowSide:u[P.side],S.alphaMap=P.alphaMap,S.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,S.map=P.map,S.clipShadows=P.clipShadows,S.clippingPlanes=P.clippingPlanes,S.clipIntersection=P.clipIntersection,S.displacementMap=P.displacementMap,S.displacementScale=P.displacementScale,S.displacementBias=P.displacementBias,S.wireframeLinewidth=P.wireframeLinewidth,S.linewidth=P.linewidth,F.isPointLight===!0&&S.isMeshDistanceMaterial===!0){const $=n.properties.get(S);$.light=F}return S}function M(R,P,F,E,S){if(R.visible===!1)return;if(R.layers.test(P.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&S===Yn)&&(!R.frustumCulled||i.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse,R.matrixWorld);const J=e.update(R),se=R.material;if(Array.isArray(se)){const ie=J.groups;for(let Q=0,ne=ie.length;Q<ne;Q++){const V=ie[Q],me=se[V.materialIndex];if(me&&me.visible){const ye=w(R,me,E,S);R.onBeforeShadow(n,R,P,F,J,ye,V),n.renderBufferDirect(F,null,J,ye,R,V),R.onAfterShadow(n,R,P,F,J,ye,V)}}}else if(se.visible){const ie=w(R,se,E,S);R.onBeforeShadow(n,R,P,F,J,ie,null),n.renderBufferDirect(F,null,J,ie,R,null),R.onAfterShadow(n,R,P,F,J,ie,null)}}const $=R.children;for(let J=0,se=$.length;J<se;J++)M($[J],P,F,E,S)}function C(R){R.target.removeEventListener("dispose",C);for(const F in c){const E=c[F],S=R.target.uuid;S in E&&(E[S].dispose(),delete E[S])}}}const $y={[Zo]:Jo,[Qo]:nl,[el]:il,[Rs]:tl,[Jo]:Zo,[nl]:Qo,[il]:el,[tl]:Rs};function Yy(n,e){function t(){let U=!1;const pe=new Tt;let ge=null;const Ue=new Tt(0,0,0,0);return{setMask:function(he){ge!==he&&!U&&(n.colorMask(he,he,he,he),ge=he)},setLocked:function(he){U=he},setClear:function(he,ae,Oe,je,pt){pt===!0&&(he*=je,ae*=je,Oe*=je),pe.set(he,ae,Oe,je),Ue.equals(pe)===!1&&(n.clearColor(he,ae,Oe,je),Ue.copy(pe))},reset:function(){U=!1,ge=null,Ue.set(-1,0,0,0)}}}function i(){let U=!1,pe=!1,ge=null,Ue=null,he=null;return{setReversed:function(ae){if(pe!==ae){const Oe=e.get("EXT_clip_control");ae?Oe.clipControlEXT(Oe.LOWER_LEFT_EXT,Oe.ZERO_TO_ONE_EXT):Oe.clipControlEXT(Oe.LOWER_LEFT_EXT,Oe.NEGATIVE_ONE_TO_ONE_EXT),pe=ae;const je=he;he=null,this.setClear(je)}},getReversed:function(){return pe},setTest:function(ae){ae?Z(n.DEPTH_TEST):ue(n.DEPTH_TEST)},setMask:function(ae){ge!==ae&&!U&&(n.depthMask(ae),ge=ae)},setFunc:function(ae){if(pe&&(ae=$y[ae]),Ue!==ae){switch(ae){case Zo:n.depthFunc(n.NEVER);break;case Jo:n.depthFunc(n.ALWAYS);break;case Qo:n.depthFunc(n.LESS);break;case Rs:n.depthFunc(n.LEQUAL);break;case el:n.depthFunc(n.EQUAL);break;case tl:n.depthFunc(n.GEQUAL);break;case nl:n.depthFunc(n.GREATER);break;case il:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}Ue=ae}},setLocked:function(ae){U=ae},setClear:function(ae){he!==ae&&(pe&&(ae=1-ae),n.clearDepth(ae),he=ae)},reset:function(){U=!1,ge=null,Ue=null,he=null,pe=!1}}}function s(){let U=!1,pe=null,ge=null,Ue=null,he=null,ae=null,Oe=null,je=null,pt=null;return{setTest:function(st){U||(st?Z(n.STENCIL_TEST):ue(n.STENCIL_TEST))},setMask:function(st){pe!==st&&!U&&(n.stencilMask(st),pe=st)},setFunc:function(st,kn,Cn){(ge!==st||Ue!==kn||he!==Cn)&&(n.stencilFunc(st,kn,Cn),ge=st,Ue=kn,he=Cn)},setOp:function(st,kn,Cn){(ae!==st||Oe!==kn||je!==Cn)&&(n.stencilOp(st,kn,Cn),ae=st,Oe=kn,je=Cn)},setLocked:function(st){U=st},setClear:function(st){pt!==st&&(n.clearStencil(st),pt=st)},reset:function(){U=!1,pe=null,ge=null,Ue=null,he=null,ae=null,Oe=null,je=null,pt=null}}}const r=new t,a=new i,o=new s,l=new WeakMap,c=new WeakMap;let d={},u={},f=new WeakMap,p=[],g=null,x=!1,m=null,h=null,T=null,w=null,M=null,C=null,R=null,P=new Qe(0,0,0),F=0,E=!1,S=null,L=null,$=null,J=null,se=null;const ie=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Q=!1,ne=0;const V=n.getParameter(n.VERSION);V.indexOf("WebGL")!==-1?(ne=parseFloat(/^WebGL (\d)/.exec(V)[1]),Q=ne>=1):V.indexOf("OpenGL ES")!==-1&&(ne=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),Q=ne>=2);let me=null,ye={};const Le=n.getParameter(n.SCISSOR_BOX),ke=n.getParameter(n.VIEWPORT),it=new Tt().fromArray(Le),ot=new Tt().fromArray(ke);function _e(U,pe,ge,Ue){const he=new Uint8Array(4),ae=n.createTexture();n.bindTexture(U,ae),n.texParameteri(U,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(U,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Oe=0;Oe<ge;Oe++)U===n.TEXTURE_3D||U===n.TEXTURE_2D_ARRAY?n.texImage3D(pe,0,n.RGBA,1,1,Ue,0,n.RGBA,n.UNSIGNED_BYTE,he):n.texImage2D(pe+Oe,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,he);return ae}const k={};k[n.TEXTURE_2D]=_e(n.TEXTURE_2D,n.TEXTURE_2D,1),k[n.TEXTURE_CUBE_MAP]=_e(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),k[n.TEXTURE_2D_ARRAY]=_e(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),k[n.TEXTURE_3D]=_e(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),Z(n.DEPTH_TEST),a.setFunc(Rs),G(!1),O(ed),Z(n.CULL_FACE),H(gi);function Z(U){d[U]!==!0&&(n.enable(U),d[U]=!0)}function ue(U){d[U]!==!1&&(n.disable(U),d[U]=!1)}function ve(U,pe){return u[U]!==pe?(n.bindFramebuffer(U,pe),u[U]=pe,U===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=pe),U===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=pe),!0):!1}function le(U,pe){let ge=p,Ue=!1;if(U){ge=f.get(pe),ge===void 0&&(ge=[],f.set(pe,ge));const he=U.textures;if(ge.length!==he.length||ge[0]!==n.COLOR_ATTACHMENT0){for(let ae=0,Oe=he.length;ae<Oe;ae++)ge[ae]=n.COLOR_ATTACHMENT0+ae;ge.length=he.length,Ue=!0}}else ge[0]!==n.BACK&&(ge[0]=n.BACK,Ue=!0);Ue&&n.drawBuffers(ge)}function Be(U){return g!==U?(n.useProgram(U),g=U,!0):!1}const A={[Bi]:n.FUNC_ADD,[$g]:n.FUNC_SUBTRACT,[Yg]:n.FUNC_REVERSE_SUBTRACT};A[Kg]=n.MIN,A[Zg]=n.MAX;const _={[Jg]:n.ZERO,[Qg]:n.ONE,[e_]:n.SRC_COLOR,[Yo]:n.SRC_ALPHA,[a_]:n.SRC_ALPHA_SATURATE,[s_]:n.DST_COLOR,[n_]:n.DST_ALPHA,[t_]:n.ONE_MINUS_SRC_COLOR,[Ko]:n.ONE_MINUS_SRC_ALPHA,[r_]:n.ONE_MINUS_DST_COLOR,[i_]:n.ONE_MINUS_DST_ALPHA,[o_]:n.CONSTANT_COLOR,[l_]:n.ONE_MINUS_CONSTANT_COLOR,[c_]:n.CONSTANT_ALPHA,[d_]:n.ONE_MINUS_CONSTANT_ALPHA};function H(U,pe,ge,Ue,he,ae,Oe,je,pt,st){if(U===gi){x===!0&&(ue(n.BLEND),x=!1);return}if(x===!1&&(Z(n.BLEND),x=!0),U!==jg){if(U!==m||st!==E){if((h!==Bi||M!==Bi)&&(n.blendEquation(n.FUNC_ADD),h=Bi,M=Bi),st)switch(U){case As:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case td:n.blendFunc(n.ONE,n.ONE);break;case nd:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case id:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case As:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case td:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case nd:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case id:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}T=null,w=null,C=null,R=null,P.set(0,0,0),F=0,m=U,E=st}return}he=he||pe,ae=ae||ge,Oe=Oe||Ue,(pe!==h||he!==M)&&(n.blendEquationSeparate(A[pe],A[he]),h=pe,M=he),(ge!==T||Ue!==w||ae!==C||Oe!==R)&&(n.blendFuncSeparate(_[ge],_[Ue],_[ae],_[Oe]),T=ge,w=Ue,C=ae,R=Oe),(je.equals(P)===!1||pt!==F)&&(n.blendColor(je.r,je.g,je.b,pt),P.copy(je),F=pt),m=U,E=!1}function X(U,pe){U.side===bn?ue(n.CULL_FACE):Z(n.CULL_FACE);let ge=U.side===Qt;pe&&(ge=!ge),G(ge),U.blending===As&&U.transparent===!1?H(gi):H(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),a.setFunc(U.depthFunc),a.setTest(U.depthTest),a.setMask(U.depthWrite),r.setMask(U.colorWrite);const Ue=U.stencilWrite;o.setTest(Ue),Ue&&(o.setMask(U.stencilWriteMask),o.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),o.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),j(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?Z(n.SAMPLE_ALPHA_TO_COVERAGE):ue(n.SAMPLE_ALPHA_TO_COVERAGE)}function G(U){S!==U&&(U?n.frontFace(n.CW):n.frontFace(n.CCW),S=U)}function O(U){U!==qg?(Z(n.CULL_FACE),U!==L&&(U===ed?n.cullFace(n.BACK):U===Wg?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):ue(n.CULL_FACE),L=U}function oe(U){U!==$&&(Q&&n.lineWidth(U),$=U)}function j(U,pe,ge){U?(Z(n.POLYGON_OFFSET_FILL),(J!==pe||se!==ge)&&(n.polygonOffset(pe,ge),J=pe,se=ge)):ue(n.POLYGON_OFFSET_FILL)}function ee(U){U?Z(n.SCISSOR_TEST):ue(n.SCISSOR_TEST)}function re(U){U===void 0&&(U=n.TEXTURE0+ie-1),me!==U&&(n.activeTexture(U),me=U)}function Ee(U,pe,ge){ge===void 0&&(me===null?ge=n.TEXTURE0+ie-1:ge=me);let Ue=ye[ge];Ue===void 0&&(Ue={type:void 0,texture:void 0},ye[ge]=Ue),(Ue.type!==U||Ue.texture!==pe)&&(me!==ge&&(n.activeTexture(ge),me=ge),n.bindTexture(U,pe||k[U]),Ue.type=U,Ue.texture=pe)}function b(){const U=ye[me];U!==void 0&&U.type!==void 0&&(n.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function v(){try{n.compressedTexImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function I(){try{n.compressedTexImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function q(){try{n.texSubImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function te(){try{n.texSubImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function W(){try{n.compressedTexSubImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ae(){try{n.compressedTexSubImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ce(){try{n.texStorage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function we(){try{n.texStorage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ce(){try{n.texImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function de(){try{n.texImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Me(U){it.equals(U)===!1&&(n.scissor(U.x,U.y,U.z,U.w),it.copy(U))}function Ne(U){ot.equals(U)===!1&&(n.viewport(U.x,U.y,U.z,U.w),ot.copy(U))}function Re(U,pe){let ge=c.get(pe);ge===void 0&&(ge=new WeakMap,c.set(pe,ge));let Ue=ge.get(U);Ue===void 0&&(Ue=n.getUniformBlockIndex(pe,U.name),ge.set(U,Ue))}function xe(U,pe){const Ue=c.get(pe).get(U);l.get(pe)!==Ue&&(n.uniformBlockBinding(pe,Ue,U.__bindingPointIndex),l.set(pe,Ue))}function Xe(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),d={},me=null,ye={},u={},f=new WeakMap,p=[],g=null,x=!1,m=null,h=null,T=null,w=null,M=null,C=null,R=null,P=new Qe(0,0,0),F=0,E=!1,S=null,L=null,$=null,J=null,se=null,it.set(0,0,n.canvas.width,n.canvas.height),ot.set(0,0,n.canvas.width,n.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:Z,disable:ue,bindFramebuffer:ve,drawBuffers:le,useProgram:Be,setBlending:H,setMaterial:X,setFlipSided:G,setCullFace:O,setLineWidth:oe,setPolygonOffset:j,setScissorTest:ee,activeTexture:re,bindTexture:Ee,unbindTexture:b,compressedTexImage2D:v,compressedTexImage3D:I,texImage2D:Ce,texImage3D:de,updateUBOMapping:Re,uniformBlockBinding:xe,texStorage2D:ce,texStorage3D:we,texSubImage2D:q,texSubImage3D:te,compressedTexSubImage2D:W,compressedTexSubImage3D:Ae,scissor:Me,viewport:Ne,reset:Xe}}function Ky(n,e,t,i,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new He,d=new WeakMap;let u;const f=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(b,v){return p?new OffscreenCanvas(b,v):Sa("canvas")}function x(b,v,I){let q=1;const te=Ee(b);if((te.width>I||te.height>I)&&(q=I/Math.max(te.width,te.height)),q<1)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap||typeof VideoFrame<"u"&&b instanceof VideoFrame){const W=Math.floor(q*te.width),Ae=Math.floor(q*te.height);u===void 0&&(u=g(W,Ae));const ce=v?g(W,Ae):u;return ce.width=W,ce.height=Ae,ce.getContext("2d").drawImage(b,0,0,W,Ae),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+te.width+"x"+te.height+") to ("+W+"x"+Ae+")."),ce}else return"data"in b&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+te.width+"x"+te.height+")."),b;return b}function m(b){return b.generateMipmaps}function h(b){n.generateMipmap(b)}function T(b){return b.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:b.isWebGL3DRenderTarget?n.TEXTURE_3D:b.isWebGLArrayRenderTarget||b.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function w(b,v,I,q,te=!1){if(b!==null){if(n[b]!==void 0)return n[b];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let W=v;if(v===n.RED&&(I===n.FLOAT&&(W=n.R32F),I===n.HALF_FLOAT&&(W=n.R16F),I===n.UNSIGNED_BYTE&&(W=n.R8)),v===n.RED_INTEGER&&(I===n.UNSIGNED_BYTE&&(W=n.R8UI),I===n.UNSIGNED_SHORT&&(W=n.R16UI),I===n.UNSIGNED_INT&&(W=n.R32UI),I===n.BYTE&&(W=n.R8I),I===n.SHORT&&(W=n.R16I),I===n.INT&&(W=n.R32I)),v===n.RG&&(I===n.FLOAT&&(W=n.RG32F),I===n.HALF_FLOAT&&(W=n.RG16F),I===n.UNSIGNED_BYTE&&(W=n.RG8)),v===n.RG_INTEGER&&(I===n.UNSIGNED_BYTE&&(W=n.RG8UI),I===n.UNSIGNED_SHORT&&(W=n.RG16UI),I===n.UNSIGNED_INT&&(W=n.RG32UI),I===n.BYTE&&(W=n.RG8I),I===n.SHORT&&(W=n.RG16I),I===n.INT&&(W=n.RG32I)),v===n.RGB_INTEGER&&(I===n.UNSIGNED_BYTE&&(W=n.RGB8UI),I===n.UNSIGNED_SHORT&&(W=n.RGB16UI),I===n.UNSIGNED_INT&&(W=n.RGB32UI),I===n.BYTE&&(W=n.RGB8I),I===n.SHORT&&(W=n.RGB16I),I===n.INT&&(W=n.RGB32I)),v===n.RGBA_INTEGER&&(I===n.UNSIGNED_BYTE&&(W=n.RGBA8UI),I===n.UNSIGNED_SHORT&&(W=n.RGBA16UI),I===n.UNSIGNED_INT&&(W=n.RGBA32UI),I===n.BYTE&&(W=n.RGBA8I),I===n.SHORT&&(W=n.RGBA16I),I===n.INT&&(W=n.RGBA32I)),v===n.RGB&&(I===n.UNSIGNED_INT_5_9_9_9_REV&&(W=n.RGB9_E5),I===n.UNSIGNED_INT_10F_11F_11F_REV&&(W=n.R11F_G11F_B10F)),v===n.RGBA){const Ae=te?ya:tt.getTransfer(q);I===n.FLOAT&&(W=n.RGBA32F),I===n.HALF_FLOAT&&(W=n.RGBA16F),I===n.UNSIGNED_BYTE&&(W=Ae===ct?n.SRGB8_ALPHA8:n.RGBA8),I===n.UNSIGNED_SHORT_4_4_4_4&&(W=n.RGBA4),I===n.UNSIGNED_SHORT_5_5_5_1&&(W=n.RGB5_A1)}return(W===n.R16F||W===n.R32F||W===n.RG16F||W===n.RG32F||W===n.RGBA16F||W===n.RGBA32F)&&e.get("EXT_color_buffer_float"),W}function M(b,v){let I;return b?v===null||v===Gi||v===cr?I=n.DEPTH24_STENCIL8:v===Qn?I=n.DEPTH32F_STENCIL8:v===lr&&(I=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===Gi||v===cr?I=n.DEPTH_COMPONENT24:v===Qn?I=n.DEPTH_COMPONENT32F:v===lr&&(I=n.DEPTH_COMPONENT16),I}function C(b,v){return m(b)===!0||b.isFramebufferTexture&&b.minFilter!==En&&b.minFilter!==Nn?Math.log2(Math.max(v.width,v.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?v.mipmaps.length:1}function R(b){const v=b.target;v.removeEventListener("dispose",R),F(v),v.isVideoTexture&&d.delete(v)}function P(b){const v=b.target;v.removeEventListener("dispose",P),S(v)}function F(b){const v=i.get(b);if(v.__webglInit===void 0)return;const I=b.source,q=f.get(I);if(q){const te=q[v.__cacheKey];te.usedTimes--,te.usedTimes===0&&E(b),Object.keys(q).length===0&&f.delete(I)}i.remove(b)}function E(b){const v=i.get(b);n.deleteTexture(v.__webglTexture);const I=b.source,q=f.get(I);delete q[v.__cacheKey],a.memory.textures--}function S(b){const v=i.get(b);if(b.depthTexture&&(b.depthTexture.dispose(),i.remove(b.depthTexture)),b.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(v.__webglFramebuffer[q]))for(let te=0;te<v.__webglFramebuffer[q].length;te++)n.deleteFramebuffer(v.__webglFramebuffer[q][te]);else n.deleteFramebuffer(v.__webglFramebuffer[q]);v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer[q])}else{if(Array.isArray(v.__webglFramebuffer))for(let q=0;q<v.__webglFramebuffer.length;q++)n.deleteFramebuffer(v.__webglFramebuffer[q]);else n.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&n.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let q=0;q<v.__webglColorRenderbuffer.length;q++)v.__webglColorRenderbuffer[q]&&n.deleteRenderbuffer(v.__webglColorRenderbuffer[q]);v.__webglDepthRenderbuffer&&n.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const I=b.textures;for(let q=0,te=I.length;q<te;q++){const W=i.get(I[q]);W.__webglTexture&&(n.deleteTexture(W.__webglTexture),a.memory.textures--),i.remove(I[q])}i.remove(b)}let L=0;function $(){L=0}function J(){const b=L;return b>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+s.maxTextures),L+=1,b}function se(b){const v=[];return v.push(b.wrapS),v.push(b.wrapT),v.push(b.wrapR||0),v.push(b.magFilter),v.push(b.minFilter),v.push(b.anisotropy),v.push(b.internalFormat),v.push(b.format),v.push(b.type),v.push(b.generateMipmaps),v.push(b.premultiplyAlpha),v.push(b.flipY),v.push(b.unpackAlignment),v.push(b.colorSpace),v.join()}function ie(b,v){const I=i.get(b);if(b.isVideoTexture&&ee(b),b.isRenderTargetTexture===!1&&b.isExternalTexture!==!0&&b.version>0&&I.__version!==b.version){const q=b.image;if(q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{k(I,b,v);return}}else b.isExternalTexture&&(I.__webglTexture=b.sourceTexture?b.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,I.__webglTexture,n.TEXTURE0+v)}function Q(b,v){const I=i.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&I.__version!==b.version){k(I,b,v);return}t.bindTexture(n.TEXTURE_2D_ARRAY,I.__webglTexture,n.TEXTURE0+v)}function ne(b,v){const I=i.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&I.__version!==b.version){k(I,b,v);return}t.bindTexture(n.TEXTURE_3D,I.__webglTexture,n.TEXTURE0+v)}function V(b,v){const I=i.get(b);if(b.version>0&&I.__version!==b.version){Z(I,b,v);return}t.bindTexture(n.TEXTURE_CUBE_MAP,I.__webglTexture,n.TEXTURE0+v)}const me={[al]:n.REPEAT,[Hi]:n.CLAMP_TO_EDGE,[ol]:n.MIRRORED_REPEAT},ye={[En]:n.NEAREST,[b_]:n.NEAREST_MIPMAP_NEAREST,[Ar]:n.NEAREST_MIPMAP_LINEAR,[Nn]:n.LINEAR,[io]:n.LINEAR_MIPMAP_NEAREST,[Vi]:n.LINEAR_MIPMAP_LINEAR},Le={[E_]:n.NEVER,[P_]:n.ALWAYS,[T_]:n.LESS,[Sh]:n.LEQUAL,[A_]:n.EQUAL,[R_]:n.GEQUAL,[w_]:n.GREATER,[C_]:n.NOTEQUAL};function ke(b,v){if(v.type===Qn&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===Nn||v.magFilter===io||v.magFilter===Ar||v.magFilter===Vi||v.minFilter===Nn||v.minFilter===io||v.minFilter===Ar||v.minFilter===Vi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(b,n.TEXTURE_WRAP_S,me[v.wrapS]),n.texParameteri(b,n.TEXTURE_WRAP_T,me[v.wrapT]),(b===n.TEXTURE_3D||b===n.TEXTURE_2D_ARRAY)&&n.texParameteri(b,n.TEXTURE_WRAP_R,me[v.wrapR]),n.texParameteri(b,n.TEXTURE_MAG_FILTER,ye[v.magFilter]),n.texParameteri(b,n.TEXTURE_MIN_FILTER,ye[v.minFilter]),v.compareFunction&&(n.texParameteri(b,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(b,n.TEXTURE_COMPARE_FUNC,Le[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===En||v.minFilter!==Ar&&v.minFilter!==Vi||v.type===Qn&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||i.get(v).__currentAnisotropy){const I=e.get("EXT_texture_filter_anisotropic");n.texParameterf(b,I.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),i.get(v).__currentAnisotropy=v.anisotropy}}}function it(b,v){let I=!1;b.__webglInit===void 0&&(b.__webglInit=!0,v.addEventListener("dispose",R));const q=v.source;let te=f.get(q);te===void 0&&(te={},f.set(q,te));const W=se(v);if(W!==b.__cacheKey){te[W]===void 0&&(te[W]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,I=!0),te[W].usedTimes++;const Ae=te[b.__cacheKey];Ae!==void 0&&(te[b.__cacheKey].usedTimes--,Ae.usedTimes===0&&E(v)),b.__cacheKey=W,b.__webglTexture=te[W].texture}return I}function ot(b,v,I){return Math.floor(Math.floor(b/I)/v)}function _e(b,v,I,q){const W=b.updateRanges;if(W.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,v.width,v.height,I,q,v.data);else{W.sort((de,Me)=>de.start-Me.start);let Ae=0;for(let de=1;de<W.length;de++){const Me=W[Ae],Ne=W[de],Re=Me.start+Me.count,xe=ot(Ne.start,v.width,4),Xe=ot(Me.start,v.width,4);Ne.start<=Re+1&&xe===Xe&&ot(Ne.start+Ne.count-1,v.width,4)===xe?Me.count=Math.max(Me.count,Ne.start+Ne.count-Me.start):(++Ae,W[Ae]=Ne)}W.length=Ae+1;const ce=n.getParameter(n.UNPACK_ROW_LENGTH),we=n.getParameter(n.UNPACK_SKIP_PIXELS),Ce=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,v.width);for(let de=0,Me=W.length;de<Me;de++){const Ne=W[de],Re=Math.floor(Ne.start/4),xe=Math.ceil(Ne.count/4),Xe=Re%v.width,U=Math.floor(Re/v.width),pe=xe,ge=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,Xe),n.pixelStorei(n.UNPACK_SKIP_ROWS,U),t.texSubImage2D(n.TEXTURE_2D,0,Xe,U,pe,ge,I,q,v.data)}b.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,ce),n.pixelStorei(n.UNPACK_SKIP_PIXELS,we),n.pixelStorei(n.UNPACK_SKIP_ROWS,Ce)}}function k(b,v,I){let q=n.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(q=n.TEXTURE_2D_ARRAY),v.isData3DTexture&&(q=n.TEXTURE_3D);const te=it(b,v),W=v.source;t.bindTexture(q,b.__webglTexture,n.TEXTURE0+I);const Ae=i.get(W);if(W.version!==Ae.__version||te===!0){t.activeTexture(n.TEXTURE0+I);const ce=tt.getPrimaries(tt.workingColorSpace),we=v.colorSpace===pi?null:tt.getPrimaries(v.colorSpace),Ce=v.colorSpace===pi||ce===we?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ce);let de=x(v.image,!1,s.maxTextureSize);de=re(v,de);const Me=r.convert(v.format,v.colorSpace),Ne=r.convert(v.type);let Re=w(v.internalFormat,Me,Ne,v.colorSpace,v.isVideoTexture);ke(q,v);let xe;const Xe=v.mipmaps,U=v.isVideoTexture!==!0,pe=Ae.__version===void 0||te===!0,ge=W.dataReady,Ue=C(v,de);if(v.isDepthTexture)Re=M(v.format===ur,v.type),pe&&(U?t.texStorage2D(n.TEXTURE_2D,1,Re,de.width,de.height):t.texImage2D(n.TEXTURE_2D,0,Re,de.width,de.height,0,Me,Ne,null));else if(v.isDataTexture)if(Xe.length>0){U&&pe&&t.texStorage2D(n.TEXTURE_2D,Ue,Re,Xe[0].width,Xe[0].height);for(let he=0,ae=Xe.length;he<ae;he++)xe=Xe[he],U?ge&&t.texSubImage2D(n.TEXTURE_2D,he,0,0,xe.width,xe.height,Me,Ne,xe.data):t.texImage2D(n.TEXTURE_2D,he,Re,xe.width,xe.height,0,Me,Ne,xe.data);v.generateMipmaps=!1}else U?(pe&&t.texStorage2D(n.TEXTURE_2D,Ue,Re,de.width,de.height),ge&&_e(v,de,Me,Ne)):t.texImage2D(n.TEXTURE_2D,0,Re,de.width,de.height,0,Me,Ne,de.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){U&&pe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Ue,Re,Xe[0].width,Xe[0].height,de.depth);for(let he=0,ae=Xe.length;he<ae;he++)if(xe=Xe[he],v.format!==yn)if(Me!==null)if(U){if(ge)if(v.layerUpdates.size>0){const Oe=Id(xe.width,xe.height,v.format,v.type);for(const je of v.layerUpdates){const pt=xe.data.subarray(je*Oe/xe.data.BYTES_PER_ELEMENT,(je+1)*Oe/xe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,he,0,0,je,xe.width,xe.height,1,Me,pt)}v.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,he,0,0,0,xe.width,xe.height,de.depth,Me,xe.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,he,Re,xe.width,xe.height,de.depth,0,xe.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else U?ge&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,he,0,0,0,xe.width,xe.height,de.depth,Me,Ne,xe.data):t.texImage3D(n.TEXTURE_2D_ARRAY,he,Re,xe.width,xe.height,de.depth,0,Me,Ne,xe.data)}else{U&&pe&&t.texStorage2D(n.TEXTURE_2D,Ue,Re,Xe[0].width,Xe[0].height);for(let he=0,ae=Xe.length;he<ae;he++)xe=Xe[he],v.format!==yn?Me!==null?U?ge&&t.compressedTexSubImage2D(n.TEXTURE_2D,he,0,0,xe.width,xe.height,Me,xe.data):t.compressedTexImage2D(n.TEXTURE_2D,he,Re,xe.width,xe.height,0,xe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):U?ge&&t.texSubImage2D(n.TEXTURE_2D,he,0,0,xe.width,xe.height,Me,Ne,xe.data):t.texImage2D(n.TEXTURE_2D,he,Re,xe.width,xe.height,0,Me,Ne,xe.data)}else if(v.isDataArrayTexture)if(U){if(pe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Ue,Re,de.width,de.height,de.depth),ge)if(v.layerUpdates.size>0){const he=Id(de.width,de.height,v.format,v.type);for(const ae of v.layerUpdates){const Oe=de.data.subarray(ae*he/de.data.BYTES_PER_ELEMENT,(ae+1)*he/de.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,ae,de.width,de.height,1,Me,Ne,Oe)}v.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,de.width,de.height,de.depth,Me,Ne,de.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Re,de.width,de.height,de.depth,0,Me,Ne,de.data);else if(v.isData3DTexture)U?(pe&&t.texStorage3D(n.TEXTURE_3D,Ue,Re,de.width,de.height,de.depth),ge&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,de.width,de.height,de.depth,Me,Ne,de.data)):t.texImage3D(n.TEXTURE_3D,0,Re,de.width,de.height,de.depth,0,Me,Ne,de.data);else if(v.isFramebufferTexture){if(pe)if(U)t.texStorage2D(n.TEXTURE_2D,Ue,Re,de.width,de.height);else{let he=de.width,ae=de.height;for(let Oe=0;Oe<Ue;Oe++)t.texImage2D(n.TEXTURE_2D,Oe,Re,he,ae,0,Me,Ne,null),he>>=1,ae>>=1}}else if(Xe.length>0){if(U&&pe){const he=Ee(Xe[0]);t.texStorage2D(n.TEXTURE_2D,Ue,Re,he.width,he.height)}for(let he=0,ae=Xe.length;he<ae;he++)xe=Xe[he],U?ge&&t.texSubImage2D(n.TEXTURE_2D,he,0,0,Me,Ne,xe):t.texImage2D(n.TEXTURE_2D,he,Re,Me,Ne,xe);v.generateMipmaps=!1}else if(U){if(pe){const he=Ee(de);t.texStorage2D(n.TEXTURE_2D,Ue,Re,he.width,he.height)}ge&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,Me,Ne,de)}else t.texImage2D(n.TEXTURE_2D,0,Re,Me,Ne,de);m(v)&&h(q),Ae.__version=W.version,v.onUpdate&&v.onUpdate(v)}b.__version=v.version}function Z(b,v,I){if(v.image.length!==6)return;const q=it(b,v),te=v.source;t.bindTexture(n.TEXTURE_CUBE_MAP,b.__webglTexture,n.TEXTURE0+I);const W=i.get(te);if(te.version!==W.__version||q===!0){t.activeTexture(n.TEXTURE0+I);const Ae=tt.getPrimaries(tt.workingColorSpace),ce=v.colorSpace===pi?null:tt.getPrimaries(v.colorSpace),we=v.colorSpace===pi||Ae===ce?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,we);const Ce=v.isCompressedTexture||v.image[0].isCompressedTexture,de=v.image[0]&&v.image[0].isDataTexture,Me=[];for(let ae=0;ae<6;ae++)!Ce&&!de?Me[ae]=x(v.image[ae],!0,s.maxCubemapSize):Me[ae]=de?v.image[ae].image:v.image[ae],Me[ae]=re(v,Me[ae]);const Ne=Me[0],Re=r.convert(v.format,v.colorSpace),xe=r.convert(v.type),Xe=w(v.internalFormat,Re,xe,v.colorSpace),U=v.isVideoTexture!==!0,pe=W.__version===void 0||q===!0,ge=te.dataReady;let Ue=C(v,Ne);ke(n.TEXTURE_CUBE_MAP,v);let he;if(Ce){U&&pe&&t.texStorage2D(n.TEXTURE_CUBE_MAP,Ue,Xe,Ne.width,Ne.height);for(let ae=0;ae<6;ae++){he=Me[ae].mipmaps;for(let Oe=0;Oe<he.length;Oe++){const je=he[Oe];v.format!==yn?Re!==null?U?ge&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Oe,0,0,je.width,je.height,Re,je.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Oe,Xe,je.width,je.height,0,je.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):U?ge&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Oe,0,0,je.width,je.height,Re,xe,je.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Oe,Xe,je.width,je.height,0,Re,xe,je.data)}}}else{if(he=v.mipmaps,U&&pe){he.length>0&&Ue++;const ae=Ee(Me[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,Ue,Xe,ae.width,ae.height)}for(let ae=0;ae<6;ae++)if(de){U?ge&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,Me[ae].width,Me[ae].height,Re,xe,Me[ae].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,Xe,Me[ae].width,Me[ae].height,0,Re,xe,Me[ae].data);for(let Oe=0;Oe<he.length;Oe++){const pt=he[Oe].image[ae].image;U?ge&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Oe+1,0,0,pt.width,pt.height,Re,xe,pt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Oe+1,Xe,pt.width,pt.height,0,Re,xe,pt.data)}}else{U?ge&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,Re,xe,Me[ae]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,Xe,Re,xe,Me[ae]);for(let Oe=0;Oe<he.length;Oe++){const je=he[Oe];U?ge&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Oe+1,0,0,Re,xe,je.image[ae]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Oe+1,Xe,Re,xe,je.image[ae])}}}m(v)&&h(n.TEXTURE_CUBE_MAP),W.__version=te.version,v.onUpdate&&v.onUpdate(v)}b.__version=v.version}function ue(b,v,I,q,te,W){const Ae=r.convert(I.format,I.colorSpace),ce=r.convert(I.type),we=w(I.internalFormat,Ae,ce,I.colorSpace),Ce=i.get(v),de=i.get(I);if(de.__renderTarget=v,!Ce.__hasExternalTextures){const Me=Math.max(1,v.width>>W),Ne=Math.max(1,v.height>>W);te===n.TEXTURE_3D||te===n.TEXTURE_2D_ARRAY?t.texImage3D(te,W,we,Me,Ne,v.depth,0,Ae,ce,null):t.texImage2D(te,W,we,Me,Ne,0,Ae,ce,null)}t.bindFramebuffer(n.FRAMEBUFFER,b),j(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,q,te,de.__webglTexture,0,oe(v)):(te===n.TEXTURE_2D||te>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&te<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,q,te,de.__webglTexture,W),t.bindFramebuffer(n.FRAMEBUFFER,null)}function ve(b,v,I){if(n.bindRenderbuffer(n.RENDERBUFFER,b),v.depthBuffer){const q=v.depthTexture,te=q&&q.isDepthTexture?q.type:null,W=M(v.stencilBuffer,te),Ae=v.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ce=oe(v);j(v)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ce,W,v.width,v.height):I?n.renderbufferStorageMultisample(n.RENDERBUFFER,ce,W,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,W,v.width,v.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Ae,n.RENDERBUFFER,b)}else{const q=v.textures;for(let te=0;te<q.length;te++){const W=q[te],Ae=r.convert(W.format,W.colorSpace),ce=r.convert(W.type),we=w(W.internalFormat,Ae,ce,W.colorSpace),Ce=oe(v);I&&j(v)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Ce,we,v.width,v.height):j(v)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Ce,we,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,we,v.width,v.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function le(b,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,b),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const q=i.get(v.depthTexture);q.__renderTarget=v,(!q.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),ie(v.depthTexture,0);const te=q.__webglTexture,W=oe(v);if(v.depthTexture.format===dr)j(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,te,0,W):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,te,0);else if(v.depthTexture.format===ur)j(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,te,0,W):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,te,0);else throw new Error("Unknown depthTexture format")}function Be(b){const v=i.get(b),I=b.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==b.depthTexture){const q=b.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),q){const te=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,q.removeEventListener("dispose",te)};q.addEventListener("dispose",te),v.__depthDisposeCallback=te}v.__boundDepthTexture=q}if(b.depthTexture&&!v.__autoAllocateDepthBuffer){if(I)throw new Error("target.depthTexture not supported in Cube render targets");const q=b.texture.mipmaps;q&&q.length>0?le(v.__webglFramebuffer[0],b):le(v.__webglFramebuffer,b)}else if(I){v.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[q]),v.__webglDepthbuffer[q]===void 0)v.__webglDepthbuffer[q]=n.createRenderbuffer(),ve(v.__webglDepthbuffer[q],b,!1);else{const te=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,W=v.__webglDepthbuffer[q];n.bindRenderbuffer(n.RENDERBUFFER,W),n.framebufferRenderbuffer(n.FRAMEBUFFER,te,n.RENDERBUFFER,W)}}else{const q=b.texture.mipmaps;if(q&&q.length>0?t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=n.createRenderbuffer(),ve(v.__webglDepthbuffer,b,!1);else{const te=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,W=v.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,W),n.framebufferRenderbuffer(n.FRAMEBUFFER,te,n.RENDERBUFFER,W)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function A(b,v,I){const q=i.get(b);v!==void 0&&ue(q.__webglFramebuffer,b,b.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),I!==void 0&&Be(b)}function _(b){const v=b.texture,I=i.get(b),q=i.get(v);b.addEventListener("dispose",P);const te=b.textures,W=b.isWebGLCubeRenderTarget===!0,Ae=te.length>1;if(Ae||(q.__webglTexture===void 0&&(q.__webglTexture=n.createTexture()),q.__version=v.version,a.memory.textures++),W){I.__webglFramebuffer=[];for(let ce=0;ce<6;ce++)if(v.mipmaps&&v.mipmaps.length>0){I.__webglFramebuffer[ce]=[];for(let we=0;we<v.mipmaps.length;we++)I.__webglFramebuffer[ce][we]=n.createFramebuffer()}else I.__webglFramebuffer[ce]=n.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){I.__webglFramebuffer=[];for(let ce=0;ce<v.mipmaps.length;ce++)I.__webglFramebuffer[ce]=n.createFramebuffer()}else I.__webglFramebuffer=n.createFramebuffer();if(Ae)for(let ce=0,we=te.length;ce<we;ce++){const Ce=i.get(te[ce]);Ce.__webglTexture===void 0&&(Ce.__webglTexture=n.createTexture(),a.memory.textures++)}if(b.samples>0&&j(b)===!1){I.__webglMultisampledFramebuffer=n.createFramebuffer(),I.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,I.__webglMultisampledFramebuffer);for(let ce=0;ce<te.length;ce++){const we=te[ce];I.__webglColorRenderbuffer[ce]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,I.__webglColorRenderbuffer[ce]);const Ce=r.convert(we.format,we.colorSpace),de=r.convert(we.type),Me=w(we.internalFormat,Ce,de,we.colorSpace,b.isXRRenderTarget===!0),Ne=oe(b);n.renderbufferStorageMultisample(n.RENDERBUFFER,Ne,Me,b.width,b.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ce,n.RENDERBUFFER,I.__webglColorRenderbuffer[ce])}n.bindRenderbuffer(n.RENDERBUFFER,null),b.depthBuffer&&(I.__webglDepthRenderbuffer=n.createRenderbuffer(),ve(I.__webglDepthRenderbuffer,b,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(W){t.bindTexture(n.TEXTURE_CUBE_MAP,q.__webglTexture),ke(n.TEXTURE_CUBE_MAP,v);for(let ce=0;ce<6;ce++)if(v.mipmaps&&v.mipmaps.length>0)for(let we=0;we<v.mipmaps.length;we++)ue(I.__webglFramebuffer[ce][we],b,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ce,we);else ue(I.__webglFramebuffer[ce],b,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0);m(v)&&h(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ae){for(let ce=0,we=te.length;ce<we;ce++){const Ce=te[ce],de=i.get(Ce);let Me=n.TEXTURE_2D;(b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(Me=b.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(Me,de.__webglTexture),ke(Me,Ce),ue(I.__webglFramebuffer,b,Ce,n.COLOR_ATTACHMENT0+ce,Me,0),m(Ce)&&h(Me)}t.unbindTexture()}else{let ce=n.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(ce=b.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ce,q.__webglTexture),ke(ce,v),v.mipmaps&&v.mipmaps.length>0)for(let we=0;we<v.mipmaps.length;we++)ue(I.__webglFramebuffer[we],b,v,n.COLOR_ATTACHMENT0,ce,we);else ue(I.__webglFramebuffer,b,v,n.COLOR_ATTACHMENT0,ce,0);m(v)&&h(ce),t.unbindTexture()}b.depthBuffer&&Be(b)}function H(b){const v=b.textures;for(let I=0,q=v.length;I<q;I++){const te=v[I];if(m(te)){const W=T(b),Ae=i.get(te).__webglTexture;t.bindTexture(W,Ae),h(W),t.unbindTexture()}}}const X=[],G=[];function O(b){if(b.samples>0){if(j(b)===!1){const v=b.textures,I=b.width,q=b.height;let te=n.COLOR_BUFFER_BIT;const W=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Ae=i.get(b),ce=v.length>1;if(ce)for(let Ce=0;Ce<v.length;Ce++)t.bindFramebuffer(n.FRAMEBUFFER,Ae.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ce,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,Ae.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ce,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,Ae.__webglMultisampledFramebuffer);const we=b.texture.mipmaps;we&&we.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ae.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ae.__webglFramebuffer);for(let Ce=0;Ce<v.length;Ce++){if(b.resolveDepthBuffer&&(b.depthBuffer&&(te|=n.DEPTH_BUFFER_BIT),b.stencilBuffer&&b.resolveStencilBuffer&&(te|=n.STENCIL_BUFFER_BIT)),ce){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Ae.__webglColorRenderbuffer[Ce]);const de=i.get(v[Ce]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,de,0)}n.blitFramebuffer(0,0,I,q,0,0,I,q,te,n.NEAREST),l===!0&&(X.length=0,G.length=0,X.push(n.COLOR_ATTACHMENT0+Ce),b.depthBuffer&&b.resolveDepthBuffer===!1&&(X.push(W),G.push(W),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,G)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,X))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ce)for(let Ce=0;Ce<v.length;Ce++){t.bindFramebuffer(n.FRAMEBUFFER,Ae.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ce,n.RENDERBUFFER,Ae.__webglColorRenderbuffer[Ce]);const de=i.get(v[Ce]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,Ae.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ce,n.TEXTURE_2D,de,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ae.__webglMultisampledFramebuffer)}else if(b.depthBuffer&&b.resolveDepthBuffer===!1&&l){const v=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[v])}}}function oe(b){return Math.min(s.maxSamples,b.samples)}function j(b){const v=i.get(b);return b.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function ee(b){const v=a.render.frame;d.get(b)!==v&&(d.set(b,v),b.update())}function re(b,v){const I=b.colorSpace,q=b.format,te=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||I!==Is&&I!==pi&&(tt.getTransfer(I)===ct?(q!==yn||te!==Hn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",I)),v}function Ee(b){return typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement?(c.width=b.naturalWidth||b.width,c.height=b.naturalHeight||b.height):typeof VideoFrame<"u"&&b instanceof VideoFrame?(c.width=b.displayWidth,c.height=b.displayHeight):(c.width=b.width,c.height=b.height),c}this.allocateTextureUnit=J,this.resetTextureUnits=$,this.setTexture2D=ie,this.setTexture2DArray=Q,this.setTexture3D=ne,this.setTextureCube=V,this.rebindTextures=A,this.setupRenderTarget=_,this.updateRenderTargetMipmap=H,this.updateMultisampleRenderTarget=O,this.setupDepthRenderbuffer=Be,this.setupFrameBufferTexture=ue,this.useMultisampledRTT=j}function Zy(n,e){function t(i,s=pi){let r;const a=tt.getTransfer(s);if(i===Hn)return n.UNSIGNED_BYTE;if(i===oc)return n.UNSIGNED_SHORT_4_4_4_4;if(i===lc)return n.UNSIGNED_SHORT_5_5_5_1;if(i===gh)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===_h)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===ph)return n.BYTE;if(i===mh)return n.SHORT;if(i===lr)return n.UNSIGNED_SHORT;if(i===ac)return n.INT;if(i===Gi)return n.UNSIGNED_INT;if(i===Qn)return n.FLOAT;if(i===vr)return n.HALF_FLOAT;if(i===vh)return n.ALPHA;if(i===xh)return n.RGB;if(i===yn)return n.RGBA;if(i===dr)return n.DEPTH_COMPONENT;if(i===ur)return n.DEPTH_STENCIL;if(i===bh)return n.RED;if(i===cc)return n.RED_INTEGER;if(i===yh)return n.RG;if(i===dc)return n.RG_INTEGER;if(i===uc)return n.RGBA_INTEGER;if(i===ra||i===aa||i===oa||i===la)if(a===ct)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===ra)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===aa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===oa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===la)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===ra)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===aa)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===oa)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===la)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===ll||i===cl||i===dl||i===ul)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===ll)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===cl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===dl)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===ul)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===hl||i===fl||i===pl)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===hl||i===fl)return a===ct?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===pl)return a===ct?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===ml||i===gl||i===_l||i===vl||i===xl||i===bl||i===yl||i===Ml||i===Sl||i===El||i===Tl||i===Al||i===wl||i===Cl)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===ml)return a===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===gl)return a===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===_l)return a===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===vl)return a===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===xl)return a===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===bl)return a===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===yl)return a===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Ml)return a===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Sl)return a===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===El)return a===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Tl)return a===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Al)return a===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===wl)return a===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Cl)return a===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Rl||i===Pl||i===Dl)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===Rl)return a===ct?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Pl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Dl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Il||i===Ll||i===Ul||i===Nl)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===Il)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Ll)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Ul)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Nl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===cr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const Jy=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Qy=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class eM{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new Fh(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new Ei({vertexShader:Jy,fragmentShader:Qy,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new on(new Ga(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class tM extends $i{constructor(e,t){super();const i=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,d=null,u=null,f=null,p=null,g=null;const x=typeof XRWebGLBinding<"u",m=new eM,h={},T=t.getContextAttributes();let w=null,M=null;const C=[],R=[],P=new He;let F=null;const E=new hn;E.viewport=new Tt;const S=new hn;S.viewport=new Tt;const L=[E,S],$=new bv;let J=null,se=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(k){let Z=C[k];return Z===void 0&&(Z=new Ao,C[k]=Z),Z.getTargetRaySpace()},this.getControllerGrip=function(k){let Z=C[k];return Z===void 0&&(Z=new Ao,C[k]=Z),Z.getGripSpace()},this.getHand=function(k){let Z=C[k];return Z===void 0&&(Z=new Ao,C[k]=Z),Z.getHandSpace()};function ie(k){const Z=R.indexOf(k.inputSource);if(Z===-1)return;const ue=C[Z];ue!==void 0&&(ue.update(k.inputSource,k.frame,c||a),ue.dispatchEvent({type:k.type,data:k.inputSource}))}function Q(){s.removeEventListener("select",ie),s.removeEventListener("selectstart",ie),s.removeEventListener("selectend",ie),s.removeEventListener("squeeze",ie),s.removeEventListener("squeezestart",ie),s.removeEventListener("squeezeend",ie),s.removeEventListener("end",Q),s.removeEventListener("inputsourceschange",ne);for(let k=0;k<C.length;k++){const Z=R[k];Z!==null&&(R[k]=null,C[k].disconnect(Z))}J=null,se=null,m.reset();for(const k in h)delete h[k];e.setRenderTarget(w),p=null,f=null,u=null,s=null,M=null,_e.stop(),i.isPresenting=!1,e.setPixelRatio(F),e.setSize(P.width,P.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(k){r=k,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(k){o=k,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(k){c=k},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return u===null&&x&&(u=new XRWebGLBinding(s,t)),u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(k){if(s=k,s!==null){if(w=e.getRenderTarget(),s.addEventListener("select",ie),s.addEventListener("selectstart",ie),s.addEventListener("selectend",ie),s.addEventListener("squeeze",ie),s.addEventListener("squeezestart",ie),s.addEventListener("squeezeend",ie),s.addEventListener("end",Q),s.addEventListener("inputsourceschange",ne),T.xrCompatible!==!0&&await t.makeXRCompatible(),F=e.getPixelRatio(),e.getSize(P),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let ue=null,ve=null,le=null;T.depth&&(le=T.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ue=T.stencil?ur:dr,ve=T.stencil?cr:Gi);const Be={colorFormat:t.RGBA8,depthFormat:le,scaleFactor:r};u=this.getBinding(),f=u.createProjectionLayer(Be),s.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),M=new Wi(f.textureWidth,f.textureHeight,{format:yn,type:Hn,depthTexture:new Nh(f.textureWidth,f.textureHeight,ve,void 0,void 0,void 0,void 0,void 0,void 0,ue),stencilBuffer:T.stencil,colorSpace:e.outputColorSpace,samples:T.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const ue={antialias:T.antialias,alpha:!0,depth:T.depth,stencil:T.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,t,ue),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),M=new Wi(p.framebufferWidth,p.framebufferHeight,{format:yn,type:Hn,colorSpace:e.outputColorSpace,stencilBuffer:T.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),_e.setContext(s),_e.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function ne(k){for(let Z=0;Z<k.removed.length;Z++){const ue=k.removed[Z],ve=R.indexOf(ue);ve>=0&&(R[ve]=null,C[ve].disconnect(ue))}for(let Z=0;Z<k.added.length;Z++){const ue=k.added[Z];let ve=R.indexOf(ue);if(ve===-1){for(let Be=0;Be<C.length;Be++)if(Be>=R.length){R.push(ue),ve=Be;break}else if(R[Be]===null){R[Be]=ue,ve=Be;break}if(ve===-1)break}const le=C[ve];le&&le.connect(ue)}}const V=new z,me=new z;function ye(k,Z,ue){V.setFromMatrixPosition(Z.matrixWorld),me.setFromMatrixPosition(ue.matrixWorld);const ve=V.distanceTo(me),le=Z.projectionMatrix.elements,Be=ue.projectionMatrix.elements,A=le[14]/(le[10]-1),_=le[14]/(le[10]+1),H=(le[9]+1)/le[5],X=(le[9]-1)/le[5],G=(le[8]-1)/le[0],O=(Be[8]+1)/Be[0],oe=A*G,j=A*O,ee=ve/(-G+O),re=ee*-G;if(Z.matrixWorld.decompose(k.position,k.quaternion,k.scale),k.translateX(re),k.translateZ(ee),k.matrixWorld.compose(k.position,k.quaternion,k.scale),k.matrixWorldInverse.copy(k.matrixWorld).invert(),le[10]===-1)k.projectionMatrix.copy(Z.projectionMatrix),k.projectionMatrixInverse.copy(Z.projectionMatrixInverse);else{const Ee=A+ee,b=_+ee,v=oe-re,I=j+(ve-re),q=H*_/b*Ee,te=X*_/b*Ee;k.projectionMatrix.makePerspective(v,I,q,te,Ee,b),k.projectionMatrixInverse.copy(k.projectionMatrix).invert()}}function Le(k,Z){Z===null?k.matrixWorld.copy(k.matrix):k.matrixWorld.multiplyMatrices(Z.matrixWorld,k.matrix),k.matrixWorldInverse.copy(k.matrixWorld).invert()}this.updateCamera=function(k){if(s===null)return;let Z=k.near,ue=k.far;m.texture!==null&&(m.depthNear>0&&(Z=m.depthNear),m.depthFar>0&&(ue=m.depthFar)),$.near=S.near=E.near=Z,$.far=S.far=E.far=ue,(J!==$.near||se!==$.far)&&(s.updateRenderState({depthNear:$.near,depthFar:$.far}),J=$.near,se=$.far),$.layers.mask=k.layers.mask|6,E.layers.mask=$.layers.mask&3,S.layers.mask=$.layers.mask&5;const ve=k.parent,le=$.cameras;Le($,ve);for(let Be=0;Be<le.length;Be++)Le(le[Be],ve);le.length===2?ye($,E,S):$.projectionMatrix.copy(E.projectionMatrix),ke(k,$,ve)};function ke(k,Z,ue){ue===null?k.matrix.copy(Z.matrixWorld):(k.matrix.copy(ue.matrixWorld),k.matrix.invert(),k.matrix.multiply(Z.matrixWorld)),k.matrix.decompose(k.position,k.quaternion,k.scale),k.updateMatrixWorld(!0),k.projectionMatrix.copy(Z.projectionMatrix),k.projectionMatrixInverse.copy(Z.projectionMatrixInverse),k.isPerspectiveCamera&&(k.fov=Ol*2*Math.atan(1/k.projectionMatrix.elements[5]),k.zoom=1)}this.getCamera=function(){return $},this.getFoveation=function(){if(!(f===null&&p===null))return l},this.setFoveation=function(k){l=k,f!==null&&(f.fixedFoveation=k),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=k)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh($)},this.getCameraTexture=function(k){return h[k]};let it=null;function ot(k,Z){if(d=Z.getViewerPose(c||a),g=Z,d!==null){const ue=d.views;p!==null&&(e.setRenderTargetFramebuffer(M,p.framebuffer),e.setRenderTarget(M));let ve=!1;ue.length!==$.cameras.length&&($.cameras.length=0,ve=!0);for(let _=0;_<ue.length;_++){const H=ue[_];let X=null;if(p!==null)X=p.getViewport(H);else{const O=u.getViewSubImage(f,H);X=O.viewport,_===0&&(e.setRenderTargetTextures(M,O.colorTexture,O.depthStencilTexture),e.setRenderTarget(M))}let G=L[_];G===void 0&&(G=new hn,G.layers.enable(_),G.viewport=new Tt,L[_]=G),G.matrix.fromArray(H.transform.matrix),G.matrix.decompose(G.position,G.quaternion,G.scale),G.projectionMatrix.fromArray(H.projectionMatrix),G.projectionMatrixInverse.copy(G.projectionMatrix).invert(),G.viewport.set(X.x,X.y,X.width,X.height),_===0&&($.matrix.copy(G.matrix),$.matrix.decompose($.position,$.quaternion,$.scale)),ve===!0&&$.cameras.push(G)}const le=s.enabledFeatures;if(le&&le.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&x){u=i.getBinding();const _=u.getDepthInformation(ue[0]);_&&_.isValid&&_.texture&&m.init(_,s.renderState)}if(le&&le.includes("camera-access")&&x){e.state.unbindTexture(),u=i.getBinding();for(let _=0;_<ue.length;_++){const H=ue[_].camera;if(H){let X=h[H];X||(X=new Fh,h[H]=X);const G=u.getCameraImage(H);X.sourceTexture=G}}}}for(let ue=0;ue<C.length;ue++){const ve=R[ue],le=C[ue];ve!==null&&le!==void 0&&le.update(ve,Z,c||a)}it&&it(k,Z),Z.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:Z}),g=null}const _e=new zh;_e.setAnimationLoop(ot),this.setAnimationLoop=function(k){it=k},this.dispose=function(){}}}const Ui=new Vn,nM=new bt;function iM(n,e){function t(m,h){m.matrixAutoUpdate===!0&&m.updateMatrix(),h.value.copy(m.matrix)}function i(m,h){h.color.getRGB(m.fogColor.value,Rh(n)),h.isFog?(m.fogNear.value=h.near,m.fogFar.value=h.far):h.isFogExp2&&(m.fogDensity.value=h.density)}function s(m,h,T,w,M){h.isMeshBasicMaterial||h.isMeshLambertMaterial?r(m,h):h.isMeshToonMaterial?(r(m,h),u(m,h)):h.isMeshPhongMaterial?(r(m,h),d(m,h)):h.isMeshStandardMaterial?(r(m,h),f(m,h),h.isMeshPhysicalMaterial&&p(m,h,M)):h.isMeshMatcapMaterial?(r(m,h),g(m,h)):h.isMeshDepthMaterial?r(m,h):h.isMeshDistanceMaterial?(r(m,h),x(m,h)):h.isMeshNormalMaterial?r(m,h):h.isLineBasicMaterial?(a(m,h),h.isLineDashedMaterial&&o(m,h)):h.isPointsMaterial?l(m,h,T,w):h.isSpriteMaterial?c(m,h):h.isShadowMaterial?(m.color.value.copy(h.color),m.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function r(m,h){m.opacity.value=h.opacity,h.color&&m.diffuse.value.copy(h.color),h.emissive&&m.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(m.map.value=h.map,t(h.map,m.mapTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,t(h.alphaMap,m.alphaMapTransform)),h.bumpMap&&(m.bumpMap.value=h.bumpMap,t(h.bumpMap,m.bumpMapTransform),m.bumpScale.value=h.bumpScale,h.side===Qt&&(m.bumpScale.value*=-1)),h.normalMap&&(m.normalMap.value=h.normalMap,t(h.normalMap,m.normalMapTransform),m.normalScale.value.copy(h.normalScale),h.side===Qt&&m.normalScale.value.negate()),h.displacementMap&&(m.displacementMap.value=h.displacementMap,t(h.displacementMap,m.displacementMapTransform),m.displacementScale.value=h.displacementScale,m.displacementBias.value=h.displacementBias),h.emissiveMap&&(m.emissiveMap.value=h.emissiveMap,t(h.emissiveMap,m.emissiveMapTransform)),h.specularMap&&(m.specularMap.value=h.specularMap,t(h.specularMap,m.specularMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest);const T=e.get(h),w=T.envMap,M=T.envMapRotation;w&&(m.envMap.value=w,Ui.copy(M),Ui.x*=-1,Ui.y*=-1,Ui.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(Ui.y*=-1,Ui.z*=-1),m.envMapRotation.value.setFromMatrix4(nM.makeRotationFromEuler(Ui)),m.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=h.reflectivity,m.ior.value=h.ior,m.refractionRatio.value=h.refractionRatio),h.lightMap&&(m.lightMap.value=h.lightMap,m.lightMapIntensity.value=h.lightMapIntensity,t(h.lightMap,m.lightMapTransform)),h.aoMap&&(m.aoMap.value=h.aoMap,m.aoMapIntensity.value=h.aoMapIntensity,t(h.aoMap,m.aoMapTransform))}function a(m,h){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,h.map&&(m.map.value=h.map,t(h.map,m.mapTransform))}function o(m,h){m.dashSize.value=h.dashSize,m.totalSize.value=h.dashSize+h.gapSize,m.scale.value=h.scale}function l(m,h,T,w){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,m.size.value=h.size*T,m.scale.value=w*.5,h.map&&(m.map.value=h.map,t(h.map,m.uvTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,t(h.alphaMap,m.alphaMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest)}function c(m,h){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,m.rotation.value=h.rotation,h.map&&(m.map.value=h.map,t(h.map,m.mapTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,t(h.alphaMap,m.alphaMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest)}function d(m,h){m.specular.value.copy(h.specular),m.shininess.value=Math.max(h.shininess,1e-4)}function u(m,h){h.gradientMap&&(m.gradientMap.value=h.gradientMap)}function f(m,h){m.metalness.value=h.metalness,h.metalnessMap&&(m.metalnessMap.value=h.metalnessMap,t(h.metalnessMap,m.metalnessMapTransform)),m.roughness.value=h.roughness,h.roughnessMap&&(m.roughnessMap.value=h.roughnessMap,t(h.roughnessMap,m.roughnessMapTransform)),h.envMap&&(m.envMapIntensity.value=h.envMapIntensity)}function p(m,h,T){m.ior.value=h.ior,h.sheen>0&&(m.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),m.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(m.sheenColorMap.value=h.sheenColorMap,t(h.sheenColorMap,m.sheenColorMapTransform)),h.sheenRoughnessMap&&(m.sheenRoughnessMap.value=h.sheenRoughnessMap,t(h.sheenRoughnessMap,m.sheenRoughnessMapTransform))),h.clearcoat>0&&(m.clearcoat.value=h.clearcoat,m.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(m.clearcoatMap.value=h.clearcoatMap,t(h.clearcoatMap,m.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,t(h.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(m.clearcoatNormalMap.value=h.clearcoatNormalMap,t(h.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===Qt&&m.clearcoatNormalScale.value.negate())),h.dispersion>0&&(m.dispersion.value=h.dispersion),h.iridescence>0&&(m.iridescence.value=h.iridescence,m.iridescenceIOR.value=h.iridescenceIOR,m.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(m.iridescenceMap.value=h.iridescenceMap,t(h.iridescenceMap,m.iridescenceMapTransform)),h.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=h.iridescenceThicknessMap,t(h.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),h.transmission>0&&(m.transmission.value=h.transmission,m.transmissionSamplerMap.value=T.texture,m.transmissionSamplerSize.value.set(T.width,T.height),h.transmissionMap&&(m.transmissionMap.value=h.transmissionMap,t(h.transmissionMap,m.transmissionMapTransform)),m.thickness.value=h.thickness,h.thicknessMap&&(m.thicknessMap.value=h.thicknessMap,t(h.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=h.attenuationDistance,m.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(m.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(m.anisotropyMap.value=h.anisotropyMap,t(h.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=h.specularIntensity,m.specularColor.value.copy(h.specularColor),h.specularColorMap&&(m.specularColorMap.value=h.specularColorMap,t(h.specularColorMap,m.specularColorMapTransform)),h.specularIntensityMap&&(m.specularIntensityMap.value=h.specularIntensityMap,t(h.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,h){h.matcap&&(m.matcap.value=h.matcap)}function x(m,h){const T=e.get(h).light;m.referencePosition.value.setFromMatrixPosition(T.matrixWorld),m.nearDistance.value=T.shadow.camera.near,m.farDistance.value=T.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function sM(n,e,t,i){let s={},r={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(T,w){const M=w.program;i.uniformBlockBinding(T,M)}function c(T,w){let M=s[T.id];M===void 0&&(g(T),M=d(T),s[T.id]=M,T.addEventListener("dispose",m));const C=w.program;i.updateUBOMapping(T,C);const R=e.render.frame;r[T.id]!==R&&(f(T),r[T.id]=R)}function d(T){const w=u();T.__bindingPointIndex=w;const M=n.createBuffer(),C=T.__size,R=T.usage;return n.bindBuffer(n.UNIFORM_BUFFER,M),n.bufferData(n.UNIFORM_BUFFER,C,R),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,w,M),M}function u(){for(let T=0;T<o;T++)if(a.indexOf(T)===-1)return a.push(T),T;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(T){const w=s[T.id],M=T.uniforms,C=T.__cache;n.bindBuffer(n.UNIFORM_BUFFER,w);for(let R=0,P=M.length;R<P;R++){const F=Array.isArray(M[R])?M[R]:[M[R]];for(let E=0,S=F.length;E<S;E++){const L=F[E];if(p(L,R,E,C)===!0){const $=L.__offset,J=Array.isArray(L.value)?L.value:[L.value];let se=0;for(let ie=0;ie<J.length;ie++){const Q=J[ie],ne=x(Q);typeof Q=="number"||typeof Q=="boolean"?(L.__data[0]=Q,n.bufferSubData(n.UNIFORM_BUFFER,$+se,L.__data)):Q.isMatrix3?(L.__data[0]=Q.elements[0],L.__data[1]=Q.elements[1],L.__data[2]=Q.elements[2],L.__data[3]=0,L.__data[4]=Q.elements[3],L.__data[5]=Q.elements[4],L.__data[6]=Q.elements[5],L.__data[7]=0,L.__data[8]=Q.elements[6],L.__data[9]=Q.elements[7],L.__data[10]=Q.elements[8],L.__data[11]=0):(Q.toArray(L.__data,se),se+=ne.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,$,L.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(T,w,M,C){const R=T.value,P=w+"_"+M;if(C[P]===void 0)return typeof R=="number"||typeof R=="boolean"?C[P]=R:C[P]=R.clone(),!0;{const F=C[P];if(typeof R=="number"||typeof R=="boolean"){if(F!==R)return C[P]=R,!0}else if(F.equals(R)===!1)return F.copy(R),!0}return!1}function g(T){const w=T.uniforms;let M=0;const C=16;for(let P=0,F=w.length;P<F;P++){const E=Array.isArray(w[P])?w[P]:[w[P]];for(let S=0,L=E.length;S<L;S++){const $=E[S],J=Array.isArray($.value)?$.value:[$.value];for(let se=0,ie=J.length;se<ie;se++){const Q=J[se],ne=x(Q),V=M%C,me=V%ne.boundary,ye=V+me;M+=me,ye!==0&&C-ye<ne.storage&&(M+=C-ye),$.__data=new Float32Array(ne.storage/Float32Array.BYTES_PER_ELEMENT),$.__offset=M,M+=ne.storage}}}const R=M%C;return R>0&&(M+=C-R),T.__size=M,T.__cache={},this}function x(T){const w={boundary:0,storage:0};return typeof T=="number"||typeof T=="boolean"?(w.boundary=4,w.storage=4):T.isVector2?(w.boundary=8,w.storage=8):T.isVector3||T.isColor?(w.boundary=16,w.storage=12):T.isVector4?(w.boundary=16,w.storage=16):T.isMatrix3?(w.boundary=48,w.storage=48):T.isMatrix4?(w.boundary=64,w.storage=64):T.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",T),w}function m(T){const w=T.target;w.removeEventListener("dispose",m);const M=a.indexOf(w.__bindingPointIndex);a.splice(M,1),n.deleteBuffer(s[w.id]),delete s[w.id],delete r[w.id]}function h(){for(const T in s)n.deleteBuffer(s[T]);a=[],s={},r={}}return{bind:l,update:c,dispose:h}}class rM{constructor(e={}){const{canvas:t=L_(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=a;const g=new Uint32Array(4),x=new Int32Array(4);let m=null,h=null;const T=[],w=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=_i,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const M=this;let C=!1;this._outputColorSpace=un;let R=0,P=0,F=null,E=-1,S=null;const L=new Tt,$=new Tt;let J=null;const se=new Qe(0);let ie=0,Q=t.width,ne=t.height,V=1,me=null,ye=null;const Le=new Tt(0,0,Q,ne),ke=new Tt(0,0,Q,ne);let it=!1;const ot=new pc;let _e=!1,k=!1;const Z=new bt,ue=new z,ve=new Tt,le={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Be=!1;function A(){return F===null?V:1}let _=i;function H(y,N){return t.getContext(y,N)}try{const y={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${rc}`),t.addEventListener("webglcontextlost",ge,!1),t.addEventListener("webglcontextrestored",Ue,!1),t.addEventListener("webglcontextcreationerror",he,!1),_===null){const N="webgl2";if(_=H(N,y),_===null)throw H(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(y){throw console.error("THREE.WebGLRenderer: "+y.message),y}let X,G,O,oe,j,ee,re,Ee,b,v,I,q,te,W,Ae,ce,we,Ce,de,Me,Ne,Re,xe,Xe;function U(){X=new mb(_),X.init(),Re=new Zy(_,X),G=new lb(_,X,e,Re),O=new Yy(_,X),G.reversedDepthBuffer&&f&&O.buffers.depth.setReversed(!0),oe=new vb(_),j=new Fy,ee=new Ky(_,X,O,j,G,Re,oe),re=new db(M),Ee=new pb(M),b=new Ev(_),xe=new ab(_,b),v=new gb(_,b,oe,xe),I=new bb(_,v,b,oe),de=new xb(_,G,ee),ce=new cb(j),q=new Ny(M,re,Ee,X,G,xe,ce),te=new iM(M,j),W=new By,Ae=new qy(X),Ce=new rb(M,re,Ee,O,I,p,l),we=new jy(M,I,G),Xe=new sM(_,oe,G,O),Me=new ob(_,X,oe),Ne=new _b(_,X,oe),oe.programs=q.programs,M.capabilities=G,M.extensions=X,M.properties=j,M.renderLists=W,M.shadowMap=we,M.state=O,M.info=oe}U();const pe=new tM(M,_);this.xr=pe,this.getContext=function(){return _},this.getContextAttributes=function(){return _.getContextAttributes()},this.forceContextLoss=function(){const y=X.get("WEBGL_lose_context");y&&y.loseContext()},this.forceContextRestore=function(){const y=X.get("WEBGL_lose_context");y&&y.restoreContext()},this.getPixelRatio=function(){return V},this.setPixelRatio=function(y){y!==void 0&&(V=y,this.setSize(Q,ne,!1))},this.getSize=function(y){return y.set(Q,ne)},this.setSize=function(y,N,Y=!0){if(pe.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Q=y,ne=N,t.width=Math.floor(y*V),t.height=Math.floor(N*V),Y===!0&&(t.style.width=y+"px",t.style.height=N+"px"),this.setViewport(0,0,y,N)},this.getDrawingBufferSize=function(y){return y.set(Q*V,ne*V).floor()},this.setDrawingBufferSize=function(y,N,Y){Q=y,ne=N,V=Y,t.width=Math.floor(y*Y),t.height=Math.floor(N*Y),this.setViewport(0,0,y,N)},this.getCurrentViewport=function(y){return y.copy(L)},this.getViewport=function(y){return y.copy(Le)},this.setViewport=function(y,N,Y,K){y.isVector4?Le.set(y.x,y.y,y.z,y.w):Le.set(y,N,Y,K),O.viewport(L.copy(Le).multiplyScalar(V).round())},this.getScissor=function(y){return y.copy(ke)},this.setScissor=function(y,N,Y,K){y.isVector4?ke.set(y.x,y.y,y.z,y.w):ke.set(y,N,Y,K),O.scissor($.copy(ke).multiplyScalar(V).round())},this.getScissorTest=function(){return it},this.setScissorTest=function(y){O.setScissorTest(it=y)},this.setOpaqueSort=function(y){me=y},this.setTransparentSort=function(y){ye=y},this.getClearColor=function(y){return y.copy(Ce.getClearColor())},this.setClearColor=function(){Ce.setClearColor(...arguments)},this.getClearAlpha=function(){return Ce.getClearAlpha()},this.setClearAlpha=function(){Ce.setClearAlpha(...arguments)},this.clear=function(y=!0,N=!0,Y=!0){let K=0;if(y){let B=!1;if(F!==null){const fe=F.texture.format;B=fe===uc||fe===dc||fe===cc}if(B){const fe=F.texture.type,Te=fe===Hn||fe===Gi||fe===lr||fe===cr||fe===oc||fe===lc,Fe=Ce.getClearColor(),Ie=Ce.getClearAlpha(),Ge=Fe.r,qe=Fe.g,ze=Fe.b;Te?(g[0]=Ge,g[1]=qe,g[2]=ze,g[3]=Ie,_.clearBufferuiv(_.COLOR,0,g)):(x[0]=Ge,x[1]=qe,x[2]=ze,x[3]=Ie,_.clearBufferiv(_.COLOR,0,x))}else K|=_.COLOR_BUFFER_BIT}N&&(K|=_.DEPTH_BUFFER_BIT),Y&&(K|=_.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),_.clear(K)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ge,!1),t.removeEventListener("webglcontextrestored",Ue,!1),t.removeEventListener("webglcontextcreationerror",he,!1),Ce.dispose(),W.dispose(),Ae.dispose(),j.dispose(),re.dispose(),Ee.dispose(),I.dispose(),xe.dispose(),Xe.dispose(),q.dispose(),pe.dispose(),pe.removeEventListener("sessionstart",Cn),pe.removeEventListener("sessionend",_c),Ti.stop()};function ge(y){y.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function Ue(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;const y=oe.autoReset,N=we.enabled,Y=we.autoUpdate,K=we.needsUpdate,B=we.type;U(),oe.autoReset=y,we.enabled=N,we.autoUpdate=Y,we.needsUpdate=K,we.type=B}function he(y){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",y.statusMessage)}function ae(y){const N=y.target;N.removeEventListener("dispose",ae),Oe(N)}function Oe(y){je(y),j.remove(y)}function je(y){const N=j.get(y).programs;N!==void 0&&(N.forEach(function(Y){q.releaseProgram(Y)}),y.isShaderMaterial&&q.releaseShaderCache(y))}this.renderBufferDirect=function(y,N,Y,K,B,fe){N===null&&(N=le);const Te=B.isMesh&&B.matrixWorld.determinant()<0,Fe=Wh(y,N,Y,K,B);O.setMaterial(K,Te);let Ie=Y.index,Ge=1;if(K.wireframe===!0){if(Ie=v.getWireframeAttribute(Y),Ie===void 0)return;Ge=2}const qe=Y.drawRange,ze=Y.attributes.position;let Je=qe.start*Ge,lt=(qe.start+qe.count)*Ge;fe!==null&&(Je=Math.max(Je,fe.start*Ge),lt=Math.min(lt,(fe.start+fe.count)*Ge)),Ie!==null?(Je=Math.max(Je,0),lt=Math.min(lt,Ie.count)):ze!=null&&(Je=Math.max(Je,0),lt=Math.min(lt,ze.count));const Et=lt-Je;if(Et<0||Et===1/0)return;xe.setup(B,K,Fe,Y,Ie);let _t,ht=Me;if(Ie!==null&&(_t=b.get(Ie),ht=Ne,ht.setIndex(_t)),B.isMesh)K.wireframe===!0?(O.setLineWidth(K.wireframeLinewidth*A()),ht.setMode(_.LINES)):ht.setMode(_.TRIANGLES);else if(B.isLine){let Ve=K.linewidth;Ve===void 0&&(Ve=1),O.setLineWidth(Ve*A()),B.isLineSegments?ht.setMode(_.LINES):B.isLineLoop?ht.setMode(_.LINE_LOOP):ht.setMode(_.LINE_STRIP)}else B.isPoints?ht.setMode(_.POINTS):B.isSprite&&ht.setMode(_.TRIANGLES);if(B.isBatchedMesh)if(B._multiDrawInstances!==null)hr("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ht.renderMultiDrawInstances(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount,B._multiDrawInstances);else if(X.get("WEBGL_multi_draw"))ht.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else{const Ve=B._multiDrawStarts,yt=B._multiDrawCounts,et=B._multiDrawCount,en=Ie?b.get(Ie).bytesPerElement:1,Ki=j.get(K).currentProgram.getUniforms();for(let tn=0;tn<et;tn++)Ki.setValue(_,"_gl_DrawID",tn),ht.render(Ve[tn]/en,yt[tn])}else if(B.isInstancedMesh)ht.renderInstances(Je,Et,B.count);else if(Y.isInstancedBufferGeometry){const Ve=Y._maxInstanceCount!==void 0?Y._maxInstanceCount:1/0,yt=Math.min(Y.instanceCount,Ve);ht.renderInstances(Je,Et,yt)}else ht.render(Je,Et)};function pt(y,N,Y){y.transparent===!0&&y.side===bn&&y.forceSinglePass===!1?(y.side=Qt,y.needsUpdate=!0,yr(y,N,Y),y.side=Si,y.needsUpdate=!0,yr(y,N,Y),y.side=bn):yr(y,N,Y)}this.compile=function(y,N,Y=null){Y===null&&(Y=y),h=Ae.get(Y),h.init(N),w.push(h),Y.traverseVisible(function(B){B.isLight&&B.layers.test(N.layers)&&(h.pushLight(B),B.castShadow&&h.pushShadow(B))}),y!==Y&&y.traverseVisible(function(B){B.isLight&&B.layers.test(N.layers)&&(h.pushLight(B),B.castShadow&&h.pushShadow(B))}),h.setupLights();const K=new Set;return y.traverse(function(B){if(!(B.isMesh||B.isPoints||B.isLine||B.isSprite))return;const fe=B.material;if(fe)if(Array.isArray(fe))for(let Te=0;Te<fe.length;Te++){const Fe=fe[Te];pt(Fe,Y,B),K.add(Fe)}else pt(fe,Y,B),K.add(fe)}),h=w.pop(),K},this.compileAsync=function(y,N,Y=null){const K=this.compile(y,N,Y);return new Promise(B=>{function fe(){if(K.forEach(function(Te){j.get(Te).currentProgram.isReady()&&K.delete(Te)}),K.size===0){B(y);return}setTimeout(fe,10)}X.get("KHR_parallel_shader_compile")!==null?fe():setTimeout(fe,10)})};let st=null;function kn(y){st&&st(y)}function Cn(){Ti.stop()}function _c(){Ti.start()}const Ti=new zh;Ti.setAnimationLoop(kn),typeof self<"u"&&Ti.setContext(self),this.setAnimationLoop=function(y){st=y,pe.setAnimationLoop(y),y===null?Ti.stop():Ti.start()},pe.addEventListener("sessionstart",Cn),pe.addEventListener("sessionend",_c),this.render=function(y,N){if(N!==void 0&&N.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;if(y.matrixWorldAutoUpdate===!0&&y.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),pe.enabled===!0&&pe.isPresenting===!0&&(pe.cameraAutoUpdate===!0&&pe.updateCamera(N),N=pe.getCamera()),y.isScene===!0&&y.onBeforeRender(M,y,N,F),h=Ae.get(y,w.length),h.init(N),w.push(h),Z.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),ot.setFromProjectionMatrix(Z,Fn,N.reversedDepth),k=this.localClippingEnabled,_e=ce.init(this.clippingPlanes,k),m=W.get(y,T.length),m.init(),T.push(m),pe.enabled===!0&&pe.isPresenting===!0){const fe=M.xr.getDepthSensingMesh();fe!==null&&Wa(fe,N,-1/0,M.sortObjects)}Wa(y,N,0,M.sortObjects),m.finish(),M.sortObjects===!0&&m.sort(me,ye),Be=pe.enabled===!1||pe.isPresenting===!1||pe.hasDepthSensing()===!1,Be&&Ce.addToRenderList(m,y),this.info.render.frame++,_e===!0&&ce.beginShadows();const Y=h.state.shadowsArray;we.render(Y,y,N),_e===!0&&ce.endShadows(),this.info.autoReset===!0&&this.info.reset();const K=m.opaque,B=m.transmissive;if(h.setupLights(),N.isArrayCamera){const fe=N.cameras;if(B.length>0)for(let Te=0,Fe=fe.length;Te<Fe;Te++){const Ie=fe[Te];xc(K,B,y,Ie)}Be&&Ce.render(y);for(let Te=0,Fe=fe.length;Te<Fe;Te++){const Ie=fe[Te];vc(m,y,Ie,Ie.viewport)}}else B.length>0&&xc(K,B,y,N),Be&&Ce.render(y),vc(m,y,N);F!==null&&P===0&&(ee.updateMultisampleRenderTarget(F),ee.updateRenderTargetMipmap(F)),y.isScene===!0&&y.onAfterRender(M,y,N),xe.resetDefaultState(),E=-1,S=null,w.pop(),w.length>0?(h=w[w.length-1],_e===!0&&ce.setGlobalState(M.clippingPlanes,h.state.camera)):h=null,T.pop(),T.length>0?m=T[T.length-1]:m=null};function Wa(y,N,Y,K){if(y.visible===!1)return;if(y.layers.test(N.layers)){if(y.isGroup)Y=y.renderOrder;else if(y.isLOD)y.autoUpdate===!0&&y.update(N);else if(y.isLight)h.pushLight(y),y.castShadow&&h.pushShadow(y);else if(y.isSprite){if(!y.frustumCulled||ot.intersectsSprite(y)){K&&ve.setFromMatrixPosition(y.matrixWorld).applyMatrix4(Z);const Te=I.update(y),Fe=y.material;Fe.visible&&m.push(y,Te,Fe,Y,ve.z,null)}}else if((y.isMesh||y.isLine||y.isPoints)&&(!y.frustumCulled||ot.intersectsObject(y))){const Te=I.update(y),Fe=y.material;if(K&&(y.boundingSphere!==void 0?(y.boundingSphere===null&&y.computeBoundingSphere(),ve.copy(y.boundingSphere.center)):(Te.boundingSphere===null&&Te.computeBoundingSphere(),ve.copy(Te.boundingSphere.center)),ve.applyMatrix4(y.matrixWorld).applyMatrix4(Z)),Array.isArray(Fe)){const Ie=Te.groups;for(let Ge=0,qe=Ie.length;Ge<qe;Ge++){const ze=Ie[Ge],Je=Fe[ze.materialIndex];Je&&Je.visible&&m.push(y,Te,Je,Y,ve.z,ze)}}else Fe.visible&&m.push(y,Te,Fe,Y,ve.z,null)}}const fe=y.children;for(let Te=0,Fe=fe.length;Te<Fe;Te++)Wa(fe[Te],N,Y,K)}function vc(y,N,Y,K){const B=y.opaque,fe=y.transmissive,Te=y.transparent;h.setupLightsView(Y),_e===!0&&ce.setGlobalState(M.clippingPlanes,Y),K&&O.viewport(L.copy(K)),B.length>0&&br(B,N,Y),fe.length>0&&br(fe,N,Y),Te.length>0&&br(Te,N,Y),O.buffers.depth.setTest(!0),O.buffers.depth.setMask(!0),O.buffers.color.setMask(!0),O.setPolygonOffset(!1)}function xc(y,N,Y,K){if((Y.isScene===!0?Y.overrideMaterial:null)!==null)return;h.state.transmissionRenderTarget[K.id]===void 0&&(h.state.transmissionRenderTarget[K.id]=new Wi(1,1,{generateMipmaps:!0,type:X.has("EXT_color_buffer_half_float")||X.has("EXT_color_buffer_float")?vr:Hn,minFilter:Vi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:tt.workingColorSpace}));const fe=h.state.transmissionRenderTarget[K.id],Te=K.viewport||L;fe.setSize(Te.z*M.transmissionResolutionScale,Te.w*M.transmissionResolutionScale);const Fe=M.getRenderTarget(),Ie=M.getActiveCubeFace(),Ge=M.getActiveMipmapLevel();M.setRenderTarget(fe),M.getClearColor(se),ie=M.getClearAlpha(),ie<1&&M.setClearColor(16777215,.5),M.clear(),Be&&Ce.render(Y);const qe=M.toneMapping;M.toneMapping=_i;const ze=K.viewport;if(K.viewport!==void 0&&(K.viewport=void 0),h.setupLightsView(K),_e===!0&&ce.setGlobalState(M.clippingPlanes,K),br(y,Y,K),ee.updateMultisampleRenderTarget(fe),ee.updateRenderTargetMipmap(fe),X.has("WEBGL_multisampled_render_to_texture")===!1){let Je=!1;for(let lt=0,Et=N.length;lt<Et;lt++){const _t=N[lt],ht=_t.object,Ve=_t.geometry,yt=_t.material,et=_t.group;if(yt.side===bn&&ht.layers.test(K.layers)){const en=yt.side;yt.side=Qt,yt.needsUpdate=!0,bc(ht,Y,K,Ve,yt,et),yt.side=en,yt.needsUpdate=!0,Je=!0}}Je===!0&&(ee.updateMultisampleRenderTarget(fe),ee.updateRenderTargetMipmap(fe))}M.setRenderTarget(Fe,Ie,Ge),M.setClearColor(se,ie),ze!==void 0&&(K.viewport=ze),M.toneMapping=qe}function br(y,N,Y){const K=N.isScene===!0?N.overrideMaterial:null;for(let B=0,fe=y.length;B<fe;B++){const Te=y[B],Fe=Te.object,Ie=Te.geometry,Ge=Te.group;let qe=Te.material;qe.allowOverride===!0&&K!==null&&(qe=K),Fe.layers.test(Y.layers)&&bc(Fe,N,Y,Ie,qe,Ge)}}function bc(y,N,Y,K,B,fe){y.onBeforeRender(M,N,Y,K,B,fe),y.modelViewMatrix.multiplyMatrices(Y.matrixWorldInverse,y.matrixWorld),y.normalMatrix.getNormalMatrix(y.modelViewMatrix),B.onBeforeRender(M,N,Y,K,y,fe),B.transparent===!0&&B.side===bn&&B.forceSinglePass===!1?(B.side=Qt,B.needsUpdate=!0,M.renderBufferDirect(Y,N,K,B,y,fe),B.side=Si,B.needsUpdate=!0,M.renderBufferDirect(Y,N,K,B,y,fe),B.side=bn):M.renderBufferDirect(Y,N,K,B,y,fe),y.onAfterRender(M,N,Y,K,B,fe)}function yr(y,N,Y){N.isScene!==!0&&(N=le);const K=j.get(y),B=h.state.lights,fe=h.state.shadowsArray,Te=B.state.version,Fe=q.getParameters(y,B.state,fe,N,Y),Ie=q.getProgramCacheKey(Fe);let Ge=K.programs;K.environment=y.isMeshStandardMaterial?N.environment:null,K.fog=N.fog,K.envMap=(y.isMeshStandardMaterial?Ee:re).get(y.envMap||K.environment),K.envMapRotation=K.environment!==null&&y.envMap===null?N.environmentRotation:y.envMapRotation,Ge===void 0&&(y.addEventListener("dispose",ae),Ge=new Map,K.programs=Ge);let qe=Ge.get(Ie);if(qe!==void 0){if(K.currentProgram===qe&&K.lightsStateVersion===Te)return Mc(y,Fe),qe}else Fe.uniforms=q.getUniforms(y),y.onBeforeCompile(Fe,M),qe=q.acquireProgram(Fe,Ie),Ge.set(Ie,qe),K.uniforms=Fe.uniforms;const ze=K.uniforms;return(!y.isShaderMaterial&&!y.isRawShaderMaterial||y.clipping===!0)&&(ze.clippingPlanes=ce.uniform),Mc(y,Fe),K.needsLights=jh(y),K.lightsStateVersion=Te,K.needsLights&&(ze.ambientLightColor.value=B.state.ambient,ze.lightProbe.value=B.state.probe,ze.directionalLights.value=B.state.directional,ze.directionalLightShadows.value=B.state.directionalShadow,ze.spotLights.value=B.state.spot,ze.spotLightShadows.value=B.state.spotShadow,ze.rectAreaLights.value=B.state.rectArea,ze.ltc_1.value=B.state.rectAreaLTC1,ze.ltc_2.value=B.state.rectAreaLTC2,ze.pointLights.value=B.state.point,ze.pointLightShadows.value=B.state.pointShadow,ze.hemisphereLights.value=B.state.hemi,ze.directionalShadowMap.value=B.state.directionalShadowMap,ze.directionalShadowMatrix.value=B.state.directionalShadowMatrix,ze.spotShadowMap.value=B.state.spotShadowMap,ze.spotLightMatrix.value=B.state.spotLightMatrix,ze.spotLightMap.value=B.state.spotLightMap,ze.pointShadowMap.value=B.state.pointShadowMap,ze.pointShadowMatrix.value=B.state.pointShadowMatrix),K.currentProgram=qe,K.uniformsList=null,qe}function yc(y){if(y.uniformsList===null){const N=y.currentProgram.getUniforms();y.uniformsList=da.seqWithValue(N.seq,y.uniforms)}return y.uniformsList}function Mc(y,N){const Y=j.get(y);Y.outputColorSpace=N.outputColorSpace,Y.batching=N.batching,Y.batchingColor=N.batchingColor,Y.instancing=N.instancing,Y.instancingColor=N.instancingColor,Y.instancingMorph=N.instancingMorph,Y.skinning=N.skinning,Y.morphTargets=N.morphTargets,Y.morphNormals=N.morphNormals,Y.morphColors=N.morphColors,Y.morphTargetsCount=N.morphTargetsCount,Y.numClippingPlanes=N.numClippingPlanes,Y.numIntersection=N.numClipIntersection,Y.vertexAlphas=N.vertexAlphas,Y.vertexTangents=N.vertexTangents,Y.toneMapping=N.toneMapping}function Wh(y,N,Y,K,B){N.isScene!==!0&&(N=le),ee.resetTextureUnits();const fe=N.fog,Te=K.isMeshStandardMaterial?N.environment:null,Fe=F===null?M.outputColorSpace:F.isXRRenderTarget===!0?F.texture.colorSpace:Is,Ie=(K.isMeshStandardMaterial?Ee:re).get(K.envMap||Te),Ge=K.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,qe=!!Y.attributes.tangent&&(!!K.normalMap||K.anisotropy>0),ze=!!Y.morphAttributes.position,Je=!!Y.morphAttributes.normal,lt=!!Y.morphAttributes.color;let Et=_i;K.toneMapped&&(F===null||F.isXRRenderTarget===!0)&&(Et=M.toneMapping);const _t=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,ht=_t!==void 0?_t.length:0,Ve=j.get(K),yt=h.state.lights;if(_e===!0&&(k===!0||y!==S)){const kt=y===S&&K.id===E;ce.setState(K,y,kt)}let et=!1;K.version===Ve.__version?(Ve.needsLights&&Ve.lightsStateVersion!==yt.state.version||Ve.outputColorSpace!==Fe||B.isBatchedMesh&&Ve.batching===!1||!B.isBatchedMesh&&Ve.batching===!0||B.isBatchedMesh&&Ve.batchingColor===!0&&B.colorTexture===null||B.isBatchedMesh&&Ve.batchingColor===!1&&B.colorTexture!==null||B.isInstancedMesh&&Ve.instancing===!1||!B.isInstancedMesh&&Ve.instancing===!0||B.isSkinnedMesh&&Ve.skinning===!1||!B.isSkinnedMesh&&Ve.skinning===!0||B.isInstancedMesh&&Ve.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&Ve.instancingColor===!1&&B.instanceColor!==null||B.isInstancedMesh&&Ve.instancingMorph===!0&&B.morphTexture===null||B.isInstancedMesh&&Ve.instancingMorph===!1&&B.morphTexture!==null||Ve.envMap!==Ie||K.fog===!0&&Ve.fog!==fe||Ve.numClippingPlanes!==void 0&&(Ve.numClippingPlanes!==ce.numPlanes||Ve.numIntersection!==ce.numIntersection)||Ve.vertexAlphas!==Ge||Ve.vertexTangents!==qe||Ve.morphTargets!==ze||Ve.morphNormals!==Je||Ve.morphColors!==lt||Ve.toneMapping!==Et||Ve.morphTargetsCount!==ht)&&(et=!0):(et=!0,Ve.__version=K.version);let en=Ve.currentProgram;et===!0&&(en=yr(K,N,B));let Ki=!1,tn=!1,Os=!1;const Mt=en.getUniforms(),ln=Ve.uniforms;if(O.useProgram(en.program)&&(Ki=!0,tn=!0,Os=!0),K.id!==E&&(E=K.id,tn=!0),Ki||S!==y){O.buffers.depth.getReversed()&&y.reversedDepth!==!0&&(y._reversedDepth=!0,y.updateProjectionMatrix()),Mt.setValue(_,"projectionMatrix",y.projectionMatrix),Mt.setValue(_,"viewMatrix",y.matrixWorldInverse);const Kt=Mt.map.cameraPosition;Kt!==void 0&&Kt.setValue(_,ue.setFromMatrixPosition(y.matrixWorld)),G.logarithmicDepthBuffer&&Mt.setValue(_,"logDepthBufFC",2/(Math.log(y.far+1)/Math.LN2)),(K.isMeshPhongMaterial||K.isMeshToonMaterial||K.isMeshLambertMaterial||K.isMeshBasicMaterial||K.isMeshStandardMaterial||K.isShaderMaterial)&&Mt.setValue(_,"isOrthographic",y.isOrthographicCamera===!0),S!==y&&(S=y,tn=!0,Os=!0)}if(B.isSkinnedMesh){Mt.setOptional(_,B,"bindMatrix"),Mt.setOptional(_,B,"bindMatrixInverse");const kt=B.skeleton;kt&&(kt.boneTexture===null&&kt.computeBoneTexture(),Mt.setValue(_,"boneTexture",kt.boneTexture,ee))}B.isBatchedMesh&&(Mt.setOptional(_,B,"batchingTexture"),Mt.setValue(_,"batchingTexture",B._matricesTexture,ee),Mt.setOptional(_,B,"batchingIdTexture"),Mt.setValue(_,"batchingIdTexture",B._indirectTexture,ee),Mt.setOptional(_,B,"batchingColorTexture"),B._colorsTexture!==null&&Mt.setValue(_,"batchingColorTexture",B._colorsTexture,ee));const cn=Y.morphAttributes;if((cn.position!==void 0||cn.normal!==void 0||cn.color!==void 0)&&de.update(B,Y,en),(tn||Ve.receiveShadow!==B.receiveShadow)&&(Ve.receiveShadow=B.receiveShadow,Mt.setValue(_,"receiveShadow",B.receiveShadow)),K.isMeshGouraudMaterial&&K.envMap!==null&&(ln.envMap.value=Ie,ln.flipEnvMap.value=Ie.isCubeTexture&&Ie.isRenderTargetTexture===!1?-1:1),K.isMeshStandardMaterial&&K.envMap===null&&N.environment!==null&&(ln.envMapIntensity.value=N.environmentIntensity),tn&&(Mt.setValue(_,"toneMappingExposure",M.toneMappingExposure),Ve.needsLights&&Xh(ln,Os),fe&&K.fog===!0&&te.refreshFogUniforms(ln,fe),te.refreshMaterialUniforms(ln,K,V,ne,h.state.transmissionRenderTarget[y.id]),da.upload(_,yc(Ve),ln,ee)),K.isShaderMaterial&&K.uniformsNeedUpdate===!0&&(da.upload(_,yc(Ve),ln,ee),K.uniformsNeedUpdate=!1),K.isSpriteMaterial&&Mt.setValue(_,"center",B.center),Mt.setValue(_,"modelViewMatrix",B.modelViewMatrix),Mt.setValue(_,"normalMatrix",B.normalMatrix),Mt.setValue(_,"modelMatrix",B.matrixWorld),K.isShaderMaterial||K.isRawShaderMaterial){const kt=K.uniformsGroups;for(let Kt=0,Xa=kt.length;Kt<Xa;Kt++){const Ai=kt[Kt];Xe.update(Ai,en),Xe.bind(Ai,en)}}return en}function Xh(y,N){y.ambientLightColor.needsUpdate=N,y.lightProbe.needsUpdate=N,y.directionalLights.needsUpdate=N,y.directionalLightShadows.needsUpdate=N,y.pointLights.needsUpdate=N,y.pointLightShadows.needsUpdate=N,y.spotLights.needsUpdate=N,y.spotLightShadows.needsUpdate=N,y.rectAreaLights.needsUpdate=N,y.hemisphereLights.needsUpdate=N}function jh(y){return y.isMeshLambertMaterial||y.isMeshToonMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isShadowMaterial||y.isShaderMaterial&&y.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return P},this.getRenderTarget=function(){return F},this.setRenderTargetTextures=function(y,N,Y){const K=j.get(y);K.__autoAllocateDepthBuffer=y.resolveDepthBuffer===!1,K.__autoAllocateDepthBuffer===!1&&(K.__useRenderToTexture=!1),j.get(y.texture).__webglTexture=N,j.get(y.depthTexture).__webglTexture=K.__autoAllocateDepthBuffer?void 0:Y,K.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(y,N){const Y=j.get(y);Y.__webglFramebuffer=N,Y.__useDefaultFramebuffer=N===void 0};const $h=_.createFramebuffer();this.setRenderTarget=function(y,N=0,Y=0){F=y,R=N,P=Y;let K=!0,B=null,fe=!1,Te=!1;if(y){const Ie=j.get(y);if(Ie.__useDefaultFramebuffer!==void 0)O.bindFramebuffer(_.FRAMEBUFFER,null),K=!1;else if(Ie.__webglFramebuffer===void 0)ee.setupRenderTarget(y);else if(Ie.__hasExternalTextures)ee.rebindTextures(y,j.get(y.texture).__webglTexture,j.get(y.depthTexture).__webglTexture);else if(y.depthBuffer){const ze=y.depthTexture;if(Ie.__boundDepthTexture!==ze){if(ze!==null&&j.has(ze)&&(y.width!==ze.image.width||y.height!==ze.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");ee.setupDepthRenderbuffer(y)}}const Ge=y.texture;(Ge.isData3DTexture||Ge.isDataArrayTexture||Ge.isCompressedArrayTexture)&&(Te=!0);const qe=j.get(y).__webglFramebuffer;y.isWebGLCubeRenderTarget?(Array.isArray(qe[N])?B=qe[N][Y]:B=qe[N],fe=!0):y.samples>0&&ee.useMultisampledRTT(y)===!1?B=j.get(y).__webglMultisampledFramebuffer:Array.isArray(qe)?B=qe[Y]:B=qe,L.copy(y.viewport),$.copy(y.scissor),J=y.scissorTest}else L.copy(Le).multiplyScalar(V).floor(),$.copy(ke).multiplyScalar(V).floor(),J=it;if(Y!==0&&(B=$h),O.bindFramebuffer(_.FRAMEBUFFER,B)&&K&&O.drawBuffers(y,B),O.viewport(L),O.scissor($),O.setScissorTest(J),fe){const Ie=j.get(y.texture);_.framebufferTexture2D(_.FRAMEBUFFER,_.COLOR_ATTACHMENT0,_.TEXTURE_CUBE_MAP_POSITIVE_X+N,Ie.__webglTexture,Y)}else if(Te){const Ie=N;for(let Ge=0;Ge<y.textures.length;Ge++){const qe=j.get(y.textures[Ge]);_.framebufferTextureLayer(_.FRAMEBUFFER,_.COLOR_ATTACHMENT0+Ge,qe.__webglTexture,Y,Ie)}}else if(y!==null&&Y!==0){const Ie=j.get(y.texture);_.framebufferTexture2D(_.FRAMEBUFFER,_.COLOR_ATTACHMENT0,_.TEXTURE_2D,Ie.__webglTexture,Y)}E=-1},this.readRenderTargetPixels=function(y,N,Y,K,B,fe,Te,Fe=0){if(!(y&&y.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ie=j.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&Te!==void 0&&(Ie=Ie[Te]),Ie){O.bindFramebuffer(_.FRAMEBUFFER,Ie);try{const Ge=y.textures[Fe],qe=Ge.format,ze=Ge.type;if(!G.textureFormatReadable(qe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!G.textureTypeReadable(ze)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=y.width-K&&Y>=0&&Y<=y.height-B&&(y.textures.length>1&&_.readBuffer(_.COLOR_ATTACHMENT0+Fe),_.readPixels(N,Y,K,B,Re.convert(qe),Re.convert(ze),fe))}finally{const Ge=F!==null?j.get(F).__webglFramebuffer:null;O.bindFramebuffer(_.FRAMEBUFFER,Ge)}}},this.readRenderTargetPixelsAsync=async function(y,N,Y,K,B,fe,Te,Fe=0){if(!(y&&y.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ie=j.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&Te!==void 0&&(Ie=Ie[Te]),Ie)if(N>=0&&N<=y.width-K&&Y>=0&&Y<=y.height-B){O.bindFramebuffer(_.FRAMEBUFFER,Ie);const Ge=y.textures[Fe],qe=Ge.format,ze=Ge.type;if(!G.textureFormatReadable(qe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!G.textureTypeReadable(ze))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Je=_.createBuffer();_.bindBuffer(_.PIXEL_PACK_BUFFER,Je),_.bufferData(_.PIXEL_PACK_BUFFER,fe.byteLength,_.STREAM_READ),y.textures.length>1&&_.readBuffer(_.COLOR_ATTACHMENT0+Fe),_.readPixels(N,Y,K,B,Re.convert(qe),Re.convert(ze),0);const lt=F!==null?j.get(F).__webglFramebuffer:null;O.bindFramebuffer(_.FRAMEBUFFER,lt);const Et=_.fenceSync(_.SYNC_GPU_COMMANDS_COMPLETE,0);return _.flush(),await U_(_,Et,4),_.bindBuffer(_.PIXEL_PACK_BUFFER,Je),_.getBufferSubData(_.PIXEL_PACK_BUFFER,0,fe),_.deleteBuffer(Je),_.deleteSync(Et),fe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(y,N=null,Y=0){const K=Math.pow(2,-Y),B=Math.floor(y.image.width*K),fe=Math.floor(y.image.height*K),Te=N!==null?N.x:0,Fe=N!==null?N.y:0;ee.setTexture2D(y,0),_.copyTexSubImage2D(_.TEXTURE_2D,Y,0,0,Te,Fe,B,fe),O.unbindTexture()};const Yh=_.createFramebuffer(),Kh=_.createFramebuffer();this.copyTextureToTexture=function(y,N,Y=null,K=null,B=0,fe=null){fe===null&&(B!==0?(hr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),fe=B,B=0):fe=0);let Te,Fe,Ie,Ge,qe,ze,Je,lt,Et;const _t=y.isCompressedTexture?y.mipmaps[fe]:y.image;if(Y!==null)Te=Y.max.x-Y.min.x,Fe=Y.max.y-Y.min.y,Ie=Y.isBox3?Y.max.z-Y.min.z:1,Ge=Y.min.x,qe=Y.min.y,ze=Y.isBox3?Y.min.z:0;else{const cn=Math.pow(2,-B);Te=Math.floor(_t.width*cn),Fe=Math.floor(_t.height*cn),y.isDataArrayTexture?Ie=_t.depth:y.isData3DTexture?Ie=Math.floor(_t.depth*cn):Ie=1,Ge=0,qe=0,ze=0}K!==null?(Je=K.x,lt=K.y,Et=K.z):(Je=0,lt=0,Et=0);const ht=Re.convert(N.format),Ve=Re.convert(N.type);let yt;N.isData3DTexture?(ee.setTexture3D(N,0),yt=_.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(ee.setTexture2DArray(N,0),yt=_.TEXTURE_2D_ARRAY):(ee.setTexture2D(N,0),yt=_.TEXTURE_2D),_.pixelStorei(_.UNPACK_FLIP_Y_WEBGL,N.flipY),_.pixelStorei(_.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),_.pixelStorei(_.UNPACK_ALIGNMENT,N.unpackAlignment);const et=_.getParameter(_.UNPACK_ROW_LENGTH),en=_.getParameter(_.UNPACK_IMAGE_HEIGHT),Ki=_.getParameter(_.UNPACK_SKIP_PIXELS),tn=_.getParameter(_.UNPACK_SKIP_ROWS),Os=_.getParameter(_.UNPACK_SKIP_IMAGES);_.pixelStorei(_.UNPACK_ROW_LENGTH,_t.width),_.pixelStorei(_.UNPACK_IMAGE_HEIGHT,_t.height),_.pixelStorei(_.UNPACK_SKIP_PIXELS,Ge),_.pixelStorei(_.UNPACK_SKIP_ROWS,qe),_.pixelStorei(_.UNPACK_SKIP_IMAGES,ze);const Mt=y.isDataArrayTexture||y.isData3DTexture,ln=N.isDataArrayTexture||N.isData3DTexture;if(y.isDepthTexture){const cn=j.get(y),kt=j.get(N),Kt=j.get(cn.__renderTarget),Xa=j.get(kt.__renderTarget);O.bindFramebuffer(_.READ_FRAMEBUFFER,Kt.__webglFramebuffer),O.bindFramebuffer(_.DRAW_FRAMEBUFFER,Xa.__webglFramebuffer);for(let Ai=0;Ai<Ie;Ai++)Mt&&(_.framebufferTextureLayer(_.READ_FRAMEBUFFER,_.COLOR_ATTACHMENT0,j.get(y).__webglTexture,B,ze+Ai),_.framebufferTextureLayer(_.DRAW_FRAMEBUFFER,_.COLOR_ATTACHMENT0,j.get(N).__webglTexture,fe,Et+Ai)),_.blitFramebuffer(Ge,qe,Te,Fe,Je,lt,Te,Fe,_.DEPTH_BUFFER_BIT,_.NEAREST);O.bindFramebuffer(_.READ_FRAMEBUFFER,null),O.bindFramebuffer(_.DRAW_FRAMEBUFFER,null)}else if(B!==0||y.isRenderTargetTexture||j.has(y)){const cn=j.get(y),kt=j.get(N);O.bindFramebuffer(_.READ_FRAMEBUFFER,Yh),O.bindFramebuffer(_.DRAW_FRAMEBUFFER,Kh);for(let Kt=0;Kt<Ie;Kt++)Mt?_.framebufferTextureLayer(_.READ_FRAMEBUFFER,_.COLOR_ATTACHMENT0,cn.__webglTexture,B,ze+Kt):_.framebufferTexture2D(_.READ_FRAMEBUFFER,_.COLOR_ATTACHMENT0,_.TEXTURE_2D,cn.__webglTexture,B),ln?_.framebufferTextureLayer(_.DRAW_FRAMEBUFFER,_.COLOR_ATTACHMENT0,kt.__webglTexture,fe,Et+Kt):_.framebufferTexture2D(_.DRAW_FRAMEBUFFER,_.COLOR_ATTACHMENT0,_.TEXTURE_2D,kt.__webglTexture,fe),B!==0?_.blitFramebuffer(Ge,qe,Te,Fe,Je,lt,Te,Fe,_.COLOR_BUFFER_BIT,_.NEAREST):ln?_.copyTexSubImage3D(yt,fe,Je,lt,Et+Kt,Ge,qe,Te,Fe):_.copyTexSubImage2D(yt,fe,Je,lt,Ge,qe,Te,Fe);O.bindFramebuffer(_.READ_FRAMEBUFFER,null),O.bindFramebuffer(_.DRAW_FRAMEBUFFER,null)}else ln?y.isDataTexture||y.isData3DTexture?_.texSubImage3D(yt,fe,Je,lt,Et,Te,Fe,Ie,ht,Ve,_t.data):N.isCompressedArrayTexture?_.compressedTexSubImage3D(yt,fe,Je,lt,Et,Te,Fe,Ie,ht,_t.data):_.texSubImage3D(yt,fe,Je,lt,Et,Te,Fe,Ie,ht,Ve,_t):y.isDataTexture?_.texSubImage2D(_.TEXTURE_2D,fe,Je,lt,Te,Fe,ht,Ve,_t.data):y.isCompressedTexture?_.compressedTexSubImage2D(_.TEXTURE_2D,fe,Je,lt,_t.width,_t.height,ht,_t.data):_.texSubImage2D(_.TEXTURE_2D,fe,Je,lt,Te,Fe,ht,Ve,_t);_.pixelStorei(_.UNPACK_ROW_LENGTH,et),_.pixelStorei(_.UNPACK_IMAGE_HEIGHT,en),_.pixelStorei(_.UNPACK_SKIP_PIXELS,Ki),_.pixelStorei(_.UNPACK_SKIP_ROWS,tn),_.pixelStorei(_.UNPACK_SKIP_IMAGES,Os),fe===0&&N.generateMipmaps&&_.generateMipmap(yt),O.unbindTexture()},this.initRenderTarget=function(y){j.get(y).__webglFramebuffer===void 0&&ee.setupRenderTarget(y)},this.initTexture=function(y){y.isCubeTexture?ee.setTextureCube(y,0):y.isData3DTexture?ee.setTexture3D(y,0):y.isDataArrayTexture||y.isCompressedArrayTexture?ee.setTexture2DArray(y,0):ee.setTexture2D(y,0),O.unbindTexture()},this.resetState=function(){R=0,P=0,F=null,O.reset(),xe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Fn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=tt._getDrawingBufferColorSpace(e),t.unpackColorSpace=tt._getUnpackColorSpace()}}const iu={type:"change"},gc={type:"start"},qh={type:"end"},Qr=new ka,su=new fi,aM=Math.cos(70*I_.DEG2RAD),Ct=new z,Zt=2*Math.PI,ut={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Oo=1e-6;class oM extends Mv{constructor(e,t=null){super(e,t),this.state=ut.NONE,this.target=new z,this.cursor=new z,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Sn.ROTATE,MIDDLE:Sn.DOLLY,RIGHT:Sn.PAN},this.touches={ONE:Un.ROTATE,TWO:Un.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new z,this._lastQuaternion=new qi,this._lastTargetPosition=new z,this._quat=new qi().setFromUnitVectors(e.up,new z(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Dd,this._sphericalDelta=new Dd,this._scale=1,this._panOffset=new z,this._rotateStart=new He,this._rotateEnd=new He,this._rotateDelta=new He,this._panStart=new He,this._panEnd=new He,this._panDelta=new He,this._dollyStart=new He,this._dollyEnd=new He,this._dollyDelta=new He,this._dollyDirection=new z,this._mouse=new He,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=cM.bind(this),this._onPointerDown=lM.bind(this),this._onPointerUp=dM.bind(this),this._onContextMenu=_M.bind(this),this._onMouseWheel=fM.bind(this),this._onKeyDown=pM.bind(this),this._onTouchStart=mM.bind(this),this._onTouchMove=gM.bind(this),this._onMouseDown=uM.bind(this),this._onMouseMove=hM.bind(this),this._interceptControlDown=vM.bind(this),this._interceptControlUp=xM.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(iu),this.update(),this.state=ut.NONE}update(e=null){const t=this.object.position;Ct.copy(t).sub(this.target),Ct.applyQuaternion(this._quat),this._spherical.setFromVector3(Ct),this.autoRotate&&this.state===ut.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=Zt:i>Math.PI&&(i-=Zt),s<-Math.PI?s+=Zt:s>Math.PI&&(s-=Zt),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(Ct.setFromSpherical(this._spherical),Ct.applyQuaternion(this._quatInverse),t.copy(this.target).add(Ct),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const o=Ct.length();a=this._clampDistance(o*this._scale);const l=o-a;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){const o=new z(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;const c=new z(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),a=Ct.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(Qr.origin.copy(this.object.position),Qr.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Qr.direction))<aM?this.object.lookAt(this.target):(su.setFromNormalAndCoplanarPoint(this.object.up,this.target),Qr.intersectPlane(su,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Oo||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Oo||this._lastTargetPosition.distanceToSquared(this.target)>Oo?(this.dispatchEvent(iu),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Zt/60*this.autoRotateSpeed*e:Zt/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Ct.setFromMatrixColumn(t,0),Ct.multiplyScalar(-e),this._panOffset.add(Ct)}_panUp(e,t){this.screenSpacePanning===!0?Ct.setFromMatrixColumn(t,1):(Ct.setFromMatrixColumn(t,0),Ct.crossVectors(this.object.up,Ct)),Ct.multiplyScalar(e),this._panOffset.add(Ct)}_pan(e,t){const i=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;Ct.copy(s).sub(this.target);let r=Ct.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/i.clientHeight,this.object.matrix),this._panUp(2*t*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),s=e-i.left,r=t-i.top,a=i.width,o=i.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Zt*this._rotateDelta.x/t.clientHeight),this._rotateUp(Zt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Zt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Zt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Zt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Zt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(i,s)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(i*i+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),s=.5*(e.pageX+i.x),r=.5*(e.pageY+i.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Zt*this._rotateDelta.x/t.clientHeight),this._rotateUp(Zt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new He,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function lM(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n)))}function cM(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function dM(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(qh),this.state=ut.NONE;break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function uM(n){let e;switch(n.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Sn.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=ut.DOLLY;break;case Sn.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=ut.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=ut.ROTATE}break;case Sn.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=ut.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=ut.PAN}break;default:this.state=ut.NONE}this.state!==ut.NONE&&this.dispatchEvent(gc)}function hM(n){switch(this.state){case ut.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case ut.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case ut.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function fM(n){this.enabled===!1||this.enableZoom===!1||this.state!==ut.NONE||(n.preventDefault(),this.dispatchEvent(gc),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(qh))}function pM(n){this.enabled!==!1&&this._handleKeyDown(n)}function mM(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case Un.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=ut.TOUCH_ROTATE;break;case Un.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=ut.TOUCH_PAN;break;default:this.state=ut.NONE}break;case 2:switch(this.touches.TWO){case Un.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=ut.TOUCH_DOLLY_PAN;break;case Un.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=ut.TOUCH_DOLLY_ROTATE;break;default:this.state=ut.NONE}break;default:this.state=ut.NONE}this.state!==ut.NONE&&this.dispatchEvent(gc)}function gM(n){switch(this._trackPointer(n),this.state){case ut.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case ut.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case ut.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case ut.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=ut.NONE}}function _M(n){this.enabled!==!1&&n.preventDefault()}function vM(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function xM(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}class bM extends oM{constructor(e,t){super(e,t),this.screenSpacePanning=!1,this.mouseButtons={LEFT:Sn.PAN,MIDDLE:Sn.DOLLY,RIGHT:Sn.ROTATE},this.touches={ONE:Un.PAN,TWO:Un.DOLLY_ROTATE}}}const yM=Us({__name:"arbol",setup(n){const e=zt(null);let t=null,i,s,r,a=0,o=12369084;const l=new yv;new He;const c=[];let d=null,u=null;const f=new He;let p=null;function g(){const C=e.value,R=C.clientWidth,P=C.clientHeight;t=new rM({antialias:!0}),t.setPixelRatio(Math.min(window.devicePixelRatio,2)),t.setSize(R,P),t.setClearColor(15987958),C.appendChild(t.domElement),t.domElement.addEventListener("mousemove",x),t.domElement.addEventListener("click",m),i=new rv;const F=R/P;s=new hn(75,F,.1,2e3),s.position.set(0,200,0),s.lookAt(0,0,0),r=new bM(s,t.domElement),r.mouseButtons={LEFT:Sn.PAN,MIDDLE:Sn.DOLLY},r.touches={ONE:Un.PAN,TWO:Un.DOLLY_PAN},r.minPolarAngle=0,r.maxPolarAngle=Math.PI/2.5,r.enableDamping=!0;const S=new xv(16777215,1);i.add(S);const L=new vv(16777215,1.5);L.position.set(10,20,15),L.castShadow=!1,i.add(L);const $=new on(new Ca(100,200),new fv({color:o}));$.rotation.x=-Math.PI/2;function J(k,Z="#ffffff",ue=72){const ve=document.createElement("canvas"),le=ve.getContext("2d");ve.width=512,ve.height=256,le.clearRect(0,0,ve.width,ve.height),le.font=`bold ${ue}px Arial`,le.textAlign="center",le.textBaseline="middle",le.strokeStyle="#000000",le.lineWidth=6,le.strokeText(k,ve.width/2,ve.height/2),le.fillStyle=Z,le.fillText(k,ve.width/2,ve.height/2);const Be=new hv(ve);Be.needsUpdate=!0;const A=new Ih({map:Be,transparent:!0,alphaTest:.05,depthTest:!1}),_=new ov(A);return _.scale.set(10,5,1),_}let se=[];const ie=8,Q=[{count:3,radius:15,skills:["A","MIND","B"]},{count:12,radius:45,skills:["DE","","","","H","","","","R","M","CAR","COUNT"],shape:["circle","circle","circle","circle","circle","circle","circle","circle","circle","circle","square","square"]},{count:24,radius:90,skills:["AC","IC","INI","","APU","","","PRO","WP","CAP","","SKIL","","","HP","","DL ","","INTER","","DL","","DE"],shape:["circle","circle","circle","circle","square","circle","circle","square","circle","circle","circle","circle","circle","circle","circle","circle","circle ","circle","square","circle","circle","circle","circle"]},{count:24,radius:135,skills:["OPO","INI","PARR","","AC","","H","CAP","INS","SKILL","WP","","","","TENS","","M","HEA","HP","ADR","R","REAC","",""],shape:["square","circle","square","circle","square","circle","circle","circle","square","circle","circle","circle","circle","square","circle","circle","square ","circle","square","circle","square","circle","circle"]}];function ne(k,Z,ue=!1){const ve=[];if(ue)for(let _=0;_<=50;_++){const H=_/50,X=k.clone().lerp(Z,H);X.y=.05,ve.push(X)}else{const _=new z(0,0,0),H=k.distanceTo(_),X=Math.atan2(k.z,k.x);let O=Math.atan2(Z.z,Z.x)-X;O>Math.PI&&(O-=2*Math.PI),O<-Math.PI&&(O+=2*Math.PI);for(let oe=0;oe<=50;oe++){const j=oe/50,ee=X+O*j,re=new z(Math.cos(ee)*H,.05,Math.sin(ee)*H);ve.push(re)}}const Be=new wn().setFromPoints(ve),A=new Uh({color:6710886,transparent:!0,opacity:.7});return new uv(Be,A)}const V=[];Q.forEach((k,Z)=>{const ue=2*Math.PI/k.count,ve=[];for(let le=0;le<k.count;le++){if(k.shape&&k.shape[le]==="square"){const X=new on(new Ns(ie*2,1,ie*2),new Ea({color:5474695,side:bn})),G=le*ue,O=new z(Math.cos(G+Math.PI/6)*k.radius,.1,Math.sin(G+Math.PI/6)*k.radius);X.position.copy(O),ve.push(O.clone()),X.userData={skillName:k.skills[le]||`Skill ${Z}-${le}`,description:`Habilidad de layer ${Z}, posición ${le}. Esta es una habilidad cuadrada con efectos especiales.`,isSelected:!1,originalColor:5474695,selectedColor:65280,hoverColor:8965256,type:"square",layer:Z,index:le},i.add(X),c.push(X);const oe=k.skills[le]||"";if(oe=="")X.visible=!1;else{const j=J(oe,"#ffffff",200);j.position.copy(X.position),i.add(j)}continue}const Be=new on(new Ca(ie,64),new Ea({color:5474695,side:bn}));Be.rotation.x=-Math.PI/2;const A=le*ue,_=new z(Math.cos(A+Math.PI/6)*k.radius,.1,Math.sin(A+Math.PI/6)*k.radius);Be.position.copy(_),ve.push(_.clone()),Be.userData={skillName:k.skills[le]||`Skill ${Z}-${le}`,description:`Habilidad de layer ${Z}, posición ${le}. Esta habilidad otorga bonificaciones especiales a tu personaje.`,isSelected:!1,originalColor:5474695,selectedColor:65280,hoverColor:8965256,type:"circle",layer:Z,index:le},i.add(Be),c.push(Be);const H=k.skills[le]||"";if(H=="")Be.visible=!1;else{const X=J(H,"#ffffff",200);X.position.copy(Be.position),i.add(X)}}V.push(ve)});function me(k,Z){if(k<0||k>=V.length)return null;const ue=V[k];return!ue||Z<0||Z>=ue.length?null:ue[Z].clone()}function ye(k,Z,ue,ve,le="straight",Be=6710886,A){const _=me(k,Z),H=me(ue,ve);if(!_||!H)return console.warn("Invalid circle positions for connection"),null;const G=ne(_,H,le==="straight"),O=A||`${k}-${Z}_to_${ue}-${ve}_${Date.now()}`;return G.userData={id:O,type:le,fromLayer:k,fromCircle:Z,toLayer:ue,toCircle:ve,color:Be},G.material.color.setHex(Be),i.add(G),se.push(G),O}function Le(k){const Z=se.findIndex(ue=>ue.userData.id===k);if(Z!==-1){const ue=se[Z];return i.remove(ue),ue.geometry.dispose(),ue.material.dispose(),se.splice(Z,1),!0}return!1}function ke(k,Z,ue,ve){let le=0;for(let Be=se.length-1;Be>=0;Be--){const A=se[Be];A.userData.fromLayer===k&&A.userData.fromCircle===Z&&A.userData.toLayer===ue&&A.userData.toCircle===ve&&(i.remove(A),A.geometry.dispose(),A.material.dispose(),se.splice(Be,1),le++)}return le}function it(){for(;se.length>0;){const k=se.pop();i.remove(k),k.geometry.dispose(),k.material.dispose()}}function ot(k,Z=6710886){const ue=[],ve=V[k];if(!ve)return ue;for(let le=0;le<ve.length;le++){const Be=(le+1)%ve.length,A=ye(k,le,k,Be,"curved",Z);A&&ue.push(A)}return ue}const _e={createConnection:ye,removeConnection:Le,removeConnectionsBetween:ke,clearAllConnections:it,createLayerRing:ot,getCirclePosition:me};window.skillTreeAPI=_e,_e.createConnection(1,9,1,10,"curved",0),_e.createConnection(2,0,2,22,"curved",0),_e.createConnection(2,9,2,11,"curved",0),_e.createConnection(2,11,2,14,"curved",0),_e.createConnection(2,16,2,18,"curved",0),_e.createConnection(2,2,2,4,"curved",0),_e.createConnection(3,16,3,17,"curved",0),_e.createConnection(3,17,3,18,"curved",0),_e.createConnection(3,18,3,19,"curved",0),_e.createConnection(3,0,3,1,"curved",0),_e.createConnection(3,1,3,2,"curved",0),_e.createConnection(3,2,3,4,"curved",0),_e.createConnection(3,4,3,6,"curved",0),_e.createConnection(3,6,3,7,"curved",0),_e.createConnection(3,7,3,8,"curved",0),_e.createConnection(3,8,3,9,"curved",0),_e.createConnection(3,10,3,14,"curved",0),_e.createConnection(3,21,3,0,"curved",0),_e.createConnection(0,0,1,0,"straight",0),_e.createConnection(0,1,1,4,"straight",0),_e.createConnection(0,2,1,8,"straight",0),_e.createConnection(0,2,1,9,"straight",0),_e.createConnection(1,0,2,0,"straight",0),_e.createConnection(1,0,2,1,"straight",0),_e.createConnection(1,0,2,2,"straight",0),_e.createConnection(1,8,2,16,"straight",0),_e.createConnection(1,8,2,14,"straight",0),_e.createConnection(1,4,2,7,"straight",0),_e.createConnection(1,4,2,8,"straight",0),_e.createConnection(1,4,2,9,"straight",0),_e.createConnection(1,11,2,22,"straight",0),_e.createConnection(2,20,3,21,"straight",0),_e.createConnection(2,22,3,21,"straight",0),_e.createConnection(2,16,3,16,"straight",0),_e.createConnection(2,18,3,18,"straight",0),_e.createConnection(2,18,3,20,"straight",0),_e.createConnection(2,20,3,20,"straight",0),_e.createConnection(2,0,3,0,"straight",0),_e.createConnection(2,1,3,2,"straight",0),_e.createConnection(2,7,3,7,"straight",0),_e.createConnection(2,8,3,8,"straight",0),_e.createConnection(2,9,3,9,"straight",0),_e.createConnection(2,9,3,10,"straight",0),_e.createConnection(2,14,3,14,"straight",0)}function x(C){const R=t.domElement.getBoundingClientRect();f.x=(C.clientX-R.left)/R.width*2-1,f.y=-((C.clientY-R.top)/R.height)*2+1,l.setFromCamera(f,s);const P=l.intersectObjects(c);if(d&&d!==u&&d.material.color.setHex(d.userData.originalColor),P.length>0){const E=P[0].object;E!==u&&(d=E,E.material.color.setHex(E.userData.hoverColor)),h(C,E),t.domElement.style.cursor="pointer"}else d=null,T(),t.domElement.style.cursor="default"}function m(C){const R=t.domElement.getBoundingClientRect();f.x=(C.clientX-R.left)/R.width*2-1,f.y=-((C.clientY-R.top)/R.height)*2+1,l.setFromCamera(f,s);const P=l.intersectObjects(c);if(P.length>0){const F=P[0].object;u===F?(u.userData.isSelected=!1,u.material.color.setHex(u.userData.originalColor),u=null,console.log(`Deselected skill: ${F.userData.skillName}`)):(u&&(u.userData.isSelected=!1,u.material.color.setHex(u.userData.originalColor)),u=F,F.userData.isSelected=!0,F.material.color.setHex(F.userData.selectedColor),console.log(`Selected skill: ${F.userData.skillName} (Layer ${F.userData.layer}, Index ${F.userData.index})`))}}function h(C,R){p||(p=document.createElement("div"),p.style.cssText=`
      position: fixed;
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 8px 12px;
      border-radius: 4px;
      font-size: 14px;
      pointer-events: none;
      z-index: 1000;
      max-width: 200px;
      line-height: 1.4;
    `,document.body.appendChild(p)),p.innerHTML=`
    <strong>${R.userData.skillName}</strong><br>
    <small>${R.userData.description}</small><br>
    <em>Tipo: ${R.userData.type==="circle"?"Círculo":"Cuadrado"}</em>
  `,p.style.left=C.clientX+10+"px",p.style.top=C.clientY-10+"px",p.style.display="block"}function T(){p&&(p.style.display="none")}function w(){a=requestAnimationFrame(w),r.update(),t.render(i,s)}function M(){cancelAnimationFrame(a),r.dispose(),i.traverse(C=>{C instanceof on&&(C.geometry&&C.geometry.dispose(),C.material&&(Array.isArray(C.material)?C.material.forEach(R=>{R.dispose()}):C.material.dispose()))}),p&&(document.body.removeChild(p),p=null),t?.domElement&&(t.domElement.removeEventListener("mousemove",x),t.domElement.removeEventListener("click",m)),t&&(t.dispose(),t.domElement.remove(),t=null)}return ji(()=>{e.value&&(console.log("Mounted arbol.vue"),g(),w())}),zu(()=>{M()}),(C,R)=>(Pe(),De("div",{ref_key:"box",ref:e,class:"w-250 h-250 relative"},null,512))}}),MM={class:"space-y-6"},SM={class:"bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-6 shadow-lg"},EM={class:"flex items-center justify-between"},TM={class:"text-4xl font-bold mt-1"},AM={class:"text-right opacity-90"},wM={class:"text-2xl font-semibold"},CM={class:"bg-blue-50 border-2 border-blue-200 rounded-lg overflow-hidden"},RM={class:"divide-y divide-blue-200"},PM={class:"col-span-1 flex justify-center"},DM={key:0,class:"text-white text-sm font-bold"},IM={class:"col-span-3"},LM={class:"font-semibold text-blue-700"},UM={class:"text-xs text-blue-500"},NM={class:"col-span-2 text-center"},FM={class:"inline-flex items-center justify-center bg-white border-2 border-blue-300 rounded-lg px-4 py-2 font-bold text-blue-700 min-w-[60px]"},OM={class:"col-span-2 text-center"},BM={class:"flex items-center justify-center gap-2"},zM=["onClick","disabled"],HM=["onUpdate:modelValue","onInput"],VM=["onClick","disabled"],kM={class:"col-span-2 text-center"},GM=["onUpdate:modelValue"],qM={class:"col-span-2 text-center"},WM={class:"inline-flex items-center justify-center bg-blue-600 text-white rounded-lg px-4 py-2 font-bold text-lg min-w-[60px] shadow-md"},XM={class:"bg-green-50 border-2 border-green-200 rounded-lg overflow-hidden"},jM={class:"divide-y divide-green-200"},$M={class:"col-span-1 flex justify-center"},YM={key:0,class:"text-white text-sm font-bold"},KM={class:"col-span-3"},ZM={class:"font-semibold text-green-700"},JM={class:"text-xs text-green-500"},QM={class:"col-span-2 text-center"},eS={class:"inline-flex items-center justify-center bg-white border-2 border-green-300 rounded-lg px-4 py-2 font-bold text-green-700 min-w-[60px]"},tS={class:"col-span-2 text-center"},nS={class:"flex items-center justify-center gap-2"},iS=["onClick","disabled"],sS=["onUpdate:modelValue","onInput"],rS=["onClick","disabled"],aS={class:"col-span-2 text-center"},oS=["onUpdate:modelValue"],lS={class:"col-span-2 text-center"},cS={class:"inline-flex items-center justify-center bg-green-600 text-white rounded-lg px-4 py-2 font-bold text-lg min-w-[60px] shadow-md"},dS={class:"bg-amber-50 border-2 border-amber-200 rounded-lg overflow-hidden"},uS={class:"divide-y divide-amber-200"},hS={class:"col-span-1 flex justify-center"},fS={key:0,class:"text-white text-sm font-bold"},pS={class:"col-span-3"},mS={class:"font-semibold text-amber-700"},gS={class:"text-xs text-amber-500"},_S={class:"col-span-2 text-center"},vS={class:"inline-flex items-center justify-center bg-white border-2 border-amber-300 rounded-lg px-4 py-2 font-bold text-amber-700 min-w-[60px]"},xS={class:"col-span-2 text-center"},bS={class:"flex items-center justify-center gap-2"},yS=["onClick","disabled"],MS=["onUpdate:modelValue","onInput"],SS=["onClick","disabled"],ES={class:"col-span-2 text-center"},TS=["onUpdate:modelValue"],AS={class:"col-span-2 text-center"},wS={class:"inline-flex items-center justify-center bg-amber-600 text-white rounded-lg px-4 py-2 font-bold text-lg min-w-[60px] shadow-md"},ru=20,CS=Us({__name:"habilidades",setup(n){const{characterData:e,loadCharacterData:t}=_r(),i=zt(sc.habilidades.map(f=>({id:f.id,nombre:f.nombre,atributo:f.atributo,competente:!1,modAtributo:0,rangos:0,bonifDiversos:0}))),s=$t(()=>i.value.reduce((f,p)=>f+p.rangos,0)),r=$t(()=>ru-s.value),a=$t(()=>i.value.filter(f=>f.atributo!=="Artesania"&&f.atributo!=="Recoleccion")),o=$t(()=>i.value.filter(f=>f.atributo==="Artesania")),l=$t(()=>i.value.filter(f=>f.atributo==="Recoleccion"));ji(()=>{t();const f=[...e.value.oficio_habilidades||[],...e.value.trasfondo_habilidades||[]];i.value.forEach(p=>{p.competente=f.includes(p.nombre)})}),St(()=>[e.value.oficio_habilidades,e.value.trasfondo_habilidades],()=>{const f=[...e.value.oficio_habilidades||[],...e.value.trasfondo_habilidades||[]];i.value.forEach(p=>{p.competente=f.includes(p.nombre)})},{deep:!0});function c(f){const p=f.competente?2:0;return f.modAtributo+f.rangos+f.bonifDiversos+p}function d(f,p){const g=f.rangos+p;g>=0&&(p<0||r.value>0)&&(f.rangos=g)}function u(f){f.rangos<0&&(f.rangos=0),isNaN(f.rangos)&&(f.rangos=0)}return(f,p)=>(Pe(),De(nt,null,[p[6]||(p[6]=D("h2",{class:"text-3xl font-bold text-blue-600 mb-6 pb-4 border-b border-blue-200"}," Habilidades ",-1)),D("div",MM,[D("div",SM,[D("div",EM,[D("div",null,[p[0]||(p[0]=D("div",{class:"text-sm font-semibold uppercase tracking-wide opacity-90"},"Puntos Disponibles",-1)),D("div",TM,Se(r.value),1)]),D("div",AM,[p[1]||(p[1]=D("div",{class:"text-sm"},"Total asignado",-1)),D("div",wM,Se(s.value)+" / "+Se(ru),1)])])]),D("div",CM,[p[2]||(p[2]=vs('<div class="bg-blue-600 text-white px-6 py-3"><h3 class="text-xl font-bold">Habilidades Generales</h3></div><div class="bg-blue-600 text-white grid grid-cols-12 gap-4 px-6 py-4 font-semibold text-sm"><div class="col-span-1 text-center">Comp.</div><div class="col-span-3">Habilidad</div><div class="col-span-2 text-center">Mod. Atributo</div><div class="col-span-2 text-center">Puntos Rangos</div><div class="col-span-2 text-center">Bonif. Diversos</div><div class="col-span-2 text-center">Total</div></div>',2)),D("div",RM,[(Pe(!0),De(nt,null,Nt(a.value,g=>(Pe(),De("div",{key:g.id,class:"grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-blue-100 transition-colors"},[D("div",PM,[D("div",{class:xt(["w-6 h-6 rounded border-2 flex items-center justify-center",g.competente?"bg-blue-500 border-blue-500":"bg-white border-blue-300"])},[g.competente?(Pe(),De("span",DM,"✓")):vt("",!0)],2)]),D("div",IM,[D("div",LM,Se(g.nombre),1),D("div",UM,"("+Se(g.atributo)+")",1)]),D("div",NM,[D("div",FM,Se(g.modAtributo>=0?"+":"")+Se(g.modAtributo),1)]),D("div",OM,[D("div",BM,[D("button",{onClick:x=>d(g,-1),disabled:g.rangos<=0,class:"w-8 h-8 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600 disabled:bg-blue-200 disabled:cursor-not-allowed transition-colors"}," - ",8,zM),xn(D("input",{type:"number","onUpdate:modelValue":x=>g.rangos=x,onInput:x=>u(g),class:"w-16 text-center bg-white border-2 border-blue-300 rounded-lg px-2 py-2 font-bold text-blue-700 focus:outline-none focus:border-blue-500",min:"0"},null,40,HM),[[hi,g.rangos,void 0,{number:!0}]]),D("button",{onClick:x=>d(g,1),disabled:r.value<=0,class:"w-8 h-8 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600 disabled:bg-blue-200 disabled:cursor-not-allowed transition-colors"}," + ",8,VM)])]),D("div",kM,[xn(D("input",{type:"number","onUpdate:modelValue":x=>g.bonifDiversos=x,class:"w-20 text-center bg-white border-2 border-blue-300 rounded-lg px-2 py-2 font-bold text-blue-700 focus:outline-none focus:border-blue-500"},null,8,GM),[[hi,g.bonifDiversos,void 0,{number:!0}]])]),D("div",qM,[D("div",WM,Se(c(g)>=0?"+":"")+Se(c(g)),1)])]))),128))])]),D("div",XM,[p[3]||(p[3]=vs('<div class="bg-green-600 text-white px-6 py-3"><h3 class="text-xl font-bold">Habilidades de Artesanía</h3></div><div class="bg-green-600 text-white grid grid-cols-12 gap-4 px-6 py-4 font-semibold text-sm"><div class="col-span-1 text-center">Comp.</div><div class="col-span-3">Habilidad</div><div class="col-span-2 text-center">Mod. Atributo</div><div class="col-span-2 text-center">Puntos Rangos</div><div class="col-span-2 text-center">Bonif. Diversos</div><div class="col-span-2 text-center">Total</div></div>',2)),D("div",jM,[(Pe(!0),De(nt,null,Nt(o.value,g=>(Pe(),De("div",{key:g.id,class:"grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-green-100 transition-colors"},[D("div",$M,[D("div",{class:xt(["w-6 h-6 rounded border-2 flex items-center justify-center",g.competente?"bg-green-500 border-green-500":"bg-white border-green-300"])},[g.competente?(Pe(),De("span",YM,"✓")):vt("",!0)],2)]),D("div",KM,[D("div",ZM,Se(g.nombre),1),D("div",JM,"("+Se(g.atributo)+")",1)]),D("div",QM,[D("div",eS,Se(g.modAtributo>=0?"+":"")+Se(g.modAtributo),1)]),D("div",tS,[D("div",nS,[D("button",{onClick:x=>d(g,-1),disabled:g.rangos<=0,class:"w-8 h-8 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600 disabled:bg-green-200 disabled:cursor-not-allowed transition-colors"}," - ",8,iS),xn(D("input",{type:"number","onUpdate:modelValue":x=>g.rangos=x,onInput:x=>u(g),class:"w-16 text-center bg-white border-2 border-green-300 rounded-lg px-2 py-2 font-bold text-green-700 focus:outline-none focus:border-green-500",min:"0"},null,40,sS),[[hi,g.rangos,void 0,{number:!0}]]),D("button",{onClick:x=>d(g,1),disabled:r.value<=0,class:"w-8 h-8 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600 disabled:bg-green-200 disabled:cursor-not-allowed transition-colors"}," + ",8,rS)])]),D("div",aS,[xn(D("input",{type:"number","onUpdate:modelValue":x=>g.bonifDiversos=x,class:"w-20 text-center bg-white border-2 border-green-300 rounded-lg px-2 py-2 font-bold text-green-700 focus:outline-none focus:border-green-500"},null,8,oS),[[hi,g.bonifDiversos,void 0,{number:!0}]])]),D("div",lS,[D("div",cS,Se(c(g)>=0?"+":"")+Se(c(g)),1)])]))),128))])]),D("div",dS,[p[4]||(p[4]=vs('<div class="bg-amber-600 text-white px-6 py-3"><h3 class="text-xl font-bold">Habilidades de Recolección</h3></div><div class="bg-amber-600 text-white grid grid-cols-12 gap-4 px-6 py-4 font-semibold text-sm"><div class="col-span-1 text-center">Comp.</div><div class="col-span-3">Habilidad</div><div class="col-span-2 text-center">Mod. Atributo</div><div class="col-span-2 text-center">Puntos Rangos</div><div class="col-span-2 text-center">Bonif. Diversos</div><div class="col-span-2 text-center">Total</div></div>',2)),D("div",uS,[(Pe(!0),De(nt,null,Nt(l.value,g=>(Pe(),De("div",{key:g.id,class:"grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-amber-100 transition-colors"},[D("div",hS,[D("div",{class:xt(["w-6 h-6 rounded border-2 flex items-center justify-center",g.competente?"bg-amber-500 border-amber-500":"bg-white border-amber-300"])},[g.competente?(Pe(),De("span",fS,"✓")):vt("",!0)],2)]),D("div",pS,[D("div",mS,Se(g.nombre),1),D("div",gS,"("+Se(g.atributo)+")",1)]),D("div",_S,[D("div",vS,Se(g.modAtributo>=0?"+":"")+Se(g.modAtributo),1)]),D("div",xS,[D("div",bS,[D("button",{onClick:x=>d(g,-1),disabled:g.rangos<=0,class:"w-8 h-8 bg-amber-500 text-white rounded-lg font-bold hover:bg-amber-600 disabled:bg-amber-200 disabled:cursor-not-allowed transition-colors"}," - ",8,yS),xn(D("input",{type:"number","onUpdate:modelValue":x=>g.rangos=x,onInput:x=>u(g),class:"w-16 text-center bg-white border-2 border-amber-300 rounded-lg px-2 py-2 font-bold text-amber-700 focus:outline-none focus:border-amber-500",min:"0"},null,40,MS),[[hi,g.rangos,void 0,{number:!0}]]),D("button",{onClick:x=>d(g,1),disabled:r.value<=0,class:"w-8 h-8 bg-amber-500 text-white rounded-lg font-bold hover:bg-amber-600 disabled:bg-amber-200 disabled:cursor-not-allowed transition-colors"}," + ",8,SS)])]),D("div",ES,[xn(D("input",{type:"number","onUpdate:modelValue":x=>g.bonifDiversos=x,class:"w-20 text-center bg-white border-2 border-amber-300 rounded-lg px-2 py-2 font-bold text-amber-700 focus:outline-none focus:border-amber-500"},null,8,TS),[[hi,g.bonifDiversos,void 0,{number:!0}]])]),D("div",AS,[D("div",wS,Se(c(g)>=0?"+":"")+Se(c(g)),1)])]))),128))])]),p[5]||(p[5]=vs('<div class="bg-blue-50 border-2 border-blue-200 rounded-lg p-4"><h4 class="font-semibold text-blue-700 mb-2">Leyenda:</h4><div class="text-sm text-blue-600 space-y-1"><div><span class="font-semibold">Comp.:</span> Indica si tienes competencia en esta habilidad (otorgado por clase/trasfondo)</div><div><span class="font-semibold">Mod. Atributo:</span> Modificador del atributo asociado a la habilidad</div><div><span class="font-semibold">Puntos Rangos:</span> Puntos que asignas para mejorar esta habilidad</div><div><span class="font-semibold">Bonif. Diversos:</span> Bonificadores adicionales de objetos, dotes o efectos temporales</div><div><span class="font-semibold">Total:</span> Suma de todos los modificadores (este es el valor que usarás en tus tiradas)</div></div></div>',1))])],64))}}),RS={class:"space-y-8"},PS={class:"flex items-center justify-between mb-4"},DS={class:"text-sm text-blue-600"},IS={class:"font-bold"},LS={class:"bg-blue-50 border-2 border-blue-200 rounded-lg overflow-hidden"},US={class:"divide-y divide-blue-200 max-h-96 overflow-y-auto"},NS=["onClick"],FS={class:"col-span-1 flex justify-center"},OS={key:0,class:"text-white text-sm font-bold"},BS={class:"col-span-2"},zS={class:"font-semibold text-blue-700"},HS={class:"col-span-1 text-center"},VS={class:"inline-flex items-center justify-center bg-white border border-blue-300 rounded px-2 py-1 text-blue-700 font-medium text-sm min-w-[40px]"},kS={class:"col-span-1 text-center"},GS={class:"inline-flex items-center justify-center bg-white border border-blue-300 rounded px-2 py-1 text-blue-700 font-medium text-sm min-w-[40px]"},qS={class:"col-span-1 text-center"},WS={class:"inline-flex items-center justify-center bg-white border border-blue-300 rounded px-2 py-1 text-blue-700 font-medium text-sm min-w-[40px]"},XS={class:"col-span-3"},jS={class:"flex flex-wrap gap-1"},$S={class:"col-span-1 text-center"},YS={class:"inline-flex items-center justify-center bg-white border border-blue-300 rounded px-2 py-1 text-blue-700 font-bold text-sm"},KS={class:"col-span-1 text-center"},ZS={class:"inline-flex items-center justify-center bg-white border border-blue-300 rounded px-2 py-1 text-blue-700 font-medium text-sm"},JS={class:"col-span-1 text-center"},QS={class:"inline-flex items-center justify-center bg-white border border-blue-300 rounded px-2 py-1 text-blue-700 font-medium text-sm"},eE={class:"flex items-center justify-between mb-4"},tE={class:"text-sm text-blue-600"},nE={class:"font-bold"},iE={class:"bg-blue-50 border-2 border-blue-200 rounded-lg overflow-hidden"},sE={class:"divide-y divide-blue-200 max-h-96 overflow-y-auto"},rE=["onClick"],aE={class:"col-span-1 flex justify-center"},oE={key:0,class:"text-white text-sm font-bold"},lE={class:"col-span-3"},cE={class:"font-semibold text-blue-700"},dE={class:"col-span-2 text-center"},uE={class:"inline-flex items-center justify-center bg-white border border-blue-300 rounded px-3 py-1 text-blue-700 font-medium text-sm min-w-[50px]"},hE={class:"col-span-2 text-center"},fE={class:"inline-flex items-center justify-center bg-white border border-blue-300 rounded px-3 py-1 text-blue-700 font-medium text-sm min-w-[50px]"},pE={class:"col-span-2 text-center"},mE={class:"inline-flex items-center justify-center bg-white border border-blue-300 rounded px-3 py-1 text-blue-700 font-medium text-sm min-w-[50px]"},gE={class:"col-span-2"},_E={class:"flex flex-wrap gap-1"},vE=Us({__name:"equipo",setup(n){const e=zt([{id:1,nombre:"Espada Larga",danoLacerante:4,danoCortante:8,danoContundente:0,etiquetas:["Versátil","Militar"],critico:2,rangoCritico:"19/20",distancia:0},{id:2,nombre:"Daga",danoLacerante:2,danoCortante:4,danoContundente:0,etiquetas:["Ligera","Arrojadiza","Simple"],critico:2,rangoCritico:"19/20",distancia:10},{id:3,nombre:"Hacha de Batalla",danoLacerante:0,danoCortante:12,danoContundente:0,etiquetas:["A Dos Manos","Hacha","Militar"],critico:3,rangoCritico:"20",distancia:0},{id:4,nombre:"Martillo de Guerra",danoLacerante:0,danoCortante:0,danoContundente:10,etiquetas:["Versátil","Contundente","Militar"],critico:3,rangoCritico:"20",distancia:0},{id:5,nombre:"Arco Largo",danoLacerante:8,danoCortante:0,danoContundente:0,etiquetas:["A Dos Manos","Arco","Militar"],critico:3,rangoCritico:"20",distancia:100},{id:6,nombre:"Lanza",danoLacerante:6,danoCortante:0,danoContundente:0,etiquetas:["Enastada","Arrojadiza","Simple"],critico:3,rangoCritico:"20",distancia:20},{id:7,nombre:"Escudo",danoLacerante:0,danoCortante:0,danoContundente:4,etiquetas:["Escudo","Defensivo"],critico:2,rangoCritico:"20",distancia:0},{id:8,nombre:"Espada Corta",danoLacerante:3,danoCortante:6,danoContundente:0,etiquetas:["Ligera","Perforante","Militar"],critico:2,rangoCritico:"19/20",distancia:0},{id:9,nombre:"Alabarda",danoLacerante:4,danoCortante:8,danoContundente:4,etiquetas:["A Dos Manos","Enastada","Pesada","Militar"],critico:3,rangoCritico:"20",distancia:0},{id:10,nombre:"Ballesta Pesada",danoLacerante:10,danoCortante:0,danoContundente:0,etiquetas:["A Dos Manos","Ballesta","Pesada"],critico:2,rangoCritico:"19/20",distancia:120}]),t=zt([{id:1,nombre:"Armadura de Cuero",danoLacerante:2,danoCortante:2,danoContundente:0,etiquetas:["Ligera"]},{id:2,nombre:"Cota de Mallas",danoLacerante:5,danoCortante:6,danoContundente:3,etiquetas:["Media","Metal"]},{id:3,nombre:"Armadura de Placas",danoLacerante:8,danoCortante:8,danoContundente:6,etiquetas:["Pesada","Metal"]},{id:4,nombre:"Armadura Acolchada",danoLacerante:1,danoCortante:1,danoContundente:2,etiquetas:["Ligera","Tela"]},{id:5,nombre:"Cota de Escamas",danoLacerante:4,danoCortante:5,danoContundente:2,etiquetas:["Media","Metal"]},{id:6,nombre:"Coraza",danoLacerante:6,danoCortante:6,danoContundente:4,etiquetas:["Media","Metal"]},{id:7,nombre:"Armadura de Cuero Tachonado",danoLacerante:3,danoCortante:3,danoContundente:1,etiquetas:["Ligera","Reforzada"]},{id:8,nombre:"Armadura Completa",danoLacerante:10,danoCortante:10,danoContundente:8,etiquetas:["Pesada","Metal","Completa"]}]),i=zt([]),s=zt([]);function r(o){const l=i.value.indexOf(o);l===-1?i.value.push(o):i.value.splice(l,1)}function a(o){const l=s.value.indexOf(o);l===-1?s.value.push(o):s.value.splice(l,1)}return(o,l)=>(Pe(),De(nt,null,[l[6]||(l[6]=D("h2",{class:"text-3xl font-bold text-blue-600 mb-6 pb-4 border-b border-blue-200"}," Equipo ",-1)),D("div",RS,[D("div",null,[D("div",PS,[l[1]||(l[1]=D("h3",{class:"text-2xl font-bold text-blue-700"},"Armas",-1)),D("div",DS,[l[0]||(l[0]=Mi(" Seleccionadas: ",-1)),D("span",IS,Se(i.value.length),1)])]),D("div",LS,[l[2]||(l[2]=vs('<div class="bg-blue-600 text-white grid grid-cols-12 gap-3 px-4 py-3 font-semibold text-sm"><div class="col-span-1 text-center">Sel.</div><div class="col-span-2">Arma</div><div class="col-span-1 text-center">Lac.</div><div class="col-span-1 text-center">Cor.</div><div class="col-span-1 text-center">Con.</div><div class="col-span-3">Etiquetas</div><div class="col-span-1 text-center">Crítico</div><div class="col-span-1 text-center">Rango Crít.</div><div class="col-span-1 text-center">Distancia</div></div>',1)),D("div",US,[(Pe(!0),De(nt,null,Nt(e.value,c=>(Pe(),De("div",{key:c.id,onClick:d=>r(c.id),class:xt(["grid grid-cols-12 gap-3 px-4 py-3 items-center cursor-pointer transition-colors",i.value.includes(c.id)?"bg-blue-200 hover:bg-blue-250":"bg-white hover:bg-blue-100"])},[D("div",FS,[D("div",{class:xt(["w-6 h-6 rounded border-2 flex items-center justify-center transition-colors",i.value.includes(c.id)?"bg-blue-500 border-blue-500":"bg-white border-blue-300"])},[i.value.includes(c.id)?(Pe(),De("span",OS,"✓")):vt("",!0)],2)]),D("div",BS,[D("div",zS,Se(c.nombre),1)]),D("div",HS,[D("div",VS,Se(c.danoLacerante),1)]),D("div",kS,[D("div",GS,Se(c.danoCortante),1)]),D("div",qS,[D("div",WS,Se(c.danoContundente),1)]),D("div",XS,[D("div",jS,[(Pe(!0),De(nt,null,Nt(c.etiquetas,d=>(Pe(),De("span",{key:d,class:"px-2 py-0.5 bg-blue-500 text-white text-xs rounded-full font-medium"},Se(d),1))),128))])]),D("div",$S,[D("div",YS," x"+Se(c.critico),1)]),D("div",KS,[D("div",ZS,Se(c.rangoCritico),1)]),D("div",JS,[D("div",QS,Se(c.distancia),1)])],10,NS))),128))])])]),D("div",null,[D("div",eE,[l[4]||(l[4]=D("h3",{class:"text-2xl font-bold text-blue-700"},"Armaduras",-1)),D("div",tE,[l[3]||(l[3]=Mi(" Seleccionadas: ",-1)),D("span",nE,Se(s.value.length),1)])]),D("div",iE,[l[5]||(l[5]=vs('<div class="bg-blue-600 text-white grid grid-cols-12 gap-3 px-4 py-3 font-semibold text-sm"><div class="col-span-1 text-center">Sel.</div><div class="col-span-3">Armadura</div><div class="col-span-2 text-center">Lac.</div><div class="col-span-2 text-center">Cor.</div><div class="col-span-2 text-center">Con.</div><div class="col-span-2">Etiquetas</div></div>',1)),D("div",sE,[(Pe(!0),De(nt,null,Nt(t.value,c=>(Pe(),De("div",{key:c.id,onClick:d=>a(c.id),class:xt(["grid grid-cols-12 gap-3 px-4 py-3 items-center cursor-pointer transition-colors",s.value.includes(c.id)?"bg-blue-200 hover:bg-blue-250":"bg-white hover:bg-blue-100"])},[D("div",aE,[D("div",{class:xt(["w-6 h-6 rounded border-2 flex items-center justify-center transition-colors",s.value.includes(c.id)?"bg-blue-500 border-blue-500":"bg-white border-blue-300"])},[s.value.includes(c.id)?(Pe(),De("span",oE,"✓")):vt("",!0)],2)]),D("div",lE,[D("div",cE,Se(c.nombre),1)]),D("div",dE,[D("div",uE,Se(c.danoLacerante),1)]),D("div",hE,[D("div",fE,Se(c.danoCortante),1)]),D("div",pE,[D("div",mE,Se(c.danoContundente),1)]),D("div",gE,[D("div",_E,[(Pe(!0),De(nt,null,Nt(c.etiquetas,d=>(Pe(),De("span",{key:d,class:"px-2 py-0.5 bg-blue-500 text-white text-xs rounded-full font-medium"},Se(d),1))),128))])])],10,rE))),128))])])])])],64))}}),xE={class:"bg-gradient-to-br from-gray-50 via-white to-gray-50 min-h-screen p-6"},bE={class:"max-w-350 mx-auto"},yE={class:"flex flex-col lg:flex-row gap-6"},ME={class:"lg:w-64 flex-shrink-0"},SE={class:"bg-white backdrop-blur-sm border-2 border-gray-200 rounded-xl p-4 shadow-xl"},EE={class:"space-y-2"},TE=["onClick"],AE={class:"flex items-center gap-3"},wE={class:"flex-1"},CE={class:"bg-white backdrop-blur-sm border-2 border-gray-200 rounded-xl p-8 shadow-xl min-h-[500px]"},RE={class:"text-3xl font-bold text-gray-600 mb-6 pb-4 border-b border-gray-200"},PE={key:0,class:"space-y-6"},DE={key:1,class:"space-y-6"},IE={key:2,class:"space-y-6"},LE={key:3,class:"space-y-6"},UE={key:4,class:"space-y-6"},NE={key:5,class:"space-y-6"},FE={key:6,class:"space-y-6"},OE={class:"flex justify-center items-center gap-4 mt-8 pt-6 border-t border-gray-200"},BE=["disabled"],zE=["disabled"],HE=Us({__name:"crear_personaje",setup(n){const e=zt(0),t=["Información General","Trasfondo","Oficio","Estilo Marcial","Arbol","Habilidades","Equipo"];return(i,s)=>(Pe(),De("div",xE,[D("div",bE,[s[3]||(s[3]=D("div",{class:"text-center mb-8"},[D("h1",{class:"text-4xl md:text-5xl font-bold text-gray-600 mb-2 drop-shadow-lg"}," Creación de Personaje ")],-1)),D("div",yE,[D("div",ME,[D("div",SE,[s[2]||(s[2]=D("h2",{class:"text-lg font-bold text-gray-700 mb-4 pb-3 border-b border-gray-200"}," Índice ",-1)),D("nav",EE,[(Pe(),De(nt,null,Nt(t,(r,a)=>D("button",{key:a,onClick:o=>e.value=a,class:xt(["w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-200",e.value===a?"bg-blue-500 text-white shadow-lg shadow-blue-500/30":"bg-blue-50 text-gray-700 hover:bg-gray-100 hover:text-gray-800"])},[D("span",AE,[D("span",{class:xt(["flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold",e.value===a?"bg-white text-blue-500":"bg-gray-200 text-blue-700"])},Se(a+1),3),Mi(" "+Se(r),1)])],10,TE)),64))])])]),D("div",wE,[D("div",CE,[D("h2",RE,Se(t[e.value]),1),e.value===0?(Pe(),De("div",PE,[Lt(ym)])):vt("",!0),e.value===1?(Pe(),De("div",DE,[Lt(Gm)])):vt("",!0),e.value===2?(Pe(),De("div",IE,[Lt(vg)])):vt("",!0),e.value===3?(Pe(),De("div",LE,[Lt(Gg)])):vt("",!0),e.value===4?(Pe(),De("div",UE,[Lt(yM)])):vt("",!0),e.value===5?(Pe(),De("div",NE,[Lt(CS)])):vt("",!0),e.value===6?(Pe(),De("div",FE,[Lt(vE)])):vt("",!0),D("div",OE,[D("button",{onClick:s[0]||(s[0]=r=>e.value=Math.max(0,e.value-1)),disabled:e.value===0,class:xt(["px-6 py-3 rounded-lg font-semibold transition-all duration-200",e.value===0?"bg-gray-100 text-gray-300 cursor-not-allowed":"bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-lg"])}," ← Anterior ",10,BE),D("button",{onClick:s[1]||(s[1]=r=>e.value=Math.min(t.length-1,e.value+1)),disabled:e.value===t.length-1,class:xt(["px-6 py-3 rounded-lg font-semibold transition-all duration-200",e.value===t.length-1?"bg-blue-100 text-gray-300 cursor-not-allowed":"bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/30"])}," Siguiente → ",10,zE)])])])])])]))}}),VE=Us({__name:"App",setup(n){return(e,t)=>(Pe(),rh(HE))}});mm(VE).mount("#app");
