import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

export default () => {
  const { author } = useStaticQuery(query).site.siteMetadata
  return (
    <div
      style={{ fontSize: "0.9rem" }}
      className="mt-2 py-3 msx-0 footer text-muted text-center"
    >
      <span className="m-auto">
        <b>{author}</b> &copy; {new Date().getFullYear()}. Made with&nbsp;
        <span className="heart">&nbsp;❤&nbsp;</span> &&nbsp;
        <a className="gatsby-logo" href="https://www.gatsbyjs.org/">
          Gatsby
        </a>
      </span>
      {/* <span className="ml-5 nav-links">
        <small>
          <Link className="ml-3" to="/experiments">
            Experiments
          </Link>
          <Link className="ml-3" to="/timeline">
            Timeline
          </Link>
          <Link className="ml-3" to="/sitemap">
            Sitemap
          </Link>
        </small>
      </span> */}
    </div>
  )
}
const query = graphql`
  query Author {
    site {
      siteMetadata {
        author
      }
    }
  }
`
