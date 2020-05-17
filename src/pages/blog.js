import React, { useState } from "react"
import { Link, graphql } from "gatsby"
import { Layout, JumboTitle } from "../components/Components"
import { Container, Jumbotron, Form, FormControl } from "react-bootstrap"

export default ({ data }) => {
  const [state, setState] = useState({
    filteredData: [],
    query: "",
  })

  const allPosts = data.allMarkdownRemark.edges || []

  const handleChange = e => {
    const query = e.target.value

    const filteredData = allPosts.filter(post => {
      // query will run on the following fields
      const { description, title, tags } = post.node.frontmatter
      // standardize query
      const stdQuery = query.toLowerCase()
      return (
        post.node.excerpt.toLowerCase().includes(stdQuery) ||
        (description && description.toLowerCase().includes(stdQuery)) ||
        title.toLowerCase().includes(stdQuery) ||
        (tags && tags.join("").toLowerCase().includes(stdQuery))
      )
    })
    setState({
      query,
      filteredData,
    })
  }

  const { filteredData, query } = state
  const filteredPosts = query !== "" ? filteredData : allPosts

  return (
    <Layout>
      <Container fluid className="text-center">
        <JumboTitle title="My Blog" />
        <Container className="mx-5 px-5 mb-5">
          <Form className="aurebesh">
            <FormControl
              type="text"
              placeholder="Search"
              onChange={handleChange}
            />
          </Form>
        </Container>
        <Container fluid className="text-left">
          <Jumbotron className="bg-white pl-0 pt-2">
            <h3>All Posts ({data.allMarkdownRemark.totalCount})</h3>
          </Jumbotron>
          <section>
            {filteredPosts.map(({ node }) => (
              <div key={node.id}>
                <article className="aurebesh">
                  <Link
                    to={node.fields.slug}
                    style={{ textDecoration: "none" }}
                  >
                    <header>
                      <h4>{node.frontmatter.title}</h4>
                      <p>{node.frontmatter.date}</p>
                    </header>
                    <p>{node.excerpt}</p>
                  </Link>
                  <br />
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
      filter: { fileAbsolutePath: { regex: "/blog/" } }
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
