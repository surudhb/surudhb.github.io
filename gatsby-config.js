/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: `Surudh Bhutani`,
    author: `Surudh Bhutani`,
    description: `Surudh Bhutani's personal website. Check out my resume, projects and blog.`,
    keywords: [
      `Surudh`,
      `Bhutani`,
      `personal`,
      `site`,
      `software`,
      `developer`,
      `resume`,
      `portfolio`,
      `blog`,
      `projects`,
      `github`,
      `email`,
      `linkedin`,
      `University of Waterloo`,
      `University of Ottawa`,
      `Software Engineering`,
      `BSE`,
    ],
    twitterUsername: `@SurudhB2909`,
    url: process.env.URL || process.env.DEPLOY_URL || ``,
    image: `./static/c3po-toggle.png`,
    unemployed: true,
    education: [`University of Waterloo`, `University of Ottawa`],
    technicalLanguages: [
      `Node.js`,
      `React.js`,
      `Swift`,
      `Java`,
      `C/C++`,
      `RoR`,
    ],
    languages: [`English`, `Hindi`, `Aurebesh`],
    technologies: [`Docker`, `Git`, `Jira`, `Heroku`, `Puppet`, `Postman`],
    technicalInterests: [
      `Node.js`,
      `React.js`,
      `Full-stack development`,
      `Back-end development`,
      `Automation`,
    ],
    interests: [`Comic books`, `Star Wars`, `Avatar`, `Hiking`, `Pro-karting`],
    readingList: [
      {
        title: `Sapiens: A Brief History of Humankind`,
        author: `Yuval Noah Harari`,
        link: `https://www.goodreads.com/book/show/23692271-sapiens`,
      },
      {
        title: `Behave: The Biology of Humans at our Best and Worst`,
        author: `Robert Sapolsky`,
        link: `https://www.goodreads.com/book/show/31170723-behave`,
      },
      {
        title: `Homo Deus: A History of Tomorrow`,
        author: `Yuval Noah Harari`,
        link: `https://www.goodreads.com/book/show/31138556-homo-deus`,
      },
      {
        title: `The Gene: An Intimate History`,
        author: `Siddhartha Mukeherjee`,
        link: `https://www.goodreads.com/book/show/27276428-the-gene`,
      },
      {
        title: `The Emperor of All Maladies: A Biography of Cancer`,
        author: `Siddhartha Mukeherjee`,
        link: `https://www.goodreads.com/book/show/7170627-the-emperor-of-all-maladies`,
      },
      {
        title: `The Body Keeps the Score: Brain, Mind, and Body in the Healing of Trauma`,
        author: `Bessel A. van der Kolk`,
        link: `https://www.goodreads.com/book/show/18693771-the-body-keeps-the-score`,
      },
    ],
    showsList: [
      {
        title: `Avatar: The Last Airbender`,
        author: `Micheal DiMartino, Bryan Konietzko`,
        link: `https://www.imdb.com/title/tt0417299/`,
      },
      {
        title: `Love, Death & Robots`,
        author: `Tim Miller`,
        link: `https://www.imdb.com/title/tt9561862/`,
      },
      {
        title: `Batman: The Animated Series`,
        author: `Bob Kane, Eric Radomski, Bruce Timm `,
        link: `https://www.imdb.com/title/tt0103359/`,
      },
      {
        title: `Star Wars: The Clone Wars`,
        author: `George Lucas, Dave Filoni`,
        link: `https://www.imdb.com/title/tt0458290/`,
      },
      {
        title: `Rick and Morty`,
        author: ` Dan Harmon, Justin Roiland`,
        link: `https://www.imdb.com/title/tt2861424/`,
      },
      {
        title: `Death Note`,
        author: `Mamoru Miyano, Brad Swaile, Vincent Tong`,
        link: `https://www.imdb.com/title/tt0877057/`,
      },
    ],
    moviesList: [
      {
        title: `Ex Machina`,
        author: `Alex Garland`,
        link: `https://www.imdb.com/title/tt0470752/`,
      },
      {
        title: `The Matrix`,
        author: `The Wachowski Brothers`,
        link: `https://www.imdb.com/title/tt0133093/`,
      },
      {
        title: `The Lunchbox`,
        author: `Ritesh Batra`,
        link: `https://www.imdb.com/title/tt2350496/`,
      },
    ],
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: "src",
        path: `${__dirname}/src/`,
      },
    },
    `gatsby-plugin-sass`,
    `gatsby-transformer-remark`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Surudh Bhutani's Personal Site`,
        short_name: `Surudh Bhutani`,
        description: `This is my personal site.`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#fff`,
        display: `standalone`,
        icon: `${__dirname}/favicons/surudh-bhutani-512x512.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
  ],
}
