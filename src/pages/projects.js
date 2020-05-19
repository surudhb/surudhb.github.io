import React from "react"
import { graphql } from "gatsby"
import { Layout, JumboTitle, ProjectLink } from "../components/Components"
import { Container } from "react-bootstrap"

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
                <ProjectLink
                  to={node.fields.slug}
                  img={node.frontmatter.image}
                  title={node.frontmatter.title}
                  tags={node.frontmatter.tags}
                  excerpt={node.excerpt}
                />
                <hr />
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
