(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{"7Qib":function(e,t,a){"use strict";a.d(t,"a",(function(){return r.a})),a.d(t,"b",(function(){return n.b})),a.d(t,"c",(function(){return l}));var r=a("ElpU"),n=a("BYIe"),l={getImageMap:function(e,t,a,r){return void 0===a&&(a=!1),void 0===r&&(r=3),e.reduce((function(e,n){var l=n.node.relativePath.match(t)[0];if(a)if(e.hasOwnProperty(l))e[l].length<=r&&e[l].push(n.node.childImageSharp.fluid);else{var o=[];o.push(n.node.childImageSharp.fluid),e[l]=o}else e[l]=n.node.childImageSharp.fluid;return e}),{})},getInstitutionClass:function(e){return e.includes("Waterloo")?"waterloo-link":e.includes("Ottawa")?"ottawa-link":"nd-link"}}},vx99:function(e,t,a){"use strict";a.r(t),a.d(t,"query",(function(){return s}));var r=a("q1tI"),n=a.n(r),l=a("Kvkj"),o=a("7Qib"),i=a("7vrA"),c=a("QojX"),u=a("jDKy");t.default=function(e){var t=e.data,a=Object(r.useState)({filteredData:[],query:""}),s=a[0],d=a[1],f=t.allFile.edges||[],m=t.allMarkdownRemark.edges||[],p=o.c.getImageMap(f,/\/[blog].*\/|$/),g=s.filteredData,h=""!==s.query?g:m;return n.a.createElement(l.c,null,n.a.createElement(o.a,{title:"Blog"}),n.a.createElement(l.d,{title:"My Blog"}),n.a.createElement(i.a,{className:"px-5 mb-5 text-center"},n.a.createElement(c.a,{className:"aurebesh blog-filter"},n.a.createElement(u.a,{className:"bg-none search",type:"text",placeholder:"Search",onChange:function(e){var t=e.target.value,a=m.filter((function(e){var a=e.node.frontmatter,r=a.description,n=a.title,l=a.tags,o=a.author,i=t.toLowerCase();return e.node.excerpt.toLowerCase().includes(i)||r&&r.toLowerCase().includes(i)||n.toLowerCase().includes(i)||o.toLowerCase().includes(i)||l&&l.join(" ").toLowerCase().includes(i)}));d({query:t,filteredData:a})}}))),n.a.createElement(i.a,{fluid:!0,className:"p-3 w-auto text-left d-flex flex-wrap justify-content-center"},h.map((function(e){var t=e.node;return n.a.createElement("div",{key:t.id,className:"p-3"},n.a.createElement(l.a,{to:t.fields.slug,featuredImage:p[t.fields.slug],title:t.frontmatter.title,subtitle:t.frontmatter.date,excerpt:t.frontmatter.excerpt||t.excerpt}))}))))};var s="226217707"}}]);
//# sourceMappingURL=component---src-pages-blog-js-4de75f18e2bd2f345fa3.js.map