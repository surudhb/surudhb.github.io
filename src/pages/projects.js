import React from "react"
import { Link, graphql } from "gatsby"
import { Layout, JumboTitle } from "../components/Components"
import { Container, Image } from "react-bootstrap"

export default ({ data }) => {
  const allProjects = data.allMarkdownRemark.edges || []
  return (
    <Layout>
      <Container className="text-center">
        <JumboTitle title="My Projects" />
        <Container className="text-left">
          <section>
            {allProjects.map(({ node }) => (
              <div key={node.id}>
                <article className="aurebesh">
                  <Link
                    to={node.fields.slug}
                    style={{ textDecoration: "none" }}
                  >
                    <header>
                      <Image src={node.frontmatter.image} rounded />
                      <h4>{node.frontmatter.title}</h4>
                      <p>
                        {node.frontmatter.tags.map(tag => (
                          <span key={tag}>tag </span>
                        ))}
                      </p>
                    </header>
                    <p>{node.excerpt}</p>
                  </Link>
                  <hr />
                </article>
              </div>
            ))}
          </section>
        </Container>
      </Container>
    </Layout>
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
  }
`
