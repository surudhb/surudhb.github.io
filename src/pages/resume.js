import React from "react"
import { graphql } from "gatsby"
import { Layout, JumboTitle, WorkHistory } from "../components/Components"
import { Container } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ThemeContext, Utils } from "../utils/Utils"

export default ({ data }) => {
  const history = data.allMarkdownRemark.edges || []
  const images = data.allFile.edges || []
  const imageMap = Utils.getImageMap(images, /\/[work].*\/|$/)

  return (
    <ThemeContext.Consumer>
      {({ dark }) => (
        <Layout>
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
            <Container fluid>
              {history.map(({ node }) => (
                <div key={node.id}>
                  <WorkHistory
                    company={node.frontmatter.company}
                    companyImage={imageMap[node.fields.slug]}
                    position={node.frontmatter.position}
                    tags={node.frontmatter.tags}
                    startDate={node.frontmatter.startDate}
                    endDate={node.frontmatter.endDate}
                    html={node.html}
                  />
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
            position
            tags
            startDate(formatString: "DD MMMM, YYYY")
            endDate(formatString: "DD MMMM, YYYY")
          }
          fields {
            slug
          }
        }
      }
    }
    allFile(
      filter: {
        extension: { eq: "jpeg" }
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
