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
    about: `This is a blurb about me because I cant decide what to actually put here`,
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
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Surudh Bhutani's Personal Site`,
        short_name: `Surudh Bhutani`,
        description: `This is my personal site.`,
        start_url: `/`,
        icon: `${__dirname}/favicons/surudh-bhutani-512x512.png`, // This path is relative to the root of the site.
      },
    },
  ],
}
