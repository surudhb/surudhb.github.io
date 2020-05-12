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
