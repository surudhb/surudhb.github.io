import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import { Container, Jumbotron } from "react-bootstrap"

export default ({ data }) => {
  const profile = data.site.siteMetadata
  return (
    <Layout>
      <Container className="text-center">
        <Jumbotron className="bg-white pt-5 pb-0">
          <h1>About Me</h1>
        </Jumbotron>
        <section>
          <p>{profile.about}</p>
        </section>
        <section>
          <h5>Education</h5>
          {profile.education.map(institution => (
            <span>{institution} </span>
          ))}
        </section>
      </Container>
    </Layout>
  )
}

// This is really to showcase the power of Gatsby's templating and isn't at all necessary at this scale
export const query = graphql`
  query {
    site {
      siteMetadata {
        author
        about
        education
        technicalLanguages
        technologies
        technicalInterests
        interests
      }
    }
  }
`
