import React from "react"
import { graphql } from "gatsby"
import { Layout, JumboTitle } from "../components/Components"
import { Container, Image } from "react-bootstrap"
import ThemeContext from "../utils/theme-context"

export default ({ data }) => {
  const profile = data.site.siteMetadata
  return (
    <ThemeContext.Consumer>
      {({ dark }) => (
        <Layout>
          <Container className="pt-2 mt-5 text-center">
            <JumboTitle title="About Me" />
            <section>
              <article>
                <Image
                  rounded
                  width="130"
                  height="130"
                  src={`../../icons/luke-${dark ? "dark" : "light"}.png`}
                  alt="Surudh Bhutani"
                />
              </article>
              <article>
                <p>{profile.about}</p>
              </article>
            </section>
            <section>
              <article>
                <h5>Education</h5>
                {profile.education.map(institution => (
                  <div key={institution}>
                    <span>{institution}</span>
                  </div>
                ))}
              </article>
            </section>
          </Container>
        </Layout>
      )}
    </ThemeContext.Consumer>
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
