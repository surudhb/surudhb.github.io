import React from "react"
import { graphql } from "gatsby"
import PostTemplate from "./post-template"
import Badge from "react-bootstrap/Badge"

const SubTitle = ({ tags }) => (
  <div className="mb-5">
    {tags.map(tag => (
      <Badge key={tag} pill className="px-3 mr-1 resume-tags">
        <h5 className="my-0">{tag}</h5>
      </Badge>
    ))}
  </div>
)

export default ({ data }) => {
  const post = data.markdownRemark
  return (
    <PostTemplate
      title={post.frontmatter.title}
      subTitle={<SubTitle tags={post.frontmatter.tags} />}
      excerpt={post.excerpt}
    />
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        tags
      }
      excerpt
    }
  }
`
