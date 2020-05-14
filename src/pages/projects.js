import React from "react"
import { Layout, JumboTitle, MDQuery } from "../components/Components"
import { Container } from "react-bootstrap"

export default () => {
  return (
    <Layout>
      <Container className="text-center">
        <JumboTitle title="My Projects" />
      </Container>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
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
