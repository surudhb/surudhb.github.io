import React from "react"
import { graphql } from "gatsby"
import PostTemplate from "./post-template"

export default ({ data }) => {
  const post = data.markdownRemark
  return <PostTemplate title={post.frontmatter.title} html={post.html} />
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        tags
      }
    }
  }
`
