!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=32)}([function(e,t){e.exports=wp.i18n},function(e,t){e.exports=wp.blockEditor},function(e,t){e.exports=wp.element},function(e,t,r){e.exports=r(38)()},function(e,t){e.exports=wp.components},function(e,t){e.exports=wp.data},function(e,t){e.exports=function(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}},function(e,t,r){"use strict";var n=r(12),o=r.n(n),a=r(13),i=r.n(a),c=r(22),l=r.n(c),s=r(23),u=r.n(s),m=r(24),p=r.n(m),f=r(25),d=r.n(f),g=r(17),b=r.n(g),h=r(2),_=r(9),y=r.n(_),v=r(3),w=r.n(v),k=r(26),O=r.n(k),j=r(1),x=r(4),E=r(0),N=r(6),S=r.n(N),C=r(27),T=r.n(C),P=r(11);var B=function(e){var t,r=e.isSelected,n=e.url,o=e.onChangeLink,a=Object(h.useState)(!1),i=T()(a,2),c=i[0],l=i[1],s=!!n,u=s&&r,m=function(){return l(!0),!1},p=function(){o(void 0),l(!1)},f=(c||u)&&wp.element.createElement(x.Popover,{position:"bottom center",onClose:function(){return l(!1)}},wp.element.createElement(j.__experimentalLinkControl,{className:"wp-block-navigation-link__inline-link-input",settings:[],value:{url:n},onChange:function(e){return o(e.url,e)}}));return Object(h.createElement)(h.Fragment,null,wp.element.createElement(j.BlockControls,null,wp.element.createElement(x.ToolbarGroup,null,!s&&wp.element.createElement(x.ToolbarButton,{className:"url-picker__link-button",icon:"admin-links",name:"link",shortcut:P.displayShortcut.primary("k"),title:Object(E.__)("Link"),onClick:m}),u&&wp.element.createElement(x.ToolbarButton,{className:"url-picker__link-button",icon:"editor-unlink",isActive:!0,name:"link",shortcut:P.displayShortcut.primaryShift("k"),title:Object(E.__)("Unlink"),onClick:p}))),r&&wp.element.createElement(x.KeyboardShortcuts,{bindGlobal:!0,shortcuts:(t={},S()(t,P.rawShortcut.primary("k"),m),S()(t,P.rawShortcut.primaryShift("k"),p),t)}),f)};function A(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var r,n=b()(e);if(t){var o=b()(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return d()(this,r)}}var I=Object(x.withFocusOutside)(function(e){p()(r,e);var t=A(r);function r(e){var n;return l()(this,r),(n=t.call(this,e)).state={showButtons:!1},n}return u()(r,[{key:"handleFocusOutside",value:function(){this.setState({showButtons:!1})}},{key:"render",value:function(){var e=this,t=this.state.showButtons,r=this.props,n=r.text,o=r.onChangeText,a=r.onChangeLink,i=r.className,c=r.url;return Object(h.createElement)(h.Fragment,null,wp.element.createElement(B,{isSelected:t,url:c,onChangeLink:a}),wp.element.createElement("div",{className:y()("call-to-action-wrapper",{"call-to-action--no-url":!c})},wp.element.createElement(j.RichText,{allowedFormats:[],className:y()("call-to-action",i),placeholder:Object(E.__)("Call to action","shiro"),tagName:"div",value:n,onChange:o,onFocus:function(){return e.setState({showButtons:!0})}}),!c&&wp.element.createElement("div",{className:"call-to-action__warning"},wp.element.createElement("span",{"aria-label":Object(E.__)("Warning","shiro"),role:"img"},"\u26a0\ufe0f"),"\xa0",wp.element.createElement("span",null,Object(E.__)("Add a URL to this CTA","shiro")))))}}]),r}(O.a.Component));I.propTypes={text:w.a.string,onChangeText:w.a.func.isRequired,onChangeLink:w.a.func.isRequired,className:w.a.string,url:w.a.string},I.Content=function(e){var t=e.url,r=e.text,n=e.className,a=i()(e,["url","text","className"]);return t?wp.element.createElement("a",o()({className:n,href:t},a),r):null},I.Content.propTypes={url:w.a.string,text:w.a.string,className:w.a.string};t.a=I},function(e,t,r){"use strict";var n=r(12),o=r.n(n),a=r(6),i=r.n(a),c=r(13),l=r.n(c),s=r(2),u=r(9),m=r.n(u),p=r(3),f=r.n(p),d=r(1),g=r(4),b=r(0),h=r(28),_=r(5);function y(e){var t=e.id,r=e.className,n=e.imageSize,o=e.onChange,a=e.noticeUI,i=e.noticeOperations,c=e.src,l=function(e){i.removeAllNotices(),i.createErrorNotice(e)},u=function(e){if(i.removeAllNotices(),e&&e.url){var t,r=e.id,a=e.alt,c=e.url,l=e.sizes;o({id:r,src:(null===l||void 0===l||null===(t=l[n])||void 0===t?void 0:t.url)||c,alt:a,media:e})}else o({id:void 0,src:void 0,alt:void 0,media:void 0})},m=(c=function(e,t){var r,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:h.noop,o=Object(_.useSelect)((function(t){return t("core").getMedia(e)})),a=(null===o||void 0===o||null===(r=o.media_details.sizes[t])||void 0===r?void 0:r.source_url)||(null===o||void 0===o?void 0:o.source_url);return Object(s.useEffect)((function(){a&&n({id:e,alt:null===o||void 0===o?void 0:o.alt,src:a,media:o})}),[e,t,n,a,o]),{alt:null===o||void 0===o?void 0:o.alt,src:a,media:o}}(t,n,o).src||c)&&wp.element.createElement("img",{alt:Object(b.__)("Edit image"),className:r,src:c,title:Object(b.__)("Edit image")});return Object(s.createElement)(s.Fragment,null,m,wp.element.createElement(d.MediaPlaceholder,{accept:"image/*",allowedTypes:["image"],className:"image-picker__placeholder",disableMediaButtons:!!c,notices:a,value:{id:t,src:c},onError:l,onSelect:u}),wp.element.createElement(d.BlockControls,null,c&&wp.element.createElement(d.MediaReplaceFlow,{accept:"image/*",allowedTypes:["image"],mediaId:t,mediaURL:c,name:Object(b.__)("Replace image","shiro"),onError:l,onSelect:u})))}y.propTypes={id:f.a.number,className:f.a.string,imageSize:f.a.string,src:f.a.string,onChange:f.a.func.isRequired,noticeOperations:f.a.object.isRequired,noticeUI:f.a.oneOfType([f.a.bool,f.a.node])};var v=Object(g.withNotices)(y);v.Content=function(e){var t=e.id,r=e.imageSize,n=e.src,a=e.alt,c=e.className,s=l()(e,["id","imageSize","src","alt","className"]);return n?wp.element.createElement("img",o()({alt:a,className:m()(i()({},"wp-image-".concat(t),t),i()({},"size-".concat(r),r),c),src:n},s)):null},v.Content.propTypes={alt:f.a.string,id:f.a.number,imageSize:f.a.string,src:f.a.string};t.a=v},function(e,t,r){var n;!function(){"use strict";var r={}.hasOwnProperty;function o(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var a=typeof n;if("string"===a||"number"===a)e.push(n);else if(Array.isArray(n)&&n.length){var i=o.apply(null,n);i&&e.push(i)}else if("object"===a)for(var c in n)r.call(n,c)&&n[c]&&e.push(c)}}return e.join(" ")}e.exports?(o.default=o,e.exports=o):void 0===(n=function(){return o}.apply(t,[]))||(e.exports=n)}()},function(e,t){e.exports=wp.blocks},function(e,t){e.exports=wp.keycodes},function(e,t){function r(){return e.exports=r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},r.apply(this,arguments)}e.exports=r},function(e,t,r){var n=r(34);e.exports=function(e,t){if(null==e)return{};var r,o,a=n(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)r=i[o],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}},function(e,t,r){"use strict";var n=r(0),o=[{name:"base90",label:Object(n.__)("Light","shiro"),isDefault:!0},{name:"base70",label:Object(n.__)("Gray","shiro")},{name:"base0",label:Object(n.__)("Dark","shiro")},{name:"blue90",label:Object(n.__)("Blue - Faded","shiro")},{name:"blue50",label:Object(n.__)("Blue - Vibrant","shiro")},{name:"red90",label:Object(n.__)("Red - Faded","shiro")},{name:"red50",label:Object(n.__)("Red - Vibrant","shiro")},{name:"yellow90",label:Object(n.__)("Yellow - Faded","shiro")},{name:"yellow50",label:Object(n.__)("Yellow - Vibrant","shiro")}];t.a=o},function(e,t,r){"use strict";r.r(t),r.d(t,"name",(function(){return l})),r.d(t,"filters",(function(){return s})),r.d(t,"mimicHeadingStyles",(function(){return u})),r.d(t,"styles",(function(){return m}));var n=r(6),o=r.n(n),a=r(0);function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){o()(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var l="core/heading",s=[{hook:"blocks.registerBlockType",namespace:"shiro/heading-supports",callback:function(e,t){return"core/heading"!==t?e:c(c({},e),{},{supports:c(c({},e.supports),{},{align:!1,fontSize:!1})})}}],u=[{name:"h1",label:Object(a.__)("Mimic h1","shiro")},{name:"h2",label:Object(a.__)("Mimic h2","shiro")},{name:"h3",label:Object(a.__)("Mimic h3","shiro")},{name:"h4",label:Object(a.__)("Mimic h4","shiro")},{name:"h5",label:Object(a.__)("Mimic h5","shiro")},{name:"h6",label:Object(a.__)("Mimic h6","shiro")}],m=u},function(e,t,r){"use strict";function n(e){return(n="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function o(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function a(e,t){return(a=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function i(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var r,n=l(e);if(t){var o=l(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return c(this,r)}}function c(e,t){return!t||"object"!==n(t)&&"function"!==typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function l(e){return(l=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}Object.defineProperty(t,"__esModule",{value:!0}),t._apply_wp_5_4_hmr_patch=t.autoloadFormats=t.unregisterFormat=t.registerFormat=t.autoloadPlugins=t.unregisterPlugin=t.registerPlugin=t.autoloadBlocks=t.afterUpdateBlocks=t.beforeUpdateBlocks=t.unregisterBlock=t.registerBlock=t.autoload=void 0;var s=window.wp,u=s.blocks,m=s.plugins,p=s.richText,f=s.hooks,d=s.data,g=function(){},b=function(e){var t=e.getContext,r=e.register,n=e.unregister,o=e.before,a=void 0===o?g:o,i=e.after,c=void 0===i?g:i,l=arguments.length>1&&void 0!==arguments[1]?arguments[1]:g,s={},u=function(){a();var e=t(),o=[];return e.keys().forEach((function(t){var a=e(t);if(a!==s[t]){var i=s[t];i&&console.groupCollapsed&&console.groupCollapsed("hot update: ".concat(t)),i&&n(s[t]),r(a),o.push(a),s[t]=a,i&&console.groupCollapsed&&console.groupEnd()}})),c(o),e},m=u();l(m,u)};t.autoload=b;var h=null,_=function(e){var t=e.name,r=e.settings,n=e.filters,o=e.styles;t&&r&&u.registerBlockType(t,r),n&&Array.isArray(n)&&n.forEach((function(e){var t=e.hook,r=e.namespace,n=e.callback;f.addFilter(t,r,n)})),o&&Array.isArray(o)&&o.forEach((function(e){return u.registerBlockStyle(t,e)}))};t.registerBlock=_;var y=function(e){var t=e.name,r=e.settings,n=e.filters,o=e.styles;t&&r&&u.unregisterBlockType(t),n&&Array.isArray(n)&&n.forEach((function(e){var t=e.hook,r=e.namespace;f.removeFilter(t,r)})),o&&Array.isArray(o)&&o.forEach((function(e){return u.unregisterBlockStyle(t,e.name)}))};t.unregisterBlock=y;var v=function(){h=d.select("core/block-editor").getSelectedBlockClientId(),d.dispatch("core/block-editor").clearSelectedBlock()};t.beforeUpdateBlocks=v;var w=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=e.map((function(e){return e.name}));t.length&&(d.select("core/block-editor").getBlocks().forEach((function(e){var r=e.name,n=e.clientId;t.includes(r)&&d.dispatch("core/block-editor").selectBlock(n)})),h?d.dispatch("core/block-editor").selectBlock(h):d.dispatch("core/block-editor").clearSelectedBlock(),h=null)};t.afterUpdateBlocks=w;t.autoloadBlocks=function(e,t){var r=e.getContext,n=e.register,o=void 0===n?_:n,a=e.unregister,i=void 0===a?y:a,c=e.before,l=void 0===c?v:c,s=e.after;b({getContext:r,register:o,unregister:i,before:l,after:void 0===s?w:s},t)};var k=function(e){var t=e.name,r=e.settings,n=e.filters;t&&r&&m.registerPlugin(t,r),n&&Array.isArray(n)&&n.forEach((function(e){var t=e.hook,r=e.namespace,n=e.callback;f.addFilter(t,r,n)}))};t.registerPlugin=k;var O=function(e){var t=e.name,r=e.settings,n=e.filters;t&&r&&m.unregisterPlugin(t),n&&Array.isArray(n)&&n.forEach((function(e){var t=e.hook,r=e.namespace;f.removeFilter(t,r)}))};t.unregisterPlugin=O;t.autoloadPlugins=function(e,t){var r=e.getContext,n=e.register,o=void 0===n?k:n,a=e.unregister,i=void 0===a?O:a,c=e.before,l=e.after;b({getContext:r,register:o,unregister:i,before:c,after:l},t)};var j=function(e){var t=e.name,r=e.settings;t&&r&&p.registerFormatType(t,r)};t.registerFormat=j;var x=function(e){var t=e.name,r=e.settings;t&&r&&p.unregisterFormatType(t)};t.unregisterFormat=x;t.autoloadFormats=function(e,t){var r=e.getContext,n=e.register,o=void 0===n?j:n,a=e.unregister,i=void 0===a?x:a,c=e.before,l=e.after;b({getContext:r,register:o,unregister:i,before:c,after:l},t)};t._apply_wp_5_4_hmr_patch=function(){var e=window.React,t=e.Component,r=e.Fragment,n=e.createElement;f.addFilter("editor.BlockListBlock","block-editor-hmr/prevent-block-swapping-error",(function(e){return function(t){!function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&a(e,t)}(m,t);var c,l,s,u=i(m);function m(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,m),(t=u.call(this,e)).state={hasError:!1},t}return c=m,s=[{key:"getDerivedStateFromError",value:function(e){return{hasError:!0}}}],(l=[{key:"componentDidUpdate",value:function(e,t){var r=this;this.state.hasError&&this.state.hasError!==t.hasError&&setTimeout((function(){r.setState({hasError:!1})}))}},{key:"render",value:function(){return this.state.hasError?null:n(r,null,n(e,this.props))}}])&&o(c.prototype,l),s&&o(c,s),m}(t)}))}},function(e,t){function r(t){return e.exports=r=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},r(t)}e.exports=r},function(e,t){e.exports=wp.tokenList},function(e,t){e.exports=function(e){if(Array.isArray(e))return e}},function(e,t,r){var n=r(41);e.exports=function(e,t){if(e){if("string"===typeof e)return n(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(e,t):void 0}}},function(e,t){e.exports=function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}},function(e,t){e.exports=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}},function(e,t){function r(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}e.exports=function(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e}},function(e,t,r){var n=r(35);e.exports=function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&n(e,t)}},function(e,t,r){var n=r(36),o=r(37);e.exports=function(e,t){return!t||"object"!==n(t)&&"function"!==typeof t?o(e):t}},function(e,t){e.exports=React},function(e,t,r){var n=r(19),o=r(40),a=r(20),i=r(21);e.exports=function(e,t){return n(e)||o(e,t)||a(e,t)||i()}},function(e,t){e.exports=lodash},function(e,t,r){var n=r(19),o=r(42),a=r(20),i=r(21);e.exports=function(e){return n(e)||o(e)||a(e)||i()}},function(e,t){e.exports=wp.compose},function(e,t){e.exports=wp.domReady},function(e,t,r){"use strict";r.r(t);var n=r(16);Object(n.autoloadBlocks)({getContext:function(){return r(33)}},(function(e,t){0})),Object(n.autoloadPlugins)({getContext:function(){return r(44)}},(function(e,t){0}))},function(e,t,r){var n={"./banner/index.js":46,"./blog-post-heading/index.js":47,"./core-button/index.js":48,"./core-heading/index.js":15,"./core-paragraph/index.js":43,"./landing-page-hero/index.js":49,"./stair/index.js":50,"./stairs/index.js":51};function o(e){var t=a(e);return r(t)}function a(e){if(!r.o(n,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return n[e]}o.keys=function(){return Object.keys(n)},o.resolve=a,e.exports=o,o.id=33},function(e,t){e.exports=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}},function(e,t){function r(t,n){return e.exports=r=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},r(t,n)}e.exports=r},function(e,t){function r(t){return"function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?e.exports=r=function(e){return typeof e}:e.exports=r=function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r(t)}e.exports=r},function(e,t){e.exports=function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}},function(e,t,r){"use strict";var n=r(39);function o(){}function a(){}a.resetWarningCache=o,e.exports=function(){function e(e,t,r,o,a,i){if(i!==n){var c=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw c.name="Invariant Violation",c}}function t(){return e}e.isRequired=e;var r={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:a,resetWarningCache:o};return r.PropTypes=r,r}},function(e,t,r){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},function(e,t){e.exports=function(e,t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e)){var r=[],n=!0,o=!1,a=void 0;try{for(var i,c=e[Symbol.iterator]();!(n=(i=c.next()).done)&&(r.push(i.value),!t||r.length!==t);n=!0);}catch(l){o=!0,a=l}finally{try{n||null==c.return||c.return()}finally{if(o)throw a}}return r}}},function(e,t){e.exports=function(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}},function(e,t){e.exports=function(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}},function(e,t,r){"use strict";r.r(t),r.d(t,"name",(function(){return o})),r.d(t,"styles",(function(){return a}));var n=r(15),o="core/paragraph",a=n.mimicHeadingStyles},function(e,t,r){var n={"./post-type-overrides/index.js":45};function o(e){var t=a(e);return r(t)}function a(e){if(!r.o(n,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return n[e]}o.keys=function(){return Object.keys(n)},o.resolve=a,e.exports=o,o.id=44},function(e,t,r){"use strict";r.r(t),r.d(t,"name",(function(){return a})),r.d(t,"settings",(function(){return i}));var n=r(5),o=r(2),a="post-type-override",i={render:function(){var e=Object(n.select)("core/editor").getCurrentPostType();return Object(o.useEffect)((function(){var t=document.querySelector(".block-editor-writing-flow");t&&t.classList.add("single","has-blocks","single-".concat(e))})),null}}},function(e,t,r){"use strict";r.r(t),r.d(t,"name",(function(){return s})),r.d(t,"styles",(function(){return u})),r.d(t,"settings",(function(){return m}));var n=r(2),o=r(1),a=r(0),i=r(7),c=r(8),l=r(14),s="shiro/banner",u=l.a,m={title:Object(a.__)("Banner","shiro"),category:"wikimedia",apiVersion:2,icon:"cover-image",description:Object(a.__)("Banner with an image and call to action.","shiro"),attributes:{imageID:{type:"integer"},imageSrc:{type:"string",source:"attribute",selector:".banner__image",attribute:"src"},imageAlt:{type:"string",source:"attribute",selector:".banner__image",attribute:"alt"},align:{type:"string",default:"wide"},heading:{type:"string",source:"html",selector:".banner__heading"},text:{type:"string",source:"html",selector:".banner__text"},url:{type:"string",source:"attribute",selector:".banner__cta",attribute:"href"},buttonText:{type:"string",source:"html",selector:".banner__cta"}},example:{attributes:{imageID:0,imageSrc:"https://s.w.org/images/core/5.3/MtBlanc1.jpg",imageAlt:"",align:"wide",heading:"Banner Heading",text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit.",url:"https://wikimediafoundation.org/",buttonText:"Call to Action"}},edit:function(e){var t=e.attributes,r=e.setAttributes,l=t.heading,s=t.text,u=t.buttonText,m=t.url,p=t.imageID,f=t.imageSrc,d=Object(o.useBlockProps)({className:"banner"}),g=Object(n.useCallback)((function(e){var t=e.id,n=e.src,o=e.alt;r({imageID:t,imageSrc:n,imageAlt:o})}),[r]),b=Object(n.useCallback)((function(e){r({url:e})}),[r]),h=Object(n.useCallback)((function(e){r({buttonText:e})}),[r]);return wp.element.createElement("div",d,wp.element.createElement("div",{className:"banner__content"},wp.element.createElement(o.RichText,{allowedFormats:["core/bold","core/italic"],className:"banner__heading is-style-h4",keepPlaceholderOnFocus:!0,placeholder:Object(a.__)("Heading for banner","shiro"),tagName:"h2",value:l,onChange:function(e){return r({heading:e})}}),wp.element.createElement(o.RichText,{allowedFormats:["core/bold","core/italic"],className:"banner__text",placeholder:Object(a.__)("Enter the message for this banner.","shiro"),tagName:"p",value:s,onChange:function(e){return r({text:e})}}),wp.element.createElement(i.a,{className:"banner__cta",text:u,url:m,onChangeLink:b,onChangeText:h})),wp.element.createElement("figure",{className:"banner__image-wrapper"},wp.element.createElement(c.a,{className:"banner__image",id:p,imageSize:"medium_large",src:f,onChange:g})))},save:function(e){var t=e.attributes,r=t.heading,n=t.text,a=t.buttonText,l=t.url,s=t.imageSrc,u=t.imageAlt,m=t.imageID,p=o.useBlockProps.save({className:"banner"});return wp.element.createElement("div",p,wp.element.createElement("div",{className:"banner__content"},wp.element.createElement(o.RichText.Content,{className:"banner__heading",tagName:"h4",value:r}),wp.element.createElement(o.RichText.Content,{className:"banner__text",tagName:"p",value:n}),wp.element.createElement(i.a.Content,{className:"banner__cta",text:a,url:l})),wp.element.createElement("figure",{className:"banner__image-wrapper"},wp.element.createElement(c.a.Content,{alt:u,className:"banner__image",id:m,imageSize:"medium_large",src:s})))}}},function(e,t,r){"use strict";r.r(t),r.d(t,"name",(function(){return f})),r.d(t,"settings",(function(){return d}));var n=r(29),o=r.n(n),a=(r(2),r(9)),i=r.n(a),c=r(1),l=r(10),s=r(4),u=r(5),m=r(0),p=function(){var e=Object(u.dispatch)("core/edit-post"),t=e.openGeneralSidebar,r=e.toggleEditorPanelOpened,n=Object(u.select)("core/edit-post").isEditorPanelOpened;t("edit-post/document"),n("featured-image")||r("featured-image"),setTimeout((function(){var e=document.querySelector(".editor-post-featured-image__container .components-button");e.closest(".components-panel__body").scrollIntoView(),e.focus(),e.click()}))},f="shiro/blog-post-heading",d={title:Object(m.__)("Post Heading controls","shiro"),category:"wikimedia",icon:"cover-image",description:Object(m.__)("Editor controls for selecting featured image and post intro.","shiro"),supports:{inserter:!1,multiple:!1,reusable:!1},attributes:{postIntro:{type:"string",multiline:"p",source:"meta",meta:"page_intro"}},edit:function(e){var t=e.attributes,r=e.setAttributes,n=Object(u.useSelect)((function(e){var t,r=e("core/editor").getEditedPostAttribute("featured_media");if(!r)return!1;var n=e("core").getMedia(r);return(null===n||void 0===n||null===(t=n.media_details.sizes.image_16x9_large)||void 0===t?void 0:t.source_url)||(null===n||void 0===n?void 0:n.source_url)||!1}));return wp.element.createElement("div",{className:"post-heading"},wp.element.createElement("div",{className:i()("post-heading__image-wrapper",{"post-heading__image-wrapper--empty":!n})},n?wp.element.createElement("img",{alt:"",className:"post-heading__image",src:n}):wp.element.createElement("div",{className:"post-heading__image--empty"},Object(m.__)("No featured image selected","shiro")),wp.element.createElement("button",{className:"post-heading__click-overlay",onClick:p},wp.element.createElement("span",{className:"dashicon-wrapper"},wp.element.createElement(s.Icon,{icon:"edit-large"})))),wp.element.createElement("div",{className:"article-title"},wp.element.createElement(c.RichText,{className:"post-heading__intro",keepPlaceholderOnFocus:!0,multiline:"p",placeholder:Object(m.__)("Add a post intro","shiro"),tagName:"div",value:t.postIntro,onChange:function(e){return r({postIntro:e})}})))}};Object(u.subscribe)((function(){var e=Object(u.dispatch)("core/block-editor"),t=e.replaceBlocks,r=e.removeBlock,n=e.selectBlock,a=Object(u.select)("core/block-editor").getBlocks;if("post"===(0,Object(u.select)("core/editor").getCurrentPostType)()){var i=a(),c=o()(i),s=c[0],m=c.slice(1);if(s){if(s.name!==f){var p=Object(l.createBlock)(f);t(s.clientId,[p,s]),n(p.clientId)}m.filter((function(e){return e.name===f})).forEach((function(e){return r(e.clientId)}))}}}))},function(e,t,r){"use strict";r.r(t),r.d(t,"name",(function(){return O})),r.d(t,"styles",(function(){return j})),r.d(t,"filters",(function(){return x}));var n=r(6),o=r.n(n),a=r(2),i=r(1),c=r(10),l=r(30),s=r(31),u=r.n(s),m=r(0),p=r(4),f=r(18),d=r.n(f);function g(e,t){var r;if("undefined"===typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(r=function(e,t){if(!e)return;if("string"===typeof e)return b(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return b(e,t)}(e))||t&&e&&"number"===typeof e.length){r&&(e=r);var n=0,o=function(){};return{s:o,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,i=!0,c=!1;return{s:function(){r=e[Symbol.iterator]()},n:function(){var e=r.next();return i=e.done,e},e:function(e){c=!0,a=e},f:function(){try{i||null==r.return||r.return()}finally{if(c)throw a}}}}function b(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var h=["","calendar","circle","close","diamond","down","edit-ltr","edit-rtl","email","globe","header","header-orig","header-wp20","heart-pink","language","lock","lock-orig","lock-pink","lock-white","map-pin","square","triangle","wave","arrow-back","download","downTriangle","image","logo-horizontal","mail","menu","open","search","social-facebook","social-instagram","social-pinterest","social-twitter","social-twitter-blue","social-youtube","translate","trending","upTriangle","userAvatar","wikimedia","wikimedia-blue","wikipedia","wikipedia-black"];function _(e,t,r){var n=new d.a(e);return t&&(n.remove("has-icon"),n.remove("has-icon-"+t)),""!==r&&(n.add("has-icon"),n.add("has-icon-"+r)),n.value}function y(e){var t=e.attributes,r=e.setAttributes,n=t.className,o=h.map((function(e){return{label:e,value:e||Object(m.__)("No icon","shiro")}})),a=function(e,t){var r,n=g(new d.a(t).values());try{for(n.s();!(r=n.n()).done;){var o=r.value;if(-1!==o.indexOf("has-icon-")){var a=o.substring(9);if(e.includes(a))return a}}}catch(i){n.e(i)}finally{n.f()}return""}(h,n);return wp.element.createElement(p.PanelBody,{title:Object(m.__)("Icons","shiro")},wp.element.createElement(p.SelectControl,{help:Object(m.__)("A custom icon can be used by inserting an inline image","shiro"),label:Object(m.__)("Icon","shiro"),options:o,value:a,onChange:function(e){r({className:_(n,a,e)})}}))}function v(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function w(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?v(Object(r),!0).forEach((function(t){o()(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):v(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var k=Object(l.createHigherOrderComponent)((function(e){return function(t){var r=t.name,n=t.attributes,o=t.setAttributes;return Object(a.createElement)(a.Fragment,null,wp.element.createElement(e,t),"core/button"===r&&wp.element.createElement(i.InspectorControls,null,wp.element.createElement(y,{attributes:n,setAttributes:o})))}}));u()((function(){Object(c.unregisterBlockStyle)("core/button","outline"),Object(c.unregisterBlockStyle)("core/button","fill")}));var O="core/button",j=[{name:"primary",label:Object(m.__)("Primary","shiro"),isDefault:!0},{name:"normal",label:Object(m.__)("Normal","shiro")},{name:"destructive",label:Object(m.__)("Destructive","shiro")},{name:"primary-old",label:Object(m.__)("Primary (Old)","shiro")},{name:"secondary",label:Object(m.__)("Secondary","shiro")},{name:"tertiary",label:Object(m.__)("Tertiary","shiro")}],x=[{hook:"editor.BlockEdit",namespace:"shiro/button-styles",callback:k},{hook:"blocks.registerBlockType",namespace:"shiro/button-styles",callback:function(e,t){return"core/button"!==t?e:w(w({},e),{},{example:{attributes:{text:Object(m.__)("Call to Action","shiro")}},variations:[{name:"donate-pink",title:Object(m.__)("Pink donate button","shiro"),attributes:{text:Object(m.__)("Donate now","shiro"),className:"is-style-secondary has-icon has-icon-lock-white"}}]})}}]},function(e,t,r){"use strict";r.r(t),r.d(t,"name",(function(){return l})),r.d(t,"styles",(function(){return s})),r.d(t,"settings",(function(){return u}));r(2);var n=r(1),o=r(0),a=r(7),i=r(8),c=r(14),l="shiro/landing-page-hero",s=c.a,u={apiVersion:2,title:Object(o.__)("Landing page hero","shiro"),category:"wikimedia",icon:"cover-image",description:Object(o.__)('A hero image and text to be used on "subsite" landing pages',"shiro"),example:{attributes:{kicker:Object(o.__)("Our Work","shiro"),title:Object(o.__)("We help everyone share in the sum of all knowledge","shiro"),pageIntro:Object(o.__)("We are the people who keep knowledge free. There is an amazing community of people around the world that makes great projects like Wikipedia. We help them do that work. We take care of the technical infrastructure, the legal challenges, and the growing pains.","shiro"),imageUrl:"https://s.w.org/images/core/5.3/MtBlanc1.jpg",buttonText:"Learn More",buttonLink:"https://wikimediafoundation.org/"}},supports:{inserter:!0,multiple:!1,reusable:!1},attributes:{kicker:{type:"string",source:"html",selector:".hero__kicker"},title:{type:"string",source:"html",selector:".hero__title"},imageId:{type:"integer"},imageUrl:{type:"string",source:"attribute",selector:".hero__image",attribute:"src"},buttonText:{type:"string",source:"html",selector:".hero__call-to-action"},buttonLink:{type:"string",source:"attribute",selector:".hero__call-to-action",attribute:"href"},pageIntro:{type:"string",source:"html",selector:".hero__intro",multiline:"p"}},edit:function(e){var t=e.attributes,r=e.setAttributes,c=t.kicker,l=t.title,s=t.imageId,u=t.imageUrl,m=t.buttonText,p=t.buttonLink,f=t.pageIntro,d=Object(n.useBlockProps)({className:"hero"});return wp.element.createElement("div",d,wp.element.createElement("header",{className:"hero__header"},wp.element.createElement("div",{className:"hero__text-column"},wp.element.createElement(n.RichText,{className:"hero__kicker",keepPlaceholderOnFocus:!0,placeholder:Object(o.__)("Kicker","shiro"),tagName:"small",value:c,onChange:function(e){return r({kicker:e})}}),wp.element.createElement(n.RichText,{className:"hero__title",keepPlaceholderOnFocus:!0,placeholder:Object(o.__)("Title for the page","shiro"),tagName:"h1",value:l,onChange:function(e){return r({title:e})}}),wp.element.createElement(a.a,{className:"hero__call-to-action cta-button",text:m,url:p,onChangeLink:function(e){return r({buttonLink:e})},onChangeText:function(e){return r({buttonText:e})}})),wp.element.createElement("div",{className:"hero__image"},wp.element.createElement(i.a,{id:s,imageSize:"image_16x9_large",src:u,onChange:function(e){var t=e.id,n=e.src;r({imageId:t,imageUrl:n})}}))),wp.element.createElement(n.RichText,{className:"hero__intro",keepPlaceholderOnFocus:!0,multiline:"p",placeholder:Object(o.__)("Introductory paragraph - some information about this page to guide the reader.","shiro"),tagName:"div",value:f,onChange:function(e){return r({pageIntro:e})}}))},save:function(e){var t=e.attributes,r=(e.className,t.kicker),o=t.title,a=t.imageUrl,i=t.buttonText,c=t.buttonLink,l=t.pageIntro,s=n.useBlockProps.save({className:"hero"});return wp.element.createElement("div",s,wp.element.createElement("header",{className:"hero__header"},wp.element.createElement("div",{className:"hero__text-column"},wp.element.createElement(n.RichText.Content,{className:"hero__kicker",tagName:"small",value:r}),wp.element.createElement(n.RichText.Content,{className:"hero__title",tagName:"h1",value:o}),c&&wp.element.createElement("a",{className:"hero__call-to-action cta-button",href:c},i)),wp.element.createElement("img",{alt:"",className:"hero__image",src:a})),wp.element.createElement(n.RichText.Content,{className:"hero__intro",multiline:"p",tagName:"div",value:l}))}}},function(e,t,r){"use strict";r.r(t),r.d(t,"name",(function(){return l})),r.d(t,"settings",(function(){return s}));var n=r(2),o=r(1),a=r(0),i=r(7),c=r(8),l="shiro/stair",s={apiVersion:2,title:Object(a.__)("Stair","shiro"),category:"wikimedia",attributes:{content:{type:"string",source:"html",selector:".stair__body"},heading:{type:"string",source:"html",selector:".stair__heading"},linkText:{type:"string",source:"html",selector:".stair__read-more"},linkUrl:{type:"string",source:"attribute",selector:".stair__read-more",attribute:"href"},imageUrl:{type:"string",source:"attribute",selector:".stair__image",attribute:"src"},imageAlt:{type:"string",source:"attribute",selector:".stair__image",attribute:"alt"},imageId:{type:"integer"}},parent:["shiro/stairs"],edit:function(e){var t=e.attributes,r=e.setAttributes,l=Object(o.useBlockProps)({className:"stair"}),s=t.imageId,u=t.imageUrl,m=t.content,p=t.linkText,f=t.linkUrl,d=t.heading,g=Object(n.useCallback)((function(e){var t=e.id,n=e.alt,o=e.src;r({imageId:t,imageAlt:n,imageUrl:o})}),[r]);return wp.element.createElement("div",l,wp.element.createElement(o.RichText,{className:"stair__heading is-style-h3",keepPlaceholderOnFocus:!0,placeholder:Object(a.__)("Write heading","shiro"),tagName:"h2",value:d,onChange:function(e){return r({heading:e})}}),wp.element.createElement(c.a,{className:"stair__image",id:s,imageSize:"image_16x9_small",src:u,onChange:g}),wp.element.createElement(o.RichText,{className:"stair__body",keepPlaceholderOnFocus:!0,placeholder:Object(a.__)("Start writing your stair contents","shiro"),tagName:"p",value:m,onChange:function(e){return r({content:e})}}),wp.element.createElement(i.a,{className:"stair__read-more arrow-link",text:p,url:f,onChangeLink:function(e){return r({linkUrl:e})},onChangeText:function(e){return r({linkText:e})}}))},save:function(e){var t=e.attributes,r=o.useBlockProps.save({className:"stair"}),n=t.imageUrl,a=t.imageAlt,l=t.content,s=t.imageId,u=t.linkText,m=t.linkUrl,p=t.heading;return wp.element.createElement("div",r,wp.element.createElement(o.RichText.Content,{className:"stair__heading is-style-h3",tagName:"h2",value:p}),wp.element.createElement(c.a.Content,{alt:a,className:"stair__image",id:s,src:n}),wp.element.createElement(o.RichText.Content,{className:"stair__body",tagName:"p",value:l}),wp.element.createElement(i.a.Content,{className:"stair__read-more arrow-link",text:u,url:m}))}}},function(e,t,r){"use strict";r.r(t),r.d(t,"name",(function(){return i})),r.d(t,"settings",(function(){return c}));r(2);var n=r(1),o=r(0),a=[["shiro/stair"],["shiro/stair"],["shiro/stair"],["shiro/stair"]],i="shiro/stairs",c={apiVersion:2,title:Object(o.__)("Stairs","shiro"),category:"wikimedia",attributes:{},edit:function(){var e=Object(n.useBlockProps)();return wp.element.createElement("div",e,wp.element.createElement(n.InnerBlocks,{allowedBlocks:["shiro/stair"],template:a}))},save:function(e){e.attributes;var t=n.useBlockProps.save();return wp.element.createElement("div",t,wp.element.createElement(n.InnerBlocks.Content,null))}}}]);