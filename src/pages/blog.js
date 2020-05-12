import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/Layout"
import BlogFilter from "../components/Blog-Filter"
import { Container } from "react-bootstrap"

export default ({ data }) => {
  return (
    <Layout>
      <Container fluid className="text-center">
        <div>My Blog List</div>
        <BlogFilter />
        <Container fluid className="text-left">
          <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
          {data.allMarkdownRemark.edges.map(({ node }) => (
            <div key={node.id} className="aurebesh">
              <Link to={node.fields.slug}>
                <h3>
                  {node.frontmatter.title} - {node.frontmatter.date}
                </h3>
                <p>{node.excerpt}</p>
              </Link>
            </div>
          ))}
        </Container>
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
          frontmatter {
            title
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
