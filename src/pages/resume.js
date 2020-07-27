import React from "react"
import { graphql } from "gatsby"
import { PageLayout, PageTitle, WorkHistory } from "../components"
import { SEO, Utils } from "../utils"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Container from "react-bootstrap/Container"

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
      <Container fluid></Container>
      <Container className="mt-5 pt-3" fluid>
        <br />
        <h2 className="m-auto w-75 text-left">Education</h2>
        <hr className="mt-0 w-75" />
        <Container fluid className="w-75 text-left">
          <ul>
            {institutions.map(({ name, program, link, description }) => (
              <li
                className="text-left"
                key={name}
                style={{ fontSize: "1.15rem" }}
              >
                <a
                  className={Utils.getInstitutionClass(name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  href={link}
                >
                  {name}
                </a>{" "}
                <small>
                  <span>
                    <b>{program}</b>:{" "}
                  </span>
                  <span className="float-md-right">{description}</span>
                </small>
                <br />
              </li>
            ))}
          </ul>
        </Container>
        <br />
        <h2 className="m-auto w-75 text-left">Experience</h2>
        <hr className="mt-0 w-75" />
        <br />
        {history.map(({ node }) => (
          <div key={node.id}>
            <WorkHistory
              frontmatter={node.frontmatter}
              image={imageMap[node.fields.slug]}
              html={node.html}
            />
            <hr className="w-75" />
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
          name
          link
          program
          description
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
