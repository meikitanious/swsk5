function N(){}function U(t,e){for(const n in e)t[n]=e[n];return t}function T(t){return t()}function O(){return Object.create(null)}function y(t){t.forEach(T)}function D(t){return typeof t=="function"}function lt(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let x;function ft(t,e){return x||(x=document.createElement("a")),x.href=e,t===x.href}function W(t){return Object.keys(t).length===0}function at(t,e,n,i){if(t){const r=q(t,e,n,i);return t[0](r)}}function q(t,e,n,i){return t[1]&&i?U(n.ctx.slice(),t[1](i(e))):n.ctx}function _t(t,e,n,i){if(t[2]&&i){const r=t[2](i(n));if(e.dirty===void 0)return r;if(typeof r=="object"){const l=[],c=Math.max(e.dirty.length,r.length);for(let s=0;s<c;s+=1)l[s]=e.dirty[s]|r[s];return l}return e.dirty|r}return e.dirty}function dt(t,e,n,i,r,l){if(r){const c=q(e,n,i,l);t.p(c,r)}}function ht(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let i=0;i<n;i++)e[i]=-1;return e}return-1}function mt(t){const e={};for(const n in t)n[0]!=="$"&&(e[n]=t[n]);return e}function pt(t,e){const n={};e=new Set(e);for(const i in t)!e.has(i)&&i[0]!=="$"&&(n[i]=t[i]);return n}function yt(t){return t==null?"":t}let w=!1;function G(){w=!0}function J(){w=!1}function K(t,e,n,i){for(;t<e;){const r=t+(e-t>>1);n(r)<=i?t=r+1:e=r}return t}function Q(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const o=[];for(let u=0;u<e.length;u++){const a=e[u];a.claim_order!==void 0&&o.push(a)}e=o}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let r=0;for(let o=0;o<e.length;o++){const u=e[o].claim_order,a=(r>0&&e[n[r]].claim_order<=u?r+1:K(1,r,g=>e[n[g]].claim_order,u))-1;i[o]=n[a]+1;const f=a+1;n[f]=o,r=Math.max(f,r)}const l=[],c=[];let s=e.length-1;for(let o=n[r]+1;o!=0;o=i[o-1]){for(l.push(e[o-1]);s>=o;s--)c.push(e[s]);s--}for(;s>=0;s--)c.push(e[s]);l.reverse(),c.sort((o,u)=>o.claim_order-u.claim_order);for(let o=0,u=0;o<c.length;o++){for(;u<l.length&&c[o].claim_order>=l[u].claim_order;)u++;const a=u<l.length?l[u]:null;t.insertBefore(c[o],a)}}function R(t,e){if(w){for(Q(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function gt(t,e,n){w&&!n?R(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function V(t){t.parentNode&&t.parentNode.removeChild(t)}function xt(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function X(t){return document.createElement(t)}function Y(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function j(t){return document.createTextNode(t)}function $t(){return j(" ")}function bt(){return j("")}function vt(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function B(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function wt(t,e){const n=Object.getOwnPropertyDescriptors(t.__proto__);for(const i in e)e[i]==null?t.removeAttribute(i):i==="style"?t.style.cssText=e[i]:i==="__value"?t.value=t[i]=e[i]:n[i]&&n[i].set?t[i]=e[i]:B(t,i,e[i])}function Et(t,e){Object.keys(e).forEach(n=>{Z(t,n,e[n])})}function Z(t,e,n){e in t?t[e]=typeof t[e]=="boolean"&&n===""?!0:n:B(t,e,n)}function tt(t){return Array.from(t.childNodes)}function et(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function L(t,e,n,i,r=!1){et(t);const l=(()=>{for(let c=t.claim_info.last_index;c<t.length;c++){const s=t[c];if(e(s)){const o=n(s);return o===void 0?t.splice(c,1):t[c]=o,r||(t.claim_info.last_index=c),s}}for(let c=t.claim_info.last_index-1;c>=0;c--){const s=t[c];if(e(s)){const o=n(s);return o===void 0?t.splice(c,1):t[c]=o,r?o===void 0&&t.claim_info.last_index--:t.claim_info.last_index=c,s}}return i()})();return l.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,l}function z(t,e,n,i){return L(t,r=>r.nodeName===e,r=>{const l=[];for(let c=0;c<r.attributes.length;c++){const s=r.attributes[c];n[s.name]||l.push(s.name)}l.forEach(c=>r.removeAttribute(c))},()=>i(e))}function Nt(t,e,n){return z(t,e,n,X)}function kt(t,e,n){return z(t,e,n,Y)}function nt(t,e){return L(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>j(e),!0)}function St(t){return nt(t," ")}function jt(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function At(t,e){t.value=e==null?"":e}function Ct(t,e,n,i){n===null?t.style.removeProperty(e):t.style.setProperty(e,n,i?"important":"")}function it(t,e,{bubbles:n=!1,cancelable:i=!1}={}){const r=document.createEvent("CustomEvent");return r.initCustomEvent(t,n,i,e),r}function Ot(t,e){return new t(e)}let p;function m(t){p=t}function d(){if(!p)throw new Error("Function called outside component initialization");return p}function Mt(t){d().$$.before_update.push(t)}function Pt(t){d().$$.on_mount.push(t)}function Tt(t){d().$$.after_update.push(t)}function Dt(t){d().$$.on_destroy.push(t)}function qt(){const t=d();return(e,n,{cancelable:i=!1}={})=>{const r=t.$$.callbacks[e];if(r){const l=it(e,n,{cancelable:i});return r.slice().forEach(c=>{c.call(t,l)}),!l.defaultPrevented}return!0}}function Bt(t,e){return d().$$.context.set(t,e),e}function Lt(t){return d().$$.context.get(t)}const h=[],M=[],b=[],P=[],F=Promise.resolve();let k=!1;function H(){k||(k=!0,F.then(I))}function zt(){return H(),F}function S(t){b.push(t)}const E=new Set;let $=0;function I(){const t=p;do{for(;$<h.length;){const e=h[$];$++,m(e),rt(e.$$)}for(m(null),h.length=0,$=0;M.length;)M.pop()();for(let e=0;e<b.length;e+=1){const n=b[e];E.has(n)||(E.add(n),n())}b.length=0}while(h.length);for(;P.length;)P.pop()();k=!1,E.clear(),m(t)}function rt(t){if(t.fragment!==null){t.update(),y(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(S)}}const v=new Set;let _;function Ft(){_={r:0,c:[],p:_}}function Ht(){_.r||y(_.c),_=_.p}function ct(t,e){t&&t.i&&(v.delete(t),t.i(e))}function It(t,e,n,i){if(t&&t.o){if(v.has(t))return;v.add(t),_.c.push(()=>{v.delete(t),i&&(n&&t.d(1),i())}),t.o(e)}else i&&i()}function Ut(t,e){const n={},i={},r={$$scope:1};let l=t.length;for(;l--;){const c=t[l],s=e[l];if(s){for(const o in c)o in s||(i[o]=1);for(const o in s)r[o]||(n[o]=s[o],r[o]=1);t[l]=s}else for(const o in c)r[o]=1}for(const c in i)c in n||(n[c]=void 0);return n}function Wt(t){t&&t.c()}function Gt(t,e){t&&t.l(e)}function ot(t,e,n,i){const{fragment:r,after_update:l}=t.$$;r&&r.m(e,n),i||S(()=>{const c=t.$$.on_mount.map(T).filter(D);t.$$.on_destroy?t.$$.on_destroy.push(...c):y(c),t.$$.on_mount=[]}),l.forEach(S)}function st(t,e){const n=t.$$;n.fragment!==null&&(y(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function ut(t,e){t.$$.dirty[0]===-1&&(h.push(t),H(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function Jt(t,e,n,i,r,l,c,s=[-1]){const o=p;m(t);const u=t.$$={fragment:null,ctx:[],props:l,update:N,not_equal:r,bound:O(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(o?o.$$.context:[])),callbacks:O(),dirty:s,skip_bound:!1,root:e.target||o.$$.root};c&&c(u.root);let a=!1;if(u.ctx=n?n(t,e.props||{},(f,g,...A)=>{const C=A.length?A[0]:g;return u.ctx&&r(u.ctx[f],u.ctx[f]=C)&&(!u.skip_bound&&u.bound[f]&&u.bound[f](C),a&&ut(t,f)),g}):[],u.update(),a=!0,y(u.before_update),u.fragment=i?i(u.ctx):!1,e.target){if(e.hydrate){G();const f=tt(e.target);u.fragment&&u.fragment.l(f),f.forEach(V)}else u.fragment&&u.fragment.c();e.intro&&ct(t.$$.fragment),ot(t,e.target,e.anchor,e.customElement),J(),I()}m(o)}class Kt{$destroy(){st(this,1),this.$destroy=N}$on(e,n){if(!D(n))return N;const i=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return i.push(n),()=>{const r=i.indexOf(n);r!==-1&&i.splice(r,1)}}$set(e){this.$$set&&!W(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}export{At as $,zt as A,N as B,at as C,ft as D,yt as E,R as F,vt as G,dt as H,ht as I,_t as J,y as K,pt as L,qt as M,Bt as N,Dt as O,U as P,mt as Q,Et as R,Kt as S,wt as T,Ut as U,M as V,Lt as W,Mt as X,xt as Y,Y as Z,kt as _,$t as a,gt as b,St as c,Ht as d,bt as e,ct as f,Ft as g,V as h,Jt as i,Tt as j,X as k,Nt as l,tt as m,B as n,Pt as o,Ct as p,j as q,nt as r,lt as s,It as t,jt as u,Ot as v,Wt as w,Gt as x,ot as y,st as z};
