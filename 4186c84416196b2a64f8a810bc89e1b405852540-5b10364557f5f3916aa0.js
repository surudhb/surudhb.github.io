(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{"3Z9Z":function(e,t,a){"use strict";var r=a("k1TG"),n=a("8o2o"),i=a("TSYQ"),l=a.n(i),s=a("q1tI"),o=a.n(s),c=a("vUet"),d=["xl","lg","md","sm","xs"],u=o.a.forwardRef((function(e,t){var a=e.bsPrefix,i=e.className,s=e.noGutters,u=e.as,f=void 0===u?"div":u,m=Object(n.a)(e,["bsPrefix","className","noGutters","as"]),p=Object(c.a)(a,"row"),g=p+"-cols",h=[];return d.forEach((function(e){var t,a=m[e];delete m[e];var r="xs"!==e?"-"+e:"";null!=(t=null!=a&&"object"==typeof a?a.cols:a)&&h.push(""+g+r+"-"+t)})),o.a.createElement(f,Object(r.a)({ref:t},m,{className:l.a.apply(void 0,[i,p,s&&"no-gutters"].concat(h))}))}));u.displayName="Row",u.defaultProps={noGutters:!1},t.a=u},"65eO":function(e,t,a){"use strict";var r=a("k1TG"),n=a("8o2o"),i=a("TSYQ"),l=a.n(i),s=a("q1tI"),o=a.n(s),c=a("vUet"),d=o.a.forwardRef((function(e,t){var a=e.bsPrefix,i=e.variant,s=e.pill,d=e.className,u=e.as,f=void 0===u?"span":u,m=Object(n.a)(e,["bsPrefix","variant","pill","className","as"]),p=Object(c.a)(a,"badge");return o.a.createElement(f,Object(r.a)({ref:t},m,{className:l()(d,p,s&&p+"-pill",i&&p+"-"+i)}))}));d.displayName="Badge",d.defaultProps={pill:!1},t.a=d},"9eSz":function(e,t,a){"use strict";var r=a("5NKs");t.__esModule=!0,t.default=void 0;var n,i=r(a("v06X")),l=r(a("XEEL")),s=r(a("uDP2")),o=r(a("j8BX")),c=r(a("q1tI")),d=r(a("17x9")),u=function(e){var t=(0,o.default)({},e),a=t.resolutions,r=t.sizes,n=t.critical;return a&&(t.fixed=a,delete t.resolutions),r&&(t.fluid=r,delete t.sizes),n&&(t.loading="eager"),t.fluid&&(t.fluid=N([].concat(t.fluid))),t.fixed&&(t.fixed=N([].concat(t.fixed))),t},f=function(e){var t=e.media;return!!t&&(v&&!!window.matchMedia(t).matches)},m=function(e){var t=e.fluid,a=e.fixed,r=p(t||a||[]);return r&&r.src},p=function(e){if(v&&function(e){return!!e&&Array.isArray(e)&&e.some((function(e){return void 0!==e.media}))}(e)){var t=e.findIndex(f);if(-1!==t)return e[t];var a=e.findIndex((function(e){return void 0===e.media}));if(-1!==a)return e[a]}return e[0]},g=Object.create({}),h=function(e){var t=u(e),a=m(t);return g[a]||!1},b="undefined"!=typeof HTMLImageElement&&"loading"in HTMLImageElement.prototype,v="undefined"!=typeof window,E=v&&window.IntersectionObserver,y=new WeakMap;function x(e){return e.map((function(e){var t=e.src,a=e.srcSet,r=e.srcSetWebp,n=e.media,i=e.sizes;return c.default.createElement(c.default.Fragment,{key:t},r&&c.default.createElement("source",{type:"image/webp",media:n,srcSet:r,sizes:i}),a&&c.default.createElement("source",{media:n,srcSet:a,sizes:i}))}))}function N(e){var t=[],a=[];return e.forEach((function(e){return(e.media?t:a).push(e)})),[].concat(t,a)}function S(e){return e.map((function(e){var t=e.src,a=e.media,r=e.tracedSVG;return c.default.createElement("source",{key:t,media:a,srcSet:r})}))}function w(e){return e.map((function(e){var t=e.src,a=e.media,r=e.base64;return c.default.createElement("source",{key:t,media:a,srcSet:r})}))}function O(e,t){var a=e.srcSet,r=e.srcSetWebp,n=e.media,i=e.sizes;return"<source "+(t?"type='image/webp' ":"")+(n?'media="'+n+'" ':"")+'srcset="'+(t?r:a)+'" '+(i?'sizes="'+i+'" ':"")+"/>"}var j=function(e,t){var a=(void 0===n&&"undefined"!=typeof window&&window.IntersectionObserver&&(n=new window.IntersectionObserver((function(e){e.forEach((function(e){if(y.has(e.target)){var t=y.get(e.target);(e.isIntersecting||e.intersectionRatio>0)&&(n.unobserve(e.target),y.delete(e.target),t())}}))}),{rootMargin:"200px"})),n);return a&&(a.observe(e),y.set(e,t)),function(){a.unobserve(e),y.delete(e)}},k=function(e){var t=e.src?'src="'+e.src+'" ':'src="" ',a=e.sizes?'sizes="'+e.sizes+'" ':"",r=e.srcSet?'srcset="'+e.srcSet+'" ':"",n=e.title?'title="'+e.title+'" ':"",i=e.alt?'alt="'+e.alt+'" ':'alt="" ',l=e.width?'width="'+e.width+'" ':"",s=e.height?'height="'+e.height+'" ':"",o=e.crossOrigin?'crossorigin="'+e.crossOrigin+'" ':"",c=e.loading?'loading="'+e.loading+'" ':"",d=e.draggable?'draggable="'+e.draggable+'" ':"";return"<picture>"+e.imageVariants.map((function(e){return(e.srcSetWebp?O(e,!0):"")+O(e)})).join("")+"<img "+c+l+s+a+r+t+i+n+o+d+'style="position:absolute;top:0;left:0;opacity:1;width:100%;height:100%;object-fit:cover;object-position:center"/></picture>'},I=c.default.forwardRef((function(e,t){var a=e.src,r=e.imageVariants,n=e.generateSources,i=e.spreadProps,l=e.ariaHidden,s=c.default.createElement(L,(0,o.default)({ref:t,src:a},i,{ariaHidden:l}));return r.length>1?c.default.createElement("picture",null,n(r),s):s})),L=c.default.forwardRef((function(e,t){var a=e.sizes,r=e.srcSet,n=e.src,i=e.style,l=e.onLoad,d=e.onError,u=e.loading,f=e.draggable,m=e.ariaHidden,p=(0,s.default)(e,["sizes","srcSet","src","style","onLoad","onError","loading","draggable","ariaHidden"]);return c.default.createElement("img",(0,o.default)({"aria-hidden":m,sizes:a,srcSet:r,src:n},p,{onLoad:l,onError:d,ref:t,loading:u,draggable:f,style:(0,o.default)({position:"absolute",top:0,left:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center"},i)}))}));L.propTypes={style:d.default.object,onError:d.default.func,onLoad:d.default.func};var R=function(e){function t(t){var a;(a=e.call(this,t)||this).seenBefore=v&&h(t),a.isCritical="eager"===t.loading||t.critical,a.addNoScript=!(a.isCritical&&!t.fadeIn),a.useIOSupport=!b&&E&&!a.isCritical&&!a.seenBefore;var r=a.isCritical||v&&(b||!a.useIOSupport);return a.state={isVisible:r,imgLoaded:!1,imgCached:!1,fadeIn:!a.seenBefore&&t.fadeIn,isHydrated:!1},a.imageRef=c.default.createRef(),a.placeholderRef=t.placeholderRef||c.default.createRef(),a.handleImageLoaded=a.handleImageLoaded.bind((0,i.default)(a)),a.handleRef=a.handleRef.bind((0,i.default)(a)),a}(0,l.default)(t,e);var a=t.prototype;return a.componentDidMount=function(){if(this.setState({isHydrated:v}),this.state.isVisible&&"function"==typeof this.props.onStartLoad&&this.props.onStartLoad({wasCached:h(this.props)}),this.isCritical){var e=this.imageRef.current;e&&e.complete&&this.handleImageLoaded()}},a.componentWillUnmount=function(){this.cleanUpListeners&&this.cleanUpListeners()},a.handleRef=function(e){var t=this;this.useIOSupport&&e&&(this.cleanUpListeners=j(e,(function(){var e=h(t.props);t.state.isVisible||"function"!=typeof t.props.onStartLoad||t.props.onStartLoad({wasCached:e}),t.setState({isVisible:!0},(function(){t.setState({imgLoaded:e,imgCached:!(!t.imageRef.current||!t.imageRef.current.currentSrc)})}))})))},a.handleImageLoaded=function(){var e,t,a;e=this.props,t=u(e),(a=m(t))&&(g[a]=!0),this.setState({imgLoaded:!0}),this.props.onLoad&&this.props.onLoad()},a.render=function(){var e=u(this.props),t=e.title,a=e.alt,r=e.className,n=e.style,i=void 0===n?{}:n,l=e.imgStyle,s=void 0===l?{}:l,d=e.placeholderStyle,f=void 0===d?{}:d,m=e.placeholderClassName,g=e.fluid,h=e.fixed,b=e.backgroundColor,v=e.durationFadeIn,E=e.Tag,y=e.itemProp,N=e.loading,O=e.draggable,j=g||h;if(!j)return null;var R=!1===this.state.fadeIn||this.state.imgLoaded,P=!0===this.state.fadeIn&&!this.state.imgCached,z=(0,o.default)({opacity:R?1:0,transition:P?"opacity "+v+"ms":"none"},s),T="boolean"==typeof b?"lightgray":b,C={transitionDelay:v+"ms"},H=(0,o.default)({opacity:this.state.imgLoaded?0:1},P&&C,s,f),V={title:t,alt:this.state.isVisible?"":a,style:H,className:m,itemProp:y},W=this.state.isHydrated?p(j):j[0];if(g)return c.default.createElement(E,{className:(r||"")+" gatsby-image-wrapper",style:(0,o.default)({position:"relative",overflow:"hidden",maxWidth:W.maxWidth?W.maxWidth+"px":null,maxHeight:W.maxHeight?W.maxHeight+"px":null},i),ref:this.handleRef,key:"fluid-"+JSON.stringify(W.srcSet)},c.default.createElement(E,{"aria-hidden":!0,style:{width:"100%",paddingBottom:100/W.aspectRatio+"%"}}),T&&c.default.createElement(E,{"aria-hidden":!0,title:t,style:(0,o.default)({backgroundColor:T,position:"absolute",top:0,bottom:0,opacity:this.state.imgLoaded?0:1,right:0,left:0},P&&C)}),W.base64&&c.default.createElement(I,{ariaHidden:!0,ref:this.placeholderRef,src:W.base64,spreadProps:V,imageVariants:j,generateSources:w}),W.tracedSVG&&c.default.createElement(I,{ariaHidden:!0,ref:this.placeholderRef,src:W.tracedSVG,spreadProps:V,imageVariants:j,generateSources:S}),this.state.isVisible&&c.default.createElement("picture",null,x(j),c.default.createElement(L,{alt:a,title:t,sizes:W.sizes,src:W.src,crossOrigin:this.props.crossOrigin,srcSet:W.srcSet,style:z,ref:this.imageRef,onLoad:this.handleImageLoaded,onError:this.props.onError,itemProp:y,loading:N,draggable:O})),this.addNoScript&&c.default.createElement("noscript",{dangerouslySetInnerHTML:{__html:k((0,o.default)({alt:a,title:t,loading:N},W,{imageVariants:j}))}}));if(h){var q=(0,o.default)({position:"relative",overflow:"hidden",display:"inline-block",width:W.width,height:W.height},i);return"inherit"===i.display&&delete q.display,c.default.createElement(E,{className:(r||"")+" gatsby-image-wrapper",style:q,ref:this.handleRef,key:"fixed-"+JSON.stringify(W.srcSet)},T&&c.default.createElement(E,{"aria-hidden":!0,title:t,style:(0,o.default)({backgroundColor:T,width:W.width,opacity:this.state.imgLoaded?0:1,height:W.height},P&&C)}),W.base64&&c.default.createElement(I,{ariaHidden:!0,ref:this.placeholderRef,src:W.base64,spreadProps:V,imageVariants:j,generateSources:w}),W.tracedSVG&&c.default.createElement(I,{ariaHidden:!0,ref:this.placeholderRef,src:W.tracedSVG,spreadProps:V,imageVariants:j,generateSources:S}),this.state.isVisible&&c.default.createElement("picture",null,x(j),c.default.createElement(L,{alt:a,title:t,width:W.width,height:W.height,sizes:W.sizes,src:W.src,crossOrigin:this.props.crossOrigin,srcSet:W.srcSet,style:z,ref:this.imageRef,onLoad:this.handleImageLoaded,onError:this.props.onError,itemProp:y,loading:N,draggable:O})),this.addNoScript&&c.default.createElement("noscript",{dangerouslySetInnerHTML:{__html:k((0,o.default)({alt:a,title:t,loading:N},W,{imageVariants:j}))}}))}return null},t}(c.default.Component);R.defaultProps={fadeIn:!0,durationFadeIn:500,alt:"",Tag:"div",loading:"lazy"};var P=d.default.shape({width:d.default.number.isRequired,height:d.default.number.isRequired,src:d.default.string.isRequired,srcSet:d.default.string.isRequired,base64:d.default.string,tracedSVG:d.default.string,srcWebp:d.default.string,srcSetWebp:d.default.string,media:d.default.string}),z=d.default.shape({aspectRatio:d.default.number.isRequired,src:d.default.string.isRequired,srcSet:d.default.string.isRequired,sizes:d.default.string.isRequired,base64:d.default.string,tracedSVG:d.default.string,srcWebp:d.default.string,srcSetWebp:d.default.string,media:d.default.string,maxWidth:d.default.number,maxHeight:d.default.number});function T(e){return function(t,a,r){var n;if(!t.fixed&&!t.fluid)throw new Error("The prop `fluid` or `fixed` is marked as required in `"+r+"`, but their values are both `undefined`.");d.default.checkPropTypes(((n={})[a]=e,n),t,"prop",r)}}R.propTypes={resolutions:P,sizes:z,fixed:T(d.default.oneOfType([P,d.default.arrayOf(P)])),fluid:T(d.default.oneOfType([z,d.default.arrayOf(z)])),fadeIn:d.default.bool,durationFadeIn:d.default.number,title:d.default.string,alt:d.default.string,className:d.default.oneOfType([d.default.string,d.default.object]),critical:d.default.bool,crossOrigin:d.default.oneOfType([d.default.string,d.default.bool]),style:d.default.object,imgStyle:d.default.object,placeholderStyle:d.default.object,placeholderClassName:d.default.string,backgroundColor:d.default.oneOfType([d.default.string,d.default.bool]),onLoad:d.default.func,onError:d.default.func,onStartLoad:d.default.func,Tag:d.default.string,itemProp:d.default.string,loading:d.default.oneOf(["auto","lazy","eager"]),draggable:d.default.bool};var C=R;t.default=C},Kvkj:function(e,t,a){"use strict";a.d(t,"a",(function(){return R})),a.d(t,"b",(function(){return z})),a.d(t,"c",(function(){return T.a})),a.d(t,"d",(function(){return V})),a.d(t,"e",(function(){return U})),a.d(t,"f",(function(){return J}));var r=a("q1tI"),n=a.n(r),i=a("Wbzz"),l=a("9eSz"),s=a.n(l),o=a("k1TG"),c=a("8o2o"),d=a("TSYQ"),u=a.n(d),f=a("vUet"),m=a("YdCC"),p=function(e){return n.a.forwardRef((function(t,a){return n.a.createElement("div",Object(o.a)({},t,{ref:a,className:u()(t.className,e)}))}))},g=a("Wzyw"),h=n.a.forwardRef((function(e,t){var a=e.bsPrefix,r=e.className,i=e.variant,l=e.as,s=void 0===l?"img":l,d=Object(c.a)(e,["bsPrefix","className","variant","as"]),m=Object(f.a)(a,"card-img");return n.a.createElement(s,Object(o.a)({ref:t,className:u()(i?m+"-"+i:m,r)},d))}));h.displayName="CardImg",h.defaultProps={variant:null};var b=h,v=p("h5"),E=p("h6"),y=Object(m.a)("card-body"),x=Object(m.a)("card-title",{Component:v}),N=Object(m.a)("card-subtitle",{Component:E}),S=Object(m.a)("card-link",{Component:"a"}),w=Object(m.a)("card-text",{Component:"p"}),O=Object(m.a)("card-header"),j=Object(m.a)("card-footer"),k=Object(m.a)("card-img-overlay"),I=n.a.forwardRef((function(e,t){var a=e.bsPrefix,i=e.className,l=e.bg,s=e.text,d=e.border,m=e.body,p=e.children,h=e.as,b=void 0===h?"div":h,v=Object(c.a)(e,["bsPrefix","className","bg","text","border","body","children","as"]),E=Object(f.a)(a,"card"),x=Object(r.useMemo)((function(){return{cardHeaderBsPrefix:E+"-header"}}),[E]);return n.a.createElement(g.a.Provider,{value:x},n.a.createElement(b,Object(o.a)({ref:t},v,{className:u()(i,E,l&&"bg-"+l,s&&"text-"+s,d&&"border-"+d)}),m?n.a.createElement(y,null,p):p))}));I.displayName="Card",I.defaultProps={body:!1},I.Img=b,I.Title=x,I.Subtitle=N,I.Body=y,I.Link=S,I.Text=w,I.Header=O,I.Footer=j,I.ImgOverlay=k;var L=I,R=function(e){return n.a.createElement(L,{className:"card-container",as:i.Link,to:e.to},n.a.createElement(L.Img,{as:s.a,fluid:e.featuredImage,className:"height-60"}),n.a.createElement(L.Body,{className:"pt-4"},n.a.createElement(L.Title,null,n.a.createElement("h4",null,e.title)),n.a.createElement(L.Subtitle,{className:"mb-2 text-muted"},e.subtitle),n.a.createElement(L.Text,null,e.excerpt)))},P=a("7vrA"),z=function(e){var t=e.frontmatter,a=e.image,r=t.company,i=t.slug,l=t.position,o=t.link,c=t.startDate,d=t.endDate,u=t.location;return n.a.createElement(P.a,{fluid:!0,className:"m-auto"},n.a.createElement("a",{className:"text-decoration-none",target:"_blank",rel:"noopener noreferrer",href:o},a&&n.a.createElement(s.a,{fluid:a,style:{maxHeight:"17vmax",maxWidth:"17vmax",borderRadius:"Royal Victoria Hospital"!==r&&"50%"},className:"m-auto"})),n.a.createElement("div",null,i?n.a.createElement(n.a.Fragment,null,n.a.createElement("h3",{className:"m-auto pt-2 nav-links"},n.a.createElement("a",{className:"text-decoration-none",target:"_blank",rel:"noopener noreferrer",href:o},n.a.createElement("span",{class:i},r))),n.a.createElement("h4",{className:"mt-2"},n.a.createElement("small",null,n.a.createElement("span",null,l))),n.a.createElement("p",{className:"text-muted"},c,"-",d)):n.a.createElement(n.a.Fragment,null,n.a.createElement("h2",{className:"m-auto pt-2 nav-links"},n.a.createElement("a",{className:"text-decoration-none",target:"_blank",rel:"noopener noreferrer",href:o},n.a.createElement("span",{class:i},r))),n.a.createElement("h5",{className:"text-muted"},u),n.a.createElement("h4",{className:"mt-2"},l),n.a.createElement("h5",{className:"text-muted mt-2"},c,"-",d))))},T=(a("JwsL"),a("rY4l"),a("U5tq"),a("jkrH")),C=n.a.forwardRef((function(e,t){var a,r=e.as,i=void 0===r?"div":r,l=e.className,s=e.fluid,d=e.bsPrefix,m=Object(c.a)(e,["as","className","fluid","bsPrefix"]),p=((a={})[d=Object(f.a)(d,"jumbotron")]=!0,a[d+"-fluid"]=s,a);return n.a.createElement(i,Object(o.a)({ref:t},m,{className:u()(l,p)}))}));C.defaultProps={fluid:!1},C.displayName="Jumbotron";var H=C,V=function(e){var t=e.title,a=e.children;return n.a.createElement(H,{className:"bg-none pt-4 mb-5 pb-0"},n.a.createElement("h1",null,n.a.createElement("p",null,t,a&&n.a.createElement("span",null,a))))},W=a("3Z9Z"),q=a("JI6e"),G=a("65eO"),_=a("dbZe"),M=n.a.forwardRef((function(e,t){var a=e.bsPrefix,r=e.variant,i=e.size,l=e.active,s=e.className,d=e.block,m=e.type,p=e.as,g=Object(c.a)(e,["bsPrefix","variant","size","active","className","block","type","as"]),h=Object(f.a)(a,"btn"),b=u()(s,h,l&&"active",h+"-"+r,d&&h+"-block",i&&h+"-"+i);if(g.href)return n.a.createElement(_.a,Object(o.a)({},g,{as:p,ref:t,className:u()(b,g.disabled&&"disabled")}));t&&(g.ref=t),m?g.type=m:p||(g.type="button");var v=p||"button";return n.a.createElement(v,Object(o.a)({},g,{className:b}))}));M.displayName="Button",M.defaultProps={variant:"primary",active:!1,disabled:!1};var B=M,F=a("IP2g"),U=function(e){e.inProgress;var t=e.featuredImages,a=e.tags,r=e.github,l=e.live,o=e.title,c=e.to;return n.a.createElement(P.a,{className:"text-center"},n.a.createElement(W.a,null,t&&t.map((function(e){return n.a.createElement(q.a,{key:e.src,className:"m-auto col-"+12/t.length},n.a.createElement(s.a,{fluid:e}))}))),n.a.createElement(i.Link,{className:"text-decoration-none",to:c},n.a.createElement("h2",{className:"mt-5"},n.a.createElement("p",null,o))),n.a.createElement("div",{className:"d-inline-flex"},a.map((function(e){return n.a.createElement(G.a,{key:e,pill:!0,className:"mr-1 mr-md-2 p-0 px-2 px-md-3 resume-tags"},n.a.createElement("h5",null,n.a.createElement("small",null,e)))}))),n.a.createElement("br",null),n.a.createElement("div",{className:"mt-3 d-inline-flex"},l&&n.a.createElement(B,{className:"rounded-pill mx-2 px-3 py-1"},n.a.createElement("a",{href:l,target:"_blank",rel:"noopener noreferrer",className:"text-white text-decoration-none"},n.a.createElement(F.a,{icon:["fa","window-maximize"]})," See me live  ",n.a.createElement(F.a,{icon:["fa","link"]}))),r&&n.a.createElement(B,{variant:"dark",className:"mx-2 px-3 py-1"},n.a.createElement("a",{href:r,target:"_blank",rel:"noopener noreferrer",className:"text-white text-decoration-none"},n.a.createElement(F.a,{icon:["fab","github"]})," Github  ",n.a.createElement(F.a,{icon:["fa","link"]}))),n.a.createElement(i.Link,{className:"text-decoration-none",to:c},n.a.createElement(B,{variant:"outline-warning",className:"mx-2 px-3 py-1"},"Learn More"))))},J=function(e){var t=e.html,a=e.frontmatter,r=e.image;return n.a.createElement(P.a,{className:"p-1 project-link text-center"},n.a.createElement(W.a,null,n.a.createElement(q.a,{className:"col-12 my-4"},n.a.createElement(z,{frontmatter:a,image:r})),n.a.createElement(q.a,{className:"col-12 col-lg-8 m-auto"},n.a.createElement("p",{className:"text-left p-large",dangerouslySetInnerHTML:{__html:t}}))),n.a.createElement(W.a,null,n.a.createElement(q.a,{className:"col-12"},n.a.createElement("div",{className:"d-inline-flex"},a.tags.map((function(e){return n.a.createElement(G.a,{key:e,pill:!0,className:"align-text-top mr-1 mr-md-2 p-0 px-2 px-md-3 resume-tags"},n.a.createElement("h5",null,n.a.createElement("small",null,e)))}))))))}}}]);
//# sourceMappingURL=4186c84416196b2a64f8a810bc89e1b405852540-5b10364557f5f3916aa0.js.map