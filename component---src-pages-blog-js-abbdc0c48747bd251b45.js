(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{"7Qib":function(e,a,t){"use strict";t.d(a,"a",(function(){return l.a})),t.d(a,"b",(function(){return r.b})),t.d(a,"c",(function(){return i}));var l=t("ElpU"),r=t("BYIe"),i={getImageMap:function(e,a,t,l){return void 0===t&&(t=!1),void 0===l&&(l=3),e.reduce((function(e,r){var i=r.node.relativePath.match(a)[0];if(t)if(e.hasOwnProperty(i))e[i].length<=l&&e[i].push(r.node.childImageSharp.fluid);else{var s=[];s.push(r.node.childImageSharp.fluid),e[i]=s}else e[i]=r.node.childImageSharp.fluid;return e}),{})},getInstitutionClass:function(e){return e.includes("Waterloo")?"waterloo-link":e.includes("Ottawa")?"ottawa-link":"nd-link"}}},vx99:function(e,a,t){"use strict";t.r(a),t.d(a,"query",(function(){return J}));var l=t("q1tI"),r=t.n(l),i=t("Kvkj"),s=t("7Qib"),o=t("7vrA"),n=t("k1TG"),c=t("8o2o"),d=t("TSYQ"),m=t.n(d),u=(t("K9S6"),r.a.forwardRef((function(e,a){var t=e.as,l=void 0===t?"div":t,i=e.className,s=e.type,o=void 0===s?"valid":s,d=e.tooltip,u=void 0!==d&&d,f=Object(c.a)(e,["as","className","type","tooltip"]);return r.a.createElement(l,Object(n.a)({},f,{ref:a,className:m()(i,o+"-"+(u?"tooltip":"feedback"))}))})));u.displayName="Feedback";var f=u,b=r.a.createContext({controlId:void 0}),v=t("vUet"),p=r.a.forwardRef((function(e,a){var t=e.id,i=e.bsPrefix,s=e.bsCustomPrefix,o=e.className,d=e.type,u=void 0===d?"checkbox":d,f=e.isValid,p=void 0!==f&&f,x=e.isInvalid,O=void 0!==x&&x,N=e.isStatic,j=e.as,h=void 0===j?"input":j,y=Object(c.a)(e,["id","bsPrefix","bsCustomPrefix","className","type","isValid","isInvalid","isStatic","as"]),w=Object(l.useContext)(b),P=w.controlId,I=w.custom?[s,"custom-control-input"]:[i,"form-check-input"],C=I[0],E=I[1];return i=Object(v.a)(C,E),r.a.createElement(h,Object(n.a)({},y,{ref:a,type:u,id:t||P,className:m()(o,i,p&&"is-valid",O&&"is-invalid",N&&"position-static")}))}));p.displayName="FormCheckInput";var x=p,O=r.a.forwardRef((function(e,a){var t=e.bsPrefix,i=e.bsCustomPrefix,s=e.className,o=e.htmlFor,d=Object(c.a)(e,["bsPrefix","bsCustomPrefix","className","htmlFor"]),u=Object(l.useContext)(b),f=u.controlId,p=u.custom?[i,"custom-control-label"]:[t,"form-check-label"],x=p[0],O=p[1];return t=Object(v.a)(x,O),r.a.createElement("label",Object(n.a)({},d,{ref:a,htmlFor:o||f,className:m()(s,t)}))}));O.displayName="FormCheckLabel";var N=O,j=r.a.forwardRef((function(e,a){var t=e.id,i=e.bsPrefix,s=e.bsCustomPrefix,o=e.inline,d=void 0!==o&&o,u=e.disabled,p=void 0!==u&&u,O=e.isValid,j=void 0!==O&&O,h=e.isInvalid,y=void 0!==h&&h,w=e.feedbackTooltip,P=void 0!==w&&w,I=e.feedback,C=e.className,E=e.style,g=e.title,F=void 0===g?"":g,k=e.type,R=void 0===k?"checkbox":k,L=e.label,S=e.children,V=e.custom,T=e.as,M=void 0===T?"input":T,z=Object(c.a)(e,["id","bsPrefix","bsCustomPrefix","inline","disabled","isValid","isInvalid","feedbackTooltip","feedback","className","style","title","type","label","children","custom","as"]),q="switch"===R||V,A=q?[s,"custom-control"]:[i,"form-check"],B=A[0],D=A[1];i=Object(v.a)(B,D);var G=Object(l.useContext)(b).controlId,J=Object(l.useMemo)((function(){return{controlId:t||G,custom:q}}),[G,q,t]),Q=null!=L&&!1!==L&&!S,Y=r.a.createElement(x,Object(n.a)({},z,{type:"switch"===R?"checkbox":R,ref:a,isValid:j,isInvalid:y,isStatic:!Q,disabled:p,as:M}));return r.a.createElement(b.Provider,{value:J},r.a.createElement("div",{style:E,className:m()(C,i,q&&"custom-"+R,d&&i+"-inline")},S||r.a.createElement(r.a.Fragment,null,Y,Q&&r.a.createElement(N,{title:F},L),(j||y)&&r.a.createElement(f,{type:j?"valid":"invalid",tooltip:P},I))))}));j.displayName="FormCheck",j.Input=x,j.Label=N;var h=j,y=r.a.forwardRef((function(e,a){var t=e.id,i=e.bsPrefix,s=e.bsCustomPrefix,o=e.className,d=e.isValid,u=e.isInvalid,f=e.lang,p=e.as,x=void 0===p?"input":p,O=Object(c.a)(e,["id","bsPrefix","bsCustomPrefix","className","isValid","isInvalid","lang","as"]),N=Object(l.useContext)(b),j=N.controlId,h=N.custom?[s,"custom-file-input"]:[i,"form-control-file"],y=h[0],w=h[1];return i=Object(v.a)(y,w),r.a.createElement(x,Object(n.a)({},O,{ref:a,id:t||j,type:"file",lang:f,className:m()(o,i,d&&"is-valid",u&&"is-invalid")}))}));y.displayName="FormFileInput";var w=y,P=r.a.forwardRef((function(e,a){var t=e.bsPrefix,i=e.bsCustomPrefix,s=e.className,o=e.htmlFor,d=Object(c.a)(e,["bsPrefix","bsCustomPrefix","className","htmlFor"]),u=Object(l.useContext)(b),f=u.controlId,p=u.custom?[i,"custom-file-label"]:[t,"form-file-label"],x=p[0],O=p[1];return t=Object(v.a)(x,O),r.a.createElement("label",Object(n.a)({},d,{ref:a,htmlFor:o||f,className:m()(s,t),"data-browse":d["data-browse"]}))}));P.displayName="FormFileLabel";var I=P,C=r.a.forwardRef((function(e,a){var t=e.id,i=e.bsPrefix,s=e.bsCustomPrefix,o=e.disabled,d=void 0!==o&&o,u=e.isValid,p=void 0!==u&&u,x=e.isInvalid,O=void 0!==x&&x,N=e.feedbackTooltip,j=void 0!==N&&N,h=e.feedback,y=e.className,P=e.style,C=e.label,E=e.children,g=e.custom,F=e.lang,k=e["data-browse"],R=e.as,L=void 0===R?"div":R,S=e.inputAs,V=void 0===S?"input":S,T=Object(c.a)(e,["id","bsPrefix","bsCustomPrefix","disabled","isValid","isInvalid","feedbackTooltip","feedback","className","style","label","children","custom","lang","data-browse","as","inputAs"]),M=g?[s,"custom"]:[i,"form-file"],z=M[0],q=M[1];i=Object(v.a)(z,q);var A=Object(l.useContext)(b).controlId,B=Object(l.useMemo)((function(){return{controlId:t||A,custom:g}}),[A,g,t]),D=null!=C&&!1!==C&&!E,G=r.a.createElement(w,Object(n.a)({},T,{ref:a,isValid:p,isInvalid:O,disabled:d,as:V,lang:F}));return r.a.createElement(b.Provider,{value:B},r.a.createElement(L,{style:P,className:m()(y,i,g&&"custom-file")},E||r.a.createElement(r.a.Fragment,null,g?r.a.createElement(r.a.Fragment,null,G,D&&r.a.createElement(I,{"data-browse":k},C)):r.a.createElement(r.a.Fragment,null,D&&r.a.createElement(I,null,C),G),(p||O)&&r.a.createElement(f,{type:p?"valid":"invalid",tooltip:j},h))))}));C.displayName="FormFile",C.Input=w,C.Label=I;var E=C,g=(t("2W6z"),r.a.forwardRef((function(e,a){var t,i,s=e.bsPrefix,o=e.bsCustomPrefix,d=e.type,u=e.size,f=e.htmlSize,p=e.id,x=e.className,O=e.isValid,N=void 0!==O&&O,j=e.isInvalid,h=void 0!==j&&j,y=e.plaintext,w=e.readOnly,P=e.custom,I=e.as,C=void 0===I?"input":I,E=Object(c.a)(e,["bsPrefix","bsCustomPrefix","type","size","htmlSize","id","className","isValid","isInvalid","plaintext","readOnly","custom","as"]),g=Object(l.useContext)(b).controlId,F=P?[o,"custom"]:[s,"form-control"],k=F[0],R=F[1];if(s=Object(v.a)(k,R),y)(i={})[s+"-plaintext"]=!0,t=i;else if("file"===d){var L;(L={})[s+"-file"]=!0,t=L}else if("range"===d){var S;(S={})[s+"-range"]=!0,t=S}else if("select"===C&&P){var V;(V={})[s+"-select"]=!0,V[s+"-select-"+u]=u,t=V}else{var T;(T={})[s]=!0,T[s+"-"+u]=u,t=T}return r.a.createElement(C,Object(n.a)({},E,{type:d,size:f,ref:a,readOnly:w,id:p||g,className:m()(x,t,N&&"is-valid",h&&"is-invalid")}))})));g.displayName="FormControl";var F=Object.assign(g,{Feedback:f}),k=r.a.forwardRef((function(e,a){var t=e.bsPrefix,i=e.className,s=e.children,o=e.controlId,d=e.as,u=void 0===d?"div":d,f=Object(c.a)(e,["bsPrefix","className","children","controlId","as"]);t=Object(v.a)(t,"form-group");var p=Object(l.useMemo)((function(){return{controlId:o}}),[o]);return r.a.createElement(b.Provider,{value:p},r.a.createElement(u,Object(n.a)({},f,{ref:a,className:m()(i,t)}),s))}));k.displayName="FormGroup";var R=k,L=t("JI6e"),S=r.a.forwardRef((function(e,a){var t=e.as,i=void 0===t?"label":t,s=e.bsPrefix,o=e.column,d=e.srOnly,u=e.className,f=e.htmlFor,p=Object(c.a)(e,["as","bsPrefix","column","srOnly","className","htmlFor"]),x=Object(l.useContext)(b).controlId;s=Object(v.a)(s,"form-label");var O="col-form-label";"string"==typeof o&&(O=O+"-"+o);var N=m()(u,s,d&&"sr-only",o&&O);return f=f||x,o?r.a.createElement(L.a,Object(n.a)({as:"label",className:N,htmlFor:f},p)):r.a.createElement(i,Object(n.a)({ref:a,className:N,htmlFor:f},p))}));S.displayName="FormLabel",S.defaultProps={column:!1,srOnly:!1};var V=S,T=r.a.forwardRef((function(e,a){var t=e.bsPrefix,l=e.className,i=e.as,s=void 0===i?"small":i,o=e.muted,d=Object(c.a)(e,["bsPrefix","className","as","muted"]);return t=Object(v.a)(t,"form-text"),r.a.createElement(s,Object(n.a)({},d,{ref:a,className:m()(l,t,o&&"text-muted")}))}));T.displayName="FormText";var M=T,z=r.a.forwardRef((function(e,a){return r.a.createElement(h,Object(n.a)({},e,{ref:a,type:"switch"}))}));z.displayName="Switch",z.Input=h.Input,z.Label=h.Label;var q=z,A=t("YdCC"),B=Object(A.a)("form-row"),D=r.a.forwardRef((function(e,a){var t=e.bsPrefix,l=e.inline,i=e.className,s=e.validated,o=e.as,d=void 0===o?"form":o,u=Object(c.a)(e,["bsPrefix","inline","className","validated","as"]);return t=Object(v.a)(t,"form"),r.a.createElement(d,Object(n.a)({},u,{ref:a,className:m()(i,s&&"was-validated",l&&t+"-inline")}))}));D.displayName="Form",D.defaultProps={inline:!1},D.Row=B,D.Group=R,D.Control=F,D.Check=h,D.File=E,D.Switch=q,D.Label=V,D.Text=M;var G=D,J=(a.default=function(e){var a=e.data,t=Object(l.useState)({filteredData:[],query:""}),n=t[0],c=t[1],d=a.allFile.edges||[],m=a.allMarkdownRemark.edges||[],u=s.c.getImageMap(d,/\/[blog].*\/|$/),f=n.filteredData,b=""!==n.query?f:m;return r.a.createElement(i.c,null,r.a.createElement(s.a,{title:"Blog"}),r.a.createElement(i.d,{title:"My Blog"}),r.a.createElement(o.a,{className:"px-5 mb-5 text-center"},r.a.createElement(G,{className:"aurebesh blog-filter"},r.a.createElement(F,{className:"bg-none search",type:"text",placeholder:"Search",onChange:function(e){var a=e.target.value,t=m.filter((function(e){var t=e.node.frontmatter,l=t.description,r=t.title,i=t.tags,s=t.author,o=a.toLowerCase();return e.node.excerpt.toLowerCase().includes(o)||l&&l.toLowerCase().includes(o)||r.toLowerCase().includes(o)||s.toLowerCase().includes(o)||i&&i.join(" ").toLowerCase().includes(o)}));c({query:a,filteredData:t})}}))),r.a.createElement(o.a,{className:"m-auto text-left"},r.a.createElement("div",{class:"row"},b.map((function(e){var a=e.node;return r.a.createElement("div",{key:a.id,className:"my-2 my-md-4 col"},r.a.createElement(i.a,{to:a.fields.slug,featuredImage:u[a.fields.slug],title:a.frontmatter.title,subtitle:a.frontmatter.date,excerpt:a.frontmatter.excerpt||a.excerpt}))})))))},"653322769")}}]);
//# sourceMappingURL=component---src-pages-blog-js-abbdc0c48747bd251b45.js.map