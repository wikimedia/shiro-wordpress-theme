!function(){"use strict";var e,r={1898:function(e,r,t){function n(e,r){(null==r||r>e.length)&&(r=e.length);for(var t=0,n=Array(r);t<r;t++)n[t]=e[t];return n}function o(e,r){return function(e){if(Array.isArray(e))return e}(e)||function(e,r){var t=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var n,o,i,u,c=[],s=!0,a=!1;try{if(i=(t=t.call(e)).next,0===r){if(Object(t)!==t)return;s=!1}else for(;!(s=(n=i.call(t)).done)&&(c.push(n.value),c.length!==r);s=!0);}catch(e){a=!0,o=e}finally{try{if(!s&&null!=t.return&&(u=t.return(),Object(u)!==u))return}finally{if(a)throw o}}return c}}(e,r)||function(e,r){if(e){if("string"==typeof e)return n(e,r);var t={}.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?n(e,r):void 0}}(e,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function i(e){return i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},i(e)}function u(e,r,t){return(r=function(e){var r=function(e){if("object"!=i(e)||!e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var t=r.call(e,"string");if("object"!=i(t))return t;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"==i(r)?r:r+""}(r))in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}var c=window.wp.blocks,s=window.wp.apiFetch,a=t.n(s),l=window.wp.blockEditor,f=window.wp.components,d=window.wp.element,p=window.wp.i18n,y=window.wp.serverSideRender,b=t.n(y),g=window.wp.url,m=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"shiro/blog-list","title":"Blog list","textdomain":"shiro-admin","category":"wikimedia","icon":"list-view","description":"Dynamic list of recent posts","attributes":{"postsToShow":{"type":"integer","default":2},"categories":{"type":"array","items":{"type":"object"}},"excludedCategories":{"type":"array","items":{"type":"object"}},"order":{"type":"string","default":"desc"},"orderBy":{"type":"string","default":"date"},"selectedAuthor":{"type":"number"}},"editorScript":"file:./index.js","editorStyle":"file:./style-index.css","render":"file:./render.php"}'),h=window.ReactJSXRuntime;function v(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function w(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?v(Object(t),!0).forEach((function(r){u(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):v(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}(0,c.registerBlockType)(m.name,w(w({},m),{},{edit:function(e){var r=e.attributes,t=e.setAttributes,n=r.postsToShow,i=r.categories,c=r.excludedCategories,s=r.order,y=r.orderBy,v=r.selectedAuthor,O=(0,l.useBlockProps)({className:"blog-list"}),j=o((0,d.useState)([]),2),S=j[0],x=j[1],C=o((0,d.useState)([]),2),k=C[0],A=C[1],P=k.reduce((function(e,r){return w(w({},e),{},u({},r.name,r))}),{}),_=o((0,d.useState)([]),2),B=_[0],E=_[1],I=B.reduce((function(e,r){return w(w({},e),{},u({},r.name,r))}),{}),T=function(e,r){return function(t){if(!t.some((function(r){return"string"==typeof r&&!e[r]}))){var n=t.map((function(r){return"string"==typeof r?e[r]:r}));if(n.includes(null))return!1;r(n)}}},D=(0,d.useRef)();return(0,d.useEffect)((function(){return D.current=!0,a()({path:(0,g.addQueryArgs)("/wp/v2/categories",{per_page:-1})}).then((function(e){D.current&&(A(e),E(e))})).catch((function(){D.current&&(A([]),E([]))})),a()({path:(0,g.addQueryArgs)("/wp/v2/users",{per_page:-1})}).then((function(e){D.current&&x(e)})).catch((function(){D.current&&x([])})),function(){D.current=!1}}),[]),(0,h.jsxs)("div",w(w({},O),{},{children:[(0,h.jsx)(l.InspectorControls,{children:(0,h.jsx)(f.PanelBody,{title:(0,p.__)("Sorting and filtering"),children:(0,h.jsx)(f.QueryControls,{order:s,orderBy:y,authorList:S,categorySuggestions:P,numberOfItems:n,selectedAuthorId:v,selectedCategories:i,onAuthorChange:function(e){return t({selectedAuthor:""!==e?Number(e):void 0})},onCategoryChange:T(P,(function(e){return t({categories:e})})),onNumberOfItemsChange:function(e){return t({postsToShow:e})},onOrderByChange:function(e){return t({orderBy:e})},onOrderChange:function(e){return t({order:e})}})})}),(0,h.jsx)(l.InspectorAdvancedControls,{children:(0,h.jsx)(f.FormTokenField,{label:(0,p.__)("Excluded Categories"),maxSuggestions:20,suggestions:Object.keys(I),value:c&&c.map((function(e){return{id:e.id,value:e.name||e.value}})),onChange:T(I,(function(e){return t({excludedCategories:e})}))},"query-controls-categories-select")}),(0,h.jsx)(b(),{attributes:r,block:m.name})]}))},save:function(){return null}}))}},t={};function n(e){var o=t[e];if(void 0!==o)return o.exports;var i=t[e]={exports:{}};return r[e](i,i.exports,n),i.exports}n.m=r,e=[],n.O=function(r,t,o,i){if(!t){var u=1/0;for(l=0;l<e.length;l++){t=e[l][0],o=e[l][1],i=e[l][2];for(var c=!0,s=0;s<t.length;s++)(!1&i||u>=i)&&Object.keys(n.O).every((function(e){return n.O[e](t[s])}))?t.splice(s--,1):(c=!1,i<u&&(u=i));if(c){e.splice(l--,1);var a=o();void 0!==a&&(r=a)}}return r}i=i||0;for(var l=e.length;l>0&&e[l-1][2]>i;l--)e[l]=e[l-1];e[l]=[t,o,i]},n.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(r,{a:r}),r},n.d=function(e,r){for(var t in r)n.o(r,t)&&!n.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:r[t]})},n.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},function(){var e={452:0,156:0};n.O.j=function(r){return 0===e[r]};var r=function(r,t){var o,i,u=t[0],c=t[1],s=t[2],a=0;if(u.some((function(r){return 0!==e[r]}))){for(o in c)n.o(c,o)&&(n.m[o]=c[o]);if(s)var l=s(n)}for(r&&r(t);a<u.length;a++)i=u[a],n.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return n.O(l)},t=self.webpackChunkshiro_wordpress_theme=self.webpackChunkshiro_wordpress_theme||[];t.forEach(r.bind(null,0)),t.push=r.bind(null,t.push.bind(t))}();var o=n.O(void 0,[156],(function(){return n(1898)}));o=n.O(o)}();