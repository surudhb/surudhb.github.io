import React from "react"
import { graphql } from "gatsby"
import { Layout, JumboTitle, WorkHistory } from "../components"
import { Container } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ThemeContext, Utils, SEO } from "../utils"

export default ({ data }) => {
  const history = data.allMarkdownRemark.edges || []
  const images = data.allFile.edges || []
  const imageMap = Utils.getImageMap(images, /\/[work].*\/|$/)

  return (
    <ThemeContext.Consumer>
      {({ dark }) => (
        <Layout>
          <SEO title="Resume" />
          <Container fluid className="pt-2 mt-5 text-center">
            <JumboTitle title="Resume">
              <a href="../../resume.pdf" target="_blank" download>
                <FontAwesomeIcon
                  style={{ fontSize: "2rem" }}
                  icon={["fas", "file-download"]}
                  className={`icons file ${dark ? "dark" : "light"}`}
                />
              </a>
            </JumboTitle>
            <Container className="mt-5 pt-3" fluid>
              {history.map(({ node }) => (
                <div key={node.id}>
                  <WorkHistory
                    frontmatter={node.frontmatter}
                    image={imageMap[node.fields.slug]}
                    html={node.html}
                  />
                  <hr />
                </div>
              ))}
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
      filter: { fileAbsolutePath: { regex: "/work/" } }
      sort: { fields: [frontmatter___startDate], order: DESC }
    ) {
      edges {
        node {
          id
          html
          frontmatter {
            company
            location
            position
            tags
            startDate(formatString: "MMMM")
            endDate(formatString: "MMMM, YYYY")
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
        relativePath: { regex: "/company/" }
        relativeDirectory: { regex: "/content/work/" }
      }
    ) {
      edges {
        node {
          childImageSharp {
            fluid(maxWidth: 400) {
              ...GatsbyImageSharpFluid
            }
          }
          relativePath
        }
      }
    }
  }
`
