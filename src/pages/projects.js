import React from "react"
import { graphql } from "gatsby"
import { Layout, JumboTitle, ProjectLink } from "../components/Components"
import { Container } from "react-bootstrap"
import ThemeContext from "../utils/theme-context"

export default ({ data }) => {
  const allProjects = data.allMarkdownRemark.edges || []

  const allFeaturedImages = data.allFile.edges || []
  const featuredImageMap = allFeaturedImages.reduce((map, obj) => {
    const slug = obj.node.relativePath.match(/\/[projects].*\/|$/)[0]
    map[slug] = obj.node.childImageSharp.fluid
    return map
  }, {})

  return (
    <ThemeContext.Consumer>
      {({ dark }) => (
        <Layout>
          <Container className="pt-2 mt-5 text-center">
            <JumboTitle title="My Projects" />
            <Container className="text-left">
              <section>
                {allProjects.map(({ node }) => (
                  <div key={node.id}>
                    <ProjectLink
                      to={node.fields.slug}
                      featuredImage={featuredImageMap[`${node.fields.slug}`]}
                      title={node.frontmatter.title}
                      tags={node.frontmatter.tags}
                      excerpt={node.excerpt}
                    />
                    <hr style={{ background: "#adb5bd" }} />
                  </div>
                ))}
              </section>
            </Container>
          </Container>
        </Layout>
      )}
    </ThemeContext.Consumer>
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
            description
            tags
            date(formatString: "DD MMMM, YYYY")
          }
          fields {
            slug
          }
          excerpt
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
            fluid(maxWidth: 200) {
              ...GatsbyImageSharpFluid
            }
          }
          relativePath
        }
      }
    }
  }
`
