(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{"16l3":function(e,t,a){"use strict";a.r(t),a.d(t,"query",(function(){return u}));var n=a("q1tI"),r=a.n(n),l=a("Kvkj"),i=a("7Qib"),c=a("7vrA");t.default=function(e){var t=e.data,a=t.allMarkdownRemark.edges||[],n=t.allFile.edges||[],u=i.c.getImageMap(n,/\/[projects].*\/|$/,!0,3);return r.a.createElement(l.c,null,r.a.createElement(i.a,{title:"Projects"}),r.a.createElement(l.d,{title:"Projects"}),r.a.createElement(c.a,{className:"text-left"},r.a.createElement("section",null,a.map((function(e){var t=e.node;return r.a.createElement("div",{key:t.id,className:"p-3"},r.a.createElement(l.e,Object.assign({to:t.fields.slug,featuredImages:u[t.fields.slug]},t.frontmatter)),r.a.createElement("hr",null))})))))};var u="945887971"},"7Qib":function(e,t,a){"use strict";a.d(t,"a",(function(){return n.a})),a.d(t,"b",(function(){return r.b})),a.d(t,"c",(function(){return l}));var n=a("ElpU"),r=a("BYIe"),l={getImageMap:function(e,t,a,n){return void 0===a&&(a=!1),void 0===n&&(n=3),e.reduce((function(e,r){var l=r.node.relativePath.match(t)[0];if(a)if(e.hasOwnProperty(l))e[l].length<=n&&e[l].push(r.node.childImageSharp.fluid);else{var i=[];i.push(r.node.childImageSharp.fluid),e[l]=i}else e[l]=r.node.childImageSharp.fluid;return e}),{})},getInstitutionClass:function(e){return e.includes("Waterloo")?"waterloo-link":e.includes("Ottawa")?"ottawa-link":"nd-link"}}}}]);
//# sourceMappingURL=component---src-pages-projects-js-93c0cb9b08371d24081c.js.map