(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{"2mvg":function(e,a,t){"use strict";var n=t("k1TG"),l=t("8o2o"),r=t("TSYQ"),o=t.n(r),c=t("q1tI"),i=t.n(c),s=t("17x9"),m=t.n(s),u=t("vUet"),d=(m.a.string,m.a.bool,m.a.bool,m.a.bool,m.a.bool,i.a.forwardRef((function(e,a){var t=e.bsPrefix,r=e.className,c=e.fluid,s=e.rounded,m=e.roundedCircle,d=e.thumbnail,h=Object(l.a)(e,["bsPrefix","className","fluid","rounded","roundedCircle","thumbnail"]);t=Object(u.a)(t,"img");var p=o()(c&&t+"-fluid",s&&"rounded",m&&"rounded-circle",d&&t+"-thumbnail");return i.a.createElement("img",Object(n.a)({ref:a},h,{className:o()(r,p)}))})));d.displayName="Image",d.defaultProps={fluid:!1,rounded:!1,roundedCircle:!1,thumbnail:!1},a.a=d},"3XHS":function(e,a,t){"use strict";t.r(a),t.d(a,"query",(function(){return u}));var n=t("q1tI"),l=t.n(n),r=t("Kvkj"),o=t("7vrA"),c=t("2mvg"),i=t("Wbzz"),s=t("7Qib"),m=t("IP2g");a.default=function(e){var a=e.data,t=function(e){var a=e.title,t=e.author,n=e.link;return l.a.createElement("li",{key:a,style:{color:"gray"},className:"mb-3"},l.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:n},a),l.a.createElement("br",null),l.a.createElement("span",{style:{color:"gray",fontSize:"0.85em"},className:"d-md-inline-flex"}," ",l.a.createElement("i",null,t)),l.a.createElement("br",null))},u=a.site.siteMetadata,d=u.author,h=u.readingList,p=u.showsList,f=u.moviesList,E=u.designations,g=u.unemployed,b=Object(n.useContext)(s.b).toString,w=h.map((function(e){return t(e)})),y=p.map((function(e){return t(e)})),N=f.map((function(e){return t(e)}));return l.a.createElement(r.c,null,l.a.createElement(s.a,{title:"About Me"}),l.a.createElement(r.d,{title:"About Me"}),l.a.createElement(o.a,null,l.a.createElement(c.a,{rounded:!0,width:"140",height:"140",src:"../../icons/luke-"+b()+".png",alt:d}),l.a.createElement("article",{className:"w-75 m-auto pt-2 text-justify p-large"},l.a.createElement("p",{className:"text-center"},E.map((function(e,a){return l.a.createElement("span",{key:e}," ",l.a.createElement("b",null,e)," ",a<E.length-1&&l.a.createElement(l.a.Fragment,null,"||"))}))),l.a.createElement("p",{className:"i-5 mt-md-4 pt-md-2 mb-md-4"},"Hello there! My name is ",l.a.createElement("b",null,""+d),". I am a ",l.a.createElement("a",{href:"https://www.dictionary.com/e/fictional-characters/padawan/",target:"_blank",rel:"noopener noreferrer"},"padawan")," developer discovering the ways of the ",l.a.createElement("code",null,"code"),"."),l.a.createElement("p",{className:"i-5"},"I've had the privilege of studying Software Engineering at both the"," ",l.a.createElement(c.a,{width:"20",height:"24",src:"../../icons/uwaterloo.png",className:"align-bottom m-0"})," ",l.a.createElement("a",{href:"https://uwaterloo.ca/",target:"_blank",rel:"noopener noreferrer",className:"uwaterloo"},l.a.createElement("b",null,"University of Waterloo"))," ","and the"," ",l.a.createElement(c.a,{width:"33",height:"26",src:"../../icons/uottawa.png",className:"align-bottom m-0"})," ",l.a.createElement("a",{href:"https://www.uottawa.ca/en",target:"_blank",rel:"noopener noreferrer",className:"uottawa"},l.a.createElement("b",null,"University of Ottawa"))," ","and graduating from the former with a B.SE in September 2018. Studying at these institutions granted me the opportunity to gain exposure to a spectrum of industries including healthcare, ed-tech and fintech. It allowed me to discover a lot about what parts of coding I enjoy and what parts I don't."),l.a.createElement("p",{className:"i-5"},"My technical interests lie in ",l.a.createElement("b",null,"front-end, full-stack")," and",l.a.createElement("b",null," iOS development"),". I have the most experience with ",l.a.createElement("code",null,"JavaScript")," based frameworks and technologies: ",l.a.createElement("code",null,"React.js"),", ",l.a.createElement("code",null,"Gatsby.js"),", ",l.a.createElement("code",null,"Node.js")," and ",l.a.createElement("code",null,"Express.js"),". I am currently enjoying learning ",l.a.createElement("code",null,"SwiftUI"),", the new mobile framework for ",l.a.createElement("code",null,"Swift")," while quarantining in Ontario, Canada 🇨🇦."," ",l.a.createElement("i",null,l.a.createElement("small",null,"#StayHomeStaySafe"))),l.a.createElement("p",{className:"i-5"},"When I am not coding, you can find me doing one or more of: playing ",l.a.createElement("a",{href:"https://store.steampowered.com/app/381210/Dead_by_Daylight/",target:"_blank",rel:"noopener noreferrer"},"Dead By Daylight"),", karting on weekends, tutoring part-time or desperately trying to beat a 10-year-old"," ",l.a.createElement("a",{href:"https://www.playmagnus.com/en",target:"_blank",rel:"noopener noreferrer"},"Magnus Carlsen")," at chess. I also aim to read one chapter a day."),l.a.createElement("p",{className:"i-5"},"Check out my ",l.a.createElement(i.Link,{to:"/projects"},"projects")," to see what I've been up to! Or check out my ",l.a.createElement(i.Link,{to:"/blog"},"blog")," to see what's recently caught my eye!")),l.a.createElement("article",{className:"w-75 m-auto"},g&&l.a.createElement(l.a.Fragment,null,l.a.createElement("hr",null),l.a.createElement("p",{className:"unemployed"},l.a.createElement("small",null,"I am ",l.a.createElement("b",null,"currently looking for new opportunities"),"! If you like what you ",l.a.createElement(i.Link,{to:"/resume"},"see"),", let's get in ",l.a.createElement("a",{href:"https://www.linkedin.com/in/surudh-bhutani/",target:"_blank",rel:"noopener noreferrer"},"touch"),"!"))),l.a.createElement("hr",null),l.a.createElement("div",{className:"row p-large"},l.a.createElement("div",{className:"col-md-6"},l.a.createElement(m.a,{icon:["fas","journal-whills"],className:"about-icons mt-4 books",title:"Reading List"}),l.a.createElement("h3",{className:"watch-list-title mt-2"},"Reading List"),l.a.createElement("ul",{className:"pl-0 mx-3 list-unstyled"},w)),l.a.createElement("div",{className:"col-md-6"},l.a.createElement(m.a,{icon:["fas","tv"],className:"about-icons mt-4 shows",title:"Reading List"}),l.a.createElement("h3",{className:"watch-list-title mt-2"},"Binge List"),l.a.createElement("ul",{className:"pl-0 mx-3 list-unstyled"},y)),l.a.createElement("div",{className:"col-md-6"},l.a.createElement(m.a,{icon:["fas","film"],className:"about-icons mt-4 movies",title:"Reading List"}),l.a.createElement("h3",{className:"watch-list-title mt-2"},"Watch List"),l.a.createElement("ul",{className:"pl-0 mx-3 list-unstyled"},N)),l.a.createElement("div",{className:"col-md-6"},l.a.createElement(m.a,{icon:["fas","pen-nib"],className:"about-icons mt-4 poetry",title:"Reading List"}),l.a.createElement("h3",{className:"watch-list-title mt-2"},"Girlfriend's tumblr:"),l.a.createElement("p",null,l.a.createElement("a",{href:"https://monicaiyer.tumblr.com/",target:"_blank",rel:"noopener noreferrer"},"mind tricks and other paraphernalia"),l.a.createElement("br",null),l.a.createElement("span",{style:{color:"gray",fontSize:"0.85em"},className:"d-md-inline-flex"},l.a.createElement("i",{className:"m-auto"},"Monica Iyer"))))))))};var u="4053861171"},"7Qib":function(e,a,t){"use strict";t.d(a,"a",(function(){return n.a})),t.d(a,"b",(function(){return l.b})),t.d(a,"c",(function(){return r}));var n=t("ElpU"),l=t("BYIe"),r={getImageMap:function(e,a,t,n){return void 0===t&&(t=!1),void 0===n&&(n=3),e.reduce((function(e,l){var r=l.node.relativePath.match(a)[0];if(t)if(e.hasOwnProperty(r))e[r].length<=n&&e[r].push(l.node.childImageSharp.fluid);else{var o=[];o.push(l.node.childImageSharp.fluid),e[r]=o}else e[r]=l.node.childImageSharp.fluid;return e}),{})},getInstitutionClass:function(e){return e.includes("Waterloo")?"waterloo-link":e.includes("Ottawa")?"ottawa-link":"nd-link"}}}}]);
//# sourceMappingURL=component---src-pages-about-js-bb90f675b1bbcfd6fe3d.js.map