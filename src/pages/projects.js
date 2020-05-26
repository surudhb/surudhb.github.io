import React from "react"
import { graphql } from "gatsby"
import { Layout, JumboTitle, ProjectLink } from "../components/Components"
import { Container } from "react-bootstrap"
import ThemeContext from "../utils/theme-context"

export default ({ data }) => {
  const allProjects = data.allMarkdownRemark.edges || []

  const allFeaturedImages = data.allFile.edges || []

  // display max 3 featured images for each project
  const featuredImageMap = allFeaturedImages.reduce((map, obj) => {
    const slug = obj.node.relativePath.match(/\/[projects].*\/|$/)[0]
    if (map.hasOwnProperty(slug)) {
      if (map[slug].length <= 3) map[slug].push(obj.node.childImageSharp.fluid)
    } else {
      const arr = []
      arr.push(obj.node.childImageSharp.fluid)
      map[slug] = arr
    }
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
                  <div key={node.id} className="p-3">
                    <ProjectLink
                      to={node.fields.slug}
                      featuredImages={featuredImageMap[`${node.fields.slug}`]}
                      title={node.frontmatter.title}
                      tags={node.frontmatter.tags}
                      excerpt={node.excerpt}
                    />
                    <hr
                      style={{
                        background: `${dark ? "#8a0900" : "#008cff"}`,
                        height: "0.05rem",
                      }}
                    />
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
