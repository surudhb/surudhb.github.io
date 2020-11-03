import React from "react"
import { graphql } from "gatsby"
import { PageLayout, PageTitle, ProjectLink } from "../components"
import { SEO, Utils } from "../utils"
import Container from "react-bootstrap/Container"

export default ({ data }) => {
  const allProjects = data.allMarkdownRemark.edges || []
  const allFeaturedImages = data.allFile.edges || []
  const regex = /\/[projects].*\/|$/
  const featuredImageMap = Utils.getImageMap(allFeaturedImages, regex, true, 3)

  return (
    <PageLayout>
      <SEO title="Projects" />
      <PageTitle title="Projects" />
      <div className="text-left">
        <div className="row">
          {allProjects.map(({ node }) => (
            <div className="col">
              <ProjectLink
                key={node.id}
                to={node.fields.slug}
                featuredImages={featuredImageMap[node.fields.slug]}
                {...node.frontmatter}
              />
              </div>
          ))}
        </div>
      </div>
    </PageLayout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/projects/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      totalCount
      edges {
        node {
          id
          timeToRead
          frontmatter {
            title
            github
            live
            inProgress
            tags
            date(formatString: "DD MMMM, YYYY")
          }
          fields {
            slug
          }
        }
      }
    }
    allFile(
      filter: {
        extension: { eq: "png" }
        relativePath: { regex: "/feature/" }
        relativeDirectory: { regex: "/content/projects/" }
      }
    ) {
      edges {
        node {
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
          }
          relativePath
        }
      }
    }
  }
`
