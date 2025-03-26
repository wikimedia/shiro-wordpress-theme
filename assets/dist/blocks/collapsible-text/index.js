!function(){"use strict";var e,t={8005:function(){window.React;var e=window.wp.blockEditor,t=window.wp.components,s=window.wp.i18n,o=window.wp.blocks,n=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"title":"Collapsible text","name":"shiro/collapsible-text","textdomain":"shiro-admin","category":"wikimedia","icon":"ellipsis","attributes":{"fontColor":{"type":"string"},"readMore":{"type":"string","source":"html","selector":".expand","default":"Read More"},"readLess":{"type":"string","source":"html","selector":".collapse","default":"Read Less"}},"editorScript":"file:./index.js","editorStyle":"file:./style-index.css"}'),r=window.ReactJSXRuntime;(0,o.registerBlockType)(n.name,{...n,edit:function({attributes:o,setAttributes:n}){const{fontColor:l,readMore:a,readLess:i}=o;return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(e.InspectorControls,{children:(0,r.jsx)(t.Panel,{header:(0,s.__)("Set button text color:","shiro-admin"),children:(0,r.jsx)(t.PanelBody,{children:(0,r.jsx)(t.ColorPalette,{value:l,colors:[...(0,e.useSetting)("color.palette")],onChange:e=>n({fontColor:e})})})})}),(0,r.jsx)("div",{className:"collapsible-text expanded",children:(0,r.jsxs)("div",{className:"collapsible-text__content",children:[(0,r.jsx)(e.InnerBlocks,{}),(0,r.jsxs)("div",{className:"collapsible-text__button-settings",style:l&&{color:l},children:[(0,r.jsxs)("div",{className:"collapsible-text__toggle",children:[(0,r.jsx)("label",{children:(0,s.__)('Text of "Read More" button state',"shiro-admin")}),(0,r.jsx)(e.RichText,{className:"expand",onChange:e=>n({readMore:e}),value:a})]}),(0,r.jsxs)("div",{className:"collapsible-text__toggle",children:[(0,r.jsx)("label",{children:(0,s.__)('Text of "Read Less" button state',"shiro-admin")}),(0,r.jsx)(e.RichText,{className:"collapse",onChange:e=>n({readLess:e}),value:i})]})]})]})})]})},save:({attributes:t})=>{const{fontColor:s,readMore:o,readLess:n}=t;return(0,r.jsxs)("div",{className:"collapsible-text",children:[(0,r.jsx)("div",{className:"collapsible-text__content",children:(0,r.jsx)(e.InnerBlocks.Content,{})}),(0,r.jsxs)("button",{type:"button",className:"collapsible-text__toggle",style:s&&{color:s},children:[(0,r.jsx)(e.RichText.Content,{className:"expand",tagName:"span",value:o}),(0,r.jsx)(e.RichText.Content,{className:"collapse",tagName:"span",value:n})]})]})}})}},s={};function o(e){var n=s[e];if(void 0!==n)return n.exports;var r=s[e]={exports:{}};return t[e](r,r.exports,o),r.exports}o.m=t,e=[],o.O=function(t,s,n,r){if(!s){var l=1/0;for(d=0;d<e.length;d++){s=e[d][0],n=e[d][1],r=e[d][2];for(var a=!0,i=0;i<s.length;i++)(!1&r||l>=r)&&Object.keys(o.O).every((function(e){return o.O[e](s[i])}))?s.splice(i--,1):(a=!1,r<l&&(l=r));if(a){e.splice(d--,1);var c=n();void 0!==c&&(t=c)}}return t}r=r||0;for(var d=e.length;d>0&&e[d-1][2]>r;d--)e[d]=e[d-1];e[d]=[s,n,r]},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e={437:0,953:0};o.O.j=function(t){return 0===e[t]};var t=function(t,s){var n,r,l=s[0],a=s[1],i=s[2],c=0;if(l.some((function(t){return 0!==e[t]}))){for(n in a)o.o(a,n)&&(o.m[n]=a[n]);if(i)var d=i(o)}for(t&&t(s);c<l.length;c++)r=l[c],o.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return o.O(d)},s=self.webpackChunkshiro_wordpress_theme=self.webpackChunkshiro_wordpress_theme||[];s.forEach(t.bind(null,0)),s.push=t.bind(null,s.push.bind(s))}();var n=o.O(void 0,[953],(function(){return o(8005)}));n=o.O(n)}();