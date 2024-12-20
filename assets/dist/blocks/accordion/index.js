!function(){"use strict";function t(r){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(r)}function r(r,e,n){return(e=function(r){var e=function(r){if("object"!=t(r)||!r)return r;var e=r[Symbol.toPrimitive];if(void 0!==e){var n=e.call(r,"string");if("object"!=t(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(r)}(r);return"symbol"==t(e)?e:e+""}(e))in r?Object.defineProperty(r,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):r[e]=n,r}function e(t,r){(null==r||r>t.length)&&(r=t.length);for(var e=0,n=Array(r);e<r;e++)n[e]=t[e];return n}function n(t,r){if(t){if("string"==typeof t)return e(t,r);var n={}.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?e(t,r):void 0}}function o(t){return function(t){if(Array.isArray(t))return e(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||n(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}window.React;var i=window.wp.blocks,c=window.wp.blockEditor,a=window.wp.components,l=window.wp.i18n,u=JSON.parse('{"UU":"shiro/accordion"}'),s=function(t){t.preventDefault();var r=t.target.closest(".accordion-item"),e=t.target.closest(".accordion-wrapper"),n=r.getAttribute("aria-expanded");f(e),r.toggleAttribute("aria-expanded",""!==n),r.scrollIntoView({block:"center"})},f=function(t){o(t.querySelectorAll(".accordion-item")).forEach((function(t){return t.removeAttribute("aria-expanded")}))};document.addEventListener("DOMContentLoaded",(function(){o(document.querySelectorAll(".accordion-item")).forEach((function(t){return function(t){t.querySelector(".accordion-item__title").addEventListener("click",s)}(t)}))}));var d=window.ReactJSXRuntime;function y(t,r){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(t,r).enumerable}))),e.push.apply(e,n)}return e}function p(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?y(Object(n),!0).forEach((function(e){r(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):y(Object(n)).forEach((function(r){Object.defineProperty(t,r,Object.getOwnPropertyDescriptor(n,r))}))}return t}(0,i.registerBlockType)(u.UU,{edit:function(t){var r,e,i=t.attributes,u=t.setAttributes,s=(0,c.useBlockProps)(),f=i.fontColor,y=(r=(0,c.useSettings)("color.palette"),e=1,function(t){if(Array.isArray(t))return t}(r)||function(t,r){var e=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=e){var n,o,i,c,a=[],l=!0,u=!1;try{if(i=(e=e.call(t)).next,0===r){if(Object(e)!==e)return;l=!1}else for(;!(l=(n=i.call(e)).done)&&(a.push(n.value),a.length!==r);l=!0);}catch(t){u=!0,o=t}finally{try{if(!l&&null!=e.return&&(c=e.return(),Object(c)!==c))return}finally{if(u)throw o}}return a}}(r,e)||n(r,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}())[0];return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(c.InspectorControls,{children:(0,d.jsx)(a.Panel,{header:(0,l.__)("Set title font color:","shiro-admin"),children:(0,d.jsx)(a.PanelBody,{children:(0,d.jsx)(a.ColorPalette,{value:f,colors:o(y),onChange:function(t){return u({fontColor:t})}})})})}),(0,d.jsx)("div",p(p({},s),{},{children:(0,d.jsx)("div",{className:"accordion-wrapper",children:(0,d.jsx)(c.InnerBlocks,{allowedBlocks:["shiro/accordion-item"]})})}))]})},save:function(t){var r=t.attributes,e=c.useBlockProps.save();return e.className="accordion-wrapper ".concat(e.className," ").concat(r.fontColor),(0,d.jsx)("div",p(p({},e),{},{children:(0,d.jsx)(c.InnerBlocks.Content,{})}))}})}();