if(!self.define){let e,i={};const s=(s,n)=>(s=new URL(s+".js",n).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(n,r)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let t={};const c=e=>s(e,o),l={module:{uri:o},exports:t,require:c};i[o]=Promise.all(n.map((e=>l[e]||c(e)))).then((e=>(r(...e),t)))}}define(["./workbox-27b29e6f"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/index-12a82451.js",revision:null},{url:"assets/index-5623d84e.css",revision:null},{url:"index.html",revision:"249384e6d99dfea0d1afba6c80eb36b6"},{url:"registerSW.js",revision:"402b66900e731ca748771b6fc5e7a068"},{url:"vite.svg",revision:"8e3a10e157f75ada21ab742c022d5430"},{url:"logo512.png",revision:"917515db74ea8d1aee6a246cfbcc0b45"},{url:"logo192.png",revision:"33dbdd0177549353eeeb785d02c294af"},{url:"favicon.ico",revision:"c92b85a5b907c70211f4ec25e29a8c4a"},{url:"manifest.webmanifest",revision:"716976bc95ea63c53a425731c1598cb4"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
