(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(s){if(s.ep)return;s.ep=!0;const a=t(s);fetch(s.href,a)}})();/**
* @vue/shared v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Kl(n){const e=Object.create(null);for(const t of n.split(","))e[t]=1;return t=>t in e}const vt={},Cs=[],Hn=()=>{},pu=()=>!1,zr=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&(n.charCodeAt(2)>122||n.charCodeAt(2)<97),Zl=n=>n.startsWith("onUpdate:"),jt=Object.assign,Jl=(n,e)=>{const t=n.indexOf(e);t>-1&&n.splice(t,1)},dh=Object.prototype.hasOwnProperty,dt=(n,e)=>dh.call(n,e),We=Array.isArray,Rs=n=>Ma(n)==="[object Map]",Gs=n=>Ma(n)==="[object Set]",Dc=n=>Ma(n)==="[object Date]",Ye=n=>typeof n=="function",It=n=>typeof n=="string",Vn=n=>typeof n=="symbol",xt=n=>n!==null&&typeof n=="object",mu=n=>(xt(n)||Ye(n))&&Ye(n.then)&&Ye(n.catch),gu=Object.prototype.toString,Ma=n=>gu.call(n),uh=n=>Ma(n).slice(8,-1),_u=n=>Ma(n)==="[object Object]",Ql=n=>It(n)&&n!=="NaN"&&n[0]!=="-"&&""+parseInt(n,10)===n,aa=Kl(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Hr=n=>{const e=Object.create(null);return(t=>e[t]||(e[t]=n(t)))},fh=/-\w/g,Ti=Hr(n=>n.replace(fh,e=>e.slice(1).toUpperCase())),hh=/\B([A-Z])/g,Zi=Hr(n=>n.replace(hh,"-$1").toLowerCase()),vu=Hr(n=>n.charAt(0).toUpperCase()+n.slice(1)),to=Hr(n=>n?`on${vu(n)}`:""),yi=(n,e)=>!Object.is(n,e),fr=(n,...e)=>{for(let t=0;t<n.length;t++)n[t](...e)},bu=(n,e,t,i=!1)=>{Object.defineProperty(n,e,{configurable:!0,enumerable:!1,writable:i,value:t})},Sr=n=>{const e=parseFloat(n);return isNaN(e)?n:e};let Ic;const Vr=()=>Ic||(Ic=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function ec(n){if(We(n)){const e={};for(let t=0;t<n.length;t++){const i=n[t],s=It(i)?_h(i):ec(i);if(s)for(const a in s)e[a]=s[a]}return e}else if(It(n)||xt(n))return n}const ph=/;(?![^(]*\))/g,mh=/:([^]+)/,gh=/\/\*[^]*?\*\//g;function _h(n){const e={};return n.replace(gh,"").split(ph).forEach(t=>{if(t){const i=t.split(mh);i.length>1&&(e[i[0].trim()]=i[1].trim())}}),e}function Et(n){let e="";if(It(n))e=n;else if(We(n))for(let t=0;t<n.length;t++){const i=Et(n[t]);i&&(e+=i+" ")}else if(xt(n))for(const t in n)n[t]&&(e+=t+" ");return e.trim()}const vh="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",bh=Kl(vh);function xu(n){return!!n||n===""}function xh(n,e){if(n.length!==e.length)return!1;let t=!0;for(let i=0;t&&i<n.length;i++)t=Ea(n[i],e[i]);return t}function Ea(n,e){if(n===e)return!0;let t=Dc(n),i=Dc(e);if(t||i)return t&&i?n.getTime()===e.getTime():!1;if(t=Vn(n),i=Vn(e),t||i)return n===e;if(t=We(n),i=We(e),t||i)return t&&i?xh(n,e):!1;if(t=xt(n),i=xt(e),t||i){if(!t||!i)return!1;const s=Object.keys(n).length,a=Object.keys(e).length;if(s!==a)return!1;for(const o in n){const r=n.hasOwnProperty(o),l=e.hasOwnProperty(o);if(r&&!l||!r&&l||!Ea(n[o],e[o]))return!1}}return String(n)===String(e)}function tc(n,e){return n.findIndex(t=>Ea(t,e))}const yu=n=>!!(n&&n.__v_isRef===!0),$=n=>It(n)?n:n==null?"":We(n)||xt(n)&&(n.toString===gu||!Ye(n.toString))?yu(n)?$(n.value):JSON.stringify(n,Su,2):String(n),Su=(n,e)=>yu(e)?Su(n,e.value):Rs(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((t,[i,s],a)=>(t[no(i,a)+" =>"]=s,t),{})}:Gs(e)?{[`Set(${e.size})`]:[...e.values()].map(t=>no(t))}:Vn(e)?no(e):xt(e)&&!We(e)&&!_u(e)?String(e):e,no=(n,e="")=>{var t;return Vn(n)?`Symbol(${(t=n.description)!=null?t:e})`:n};/**
* @vue/reactivity v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let nn;class yh{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.parent=nn,!e&&nn&&(this.index=(nn.scopes||(nn.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,t;if(this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].pause();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,t;if(this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].resume();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].resume()}}run(e){if(this._active){const t=nn;try{return nn=this,e()}finally{nn=t}}}on(){++this._on===1&&(this.prevScope=nn,nn=this)}off(){this._on>0&&--this._on===0&&(nn=this.prevScope,this.prevScope=void 0)}stop(e){if(this._active){this._active=!1;let t,i;for(t=0,i=this.effects.length;t<i;t++)this.effects[t].stop();for(this.effects.length=0,t=0,i=this.cleanups.length;t<i;t++)this.cleanups[t]();if(this.cleanups.length=0,this.scopes){for(t=0,i=this.scopes.length;t<i;t++)this.scopes[t].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){const s=this.parent.scopes.pop();s&&s!==this&&(this.parent.scopes[this.index]=s,s.index=this.index)}this.parent=void 0}}}function Sh(){return nn}let bt;const io=new WeakSet;class Mu{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,nn&&nn.active&&nn.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,io.has(this)&&(io.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||Tu(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Lc(this),Au(this);const e=bt,t=An;bt=this,An=!0;try{return this.fn()}finally{wu(this),bt=e,An=t,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)sc(e);this.deps=this.depsTail=void 0,Lc(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?io.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){jo(this)&&this.run()}get dirty(){return jo(this)}}let Eu=0,ra,oa;function Tu(n,e=!1){if(n.flags|=8,e){n.next=oa,oa=n;return}n.next=ra,ra=n}function nc(){Eu++}function ic(){if(--Eu>0)return;if(oa){let e=oa;for(oa=void 0;e;){const t=e.next;e.next=void 0,e.flags&=-9,e=t}}let n;for(;ra;){let e=ra;for(ra=void 0;e;){const t=e.next;if(e.next=void 0,e.flags&=-9,e.flags&1)try{e.trigger()}catch(i){n||(n=i)}e=t}}if(n)throw n}function Au(n){for(let e=n.deps;e;e=e.nextDep)e.version=-1,e.prevActiveLink=e.dep.activeLink,e.dep.activeLink=e}function wu(n){let e,t=n.depsTail,i=t;for(;i;){const s=i.prevDep;i.version===-1?(i===t&&(t=s),sc(i),Mh(i)):e=i,i.dep.activeLink=i.prevActiveLink,i.prevActiveLink=void 0,i=s}n.deps=e,n.depsTail=t}function jo(n){for(let e=n.deps;e;e=e.nextDep)if(e.dep.version!==e.version||e.dep.computed&&(Cu(e.dep.computed)||e.dep.version!==e.version))return!0;return!!n._dirty}function Cu(n){if(n.flags&4&&!(n.flags&16)||(n.flags&=-17,n.globalVersion===fa)||(n.globalVersion=fa,!n.isSSR&&n.flags&128&&(!n.deps&&!n._dirty||!jo(n))))return;n.flags|=2;const e=n.dep,t=bt,i=An;bt=n,An=!0;try{Au(n);const s=n.fn(n._value);(e.version===0||yi(s,n._value))&&(n.flags|=128,n._value=s,e.version++)}catch(s){throw e.version++,s}finally{bt=t,An=i,wu(n),n.flags&=-3}}function sc(n,e=!1){const{dep:t,prevSub:i,nextSub:s}=n;if(i&&(i.nextSub=s,n.prevSub=void 0),s&&(s.prevSub=i,n.nextSub=void 0),t.subs===n&&(t.subs=i,!i&&t.computed)){t.computed.flags&=-5;for(let a=t.computed.deps;a;a=a.nextDep)sc(a,!0)}!e&&!--t.sc&&t.map&&t.map.delete(t.key)}function Mh(n){const{prevDep:e,nextDep:t}=n;e&&(e.nextDep=t,n.prevDep=void 0),t&&(t.prevDep=e,n.nextDep=void 0)}let An=!0;const Ru=[];function ri(){Ru.push(An),An=!1}function oi(){const n=Ru.pop();An=n===void 0?!0:n}function Lc(n){const{cleanup:e}=n;if(n.cleanup=void 0,e){const t=bt;bt=void 0;try{e()}finally{bt=t}}}let fa=0;class Eh{constructor(e,t){this.sub=e,this.dep=t,this.version=t.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class ac{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!bt||!An||bt===this.computed)return;let t=this.activeLink;if(t===void 0||t.sub!==bt)t=this.activeLink=new Eh(bt,this),bt.deps?(t.prevDep=bt.depsTail,bt.depsTail.nextDep=t,bt.depsTail=t):bt.deps=bt.depsTail=t,Pu(t);else if(t.version===-1&&(t.version=this.version,t.nextDep)){const i=t.nextDep;i.prevDep=t.prevDep,t.prevDep&&(t.prevDep.nextDep=i),t.prevDep=bt.depsTail,t.nextDep=void 0,bt.depsTail.nextDep=t,bt.depsTail=t,bt.deps===t&&(bt.deps=i)}return t}trigger(e){this.version++,fa++,this.notify(e)}notify(e){nc();try{for(let t=this.subs;t;t=t.prevSub)t.sub.notify()&&t.sub.dep.notify()}finally{ic()}}}function Pu(n){if(n.dep.sc++,n.sub.flags&4){const e=n.dep.computed;if(e&&!n.dep.subs){e.flags|=20;for(let i=e.deps;i;i=i.nextDep)Pu(i)}const t=n.dep.subs;t!==n&&(n.prevSub=t,t&&(t.nextSub=n)),n.dep.subs=n}}const $o=new WeakMap,$i=Symbol(""),Xo=Symbol(""),ha=Symbol("");function qt(n,e,t){if(An&&bt){let i=$o.get(n);i||$o.set(n,i=new Map);let s=i.get(t);s||(i.set(t,s=new ac),s.map=i,s.key=t),s.track()}}function ti(n,e,t,i,s,a){const o=$o.get(n);if(!o){fa++;return}const r=l=>{l&&l.trigger()};if(nc(),e==="clear")o.forEach(r);else{const l=We(n),c=l&&Ql(t);if(l&&t==="length"){const u=Number(i);o.forEach((d,f)=>{(f==="length"||f===ha||!Vn(f)&&f>=u)&&r(d)})}else switch((t!==void 0||o.has(void 0))&&r(o.get(t)),c&&r(o.get(ha)),e){case"add":l?c&&r(o.get("length")):(r(o.get($i)),Rs(n)&&r(o.get(Xo)));break;case"delete":l||(r(o.get($i)),Rs(n)&&r(o.get(Xo)));break;case"set":Rs(n)&&r(o.get($i));break}}ic()}function ss(n){const e=ct(n);return e===n?e:(qt(e,"iterate",ha),xn(n)?e:e.map(Ht))}function kr(n){return qt(n=ct(n),"iterate",ha),n}const Th={__proto__:null,[Symbol.iterator](){return so(this,Symbol.iterator,Ht)},concat(...n){return ss(this).concat(...n.map(e=>We(e)?ss(e):e))},entries(){return so(this,"entries",n=>(n[1]=Ht(n[1]),n))},every(n,e){return $n(this,"every",n,e,void 0,arguments)},filter(n,e){return $n(this,"filter",n,e,t=>t.map(Ht),arguments)},find(n,e){return $n(this,"find",n,e,Ht,arguments)},findIndex(n,e){return $n(this,"findIndex",n,e,void 0,arguments)},findLast(n,e){return $n(this,"findLast",n,e,Ht,arguments)},findLastIndex(n,e){return $n(this,"findLastIndex",n,e,void 0,arguments)},forEach(n,e){return $n(this,"forEach",n,e,void 0,arguments)},includes(...n){return ao(this,"includes",n)},indexOf(...n){return ao(this,"indexOf",n)},join(n){return ss(this).join(n)},lastIndexOf(...n){return ao(this,"lastIndexOf",n)},map(n,e){return $n(this,"map",n,e,void 0,arguments)},pop(){return $s(this,"pop")},push(...n){return $s(this,"push",n)},reduce(n,...e){return Uc(this,"reduce",n,e)},reduceRight(n,...e){return Uc(this,"reduceRight",n,e)},shift(){return $s(this,"shift")},some(n,e){return $n(this,"some",n,e,void 0,arguments)},splice(...n){return $s(this,"splice",n)},toReversed(){return ss(this).toReversed()},toSorted(n){return ss(this).toSorted(n)},toSpliced(...n){return ss(this).toSpliced(...n)},unshift(...n){return $s(this,"unshift",n)},values(){return so(this,"values",Ht)}};function so(n,e,t){const i=kr(n),s=i[e]();return i!==n&&!xn(n)&&(s._next=s.next,s.next=()=>{const a=s._next();return a.done||(a.value=t(a.value)),a}),s}const Ah=Array.prototype;function $n(n,e,t,i,s,a){const o=kr(n),r=o!==n&&!xn(n),l=o[e];if(l!==Ah[e]){const d=l.apply(n,a);return r?Ht(d):d}let c=t;o!==n&&(r?c=function(d,f){return t.call(this,Ht(d),f,n)}:t.length>2&&(c=function(d,f){return t.call(this,d,f,n)}));const u=l.call(o,c,i);return r&&s?s(u):u}function Uc(n,e,t,i){const s=kr(n);let a=t;return s!==n&&(xn(n)?t.length>3&&(a=function(o,r,l){return t.call(this,o,r,l,n)}):a=function(o,r,l){return t.call(this,o,Ht(r),l,n)}),s[e](a,...i)}function ao(n,e,t){const i=ct(n);qt(i,"iterate",ha);const s=i[e](...t);return(s===-1||s===!1)&&lc(t[0])?(t[0]=ct(t[0]),i[e](...t)):s}function $s(n,e,t=[]){ri(),nc();const i=ct(n)[e].apply(n,t);return ic(),oi(),i}const wh=Kl("__proto__,__v_isRef,__isVue"),Du=new Set(Object.getOwnPropertyNames(Symbol).filter(n=>n!=="arguments"&&n!=="caller").map(n=>Symbol[n]).filter(Vn));function Ch(n){Vn(n)||(n=String(n));const e=ct(this);return qt(e,"has",n),e.hasOwnProperty(n)}class Iu{constructor(e=!1,t=!1){this._isReadonly=e,this._isShallow=t}get(e,t,i){if(t==="__v_skip")return e.__v_skip;const s=this._isReadonly,a=this._isShallow;if(t==="__v_isReactive")return!s;if(t==="__v_isReadonly")return s;if(t==="__v_isShallow")return a;if(t==="__v_raw")return i===(s?a?Bh:Fu:a?Nu:Uu).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(i)?e:void 0;const o=We(e);if(!s){let l;if(o&&(l=Th[t]))return l;if(t==="hasOwnProperty")return Ch}const r=Reflect.get(e,t,Wt(e)?e:i);if((Vn(t)?Du.has(t):wh(t))||(s||qt(e,"get",t),a))return r;if(Wt(r)){const l=o&&Ql(t)?r:r.value;return s&&xt(l)?Ko(l):l}return xt(r)?s?Ko(r):Ta(r):r}}class Lu extends Iu{constructor(e=!1){super(!1,e)}set(e,t,i,s){let a=e[t];if(!this._isShallow){const l=Ai(a);if(!xn(i)&&!Ai(i)&&(a=ct(a),i=ct(i)),!We(e)&&Wt(a)&&!Wt(i))return l||(a.value=i),!0}const o=We(e)&&Ql(t)?Number(t)<e.length:dt(e,t),r=Reflect.set(e,t,i,Wt(e)?e:s);return e===ct(s)&&(o?yi(i,a)&&ti(e,"set",t,i):ti(e,"add",t,i)),r}deleteProperty(e,t){const i=dt(e,t);e[t];const s=Reflect.deleteProperty(e,t);return s&&i&&ti(e,"delete",t,void 0),s}has(e,t){const i=Reflect.has(e,t);return(!Vn(t)||!Du.has(t))&&qt(e,"has",t),i}ownKeys(e){return qt(e,"iterate",We(e)?"length":$i),Reflect.ownKeys(e)}}class Rh extends Iu{constructor(e=!1){super(!0,e)}set(e,t){return!0}deleteProperty(e,t){return!0}}const Ph=new Lu,Dh=new Rh,Ih=new Lu(!0);const Yo=n=>n,Ua=n=>Reflect.getPrototypeOf(n);function Lh(n,e,t){return function(...i){const s=this.__v_raw,a=ct(s),o=Rs(a),r=n==="entries"||n===Symbol.iterator&&o,l=n==="keys"&&o,c=s[n](...i),u=t?Yo:e?Mr:Ht;return!e&&qt(a,"iterate",l?Xo:$i),{next(){const{value:d,done:f}=c.next();return f?{value:d,done:f}:{value:r?[u(d[0]),u(d[1])]:u(d),done:f}},[Symbol.iterator](){return this}}}}function Na(n){return function(...e){return n==="delete"?!1:n==="clear"?void 0:this}}function Uh(n,e){const t={get(s){const a=this.__v_raw,o=ct(a),r=ct(s);n||(yi(s,r)&&qt(o,"get",s),qt(o,"get",r));const{has:l}=Ua(o),c=e?Yo:n?Mr:Ht;if(l.call(o,s))return c(a.get(s));if(l.call(o,r))return c(a.get(r));a!==o&&a.get(s)},get size(){const s=this.__v_raw;return!n&&qt(ct(s),"iterate",$i),s.size},has(s){const a=this.__v_raw,o=ct(a),r=ct(s);return n||(yi(s,r)&&qt(o,"has",s),qt(o,"has",r)),s===r?a.has(s):a.has(s)||a.has(r)},forEach(s,a){const o=this,r=o.__v_raw,l=ct(r),c=e?Yo:n?Mr:Ht;return!n&&qt(l,"iterate",$i),r.forEach((u,d)=>s.call(a,c(u),c(d),o))}};return jt(t,n?{add:Na("add"),set:Na("set"),delete:Na("delete"),clear:Na("clear")}:{add(s){!e&&!xn(s)&&!Ai(s)&&(s=ct(s));const a=ct(this);return Ua(a).has.call(a,s)||(a.add(s),ti(a,"add",s,s)),this},set(s,a){!e&&!xn(a)&&!Ai(a)&&(a=ct(a));const o=ct(this),{has:r,get:l}=Ua(o);let c=r.call(o,s);c||(s=ct(s),c=r.call(o,s));const u=l.call(o,s);return o.set(s,a),c?yi(a,u)&&ti(o,"set",s,a):ti(o,"add",s,a),this},delete(s){const a=ct(this),{has:o,get:r}=Ua(a);let l=o.call(a,s);l||(s=ct(s),l=o.call(a,s)),r&&r.call(a,s);const c=a.delete(s);return l&&ti(a,"delete",s,void 0),c},clear(){const s=ct(this),a=s.size!==0,o=s.clear();return a&&ti(s,"clear",void 0,void 0),o}}),["keys","values","entries",Symbol.iterator].forEach(s=>{t[s]=Lh(s,n,e)}),t}function rc(n,e){const t=Uh(n,e);return(i,s,a)=>s==="__v_isReactive"?!n:s==="__v_isReadonly"?n:s==="__v_raw"?i:Reflect.get(dt(t,s)&&s in i?t:i,s,a)}const Nh={get:rc(!1,!1)},Fh={get:rc(!1,!0)},Oh={get:rc(!0,!1)};const Uu=new WeakMap,Nu=new WeakMap,Fu=new WeakMap,Bh=new WeakMap;function zh(n){switch(n){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function Hh(n){return n.__v_skip||!Object.isExtensible(n)?0:zh(uh(n))}function Ta(n){return Ai(n)?n:oc(n,!1,Ph,Nh,Uu)}function Vh(n){return oc(n,!1,Ih,Fh,Nu)}function Ko(n){return oc(n,!0,Dh,Oh,Fu)}function oc(n,e,t,i,s){if(!xt(n)||n.__v_raw&&!(e&&n.__v_isReactive))return n;const a=Hh(n);if(a===0)return n;const o=s.get(n);if(o)return o;const r=new Proxy(n,a===2?i:t);return s.set(n,r),r}function Ps(n){return Ai(n)?Ps(n.__v_raw):!!(n&&n.__v_isReactive)}function Ai(n){return!!(n&&n.__v_isReadonly)}function xn(n){return!!(n&&n.__v_isShallow)}function lc(n){return n?!!n.__v_raw:!1}function ct(n){const e=n&&n.__v_raw;return e?ct(e):n}function kh(n){return!dt(n,"__v_skip")&&Object.isExtensible(n)&&bu(n,"__v_skip",!0),n}const Ht=n=>xt(n)?Ta(n):n,Mr=n=>xt(n)?Ko(n):n;function Wt(n){return n?n.__v_isRef===!0:!1}function Tt(n){return Gh(n,!1)}function Gh(n,e){return Wt(n)?n:new qh(n,e)}class qh{constructor(e,t){this.dep=new ac,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=t?e:ct(e),this._value=t?e:Ht(e),this.__v_isShallow=t}get value(){return this.dep.track(),this._value}set value(e){const t=this._rawValue,i=this.__v_isShallow||xn(e)||Ai(e);e=i?e:ct(e),yi(e,t)&&(this._rawValue=e,this._value=i?e:Ht(e),this.dep.trigger())}}function lt(n){return Wt(n)?n.value:n}const Wh={get:(n,e,t)=>e==="__v_raw"?n:lt(Reflect.get(n,e,t)),set:(n,e,t,i)=>{const s=n[e];return Wt(s)&&!Wt(t)?(s.value=t,!0):Reflect.set(n,e,t,i)}};function Ou(n){return Ps(n)?n:new Proxy(n,Wh)}class jh{constructor(e,t,i){this.fn=e,this.setter=t,this._value=void 0,this.dep=new ac(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=fa-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!t,this.isSSR=i}notify(){if(this.flags|=16,!(this.flags&8)&&bt!==this)return Tu(this,!0),!0}get value(){const e=this.dep.track();return Cu(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}function $h(n,e,t=!1){let i,s;return Ye(n)?i=n:(i=n.get,s=n.set),new jh(i,s,t)}const Fa={},Er=new WeakMap;let Hi;function Xh(n,e=!1,t=Hi){if(t){let i=Er.get(t);i||Er.set(t,i=[]),i.push(n)}}function Yh(n,e,t=vt){const{immediate:i,deep:s,once:a,scheduler:o,augmentJob:r,call:l}=t,c=b=>s?b:xn(b)||s===!1||s===0?ni(b,1):ni(b);let u,d,f,p,x=!1,y=!1;if(Wt(n)?(d=()=>n.value,x=xn(n)):Ps(n)?(d=()=>c(n),x=!0):We(n)?(y=!0,x=n.some(b=>Ps(b)||xn(b)),d=()=>n.map(b=>{if(Wt(b))return b.value;if(Ps(b))return c(b);if(Ye(b))return l?l(b,2):b()})):Ye(n)?e?d=l?()=>l(n,2):n:d=()=>{if(f){ri();try{f()}finally{oi()}}const b=Hi;Hi=u;try{return l?l(n,3,[p]):n(p)}finally{Hi=b}}:d=Hn,e&&s){const b=d,C=s===!0?1/0:s;d=()=>ni(b(),C)}const m=Sh(),h=()=>{u.stop(),m&&m.active&&Jl(m.effects,u)};if(a&&e){const b=e;e=(...C)=>{b(...C),h()}}let P=y?new Array(n.length).fill(Fa):Fa;const w=b=>{if(!(!(u.flags&1)||!u.dirty&&!b))if(e){const C=u.run();if(s||x||(y?C.some((S,R)=>yi(S,P[R])):yi(C,P))){f&&f();const S=Hi;Hi=u;try{const R=[C,P===Fa?void 0:y&&P[0]===Fa?[]:P,p];P=C,l?l(e,3,R):e(...R)}finally{Hi=S}}}else u.run()};return r&&r(w),u=new Mu(d),u.scheduler=o?()=>o(w,!1):w,p=b=>Xh(b,!1,u),f=u.onStop=()=>{const b=Er.get(u);if(b){if(l)l(b,4);else for(const C of b)C();Er.delete(u)}},e?i?w(!0):P=u.run():o?o(w.bind(null,!0),!0):u.run(),h.pause=u.pause.bind(u),h.resume=u.resume.bind(u),h.stop=h,h}function ni(n,e=1/0,t){if(e<=0||!xt(n)||n.__v_skip||(t=t||new Map,(t.get(n)||0)>=e))return n;if(t.set(n,e),e--,Wt(n))ni(n.value,e,t);else if(We(n))for(let i=0;i<n.length;i++)ni(n[i],e,t);else if(Gs(n)||Rs(n))n.forEach(i=>{ni(i,e,t)});else if(_u(n)){for(const i in n)ni(n[i],e,t);for(const i of Object.getOwnPropertySymbols(n))Object.prototype.propertyIsEnumerable.call(n,i)&&ni(n[i],e,t)}return n}/**
* @vue/runtime-core v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Aa(n,e,t,i){try{return i?n(...i):n()}catch(s){Gr(s,e,t)}}function kn(n,e,t,i){if(Ye(n)){const s=Aa(n,e,t,i);return s&&mu(s)&&s.catch(a=>{Gr(a,e,t)}),s}if(We(n)){const s=[];for(let a=0;a<n.length;a++)s.push(kn(n[a],e,t,i));return s}}function Gr(n,e,t,i=!0){const s=e?e.vnode:null,{errorHandler:a,throwUnhandledErrorInProduction:o}=e&&e.appContext.config||vt;if(e){let r=e.parent;const l=e.proxy,c=`https://vuejs.org/error-reference/#runtime-${t}`;for(;r;){const u=r.ec;if(u){for(let d=0;d<u.length;d++)if(u[d](n,l,c)===!1)return}r=r.parent}if(a){ri(),Aa(a,null,10,[n,l,c]),oi();return}}Kh(n,t,s,i,o)}function Kh(n,e,t,i=!0,s=!1){if(s)throw n;console.error(n)}const Zt=[];let Ln=-1;const Ds=[];let mi=null,Ms=0;const Bu=Promise.resolve();let Tr=null;function wa(n){const e=Tr||Bu;return n?e.then(this?n.bind(this):n):e}function Zh(n){let e=Ln+1,t=Zt.length;for(;e<t;){const i=e+t>>>1,s=Zt[i],a=pa(s);a<n||a===n&&s.flags&2?e=i+1:t=i}return e}function cc(n){if(!(n.flags&1)){const e=pa(n),t=Zt[Zt.length-1];!t||!(n.flags&2)&&e>=pa(t)?Zt.push(n):Zt.splice(Zh(e),0,n),n.flags|=1,zu()}}function zu(){Tr||(Tr=Bu.then(Vu))}function Jh(n){We(n)?Ds.push(...n):mi&&n.id===-1?mi.splice(Ms+1,0,n):n.flags&1||(Ds.push(n),n.flags|=1),zu()}function Nc(n,e,t=Ln+1){for(;t<Zt.length;t++){const i=Zt[t];if(i&&i.flags&2){if(n&&i.id!==n.uid)continue;Zt.splice(t,1),t--,i.flags&4&&(i.flags&=-2),i(),i.flags&4||(i.flags&=-2)}}}function Hu(n){if(Ds.length){const e=[...new Set(Ds)].sort((t,i)=>pa(t)-pa(i));if(Ds.length=0,mi){mi.push(...e);return}for(mi=e,Ms=0;Ms<mi.length;Ms++){const t=mi[Ms];t.flags&4&&(t.flags&=-2),t.flags&8||t(),t.flags&=-2}mi=null,Ms=0}}const pa=n=>n.id==null?n.flags&2?-1:1/0:n.id;function Vu(n){try{for(Ln=0;Ln<Zt.length;Ln++){const e=Zt[Ln];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),Aa(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;Ln<Zt.length;Ln++){const e=Zt[Ln];e&&(e.flags&=-2)}Ln=-1,Zt.length=0,Hu(),Tr=null,(Zt.length||Ds.length)&&Vu()}}let bn=null,ku=null;function Ar(n){const e=bn;return bn=n,ku=n&&n.type.__scopeId||null,e}function Qh(n,e=bn,t){if(!e||n._n)return n;const i=(...s)=>{i._d&&Wc(-1);const a=Ar(e);let o;try{o=n(...s)}finally{Ar(a),i._d&&Wc(1)}return o};return i._n=!0,i._c=!0,i._d=!0,i}function mn(n,e){if(bn===null)return n;const t=$r(bn),i=n.dirs||(n.dirs=[]);for(let s=0;s<e.length;s++){let[a,o,r,l=vt]=e[s];a&&(Ye(a)&&(a={mounted:a,updated:a}),a.deep&&ni(o),i.push({dir:a,instance:t,value:o,oldValue:void 0,arg:r,modifiers:l}))}return n}function Ii(n,e,t,i){const s=n.dirs,a=e&&e.dirs;for(let o=0;o<s.length;o++){const r=s[o];a&&(r.oldValue=a[o].value);let l=r.dir[i];l&&(ri(),kn(l,t,8,[n.el,r,n,e]),oi())}}const ep=Symbol("_vte"),tp=n=>n.__isTeleport,np=Symbol("_leaveCb");function dc(n,e){n.shapeFlag&6&&n.component?(n.transition=e,dc(n.component.subTree,e)):n.shapeFlag&128?(n.ssContent.transition=e.clone(n.ssContent),n.ssFallback.transition=e.clone(n.ssFallback)):n.transition=e}function Ji(n,e){return Ye(n)?jt({name:n.name},e,{setup:n}):n}function Gu(n){n.ids=[n.ids[0]+n.ids[2]+++"-",0,0]}const wr=new WeakMap;function la(n,e,t,i,s=!1){if(We(n)){n.forEach((x,y)=>la(x,e&&(We(e)?e[y]:e),t,i,s));return}if(ca(i)&&!s){i.shapeFlag&512&&i.type.__asyncResolved&&i.component.subTree.component&&la(n,e,t,i.component.subTree);return}const a=i.shapeFlag&4?$r(i.component):i.el,o=s?null:a,{i:r,r:l}=n,c=e&&e.r,u=r.refs===vt?r.refs={}:r.refs,d=r.setupState,f=ct(d),p=d===vt?pu:x=>dt(f,x);if(c!=null&&c!==l){if(Fc(e),It(c))u[c]=null,p(c)&&(d[c]=null);else if(Wt(c)){c.value=null;const x=e;x.k&&(u[x.k]=null)}}if(Ye(l))Aa(l,r,12,[o,u]);else{const x=It(l),y=Wt(l);if(x||y){const m=()=>{if(n.f){const h=x?p(l)?d[l]:u[l]:l.value;if(s)We(h)&&Jl(h,a);else if(We(h))h.includes(a)||h.push(a);else if(x)u[l]=[a],p(l)&&(d[l]=u[l]);else{const P=[a];l.value=P,n.k&&(u[n.k]=P)}}else x?(u[l]=o,p(l)&&(d[l]=o)):y&&(l.value=o,n.k&&(u[n.k]=o))};if(o){const h=()=>{m(),wr.delete(n)};h.id=-1,wr.set(n,h),cn(h,t)}else Fc(n),m()}}}function Fc(n){const e=wr.get(n);e&&(e.flags|=8,wr.delete(n))}Vr().requestIdleCallback;Vr().cancelIdleCallback;const ca=n=>!!n.type.__asyncLoader,qu=n=>n.type.__isKeepAlive;function ip(n,e){Wu(n,"a",e)}function sp(n,e){Wu(n,"da",e)}function Wu(n,e,t=Jt){const i=n.__wdc||(n.__wdc=()=>{let s=t;for(;s;){if(s.isDeactivated)return;s=s.parent}return n()});if(qr(e,i,t),t){let s=t.parent;for(;s&&s.parent;)qu(s.parent.vnode)&&ap(i,e,t,s),s=s.parent}}function ap(n,e,t,i){const s=qr(e,n,i,!0);$u(()=>{Jl(i[e],s)},t)}function qr(n,e,t=Jt,i=!1){if(t){const s=t[n]||(t[n]=[]),a=e.__weh||(e.__weh=(...o)=>{ri();const r=Ca(t),l=kn(e,t,n,o);return r(),oi(),l});return i?s.unshift(a):s.push(a),a}}const li=n=>(e,t=Jt)=>{(!ga||n==="sp")&&qr(n,(...i)=>e(...i),t)},rp=li("bm"),Wn=li("m"),op=li("bu"),lp=li("u"),ju=li("bum"),$u=li("um"),cp=li("sp"),dp=li("rtg"),up=li("rtc");function fp(n,e=Jt){qr("ec",n,e)}const hp=Symbol.for("v-ndc");function Mt(n,e,t,i){let s;const a=t,o=We(n);if(o||It(n)){const r=o&&Ps(n);let l=!1,c=!1;r&&(l=!xn(n),c=Ai(n),n=kr(n)),s=new Array(n.length);for(let u=0,d=n.length;u<d;u++)s[u]=e(l?c?Mr(Ht(n[u])):Ht(n[u]):n[u],u,void 0,a)}else if(typeof n=="number"){s=new Array(n);for(let r=0;r<n;r++)s[r]=e(r+1,r,void 0,a)}else if(xt(n))if(n[Symbol.iterator])s=Array.from(n,(r,l)=>e(r,l,void 0,a));else{const r=Object.keys(n);s=new Array(r.length);for(let l=0,c=r.length;l<c;l++){const u=r[l];s[l]=e(n[u],u,l,a)}}else s=[];return s}const Zo=n=>n?mf(n)?$r(n):Zo(n.parent):null,da=jt(Object.create(null),{$:n=>n,$el:n=>n.vnode.el,$data:n=>n.data,$props:n=>n.props,$attrs:n=>n.attrs,$slots:n=>n.slots,$refs:n=>n.refs,$parent:n=>Zo(n.parent),$root:n=>Zo(n.root),$host:n=>n.ce,$emit:n=>n.emit,$options:n=>Yu(n),$forceUpdate:n=>n.f||(n.f=()=>{cc(n.update)}),$nextTick:n=>n.n||(n.n=wa.bind(n.proxy)),$watch:n=>Up.bind(n)}),ro=(n,e)=>n!==vt&&!n.__isScriptSetup&&dt(n,e),pp={get({_:n},e){if(e==="__v_skip")return!0;const{ctx:t,setupState:i,data:s,props:a,accessCache:o,type:r,appContext:l}=n;let c;if(e[0]!=="$"){const p=o[e];if(p!==void 0)switch(p){case 1:return i[e];case 2:return s[e];case 4:return t[e];case 3:return a[e]}else{if(ro(i,e))return o[e]=1,i[e];if(s!==vt&&dt(s,e))return o[e]=2,s[e];if((c=n.propsOptions[0])&&dt(c,e))return o[e]=3,a[e];if(t!==vt&&dt(t,e))return o[e]=4,t[e];Jo&&(o[e]=0)}}const u=da[e];let d,f;if(u)return e==="$attrs"&&qt(n.attrs,"get",""),u(n);if((d=r.__cssModules)&&(d=d[e]))return d;if(t!==vt&&dt(t,e))return o[e]=4,t[e];if(f=l.config.globalProperties,dt(f,e))return f[e]},set({_:n},e,t){const{data:i,setupState:s,ctx:a}=n;return ro(s,e)?(s[e]=t,!0):i!==vt&&dt(i,e)?(i[e]=t,!0):dt(n.props,e)||e[0]==="$"&&e.slice(1)in n?!1:(a[e]=t,!0)},has({_:{data:n,setupState:e,accessCache:t,ctx:i,appContext:s,propsOptions:a,type:o}},r){let l,c;return!!(t[r]||n!==vt&&r[0]!=="$"&&dt(n,r)||ro(e,r)||(l=a[0])&&dt(l,r)||dt(i,r)||dt(da,r)||dt(s.config.globalProperties,r)||(c=o.__cssModules)&&c[r])},defineProperty(n,e,t){return t.get!=null?n._.accessCache[e]=0:dt(t,"value")&&this.set(n,e,t.value,null),Reflect.defineProperty(n,e,t)}};function Oc(n){return We(n)?n.reduce((e,t)=>(e[t]=null,e),{}):n}let Jo=!0;function mp(n){const e=Yu(n),t=n.proxy,i=n.ctx;Jo=!1,e.beforeCreate&&Bc(e.beforeCreate,n,"bc");const{data:s,computed:a,methods:o,watch:r,provide:l,inject:c,created:u,beforeMount:d,mounted:f,beforeUpdate:p,updated:x,activated:y,deactivated:m,beforeDestroy:h,beforeUnmount:P,destroyed:w,unmounted:b,render:C,renderTracked:S,renderTriggered:R,errorCaptured:U,serverPrefetch:T,expose:A,inheritAttrs:F,components:j,directives:Y,filters:ce}=e;if(c&&gp(c,i,null),o)for(const ie in o){const G=o[ie];Ye(G)&&(i[ie]=G.bind(t))}if(s){const ie=s.call(t,t);xt(ie)&&(n.data=Ta(ie))}if(Jo=!0,a)for(const ie in a){const G=a[ie],ve=Ye(G)?G.bind(t,t):Ye(G.get)?G.get.bind(t,t):Hn,Te=!Ye(G)&&Ye(G.set)?G.set.bind(t):Hn,Ie=Ve({get:ve,set:Te});Object.defineProperty(i,ie,{enumerable:!0,configurable:!0,get:()=>Ie.value,set:ke=>Ie.value=ke})}if(r)for(const ie in r)Xu(r[ie],i,t,ie);if(l){const ie=Ye(l)?l.call(t):l;Reflect.ownKeys(ie).forEach(G=>{el(G,ie[G])})}u&&Bc(u,n,"c");function Q(ie,G){We(G)?G.forEach(ve=>ie(ve.bind(t))):G&&ie(G.bind(t))}if(Q(rp,d),Q(Wn,f),Q(op,p),Q(lp,x),Q(ip,y),Q(sp,m),Q(fp,U),Q(up,S),Q(dp,R),Q(ju,P),Q($u,b),Q(cp,T),We(A))if(A.length){const ie=n.exposed||(n.exposed={});A.forEach(G=>{Object.defineProperty(ie,G,{get:()=>t[G],set:ve=>t[G]=ve,enumerable:!0})})}else n.exposed||(n.exposed={});C&&n.render===Hn&&(n.render=C),F!=null&&(n.inheritAttrs=F),j&&(n.components=j),Y&&(n.directives=Y),T&&Gu(n)}function gp(n,e,t=Hn){We(n)&&(n=Qo(n));for(const i in n){const s=n[i];let a;xt(s)?"default"in s?a=Ls(s.from||i,s.default,!0):a=Ls(s.from||i):a=Ls(s),Wt(a)?Object.defineProperty(e,i,{enumerable:!0,configurable:!0,get:()=>a.value,set:o=>a.value=o}):e[i]=a}}function Bc(n,e,t){kn(We(n)?n.map(i=>i.bind(e.proxy)):n.bind(e.proxy),e,t)}function Xu(n,e,t,i){let s=i.includes(".")?cf(t,i):()=>t[i];if(It(n)){const a=e[n];Ye(a)&&at(s,a)}else if(Ye(n))at(s,n.bind(t));else if(xt(n))if(We(n))n.forEach(a=>Xu(a,e,t,i));else{const a=Ye(n.handler)?n.handler.bind(t):e[n.handler];Ye(a)&&at(s,a,n)}}function Yu(n){const e=n.type,{mixins:t,extends:i}=e,{mixins:s,optionsCache:a,config:{optionMergeStrategies:o}}=n.appContext,r=a.get(e);let l;return r?l=r:!s.length&&!t&&!i?l=e:(l={},s.length&&s.forEach(c=>Cr(l,c,o,!0)),Cr(l,e,o)),xt(e)&&a.set(e,l),l}function Cr(n,e,t,i=!1){const{mixins:s,extends:a}=e;a&&Cr(n,a,t,!0),s&&s.forEach(o=>Cr(n,o,t,!0));for(const o in e)if(!(i&&o==="expose")){const r=_p[o]||t&&t[o];n[o]=r?r(n[o],e[o]):e[o]}return n}const _p={data:zc,props:Hc,emits:Hc,methods:ia,computed:ia,beforeCreate:Yt,created:Yt,beforeMount:Yt,mounted:Yt,beforeUpdate:Yt,updated:Yt,beforeDestroy:Yt,beforeUnmount:Yt,destroyed:Yt,unmounted:Yt,activated:Yt,deactivated:Yt,errorCaptured:Yt,serverPrefetch:Yt,components:ia,directives:ia,watch:bp,provide:zc,inject:vp};function zc(n,e){return e?n?function(){return jt(Ye(n)?n.call(this,this):n,Ye(e)?e.call(this,this):e)}:e:n}function vp(n,e){return ia(Qo(n),Qo(e))}function Qo(n){if(We(n)){const e={};for(let t=0;t<n.length;t++)e[n[t]]=n[t];return e}return n}function Yt(n,e){return n?[...new Set([].concat(n,e))]:e}function ia(n,e){return n?jt(Object.create(null),n,e):e}function Hc(n,e){return n?We(n)&&We(e)?[...new Set([...n,...e])]:jt(Object.create(null),Oc(n),Oc(e??{})):e}function bp(n,e){if(!n)return e;if(!e)return n;const t=jt(Object.create(null),n);for(const i in e)t[i]=Yt(n[i],e[i]);return t}function Ku(){return{app:null,config:{isNativeTag:pu,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let xp=0;function yp(n,e){return function(i,s=null){Ye(i)||(i=jt({},i)),s!=null&&!xt(s)&&(s=null);const a=Ku(),o=new WeakSet,r=[];let l=!1;const c=a.app={_uid:xp++,_component:i,_props:s,_container:null,_context:a,_instance:null,version:nm,get config(){return a.config},set config(u){},use(u,...d){return o.has(u)||(u&&Ye(u.install)?(o.add(u),u.install(c,...d)):Ye(u)&&(o.add(u),u(c,...d))),c},mixin(u){return a.mixins.includes(u)||a.mixins.push(u),c},component(u,d){return d?(a.components[u]=d,c):a.components[u]},directive(u,d){return d?(a.directives[u]=d,c):a.directives[u]},mount(u,d,f){if(!l){const p=c._ceVNode||zt(i,s);return p.appContext=a,f===!0?f="svg":f===!1&&(f=void 0),n(p,u,f),l=!0,c._container=u,u.__vue_app__=c,$r(p.component)}},onUnmount(u){r.push(u)},unmount(){l&&(kn(r,c._instance,16),n(null,c._container),delete c._container.__vue_app__)},provide(u,d){return a.provides[u]=d,c},runWithContext(u){const d=Is;Is=c;try{return u()}finally{Is=d}}};return c}}let Is=null;function el(n,e){if(Jt){let t=Jt.provides;const i=Jt.parent&&Jt.parent.provides;i===t&&(t=Jt.provides=Object.create(i)),t[n]=e}}function Ls(n,e,t=!1){const i=Kp();if(i||Is){let s=Is?Is._context.provides:i?i.parent==null||i.ce?i.vnode.appContext&&i.vnode.appContext.provides:i.parent.provides:void 0;if(s&&n in s)return s[n];if(arguments.length>1)return t&&Ye(e)?e.call(i&&i.proxy):e}}const Zu={},Ju=()=>Object.create(Zu),Qu=n=>Object.getPrototypeOf(n)===Zu;function Sp(n,e,t,i=!1){const s={},a=Ju();n.propsDefaults=Object.create(null),ef(n,e,s,a);for(const o in n.propsOptions[0])o in s||(s[o]=void 0);t?n.props=i?s:Vh(s):n.type.props?n.props=s:n.props=a,n.attrs=a}function Mp(n,e,t,i){const{props:s,attrs:a,vnode:{patchFlag:o}}=n,r=ct(s),[l]=n.propsOptions;let c=!1;if((i||o>0)&&!(o&16)){if(o&8){const u=n.vnode.dynamicProps;for(let d=0;d<u.length;d++){let f=u[d];if(Wr(n.emitsOptions,f))continue;const p=e[f];if(l)if(dt(a,f))p!==a[f]&&(a[f]=p,c=!0);else{const x=Ti(f);s[x]=tl(l,r,x,p,n,!1)}else p!==a[f]&&(a[f]=p,c=!0)}}}else{ef(n,e,s,a)&&(c=!0);let u;for(const d in r)(!e||!dt(e,d)&&((u=Zi(d))===d||!dt(e,u)))&&(l?t&&(t[d]!==void 0||t[u]!==void 0)&&(s[d]=tl(l,r,d,void 0,n,!0)):delete s[d]);if(a!==r)for(const d in a)(!e||!dt(e,d))&&(delete a[d],c=!0)}c&&ti(n.attrs,"set","")}function ef(n,e,t,i){const[s,a]=n.propsOptions;let o=!1,r;if(e)for(let l in e){if(aa(l))continue;const c=e[l];let u;s&&dt(s,u=Ti(l))?!a||!a.includes(u)?t[u]=c:(r||(r={}))[u]=c:Wr(n.emitsOptions,l)||(!(l in i)||c!==i[l])&&(i[l]=c,o=!0)}if(a){const l=ct(t),c=r||vt;for(let u=0;u<a.length;u++){const d=a[u];t[d]=tl(s,l,d,c[d],n,!dt(c,d))}}return o}function tl(n,e,t,i,s,a){const o=n[t];if(o!=null){const r=dt(o,"default");if(r&&i===void 0){const l=o.default;if(o.type!==Function&&!o.skipFactory&&Ye(l)){const{propsDefaults:c}=s;if(t in c)i=c[t];else{const u=Ca(s);i=c[t]=l.call(null,e),u()}}else i=l;s.ce&&s.ce._setProp(t,i)}o[0]&&(a&&!r?i=!1:o[1]&&(i===""||i===Zi(t))&&(i=!0))}return i}const Ep=new WeakMap;function tf(n,e,t=!1){const i=t?Ep:e.propsCache,s=i.get(n);if(s)return s;const a=n.props,o={},r=[];let l=!1;if(!Ye(n)){const u=d=>{l=!0;const[f,p]=tf(d,e,!0);jt(o,f),p&&r.push(...p)};!t&&e.mixins.length&&e.mixins.forEach(u),n.extends&&u(n.extends),n.mixins&&n.mixins.forEach(u)}if(!a&&!l)return xt(n)&&i.set(n,Cs),Cs;if(We(a))for(let u=0;u<a.length;u++){const d=Ti(a[u]);Vc(d)&&(o[d]=vt)}else if(a)for(const u in a){const d=Ti(u);if(Vc(d)){const f=a[u],p=o[d]=We(f)||Ye(f)?{type:f}:jt({},f),x=p.type;let y=!1,m=!0;if(We(x))for(let h=0;h<x.length;++h){const P=x[h],w=Ye(P)&&P.name;if(w==="Boolean"){y=!0;break}else w==="String"&&(m=!1)}else y=Ye(x)&&x.name==="Boolean";p[0]=y,p[1]=m,(y||dt(p,"default"))&&r.push(d)}}const c=[o,r];return xt(n)&&i.set(n,c),c}function Vc(n){return n[0]!=="$"&&!aa(n)}const uc=n=>n==="_"||n==="_ctx"||n==="$stable",fc=n=>We(n)?n.map(Un):[Un(n)],Tp=(n,e,t)=>{if(e._n)return e;const i=Qh((...s)=>fc(e(...s)),t);return i._c=!1,i},nf=(n,e,t)=>{const i=n._ctx;for(const s in n){if(uc(s))continue;const a=n[s];if(Ye(a))e[s]=Tp(s,a,i);else if(a!=null){const o=fc(a);e[s]=()=>o}}},sf=(n,e)=>{const t=fc(e);n.slots.default=()=>t},af=(n,e,t)=>{for(const i in e)(t||!uc(i))&&(n[i]=e[i])},Ap=(n,e,t)=>{const i=n.slots=Ju();if(n.vnode.shapeFlag&32){const s=e._;s?(af(i,e,t),t&&bu(i,"_",s,!0)):nf(e,i)}else e&&sf(n,e)},wp=(n,e,t)=>{const{vnode:i,slots:s}=n;let a=!0,o=vt;if(i.shapeFlag&32){const r=e._;r?t&&r===1?a=!1:af(s,e,t):(a=!e.$stable,nf(e,s)),o=e}else e&&(sf(n,e),o={default:1});if(a)for(const r in s)!uc(r)&&o[r]==null&&delete s[r]},cn=kp;function Cp(n){return Rp(n)}function Rp(n,e){const t=Vr();t.__VUE__=!0;const{insert:i,remove:s,patchProp:a,createElement:o,createText:r,createComment:l,setText:c,setElementText:u,parentNode:d,nextSibling:f,setScopeId:p=Hn,insertStaticContent:x}=n,y=(I,g,L,k=null,O=null,z=null,de=void 0,X=null,se=!!g.dynamicChildren)=>{if(I===g)return;I&&!Xs(I,g)&&(k=ue(I),ke(I,O,z,!0),I=null),g.patchFlag===-2&&(se=!1,g.dynamicChildren=null);const{type:re,ref:be,shapeFlag:M}=g;switch(re){case jr:m(I,g,L,k);break;case wi:h(I,g,L,k);break;case hr:I==null&&P(g,L,k,de);break;case Qe:j(I,g,L,k,O,z,de,X,se);break;default:M&1?C(I,g,L,k,O,z,de,X,se):M&6?Y(I,g,L,k,O,z,de,X,se):(M&64||M&128)&&re.process(I,g,L,k,O,z,de,X,se,Ue)}be!=null&&O?la(be,I&&I.ref,z,g||I,!g):be==null&&I&&I.ref!=null&&la(I.ref,null,z,I,!0)},m=(I,g,L,k)=>{if(I==null)i(g.el=r(g.children),L,k);else{const O=g.el=I.el;g.children!==I.children&&c(O,g.children)}},h=(I,g,L,k)=>{I==null?i(g.el=l(g.children||""),L,k):g.el=I.el},P=(I,g,L,k)=>{[I.el,I.anchor]=x(I.children,g,L,k,I.el,I.anchor)},w=({el:I,anchor:g},L,k)=>{let O;for(;I&&I!==g;)O=f(I),i(I,L,k),I=O;i(g,L,k)},b=({el:I,anchor:g})=>{let L;for(;I&&I!==g;)L=f(I),s(I),I=L;s(g)},C=(I,g,L,k,O,z,de,X,se)=>{g.type==="svg"?de="svg":g.type==="math"&&(de="mathml"),I==null?S(g,L,k,O,z,de,X,se):T(I,g,O,z,de,X,se)},S=(I,g,L,k,O,z,de,X)=>{let se,re;const{props:be,shapeFlag:M,transition:v,dirs:N}=I;if(se=I.el=o(I.type,z,be&&be.is,be),M&8?u(se,I.children):M&16&&U(I.children,se,null,k,O,oo(I,z),de,X),N&&Ii(I,null,k,"created"),R(se,I,I.scopeId,de,k),be){for(const ne in be)ne!=="value"&&!aa(ne)&&a(se,ne,null,be[ne],z,k);"value"in be&&a(se,"value",null,be.value,z),(re=be.onVnodeBeforeMount)&&In(re,k,I)}N&&Ii(I,null,k,"beforeMount");const q=Pp(O,v);q&&v.beforeEnter(se),i(se,g,L),((re=be&&be.onVnodeMounted)||q||N)&&cn(()=>{re&&In(re,k,I),q&&v.enter(se),N&&Ii(I,null,k,"mounted")},O)},R=(I,g,L,k,O)=>{if(L&&p(I,L),k)for(let z=0;z<k.length;z++)p(I,k[z]);if(O){let z=O.subTree;if(g===z||uf(z.type)&&(z.ssContent===g||z.ssFallback===g)){const de=O.vnode;R(I,de,de.scopeId,de.slotScopeIds,O.parent)}}},U=(I,g,L,k,O,z,de,X,se=0)=>{for(let re=se;re<I.length;re++){const be=I[re]=X?gi(I[re]):Un(I[re]);y(null,be,g,L,k,O,z,de,X)}},T=(I,g,L,k,O,z,de)=>{const X=g.el=I.el;let{patchFlag:se,dynamicChildren:re,dirs:be}=g;se|=I.patchFlag&16;const M=I.props||vt,v=g.props||vt;let N;if(L&&Li(L,!1),(N=v.onVnodeBeforeUpdate)&&In(N,L,g,I),be&&Ii(g,I,L,"beforeUpdate"),L&&Li(L,!0),(M.innerHTML&&v.innerHTML==null||M.textContent&&v.textContent==null)&&u(X,""),re?A(I.dynamicChildren,re,X,L,k,oo(g,O),z):de||G(I,g,X,null,L,k,oo(g,O),z,!1),se>0){if(se&16)F(X,M,v,L,O);else if(se&2&&M.class!==v.class&&a(X,"class",null,v.class,O),se&4&&a(X,"style",M.style,v.style,O),se&8){const q=g.dynamicProps;for(let ne=0;ne<q.length;ne++){const W=q[ne],Se=M[W],fe=v[W];(fe!==Se||W==="value")&&a(X,W,Se,fe,O,L)}}se&1&&I.children!==g.children&&u(X,g.children)}else!de&&re==null&&F(X,M,v,L,O);((N=v.onVnodeUpdated)||be)&&cn(()=>{N&&In(N,L,g,I),be&&Ii(g,I,L,"updated")},k)},A=(I,g,L,k,O,z,de)=>{for(let X=0;X<g.length;X++){const se=I[X],re=g[X],be=se.el&&(se.type===Qe||!Xs(se,re)||se.shapeFlag&198)?d(se.el):L;y(se,re,be,null,k,O,z,de,!0)}},F=(I,g,L,k,O)=>{if(g!==L){if(g!==vt)for(const z in g)!aa(z)&&!(z in L)&&a(I,z,g[z],null,O,k);for(const z in L){if(aa(z))continue;const de=L[z],X=g[z];de!==X&&z!=="value"&&a(I,z,X,de,O,k)}"value"in L&&a(I,"value",g.value,L.value,O)}},j=(I,g,L,k,O,z,de,X,se)=>{const re=g.el=I?I.el:r(""),be=g.anchor=I?I.anchor:r("");let{patchFlag:M,dynamicChildren:v,slotScopeIds:N}=g;N&&(X=X?X.concat(N):N),I==null?(i(re,L,k),i(be,L,k),U(g.children||[],L,be,O,z,de,X,se)):M>0&&M&64&&v&&I.dynamicChildren?(A(I.dynamicChildren,v,L,O,z,de,X),(g.key!=null||O&&g===O.subTree)&&rf(I,g,!0)):G(I,g,L,be,O,z,de,X,se)},Y=(I,g,L,k,O,z,de,X,se)=>{g.slotScopeIds=X,I==null?g.shapeFlag&512?O.ctx.activate(g,L,k,de,se):ce(g,L,k,O,z,de,se):ae(I,g,se)},ce=(I,g,L,k,O,z,de)=>{const X=I.component=Yp(I,k,O);if(qu(I)&&(X.ctx.renderer=Ue),Zp(X,!1,de),X.asyncDep){if(O&&O.registerDep(X,Q,de),!I.el){const se=X.subTree=zt(wi);h(null,se,g,L),I.placeholder=se.el}}else Q(X,I,g,L,O,z,de)},ae=(I,g,L)=>{const k=g.component=I.component;if(Hp(I,g,L))if(k.asyncDep&&!k.asyncResolved){ie(k,g,L);return}else k.next=g,k.update();else g.el=I.el,k.vnode=g},Q=(I,g,L,k,O,z,de)=>{const X=()=>{if(I.isMounted){let{next:M,bu:v,u:N,parent:q,vnode:ne}=I;{const Re=of(I);if(Re){M&&(M.el=ne.el,ie(I,M,de)),Re.asyncDep.then(()=>{I.isUnmounted||X()});return}}let W=M,Se;Li(I,!1),M?(M.el=ne.el,ie(I,M,de)):M=ne,v&&fr(v),(Se=M.props&&M.props.onVnodeBeforeUpdate)&&In(Se,q,M,ne),Li(I,!0);const fe=Gc(I),Ae=I.subTree;I.subTree=fe,y(Ae,fe,d(Ae.el),ue(Ae),I,O,z),M.el=fe.el,W===null&&Vp(I,fe.el),N&&cn(N,O),(Se=M.props&&M.props.onVnodeUpdated)&&cn(()=>In(Se,q,M,ne),O)}else{let M;const{el:v,props:N}=g,{bm:q,m:ne,parent:W,root:Se,type:fe}=I,Ae=ca(g);Li(I,!1),q&&fr(q),!Ae&&(M=N&&N.onVnodeBeforeMount)&&In(M,W,g),Li(I,!0);{Se.ce&&Se.ce._def.shadowRoot!==!1&&Se.ce._injectChildStyle(fe);const Re=I.subTree=Gc(I);y(null,Re,L,k,I,O,z),g.el=Re.el}if(ne&&cn(ne,O),!Ae&&(M=N&&N.onVnodeMounted)){const Re=g;cn(()=>In(M,W,Re),O)}(g.shapeFlag&256||W&&ca(W.vnode)&&W.vnode.shapeFlag&256)&&I.a&&cn(I.a,O),I.isMounted=!0,g=L=k=null}};I.scope.on();const se=I.effect=new Mu(X);I.scope.off();const re=I.update=se.run.bind(se),be=I.job=se.runIfDirty.bind(se);be.i=I,be.id=I.uid,se.scheduler=()=>cc(be),Li(I,!0),re()},ie=(I,g,L)=>{g.component=I;const k=I.vnode.props;I.vnode=g,I.next=null,Mp(I,g.props,k,L),wp(I,g.children,L),ri(),Nc(I),oi()},G=(I,g,L,k,O,z,de,X,se=!1)=>{const re=I&&I.children,be=I?I.shapeFlag:0,M=g.children,{patchFlag:v,shapeFlag:N}=g;if(v>0){if(v&128){Te(re,M,L,k,O,z,de,X,se);return}else if(v&256){ve(re,M,L,k,O,z,de,X,se);return}}N&8?(be&16&&oe(re,O,z),M!==re&&u(L,M)):be&16?N&16?Te(re,M,L,k,O,z,de,X,se):oe(re,O,z,!0):(be&8&&u(L,""),N&16&&U(M,L,k,O,z,de,X,se))},ve=(I,g,L,k,O,z,de,X,se)=>{I=I||Cs,g=g||Cs;const re=I.length,be=g.length,M=Math.min(re,be);let v;for(v=0;v<M;v++){const N=g[v]=se?gi(g[v]):Un(g[v]);y(I[v],N,L,null,O,z,de,X,se)}re>be?oe(I,O,z,!0,!1,M):U(g,L,k,O,z,de,X,se,M)},Te=(I,g,L,k,O,z,de,X,se)=>{let re=0;const be=g.length;let M=I.length-1,v=be-1;for(;re<=M&&re<=v;){const N=I[re],q=g[re]=se?gi(g[re]):Un(g[re]);if(Xs(N,q))y(N,q,L,null,O,z,de,X,se);else break;re++}for(;re<=M&&re<=v;){const N=I[M],q=g[v]=se?gi(g[v]):Un(g[v]);if(Xs(N,q))y(N,q,L,null,O,z,de,X,se);else break;M--,v--}if(re>M){if(re<=v){const N=v+1,q=N<be?g[N].el:k;for(;re<=v;)y(null,g[re]=se?gi(g[re]):Un(g[re]),L,q,O,z,de,X,se),re++}}else if(re>v)for(;re<=M;)ke(I[re],O,z,!0),re++;else{const N=re,q=re,ne=new Map;for(re=q;re<=v;re++){const Le=g[re]=se?gi(g[re]):Un(g[re]);Le.key!=null&&ne.set(Le.key,re)}let W,Se=0;const fe=v-q+1;let Ae=!1,Re=0;const pe=new Array(fe);for(re=0;re<fe;re++)pe[re]=0;for(re=N;re<=M;re++){const Le=I[re];if(Se>=fe){ke(Le,O,z,!0);continue}let Ce;if(Le.key!=null)Ce=ne.get(Le.key);else for(W=q;W<=v;W++)if(pe[W-q]===0&&Xs(Le,g[W])){Ce=W;break}Ce===void 0?ke(Le,O,z,!0):(pe[Ce-q]=re+1,Ce>=Re?Re=Ce:Ae=!0,y(Le,g[Ce],L,null,O,z,de,X,se),Se++)}const Me=Ae?Dp(pe):Cs;for(W=Me.length-1,re=fe-1;re>=0;re--){const Le=q+re,Ce=g[Le],xe=g[Le+1],$e=Le+1<be?xe.el||xe.placeholder:k;pe[re]===0?y(null,Ce,L,$e,O,z,de,X,se):Ae&&(W<0||re!==Me[W]?Ie(Ce,L,$e,2):W--)}}},Ie=(I,g,L,k,O=null)=>{const{el:z,type:de,transition:X,children:se,shapeFlag:re}=I;if(re&6){Ie(I.component.subTree,g,L,k);return}if(re&128){I.suspense.move(g,L,k);return}if(re&64){de.move(I,g,L,Ue);return}if(de===Qe){i(z,g,L);for(let M=0;M<se.length;M++)Ie(se[M],g,L,k);i(I.anchor,g,L);return}if(de===hr){w(I,g,L);return}if(k!==2&&re&1&&X)if(k===0)X.beforeEnter(z),i(z,g,L),cn(()=>X.enter(z),O);else{const{leave:M,delayLeave:v,afterLeave:N}=X,q=()=>{I.ctx.isUnmounted?s(z):i(z,g,L)},ne=()=>{z._isLeaving&&z[np](!0),M(z,()=>{q(),N&&N()})};v?v(z,q,ne):ne()}else i(z,g,L)},ke=(I,g,L,k=!1,O=!1)=>{const{type:z,props:de,ref:X,children:se,dynamicChildren:re,shapeFlag:be,patchFlag:M,dirs:v,cacheIndex:N}=I;if(M===-2&&(O=!1),X!=null&&(ri(),la(X,null,L,I,!0),oi()),N!=null&&(g.renderCache[N]=void 0),be&256){g.ctx.deactivate(I);return}const q=be&1&&v,ne=!ca(I);let W;if(ne&&(W=de&&de.onVnodeBeforeUnmount)&&In(W,g,I),be&6)nt(I.component,L,k);else{if(be&128){I.suspense.unmount(L,k);return}q&&Ii(I,null,g,"beforeUnmount"),be&64?I.type.remove(I,g,L,Ue,k):re&&!re.hasOnce&&(z!==Qe||M>0&&M&64)?oe(re,g,L,!1,!0):(z===Qe&&M&384||!O&&be&16)&&oe(se,g,L),k&&ot(I)}(ne&&(W=de&&de.onVnodeUnmounted)||q)&&cn(()=>{W&&In(W,g,I),q&&Ii(I,null,g,"unmounted")},L)},ot=I=>{const{type:g,el:L,anchor:k,transition:O}=I;if(g===Qe){ut(L,k);return}if(g===hr){b(I);return}const z=()=>{s(L),O&&!O.persisted&&O.afterLeave&&O.afterLeave()};if(I.shapeFlag&1&&O&&!O.persisted){const{leave:de,delayLeave:X}=O,se=()=>de(L,z);X?X(I.el,z,se):se()}else z()},ut=(I,g)=>{let L;for(;I!==g;)L=f(I),s(I),I=L;s(g)},nt=(I,g,L)=>{const{bum:k,scope:O,job:z,subTree:de,um:X,m:se,a:re}=I;kc(se),kc(re),k&&fr(k),O.stop(),z&&(z.flags|=8,ke(de,I,g,L)),X&&cn(X,g),cn(()=>{I.isUnmounted=!0},g)},oe=(I,g,L,k=!1,O=!1,z=0)=>{for(let de=z;de<I.length;de++)ke(I[de],g,L,k,O)},ue=I=>{if(I.shapeFlag&6)return ue(I.component.subTree);if(I.shapeFlag&128)return I.suspense.next();const g=f(I.anchor||I.el),L=g&&g[ep];return L?f(L):g};let Pe=!1;const ze=(I,g,L)=>{I==null?g._vnode&&ke(g._vnode,null,null,!0):y(g._vnode||null,I,g,null,null,null,L),g._vnode=I,Pe||(Pe=!0,Nc(),Hu(),Pe=!1)},Ue={p:y,um:ke,m:Ie,r:ot,mt:ce,mc:U,pc:G,pbc:A,n:ue,o:n};return{render:ze,hydrate:void 0,createApp:yp(ze)}}function oo({type:n,props:e},t){return t==="svg"&&n==="foreignObject"||t==="mathml"&&n==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:t}function Li({effect:n,job:e},t){t?(n.flags|=32,e.flags|=4):(n.flags&=-33,e.flags&=-5)}function Pp(n,e){return(!n||n&&!n.pendingBranch)&&e&&!e.persisted}function rf(n,e,t=!1){const i=n.children,s=e.children;if(We(i)&&We(s))for(let a=0;a<i.length;a++){const o=i[a];let r=s[a];r.shapeFlag&1&&!r.dynamicChildren&&((r.patchFlag<=0||r.patchFlag===32)&&(r=s[a]=gi(s[a]),r.el=o.el),!t&&r.patchFlag!==-2&&rf(o,r)),r.type===jr&&r.patchFlag!==-1&&(r.el=o.el),r.type===wi&&!r.el&&(r.el=o.el)}}function Dp(n){const e=n.slice(),t=[0];let i,s,a,o,r;const l=n.length;for(i=0;i<l;i++){const c=n[i];if(c!==0){if(s=t[t.length-1],n[s]<c){e[i]=s,t.push(i);continue}for(a=0,o=t.length-1;a<o;)r=a+o>>1,n[t[r]]<c?a=r+1:o=r;c<n[t[a]]&&(a>0&&(e[i]=t[a-1]),t[a]=i)}}for(a=t.length,o=t[a-1];a-- >0;)t[a]=o,o=e[o];return t}function of(n){const e=n.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:of(e)}function kc(n){if(n)for(let e=0;e<n.length;e++)n[e].flags|=8}const Ip=Symbol.for("v-scx"),Lp=()=>Ls(Ip);function at(n,e,t){return lf(n,e,t)}function lf(n,e,t=vt){const{immediate:i,deep:s,flush:a,once:o}=t,r=jt({},t),l=e&&i||!e&&a!=="post";let c;if(ga){if(a==="sync"){const p=Lp();c=p.__watcherHandles||(p.__watcherHandles=[])}else if(!l){const p=()=>{};return p.stop=Hn,p.resume=Hn,p.pause=Hn,p}}const u=Jt;r.call=(p,x,y)=>kn(p,u,x,y);let d=!1;a==="post"?r.scheduler=p=>{cn(p,u&&u.suspense)}:a!=="sync"&&(d=!0,r.scheduler=(p,x)=>{x?p():cc(p)}),r.augmentJob=p=>{e&&(p.flags|=4),d&&(p.flags|=2,u&&(p.id=u.uid,p.i=u))};const f=Yh(n,e,r);return ga&&(c?c.push(f):l&&f()),f}function Up(n,e,t){const i=this.proxy,s=It(n)?n.includes(".")?cf(i,n):()=>i[n]:n.bind(i,i);let a;Ye(e)?a=e:(a=e.handler,t=e);const o=Ca(this),r=lf(s,a.bind(i),t);return o(),r}function cf(n,e){const t=e.split(".");return()=>{let i=n;for(let s=0;s<t.length&&i;s++)i=i[t[s]];return i}}const Np=(n,e)=>e==="modelValue"||e==="model-value"?n.modelModifiers:n[`${e}Modifiers`]||n[`${Ti(e)}Modifiers`]||n[`${Zi(e)}Modifiers`];function Fp(n,e,...t){if(n.isUnmounted)return;const i=n.vnode.props||vt;let s=t;const a=e.startsWith("update:"),o=a&&Np(i,e.slice(7));o&&(o.trim&&(s=t.map(u=>It(u)?u.trim():u)),o.number&&(s=t.map(Sr)));let r,l=i[r=to(e)]||i[r=to(Ti(e))];!l&&a&&(l=i[r=to(Zi(e))]),l&&kn(l,n,6,s);const c=i[r+"Once"];if(c){if(!n.emitted)n.emitted={};else if(n.emitted[r])return;n.emitted[r]=!0,kn(c,n,6,s)}}const Op=new WeakMap;function df(n,e,t=!1){const i=t?Op:e.emitsCache,s=i.get(n);if(s!==void 0)return s;const a=n.emits;let o={},r=!1;if(!Ye(n)){const l=c=>{const u=df(c,e,!0);u&&(r=!0,jt(o,u))};!t&&e.mixins.length&&e.mixins.forEach(l),n.extends&&l(n.extends),n.mixins&&n.mixins.forEach(l)}return!a&&!r?(xt(n)&&i.set(n,null),null):(We(a)?a.forEach(l=>o[l]=null):jt(o,a),xt(n)&&i.set(n,o),o)}function Wr(n,e){return!n||!zr(e)?!1:(e=e.slice(2).replace(/Once$/,""),dt(n,e[0].toLowerCase()+e.slice(1))||dt(n,Zi(e))||dt(n,e))}function Gc(n){const{type:e,vnode:t,proxy:i,withProxy:s,propsOptions:[a],slots:o,attrs:r,emit:l,render:c,renderCache:u,props:d,data:f,setupState:p,ctx:x,inheritAttrs:y}=n,m=Ar(n);let h,P;try{if(t.shapeFlag&4){const b=s||i,C=b;h=Un(c.call(C,b,u,d,p,f,x)),P=r}else{const b=e;h=Un(b.length>1?b(d,{attrs:r,slots:o,emit:l}):b(d,null)),P=e.props?r:Bp(r)}}catch(b){ua.length=0,Gr(b,n,1),h=zt(wi)}let w=h;if(P&&y!==!1){const b=Object.keys(P),{shapeFlag:C}=w;b.length&&C&7&&(a&&b.some(Zl)&&(P=zp(P,a)),w=Fs(w,P,!1,!0))}return t.dirs&&(w=Fs(w,null,!1,!0),w.dirs=w.dirs?w.dirs.concat(t.dirs):t.dirs),t.transition&&dc(w,t.transition),h=w,Ar(m),h}const Bp=n=>{let e;for(const t in n)(t==="class"||t==="style"||zr(t))&&((e||(e={}))[t]=n[t]);return e},zp=(n,e)=>{const t={};for(const i in n)(!Zl(i)||!(i.slice(9)in e))&&(t[i]=n[i]);return t};function Hp(n,e,t){const{props:i,children:s,component:a}=n,{props:o,children:r,patchFlag:l}=e,c=a.emitsOptions;if(e.dirs||e.transition)return!0;if(t&&l>=0){if(l&1024)return!0;if(l&16)return i?qc(i,o,c):!!o;if(l&8){const u=e.dynamicProps;for(let d=0;d<u.length;d++){const f=u[d];if(o[f]!==i[f]&&!Wr(c,f))return!0}}}else return(s||r)&&(!r||!r.$stable)?!0:i===o?!1:i?o?qc(i,o,c):!0:!!o;return!1}function qc(n,e,t){const i=Object.keys(e);if(i.length!==Object.keys(n).length)return!0;for(let s=0;s<i.length;s++){const a=i[s];if(e[a]!==n[a]&&!Wr(t,a))return!0}return!1}function Vp({vnode:n,parent:e},t){for(;e;){const i=e.subTree;if(i.suspense&&i.suspense.activeBranch===n&&(i.el=n.el),i===n)(n=e.vnode).el=t,e=e.parent;else break}}const uf=n=>n.__isSuspense;function kp(n,e){e&&e.pendingBranch?We(n)?e.effects.push(...n):e.effects.push(n):Jh(n)}const Qe=Symbol.for("v-fgt"),jr=Symbol.for("v-txt"),wi=Symbol.for("v-cmt"),hr=Symbol.for("v-stc"),ua=[];let dn=null;function ge(n=!1){ua.push(dn=n?null:[])}function Gp(){ua.pop(),dn=ua[ua.length-1]||null}let ma=1;function Wc(n,e=!1){ma+=n,n<0&&dn&&e&&(dn.hasOnce=!0)}function ff(n){return n.dynamicChildren=ma>0?dn||Cs:null,Gp(),ma>0&&dn&&dn.push(n),n}function _e(n,e,t,i,s,a){return ff(_(n,e,t,i,s,a,!0))}function nl(n,e,t,i,s){return ff(zt(n,e,t,i,s,!0))}function hf(n){return n?n.__v_isVNode===!0:!1}function Xs(n,e){return n.type===e.type&&n.key===e.key}const pf=({key:n})=>n??null,pr=({ref:n,ref_key:e,ref_for:t})=>(typeof n=="number"&&(n=""+n),n!=null?It(n)||Wt(n)||Ye(n)?{i:bn,r:n,k:e,f:!!t}:n:null);function _(n,e=null,t=null,i=0,s=null,a=n===Qe?0:1,o=!1,r=!1){const l={__v_isVNode:!0,__v_skip:!0,type:n,props:e,key:e&&pf(e),ref:e&&pr(e),scopeId:ku,slotScopeIds:null,children:t,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:a,patchFlag:i,dynamicProps:s,dynamicChildren:null,appContext:null,ctx:bn};return r?(hc(l,t),a&128&&n.normalize(l)):t&&(l.shapeFlag|=It(t)?8:16),ma>0&&!o&&dn&&(l.patchFlag>0||a&6)&&l.patchFlag!==32&&dn.push(l),l}const zt=qp;function qp(n,e=null,t=null,i=0,s=null,a=!1){if((!n||n===hp)&&(n=wi),hf(n)){const r=Fs(n,e,!0);return t&&hc(r,t),ma>0&&!a&&dn&&(r.shapeFlag&6?dn[dn.indexOf(n)]=r:dn.push(r)),r.patchFlag=-2,r}if(tm(n)&&(n=n.__vccOpts),e){e=Wp(e);let{class:r,style:l}=e;r&&!It(r)&&(e.class=Et(r)),xt(l)&&(lc(l)&&!We(l)&&(l=jt({},l)),e.style=ec(l))}const o=It(n)?1:uf(n)?128:tp(n)?64:xt(n)?4:Ye(n)?2:0;return _(n,e,t,i,s,o,a,!0)}function Wp(n){return n?lc(n)||Qu(n)?jt({},n):n:null}function Fs(n,e,t=!1,i=!1){const{props:s,ref:a,patchFlag:o,children:r,transition:l}=n,c=e?jp(s||{},e):s,u={__v_isVNode:!0,__v_skip:!0,type:n.type,props:c,key:c&&pf(c),ref:e&&e.ref?t&&a?We(a)?a.concat(pr(e)):[a,pr(e)]:pr(e):a,scopeId:n.scopeId,slotScopeIds:n.slotScopeIds,children:r,target:n.target,targetStart:n.targetStart,targetAnchor:n.targetAnchor,staticCount:n.staticCount,shapeFlag:n.shapeFlag,patchFlag:e&&n.type!==Qe?o===-1?16:o|16:o,dynamicProps:n.dynamicProps,dynamicChildren:n.dynamicChildren,appContext:n.appContext,dirs:n.dirs,transition:l,component:n.component,suspense:n.suspense,ssContent:n.ssContent&&Fs(n.ssContent),ssFallback:n.ssFallback&&Fs(n.ssFallback),placeholder:n.placeholder,el:n.el,anchor:n.anchor,ctx:n.ctx,ce:n.ce};return l&&i&&dc(u,l.clone(u)),u}function Gt(n=" ",e=0){return zt(jr,null,n,e)}function Es(n,e){const t=zt(hr,null,n);return t.staticCount=e,t}function gt(n="",e=!1){return e?(ge(),nl(wi,null,n)):zt(wi,null,n)}function Un(n){return n==null||typeof n=="boolean"?zt(wi):We(n)?zt(Qe,null,n.slice()):hf(n)?gi(n):zt(jr,null,String(n))}function gi(n){return n.el===null&&n.patchFlag!==-1||n.memo?n:Fs(n)}function hc(n,e){let t=0;const{shapeFlag:i}=n;if(e==null)e=null;else if(We(e))t=16;else if(typeof e=="object")if(i&65){const s=e.default;s&&(s._c&&(s._d=!1),hc(n,s()),s._c&&(s._d=!0));return}else{t=32;const s=e._;!s&&!Qu(e)?e._ctx=bn:s===3&&bn&&(bn.slots._===1?e._=1:(e._=2,n.patchFlag|=1024))}else Ye(e)?(e={default:e,_ctx:bn},t=32):(e=String(e),i&64?(t=16,e=[Gt(e)]):t=8);n.children=e,n.shapeFlag|=t}function jp(...n){const e={};for(let t=0;t<n.length;t++){const i=n[t];for(const s in i)if(s==="class")e.class!==i.class&&(e.class=Et([e.class,i.class]));else if(s==="style")e.style=ec([e.style,i.style]);else if(zr(s)){const a=e[s],o=i[s];o&&a!==o&&!(We(a)&&a.includes(o))&&(e[s]=a?[].concat(a,o):o)}else s!==""&&(e[s]=i[s])}return e}function In(n,e,t,i=null){kn(n,e,7,[t,i])}const $p=Ku();let Xp=0;function Yp(n,e,t){const i=n.type,s=(e?e.appContext:n.appContext)||$p,a={uid:Xp++,vnode:n,type:i,parent:e,appContext:s,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new yh(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(s.provides),ids:e?e.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:tf(i,s),emitsOptions:df(i,s),emit:null,emitted:null,propsDefaults:vt,inheritAttrs:i.inheritAttrs,ctx:vt,data:vt,props:vt,attrs:vt,slots:vt,refs:vt,setupState:vt,setupContext:null,suspense:t,suspenseId:t?t.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return a.ctx={_:a},a.root=e?e.root:a,a.emit=Fp.bind(null,a),n.ce&&n.ce(a),a}let Jt=null;const Kp=()=>Jt||bn;let Rr,il;{const n=Vr(),e=(t,i)=>{let s;return(s=n[t])||(s=n[t]=[]),s.push(i),a=>{s.length>1?s.forEach(o=>o(a)):s[0](a)}};Rr=e("__VUE_INSTANCE_SETTERS__",t=>Jt=t),il=e("__VUE_SSR_SETTERS__",t=>ga=t)}const Ca=n=>{const e=Jt;return Rr(n),n.scope.on(),()=>{n.scope.off(),Rr(e)}},jc=()=>{Jt&&Jt.scope.off(),Rr(null)};function mf(n){return n.vnode.shapeFlag&4}let ga=!1;function Zp(n,e=!1,t=!1){e&&il(e);const{props:i,children:s}=n.vnode,a=mf(n);Sp(n,i,a,e),Ap(n,s,t||e);const o=a?Jp(n,e):void 0;return e&&il(!1),o}function Jp(n,e){const t=n.type;n.accessCache=Object.create(null),n.proxy=new Proxy(n.ctx,pp);const{setup:i}=t;if(i){ri();const s=n.setupContext=i.length>1?em(n):null,a=Ca(n),o=Aa(i,n,0,[n.props,s]),r=mu(o);if(oi(),a(),(r||n.sp)&&!ca(n)&&Gu(n),r){if(o.then(jc,jc),e)return o.then(l=>{$c(n,l)}).catch(l=>{Gr(l,n,0)});n.asyncDep=o}else $c(n,o)}else gf(n)}function $c(n,e,t){Ye(e)?n.type.__ssrInlineRender?n.ssrRender=e:n.render=e:xt(e)&&(n.setupState=Ou(e)),gf(n)}function gf(n,e,t){const i=n.type;n.render||(n.render=i.render||Hn);{const s=Ca(n);ri();try{mp(n)}finally{oi(),s()}}}const Qp={get(n,e){return qt(n,"get",""),n[e]}};function em(n){const e=t=>{n.exposed=t||{}};return{attrs:new Proxy(n.attrs,Qp),slots:n.slots,emit:n.emit,expose:e}}function $r(n){return n.exposed?n.exposeProxy||(n.exposeProxy=new Proxy(Ou(kh(n.exposed)),{get(e,t){if(t in e)return e[t];if(t in da)return da[t](n)},has(e,t){return t in e||t in da}})):n.proxy}function tm(n){return Ye(n)&&"__vccOpts"in n}const Ve=(n,e)=>$h(n,e,ga),nm="3.5.22";/**
* @vue/runtime-dom v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let sl;const Xc=typeof window<"u"&&window.trustedTypes;if(Xc)try{sl=Xc.createPolicy("vue",{createHTML:n=>n})}catch{}const _f=sl?n=>sl.createHTML(n):n=>n,im="http://www.w3.org/2000/svg",sm="http://www.w3.org/1998/Math/MathML",ei=typeof document<"u"?document:null,Yc=ei&&ei.createElement("template"),am={insert:(n,e,t)=>{e.insertBefore(n,t||null)},remove:n=>{const e=n.parentNode;e&&e.removeChild(n)},createElement:(n,e,t,i)=>{const s=e==="svg"?ei.createElementNS(im,n):e==="mathml"?ei.createElementNS(sm,n):t?ei.createElement(n,{is:t}):ei.createElement(n);return n==="select"&&i&&i.multiple!=null&&s.setAttribute("multiple",i.multiple),s},createText:n=>ei.createTextNode(n),createComment:n=>ei.createComment(n),setText:(n,e)=>{n.nodeValue=e},setElementText:(n,e)=>{n.textContent=e},parentNode:n=>n.parentNode,nextSibling:n=>n.nextSibling,querySelector:n=>ei.querySelector(n),setScopeId(n,e){n.setAttribute(e,"")},insertStaticContent(n,e,t,i,s,a){const o=t?t.previousSibling:e.lastChild;if(s&&(s===a||s.nextSibling))for(;e.insertBefore(s.cloneNode(!0),t),!(s===a||!(s=s.nextSibling)););else{Yc.innerHTML=_f(i==="svg"?`<svg>${n}</svg>`:i==="mathml"?`<math>${n}</math>`:n);const r=Yc.content;if(i==="svg"||i==="mathml"){const l=r.firstChild;for(;l.firstChild;)r.appendChild(l.firstChild);r.removeChild(l)}e.insertBefore(r,t)}return[o?o.nextSibling:e.firstChild,t?t.previousSibling:e.lastChild]}},rm=Symbol("_vtc");function om(n,e,t){const i=n[rm];i&&(e=(e?[e,...i]:[...i]).join(" ")),e==null?n.removeAttribute("class"):t?n.setAttribute("class",e):n.className=e}const Kc=Symbol("_vod"),lm=Symbol("_vsh"),cm=Symbol(""),dm=/(?:^|;)\s*display\s*:/;function um(n,e,t){const i=n.style,s=It(t);let a=!1;if(t&&!s){if(e)if(It(e))for(const o of e.split(";")){const r=o.slice(0,o.indexOf(":")).trim();t[r]==null&&mr(i,r,"")}else for(const o in e)t[o]==null&&mr(i,o,"");for(const o in t)o==="display"&&(a=!0),mr(i,o,t[o])}else if(s){if(e!==t){const o=i[cm];o&&(t+=";"+o),i.cssText=t,a=dm.test(t)}}else e&&n.removeAttribute("style");Kc in n&&(n[Kc]=a?i.display:"",n[lm]&&(i.display="none"))}const Zc=/\s*!important$/;function mr(n,e,t){if(We(t))t.forEach(i=>mr(n,e,i));else if(t==null&&(t=""),e.startsWith("--"))n.setProperty(e,t);else{const i=fm(n,e);Zc.test(t)?n.setProperty(Zi(i),t.replace(Zc,""),"important"):n[i]=t}}const Jc=["Webkit","Moz","ms"],lo={};function fm(n,e){const t=lo[e];if(t)return t;let i=Ti(e);if(i!=="filter"&&i in n)return lo[e]=i;i=vu(i);for(let s=0;s<Jc.length;s++){const a=Jc[s]+i;if(a in n)return lo[e]=a}return e}const Qc="http://www.w3.org/1999/xlink";function ed(n,e,t,i,s,a=bh(e)){i&&e.startsWith("xlink:")?t==null?n.removeAttributeNS(Qc,e.slice(6,e.length)):n.setAttributeNS(Qc,e,t):t==null||a&&!xu(t)?n.removeAttribute(e):n.setAttribute(e,a?"":Vn(t)?String(t):t)}function td(n,e,t,i,s){if(e==="innerHTML"||e==="textContent"){t!=null&&(n[e]=e==="innerHTML"?_f(t):t);return}const a=n.tagName;if(e==="value"&&a!=="PROGRESS"&&!a.includes("-")){const r=a==="OPTION"?n.getAttribute("value")||"":n.value,l=t==null?n.type==="checkbox"?"on":"":String(t);(r!==l||!("_value"in n))&&(n.value=l),t==null&&n.removeAttribute(e),n._value=t;return}let o=!1;if(t===""||t==null){const r=typeof n[e];r==="boolean"?t=xu(t):t==null&&r==="string"?(t="",o=!0):r==="number"&&(t=0,o=!0)}try{n[e]=t}catch{}o&&n.removeAttribute(s||e)}function bi(n,e,t,i){n.addEventListener(e,t,i)}function hm(n,e,t,i){n.removeEventListener(e,t,i)}const nd=Symbol("_vei");function pm(n,e,t,i,s=null){const a=n[nd]||(n[nd]={}),o=a[e];if(i&&o)o.value=i;else{const[r,l]=mm(e);if(i){const c=a[e]=vm(i,s);bi(n,r,c,l)}else o&&(hm(n,r,o,l),a[e]=void 0)}}const id=/(?:Once|Passive|Capture)$/;function mm(n){let e;if(id.test(n)){e={};let i;for(;i=n.match(id);)n=n.slice(0,n.length-i[0].length),e[i[0].toLowerCase()]=!0}return[n[2]===":"?n.slice(3):Zi(n.slice(2)),e]}let co=0;const gm=Promise.resolve(),_m=()=>co||(gm.then(()=>co=0),co=Date.now());function vm(n,e){const t=i=>{if(!i._vts)i._vts=Date.now();else if(i._vts<=t.attached)return;kn(bm(i,t.value),e,5,[i])};return t.value=n,t.attached=_m(),t}function bm(n,e){if(We(e)){const t=n.stopImmediatePropagation;return n.stopImmediatePropagation=()=>{t.call(n),n._stopped=!0},e.map(i=>s=>!s._stopped&&i&&i(s))}else return e}const sd=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&n.charCodeAt(2)>96&&n.charCodeAt(2)<123,xm=(n,e,t,i,s,a)=>{const o=s==="svg";e==="class"?om(n,i,o):e==="style"?um(n,t,i):zr(e)?Zl(e)||pm(n,e,t,i,a):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):ym(n,e,i,o))?(td(n,e,i),!n.tagName.includes("-")&&(e==="value"||e==="checked"||e==="selected")&&ed(n,e,i,o,a,e!=="value")):n._isVueCE&&(/[A-Z]/.test(e)||!It(i))?td(n,Ti(e),i,a,e):(e==="true-value"?n._trueValue=i:e==="false-value"&&(n._falseValue=i),ed(n,e,i,o))};function ym(n,e,t,i){if(i)return!!(e==="innerHTML"||e==="textContent"||e in n&&sd(e)&&Ye(t));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="autocorrect"||e==="form"||e==="list"&&n.tagName==="INPUT"||e==="type"&&n.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const s=n.tagName;if(s==="IMG"||s==="VIDEO"||s==="CANVAS"||s==="SOURCE")return!1}return sd(e)&&It(t)?!1:e in n}const Os=n=>{const e=n.props["onUpdate:modelValue"]||!1;return We(e)?t=>fr(e,t):e};function Sm(n){n.target.composing=!0}function ad(n){const e=n.target;e.composing&&(e.composing=!1,e.dispatchEvent(new Event("input")))}const si=Symbol("_assign"),_i={created(n,{modifiers:{lazy:e,trim:t,number:i}},s){n[si]=Os(s);const a=i||s.props&&s.props.type==="number";bi(n,e?"change":"input",o=>{if(o.target.composing)return;let r=n.value;t&&(r=r.trim()),a&&(r=Sr(r)),n[si](r)}),t&&bi(n,"change",()=>{n.value=n.value.trim()}),e||(bi(n,"compositionstart",Sm),bi(n,"compositionend",ad),bi(n,"change",ad))},mounted(n,{value:e}){n.value=e??""},beforeUpdate(n,{value:e,oldValue:t,modifiers:{lazy:i,trim:s,number:a}},o){if(n[si]=Os(o),n.composing)return;const r=(a||n.type==="number")&&!/^0\d/.test(n.value)?Sr(n.value):n.value,l=e??"";r!==l&&(document.activeElement===n&&n.type!=="range"&&(i&&e===t||s&&n.value.trim()===l)||(n.value=l))}},Mm={deep:!0,created(n,e,t){n[si]=Os(t),bi(n,"change",()=>{const i=n._modelValue,s=_a(n),a=n.checked,o=n[si];if(We(i)){const r=tc(i,s),l=r!==-1;if(a&&!l)o(i.concat(s));else if(!a&&l){const c=[...i];c.splice(r,1),o(c)}}else if(Gs(i)){const r=new Set(i);a?r.add(s):r.delete(s),o(r)}else o(vf(n,a))})},mounted:rd,beforeUpdate(n,e,t){n[si]=Os(t),rd(n,e,t)}};function rd(n,{value:e,oldValue:t},i){n._modelValue=e;let s;if(We(e))s=tc(e,i.props.value)>-1;else if(Gs(e))s=e.has(i.props.value);else{if(e===t)return;s=Ea(e,vf(n,!0))}n.checked!==s&&(n.checked=s)}const pc={deep:!0,created(n,{value:e,modifiers:{number:t}},i){const s=Gs(e);bi(n,"change",()=>{const a=Array.prototype.filter.call(n.options,o=>o.selected).map(o=>t?Sr(_a(o)):_a(o));n[si](n.multiple?s?new Set(a):a:a[0]),n._assigning=!0,wa(()=>{n._assigning=!1})}),n[si]=Os(i)},mounted(n,{value:e}){od(n,e)},beforeUpdate(n,e,t){n[si]=Os(t)},updated(n,{value:e}){n._assigning||od(n,e)}};function od(n,e){const t=n.multiple,i=We(e);if(!(t&&!i&&!Gs(e))){for(let s=0,a=n.options.length;s<a;s++){const o=n.options[s],r=_a(o);if(t)if(i){const l=typeof r;l==="string"||l==="number"?o.selected=e.some(c=>String(c)===String(r)):o.selected=tc(e,r)>-1}else o.selected=e.has(r);else if(Ea(_a(o),e)){n.selectedIndex!==s&&(n.selectedIndex=s);return}}!t&&n.selectedIndex!==-1&&(n.selectedIndex=-1)}}function _a(n){return"_value"in n?n._value:n.value}function vf(n,e){const t=e?"_trueValue":"_falseValue";return t in n?n[t]:e}const Em=jt({patchProp:xm},am);let ld;function Tm(){return ld||(ld=Cp(Em))}const Am=((...n)=>{const e=Tm().createApp(...n),{mount:t}=e;return e.mount=i=>{const s=Cm(i);if(!s)return;const a=e._component;!Ye(a)&&!a.render&&!a.template&&(a.template=s.innerHTML),s.nodeType===1&&(s.textContent="");const o=t(s,!1,wm(s));return s instanceof Element&&(s.removeAttribute("v-cloak"),s.setAttribute("data-v-app","")),o},e});function wm(n){if(n instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&n instanceof MathMLElement)return"mathml"}function Cm(n){return It(n)?document.querySelector(n):n}class Rm{id;name;posicion="";oficio="";oficio_habilidades=[];oficio_dotes=[];nivel=1;estilo_marcial="";estilo_marcial_dotes=[];trasfondo="";trasfondo_habilidades=[];raza="";arbol="";habilidades="";armas=[];armaduras=[];atributos={cuerpo:0,agilidad:0,mente:0,rangoCritico:24,habilidadesExtra:0,limiteHabilidad:5,acciones:0,reacciones:0,hp:10,poderio:0,movimiento:3,resistencia:0,regeneracion:2,evasion:12,iniciativa:0,punteria:0,puntosHabilidad:10};constructor(e,t){this.id=e,this.name=t}getName(){return this.name}}class Pm{characters=new Map;addCharacter(e){this.characters.set(e.id,e)}getCharacter(e){return this.characters.get(e)}getCharactersList(){return Array.from(this.characters.values())}}const Oa=Ta(new Pm);function Dm(){function n(i,s){const a=Ta(new Rm(i,s));Oa.addCharacter(a)}const e=Ve(()=>Array.from(Oa.characters.values()));function t(i){return Oa.getCharacter(i)}return{partida:Oa,charactersList:e,addCharacter:n,getCharacter:t}}const Im={nodos:[{id:1,atributo:"2",layer:0,posicion:0,shape:"circle"},{id:2,atributo:"3",layer:0,posicion:1,shape:"circle"},{id:3,atributo:"1",layer:0,posicion:2,shape:"circle"},{id:4,atributo:"11",layer:1,posicion:0,shape:"circle"},{id:5,atributo:"14",layer:1,posicion:4,shape:"circle"},{id:6,atributo:"6",layer:1,posicion:8,shape:"circle"},{id:7,atributo:"5",layer:1,posicion:9,shape:"circle"},{id:8,atributo:"1",layer:1,posicion:10,shape:"square"},{id:9,atributo:"10",layer:1,posicion:11,shape:"square"},{id:10,atributo:"9",layer:2,posicion:0,shape:"circle"},{id:11,atributo:"18",layer:2,posicion:1,shape:"circle"},{id:12,atributo:"10",layer:2,posicion:2,shape:"circle"},{id:13,atributo:"7",layer:2,posicion:4,shape:"square"},{id:14,atributo:"11",layer:2,posicion:7,shape:"square"},{id:15,atributo:"15",layer:2,posicion:8,shape:"circle"},{id:16,atributo:"16",layer:2,posicion:9,shape:"circle"},{id:17,atributo:"17",layer:2,posicion:11,shape:"circle"},{id:18,atributo:"7",layer:2,posicion:14,shape:"circle"},{id:19,atributo:"4",layer:2,posicion:16,shape:"circle"},{id:20,atributo:"4",layer:2,posicion:18,shape:"square"},{id:21,atributo:"4",layer:2,posicion:20,shape:"circle"},{id:22,atributo:"11",layer:2,posicion:22,shape:"circle"},{id:23,atributo:"9",layer:3,posicion:0,shape:"square"},{id:24,atributo:"10",layer:3,posicion:1,shape:"circle"},{id:25,atributo:"8",layer:3,posicion:2,shape:"square"},{id:26,atributo:"9",layer:3,posicion:4,shape:"circle"},{id:27,atributo:"14",layer:3,posicion:6,shape:"circle"},{id:28,atributo:"16",layer:3,posicion:7,shape:"circle"},{id:29,atributo:"12",layer:3,posicion:8,shape:"square"},{id:30,atributo:"17",layer:3,posicion:9,shape:"circle"},{id:31,atributo:"15",layer:3,posicion:10,shape:"circle"},{id:32,atributo:"2",layer:3,posicion:14,shape:"square"},{id:33,atributo:"5",layer:3,posicion:16,shape:"circle"},{id:34,atributo:"5",layer:3,posicion:17,shape:"square"},{id:35,atributo:"7",layer:3,posicion:18,shape:"circle"},{id:36,atributo:"3",layer:3,posicion:19,shape:"square"},{id:37,atributo:"8",layer:3,posicion:20,shape:"circle"},{id:38,atributo:"13",layer:3,posicion:21,shape:"circle"}],conexiones:[{origen:7,destino:8},{origen:10,destino:22},{origen:16,destino:17},{origen:17,destino:18},{origen:19,destino:20},{origen:12,destino:13},{origen:33,destino:34},{origen:34,destino:35},{origen:35,destino:36},{origen:23,destino:24},{origen:24,destino:25},{origen:25,destino:26},{origen:26,destino:27},{origen:27,destino:28},{origen:28,destino:29},{origen:29,destino:30},{origen:31,destino:32},{origen:38,destino:23},{origen:1,destino:4},{origen:2,destino:5},{origen:3,destino:6},{origen:3,destino:7},{origen:4,destino:10},{origen:4,destino:11},{origen:4,destino:12},{origen:6,destino:19},{origen:6,destino:18},{origen:5,destino:14},{origen:5,destino:15},{origen:5,destino:16},{origen:9,destino:22},{origen:21,destino:38},{origen:22,destino:38},{origen:19,destino:33},{origen:20,destino:35},{origen:20,destino:37},{origen:21,destino:37},{origen:10,destino:23},{origen:11,destino:25},{origen:14,destino:28},{origen:15,destino:29},{origen:16,destino:30},{origen:16,destino:31},{origen:18,destino:32}]},Ts={arbol:Im},Lm=[{id:1,nombre:"Cuerpo",diminutivo:"B",descripcion:"Determina la potencia física, la resistencia y la salud general.",tipo:0},{id:2,nombre:"Agilidad",diminutivo:"A",descripcion:"Mide la destreza, reflejos y coordinación.",tipo:0},{id:3,nombre:"Mente",diminutivo:"MIND",descripcion:"Indica la capacidad cognitiva y el enfoque mental.",tipo:0},{id:4,nombre:"Poderío",diminutivo:"DL",descripcion:"Determina la potencia física y la capacidad para realizar tareas que requieren esfuerzo.",tipo:1},{id:5,nombre:"Movimiento",diminutivo:"M",descripcion:"Mide la velocidad y agilidad en el desplazamiento del personaje.",tipo:1},{id:6,nombre:"Resistencia",diminutivo:"R",descripcion:"Mide la velocidad y agilidad en el desplazamiento del personaje.",tipo:1},{id:7,nombre:"HP",diminutivo:"HP",descripcion:"Indica la resistencia física y la salud general del personaje.",tipo:1},{id:8,nombre:"Regeneración",diminutivo:"REG",descripcion:"Indica la resistencia física y la salud general del personaje.",tipo:1},{id:9,nombre:"Evasión",diminutivo:"AC",descripcion:"Refleja la capacidad de evitar ataques y peligros.",tipo:2},{id:10,nombre:"Iniciativa",diminutivo:"INI",descripcion:"Representa el sentido común, la percepción y la intuición.",tipo:2},{id:11,nombre:"Puntería",diminutivo:"DE",descripcion:"Mide la habilidad para influir en otros y la presencia personal.",tipo:2},{id:12,nombre:"Acciones",diminutivo:"ACC",descripcion:"Indica la concentración y la capacidad de mantener la atención en tareas específicas.",tipo:2},{id:13,nombre:"Reacciones",diminutivo:"REAC",descripcion:"Refleja la fuerza de voluntad y la determinación del personaje.",tipo:2},{id:14,nombre:"Puntos de Habilidad",diminutivo:"H",descripcion:"Mide la sabiduría, el aprendizaje y la comprensión del entorno.",tipo:3},{id:15,nombre:"Voluntad",diminutivo:"WP",descripcion:"Indica la capacidad para resistir influencias mentales y mantener el control.",tipo:3},{id:16,nombre:"Limite de Habilidad",diminutivo:"CAP",descripcion:"Refleja la memoria, el razonamiento y la agudeza mental.",tipo:3},{id:17,nombre:"Habilidades extras",diminutivo:"SKILL",descripcion:"Mide la capacidad de enfoque y atención en tareas complejas.",tipo:3},{id:18,nombre:"Rango de Critico",diminutivo:"IC",descripcion:"Indica la capacidad para resistir influencias mentales y mantener el control.",tipo:0}],As={caracteristicasSecundarias:Lm};function bf(n,e=Ve(()=>1)){function t(U){const T=Ts.arbol.nodos.find(A=>A.id===U);return T?typeof T.atributo=="string"?parseInt(T.atributo):T.atributo:null}function i(U){return n.value.filter(T=>t(T.nodeId)===U).length}function s(U){return As.caracteristicasSecundarias.find(A=>A.id===U)?.tipo??0}const a=Ve(()=>i(1)),o=Ve(()=>i(2)),r=Ve(()=>i(3));function l(U,T=0,A=3,F=0,j=A){const Y=i(U),ce=s(U);let ae=0;return ce===1?ae=n.value.filter(Q=>t(Q.nodeId)===1).length:ce===2?ae=n.value.filter(Q=>t(Q.nodeId)===2).length:ce===3&&(ae=n.value.filter(Q=>t(Q.nodeId)===3).length),T+(Y*j+(ae+F)*A)}const c=Ve(()=>24-i(18)),u=Ve(()=>i(17)),d=Ve(()=>{const U=Math.ceil(e.value/5)*5,T=i(16);return U+T+r.value}),f=Ve(()=>i(12)),p=Ve(()=>l(7,10,2*e.value,1,3)),x=Ve(()=>l(4)),y=Ve(()=>l(5,3,1)),m=Ve(()=>l(6)),h=Ve(()=>l(8,2,1)),P=Ve(()=>l(9,12)),w=Ve(()=>l(10)),b=Ve(()=>l(11)),C=Ve(()=>l(14,10,2*e.value,1,3)),S=Ve(()=>l(13,1,1)),R=Ve(()=>({cuerpo:a.value,agilidad:o.value,mente:r.value,rangoCritico:c.value,habilidadesExtra:u.value,limiteHabilidad:d.value,acciones:f.value,reacciones:S.value,poderio:x.value,movimiento:y.value,resistencia:m.value,regeneracion:h.value,evasion:P.value,iniciativa:w.value,punteria:b.value,puntosHabilidad:C.value,hp:p.value}));return{cuerpo:a,agilidad:o,mente:r,rangoCritico:c,habilidadesExtra:u,limiteHabilidad:d,acciones:f,reacciones:S,poderio:x,movimiento:y,resistencia:m,regeneracion:h,evasion:P,iniciativa:w,punteria:b,puntosHabilidad:C,hp:p,attributes:R}}const Um=[{nombre:"Hijo de vecino",descripcion:"Has nacido en el seno de una familia de clase media, bien alimentado y con todas las necesidades básicas cubiertas. Puedes tener una mascota doméstica y/o puedes no tenerla. Tu infancia ha sido feliz, o no. No tienes ningún trauma, si no quieres.",atributos:[6,5],habilidades:["30","6","8","3","4","14"]},{nombre:"Noble",descripcion:"Ya sea en el imperio de Limsa Lomensa o de Lenam, has crecido en una familia acaudalada y llena de privilegios y responsabilidades. Posiblemente seas un antipático, racista y mimado como solo tu sabes.",atributos:[5,30],habilidades:["13","21","10","7","15","14"]},{nombre:"Desperado",descripcion:"Ya sea en las bulliciosas calles de Limsa Lomensa, los pulcros salones de las Catedrales de Lenam, las estepas rocosas o los desiertos abrasadores, el Desperado aguarda una distraccion para aprovechar su oportunidad y sacar provecho. Buscavidas de nacimiento, la vida no ha tratado bien al querido Desperado, acostumbrado a tener que tirar pa'lante. Se sabe desenvolver con improvisación y sutileza de las situaciones mas inverosímiles.",atributos:[7,12],habilidades:["12","16","3","7","17","18"]},{nombre:"Trotamundos itinerante y ambulante",descripcion:"No te sabes estar quieto y has viajado por gran parte del mundo conocido. Sabes tratar a la gente según tus intereses y conoces canciones de todas partes y has escuchado muchas historias que se ganarían una ronda de cerveza.",atributos:[6,10],habilidades:["30","5","8 ","9","14","31"]},{nombre:"Hijo de la mar",descripcion:"Tu vida ha sido una aventura. Has nacido en un barco y seguramente esperes morir en uno. Te han enseñado las leyes del océano y lo respetas como es debido. Has aprendido a navegar y has visto muchos puertos.",atributos:[19,15],habilidades:["2","8","1 ","9","17","6"]},{nombre:"Feligrés",descripcion:"Tu vida ha estado marcada por la fe y la devoción. Has crecido en un entorno religioso y has aprendido a seguir las enseñanzas de tu fe. Tu vida gira en torno a la comunidad y a los rituales que la acompañan.",atributos:[15,30],habilidades:["12","7","10","4","14","8"]},{nombre:"Huérfano de Lenam",descripcion:"Has tenido suerte al haber crecido en el Imperio de Lenam siendo huérfano, pues en el resto del mundo te hubieras tenido q apañar sin ayuda alguna. Se te acogió en un orfanato de los Caballeros del Silencio, en el que te educaron y pasaste diferentes pruebas para llegar a formar parte de la orden. Habiendo fracasado en las pruebas para formar parte de la organización de los Caballeros del Silencio, un huérfano en el reino de Lenam está obligado a contribuir a la sociedad. Entrando como aprendiz de algún oficio artesano o en alguna cadena de producción.",atributos:[6,18],habilidades:["12","7","10","4","14","8"]},{nombre:"Feligrés del Molino",descripcion:"Una nueva religión en auge en la que rinden culto y pleitesía en demasía al movimiento de las aspas de El Molino. Se suelen congregar en campos de conreo lejos de las grandes urbes urbanas.",atributos:[6,15],habilidades:["12","16","3","17","13","19"]},{nombre:"Monaguillo de la Cofradía de Bharak",descripcion:"La congregación religiosa mas importante de Limsa Lomensa, tienen mucha influéncia política, al nivel de que sin ellos el imperio de Mudab Il Nam no habría podido desarrollarse. Tienen conocimientos muy antiguos y valiosos que se remontan a centenares de años. Muchos eruditos y líderes buscan pasar años estudiando en las bibliotecas de sus templos. Guardan muchos secretos y tienen su propia Orden Militar. Los maestros de armas son integrantes en su mayoría de dicha organización.",atributos:[10,16],habilidades:["5","7","31","15","31","19"]},{nombre:"Agojé",descripcion:"Entrenamiento militar obligatorio que los ciudadanos que viven en Lenam deben realizar. En tiempos de guerra, la población debe realizar otro entrenamiento cada año. Los ciudadanos que completan el entrenamiento reciben la oferta de formar parte de la Armatha, el ejercito del imperio. En caso de no querer formar parte de la Armatha, un ciudadano puede reanudar sus actividades previas, pero recibe un permiso a modo de pasaporte que debe llevar siempre encima para poder ser identificado, esto no se suele cumplir por la mayoría, aunque perderlo conlleva un castigo grave en el que se extirpa una oreja. En la ciudad-capital son muy estrictos con esto, pero en las otras regiones del imperio son mas laxos con la vigilancia.",atributos:[18,5],habilidades:["1","2","15","30","9","7"]},{nombre:"Protegido de la espina mortecina",descripcion:"Miembro de una organización anárquica que quiere ver en llamas la forma de gobierno de Lenam. Viven en las sombras de los lugares mas recónditos del reino y aguardan su venganza. De cara al mundo, son una organización privada de servicios. Suelen ser contratados para vigilar, escoltar, secuestrar y matar. Pero son muy caros comparados con otras organizaciones, aunque estos son letales y tienen la fama de jamás fracasar en sus misiones. Se dice por las tabernas y los barracones que un asesino de la espina mortecina equivale a veinte asesinos al uso.",atributos:[4,12],habilidades:["18","16","3","8","13","19"]},{nombre:"Hijo de lo desconocido",descripcion:"Eres el descendiente de un gran explorador, investigador o cazador. Has crecido en Libertha, una ciudad que se ha ido desarrollando en las últimas décadas. Sus líderes son un poderoso gremio de cazadores que organizan grandes búsquedas y expediciones en las zonas más inhóspitas y peligrosas que se conocen. Abanderado por los logros de tus descendientes, siempre has tenido sed de aventuras y grandes descubrimientos, Libertha, aunque no es de los lugares más seguros para vivir, es en el q te ha tocado crecer y ahora tienes los medios para salir y descubrir que te deparará tu destino.",atributos:[6,15],habilidades:["30","9","6","8","4","6"]},{nombre:"Tecnomante de Valanil",descripcion:"La República de Valanil se ha mantenido distante de los conflictos del exterior hasta hace unas décadas. De mentalidad curiosa, expandieron recientemente sus fronteras para conquistar las costas del vasto continente de Ardar. Han formado un pequeño territorio en las estepas rocosas del continente y este, aunque salvaje y brutal, ha cedido ante los ingenios mecánicos y especiales que esta república posee. Ahora el territorio es el centro del comercio con las diferentes civilizaciones autóctonas y están construyendo grandes proyectos arquitectónicos para evitar las constantes incursiones de la vida salvaje de los alrededores.",atributos:[12,16],habilidades:["8","17","6","2","13","19"]}],Pr={trasfondos:Um},uo="character-in-creation";function Pi(){const{addCharacter:n,getCharacter:e}=Dm(),t=Tt({nombre:"",nivel:1,oficio:"",oficio_habilidades:[],oficio_dotes:[],estilo_marcial:"",estilo_marcial_dotes:[],trasfondo:"",trasfondo_habilidades:[],raza:"",arbol:"",habilidades:"",armas:[],armaduras:[],atributos:{cuerpo:0,agilidad:0,mente:0,rangoCritico:0,habilidadesExtra:0,limiteHabilidad:0,acciones:0,reacciones:0,poderio:0,movimiento:3,resistencia:0,regeneracion:2,evasion:12,iniciativa:0,punteria:0,puntosHabilidad:10,hp:10}});function i(){let r=e(uo);return r||(n(uo,""),r=e(uo)),r}function s(){const r=i();r&&(t.value.nombre=r.name||"",t.value.nivel=r.nivel||1,t.value.oficio=r.oficio||"",t.value.oficio_habilidades=r.oficio_habilidades||[],t.value.oficio_dotes=r.oficio_dotes||[],t.value.estilo_marcial=r.estilo_marcial||"",t.value.estilo_marcial_dotes=r.estilo_marcial_dotes||[],t.value.trasfondo=r.trasfondo||"",t.value.trasfondo_habilidades=r.trasfondo_habilidades||[],t.value.raza=r.raza||"",t.value.arbol=r.arbol||"",t.value.habilidades=r.habilidades||"",t.value.armas=r.armas||[],t.value.armaduras=r.armaduras||[],t.value.atributos=r.atributos||{cuerpo:0,agilidad:0,mente:0,rangoCritico:24,habilidadesExtra:0,limiteHabilidad:5,acciones:0,reacciones:0,poderio:0,movimiento:3,resistencia:0,regeneracion:2,evasion:12,iniciativa:0,punteria:0,puntosHabilidad:10,hp:10}),o()}function a(){const r=i();r&&(r.name=t.value.nombre,r.nivel=t.value.nivel,r.oficio=t.value.oficio,r.oficio_habilidades=t.value.oficio_habilidades,r.oficio_dotes=t.value.oficio_dotes,r.estilo_marcial=t.value.estilo_marcial,r.estilo_marcial_dotes=t.value.estilo_marcial_dotes,r.trasfondo=t.value.trasfondo,r.trasfondo_habilidades=t.value.trasfondo_habilidades,r.raza=t.value.raza,r.arbol=t.value.arbol,r.habilidades=t.value.habilidades,r.armas=t.value.armas,r.armaduras=t.value.armaduras,r.atributos=t.value.atributos)}function o(){try{let r=t.value.arbol?JSON.parse(t.value.arbol):[];if(t.value.trasfondo){const d=Pr.trasfondos.find(f=>f.nombre===t.value.trasfondo);d&&d.atributos&&d.atributos.forEach(f=>{r.find(p=>p.nodeId===f)||r.push({nodeId:f,skillName:"",type:"circle",layer:0,index:0,description:"",isTrasfondo:!0})})}const l=Ve(()=>r),c=Ve(()=>t.value.nivel),{attributes:u}=bf(l,c);t.value.atributos={...u.value}}catch(r){console.error("Error recalculando atributos:",r)}}return at(()=>t.value.nombre,()=>a()),at(()=>t.value.nivel,()=>{o(),a()}),at(()=>t.value.oficio,()=>a()),at(()=>t.value.oficio_habilidades,()=>a(),{deep:!0}),at(()=>t.value.oficio_dotes,()=>a(),{deep:!0}),at(()=>t.value.estilo_marcial,()=>a()),at(()=>t.value.estilo_marcial_dotes,()=>a(),{deep:!0}),at(()=>t.value.trasfondo,()=>{o(),a()}),at(()=>t.value.trasfondo_habilidades,()=>a(),{deep:!0}),at(()=>t.value.raza,()=>a()),at(()=>t.value.arbol,()=>{o(),a()}),at(()=>t.value.armas,()=>a(),{deep:!0}),at(()=>t.value.armaduras,()=>a(),{deep:!0}),at(()=>t.value.atributos,()=>a(),{deep:!0}),{characterData:t,getCurrentCharacter:i,loadCharacterData:s,saveCharacterData:a,recalcularAtributos:o}}const Nm=Ji({__name:"general",setup(n){const{characterData:e,loadCharacterData:t}=Pi();return Wn(()=>{t()}),(i,s)=>(ge(),_e(Qe,null,[_("div",null,[s[2]||(s[2]=_("label",{class:"block text-sm font-semibold text-gray-700 mb-2"}," Nombre del Personaje ",-1)),mn(_("input",{type:"text","onUpdate:modelValue":s[0]||(s[0]=a=>lt(e).nombre=a),class:"w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-500 transition-colors",placeholder:"Introduce el nombre..."},null,512),[[_i,lt(e).nombre]])]),_("div",null,[s[3]||(s[3]=_("label",{class:"block text-sm font-semibold text-gray-700 mb-2"}," Nivel ",-1)),mn(_("input",{type:"number",min:"1",max:"20","onUpdate:modelValue":s[1]||(s[1]=a=>lt(e).nivel=a),class:"w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-gray-500 transition-colors"},null,512),[[_i,lt(e).nivel]])])],64))}}),Fm=[{id:1,nombre:"Atletismo",descripcion:"Habilidad física que abarca correr, saltar, escalar y nadar.",atributo:"Cuerpo"},{id:2,nombre:"Nadar",descripcion:"Capacidad para moverse y mantenerse a flote en el agua.",atributo:"Cuerpo"},{id:3,nombre:"Percepción",descripcion:"Habilidad para notar detalles y cambios en el entorno.",atributo:"Cuerpo"},{id:4,nombre:"Medicina",descripcion:"Conocimiento y habilidades para tratar heridas y enfermedades.",atributo:"Mente"},{id:5,nombre:"Geografía",descripcion:"Conocimiento y habilidades para entender y analizar el entorno físico y humano.",atributo:"Mente"},{id:6,nombre:"Tasación",descripcion:"Habilidad para evaluar el valor de objetos, bienes y propiedades.",atributo:"Mente"},{id:7,nombre:"Historia",descripcion:"Conocimiento y habilidades para entender y analizar eventos pasados.",atributo:"Mente"},{id:8,nombre:"Investigación",descripcion:"Habilidad para buscar, recopilar y analizar información de diversas fuentes.",atributo:"Mente"},{id:8,nombre:"Orientación",descripcion:"Conocimiento y habilidades para encontrar el camino y ubicarse en diferentes entornos.",atributo:"Mente"},{id:9,nombre:"Supervivencia",descripcion:"Conocimiento y habilidades para sobrevivir en entornos hostiles.",atributo:"Mente"},{id:10,nombre:"Persuasión",descripcion:"Conocimiento y habilidades para influir en las decisiones y acciones de otros.",atributo:"Mente"},{id:11,nombre:"Intimidar",descripcion:"Habilidad para provocar miedo a otros.",atributo:"Mente"},{id:12,nombre:"Embaucar",descripcion:"Conocimiento y habilidades para engañar o manipular a otros.",atributo:"Mente"},{id:13,nombre:"Averiguar intenciones",descripcion:"Conocimiento y habilidades para entender las motivaciones y deseos de otros.",atributo:"Mente"},{id:14,nombre:"Performance",descripcion:"Conocimiento y habilidades para actuar, cantar o entretener a una audiencia.",atributo:"Mente"},{id:15,nombre:"Antropología/Politica",descripcion:"Conocimiento y habilidades para entender las culturas, sociedades y sistemas políticos.",atributo:"Mente"},{id:16,nombre:"Sigilo",descripcion:"Conocimiento y habilidades para moverse sin ser detectado.",atributo:"Agilidad"},{id:17,nombre:"Juego de manos",descripcion:"Conocimiento y habilidades para realizar trucos y movimientos rápidos con las manos.",atributo:"Agilidad"},{id:18,nombre:"Acrobacias",descripcion:"Conocimiento y habilidades para realizar trucos y movimientos acrobáticos.",atributo:"Agilidad"},{id:19,nombre:"Sabotaje",descripcion:"Habilidad para dañar, destruir o interferir con equipos, maquinaria o sistemas.",atributo:"Agilidad"},{id:20,nombre:"Montar",descripcion:"Habilidad para montar y manejar animales de monta.",atributo:"Agilidad"},{id:21,nombre:"Alquimia",descripcion:"Habilidad para crear pociones y elixires a partir de ingredientes naturales.",atributo:"Artesania"},{id:22,nombre:"Armería",descripcion:"Habilidad para crear, reparar y mantener armas y armaduras.",atributo:"Artesania"},{id:23,nombre:"Ingenios",descripcion:"Habilidad para crear dispositivos y mecanismos ingeniosos.",atributo:"Artesania"},{id:24,nombre:"Artes",descripcion:"Habilidad para crear obras de arte, como pintura, escultura o música.",atributo:"Artesania"},{id:25,nombre:"Grandes Proyectos",descripcion:"Habilidad para trabajar en proyectos de gran envergadura y coordinar equipos.",atributo:"Artesania"},{id:26,nombre:"Herboristeria",descripcion:"Habilidad para recolectar y utilizar plantas con fines medicinales.",atributo:"Recoleccion"},{id:27,nombre:"Mineria",descripcion:"Habilidad para extraer recursos minerales y gemas del subsuelo.",atributo:"Recoleccion"},{id:28,nombre:"Carniceria",descripcion:"Habilidad para recolectar y procesar cualquier tipo de recursos obtenidos de animales.",atributo:"Recoleccion"},{id:29,nombre:"Información",descripcion:"Habilidad para recolectar y procesar información de diversas fuentes.",atributo:"Recoleccion"},{id:30,nombre:"Aguante",descripcion:"Habilidad para resistir el esfuerzo físico y recuperarse rápidamente.",atributo:"Cuerpo"},{id:31,nombre:"Naturaleza",descripcion:"Habilidad para comprender y relacionarse con el entorno natural.",atributo:"Mente"}],Xr={habilidades:Fm},Om=[{id:1,nombre:"Carga",diminutivo:"CAR",descripcion:"Ataque a distancia, gastas 2 acciones en correr + Ataque",atributo:"Cuerpo",esMental:!1},{id:2,nombre:"Tensión",diminutivo:"TEN",descripcion:"(Reacción) +3 a Resistencia",atributo:"Cuerpo",esMental:!1},{id:3,nombre:"Adrenalina",diminutivo:"ADR",descripcion:"(Mental) +1 Cuerpo hasta próximo turno, una vez por combate.",atributo:"Cuerpo",esMental:!0},{id:4,nombre:"Interceptar",diminutivo:"INTER",descripcion:"(Reacción) A una criatura adyacente puedes recibir el daño de tu compañero pusilánime.",atributo:"Cuerpo",esMental:!1},{id:5,nombre:"Heal",diminutivo:"HEAL",descripcion:"(Mental) Te curas 12HP",atributo:"Cuerpo",esMental:!0},{id:6,nombre:"Ataque pesado",diminutivo:"AP",descripcion:"Esta activa no se puede usar con un arma de categoria Ligera. El personaje usa dos acciones para realizar un ataque pesado, duplicando el daño normal del ataque. En el caso de que el arma usada sea de categoria Pesada, se usaran 3 acciones en vez de dos y el daño se triplicará.",atributo:"Cuerpo",esMental:!1},{id:7,nombre:"Apuntar",diminutivo:"APU",descripcion:"(Mental) 2 Acciones sumar Deadeye ToHit (Concentración)",atributo:"Agilidad",esMental:!0},{id:8,nombre:"Parry",diminutivo:"PARR",descripcion:"(Reacción) Suma tu nivel a tu Esquiva contra ese ataque específico.",atributo:"Agilidad",esMental:!1},{id:9,nombre:"Ataque de oportunidad",diminutivo:"OPO",descripcion:"(Reacción) Si alguien entra o sale en tu rango de ataque le puedes atacar a cuerpo a cuerpo",atributo:"Agilidad",esMental:!1},{id:10,nombre:"Contraataque",diminutivo:"COUN",descripcion:"(Reacción) Puedes atacar si te atacan",atributo:"Agilidad",esMental:!1},{id:11,nombre:"Procesar",diminutivo:"PROC",descripcion:"Permite realizar acciones mentales que de normal costarían 1 accion son gratuitas.",atributo:"Mente",esMental:!0},{id:12,nombre:"Instruir",diminutivo:"INST",descripcion:"Gastas 1 accion para darle ventaja 1 a un aliado.",atributo:"Mente",esMental:!0}],qi={activas:Om},Bm=["value"],zm={key:0,style:{"margin-top":"8px"}},Hm={key:0,class:"bg-blue-50 border-2 border-blue-200 rounded-lg p-6 space-y-6"},Vm={class:"text-xl font-bold text-blue-700 mb-3"},km={class:"text-blue-600 leading-relaxed"},Gm={class:"flex gap-3"},qm={class:"text-2xl font-bold text-blue-600"},Wm={key:0,class:"mt-4 p-4 bg-white border-2 border-blue-200 rounded-lg"},jm={class:"grid grid-cols-3 gap-2 text-sm"},$m={class:"text-blue-600"},Xm={class:"text-blue-600"},Ym={class:"text-blue-600"},Km={class:"text-blue-600"},Zm={class:"text-blue-600"},Jm={class:"text-blue-600"},Qm={class:"grid grid-cols-1 md:grid-cols-2 gap-3"},eg=["onClick","disabled"],tg={class:"flex items-center gap-2"},ng={key:0,class:"text-blue-500 text-xs"},ig={class:"text-sm text-blue-600 mt-3"},sg=3,ag={__name:"trasfondo",setup(n){const{characterData:e,loadCharacterData:t}=Pi(),i=Tt(""),s=Ve(()=>{const u={};return Xr.habilidades.forEach(d=>{u[d.id.toString()]=d.nombre}),u}),a=Ve(()=>Pr.trasfondos.map(u=>({...u,habilidades:u.habilidades.map(d=>{const f=d.trim();return s.value[f]||`Habilidad ${f}`})}))),o=Tt([]),r=Ve(()=>(console.log("Trasfondo seleccionado:",i.value),a.value.find(u=>u.nombre===i.value)));function l(u){const d=Ts.arbol.nodos.find(f=>f.id===u);if(!d)return"Desconocido";if(d.shape==="circle"){const f=As.caracteristicasSecundarias.find(p=>p.id===parseInt(d.atributo));return f?f.nombre:"Desconocido"}else{const f=qi.activas.find(p=>p.id===parseInt(d.atributo));return f?f.nombre:"Desconocido"}}Wn(()=>{t(),i.value=e.value.trasfondo||"",o.value=e.value.trasfondo_habilidades||[]}),at(i,u=>{e.value.trasfondo=u}),at(o,u=>{e.value.trasfondo_habilidades=[...u]},{deep:!0}),at(r,(u,d)=>{d&&u?.nombre!==d?.nombre&&(o.value=[],e.value.trasfondo_habilidades=[])});function c(u){const d=o.value.indexOf(u);d!==-1?o.value.splice(d,1):o.value.length<sg&&o.value.push(u)}return(u,d)=>(ge(),_e(Qe,null,[_("div",null,[d[3]||(d[3]=_("label",{class:"block text-sm font-semibold text-blue-700 mb-2"}," Selecciona tu Trasfondo ",-1)),mn(_("select",{"onUpdate:modelValue":d[0]||(d[0]=f=>i.value=f),class:"w-full px-4 py-3 bg-blue-50 border-2 border-blue-200 rounded-lg text-blue-900"},[d[1]||(d[1]=_("option",{value:""},"Elige un trasfondo...",-1)),(ge(!0),_e(Qe,null,Mt(a.value,f=>(ge(),_e("option",{key:f.nombre,value:f.nombre},$(f.nombre),9,Bm))),128))],512),[[pc,i.value]]),i.value?(ge(),_e("p",zm,[d[2]||(d[2]=Gt(" Seleccionaste: ",-1)),_("strong",null,$(i.value),1)])):gt("",!0)]),r.value?(ge(),_e("div",Hm,[_("div",null,[_("h3",Vm,$(r.value.nombre),1),_("p",km,$(r.value.descripcion),1)]),_("div",null,[d[12]||(d[12]=_("h4",{class:"text-lg font-semibold text-blue-700 mb-3"}," Bonificaciones de Atributos ",-1)),_("div",Gm,[(ge(!0),_e(Qe,null,Mt(r.value.atributos,f=>(ge(),_e("div",{key:f,class:"flex-1 bg-white border-2 border-blue-300 rounded-lg p-4 text-center"},[_("div",qm,$(l(f)),1),d[4]||(d[4]=_("div",{class:"text-sm text-blue-500 font-medium"}," Nodo del árbol ",-1))]))),128))]),lt(e).atributos?(ge(),_e("div",Wm,[d[11]||(d[11]=_("h5",{class:"text-sm font-semibold text-blue-700 mb-2"},"Atributos actuales del personaje:",-1)),_("div",jm,[_("div",$m,[d[5]||(d[5]=_("span",{class:"font-semibold"},"Cuerpo:",-1)),Gt(" "+$(lt(e).atributos.cuerpo),1)]),_("div",Xm,[d[6]||(d[6]=_("span",{class:"font-semibold"},"Agilidad:",-1)),Gt(" "+$(lt(e).atributos.agilidad),1)]),_("div",Ym,[d[7]||(d[7]=_("span",{class:"font-semibold"},"Mente:",-1)),Gt(" "+$(lt(e).atributos.mente),1)]),_("div",Km,[d[8]||(d[8]=_("span",{class:"font-semibold"},"HP:",-1)),Gt(" "+$(lt(e).atributos.hp),1)]),_("div",Zm,[d[9]||(d[9]=_("span",{class:"font-semibold"},"Puntos Hab:",-1)),Gt(" "+$(lt(e).atributos.puntosHabilidad),1)]),_("div",Jm,[d[10]||(d[10]=_("span",{class:"font-semibold"},"Límite Hab:",-1)),Gt(" "+$(lt(e).atributos.limiteHabilidad),1)])])])):gt("",!0)]),_("div",null,[d[13]||(d[13]=_("h4",{class:"text-lg font-semibold text-blue-700 mb-3"}," Habilidades Disponibles (Elige 3) ",-1)),_("div",Qm,[(ge(!0),_e(Qe,null,Mt(r.value.habilidades,f=>(ge(),_e("button",{key:f,onClick:p=>c(f),class:Et(["text-left px-4 py-3 rounded-lg font-medium transition-all duration-200 border-2",o.value.includes(f)?"bg-blue-500 text-white border-blue-500 shadow-lg":"bg-white text-blue-700 border-blue-200 hover:border-blue-400 hover:bg-blue-50"]),disabled:!o.value.includes(f)&&o.value.length>=3},[_("span",tg,[_("span",{class:Et(["flex items-center justify-center w-5 h-5 rounded border-2 flex-shrink-0",o.value.includes(f)?"bg-white border-white":"bg-transparent border-blue-300"])},[o.value.includes(f)?(ge(),_e("span",ng,"✓")):gt("",!0)],2),Gt(" "+$(f),1)])],10,eg))),128))]),_("p",ig," Seleccionadas: "+$(o.value.length)+" / 3 ",1)])])):gt("",!0)],64))}},rg=JSON.parse('[{"id":1,"nombre":"Místic-o","descripcion":"Practicante de artes místicas y espirituales.","habilidades":[1,2,3],"dotes":[{"id":1,"nombre":"Eco de Corazones I","descripcion":"El mero hecho de rozar con tu tacto a una criatura u objeto te confiere información sobre su estado vital y su pureza: si son puros, neutrales o están corruptos. ","requisito_dote":""},{"id":2,"nombre":"Peregrinaje del Asceta","descripcion":"Durante un día de viaje de una Exploración, puedes decidir gastar todo tu tiempo libre en meditar. Si meditas de esta forma, puedes ignorar los requisitos de comida y bebida para ese día.","requisito_dote":""},{"id":3,"nombre":"Percepción extrasensorial I","descripcion":"Puedes percibir entornos cognitivos y te da la posibilidad de captarlos sabiendo si lo que hay es poderoso/peligroso/inofensivo. Anula todas las desventajas a tiradas de Percepción.","requisito_dote":""},{"id":4,"nombre":"Tarot","descripcion":"Una vez por sesión de juego, puedes leer las cartas de un aliado. Entonces, ese aliado realiza dos tiradas en la siguiente tabla. Los efectos de las cartas resultantes se aplican durante el resto del día.","requisito_dote":""},{"id":5,"nombre":"Sueño premonitorio","descripcion":"Una vez por día, a lo largo de una meditación o un sueño profundo, recibes imágenes crípticas de algo que puede suceder en un futuro próximo. El Maestro debe enunciar cómo de alejado en el tiempo parece este hecho, y si es un futuro incierto o si, por el contrario, se va a cumplir con casi toda seguridad.","requisito_dote":""},{"id":6,"nombre":"Incensario","descripcion":"Además de las Formas típicas que pueden tomar tus preparados de Alquimia, como píldoras, bebidas o gases, se añade la Forma de Incienso. Los preparados en forma de Incienso aplican su efecto en un círculo de tres espacios alrededor de la fuente y duran el mismo tiempo que los efectos de la poción o un minuto para los efectos instantáneos. Las criaturas que se mantengan en el área de efecto del incienso se verán afectadas por él, y dejarán de ser afectadas en el momento en el que abandonen el área. Si el incienso aplica efectos instantáneos, cada criatura sólo podrá beneficiarse una vez de este efecto por cada instancia de incienso.","requisito_dote":""},{"id":7,"nombre":"Ritual: Sombra Sosegante","descripcion":"Selecciona un objeto y realiza un ritual de diez minutos alrededor de él. Durante las próximas seis horas, la sombra que proyecte este objeto será una zona donde la temperatura no puede superar la Temperatura Ideal. Cada criatura que descanse durante al menos una hora debajo de esta sombra reducirá en 1 el Cansancio.","requisito_dote":""},{"id":8,"nombre":"Alma tenaz I","descripcion":"Tu Pureza puede alcanzar su valor en negativo sin sufrir ninguno de los efectos de la Corrupción. Tu Pureza mínima se convierte en el doble del valor de tu Pureza en negativo.","requisito_dote":""}]},{"id":2,"nombre":"Agente","descripcion":"La mayoría de gente caza animales. Tu cazas personas. Ya sea para capturar delincuentes, para matar a pobres desgraciados o para obtener información de personajes importantes, siempre sabes la forma mas eficaz de conseguirlo. Amigo de todo el mundo: Siempre sabes cómo conseguir información y como hablar con diferentes tipos de personas según te convengan para tus objetivos.","habilidades":[4,5,6],"dotes":[{"id":1,"nombre":"Red I","descripcion":"Tienes una red de contactos en varias ciudades que te pueden proporcionar información o servicios básicos. Puedes usar esta red para conseguir alojamiento, comida o información sobre sucesos recientes en la ciudad.","requisito_dote":""},{"id":2,"nombre":"Arte del disfraz I","descripcion":"Puedes alterar tu acento, manerismos y atuendo a voluntad si dedicas quince minutos a caracterizarte. Si bien el disfraz no es lo más convincente del mundo, es suficiente para engañar a cualquier persona que no tenga motivos para sospechar. Cuando estás caracterizado, puedes hacer creer a la gente que eres una persona cualquiera, posiblemente procedente de otro lugar; la tapadera no se sostiene ante escrutinio: una tirada exitosa de Averiguar intenciones contra tu Persuasión revelará que tu disfraz es una farsa.","requisito_dote":""},{"id":3,"nombre":"Arte del disfraz II","descripcion":"Puedes caracterizarte de otra persona en concreto, independientemente de su apariencia, estatura o género, siempre y cuando la conozcas a fondo. Sólo gente que sea íntima con la persona a la que estás tratando de suplantar se dará cuenta de que no está hablando con la persona original.","requisito_dote":"2"},{"id":4,"nombre":"Sombra I","descripcion":"Los bonificadores a tu Sigilo se doblan de cara a una persona que estés tratando de rastrear activamente.","requisito_dote":""},{"id":5,"nombre":"Ecos del pasado I","descripcion":"A través de rastros y evidencias circunstanciales, puedes imaginar como si estuvieses allí los últimos momentos de un lugar antes de que la última persona abandonase la zona. Si dedicas 15 minutos a investigar la zona, puedes reproducir en tu mente los últimos cinco minutos anteriores a que la última persona viviente se fuese.","requisito_dote":""},{"id":6,"nombre":"Criptografía","descripcion":"Sabes cómo escribir y descifrar mensajes cifrados. Para cifrar un mensaje, realiza una tirada de Información; el resultado de esta tirada determina la fortaleza del cifrado del mensaje. Si no conoces el cifrado utilizado por un mensaje que no es tuyo, puedes tratar de descifrarlo con ocho horas o el tiempo libre de un día de descanso o viaje: realiza una tirada a desventaja 1 contra la fortaleza del cifrado: en caso de éxito, logras descifrarlo, y si no, debes volver a gastar el mismo tiempo en tratar de descifrar el mensaje antes de repetir la tirada.","requisito_dote":""},{"id":7,"nombre":"Soy una caja","descripcion":"Camuflaje avanzado en formato caja. Ventaja 3 en ocultarse dentro de una caja, tarro, barril o similares. ","requisito_dote":""},{"id":8,"nombre":"Análisis forense","descripcion":"Tirada por medicina que te explica cuándo y cómo ha muerto alguien, y además, permite generar un perfil psicológico del asesino. 5 min o lo que tardes en expresar la deduccion a un público impresionable de tus cualidades intelectuales.","requisito_dote":""}]},{"id":3,"nombre":"Erudito","descripcion":"Dedicado a la preservación del conocimiento. Cada erudito tiene sus propios intereses pues la información es poder. Dependiendo de la orden u organización a la que dediques tus servicios estos, te van a dar búsquedas o misiones en las que tendrás que contribuir a su causa; tales como: buscar una reliquia perdida, llevar una pieza de suma importancia a un lugar seguro…","habilidades":[7,8,9,10,11,12],"dotes":[{"id":1,"nombre":"Cultura con fundamento","descripcion":"Al entrar en algun lugar civilizado, sabes localizar los principales lugares de interés gracias a tus vastos conocimientos, incluidos lugares donde conseguir tinta, papiros y otros utensilios de escriba. Además, (casi) siempre conoces información superficial sobre la historia y situación geopolítica del lugar.","requisito_dote":""},{"id":2,"nombre":"Toque curativo","descripcion":"Sabes cómo realizar primeros auxilios utilizando tan sólo el poder de tus manos. Poseer esta habilidad te permite realizar tiradas de Medicina como si siempre tuvieses un botiquín de Estrato 1 encima. Además, es imposible que falles las tiradas de Medicina realizadas durante un Descanso para curar a otras personas.","requisito_dote":""},{"id":3,"nombre":"Formación profusa","descripcion":"Conoces los secretos de un lenguaje antiguo a tu elección.","requisito_dote":""},{"id":4,"nombre":"Mayéutica","descripcion":"Cuando tratas de persuadir a alguien sobre un tema, puedes sustituir la tirada de Persuasión por el saber o habilidad relacionada con el tema en cuestión.","requisito_dote":""},{"id":5,"nombre":"Verdad absoluta","descripcion":"Si posees una Verdad sobre un tema, puedes convencer a alguien sobre esa Verdad sin necesidad de realizar tiradas de Persuasión.","requisito_dote":""},{"id":6,"nombre":"Clase magistral","descripcion":"Requisitos: tener el nodo de Instruir. Realizas una disertación sobre un tema en el que seas experto. Si tienes al menos un punto en una habilidad, puedes transmitir tus conocimientos a un número de personas igual o inferior a tu nivel de Erudito con una clase de una hora. La gente que haya prestado atención a tu clase puede sumar un punto de habilidad extra a esta habilidad, incluso si este punto fuese a pasar de su límite de habilidad. Cada persona sólo puede beneficiarse de una única instancia del efecto de Clase magistral a la vez.","requisito_dote":""},{"id":7,"nombre":"Aprendizaje apresurado","descripcion":"Si estudias durante 15 minutos al día, puedes aprender una habilidad no clásea a tu elección de la que no seas competente. Cuenta como si tuvieras un punto en la habilidad. Este efecto dura hasta el final del día.","requisito_dote":""},{"id":8,"nombre":"Saber de mucho","descripcion":"Sabes leer y escribir a la perfección, a parte sabes los lenguajes principales de Lenam y de Tharrashmir. Bonos en aprender habilidades si te dedicas a ello, aprendes el doble de rápido y puedes ponerte rangos en habilidades nuevas que hayas te dedicado a aprender durante 2 semanas y hayas conseguido los pertinentes libros u objetos que propicien dicha cosa.","requisito_dote":""},{"id":9,"nombre":"Conocimiento arqueológico avanzado","descripcion":"Puedes localizar reliquias del pasado así como grandes hallazgos de la civilización. Requieres de diferentes categorías según lo distante i/o ignoto a encontrar.","requisito_dote":""},{"id":10,"nombre":"Verborrea","descripcion":"Puedes distraer a un número de personas inferior o igual a tu nivel de Erudito durante un máximo de diez minutos. Sólo puedes distraer a una persona con el uso de Verborrea un máximo de una vez al día.","requisito_dote":""}]},{"id":4,"nombre":"Monster Hunter","descripcion":"Acostumbrado a ser el depredador, has consagrado tu vida al noble arte de la caza ya sea por el romanticismo de perseguir a tu presa durante días para luego asestarle un único golpe certero, como para unirte a otros cazadores y atrapar una pieza mayor. Puedes formar parte de una Gran Cacería, grupos de cazadores a sueldo que se dedican a asegurar las tierras de una población o un noble. O bien puedes trabajar en solitario cogiendo encargos mas accesibles para un único depredador.","habilidades":[13,14,15,16,17,18],"dotes":[{"id":1,"nombre":"Domar bestia","descripcion":"Puedes instruir durante 1 día un animal salvaje de tamaño pequeño y domesticarlo. Con 1 semana, el animal te tiene confianza plena y desbloqueas habilidades y ordenes que puedes usar con ella.","requisito_dote":""},{"id":2,"nombre":"Empatía animal","descripcion":"Entiendes las intenciones de los animales y otras bestias. Sabes el estado anímico con sólo un vistazo, discierniendo si es agresivo o es manso. Si puede domesticarse o es un esfuerzo inútil.","requisito_dote":""},{"id":3,"nombre":"Despiezar","descripcion":"Permite realizar una segunda tirada de recolección hacia una bestia o cadáver de bestia. Si aciertas, obtienes materiales otra vez, y en mejor estado.","requisito_dote":""},{"id":4,"nombre":"Furtivo","descripcion":"Siempre conoces un Rumor de cada tipo de bestia conocida por el hombre. Además, en función de los Datos que tengas sobre un tipo de criatura o criatura específica, puedes saber con más o menos certeza la localización de su hábitat actual.","requisito_dote":""},{"id":5,"nombre":"Acechador sombrío","descripcion":"Requisitos: kit de camuflaje o un entorno recargado. Usas elementos de tu alrededor para mimetizarte con éste. Tardas 10 segundos en camuflarte por completo. Mientras te concentres y no te mueves un ápice, eliminas tu presencia en el ambiente y obtienes camuflaje superior, que permite mimetizarte con el entorno y ser indetectable a menos que usen herramientas o habilidades en específico para ello. Puedes mantener el camuflaje durante máximo un minuto.","requisito_dote":""},{"id":6,"nombre":"Hora de la cacería","descripcion":"Requisito: herir a una bestia, o ver cómo alguien ha herido a una bestia. Conoces la posición exacta de cualquier criatura que haya sido herida por ti o tus aliados, en un máximo de un radio a 500 metros. Si se aleja más de 500 metros, pierdes el rastro.","requisito_dote":""},{"id":7,"nombre":"Diario del cazador","descripcion":"Almacenas información sobre los monstruos que aniquiles o estudies durante al menos una hora, adquiriendo ventajas tanto en conocimientos como en combate con estos. Además, puedes convertir tres Datos de la misma calidad sobre una criatura determinada en un Dato de la siguiente calidad. En función a la calidad de los Datos que poseas sobre una criatura en concreto, puedes obtener información específica.","requisito_dote":""},{"id":8,"nombre":"Tendón de piedra","descripcion":"Resistencia a toxinas, recibes la mitad del daño de los venenos de la flora y la fauna. Al estar expuesto a los mismos venenos en un período de 1 semana, adquieres cada vez mas resistencias a estos y acabas siendo inmune a dichas toxinas específicas. Requiere que hayas estado expuesto a sus toxinas diariamente en el período de 1 semana. Funciona por Instancias traducidas en pulls de tiradas a superar.","requisito_dote":""},{"id":9,"nombre":"Nuez Emboscada","descripcion":"Tienes Ventaja 1 en las tiradas de sigilo frente a una presa que hayas localizado, si superas, puedes deducir sus patrones de movimiento y saber donde estará a 1min vista.","requisito_dote":""}]},{"id":5,"nombre":"Pionero","descripcion":"Explorador experto en recorrer tierras inexploradas y sobrevivir en los entornos más hostiles. Conocedor de los secretos de la naturaleza y capaz de guiar a otros a través de los peligros del mundo salvaje.","habilidades":[19,20,21,22,23,24],"dotes":[{"id":1,"nombre":"Viaje rápido","descripcion":"Reduce en 1 dia el tiempo que se tarda en atravesar casillas que no sean de camino.","requisito_dote":""},{"id":2,"nombre":"Hallar el camino","descripcion":"Sabes orientarte por los vientos, la vegetación, y los astros. Siempre que no tengas un elemento que perturbe gravementre los sentidos, sabes dónde está el norte.","requisito_dote":""},{"id":3,"nombre":"Bienvenido, Mr. Marshal","descripcion":"Al encontrar un Refugio en el que pasar el mal tiempo, aumentas su calidad en 1. Además, puedes encontrar recursos naturales cercanos como agua o comida. Puedes utilizar esa comida y bebida en lugar de las raciones de tu exploración. Si tomas un Descanso en este refugio: el refugio tiene un nivel de Comfort de Estrato 2, y obtienes un nivel de comida de Estrato 1.","requisito_dote":""},{"id":4,"nombre":"Señor del Tiempo","descripcion":"Al observar el entorno durante 1 min, puedes recabar Información que determina los accidentes meteorológicos principales que pueden darse con más antelación. Tu distancia de visión de temporales aumenta en una elevación. Puedes identificar posibles refugios naturales a 1 hexagono de distancia y determinar de antemano la calidad de refugio que van a ser.","requisito_dote":""},{"id":5,"nombre":"Capear el Temporal","descripcion":"Hay eventos climatológicos muy intempestivos y espontáneos. El explorador sabe como protegerse de dichas catástrofes. Puedes construir un refugio improvisado en 15 min para dichas situaciones. Cuenta como refugio de calidad 1 y dependiendo del material usado puede contrarrestar distintos efectos activos.","requisito_dote":""}]}]'),xf={oficios:rg},og=["value"],lg={key:0,style:{"margin-top":"8px"}},cg={key:0,class:"space-y-8"},dg={class:"bg-blue-50 border-2 border-blue-200 rounded-lg p-6"},ug={class:"text-xl font-bold text-blue-700 mb-3"},fg={class:"text-blue-600 leading-relaxed"},hg={class:"bg-blue-50 border-2 border-blue-200 rounded-lg p-6"},pg={class:"text-lg font-semibold text-blue-700 mb-3"},mg={class:"grid grid-cols-1 md:grid-cols-2 gap-3"},gg=["onClick","disabled"],_g={class:"flex items-center gap-2"},vg={key:0,class:"text-blue-500 text-xs"},bg={class:"text-sm text-blue-600 mt-3"},xg={class:"bg-blue-50 border-2 border-blue-200 rounded-lg p-6"},yg={class:"text-lg font-semibold text-blue-700 mb-4"},Sg={class:"text-sm text-blue-600 mb-6"},Mg={class:"space-y-6"},Eg={class:"text-md font-semibold text-blue-700 uppercase tracking-wide border-b border-blue-300 pb-2"},Tg={class:"space-y-3"},Ag={key:0,class:"flex items-start mb-2"},wg={class:"text-xs text-blue-500 italic"},Cg=["onClick","disabled"],Rg={class:"flex items-start gap-3"},Pg={key:0,class:"text-blue-500 text-xs"},Dg={class:"flex-1"},Ig={class:"font-semibold mb-1"},Lg={__name:"oficio",setup(n){const{characterData:e,loadCharacterData:t,saveCharacterData:i}=Pi(),s=Tt(""),a=Tt([]),o=Tt([]),r=Tt(!1),l=Tt(!0),c=Ve(()=>{const S={};return Xr.habilidades.forEach(R=>{S[R.id]=R.nombre}),S}),u=Ve(()=>xf.oficios.map(S=>({...S,habilidadesNombres:S.habilidades.map(R=>c.value[R]||`Habilidad ${R}`),numHabilidades:S.habilidades.length,numDotes:e.value.nivel||1,gruposDotes:d(S.dotes)})));function d(S){const R=[];return S.filter(U=>!U.requisito_dote||U.requisito_dote===""),S.filter(U=>U.requisito_dote&&U.requisito_dote!==""),S.length>0&&R.push({categoria:"Dotes de Clase",dotes:S.map(U=>({...U,requiere:U.requisito_dote?parseInt(U.requisito_dote):null}))}),R}const f=Ve(()=>u.value.find(S=>S.nombre===s.value)),p=Ve(()=>new Set(a.value)),x=Ve(()=>new Set(o.value));Wn(async()=>{l.value=!0,await t(),s.value=e.value.oficio||"",o.value=[...e.value.oficio_habilidades||[]],a.value=[...e.value.oficio_dotes||[]],r.value=!0,console.log("Cargado oficio:",s.value),console.log("Cargado habilidades:",o.value),console.log("Cargado dotes:",a.value),await wa(),l.value=!1}),at(s,(S,R)=>{l.value||(e.value.oficio=S,R&&R!==S&&(o.value=[],a.value=[],e.value.oficio_habilidades=[],e.value.oficio_dotes=[]),i(),console.log("Guardado oficio:",S))}),at(o,S=>{l.value||(e.value.oficio_habilidades=[...S],i(),console.log("Guardado habilidades:",S))},{deep:!0}),at(a,S=>{l.value||(e.value.oficio_dotes=[...S],i(),console.log("Guardado dotes:",S))},{deep:!0});function y(S){return x.value.has(S)}function m(S){return p.value.has(S)}function h(S){const R=o.value.indexOf(S);R!==-1?o.value.splice(R,1):f.value&&o.value.length<f.value.numHabilidades&&o.value.push(S)}function P(S){const R=a.value.indexOf(S.id);R!==-1?(a.value.splice(R,1),C(S)):f.value&&a.value.length<f.value.numDotes&&a.value.push(S.id)}function w(S){return S.requiere?a.value.includes(S.requiere):!0}function b(S){if(!f.value)return S;for(const R of f.value.gruposDotes)for(const U of R.dotes)if(U.id===S)return U.nombre;return`Dote ${S}`}function C(S){f.value&&f.value.gruposDotes.forEach(R=>{R.dotes.forEach(U=>{if(U.requiere===S.id){const T=a.value.indexOf(U.id);T!==-1&&(a.value.splice(T,1),C(U))}})})}return(S,R)=>(ge(),_e(Qe,null,[_("div",null,[R[2]||(R[2]=_("label",{class:"block text-sm font-semibold text-blue-700 mb-2"}," Selecciona tu Oficio ",-1)),mn(_("select",{"onUpdate:modelValue":R[0]||(R[0]=U=>s.value=U),class:"w-full px-4 py-3 bg-blue-50 border-2 border-blue-200 rounded-lg text-blue-900"},[R[1]||(R[1]=_("option",{value:""},"Elige un oficio...",-1)),(ge(!0),_e(Qe,null,Mt(u.value,U=>(ge(),_e("option",{key:U.id,value:U.nombre},$(U.nombre),9,og))),128))],512),[[pc,s.value]]),s.value?(ge(),_e("p",lg)):gt("",!0)]),f.value&&r.value?(ge(),_e("div",cg,[_("div",dg,[_("h3",ug,$(f.value.nombre),1),_("p",fg,$(f.value.descripcion),1)]),_("div",hg,[_("h4",pg," Habilidades de Clase (Elige "+$(f.value.numHabilidades)+") ",1),_("div",mg,[(ge(!0),_e(Qe,null,Mt(f.value.habilidadesNombres,U=>(ge(),_e("button",{key:U,onClick:T=>h(U),class:Et(["text-left px-4 py-3 rounded-lg font-medium transition-all duration-200 border-2",y(U)?"bg-blue-500 text-white border-blue-500 shadow-lg":"bg-white text-blue-700 border-blue-200 hover:border-blue-400 hover:bg-blue-50"]),disabled:!y(U)&&o.value.length>=f.value.numHabilidades},[_("span",_g,[_("span",{class:Et(["flex items-center justify-center w-5 h-5 rounded border-2 flex-shrink-0",y(U)?"bg-white border-white":"bg-transparent border-blue-300"])},[y(U)?(ge(),_e("span",vg,"✓")):gt("",!0)],2),Gt(" "+$(U),1)])],10,gg))),128))]),_("p",bg," Seleccionadas: "+$(o.value.length)+" / "+$(f.value.numHabilidades),1)]),_("div",xg,[_("h4",yg," Dotes de Clase (1 por nivel - Nivel "+$(lt(e).nivel)+") ",1),_("p",Sg," Seleccionadas: "+$(a.value.length)+" / "+$(f.value.numDotes),1),_("div",Mg,[(ge(!0),_e(Qe,null,Mt(f.value.gruposDotes,U=>(ge(),_e("div",{key:U.categoria,class:"space-y-4"},[_("h5",Eg,$(U.categoria),1),_("div",Tg,[(ge(!0),_e(Qe,null,Mt(U.dotes,T=>(ge(),_e("div",{key:T.id,class:"ml-0"},[T.requiere?(ge(),_e("div",Ag,[R[3]||(R[3]=_("div",{class:"w-8 border-l-2 border-blue-300 h-4 border-b-2 rounded-bl-lg mr-2"},null,-1)),_("span",wg,"Requiere: "+$(b(T.requiere)),1)])):gt("",!0),_("button",{onClick:A=>P(T),disabled:!m(T.id)&&a.value.length>=f.value.numDotes||!w(T),class:Et(["w-full text-left p-4 rounded-lg transition-all duration-200 border-2",m(T.id)?"bg-blue-500 text-white border-blue-500 shadow-lg":w(T)?"bg-white text-blue-700 border-blue-200 hover:border-blue-400 hover:shadow-md":"bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-50",T.requiere?"ml-8":""])},[_("div",Rg,[_("span",{class:Et(["flex items-center justify-center w-5 h-5 rounded border-2 flex-shrink-0 mt-0.5",m(T.id)?"bg-white border-white":"bg-transparent border-blue-300"])},[m(T.id)?(ge(),_e("span",Pg,"✓")):gt("",!0)],2),_("div",Dg,[_("div",Ig,$(T.nombre),1),_("p",{class:Et(["text-sm",m(T.id)?"text-blue-100":"text-blue-600"])},$(T.descripcion),3)])])],10,Cg)]))),128))])]))),128))])])])):gt("",!0)],64))}},Ug=JSON.parse('[{"nombre":"Armatha","descripcion":"El estilo de combate propio de Lenam. Simple y directo, sin florituras. Especialidad en combate con escudos y combate grupal.","dotes":[{"id":1,"nombre":"Falange I","descripcion":"Al realizar la acción de carga, los aliados que estén adyacentes a ti cargaran contigo en tu misma dirección, realizando todos ellos 1 acción de carga.","requisito_dote":"","activa":"1","categoria":""},{"id":2,"nombre":"Falange II","descripcion":"Si algun aliado cargando tiene menos movimiento que tu le otorgas tu movimiento","requisito_dote":"1","activa":"1","categoria":""},{"id":3,"nombre":"Falange III","descripcion":"Aumenta el radio a 4 casillas de distancia.","requisito_dote":"2","activa":"1","categoria":""},{"id":4,"nombre":"Falange IV","descripcion":"Duplicas el movimiento de todos los aliados y tu mismo. El radio de efecto de la carga aumenta hasta tu distancia de grito. ","requisito_dote":"3","activa":"1","categoria":""},{"id":5,"nombre":"Tácticas de pelotón I","descripcion":"Duplica el efecto de las Formaciones durante 1 turno. Formaciones disponibles en un radio de 2 casillas por estrato: Testudos (resistencia al daño perforante y proyectiles +2 por estrato), Falange (daño DL +2 por tier), En línea (penetración DE +2 por tier), Abanderada (WL +2 por tier), En Blitz (Iniciativa +2 por tier).","requisito_dote":"","activa":"12","categoria":""},{"id":6,"nombre":"Tácticas de pelotón II","descripcion":"Duplica el efecto de las Formaciones a todos los aliados que estén afectados en el área.","requisito_dote":"5","activa":"12","categoria":""},{"id":7,"nombre":"Tácticas de pelotón III","descripcion":"Triplica el efecto de las Formaciones a todos los aliados implicados dentro del área.","requisito_dote":"6","activa":"12","categoria":""},{"id":8,"nombre":"Palabra de comando","descripcion":"Puedes otorgar 1 acción tuya a un aliado.","requisito_dote":"","activa":"","categoria":""},{"id":9,"nombre":"Alentar","descripcion":"Usas 1 acción para quitar el estado de Atemorizado y Embobado a todos los que te puedan escuchar.","requisito_dote":"","activa":"","categoria":""},{"id":10,"nombre":"¡A mi la Legión!","descripcion":"Usas 1 acción para animar a tus aliados a que se reagrupen a tu alrededor. Estos aliados pueden moverse en dirección hacia ti un máximo de distancia igual a su Movimiento.","requisito_dote":"","activa":"","categoria":""},{"id":11,"nombre":"Discurso motivador","descripcion":"Al hacer un discurso de 5 minutos a un grupo de oyentes, otorga los siguientes bufos durante 10 min: +1 Movimiento, +1 Poderío, +1 Puntería, Tu nivel en sobreescudo.","requisito_dote":"","activa":"","categoria":""},{"id":12,"nombre":"Bricomania","descripcion":"Te permite construir obras de ingenieria militar, sin la necesidad de tener puntos en la artesania de grandes proyectos.","requisito_dote":"","activa":"","categoria":""},{"id":13,"nombre":"Heavy weaponzzz","descripcion":"Levanta la restricción de armas y armaduras con la etiqueta de Pesada.","requisito_dote":"","activa":"","categoria":""}]},{"nombre":"Maestros de armas de Limsa Lomensa","descripcion":"Los mejores guerreros de Limsa Lomensa, especialistas en las armas duales y el uso de múltiples armas rápidas que les dotan de mucha versatilidad en la batalla.","dotes":[{"id":1,"nombre":"Demasiado lento I","descripcion":"Al usar Contraataque, golpeas una vez más con un arma diferente sin coste alguno para desenvainarla.","requisito_dote":"","activa":"10","categoria":""},{"id":2,"nombre":"Demasiado lento II","descripcion":"Una vez por turno puedes usar una reacción gratuita para efectuar el contraataque.","requisito_dote":"1","activa":"10","categoria":""},{"id":3,"nombre":"Poco rápido I","descripcion":"Al usar Parry, si desvías con éxito un golpe, el siguiente ataque que cometa el objetivo contra ti va con desventaja.","requisito_dote":"","activa":"8","categoria":""},{"id":4,"nombre":"Poco rápido II","descripcion":"Si desvías dicho ataque, este va dirigido contra otro enemigo a tu elección.","requisito_dote":"3","activa":"8","categoria":""},{"id":5,"nombre":"Poco rápido III","descripcion":"Como parte de tu reacción, puedes usar, en caso de tenerla, Desarme precoz.","requisito_dote":"4","activa":"8","categoria":""},{"id":6,"nombre":"Truco del almendruco","descripcion":"Puedes intercambiar tus armas actualmente equipadas al principio de cada acción de ataque.","requisito_dote":"","activa":"","categoria":""},{"id":7,"nombre":"Intercambio promiscuo","descripcion":"Al cambiar de armas por un arma no utilizada durante este turno, ganas tu estrato en Poderío hasta final de turno. Se puede acumular.","requisito_dote":"","activa":"","categoria":""},{"id":8,"nombre":"Empuñadura del titán","descripcion":"Ignoras la propiedad A dos manos. Pudiendo llevar un arma en cada mano a merced, además hacen el máximo daño posible que tengan dichas armas.","requisito_dote":"","activa":"","categoria":""},{"id":9,"nombre":"Tormenta de acero","descripcion":"Requisito: tener a dos o más objetivos a rango de al menos una de tus armas cuerpo a cuerpo. Gastas 3 acciones. Dañas a todos los enemigos que estén a rango con el daño de tus armas, siempre y cuando cada ataque sea efectuado con un arma de distinto tipo y los ataques se distribuyan equitativamente entre todos los objetivos que te rodeen.","requisito_dote":"","activa":"","categoria":""},{"id":10,"nombre":"Carga febril","descripcion":"Las armas pesan y ocupan la mitad en tu inventario.","requisito_dote":"","activa":"","categoria":""},{"id":11,"nombre":"Desarme precoz I","descripcion":"Usas una acción de ataque para robar el arma de tu oponente o bien para lanzarla al suelo.","requisito_dote":"","activa":"","categoria":""},{"id":12,"nombre":"Desarme precoz II","descripcion":"Al tener éxito en ello puedes realizar una acción de ataque con el mismo arma robada.","requisito_dote":"11","activa":"","categoria":""}]},{"nombre":"Pugilista","descripcion":"Acceso a las posturas de combate y mejora de las acciones de combate. Desventaja al llevar puesta una armadura.","dotes":[{"id":1,"nombre":"Parry - Desvío perfecto","descripcion":"Si logras desviar con éxito un ataque, consigues hacer que el atacante se golpee a sí mismo con la misma fuerza con la que te iba a golpear.","requisito_dote":"","activa":"8","categoria":""},{"id":2,"nombre":"Parry - Desvío de proyectiles","descripcion":"Te permite desviar proyectiles.","requisito_dote":"1","activa":"8","categoria":""},{"id":3,"nombre":"Parry - Devolución de proyectiles","descripcion":"Te permite devolver proyectiles.","requisito_dote":"2","activa":"8","categoria":""},{"id":4,"nombre":"Adrenalina - La Zona I","descripcion":"Tienes una acción de ataque extra.","requisito_dote":"","activa":"3","categoria":""},{"id":5,"nombre":"Adrenalina - La Zona II","descripcion":"Tienes una reacción extra.","requisito_dote":"4","activa":"3","categoria":""},{"id":6,"nombre":"Inmovilización prensada","descripcion":"Ataque contra su nivel de Estilo Marcial, en caso de ganar aplicas el estado Sometido.","requisito_dote":"","activa":"","categoria":"Escuela de las luxaciones"},{"id":7,"nombre":"Agarre eficiente","descripcion":"Cuando realizas la agarrar, no tienes que elegir entre Maniatado y Enredado.","requisito_dote":"","activa":"","categoria":"Escuela de las luxaciones"},{"id":8,"nombre":"Juri","descripcion":"Puedes utilizar tus piernas como herramienta para causar Maniatado a un enemigo.","requisito_dote":"","activa":"","categoria":"Escuela de las luxaciones"},{"id":9,"nombre":"Juri - Mejora I","descripcion":"Cuando realizas un agarre, ignoras los efectos negativos de Maniatado y/o Enredado que el agarre te causaría.","requisito_dote":"8","activa":"","categoria":"Escuela de las luxaciones"},{"id":10,"nombre":"Danzas Ballerina Longina","descripcion":"Cada acción de ataque con arma permite realizar un ataque sin armas en forma de patada.","requisito_dote":"","activa":"","categoria":"Escuela de las armas"},{"id":11,"nombre":"Danza Vectorial Direccional","descripcion":"Puedes golpear a tus enemigos en direcciones distintas. Si golpeas al mismo enemigo desde direcciones distintas (diferente cara del hexágono), obtienes -4 en tu rango de crítico.","requisito_dote":"","activa":"","categoria":"Escuela de las armas"},{"id":12,"nombre":"Guardia del agua que fluye","descripcion":"Si no has gastado ninguna acción durante tu turno, tu Esquiva se dobla hasta el principio de tu siguiente turno.","requisito_dote":"","activa":"","categoria":"Escuela del desvio que te vio"},{"id":13,"nombre":"Fluyo como el agua","descripcion":"Gastas 1 Reacción. El rival tiene desventaja al atacarte hasta el siguiente turno. En el momento de recibir un golpe enemigo, reaccionas desviándolo, haciendo que el enemigo caiga al suelo.","requisito_dote":"","activa":"","categoria":"Escuela del desvio que te vio"},{"id":14,"nombre":"Fluyo como el agua - Mejora I","descripcion":"Aprovechas como parte del desvío y el enemigo realiza una tirada con desventaja por Juego de Manos sobre Nivel de Pugilista o Juego de manos, si falla, lo desarmas.","requisito_dote":"13","activa":"","categoria":"Escuela del desvio que te vio"},{"id":15,"nombre":"El Directo","descripcion":"Un golpe rápidísimo que requiere de una preparación.","requisito_dote":"","activa":"","categoria":"Escuela del castañazo"},{"id":16,"nombre":"Destrozo visceral","descripcion":"Un forte golpe mezzoforte hecho con el hombro que empuja y realiza en daño tu DL*2, tanto en daño como en distancia de empuje. Si el objetivo se choca con algo durante el recorrido del empuje, recibe tanto daño como movimiento restante.","requisito_dote":"","activa":"","categoria":"Escuela del castañazo"},{"id":17,"nombre":"Contra","descripcion":"Puedes decidir no actuar durante un turno. Como parte de esta maniobra, puedes desplazarte tanto como tu Movimiento. Todo el daño recibido hasta el principio de tu siguiente turno se acumula, y una vez comience tu siguiente turno, se devuelve multiplicado por dos a todos los enemigos que tengas en casillas colindantes.","requisito_dote":"","activa":"","categoria":"Escuela del castañazo"},{"id":18,"nombre":"Efecto Depèche","descripcion":"Tus puñetazos adquieren la propiedad de Rango con una distancia óptima entre cero y tu Poderío, y la propiedad de Área, con daño en cono delante de ti. Este ataque realiza tu Poderío en daño, y cada espacio que te separe del objetivo reduce el daño en uno, hasta cero.","requisito_dote":"","activa":"","categoria":"Escuela del castañazo"},{"id":19,"nombre":"Golpe aturdidor","descripcion":"Una vez por turno puedes realizar un ataque que aplique el estado de Aturdido.","requisito_dote":"","activa":"","categoria":"Escuela del castañazo"},{"id":20,"nombre":"Terremoto","descripcion":"Realizas un pisotón o puñetazo contra el suelo para causar un pequeño cataclismo a tu alrededor. Todos los espacios en un radio de dos se transforman en terreno dificilillo, y todos los enemigos que hubiese en el área se desplazan una casilla hacia ti. Los enemigos desplazados de esta forma deben realizar una tirada de Acrobacia contra tu Nivel de Pugilista + Poderío; si fallan, adquieren el estado Cuerpo a tierra. Además, cualquier trampa en el área del cráter queda inutilizada y destruida.","requisito_dote":"","activa":"","categoria":"Escuela del castañazo"},{"id":21,"nombre":"Galleta galleta metralleta","descripcion":"Una vez por turno, puedes decidir gastar una, dos o tres acciones en realizar los siguientes ataques. Gastando 1 acción: golpeas 3 veces. Gastando 2 acciones: golpeas 5 veces con desventaja 1. Gastando 3 acciones: golpeas 7 veces con desventaja 2.","requisito_dote":"","activa":"","categoria":"Escuela del muda muda"},{"id":22,"nombre":"Arras","descripcion":"Puedes moverte un espacio en cualquier dirección después de cada golpe certero.","requisito_dote":"","activa":"","categoria":"Escuela del muda muda"},{"id":23,"nombre":"Jab I","descripcion":"Golpe rápido al que no se le añade el Poderío y no se le puede reaccionar.","requisito_dote":"","activa":"","categoria":"Escuela del muda muda"},{"id":24,"nombre":"Jab II - Golpe ciclón","descripcion":"Al atacar con jab obtienes ventaja 3.","requisito_dote":"24","activa":"","categoria":"Escuela del muda muda"},{"id":25,"nombre":"Jab III - Golpe Espiral","descripcion":"Ignoras la esquiva, el ataque no puede fallar.","requisito_dote":"25","activa":"","categoria":"Escuela del muda muda"},{"id":26,"nombre":"Patadiña de Boliña","descripcion":"Gastando 1 acción. Patadas especiales realizan 2 de daño + Poderío. En el turno de usar Patadiña de Boliña, puedes moverte gastando acciones y si los enemigos entran en el rango de tu habilidad son golpeados automáticamente, cada ataque golpea 1 vez a un enemigo distinto. Si usas alguna otra acción que no sea moverte Patadiña de Boliña es cancelada.","requisito_dote":"","activa":"","categoria":"Escuela del muda muda"},{"id":27,"nombre":"Patadiña de Boliña I","descripcion":"Golpeas en área realizando una patada en arco enfrente tuyo.","requisito_dote":"27","activa":"","categoria":"Escuela del muda muda"},{"id":28,"nombre":"Patadiña de Boliña II","descripcion":"Patadiña de Boliña golpea dos veces a todos los enemigos golpeados previamente.","requisito_dote":"28","activa":"","categoria":"Escuela del muda muda"},{"id":29,"nombre":"Patadiña de Boliña III","descripcion":"Golpeas en área a todos los enemigos a tu alrededor en ángulo de 360.","requisito_dote":"28","activa":"","categoria":"Escuela del muda muda"}]},{"nombre":"Cruzado","descripcion":"Dispuesto a servir y proteger a los inocentes y castigar a los injustos, este estilo marcial es propio de aquellos que han sido entrenados por los maestros de la Orden de los Caballeros del Silencio. Aprenden tácticas de combate en formaciones y defensa personal. Expertos en aprovechar los errores del rival en su beneficio y en interceder para proteger a sus aliados.","dotes":[{"id":1,"nombre":"Intercepción - Intervención I","descripcion":"Si una criatura está a punto de recibir un golpe a melé y está a 2 casillas o menos, intercedes y golpeas a su agresor.","requisito_dote":"","activa":"4","categoria":""},{"id":2,"nombre":"Intercepción - Intervención II","descripcion":"La distancia de la Intervención aumenta hasta tu velocidad base.","requisito_dote":"1","activa":"4","categoria":""},{"id":3,"nombre":"Intercepción - Intervención III","descripcion":"Puedes intervenir ataques a distancia.","requisito_dote":"2","activa":"4","categoria":""},{"id":4,"nombre":"Intercepción - Intervención IV","descripcion":"El golpe que le causas al agresor va con la furia de la justicia, recibe Ventaja 2 en dicho golpe.","requisito_dote":"3","activa":"4","categoria":""},{"id":5,"nombre":"Intercepción - Intervención V","descripcion":"El golpe es devastador, reduce en 1 el rango de crítico necesario.","requisito_dote":"4","activa":"4","categoria":""},{"id":6,"nombre":"Tensión - Custodio I","descripcion":"Además de otorgar 3 de Resistencia, Tensión también aumenta en 1/Body la Resistencia.","requisito_dote":"","activa":"2","categoria":""},{"id":7,"nombre":"Tensión - Custodio II","descripcion":"Otorga tanto HP como Body tengas.","requisito_dote":"6","activa":"2","categoria":""},{"id":8,"nombre":"Tensión - Custodio III","descripcion":"Si el atacante falla, debe tirar por caer derribado al suelo con Desventaja 1.","requisito_dote":"7","activa":"2","categoria":""},{"id":9,"nombre":"Tensión - Custodio IV","descripcion":"Si falla debe tirar con Desventaja 2 por caer preso del terror.","requisito_dote":"8","activa":"2","categoria":""},{"id":10,"nombre":"Tensión - Custodio V","descripcion":"Aumenta en 1 las Desventajas anteriores.","requisito_dote":"9","activa":"2","categoria":""},{"id":11,"nombre":"Baluarte","descripcion":"Has sido entrenado para proteger, para ser la vanguardia y el escudo que defiende toda la fe. Mientras tus compañeros no reciban daño, tienes Ventaja 1 en las tiradas de dar en combate.","requisito_dote":"","activa":"","categoria":""},{"id":12,"nombre":"Contemplación","descripcion":"Ritual en el que meditas sobre el origen de la fe. (Acción mental) Integras el poder del fuego imperecedero y adquieres diferentes efectos.","requisito_dote":"","activa":"","categoria":""},{"id":13,"nombre":"Juicio","descripcion":"Estado que infliges a un enemigo por nivel de poder con el que todo el mundo tiene una bonificación al dar.","requisito_dote":"","activa":"","categoria":""},{"id":14,"nombre":"Veredicto","descripcion":"Golpe cargado de luz abrasadora. Inflige más daño si el objetivo está en estado juzgado.","requisito_dote":"","activa":"","categoria":""},{"id":15,"nombre":"Bendición","descripcion":"Bendices hasta un número máximo de 1 por nivel de poder de alma y ofreces una mejora a la armadura y la vitalidad.","requisito_dote":"","activa":"","categoria":""},{"id":16,"nombre":"Expiación","descripcion":"Te bendices a ti o una criatura. Cuando alguien ataque a la persona bendecida, un castigo se desatará sobre el atacante, imbuyendo tu arma con el poder del fuego sagrado, podrás infligir un extra de daño al atacante.","requisito_dote":"","activa":"","categoria":""},{"id":17,"nombre":"Choque sagrado","descripcion":"Descargas un rayo de luz desde las yemas de los dedos hacia un único objetivo, sana aliados y daña enemigos.","requisito_dote":"","activa":"","categoria":""},{"id":18,"nombre":"Vínculo de rectitud","descripcion":"Forjas un vínculo con un aliado en el que prometes protegerle ante todo, si el objetivo recibe daño, se divide a la mitad y tú recibes la otra mitad de su daño.","requisito_dote":"","activa":"","categoria":""},{"id":19,"nombre":"Consagrar","descripcion":"Bendice una zona con el poder de la luz, quemando a los infieles y sanando a los aliados.","requisito_dote":"","activa":"","categoria":""},{"id":20,"nombre":"Iniciativa mejorada","descripcion":"Tu Body por 3 se suma a la iniciativa.","requisito_dote":"","activa":"","categoria":""}]},{"nombre":"Vagabond","descripcion":"Eras un guerrero formidable y lo tenias todo…Hasta que algo o alguien se interpuso y ahora lo que mas valorabas te ha sido arrebatado. ¿Recuperarás lo que te pertenece?","dotes":[{"id":1,"nombre":"Contraataque - Oni Giri","descripcion":"A diferencia del contraataque normal, que solo puede ser activado cuando un enemigo te impacta, tú puedes activarlo cuando realizan una acción de ataque contra ti a melé y fallan también. Castigas al oponente que ha fallado su ataque contra ti de manera devastadora, aplicas tu nivel de Vagabond +1 al DL y al dar del golpe del contraataque.","requisito_dote":"","activa":"10","categoria":""},{"id":2,"nombre":"Tensión - Kaioken I","descripcion":"Adoptas una postura de combate y tienes todos tus sentidos al máximo, formas un perímetro al tener tensión de 2 casillas y 1 en diagonal (4 metros). La criatura que te ataque a ti o algún aliado dentro del perímetro se llevará un contraataque extra. Pudiendo ser 2 contraataques en 1 turno si te atacan a ti.","requisito_dote":"","activa":"2","categoria":""},{"id":3,"nombre":"Tensión - Kaioken II","descripcion":"Los contraataques se duplican.","requisito_dote":"2","activa":"2","categoria":""},{"id":4,"nombre":"Sentidos super desarrollados","descripcion":"Gastando 3 acciones, te concentras de tal manera que tienes ventaja 3 al esquivar. Hasta el principio de tu siguiente turno.","requisito_dote":"","activa":"","categoria":""},{"id":5,"nombre":"Defensa personal","descripcion":"Si aciertas un contraataque, en vez de atacar puedes aturdir a tu oponente 1 vez por turno. Causando que haya ventaja 1 al darle y solo pueda moverse la mitad de su movimiento.","requisito_dote":"","activa":"","categoria":""},{"id":6,"nombre":"Abandonar toda esperanza","descripcion":"Con la condición de haber recibido más de la mitad de tu vida en daño. Tus emociones te hacen estallar, convirtiéndote en un torbellino de furia imparable. Tienes ventaja 3 al dar pero desventaja 3 al esquivar. Dura 1 turno pero si quieres alargarlo deberás sufrir en cada uno de los turnos 1 nivel de cansancio extra.","requisito_dote":"","activa":"","categoria":""}]},{"nombre":"Ratero","descripcion":"En toda buena urbe urbana hay rateros, pero estos son profesionales. Expertos en hacer un arma de cualquier cosa que tengan cerca, usan cachivaches y juegan muuy sucio.","dotes":[{"id":1,"nombre":"Intercepción - Abarse I","descripcion":"Cuando eres el objetivo de un ataque cuerpo a cuerpo, puedes realizar un agarre contra una criatura (que no sea la atacante) para usarla como escudo de carne. Si el agarre es exitoso, la criatura agarrada se convierte en el nuevo objetivo del ataque.","requisito_dote":"","activa":"4","categoria":""},{"id":2,"nombre":"Intercepción - Abarse II","descripcion":"Puedes utilizar Abarse contra cualquier ataque, sea o no cuerpo a cuerpo.","requisito_dote":"1","activa":"4","categoria":""},{"id":3,"nombre":"Intercepción - Abarse III","descripcion":"En caso de que el agarre que se realiza como parte de Abarse sea exitoso, puedes intercambiar posiciones con la criatura agarrada. Además, puedes utilizar Abarse en caso de que seas víctima de un ataque en área, permitiendo así evadir por completo el ataque en caso de que se abandone su perímetro.","requisito_dote":"2","activa":"4","categoria":""},{"id":4,"nombre":"Intercepción - Abarse IV","descripcion":"Cuando utilizas Abarse, puedes gastar una reacción extra para escoger a una criatura a una distancia máxima de hasta tu velocidad de movimiento como objetivo de tu agarre. Si el agarre es exitoso, envías a ese pobre desgraciado a tu posición inicial de una patada.","requisito_dote":"3","activa":"4","categoria":""},{"id":5,"nombre":"Intercepción - Abarse V","descripcion":"El agarre utilizado como parte de Abarse siempre se realiza con éxito sin necesidad de tirada.","requisito_dote":"4","activa":"4","categoria":""},{"id":6,"nombre":"Procesar - Picaresca I","descripcion":"Puedes identificar el objeto no ocultado de más valor portado por una criatura con un simple vistazo.","requisito_dote":"","activa":"11","categoria":""},{"id":7,"nombre":"Procesar - Picaresca II","descripcion":"Puedes tirar por Juego de manos para robar un objeto portado pero no equipado de un objetivo, incluso en combate. Si el objeto robado tiene alguna utilidad activa con coste de una acción o inferior, puedes utilizarlo como parte de esta acción. Si el objetivo consiente, no es necesario realizar ninguna tirada de Juego de manos para sustraer el objeto de su inventario.","requisito_dote":"6","activa":"11","categoria":""},{"id":8,"nombre":"Procesar - Picaresca III","descripcion":"Utilizar Juego de manos para sustraer un objeto de un objetivo pasa a ser una acción mental. Tus dedos se mueven más rápidos que tu mente.","requisito_dote":"7","activa":"11","categoria":""},{"id":9,"nombre":"Picapica","descripcion":"Puedes realizar un ataque cuerpo a cuerpo para lanzar arena del suelo (o que se haya quedado atrapada en tus bolsillos o zapatos) a la cara de un rival, causando el estado cegado hasta el final de su turno. Una vez por combate por objetivo, puedes utilizar Picapica como parte de otro ataque cuerpo a cuerpo contra este objetivo.","requisito_dote":"","activa":"","categoria":""},{"id":10,"nombre":"Piesplanos","descripcion":"Como parte de tu tirada de iniciativa al entrar en combate, puedes moverte una distancia igual o menor que tu velocidad de movimiento antes de entrar en el orden de turnos.","requisito_dote":"","activa":"","categoria":""},{"id":11,"nombre":"Trampero trampista","descripcion":"Cualquier trampa que comiences a desplegar cuesta un tercio de las acciones usuales. Mínimo 1 acción.","requisito_dote":"","activa":"","categoria":""},{"id":12,"nombre":"Fallo a favor","descripcion":"Cuando eres afectado por un movimiento forzado, puedes utilizar una reacción para moverte en la misma dirección en la que eres arrastrado una distancia igual o inferior a tu velocidad de movimiento. Además, como parte de esta reacción, puedes incorporarte.","requisito_dote":"","activa":"","categoria":""},{"id":13,"nombre":"Rastrillad el rastro","descripcion":"Como parte de tu acción de movimiento, puedes arrojar trampas con un coste base de una acción (como rodamientos o abrojos) a lo largo de todo tu desplazamiento, sin coste adicional. Además, puedes utilizar esta habilidad con obstáculos del entorno o chatarra de tu inventario (a discreción del Maestro) para causar terreno dificultoso a tu paso.","requisito_dote":"","activa":"","categoria":""}]},{"nombre":"Acechador Letal","descripcion":"Mortíferos artistas de la emboscada y las puñaladitas traperas traviesas. Usan todo tipo de artilugios para acabar con sus mentecatas víctimas.","dotes":[{"id":14,"nombre":"Procesar - Analizar enemigo I","descripcion":"Puedes usar tu habilidad de procesar para analizar a un objetivo. Elige entre: HP actual (Sabes si está a más de la mitad o menos), Nivel (Sabes si tiene más que tú o menos), o 1 estado negativo.","requisito_dote":"","activa":"11","categoria":""},{"id":15,"nombre":"Procesar - Analizar enemigo II","descripcion":"Puedes elegir 2 opciones en vez de una al analizar.","requisito_dote":"14","activa":"11","categoria":""},{"id":16,"nombre":"Procesar - Analizar enemigo III","descripcion":"Aprendes más información al analizar. HP: 1/4, 1/2, 3/4 o full hp. Nivel: Sabes en qué tier está, es decir de 5 en 5 niveles. Estados: todos los estados negativos.","requisito_dote":"15","activa":"11","categoria":""},{"id":17,"nombre":"Procesar - Analizar enemigo IV","descripcion":"Consigues ventaja 2 contra ese objetivo. Puedes compartir esa información para que todos obtengan ventaja.","requisito_dote":"16","activa":"11","categoria":""},{"id":18,"nombre":"Procesar - Analizar enemigo V","descripcion":"Obtienes información precisa del objetivo analizado.","requisito_dote":"17","activa":"11","categoria":""},{"id":19,"nombre":"Apuntar - Combate en las sombras I","descripcion":"Al Apuntar estando en sigilo se reduce en 2 el rango de crítico del siguiente ataque.","requisito_dote":"","activa":"7","categoria":""},{"id":20,"nombre":"Apuntar - Combate en las sombras II","descripcion":"Al apuntar estando en sigilo puedes atacar con ventaja.","requisito_dote":"19","activa":"7","categoria":""},{"id":21,"nombre":"Apuntar - Combate en las sombras III","descripcion":"Apuntar estando en sigilo reduce en 2 más el rango de crítico.","requisito_dote":"20","activa":"7","categoria":""},{"id":22,"nombre":"Apuntar - Atacar al punto débil","descripcion":"Al apuntar a un objetivo estando en sigilo puedes apuntar a partes expuestas de su cuerpo. Duplicas tu Deadeye en ese objetivo.","requisito_dote":"","activa":"7","categoria":"Tier 2"},{"id":23,"nombre":"Apuntar - Precisión mortal","descripcion":"Reduces en 2 el rango de crítico a un objetivo apuntado.","requisito_dote":"","activa":"7","categoria":"Tier 2"},{"id":24,"nombre":"Emboscada","descripcion":"Tu filosofía es quien ataca primero ataca dos veces. Tienes ventaja 1 en atacar si atacas por sorpresa.","requisito_dote":"","activa":"","categoria":""},{"id":25,"nombre":"Manto de Niebla","descripcion":"Eres tan silencioso que los enemigos no saben de dónde les vienen los golpes. Puedes mantener el sigilo después de un ataque.","requisito_dote":"","activa":"","categoria":""},{"id":26,"nombre":"Velocidad de reacción","descripcion":"Tu Agilidad se suma a la iniciativa.","requisito_dote":"","activa":"","categoria":""},{"id":27,"nombre":"Maestro de la planificación I","descripcion":"Si has estudiado la zona del combate antes de que empiece tienes ventaja en todas las tiradas de investigación para encontrar enemigos escondidos y para esconderse.","requisito_dote":"","activa":"","categoria":""},{"id":28,"nombre":"Maestro de la planificación II","descripcion":"Puedes compartir esa información con tantas personas como tu nivel y compartir esa ventaja.","requisito_dote":"27","activa":"","categoria":""},{"id":29,"nombre":"Esconderse sin gastar acción I","descripcion":"Esconderte y moverte la mitad de tu movimiento.","requisito_dote":"","activa":"","categoria":""},{"id":30,"nombre":"Esconderse sin gastar acción II","descripcion":"Esconderte con ventaja.","requisito_dote":"29","activa":"","categoria":""},{"id":31,"nombre":"Esconderse sin gastar acción III","descripcion":"Esconderte con ventaja, moverte y atacar.","requisito_dote":"30","activa":"","categoria":""}]},{"nombre":"Gentilhombre","descripcion":"Gallardos guerreros especialistas del combate montado, sacan el máximo provecho de la fuerza de sus monturas para propiciar golpes devastadores.","dotes":[{"id":1,"nombre":"Instruir - Lección Humillante","descripcion":"Tiene el efecto adverso al homólogo de la habilidad. Sueltas una serie de improperios y críticas que desmoralizan al adversario. Debe hacer una tirada de salvación de mente, si falla, puedes comandarle que suelte el arma, se eche al suelo o que salga despavorido, adquiriendo el estado de Terror.","requisito_dote":"","activa":"12","categoria":""},{"id":2,"nombre":"Carga - Justa","descripcion":"Al realizar una acción de carga, añades el daño de la distancia recorrida hasta tu oponente.","requisito_dote":"","activa":"1","categoria":""},{"id":3,"nombre":"Avasallar","descripcion":"Si el objetivo está asustado, tienes ventaja 1 en las tiradas al dar de ataque y en resistencia.","requisito_dote":"","activa":"","categoria":""},{"id":4,"nombre":"Gallardía I","descripcion":"Si aciertas una acción de ataque, sumas 1 de DL a los siguientes ataques hasta el siguiente turno.","requisito_dote":"","activa":"","categoria":""},{"id":5,"nombre":"Gallardía II","descripcion":"Si fallas una acción de ataque, sumas 1 de Resistencia hasta tu siguiente turno.","requisito_dote":"","activa":"","categoria":""},{"id":6,"nombre":"Crueldad","descripcion":"Si el objetivo está asustado, estás montado o en superioridad numérica, impones desventaja 1 al dar al enemigo o enemigos que puedas ver. Para ello deben de verte los enemigos también.","requisito_dote":"","activa":"","categoria":""},{"id":7,"nombre":"Hidalgo","descripcion":"Si vas montado, puedes aumentar tu movimiento en 1. La montura solo necesita descansar la mitad del tiempo, solo necesita comer y beber la mitad de las cantidades normales y puede ayudarte en el combate. Además su capacidad de carga se duplica.","requisito_dote":"","activa":"","categoria":""},{"id":8,"nombre":"Honorable","descripcion":"Inspiras a los aliados cercanos a 3x3 casillas con un grito de orgullo y valor. Si vas montado y tus aliados también, vuestro movimiento aumenta en 2, si vais a pie aumenta en 1.","requisito_dote":"","activa":"","categoria":""}]},{"nombre":"Ungah Ungah","descripcion":"Guerreros primitivos que canalizan su ira y furia primal en combate, convirtiéndose en máquinas de destrucción imparables.","dotes":[{"id":1,"nombre":"Adrenalina - Furia Primal","descripcion":"Adrenalina también hace que tu resistencia se convierta en daño, pero la resistencia que tuvieras la pierdes de igual manera, hasta que canceles el estado.","requisito_dote":"","activa":"3","categoria":""},{"id":2,"nombre":"Carga - Grappling","descripcion":"Al cargar también aplicas el estado Sometido a una criatura grande o inferior. En ese estado no os podéis mover pero puedes derribarla al suelo o incluso intentar dejarla Inconsciente con una tirada.","requisito_dote":"","activa":"1","categoria":""},{"id":3,"nombre":"Berserker I","descripcion":"Atacas con ventaja 1 pero tienes desventaja 2 al esquivar.","requisito_dote":"","activa":"","categoria":""},{"id":4,"nombre":"Berserker II","descripcion":"Atacas con ventaja 2 ahora.","requisito_dote":"3","activa":"","categoria":""},{"id":5,"nombre":"Berserker III","descripcion":"Tienes una acción de ataque extra.","requisito_dote":"4","activa":"","categoria":""},{"id":6,"nombre":"Berserker IV","descripcion":"Atacas con ventaja 3 y sufres desventaja 3 al esquivar.","requisito_dote":"5","activa":"","categoria":""},{"id":7,"nombre":"Furia primal I","descripcion":"Aumentas en 1 por tier de Ungha Ungha tu resistencia.","requisito_dote":"","activa":"","categoria":""},{"id":8,"nombre":"Furia primal II","descripcion":"Si recibes daño físico, recibes la mitad de este.","requisito_dote":"7","activa":"","categoria":""},{"id":9,"nombre":"Furia primal III","descripcion":"Si recibes daño elemental, recibes la mitad de este.","requisito_dote":"8","activa":"","categoria":""},{"id":10,"nombre":"Odio profundo","descripcion":"Consumiendo 3 acciones y en estado Berserker o de Furia primal, un torrente de ira te invade el cuerpo, haciendo hervir tu sangre y acelerándote. Eliges un área de la que tú eres su centro y en un cono de 45° golpeas a todos los enemigos que hayan sido cogidos por tu área. Los ataques que aciertes puedes volver a tirarlos en forma de nuevos ataques.","requisito_dote":"","activa":"","categoria":""}]},{"nombre":"Depredador","descripcion":"Acecha a sus víctimas y una vez que las ha localizado jamás escapan de su visión letal. Mortífero en el combate a distancia.","dotes":[{"id":1,"nombre":"Parry - Kitear/Poquear","descripcion":"Como parte de la reacción puedes desplazarte tu movimiento.","requisito_dote":"","activa":"8","categoria":""},{"id":2,"nombre":"Adrenalina - Strafing I","descripcion":"Disparar a la carrera. Puedes atacar en tu acción de movimiento.","requisito_dote":"","activa":"3","categoria":""},{"id":3,"nombre":"Adrenalina - Strafing II","descripcion":"Atacas el doble de veces.","requisito_dote":"2","activa":"3","categoria":""},{"id":4,"nombre":"Overwatch I","descripcion":"Cuando alguien use una acción no mental y puedas verle, puedes atacarle usando tu Reacción. El rango es un ataque en cono en frente tuyo.","requisito_dote":"","activa":"","categoria":""},{"id":5,"nombre":"Overwatch II","descripcion":"Si alguien ataca a un aliado que no seas tú, le atacas con ventaja 1.","requisito_dote":"4","activa":"","categoria":""},{"id":6,"nombre":"Overwatch III","descripcion":"Aunque no veas al atacante, puedes atacarle en un radio de 360°.","requisito_dote":"5","activa":"","categoria":""},{"id":7,"nombre":"Overwatch IV","descripcion":"Tienes ventaja 3 al atacar al atacante. Si impactas le aturdes.","requisito_dote":"6","activa":"","categoria":""},{"id":8,"nombre":"Disparo ralentizador I","descripcion":"Al realizar una acción de ataque, una vez por turno, si impactas, reduces a la mitad el movimiento de un enemigo.","requisito_dote":"","activa":"","categoria":""},{"id":9,"nombre":"Disparo ralentizador II","descripcion":"Puedes realizar dicho disparo una vez por turno por objetivo.","requisito_dote":"8","activa":"","categoria":""},{"id":10,"nombre":"Disparo múltiple","descripcion":"Al realizar una acción de ataque, una vez por turno, disparas hasta un máximo de 4 proyectiles con una desventaja proporcional por cada proyectil por encima de 1. Máx desventaja 3.","requisito_dote":"","activa":"","categoria":""},{"id":11,"nombre":"Lluvia de flechas","descripcion":"Its raining man! Gastas un mínimo de 3 acciones para preparar una gran salva de proyectiles; debes indicar un radio de 3x3 donde disparar. Realizando 9 disparos, 1 por casilla con desventaja 1.","requisito_dote":"","activa":"","categoria":""},{"id":12,"nombre":"Aspiradora de flechas I","descripcion":"Puedes atrapar flechas enemigas.","requisito_dote":"","activa":"","categoria":""},{"id":13,"nombre":"Aspiradora de flechas II","descripcion":"Hacerlo en área.","requisito_dote":"12","activa":"","categoria":""}]}]'),yf={estiloMarcial:Ug},Ng=["value"],Fg={key:0,style:{"margin-top":"8px"}},Og={key:0,class:"space-y-8"},Bg={class:"bg-blue-50 border-2 border-blue-200 rounded-lg p-6"},zg={class:"text-xl font-bold text-blue-700 mb-3"},Hg={class:"text-blue-600 leading-relaxed"},Vg={class:"bg-blue-50 border-2 border-blue-200 rounded-lg p-6"},kg={class:"text-lg font-semibold text-blue-700 mb-4"},Gg={class:"text-sm text-blue-600 mb-6"},qg={class:"space-y-6"},Wg={class:"text-md font-semibold text-blue-700 uppercase tracking-wide border-b border-blue-300 pb-2"},jg={class:"space-y-3"},$g={key:0,class:"flex items-start mb-2"},Xg={class:"text-xs text-blue-500 italic"},Yg=["onClick","disabled"],Kg={class:"flex items-start gap-3"},Zg={key:0,class:"text-blue-500 text-xs"},Jg={class:"flex-1"},Qg={class:"font-semibold mb-1 flex items-center gap-2"},e_={key:0,class:"text-xs px-2 py-0.5 bg-blue-600 text-white rounded-full"},t_={__name:"estilo_marcial",setup(n){const{characterData:e,loadCharacterData:t,saveCharacterData:i}=Pi(),s=Tt(""),a=Tt([]),o=Tt(!1),r=Tt(!0),l=yf.estiloMarcial,c=qi.activas;Ve(()=>{const h=new Map;return c.forEach(P=>{h.set(P.id.toString(),P)}),h}),Tt([]);const u=Ve(()=>new Set(a.value));Wn(async()=>{r.value=!0,await t(),s.value=e.value.estilo_marcial||"",a.value=[...e.value.estilo_marcial_dotes||[]],o.value=!0,console.log("Cargado estilo marcial:",s.value),console.log("Cargado dotes:",a.value),await wa(),r.value=!1}),at(s,(h,P)=>{r.value||(e.value.estilo_marcial=h,P&&P!==h&&(a.value=[],e.value.estilo_marcial_dotes=[]),i(),console.log("Guardado estilo marcial:",h))}),at(a,h=>{r.value||(console.log("Dotes seleccionadas cambiaron:",h),e.value.estilo_marcial_dotes=[...h],i(),console.log("Guardado dotes:",h))},{deep:!0});const d=Ve(()=>{const h=l.find(S=>S.nombre===s.value);if(!h)return null;const P=h.dotes.filter(S=>S.categoria),w=h.dotes.filter(S=>!S.categoria),b=new Map;P.forEach(S=>{b.has(S.categoria)||b.set(S.categoria,[]),b.get(S.categoria).push(S)});const C=[];return w.length>0&&C.push({categoria:"Dotes Generales",dotes:w.map(S=>({id:`${h.nombre}_${S.id}`,nombre:S.nombre,descripcion:S.descripcion,requiere:S.requisito_dote?`${h.nombre}_${S.requisito_dote}`:null,activaId:S.activa}))}),b.forEach((S,R)=>{C.push({categoria:R,dotes:S.map(U=>({id:`${h.nombre}_${U.id}`,nombre:U.nombre,descripcion:U.descripcion,requiere:U.requisito_dote?`${h.nombre}_${U.requisito_dote}`:null,activaId:U.activa}))})}),{nombre:h.nombre,descripcion:h.descripcion,numDotes:e.value.nivel||1,gruposDotes:C}});function f(h){const P=a.value.indexOf(h.id);P!==-1?(a.value.splice(P,1),m(h)):a.value.length<d.value.numDotes&&a.value.push(h.id)}function p(h){return h.requiere?a.value.includes(h.requiere):!0}function x(h){return u.value.has(h)}function y(h){for(const P of d.value?.gruposDotes||[])for(const w of P.dotes)if(w.id===h)return w.nombre;return h}function m(h){d.value.gruposDotes.forEach(P=>{P.dotes.forEach(w=>{if(w.requiere===h.id){const b=a.value.indexOf(w.id);b!==-1&&(a.value.splice(b,1),m(w))}})})}return(h,P)=>(ge(),_e(Qe,null,[_("div",null,[P[2]||(P[2]=_("label",{class:"block text-sm font-semibold text-blue-700 mb-2"}," Selecciona tu EstiloMarcial ",-1)),mn(_("select",{"onUpdate:modelValue":P[0]||(P[0]=w=>s.value=w),class:"w-full px-4 py-3 bg-blue-50 border-2 border-blue-200 rounded-lg text-blue-900"},[P[1]||(P[1]=_("option",{value:""},"Elige un estiloMarcial...",-1)),(ge(!0),_e(Qe,null,Mt(lt(l),w=>(ge(),_e("option",{key:w.nombre,value:w.nombre},$(w.nombre),9,Ng))),128))],512),[[pc,s.value]]),s.value?(ge(),_e("p",Fg)):gt("",!0)]),d.value&&o.value?(ge(),_e("div",Og,[_("div",Bg,[_("h3",zg,$(d.value.nombre),1),_("p",Hg,$(d.value.descripcion),1)]),_("div",Vg,[_("h4",kg," Dotes de Clase (Elige "+$(d.value.numDotes)+") ",1),_("p",Gg," Seleccionadas: "+$(a.value.length)+" / "+$(d.value.numDotes),1),_("div",qg,[(ge(!0),_e(Qe,null,Mt(d.value.gruposDotes,w=>(ge(),_e("div",{key:w.categoria,class:"space-y-4"},[_("h5",Wg,$(w.categoria),1),_("div",jg,[(ge(!0),_e(Qe,null,Mt(w.dotes,b=>(ge(),_e("div",{key:b.id,class:"ml-0"},[b.requiere?(ge(),_e("div",$g,[P[3]||(P[3]=_("div",{class:"w-8 border-l-2 border-blue-300 h-4 border-b-2 rounded-bl-lg mr-2"},null,-1)),_("span",Xg,"Requiere: "+$(y(b.requiere)),1)])):gt("",!0),_("button",{onClick:C=>f(b),disabled:!x(b.id)&&a.value.length>=d.value.numDotes||!p(b),class:Et(["w-full text-left p-4 rounded-lg transition-all duration-200 border-2",x(b.id)?"bg-blue-500 text-white border-blue-500 shadow-lg":p(b)?"bg-white text-blue-700 border-blue-200 hover:border-blue-400 hover:shadow-md":"bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-50",b.requiere?"ml-8":""])},[_("div",Kg,[_("span",{class:Et(["flex items-center justify-center w-5 h-5 rounded border-2 flex-shrink-0 mt-0.5",x(b.id)?"bg-white border-white":"bg-transparent border-blue-300"])},[x(b.id)?(ge(),_e("span",Zg,"✓")):gt("",!0)],2),_("div",Jg,[_("div",Qg,[Gt($(b.nombre)+" ",1),b.activaId?(ge(),_e("span",e_,"ACTIVA")):gt("",!0)]),_("p",{class:Et(["text-sm",a.value.includes(b.id)?"text-blue-100":"text-blue-600"])},$(b.descripcion),3)])])],10,Yg)]))),128))])]))),128))])])])):gt("",!0)],64))}};/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const mc="180",wn={ROTATE:0,DOLLY:1,PAN:2},On={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},n_=0,cd=1,i_=2,Sf=1,s_=2,Qn=3,Ci=0,sn=1,En=2,Si=0,Us=1,dd=2,ud=3,fd=4,a_=5,ki=100,r_=101,o_=102,l_=103,c_=104,d_=200,u_=201,f_=202,h_=203,al=204,rl=205,p_=206,m_=207,g_=208,__=209,v_=210,b_=211,x_=212,y_=213,S_=214,ol=0,ll=1,cl=2,Bs=3,dl=4,ul=5,fl=6,hl=7,Mf=0,M_=1,E_=2,Mi=0,T_=1,A_=2,w_=3,C_=4,R_=5,P_=6,D_=7,Ef=300,zs=301,Hs=302,pl=303,ml=304,Yr=306,gl=1e3,Wi=1001,_l=1002,Cn=1003,I_=1004,Ba=1005,Bn=1006,fo=1007,ji=1008,Gn=1009,Tf=1010,Af=1011,va=1012,gc=1013,Xi=1014,ii=1015,Ra=1016,_c=1017,vc=1018,ba=1020,wf=35902,Cf=35899,Rf=1021,Pf=1022,Tn=1023,xa=1026,ya=1027,Df=1028,bc=1029,If=1030,xc=1031,yc=1033,gr=33776,_r=33777,vr=33778,br=33779,vl=35840,bl=35841,xl=35842,yl=35843,Sl=36196,Ml=37492,El=37496,Tl=37808,Al=37809,wl=37810,Cl=37811,Rl=37812,Pl=37813,Dl=37814,Il=37815,Ll=37816,Ul=37817,Nl=37818,Fl=37819,Ol=37820,Bl=37821,zl=36492,Hl=36494,Vl=36495,kl=36283,Gl=36284,ql=36285,Wl=36286,L_=3200,U_=3201,Lf=0,N_=1,xi="",gn="srgb",Vs="srgb-linear",Dr="linear",ht="srgb",as=7680,hd=519,F_=512,O_=513,B_=514,Uf=515,z_=516,H_=517,V_=518,k_=519,jl=35044,pd="300 es",zn=2e3,Ir=2001;class Qi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const s=i[e];if(s!==void 0){const a=s.indexOf(t);a!==-1&&s.splice(a,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let a=0,o=s.length;a<o;a++)s[a].call(this,e);e.target=null}}}const Vt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],xr=Math.PI/180,$l=180/Math.PI;function Ei(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Vt[n&255]+Vt[n>>8&255]+Vt[n>>16&255]+Vt[n>>24&255]+"-"+Vt[e&255]+Vt[e>>8&255]+"-"+Vt[e>>16&15|64]+Vt[e>>24&255]+"-"+Vt[t&63|128]+Vt[t>>8&255]+"-"+Vt[t>>16&255]+Vt[t>>24&255]+Vt[i&255]+Vt[i>>8&255]+Vt[i>>16&255]+Vt[i>>24&255]).toLowerCase()}function et(n,e,t){return Math.max(e,Math.min(t,n))}function G_(n,e){return(n%e+e)%e}function ho(n,e,t){return(1-t)*n+t*e}function Fn(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function pt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const q_={DEG2RAD:xr};class Be{constructor(e=0,t=0){Be.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=et(this.x,e.x,t.x),this.y=et(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=et(this.x,e,t),this.y=et(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(et(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(et(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),s=Math.sin(t),a=this.x-e.x,o=this.y-e.y;return this.x=a*i-o*s+e.x,this.y=a*s+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Yi{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,a,o,r){let l=i[s+0],c=i[s+1],u=i[s+2],d=i[s+3];const f=a[o+0],p=a[o+1],x=a[o+2],y=a[o+3];if(r===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d;return}if(r===1){e[t+0]=f,e[t+1]=p,e[t+2]=x,e[t+3]=y;return}if(d!==y||l!==f||c!==p||u!==x){let m=1-r;const h=l*f+c*p+u*x+d*y,P=h>=0?1:-1,w=1-h*h;if(w>Number.EPSILON){const C=Math.sqrt(w),S=Math.atan2(C,h*P);m=Math.sin(m*S)/C,r=Math.sin(r*S)/C}const b=r*P;if(l=l*m+f*b,c=c*m+p*b,u=u*m+x*b,d=d*m+y*b,m===1-r){const C=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=C,c*=C,u*=C,d*=C}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,s,a,o){const r=i[s],l=i[s+1],c=i[s+2],u=i[s+3],d=a[o],f=a[o+1],p=a[o+2],x=a[o+3];return e[t]=r*x+u*d+l*p-c*f,e[t+1]=l*x+u*f+c*d-r*p,e[t+2]=c*x+u*p+r*f-l*d,e[t+3]=u*x-r*d-l*f-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,s=e._y,a=e._z,o=e._order,r=Math.cos,l=Math.sin,c=r(i/2),u=r(s/2),d=r(a/2),f=l(i/2),p=l(s/2),x=l(a/2);switch(o){case"XYZ":this._x=f*u*d+c*p*x,this._y=c*p*d-f*u*x,this._z=c*u*x+f*p*d,this._w=c*u*d-f*p*x;break;case"YXZ":this._x=f*u*d+c*p*x,this._y=c*p*d-f*u*x,this._z=c*u*x-f*p*d,this._w=c*u*d+f*p*x;break;case"ZXY":this._x=f*u*d-c*p*x,this._y=c*p*d+f*u*x,this._z=c*u*x+f*p*d,this._w=c*u*d-f*p*x;break;case"ZYX":this._x=f*u*d-c*p*x,this._y=c*p*d+f*u*x,this._z=c*u*x-f*p*d,this._w=c*u*d+f*p*x;break;case"YZX":this._x=f*u*d+c*p*x,this._y=c*p*d+f*u*x,this._z=c*u*x-f*p*d,this._w=c*u*d-f*p*x;break;case"XZY":this._x=f*u*d-c*p*x,this._y=c*p*d-f*u*x,this._z=c*u*x+f*p*d,this._w=c*u*d+f*p*x;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],s=t[4],a=t[8],o=t[1],r=t[5],l=t[9],c=t[2],u=t[6],d=t[10],f=i+r+d;if(f>0){const p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(u-l)*p,this._y=(a-c)*p,this._z=(o-s)*p}else if(i>r&&i>d){const p=2*Math.sqrt(1+i-r-d);this._w=(u-l)/p,this._x=.25*p,this._y=(s+o)/p,this._z=(a+c)/p}else if(r>d){const p=2*Math.sqrt(1+r-i-d);this._w=(a-c)/p,this._x=(s+o)/p,this._y=.25*p,this._z=(l+u)/p}else{const p=2*Math.sqrt(1+d-i-r);this._w=(o-s)/p,this._x=(a+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(et(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,s=e._y,a=e._z,o=e._w,r=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+o*r+s*c-a*l,this._y=s*u+o*l+a*r-i*c,this._z=a*u+o*c+i*l-s*r,this._w=o*u-i*r-s*l-a*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,s=this._y,a=this._z,o=this._w;let r=o*e._w+i*e._x+s*e._y+a*e._z;if(r<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,r=-r):this.copy(e),r>=1)return this._w=o,this._x=i,this._y=s,this._z=a,this;const l=1-r*r;if(l<=Number.EPSILON){const p=1-t;return this._w=p*o+t*this._w,this._x=p*i+t*this._x,this._y=p*s+t*this._y,this._z=p*a+t*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,r),d=Math.sin((1-t)*u)/c,f=Math.sin(t*u)/c;return this._w=o*d+this._w*f,this._x=i*d+this._x*f,this._y=s*d+this._y*f,this._z=a*d+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),a=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),a*Math.sin(t),a*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class V{constructor(e=0,t=0,i=0){V.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(md.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(md.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,s=this.z,a=e.elements;return this.x=a[0]*t+a[3]*i+a[6]*s,this.y=a[1]*t+a[4]*i+a[7]*s,this.z=a[2]*t+a[5]*i+a[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,a=e.elements,o=1/(a[3]*t+a[7]*i+a[11]*s+a[15]);return this.x=(a[0]*t+a[4]*i+a[8]*s+a[12])*o,this.y=(a[1]*t+a[5]*i+a[9]*s+a[13])*o,this.z=(a[2]*t+a[6]*i+a[10]*s+a[14])*o,this}applyQuaternion(e){const t=this.x,i=this.y,s=this.z,a=e.x,o=e.y,r=e.z,l=e.w,c=2*(o*s-r*i),u=2*(r*t-a*s),d=2*(a*i-o*t);return this.x=t+l*c+o*d-r*u,this.y=i+l*u+r*c-a*d,this.z=s+l*d+a*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,s=this.z,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*s,this.y=a[1]*t+a[5]*i+a[9]*s,this.z=a[2]*t+a[6]*i+a[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=et(this.x,e.x,t.x),this.y=et(this.y,e.y,t.y),this.z=et(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=et(this.x,e,t),this.y=et(this.y,e,t),this.z=et(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(et(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,s=e.y,a=e.z,o=t.x,r=t.y,l=t.z;return this.x=s*l-a*r,this.y=a*o-i*l,this.z=i*r-s*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return po.copy(this).projectOnVector(e),this.sub(po)}reflect(e){return this.sub(po.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(et(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const po=new V,md=new Yi;class Ke{constructor(e,t,i,s,a,o,r,l,c){Ke.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,a,o,r,l,c)}set(e,t,i,s,a,o,r,l,c){const u=this.elements;return u[0]=e,u[1]=s,u[2]=r,u[3]=t,u[4]=a,u[5]=l,u[6]=i,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,a=this.elements,o=i[0],r=i[3],l=i[6],c=i[1],u=i[4],d=i[7],f=i[2],p=i[5],x=i[8],y=s[0],m=s[3],h=s[6],P=s[1],w=s[4],b=s[7],C=s[2],S=s[5],R=s[8];return a[0]=o*y+r*P+l*C,a[3]=o*m+r*w+l*S,a[6]=o*h+r*b+l*R,a[1]=c*y+u*P+d*C,a[4]=c*m+u*w+d*S,a[7]=c*h+u*b+d*R,a[2]=f*y+p*P+x*C,a[5]=f*m+p*w+x*S,a[8]=f*h+p*b+x*R,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],s=e[2],a=e[3],o=e[4],r=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*r*c-i*a*u+i*r*l+s*a*c-s*o*l}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],a=e[3],o=e[4],r=e[5],l=e[6],c=e[7],u=e[8],d=u*o-r*c,f=r*l-u*a,p=c*a-o*l,x=t*d+i*f+s*p;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);const y=1/x;return e[0]=d*y,e[1]=(s*c-u*i)*y,e[2]=(r*i-s*o)*y,e[3]=f*y,e[4]=(u*t-s*l)*y,e[5]=(s*a-r*t)*y,e[6]=p*y,e[7]=(i*l-c*t)*y,e[8]=(o*t-i*a)*y,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,a,o,r){const l=Math.cos(a),c=Math.sin(a);return this.set(i*l,i*c,-i*(l*o+c*r)+o+e,-s*c,s*l,-s*(-c*o+l*r)+r+t,0,0,1),this}scale(e,t){return this.premultiply(mo.makeScale(e,t)),this}rotate(e){return this.premultiply(mo.makeRotation(-e)),this}translate(e,t){return this.premultiply(mo.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const mo=new Ke;function Nf(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Lr(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function W_(){const n=Lr("canvas");return n.style.display="block",n}const gd={};function Sa(n){n in gd||(gd[n]=!0,console.warn(n))}function j_(n,e,t){return new Promise(function(i,s){function a(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(a,t);break;default:i()}}setTimeout(a,t)})}const _d=new Ke().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),vd=new Ke().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function $_(){const n={enabled:!0,workingColorSpace:Vs,spaces:{},convert:function(s,a,o){return this.enabled===!1||a===o||!a||!o||(this.spaces[a].transfer===ht&&(s.r=ai(s.r),s.g=ai(s.g),s.b=ai(s.b)),this.spaces[a].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[a].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===ht&&(s.r=Ns(s.r),s.g=Ns(s.g),s.b=Ns(s.b))),s},workingToColorSpace:function(s,a){return this.convert(s,this.workingColorSpace,a)},colorSpaceToWorking:function(s,a){return this.convert(s,a,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===xi?Dr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,a=this.workingColorSpace){return s.fromArray(this.spaces[a].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,a,o){return s.copy(this.spaces[a].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,a){return Sa("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,a)},toWorkingColorSpace:function(s,a){return Sa("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,a)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Vs]:{primaries:e,whitePoint:i,transfer:Dr,toXYZ:_d,fromXYZ:vd,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:gn},outputColorSpaceConfig:{drawingBufferColorSpace:gn}},[gn]:{primaries:e,whitePoint:i,transfer:ht,toXYZ:_d,fromXYZ:vd,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:gn}}}),n}const rt=$_();function ai(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Ns(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let rs;class X_{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{rs===void 0&&(rs=Lr("canvas")),rs.width=e.width,rs.height=e.height;const s=rs.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),i=rs}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Lr("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),a=s.data;for(let o=0;o<a.length;o++)a[o]=ai(a[o]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(ai(t[i]/255)*255):t[i]=ai(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Y_=0;class Sc{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Y_++}),this.uuid=Ei(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let a;if(Array.isArray(s)){a=[];for(let o=0,r=s.length;o<r;o++)s[o].isDataTexture?a.push(go(s[o].image)):a.push(go(s[o]))}else a=go(s);i.url=a}return t||(e.images[this.uuid]=i),i}}function go(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?X_.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let K_=0;const _o=new V;class Qt extends Qi{constructor(e=Qt.DEFAULT_IMAGE,t=Qt.DEFAULT_MAPPING,i=Wi,s=Wi,a=Bn,o=ji,r=Tn,l=Gn,c=Qt.DEFAULT_ANISOTROPY,u=xi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:K_++}),this.uuid=Ei(),this.name="",this.source=new Sc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=a,this.minFilter=o,this.anisotropy=c,this.format=r,this.internalFormat=null,this.type=l,this.offset=new Be(0,0),this.repeat=new Be(1,1),this.center=new Be(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ke,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(_o).x}get height(){return this.source.getSize(_o).y}get depth(){return this.source.getSize(_o).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Ef)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case gl:e.x=e.x-Math.floor(e.x);break;case Wi:e.x=e.x<0?0:1;break;case _l:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case gl:e.y=e.y-Math.floor(e.y);break;case Wi:e.y=e.y<0?0:1;break;case _l:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Qt.DEFAULT_IMAGE=null;Qt.DEFAULT_MAPPING=Ef;Qt.DEFAULT_ANISOTROPY=1;class Pt{constructor(e=0,t=0,i=0,s=1){Pt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,a=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*s+o[12]*a,this.y=o[1]*t+o[5]*i+o[9]*s+o[13]*a,this.z=o[2]*t+o[6]*i+o[10]*s+o[14]*a,this.w=o[3]*t+o[7]*i+o[11]*s+o[15]*a,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,a;const l=e.elements,c=l[0],u=l[4],d=l[8],f=l[1],p=l[5],x=l[9],y=l[2],m=l[6],h=l[10];if(Math.abs(u-f)<.01&&Math.abs(d-y)<.01&&Math.abs(x-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(d+y)<.1&&Math.abs(x+m)<.1&&Math.abs(c+p+h-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const w=(c+1)/2,b=(p+1)/2,C=(h+1)/2,S=(u+f)/4,R=(d+y)/4,U=(x+m)/4;return w>b&&w>C?w<.01?(i=0,s=.707106781,a=.707106781):(i=Math.sqrt(w),s=S/i,a=R/i):b>C?b<.01?(i=.707106781,s=0,a=.707106781):(s=Math.sqrt(b),i=S/s,a=U/s):C<.01?(i=.707106781,s=.707106781,a=0):(a=Math.sqrt(C),i=R/a,s=U/a),this.set(i,s,a,t),this}let P=Math.sqrt((m-x)*(m-x)+(d-y)*(d-y)+(f-u)*(f-u));return Math.abs(P)<.001&&(P=1),this.x=(m-x)/P,this.y=(d-y)/P,this.z=(f-u)/P,this.w=Math.acos((c+p+h-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=et(this.x,e.x,t.x),this.y=et(this.y,e.y,t.y),this.z=et(this.z,e.z,t.z),this.w=et(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=et(this.x,e,t),this.y=et(this.y,e,t),this.z=et(this.z,e,t),this.w=et(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(et(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Z_ extends Qi{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Bn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new Pt(0,0,e,t),this.scissorTest=!1,this.viewport=new Pt(0,0,e,t);const s={width:e,height:t,depth:i.depth},a=new Qt(s);this.textures=[];const o=i.count;for(let r=0;r<o;r++)this.textures[r]=a.clone(),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){const t={minFilter:Bn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,a=this.textures.length;s<a;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new Sc(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ki extends Z_{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Ff extends Qt{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Cn,this.minFilter=Cn,this.wrapR=Wi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class J_ extends Qt{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Cn,this.minFilter=Cn,this.wrapR=Wi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Pa{constructor(e=new V(1/0,1/0,1/0),t=new V(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(yn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(yn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=yn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const a=i.getAttribute("position");if(t===!0&&a!==void 0&&e.isInstancedMesh!==!0)for(let o=0,r=a.count;o<r;o++)e.isMesh===!0?e.getVertexPosition(o,yn):yn.fromBufferAttribute(a,o),yn.applyMatrix4(e.matrixWorld),this.expandByPoint(yn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),za.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),za.copy(i.boundingBox)),za.applyMatrix4(e.matrixWorld),this.union(za)}const s=e.children;for(let a=0,o=s.length;a<o;a++)this.expandByObject(s[a],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,yn),yn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ys),Ha.subVectors(this.max,Ys),os.subVectors(e.a,Ys),ls.subVectors(e.b,Ys),cs.subVectors(e.c,Ys),ci.subVectors(ls,os),di.subVectors(cs,ls),Ui.subVectors(os,cs);let t=[0,-ci.z,ci.y,0,-di.z,di.y,0,-Ui.z,Ui.y,ci.z,0,-ci.x,di.z,0,-di.x,Ui.z,0,-Ui.x,-ci.y,ci.x,0,-di.y,di.x,0,-Ui.y,Ui.x,0];return!vo(t,os,ls,cs,Ha)||(t=[1,0,0,0,1,0,0,0,1],!vo(t,os,ls,cs,Ha))?!1:(Va.crossVectors(ci,di),t=[Va.x,Va.y,Va.z],vo(t,os,ls,cs,Ha))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,yn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(yn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Xn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Xn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Xn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Xn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Xn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Xn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Xn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Xn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Xn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Xn=[new V,new V,new V,new V,new V,new V,new V,new V],yn=new V,za=new Pa,os=new V,ls=new V,cs=new V,ci=new V,di=new V,Ui=new V,Ys=new V,Ha=new V,Va=new V,Ni=new V;function vo(n,e,t,i,s){for(let a=0,o=n.length-3;a<=o;a+=3){Ni.fromArray(n,a);const r=s.x*Math.abs(Ni.x)+s.y*Math.abs(Ni.y)+s.z*Math.abs(Ni.z),l=e.dot(Ni),c=t.dot(Ni),u=i.dot(Ni);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>r)return!1}return!0}const Q_=new Pa,Ks=new V,bo=new V;class Kr{constructor(e=new V,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):Q_.setFromPoints(e).getCenter(i);let s=0;for(let a=0,o=e.length;a<o;a++)s=Math.max(s,i.distanceToSquared(e[a]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ks.subVectors(e,this.center);const t=Ks.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(Ks,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(bo.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ks.copy(e.center).add(bo)),this.expandByPoint(Ks.copy(e.center).sub(bo))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const Yn=new V,xo=new V,ka=new V,ui=new V,yo=new V,Ga=new V,So=new V;class Zr{constructor(e=new V,t=new V(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Yn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Yn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Yn.copy(this.origin).addScaledVector(this.direction,t),Yn.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){xo.copy(e).add(t).multiplyScalar(.5),ka.copy(t).sub(e).normalize(),ui.copy(this.origin).sub(xo);const a=e.distanceTo(t)*.5,o=-this.direction.dot(ka),r=ui.dot(this.direction),l=-ui.dot(ka),c=ui.lengthSq(),u=Math.abs(1-o*o);let d,f,p,x;if(u>0)if(d=o*l-r,f=o*r-l,x=a*u,d>=0)if(f>=-x)if(f<=x){const y=1/u;d*=y,f*=y,p=d*(d+o*f+2*r)+f*(o*d+f+2*l)+c}else f=a,d=Math.max(0,-(o*f+r)),p=-d*d+f*(f+2*l)+c;else f=-a,d=Math.max(0,-(o*f+r)),p=-d*d+f*(f+2*l)+c;else f<=-x?(d=Math.max(0,-(-o*a+r)),f=d>0?-a:Math.min(Math.max(-a,-l),a),p=-d*d+f*(f+2*l)+c):f<=x?(d=0,f=Math.min(Math.max(-a,-l),a),p=f*(f+2*l)+c):(d=Math.max(0,-(o*a+r)),f=d>0?a:Math.min(Math.max(-a,-l),a),p=-d*d+f*(f+2*l)+c);else f=o>0?-a:a,d=Math.max(0,-(o*f+r)),p=-d*d+f*(f+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(xo).addScaledVector(ka,f),p}intersectSphere(e,t){Yn.subVectors(e.center,this.origin);const i=Yn.dot(this.direction),s=Yn.dot(Yn)-i*i,a=e.radius*e.radius;if(s>a)return null;const o=Math.sqrt(a-s),r=i-o,l=i+o;return l<0?null:r<0?this.at(l,t):this.at(r,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,a,o,r,l;const c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,f=this.origin;return c>=0?(i=(e.min.x-f.x)*c,s=(e.max.x-f.x)*c):(i=(e.max.x-f.x)*c,s=(e.min.x-f.x)*c),u>=0?(a=(e.min.y-f.y)*u,o=(e.max.y-f.y)*u):(a=(e.max.y-f.y)*u,o=(e.min.y-f.y)*u),i>o||a>s||((a>i||isNaN(i))&&(i=a),(o<s||isNaN(s))&&(s=o),d>=0?(r=(e.min.z-f.z)*d,l=(e.max.z-f.z)*d):(r=(e.max.z-f.z)*d,l=(e.min.z-f.z)*d),i>l||r>s)||((r>i||i!==i)&&(i=r),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,Yn)!==null}intersectTriangle(e,t,i,s,a){yo.subVectors(t,e),Ga.subVectors(i,e),So.crossVectors(yo,Ga);let o=this.direction.dot(So),r;if(o>0){if(s)return null;r=1}else if(o<0)r=-1,o=-o;else return null;ui.subVectors(this.origin,e);const l=r*this.direction.dot(Ga.crossVectors(ui,Ga));if(l<0)return null;const c=r*this.direction.dot(yo.cross(ui));if(c<0||l+c>o)return null;const u=-r*ui.dot(So);return u<0?null:this.at(u/o,a)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class At{constructor(e,t,i,s,a,o,r,l,c,u,d,f,p,x,y,m){At.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,a,o,r,l,c,u,d,f,p,x,y,m)}set(e,t,i,s,a,o,r,l,c,u,d,f,p,x,y,m){const h=this.elements;return h[0]=e,h[4]=t,h[8]=i,h[12]=s,h[1]=a,h[5]=o,h[9]=r,h[13]=l,h[2]=c,h[6]=u,h[10]=d,h[14]=f,h[3]=p,h[7]=x,h[11]=y,h[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new At().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,s=1/ds.setFromMatrixColumn(e,0).length(),a=1/ds.setFromMatrixColumn(e,1).length(),o=1/ds.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*a,t[5]=i[5]*a,t[6]=i[6]*a,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,s=e.y,a=e.z,o=Math.cos(i),r=Math.sin(i),l=Math.cos(s),c=Math.sin(s),u=Math.cos(a),d=Math.sin(a);if(e.order==="XYZ"){const f=o*u,p=o*d,x=r*u,y=r*d;t[0]=l*u,t[4]=-l*d,t[8]=c,t[1]=p+x*c,t[5]=f-y*c,t[9]=-r*l,t[2]=y-f*c,t[6]=x+p*c,t[10]=o*l}else if(e.order==="YXZ"){const f=l*u,p=l*d,x=c*u,y=c*d;t[0]=f+y*r,t[4]=x*r-p,t[8]=o*c,t[1]=o*d,t[5]=o*u,t[9]=-r,t[2]=p*r-x,t[6]=y+f*r,t[10]=o*l}else if(e.order==="ZXY"){const f=l*u,p=l*d,x=c*u,y=c*d;t[0]=f-y*r,t[4]=-o*d,t[8]=x+p*r,t[1]=p+x*r,t[5]=o*u,t[9]=y-f*r,t[2]=-o*c,t[6]=r,t[10]=o*l}else if(e.order==="ZYX"){const f=o*u,p=o*d,x=r*u,y=r*d;t[0]=l*u,t[4]=x*c-p,t[8]=f*c+y,t[1]=l*d,t[5]=y*c+f,t[9]=p*c-x,t[2]=-c,t[6]=r*l,t[10]=o*l}else if(e.order==="YZX"){const f=o*l,p=o*c,x=r*l,y=r*c;t[0]=l*u,t[4]=y-f*d,t[8]=x*d+p,t[1]=d,t[5]=o*u,t[9]=-r*u,t[2]=-c*u,t[6]=p*d+x,t[10]=f-y*d}else if(e.order==="XZY"){const f=o*l,p=o*c,x=r*l,y=r*c;t[0]=l*u,t[4]=-d,t[8]=c*u,t[1]=f*d+y,t[5]=o*u,t[9]=p*d-x,t[2]=x*d-p,t[6]=r*u,t[10]=y*d+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(ev,e,tv)}lookAt(e,t,i){const s=this.elements;return on.subVectors(e,t),on.lengthSq()===0&&(on.z=1),on.normalize(),fi.crossVectors(i,on),fi.lengthSq()===0&&(Math.abs(i.z)===1?on.x+=1e-4:on.z+=1e-4,on.normalize(),fi.crossVectors(i,on)),fi.normalize(),qa.crossVectors(on,fi),s[0]=fi.x,s[4]=qa.x,s[8]=on.x,s[1]=fi.y,s[5]=qa.y,s[9]=on.y,s[2]=fi.z,s[6]=qa.z,s[10]=on.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,a=this.elements,o=i[0],r=i[4],l=i[8],c=i[12],u=i[1],d=i[5],f=i[9],p=i[13],x=i[2],y=i[6],m=i[10],h=i[14],P=i[3],w=i[7],b=i[11],C=i[15],S=s[0],R=s[4],U=s[8],T=s[12],A=s[1],F=s[5],j=s[9],Y=s[13],ce=s[2],ae=s[6],Q=s[10],ie=s[14],G=s[3],ve=s[7],Te=s[11],Ie=s[15];return a[0]=o*S+r*A+l*ce+c*G,a[4]=o*R+r*F+l*ae+c*ve,a[8]=o*U+r*j+l*Q+c*Te,a[12]=o*T+r*Y+l*ie+c*Ie,a[1]=u*S+d*A+f*ce+p*G,a[5]=u*R+d*F+f*ae+p*ve,a[9]=u*U+d*j+f*Q+p*Te,a[13]=u*T+d*Y+f*ie+p*Ie,a[2]=x*S+y*A+m*ce+h*G,a[6]=x*R+y*F+m*ae+h*ve,a[10]=x*U+y*j+m*Q+h*Te,a[14]=x*T+y*Y+m*ie+h*Ie,a[3]=P*S+w*A+b*ce+C*G,a[7]=P*R+w*F+b*ae+C*ve,a[11]=P*U+w*j+b*Q+C*Te,a[15]=P*T+w*Y+b*ie+C*Ie,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],s=e[8],a=e[12],o=e[1],r=e[5],l=e[9],c=e[13],u=e[2],d=e[6],f=e[10],p=e[14],x=e[3],y=e[7],m=e[11],h=e[15];return x*(+a*l*d-s*c*d-a*r*f+i*c*f+s*r*p-i*l*p)+y*(+t*l*p-t*c*f+a*o*f-s*o*p+s*c*u-a*l*u)+m*(+t*c*d-t*r*p-a*o*d+i*o*p+a*r*u-i*c*u)+h*(-s*r*u-t*l*d+t*r*f+s*o*d-i*o*f+i*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],a=e[3],o=e[4],r=e[5],l=e[6],c=e[7],u=e[8],d=e[9],f=e[10],p=e[11],x=e[12],y=e[13],m=e[14],h=e[15],P=d*m*c-y*f*c+y*l*p-r*m*p-d*l*h+r*f*h,w=x*f*c-u*m*c-x*l*p+o*m*p+u*l*h-o*f*h,b=u*y*c-x*d*c+x*r*p-o*y*p-u*r*h+o*d*h,C=x*d*l-u*y*l-x*r*f+o*y*f+u*r*m-o*d*m,S=t*P+i*w+s*b+a*C;if(S===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/S;return e[0]=P*R,e[1]=(y*f*a-d*m*a-y*s*p+i*m*p+d*s*h-i*f*h)*R,e[2]=(r*m*a-y*l*a+y*s*c-i*m*c-r*s*h+i*l*h)*R,e[3]=(d*l*a-r*f*a-d*s*c+i*f*c+r*s*p-i*l*p)*R,e[4]=w*R,e[5]=(u*m*a-x*f*a+x*s*p-t*m*p-u*s*h+t*f*h)*R,e[6]=(x*l*a-o*m*a-x*s*c+t*m*c+o*s*h-t*l*h)*R,e[7]=(o*f*a-u*l*a+u*s*c-t*f*c-o*s*p+t*l*p)*R,e[8]=b*R,e[9]=(x*d*a-u*y*a-x*i*p+t*y*p+u*i*h-t*d*h)*R,e[10]=(o*y*a-x*r*a+x*i*c-t*y*c-o*i*h+t*r*h)*R,e[11]=(u*r*a-o*d*a-u*i*c+t*d*c+o*i*p-t*r*p)*R,e[12]=C*R,e[13]=(u*y*s-x*d*s+x*i*f-t*y*f-u*i*m+t*d*m)*R,e[14]=(x*r*s-o*y*s-x*i*l+t*y*l+o*i*m-t*r*m)*R,e[15]=(o*d*s-u*r*s+u*i*l-t*d*l-o*i*f+t*r*f)*R,this}scale(e){const t=this.elements,i=e.x,s=e.y,a=e.z;return t[0]*=i,t[4]*=s,t[8]*=a,t[1]*=i,t[5]*=s,t[9]*=a,t[2]*=i,t[6]*=s,t[10]*=a,t[3]*=i,t[7]*=s,t[11]*=a,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),s=Math.sin(t),a=1-i,o=e.x,r=e.y,l=e.z,c=a*o,u=a*r;return this.set(c*o+i,c*r-s*l,c*l+s*r,0,c*r+s*l,u*r+i,u*l-s*o,0,c*l-s*r,u*l+s*o,a*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,a,o){return this.set(1,i,a,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){const s=this.elements,a=t._x,o=t._y,r=t._z,l=t._w,c=a+a,u=o+o,d=r+r,f=a*c,p=a*u,x=a*d,y=o*u,m=o*d,h=r*d,P=l*c,w=l*u,b=l*d,C=i.x,S=i.y,R=i.z;return s[0]=(1-(y+h))*C,s[1]=(p+b)*C,s[2]=(x-w)*C,s[3]=0,s[4]=(p-b)*S,s[5]=(1-(f+h))*S,s[6]=(m+P)*S,s[7]=0,s[8]=(x+w)*R,s[9]=(m-P)*R,s[10]=(1-(f+y))*R,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){const s=this.elements;let a=ds.set(s[0],s[1],s[2]).length();const o=ds.set(s[4],s[5],s[6]).length(),r=ds.set(s[8],s[9],s[10]).length();this.determinant()<0&&(a=-a),e.x=s[12],e.y=s[13],e.z=s[14],Sn.copy(this);const c=1/a,u=1/o,d=1/r;return Sn.elements[0]*=c,Sn.elements[1]*=c,Sn.elements[2]*=c,Sn.elements[4]*=u,Sn.elements[5]*=u,Sn.elements[6]*=u,Sn.elements[8]*=d,Sn.elements[9]*=d,Sn.elements[10]*=d,t.setFromRotationMatrix(Sn),i.x=a,i.y=o,i.z=r,this}makePerspective(e,t,i,s,a,o,r=zn,l=!1){const c=this.elements,u=2*a/(t-e),d=2*a/(i-s),f=(t+e)/(t-e),p=(i+s)/(i-s);let x,y;if(l)x=a/(o-a),y=o*a/(o-a);else if(r===zn)x=-(o+a)/(o-a),y=-2*o*a/(o-a);else if(r===Ir)x=-o/(o-a),y=-o*a/(o-a);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+r);return c[0]=u,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=d,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=x,c[14]=y,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,s,a,o,r=zn,l=!1){const c=this.elements,u=2/(t-e),d=2/(i-s),f=-(t+e)/(t-e),p=-(i+s)/(i-s);let x,y;if(l)x=1/(o-a),y=o/(o-a);else if(r===zn)x=-2/(o-a),y=-(o+a)/(o-a);else if(r===Ir)x=-1/(o-a),y=-a/(o-a);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+r);return c[0]=u,c[4]=0,c[8]=0,c[12]=f,c[1]=0,c[5]=d,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=x,c[14]=y,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const ds=new V,Sn=new At,ev=new V(0,0,0),tv=new V(1,1,1),fi=new V,qa=new V,on=new V,bd=new At,xd=new Yi;class qn{constructor(e=0,t=0,i=0,s=qn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const s=e.elements,a=s[0],o=s[4],r=s[8],l=s[1],c=s[5],u=s[9],d=s[2],f=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(et(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-o,a)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-et(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(r,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,a),this._z=0);break;case"ZXY":this._x=Math.asin(et(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,a));break;case"ZYX":this._y=Math.asin(-et(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(l,a)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(et(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,a)):(this._x=0,this._y=Math.atan2(r,p));break;case"XZY":this._z=Math.asin(-et(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(r,a)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return bd.makeRotationFromQuaternion(e),this.setFromRotationMatrix(bd,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return xd.setFromEuler(this),this.setFromQuaternion(xd,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}qn.DEFAULT_ORDER="XYZ";class Mc{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let nv=0;const yd=new V,us=new Yi,Kn=new At,Wa=new V,Zs=new V,iv=new V,sv=new Yi,Sd=new V(1,0,0),Md=new V(0,1,0),Ed=new V(0,0,1),Td={type:"added"},av={type:"removed"},fs={type:"childadded",child:null},Mo={type:"childremoved",child:null};class Bt extends Qi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:nv++}),this.uuid=Ei(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Bt.DEFAULT_UP.clone();const e=new V,t=new qn,i=new Yi,s=new V(1,1,1);function a(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(a),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new At},normalMatrix:{value:new Ke}}),this.matrix=new At,this.matrixWorld=new At,this.matrixAutoUpdate=Bt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Bt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Mc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return us.setFromAxisAngle(e,t),this.quaternion.multiply(us),this}rotateOnWorldAxis(e,t){return us.setFromAxisAngle(e,t),this.quaternion.premultiply(us),this}rotateX(e){return this.rotateOnAxis(Sd,e)}rotateY(e){return this.rotateOnAxis(Md,e)}rotateZ(e){return this.rotateOnAxis(Ed,e)}translateOnAxis(e,t){return yd.copy(e).applyQuaternion(this.quaternion),this.position.add(yd.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Sd,e)}translateY(e){return this.translateOnAxis(Md,e)}translateZ(e){return this.translateOnAxis(Ed,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Kn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Wa.copy(e):Wa.set(e,t,i);const s=this.parent;this.updateWorldMatrix(!0,!1),Zs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Kn.lookAt(Zs,Wa,this.up):Kn.lookAt(Wa,Zs,this.up),this.quaternion.setFromRotationMatrix(Kn),s&&(Kn.extractRotation(s.matrixWorld),us.setFromRotationMatrix(Kn),this.quaternion.premultiply(us.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Td),fs.child=e,this.dispatchEvent(fs),fs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(av),Mo.child=e,this.dispatchEvent(Mo),Mo.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Kn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Kn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Kn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Td),fs.child=e,this.dispatchEvent(fs),fs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){const o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const s=this.children;for(let a=0,o=s.length;a<o;a++)s[a].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Zs,e,iv),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Zs,sv,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let a=0,o=s.length;a<o;a++)s[a].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(r=>({...r,boundingBox:r.boundingBox?r.boundingBox.toJSON():void 0,boundingSphere:r.boundingSphere?r.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(r=>({...r})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function a(r,l){return r[l.uuid]===void 0&&(r[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=a(e.geometries,this.geometry);const r=this.geometry.parameters;if(r!==void 0&&r.shapes!==void 0){const l=r.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const d=l[c];a(e.shapes,d)}else a(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const r=[];for(let l=0,c=this.material.length;l<c;l++)r.push(a(e.materials,this.material[l]));s.material=r}else s.material=a(e.materials,this.material);if(this.children.length>0){s.children=[];for(let r=0;r<this.children.length;r++)s.children.push(this.children[r].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let r=0;r<this.animations.length;r++){const l=this.animations[r];s.animations.push(a(e.animations,l))}}if(t){const r=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),d=o(e.shapes),f=o(e.skeletons),p=o(e.animations),x=o(e.nodes);r.length>0&&(i.geometries=r),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),d.length>0&&(i.shapes=d),f.length>0&&(i.skeletons=f),p.length>0&&(i.animations=p),x.length>0&&(i.nodes=x)}return i.object=s,i;function o(r){const l=[];for(const c in r){const u=r[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}}Bt.DEFAULT_UP=new V(0,1,0);Bt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Bt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Mn=new V,Zn=new V,Eo=new V,Jn=new V,hs=new V,ps=new V,Ad=new V,To=new V,Ao=new V,wo=new V,Co=new Pt,Ro=new Pt,Po=new Pt;class vn{constructor(e=new V,t=new V,i=new V){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),Mn.subVectors(e,t),s.cross(Mn);const a=s.lengthSq();return a>0?s.multiplyScalar(1/Math.sqrt(a)):s.set(0,0,0)}static getBarycoord(e,t,i,s,a){Mn.subVectors(s,t),Zn.subVectors(i,t),Eo.subVectors(e,t);const o=Mn.dot(Mn),r=Mn.dot(Zn),l=Mn.dot(Eo),c=Zn.dot(Zn),u=Zn.dot(Eo),d=o*c-r*r;if(d===0)return a.set(0,0,0),null;const f=1/d,p=(c*l-r*u)*f,x=(o*u-r*l)*f;return a.set(1-p-x,x,p)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,Jn)===null?!1:Jn.x>=0&&Jn.y>=0&&Jn.x+Jn.y<=1}static getInterpolation(e,t,i,s,a,o,r,l){return this.getBarycoord(e,t,i,s,Jn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(a,Jn.x),l.addScaledVector(o,Jn.y),l.addScaledVector(r,Jn.z),l)}static getInterpolatedAttribute(e,t,i,s,a,o){return Co.setScalar(0),Ro.setScalar(0),Po.setScalar(0),Co.fromBufferAttribute(e,t),Ro.fromBufferAttribute(e,i),Po.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(Co,a.x),o.addScaledVector(Ro,a.y),o.addScaledVector(Po,a.z),o}static isFrontFacing(e,t,i,s){return Mn.subVectors(i,t),Zn.subVectors(e,t),Mn.cross(Zn).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Mn.subVectors(this.c,this.b),Zn.subVectors(this.a,this.b),Mn.cross(Zn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return vn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return vn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,a){return vn.getInterpolation(e,this.a,this.b,this.c,t,i,s,a)}containsPoint(e){return vn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return vn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,s=this.b,a=this.c;let o,r;hs.subVectors(s,i),ps.subVectors(a,i),To.subVectors(e,i);const l=hs.dot(To),c=ps.dot(To);if(l<=0&&c<=0)return t.copy(i);Ao.subVectors(e,s);const u=hs.dot(Ao),d=ps.dot(Ao);if(u>=0&&d<=u)return t.copy(s);const f=l*d-u*c;if(f<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(i).addScaledVector(hs,o);wo.subVectors(e,a);const p=hs.dot(wo),x=ps.dot(wo);if(x>=0&&p<=x)return t.copy(a);const y=p*c-l*x;if(y<=0&&c>=0&&x<=0)return r=c/(c-x),t.copy(i).addScaledVector(ps,r);const m=u*x-p*d;if(m<=0&&d-u>=0&&p-x>=0)return Ad.subVectors(a,s),r=(d-u)/(d-u+(p-x)),t.copy(s).addScaledVector(Ad,r);const h=1/(m+y+f);return o=y*h,r=f*h,t.copy(i).addScaledVector(hs,o).addScaledVector(ps,r)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Of={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},hi={h:0,s:0,l:0},ja={h:0,s:0,l:0};function Do(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class it{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=gn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,rt.colorSpaceToWorking(this,t),this}setRGB(e,t,i,s=rt.workingColorSpace){return this.r=e,this.g=t,this.b=i,rt.colorSpaceToWorking(this,s),this}setHSL(e,t,i,s=rt.workingColorSpace){if(e=G_(e,1),t=et(t,0,1),i=et(i,0,1),t===0)this.r=this.g=this.b=i;else{const a=i<=.5?i*(1+t):i+t-i*t,o=2*i-a;this.r=Do(o,a,e+1/3),this.g=Do(o,a,e),this.b=Do(o,a,e-1/3)}return rt.colorSpaceToWorking(this,s),this}setStyle(e,t=gn){function i(a){a!==void 0&&parseFloat(a)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let a;const o=s[1],r=s[2];switch(o){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(r))return i(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,t);if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(r))return i(a[4]),this.setRGB(Math.min(100,parseInt(a[1],10))/100,Math.min(100,parseInt(a[2],10))/100,Math.min(100,parseInt(a[3],10))/100,t);break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(r))return i(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const a=s[1],o=a.length;if(o===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(a,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=gn){const i=Of[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ai(e.r),this.g=ai(e.g),this.b=ai(e.b),this}copyLinearToSRGB(e){return this.r=Ns(e.r),this.g=Ns(e.g),this.b=Ns(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=gn){return rt.workingToColorSpace(kt.copy(this),e),Math.round(et(kt.r*255,0,255))*65536+Math.round(et(kt.g*255,0,255))*256+Math.round(et(kt.b*255,0,255))}getHexString(e=gn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=rt.workingColorSpace){rt.workingToColorSpace(kt.copy(this),t);const i=kt.r,s=kt.g,a=kt.b,o=Math.max(i,s,a),r=Math.min(i,s,a);let l,c;const u=(r+o)/2;if(r===o)l=0,c=0;else{const d=o-r;switch(c=u<=.5?d/(o+r):d/(2-o-r),o){case i:l=(s-a)/d+(s<a?6:0);break;case s:l=(a-i)/d+2;break;case a:l=(i-s)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=rt.workingColorSpace){return rt.workingToColorSpace(kt.copy(this),t),e.r=kt.r,e.g=kt.g,e.b=kt.b,e}getStyle(e=gn){rt.workingToColorSpace(kt.copy(this),e);const t=kt.r,i=kt.g,s=kt.b;return e!==gn?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(hi),this.setHSL(hi.h+e,hi.s+t,hi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(hi),e.getHSL(ja);const i=ho(hi.h,ja.h,t),s=ho(hi.s,ja.s,t),a=ho(hi.l,ja.l,t);return this.setHSL(i,s,a),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,s=this.b,a=e.elements;return this.r=a[0]*t+a[3]*i+a[6]*s,this.g=a[1]*t+a[4]*i+a[7]*s,this.b=a[2]*t+a[5]*i+a[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const kt=new it;it.NAMES=Of;let rv=0;class es extends Qi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:rv++}),this.uuid=Ei(),this.name="",this.type="Material",this.blending=Us,this.side=Ci,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=al,this.blendDst=rl,this.blendEquation=ki,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new it(0,0,0),this.blendAlpha=0,this.depthFunc=Bs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=hd,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=as,this.stencilZFail=as,this.stencilZPass=as,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Us&&(i.blending=this.blending),this.side!==Ci&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==al&&(i.blendSrc=this.blendSrc),this.blendDst!==rl&&(i.blendDst=this.blendDst),this.blendEquation!==ki&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Bs&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==hd&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==as&&(i.stencilFail=this.stencilFail),this.stencilZFail!==as&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==as&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(a){const o=[];for(const r in a){const l=a[r];delete l.metadata,o.push(l)}return o}if(t){const a=s(e.textures),o=s(e.images);a.length>0&&(i.textures=a),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const s=t.length;i=new Array(s);for(let a=0;a!==s;++a)i[a]=t[a].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Ur extends es{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new it(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new qn,this.combine=Mf,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Dt=new V,$a=new Be;let ov=0;class Rn{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:ov++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=jl,this.updateRanges=[],this.gpuType=ii,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,a=this.itemSize;s<a;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)$a.fromBufferAttribute(this,t),$a.applyMatrix3(e),this.setXY(t,$a.x,$a.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Dt.fromBufferAttribute(this,t),Dt.applyMatrix3(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Dt.fromBufferAttribute(this,t),Dt.applyMatrix4(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Dt.fromBufferAttribute(this,t),Dt.applyNormalMatrix(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Dt.fromBufferAttribute(this,t),Dt.transformDirection(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Fn(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=pt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Fn(t,this.array)),t}setX(e,t){return this.normalized&&(t=pt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Fn(t,this.array)),t}setY(e,t){return this.normalized&&(t=pt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Fn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=pt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Fn(t,this.array)),t}setW(e,t){return this.normalized&&(t=pt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=pt(t,this.array),i=pt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=pt(t,this.array),i=pt(i,this.array),s=pt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,a){return e*=this.itemSize,this.normalized&&(t=pt(t,this.array),i=pt(i,this.array),s=pt(s,this.array),a=pt(a,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=a,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==jl&&(e.usage=this.usage),e}}class Bf extends Rn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class zf extends Rn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class Pn extends Rn{constructor(e,t,i){super(new Float32Array(e),t,i)}}let lv=0;const pn=new At,Io=new Bt,ms=new V,ln=new Pa,Js=new Pa,Ot=new V;class Dn extends Qi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:lv++}),this.uuid=Ei(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Nf(e)?zf:Bf)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const a=new Ke().getNormalMatrix(e);i.applyNormalMatrix(a),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return pn.makeRotationFromQuaternion(e),this.applyMatrix4(pn),this}rotateX(e){return pn.makeRotationX(e),this.applyMatrix4(pn),this}rotateY(e){return pn.makeRotationY(e),this.applyMatrix4(pn),this}rotateZ(e){return pn.makeRotationZ(e),this.applyMatrix4(pn),this}translate(e,t,i){return pn.makeTranslation(e,t,i),this.applyMatrix4(pn),this}scale(e,t,i){return pn.makeScale(e,t,i),this.applyMatrix4(pn),this}lookAt(e){return Io.lookAt(e),Io.updateMatrix(),this.applyMatrix4(Io.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ms).negate(),this.translate(ms.x,ms.y,ms.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let s=0,a=e.length;s<a;s++){const o=e[s];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Pn(i,3))}else{const i=Math.min(e.length,t.count);for(let s=0;s<i;s++){const a=e[s];t.setXYZ(s,a.x,a.y,a.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Pa);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new V(-1/0,-1/0,-1/0),new V(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){const a=t[i];ln.setFromBufferAttribute(a),this.morphTargetsRelative?(Ot.addVectors(this.boundingBox.min,ln.min),this.boundingBox.expandByPoint(Ot),Ot.addVectors(this.boundingBox.max,ln.max),this.boundingBox.expandByPoint(Ot)):(this.boundingBox.expandByPoint(ln.min),this.boundingBox.expandByPoint(ln.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Kr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new V,1/0);return}if(e){const i=this.boundingSphere.center;if(ln.setFromBufferAttribute(e),t)for(let a=0,o=t.length;a<o;a++){const r=t[a];Js.setFromBufferAttribute(r),this.morphTargetsRelative?(Ot.addVectors(ln.min,Js.min),ln.expandByPoint(Ot),Ot.addVectors(ln.max,Js.max),ln.expandByPoint(Ot)):(ln.expandByPoint(Js.min),ln.expandByPoint(Js.max))}ln.getCenter(i);let s=0;for(let a=0,o=e.count;a<o;a++)Ot.fromBufferAttribute(e,a),s=Math.max(s,i.distanceToSquared(Ot));if(t)for(let a=0,o=t.length;a<o;a++){const r=t[a],l=this.morphTargetsRelative;for(let c=0,u=r.count;c<u;c++)Ot.fromBufferAttribute(r,c),l&&(ms.fromBufferAttribute(e,c),Ot.add(ms)),s=Math.max(s,i.distanceToSquared(Ot))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,s=t.normal,a=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Rn(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),r=[],l=[];for(let U=0;U<i.count;U++)r[U]=new V,l[U]=new V;const c=new V,u=new V,d=new V,f=new Be,p=new Be,x=new Be,y=new V,m=new V;function h(U,T,A){c.fromBufferAttribute(i,U),u.fromBufferAttribute(i,T),d.fromBufferAttribute(i,A),f.fromBufferAttribute(a,U),p.fromBufferAttribute(a,T),x.fromBufferAttribute(a,A),u.sub(c),d.sub(c),p.sub(f),x.sub(f);const F=1/(p.x*x.y-x.x*p.y);isFinite(F)&&(y.copy(u).multiplyScalar(x.y).addScaledVector(d,-p.y).multiplyScalar(F),m.copy(d).multiplyScalar(p.x).addScaledVector(u,-x.x).multiplyScalar(F),r[U].add(y),r[T].add(y),r[A].add(y),l[U].add(m),l[T].add(m),l[A].add(m))}let P=this.groups;P.length===0&&(P=[{start:0,count:e.count}]);for(let U=0,T=P.length;U<T;++U){const A=P[U],F=A.start,j=A.count;for(let Y=F,ce=F+j;Y<ce;Y+=3)h(e.getX(Y+0),e.getX(Y+1),e.getX(Y+2))}const w=new V,b=new V,C=new V,S=new V;function R(U){C.fromBufferAttribute(s,U),S.copy(C);const T=r[U];w.copy(T),w.sub(C.multiplyScalar(C.dot(T))).normalize(),b.crossVectors(S,T);const F=b.dot(l[U])<0?-1:1;o.setXYZW(U,w.x,w.y,w.z,F)}for(let U=0,T=P.length;U<T;++U){const A=P[U],F=A.start,j=A.count;for(let Y=F,ce=F+j;Y<ce;Y+=3)R(e.getX(Y+0)),R(e.getX(Y+1)),R(e.getX(Y+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Rn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let f=0,p=i.count;f<p;f++)i.setXYZ(f,0,0,0);const s=new V,a=new V,o=new V,r=new V,l=new V,c=new V,u=new V,d=new V;if(e)for(let f=0,p=e.count;f<p;f+=3){const x=e.getX(f+0),y=e.getX(f+1),m=e.getX(f+2);s.fromBufferAttribute(t,x),a.fromBufferAttribute(t,y),o.fromBufferAttribute(t,m),u.subVectors(o,a),d.subVectors(s,a),u.cross(d),r.fromBufferAttribute(i,x),l.fromBufferAttribute(i,y),c.fromBufferAttribute(i,m),r.add(u),l.add(u),c.add(u),i.setXYZ(x,r.x,r.y,r.z),i.setXYZ(y,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,p=t.count;f<p;f+=3)s.fromBufferAttribute(t,f+0),a.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),u.subVectors(o,a),d.subVectors(s,a),u.cross(d),i.setXYZ(f+0,u.x,u.y,u.z),i.setXYZ(f+1,u.x,u.y,u.z),i.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Ot.fromBufferAttribute(e,t),Ot.normalize(),e.setXYZ(t,Ot.x,Ot.y,Ot.z)}toNonIndexed(){function e(r,l){const c=r.array,u=r.itemSize,d=r.normalized,f=new c.constructor(l.length*u);let p=0,x=0;for(let y=0,m=l.length;y<m;y++){r.isInterleavedBufferAttribute?p=l[y]*r.data.stride+r.offset:p=l[y]*u;for(let h=0;h<u;h++)f[x++]=c[p++]}return new Rn(f,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Dn,i=this.index.array,s=this.attributes;for(const r in s){const l=s[r],c=e(l,i);t.setAttribute(r,c)}const a=this.morphAttributes;for(const r in a){const l=[],c=a[r];for(let u=0,d=c.length;u<d;u++){const f=c[u],p=e(f,i);l.push(p)}t.morphAttributes[r]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let r=0,l=o.length;r<l;r++){const c=o[r];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let a=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let d=0,f=c.length;d<f;d++){const p=c[d];u.push(p.toJSON(e.data))}u.length>0&&(s[l]=u,a=!0)}a&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const r=this.boundingSphere;return r!==null&&(e.data.boundingSphere=r.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const s=e.attributes;for(const c in s){const u=s[c];this.setAttribute(c,u.clone(t))}const a=e.morphAttributes;for(const c in a){const u=[],d=a[c];for(let f=0,p=d.length;f<p;f++)u.push(d[f].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,u=o.length;c<u;c++){const d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}const r=e.boundingBox;r!==null&&(this.boundingBox=r.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const wd=new At,Fi=new Zr,Xa=new Kr,Cd=new V,Ya=new V,Ka=new V,Za=new V,Lo=new V,Ja=new V,Rd=new V,Qa=new V;class un extends Bt{constructor(e=new Dn,t=new Ur){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,o=s.length;a<o;a++){const r=s[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[r]=a}}}}getVertexPosition(e,t){const i=this.geometry,s=i.attributes.position,a=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(s,e);const r=this.morphTargetInfluences;if(a&&r){Ja.set(0,0,0);for(let l=0,c=a.length;l<c;l++){const u=r[l],d=a[l];u!==0&&(Lo.fromBufferAttribute(d,e),o?Ja.addScaledVector(Lo,u):Ja.addScaledVector(Lo.sub(t),u))}t.add(Ja)}return t}raycast(e,t){const i=this.geometry,s=this.material,a=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Xa.copy(i.boundingSphere),Xa.applyMatrix4(a),Fi.copy(e.ray).recast(e.near),!(Xa.containsPoint(Fi.origin)===!1&&(Fi.intersectSphere(Xa,Cd)===null||Fi.origin.distanceToSquared(Cd)>(e.far-e.near)**2))&&(wd.copy(a).invert(),Fi.copy(e.ray).applyMatrix4(wd),!(i.boundingBox!==null&&Fi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Fi)))}_computeIntersections(e,t,i){let s;const a=this.geometry,o=this.material,r=a.index,l=a.attributes.position,c=a.attributes.uv,u=a.attributes.uv1,d=a.attributes.normal,f=a.groups,p=a.drawRange;if(r!==null)if(Array.isArray(o))for(let x=0,y=f.length;x<y;x++){const m=f[x],h=o[m.materialIndex],P=Math.max(m.start,p.start),w=Math.min(r.count,Math.min(m.start+m.count,p.start+p.count));for(let b=P,C=w;b<C;b+=3){const S=r.getX(b),R=r.getX(b+1),U=r.getX(b+2);s=er(this,h,e,i,c,u,d,S,R,U),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const x=Math.max(0,p.start),y=Math.min(r.count,p.start+p.count);for(let m=x,h=y;m<h;m+=3){const P=r.getX(m),w=r.getX(m+1),b=r.getX(m+2);s=er(this,o,e,i,c,u,d,P,w,b),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let x=0,y=f.length;x<y;x++){const m=f[x],h=o[m.materialIndex],P=Math.max(m.start,p.start),w=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let b=P,C=w;b<C;b+=3){const S=b,R=b+1,U=b+2;s=er(this,h,e,i,c,u,d,S,R,U),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const x=Math.max(0,p.start),y=Math.min(l.count,p.start+p.count);for(let m=x,h=y;m<h;m+=3){const P=m,w=m+1,b=m+2;s=er(this,o,e,i,c,u,d,P,w,b),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function cv(n,e,t,i,s,a,o,r){let l;if(e.side===sn?l=i.intersectTriangle(o,a,s,!0,r):l=i.intersectTriangle(s,a,o,e.side===Ci,r),l===null)return null;Qa.copy(r),Qa.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(Qa);return c<t.near||c>t.far?null:{distance:c,point:Qa.clone(),object:n}}function er(n,e,t,i,s,a,o,r,l,c){n.getVertexPosition(r,Ya),n.getVertexPosition(l,Ka),n.getVertexPosition(c,Za);const u=cv(n,e,t,i,Ya,Ka,Za,Rd);if(u){const d=new V;vn.getBarycoord(Rd,Ya,Ka,Za,d),s&&(u.uv=vn.getInterpolatedAttribute(s,r,l,c,d,new Be)),a&&(u.uv1=vn.getInterpolatedAttribute(a,r,l,c,d,new Be)),o&&(u.normal=vn.getInterpolatedAttribute(o,r,l,c,d,new V),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const f={a:r,b:l,c,normal:new V,materialIndex:0};vn.getNormal(Ya,Ka,Za,f.normal),u.face=f,u.barycoord=d}return u}class qs extends Dn{constructor(e=1,t=1,i=1,s=1,a=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:a,depthSegments:o};const r=this;s=Math.floor(s),a=Math.floor(a),o=Math.floor(o);const l=[],c=[],u=[],d=[];let f=0,p=0;x("z","y","x",-1,-1,i,t,e,o,a,0),x("z","y","x",1,-1,i,t,-e,o,a,1),x("x","z","y",1,1,e,i,t,s,o,2),x("x","z","y",1,-1,e,i,-t,s,o,3),x("x","y","z",1,-1,e,t,i,s,a,4),x("x","y","z",-1,-1,e,t,-i,s,a,5),this.setIndex(l),this.setAttribute("position",new Pn(c,3)),this.setAttribute("normal",new Pn(u,3)),this.setAttribute("uv",new Pn(d,2));function x(y,m,h,P,w,b,C,S,R,U,T){const A=b/R,F=C/U,j=b/2,Y=C/2,ce=S/2,ae=R+1,Q=U+1;let ie=0,G=0;const ve=new V;for(let Te=0;Te<Q;Te++){const Ie=Te*F-Y;for(let ke=0;ke<ae;ke++){const ot=ke*A-j;ve[y]=ot*P,ve[m]=Ie*w,ve[h]=ce,c.push(ve.x,ve.y,ve.z),ve[y]=0,ve[m]=0,ve[h]=S>0?1:-1,u.push(ve.x,ve.y,ve.z),d.push(ke/R),d.push(1-Te/U),ie+=1}}for(let Te=0;Te<U;Te++)for(let Ie=0;Ie<R;Ie++){const ke=f+Ie+ae*Te,ot=f+Ie+ae*(Te+1),ut=f+(Ie+1)+ae*(Te+1),nt=f+(Ie+1)+ae*Te;l.push(ke,ot,nt),l.push(ot,ut,nt),G+=6}r.addGroup(p,G,T),p+=G,f+=ie}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new qs(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function ks(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const s=n[t][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone():Array.isArray(s)?e[t][i]=s.slice():e[t][i]=s}}return e}function Kt(n){const e={};for(let t=0;t<n.length;t++){const i=ks(n[t]);for(const s in i)e[s]=i[s]}return e}function dv(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Hf(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:rt.workingColorSpace}const uv={clone:ks,merge:Kt};var fv=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,hv=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ri extends es{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=fv,this.fragmentShader=hv,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ks(e.uniforms),this.uniformsGroups=dv(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class Vf extends Bt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new At,this.projectionMatrix=new At,this.projectionMatrixInverse=new At,this.coordinateSystem=zn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const pi=new V,Pd=new Be,Dd=new Be;class _n extends Vf{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=$l*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(xr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return $l*2*Math.atan(Math.tan(xr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){pi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(pi.x,pi.y).multiplyScalar(-e/pi.z),pi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(pi.x,pi.y).multiplyScalar(-e/pi.z)}getViewSize(e,t){return this.getViewBounds(e,Pd,Dd),t.subVectors(Dd,Pd)}setViewOffset(e,t,i,s,a,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=a,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(xr*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,a=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;a+=o.offsetX*s/l,t-=o.offsetY*i/c,s*=o.width/l,i*=o.height/c}const r=this.filmOffset;r!==0&&(a+=e*r/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+s,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const gs=-90,_s=1;class pv extends Bt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new _n(gs,_s,e,t);s.layers=this.layers,this.add(s);const a=new _n(gs,_s,e,t);a.layers=this.layers,this.add(a);const o=new _n(gs,_s,e,t);o.layers=this.layers,this.add(o);const r=new _n(gs,_s,e,t);r.layers=this.layers,this.add(r);const l=new _n(gs,_s,e,t);l.layers=this.layers,this.add(l);const c=new _n(gs,_s,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,s,a,o,r,l]=t;for(const c of t)this.remove(c);if(e===zn)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),r.up.set(0,1,0),r.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Ir)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),r.up.set(0,-1,0),r.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[a,o,r,l,c,u]=this.children,d=e.getRenderTarget(),f=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),x=e.xr.enabled;e.xr.enabled=!1;const y=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,s),e.render(t,a),e.setRenderTarget(i,1,s),e.render(t,o),e.setRenderTarget(i,2,s),e.render(t,r),e.setRenderTarget(i,3,s),e.render(t,l),e.setRenderTarget(i,4,s),e.render(t,c),i.texture.generateMipmaps=y,e.setRenderTarget(i,5,s),e.render(t,u),e.setRenderTarget(d,f,p),e.xr.enabled=x,i.texture.needsPMREMUpdate=!0}}class kf extends Qt{constructor(e=[],t=zs,i,s,a,o,r,l,c,u){super(e,t,i,s,a,o,r,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class mv extends Ki{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new kf(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new qs(5,5,5),a=new Ri({name:"CubemapFromEquirect",uniforms:ks(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:sn,blending:Si});a.uniforms.tEquirect.value=t;const o=new un(s,a),r=t.minFilter;return t.minFilter===ji&&(t.minFilter=Bn),new pv(1,10,this).update(e,o),t.minFilter=r,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,i=!0,s=!0){const a=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,s);e.setRenderTarget(a)}}class tr extends Bt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const gv={type:"move"};class Uo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new tr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new tr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new V,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new V),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new tr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new V,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new V),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,a=null,o=null;const r=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const y of e.hand.values()){const m=t.getJointPose(y,i),h=this._getHandJoint(c,y);m!==null&&(h.matrix.fromArray(m.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,h.jointRadius=m.radius),h.visible=m!==null}const u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],f=u.position.distanceTo(d.position),p=.02,x=.005;c.inputState.pinching&&f>p+x?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=p-x&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(a=t.getPose(e.gripSpace,i),a!==null&&(l.matrix.fromArray(a.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,a.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(a.linearVelocity)):l.hasLinearVelocity=!1,a.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(a.angularVelocity)):l.hasAngularVelocity=!1));r!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&a!==null&&(s=a),s!==null&&(r.matrix.fromArray(s.transform.matrix),r.matrix.decompose(r.position,r.rotation,r.scale),r.matrixWorldNeedsUpdate=!0,s.linearVelocity?(r.hasLinearVelocity=!0,r.linearVelocity.copy(s.linearVelocity)):r.hasLinearVelocity=!1,s.angularVelocity?(r.hasAngularVelocity=!0,r.angularVelocity.copy(s.angularVelocity)):r.hasAngularVelocity=!1,this.dispatchEvent(gv)))}return r!==null&&(r.visible=s!==null),l!==null&&(l.visible=a!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new tr;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class _v extends Bt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new qn,this.environmentIntensity=1,this.environmentRotation=new qn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class vv{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=jl,this.updateRanges=[],this.version=0,this.uuid=Ei()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let s=0,a=this.stride;s<a;s++)this.array[e+s]=t.array[i+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ei()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ei()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Xt=new V;class Nr{constructor(e,t,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)Xt.fromBufferAttribute(this,t),Xt.applyMatrix4(e),this.setXYZ(t,Xt.x,Xt.y,Xt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Xt.fromBufferAttribute(this,t),Xt.applyNormalMatrix(e),this.setXYZ(t,Xt.x,Xt.y,Xt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Xt.fromBufferAttribute(this,t),Xt.transformDirection(e),this.setXYZ(t,Xt.x,Xt.y,Xt.z);return this}getComponent(e,t){let i=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(i=Fn(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=pt(i,this.array)),this.data.array[e*this.data.stride+this.offset+t]=i,this}setX(e,t){return this.normalized&&(t=pt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=pt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=pt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=pt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Fn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Fn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Fn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Fn(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=pt(t,this.array),i=pt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=pt(t,this.array),i=pt(i,this.array),s=pt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this}setXYZW(e,t,i,s,a){return e=e*this.data.stride+this.offset,this.normalized&&(t=pt(t,this.array),i=pt(i,this.array),s=pt(s,this.array),a=pt(a,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this.data.array[e+3]=a,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let a=0;a<this.itemSize;a++)t.push(this.data.array[s+a])}return new Rn(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Nr(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let a=0;a<this.itemSize;a++)t.push(this.data.array[s+a])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Gf extends es{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new it(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let vs;const Qs=new V,bs=new V,xs=new V,ys=new Be,ea=new Be,qf=new At,nr=new V,ta=new V,ir=new V,Id=new Be,No=new Be,Ld=new Be;class bv extends Bt{constructor(e=new Gf){if(super(),this.isSprite=!0,this.type="Sprite",vs===void 0){vs=new Dn;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new vv(t,5);vs.setIndex([0,1,2,0,2,3]),vs.setAttribute("position",new Nr(i,3,0,!1)),vs.setAttribute("uv",new Nr(i,2,3,!1))}this.geometry=vs,this.material=e,this.center=new Be(.5,.5),this.count=1}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),bs.setFromMatrixScale(this.matrixWorld),qf.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),xs.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&bs.multiplyScalar(-xs.z);const i=this.material.rotation;let s,a;i!==0&&(a=Math.cos(i),s=Math.sin(i));const o=this.center;sr(nr.set(-.5,-.5,0),xs,o,bs,s,a),sr(ta.set(.5,-.5,0),xs,o,bs,s,a),sr(ir.set(.5,.5,0),xs,o,bs,s,a),Id.set(0,0),No.set(1,0),Ld.set(1,1);let r=e.ray.intersectTriangle(nr,ta,ir,!1,Qs);if(r===null&&(sr(ta.set(-.5,.5,0),xs,o,bs,s,a),No.set(0,1),r=e.ray.intersectTriangle(nr,ir,ta,!1,Qs),r===null))return;const l=e.ray.origin.distanceTo(Qs);l<e.near||l>e.far||t.push({distance:l,point:Qs.clone(),uv:vn.getInterpolation(Qs,nr,ta,ir,Id,No,Ld,new Be),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function sr(n,e,t,i,s,a){ys.subVectors(n,t).addScalar(.5).multiply(i),s!==void 0?(ea.x=a*ys.x-s*ys.y,ea.y=s*ys.x+a*ys.y):ea.copy(ys),n.copy(e),n.x+=ea.x,n.y+=ea.y,n.applyMatrix4(qf)}const Fo=new V,xv=new V,yv=new Ke;class vi{constructor(e=new V(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const s=Fo.subVectors(i,t).cross(xv.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(Fo),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return a<0||a>1?null:t.copy(e.start).addScaledVector(i,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||yv.getNormalMatrix(e),s=this.coplanarPoint(Fo).applyMatrix4(e),a=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(a),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Oi=new Kr,Sv=new Be(.5,.5),ar=new V;class Ec{constructor(e=new vi,t=new vi,i=new vi,s=new vi,a=new vi,o=new vi){this.planes=[e,t,i,s,a,o]}set(e,t,i,s,a,o){const r=this.planes;return r[0].copy(e),r[1].copy(t),r[2].copy(i),r[3].copy(s),r[4].copy(a),r[5].copy(o),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=zn,i=!1){const s=this.planes,a=e.elements,o=a[0],r=a[1],l=a[2],c=a[3],u=a[4],d=a[5],f=a[6],p=a[7],x=a[8],y=a[9],m=a[10],h=a[11],P=a[12],w=a[13],b=a[14],C=a[15];if(s[0].setComponents(c-o,p-u,h-x,C-P).normalize(),s[1].setComponents(c+o,p+u,h+x,C+P).normalize(),s[2].setComponents(c+r,p+d,h+y,C+w).normalize(),s[3].setComponents(c-r,p-d,h-y,C-w).normalize(),i)s[4].setComponents(l,f,m,b).normalize(),s[5].setComponents(c-l,p-f,h-m,C-b).normalize();else if(s[4].setComponents(c-l,p-f,h-m,C-b).normalize(),t===zn)s[5].setComponents(c+l,p+f,h+m,C+b).normalize();else if(t===Ir)s[5].setComponents(l,f,m,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Oi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Oi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Oi)}intersectsSprite(e){Oi.center.set(0,0,0);const t=Sv.distanceTo(e.center);return Oi.radius=.7071067811865476+t,Oi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Oi)}intersectsSphere(e){const t=this.planes,i=e.center,s=-e.radius;for(let a=0;a<6;a++)if(t[a].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const s=t[i];if(ar.x=s.normal.x>0?e.max.x:e.min.x,ar.y=s.normal.y>0?e.max.y:e.min.y,ar.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(ar)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Wf extends es{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new it(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Fr=new V,Or=new V,Ud=new At,na=new Zr,rr=new Kr,Oo=new V,Nd=new V;class Mv extends Bt{constructor(e=new Dn,t=new Wf){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let s=1,a=t.count;s<a;s++)Fr.fromBufferAttribute(t,s-1),Or.fromBufferAttribute(t,s),i[s]=i[s-1],i[s]+=Fr.distanceTo(Or);e.setAttribute("lineDistance",new Pn(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,a=e.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),rr.copy(i.boundingSphere),rr.applyMatrix4(s),rr.radius+=a,e.ray.intersectsSphere(rr)===!1)return;Ud.copy(s).invert(),na.copy(e.ray).applyMatrix4(Ud);const r=a/((this.scale.x+this.scale.y+this.scale.z)/3),l=r*r,c=this.isLineSegments?2:1,u=i.index,f=i.attributes.position;if(u!==null){const p=Math.max(0,o.start),x=Math.min(u.count,o.start+o.count);for(let y=p,m=x-1;y<m;y+=c){const h=u.getX(y),P=u.getX(y+1),w=or(this,e,na,l,h,P,y);w&&t.push(w)}if(this.isLineLoop){const y=u.getX(x-1),m=u.getX(p),h=or(this,e,na,l,y,m,x-1);h&&t.push(h)}}else{const p=Math.max(0,o.start),x=Math.min(f.count,o.start+o.count);for(let y=p,m=x-1;y<m;y+=c){const h=or(this,e,na,l,y,y+1,y);h&&t.push(h)}if(this.isLineLoop){const y=or(this,e,na,l,x-1,p,x-1);y&&t.push(y)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,o=s.length;a<o;a++){const r=s[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[r]=a}}}}}function or(n,e,t,i,s,a,o){const r=n.geometry.attributes.position;if(Fr.fromBufferAttribute(r,s),Or.fromBufferAttribute(r,a),t.distanceSqToSegment(Fr,Or,Oo,Nd)>i)return;Oo.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(Oo);if(!(c<e.near||c>e.far))return{distance:c,point:Nd.clone().applyMatrix4(n.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:n}}class Ev extends Qt{constructor(e,t,i,s,a,o,r,l,c){super(e,t,i,s,a,o,r,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class jf extends Qt{constructor(e,t,i=Xi,s,a,o,r=Cn,l=Cn,c,u=xa,d=1){if(u!==xa&&u!==ya)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:e,height:t,depth:d};super(f,s,a,o,r,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Sc(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class $f extends Qt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Br extends Dn{constructor(e=1,t=32,i=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:s},t=Math.max(3,t);const a=[],o=[],r=[],l=[],c=new V,u=new Be;o.push(0,0,0),r.push(0,0,1),l.push(.5,.5);for(let d=0,f=3;d<=t;d++,f+=3){const p=i+d/t*s;c.x=e*Math.cos(p),c.y=e*Math.sin(p),o.push(c.x,c.y,c.z),r.push(0,0,1),u.x=(o[f]/e+1)/2,u.y=(o[f+1]/e+1)/2,l.push(u.x,u.y)}for(let d=1;d<=t;d++)a.push(d,d+1,0);this.setIndex(a),this.setAttribute("position",new Pn(o,3)),this.setAttribute("normal",new Pn(r,3)),this.setAttribute("uv",new Pn(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Br(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Jr extends Dn{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};const a=e/2,o=t/2,r=Math.floor(i),l=Math.floor(s),c=r+1,u=l+1,d=e/r,f=t/l,p=[],x=[],y=[],m=[];for(let h=0;h<u;h++){const P=h*f-o;for(let w=0;w<c;w++){const b=w*d-a;x.push(b,-P,0),y.push(0,0,1),m.push(w/r),m.push(1-h/l)}}for(let h=0;h<l;h++)for(let P=0;P<r;P++){const w=P+c*h,b=P+c*(h+1),C=P+1+c*(h+1),S=P+1+c*h;p.push(w,b,S),p.push(b,C,S)}this.setIndex(p),this.setAttribute("position",new Pn(x,3)),this.setAttribute("normal",new Pn(y,3)),this.setAttribute("uv",new Pn(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Jr(e.width,e.height,e.widthSegments,e.heightSegments)}}class Tv extends es{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new it(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new it(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Lf,this.normalScale=new Be(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new qn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Av extends es{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=L_,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class wv extends es{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Xf extends Bt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new it(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}const Bo=new At,Fd=new V,Od=new V;class Cv{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Be(512,512),this.mapType=Gn,this.map=null,this.mapPass=null,this.matrix=new At,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ec,this._frameExtents=new Be(1,1),this._viewportCount=1,this._viewports=[new Pt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;Fd.setFromMatrixPosition(e.matrixWorld),t.position.copy(Fd),Od.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Od),t.updateMatrixWorld(),Bo.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Bo,t.coordinateSystem,t.reversedDepth),t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Bo)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Yf extends Vf{constructor(e=-1,t=1,i=1,s=-1,a=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=a,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,a,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=a,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let a=i-e,o=i+e,r=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=c*this.view.offsetX,o=a+c*this.view.width,r-=u*this.view.offsetY,l=r-u*this.view.height}this.projectionMatrix.makeOrthographic(a,o,r,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Rv extends Cv{constructor(){super(new Yf(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Pv extends Xf{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Bt.DEFAULT_UP),this.updateMatrix(),this.target=new Bt,this.shadow=new Rv}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Dv extends Xf{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class Iv extends _n{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const Bd=new At;class Lv{constructor(e,t,i=0,s=1/0){this.ray=new Zr(e,t),this.near=i,this.far=s,this.camera=null,this.layers=new Mc,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Bd.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Bd),this}intersectObject(e,t=!0,i=[]){return Xl(e,this,i,t),i.sort(zd),i}intersectObjects(e,t=!0,i=[]){for(let s=0,a=e.length;s<a;s++)Xl(e[s],this,i,t);return i.sort(zd),i}}function zd(n,e){return n.distance-e.distance}function Xl(n,e,t,i){let s=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(s=!1),s===!0&&i===!0){const a=n.children;for(let o=0,r=a.length;o<r;o++)Xl(a[o],e,t,!0)}}class Hd{constructor(e=1,t=0,i=0){this.radius=e,this.phi=t,this.theta=i}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=et(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(et(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class Uv extends Qi{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function Vd(n,e,t,i){const s=Nv(i);switch(t){case Rf:return n*e;case Df:return n*e/s.components*s.byteLength;case bc:return n*e/s.components*s.byteLength;case If:return n*e*2/s.components*s.byteLength;case xc:return n*e*2/s.components*s.byteLength;case Pf:return n*e*3/s.components*s.byteLength;case Tn:return n*e*4/s.components*s.byteLength;case yc:return n*e*4/s.components*s.byteLength;case gr:case _r:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case vr:case br:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case bl:case yl:return Math.max(n,16)*Math.max(e,8)/4;case vl:case xl:return Math.max(n,8)*Math.max(e,8)/2;case Sl:case Ml:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case El:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Tl:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Al:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case wl:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Cl:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Rl:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Pl:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Dl:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Il:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Ll:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Ul:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Nl:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Fl:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Ol:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Bl:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case zl:case Hl:case Vl:return Math.ceil(n/4)*Math.ceil(e/4)*16;case kl:case Gl:return Math.ceil(n/4)*Math.ceil(e/4)*8;case ql:case Wl:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Nv(n){switch(n){case Gn:case Tf:return{byteLength:1,components:1};case va:case Af:case Ra:return{byteLength:2,components:1};case _c:case vc:return{byteLength:2,components:4};case Xi:case gc:case ii:return{byteLength:4,components:1};case wf:case Cf:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:mc}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=mc);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Kf(){let n=null,e=!1,t=null,i=null;function s(a,o){t(a,o),i=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(a){t=a},setContext:function(a){n=a}}}function Fv(n){const e=new WeakMap;function t(r,l){const c=r.array,u=r.usage,d=c.byteLength,f=n.createBuffer();n.bindBuffer(l,f),n.bufferData(l,c,u),r.onUploadCallback();let p;if(c instanceof Float32Array)p=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=n.HALF_FLOAT;else if(c instanceof Uint16Array)r.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=n.SHORT;else if(c instanceof Uint32Array)p=n.UNSIGNED_INT;else if(c instanceof Int32Array)p=n.INT;else if(c instanceof Int8Array)p=n.BYTE;else if(c instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:r.version,size:d}}function i(r,l,c){const u=l.array,d=l.updateRanges;if(n.bindBuffer(c,r),d.length===0)n.bufferSubData(c,0,u);else{d.sort((p,x)=>p.start-x.start);let f=0;for(let p=1;p<d.length;p++){const x=d[f],y=d[p];y.start<=x.start+x.count+1?x.count=Math.max(x.count,y.start+y.count-x.start):(++f,d[f]=y)}d.length=f+1;for(let p=0,x=d.length;p<x;p++){const y=d[p];n.bufferSubData(c,y.start*u.BYTES_PER_ELEMENT,u,y.start,y.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(r){return r.isInterleavedBufferAttribute&&(r=r.data),e.get(r)}function a(r){r.isInterleavedBufferAttribute&&(r=r.data);const l=e.get(r);l&&(n.deleteBuffer(l.buffer),e.delete(r))}function o(r,l){if(r.isInterleavedBufferAttribute&&(r=r.data),r.isGLBufferAttribute){const u=e.get(r);(!u||u.version<r.version)&&e.set(r,{buffer:r.buffer,type:r.type,bytesPerElement:r.elementSize,version:r.version});return}const c=e.get(r);if(c===void 0)e.set(r,t(r,l));else if(c.version<r.version){if(c.size!==r.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,r,l),c.version=r.version}}return{get:s,remove:a,update:o}}var Ov=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Bv=`#ifdef USE_ALPHAHASH
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
#endif`,zv=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Hv=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Vv=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,kv=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Gv=`#ifdef USE_AOMAP
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
#endif`,qv=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Wv=`#ifdef USE_BATCHING
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
#endif`,jv=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,$v=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Xv=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Yv=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Kv=`#ifdef USE_IRIDESCENCE
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
#endif`,Zv=`#ifdef USE_BUMPMAP
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
#endif`,Jv=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Qv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,e0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,t0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,n0=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,i0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,s0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,a0=`#if defined( USE_COLOR_ALPHA )
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
#endif`,r0=`#define PI 3.141592653589793
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
} // validated`,o0=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,l0=`vec3 transformedNormal = objectNormal;
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
#endif`,c0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,d0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,u0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,f0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,h0="gl_FragColor = linearToOutputTexel( gl_FragColor );",p0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,m0=`#ifdef USE_ENVMAP
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
#endif`,g0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,_0=`#ifdef USE_ENVMAP
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
#endif`,v0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,b0=`#ifdef USE_ENVMAP
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
#endif`,x0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,y0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,S0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,M0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,E0=`#ifdef USE_GRADIENTMAP
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
}`,T0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,A0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,w0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,C0=`uniform bool receiveShadow;
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
#endif`,R0=`#ifdef USE_ENVMAP
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
#endif`,P0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,D0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,I0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,L0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,U0=`PhysicalMaterial material;
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
#endif`,N0=`struct PhysicalMaterial {
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
}`,F0=`
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
#endif`,O0=`#if defined( RE_IndirectDiffuse )
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
#endif`,B0=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,z0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,H0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,V0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,k0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,G0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,q0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,W0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,j0=`#if defined( USE_POINTS_UV )
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
#endif`,$0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,X0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Y0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,K0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Z0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,J0=`#ifdef USE_MORPHTARGETS
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
#endif`,Q0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,eb=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,tb=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,nb=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ib=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,sb=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,ab=`#ifdef USE_NORMALMAP
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
#endif`,rb=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ob=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,lb=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,cb=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,db=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,ub=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,fb=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,hb=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,pb=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,mb=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,gb=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,_b=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,vb=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,bb=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,xb=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,yb=`float getShadowMask() {
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
}`,Sb=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Mb=`#ifdef USE_SKINNING
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
#endif`,Eb=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Tb=`#ifdef USE_SKINNING
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
#endif`,Ab=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,wb=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Cb=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Rb=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Pb=`#ifdef USE_TRANSMISSION
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
#endif`,Db=`#ifdef USE_TRANSMISSION
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
#endif`,Ib=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Lb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ub=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Nb=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Fb=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Ob=`uniform sampler2D t2D;
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
}`,Bb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,zb=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Hb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Vb=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,kb=`#include <common>
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
}`,Gb=`#if DEPTH_PACKING == 3200
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
}`,qb=`#define DISTANCE
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
}`,Wb=`#define DISTANCE
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
}`,jb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,$b=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Xb=`uniform float scale;
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
}`,Yb=`uniform vec3 diffuse;
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
}`,Kb=`#include <common>
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
}`,Zb=`uniform vec3 diffuse;
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
}`,Jb=`#define LAMBERT
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
}`,Qb=`#define LAMBERT
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
}`,ex=`#define MATCAP
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
}`,tx=`#define MATCAP
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
}`,nx=`#define NORMAL
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
}`,ix=`#define NORMAL
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
}`,sx=`#define PHONG
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
}`,ax=`#define PHONG
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
}`,rx=`#define STANDARD
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
}`,ox=`#define STANDARD
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
}`,lx=`#define TOON
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
}`,cx=`#define TOON
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
}`,dx=`uniform float size;
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
}`,ux=`uniform vec3 diffuse;
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
}`,fx=`#include <common>
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
}`,hx=`uniform vec3 color;
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
}`,px=`uniform float rotation;
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
}`,mx=`uniform vec3 diffuse;
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
}`,Ze={alphahash_fragment:Ov,alphahash_pars_fragment:Bv,alphamap_fragment:zv,alphamap_pars_fragment:Hv,alphatest_fragment:Vv,alphatest_pars_fragment:kv,aomap_fragment:Gv,aomap_pars_fragment:qv,batching_pars_vertex:Wv,batching_vertex:jv,begin_vertex:$v,beginnormal_vertex:Xv,bsdfs:Yv,iridescence_fragment:Kv,bumpmap_pars_fragment:Zv,clipping_planes_fragment:Jv,clipping_planes_pars_fragment:Qv,clipping_planes_pars_vertex:e0,clipping_planes_vertex:t0,color_fragment:n0,color_pars_fragment:i0,color_pars_vertex:s0,color_vertex:a0,common:r0,cube_uv_reflection_fragment:o0,defaultnormal_vertex:l0,displacementmap_pars_vertex:c0,displacementmap_vertex:d0,emissivemap_fragment:u0,emissivemap_pars_fragment:f0,colorspace_fragment:h0,colorspace_pars_fragment:p0,envmap_fragment:m0,envmap_common_pars_fragment:g0,envmap_pars_fragment:_0,envmap_pars_vertex:v0,envmap_physical_pars_fragment:R0,envmap_vertex:b0,fog_vertex:x0,fog_pars_vertex:y0,fog_fragment:S0,fog_pars_fragment:M0,gradientmap_pars_fragment:E0,lightmap_pars_fragment:T0,lights_lambert_fragment:A0,lights_lambert_pars_fragment:w0,lights_pars_begin:C0,lights_toon_fragment:P0,lights_toon_pars_fragment:D0,lights_phong_fragment:I0,lights_phong_pars_fragment:L0,lights_physical_fragment:U0,lights_physical_pars_fragment:N0,lights_fragment_begin:F0,lights_fragment_maps:O0,lights_fragment_end:B0,logdepthbuf_fragment:z0,logdepthbuf_pars_fragment:H0,logdepthbuf_pars_vertex:V0,logdepthbuf_vertex:k0,map_fragment:G0,map_pars_fragment:q0,map_particle_fragment:W0,map_particle_pars_fragment:j0,metalnessmap_fragment:$0,metalnessmap_pars_fragment:X0,morphinstance_vertex:Y0,morphcolor_vertex:K0,morphnormal_vertex:Z0,morphtarget_pars_vertex:J0,morphtarget_vertex:Q0,normal_fragment_begin:eb,normal_fragment_maps:tb,normal_pars_fragment:nb,normal_pars_vertex:ib,normal_vertex:sb,normalmap_pars_fragment:ab,clearcoat_normal_fragment_begin:rb,clearcoat_normal_fragment_maps:ob,clearcoat_pars_fragment:lb,iridescence_pars_fragment:cb,opaque_fragment:db,packing:ub,premultiplied_alpha_fragment:fb,project_vertex:hb,dithering_fragment:pb,dithering_pars_fragment:mb,roughnessmap_fragment:gb,roughnessmap_pars_fragment:_b,shadowmap_pars_fragment:vb,shadowmap_pars_vertex:bb,shadowmap_vertex:xb,shadowmask_pars_fragment:yb,skinbase_vertex:Sb,skinning_pars_vertex:Mb,skinning_vertex:Eb,skinnormal_vertex:Tb,specularmap_fragment:Ab,specularmap_pars_fragment:wb,tonemapping_fragment:Cb,tonemapping_pars_fragment:Rb,transmission_fragment:Pb,transmission_pars_fragment:Db,uv_pars_fragment:Ib,uv_pars_vertex:Lb,uv_vertex:Ub,worldpos_vertex:Nb,background_vert:Fb,background_frag:Ob,backgroundCube_vert:Bb,backgroundCube_frag:zb,cube_vert:Hb,cube_frag:Vb,depth_vert:kb,depth_frag:Gb,distanceRGBA_vert:qb,distanceRGBA_frag:Wb,equirect_vert:jb,equirect_frag:$b,linedashed_vert:Xb,linedashed_frag:Yb,meshbasic_vert:Kb,meshbasic_frag:Zb,meshlambert_vert:Jb,meshlambert_frag:Qb,meshmatcap_vert:ex,meshmatcap_frag:tx,meshnormal_vert:nx,meshnormal_frag:ix,meshphong_vert:sx,meshphong_frag:ax,meshphysical_vert:rx,meshphysical_frag:ox,meshtoon_vert:lx,meshtoon_frag:cx,points_vert:dx,points_frag:ux,shadow_vert:fx,shadow_frag:hx,sprite_vert:px,sprite_frag:mx},Ee={common:{diffuse:{value:new it(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ke},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ke}},envmap:{envMap:{value:null},envMapRotation:{value:new Ke},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ke}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ke}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ke},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ke},normalScale:{value:new Be(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ke},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ke}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ke}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ke}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new it(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new it(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0},uvTransform:{value:new Ke}},sprite:{diffuse:{value:new it(16777215)},opacity:{value:1},center:{value:new Be(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ke},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0}}},Nn={basic:{uniforms:Kt([Ee.common,Ee.specularmap,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.fog]),vertexShader:Ze.meshbasic_vert,fragmentShader:Ze.meshbasic_frag},lambert:{uniforms:Kt([Ee.common,Ee.specularmap,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.fog,Ee.lights,{emissive:{value:new it(0)}}]),vertexShader:Ze.meshlambert_vert,fragmentShader:Ze.meshlambert_frag},phong:{uniforms:Kt([Ee.common,Ee.specularmap,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.fog,Ee.lights,{emissive:{value:new it(0)},specular:{value:new it(1118481)},shininess:{value:30}}]),vertexShader:Ze.meshphong_vert,fragmentShader:Ze.meshphong_frag},standard:{uniforms:Kt([Ee.common,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.roughnessmap,Ee.metalnessmap,Ee.fog,Ee.lights,{emissive:{value:new it(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ze.meshphysical_vert,fragmentShader:Ze.meshphysical_frag},toon:{uniforms:Kt([Ee.common,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.gradientmap,Ee.fog,Ee.lights,{emissive:{value:new it(0)}}]),vertexShader:Ze.meshtoon_vert,fragmentShader:Ze.meshtoon_frag},matcap:{uniforms:Kt([Ee.common,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.fog,{matcap:{value:null}}]),vertexShader:Ze.meshmatcap_vert,fragmentShader:Ze.meshmatcap_frag},points:{uniforms:Kt([Ee.points,Ee.fog]),vertexShader:Ze.points_vert,fragmentShader:Ze.points_frag},dashed:{uniforms:Kt([Ee.common,Ee.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ze.linedashed_vert,fragmentShader:Ze.linedashed_frag},depth:{uniforms:Kt([Ee.common,Ee.displacementmap]),vertexShader:Ze.depth_vert,fragmentShader:Ze.depth_frag},normal:{uniforms:Kt([Ee.common,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,{opacity:{value:1}}]),vertexShader:Ze.meshnormal_vert,fragmentShader:Ze.meshnormal_frag},sprite:{uniforms:Kt([Ee.sprite,Ee.fog]),vertexShader:Ze.sprite_vert,fragmentShader:Ze.sprite_frag},background:{uniforms:{uvTransform:{value:new Ke},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ze.background_vert,fragmentShader:Ze.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ke}},vertexShader:Ze.backgroundCube_vert,fragmentShader:Ze.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ze.cube_vert,fragmentShader:Ze.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ze.equirect_vert,fragmentShader:Ze.equirect_frag},distanceRGBA:{uniforms:Kt([Ee.common,Ee.displacementmap,{referencePosition:{value:new V},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ze.distanceRGBA_vert,fragmentShader:Ze.distanceRGBA_frag},shadow:{uniforms:Kt([Ee.lights,Ee.fog,{color:{value:new it(0)},opacity:{value:1}}]),vertexShader:Ze.shadow_vert,fragmentShader:Ze.shadow_frag}};Nn.physical={uniforms:Kt([Nn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ke},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ke},clearcoatNormalScale:{value:new Be(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ke},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ke},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ke},sheen:{value:0},sheenColor:{value:new it(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ke},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ke},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ke},transmissionSamplerSize:{value:new Be},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ke},attenuationDistance:{value:0},attenuationColor:{value:new it(0)},specularColor:{value:new it(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ke},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ke},anisotropyVector:{value:new Be},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ke}}]),vertexShader:Ze.meshphysical_vert,fragmentShader:Ze.meshphysical_frag};const lr={r:0,b:0,g:0},Bi=new qn,gx=new At;function _x(n,e,t,i,s,a,o){const r=new it(0);let l=a===!0?0:1,c,u,d=null,f=0,p=null;function x(w){let b=w.isScene===!0?w.background:null;return b&&b.isTexture&&(b=(w.backgroundBlurriness>0?t:e).get(b)),b}function y(w){let b=!1;const C=x(w);C===null?h(r,l):C&&C.isColor&&(h(C,1),b=!0);const S=n.xr.getEnvironmentBlendMode();S==="additive"?i.buffers.color.setClear(0,0,0,1,o):S==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||b)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(w,b){const C=x(b);C&&(C.isCubeTexture||C.mapping===Yr)?(u===void 0&&(u=new un(new qs(1,1,1),new Ri({name:"BackgroundCubeMaterial",uniforms:ks(Nn.backgroundCube.uniforms),vertexShader:Nn.backgroundCube.vertexShader,fragmentShader:Nn.backgroundCube.fragmentShader,side:sn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(S,R,U){this.matrixWorld.copyPosition(U.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),Bi.copy(b.backgroundRotation),Bi.x*=-1,Bi.y*=-1,Bi.z*=-1,C.isCubeTexture&&C.isRenderTargetTexture===!1&&(Bi.y*=-1,Bi.z*=-1),u.material.uniforms.envMap.value=C,u.material.uniforms.flipEnvMap.value=C.isCubeTexture&&C.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(gx.makeRotationFromEuler(Bi)),u.material.toneMapped=rt.getTransfer(C.colorSpace)!==ht,(d!==C||f!==C.version||p!==n.toneMapping)&&(u.material.needsUpdate=!0,d=C,f=C.version,p=n.toneMapping),u.layers.enableAll(),w.unshift(u,u.geometry,u.material,0,0,null)):C&&C.isTexture&&(c===void 0&&(c=new un(new Jr(2,2),new Ri({name:"BackgroundMaterial",uniforms:ks(Nn.background.uniforms),vertexShader:Nn.background.vertexShader,fragmentShader:Nn.background.fragmentShader,side:Ci,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=C,c.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,c.material.toneMapped=rt.getTransfer(C.colorSpace)!==ht,C.matrixAutoUpdate===!0&&C.updateMatrix(),c.material.uniforms.uvTransform.value.copy(C.matrix),(d!==C||f!==C.version||p!==n.toneMapping)&&(c.material.needsUpdate=!0,d=C,f=C.version,p=n.toneMapping),c.layers.enableAll(),w.unshift(c,c.geometry,c.material,0,0,null))}function h(w,b){w.getRGB(lr,Hf(n)),i.buffers.color.setClear(lr.r,lr.g,lr.b,b,o)}function P(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return r},setClearColor:function(w,b=1){r.set(w),l=b,h(r,l)},getClearAlpha:function(){return l},setClearAlpha:function(w){l=w,h(r,l)},render:y,addToRenderList:m,dispose:P}}function vx(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=f(null);let a=s,o=!1;function r(A,F,j,Y,ce){let ae=!1;const Q=d(Y,j,F);a!==Q&&(a=Q,c(a.object)),ae=p(A,Y,j,ce),ae&&x(A,Y,j,ce),ce!==null&&e.update(ce,n.ELEMENT_ARRAY_BUFFER),(ae||o)&&(o=!1,b(A,F,j,Y),ce!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(ce).buffer))}function l(){return n.createVertexArray()}function c(A){return n.bindVertexArray(A)}function u(A){return n.deleteVertexArray(A)}function d(A,F,j){const Y=j.wireframe===!0;let ce=i[A.id];ce===void 0&&(ce={},i[A.id]=ce);let ae=ce[F.id];ae===void 0&&(ae={},ce[F.id]=ae);let Q=ae[Y];return Q===void 0&&(Q=f(l()),ae[Y]=Q),Q}function f(A){const F=[],j=[],Y=[];for(let ce=0;ce<t;ce++)F[ce]=0,j[ce]=0,Y[ce]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:j,attributeDivisors:Y,object:A,attributes:{},index:null}}function p(A,F,j,Y){const ce=a.attributes,ae=F.attributes;let Q=0;const ie=j.getAttributes();for(const G in ie)if(ie[G].location>=0){const Te=ce[G];let Ie=ae[G];if(Ie===void 0&&(G==="instanceMatrix"&&A.instanceMatrix&&(Ie=A.instanceMatrix),G==="instanceColor"&&A.instanceColor&&(Ie=A.instanceColor)),Te===void 0||Te.attribute!==Ie||Ie&&Te.data!==Ie.data)return!0;Q++}return a.attributesNum!==Q||a.index!==Y}function x(A,F,j,Y){const ce={},ae=F.attributes;let Q=0;const ie=j.getAttributes();for(const G in ie)if(ie[G].location>=0){let Te=ae[G];Te===void 0&&(G==="instanceMatrix"&&A.instanceMatrix&&(Te=A.instanceMatrix),G==="instanceColor"&&A.instanceColor&&(Te=A.instanceColor));const Ie={};Ie.attribute=Te,Te&&Te.data&&(Ie.data=Te.data),ce[G]=Ie,Q++}a.attributes=ce,a.attributesNum=Q,a.index=Y}function y(){const A=a.newAttributes;for(let F=0,j=A.length;F<j;F++)A[F]=0}function m(A){h(A,0)}function h(A,F){const j=a.newAttributes,Y=a.enabledAttributes,ce=a.attributeDivisors;j[A]=1,Y[A]===0&&(n.enableVertexAttribArray(A),Y[A]=1),ce[A]!==F&&(n.vertexAttribDivisor(A,F),ce[A]=F)}function P(){const A=a.newAttributes,F=a.enabledAttributes;for(let j=0,Y=F.length;j<Y;j++)F[j]!==A[j]&&(n.disableVertexAttribArray(j),F[j]=0)}function w(A,F,j,Y,ce,ae,Q){Q===!0?n.vertexAttribIPointer(A,F,j,ce,ae):n.vertexAttribPointer(A,F,j,Y,ce,ae)}function b(A,F,j,Y){y();const ce=Y.attributes,ae=j.getAttributes(),Q=F.defaultAttributeValues;for(const ie in ae){const G=ae[ie];if(G.location>=0){let ve=ce[ie];if(ve===void 0&&(ie==="instanceMatrix"&&A.instanceMatrix&&(ve=A.instanceMatrix),ie==="instanceColor"&&A.instanceColor&&(ve=A.instanceColor)),ve!==void 0){const Te=ve.normalized,Ie=ve.itemSize,ke=e.get(ve);if(ke===void 0)continue;const ot=ke.buffer,ut=ke.type,nt=ke.bytesPerElement,oe=ut===n.INT||ut===n.UNSIGNED_INT||ve.gpuType===gc;if(ve.isInterleavedBufferAttribute){const ue=ve.data,Pe=ue.stride,ze=ve.offset;if(ue.isInstancedInterleavedBuffer){for(let Ue=0;Ue<G.locationSize;Ue++)h(G.location+Ue,ue.meshPerAttribute);A.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=ue.meshPerAttribute*ue.count)}else for(let Ue=0;Ue<G.locationSize;Ue++)m(G.location+Ue);n.bindBuffer(n.ARRAY_BUFFER,ot);for(let Ue=0;Ue<G.locationSize;Ue++)w(G.location+Ue,Ie/G.locationSize,ut,Te,Pe*nt,(ze+Ie/G.locationSize*Ue)*nt,oe)}else{if(ve.isInstancedBufferAttribute){for(let ue=0;ue<G.locationSize;ue++)h(G.location+ue,ve.meshPerAttribute);A.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=ve.meshPerAttribute*ve.count)}else for(let ue=0;ue<G.locationSize;ue++)m(G.location+ue);n.bindBuffer(n.ARRAY_BUFFER,ot);for(let ue=0;ue<G.locationSize;ue++)w(G.location+ue,Ie/G.locationSize,ut,Te,Ie*nt,Ie/G.locationSize*ue*nt,oe)}}else if(Q!==void 0){const Te=Q[ie];if(Te!==void 0)switch(Te.length){case 2:n.vertexAttrib2fv(G.location,Te);break;case 3:n.vertexAttrib3fv(G.location,Te);break;case 4:n.vertexAttrib4fv(G.location,Te);break;default:n.vertexAttrib1fv(G.location,Te)}}}}P()}function C(){U();for(const A in i){const F=i[A];for(const j in F){const Y=F[j];for(const ce in Y)u(Y[ce].object),delete Y[ce];delete F[j]}delete i[A]}}function S(A){if(i[A.id]===void 0)return;const F=i[A.id];for(const j in F){const Y=F[j];for(const ce in Y)u(Y[ce].object),delete Y[ce];delete F[j]}delete i[A.id]}function R(A){for(const F in i){const j=i[F];if(j[A.id]===void 0)continue;const Y=j[A.id];for(const ce in Y)u(Y[ce].object),delete Y[ce];delete j[A.id]}}function U(){T(),o=!0,a!==s&&(a=s,c(a.object))}function T(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:r,reset:U,resetDefaultState:T,dispose:C,releaseStatesOfGeometry:S,releaseStatesOfProgram:R,initAttributes:y,enableAttribute:m,disableUnusedAttributes:P}}function bx(n,e,t){let i;function s(c){i=c}function a(c,u){n.drawArrays(i,c,u),t.update(u,i,1)}function o(c,u,d){d!==0&&(n.drawArraysInstanced(i,c,u,d),t.update(u,i,d))}function r(c,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,u,0,d);let p=0;for(let x=0;x<d;x++)p+=u[x];t.update(p,i,1)}function l(c,u,d,f){if(d===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let x=0;x<c.length;x++)o(c[x],u[x],f[x]);else{p.multiDrawArraysInstancedWEBGL(i,c,0,u,0,f,0,d);let x=0;for(let y=0;y<d;y++)x+=u[y]*f[y];t.update(x,i,1)}}this.setMode=s,this.render=a,this.renderInstances=o,this.renderMultiDraw=r,this.renderMultiDrawInstances=l}function xx(n,e,t,i){let s;function a(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const R=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(R){return!(R!==Tn&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function r(R){const U=R===Ra&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==Gn&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==ii&&!U)}function l(R){if(R==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const d=t.logarithmicDepthBuffer===!0,f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),h=n.getParameter(n.MAX_VERTEX_ATTRIBS),P=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),w=n.getParameter(n.MAX_VARYING_VECTORS),b=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),C=x>0,S=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:r,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:x,maxTextureSize:y,maxCubemapSize:m,maxAttributes:h,maxVertexUniforms:P,maxVaryings:w,maxFragmentUniforms:b,vertexTextures:C,maxSamples:S}}function yx(n){const e=this;let t=null,i=0,s=!1,a=!1;const o=new vi,r=new Ke,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){const p=d.length!==0||f||i!==0||s;return s=f,i=d.length,p},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(d,f){t=u(d,f,0)},this.setState=function(d,f,p){const x=d.clippingPlanes,y=d.clipIntersection,m=d.clipShadows,h=n.get(d);if(!s||x===null||x.length===0||a&&!m)a?u(null):c();else{const P=a?0:i,w=P*4;let b=h.clippingState||null;l.value=b,b=u(x,f,w,p);for(let C=0;C!==w;++C)b[C]=t[C];h.clippingState=b,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=P}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(d,f,p,x){const y=d!==null?d.length:0;let m=null;if(y!==0){if(m=l.value,x!==!0||m===null){const h=p+y*4,P=f.matrixWorldInverse;r.getNormalMatrix(P),(m===null||m.length<h)&&(m=new Float32Array(h));for(let w=0,b=p;w!==y;++w,b+=4)o.copy(d[w]).applyMatrix4(P,r),o.normal.toArray(m,b),m[b+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,m}}function Sx(n){let e=new WeakMap;function t(o,r){return r===pl?o.mapping=zs:r===ml&&(o.mapping=Hs),o}function i(o){if(o&&o.isTexture){const r=o.mapping;if(r===pl||r===ml)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new mv(l.height);return c.fromEquirectangularTexture(n,o),e.set(o,c),o.addEventListener("dispose",s),t(c.texture,o.mapping)}else return null}}return o}function s(o){const r=o.target;r.removeEventListener("dispose",s);const l=e.get(r);l!==void 0&&(e.delete(r),l.dispose())}function a(){e=new WeakMap}return{get:i,dispose:a}}const ws=4,kd=[.125,.215,.35,.446,.526,.582],Gi=20,zo=new Yf,Gd=new it;let Ho=null,Vo=0,ko=0,Go=!1;const Vi=(1+Math.sqrt(5))/2,Ss=1/Vi,qd=[new V(-Vi,Ss,0),new V(Vi,Ss,0),new V(-Ss,0,Vi),new V(Ss,0,Vi),new V(0,Vi,-Ss),new V(0,Vi,Ss),new V(-1,1,-1),new V(1,1,-1),new V(-1,1,1),new V(1,1,1)],Mx=new V;class Wd{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,s=100,a={}){const{size:o=256,position:r=Mx}=a;Ho=this._renderer.getRenderTarget(),Vo=this._renderer.getActiveCubeFace(),ko=this._renderer.getActiveMipmapLevel(),Go=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,s,l,r),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Xd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=$d(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Ho,Vo,ko),this._renderer.xr.enabled=Go,e.scissorTest=!1,cr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===zs||e.mapping===Hs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ho=this._renderer.getRenderTarget(),Vo=this._renderer.getActiveCubeFace(),ko=this._renderer.getActiveMipmapLevel(),Go=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Bn,minFilter:Bn,generateMipmaps:!1,type:Ra,format:Tn,colorSpace:Vs,depthBuffer:!1},s=jd(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=jd(e,t,i);const{_lodMax:a}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Ex(a)),this._blurMaterial=Tx(a,e,t)}return s}_compileMaterial(e){const t=new un(this._lodPlanes[0],e);this._renderer.compile(t,zo)}_sceneToCubeUV(e,t,i,s,a){const l=new _n(90,1,t,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,f=d.autoClear,p=d.toneMapping;d.getClearColor(Gd),d.toneMapping=Mi,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null));const y=new Ur({name:"PMREM.Background",side:sn,depthWrite:!1,depthTest:!1}),m=new un(new qs,y);let h=!1;const P=e.background;P?P.isColor&&(y.color.copy(P),e.background=null,h=!0):(y.color.copy(Gd),h=!0);for(let w=0;w<6;w++){const b=w%3;b===0?(l.up.set(0,c[w],0),l.position.set(a.x,a.y,a.z),l.lookAt(a.x+u[w],a.y,a.z)):b===1?(l.up.set(0,0,c[w]),l.position.set(a.x,a.y,a.z),l.lookAt(a.x,a.y+u[w],a.z)):(l.up.set(0,c[w],0),l.position.set(a.x,a.y,a.z),l.lookAt(a.x,a.y,a.z+u[w]));const C=this._cubeSize;cr(s,b*C,w>2?C:0,C,C),d.setRenderTarget(s),h&&d.render(m,l),d.render(e,l)}m.geometry.dispose(),m.material.dispose(),d.toneMapping=p,d.autoClear=f,e.background=P}_textureToCubeUV(e,t){const i=this._renderer,s=e.mapping===zs||e.mapping===Hs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Xd()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=$d());const a=s?this._cubemapMaterial:this._equirectMaterial,o=new un(this._lodPlanes[0],a),r=a.uniforms;r.envMap.value=e;const l=this._cubeSize;cr(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(o,zo)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let a=1;a<s;a++){const o=Math.sqrt(this._sigmas[a]*this._sigmas[a]-this._sigmas[a-1]*this._sigmas[a-1]),r=qd[(s-a-1)%qd.length];this._blur(e,a-1,a,o,r)}t.autoClear=i}_blur(e,t,i,s,a){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,s,"latitudinal",a),this._halfBlur(o,e,i,i,s,"longitudinal",a)}_halfBlur(e,t,i,s,a,o,r){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,d=new un(this._lodPlanes[s],c),f=c.uniforms,p=this._sizeLods[i]-1,x=isFinite(a)?Math.PI/(2*p):2*Math.PI/(2*Gi-1),y=a/x,m=isFinite(a)?1+Math.floor(u*y):Gi;m>Gi&&console.warn(`sigmaRadians, ${a}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Gi}`);const h=[];let P=0;for(let R=0;R<Gi;++R){const U=R/y,T=Math.exp(-U*U/2);h.push(T),R===0?P+=T:R<m&&(P+=2*T)}for(let R=0;R<h.length;R++)h[R]=h[R]/P;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=h,f.latitudinal.value=o==="latitudinal",r&&(f.poleAxis.value=r);const{_lodMax:w}=this;f.dTheta.value=x,f.mipInt.value=w-i;const b=this._sizeLods[s],C=3*b*(s>w-ws?s-w+ws:0),S=4*(this._cubeSize-b);cr(t,C,S,3*b,2*b),l.setRenderTarget(t),l.render(d,zo)}}function Ex(n){const e=[],t=[],i=[];let s=n;const a=n-ws+1+kd.length;for(let o=0;o<a;o++){const r=Math.pow(2,s);t.push(r);let l=1/r;o>n-ws?l=kd[o-n+ws-1]:o===0&&(l=0),i.push(l);const c=1/(r-2),u=-c,d=1+c,f=[u,u,d,u,d,d,u,u,d,d,u,d],p=6,x=6,y=3,m=2,h=1,P=new Float32Array(y*x*p),w=new Float32Array(m*x*p),b=new Float32Array(h*x*p);for(let S=0;S<p;S++){const R=S%3*2/3-1,U=S>2?0:-1,T=[R,U,0,R+2/3,U,0,R+2/3,U+1,0,R,U,0,R+2/3,U+1,0,R,U+1,0];P.set(T,y*x*S),w.set(f,m*x*S);const A=[S,S,S,S,S,S];b.set(A,h*x*S)}const C=new Dn;C.setAttribute("position",new Rn(P,y)),C.setAttribute("uv",new Rn(w,m)),C.setAttribute("faceIndex",new Rn(b,h)),e.push(C),s>ws&&s--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function jd(n,e,t){const i=new Ki(n,e,t);return i.texture.mapping=Yr,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function cr(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function Tx(n,e,t){const i=new Float32Array(Gi),s=new V(0,1,0);return new Ri({name:"SphericalGaussianBlur",defines:{n:Gi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Tc(),fragmentShader:`

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
		`,blending:Si,depthTest:!1,depthWrite:!1})}function $d(){return new Ri({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Tc(),fragmentShader:`

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
		`,blending:Si,depthTest:!1,depthWrite:!1})}function Xd(){return new Ri({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Tc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Si,depthTest:!1,depthWrite:!1})}function Tc(){return`

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
	`}function Ax(n){let e=new WeakMap,t=null;function i(r){if(r&&r.isTexture){const l=r.mapping,c=l===pl||l===ml,u=l===zs||l===Hs;if(c||u){let d=e.get(r);const f=d!==void 0?d.texture.pmremVersion:0;if(r.isRenderTargetTexture&&r.pmremVersion!==f)return t===null&&(t=new Wd(n)),d=c?t.fromEquirectangular(r,d):t.fromCubemap(r,d),d.texture.pmremVersion=r.pmremVersion,e.set(r,d),d.texture;if(d!==void 0)return d.texture;{const p=r.image;return c&&p&&p.height>0||u&&p&&s(p)?(t===null&&(t=new Wd(n)),d=c?t.fromEquirectangular(r):t.fromCubemap(r),d.texture.pmremVersion=r.pmremVersion,e.set(r,d),r.addEventListener("dispose",a),d.texture):null}}}return r}function s(r){let l=0;const c=6;for(let u=0;u<c;u++)r[u]!==void 0&&l++;return l===c}function a(r){const l=r.target;l.removeEventListener("dispose",a);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:o}}function wx(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const s=t(i);return s===null&&Sa("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function Cx(n,e,t,i){const s={},a=new WeakMap;function o(d){const f=d.target;f.index!==null&&e.remove(f.index);for(const x in f.attributes)e.remove(f.attributes[x]);f.removeEventListener("dispose",o),delete s[f.id];const p=a.get(f);p&&(e.remove(p),a.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function r(d,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,t.memory.geometries++),f}function l(d){const f=d.attributes;for(const p in f)e.update(f[p],n.ARRAY_BUFFER)}function c(d){const f=[],p=d.index,x=d.attributes.position;let y=0;if(p!==null){const P=p.array;y=p.version;for(let w=0,b=P.length;w<b;w+=3){const C=P[w+0],S=P[w+1],R=P[w+2];f.push(C,S,S,R,R,C)}}else if(x!==void 0){const P=x.array;y=x.version;for(let w=0,b=P.length/3-1;w<b;w+=3){const C=w+0,S=w+1,R=w+2;f.push(C,S,S,R,R,C)}}else return;const m=new(Nf(f)?zf:Bf)(f,1);m.version=y;const h=a.get(d);h&&e.remove(h),a.set(d,m)}function u(d){const f=a.get(d);if(f){const p=d.index;p!==null&&f.version<p.version&&c(d)}else c(d);return a.get(d)}return{get:r,update:l,getWireframeAttribute:u}}function Rx(n,e,t){let i;function s(f){i=f}let a,o;function r(f){a=f.type,o=f.bytesPerElement}function l(f,p){n.drawElements(i,p,a,f*o),t.update(p,i,1)}function c(f,p,x){x!==0&&(n.drawElementsInstanced(i,p,a,f*o,x),t.update(p,i,x))}function u(f,p,x){if(x===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,a,f,0,x);let m=0;for(let h=0;h<x;h++)m+=p[h];t.update(m,i,1)}function d(f,p,x,y){if(x===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let h=0;h<f.length;h++)c(f[h]/o,p[h],y[h]);else{m.multiDrawElementsInstancedWEBGL(i,p,0,a,f,0,y,0,x);let h=0;for(let P=0;P<x;P++)h+=p[P]*y[P];t.update(h,i,1)}}this.setMode=s,this.setIndex=r,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function Px(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(a,o,r){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=r*(a/3);break;case n.LINES:t.lines+=r*(a/2);break;case n.LINE_STRIP:t.lines+=r*(a-1);break;case n.LINE_LOOP:t.lines+=r*a;break;case n.POINTS:t.points+=r*a;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function Dx(n,e,t){const i=new WeakMap,s=new Pt;function a(o,r,l){const c=o.morphTargetInfluences,u=r.morphAttributes.position||r.morphAttributes.normal||r.morphAttributes.color,d=u!==void 0?u.length:0;let f=i.get(r);if(f===void 0||f.count!==d){let A=function(){U.dispose(),i.delete(r),r.removeEventListener("dispose",A)};var p=A;f!==void 0&&f.texture.dispose();const x=r.morphAttributes.position!==void 0,y=r.morphAttributes.normal!==void 0,m=r.morphAttributes.color!==void 0,h=r.morphAttributes.position||[],P=r.morphAttributes.normal||[],w=r.morphAttributes.color||[];let b=0;x===!0&&(b=1),y===!0&&(b=2),m===!0&&(b=3);let C=r.attributes.position.count*b,S=1;C>e.maxTextureSize&&(S=Math.ceil(C/e.maxTextureSize),C=e.maxTextureSize);const R=new Float32Array(C*S*4*d),U=new Ff(R,C,S,d);U.type=ii,U.needsUpdate=!0;const T=b*4;for(let F=0;F<d;F++){const j=h[F],Y=P[F],ce=w[F],ae=C*S*4*F;for(let Q=0;Q<j.count;Q++){const ie=Q*T;x===!0&&(s.fromBufferAttribute(j,Q),R[ae+ie+0]=s.x,R[ae+ie+1]=s.y,R[ae+ie+2]=s.z,R[ae+ie+3]=0),y===!0&&(s.fromBufferAttribute(Y,Q),R[ae+ie+4]=s.x,R[ae+ie+5]=s.y,R[ae+ie+6]=s.z,R[ae+ie+7]=0),m===!0&&(s.fromBufferAttribute(ce,Q),R[ae+ie+8]=s.x,R[ae+ie+9]=s.y,R[ae+ie+10]=s.z,R[ae+ie+11]=ce.itemSize===4?s.w:1)}}f={count:d,texture:U,size:new Be(C,S)},i.set(r,f),r.addEventListener("dispose",A)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,t);else{let x=0;for(let m=0;m<c.length;m++)x+=c[m];const y=r.morphTargetsRelative?1:1-x;l.getUniforms().setValue(n,"morphTargetBaseInfluence",y),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",f.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:a}}function Ix(n,e,t,i){let s=new WeakMap;function a(l){const c=i.render.frame,u=l.geometry,d=e.get(l,u);if(s.get(d)!==c&&(e.update(d),s.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",r)===!1&&l.addEventListener("dispose",r),s.get(l)!==c&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;s.get(f)!==c&&(f.update(),s.set(f,c))}return d}function o(){s=new WeakMap}function r(l){const c=l.target;c.removeEventListener("dispose",r),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:a,dispose:o}}const Zf=new Qt,Yd=new jf(1,1),Jf=new Ff,Qf=new J_,eh=new kf,Kd=[],Zd=[],Jd=new Float32Array(16),Qd=new Float32Array(9),eu=new Float32Array(4);function Ws(n,e,t){const i=n[0];if(i<=0||i>0)return n;const s=e*t;let a=Kd[s];if(a===void 0&&(a=new Float32Array(s),Kd[s]=a),e!==0){i.toArray(a,0);for(let o=1,r=0;o!==e;++o)r+=t,n[o].toArray(a,r)}return a}function Nt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Ft(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Qr(n,e){let t=Zd[e];t===void 0&&(t=new Int32Array(e),Zd[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function Lx(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function Ux(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Nt(t,e))return;n.uniform2fv(this.addr,e),Ft(t,e)}}function Nx(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Nt(t,e))return;n.uniform3fv(this.addr,e),Ft(t,e)}}function Fx(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Nt(t,e))return;n.uniform4fv(this.addr,e),Ft(t,e)}}function Ox(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Nt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Ft(t,e)}else{if(Nt(t,i))return;eu.set(i),n.uniformMatrix2fv(this.addr,!1,eu),Ft(t,i)}}function Bx(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Nt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Ft(t,e)}else{if(Nt(t,i))return;Qd.set(i),n.uniformMatrix3fv(this.addr,!1,Qd),Ft(t,i)}}function zx(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Nt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Ft(t,e)}else{if(Nt(t,i))return;Jd.set(i),n.uniformMatrix4fv(this.addr,!1,Jd),Ft(t,i)}}function Hx(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function Vx(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Nt(t,e))return;n.uniform2iv(this.addr,e),Ft(t,e)}}function kx(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Nt(t,e))return;n.uniform3iv(this.addr,e),Ft(t,e)}}function Gx(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Nt(t,e))return;n.uniform4iv(this.addr,e),Ft(t,e)}}function qx(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function Wx(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Nt(t,e))return;n.uniform2uiv(this.addr,e),Ft(t,e)}}function jx(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Nt(t,e))return;n.uniform3uiv(this.addr,e),Ft(t,e)}}function $x(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Nt(t,e))return;n.uniform4uiv(this.addr,e),Ft(t,e)}}function Xx(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let a;this.type===n.SAMPLER_2D_SHADOW?(Yd.compareFunction=Uf,a=Yd):a=Zf,t.setTexture2D(e||a,s)}function Yx(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||Qf,s)}function Kx(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||eh,s)}function Zx(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||Jf,s)}function Jx(n){switch(n){case 5126:return Lx;case 35664:return Ux;case 35665:return Nx;case 35666:return Fx;case 35674:return Ox;case 35675:return Bx;case 35676:return zx;case 5124:case 35670:return Hx;case 35667:case 35671:return Vx;case 35668:case 35672:return kx;case 35669:case 35673:return Gx;case 5125:return qx;case 36294:return Wx;case 36295:return jx;case 36296:return $x;case 35678:case 36198:case 36298:case 36306:case 35682:return Xx;case 35679:case 36299:case 36307:return Yx;case 35680:case 36300:case 36308:case 36293:return Kx;case 36289:case 36303:case 36311:case 36292:return Zx}}function Qx(n,e){n.uniform1fv(this.addr,e)}function ey(n,e){const t=Ws(e,this.size,2);n.uniform2fv(this.addr,t)}function ty(n,e){const t=Ws(e,this.size,3);n.uniform3fv(this.addr,t)}function ny(n,e){const t=Ws(e,this.size,4);n.uniform4fv(this.addr,t)}function iy(n,e){const t=Ws(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function sy(n,e){const t=Ws(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function ay(n,e){const t=Ws(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function ry(n,e){n.uniform1iv(this.addr,e)}function oy(n,e){n.uniform2iv(this.addr,e)}function ly(n,e){n.uniform3iv(this.addr,e)}function cy(n,e){n.uniform4iv(this.addr,e)}function dy(n,e){n.uniform1uiv(this.addr,e)}function uy(n,e){n.uniform2uiv(this.addr,e)}function fy(n,e){n.uniform3uiv(this.addr,e)}function hy(n,e){n.uniform4uiv(this.addr,e)}function py(n,e,t){const i=this.cache,s=e.length,a=Qr(t,s);Nt(i,a)||(n.uniform1iv(this.addr,a),Ft(i,a));for(let o=0;o!==s;++o)t.setTexture2D(e[o]||Zf,a[o])}function my(n,e,t){const i=this.cache,s=e.length,a=Qr(t,s);Nt(i,a)||(n.uniform1iv(this.addr,a),Ft(i,a));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||Qf,a[o])}function gy(n,e,t){const i=this.cache,s=e.length,a=Qr(t,s);Nt(i,a)||(n.uniform1iv(this.addr,a),Ft(i,a));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||eh,a[o])}function _y(n,e,t){const i=this.cache,s=e.length,a=Qr(t,s);Nt(i,a)||(n.uniform1iv(this.addr,a),Ft(i,a));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||Jf,a[o])}function vy(n){switch(n){case 5126:return Qx;case 35664:return ey;case 35665:return ty;case 35666:return ny;case 35674:return iy;case 35675:return sy;case 35676:return ay;case 5124:case 35670:return ry;case 35667:case 35671:return oy;case 35668:case 35672:return ly;case 35669:case 35673:return cy;case 5125:return dy;case 36294:return uy;case 36295:return fy;case 36296:return hy;case 35678:case 36198:case 36298:case 36306:case 35682:return py;case 35679:case 36299:case 36307:return my;case 35680:case 36300:case 36308:case 36293:return gy;case 36289:case 36303:case 36311:case 36292:return _y}}class by{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Jx(t.type)}}class xy{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=vy(t.type)}}class yy{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const s=this.seq;for(let a=0,o=s.length;a!==o;++a){const r=s[a];r.setValue(e,t[r.id],i)}}}const qo=/(\w+)(\])?(\[|\.)?/g;function tu(n,e){n.seq.push(e),n.map[e.id]=e}function Sy(n,e,t){const i=n.name,s=i.length;for(qo.lastIndex=0;;){const a=qo.exec(i),o=qo.lastIndex;let r=a[1];const l=a[2]==="]",c=a[3];if(l&&(r=r|0),c===void 0||c==="["&&o+2===s){tu(t,c===void 0?new by(r,n,e):new xy(r,n,e));break}else{let d=t.map[r];d===void 0&&(d=new yy(r),tu(t,d)),t=d}}}class yr{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const a=e.getActiveUniform(t,s),o=e.getUniformLocation(t,a.name);Sy(a,o,this)}}setValue(e,t,i,s){const a=this.map[t];a!==void 0&&a.setValue(e,i,s)}setOptional(e,t,i){const s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let a=0,o=t.length;a!==o;++a){const r=t[a],l=i[r.id];l.needsUpdate!==!1&&r.setValue(e,l.value,s)}}static seqWithValue(e,t){const i=[];for(let s=0,a=e.length;s!==a;++s){const o=e[s];o.id in t&&i.push(o)}return i}}function nu(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const My=37297;let Ey=0;function Ty(n,e){const t=n.split(`
`),i=[],s=Math.max(e-6,0),a=Math.min(e+6,t.length);for(let o=s;o<a;o++){const r=o+1;i.push(`${r===e?">":" "} ${r}: ${t[o]}`)}return i.join(`
`)}const iu=new Ke;function Ay(n){rt._getMatrix(iu,rt.workingColorSpace,n);const e=`mat3( ${iu.elements.map(t=>t.toFixed(4))} )`;switch(rt.getTransfer(n)){case Dr:return[e,"LinearTransferOETF"];case ht:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function su(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),a=(n.getShaderInfoLog(e)||"").trim();if(i&&a==="")return"";const o=/ERROR: 0:(\d+)/.exec(a);if(o){const r=parseInt(o[1]);return t.toUpperCase()+`

`+a+`

`+Ty(n.getShaderSource(e),r)}else return a}function wy(n,e){const t=Ay(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Cy(n,e){let t;switch(e){case T_:t="Linear";break;case A_:t="Reinhard";break;case w_:t="Cineon";break;case C_:t="ACESFilmic";break;case P_:t="AgX";break;case D_:t="Neutral";break;case R_:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const dr=new V;function Ry(){rt.getLuminanceCoefficients(dr);const n=dr.x.toFixed(4),e=dr.y.toFixed(4),t=dr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Py(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(sa).join(`
`)}function Dy(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function Iy(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const a=n.getActiveAttrib(e,s),o=a.name;let r=1;a.type===n.FLOAT_MAT2&&(r=2),a.type===n.FLOAT_MAT3&&(r=3),a.type===n.FLOAT_MAT4&&(r=4),t[o]={type:a.type,location:n.getAttribLocation(e,o),locationSize:r}}return t}function sa(n){return n!==""}function au(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function ru(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Ly=/^[ \t]*#include +<([\w\d./]+)>/gm;function Yl(n){return n.replace(Ly,Ny)}const Uy=new Map;function Ny(n,e){let t=Ze[e];if(t===void 0){const i=Uy.get(e);if(i!==void 0)t=Ze[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Yl(t)}const Fy=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ou(n){return n.replace(Fy,Oy)}function Oy(n,e,t,i){let s="";for(let a=parseInt(e);a<parseInt(t);a++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return s}function lu(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}function By(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Sf?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===s_?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Qn&&(e="SHADOWMAP_TYPE_VSM"),e}function zy(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case zs:case Hs:e="ENVMAP_TYPE_CUBE";break;case Yr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Hy(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case Hs:e="ENVMAP_MODE_REFRACTION";break}return e}function Vy(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Mf:e="ENVMAP_BLENDING_MULTIPLY";break;case M_:e="ENVMAP_BLENDING_MIX";break;case E_:e="ENVMAP_BLENDING_ADD";break}return e}function ky(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function Gy(n,e,t,i){const s=n.getContext(),a=t.defines;let o=t.vertexShader,r=t.fragmentShader;const l=By(t),c=zy(t),u=Hy(t),d=Vy(t),f=ky(t),p=Py(t),x=Dy(a),y=s.createProgram();let m,h,P=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(sa).join(`
`),m.length>0&&(m+=`
`),h=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(sa).join(`
`),h.length>0&&(h+=`
`)):(m=[lu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(sa).join(`
`),h=[lu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Mi?"#define TONE_MAPPING":"",t.toneMapping!==Mi?Ze.tonemapping_pars_fragment:"",t.toneMapping!==Mi?Cy("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ze.colorspace_pars_fragment,wy("linearToOutputTexel",t.outputColorSpace),Ry(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(sa).join(`
`)),o=Yl(o),o=au(o,t),o=ru(o,t),r=Yl(r),r=au(r,t),r=ru(r,t),o=ou(o),r=ou(r),t.isRawShaderMaterial!==!0&&(P=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,h=["#define varying in",t.glslVersion===pd?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===pd?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+h);const w=P+m+o,b=P+h+r,C=nu(s,s.VERTEX_SHADER,w),S=nu(s,s.FRAGMENT_SHADER,b);s.attachShader(y,C),s.attachShader(y,S),t.index0AttributeName!==void 0?s.bindAttribLocation(y,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(y,0,"position"),s.linkProgram(y);function R(F){if(n.debug.checkShaderErrors){const j=s.getProgramInfoLog(y)||"",Y=s.getShaderInfoLog(C)||"",ce=s.getShaderInfoLog(S)||"",ae=j.trim(),Q=Y.trim(),ie=ce.trim();let G=!0,ve=!0;if(s.getProgramParameter(y,s.LINK_STATUS)===!1)if(G=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,y,C,S);else{const Te=su(s,C,"vertex"),Ie=su(s,S,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(y,s.VALIDATE_STATUS)+`

Material Name: `+F.name+`
Material Type: `+F.type+`

Program Info Log: `+ae+`
`+Te+`
`+Ie)}else ae!==""?console.warn("THREE.WebGLProgram: Program Info Log:",ae):(Q===""||ie==="")&&(ve=!1);ve&&(F.diagnostics={runnable:G,programLog:ae,vertexShader:{log:Q,prefix:m},fragmentShader:{log:ie,prefix:h}})}s.deleteShader(C),s.deleteShader(S),U=new yr(s,y),T=Iy(s,y)}let U;this.getUniforms=function(){return U===void 0&&R(this),U};let T;this.getAttributes=function(){return T===void 0&&R(this),T};let A=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return A===!1&&(A=s.getProgramParameter(y,My)),A},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(y),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Ey++,this.cacheKey=e,this.usedTimes=1,this.program=y,this.vertexShader=C,this.fragmentShader=S,this}let qy=0;class Wy{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,s=this._getShaderStage(t),a=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(a)===!1&&(o.add(a),a.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new jy(e),t.set(e,i)),i}}class jy{constructor(e){this.id=qy++,this.code=e,this.usedTimes=0}}function $y(n,e,t,i,s,a,o){const r=new Mc,l=new Wy,c=new Set,u=[],d=s.logarithmicDepthBuffer,f=s.vertexTextures;let p=s.precision;const x={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function y(T){return c.add(T),T===0?"uv":`uv${T}`}function m(T,A,F,j,Y){const ce=j.fog,ae=Y.geometry,Q=T.isMeshStandardMaterial?j.environment:null,ie=(T.isMeshStandardMaterial?t:e).get(T.envMap||Q),G=ie&&ie.mapping===Yr?ie.image.height:null,ve=x[T.type];T.precision!==null&&(p=s.getMaxPrecision(T.precision),p!==T.precision&&console.warn("THREE.WebGLProgram.getParameters:",T.precision,"not supported, using",p,"instead."));const Te=ae.morphAttributes.position||ae.morphAttributes.normal||ae.morphAttributes.color,Ie=Te!==void 0?Te.length:0;let ke=0;ae.morphAttributes.position!==void 0&&(ke=1),ae.morphAttributes.normal!==void 0&&(ke=2),ae.morphAttributes.color!==void 0&&(ke=3);let ot,ut,nt,oe;if(ve){const Xe=Nn[ve];ot=Xe.vertexShader,ut=Xe.fragmentShader}else ot=T.vertexShader,ut=T.fragmentShader,l.update(T),nt=l.getVertexShaderID(T),oe=l.getFragmentShaderID(T);const ue=n.getRenderTarget(),Pe=n.state.buffers.depth.getReversed(),ze=Y.isInstancedMesh===!0,Ue=Y.isBatchedMesh===!0,Je=!!T.map,I=!!T.matcap,g=!!ie,L=!!T.aoMap,k=!!T.lightMap,O=!!T.bumpMap,z=!!T.normalMap,de=!!T.displacementMap,X=!!T.emissiveMap,se=!!T.metalnessMap,re=!!T.roughnessMap,be=T.anisotropy>0,M=T.clearcoat>0,v=T.dispersion>0,N=T.iridescence>0,q=T.sheen>0,ne=T.transmission>0,W=be&&!!T.anisotropyMap,Se=M&&!!T.clearcoatMap,fe=M&&!!T.clearcoatNormalMap,Ae=M&&!!T.clearcoatRoughnessMap,Re=N&&!!T.iridescenceMap,pe=N&&!!T.iridescenceThicknessMap,Me=q&&!!T.sheenColorMap,Le=q&&!!T.sheenRoughnessMap,Ce=!!T.specularMap,xe=!!T.specularColorMap,$e=!!T.specularIntensityMap,D=ne&&!!T.transmissionMap,J=ne&&!!T.thicknessMap,le=!!T.gradientMap,he=!!T.alphaMap,ee=T.alphaTest>0,te=!!T.alphaHash,ye=!!T.extensions;let Fe=Mi;T.toneMapped&&(ue===null||ue.isXRRenderTarget===!0)&&(Fe=n.toneMapping);const Ge={shaderID:ve,shaderType:T.type,shaderName:T.name,vertexShader:ot,fragmentShader:ut,defines:T.defines,customVertexShaderID:nt,customFragmentShaderID:oe,isRawShaderMaterial:T.isRawShaderMaterial===!0,glslVersion:T.glslVersion,precision:p,batching:Ue,batchingColor:Ue&&Y._colorsTexture!==null,instancing:ze,instancingColor:ze&&Y.instanceColor!==null,instancingMorph:ze&&Y.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:ue===null?n.outputColorSpace:ue.isXRRenderTarget===!0?ue.texture.colorSpace:Vs,alphaToCoverage:!!T.alphaToCoverage,map:Je,matcap:I,envMap:g,envMapMode:g&&ie.mapping,envMapCubeUVHeight:G,aoMap:L,lightMap:k,bumpMap:O,normalMap:z,displacementMap:f&&de,emissiveMap:X,normalMapObjectSpace:z&&T.normalMapType===N_,normalMapTangentSpace:z&&T.normalMapType===Lf,metalnessMap:se,roughnessMap:re,anisotropy:be,anisotropyMap:W,clearcoat:M,clearcoatMap:Se,clearcoatNormalMap:fe,clearcoatRoughnessMap:Ae,dispersion:v,iridescence:N,iridescenceMap:Re,iridescenceThicknessMap:pe,sheen:q,sheenColorMap:Me,sheenRoughnessMap:Le,specularMap:Ce,specularColorMap:xe,specularIntensityMap:$e,transmission:ne,transmissionMap:D,thicknessMap:J,gradientMap:le,opaque:T.transparent===!1&&T.blending===Us&&T.alphaToCoverage===!1,alphaMap:he,alphaTest:ee,alphaHash:te,combine:T.combine,mapUv:Je&&y(T.map.channel),aoMapUv:L&&y(T.aoMap.channel),lightMapUv:k&&y(T.lightMap.channel),bumpMapUv:O&&y(T.bumpMap.channel),normalMapUv:z&&y(T.normalMap.channel),displacementMapUv:de&&y(T.displacementMap.channel),emissiveMapUv:X&&y(T.emissiveMap.channel),metalnessMapUv:se&&y(T.metalnessMap.channel),roughnessMapUv:re&&y(T.roughnessMap.channel),anisotropyMapUv:W&&y(T.anisotropyMap.channel),clearcoatMapUv:Se&&y(T.clearcoatMap.channel),clearcoatNormalMapUv:fe&&y(T.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ae&&y(T.clearcoatRoughnessMap.channel),iridescenceMapUv:Re&&y(T.iridescenceMap.channel),iridescenceThicknessMapUv:pe&&y(T.iridescenceThicknessMap.channel),sheenColorMapUv:Me&&y(T.sheenColorMap.channel),sheenRoughnessMapUv:Le&&y(T.sheenRoughnessMap.channel),specularMapUv:Ce&&y(T.specularMap.channel),specularColorMapUv:xe&&y(T.specularColorMap.channel),specularIntensityMapUv:$e&&y(T.specularIntensityMap.channel),transmissionMapUv:D&&y(T.transmissionMap.channel),thicknessMapUv:J&&y(T.thicknessMap.channel),alphaMapUv:he&&y(T.alphaMap.channel),vertexTangents:!!ae.attributes.tangent&&(z||be),vertexColors:T.vertexColors,vertexAlphas:T.vertexColors===!0&&!!ae.attributes.color&&ae.attributes.color.itemSize===4,pointsUvs:Y.isPoints===!0&&!!ae.attributes.uv&&(Je||he),fog:!!ce,useFog:T.fog===!0,fogExp2:!!ce&&ce.isFogExp2,flatShading:T.flatShading===!0&&T.wireframe===!1,sizeAttenuation:T.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:Pe,skinning:Y.isSkinnedMesh===!0,morphTargets:ae.morphAttributes.position!==void 0,morphNormals:ae.morphAttributes.normal!==void 0,morphColors:ae.morphAttributes.color!==void 0,morphTargetsCount:Ie,morphTextureStride:ke,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:T.dithering,shadowMapEnabled:n.shadowMap.enabled&&F.length>0,shadowMapType:n.shadowMap.type,toneMapping:Fe,decodeVideoTexture:Je&&T.map.isVideoTexture===!0&&rt.getTransfer(T.map.colorSpace)===ht,decodeVideoTextureEmissive:X&&T.emissiveMap.isVideoTexture===!0&&rt.getTransfer(T.emissiveMap.colorSpace)===ht,premultipliedAlpha:T.premultipliedAlpha,doubleSided:T.side===En,flipSided:T.side===sn,useDepthPacking:T.depthPacking>=0,depthPacking:T.depthPacking||0,index0AttributeName:T.index0AttributeName,extensionClipCullDistance:ye&&T.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ye&&T.extensions.multiDraw===!0||Ue)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:T.customProgramCacheKey()};return Ge.vertexUv1s=c.has(1),Ge.vertexUv2s=c.has(2),Ge.vertexUv3s=c.has(3),c.clear(),Ge}function h(T){const A=[];if(T.shaderID?A.push(T.shaderID):(A.push(T.customVertexShaderID),A.push(T.customFragmentShaderID)),T.defines!==void 0)for(const F in T.defines)A.push(F),A.push(T.defines[F]);return T.isRawShaderMaterial===!1&&(P(A,T),w(A,T),A.push(n.outputColorSpace)),A.push(T.customProgramCacheKey),A.join()}function P(T,A){T.push(A.precision),T.push(A.outputColorSpace),T.push(A.envMapMode),T.push(A.envMapCubeUVHeight),T.push(A.mapUv),T.push(A.alphaMapUv),T.push(A.lightMapUv),T.push(A.aoMapUv),T.push(A.bumpMapUv),T.push(A.normalMapUv),T.push(A.displacementMapUv),T.push(A.emissiveMapUv),T.push(A.metalnessMapUv),T.push(A.roughnessMapUv),T.push(A.anisotropyMapUv),T.push(A.clearcoatMapUv),T.push(A.clearcoatNormalMapUv),T.push(A.clearcoatRoughnessMapUv),T.push(A.iridescenceMapUv),T.push(A.iridescenceThicknessMapUv),T.push(A.sheenColorMapUv),T.push(A.sheenRoughnessMapUv),T.push(A.specularMapUv),T.push(A.specularColorMapUv),T.push(A.specularIntensityMapUv),T.push(A.transmissionMapUv),T.push(A.thicknessMapUv),T.push(A.combine),T.push(A.fogExp2),T.push(A.sizeAttenuation),T.push(A.morphTargetsCount),T.push(A.morphAttributeCount),T.push(A.numDirLights),T.push(A.numPointLights),T.push(A.numSpotLights),T.push(A.numSpotLightMaps),T.push(A.numHemiLights),T.push(A.numRectAreaLights),T.push(A.numDirLightShadows),T.push(A.numPointLightShadows),T.push(A.numSpotLightShadows),T.push(A.numSpotLightShadowsWithMaps),T.push(A.numLightProbes),T.push(A.shadowMapType),T.push(A.toneMapping),T.push(A.numClippingPlanes),T.push(A.numClipIntersection),T.push(A.depthPacking)}function w(T,A){r.disableAll(),A.supportsVertexTextures&&r.enable(0),A.instancing&&r.enable(1),A.instancingColor&&r.enable(2),A.instancingMorph&&r.enable(3),A.matcap&&r.enable(4),A.envMap&&r.enable(5),A.normalMapObjectSpace&&r.enable(6),A.normalMapTangentSpace&&r.enable(7),A.clearcoat&&r.enable(8),A.iridescence&&r.enable(9),A.alphaTest&&r.enable(10),A.vertexColors&&r.enable(11),A.vertexAlphas&&r.enable(12),A.vertexUv1s&&r.enable(13),A.vertexUv2s&&r.enable(14),A.vertexUv3s&&r.enable(15),A.vertexTangents&&r.enable(16),A.anisotropy&&r.enable(17),A.alphaHash&&r.enable(18),A.batching&&r.enable(19),A.dispersion&&r.enable(20),A.batchingColor&&r.enable(21),A.gradientMap&&r.enable(22),T.push(r.mask),r.disableAll(),A.fog&&r.enable(0),A.useFog&&r.enable(1),A.flatShading&&r.enable(2),A.logarithmicDepthBuffer&&r.enable(3),A.reversedDepthBuffer&&r.enable(4),A.skinning&&r.enable(5),A.morphTargets&&r.enable(6),A.morphNormals&&r.enable(7),A.morphColors&&r.enable(8),A.premultipliedAlpha&&r.enable(9),A.shadowMapEnabled&&r.enable(10),A.doubleSided&&r.enable(11),A.flipSided&&r.enable(12),A.useDepthPacking&&r.enable(13),A.dithering&&r.enable(14),A.transmission&&r.enable(15),A.sheen&&r.enable(16),A.opaque&&r.enable(17),A.pointsUvs&&r.enable(18),A.decodeVideoTexture&&r.enable(19),A.decodeVideoTextureEmissive&&r.enable(20),A.alphaToCoverage&&r.enable(21),T.push(r.mask)}function b(T){const A=x[T.type];let F;if(A){const j=Nn[A];F=uv.clone(j.uniforms)}else F=T.uniforms;return F}function C(T,A){let F;for(let j=0,Y=u.length;j<Y;j++){const ce=u[j];if(ce.cacheKey===A){F=ce,++F.usedTimes;break}}return F===void 0&&(F=new Gy(n,A,T,a),u.push(F)),F}function S(T){if(--T.usedTimes===0){const A=u.indexOf(T);u[A]=u[u.length-1],u.pop(),T.destroy()}}function R(T){l.remove(T)}function U(){l.dispose()}return{getParameters:m,getProgramCacheKey:h,getUniforms:b,acquireProgram:C,releaseProgram:S,releaseShaderCache:R,programs:u,dispose:U}}function Xy(){let n=new WeakMap;function e(o){return n.has(o)}function t(o){let r=n.get(o);return r===void 0&&(r={},n.set(o,r)),r}function i(o){n.delete(o)}function s(o,r,l){n.get(o)[r]=l}function a(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:a}}function Yy(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function cu(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function du(){const n=[];let e=0;const t=[],i=[],s=[];function a(){e=0,t.length=0,i.length=0,s.length=0}function o(d,f,p,x,y,m){let h=n[e];return h===void 0?(h={id:d.id,object:d,geometry:f,material:p,groupOrder:x,renderOrder:d.renderOrder,z:y,group:m},n[e]=h):(h.id=d.id,h.object=d,h.geometry=f,h.material=p,h.groupOrder=x,h.renderOrder=d.renderOrder,h.z=y,h.group=m),e++,h}function r(d,f,p,x,y,m){const h=o(d,f,p,x,y,m);p.transmission>0?i.push(h):p.transparent===!0?s.push(h):t.push(h)}function l(d,f,p,x,y,m){const h=o(d,f,p,x,y,m);p.transmission>0?i.unshift(h):p.transparent===!0?s.unshift(h):t.unshift(h)}function c(d,f){t.length>1&&t.sort(d||Yy),i.length>1&&i.sort(f||cu),s.length>1&&s.sort(f||cu)}function u(){for(let d=e,f=n.length;d<f;d++){const p=n[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:i,transparent:s,init:a,push:r,unshift:l,finish:u,sort:c}}function Ky(){let n=new WeakMap;function e(i,s){const a=n.get(i);let o;return a===void 0?(o=new du,n.set(i,[o])):s>=a.length?(o=new du,a.push(o)):o=a[s],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function Zy(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new V,color:new it};break;case"SpotLight":t={position:new V,direction:new V,color:new it,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new V,color:new it,distance:0,decay:0};break;case"HemisphereLight":t={direction:new V,skyColor:new it,groundColor:new it};break;case"RectAreaLight":t={color:new it,position:new V,halfWidth:new V,halfHeight:new V};break}return n[e.id]=t,t}}}function Jy(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Be};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Be};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Be,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let Qy=0;function eS(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function tS(n){const e=new Zy,t=Jy(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new V);const s=new V,a=new At,o=new At;function r(c){let u=0,d=0,f=0;for(let T=0;T<9;T++)i.probe[T].set(0,0,0);let p=0,x=0,y=0,m=0,h=0,P=0,w=0,b=0,C=0,S=0,R=0;c.sort(eS);for(let T=0,A=c.length;T<A;T++){const F=c[T],j=F.color,Y=F.intensity,ce=F.distance,ae=F.shadow&&F.shadow.map?F.shadow.map.texture:null;if(F.isAmbientLight)u+=j.r*Y,d+=j.g*Y,f+=j.b*Y;else if(F.isLightProbe){for(let Q=0;Q<9;Q++)i.probe[Q].addScaledVector(F.sh.coefficients[Q],Y);R++}else if(F.isDirectionalLight){const Q=e.get(F);if(Q.color.copy(F.color).multiplyScalar(F.intensity),F.castShadow){const ie=F.shadow,G=t.get(F);G.shadowIntensity=ie.intensity,G.shadowBias=ie.bias,G.shadowNormalBias=ie.normalBias,G.shadowRadius=ie.radius,G.shadowMapSize=ie.mapSize,i.directionalShadow[p]=G,i.directionalShadowMap[p]=ae,i.directionalShadowMatrix[p]=F.shadow.matrix,P++}i.directional[p]=Q,p++}else if(F.isSpotLight){const Q=e.get(F);Q.position.setFromMatrixPosition(F.matrixWorld),Q.color.copy(j).multiplyScalar(Y),Q.distance=ce,Q.coneCos=Math.cos(F.angle),Q.penumbraCos=Math.cos(F.angle*(1-F.penumbra)),Q.decay=F.decay,i.spot[y]=Q;const ie=F.shadow;if(F.map&&(i.spotLightMap[C]=F.map,C++,ie.updateMatrices(F),F.castShadow&&S++),i.spotLightMatrix[y]=ie.matrix,F.castShadow){const G=t.get(F);G.shadowIntensity=ie.intensity,G.shadowBias=ie.bias,G.shadowNormalBias=ie.normalBias,G.shadowRadius=ie.radius,G.shadowMapSize=ie.mapSize,i.spotShadow[y]=G,i.spotShadowMap[y]=ae,b++}y++}else if(F.isRectAreaLight){const Q=e.get(F);Q.color.copy(j).multiplyScalar(Y),Q.halfWidth.set(F.width*.5,0,0),Q.halfHeight.set(0,F.height*.5,0),i.rectArea[m]=Q,m++}else if(F.isPointLight){const Q=e.get(F);if(Q.color.copy(F.color).multiplyScalar(F.intensity),Q.distance=F.distance,Q.decay=F.decay,F.castShadow){const ie=F.shadow,G=t.get(F);G.shadowIntensity=ie.intensity,G.shadowBias=ie.bias,G.shadowNormalBias=ie.normalBias,G.shadowRadius=ie.radius,G.shadowMapSize=ie.mapSize,G.shadowCameraNear=ie.camera.near,G.shadowCameraFar=ie.camera.far,i.pointShadow[x]=G,i.pointShadowMap[x]=ae,i.pointShadowMatrix[x]=F.shadow.matrix,w++}i.point[x]=Q,x++}else if(F.isHemisphereLight){const Q=e.get(F);Q.skyColor.copy(F.color).multiplyScalar(Y),Q.groundColor.copy(F.groundColor).multiplyScalar(Y),i.hemi[h]=Q,h++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Ee.LTC_FLOAT_1,i.rectAreaLTC2=Ee.LTC_FLOAT_2):(i.rectAreaLTC1=Ee.LTC_HALF_1,i.rectAreaLTC2=Ee.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=d,i.ambient[2]=f;const U=i.hash;(U.directionalLength!==p||U.pointLength!==x||U.spotLength!==y||U.rectAreaLength!==m||U.hemiLength!==h||U.numDirectionalShadows!==P||U.numPointShadows!==w||U.numSpotShadows!==b||U.numSpotMaps!==C||U.numLightProbes!==R)&&(i.directional.length=p,i.spot.length=y,i.rectArea.length=m,i.point.length=x,i.hemi.length=h,i.directionalShadow.length=P,i.directionalShadowMap.length=P,i.pointShadow.length=w,i.pointShadowMap.length=w,i.spotShadow.length=b,i.spotShadowMap.length=b,i.directionalShadowMatrix.length=P,i.pointShadowMatrix.length=w,i.spotLightMatrix.length=b+C-S,i.spotLightMap.length=C,i.numSpotLightShadowsWithMaps=S,i.numLightProbes=R,U.directionalLength=p,U.pointLength=x,U.spotLength=y,U.rectAreaLength=m,U.hemiLength=h,U.numDirectionalShadows=P,U.numPointShadows=w,U.numSpotShadows=b,U.numSpotMaps=C,U.numLightProbes=R,i.version=Qy++)}function l(c,u){let d=0,f=0,p=0,x=0,y=0;const m=u.matrixWorldInverse;for(let h=0,P=c.length;h<P;h++){const w=c[h];if(w.isDirectionalLight){const b=i.directional[d];b.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(m),d++}else if(w.isSpotLight){const b=i.spot[p];b.position.setFromMatrixPosition(w.matrixWorld),b.position.applyMatrix4(m),b.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(m),p++}else if(w.isRectAreaLight){const b=i.rectArea[x];b.position.setFromMatrixPosition(w.matrixWorld),b.position.applyMatrix4(m),o.identity(),a.copy(w.matrixWorld),a.premultiply(m),o.extractRotation(a),b.halfWidth.set(w.width*.5,0,0),b.halfHeight.set(0,w.height*.5,0),b.halfWidth.applyMatrix4(o),b.halfHeight.applyMatrix4(o),x++}else if(w.isPointLight){const b=i.point[f];b.position.setFromMatrixPosition(w.matrixWorld),b.position.applyMatrix4(m),f++}else if(w.isHemisphereLight){const b=i.hemi[y];b.direction.setFromMatrixPosition(w.matrixWorld),b.direction.transformDirection(m),y++}}}return{setup:r,setupView:l,state:i}}function uu(n){const e=new tS(n),t=[],i=[];function s(u){c.camera=u,t.length=0,i.length=0}function a(u){t.push(u)}function o(u){i.push(u)}function r(){e.setup(t)}function l(u){e.setupView(t,u)}const c={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:r,setupLightsView:l,pushLight:a,pushShadow:o}}function nS(n){let e=new WeakMap;function t(s,a=0){const o=e.get(s);let r;return o===void 0?(r=new uu(n),e.set(s,[r])):a>=o.length?(r=new uu(n),o.push(r)):r=o[a],r}function i(){e=new WeakMap}return{get:t,dispose:i}}const iS=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,sS=`uniform sampler2D shadow_pass;
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
}`;function aS(n,e,t){let i=new Ec;const s=new Be,a=new Be,o=new Pt,r=new Av({depthPacking:U_}),l=new wv,c={},u=t.maxTextureSize,d={[Ci]:sn,[sn]:Ci,[En]:En},f=new Ri({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Be},radius:{value:4}},vertexShader:iS,fragmentShader:sS}),p=f.clone();p.defines.HORIZONTAL_PASS=1;const x=new Dn;x.setAttribute("position",new Rn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const y=new un(x,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Sf;let h=this.type;this.render=function(S,R,U){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||S.length===0)return;const T=n.getRenderTarget(),A=n.getActiveCubeFace(),F=n.getActiveMipmapLevel(),j=n.state;j.setBlending(Si),j.buffers.depth.getReversed()===!0?j.buffers.color.setClear(0,0,0,0):j.buffers.color.setClear(1,1,1,1),j.buffers.depth.setTest(!0),j.setScissorTest(!1);const Y=h!==Qn&&this.type===Qn,ce=h===Qn&&this.type!==Qn;for(let ae=0,Q=S.length;ae<Q;ae++){const ie=S[ae],G=ie.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",ie,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;s.copy(G.mapSize);const ve=G.getFrameExtents();if(s.multiply(ve),a.copy(G.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(a.x=Math.floor(u/ve.x),s.x=a.x*ve.x,G.mapSize.x=a.x),s.y>u&&(a.y=Math.floor(u/ve.y),s.y=a.y*ve.y,G.mapSize.y=a.y)),G.map===null||Y===!0||ce===!0){const Ie=this.type!==Qn?{minFilter:Cn,magFilter:Cn}:{};G.map!==null&&G.map.dispose(),G.map=new Ki(s.x,s.y,Ie),G.map.texture.name=ie.name+".shadowMap",G.camera.updateProjectionMatrix()}n.setRenderTarget(G.map),n.clear();const Te=G.getViewportCount();for(let Ie=0;Ie<Te;Ie++){const ke=G.getViewport(Ie);o.set(a.x*ke.x,a.y*ke.y,a.x*ke.z,a.y*ke.w),j.viewport(o),G.updateMatrices(ie,Ie),i=G.getFrustum(),b(R,U,G.camera,ie,this.type)}G.isPointLightShadow!==!0&&this.type===Qn&&P(G,U),G.needsUpdate=!1}h=this.type,m.needsUpdate=!1,n.setRenderTarget(T,A,F)};function P(S,R){const U=e.update(y);f.defines.VSM_SAMPLES!==S.blurSamples&&(f.defines.VSM_SAMPLES=S.blurSamples,p.defines.VSM_SAMPLES=S.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),S.mapPass===null&&(S.mapPass=new Ki(s.x,s.y)),f.uniforms.shadow_pass.value=S.map.texture,f.uniforms.resolution.value=S.mapSize,f.uniforms.radius.value=S.radius,n.setRenderTarget(S.mapPass),n.clear(),n.renderBufferDirect(R,null,U,f,y,null),p.uniforms.shadow_pass.value=S.mapPass.texture,p.uniforms.resolution.value=S.mapSize,p.uniforms.radius.value=S.radius,n.setRenderTarget(S.map),n.clear(),n.renderBufferDirect(R,null,U,p,y,null)}function w(S,R,U,T){let A=null;const F=U.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(F!==void 0)A=F;else if(A=U.isPointLight===!0?l:r,n.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){const j=A.uuid,Y=R.uuid;let ce=c[j];ce===void 0&&(ce={},c[j]=ce);let ae=ce[Y];ae===void 0&&(ae=A.clone(),ce[Y]=ae,R.addEventListener("dispose",C)),A=ae}if(A.visible=R.visible,A.wireframe=R.wireframe,T===Qn?A.side=R.shadowSide!==null?R.shadowSide:R.side:A.side=R.shadowSide!==null?R.shadowSide:d[R.side],A.alphaMap=R.alphaMap,A.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,A.map=R.map,A.clipShadows=R.clipShadows,A.clippingPlanes=R.clippingPlanes,A.clipIntersection=R.clipIntersection,A.displacementMap=R.displacementMap,A.displacementScale=R.displacementScale,A.displacementBias=R.displacementBias,A.wireframeLinewidth=R.wireframeLinewidth,A.linewidth=R.linewidth,U.isPointLight===!0&&A.isMeshDistanceMaterial===!0){const j=n.properties.get(A);j.light=U}return A}function b(S,R,U,T,A){if(S.visible===!1)return;if(S.layers.test(R.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&A===Qn)&&(!S.frustumCulled||i.intersectsObject(S))){S.modelViewMatrix.multiplyMatrices(U.matrixWorldInverse,S.matrixWorld);const Y=e.update(S),ce=S.material;if(Array.isArray(ce)){const ae=Y.groups;for(let Q=0,ie=ae.length;Q<ie;Q++){const G=ae[Q],ve=ce[G.materialIndex];if(ve&&ve.visible){const Te=w(S,ve,T,A);S.onBeforeShadow(n,S,R,U,Y,Te,G),n.renderBufferDirect(U,null,Y,Te,S,G),S.onAfterShadow(n,S,R,U,Y,Te,G)}}}else if(ce.visible){const ae=w(S,ce,T,A);S.onBeforeShadow(n,S,R,U,Y,ae,null),n.renderBufferDirect(U,null,Y,ae,S,null),S.onAfterShadow(n,S,R,U,Y,ae,null)}}const j=S.children;for(let Y=0,ce=j.length;Y<ce;Y++)b(j[Y],R,U,T,A)}function C(S){S.target.removeEventListener("dispose",C);for(const U in c){const T=c[U],A=S.target.uuid;A in T&&(T[A].dispose(),delete T[A])}}}const rS={[ol]:ll,[cl]:fl,[dl]:hl,[Bs]:ul,[ll]:ol,[fl]:cl,[hl]:dl,[ul]:Bs};function oS(n,e){function t(){let D=!1;const J=new Pt;let le=null;const he=new Pt(0,0,0,0);return{setMask:function(ee){le!==ee&&!D&&(n.colorMask(ee,ee,ee,ee),le=ee)},setLocked:function(ee){D=ee},setClear:function(ee,te,ye,Fe,Ge){Ge===!0&&(ee*=Fe,te*=Fe,ye*=Fe),J.set(ee,te,ye,Fe),he.equals(J)===!1&&(n.clearColor(ee,te,ye,Fe),he.copy(J))},reset:function(){D=!1,le=null,he.set(-1,0,0,0)}}}function i(){let D=!1,J=!1,le=null,he=null,ee=null;return{setReversed:function(te){if(J!==te){const ye=e.get("EXT_clip_control");te?ye.clipControlEXT(ye.LOWER_LEFT_EXT,ye.ZERO_TO_ONE_EXT):ye.clipControlEXT(ye.LOWER_LEFT_EXT,ye.NEGATIVE_ONE_TO_ONE_EXT),J=te;const Fe=ee;ee=null,this.setClear(Fe)}},getReversed:function(){return J},setTest:function(te){te?ue(n.DEPTH_TEST):Pe(n.DEPTH_TEST)},setMask:function(te){le!==te&&!D&&(n.depthMask(te),le=te)},setFunc:function(te){if(J&&(te=rS[te]),he!==te){switch(te){case ol:n.depthFunc(n.NEVER);break;case ll:n.depthFunc(n.ALWAYS);break;case cl:n.depthFunc(n.LESS);break;case Bs:n.depthFunc(n.LEQUAL);break;case dl:n.depthFunc(n.EQUAL);break;case ul:n.depthFunc(n.GEQUAL);break;case fl:n.depthFunc(n.GREATER);break;case hl:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}he=te}},setLocked:function(te){D=te},setClear:function(te){ee!==te&&(J&&(te=1-te),n.clearDepth(te),ee=te)},reset:function(){D=!1,le=null,he=null,ee=null,J=!1}}}function s(){let D=!1,J=null,le=null,he=null,ee=null,te=null,ye=null,Fe=null,Ge=null;return{setTest:function(Xe){D||(Xe?ue(n.STENCIL_TEST):Pe(n.STENCIL_TEST))},setMask:function(Xe){J!==Xe&&!D&&(n.stencilMask(Xe),J=Xe)},setFunc:function(Xe,Lt,yt){(le!==Xe||he!==Lt||ee!==yt)&&(n.stencilFunc(Xe,Lt,yt),le=Xe,he=Lt,ee=yt)},setOp:function(Xe,Lt,yt){(te!==Xe||ye!==Lt||Fe!==yt)&&(n.stencilOp(Xe,Lt,yt),te=Xe,ye=Lt,Fe=yt)},setLocked:function(Xe){D=Xe},setClear:function(Xe){Ge!==Xe&&(n.clearStencil(Xe),Ge=Xe)},reset:function(){D=!1,J=null,le=null,he=null,ee=null,te=null,ye=null,Fe=null,Ge=null}}}const a=new t,o=new i,r=new s,l=new WeakMap,c=new WeakMap;let u={},d={},f=new WeakMap,p=[],x=null,y=!1,m=null,h=null,P=null,w=null,b=null,C=null,S=null,R=new it(0,0,0),U=0,T=!1,A=null,F=null,j=null,Y=null,ce=null;const ae=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Q=!1,ie=0;const G=n.getParameter(n.VERSION);G.indexOf("WebGL")!==-1?(ie=parseFloat(/^WebGL (\d)/.exec(G)[1]),Q=ie>=1):G.indexOf("OpenGL ES")!==-1&&(ie=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),Q=ie>=2);let ve=null,Te={};const Ie=n.getParameter(n.SCISSOR_BOX),ke=n.getParameter(n.VIEWPORT),ot=new Pt().fromArray(Ie),ut=new Pt().fromArray(ke);function nt(D,J,le,he){const ee=new Uint8Array(4),te=n.createTexture();n.bindTexture(D,te),n.texParameteri(D,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(D,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let ye=0;ye<le;ye++)D===n.TEXTURE_3D||D===n.TEXTURE_2D_ARRAY?n.texImage3D(J,0,n.RGBA,1,1,he,0,n.RGBA,n.UNSIGNED_BYTE,ee):n.texImage2D(J+ye,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ee);return te}const oe={};oe[n.TEXTURE_2D]=nt(n.TEXTURE_2D,n.TEXTURE_2D,1),oe[n.TEXTURE_CUBE_MAP]=nt(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),oe[n.TEXTURE_2D_ARRAY]=nt(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),oe[n.TEXTURE_3D]=nt(n.TEXTURE_3D,n.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),r.setClear(0),ue(n.DEPTH_TEST),o.setFunc(Bs),O(!1),z(cd),ue(n.CULL_FACE),L(Si);function ue(D){u[D]!==!0&&(n.enable(D),u[D]=!0)}function Pe(D){u[D]!==!1&&(n.disable(D),u[D]=!1)}function ze(D,J){return d[D]!==J?(n.bindFramebuffer(D,J),d[D]=J,D===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=J),D===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=J),!0):!1}function Ue(D,J){let le=p,he=!1;if(D){le=f.get(J),le===void 0&&(le=[],f.set(J,le));const ee=D.textures;if(le.length!==ee.length||le[0]!==n.COLOR_ATTACHMENT0){for(let te=0,ye=ee.length;te<ye;te++)le[te]=n.COLOR_ATTACHMENT0+te;le.length=ee.length,he=!0}}else le[0]!==n.BACK&&(le[0]=n.BACK,he=!0);he&&n.drawBuffers(le)}function Je(D){return x!==D?(n.useProgram(D),x=D,!0):!1}const I={[ki]:n.FUNC_ADD,[r_]:n.FUNC_SUBTRACT,[o_]:n.FUNC_REVERSE_SUBTRACT};I[l_]=n.MIN,I[c_]=n.MAX;const g={[d_]:n.ZERO,[u_]:n.ONE,[f_]:n.SRC_COLOR,[al]:n.SRC_ALPHA,[v_]:n.SRC_ALPHA_SATURATE,[g_]:n.DST_COLOR,[p_]:n.DST_ALPHA,[h_]:n.ONE_MINUS_SRC_COLOR,[rl]:n.ONE_MINUS_SRC_ALPHA,[__]:n.ONE_MINUS_DST_COLOR,[m_]:n.ONE_MINUS_DST_ALPHA,[b_]:n.CONSTANT_COLOR,[x_]:n.ONE_MINUS_CONSTANT_COLOR,[y_]:n.CONSTANT_ALPHA,[S_]:n.ONE_MINUS_CONSTANT_ALPHA};function L(D,J,le,he,ee,te,ye,Fe,Ge,Xe){if(D===Si){y===!0&&(Pe(n.BLEND),y=!1);return}if(y===!1&&(ue(n.BLEND),y=!0),D!==a_){if(D!==m||Xe!==T){if((h!==ki||b!==ki)&&(n.blendEquation(n.FUNC_ADD),h=ki,b=ki),Xe)switch(D){case Us:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case dd:n.blendFunc(n.ONE,n.ONE);break;case ud:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case fd:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case Us:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case dd:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case ud:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case fd:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}P=null,w=null,C=null,S=null,R.set(0,0,0),U=0,m=D,T=Xe}return}ee=ee||J,te=te||le,ye=ye||he,(J!==h||ee!==b)&&(n.blendEquationSeparate(I[J],I[ee]),h=J,b=ee),(le!==P||he!==w||te!==C||ye!==S)&&(n.blendFuncSeparate(g[le],g[he],g[te],g[ye]),P=le,w=he,C=te,S=ye),(Fe.equals(R)===!1||Ge!==U)&&(n.blendColor(Fe.r,Fe.g,Fe.b,Ge),R.copy(Fe),U=Ge),m=D,T=!1}function k(D,J){D.side===En?Pe(n.CULL_FACE):ue(n.CULL_FACE);let le=D.side===sn;J&&(le=!le),O(le),D.blending===Us&&D.transparent===!1?L(Si):L(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),o.setFunc(D.depthFunc),o.setTest(D.depthTest),o.setMask(D.depthWrite),a.setMask(D.colorWrite);const he=D.stencilWrite;r.setTest(he),he&&(r.setMask(D.stencilWriteMask),r.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),r.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),X(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?ue(n.SAMPLE_ALPHA_TO_COVERAGE):Pe(n.SAMPLE_ALPHA_TO_COVERAGE)}function O(D){A!==D&&(D?n.frontFace(n.CW):n.frontFace(n.CCW),A=D)}function z(D){D!==n_?(ue(n.CULL_FACE),D!==F&&(D===cd?n.cullFace(n.BACK):D===i_?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Pe(n.CULL_FACE),F=D}function de(D){D!==j&&(Q&&n.lineWidth(D),j=D)}function X(D,J,le){D?(ue(n.POLYGON_OFFSET_FILL),(Y!==J||ce!==le)&&(n.polygonOffset(J,le),Y=J,ce=le)):Pe(n.POLYGON_OFFSET_FILL)}function se(D){D?ue(n.SCISSOR_TEST):Pe(n.SCISSOR_TEST)}function re(D){D===void 0&&(D=n.TEXTURE0+ae-1),ve!==D&&(n.activeTexture(D),ve=D)}function be(D,J,le){le===void 0&&(ve===null?le=n.TEXTURE0+ae-1:le=ve);let he=Te[le];he===void 0&&(he={type:void 0,texture:void 0},Te[le]=he),(he.type!==D||he.texture!==J)&&(ve!==le&&(n.activeTexture(le),ve=le),n.bindTexture(D,J||oe[D]),he.type=D,he.texture=J)}function M(){const D=Te[ve];D!==void 0&&D.type!==void 0&&(n.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function v(){try{n.compressedTexImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function N(){try{n.compressedTexImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function q(){try{n.texSubImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ne(){try{n.texSubImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function W(){try{n.compressedTexSubImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Se(){try{n.compressedTexSubImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function fe(){try{n.texStorage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ae(){try{n.texStorage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Re(){try{n.texImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function pe(){try{n.texImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Me(D){ot.equals(D)===!1&&(n.scissor(D.x,D.y,D.z,D.w),ot.copy(D))}function Le(D){ut.equals(D)===!1&&(n.viewport(D.x,D.y,D.z,D.w),ut.copy(D))}function Ce(D,J){let le=c.get(J);le===void 0&&(le=new WeakMap,c.set(J,le));let he=le.get(D);he===void 0&&(he=n.getUniformBlockIndex(J,D.name),le.set(D,he))}function xe(D,J){const he=c.get(J).get(D);l.get(J)!==he&&(n.uniformBlockBinding(J,he,D.__bindingPointIndex),l.set(J,he))}function $e(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},ve=null,Te={},d={},f=new WeakMap,p=[],x=null,y=!1,m=null,h=null,P=null,w=null,b=null,C=null,S=null,R=new it(0,0,0),U=0,T=!1,A=null,F=null,j=null,Y=null,ce=null,ot.set(0,0,n.canvas.width,n.canvas.height),ut.set(0,0,n.canvas.width,n.canvas.height),a.reset(),o.reset(),r.reset()}return{buffers:{color:a,depth:o,stencil:r},enable:ue,disable:Pe,bindFramebuffer:ze,drawBuffers:Ue,useProgram:Je,setBlending:L,setMaterial:k,setFlipSided:O,setCullFace:z,setLineWidth:de,setPolygonOffset:X,setScissorTest:se,activeTexture:re,bindTexture:be,unbindTexture:M,compressedTexImage2D:v,compressedTexImage3D:N,texImage2D:Re,texImage3D:pe,updateUBOMapping:Ce,uniformBlockBinding:xe,texStorage2D:fe,texStorage3D:Ae,texSubImage2D:q,texSubImage3D:ne,compressedTexSubImage2D:W,compressedTexSubImage3D:Se,scissor:Me,viewport:Le,reset:$e}}function lS(n,e,t,i,s,a,o){const r=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Be,u=new WeakMap;let d;const f=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(M,v){return p?new OffscreenCanvas(M,v):Lr("canvas")}function y(M,v,N){let q=1;const ne=be(M);if((ne.width>N||ne.height>N)&&(q=N/Math.max(ne.width,ne.height)),q<1)if(typeof HTMLImageElement<"u"&&M instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&M instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&M instanceof ImageBitmap||typeof VideoFrame<"u"&&M instanceof VideoFrame){const W=Math.floor(q*ne.width),Se=Math.floor(q*ne.height);d===void 0&&(d=x(W,Se));const fe=v?x(W,Se):d;return fe.width=W,fe.height=Se,fe.getContext("2d").drawImage(M,0,0,W,Se),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ne.width+"x"+ne.height+") to ("+W+"x"+Se+")."),fe}else return"data"in M&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ne.width+"x"+ne.height+")."),M;return M}function m(M){return M.generateMipmaps}function h(M){n.generateMipmap(M)}function P(M){return M.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:M.isWebGL3DRenderTarget?n.TEXTURE_3D:M.isWebGLArrayRenderTarget||M.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function w(M,v,N,q,ne=!1){if(M!==null){if(n[M]!==void 0)return n[M];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+M+"'")}let W=v;if(v===n.RED&&(N===n.FLOAT&&(W=n.R32F),N===n.HALF_FLOAT&&(W=n.R16F),N===n.UNSIGNED_BYTE&&(W=n.R8)),v===n.RED_INTEGER&&(N===n.UNSIGNED_BYTE&&(W=n.R8UI),N===n.UNSIGNED_SHORT&&(W=n.R16UI),N===n.UNSIGNED_INT&&(W=n.R32UI),N===n.BYTE&&(W=n.R8I),N===n.SHORT&&(W=n.R16I),N===n.INT&&(W=n.R32I)),v===n.RG&&(N===n.FLOAT&&(W=n.RG32F),N===n.HALF_FLOAT&&(W=n.RG16F),N===n.UNSIGNED_BYTE&&(W=n.RG8)),v===n.RG_INTEGER&&(N===n.UNSIGNED_BYTE&&(W=n.RG8UI),N===n.UNSIGNED_SHORT&&(W=n.RG16UI),N===n.UNSIGNED_INT&&(W=n.RG32UI),N===n.BYTE&&(W=n.RG8I),N===n.SHORT&&(W=n.RG16I),N===n.INT&&(W=n.RG32I)),v===n.RGB_INTEGER&&(N===n.UNSIGNED_BYTE&&(W=n.RGB8UI),N===n.UNSIGNED_SHORT&&(W=n.RGB16UI),N===n.UNSIGNED_INT&&(W=n.RGB32UI),N===n.BYTE&&(W=n.RGB8I),N===n.SHORT&&(W=n.RGB16I),N===n.INT&&(W=n.RGB32I)),v===n.RGBA_INTEGER&&(N===n.UNSIGNED_BYTE&&(W=n.RGBA8UI),N===n.UNSIGNED_SHORT&&(W=n.RGBA16UI),N===n.UNSIGNED_INT&&(W=n.RGBA32UI),N===n.BYTE&&(W=n.RGBA8I),N===n.SHORT&&(W=n.RGBA16I),N===n.INT&&(W=n.RGBA32I)),v===n.RGB&&(N===n.UNSIGNED_INT_5_9_9_9_REV&&(W=n.RGB9_E5),N===n.UNSIGNED_INT_10F_11F_11F_REV&&(W=n.R11F_G11F_B10F)),v===n.RGBA){const Se=ne?Dr:rt.getTransfer(q);N===n.FLOAT&&(W=n.RGBA32F),N===n.HALF_FLOAT&&(W=n.RGBA16F),N===n.UNSIGNED_BYTE&&(W=Se===ht?n.SRGB8_ALPHA8:n.RGBA8),N===n.UNSIGNED_SHORT_4_4_4_4&&(W=n.RGBA4),N===n.UNSIGNED_SHORT_5_5_5_1&&(W=n.RGB5_A1)}return(W===n.R16F||W===n.R32F||W===n.RG16F||W===n.RG32F||W===n.RGBA16F||W===n.RGBA32F)&&e.get("EXT_color_buffer_float"),W}function b(M,v){let N;return M?v===null||v===Xi||v===ba?N=n.DEPTH24_STENCIL8:v===ii?N=n.DEPTH32F_STENCIL8:v===va&&(N=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===Xi||v===ba?N=n.DEPTH_COMPONENT24:v===ii?N=n.DEPTH_COMPONENT32F:v===va&&(N=n.DEPTH_COMPONENT16),N}function C(M,v){return m(M)===!0||M.isFramebufferTexture&&M.minFilter!==Cn&&M.minFilter!==Bn?Math.log2(Math.max(v.width,v.height))+1:M.mipmaps!==void 0&&M.mipmaps.length>0?M.mipmaps.length:M.isCompressedTexture&&Array.isArray(M.image)?v.mipmaps.length:1}function S(M){const v=M.target;v.removeEventListener("dispose",S),U(v),v.isVideoTexture&&u.delete(v)}function R(M){const v=M.target;v.removeEventListener("dispose",R),A(v)}function U(M){const v=i.get(M);if(v.__webglInit===void 0)return;const N=M.source,q=f.get(N);if(q){const ne=q[v.__cacheKey];ne.usedTimes--,ne.usedTimes===0&&T(M),Object.keys(q).length===0&&f.delete(N)}i.remove(M)}function T(M){const v=i.get(M);n.deleteTexture(v.__webglTexture);const N=M.source,q=f.get(N);delete q[v.__cacheKey],o.memory.textures--}function A(M){const v=i.get(M);if(M.depthTexture&&(M.depthTexture.dispose(),i.remove(M.depthTexture)),M.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(v.__webglFramebuffer[q]))for(let ne=0;ne<v.__webglFramebuffer[q].length;ne++)n.deleteFramebuffer(v.__webglFramebuffer[q][ne]);else n.deleteFramebuffer(v.__webglFramebuffer[q]);v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer[q])}else{if(Array.isArray(v.__webglFramebuffer))for(let q=0;q<v.__webglFramebuffer.length;q++)n.deleteFramebuffer(v.__webglFramebuffer[q]);else n.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&n.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let q=0;q<v.__webglColorRenderbuffer.length;q++)v.__webglColorRenderbuffer[q]&&n.deleteRenderbuffer(v.__webglColorRenderbuffer[q]);v.__webglDepthRenderbuffer&&n.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const N=M.textures;for(let q=0,ne=N.length;q<ne;q++){const W=i.get(N[q]);W.__webglTexture&&(n.deleteTexture(W.__webglTexture),o.memory.textures--),i.remove(N[q])}i.remove(M)}let F=0;function j(){F=0}function Y(){const M=F;return M>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+M+" texture units while this GPU supports only "+s.maxTextures),F+=1,M}function ce(M){const v=[];return v.push(M.wrapS),v.push(M.wrapT),v.push(M.wrapR||0),v.push(M.magFilter),v.push(M.minFilter),v.push(M.anisotropy),v.push(M.internalFormat),v.push(M.format),v.push(M.type),v.push(M.generateMipmaps),v.push(M.premultiplyAlpha),v.push(M.flipY),v.push(M.unpackAlignment),v.push(M.colorSpace),v.join()}function ae(M,v){const N=i.get(M);if(M.isVideoTexture&&se(M),M.isRenderTargetTexture===!1&&M.isExternalTexture!==!0&&M.version>0&&N.__version!==M.version){const q=M.image;if(q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{oe(N,M,v);return}}else M.isExternalTexture&&(N.__webglTexture=M.sourceTexture?M.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,N.__webglTexture,n.TEXTURE0+v)}function Q(M,v){const N=i.get(M);if(M.isRenderTargetTexture===!1&&M.version>0&&N.__version!==M.version){oe(N,M,v);return}t.bindTexture(n.TEXTURE_2D_ARRAY,N.__webglTexture,n.TEXTURE0+v)}function ie(M,v){const N=i.get(M);if(M.isRenderTargetTexture===!1&&M.version>0&&N.__version!==M.version){oe(N,M,v);return}t.bindTexture(n.TEXTURE_3D,N.__webglTexture,n.TEXTURE0+v)}function G(M,v){const N=i.get(M);if(M.version>0&&N.__version!==M.version){ue(N,M,v);return}t.bindTexture(n.TEXTURE_CUBE_MAP,N.__webglTexture,n.TEXTURE0+v)}const ve={[gl]:n.REPEAT,[Wi]:n.CLAMP_TO_EDGE,[_l]:n.MIRRORED_REPEAT},Te={[Cn]:n.NEAREST,[I_]:n.NEAREST_MIPMAP_NEAREST,[Ba]:n.NEAREST_MIPMAP_LINEAR,[Bn]:n.LINEAR,[fo]:n.LINEAR_MIPMAP_NEAREST,[ji]:n.LINEAR_MIPMAP_LINEAR},Ie={[F_]:n.NEVER,[k_]:n.ALWAYS,[O_]:n.LESS,[Uf]:n.LEQUAL,[B_]:n.EQUAL,[V_]:n.GEQUAL,[z_]:n.GREATER,[H_]:n.NOTEQUAL};function ke(M,v){if(v.type===ii&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===Bn||v.magFilter===fo||v.magFilter===Ba||v.magFilter===ji||v.minFilter===Bn||v.minFilter===fo||v.minFilter===Ba||v.minFilter===ji)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(M,n.TEXTURE_WRAP_S,ve[v.wrapS]),n.texParameteri(M,n.TEXTURE_WRAP_T,ve[v.wrapT]),(M===n.TEXTURE_3D||M===n.TEXTURE_2D_ARRAY)&&n.texParameteri(M,n.TEXTURE_WRAP_R,ve[v.wrapR]),n.texParameteri(M,n.TEXTURE_MAG_FILTER,Te[v.magFilter]),n.texParameteri(M,n.TEXTURE_MIN_FILTER,Te[v.minFilter]),v.compareFunction&&(n.texParameteri(M,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(M,n.TEXTURE_COMPARE_FUNC,Ie[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Cn||v.minFilter!==Ba&&v.minFilter!==ji||v.type===ii&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||i.get(v).__currentAnisotropy){const N=e.get("EXT_texture_filter_anisotropic");n.texParameterf(M,N.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),i.get(v).__currentAnisotropy=v.anisotropy}}}function ot(M,v){let N=!1;M.__webglInit===void 0&&(M.__webglInit=!0,v.addEventListener("dispose",S));const q=v.source;let ne=f.get(q);ne===void 0&&(ne={},f.set(q,ne));const W=ce(v);if(W!==M.__cacheKey){ne[W]===void 0&&(ne[W]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,N=!0),ne[W].usedTimes++;const Se=ne[M.__cacheKey];Se!==void 0&&(ne[M.__cacheKey].usedTimes--,Se.usedTimes===0&&T(v)),M.__cacheKey=W,M.__webglTexture=ne[W].texture}return N}function ut(M,v,N){return Math.floor(Math.floor(M/N)/v)}function nt(M,v,N,q){const W=M.updateRanges;if(W.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,v.width,v.height,N,q,v.data);else{W.sort((pe,Me)=>pe.start-Me.start);let Se=0;for(let pe=1;pe<W.length;pe++){const Me=W[Se],Le=W[pe],Ce=Me.start+Me.count,xe=ut(Le.start,v.width,4),$e=ut(Me.start,v.width,4);Le.start<=Ce+1&&xe===$e&&ut(Le.start+Le.count-1,v.width,4)===xe?Me.count=Math.max(Me.count,Le.start+Le.count-Me.start):(++Se,W[Se]=Le)}W.length=Se+1;const fe=n.getParameter(n.UNPACK_ROW_LENGTH),Ae=n.getParameter(n.UNPACK_SKIP_PIXELS),Re=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,v.width);for(let pe=0,Me=W.length;pe<Me;pe++){const Le=W[pe],Ce=Math.floor(Le.start/4),xe=Math.ceil(Le.count/4),$e=Ce%v.width,D=Math.floor(Ce/v.width),J=xe,le=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,$e),n.pixelStorei(n.UNPACK_SKIP_ROWS,D),t.texSubImage2D(n.TEXTURE_2D,0,$e,D,J,le,N,q,v.data)}M.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,fe),n.pixelStorei(n.UNPACK_SKIP_PIXELS,Ae),n.pixelStorei(n.UNPACK_SKIP_ROWS,Re)}}function oe(M,v,N){let q=n.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(q=n.TEXTURE_2D_ARRAY),v.isData3DTexture&&(q=n.TEXTURE_3D);const ne=ot(M,v),W=v.source;t.bindTexture(q,M.__webglTexture,n.TEXTURE0+N);const Se=i.get(W);if(W.version!==Se.__version||ne===!0){t.activeTexture(n.TEXTURE0+N);const fe=rt.getPrimaries(rt.workingColorSpace),Ae=v.colorSpace===xi?null:rt.getPrimaries(v.colorSpace),Re=v.colorSpace===xi||fe===Ae?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Re);let pe=y(v.image,!1,s.maxTextureSize);pe=re(v,pe);const Me=a.convert(v.format,v.colorSpace),Le=a.convert(v.type);let Ce=w(v.internalFormat,Me,Le,v.colorSpace,v.isVideoTexture);ke(q,v);let xe;const $e=v.mipmaps,D=v.isVideoTexture!==!0,J=Se.__version===void 0||ne===!0,le=W.dataReady,he=C(v,pe);if(v.isDepthTexture)Ce=b(v.format===ya,v.type),J&&(D?t.texStorage2D(n.TEXTURE_2D,1,Ce,pe.width,pe.height):t.texImage2D(n.TEXTURE_2D,0,Ce,pe.width,pe.height,0,Me,Le,null));else if(v.isDataTexture)if($e.length>0){D&&J&&t.texStorage2D(n.TEXTURE_2D,he,Ce,$e[0].width,$e[0].height);for(let ee=0,te=$e.length;ee<te;ee++)xe=$e[ee],D?le&&t.texSubImage2D(n.TEXTURE_2D,ee,0,0,xe.width,xe.height,Me,Le,xe.data):t.texImage2D(n.TEXTURE_2D,ee,Ce,xe.width,xe.height,0,Me,Le,xe.data);v.generateMipmaps=!1}else D?(J&&t.texStorage2D(n.TEXTURE_2D,he,Ce,pe.width,pe.height),le&&nt(v,pe,Me,Le)):t.texImage2D(n.TEXTURE_2D,0,Ce,pe.width,pe.height,0,Me,Le,pe.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){D&&J&&t.texStorage3D(n.TEXTURE_2D_ARRAY,he,Ce,$e[0].width,$e[0].height,pe.depth);for(let ee=0,te=$e.length;ee<te;ee++)if(xe=$e[ee],v.format!==Tn)if(Me!==null)if(D){if(le)if(v.layerUpdates.size>0){const ye=Vd(xe.width,xe.height,v.format,v.type);for(const Fe of v.layerUpdates){const Ge=xe.data.subarray(Fe*ye/xe.data.BYTES_PER_ELEMENT,(Fe+1)*ye/xe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ee,0,0,Fe,xe.width,xe.height,1,Me,Ge)}v.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ee,0,0,0,xe.width,xe.height,pe.depth,Me,xe.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ee,Ce,xe.width,xe.height,pe.depth,0,xe.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else D?le&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,ee,0,0,0,xe.width,xe.height,pe.depth,Me,Le,xe.data):t.texImage3D(n.TEXTURE_2D_ARRAY,ee,Ce,xe.width,xe.height,pe.depth,0,Me,Le,xe.data)}else{D&&J&&t.texStorage2D(n.TEXTURE_2D,he,Ce,$e[0].width,$e[0].height);for(let ee=0,te=$e.length;ee<te;ee++)xe=$e[ee],v.format!==Tn?Me!==null?D?le&&t.compressedTexSubImage2D(n.TEXTURE_2D,ee,0,0,xe.width,xe.height,Me,xe.data):t.compressedTexImage2D(n.TEXTURE_2D,ee,Ce,xe.width,xe.height,0,xe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):D?le&&t.texSubImage2D(n.TEXTURE_2D,ee,0,0,xe.width,xe.height,Me,Le,xe.data):t.texImage2D(n.TEXTURE_2D,ee,Ce,xe.width,xe.height,0,Me,Le,xe.data)}else if(v.isDataArrayTexture)if(D){if(J&&t.texStorage3D(n.TEXTURE_2D_ARRAY,he,Ce,pe.width,pe.height,pe.depth),le)if(v.layerUpdates.size>0){const ee=Vd(pe.width,pe.height,v.format,v.type);for(const te of v.layerUpdates){const ye=pe.data.subarray(te*ee/pe.data.BYTES_PER_ELEMENT,(te+1)*ee/pe.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,te,pe.width,pe.height,1,Me,Le,ye)}v.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,pe.width,pe.height,pe.depth,Me,Le,pe.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Ce,pe.width,pe.height,pe.depth,0,Me,Le,pe.data);else if(v.isData3DTexture)D?(J&&t.texStorage3D(n.TEXTURE_3D,he,Ce,pe.width,pe.height,pe.depth),le&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,pe.width,pe.height,pe.depth,Me,Le,pe.data)):t.texImage3D(n.TEXTURE_3D,0,Ce,pe.width,pe.height,pe.depth,0,Me,Le,pe.data);else if(v.isFramebufferTexture){if(J)if(D)t.texStorage2D(n.TEXTURE_2D,he,Ce,pe.width,pe.height);else{let ee=pe.width,te=pe.height;for(let ye=0;ye<he;ye++)t.texImage2D(n.TEXTURE_2D,ye,Ce,ee,te,0,Me,Le,null),ee>>=1,te>>=1}}else if($e.length>0){if(D&&J){const ee=be($e[0]);t.texStorage2D(n.TEXTURE_2D,he,Ce,ee.width,ee.height)}for(let ee=0,te=$e.length;ee<te;ee++)xe=$e[ee],D?le&&t.texSubImage2D(n.TEXTURE_2D,ee,0,0,Me,Le,xe):t.texImage2D(n.TEXTURE_2D,ee,Ce,Me,Le,xe);v.generateMipmaps=!1}else if(D){if(J){const ee=be(pe);t.texStorage2D(n.TEXTURE_2D,he,Ce,ee.width,ee.height)}le&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,Me,Le,pe)}else t.texImage2D(n.TEXTURE_2D,0,Ce,Me,Le,pe);m(v)&&h(q),Se.__version=W.version,v.onUpdate&&v.onUpdate(v)}M.__version=v.version}function ue(M,v,N){if(v.image.length!==6)return;const q=ot(M,v),ne=v.source;t.bindTexture(n.TEXTURE_CUBE_MAP,M.__webglTexture,n.TEXTURE0+N);const W=i.get(ne);if(ne.version!==W.__version||q===!0){t.activeTexture(n.TEXTURE0+N);const Se=rt.getPrimaries(rt.workingColorSpace),fe=v.colorSpace===xi?null:rt.getPrimaries(v.colorSpace),Ae=v.colorSpace===xi||Se===fe?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ae);const Re=v.isCompressedTexture||v.image[0].isCompressedTexture,pe=v.image[0]&&v.image[0].isDataTexture,Me=[];for(let te=0;te<6;te++)!Re&&!pe?Me[te]=y(v.image[te],!0,s.maxCubemapSize):Me[te]=pe?v.image[te].image:v.image[te],Me[te]=re(v,Me[te]);const Le=Me[0],Ce=a.convert(v.format,v.colorSpace),xe=a.convert(v.type),$e=w(v.internalFormat,Ce,xe,v.colorSpace),D=v.isVideoTexture!==!0,J=W.__version===void 0||q===!0,le=ne.dataReady;let he=C(v,Le);ke(n.TEXTURE_CUBE_MAP,v);let ee;if(Re){D&&J&&t.texStorage2D(n.TEXTURE_CUBE_MAP,he,$e,Le.width,Le.height);for(let te=0;te<6;te++){ee=Me[te].mipmaps;for(let ye=0;ye<ee.length;ye++){const Fe=ee[ye];v.format!==Tn?Ce!==null?D?le&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,ye,0,0,Fe.width,Fe.height,Ce,Fe.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,ye,$e,Fe.width,Fe.height,0,Fe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):D?le&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,ye,0,0,Fe.width,Fe.height,Ce,xe,Fe.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,ye,$e,Fe.width,Fe.height,0,Ce,xe,Fe.data)}}}else{if(ee=v.mipmaps,D&&J){ee.length>0&&he++;const te=be(Me[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,he,$e,te.width,te.height)}for(let te=0;te<6;te++)if(pe){D?le&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,Me[te].width,Me[te].height,Ce,xe,Me[te].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,$e,Me[te].width,Me[te].height,0,Ce,xe,Me[te].data);for(let ye=0;ye<ee.length;ye++){const Ge=ee[ye].image[te].image;D?le&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,ye+1,0,0,Ge.width,Ge.height,Ce,xe,Ge.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,ye+1,$e,Ge.width,Ge.height,0,Ce,xe,Ge.data)}}else{D?le&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,Ce,xe,Me[te]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,$e,Ce,xe,Me[te]);for(let ye=0;ye<ee.length;ye++){const Fe=ee[ye];D?le&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,ye+1,0,0,Ce,xe,Fe.image[te]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,ye+1,$e,Ce,xe,Fe.image[te])}}}m(v)&&h(n.TEXTURE_CUBE_MAP),W.__version=ne.version,v.onUpdate&&v.onUpdate(v)}M.__version=v.version}function Pe(M,v,N,q,ne,W){const Se=a.convert(N.format,N.colorSpace),fe=a.convert(N.type),Ae=w(N.internalFormat,Se,fe,N.colorSpace),Re=i.get(v),pe=i.get(N);if(pe.__renderTarget=v,!Re.__hasExternalTextures){const Me=Math.max(1,v.width>>W),Le=Math.max(1,v.height>>W);ne===n.TEXTURE_3D||ne===n.TEXTURE_2D_ARRAY?t.texImage3D(ne,W,Ae,Me,Le,v.depth,0,Se,fe,null):t.texImage2D(ne,W,Ae,Me,Le,0,Se,fe,null)}t.bindFramebuffer(n.FRAMEBUFFER,M),X(v)?r.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,q,ne,pe.__webglTexture,0,de(v)):(ne===n.TEXTURE_2D||ne>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&ne<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,q,ne,pe.__webglTexture,W),t.bindFramebuffer(n.FRAMEBUFFER,null)}function ze(M,v,N){if(n.bindRenderbuffer(n.RENDERBUFFER,M),v.depthBuffer){const q=v.depthTexture,ne=q&&q.isDepthTexture?q.type:null,W=b(v.stencilBuffer,ne),Se=v.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,fe=de(v);X(v)?r.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,fe,W,v.width,v.height):N?n.renderbufferStorageMultisample(n.RENDERBUFFER,fe,W,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,W,v.width,v.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Se,n.RENDERBUFFER,M)}else{const q=v.textures;for(let ne=0;ne<q.length;ne++){const W=q[ne],Se=a.convert(W.format,W.colorSpace),fe=a.convert(W.type),Ae=w(W.internalFormat,Se,fe,W.colorSpace),Re=de(v);N&&X(v)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Re,Ae,v.width,v.height):X(v)?r.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Re,Ae,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,Ae,v.width,v.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Ue(M,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,M),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const q=i.get(v.depthTexture);q.__renderTarget=v,(!q.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),ae(v.depthTexture,0);const ne=q.__webglTexture,W=de(v);if(v.depthTexture.format===xa)X(v)?r.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ne,0,W):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ne,0);else if(v.depthTexture.format===ya)X(v)?r.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ne,0,W):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ne,0);else throw new Error("Unknown depthTexture format")}function Je(M){const v=i.get(M),N=M.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==M.depthTexture){const q=M.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),q){const ne=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,q.removeEventListener("dispose",ne)};q.addEventListener("dispose",ne),v.__depthDisposeCallback=ne}v.__boundDepthTexture=q}if(M.depthTexture&&!v.__autoAllocateDepthBuffer){if(N)throw new Error("target.depthTexture not supported in Cube render targets");const q=M.texture.mipmaps;q&&q.length>0?Ue(v.__webglFramebuffer[0],M):Ue(v.__webglFramebuffer,M)}else if(N){v.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[q]),v.__webglDepthbuffer[q]===void 0)v.__webglDepthbuffer[q]=n.createRenderbuffer(),ze(v.__webglDepthbuffer[q],M,!1);else{const ne=M.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,W=v.__webglDepthbuffer[q];n.bindRenderbuffer(n.RENDERBUFFER,W),n.framebufferRenderbuffer(n.FRAMEBUFFER,ne,n.RENDERBUFFER,W)}}else{const q=M.texture.mipmaps;if(q&&q.length>0?t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=n.createRenderbuffer(),ze(v.__webglDepthbuffer,M,!1);else{const ne=M.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,W=v.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,W),n.framebufferRenderbuffer(n.FRAMEBUFFER,ne,n.RENDERBUFFER,W)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function I(M,v,N){const q=i.get(M);v!==void 0&&Pe(q.__webglFramebuffer,M,M.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),N!==void 0&&Je(M)}function g(M){const v=M.texture,N=i.get(M),q=i.get(v);M.addEventListener("dispose",R);const ne=M.textures,W=M.isWebGLCubeRenderTarget===!0,Se=ne.length>1;if(Se||(q.__webglTexture===void 0&&(q.__webglTexture=n.createTexture()),q.__version=v.version,o.memory.textures++),W){N.__webglFramebuffer=[];for(let fe=0;fe<6;fe++)if(v.mipmaps&&v.mipmaps.length>0){N.__webglFramebuffer[fe]=[];for(let Ae=0;Ae<v.mipmaps.length;Ae++)N.__webglFramebuffer[fe][Ae]=n.createFramebuffer()}else N.__webglFramebuffer[fe]=n.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){N.__webglFramebuffer=[];for(let fe=0;fe<v.mipmaps.length;fe++)N.__webglFramebuffer[fe]=n.createFramebuffer()}else N.__webglFramebuffer=n.createFramebuffer();if(Se)for(let fe=0,Ae=ne.length;fe<Ae;fe++){const Re=i.get(ne[fe]);Re.__webglTexture===void 0&&(Re.__webglTexture=n.createTexture(),o.memory.textures++)}if(M.samples>0&&X(M)===!1){N.__webglMultisampledFramebuffer=n.createFramebuffer(),N.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,N.__webglMultisampledFramebuffer);for(let fe=0;fe<ne.length;fe++){const Ae=ne[fe];N.__webglColorRenderbuffer[fe]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,N.__webglColorRenderbuffer[fe]);const Re=a.convert(Ae.format,Ae.colorSpace),pe=a.convert(Ae.type),Me=w(Ae.internalFormat,Re,pe,Ae.colorSpace,M.isXRRenderTarget===!0),Le=de(M);n.renderbufferStorageMultisample(n.RENDERBUFFER,Le,Me,M.width,M.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+fe,n.RENDERBUFFER,N.__webglColorRenderbuffer[fe])}n.bindRenderbuffer(n.RENDERBUFFER,null),M.depthBuffer&&(N.__webglDepthRenderbuffer=n.createRenderbuffer(),ze(N.__webglDepthRenderbuffer,M,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(W){t.bindTexture(n.TEXTURE_CUBE_MAP,q.__webglTexture),ke(n.TEXTURE_CUBE_MAP,v);for(let fe=0;fe<6;fe++)if(v.mipmaps&&v.mipmaps.length>0)for(let Ae=0;Ae<v.mipmaps.length;Ae++)Pe(N.__webglFramebuffer[fe][Ae],M,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Ae);else Pe(N.__webglFramebuffer[fe],M,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0);m(v)&&h(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Se){for(let fe=0,Ae=ne.length;fe<Ae;fe++){const Re=ne[fe],pe=i.get(Re);let Me=n.TEXTURE_2D;(M.isWebGL3DRenderTarget||M.isWebGLArrayRenderTarget)&&(Me=M.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(Me,pe.__webglTexture),ke(Me,Re),Pe(N.__webglFramebuffer,M,Re,n.COLOR_ATTACHMENT0+fe,Me,0),m(Re)&&h(Me)}t.unbindTexture()}else{let fe=n.TEXTURE_2D;if((M.isWebGL3DRenderTarget||M.isWebGLArrayRenderTarget)&&(fe=M.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(fe,q.__webglTexture),ke(fe,v),v.mipmaps&&v.mipmaps.length>0)for(let Ae=0;Ae<v.mipmaps.length;Ae++)Pe(N.__webglFramebuffer[Ae],M,v,n.COLOR_ATTACHMENT0,fe,Ae);else Pe(N.__webglFramebuffer,M,v,n.COLOR_ATTACHMENT0,fe,0);m(v)&&h(fe),t.unbindTexture()}M.depthBuffer&&Je(M)}function L(M){const v=M.textures;for(let N=0,q=v.length;N<q;N++){const ne=v[N];if(m(ne)){const W=P(M),Se=i.get(ne).__webglTexture;t.bindTexture(W,Se),h(W),t.unbindTexture()}}}const k=[],O=[];function z(M){if(M.samples>0){if(X(M)===!1){const v=M.textures,N=M.width,q=M.height;let ne=n.COLOR_BUFFER_BIT;const W=M.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Se=i.get(M),fe=v.length>1;if(fe)for(let Re=0;Re<v.length;Re++)t.bindFramebuffer(n.FRAMEBUFFER,Se.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Re,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,Se.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Re,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,Se.__webglMultisampledFramebuffer);const Ae=M.texture.mipmaps;Ae&&Ae.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Se.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Se.__webglFramebuffer);for(let Re=0;Re<v.length;Re++){if(M.resolveDepthBuffer&&(M.depthBuffer&&(ne|=n.DEPTH_BUFFER_BIT),M.stencilBuffer&&M.resolveStencilBuffer&&(ne|=n.STENCIL_BUFFER_BIT)),fe){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Se.__webglColorRenderbuffer[Re]);const pe=i.get(v[Re]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,pe,0)}n.blitFramebuffer(0,0,N,q,0,0,N,q,ne,n.NEAREST),l===!0&&(k.length=0,O.length=0,k.push(n.COLOR_ATTACHMENT0+Re),M.depthBuffer&&M.resolveDepthBuffer===!1&&(k.push(W),O.push(W),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,O)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,k))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),fe)for(let Re=0;Re<v.length;Re++){t.bindFramebuffer(n.FRAMEBUFFER,Se.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Re,n.RENDERBUFFER,Se.__webglColorRenderbuffer[Re]);const pe=i.get(v[Re]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,Se.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Re,n.TEXTURE_2D,pe,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Se.__webglMultisampledFramebuffer)}else if(M.depthBuffer&&M.resolveDepthBuffer===!1&&l){const v=M.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[v])}}}function de(M){return Math.min(s.maxSamples,M.samples)}function X(M){const v=i.get(M);return M.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function se(M){const v=o.render.frame;u.get(M)!==v&&(u.set(M,v),M.update())}function re(M,v){const N=M.colorSpace,q=M.format,ne=M.type;return M.isCompressedTexture===!0||M.isVideoTexture===!0||N!==Vs&&N!==xi&&(rt.getTransfer(N)===ht?(q!==Tn||ne!==Gn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",N)),v}function be(M){return typeof HTMLImageElement<"u"&&M instanceof HTMLImageElement?(c.width=M.naturalWidth||M.width,c.height=M.naturalHeight||M.height):typeof VideoFrame<"u"&&M instanceof VideoFrame?(c.width=M.displayWidth,c.height=M.displayHeight):(c.width=M.width,c.height=M.height),c}this.allocateTextureUnit=Y,this.resetTextureUnits=j,this.setTexture2D=ae,this.setTexture2DArray=Q,this.setTexture3D=ie,this.setTextureCube=G,this.rebindTextures=I,this.setupRenderTarget=g,this.updateRenderTargetMipmap=L,this.updateMultisampleRenderTarget=z,this.setupDepthRenderbuffer=Je,this.setupFrameBufferTexture=Pe,this.useMultisampledRTT=X}function cS(n,e){function t(i,s=xi){let a;const o=rt.getTransfer(s);if(i===Gn)return n.UNSIGNED_BYTE;if(i===_c)return n.UNSIGNED_SHORT_4_4_4_4;if(i===vc)return n.UNSIGNED_SHORT_5_5_5_1;if(i===wf)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Cf)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Tf)return n.BYTE;if(i===Af)return n.SHORT;if(i===va)return n.UNSIGNED_SHORT;if(i===gc)return n.INT;if(i===Xi)return n.UNSIGNED_INT;if(i===ii)return n.FLOAT;if(i===Ra)return n.HALF_FLOAT;if(i===Rf)return n.ALPHA;if(i===Pf)return n.RGB;if(i===Tn)return n.RGBA;if(i===xa)return n.DEPTH_COMPONENT;if(i===ya)return n.DEPTH_STENCIL;if(i===Df)return n.RED;if(i===bc)return n.RED_INTEGER;if(i===If)return n.RG;if(i===xc)return n.RG_INTEGER;if(i===yc)return n.RGBA_INTEGER;if(i===gr||i===_r||i===vr||i===br)if(o===ht)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(i===gr)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===_r)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===vr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===br)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(i===gr)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===_r)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===vr)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===br)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===vl||i===bl||i===xl||i===yl)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(i===vl)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===bl)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===xl)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===yl)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Sl||i===Ml||i===El)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(i===Sl||i===Ml)return o===ht?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(i===El)return o===ht?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Tl||i===Al||i===wl||i===Cl||i===Rl||i===Pl||i===Dl||i===Il||i===Ll||i===Ul||i===Nl||i===Fl||i===Ol||i===Bl)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(i===Tl)return o===ht?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Al)return o===ht?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===wl)return o===ht?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Cl)return o===ht?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Rl)return o===ht?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Pl)return o===ht?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Dl)return o===ht?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Il)return o===ht?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Ll)return o===ht?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Ul)return o===ht?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Nl)return o===ht?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Fl)return o===ht?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Ol)return o===ht?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Bl)return o===ht?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===zl||i===Hl||i===Vl)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(i===zl)return o===ht?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Hl)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Vl)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===kl||i===Gl||i===ql||i===Wl)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(i===kl)return a.COMPRESSED_RED_RGTC1_EXT;if(i===Gl)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===ql)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Wl)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===ba?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const dS=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,uS=`
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

}`;class fS{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new $f(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new Ri({vertexShader:dS,fragmentShader:uS,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new un(new Jr(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class hS extends Qi{constructor(e,t){super();const i=this;let s=null,a=1,o=null,r="local-floor",l=1,c=null,u=null,d=null,f=null,p=null,x=null;const y=typeof XRWebGLBinding<"u",m=new fS,h={},P=t.getContextAttributes();let w=null,b=null;const C=[],S=[],R=new Be;let U=null;const T=new _n;T.viewport=new Pt;const A=new _n;A.viewport=new Pt;const F=[T,A],j=new Iv;let Y=null,ce=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(oe){let ue=C[oe];return ue===void 0&&(ue=new Uo,C[oe]=ue),ue.getTargetRaySpace()},this.getControllerGrip=function(oe){let ue=C[oe];return ue===void 0&&(ue=new Uo,C[oe]=ue),ue.getGripSpace()},this.getHand=function(oe){let ue=C[oe];return ue===void 0&&(ue=new Uo,C[oe]=ue),ue.getHandSpace()};function ae(oe){const ue=S.indexOf(oe.inputSource);if(ue===-1)return;const Pe=C[ue];Pe!==void 0&&(Pe.update(oe.inputSource,oe.frame,c||o),Pe.dispatchEvent({type:oe.type,data:oe.inputSource}))}function Q(){s.removeEventListener("select",ae),s.removeEventListener("selectstart",ae),s.removeEventListener("selectend",ae),s.removeEventListener("squeeze",ae),s.removeEventListener("squeezestart",ae),s.removeEventListener("squeezeend",ae),s.removeEventListener("end",Q),s.removeEventListener("inputsourceschange",ie);for(let oe=0;oe<C.length;oe++){const ue=S[oe];ue!==null&&(S[oe]=null,C[oe].disconnect(ue))}Y=null,ce=null,m.reset();for(const oe in h)delete h[oe];e.setRenderTarget(w),p=null,f=null,d=null,s=null,b=null,nt.stop(),i.isPresenting=!1,e.setPixelRatio(U),e.setSize(R.width,R.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(oe){a=oe,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(oe){r=oe,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(oe){c=oe},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return d===null&&y&&(d=new XRWebGLBinding(s,t)),d},this.getFrame=function(){return x},this.getSession=function(){return s},this.setSession=async function(oe){if(s=oe,s!==null){if(w=e.getRenderTarget(),s.addEventListener("select",ae),s.addEventListener("selectstart",ae),s.addEventListener("selectend",ae),s.addEventListener("squeeze",ae),s.addEventListener("squeezestart",ae),s.addEventListener("squeezeend",ae),s.addEventListener("end",Q),s.addEventListener("inputsourceschange",ie),P.xrCompatible!==!0&&await t.makeXRCompatible(),U=e.getPixelRatio(),e.getSize(R),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let Pe=null,ze=null,Ue=null;P.depth&&(Ue=P.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Pe=P.stencil?ya:xa,ze=P.stencil?ba:Xi);const Je={colorFormat:t.RGBA8,depthFormat:Ue,scaleFactor:a};d=this.getBinding(),f=d.createProjectionLayer(Je),s.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),b=new Ki(f.textureWidth,f.textureHeight,{format:Tn,type:Gn,depthTexture:new jf(f.textureWidth,f.textureHeight,ze,void 0,void 0,void 0,void 0,void 0,void 0,Pe),stencilBuffer:P.stencil,colorSpace:e.outputColorSpace,samples:P.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const Pe={antialias:P.antialias,alpha:!0,depth:P.depth,stencil:P.stencil,framebufferScaleFactor:a};p=new XRWebGLLayer(s,t,Pe),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),b=new Ki(p.framebufferWidth,p.framebufferHeight,{format:Tn,type:Gn,colorSpace:e.outputColorSpace,stencilBuffer:P.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(r),nt.setContext(s),nt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function ie(oe){for(let ue=0;ue<oe.removed.length;ue++){const Pe=oe.removed[ue],ze=S.indexOf(Pe);ze>=0&&(S[ze]=null,C[ze].disconnect(Pe))}for(let ue=0;ue<oe.added.length;ue++){const Pe=oe.added[ue];let ze=S.indexOf(Pe);if(ze===-1){for(let Je=0;Je<C.length;Je++)if(Je>=S.length){S.push(Pe),ze=Je;break}else if(S[Je]===null){S[Je]=Pe,ze=Je;break}if(ze===-1)break}const Ue=C[ze];Ue&&Ue.connect(Pe)}}const G=new V,ve=new V;function Te(oe,ue,Pe){G.setFromMatrixPosition(ue.matrixWorld),ve.setFromMatrixPosition(Pe.matrixWorld);const ze=G.distanceTo(ve),Ue=ue.projectionMatrix.elements,Je=Pe.projectionMatrix.elements,I=Ue[14]/(Ue[10]-1),g=Ue[14]/(Ue[10]+1),L=(Ue[9]+1)/Ue[5],k=(Ue[9]-1)/Ue[5],O=(Ue[8]-1)/Ue[0],z=(Je[8]+1)/Je[0],de=I*O,X=I*z,se=ze/(-O+z),re=se*-O;if(ue.matrixWorld.decompose(oe.position,oe.quaternion,oe.scale),oe.translateX(re),oe.translateZ(se),oe.matrixWorld.compose(oe.position,oe.quaternion,oe.scale),oe.matrixWorldInverse.copy(oe.matrixWorld).invert(),Ue[10]===-1)oe.projectionMatrix.copy(ue.projectionMatrix),oe.projectionMatrixInverse.copy(ue.projectionMatrixInverse);else{const be=I+se,M=g+se,v=de-re,N=X+(ze-re),q=L*g/M*be,ne=k*g/M*be;oe.projectionMatrix.makePerspective(v,N,q,ne,be,M),oe.projectionMatrixInverse.copy(oe.projectionMatrix).invert()}}function Ie(oe,ue){ue===null?oe.matrixWorld.copy(oe.matrix):oe.matrixWorld.multiplyMatrices(ue.matrixWorld,oe.matrix),oe.matrixWorldInverse.copy(oe.matrixWorld).invert()}this.updateCamera=function(oe){if(s===null)return;let ue=oe.near,Pe=oe.far;m.texture!==null&&(m.depthNear>0&&(ue=m.depthNear),m.depthFar>0&&(Pe=m.depthFar)),j.near=A.near=T.near=ue,j.far=A.far=T.far=Pe,(Y!==j.near||ce!==j.far)&&(s.updateRenderState({depthNear:j.near,depthFar:j.far}),Y=j.near,ce=j.far),j.layers.mask=oe.layers.mask|6,T.layers.mask=j.layers.mask&3,A.layers.mask=j.layers.mask&5;const ze=oe.parent,Ue=j.cameras;Ie(j,ze);for(let Je=0;Je<Ue.length;Je++)Ie(Ue[Je],ze);Ue.length===2?Te(j,T,A):j.projectionMatrix.copy(T.projectionMatrix),ke(oe,j,ze)};function ke(oe,ue,Pe){Pe===null?oe.matrix.copy(ue.matrixWorld):(oe.matrix.copy(Pe.matrixWorld),oe.matrix.invert(),oe.matrix.multiply(ue.matrixWorld)),oe.matrix.decompose(oe.position,oe.quaternion,oe.scale),oe.updateMatrixWorld(!0),oe.projectionMatrix.copy(ue.projectionMatrix),oe.projectionMatrixInverse.copy(ue.projectionMatrixInverse),oe.isPerspectiveCamera&&(oe.fov=$l*2*Math.atan(1/oe.projectionMatrix.elements[5]),oe.zoom=1)}this.getCamera=function(){return j},this.getFoveation=function(){if(!(f===null&&p===null))return l},this.setFoveation=function(oe){l=oe,f!==null&&(f.fixedFoveation=oe),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=oe)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(j)},this.getCameraTexture=function(oe){return h[oe]};let ot=null;function ut(oe,ue){if(u=ue.getViewerPose(c||o),x=ue,u!==null){const Pe=u.views;p!==null&&(e.setRenderTargetFramebuffer(b,p.framebuffer),e.setRenderTarget(b));let ze=!1;Pe.length!==j.cameras.length&&(j.cameras.length=0,ze=!0);for(let g=0;g<Pe.length;g++){const L=Pe[g];let k=null;if(p!==null)k=p.getViewport(L);else{const z=d.getViewSubImage(f,L);k=z.viewport,g===0&&(e.setRenderTargetTextures(b,z.colorTexture,z.depthStencilTexture),e.setRenderTarget(b))}let O=F[g];O===void 0&&(O=new _n,O.layers.enable(g),O.viewport=new Pt,F[g]=O),O.matrix.fromArray(L.transform.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale),O.projectionMatrix.fromArray(L.projectionMatrix),O.projectionMatrixInverse.copy(O.projectionMatrix).invert(),O.viewport.set(k.x,k.y,k.width,k.height),g===0&&(j.matrix.copy(O.matrix),j.matrix.decompose(j.position,j.quaternion,j.scale)),ze===!0&&j.cameras.push(O)}const Ue=s.enabledFeatures;if(Ue&&Ue.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&y){d=i.getBinding();const g=d.getDepthInformation(Pe[0]);g&&g.isValid&&g.texture&&m.init(g,s.renderState)}if(Ue&&Ue.includes("camera-access")&&y){e.state.unbindTexture(),d=i.getBinding();for(let g=0;g<Pe.length;g++){const L=Pe[g].camera;if(L){let k=h[L];k||(k=new $f,h[L]=k);const O=d.getCameraImage(L);k.sourceTexture=O}}}}for(let Pe=0;Pe<C.length;Pe++){const ze=S[Pe],Ue=C[Pe];ze!==null&&Ue!==void 0&&Ue.update(ze,ue,c||o)}ot&&ot(oe,ue),ue.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ue}),x=null}const nt=new Kf;nt.setAnimationLoop(ut),this.setAnimationLoop=function(oe){ot=oe},this.dispose=function(){}}}const zi=new qn,pS=new At;function mS(n,e){function t(m,h){m.matrixAutoUpdate===!0&&m.updateMatrix(),h.value.copy(m.matrix)}function i(m,h){h.color.getRGB(m.fogColor.value,Hf(n)),h.isFog?(m.fogNear.value=h.near,m.fogFar.value=h.far):h.isFogExp2&&(m.fogDensity.value=h.density)}function s(m,h,P,w,b){h.isMeshBasicMaterial||h.isMeshLambertMaterial?a(m,h):h.isMeshToonMaterial?(a(m,h),d(m,h)):h.isMeshPhongMaterial?(a(m,h),u(m,h)):h.isMeshStandardMaterial?(a(m,h),f(m,h),h.isMeshPhysicalMaterial&&p(m,h,b)):h.isMeshMatcapMaterial?(a(m,h),x(m,h)):h.isMeshDepthMaterial?a(m,h):h.isMeshDistanceMaterial?(a(m,h),y(m,h)):h.isMeshNormalMaterial?a(m,h):h.isLineBasicMaterial?(o(m,h),h.isLineDashedMaterial&&r(m,h)):h.isPointsMaterial?l(m,h,P,w):h.isSpriteMaterial?c(m,h):h.isShadowMaterial?(m.color.value.copy(h.color),m.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function a(m,h){m.opacity.value=h.opacity,h.color&&m.diffuse.value.copy(h.color),h.emissive&&m.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(m.map.value=h.map,t(h.map,m.mapTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,t(h.alphaMap,m.alphaMapTransform)),h.bumpMap&&(m.bumpMap.value=h.bumpMap,t(h.bumpMap,m.bumpMapTransform),m.bumpScale.value=h.bumpScale,h.side===sn&&(m.bumpScale.value*=-1)),h.normalMap&&(m.normalMap.value=h.normalMap,t(h.normalMap,m.normalMapTransform),m.normalScale.value.copy(h.normalScale),h.side===sn&&m.normalScale.value.negate()),h.displacementMap&&(m.displacementMap.value=h.displacementMap,t(h.displacementMap,m.displacementMapTransform),m.displacementScale.value=h.displacementScale,m.displacementBias.value=h.displacementBias),h.emissiveMap&&(m.emissiveMap.value=h.emissiveMap,t(h.emissiveMap,m.emissiveMapTransform)),h.specularMap&&(m.specularMap.value=h.specularMap,t(h.specularMap,m.specularMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest);const P=e.get(h),w=P.envMap,b=P.envMapRotation;w&&(m.envMap.value=w,zi.copy(b),zi.x*=-1,zi.y*=-1,zi.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(zi.y*=-1,zi.z*=-1),m.envMapRotation.value.setFromMatrix4(pS.makeRotationFromEuler(zi)),m.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=h.reflectivity,m.ior.value=h.ior,m.refractionRatio.value=h.refractionRatio),h.lightMap&&(m.lightMap.value=h.lightMap,m.lightMapIntensity.value=h.lightMapIntensity,t(h.lightMap,m.lightMapTransform)),h.aoMap&&(m.aoMap.value=h.aoMap,m.aoMapIntensity.value=h.aoMapIntensity,t(h.aoMap,m.aoMapTransform))}function o(m,h){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,h.map&&(m.map.value=h.map,t(h.map,m.mapTransform))}function r(m,h){m.dashSize.value=h.dashSize,m.totalSize.value=h.dashSize+h.gapSize,m.scale.value=h.scale}function l(m,h,P,w){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,m.size.value=h.size*P,m.scale.value=w*.5,h.map&&(m.map.value=h.map,t(h.map,m.uvTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,t(h.alphaMap,m.alphaMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest)}function c(m,h){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,m.rotation.value=h.rotation,h.map&&(m.map.value=h.map,t(h.map,m.mapTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,t(h.alphaMap,m.alphaMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest)}function u(m,h){m.specular.value.copy(h.specular),m.shininess.value=Math.max(h.shininess,1e-4)}function d(m,h){h.gradientMap&&(m.gradientMap.value=h.gradientMap)}function f(m,h){m.metalness.value=h.metalness,h.metalnessMap&&(m.metalnessMap.value=h.metalnessMap,t(h.metalnessMap,m.metalnessMapTransform)),m.roughness.value=h.roughness,h.roughnessMap&&(m.roughnessMap.value=h.roughnessMap,t(h.roughnessMap,m.roughnessMapTransform)),h.envMap&&(m.envMapIntensity.value=h.envMapIntensity)}function p(m,h,P){m.ior.value=h.ior,h.sheen>0&&(m.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),m.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(m.sheenColorMap.value=h.sheenColorMap,t(h.sheenColorMap,m.sheenColorMapTransform)),h.sheenRoughnessMap&&(m.sheenRoughnessMap.value=h.sheenRoughnessMap,t(h.sheenRoughnessMap,m.sheenRoughnessMapTransform))),h.clearcoat>0&&(m.clearcoat.value=h.clearcoat,m.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(m.clearcoatMap.value=h.clearcoatMap,t(h.clearcoatMap,m.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,t(h.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(m.clearcoatNormalMap.value=h.clearcoatNormalMap,t(h.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===sn&&m.clearcoatNormalScale.value.negate())),h.dispersion>0&&(m.dispersion.value=h.dispersion),h.iridescence>0&&(m.iridescence.value=h.iridescence,m.iridescenceIOR.value=h.iridescenceIOR,m.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(m.iridescenceMap.value=h.iridescenceMap,t(h.iridescenceMap,m.iridescenceMapTransform)),h.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=h.iridescenceThicknessMap,t(h.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),h.transmission>0&&(m.transmission.value=h.transmission,m.transmissionSamplerMap.value=P.texture,m.transmissionSamplerSize.value.set(P.width,P.height),h.transmissionMap&&(m.transmissionMap.value=h.transmissionMap,t(h.transmissionMap,m.transmissionMapTransform)),m.thickness.value=h.thickness,h.thicknessMap&&(m.thicknessMap.value=h.thicknessMap,t(h.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=h.attenuationDistance,m.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(m.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(m.anisotropyMap.value=h.anisotropyMap,t(h.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=h.specularIntensity,m.specularColor.value.copy(h.specularColor),h.specularColorMap&&(m.specularColorMap.value=h.specularColorMap,t(h.specularColorMap,m.specularColorMapTransform)),h.specularIntensityMap&&(m.specularIntensityMap.value=h.specularIntensityMap,t(h.specularIntensityMap,m.specularIntensityMapTransform))}function x(m,h){h.matcap&&(m.matcap.value=h.matcap)}function y(m,h){const P=e.get(h).light;m.referencePosition.value.setFromMatrixPosition(P.matrixWorld),m.nearDistance.value=P.shadow.camera.near,m.farDistance.value=P.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function gS(n,e,t,i){let s={},a={},o=[];const r=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(P,w){const b=w.program;i.uniformBlockBinding(P,b)}function c(P,w){let b=s[P.id];b===void 0&&(x(P),b=u(P),s[P.id]=b,P.addEventListener("dispose",m));const C=w.program;i.updateUBOMapping(P,C);const S=e.render.frame;a[P.id]!==S&&(f(P),a[P.id]=S)}function u(P){const w=d();P.__bindingPointIndex=w;const b=n.createBuffer(),C=P.__size,S=P.usage;return n.bindBuffer(n.UNIFORM_BUFFER,b),n.bufferData(n.UNIFORM_BUFFER,C,S),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,w,b),b}function d(){for(let P=0;P<r;P++)if(o.indexOf(P)===-1)return o.push(P),P;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(P){const w=s[P.id],b=P.uniforms,C=P.__cache;n.bindBuffer(n.UNIFORM_BUFFER,w);for(let S=0,R=b.length;S<R;S++){const U=Array.isArray(b[S])?b[S]:[b[S]];for(let T=0,A=U.length;T<A;T++){const F=U[T];if(p(F,S,T,C)===!0){const j=F.__offset,Y=Array.isArray(F.value)?F.value:[F.value];let ce=0;for(let ae=0;ae<Y.length;ae++){const Q=Y[ae],ie=y(Q);typeof Q=="number"||typeof Q=="boolean"?(F.__data[0]=Q,n.bufferSubData(n.UNIFORM_BUFFER,j+ce,F.__data)):Q.isMatrix3?(F.__data[0]=Q.elements[0],F.__data[1]=Q.elements[1],F.__data[2]=Q.elements[2],F.__data[3]=0,F.__data[4]=Q.elements[3],F.__data[5]=Q.elements[4],F.__data[6]=Q.elements[5],F.__data[7]=0,F.__data[8]=Q.elements[6],F.__data[9]=Q.elements[7],F.__data[10]=Q.elements[8],F.__data[11]=0):(Q.toArray(F.__data,ce),ce+=ie.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,j,F.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(P,w,b,C){const S=P.value,R=w+"_"+b;if(C[R]===void 0)return typeof S=="number"||typeof S=="boolean"?C[R]=S:C[R]=S.clone(),!0;{const U=C[R];if(typeof S=="number"||typeof S=="boolean"){if(U!==S)return C[R]=S,!0}else if(U.equals(S)===!1)return U.copy(S),!0}return!1}function x(P){const w=P.uniforms;let b=0;const C=16;for(let R=0,U=w.length;R<U;R++){const T=Array.isArray(w[R])?w[R]:[w[R]];for(let A=0,F=T.length;A<F;A++){const j=T[A],Y=Array.isArray(j.value)?j.value:[j.value];for(let ce=0,ae=Y.length;ce<ae;ce++){const Q=Y[ce],ie=y(Q),G=b%C,ve=G%ie.boundary,Te=G+ve;b+=ve,Te!==0&&C-Te<ie.storage&&(b+=C-Te),j.__data=new Float32Array(ie.storage/Float32Array.BYTES_PER_ELEMENT),j.__offset=b,b+=ie.storage}}}const S=b%C;return S>0&&(b+=C-S),P.__size=b,P.__cache={},this}function y(P){const w={boundary:0,storage:0};return typeof P=="number"||typeof P=="boolean"?(w.boundary=4,w.storage=4):P.isVector2?(w.boundary=8,w.storage=8):P.isVector3||P.isColor?(w.boundary=16,w.storage=12):P.isVector4?(w.boundary=16,w.storage=16):P.isMatrix3?(w.boundary=48,w.storage=48):P.isMatrix4?(w.boundary=64,w.storage=64):P.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",P),w}function m(P){const w=P.target;w.removeEventListener("dispose",m);const b=o.indexOf(w.__bindingPointIndex);o.splice(b,1),n.deleteBuffer(s[w.id]),delete s[w.id],delete a[w.id]}function h(){for(const P in s)n.deleteBuffer(s[P]);o=[],s={},a={}}return{bind:l,update:c,dispose:h}}class _S{constructor(e={}){const{canvas:t=W_(),context:i=null,depth:s=!0,stencil:a=!1,alpha:o=!1,antialias:r=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=o;const x=new Uint32Array(4),y=new Int32Array(4);let m=null,h=null;const P=[],w=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Mi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const b=this;let C=!1;this._outputColorSpace=gn;let S=0,R=0,U=null,T=-1,A=null;const F=new Pt,j=new Pt;let Y=null;const ce=new it(0);let ae=0,Q=t.width,ie=t.height,G=1,ve=null,Te=null;const Ie=new Pt(0,0,Q,ie),ke=new Pt(0,0,Q,ie);let ot=!1;const ut=new Ec;let nt=!1,oe=!1;const ue=new At,Pe=new V,ze=new Pt,Ue={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Je=!1;function I(){return U===null?G:1}let g=i;function L(E,B){return t.getContext(E,B)}try{const E={alpha:!0,depth:s,stencil:a,antialias:r,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${mc}`),t.addEventListener("webglcontextlost",le,!1),t.addEventListener("webglcontextrestored",he,!1),t.addEventListener("webglcontextcreationerror",ee,!1),g===null){const B="webgl2";if(g=L(B,E),g===null)throw L(B)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let k,O,z,de,X,se,re,be,M,v,N,q,ne,W,Se,fe,Ae,Re,pe,Me,Le,Ce,xe,$e;function D(){k=new wx(g),k.init(),Ce=new cS(g,k),O=new xx(g,k,e,Ce),z=new oS(g,k),O.reversedDepthBuffer&&f&&z.buffers.depth.setReversed(!0),de=new Px(g),X=new Xy,se=new lS(g,k,z,X,O,Ce,de),re=new Sx(b),be=new Ax(b),M=new Fv(g),xe=new vx(g,M),v=new Cx(g,M,de,xe),N=new Ix(g,v,M,de),pe=new Dx(g,O,se),fe=new yx(X),q=new $y(b,re,be,k,O,xe,fe),ne=new mS(b,X),W=new Ky,Se=new nS(k),Re=new _x(b,re,be,z,N,p,l),Ae=new aS(b,N,O),$e=new gS(g,de,O,z),Me=new bx(g,k,de),Le=new Rx(g,k,de),de.programs=q.programs,b.capabilities=O,b.extensions=k,b.properties=X,b.renderLists=W,b.shadowMap=Ae,b.state=z,b.info=de}D();const J=new hS(b,g);this.xr=J,this.getContext=function(){return g},this.getContextAttributes=function(){return g.getContextAttributes()},this.forceContextLoss=function(){const E=k.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=k.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(E){E!==void 0&&(G=E,this.setSize(Q,ie,!1))},this.getSize=function(E){return E.set(Q,ie)},this.setSize=function(E,B,K=!0){if(J.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Q=E,ie=B,t.width=Math.floor(E*G),t.height=Math.floor(B*G),K===!0&&(t.style.width=E+"px",t.style.height=B+"px"),this.setViewport(0,0,E,B)},this.getDrawingBufferSize=function(E){return E.set(Q*G,ie*G).floor()},this.setDrawingBufferSize=function(E,B,K){Q=E,ie=B,G=K,t.width=Math.floor(E*K),t.height=Math.floor(B*K),this.setViewport(0,0,E,B)},this.getCurrentViewport=function(E){return E.copy(F)},this.getViewport=function(E){return E.copy(Ie)},this.setViewport=function(E,B,K,Z){E.isVector4?Ie.set(E.x,E.y,E.z,E.w):Ie.set(E,B,K,Z),z.viewport(F.copy(Ie).multiplyScalar(G).round())},this.getScissor=function(E){return E.copy(ke)},this.setScissor=function(E,B,K,Z){E.isVector4?ke.set(E.x,E.y,E.z,E.w):ke.set(E,B,K,Z),z.scissor(j.copy(ke).multiplyScalar(G).round())},this.getScissorTest=function(){return ot},this.setScissorTest=function(E){z.setScissorTest(ot=E)},this.setOpaqueSort=function(E){ve=E},this.setTransparentSort=function(E){Te=E},this.getClearColor=function(E){return E.copy(Re.getClearColor())},this.setClearColor=function(){Re.setClearColor(...arguments)},this.getClearAlpha=function(){return Re.getClearAlpha()},this.setClearAlpha=function(){Re.setClearAlpha(...arguments)},this.clear=function(E=!0,B=!0,K=!0){let Z=0;if(E){let H=!1;if(U!==null){const me=U.texture.format;H=me===yc||me===xc||me===bc}if(H){const me=U.texture.type,we=me===Gn||me===Xi||me===va||me===ba||me===_c||me===vc,Ne=Re.getClearColor(),De=Re.getClearAlpha(),qe=Ne.r,je=Ne.g,Oe=Ne.b;we?(x[0]=qe,x[1]=je,x[2]=Oe,x[3]=De,g.clearBufferuiv(g.COLOR,0,x)):(y[0]=qe,y[1]=je,y[2]=Oe,y[3]=De,g.clearBufferiv(g.COLOR,0,y))}else Z|=g.COLOR_BUFFER_BIT}B&&(Z|=g.DEPTH_BUFFER_BIT),K&&(Z|=g.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),g.clear(Z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",le,!1),t.removeEventListener("webglcontextrestored",he,!1),t.removeEventListener("webglcontextcreationerror",ee,!1),Re.dispose(),W.dispose(),Se.dispose(),X.dispose(),re.dispose(),be.dispose(),N.dispose(),xe.dispose(),$e.dispose(),q.dispose(),J.dispose(),J.removeEventListener("sessionstart",yt),J.removeEventListener("sessionend",ts),jn.stop()};function le(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function he(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;const E=de.autoReset,B=Ae.enabled,K=Ae.autoUpdate,Z=Ae.needsUpdate,H=Ae.type;D(),de.autoReset=E,Ae.enabled=B,Ae.autoUpdate=K,Ae.needsUpdate=Z,Ae.type=H}function ee(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function te(E){const B=E.target;B.removeEventListener("dispose",te),ye(B)}function ye(E){Fe(E),X.remove(E)}function Fe(E){const B=X.get(E).programs;B!==void 0&&(B.forEach(function(K){q.releaseProgram(K)}),E.isShaderMaterial&&q.releaseShaderCache(E))}this.renderBufferDirect=function(E,B,K,Z,H,me){B===null&&(B=Ue);const we=H.isMesh&&H.matrixWorld.determinant()<0,Ne=sh(E,B,K,Z,H);z.setMaterial(Z,we);let De=K.index,qe=1;if(Z.wireframe===!0){if(De=v.getWireframeAttribute(K),De===void 0)return;qe=2}const je=K.drawRange,Oe=K.attributes.position;let tt=je.start*qe,ft=(je.start+je.count)*qe;me!==null&&(tt=Math.max(tt,me.start*qe),ft=Math.min(ft,(me.start+me.count)*qe)),De!==null?(tt=Math.max(tt,0),ft=Math.min(ft,De.count)):Oe!=null&&(tt=Math.max(tt,0),ft=Math.min(ft,Oe.count));const Rt=ft-tt;if(Rt<0||Rt===1/0)return;xe.setup(H,Z,Ne,K,De);let St,_t=Me;if(De!==null&&(St=M.get(De),_t=Le,_t.setIndex(St)),H.isMesh)Z.wireframe===!0?(z.setLineWidth(Z.wireframeLinewidth*I()),_t.setMode(g.LINES)):_t.setMode(g.TRIANGLES);else if(H.isLine){let He=Z.linewidth;He===void 0&&(He=1),z.setLineWidth(He*I()),H.isLineSegments?_t.setMode(g.LINES):H.isLineLoop?_t.setMode(g.LINE_LOOP):_t.setMode(g.LINE_STRIP)}else H.isPoints?_t.setMode(g.POINTS):H.isSprite&&_t.setMode(g.TRIANGLES);if(H.isBatchedMesh)if(H._multiDrawInstances!==null)Sa("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),_t.renderMultiDrawInstances(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount,H._multiDrawInstances);else if(k.get("WEBGL_multi_draw"))_t.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else{const He=H._multiDrawStarts,wt=H._multiDrawCounts,st=H._multiDrawCount,an=De?M.get(De).bytesPerElement:1,is=X.get(Z).currentProgram.getUniforms();for(let rn=0;rn<st;rn++)is.setValue(g,"_gl_DrawID",rn),_t.render(He[rn]/an,wt[rn])}else if(H.isInstancedMesh)_t.renderInstances(tt,Rt,H.count);else if(K.isInstancedBufferGeometry){const He=K._maxInstanceCount!==void 0?K._maxInstanceCount:1/0,wt=Math.min(K.instanceCount,He);_t.renderInstances(tt,Rt,wt)}else _t.render(tt,Rt)};function Ge(E,B,K){E.transparent===!0&&E.side===En&&E.forceSinglePass===!1?(E.side=sn,E.needsUpdate=!0,La(E,B,K),E.side=Ci,E.needsUpdate=!0,La(E,B,K),E.side=En):La(E,B,K)}this.compile=function(E,B,K=null){K===null&&(K=E),h=Se.get(K),h.init(B),w.push(h),K.traverseVisible(function(H){H.isLight&&H.layers.test(B.layers)&&(h.pushLight(H),H.castShadow&&h.pushShadow(H))}),E!==K&&E.traverseVisible(function(H){H.isLight&&H.layers.test(B.layers)&&(h.pushLight(H),H.castShadow&&h.pushShadow(H))}),h.setupLights();const Z=new Set;return E.traverse(function(H){if(!(H.isMesh||H.isPoints||H.isLine||H.isSprite))return;const me=H.material;if(me)if(Array.isArray(me))for(let we=0;we<me.length;we++){const Ne=me[we];Ge(Ne,K,H),Z.add(Ne)}else Ge(me,K,H),Z.add(me)}),h=w.pop(),Z},this.compileAsync=function(E,B,K=null){const Z=this.compile(E,B,K);return new Promise(H=>{function me(){if(Z.forEach(function(we){X.get(we).currentProgram.isReady()&&Z.delete(we)}),Z.size===0){H(E);return}setTimeout(me,10)}k.get("KHR_parallel_shader_compile")!==null?me():setTimeout(me,10)})};let Xe=null;function Lt(E){Xe&&Xe(E)}function yt(){jn.stop()}function ts(){jn.start()}const jn=new Kf;jn.setAnimationLoop(Lt),typeof self<"u"&&jn.setContext(self),this.setAnimationLoop=function(E){Xe=E,J.setAnimationLoop(E),E===null?jn.stop():jn.start()},J.addEventListener("sessionstart",yt),J.addEventListener("sessionend",ts),this.render=function(E,B){if(B!==void 0&&B.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),J.enabled===!0&&J.isPresenting===!0&&(J.cameraAutoUpdate===!0&&J.updateCamera(B),B=J.getCamera()),E.isScene===!0&&E.onBeforeRender(b,E,B,U),h=Se.get(E,w.length),h.init(B),w.push(h),ue.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),ut.setFromProjectionMatrix(ue,zn,B.reversedDepth),oe=this.localClippingEnabled,nt=fe.init(this.clippingPlanes,oe),m=W.get(E,P.length),m.init(),P.push(m),J.enabled===!0&&J.isPresenting===!0){const me=b.xr.getDepthSensingMesh();me!==null&&ns(me,B,-1/0,b.sortObjects)}ns(E,B,0,b.sortObjects),m.finish(),b.sortObjects===!0&&m.sort(ve,Te),Je=J.enabled===!1||J.isPresenting===!1||J.hasDepthSensing()===!1,Je&&Re.addToRenderList(m,E),this.info.render.frame++,nt===!0&&fe.beginShadows();const K=h.state.shadowsArray;Ae.render(K,E,B),nt===!0&&fe.endShadows(),this.info.autoReset===!0&&this.info.reset();const Z=m.opaque,H=m.transmissive;if(h.setupLights(),B.isArrayCamera){const me=B.cameras;if(H.length>0)for(let we=0,Ne=me.length;we<Ne;we++){const De=me[we];wc(Z,H,E,De)}Je&&Re.render(E);for(let we=0,Ne=me.length;we<Ne;we++){const De=me[we];Da(m,E,De,De.viewport)}}else H.length>0&&wc(Z,H,E,B),Je&&Re.render(E),Da(m,E,B);U!==null&&R===0&&(se.updateMultisampleRenderTarget(U),se.updateRenderTargetMipmap(U)),E.isScene===!0&&E.onAfterRender(b,E,B),xe.resetDefaultState(),T=-1,A=null,w.pop(),w.length>0?(h=w[w.length-1],nt===!0&&fe.setGlobalState(b.clippingPlanes,h.state.camera)):h=null,P.pop(),P.length>0?m=P[P.length-1]:m=null};function ns(E,B,K,Z){if(E.visible===!1)return;if(E.layers.test(B.layers)){if(E.isGroup)K=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(B);else if(E.isLight)h.pushLight(E),E.castShadow&&h.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||ut.intersectsSprite(E)){Z&&ze.setFromMatrixPosition(E.matrixWorld).applyMatrix4(ue);const we=N.update(E),Ne=E.material;Ne.visible&&m.push(E,we,Ne,K,ze.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||ut.intersectsObject(E))){const we=N.update(E),Ne=E.material;if(Z&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),ze.copy(E.boundingSphere.center)):(we.boundingSphere===null&&we.computeBoundingSphere(),ze.copy(we.boundingSphere.center)),ze.applyMatrix4(E.matrixWorld).applyMatrix4(ue)),Array.isArray(Ne)){const De=we.groups;for(let qe=0,je=De.length;qe<je;qe++){const Oe=De[qe],tt=Ne[Oe.materialIndex];tt&&tt.visible&&m.push(E,we,tt,K,ze.z,Oe)}}else Ne.visible&&m.push(E,we,Ne,K,ze.z,null)}}const me=E.children;for(let we=0,Ne=me.length;we<Ne;we++)ns(me[we],B,K,Z)}function Da(E,B,K,Z){const H=E.opaque,me=E.transmissive,we=E.transparent;h.setupLightsView(K),nt===!0&&fe.setGlobalState(b.clippingPlanes,K),Z&&z.viewport(F.copy(Z)),H.length>0&&Ia(H,B,K),me.length>0&&Ia(me,B,K),we.length>0&&Ia(we,B,K),z.buffers.depth.setTest(!0),z.buffers.depth.setMask(!0),z.buffers.color.setMask(!0),z.setPolygonOffset(!1)}function wc(E,B,K,Z){if((K.isScene===!0?K.overrideMaterial:null)!==null)return;h.state.transmissionRenderTarget[Z.id]===void 0&&(h.state.transmissionRenderTarget[Z.id]=new Ki(1,1,{generateMipmaps:!0,type:k.has("EXT_color_buffer_half_float")||k.has("EXT_color_buffer_float")?Ra:Gn,minFilter:ji,samples:4,stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:rt.workingColorSpace}));const me=h.state.transmissionRenderTarget[Z.id],we=Z.viewport||F;me.setSize(we.z*b.transmissionResolutionScale,we.w*b.transmissionResolutionScale);const Ne=b.getRenderTarget(),De=b.getActiveCubeFace(),qe=b.getActiveMipmapLevel();b.setRenderTarget(me),b.getClearColor(ce),ae=b.getClearAlpha(),ae<1&&b.setClearColor(16777215,.5),b.clear(),Je&&Re.render(K);const je=b.toneMapping;b.toneMapping=Mi;const Oe=Z.viewport;if(Z.viewport!==void 0&&(Z.viewport=void 0),h.setupLightsView(Z),nt===!0&&fe.setGlobalState(b.clippingPlanes,Z),Ia(E,K,Z),se.updateMultisampleRenderTarget(me),se.updateRenderTargetMipmap(me),k.has("WEBGL_multisampled_render_to_texture")===!1){let tt=!1;for(let ft=0,Rt=B.length;ft<Rt;ft++){const St=B[ft],_t=St.object,He=St.geometry,wt=St.material,st=St.group;if(wt.side===En&&_t.layers.test(Z.layers)){const an=wt.side;wt.side=sn,wt.needsUpdate=!0,Cc(_t,K,Z,He,wt,st),wt.side=an,wt.needsUpdate=!0,tt=!0}}tt===!0&&(se.updateMultisampleRenderTarget(me),se.updateRenderTargetMipmap(me))}b.setRenderTarget(Ne,De,qe),b.setClearColor(ce,ae),Oe!==void 0&&(Z.viewport=Oe),b.toneMapping=je}function Ia(E,B,K){const Z=B.isScene===!0?B.overrideMaterial:null;for(let H=0,me=E.length;H<me;H++){const we=E[H],Ne=we.object,De=we.geometry,qe=we.group;let je=we.material;je.allowOverride===!0&&Z!==null&&(je=Z),Ne.layers.test(K.layers)&&Cc(Ne,B,K,De,je,qe)}}function Cc(E,B,K,Z,H,me){E.onBeforeRender(b,B,K,Z,H,me),E.modelViewMatrix.multiplyMatrices(K.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),H.onBeforeRender(b,B,K,Z,E,me),H.transparent===!0&&H.side===En&&H.forceSinglePass===!1?(H.side=sn,H.needsUpdate=!0,b.renderBufferDirect(K,B,Z,H,E,me),H.side=Ci,H.needsUpdate=!0,b.renderBufferDirect(K,B,Z,H,E,me),H.side=En):b.renderBufferDirect(K,B,Z,H,E,me),E.onAfterRender(b,B,K,Z,H,me)}function La(E,B,K){B.isScene!==!0&&(B=Ue);const Z=X.get(E),H=h.state.lights,me=h.state.shadowsArray,we=H.state.version,Ne=q.getParameters(E,H.state,me,B,K),De=q.getProgramCacheKey(Ne);let qe=Z.programs;Z.environment=E.isMeshStandardMaterial?B.environment:null,Z.fog=B.fog,Z.envMap=(E.isMeshStandardMaterial?be:re).get(E.envMap||Z.environment),Z.envMapRotation=Z.environment!==null&&E.envMap===null?B.environmentRotation:E.envMapRotation,qe===void 0&&(E.addEventListener("dispose",te),qe=new Map,Z.programs=qe);let je=qe.get(De);if(je!==void 0){if(Z.currentProgram===je&&Z.lightsStateVersion===we)return Pc(E,Ne),je}else Ne.uniforms=q.getUniforms(E),E.onBeforeCompile(Ne,b),je=q.acquireProgram(Ne,De),qe.set(De,je),Z.uniforms=Ne.uniforms;const Oe=Z.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Oe.clippingPlanes=fe.uniform),Pc(E,Ne),Z.needsLights=rh(E),Z.lightsStateVersion=we,Z.needsLights&&(Oe.ambientLightColor.value=H.state.ambient,Oe.lightProbe.value=H.state.probe,Oe.directionalLights.value=H.state.directional,Oe.directionalLightShadows.value=H.state.directionalShadow,Oe.spotLights.value=H.state.spot,Oe.spotLightShadows.value=H.state.spotShadow,Oe.rectAreaLights.value=H.state.rectArea,Oe.ltc_1.value=H.state.rectAreaLTC1,Oe.ltc_2.value=H.state.rectAreaLTC2,Oe.pointLights.value=H.state.point,Oe.pointLightShadows.value=H.state.pointShadow,Oe.hemisphereLights.value=H.state.hemi,Oe.directionalShadowMap.value=H.state.directionalShadowMap,Oe.directionalShadowMatrix.value=H.state.directionalShadowMatrix,Oe.spotShadowMap.value=H.state.spotShadowMap,Oe.spotLightMatrix.value=H.state.spotLightMatrix,Oe.spotLightMap.value=H.state.spotLightMap,Oe.pointShadowMap.value=H.state.pointShadowMap,Oe.pointShadowMatrix.value=H.state.pointShadowMatrix),Z.currentProgram=je,Z.uniformsList=null,je}function Rc(E){if(E.uniformsList===null){const B=E.currentProgram.getUniforms();E.uniformsList=yr.seqWithValue(B.seq,E.uniforms)}return E.uniformsList}function Pc(E,B){const K=X.get(E);K.outputColorSpace=B.outputColorSpace,K.batching=B.batching,K.batchingColor=B.batchingColor,K.instancing=B.instancing,K.instancingColor=B.instancingColor,K.instancingMorph=B.instancingMorph,K.skinning=B.skinning,K.morphTargets=B.morphTargets,K.morphNormals=B.morphNormals,K.morphColors=B.morphColors,K.morphTargetsCount=B.morphTargetsCount,K.numClippingPlanes=B.numClippingPlanes,K.numIntersection=B.numClipIntersection,K.vertexAlphas=B.vertexAlphas,K.vertexTangents=B.vertexTangents,K.toneMapping=B.toneMapping}function sh(E,B,K,Z,H){B.isScene!==!0&&(B=Ue),se.resetTextureUnits();const me=B.fog,we=Z.isMeshStandardMaterial?B.environment:null,Ne=U===null?b.outputColorSpace:U.isXRRenderTarget===!0?U.texture.colorSpace:Vs,De=(Z.isMeshStandardMaterial?be:re).get(Z.envMap||we),qe=Z.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,je=!!K.attributes.tangent&&(!!Z.normalMap||Z.anisotropy>0),Oe=!!K.morphAttributes.position,tt=!!K.morphAttributes.normal,ft=!!K.morphAttributes.color;let Rt=Mi;Z.toneMapped&&(U===null||U.isXRRenderTarget===!0)&&(Rt=b.toneMapping);const St=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,_t=St!==void 0?St.length:0,He=X.get(Z),wt=h.state.lights;if(nt===!0&&(oe===!0||E!==A)){const $t=E===A&&Z.id===T;fe.setState(Z,E,$t)}let st=!1;Z.version===He.__version?(He.needsLights&&He.lightsStateVersion!==wt.state.version||He.outputColorSpace!==Ne||H.isBatchedMesh&&He.batching===!1||!H.isBatchedMesh&&He.batching===!0||H.isBatchedMesh&&He.batchingColor===!0&&H.colorTexture===null||H.isBatchedMesh&&He.batchingColor===!1&&H.colorTexture!==null||H.isInstancedMesh&&He.instancing===!1||!H.isInstancedMesh&&He.instancing===!0||H.isSkinnedMesh&&He.skinning===!1||!H.isSkinnedMesh&&He.skinning===!0||H.isInstancedMesh&&He.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&He.instancingColor===!1&&H.instanceColor!==null||H.isInstancedMesh&&He.instancingMorph===!0&&H.morphTexture===null||H.isInstancedMesh&&He.instancingMorph===!1&&H.morphTexture!==null||He.envMap!==De||Z.fog===!0&&He.fog!==me||He.numClippingPlanes!==void 0&&(He.numClippingPlanes!==fe.numPlanes||He.numIntersection!==fe.numIntersection)||He.vertexAlphas!==qe||He.vertexTangents!==je||He.morphTargets!==Oe||He.morphNormals!==tt||He.morphColors!==ft||He.toneMapping!==Rt||He.morphTargetsCount!==_t)&&(st=!0):(st=!0,He.__version=Z.version);let an=He.currentProgram;st===!0&&(an=La(Z,B,H));let is=!1,rn=!1,js=!1;const Ct=an.getUniforms(),fn=He.uniforms;if(z.useProgram(an.program)&&(is=!0,rn=!0,js=!0),Z.id!==T&&(T=Z.id,rn=!0),is||A!==E){z.buffers.depth.getReversed()&&E.reversedDepth!==!0&&(E._reversedDepth=!0,E.updateProjectionMatrix()),Ct.setValue(g,"projectionMatrix",E.projectionMatrix),Ct.setValue(g,"viewMatrix",E.matrixWorldInverse);const en=Ct.map.cameraPosition;en!==void 0&&en.setValue(g,Pe.setFromMatrixPosition(E.matrixWorld)),O.logarithmicDepthBuffer&&Ct.setValue(g,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(Z.isMeshPhongMaterial||Z.isMeshToonMaterial||Z.isMeshLambertMaterial||Z.isMeshBasicMaterial||Z.isMeshStandardMaterial||Z.isShaderMaterial)&&Ct.setValue(g,"isOrthographic",E.isOrthographicCamera===!0),A!==E&&(A=E,rn=!0,js=!0)}if(H.isSkinnedMesh){Ct.setOptional(g,H,"bindMatrix"),Ct.setOptional(g,H,"bindMatrixInverse");const $t=H.skeleton;$t&&($t.boneTexture===null&&$t.computeBoneTexture(),Ct.setValue(g,"boneTexture",$t.boneTexture,se))}H.isBatchedMesh&&(Ct.setOptional(g,H,"batchingTexture"),Ct.setValue(g,"batchingTexture",H._matricesTexture,se),Ct.setOptional(g,H,"batchingIdTexture"),Ct.setValue(g,"batchingIdTexture",H._indirectTexture,se),Ct.setOptional(g,H,"batchingColorTexture"),H._colorsTexture!==null&&Ct.setValue(g,"batchingColorTexture",H._colorsTexture,se));const hn=K.morphAttributes;if((hn.position!==void 0||hn.normal!==void 0||hn.color!==void 0)&&pe.update(H,K,an),(rn||He.receiveShadow!==H.receiveShadow)&&(He.receiveShadow=H.receiveShadow,Ct.setValue(g,"receiveShadow",H.receiveShadow)),Z.isMeshGouraudMaterial&&Z.envMap!==null&&(fn.envMap.value=De,fn.flipEnvMap.value=De.isCubeTexture&&De.isRenderTargetTexture===!1?-1:1),Z.isMeshStandardMaterial&&Z.envMap===null&&B.environment!==null&&(fn.envMapIntensity.value=B.environmentIntensity),rn&&(Ct.setValue(g,"toneMappingExposure",b.toneMappingExposure),He.needsLights&&ah(fn,js),me&&Z.fog===!0&&ne.refreshFogUniforms(fn,me),ne.refreshMaterialUniforms(fn,Z,G,ie,h.state.transmissionRenderTarget[E.id]),yr.upload(g,Rc(He),fn,se)),Z.isShaderMaterial&&Z.uniformsNeedUpdate===!0&&(yr.upload(g,Rc(He),fn,se),Z.uniformsNeedUpdate=!1),Z.isSpriteMaterial&&Ct.setValue(g,"center",H.center),Ct.setValue(g,"modelViewMatrix",H.modelViewMatrix),Ct.setValue(g,"normalMatrix",H.normalMatrix),Ct.setValue(g,"modelMatrix",H.matrixWorld),Z.isShaderMaterial||Z.isRawShaderMaterial){const $t=Z.uniformsGroups;for(let en=0,eo=$t.length;en<eo;en++){const Di=$t[en];$e.update(Di,an),$e.bind(Di,an)}}return an}function ah(E,B){E.ambientLightColor.needsUpdate=B,E.lightProbe.needsUpdate=B,E.directionalLights.needsUpdate=B,E.directionalLightShadows.needsUpdate=B,E.pointLights.needsUpdate=B,E.pointLightShadows.needsUpdate=B,E.spotLights.needsUpdate=B,E.spotLightShadows.needsUpdate=B,E.rectAreaLights.needsUpdate=B,E.hemisphereLights.needsUpdate=B}function rh(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return S},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return U},this.setRenderTargetTextures=function(E,B,K){const Z=X.get(E);Z.__autoAllocateDepthBuffer=E.resolveDepthBuffer===!1,Z.__autoAllocateDepthBuffer===!1&&(Z.__useRenderToTexture=!1),X.get(E.texture).__webglTexture=B,X.get(E.depthTexture).__webglTexture=Z.__autoAllocateDepthBuffer?void 0:K,Z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(E,B){const K=X.get(E);K.__webglFramebuffer=B,K.__useDefaultFramebuffer=B===void 0};const oh=g.createFramebuffer();this.setRenderTarget=function(E,B=0,K=0){U=E,S=B,R=K;let Z=!0,H=null,me=!1,we=!1;if(E){const De=X.get(E);if(De.__useDefaultFramebuffer!==void 0)z.bindFramebuffer(g.FRAMEBUFFER,null),Z=!1;else if(De.__webglFramebuffer===void 0)se.setupRenderTarget(E);else if(De.__hasExternalTextures)se.rebindTextures(E,X.get(E.texture).__webglTexture,X.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const Oe=E.depthTexture;if(De.__boundDepthTexture!==Oe){if(Oe!==null&&X.has(Oe)&&(E.width!==Oe.image.width||E.height!==Oe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");se.setupDepthRenderbuffer(E)}}const qe=E.texture;(qe.isData3DTexture||qe.isDataArrayTexture||qe.isCompressedArrayTexture)&&(we=!0);const je=X.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(je[B])?H=je[B][K]:H=je[B],me=!0):E.samples>0&&se.useMultisampledRTT(E)===!1?H=X.get(E).__webglMultisampledFramebuffer:Array.isArray(je)?H=je[K]:H=je,F.copy(E.viewport),j.copy(E.scissor),Y=E.scissorTest}else F.copy(Ie).multiplyScalar(G).floor(),j.copy(ke).multiplyScalar(G).floor(),Y=ot;if(K!==0&&(H=oh),z.bindFramebuffer(g.FRAMEBUFFER,H)&&Z&&z.drawBuffers(E,H),z.viewport(F),z.scissor(j),z.setScissorTest(Y),me){const De=X.get(E.texture);g.framebufferTexture2D(g.FRAMEBUFFER,g.COLOR_ATTACHMENT0,g.TEXTURE_CUBE_MAP_POSITIVE_X+B,De.__webglTexture,K)}else if(we){const De=B;for(let qe=0;qe<E.textures.length;qe++){const je=X.get(E.textures[qe]);g.framebufferTextureLayer(g.FRAMEBUFFER,g.COLOR_ATTACHMENT0+qe,je.__webglTexture,K,De)}}else if(E!==null&&K!==0){const De=X.get(E.texture);g.framebufferTexture2D(g.FRAMEBUFFER,g.COLOR_ATTACHMENT0,g.TEXTURE_2D,De.__webglTexture,K)}T=-1},this.readRenderTargetPixels=function(E,B,K,Z,H,me,we,Ne=0){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let De=X.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&we!==void 0&&(De=De[we]),De){z.bindFramebuffer(g.FRAMEBUFFER,De);try{const qe=E.textures[Ne],je=qe.format,Oe=qe.type;if(!O.textureFormatReadable(je)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!O.textureTypeReadable(Oe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=E.width-Z&&K>=0&&K<=E.height-H&&(E.textures.length>1&&g.readBuffer(g.COLOR_ATTACHMENT0+Ne),g.readPixels(B,K,Z,H,Ce.convert(je),Ce.convert(Oe),me))}finally{const qe=U!==null?X.get(U).__webglFramebuffer:null;z.bindFramebuffer(g.FRAMEBUFFER,qe)}}},this.readRenderTargetPixelsAsync=async function(E,B,K,Z,H,me,we,Ne=0){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let De=X.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&we!==void 0&&(De=De[we]),De)if(B>=0&&B<=E.width-Z&&K>=0&&K<=E.height-H){z.bindFramebuffer(g.FRAMEBUFFER,De);const qe=E.textures[Ne],je=qe.format,Oe=qe.type;if(!O.textureFormatReadable(je))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!O.textureTypeReadable(Oe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const tt=g.createBuffer();g.bindBuffer(g.PIXEL_PACK_BUFFER,tt),g.bufferData(g.PIXEL_PACK_BUFFER,me.byteLength,g.STREAM_READ),E.textures.length>1&&g.readBuffer(g.COLOR_ATTACHMENT0+Ne),g.readPixels(B,K,Z,H,Ce.convert(je),Ce.convert(Oe),0);const ft=U!==null?X.get(U).__webglFramebuffer:null;z.bindFramebuffer(g.FRAMEBUFFER,ft);const Rt=g.fenceSync(g.SYNC_GPU_COMMANDS_COMPLETE,0);return g.flush(),await j_(g,Rt,4),g.bindBuffer(g.PIXEL_PACK_BUFFER,tt),g.getBufferSubData(g.PIXEL_PACK_BUFFER,0,me),g.deleteBuffer(tt),g.deleteSync(Rt),me}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(E,B=null,K=0){const Z=Math.pow(2,-K),H=Math.floor(E.image.width*Z),me=Math.floor(E.image.height*Z),we=B!==null?B.x:0,Ne=B!==null?B.y:0;se.setTexture2D(E,0),g.copyTexSubImage2D(g.TEXTURE_2D,K,0,0,we,Ne,H,me),z.unbindTexture()};const lh=g.createFramebuffer(),ch=g.createFramebuffer();this.copyTextureToTexture=function(E,B,K=null,Z=null,H=0,me=null){me===null&&(H!==0?(Sa("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),me=H,H=0):me=0);let we,Ne,De,qe,je,Oe,tt,ft,Rt;const St=E.isCompressedTexture?E.mipmaps[me]:E.image;if(K!==null)we=K.max.x-K.min.x,Ne=K.max.y-K.min.y,De=K.isBox3?K.max.z-K.min.z:1,qe=K.min.x,je=K.min.y,Oe=K.isBox3?K.min.z:0;else{const hn=Math.pow(2,-H);we=Math.floor(St.width*hn),Ne=Math.floor(St.height*hn),E.isDataArrayTexture?De=St.depth:E.isData3DTexture?De=Math.floor(St.depth*hn):De=1,qe=0,je=0,Oe=0}Z!==null?(tt=Z.x,ft=Z.y,Rt=Z.z):(tt=0,ft=0,Rt=0);const _t=Ce.convert(B.format),He=Ce.convert(B.type);let wt;B.isData3DTexture?(se.setTexture3D(B,0),wt=g.TEXTURE_3D):B.isDataArrayTexture||B.isCompressedArrayTexture?(se.setTexture2DArray(B,0),wt=g.TEXTURE_2D_ARRAY):(se.setTexture2D(B,0),wt=g.TEXTURE_2D),g.pixelStorei(g.UNPACK_FLIP_Y_WEBGL,B.flipY),g.pixelStorei(g.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),g.pixelStorei(g.UNPACK_ALIGNMENT,B.unpackAlignment);const st=g.getParameter(g.UNPACK_ROW_LENGTH),an=g.getParameter(g.UNPACK_IMAGE_HEIGHT),is=g.getParameter(g.UNPACK_SKIP_PIXELS),rn=g.getParameter(g.UNPACK_SKIP_ROWS),js=g.getParameter(g.UNPACK_SKIP_IMAGES);g.pixelStorei(g.UNPACK_ROW_LENGTH,St.width),g.pixelStorei(g.UNPACK_IMAGE_HEIGHT,St.height),g.pixelStorei(g.UNPACK_SKIP_PIXELS,qe),g.pixelStorei(g.UNPACK_SKIP_ROWS,je),g.pixelStorei(g.UNPACK_SKIP_IMAGES,Oe);const Ct=E.isDataArrayTexture||E.isData3DTexture,fn=B.isDataArrayTexture||B.isData3DTexture;if(E.isDepthTexture){const hn=X.get(E),$t=X.get(B),en=X.get(hn.__renderTarget),eo=X.get($t.__renderTarget);z.bindFramebuffer(g.READ_FRAMEBUFFER,en.__webglFramebuffer),z.bindFramebuffer(g.DRAW_FRAMEBUFFER,eo.__webglFramebuffer);for(let Di=0;Di<De;Di++)Ct&&(g.framebufferTextureLayer(g.READ_FRAMEBUFFER,g.COLOR_ATTACHMENT0,X.get(E).__webglTexture,H,Oe+Di),g.framebufferTextureLayer(g.DRAW_FRAMEBUFFER,g.COLOR_ATTACHMENT0,X.get(B).__webglTexture,me,Rt+Di)),g.blitFramebuffer(qe,je,we,Ne,tt,ft,we,Ne,g.DEPTH_BUFFER_BIT,g.NEAREST);z.bindFramebuffer(g.READ_FRAMEBUFFER,null),z.bindFramebuffer(g.DRAW_FRAMEBUFFER,null)}else if(H!==0||E.isRenderTargetTexture||X.has(E)){const hn=X.get(E),$t=X.get(B);z.bindFramebuffer(g.READ_FRAMEBUFFER,lh),z.bindFramebuffer(g.DRAW_FRAMEBUFFER,ch);for(let en=0;en<De;en++)Ct?g.framebufferTextureLayer(g.READ_FRAMEBUFFER,g.COLOR_ATTACHMENT0,hn.__webglTexture,H,Oe+en):g.framebufferTexture2D(g.READ_FRAMEBUFFER,g.COLOR_ATTACHMENT0,g.TEXTURE_2D,hn.__webglTexture,H),fn?g.framebufferTextureLayer(g.DRAW_FRAMEBUFFER,g.COLOR_ATTACHMENT0,$t.__webglTexture,me,Rt+en):g.framebufferTexture2D(g.DRAW_FRAMEBUFFER,g.COLOR_ATTACHMENT0,g.TEXTURE_2D,$t.__webglTexture,me),H!==0?g.blitFramebuffer(qe,je,we,Ne,tt,ft,we,Ne,g.COLOR_BUFFER_BIT,g.NEAREST):fn?g.copyTexSubImage3D(wt,me,tt,ft,Rt+en,qe,je,we,Ne):g.copyTexSubImage2D(wt,me,tt,ft,qe,je,we,Ne);z.bindFramebuffer(g.READ_FRAMEBUFFER,null),z.bindFramebuffer(g.DRAW_FRAMEBUFFER,null)}else fn?E.isDataTexture||E.isData3DTexture?g.texSubImage3D(wt,me,tt,ft,Rt,we,Ne,De,_t,He,St.data):B.isCompressedArrayTexture?g.compressedTexSubImage3D(wt,me,tt,ft,Rt,we,Ne,De,_t,St.data):g.texSubImage3D(wt,me,tt,ft,Rt,we,Ne,De,_t,He,St):E.isDataTexture?g.texSubImage2D(g.TEXTURE_2D,me,tt,ft,we,Ne,_t,He,St.data):E.isCompressedTexture?g.compressedTexSubImage2D(g.TEXTURE_2D,me,tt,ft,St.width,St.height,_t,St.data):g.texSubImage2D(g.TEXTURE_2D,me,tt,ft,we,Ne,_t,He,St);g.pixelStorei(g.UNPACK_ROW_LENGTH,st),g.pixelStorei(g.UNPACK_IMAGE_HEIGHT,an),g.pixelStorei(g.UNPACK_SKIP_PIXELS,is),g.pixelStorei(g.UNPACK_SKIP_ROWS,rn),g.pixelStorei(g.UNPACK_SKIP_IMAGES,js),me===0&&B.generateMipmaps&&g.generateMipmap(wt),z.unbindTexture()},this.initRenderTarget=function(E){X.get(E).__webglFramebuffer===void 0&&se.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?se.setTextureCube(E,0):E.isData3DTexture?se.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?se.setTexture2DArray(E,0):se.setTexture2D(E,0),z.unbindTexture()},this.resetState=function(){S=0,R=0,U=null,z.reset(),xe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return zn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=rt._getDrawingBufferColorSpace(e),t.unpackColorSpace=rt._getUnpackColorSpace()}}const fu={type:"change"},Ac={type:"start"},th={type:"end"},ur=new Zr,hu=new vi,vS=Math.cos(70*q_.DEG2RAD),Ut=new V,tn=2*Math.PI,mt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Wo=1e-6;class bS extends Uv{constructor(e,t=null){super(e,t),this.state=mt.NONE,this.target=new V,this.cursor=new V,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:wn.ROTATE,MIDDLE:wn.DOLLY,RIGHT:wn.PAN},this.touches={ONE:On.ROTATE,TWO:On.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new V,this._lastQuaternion=new Yi,this._lastTargetPosition=new V,this._quat=new Yi().setFromUnitVectors(e.up,new V(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Hd,this._sphericalDelta=new Hd,this._scale=1,this._panOffset=new V,this._rotateStart=new Be,this._rotateEnd=new Be,this._rotateDelta=new Be,this._panStart=new Be,this._panEnd=new Be,this._panDelta=new Be,this._dollyStart=new Be,this._dollyEnd=new Be,this._dollyDelta=new Be,this._dollyDirection=new V,this._mouse=new Be,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=yS.bind(this),this._onPointerDown=xS.bind(this),this._onPointerUp=SS.bind(this),this._onContextMenu=RS.bind(this),this._onMouseWheel=TS.bind(this),this._onKeyDown=AS.bind(this),this._onTouchStart=wS.bind(this),this._onTouchMove=CS.bind(this),this._onMouseDown=MS.bind(this),this._onMouseMove=ES.bind(this),this._interceptControlDown=PS.bind(this),this._interceptControlUp=DS.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(fu),this.update(),this.state=mt.NONE}update(e=null){const t=this.object.position;Ut.copy(t).sub(this.target),Ut.applyQuaternion(this._quat),this._spherical.setFromVector3(Ut),this.autoRotate&&this.state===mt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=tn:i>Math.PI&&(i-=tn),s<-Math.PI?s+=tn:s>Math.PI&&(s-=tn),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let a=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),a=o!=this._spherical.radius}if(Ut.setFromSpherical(this._spherical),Ut.applyQuaternion(this._quatInverse),t.copy(this.target).add(Ut),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const r=Ut.length();o=this._clampDistance(r*this._scale);const l=r-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),a=!!l}else if(this.object.isOrthographicCamera){const r=new V(this._mouse.x,this._mouse.y,0);r.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),a=l!==this.object.zoom;const c=new V(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(r),this.object.updateMatrixWorld(),o=Ut.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(ur.origin.copy(this.object.position),ur.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(ur.direction))<vS?this.object.lookAt(this.target):(hu.setFromNormalAndCoplanarPoint(this.object.up,this.target),ur.intersectPlane(hu,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),a=!0)}return this._scale=1,this._performCursorZoom=!1,a||this._lastPosition.distanceToSquared(this.object.position)>Wo||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Wo||this._lastTargetPosition.distanceToSquared(this.target)>Wo?(this.dispatchEvent(fu),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?tn/60*this.autoRotateSpeed*e:tn/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Ut.setFromMatrixColumn(t,0),Ut.multiplyScalar(-e),this._panOffset.add(Ut)}_panUp(e,t){this.screenSpacePanning===!0?Ut.setFromMatrixColumn(t,1):(Ut.setFromMatrixColumn(t,0),Ut.crossVectors(this.object.up,Ut)),Ut.multiplyScalar(e),this._panOffset.add(Ut)}_pan(e,t){const i=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;Ut.copy(s).sub(this.target);let a=Ut.length();a*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*a/i.clientHeight,this.object.matrix),this._panUp(2*t*a/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),s=e-i.left,a=t-i.top,o=i.width,r=i.height;this._mouse.x=s/o*2-1,this._mouse.y=-(a/r)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(tn*this._rotateDelta.x/t.clientHeight),this._rotateUp(tn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(tn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-tn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(tn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-tn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(i,s)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,s=e.pageY-t.y,a=Math.sqrt(i*i+s*s);this._dollyStart.set(0,a)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),s=.5*(e.pageX+i.x),a=.5*(e.pageY+i.y);this._rotateEnd.set(s,a)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(tn*this._rotateDelta.x/t.clientHeight),this._rotateUp(tn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,s=e.pageY-t.y,a=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,a),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(e.pageX+t.x)*.5,r=(e.pageY+t.y)*.5;this._updateZoomParameters(o,r)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new Be,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function xS(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n)))}function yS(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function SS(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(th),this.state=mt.NONE;break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function MS(n){let e;switch(n.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case wn.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=mt.DOLLY;break;case wn.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=mt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=mt.ROTATE}break;case wn.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=mt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=mt.PAN}break;default:this.state=mt.NONE}this.state!==mt.NONE&&this.dispatchEvent(Ac)}function ES(n){switch(this.state){case mt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case mt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case mt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function TS(n){this.enabled===!1||this.enableZoom===!1||this.state!==mt.NONE||(n.preventDefault(),this.dispatchEvent(Ac),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(th))}function AS(n){this.enabled!==!1&&this._handleKeyDown(n)}function wS(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case On.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=mt.TOUCH_ROTATE;break;case On.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=mt.TOUCH_PAN;break;default:this.state=mt.NONE}break;case 2:switch(this.touches.TWO){case On.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=mt.TOUCH_DOLLY_PAN;break;case On.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=mt.TOUCH_DOLLY_ROTATE;break;default:this.state=mt.NONE}break;default:this.state=mt.NONE}this.state!==mt.NONE&&this.dispatchEvent(Ac)}function CS(n){switch(this._trackPointer(n),this.state){case mt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case mt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case mt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case mt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=mt.NONE}}function RS(n){this.enabled!==!1&&n.preventDefault()}function PS(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function DS(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}class IS extends bS{constructor(e,t){super(e,t),this.screenSpacePanning=!1,this.mouseButtons={LEFT:wn.PAN,MIDDLE:wn.DOLLY,RIGHT:wn.ROTATE},this.touches={ONE:On.PAN,TWO:On.DOLLY_ROTATE}}}const LS={class:"flex gap-4"},US={class:"flex flex-col gap-4"},NS={class:"w-64 bg-white border border-gray-300 rounded-lg p-4 shadow-lg"},FS={class:"mb-4"},OS={class:"text-sm"},BS={class:"font-bold"},zS={class:"mb-4"},HS={class:"text-sm"},VS={class:"max-h-60 overflow-y-auto"},kS={class:"font-semibold"},GS={key:0,class:"text-xs text-blue-600 ml-1"},qS={class:"text-xs text-gray-600"},WS={class:"w-64 bg-white border border-gray-300 rounded-lg p-4 shadow-lg"},jS={class:"space-y-2 text-sm"},$S={class:"flex justify-between"},XS={class:"font-bold"},YS={class:"flex justify-between"},KS={class:"font-bold"},ZS={class:"flex justify-between"},JS={class:"font-bold"},QS={class:"flex justify-between"},eM={class:"font-bold"},tM={class:"flex justify-between"},nM={class:"font-bold"},iM={class:"flex justify-between"},sM={class:"font-bold"},aM={class:"flex justify-between"},rM={class:"font-bold"},oM={class:"flex justify-between"},lM={class:"font-bold"},cM={class:"flex justify-between"},dM={class:"font-bold"},uM={class:"flex justify-between"},fM={class:"font-bold"},hM={class:"flex justify-between"},pM={class:"font-bold"},mM={class:"flex justify-between"},gM={class:"font-bold"},_M={class:"flex justify-between"},vM={class:"font-bold"},bM={class:"flex justify-between"},xM={class:"font-bold"},yM={class:"flex justify-between"},SM={class:"font-bold"},MM={class:"flex justify-between"},EM={class:"font-bold"},TM={class:"flex justify-between"},AM={class:"font-bold"},wM=Ji({__name:"arbol",setup(n){const e=Tt(null);let t=null,i,s,a,o=0,r=12369084;const l=new Lv;new Be;const c=[];let u=null,d=[],f=[];const p=new Be;let x=null;const{characterData:y,loadCharacterData:m}=Pi(),h=Ve({get:()=>y.value.nivel,set:g=>{y.value.nivel=g}}),P=Ve(()=>h.value*2),w=Ve({get:()=>{if(!y.value.arbol)return[];try{return JSON.parse(y.value.arbol)}catch(g){return console.error("Error parsing arbol data:",g),[]}},set:g=>{y.value.arbol=JSON.stringify(g)}}),b=Ve(()=>{if(!y.value.trasfondo)return[];const g=Pr.trasfondos.find(L=>L.nombre===y.value.trasfondo);return g?g.atributos:[]}),C=Ve(()=>w.value.filter(g=>!b.value.includes(g.nodeId))),S=Ve(()=>P.value-C.value.length),{cuerpo:R,agilidad:U,mente:T,hp:A,rangoCritico:F,habilidadesExtra:j,limiteHabilidad:Y,acciones:ce,reacciones:ae,poderio:Q,movimiento:ie,resistencia:G,regeneracion:ve,evasion:Te,iniciativa:Ie,punteria:ke,puntosHabilidad:ot}=bf(w,h);function ut(){const g=e.value,L=g.clientWidth,k=g.clientHeight;t=new _S({antialias:!0}),t.setPixelRatio(Math.min(window.devicePixelRatio,2)),t.setSize(L,k),t.setClearColor(15987958),g.appendChild(t.domElement),t.domElement.addEventListener("mousemove",nt),t.domElement.addEventListener("click",oe),i=new _v;const O=L/k;s=new _n(60,O,.1,2e3),s.position.set(0,250,0),s.lookAt(0,0,0),a=new IS(s,t.domElement),a.mouseButtons={LEFT:wn.PAN,MIDDLE:wn.DOLLY},a.touches={ONE:On.PAN,TWO:On.DOLLY_PAN},a.minPolarAngle=0,a.maxPolarAngle=Math.PI/2.5,a.minDistance=80,a.maxDistance=250,a.enableDamping=!0;const de=new Dv(16777215,1.2);i.add(de);const X=new Pv(16777215,2);X.position.set(10,20,15),X.castShadow=!1,i.add(X);const se=new un(new Br(100,200),new Tv({color:r}));se.rotation.x=-Math.PI/2;function re(D,J="#ffffff",le=180){const he=document.createElement("canvas"),ee=he.getContext("2d");he.width=1024,he.height=1024,ee.clearRect(0,0,he.width,he.height),ee.font=`bold ${le}px Arial`,ee.textAlign="center",ee.textBaseline="middle",ee.strokeStyle="#000000",ee.lineWidth=12,ee.strokeText(D,he.width/2,he.height/2),ee.fillStyle=J,ee.fillText(D,he.width/2,he.height/2);const te=new Ev(he);te.needsUpdate=!0;const ye=new Gf({map:te,transparent:!0,alphaTest:.05,depthTest:!1}),Fe=new bv(ye);return Fe.scale.set(16,16,1),Fe}const be=8;function M(D,J){const le=typeof D=="string"?parseInt(D):D;return J==="circle"?As.caracteristicasSecundarias.find(ee=>ee.id===le)?.diminutivo||"":qi.activas.find(ee=>ee.id===le)?.diminutivo||""}function v(D,J){const le=typeof D=="string"?parseInt(D):D;return J==="circle"?As.caracteristicasSecundarias.find(ee=>ee.id===le)?.descripcion||"":qi.activas.find(ee=>ee.id===le)?.descripcion||""}const N=[3,12,24,24],q=[15,45,90,135],ne=N.map((D,J)=>({count:D,radius:q[J],skills:new Array(D).fill(""),shape:new Array(D).fill("circle"),nodeData:new Array(D).fill(null)}));Ts.arbol.nodos.forEach(D=>{const J=ne[D.layer];if(J&&D.posicion<J.count){const le=M(D.atributo,D.shape);J.skills[D.posicion]=le,J.shape[D.posicion]=D.shape,J.nodeData[D.posicion]={id:D.id,atributo:D.atributo}}});function W(D,J,le=!1){const he=[];if(le)for(let Fe=0;Fe<=50;Fe++){const Ge=Fe/50,Xe=D.clone().lerp(J,Ge);Xe.y=-.1,he.push(Xe)}else{const Fe=new V(0,0,0),Ge=D.distanceTo(Fe),Xe=Math.atan2(D.z,D.x);let yt=Math.atan2(J.z,J.x)-Xe;yt>Math.PI&&(yt-=2*Math.PI),yt<-Math.PI&&(yt+=2*Math.PI);for(let ts=0;ts<=50;ts++){const jn=ts/50,ns=Xe+yt*jn,Da=new V(Math.cos(ns)*Ge,-.1,Math.sin(ns)*Ge);he.push(Da)}}const te=new Dn().setFromPoints(he),ye=new Wf({color:6710886,transparent:!0,opacity:.7,depthTest:!0,depthWrite:!1});return new Mv(te,ye)}const Se=[];ne.forEach((D,J)=>{const le=2*Math.PI/D.count,he=[];for(let ee=0;ee<D.count;ee++){const te=D.nodeData[ee];if(!te){he.push(new V(0,0,0));continue}const ye=ee*le,Fe=new V(Math.cos(ye+Math.PI/6)*D.radius,.1,Math.sin(ye+Math.PI/6)*D.radius);if(D.shape&&D.shape[ee]==="square"){const Ge=new un(new qs(be*2,1,be*2),new Ur({color:4886754,side:En}));Ge.position.copy(Fe),he.push(Fe.clone());const Xe=D.skills[ee]||"",Lt=v(te.atributo,"square");if(Ge.userData={nodeId:te.id,skillName:Xe,description:Lt,isSelected:!1,originalColor:4886754,selectedColor:65280,hoverColor:8308963,trasfondoNodeColor:6514417,type:"square",layer:J,index:ee},i.add(Ge),d.push(Ge),c.push(Ge),Xe){const yt=re(Xe,"#ffffff",350);yt.position.copy(Ge.position),i.add(yt)}}else{const Ge=new un(new Br(be,64),new Ur({color:4886754,side:En}));Ge.rotation.x=-Math.PI/2,Ge.position.copy(Fe),he.push(Fe.clone());const Xe=D.skills[ee]||"",Lt=v(te.atributo,"circle");if(Ge.userData={nodeId:te.id,skillName:Xe,description:Lt,isSelected:!1,originalColor:4886754,selectedColor:65280,hoverColor:8308963,trasfondoNodeColor:6514417,type:"circle",layer:J,index:ee},i.add(Ge),d.push(Ge),c.push(Ge),Xe){const yt=re(Xe,"#ffffff",350);yt.position.copy(Ge.position),i.add(yt)}}}Se.push(he)});function fe(D,J){if(D<0||D>=Se.length)return null;const le=Se[D];return!le||J<0||J>=le.length?null:le[J].clone()}function Ae(D,J,le,he,ee="straight",te=6710886,ye){const Fe=fe(D,J),Ge=fe(le,he);if(!Fe||!Ge)return console.warn("Invalid circle positions for connection"),null;const Lt=W(Fe,Ge,ee==="straight"),yt=ye||`${D}-${J}_to_${le}-${he}_${Date.now()}`;return Lt.userData={id:yt,type:ee,fromLayer:D,fromCircle:J,toLayer:le,toCircle:he,color:te},Lt.material.color.setHex(te),i.add(Lt),f.push(Lt),yt}function Re(D){const J=f.findIndex(le=>le.userData.id===D);if(J!==-1){const le=f[J];return i.remove(le),le.geometry.dispose(),le.material.dispose(),f.splice(J,1),!0}return!1}function pe(D,J,le,he){let ee=0;for(let te=f.length-1;te>=0;te--){const ye=f[te];ye.userData.fromLayer===D&&ye.userData.fromCircle===J&&ye.userData.toLayer===le&&ye.userData.toCircle===he&&(i.remove(ye),ye.geometry.dispose(),ye.material.dispose(),f.splice(te,1),ee++)}return ee}function Me(){for(;f.length>0;){const D=f.pop();i.remove(D),D.geometry.dispose(),D.material.dispose()}}function Le(D,J=6710886){const le=[],he=Se[D];if(!he)return le;for(let ee=0;ee<he.length;ee++){const te=(ee+1)%he.length,ye=Ae(D,ee,D,te,"curved",J);ye&&le.push(ye)}return le}const Ce={createConnection:Ae,removeConnection:Re,removeConnectionsBetween:pe,clearAllConnections:Me,createLayerRing:Le,getCirclePosition:fe};window.skillTreeAPI=Ce;const xe=new Map;Ts.arbol.nodos.forEach(D=>{xe.set(D.id,{layer:D.layer,position:D.posicion})}),Ts.arbol.conexiones.forEach(D=>{const J=xe.get(D.origen),le=xe.get(D.destino);if(J&&le){const he=J.layer===le.layer?"curved":"straight";Ce.createConnection(J.layer,J.position,le.layer,le.position,he,0)}});function $e(){w.value.forEach(D=>{const J=d.find(le=>le.userData.nodeId===D.nodeId);J&&(J.userData.isSelected=!0,J.material.color.setHex(J.userData.selectedColor))})}$e()}function nt(g){const L=t.domElement.getBoundingClientRect();p.x=(g.clientX-L.left)/L.width*2-1,p.y=-((g.clientY-L.top)/L.height)*2+1,l.setFromCamera(p,s);const k=l.intersectObjects(c);if(u&&!u.userData.isSelected&&u.material.color.setHex(u.userData.originalColor),k.length>0){const z=k[0].object;z.userData.isSelected||(u=z,z.material.color.setHex(z.userData.hoverColor)),ue(g,z),t.domElement.style.cursor="pointer"}else u=null,Pe(),t.domElement.style.cursor="default"}function oe(g){const L=t.domElement.getBoundingClientRect();p.x=(g.clientX-L.left)/L.width*2-1,p.y=-((g.clientY-L.top)/L.height)*2+1,l.setFromCamera(p,s);const k=l.intersectObjects(c);if(k.length>0){const O=k[0].object,z=b.value.includes(O.userData.nodeId);if(O.userData.isSelected){if(z)return;O.userData.isSelected=!1,O.material.color.setHex(O.userData.originalColor),w.value=w.value.filter(de=>de.nodeId!==O.userData.nodeId),console.log(`Deselected skill: ${O.userData.skillName}`)}else{if(S.value<=0){console.warn("No quedan puntos disponibles!");return}O.userData.isSelected=!0,O.material.color.setHex(O.userData.selectedColor),w.value=[...w.value,{nodeId:O.userData.nodeId,skillName:O.userData.skillName,type:O.userData.type,layer:O.userData.layer,index:O.userData.index,description:O.userData.description,isTrasfondo:z}],console.log(`Selected skill: ${O.userData.skillName} (Layer ${O.userData.layer}, Index ${O.userData.index})`),console.log(`Puntos restantes: ${S.value}`)}}}function ue(g,L){x||(x=document.createElement("div"),x.style.cssText=`
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
    `,document.body.appendChild(x)),x.innerHTML=`
  <strong>${L.userData.nodeId}</strong><br>
    <strong>${L.userData.skillName}</strong><br>
    <small>${L.userData.description}</small><br>
    <em>Tipo: ${L.userData.type==="circle"?"Pasiva":"Activa"}</em>
  `,x.style.left=g.clientX+10+"px",x.style.top=g.clientY-10+"px",x.style.display="block"}function Pe(){x&&(x.style.display="none")}function ze(){o=requestAnimationFrame(ze),a.update(),t.render(i,s)}function Ue(){cancelAnimationFrame(o),a.dispose(),i.traverse(g=>{g instanceof un&&(g.geometry&&g.geometry.dispose(),g.material&&(Array.isArray(g.material)?g.material.forEach(L=>{L.dispose()}):g.material.dispose()))}),x&&(document.body.removeChild(x),x=null),t?.domElement&&(t.domElement.removeEventListener("mousemove",nt),t.domElement.removeEventListener("click",oe)),t&&(t.dispose(),t.domElement.remove(),t=null)}at(()=>y.value.trasfondo,(g,L)=>{if(g!==L){console.log("🔄 [arbol.vue] Trasfondo cambió:",g);const k=w.value.filter(O=>!O.isTrasfondo);d.forEach(O=>{w.value.find(de=>de.nodeId===O.userData.nodeId&&de.isTrasfondo)&&(O.userData.isSelected=!1,O.material.color.setHex(O.userData.originalColor))}),w.value=k,g&&(Je(),wa(()=>{I()}))}});function Je(){const g=Pr.trasfondos.find(k=>k.nombre===y.value.trasfondo);if(!g)return;const L=[];g.atributos.forEach(k=>{if(!w.value.find(O=>O.nodeId===k)){const O=Ts.arbol.nodos.find(re=>re.id===k);if(!O)return;const z=(re,be)=>{const M=typeof re=="string"?parseInt(re):re;return be==="circle"?As.caracteristicasSecundarias.find(N=>N.id===M)?.diminutivo||"":qi.activas.find(N=>N.id===M)?.diminutivo||""},de=(re,be)=>{const M=typeof re=="string"?parseInt(re):re;return be==="circle"?As.caracteristicasSecundarias.find(N=>N.id===M)?.descripcion||"":qi.activas.find(N=>N.id===M)?.descripcion||""},X=z(O.atributo,O.shape),se=de(O.atributo,O.shape);L.push({nodeId:k,skillName:X,type:O.shape==="circle"?"circle":"square",layer:O.layer,index:O.posicion,description:se,isTrasfondo:!0})}}),L.length>0&&(w.value=[...w.value,...L])}function I(){w.value.forEach(g=>{if(g.isTrasfondo){const L=d.find(k=>k.userData.nodeId===g.nodeId);L&&(L.userData.isSelected=!0,L.material.color.setHex(L.userData.selectedColor))}})}return Wn(()=>{e.value&&(console.log("Mounted arbol.vue"),m(),y.value.trasfondo&&(console.log("➕ Trasfondo detectado, verificando nodos:",y.value.trasfondo),Je()),ut(),ze())}),ju(()=>{Ue()}),(g,L)=>(ge(),_e("div",LS,[_("div",{ref_key:"box",ref:e,class:"w-250 h-150 relative"},null,512),_("div",US,[_("div",NS,[L[2]||(L[2]=_("h3",{class:"text-lg font-bold mb-3"},"Nodos Seleccionados",-1)),_("div",FS,[_("p",OS,[L[0]||(L[0]=_("span",{class:"font-medium"},"Nivel de Personaje: ",-1)),_("span",BS,$(h.value),1)])]),_("div",zS,[_("p",HS,[L[1]||(L[1]=_("span",{class:"font-semibold"},"Puntos disponibles: ",-1)),_("span",{class:Et(S.value<0?"text-red-600":"text-green-600")},$(S.value),3)])]),_("div",VS,[(ge(!0),_e(Qe,null,Mt(w.value,k=>(ge(),_e("div",{key:k.nodeId,class:Et(["mb-2 p-2 rounded text-sm",k.isTrasfondo?"bg-blue-100 border-2 border-blue-400":"bg-gray-100"])},[_("div",kS,[Gt($(k.skillName)+" ",1),k.isTrasfondo?(ge(),_e("span",GS,"(Trasfondo)")):gt("",!0)]),_("div",qS,$(k.type==="circle"?"Atributo":"Activa")+" - Layer "+$(k.layer),1)],2))),128))])]),_("div",WS,[L[23]||(L[23]=_("h3",{class:"text-lg font-bold mb-3"},"Atributos",-1)),_("div",jS,[L[20]||(L[20]=_("div",{class:"font-semibold text-blue-700 mb-2"},"Principales",-1)),_("div",$S,[L[3]||(L[3]=_("span",null,"Cuerpo:",-1)),_("span",XS,$(lt(R)),1)]),_("div",YS,[L[4]||(L[4]=_("span",null,"Agilidad:",-1)),_("span",KS,$(lt(U)),1)]),_("div",ZS,[L[5]||(L[5]=_("span",null,"Mente:",-1)),_("span",JS,$(lt(T)),1)]),L[21]||(L[21]=_("div",{class:"font-semibold text-green-700 mt-3 mb-2"},"Derivados (×3)",-1)),_("div",QS,[L[6]||(L[6]=_("span",null,"HP:",-1)),_("span",eM,$(lt(A)),1)]),_("div",tM,[L[7]||(L[7]=_("span",null,"Poderío:",-1)),_("span",nM,$(lt(Q)),1)]),_("div",iM,[L[8]||(L[8]=_("span",null,"Movimiento:",-1)),_("span",sM,$(lt(ie)),1)]),_("div",aM,[L[9]||(L[9]=_("span",null,"Resistencia:",-1)),_("span",rM,$(lt(G)),1)]),_("div",oM,[L[10]||(L[10]=_("span",null,"Regeneración:",-1)),_("span",lM,$(lt(ve)),1)]),_("div",cM,[L[11]||(L[11]=_("span",null,"Evasión:",-1)),_("span",dM,$(lt(Te)),1)]),_("div",uM,[L[12]||(L[12]=_("span",null,"Iniciativa:",-1)),_("span",fM,$(lt(Ie)),1)]),_("div",hM,[L[13]||(L[13]=_("span",null,"Puntería:",-1)),_("span",pM,$(lt(ke)),1)]),_("div",mM,[L[14]||(L[14]=_("span",null,"Pts Habilidad:",-1)),_("span",gM,$(lt(ot)),1)]),L[22]||(L[22]=_("div",{class:"font-semibold text-purple-700 mt-3 mb-2"},"Especiales (×1)",-1)),_("div",_M,[L[15]||(L[15]=_("span",null,"Rango Crítico:",-1)),_("span",vM,$(lt(F)),1)]),_("div",bM,[L[16]||(L[16]=_("span",null,"Habilidades Extra:",-1)),_("span",xM,$(lt(j)),1)]),_("div",yM,[L[17]||(L[17]=_("span",null,"Límite Habilidad:",-1)),_("span",SM,$(lt(Y)),1)]),_("div",MM,[L[18]||(L[18]=_("span",null,"Acciones:",-1)),_("span",EM,$(lt(ce)),1)]),_("div",TM,[L[19]||(L[19]=_("span",null,"Reacciones:",-1)),_("span",AM,$(lt(ae)),1)])])])])]))}}),CM={class:"space-y-6"},RM={class:"bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-6 shadow-lg"},PM={class:"flex items-center justify-between"},DM={class:"text-4xl font-bold mt-1"},IM={class:"text-right opacity-90"},LM={class:"text-2xl font-semibold"},UM={class:"text-right opacity-90"},NM={class:"text-2xl font-semibold"},FM={class:"bg-blue-50 border-2 border-blue-200 rounded-lg overflow-hidden"},OM={class:"divide-y divide-blue-200 max-h-200 overflow-y-auto"},BM={class:"col-span-1 flex justify-center"},zM=["onUpdate:modelValue","disabled"],HM={class:"col-span-3"},VM={class:"font-semibold text-blue-700"},kM={key:0,class:"text-xs text-purple-600 ml-1"},GM={key:1,class:"text-xs text-green-600 ml-1"},qM={class:"text-xs text-blue-500"},WM={class:"col-span-2 text-center"},jM={class:"inline-flex items-center justify-center bg-white border-2 border-blue-300 rounded-lg px-4 py-2 font-bold text-blue-700 min-w-[60px]"},$M={class:"col-span-2 text-center"},XM={class:"flex items-center justify-center gap-2"},YM=["onClick","disabled"],KM=["onUpdate:modelValue","onFocus","onInput","max"],ZM=["onClick","disabled"],JM={class:"col-span-2 text-center"},QM=["onUpdate:modelValue"],eE={class:"col-span-2 text-center"},tE={class:"inline-flex items-center justify-center bg-blue-600 text-white rounded-lg px-4 py-2 font-bold text-lg min-w-[60px] shadow-md"},nE={class:"bg-green-50 border-2 border-green-200 rounded-lg overflow-hidden"},iE={class:"divide-y divide-green-200"},sE={class:"col-span-3"},aE={class:"font-semibold text-green-700"},rE={class:"text-xs text-green-500"},oE={class:"col-span-2 text-center"},lE={class:"inline-flex items-center justify-center bg-white border-2 border-green-300 rounded-lg px-4 py-2 font-bold text-green-700 min-w-[60px]"},cE={class:"col-span-2 text-center"},dE={class:"flex items-center justify-center gap-2"},uE=["onClick","disabled"],fE=["onUpdate:modelValue","onInput"],hE=["onClick","disabled"],pE={class:"col-span-2 text-center"},mE=["onUpdate:modelValue"],gE={class:"col-span-2 text-center"},_E={class:"inline-flex items-center justify-center bg-green-600 text-white rounded-lg px-4 py-2 font-bold text-lg min-w-[60px] shadow-md"},vE={class:"bg-amber-50 border-2 border-amber-200 rounded-lg overflow-hidden"},bE={class:"divide-y divide-amber-200"},xE={class:"col-span-3"},yE={class:"font-semibold text-amber-700"},SE={class:"text-xs text-amber-500"},ME={class:"col-span-2 text-center"},EE={class:"inline-flex items-center justify-center bg-white border-2 border-amber-300 rounded-lg px-4 py-2 font-bold text-amber-700 min-w-[60px]"},TE={class:"col-span-2 text-center"},AE={class:"flex items-center justify-center gap-2"},wE=["onClick","disabled"],CE=["onUpdate:modelValue","onFocus","onInput"],RE=["onClick","disabled"],PE={class:"col-span-2 text-center"},DE=["onUpdate:modelValue"],IE={class:"col-span-2 text-center"},LE={class:"inline-flex items-center justify-center bg-amber-600 text-white rounded-lg px-4 py-2 font-bold text-lg min-w-[60px] shadow-md"},UE=Ji({__name:"habilidades",setup(n){const{characterData:e,loadCharacterData:t,saveCharacterData:i}=Pi(),s=Ve(()=>e.value.atributos?.puntosHabilidad),a=Ve(()=>e.value.atributos?.limiteHabilidad||5);Ve(()=>{const b=e.value.trasfondo_habilidades?.length||0,C=e.value.oficio_habilidades?.length||0;return b+C});const o=Ve(()=>e.value.atributos?.habilidadesExtra||0),r=Tt([]);function l(){const b=e.value.trasfondo_habilidades||[],C=e.value.oficio_habilidades||[];console.log("🔄 Inicializando habilidades"),console.log("  Trasfondo:",b),console.log("  Oficio:",C);let S=[];try{S=e.value.habilidades?JSON.parse(e.value.habilidades):[]}catch{S=[]}r.value=Xr.habilidades.map(R=>{const U=b.includes(R.nombre),T=C.includes(R.nombre),A=S.find(ce=>ce.id===R.id),F=U||T;let j=0;R.atributo==="Cuerpo"?j=e.value.atributos?.cuerpo||0:R.atributo==="Agilidad"?j=e.value.atributos?.agilidad||0:(R.atributo==="Mente"||R.atributo==="Artesania"||R.atributo==="Recoleccion")&&(j=e.value.atributos?.mente||0);let Y;if(F)Y=!0;else if(A){const ce=A.origenTrasfondo??!1,ae=A.origenOficio??!1;(ce||ae)&&!F?(Y=!1,console.log(`  ✗ ${R.nombre} desmarcada (ya no es de Trasfondo/Oficio)`)):Y=A.activa??!1}else Y=!1;return(U||T)&&console.log(`  ✓ ${R.nombre} marcada como activa (${U?"Trasfondo":"Oficio"})`),{id:R.id,nombre:R.nombre,atributo:R.atributo,activa:Y,origenTrasfondo:U,origenOficio:T,modAtributo:j,rangos:A?.rangos??0,bonifDiversos:A?.bonifDiversos??0}}),w()}const c=Ve(()=>r.value.reduce((b,C)=>{if(C.rangos>0){const R=C.atributo==="Artesania"||C.atributo==="Recoleccion"||C.activa?1:2;return b+C.rangos*R}return b},0)),u=Ve(()=>s.value-c.value);Ve(()=>r.value.filter(b=>b.activa).length);const d=Ve(()=>r.value.filter(b=>b.activa&&!b.origenTrasfondo&&!b.origenOficio).length),f=Ve(()=>r.value.filter(b=>b.atributo!=="Artesania"&&b.atributo!=="Recoleccion")),p=Ve(()=>r.value.filter(b=>b.atributo==="Artesania")),x=Ve(()=>r.value.filter(b=>b.atributo==="Recoleccion"));function y(b){return b.origenTrasfondo||b.origenOficio}at(()=>r.value.map(b=>b.activa),()=>{if(r.value.filter(C=>C.activa&&!C.origenTrasfondo&&!C.origenOficio).length>o.value)for(let C=r.value.length-1;C>=0;C--){const S=r.value[C];if(S&&S.activa&&!y(S)){S.activa=!1;break}}},{deep:!0}),Wn(()=>{t(),l()}),at([s,c,u],([b,C,S])=>{console.log("Puntos Maximos:",b),console.log("Puntos Asignados:",C),console.log("Puntos Disponibles:",S)}),at(()=>[e.value.oficio_habilidades,e.value.trasfondo_habilidades,e.value.atributos],()=>{l()},{deep:!0});function m(b){const C=b.origenTrasfondo||b.origenOficio?2:0;return b.modAtributo+b.rangos+b.bonifDiversos+C}function h(b,C){const S=b.rangos+C,U=b.atributo==="Artesania"||b.atributo==="Recoleccion"||b.activa?1:2;if(S>=0&&S<=a.value)if(C>0){const T=U;u.value>=T&&(b.rangos=S,w())}else C<0&&(b.rangos=S,w())}function P(b){const C=b.rangosAnteriores??0,S=b.rangos;if(S<0){b.rangos=C;return}if(isNaN(S)){b.rangos=0,b.rangosAnteriores=0,w();return}S>a.value&&(b.rangos=a.value);const U=b.atributo==="Artesania"||b.atributo==="Recoleccion"||b.activa?1:2,T=r.value.reduce((j,Y)=>{if(Y.id===b.id)return j;if(Y.rangos>0){const ae=Y.atributo==="Artesania"||Y.atributo==="Recoleccion"||Y.activa?1:2;return j+Y.rangos*ae}return j},0),A=s.value-T;if(b.rangos*U>A){b.rangos=C;return}b.rangosAnteriores=b.rangos,w()}function w(){const b=r.value.map(C=>{const S=m(C);return{id:C.id,nombre:C.nombre,activa:C.activa,origenTrasfondo:C.origenTrasfondo,origenOficio:C.origenOficio,rangos:C.rangos,bonifDiversos:C.bonifDiversos,modAtributo:C.modAtributo,total:S}});console.log("💾 Guardando habilidades. Activas:",b.filter(C=>C.activa).map(C=>C.nombre)),e.value.habilidades=JSON.stringify(b),i()}return(b,C)=>(ge(),_e("div",CM,[_("div",RM,[_("div",PM,[_("div",null,[C[0]||(C[0]=_("div",{class:"text-sm font-semibold uppercase tracking-wide opacity-90"},"Puntos Disponibles",-1)),_("div",DM,$(u.value),1)]),_("div",IM,[C[1]||(C[1]=_("div",{class:"text-sm"},"Límite por habilidad",-1)),_("div",LM,$(a.value),1)]),_("div",UM,[C[2]||(C[2]=_("div",{class:"text-sm"},"Habilidades extras",-1)),_("div",NM,$(d.value)+" / "+$(o.value),1)])])]),_("div",FM,[C[3]||(C[3]=Es('<div class="bg-blue-600 text-white px-6 py-3"><h3 class="text-xl font-bold">Habilidades Generales</h3></div><div class="bg-blue-600 text-white grid grid-cols-12 gap-4 px-6 py-4 font-semibold text-sm"><div class="col-span-1 text-center">Activa</div><div class="col-span-3">Habilidad</div><div class="col-span-2 text-center">Mod. Atributo</div><div class="col-span-2 text-center">Puntos Rangos</div><div class="col-span-2 text-center">Bonif. Diversos</div><div class="col-span-2 text-center">Total</div></div>',2)),_("div",OM,[(ge(!0),_e(Qe,null,Mt(f.value,S=>(ge(),_e("div",{key:S.id,class:"grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-blue-100 transition-colors"},[_("div",BM,[mn(_("input",{type:"checkbox","onUpdate:modelValue":R=>S.activa=R,disabled:y(S)||!S.activa&&d.value>=o.value,onChange:w,class:Et(["w-6 h-6 text-blue-600 rounded border-2 border-blue-300 focus:ring-blue-500 cursor-pointer",y(S)?"opacity-70 cursor-not-allowed":"disabled:opacity-50 disabled:cursor-not-allowed"])},null,42,zM),[[Mm,S.activa]])]),_("div",HM,[_("div",VM,[Gt($(S.nombre)+" ",1),S.origenTrasfondo?(ge(),_e("span",kM,"(Trasfondo)")):gt("",!0),S.origenOficio?(ge(),_e("span",GM,"(Oficio)")):gt("",!0)]),_("div",qM,"("+$(S.atributo)+")",1)]),_("div",WM,[_("div",jM,$(S.modAtributo>=0?"+":"")+$(S.modAtributo),1)]),_("div",$M,[_("div",XM,[_("button",{onClick:R=>h(S,-1),disabled:S.rangos<=0,class:"w-8 h-8 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600 disabled:bg-blue-200 disabled:cursor-not-allowed transition-colors"}," - ",8,YM),mn(_("input",{type:"number","onUpdate:modelValue":R=>S.rangos=R,onFocus:R=>S.rangosAnteriores=S.rangos,onInput:R=>P(S),onChange:w,class:"w-16 text-center bg-white border-2 border-blue-300 rounded-lg px-2 py-2 font-bold text-blue-700 focus:outline-none focus:border-blue-500",min:"0",max:a.value},null,40,KM),[[_i,S.rangos,void 0,{number:!0}]]),_("button",{onClick:R=>h(S,1),disabled:u.value<(S.activa?1:2)||S.rangos>=a.value,class:"w-8 h-8 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600 disabled:bg-blue-200 disabled:cursor-not-allowed transition-colors",title:"Coste: {{habilidad.activa ? '1 punto' : '2 puntos'}}"}," + ",8,ZM)])]),_("div",JM,[mn(_("input",{type:"number","onUpdate:modelValue":R=>S.bonifDiversos=R,onChange:w,class:"w-20 text-center bg-white border-2 border-blue-300 rounded-lg px-2 py-2 font-bold text-blue-700 focus:outline-none focus:border-blue-500"},null,40,QM),[[_i,S.bonifDiversos,void 0,{number:!0}]])]),_("div",eE,[_("div",tE,$(m(S)>=0?"+":"")+$(m(S)),1)])]))),128))])]),_("div",nE,[C[5]||(C[5]=Es('<div class="bg-green-600 text-white px-6 py-3"><h3 class="text-xl font-bold">Habilidades de Artesanía</h3></div><div class="bg-green-600 text-white grid grid-cols-12 gap-4 px-6 py-4 font-semibold text-sm"><div class="col-span-1 text-center">Activa</div><div class="col-span-3">Habilidad</div><div class="col-span-2 text-center">Mod. Atributo</div><div class="col-span-2 text-center">Puntos Rangos</div><div class="col-span-2 text-center">Bonif. Diversos</div><div class="col-span-2 text-center">Total</div></div>',2)),_("div",iE,[(ge(!0),_e(Qe,null,Mt(p.value,S=>(ge(),_e("div",{key:S.id,class:"grid grid-cols-12 gap-4 px-6 py-4 items-center bg-green-50 opacity-60"},[C[4]||(C[4]=_("div",{class:"col-span-1 flex justify-center"},[_("input",{type:"checkbox",checked:!1,disabled:"",class:"w-6 h-6 text-green-600 rounded border-2 border-green-300 opacity-50 cursor-not-allowed"})],-1)),_("div",sE,[_("div",aE,$(S.nombre),1),_("div",rE,"("+$(S.atributo)+")",1)]),_("div",oE,[_("div",lE,$(S.modAtributo>=0?"+":"")+$(S.modAtributo),1)]),_("div",cE,[_("div",dE,[_("button",{onClick:R=>h(S,-1),disabled:S.rangos<=0,class:"w-8 h-8 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600 disabled:bg-green-200 disabled:cursor-not-allowed transition-colors"}," - ",8,uE),mn(_("input",{type:"number","onUpdate:modelValue":R=>S.rangos=R,onInput:R=>P(S),class:"w-16 text-center bg-white border-2 border-green-300 rounded-lg px-2 py-2 font-bold text-green-700 focus:outline-none focus:border-green-500",min:"0"},null,40,fE),[[_i,S.rangos,void 0,{number:!0}]]),_("button",{onClick:R=>h(S,1),disabled:u.value<=0,class:"w-8 h-8 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600 disabled:bg-green-200 disabled:cursor-not-allowed transition-colors"}," + ",8,hE)])]),_("div",pE,[mn(_("input",{type:"number","onUpdate:modelValue":R=>S.bonifDiversos=R,class:"w-20 text-center bg-white border-2 border-green-300 rounded-lg px-2 py-2 font-bold text-green-700 focus:outline-none focus:border-green-500"},null,8,mE),[[_i,S.bonifDiversos,void 0,{number:!0}]])]),_("div",gE,[_("div",_E,$(m(S)>=0?"+":"")+$(m(S)),1)])]))),128))])]),_("div",vE,[C[7]||(C[7]=Es('<div class="bg-amber-600 text-white px-6 py-3"><h3 class="text-xl font-bold">Habilidades de Recolección</h3></div><div class="bg-amber-600 text-white grid grid-cols-12 gap-4 px-6 py-4 font-semibold text-sm"><div class="col-span-1 text-center">Comp.</div><div class="col-span-3">Habilidad</div><div class="col-span-2 text-center">Mod. Atributo</div><div class="col-span-2 text-center">Puntos Rangos</div><div class="col-span-2 text-center">Bonif. Diversos</div><div class="col-span-2 text-center">Total</div></div>',2)),_("div",bE,[(ge(!0),_e(Qe,null,Mt(x.value,S=>(ge(),_e("div",{key:S.id,class:"grid grid-cols-12 gap-4 px-6 py-4 items-center bg-amber-50 opacity-60"},[C[6]||(C[6]=_("div",{class:"col-span-1 flex justify-center"},[_("input",{type:"checkbox",checked:!1,disabled:"",class:"w-6 h-6 text-amber-600 rounded border-2 border-amber-300 opacity-50 cursor-not-allowed"})],-1)),_("div",xE,[_("div",yE,$(S.nombre),1),_("div",SE,"("+$(S.atributo)+")",1)]),_("div",ME,[_("div",EE,$(S.modAtributo>=0?"+":"")+$(S.modAtributo),1)]),_("div",TE,[_("div",AE,[_("button",{onClick:R=>h(S,-1),disabled:S.rangos<=0,class:"w-8 h-8 bg-amber-500 text-white rounded-lg font-bold hover:bg-amber-600 disabled:bg-amber-200 disabled:cursor-not-allowed transition-colors"}," - ",8,wE),mn(_("input",{type:"number","onUpdate:modelValue":R=>S.rangos=R,onFocus:R=>S.rangosAnteriores=S.rangos,onInput:R=>P(S),class:"w-16 text-center bg-white border-2 border-amber-300 rounded-lg px-2 py-2 font-bold text-amber-700 focus:outline-none focus:border-amber-500",min:"0"},null,40,CE),[[_i,S.rangos,void 0,{number:!0}]]),_("button",{onClick:R=>h(S,1),disabled:u.value<1||S.rangos>=a.value,class:"w-8 h-8 bg-amber-500 text-white rounded-lg font-bold hover:bg-amber-600 disabled:bg-amber-200 disabled:cursor-not-allowed transition-colors"}," + ",8,RE)])]),_("div",PE,[mn(_("input",{type:"number","onUpdate:modelValue":R=>S.bonifDiversos=R,onChange:w,class:"w-20 text-center bg-white border-2 border-amber-300 rounded-lg px-2 py-2 font-bold text-amber-700 focus:outline-none focus:border-amber-500"},null,40,DE),[[_i,S.bonifDiversos,void 0,{number:!0}]])]),_("div",IE,[_("div",LE,$(m(S)>=0?"+":"")+$(m(S)),1)])]))),128))])]),C[8]||(C[8]=Es('<div class="bg-blue-50 border-2 border-blue-200 rounded-lg p-4"><h4 class="font-semibold text-blue-700 mb-2">Leyenda:</h4><div class="text-sm text-blue-600 space-y-1"><div><span class="font-semibold">Comp.:</span> Indica si tienes competencia en esta habilidad (otorgado por clase/trasfondo)</div><div><span class="font-semibold">Mod. Atributo:</span> Modificador del atributo asociado a la habilidad</div><div><span class="font-semibold">Puntos Rangos:</span> Puntos que asignas para mejorar esta habilidad</div><div><span class="font-semibold">Bonif. Diversos:</span> Bonificadores adicionales de objetos, dotes o efectos temporales</div><div><span class="font-semibold">Total:</span> Suma de todos los modificadores (este es el valor que usarás en tus tiradas)</div></div></div>',1))]))}}),NE=JSON.parse(`[{"id":1,"nombre":"Gladius","categoria":"Espada corta","critico":"x2","rango_critico":null,"distancia_min":null,"distancia_max":null,"penetrante":6,"lacerante":7,"contundente":2,"descripcion":"Espada corta romana, perfecta para combate cercano y ataques precisos."},{"id":2,"nombre":"Lanza","categoria":"Arma enastada, Versátil","critico":"x2","rango_critico":null,"distancia_min":2,"distancia_max":3,"penetrante":8,"lacerante":2,"contundente":2,"descripcion":"Arma enastada versátil, ideal para mantener distancia con enemigos."},{"id":3,"nombre":"Hacha de mano","categoria":"Arrojadiza, Hacha","critico":"x2","rango_critico":null,"distancia_min":null,"distancia_max":null,"penetrante":3,"lacerante":7,"contundente":4,"descripcion":"Hacha ligera y equilibrada, puede ser lanzada o usada en combate cuerpo a cuerpo."},{"id":4,"nombre":"Maza","categoria":"Arma contundente","critico":"x2","rango_critico":null,"distancia_min":null,"distancia_max":null,"penetrante":1,"lacerante":1,"contundente":8,"descripcion":"Arma contundente simple pero efectiva, causa gran daño por impacto."},{"id":5,"nombre":"Maza de guerra","categoria":"A dos manos, Arma contundente, Pesada","critico":"x2","rango_critico":"23-24","distancia_min":null,"distancia_max":null,"penetrante":1,"lacerante":1,"contundente":10,"descripcion":"Maza pesada a dos manos, capaz de aplastar armaduras con golpes devastadores."},{"id":6,"nombre":"Hacha de batalla","categoria":"A dos manos, Hacha, Pesada","critico":"x2","rango_critico":"23-24","distancia_min":null,"distancia_max":null,"penetrante":3,"lacerante":8,"contundente":5,"descripcion":"Hacha de guerra pesada, inflige cortes profundos y letales."},{"id":7,"nombre":"Espadón","categoria":"A dos manos, Glande, Pesada","critico":"x2","rango_critico":"23-24","distancia_min":null,"distancia_max":null,"penetrante":4,"lacerante":9,"contundente":4,"descripcion":"Espada grande a dos manos, excelente alcance y poder de corte."},{"id":8,"nombre":"Espada bastarda","categoria":"Espada larga, Versátil","critico":"x2","rango_critico":null,"distancia_min":null,"distancia_max":null,"penetrante":5,"lacerante":8,"contundente":4,"descripcion":"Espada versátil que puede usarse a una o dos manos según la situación."},{"id":9,"nombre":"Espada corta","categoria":"Espada corta","critico":"x2","rango_critico":null,"distancia_min":null,"distancia_max":null,"penetrante":6,"lacerante":6,"contundente":2,"descripcion":"Espada de hoja corta, ágil y equilibrada para combate rápido."},{"id":10,"nombre":"Pica longa","categoria":"A dos manos, Arma enastada, Glande, Pesada","critico":"x2","rango_critico":"23-24","distancia_min":null,"distancia_max":null,"penetrante":9,"lacerante":2,"contundente":2,"descripcion":"Lanza larga de gran alcance, perfecta para formaciones y mantener enemigos a distancia."},{"id":11,"nombre":"Guja Naginata","categoria":"Arma enastada, Versátil","critico":"x2","rango_critico":null,"distancia_min":null,"distancia_max":null,"penetrante":5,"lacerante":8,"contundente":3,"descripcion":"Arma enastada con hoja curva, combina alcance con poder de corte."},{"id":12,"nombre":"Pico de guerra","categoria":"Hacha, Pesada","critico":"x2","rango_critico":null,"distancia_min":null,"distancia_max":null,"penetrante":9,"lacerante":1,"contundente":5,"descripcion":"Arma especializada en perforar armaduras con su punta afilada."},{"id":13,"nombre":"Guadaña","categoria":"A dos manos, Arma enastada, Pesada","critico":"x3","rango_critico":null,"distancia_min":null,"distancia_max":null,"penetrante":2,"lacerante":8,"contundente":3,"descripcion":"Hoja curva montada en asta larga, mortal con ataques en barrido."},{"id":14,"nombre":"Hoz","categoria":"Arma contundente, Ligera","critico":"x2","rango_critico":null,"distancia_min":null,"distancia_max":null,"penetrante":2,"lacerante":6,"contundente":2,"descripcion":"Herramienta agrícola adaptada como arma ligera de corte curvo."},{"id":15,"nombre":"Jabalina","categoria":"Arma enastada, Arrojadiza","critico":"x2","rango_critico":null,"distancia_min":null,"distancia_max":null,"penetrante":8,"lacerante":2,"contundente":2,"descripcion":"Lanza ligera diseñada específicamente para ser arrojada."},{"id":16,"nombre":"Alabarda","categoria":"A dos manos, Arma enastada, Hacha, Pesada","critico":"x2","rango_critico":"23-24","distancia_min":null,"distancia_max":null,"penetrante":6,"lacerante":7,"contundente":5,"descripcion":"Arma enastada versátil con hacha, punta y gancho para múltiples tipos de ataque."},{"id":17,"nombre":"Lanza-espada","categoria":"A dos manos, Arma enastada, Glande, Pesada","critico":"x2","rango_critico":"23-24","distancia_min":null,"distancia_max":null,"penetrante":7,"lacerante":6,"contundente":3,"descripcion":"Arma enastada con hoja de espada larga, combina estocada y corte."},{"id":18,"nombre":"Mangual","categoria":"Arma contundente, Cadena, Pesada","critico":"x2","rango_critico":null,"distancia_min":null,"distancia_max":null,"penetrante":1,"lacerante":2,"contundente":8,"descripcion":"Cadena con peso en el extremo, difícil de bloquear y devastador al impactar."},{"id":19,"nombre":"Mangual doble","categoria":"A dos manos, Arma contundente, Cadena, Pesada","critico":"x2","rango_critico":"23-24","distancia_min":null,"distancia_max":null,"penetrante":1,"lacerante":2,"contundente":9,"descripcion":"Mangual con dos cabezas de cadena, ataque imparable y demoledor."},{"id":20,"nombre":"Daga","categoria":"Arrojadiza, Cuchillo, Ligera","critico":"x4","rango_critico":"23-24","distancia_min":null,"distancia_max":null,"penetrante":8,"lacerante":4,"contundente":1,"descripcion":"Cuchillo pequeño y letal, perfecto para ataques furtivos y críticos devastadores."},{"id":21,"nombre":"Estilete","categoria":"Espada corta, Ligera","critico":"x3","rango_critico":"23-24","distancia_min":null,"distancia_max":null,"penetrante":10,"lacerante":1,"contundente":0,"descripcion":"Hoja fina y puntiaguda, diseñada exclusivamente para perforar con precisión mortal."},{"id":22,"nombre":"Falcata","categoria":"Arma contundente, Espada corta, Pesada","critico":"x2","rango_critico":null,"distancia_min":null,"distancia_max":null,"penetrante":3,"lacerante":9,"contundente":3,"descripcion":"Espada ibérica de hoja curva, cortes devastadores con el peso concentrado en la punta."},{"id":23,"nombre":"Escudo/Rodela","categoria":"Arma contundente, Escudo","critico":"x2","rango_critico":null,"distancia_min":null,"distancia_max":null,"penetrante":1,"lacerante":2,"contundente":5,"descripcion":"Escudo redondo que puede ser usado para golpear además de defender."},{"id":24,"nombre":"Escudo de torre","categoria":"Arma contundente, Escudo, Pesada","critico":"x2","rango_critico":null,"distancia_min":null,"distancia_max":null,"penetrante":0,"lacerante":1,"contundente":6,"descripcion":"Escudo grande y pesado que ofrece máxima protección y puede usarse para embestir."},{"id":25,"nombre":"Cestus/arma de puño","categoria":"Ligera","critico":"x2","rango_critico":null,"distancia_min":null,"distancia_max":null,"penetrante":1,"lacerante":1,"contundente":4,"descripcion":"Guante reforzado con metal para potenciar golpes de puño."},{"id":26,"nombre":"Escudo afilado","categoria":"Cuchillo, Escudo","critico":"x2","rango_critico":null,"distancia_min":null,"distancia_max":null,"penetrante":2,"lacerante":6,"contundente":5,"descripcion":"Escudo con bordes afilados, combina defensa con capacidad de corte."},{"id":27,"nombre":"Champion's Grip","categoria":"Ligera","critico":"x2","rango_critico":null,"distancia_min":null,"distancia_max":null,"penetrante":2,"lacerante":2,"contundente":5,"descripcion":"Arma de puño especializada usada por luchadores de arena."},{"id":28,"nombre":"Honda","categoria":"A Distancia, Ligera","critico":"x2","rango_critico":null,"distancia_min":null,"distancia_max":null,"penetrante":3,"lacerante":1,"contundente":6,"descripcion":"Arma a distancia simple pero efectiva que lanza proyectiles contundentes."},{"id":29,"nombre":"Arco","categoria":"A Distancia, A dos manos, Ligera","critico":"x2","rango_critico":null,"distancia_min":3,"distancia_max":12,"penetrante":7,"lacerante":1,"contundente":1,"descripcion":"Arco estándar, equilibrio perfecto entre alcance y precisión."},{"id":30,"nombre":"Arco largo","categoria":"A Distancia, A dos manos, Pesada","critico":"x2","rango_critico":null,"distancia_min":3,"distancia_max":24,"penetrante":8,"lacerante":1,"contundente":1,"descripcion":"Arco de guerra de gran tamaño, alcance y poder excepcionales."},{"id":31,"nombre":"Arco compuesto","categoria":"A Distancia, A dos manos, Ligera","critico":"x2","rango_critico":null,"distancia_min":null,"distancia_max":null,"penetrante":9,"lacerante":1,"contundente":1,"descripcion":"Arco reforzado con múltiples materiales, máxima potencia de penetración."},{"id":32,"nombre":"Arco Escorpión","categoria":"A Distancia, A dos manos, Arma contundente, Pesada","critico":"x2","rango_critico":"23-24","distancia_min":2,"distancia_max":10,"penetrante":10,"lacerante":0,"contundente":1,"descripcion":"Balista portátil de enorme poder, dispara proyectiles devastadores."},{"id":33,"nombre":"Ballesta","categoria":"A Distancia, A dos manos, Recarga","critico":"x3","rango_critico":null,"distancia_min":null,"distancia_max":null,"penetrante":9,"lacerante":0,"contundente":1,"descripcion":"Arma mecánica de gran precisión, requiere recarga pero es muy letal."},{"id":34,"nombre":"Ballesta de repetición","categoria":"A Distancia, Ligera, Recarga, Versátil","critico":"x1.5","rango_critico":null,"distancia_min":null,"distancia_max":null,"penetrante":7,"lacerante":0,"contundente":1,"descripcion":"Ballesta con mecanismo de disparo múltiple, sacrifica potencia por velocidad de ataque."},{"id":35,"nombre":"Ballesta de mano","categoria":"A Distancia, Ligera, Recarga","critico":"x2","rango_critico":null,"distancia_min":null,"distancia_max":null,"penetrante":6,"lacerante":0,"contundente":1,"descripcion":"Ballesta compacta de una mano, fácil de ocultar y usar."},{"id":36,"nombre":"Ballesta pesada","categoria":"A Distancia, A dos manos, Pesada, Recarga","critico":"x3","rango_critico":null,"distancia_min":null,"distancia_max":null,"penetrante":10,"lacerante":0,"contundente":2,"descripcion":"Ballesta de máxima potencia, capaz de atravesar las armaduras más gruesas."},{"id":37,"nombre":"Bastón","categoria":"Arma contundente, Versátil","critico":"x2","rango_critico":null,"distancia_min":null,"distancia_max":null,"penetrante":0,"lacerante":1,"contundente":5,"descripcion":"Vara de madera simple pero efectiva, útil para defensa y ataques contundentes."}]`),nh={armas:NE},FE=[{id:1,nombre:"Armadura de pieles",penetrante:0,lacerante:0,contundente:1,categoria:"Ligera",ventajas:[],desventajas:[],descripcion:"Armadura básica hecha de pieles animales, ligera y flexible."},{id:2,nombre:"Armadura de cuero",penetrante:0,lacerante:1,contundente:1,categoria:"Ligera",ventajas:[],desventajas:[],descripcion:"Armadura de cuero curtido, ofrece protección básica sin limitar movimiento."},{id:3,nombre:"Armadura de cuero tachonado",penetrante:1,lacerante:1,contundente:1,categoria:"Ligera",ventajas:[],desventajas:[],descripcion:"Cuero reforzado con tachuelas metálicas para mayor resistencia."},{id:4,nombre:"Armadura de anillas",penetrante:2,lacerante:2,contundente:1,categoria:"Media",ventajas:[],desventajas:[{habilidad_id:16,nivel:1}],descripcion:"Armadura de anillas metálicas entrelazadas sobre cuero."},{id:5,nombre:"Cota brigantina",penetrante:2,lacerante:2,contundente:2,categoria:"Media",ventajas:[],desventajas:[{habilidad_id:16,nivel:1}],descripcion:"Armadura con placas de metal remachadas entre capas de tela o cuero."},{id:6,nombre:"Lorica musculata",penetrante:2,lacerante:2,contundente:2,categoria:"Media",ventajas:[],desventajas:[{habilidad_id:16,nivel:1}],descripcion:"Coraza moldeada que imita la musculatura del torso humano."},{id:7,nombre:"Lorica segmentata",penetrante:2,lacerante:3,contundente:4,categoria:"Pesada",ventajas:[],desventajas:[{habilidad_id:16,nivel:2}],descripcion:"Armadura romana de placas segmentadas articuladas, protección superior."},{id:8,nombre:"Armadura laminar",penetrante:2,lacerante:3,contundente:4,categoria:"Pesada",ventajas:[],desventajas:[{habilidad_id:16,nivel:2}],descripcion:"Armadura de placas metálicas horizontales superpuestas."},{id:9,nombre:"Cota de malla",penetrante:2,lacerante:4,contundente:3,categoria:"Media",ventajas:[],desventajas:[{habilidad_id:16,nivel:1}],descripcion:"Armadura de anillos metálicos entrelazados, excelente contra cortes."},{id:10,nombre:"Cota de escamas",penetrante:2,lacerante:4,contundente:3,categoria:"Media",ventajas:[],desventajas:[{habilidad_id:16,nivel:1}],descripcion:"Armadura de pequeñas placas metálicas superpuestas como escamas."},{id:11,nombre:"Baluarte del silencio",penetrante:5,lacerante:5,contundente:6,categoria:"Pesada",ventajas:[],desventajas:[{habilidad_id:16,nivel:3}],descripcion:"Armadura pesada mágica que protege excepcionalmente pero dificulta el sigilo."},{id:12,nombre:"Custodio del silencio",penetrante:5,lacerante:6,contundente:5,categoria:"Pesada",ventajas:[],desventajas:[{habilidad_id:16,nivel:3}],descripcion:"Armadura pesada mágica con protección sobresaliente contra cortes."},{id:13,nombre:"Túnica del tejesombras",penetrante:2,lacerante:2,contundente:2,categoria:"Ligera",ventajas:[{habilidad_id:16,nivel:1}],desventajas:[],descripcion:"Túnica encantada que facilita el movimiento sigiloso y la evasión."},{id:14,nombre:"Armadura de espinas de ébano",penetrante:3,lacerante:4,contundente:5,categoria:"Media",ventajas:[],desventajas:[{habilidad_id:16,nivel:1}],descripcion:"Armadura oscura con púas de ébano, intimida y protege efectivamente."},{id:15,nombre:"Armadura espinal",penetrante:5,lacerante:7,contundente:6,categoria:"Pesada",ventajas:[{habilidad_id:16,nivel:1}],desventajas:[],descripcion:"Armadura pesada con diseño espinal que sorprendentemente facilita el sigilo."},{id:16,nombre:"Escudo/Rodela",penetrante:2,lacerante:2,contundente:2,categoria:"Escudo",ventajas:[],desventajas:[],descripcion:"Escudo redondo y ligero, ideal para defensa activa."},{id:17,nombre:"Escudo de torre",penetrante:4,lacerante:4,contundente:4,categoria:"Escudo",ventajas:[],desventajas:[],descripcion:"Escudo grande y pesado que proporciona cobertura corporal completa."},{id:18,nombre:"Escudo Afilado",penetrante:2,lacerante:2,contundente:2,categoria:"Escudo",ventajas:[],desventajas:[],descripcion:"Escudo con bordes cortantes que puede usarse ofensivamente."},{id:19,nombre:"Cestus",penetrante:1,lacerante:1,contundente:2,categoria:"Guante",ventajas:[],desventajas:[],descripcion:"Guantelete reforzado para combate cuerpo a cuerpo desarmado."},{id:20,nombre:"Baluarte",penetrante:5,lacerante:5,contundente:5,categoria:"Escudo",ventajas:[],desventajas:[],descripcion:"Escudo legendario de protección suprema contra todo tipo de daño."}],ih={armaduras:FE},OE={class:"space-y-8"},BE={class:"flex items-center justify-between mb-4"},zE={class:"text-sm text-blue-600"},HE={class:"font-bold"},VE={class:"bg-blue-50 border-2 border-blue-200 rounded-lg overflow-hidden"},kE={class:"divide-y divide-blue-200 max-h-96 overflow-y-auto"},GE=["onClick"],qE={class:"col-span-1 flex justify-center"},WE={key:0,class:"text-white text-sm font-bold"},jE={class:"col-span-2"},$E={class:"font-semibold text-blue-700"},XE={class:"col-span-1 text-center"},YE={class:"inline-flex items-center justify-center bg-white border border-blue-300 rounded px-2 py-1 text-blue-700 font-medium text-sm min-w-[40px]"},KE={class:"col-span-1 text-center"},ZE={class:"inline-flex items-center justify-center bg-white border border-blue-300 rounded px-2 py-1 text-blue-700 font-medium text-sm min-w-[40px]"},JE={class:"col-span-1 text-center"},QE={class:"inline-flex items-center justify-center bg-white border border-blue-300 rounded px-2 py-1 text-blue-700 font-medium text-sm min-w-[40px]"},e1={class:"col-span-3"},t1={class:"text-sm text-blue-700"},n1={class:"col-span-1 text-center"},i1={class:"inline-flex items-center justify-center bg-white border border-blue-300 rounded px-2 py-1 text-blue-700 font-bold text-sm"},s1={class:"col-span-1 text-center"},a1={class:"inline-flex items-center justify-center bg-white border border-blue-300 rounded px-2 py-1 text-blue-700 font-medium text-sm"},r1={class:"col-span-1 text-center"},o1={class:"inline-flex items-center justify-center bg-white border border-blue-300 rounded px-2 py-1 text-blue-700 font-medium text-sm"},l1={class:"flex items-center justify-between mb-4"},c1={class:"text-sm text-blue-600"},d1={class:"font-bold"},u1={class:"bg-blue-50 border-2 border-blue-200 rounded-lg overflow-hidden"},f1={class:"divide-y divide-blue-200 max-h-96 overflow-y-auto"},h1=["onClick"],p1={class:"col-span-1 flex justify-center"},m1={key:0,class:"text-white text-sm font-bold"},g1={class:"col-span-3"},_1={class:"font-semibold text-blue-700"},v1={class:"col-span-2 text-center"},b1={class:"inline-flex items-center justify-center bg-white border border-blue-300 rounded px-3 py-1 text-blue-700 font-medium text-sm min-w-[50px]"},x1={class:"col-span-2 text-center"},y1={class:"inline-flex items-center justify-center bg-white border border-blue-300 rounded px-3 py-1 text-blue-700 font-medium text-sm min-w-[50px]"},S1={class:"col-span-2 text-center"},M1={class:"inline-flex items-center justify-center bg-white border border-blue-300 rounded px-3 py-1 text-blue-700 font-medium text-sm min-w-[50px]"},E1={class:"col-span-2"},T1={class:"text-sm text-blue-700"},A1=Ji({__name:"equipo",setup(n){const e=Tt(nh.armas),t=Tt(ih.armaduras),{characterData:i,loadCharacterData:s}=Pi(),a=Tt([]),o=Tt([]);Wn(()=>{s(),a.value=[...i.value.armas],o.value=[...i.value.armaduras]}),at(a,d=>{i.value.armas=[...d]},{deep:!0}),at(o,d=>{i.value.armaduras=[...d]},{deep:!0});function r(d){return d===null?"24":d}function l(d,f){return d===null&&f===null?"-":d!==null&&f!==null?`${d} | ${f}`:d!==null?`${d}`:f!==null?`${f}`:"-"}function c(d){const f=a.value.indexOf(d);f===-1?a.value.push(d):a.value.splice(f,1)}function u(d){const f=o.value.indexOf(d);f===-1?o.value.push(d):o.value.splice(f,1)}return(d,f)=>(ge(),_e("div",OE,[_("div",null,[_("div",BE,[f[1]||(f[1]=_("h3",{class:"text-2xl font-bold text-blue-700"},"Armas",-1)),_("div",zE,[f[0]||(f[0]=Gt(" Seleccionadas: ",-1)),_("span",HE,$(a.value.length),1)])]),_("div",VE,[f[2]||(f[2]=Es('<div class="bg-blue-600 text-white grid grid-cols-12 gap-3 px-4 py-3 font-semibold text-sm"><div class="col-span-1 text-center">Sel.</div><div class="col-span-2">Arma</div><div class="col-span-1 text-center">Pen.</div><div class="col-span-1 text-center">Lac.</div><div class="col-span-1 text-center">Con.</div><div class="col-span-3">Categoría</div><div class="col-span-1 text-center">Crítico</div><div class="col-span-1 text-center">Rango Crít.</div><div class="col-span-1 text-center">Distancia</div></div>',1)),_("div",kE,[(ge(!0),_e(Qe,null,Mt(e.value,p=>(ge(),_e("div",{key:p.id,onClick:x=>c(p.id),class:Et(["grid grid-cols-12 gap-3 px-4 py-3 items-center cursor-pointer transition-colors",a.value.includes(p.id)?"bg-blue-200 hover:bg-blue-250":"bg-white hover:bg-blue-100"])},[_("div",qE,[_("div",{class:Et(["w-6 h-6 rounded border-2 flex items-center justify-center transition-colors",a.value.includes(p.id)?"bg-blue-500 border-blue-500":"bg-white border-blue-300"])},[a.value.includes(p.id)?(ge(),_e("span",WE,"✓")):gt("",!0)],2)]),_("div",jE,[_("div",$E,$(p.nombre),1)]),_("div",XE,[_("div",YE,$(p.penetrante),1)]),_("div",KE,[_("div",ZE,$(p.lacerante),1)]),_("div",JE,[_("div",QE,$(p.contundente),1)]),_("div",e1,[_("div",t1,$(p.categoria),1)]),_("div",n1,[_("div",i1,$(p.critico),1)]),_("div",s1,[_("div",a1,$(r(p.rango_critico)),1)]),_("div",r1,[_("div",o1,$(l(p.distancia_min,p.distancia_max)),1)])],10,GE))),128))])])]),_("div",null,[_("div",l1,[f[4]||(f[4]=_("h3",{class:"text-2xl font-bold text-blue-700"},"Armaduras",-1)),_("div",c1,[f[3]||(f[3]=Gt(" Seleccionadas: ",-1)),_("span",d1,$(o.value.length),1)])]),_("div",u1,[f[5]||(f[5]=Es('<div class="bg-blue-600 text-white grid grid-cols-12 gap-3 px-4 py-3 font-semibold text-sm"><div class="col-span-1 text-center">Sel.</div><div class="col-span-3">Armadura</div><div class="col-span-2 text-center">Pen.</div><div class="col-span-2 text-center">Lac.</div><div class="col-span-2 text-center">Con.</div><div class="col-span-2">Categoría</div></div>',1)),_("div",f1,[(ge(!0),_e(Qe,null,Mt(t.value,p=>(ge(),_e("div",{key:p.id,onClick:x=>u(p.id),class:Et(["grid grid-cols-12 gap-3 px-4 py-3 items-center cursor-pointer transition-colors",o.value.includes(p.id)?"bg-blue-200 hover:bg-blue-250":"bg-white hover:bg-blue-100"])},[_("div",p1,[_("div",{class:Et(["w-6 h-6 rounded border-2 flex items-center justify-center transition-colors",o.value.includes(p.id)?"bg-blue-500 border-blue-500":"bg-white border-blue-300"])},[o.value.includes(p.id)?(ge(),_e("span",m1,"✓")):gt("",!0)],2)]),_("div",g1,[_("div",_1,$(p.nombre),1)]),_("div",v1,[_("div",b1,$(p.penetrante),1)]),_("div",x1,[_("div",y1,$(p.lacerante),1)]),_("div",S1,[_("div",M1,$(p.contundente),1)]),_("div",E1,[_("div",T1,$(p.categoria),1)])],10,h1))),128))])])])]))}}),w1={class:"bg-gradient-to-br from-gray-50 via-white to-gray-50 min-h-screen p-6"},C1={class:"max-w-350 mx-auto"},R1={class:"flex flex-col lg:flex-row gap-6"},P1={class:"lg:w-64 flex-shrink-0"},D1={class:"bg-white backdrop-blur-sm border-2 border-gray-200 rounded-xl p-4 shadow-xl"},I1={class:"space-y-2"},L1=["onClick"],U1={class:"flex items-center gap-3"},N1={class:"flex-1"},F1={class:"bg-white backdrop-blur-sm border-2 border-gray-200 rounded-xl p-8 shadow-xl min-h-[500px]"},O1={class:"text-3xl font-bold text-gray-600 mb-6 pb-4 border-b border-gray-200"},B1={key:0,class:"space-y-6"},z1={key:1,class:"space-y-6"},H1={key:2,class:"space-y-6"},V1={key:3,class:"space-y-6"},k1={key:4,class:"space-y-6"},G1={key:5,class:"space-y-6"},q1={key:6,class:"space-y-6"},W1={class:"flex justify-center items-center gap-4 mt-8 pt-6 border-t border-gray-200"},j1=["disabled"],$1=["disabled"],X1=Ji({__name:"crear_personaje",setup(n){const e=Tt(0),t=["Información General","Trasfondo","Oficio","Estilo Marcial","Arbol","Habilidades","Equipo"],{characterData:i,loadCharacterData:s,getCurrentCharacter:a}=Pi(),o=Ls("navigateToFicha");function r(){const f=a();if(!f||!f.name){alert("⚠️ Por favor, guarda el personaje primero antes de ver la ficha");return}if(!localStorage.getItem("personaje_guardado")){alert("⚠️ No hay personaje guardado. Por favor, guarda el personaje primero.");return}o&&o(f.name)}function l(){console.log("=== DEBUG DATOS ==="),console.log("characterData.value:",i.value);const f=a();console.log("character from partida:",f),console.log("character keys:",f?Object.keys(f):"no character"),console.log("character.name:",f?.name),console.log("character.nivel:",f?.nivel),console.log("character.oficio:",f?.oficio),console.log("character.trasfondo:",f?.trasfondo),console.log("character.estilo_marcial:",f?.estilo_marcial),console.log("character.arbol:",f?.arbol),console.log("character.atributos:",f?.atributos),console.log("==================")}function c(){try{if(console.log("💾 Guardando personaje con characterData:",i.value),!i.value.nombre){console.log("⚠️ No hay nombre de personaje, no se guarda");return}const f={nombre:i.value.nombre,nivel:i.value.nivel,oficio:i.value.oficio,oficio_habilidades:i.value.oficio_habilidades,oficio_dotes:i.value.oficio_dotes,estilo_marcial:i.value.estilo_marcial,estilo_marcial_dotes:i.value.estilo_marcial_dotes,trasfondo:i.value.trasfondo,trasfondo_habilidades:i.value.trasfondo_habilidades,raza:i.value.raza,arbol:i.value.arbol,habilidades:i.value.habilidades,armas:i.value.armas,armaduras:i.value.armaduras,atributos:i.value.atributos,fechaGuardado:new Date().toISOString()};console.log("✅ Datos preparados para guardar:",f),localStorage.setItem("personaje_guardado",JSON.stringify(f,null,2)),console.log("✅ Guardado en localStorage completado")}catch(f){console.error("❌ Error al guardar personaje:",f)}}Wn(()=>{s();const f=localStorage.getItem("personaje_guardado");if(f)try{const p=JSON.parse(f);console.log("Personaje guardado encontrado:",p),console.log("Fecha de guardado:",p.fechaGuardado)}catch(p){console.error("Error al cargar personaje guardado:",p)}else console.log("No hay personaje guardado en localStorage");setTimeout(()=>{u=!1},1e3)});let u=!0,d=null;return at(()=>{const f=a();return JSON.stringify(f?{nombre:f.name,nivel:f.nivel,oficio:f.oficio,oficio_habilidades:f.oficio_habilidades,oficio_dotes:f.oficio_dotes,estilo_marcial:f.estilo_marcial,estilo_marcial_dotes:f.estilo_marcial_dotes,trasfondo:f.trasfondo,trasfondo_habilidades:f.trasfondo_habilidades,raza:f.raza,arbol:f.arbol,habilidades:f.habilidades,armas:f.armas,armaduras:f.armaduras,atributos:f.atributos}:i.value)},()=>{u||(console.log("💾 Detectado cambio, guardando en localStorage..."),d&&clearTimeout(d),d=setTimeout(()=>{const f=a();f&&f.name?(i.value.nombre=f.name,i.value.nivel=f.nivel,i.value.oficio=f.oficio,i.value.oficio_habilidades=f.oficio_habilidades||[],i.value.oficio_dotes=f.oficio_dotes||[],i.value.estilo_marcial=f.estilo_marcial,i.value.estilo_marcial_dotes=f.estilo_marcial_dotes||[],i.value.trasfondo=f.trasfondo,i.value.trasfondo_habilidades=f.trasfondo_habilidades||[],i.value.raza=f.raza,i.value.arbol=f.arbol,i.value.habilidades=f.habilidades,i.value.armas=f.armas||[],i.value.armaduras=f.armaduras||[],i.value.atributos=f.atributos,c()):console.log("⚠️ No se guarda porque no hay nombre todavía")},500))}),(f,p)=>(ge(),_e("div",w1,[_("div",C1,[p[6]||(p[6]=_("div",{class:"text-center mb-8"},[_("h1",{class:"text-4xl md:text-5xl font-bold text-gray-600 mb-2 drop-shadow-lg"}," Creación de Personaje ")],-1)),_("div",R1,[_("div",P1,[_("div",D1,[p[2]||(p[2]=_("h2",{class:"text-lg font-bold text-gray-700 mb-4 pb-3 border-b border-gray-200"}," Índice ",-1)),_("nav",I1,[(ge(),_e(Qe,null,Mt(t,(x,y)=>_("button",{key:y,onClick:m=>e.value=y,class:Et(["w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-200",e.value===y?"bg-blue-500 text-white shadow-lg shadow-blue-500/30":"bg-blue-50 text-gray-700 hover:bg-gray-100 hover:text-gray-800"])},[_("span",U1,[_("span",{class:Et(["flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold",e.value===y?"bg-white text-blue-500":"bg-gray-200 text-blue-700"])},$(y+1),3),Gt(" "+$(x),1)])],10,L1)),64))])])]),_("div",N1,[_("div",F1,[_("h2",O1,$(t[e.value]),1),e.value===0?(ge(),_e("div",B1,[zt(Nm)])):gt("",!0),e.value===1?(ge(),_e("div",z1,[zt(ag)])):gt("",!0),e.value===2?(ge(),_e("div",H1,[zt(Lg)])):gt("",!0),e.value===3?(ge(),_e("div",V1,[zt(t_)])):gt("",!0),e.value===4?(ge(),_e("div",k1,[zt(wM)])):gt("",!0),e.value===5?(ge(),_e("div",G1,[zt(UE)])):gt("",!0),e.value===6?(ge(),_e("div",q1,[zt(A1)])):gt("",!0),_("div",W1,[_("button",{onClick:p[0]||(p[0]=x=>e.value=Math.max(0,e.value-1)),disabled:e.value===0,class:Et(["px-6 py-3 rounded-lg font-semibold transition-all duration-200",e.value===0?"bg-gray-100 text-gray-300 cursor-not-allowed":"bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-lg"])}," ← Anterior ",10,j1),_("button",{onClick:p[1]||(p[1]=x=>e.value=Math.min(t.length-1,e.value+1)),disabled:e.value===t.length-1,class:Et(["px-6 py-3 rounded-lg font-semibold transition-all duration-200",e.value===t.length-1?"bg-blue-100 text-gray-300 cursor-not-allowed":"bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/30"])}," Siguiente → ",10,$1),p[4]||(p[4]=_("div",{class:"border-l-2 border-gray-300 h-10 mx-2"},null,-1)),_("button",{onClick:l,class:"px-4 py-2 rounded-lg font-semibold transition-all duration-200 bg-yellow-500 text-white hover:bg-yellow-600 text-sm"}," � Debug "),p[5]||(p[5]=_("div",{class:"px-6 py-3 text-green-500 font-semibold flex items-center gap-2"},[_("span",null,"✓"),_("span",null,"Guardado automático")],-1)),_("button",{onClick:r,class:"px-6 py-3 rounded-lg font-semibold transition-all duration-200 bg-purple-500 text-white hover:bg-purple-600 hover:shadow-lg hover:shadow-purple-500/30 flex items-center gap-2"},[...p[3]||(p[3]=[_("span",null,"📋",-1),_("span",null,"Ver Ficha",-1)])])])])])])])]))}}),Y1={class:"bg-gradient-to-br from-gray-50 via-white to-gray-50 p-6"},K1={id:"app",class:"max-w-7xl mx-auto"},Z1={class:"bg-white backdrop-blur-sm border-2 border-gray-200 rounded-xl p-8 shadow-xl"},J1={class:"text-4xl font-bold text-gray-600 mb-6 pb-4 border-b border-gray-200 text-center"},Q1={class:"grid grid-cols-12 gap-6"},eT={class:"col-span-4 space-y-6"},tT={class:"bg-blue-50 border-2 border-blue-200 rounded-lg p-3"},nT={class:"space-y-2"},iT={class:"grid grid-cols-2 gap-2"},sT={class:"text-base font-bold text-gray-800"},aT={class:"text-lg font-bold text-gray-800"},rT={class:"grid grid-cols-2 gap-2"},oT={class:"text-sm font-bold text-gray-800"},lT={class:"text-sm font-bold text-gray-800"},cT={class:"text-sm font-bold text-gray-800"},dT={class:"bg-blue-50 border-2 border-blue-200 rounded-lg p-5"},uT={class:"max-h-64 overflow-y-auto pr-2 space-y-2"},fT={class:"font-semibold text-gray-600 text-sm"},hT={class:"text-xs text-blue-600 mt-1"},pT={class:"bg-blue-50 border-2 border-blue-200 rounded-lg p-5"},mT={class:"max-h-64 overflow-y-auto pr-2 space-y-2"},gT={class:"font-semibold text-gray-600 text-sm"},_T={class:"text-xs text-blue-600 mt-1"},vT={class:"bg-blue-50 border-2 border-blue-200 rounded-lg p-5"},bT={class:"space-y-2"},xT={class:"font-semibold text-gray-600 text-sm"},yT={class:"text-xs text-blue-600 mt-1"},ST={class:"col-span-4 space-y-4"},MT={class:"grid grid-cols-2 gap-3"},ET={class:"bg-gradient-to-r from-blue-100 to-blue-200 border-2 border-blue-400 text-gray-700 rounded-lg p-3 shadow-lg"},TT={class:"text-white text-center"},AT={class:"text-3xl font-bold text-blue-600"},wT={class:"bg-gradient-to-r from-blue-100 to-blue-200 border-2 border-blue-400 rounded-lg p-3 shadow-lg"},CT={class:"text-white"},RT={class:"grid grid-cols-3 gap-1"},PT={class:"text-center"},DT={class:"text-2xl font-bold text-blue-600"},IT={class:"text-center"},LT={class:"text-2xl font-bold text-blue-600"},UT={class:"text-center"},NT={class:"text-2xl font-bold text-blue-600"},FT={class:"grid grid-cols-3 gap-2"},OT={class:"bg-blue-50 border-2 border-blue-200 rounded-lg p-2"},BT={class:"text-center mb-2 pb-1 border-b border-blue-300"},zT={class:"text-xl font-bold text-blue-600"},HT={class:"space-y-1"},VT={class:"flex justify-between items-center text-xs px-1"},kT={class:"font-bold text-blue-600"},GT={class:"flex justify-between items-center text-xs px-1"},qT={class:"font-bold text-blue-600"},WT={class:"flex justify-between items-center text-xs px-1"},jT={class:"font-bold text-blue-600"},$T={class:"bg-blue-50 border-2 border-blue-200 rounded-lg p-2"},XT={class:"text-center mb-2 pb-1 border-b border-blue-300"},YT={class:"text-xl font-bold text-blue-600"},KT={class:"space-y-1"},ZT={class:"flex justify-between items-center text-xs px-1"},JT={class:"font-bold text-blue-600"},QT={class:"flex justify-between items-center text-xs px-1"},eA={class:"font-bold text-blue-600"},tA={class:"flex justify-between items-center text-xs px-1"},nA={class:"font-bold text-blue-600"},iA={class:"bg-blue-50 border-2 border-blue-200 rounded-lg p-2"},sA={class:"text-center mb-2 pb-1 border-b border-blue-300"},aA={class:"text-xl font-bold text-blue-600"},rA={class:"space-y-1"},oA={class:"flex justify-between items-center text-xs px-1"},lA={class:"font-bold text-blue-600"},cA={class:"flex justify-between items-center text-xs px-1"},dA={class:"font-bold text-blue-600"},uA={class:"grid grid-cols-2 gap-2"},fA={class:"bg-purple-50 border-2 border-purple-300 rounded-lg p-2 text-center"},hA={class:"text-2xl font-bold text-purple-600"},pA={class:"bg-purple-50 border-2 border-purple-300 rounded-lg p-2 text-center"},mA={class:"text-2xl font-bold text-purple-600"},gA={class:"bg-blue-50 border-2 border-blue-200 rounded-lg p-4"},_A={class:"gap-2 mb-4"},vA={class:"flex justify-between items-start mb-1"},bA={class:"font-semibold text-gray-600 text-sm"},xA={class:"flex gap-1 flex-wrap"},yA={class:"grid grid-cols-3 gap-1 text-xs mb-1"},SA={class:"bg-blue-50 rounded p-1 text-center"},MA={class:"text-blue-600 font-semibold"},EA={class:"bg-blue-50 rounded p-1 text-center"},TA={class:"text-blue-600 font-semibold"},AA={class:"bg-blue-50 rounded p-1 text-center"},wA={class:"text-blue-600 font-semibold"},CA={class:"flex justify-between text-xs text-blue-600"},RA={key:0},PA={class:"border-t-2 border-blue-300 pt-3 mt-3"},DA={class:"gap-2"},IA={class:"flex justify-between items-start mb-1"},LA={class:"font-semibold text-gray-600 text-sm"},UA={class:"flex gap-1 flex-wrap"},NA={class:"grid grid-cols-3 gap-1 text-xs"},FA={class:"bg-gray-50 rounded p-1 text-center"},OA={class:"text-gray-600 font-semibold"},BA={class:"bg-gray-50 rounded p-1 text-center"},zA={class:"text-gray-600 font-semibold"},HA={class:"bg-gray-50 rounded p-1 text-center"},VA={class:"text-gray-600 font-semibold"},kA={class:"col-span-4 space-y-6"},GA={class:"bg-blue-50 border-2 border-blue-200 rounded-lg p-5"},qA={class:"max-h-[900px] overflow-y-auto pr-2 space-y-1"},WA={class:"flex items-center gap-2"},jA={key:0,class:"w-4 h-4 bg-blue-500 rounded flex items-center justify-center flex-shrink-0"},$A={key:1,class:"w-4 h-4 border-2 border-blue-300 rounded flex-shrink-0"},XA={class:"font-semibold text-gray-600 text-sm"},YA={class:"text-lg font-bold text-blue-800"},KA=Ji({__name:"ficha",props:{characterName:{}},setup(n){const e=Ls("navigateToCrear");function t(){e&&e()}const i=Tt(null),s=Tt({nombre:"",nivel:1,trasfondo:"",oficio:"",estiloMarcial:"",hp:{actual:0,maximo:0},armadura:{lacerante:0,penetrante:0,contundente:0},cuerpo:{total:0,poderio:0,movimiento:0,resistencia:0},agilidad:{total:0,esquiva:0,iniciativa:0,deadeye:0},mente:{total:0,voluntad:0,puntosHabilidadRestantes:0},acciones:0,reacciones:0,dotesOficio:[],dotesEstilo:[],activas:[],habilidades:[],armas:[],armaduras:[]});function a(){try{const o=localStorage.getItem("personaje_guardado");if(!o){console.warn("No se encontró personaje guardado en localStorage");return}i.value=JSON.parse(o);const r=i.value;if(s.value.nombre=r.nombre||"",s.value.nivel=r.nivel||1,s.value.trasfondo=r.trasfondo||"",s.value.oficio=r.oficio||"",s.value.estiloMarcial=r.estilo_marcial||"",s.value.hp.maximo=r.atributos?.hp||10,s.value.hp.actual=r.atributos?.hp||10,s.value.cuerpo.total=r.atributos?.cuerpo||0,s.value.cuerpo.poderio=r.atributos?.poderio||0,s.value.cuerpo.movimiento=r.atributos?.movimiento||3,s.value.cuerpo.resistencia=r.atributos?.resistencia||0,s.value.agilidad.total=r.atributos?.agilidad||0,s.value.agilidad.esquiva=r.atributos?.evasion||12,s.value.agilidad.iniciativa=r.atributos?.iniciativa||0,s.value.agilidad.deadeye=r.atributos?.punteria||0,s.value.mente.total=r.atributos?.mente||0,s.value.mente.voluntad=r.atributos?.regeneracion||2,s.value.mente.puntosHabilidadRestantes=r.atributos?.puntosHabilidad||10,s.value.acciones=r.atributos?.acciones||0,s.value.reacciones=r.atributos?.reacciones||0,r.oficio){const u=xf.oficios.find(d=>d.nombre===r.oficio);u&&r.oficio_dotes?(console.log("Dotes de oficio guardadas:",r.oficio_dotes),s.value.dotesOficio=r.oficio_dotes.map(d=>{const f=u.dotes.find(p=>p.id===d);return f?{nombre:f.nombre,descripcion:f.descripcion}:{nombre:`Dote ID: ${d}`,descripcion:"Descripción no disponible"}}),console.log("Dotes de oficio cargadas:",s.value.dotesOficio)):u&&(s.value.dotesOficio=u.dotes.map(d=>({nombre:d.nombre,descripcion:d.descripcion})))}if(r.estilo_marcial){const u=yf.estiloMarcial.find(d=>d.nombre===r.estilo_marcial);u&&r.estilo_marcial_dotes&&(console.log("Dotes guardadas:",r.estilo_marcial_dotes),console.log("Estilo encontrado:",u.nombre),s.value.dotesEstilo=r.estilo_marcial_dotes.map(d=>{const f=d.split("_"),p=f.length>1&&f[1]?parseInt(f[1]):parseInt(d),x=u.dotes.find(y=>y.id===p);return x?(console.log(`Dote encontrada: ${x.nombre} (ID: ${p})`),{nombre:x.nombre,descripcion:x.descripcion}):(console.warn(`Dote no encontrada para ID: ${d} (numérico: ${p})`),{nombre:`Dote ID: ${d}`,descripcion:"Descripción no disponible"})}),console.log("Dotes de estilo cargadas:",s.value.dotesEstilo))}if(r.arbol)try{const u=JSON.parse(r.arbol),d=[];u.forEach(f=>{if(f.type==="square"){const p=qi.activas.find(x=>x.id===parseInt(f.nodeId));p&&d.push({nombre:p.nombre,descripcion:p.descripcion})}}),s.value.activas=d}catch(u){console.error("Error parseando árbol:",u)}try{console.log("Construyendo habilidades desde JSON completo");let u=[];r.habilidades&&(typeof r.habilidades=="string"?u=JSON.parse(r.habilidades):u=r.habilidades,console.log("Habilidades guardadas encontradas:",u.length));const d=r.trasfondo_habilidades||[],f=r.oficio_habilidades||[];console.log("Habilidades de trasfondo:",d),console.log("Habilidades de oficio:",f),s.value.habilidades=Xr.habilidades.map(p=>{const x=u.find(S=>S.id===p.id||S.nombre===p.nombre),y=d.includes(p.nombre),m=f.includes(p.nombre),h=x?x.activa===!0:y||m;let P=0;p.atributo==="Cuerpo"?P=r.atributos?.cuerpo||0:p.atributo==="Agilidad"?P=r.atributos?.agilidad||0:(p.atributo==="Mente"||p.atributo==="Artesania"||p.atributo==="Recoleccion")&&(P=r.atributos?.mente||0);const w=x?.rangos||0,b=x?.bonifDiversos||0,C=P+w+b;return console.log(`${p.nombre}: activa=${h}, mod=${P}, rangos=${w}, bonif=${b}, total=${C}`),{nombre:p.nombre,competente:h,total:C}}),console.log("Total de habilidades mostradas:",s.value.habilidades.length)}catch(u){console.error("Error construyendo habilidades:",u),s.value.habilidades=[]}r.armas&&Array.isArray(r.armas)&&(console.log("Cargando armas:",r.armas),s.value.armas=r.armas.map(u=>{const d=nh.armas.find(f=>f.id===u);return d?{nombre:d.nombre,lac:d.lacerante,cor:d.penetrante,con:d.contundente,critico:d.critico,rangoCritico:d.rango_critico||"-",distancia:d.distancia_max||0,etiquetas:d.categoria?d.categoria.split(",").map(f=>f.trim()):[]}:null}).filter(u=>u!==null),console.log("Armas cargadas:",s.value.armas.length)),r.armaduras&&Array.isArray(r.armaduras)&&(console.log("Cargando armaduras:",r.armaduras),s.value.armaduras=r.armaduras.map(u=>{const d=ih.armaduras.find(f=>f.id===u);return d?{nombre:d.nombre,lac:d.lacerante,cor:d.penetrante,con:d.contundente,etiquetas:d.categoria?[d.categoria]:[]}:null}).filter(u=>u!==null),console.log("Armaduras cargadas:",s.value.armaduras.length));const l=s.value.cuerpo.resistencia;let c={lacerante:l,penetrante:l,contundente:l};s.value.armaduras.forEach(u=>{c.lacerante+=u.lac,c.penetrante+=u.cor,c.contundente+=u.con}),s.value.armadura=c,console.log("Armadura total calculada:",c),console.log("✅ Personaje cargado exitosamente:",s.value)}catch(o){console.error("❌ Error al cargar el personaje:",o)}}return Wn(()=>{a()}),(o,r)=>(ge(),_e("body",Y1,[_("div",K1,[_("div",Z1,[_("div",{class:"mb-4"},[_("button",{onClick:t,class:"px-4 py-2 rounded-lg font-semibold transition-all duration-200 bg-gray-500 text-white hover:bg-gray-600 hover:shadow-lg flex items-center gap-2"}," ← Volver a Edición ")]),_("h2",J1,$(s.value.nombre),1),_("div",Q1,[_("div",eT,[_("div",tT,[r[5]||(r[5]=_("h3",{class:"text-base font-bold text-gray-700 mb-2 pb-2 border-b border-blue-300"},"Información Básica",-1)),_("div",nT,[_("div",iT,[_("div",null,[r[0]||(r[0]=_("div",{class:"text-xs font-semibold text-blue-600 uppercase tracking-wide mb-0.5"},"Nombre",-1)),_("div",sT,$(s.value.nombre),1)]),_("div",null,[r[1]||(r[1]=_("div",{class:"text-xs font-semibold text-blue-600 uppercase tracking-wide mb-0.5"},"Nivel",-1)),_("div",aT,$(s.value.nivel),1)])]),_("div",rT,[_("div",null,[r[2]||(r[2]=_("div",{class:"text-xs font-semibold text-blue-600 uppercase tracking-wide mb-0.5"},"Oficio",-1)),_("div",oT,$(s.value.oficio),1)]),_("div",null,[r[3]||(r[3]=_("div",{class:"text-xs font-semibold text-blue-600 uppercase tracking-wide mb-0.5"},"Trasfondo",-1)),_("div",lT,$(s.value.trasfondo),1)])]),_("div",null,[r[4]||(r[4]=_("div",{class:"text-xs font-semibold text-blue-600 uppercase tracking-wide mb-0.5"},"Estilo Marcial",-1)),_("div",cT,$(s.value.estiloMarcial),1)])])]),_("div",dT,[r[6]||(r[6]=_("h3",{class:"text-lg font-bold text-gray-700 mb-3 pb-2 border-b border-blue-300"},"Dotes de Oficio",-1)),_("div",uT,[(ge(!0),_e(Qe,null,Mt(s.value.dotesOficio,l=>(ge(),_e("div",{key:l.nombre,class:"bg-white border border-blue-300 rounded-lg p-3"},[_("div",fT,$(l.nombre),1),_("div",hT,$(l.descripcion),1)]))),128))])]),_("div",pT,[r[7]||(r[7]=_("h3",{class:"text-lg font-bold text-gray-700 mb-3 pb-2 border-b border-blue-300"},"Dotes de Estilo Marcial",-1)),_("div",mT,[(ge(!0),_e(Qe,null,Mt(s.value.dotesEstilo,l=>(ge(),_e("div",{key:l.nombre,class:"bg-white border border-blue-300 rounded-lg p-3"},[_("div",gT,$(l.nombre),1),_("div",_T,$(l.descripcion),1)]))),128))])]),_("div",vT,[r[8]||(r[8]=_("h3",{class:"text-lg font-bold text-gray-700 mb-3 pb-2 border-b border-blue-300"},"Habilidades Activas",-1)),_("div",bT,[(ge(!0),_e(Qe,null,Mt(s.value.activas,l=>(ge(),_e("div",{key:l.nombre,class:"bg-white border border-blue-300 rounded-lg p-3"},[_("div",xT,$(l.nombre),1),_("div",yT,$(l.descripcion),1)]))),128))])])]),_("div",ST,[_("div",MT,[_("div",ET,[_("div",TT,[r[9]||(r[9]=_("div",{class:"text-xs font-bold uppercase tracking-wide text-gray-700 mb-1"},"HP",-1)),_("div",AT,$(s.value.hp.actual),1)])]),_("div",wT,[_("div",CT,[r[13]||(r[13]=_("div",{class:"text-xs font-bold uppercase tracking-wide text-gray-700 mb-2 text-center"},"Armadura",-1)),_("div",RT,[_("div",PT,[r[10]||(r[10]=_("div",{class:"text-lg font-bold text-gray-700"},"L",-1)),_("div",DT,$(s.value.armadura.lacerante),1)]),_("div",IT,[r[11]||(r[11]=_("div",{class:"text-lg font-bold text-gray-700"},"P",-1)),_("div",LT,$(s.value.armadura.penetrante),1)]),_("div",UT,[r[12]||(r[12]=_("div",{class:"text-lg font-bold text-gray-700"},"C",-1)),_("div",NT,$(s.value.armadura.contundente),1)])])])])]),_("div",FT,[_("div",OT,[_("div",BT,[r[14]||(r[14]=_("h3",{class:"text-sm font-bold text-gray-700"},"Cuerpo",-1)),_("div",zT,$(s.value.cuerpo.total),1)]),_("div",HT,[_("div",VT,[r[15]||(r[15]=_("span",{class:"text-gray-600"},"Poderío",-1)),_("span",kT,$(s.value.cuerpo.poderio),1)]),_("div",GT,[r[16]||(r[16]=_("span",{class:"text-gray-600"},"Movimiento",-1)),_("span",qT,$(s.value.cuerpo.movimiento),1)]),_("div",WT,[r[17]||(r[17]=_("span",{class:"text-gray-600"},"Resistencia",-1)),_("span",jT,$(s.value.cuerpo.resistencia),1)])])]),_("div",$T,[_("div",XT,[r[18]||(r[18]=_("h3",{class:"text-sm font-bold text-gray-700"},"Agilidad",-1)),_("div",YT,$(s.value.agilidad.total),1)]),_("div",KT,[_("div",ZT,[r[19]||(r[19]=_("span",{class:"text-gray-600"},"Esquiva",-1)),_("span",JT,$(s.value.agilidad.esquiva),1)]),_("div",QT,[r[20]||(r[20]=_("span",{class:"text-gray-600"},"Iniciativa",-1)),_("span",eA,$(s.value.agilidad.iniciativa),1)]),_("div",tA,[r[21]||(r[21]=_("span",{class:"text-gray-600"},"Deadeye",-1)),_("span",nA,$(s.value.agilidad.deadeye),1)])])]),_("div",iA,[_("div",sA,[r[22]||(r[22]=_("h3",{class:"text-sm font-bold text-gray-700"},"Mente",-1)),_("div",aA,$(s.value.mente.total),1)]),_("div",rA,[_("div",oA,[r[23]||(r[23]=_("span",{class:"text-gray-600"},"Voluntad",-1)),_("span",lA,$(s.value.mente.voluntad),1)]),_("div",cA,[r[24]||(r[24]=_("span",{class:"text-gray-600"},"Pts. Hab.",-1)),_("span",dA,$(s.value.mente.puntosHabilidadRestantes),1)])])])]),_("div",uA,[_("div",fA,[r[25]||(r[25]=_("div",{class:"text-xs font-bold text-purple-700 uppercase tracking-wide mb-1"},"Acciones",-1)),_("div",hA,$(s.value.acciones),1)]),_("div",pA,[r[26]||(r[26]=_("div",{class:"text-xs font-bold text-purple-700 uppercase tracking-wide mb-1"},"Reacciones",-1)),_("div",mA,$(s.value.reacciones),1)])]),_("div",gA,[r[28]||(r[28]=_("h3",{class:"text-base font-bold text-gray-700 mb-2 pb-2 border-b border-blue-300"},"Armas",-1)),_("div",_A,[(ge(!0),_e(Qe,null,Mt(s.value.armas,l=>(ge(),_e("div",{key:l.nombre,class:"bg-white border border-blue-300 rounded-lg p-2 mb-2"},[_("div",vA,[_("div",bA,$(l.nombre),1),_("div",xA,[(ge(!0),_e(Qe,null,Mt(l.etiquetas,c=>(ge(),_e("span",{key:c,class:"px-1 py-0.5 bg-blue-500 text-white text-xs rounded-full"},$(c),1))),128))])]),_("div",yA,[_("div",SA,[_("div",MA,"L: "+$(l.lac),1)]),_("div",EA,[_("div",TA,"P: "+$(l.cor),1)]),_("div",AA,[_("div",wA,"C: "+$(l.con),1)])]),_("div",CA,[_("span",null,"Crít: x"+$(l.critico)+" ("+$(l.rangoCritico)+")",1),l.distancia>0?(ge(),_e("span",RA,"Dist: "+$(l.distancia)+"m",1)):gt("",!0)])]))),128))]),_("div",PA,[r[27]||(r[27]=_("h3",{class:"text-base font-bold text-gray-700 mb-2"},"Armaduras Equipadas",-1)),_("div",DA,[(ge(!0),_e(Qe,null,Mt(s.value.armaduras,l=>(ge(),_e("div",{key:l.nombre,class:"bg-white border border-blue-300 rounded-lg p-2 mb-2"},[_("div",IA,[_("div",LA,$(l.nombre),1),_("div",UA,[(ge(!0),_e(Qe,null,Mt(l.etiquetas,c=>(ge(),_e("span",{key:c,class:"px-1 py-0.5 bg-gray-500 text-white text-xs rounded-full"},$(c),1))),128))])]),_("div",NA,[_("div",FA,[_("div",OA,"L: "+$(l.lac),1)]),_("div",BA,[_("div",zA,"P: "+$(l.cor),1)]),_("div",HA,[_("div",VA,"C: "+$(l.con),1)])])]))),128))])])])]),_("div",kA,[_("div",GA,[r[30]||(r[30]=_("h3",{class:"text-lg font-bold text-gray-700 mb-3 pb-2 border-b border-blue-300"},"Habilidades",-1)),_("div",qA,[(ge(!0),_e(Qe,null,Mt(s.value.habilidades,l=>(ge(),_e("div",{key:l.nombre,class:"flex justify-between items-center bg-white border border-blue-300 rounded-lg p-2 hover:bg-blue-100 transition-colors"},[_("div",WA,[l.competente?(ge(),_e("div",jA,[...r[29]||(r[29]=[_("span",{class:"text-white text-xs font-bold"},"✓",-1)])])):(ge(),_e("div",$A)),_("span",XA,$(l.nombre),1)]),_("span",YA,$(l.total>=0?"+":"")+$(l.total),1)]))),128))])])])])])])]))}}),ZA=Ji({__name:"App",setup(n){const e=Tt("crear"),t=Tt("");return el("navigateToFicha",i=>{t.value=i,e.value="ficha"}),el("navigateToCrear",()=>{e.value="crear"}),(i,s)=>e.value==="crear"?(ge(),nl(X1,{key:0})):e.value==="ficha"?(ge(),nl(KA,{key:1,"character-name":t.value},null,8,["character-name"])):gt("",!0)}});Am(ZA).mount("#app");
