/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  siteMetadata: {
    firstName: `Surudh`,
    lastName: `Bhutani`,
    title: `Surudh Bhutani`,
    author: `Surudh Bhutani`,
    description: `Surudh Bhutani's personal site`,
    occupation: `Software Engineer`,
    keywords: [
      `Surudh`,
      `Bhutani`,
      `Personal`,
      `Blog`,
      `Resume`,
      `Projects`,
      `Work`,
      `Github`,
      `LinkedIn`,
    ],
    siteUrl:
      process.env.URL || process.env.DEPLOY_URL || `http://localhost:8000`,
    unemployed: true,
    designations: [
      `High-School Chess Champ`,
      `UWaterloo S.Eng.`,
      `Full-Stack Dev`,
      `Skydiver`,
      `Rev-head`,
    ],
    institutions: [
      {
        company: `University of Waterloo`,
        link: `https://uwaterloo.ca/software-engineering/`,
        position: `B.SE Software Engineering (Honours, Graduate)`,
        startDate: `September, 2014`,
        endDate: `September 2018`,
        slug: `uwaterloo`,
      },
      {
        company: `University of Ottawa`,
        link: `https://engineering.uottawa.ca/undergraduate-programs/software-engineering`,
        position: `B.SE Software Engineering (Honours, Dean's List, Year 1)`,
        startDate: `September, 2013`,
        endDate: `April 2014`,
        slug: `uottawa`,
      },
      {
        company: `Notre Dame CSS`,
        link: `https://www3.dpcdsb.org/NDAME/guidance-courses/i-b-program`,
        position: `High School, IB Programme (Honour Roll)`,
        startDate: `September, 2009`,
        endDate: `April 2013`,
        slug: `ndame`,
      },
    ],
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
        title: `The Gene: An Intimate History`,
        author: `Siddhartha Mukherjee`,
        link: `https://www.goodreads.com/book/show/27276428-the-gene`,
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
        title: `Star Wars: The Clone Wars`,
        author: `George Lucas, Dave Filoni`,
        link: `https://www.imdb.com/title/tt0458290/`,
      },
      {
        title: `The Office`,
        author: `Greg Daniels, Ricky Gervais, Stephen Merchant`,
        link: `https://www.imdb.com/title/tt0386676/`,
      },
    ],
    moviesList: [
      {
        title: `Ex Machina`,
        author: `Alex Garland`,
        link: `https://www.imdb.com/title/tt0470752/`,
      },
      {
        title: `The Lunchbox`,
        author: `Ritesh Batra`,
        link: `https://www.imdb.com/title/tt2350496/`,
      },
      {
        title: `Nightcrawler`,
        author: `Dan Gilroy`,
        link: `https://www.imdb.com/title/tt2872718/`,
      },
      {
        title: `Mad Max: Fury Road`,
        author: `George Miller`,
        link: `https://www.imdb.com/title/tt1392190/`,
      },
    ],
    dialogues: {
      light: [
        "I am a frontend developer",
        "I studied Software Engineering at the University of Waterloo",
        "Thanks for checking out my website!",
        "I enjoy learning from Frontend Masters",
        "CSS doesn't scare me... that much",
        "Like what you see? Let's get in touch!",
        "I hope to become the mythical full stack developer",
        "I am no jedi, but I am a believer in the high ground",
        "Stay safe! Wear a mask! We will get through this :)",
        "Don't like the theme? Click the toggle button in the menu",
        "#eminem { word-spacing: 0; }",
      ],
      dark: [
        "I am a frontend developer",
        "I studied Software Engineering at the University of Waterloo",
        "Stay safe! Wear a mask! We will get through this :)",
        "Don't like the theme? Click the toggle button in the menu",
        "CSS doesn't scare me... that much",
        "I enjoy learning from Frontend Masters",
        "I hope to become the mythical full stack developer",
        "Like what you see? Let's get in touch!",
        "I find your lack of faith disturbing",
        "Thanks for checking out my website!",
        "#tower-of-pisa { font-style: italic; }",
      ],
    },
  },
  plugins: [
    `gatsby-plugin-preload-link-crossorigin`,
    `gatsby-plugin-catch-links`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: "src",
        path: `${__dirname}/src/`,
      },
    },
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        excerpt_separator: `<!-- end -->`,
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
            },
          },
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Surudh Bhutani's Personal Site`,
        short_name: `S.Bhutani`,
        description: `This is my personal site.`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#fff`,
        display: `standalone`,
        icon: `${__dirname}/static/favicon.ico`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-plugin-google-fonts",
      options: {
        fonts: ["Raleway:300,400"],
        display: "swap",
      },
    },
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: `tomato`,
        showSpinner: true,
      },
    },
  ],
}
