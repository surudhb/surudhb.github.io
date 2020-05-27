import React from "react"
import { graphql } from "gatsby"
import { Layout, JumboTitle } from "../components/Components"
import { Container } from "react-bootstrap"

export default ({ data }) => {
  const post = data.markdownRemark
  return (
    <Layout>
      <Container className="pt-5 mt-5 text-center" fluid>
        <JumboTitle title={post.frontmatter.title} />
        <Container className="text-justify">
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </Container>
      </Container>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`
