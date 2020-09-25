import React from "react"
import { graphql } from "gatsby"
import { CompanyCard, PageLayout, PageTitle, WorkHistory } from "../components"
import { SEO, Utils } from "../utils"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Container, Col, Row } from "react-bootstrap"

export default ({ data }) => {
  const institutions = data.site.siteMetadata.institutions || []
  const history = data.allMarkdownRemark.edges || []
  const images = data.allFile.edges || []
  const imageMap = Utils.getImageMap(images, /\/[work].*\/|$/)
  return (
    <PageLayout>
      <SEO title="Resume" />
      <PageTitle title="Resume">
        &nbsp;
        <a href="../../surudh_bhutani_resume.pdf" target="_blank" download>
          <FontAwesomeIcon
            style={{ fontSize: "2rem" }}
            icon={["fas", "file-download"]}
            className="icons file"
          />
        </a>
      </PageTitle>
      <Container className="mt-5 pt-3" fluid>
        <br />
        <h2 className="m-auto w-75 text-left">Technologies</h2>
        <hr className="w-75 my-0" />
        <br />
        <FontAwesomeIcon icon={["fab", "java"]} className="resume-icons java" />
        <FontAwesomeIcon
          icon={["fab", "js-square"]}
          className="resume-icons js"
        />
        <FontAwesomeIcon
          icon={["fab", "html5"]}
          className="resume-icons html"
        />
        <FontAwesomeIcon icon={["fab", "css3"]} className="resume-icons css" />
        <FontAwesomeIcon
          icon={["fab", "swift"]}
          className="resume-icons swift"
        />
        <br />
        <FontAwesomeIcon
          icon={["fab", "react"]}
          className="resume-icons reactjs"
        />
        <FontAwesomeIcon
          icon={["fab", "node"]}
          className="resume-icons nodejs"
        />
        <FontAwesomeIcon
          icon={["fab", "bootstrap"]}
          className="resume-icons bootstrap"
        />
        <FontAwesomeIcon
          icon={["fab", "sass"]}
          className="resume-icons github"
        />
        <br />
        <FontAwesomeIcon
          icon={["fab", "github-alt"]}
          className="resume-icons"
        />
        <FontAwesomeIcon icon={["fab", "jira"]} className="resume-icons" />
        <FontAwesomeIcon icon={["fab", "docker"]} className="resume-icons" />

        <h2 className="m-auto w-75 text-left">Education</h2>
        <hr className="w-75 my-0" />
        <br />
        <Row className="w-50 m-auto">
          {institutions.map(frontmatter => (
            <Col className="col-xl-4 col-12">
              <CompanyCard frontmatter={frontmatter} />
            </Col>
          ))}
        </Row>
        <br />
        <h2 className="m-auto w-75 text-left">Experience</h2>
        <hr className="w-75 my-0" />
        <br />
        {history.map(({ node }) => (
          <div key={node.id}>
            <WorkHistory
              frontmatter={node.frontmatter}
              image={imageMap[node.fields.slug]}
              html={node.html}
            />
            <br />
          </div>
        ))}
      </Container>
    </PageLayout>
  )
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        institutions {
          company
          link
          position
          startDate
          endDate
          slug
        }
      }
    }
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
            link
            position
            tags
            startDate(formatString: "MMMM, YYYY")
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
