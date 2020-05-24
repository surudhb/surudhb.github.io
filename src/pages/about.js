import React from "react"
import { Layout, JumboTitle } from "../components/Components"
import { Container, Image } from "react-bootstrap"
import { Link, graphql } from "gatsby"
import ThemeContext from "../utils/theme-context"

export default ({ data }) => {
  const MediaLink = ({ title, author, link }) => (
    <li style={{ color: "gray" }}>
      <a href={link}>{title}</a> -<i>{author}</i>
    </li>
  )

  const bookLinks = data.site.siteMetadata.readingList.map(book =>
    MediaLink(book)
  )

  const showLinks = data.site.siteMetadata.showsList.map(show =>
    MediaLink(show)
  )

  return (
    <ThemeContext.Consumer>
      {({ dark }) => (
        <Layout>
          <Container className="pt-2 mt-5 text-center">
            <JumboTitle title="About Me" />
            <section className="mt-5">
              <article>
                <Image
                  rounded
                  width="130"
                  height="130"
                  src={`../../icons/luke-${dark ? "dark" : "light"}-alt.png`}
                  alt="Surudh Bhutani"
                />
              </article>
              <article
                style={{ maxWidth: "75%" }}
                className="m-auto text-justify"
              >
                <p style={{ textIndent: "5em" }}>
                  Hello there! My name is <b>Surudh Bhutani</b>. I am a{" "}
                  <a href="https://www.dictionary.com/e/fictional-characters/padawan/">
                    padawan
                  </a>{" "}
                  <b>Software Developer</b> discovering the ways of the code.
                  I've had the privilege of studying Software Engineering at
                  both the{" "}
                  <Image
                    width="20"
                    height="24"
                    src="../../icons/uwaterloo.png"
                    className="align-bottom m-0"
                  />{" "}
                  <a
                    href="https://uwaterloo.ca/"
                    style={{
                      textDecorationColor: `${dark ? "#FFD54F" : "#E4B429"}`,
                    }}
                  >
                    <span style={{ color: `${dark ? "#FFD54F" : "#E4B429"}` }}>
                      {" "}
                      <b>University of Waterloo</b>
                    </span>
                  </a>{" "}
                  and the{" "}
                  <Image
                    width="33"
                    height="26"
                    src="../../icons/uottawa.png"
                    className="align-bottom m-0"
                  />{" "}
                  <a
                    href="https://www.uottawa.ca/en"
                    style={{ textDecorationColor: "#8f001a" }}
                  >
                    <span style={{ color: "#8f001a" }}>
                      <b>University of Ottawa</b>
                    </span>
                  </a>
                  {". "}I graduated with a B.SE from the former institution in
                  September 2018 and am currently located in Ontario, Canada 🇨🇦.
                </p>
                <p style={{ textIndent: "5em" }}>
                  I have a variety of experience in React.js, Node.js, Swift,
                  Java, C/C++
                </p>
                <p style={{ textIndent: "5em" }}>
                  In my spare time, you can find me tinkering around with new JS
                  libraries, tutoring, arguing about: comics, vfx and video
                  games, and drafting opinionated pieces on the implications of
                  technology on the future of humankind. Check out my{" "}
                  <Link to="/projects">projects</Link> to see what I've been up
                  to!
                </p>
              </article>
              <article style={{ maxWidth: "75%" }} className="m-auto">
                {data.site.siteMetadata.unemployed && (
                  <>
                    <hr />
                    <h5 className={`${dark ? "text-white" : "text-dark"}`}>
                      <small>
                        I am <b>currently looking for new opportunities</b>! If
                        you like what you <Link to="/resume">see</Link>, let's
                        get in{" "}
                        <a
                          href="mailto:surudhb@gmail.com"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          touch
                        </a>
                        !
                      </small>
                    </h5>
                  </>
                )}
                <hr />
                <h4 className={`pt-4 ${dark ? "text-white" : "text-dark"}`}>
                  <small>
                    Here are a couple of books from my reading list:
                  </small>
                </h4>
                <p>
                  <ul style={{ listStyle: "none" }}>{bookLinks}</ul>
                </p>
                <h4 className={`pt-4 ${dark ? "text-white" : "text-dark"}`}>
                  <small>Here are a couple of shows from my watch list:</small>
                </h4>
                <p>
                  <ul style={{ listStyle: "none" }}>{showLinks}</ul>
                </p>
                <h4 className={`pt-4 ${dark ? "text-white" : "text-dark"}`}>
                  <small>Here are a couple of movies from my watch list:</small>
                </h4>
                <p>
                  <i>...waaaay too many to list.</i>
                </p>
              </article>
            </section>
          </Container>
        </Layout>
      )}
    </ThemeContext.Consumer>
  )
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        unemployed
        readingList {
          title
          link
          author
        }
        showsList {
          title
          link
          author
        }
      }
    }
  }
`
