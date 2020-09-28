(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{"2mvg":function(e,t,a){"use strict";var n=a("k1TG"),l=a("8o2o"),r=a("TSYQ"),o=a.n(r),c=a("q1tI"),i=a.n(c),s=a("17x9"),m=a.n(s),u=a("vUet"),d=(m.a.string,m.a.bool,m.a.bool,m.a.bool,m.a.bool,i.a.forwardRef((function(e,t){var a=e.bsPrefix,r=e.className,c=e.fluid,s=e.rounded,m=e.roundedCircle,d=e.thumbnail,h=Object(l.a)(e,["bsPrefix","className","fluid","rounded","roundedCircle","thumbnail"]);a=Object(u.a)(a,"img");var p=o()(c&&a+"-fluid",s&&"rounded",m&&"rounded-circle",d&&a+"-thumbnail");return i.a.createElement("img",Object(n.a)({ref:t},h,{className:o()(r,p)}))})));d.displayName="Image",d.defaultProps={fluid:!1,rounded:!1,roundedCircle:!1,thumbnail:!1},t.a=d},"3XHS":function(e,t,a){"use strict";a.r(t),a.d(t,"query",(function(){return u}));var n=a("q1tI"),l=a.n(n),r=a("Kvkj"),o=a("7vrA"),c=a("2mvg"),i=a("Wbzz"),s=a("7Qib"),m=a("IP2g");t.default=function(e){var t=e.data,a=function(e){var t=e.title,a=e.author,n=e.link;return l.a.createElement("li",{key:t,style:{color:"gray"},className:"mb-3"},l.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:n},t),l.a.createElement("br",null),l.a.createElement("span",{style:{color:"gray",fontSize:"0.85em"},className:"d-md-inline-flex"}," ",l.a.createElement("i",null,a)),l.a.createElement("br",null))},u=t.site.siteMetadata,d=u.author,h=u.readingList,p=u.showsList,f=u.moviesList,E=u.designations,g=u.unemployed,b=Object(n.useContext)(s.b).toString,w=h.map((function(e){return a(e)})),y=p.map((function(e){return a(e)})),v=f.map((function(e){return a(e)}));return l.a.createElement(r.c,null,l.a.createElement(s.a,{title:"About Me"}),l.a.createElement(r.d,{title:"About Me"}),l.a.createElement(o.a,null,l.a.createElement(c.a,{rounded:!0,width:"140",height:"140",src:"../../icons/luke-"+b()+".png",alt:d}),l.a.createElement("article",{className:"w-75 m-auto pt-2 text-justify p-large"},l.a.createElement("p",{className:"text-center"},E.map((function(e,t){return l.a.createElement("span",{key:e}," ",l.a.createElement("b",null,e)," ",t<E.length-1&&l.a.createElement(l.a.Fragment,null,"||"))}))),l.a.createElement("p",{className:"i-5 mt-md-4 pt-md-2 mb-md-4"},"Hello there! My name is ",l.a.createElement("b",null,""+d),". I am a ",l.a.createElement("a",{href:"https://www.dictionary.com/e/fictional-characters/padawan/",target:"_blank",rel:"noopener noreferrer"},"padawan")," developer discovering the ways of the ",l.a.createElement("code",null,"code"),"."),l.a.createElement("p",{className:"i-5"},"I've had the privilege of studying Software Engineering at both the"," ",l.a.createElement(c.a,{width:"20",height:"24",src:"../../icons/uwaterloo.png",className:"align-bottom m-0"})," ",l.a.createElement("a",{href:"https://uwaterloo.ca/",target:"_blank",rel:"noopener noreferrer",className:"uwaterloo"},l.a.createElement("b",null,"University of Waterloo"))," ","and the"," ",l.a.createElement(c.a,{width:"33",height:"26",src:"../../icons/uottawa.png",className:"align-bottom m-0"})," ",l.a.createElement("a",{href:"https://www.uottawa.ca/en",target:"_blank",rel:"noopener noreferrer",className:"uottawa"},l.a.createElement("b",null,"University of Ottawa"))," ","and graduating from the former with a B.SE in September 2018. Studying at these institutions granted me the opportunity to gain exposure to a spectrum of industries including healthcare, ed-tech and fintech. It allowed me to discover a lot about what parts of coding I enjoy and what parts I don't."),l.a.createElement("p",{className:"i-5"},"My technical interests lie in ",l.a.createElement("b",null,"front-end, full-stack")," and",l.a.createElement("b",null," iOS development"),". I have the most experience with ",l.a.createElement("code",null,"JavaScript")," based frameworks and technologies: ",l.a.createElement("code",null,"React.js"),", ",l.a.createElement("code",null,"Gatsby.js"),", ",l.a.createElement("code",null,"Node.js")," and ",l.a.createElement("code",null,"Express.js"),". I am currently enjoying learning ",l.a.createElement("code",null,"SwiftUI"),", the new mobile framework for ",l.a.createElement("code",null,"Swift")," while quarantining in Ontario, Canada 🇨🇦."," ",l.a.createElement("i",null,l.a.createElement("small",null,"#StayHomeStaySafe"))),l.a.createElement("p",{className:"i-5"},"When I am not coding, you can find me doing one or more of: playing ",l.a.createElement("a",{href:"https://store.steampowered.com/app/381210/Dead_by_Daylight/",target:"_blank",rel:"noopener noreferrer"},"Dead By Daylight"),", karting on weekends, tutoring part-time or desperately trying to beat a 10-year-old"," ",l.a.createElement("a",{href:"https://www.playmagnus.com/en",target:"_blank",rel:"noopener noreferrer"},"Magnus Carlsen")," at chess. I also aim to read one chapter a day."),l.a.createElement("p",{className:"i-5"},"Check out my ",l.a.createElement(i.Link,{to:"/projects"},"projects")," to see what I've been up to! Or check out my ",l.a.createElement(i.Link,{to:"/blog"},"blog")," to see what's recently caught my eye!")),l.a.createElement("article",{className:"w-75 m-auto"},g&&l.a.createElement(l.a.Fragment,null,l.a.createElement("hr",null),l.a.createElement("p",{className:"unemployed"},l.a.createElement("small",null,"I am ",l.a.createElement("b",null,"currently looking for new opportunities"),"! If you like what you ",l.a.createElement(i.Link,{to:"/resume"},"see"),", let's get in ",l.a.createElement("a",{href:"https://www.linkedin.com/in/surudh-bhutani/",target:"_blank",rel:"noopener noreferrer"},"touch"),"!"))),l.a.createElement("hr",null),l.a.createElement("div",{className:"row p-large"},l.a.createElement("div",{className:"col-6"},l.a.createElement(m.a,{icon:["fas","journal-whills"],className:"about-icons mt-4 books",title:"Reading List"}),l.a.createElement("h3",{className:"watch-list-title mt-2"},"Reading List"),l.a.createElement("ul",{className:"pl-0 mx-3 list-unstyled"},w)),l.a.createElement("div",{className:"col-6"},l.a.createElement(m.a,{icon:["fas","tv"],className:"about-icons mt-4 shows",title:"Reading List"}),l.a.createElement("h3",{className:"watch-list-title mt-2"},"Binge List"),l.a.createElement("ul",{className:"pl-0 mx-3 list-unstyled"},y)),l.a.createElement("div",{className:"col-6"},l.a.createElement(m.a,{icon:["fas","film"],className:"about-icons mt-4 movies",title:"Reading List"}),l.a.createElement("h3",{className:"watch-list-title mt-2"},"Watch List"),l.a.createElement("ul",{className:"pl-0 mx-3 list-unstyled"},v)),l.a.createElement("div",{className:"col-6"},l.a.createElement(m.a,{icon:["fas","pen-nib"],className:"about-icons mt-4 poetry",title:"Reading List"}),l.a.createElement("h3",{className:"watch-list-title mt-2"},"Girlfriend's tumblr:"),l.a.createElement("p",null,l.a.createElement("a",{href:"https://monicaiyer.tumblr.com/",target:"_blank",rel:"noopener noreferrer"},"mind tricks and other paraphernalia")," ",l.a.createElement("span",{style:{color:"gray",fontSize:"0.85em"},className:"d-md-inline-flex"},l.a.createElement("i",null,"Monica Iyer"))))))))};var u="4053861171"},"7Qib":function(e,t,a){"use strict";a.d(t,"a",(function(){return n.a})),a.d(t,"b",(function(){return l.b})),a.d(t,"c",(function(){return r}));var n=a("ElpU"),l=a("BYIe"),r={getImageMap:function(e,t,a,n){return void 0===a&&(a=!1),void 0===n&&(n=3),e.reduce((function(e,l){var r=l.node.relativePath.match(t)[0];if(a)if(e.hasOwnProperty(r))e[r].length<=n&&e[r].push(l.node.childImageSharp.fluid);else{var o=[];o.push(l.node.childImageSharp.fluid),e[r]=o}else e[r]=l.node.childImageSharp.fluid;return e}),{})},getInstitutionClass:function(e){return e.includes("Waterloo")?"waterloo-link":e.includes("Ottawa")?"ottawa-link":"nd-link"}}}}]);
//# sourceMappingURL=component---src-pages-about-js-f15b4da60ec48834610f.js.map