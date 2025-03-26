!function(){var e,n={920:function(e,n,t){"use strict";var a,i,r=window.wp.blocks,o=window.wp.blockEditor,l=window.wp.element,s=window.wp.i18n,c=window.React,d=t.n(c);function h(){return h=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var a in t)({}).hasOwnProperty.call(t,a)&&(e[a]=t[a])}return e},h.apply(null,arguments)}var m=t(6942),u=t.n(m),g=window.wp.components,p=window.wp.keycodes,_=window.ReactJSXRuntime,b=function({isSelected:e,url:n,onChangeLink:t,onChangeOpenInNewTab:a,openInNewTab:i}){const[r,c]=(0,l.useState)(!1),d=!!n,h=d&&e,m=()=>(c(!0),!1),u=()=>{t(void 0),c(!1)},b=(r||h)&&(0,_.jsx)(g.Popover,{position:"bottom center",onClose:()=>c(!1),children:(0,_.jsx)(o.__experimentalLinkControl,{className:"wp-block-navigation-link__inline-link-input",settings:[],value:{url:n},onChange:e=>t(e.url,e)})});return(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)(o.BlockControls,{children:(!d||h)&&(0,_.jsxs)(g.ToolbarGroup,{children:[!d&&(0,_.jsx)(g.ToolbarButton,{className:"url-picker__link-button",icon:"admin-links",name:"link",shortcut:p.displayShortcut.primary("k"),title:(0,s.__)("Link"),onClick:m}),h&&(0,_.jsx)(g.ToolbarButton,{className:"url-picker__link-button",icon:"editor-unlink",isActive:!0,name:"link",shortcut:p.displayShortcut.primaryShift("k"),title:(0,s.__)("Unlink"),onClick:u}),h&&a&&(0,_.jsx)(g.ToolbarButton,{icon:"external",label:(0,s.__)("Open in new tab","shiro-admin"),isPressed:i,onClick:()=>a(!i)})]})}),e&&(0,_.jsx)(g.KeyboardShortcuts,{bindGlobal:!0,shortcuts:{[p.rawShortcut.primary("k")]:m,[p.rawShortcut.primaryShift("k")]:u}}),b]})};const w=(0,g.withFocusOutside)(class extends d().Component{constructor(e){super(e),this.state={showButtons:!1}}handleFocusOutside(){this.setState({showButtons:!1})}render(){const{showButtons:e}=this.state,{text:n,onChangeText:t,onChangeLink:a,onChangeOpenInNewTab:i,openInNewTab:r,className:l,url:c}=this.props;return(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)(b,{isSelected:e,url:c,onChangeLink:a,openInNewTab:r,onChangeOpenInNewTab:i}),!!i&&(0,_.jsx)(o.InspectorControls,{children:(0,_.jsx)(g.Panel,{children:(0,_.jsx)(g.PanelBody,{title:(0,s.__)("CTA link behavior","shiro-admin"),initialOpen:!0,children:(0,_.jsx)(g.ToggleControl,{label:(0,s.__)("Open in new tab","shiro-admin"),checked:r,onChange:i})})})}),(0,_.jsxs)("div",{className:u()("call-to-action-wrapper",{"call-to-action--no-url":!c}),children:[(0,_.jsx)(o.RichText,{allowedFormats:[],className:u()("call-to-action",l),placeholder:(0,s.__)("Call to action","shiro-admin"),tagName:"div",onFocus:()=>this.setState({showButtons:!0}),value:n,onChange:t}),!c&&(0,_.jsxs)("div",{className:"call-to-action__warning",children:[(0,_.jsx)("span",{"aria-label":(0,s.__)("Warning","shiro-admin"),role:"img",children:"⚠️"})," ",(0,_.jsx)("span",{children:(0,s.__)("Add a URL to this CTA","shiro-admin")})]})]})]})}});w.Content=({url:e,text:n,className:t,openInNewTab:a=!1,...i})=>{if(!e)return null;const r={};return a&&(r.target="_blank",r.rel="noreferrer noopener"),(0,_.jsx)("a",{className:t,href:e,...i,...r,children:n})};var f=w,y=t(5556),x=t.n(y),v=window.lodash,k=window.wp.data;function j(e){const{id:n,className:t,imageSize:a,onChange:i,labels:r,noticeUI:c,noticeOperations:d,width:h,height:m}=e;let{src:u}=e;const g=e=>{d.removeAllNotices(),d.createErrorNotice(e)},{src:p}=((e,n,t=v.noop)=>{const a=(0,k.useSelect)((n=>n("core").getMedia(e))),i=a?.media_details.sizes[n],r=i?.source_url||a?.source_url,o=i?.width||a?.width,s=i?.height||a?.height;return(0,l.useEffect)((()=>{r&&t({id:e,alt:a?.alt,src:r,width:o,height:s,media:a})}),[e,n,t,r,a,o,s]),{alt:a?.alt,src:r,media:a}})(n,a,i);u=p||u;const b=e=>{if(d.removeAllNotices(),e&&e.url){const{id:n,alt:t,url:r,sizes:o,width:l,height:s}=e;i({id:n,src:o?.[a]?.url||r,width:o?.[a]?.width||l,height:o?.[a]?.height||s,alt:t,media:e})}else i({id:void 0,src:void 0,alt:void 0,media:void 0})},w=u&&(0,_.jsx)("img",{alt:(0,s.__)("Edit image"),className:t,height:m,src:u,title:(0,s.__)("Edit image"),width:h});return(0,_.jsxs)(_.Fragment,{children:[w,(0,_.jsx)(o.MediaPlaceholder,{accept:"image/*",allowedTypes:["image"],className:"image-picker__placeholder",disableMediaButtons:!!u,labels:r,notices:c,value:{id:n,src:u},onError:g,onSelect:b}),(0,_.jsx)(o.BlockControls,{children:u&&(0,_.jsx)(o.MediaReplaceFlow,{accept:"image/*",allowedTypes:["image"],mediaId:n,mediaURL:u,name:(0,s.__)("Replace image","shiro-admin"),onError:g,onSelect:b})})]})}j.propTypes={id:x().number,className:x().string,imageSize:x().string,src:x().string,labels:x().object,onChange:x().func.isRequired,width:x().oneOfType([x().string,x().number]),height:x().oneOfType([x().string,x().number]),noticeOperations:x().object.isRequired,noticeUI:x().oneOfType([x().bool,x().node])};const N=(0,g.withNotices)(j);N.Content=({id:e,imageSize:n,src:t,alt:a,className:i,...r})=>t?(0,_.jsx)("img",{alt:a,className:u()({[`wp-image-${e}`]:e},{[`size-${n}`]:n},i),src:t,...r}):null,N.Content.propTypes={alt:x().string,id:x().number,imageSize:x().string,src:x().string};var T=N;var C=[{name:"base90",className:"is-style-base90",label:(0,s.__)("Light","shiro-admin"),isDefault:!0},{name:"base70",label:(0,s.__)("Gray","shiro-admin")},{name:"base0",label:(0,s.__)("Dark","shiro-admin")},{name:"blue90",label:(0,s.__)("Blue - Faded","shiro-admin")},{name:"blue70",label:(0,s.__)("Blue - Light","shiro-admin")},{name:"blue50",label:(0,s.__)("Blue - Vibrant","shiro-admin")},{name:"bright-blue",label:(0,s.__)("Blue - Bright","shiro-admin")},{name:"bright-blue70",label:(0,s.__)("Blue - Bright Light","shiro-admin")},{name:"bright-green",label:(0,s.__)("Green - Bright","shiro-admin")},{name:"bright-green70",label:(0,s.__)("Green - Bright L","shiro-admin")},{name:"dark-green",label:(0,s.__)("Green - Dark","shiro-admin")},{name:"dark-green70",label:(0,s.__)("Green - Dark L","shiro-admin")},{name:"green",label:(0,s.__)("Green","shiro-admin")},{name:"green70",label:(0,s.__)("Green - Light","shiro-admin")},{name:"orange",label:(0,s.__)("Orange","shiro-admin")},{name:"orange70",label:(0,s.__)("Orange - Light","shiro-admin")},{name:"pink",label:(0,s.__)("Pink","shiro-admin")},{name:"pink70",label:(0,s.__)("Pink - Light","shiro-admin")},{name:"purple",label:(0,s.__)("Purple","shiro-admin")},{name:"purple70",label:(0,s.__)("Purple - Light","shiro-admin")},{name:"red90",label:(0,s.__)("Red - Faded","shiro-admin")},{name:"red70",label:(0,s.__)("Red - Light","shiro-admin")},{name:"red50",label:(0,s.__)("Red - Vibrant","shiro-admin")},{name:"red",label:(0,s.__)("Red","shiro-admin")},{name:"yellow",label:(0,s.__)("Yellow","shiro-admin")},{name:"yellow90",label:(0,s.__)("Yellow - Faded","shiro-admin")},{name:"yellow70",label:(0,s.__)("Yellow - Light","shiro-admin")},{name:"yellow50",label:(0,s.__)("Yellow - Vibrant","shiro-admin")},{name:"bright-yellow",label:(0,s.__)("Yellow - Bright","shiro-admin")},{name:"bright-yellow70",label:(0,s.__)("Yellow - Bright Light","shiro-admin")},{name:"donate-red90",label:(0,s.__)("Donate","shiro-admin")}],O=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"shiro/card","title":"Card","textdomain":"shiro-admin","category":"wikimedia","description":"Card creates a call to action with an image, heading and paragraph.","attributes":{"imageId":{"type":"number"},"imageSrc":{"type":"string","source":"attribute","selector":".content-card__image","attribute":"src"},"imageAlt":{"type":"string","source":"attribute","selector":".content-card__image","attribute":"alt"},"imageWidth":{"type":"string","source":"attribute","selector":".content-card__image","attribute":"width"},"imageHeight":{"type":"string","source":"attribute","selector":".content-card__image","attribute":"height"},"heading":{"type":"string","source":"html","selector":".content-card__heading"},"body":{"type":"string","source":"html","selector":".content-card__body"},"linkText":{"type":"string","source":"html","selector":".content-card__call-to-action"},"linkUrl":{"type":"string","source":"attribute","selector":".content-card__call-to-action","attribute":"href"},"openInNewTab":{"type":"boolean"}},"editorScript":"file:./index.js","editorStyle":"file:./style-index.css"}');(0,r.registerBlockType)(O.name,{...O,icon:e=>c.createElement("svg",h({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 35 46",width:"1em",height:"1em"},e),a||(a=c.createElement("path",{d:"M26.76 33.867H8.295c-1.553 0-1.553 2.5 0 2.5H26.76c1.554 0 1.554-2.5 0-2.5m0-8.526H8.295c-1.553 0-1.553 2.5 0 2.5H26.76c1.554 0 1.554-2.5 0-2.5m0 4.041H8.295c-1.553 0-1.553 2.5 0 2.5H26.76c1.554 0 1.554-2.5 0-2.5M8.331 11.542c-.664 0-1.199.232-1.199.521v10.705c0 .287.535.521 1.199.521h18.344c.666 0 1.201-.234 1.201-.521V12.063c0-.289-.535-.521-1.201-.521z"})),i||(i=c.createElement("path",{d:"M34.877 0H.18v45.057h34.697zM3.18 42.056V3h28.697l.001 39.056z"}))),edit:function({attributes:e,setAttributes:n}){const t=(0,o.useBlockProps)({className:"content-card"}),{imageId:a,imageSrc:i,heading:r,body:c,linkText:d,linkUrl:h,imageWidth:m,imageHeight:u,openInNewTab:g}=e,p=(0,l.useCallback)((({id:e,src:t,alt:a,width:i,height:r})=>{n({imageId:e,imageSrc:t,imageAlt:a,imageWidth:i,imageHeight:r})}),[n]);return(0,_.jsxs)("div",{...t,children:[(0,_.jsxs)("div",{className:"content-card__contents",children:[(0,_.jsx)(o.RichText,{className:"content-card__heading is-style-h3",placeholder:(0,s.__)("Heading of the card","shiro-admin"),tagName:"h2",value:r,onChange:e=>n({heading:e})}),(0,_.jsx)(o.RichText,{className:"content-card__body has-small-font-size",placeholder:(0,s.__)("Body of the card","shiro-admin"),tagName:"p",value:c,onChange:e=>n({body:e})}),(0,_.jsx)(f,{className:"content-card__call-to-action arrow-link",text:d,url:h,onChangeLink:e=>n({linkUrl:e}),onChangeText:e=>n({linkText:e}),openInNewTab:g,onChangeOpenInNewTab:e=>n({openInNewTab:e})})]}),(0,_.jsx)(T,{className:"content-card__image",height:u,id:a,imageSize:"image_16x9_small",src:i,width:m,onChange:p})]})},save:function({attributes:e}){const n=o.useBlockProps.save({className:"content-card click-to-call-to-action"}),{imageId:t,imageSrc:a,heading:i,body:r,linkText:l,linkUrl:s,imageWidth:c,imageHeight:d,openInNewTab:h}=e;return(0,_.jsxs)("div",{...n,children:[(0,_.jsxs)("div",{className:"content-card__contents",children:[(0,_.jsx)(o.RichText.Content,{className:"content-card__heading is-style-h3",tagName:"h2",value:i}),(0,_.jsx)(o.RichText.Content,{className:"content-card__body has-small-font-size",tagName:"p",value:r}),(0,_.jsx)(f.Content,{className:"content-card__call-to-action call-to-action",text:l,url:s,openInNewTab:h})]}),(0,_.jsx)(T.Content,{className:"content-card__image",height:d,id:t,imageSize:"image_16x9_small",src:a,width:c})]})}}),C.forEach((e=>(0,r.registerBlockStyle)(O.name,e)))},2694:function(e,n,t){"use strict";var a=t(6925);function i(){}function r(){}r.resetWarningCache=i,e.exports=function(){function e(e,n,t,i,r,o){if(o!==a){var l=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw l.name="Invariant Violation",l}}function n(){return e}e.isRequired=e;var t={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:n,element:e,elementType:e,instanceOf:n,node:e,objectOf:n,oneOf:n,oneOfType:n,shape:n,exact:n,checkPropTypes:r,resetWarningCache:i};return t.PropTypes=t,t}},5556:function(e,n,t){e.exports=t(2694)()},6925:function(e){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},6942:function(e,n){var t;!function(){"use strict";var a={}.hasOwnProperty;function i(){for(var e="",n=0;n<arguments.length;n++){var t=arguments[n];t&&(e=o(e,r(t)))}return e}function r(e){if("string"==typeof e||"number"==typeof e)return e;if("object"!=typeof e)return"";if(Array.isArray(e))return i.apply(null,e);if(e.toString!==Object.prototype.toString&&!e.toString.toString().includes("[native code]"))return e.toString();var n="";for(var t in e)a.call(e,t)&&e[t]&&(n=o(n,t));return n}function o(e,n){return n?e?e+" "+n:e+n:e}e.exports?(i.default=i,e.exports=i):void 0===(t=function(){return i}.apply(n,[]))||(e.exports=t)}()}},t={};function a(e){var i=t[e];if(void 0!==i)return i.exports;var r=t[e]={exports:{}};return n[e](r,r.exports,a),r.exports}a.m=n,e=[],a.O=function(n,t,i,r){if(!t){var o=1/0;for(d=0;d<e.length;d++){t=e[d][0],i=e[d][1],r=e[d][2];for(var l=!0,s=0;s<t.length;s++)(!1&r||o>=r)&&Object.keys(a.O).every((function(e){return a.O[e](t[s])}))?t.splice(s--,1):(l=!1,r<o&&(o=r));if(l){e.splice(d--,1);var c=i();void 0!==c&&(n=c)}}return n}r=r||0;for(var d=e.length;d>0&&e[d-1][2]>r;d--)e[d]=e[d-1];e[d]=[t,i,r]},a.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(n,{a:n}),n},a.d=function(e,n){for(var t in n)a.o(n,t)&&!a.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:n[t]})},a.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},function(){var e={767:0,87:0,407:0};a.O.j=function(n){return 0===e[n]};var n=function(n,t){var i,r,o=t[0],l=t[1],s=t[2],c=0;if(o.some((function(n){return 0!==e[n]}))){for(i in l)a.o(l,i)&&(a.m[i]=l[i]);if(s)var d=s(a)}for(n&&n(t);c<o.length;c++)r=o[c],a.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return a.O(d)},t=self.webpackChunkshiro_wordpress_theme=self.webpackChunkshiro_wordpress_theme||[];t.forEach(n.bind(null,0)),t.push=n.bind(null,t.push.bind(t))}();var i=a.O(void 0,[87,407],(function(){return a(920)}));i=a.O(i)}();