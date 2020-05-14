import React from "react"
import { graphql } from "gatsby"
import { Layout, JumboTitle } from "../components/Components"
import { Container } from "react-bootstrap"

export default ({ data }) => {
  const profile = data.site.siteMetadata
  return (
    <Layout>
      <Container className="text-center">
        <JumboTitle title="About Me" />
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
