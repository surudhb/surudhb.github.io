import { graphql } from "gatsby"

export const query = contentType => graphql`
  query {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/$contentType/" } }
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
