import React, { useState } from "react"
import { graphql } from "gatsby"
import { Layout, JumboTitle, BlogLink } from "../components/Components"
import ThemeContext from "../utils/theme-context"
import {
  Container,
  Jumbotron,
  Form,
  FormControl,
  Row,
  Col,
} from "react-bootstrap"

export default ({ data }) => {
  const [state, setState] = useState({
    filteredData: [],
    query: "",
  })

  const allFeaturedImages = data.allFile.edges || []
  const featuredImageMap = allFeaturedImages.reduce((map, obj) => {
    const slug = obj.node.relativePath.match(/\/[blog].*\/|$/)[0]
    map[slug] = obj.node.childImageSharp.fluid
    return map
  }, {})

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
    <ThemeContext.Consumer>
      {({ dark }) => (
        <Layout>
          <Container fluid className="pt-2 mt-5 text-center">
            <JumboTitle title="My Blog" />
            <Container className="px-5 mb-5 text-center">
              <Form className="aurebesh">
                <FormControl
                  className={`bg-none search ${dark ? "dark" : "light"}`}
                  type="text"
                  placeholder="Search"
                  onChange={handleChange}
                />
              </Form>
            </Container>
            <Container fluid className="text-left">
              <Jumbotron className="bg-none pl-0 pt-2 pb-0">
                <h3>All Posts ({data.allMarkdownRemark.totalCount})</h3>
              </Jumbotron>
              <Row>
                {filteredPosts.map(({ node }) => (
                  <Col key={node.id} className="col-4 p-3">
                    <Row className="justify-content-center">
                      <BlogLink
                        to={node.fields.slug}
                        featuredImage={featuredImageMap[`${node.fields.slug}`]}
                        title={node.frontmatter.title}
                        subtitle={node.frontmatter.date}
                        excerpt={node.excerpt}
                      />
                    </Row>
                  </Col>
                ))}
              </Row>
            </Container>
          </Container>
        </Layout>
      )}
    </ThemeContext.Consumer>
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
    allFile(
      filter: {
        extension: { eq: "jpg" }
        relativePath: { regex: "/feature/" }
        relativeDirectory: { regex: "/content/blog/" }
      }
    ) {
      edges {
        node {
          childImageSharp {
            fluid(maxWidth: 200) {
              ...GatsbyImageSharpFluid
            }
          }
          relativePath
        }
      }
    }
  }
`
