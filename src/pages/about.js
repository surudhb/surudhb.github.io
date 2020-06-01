import React from "react"
import { Layout, JumboTitle } from "../components"
import { Container, Image } from "react-bootstrap"
import { Link, graphql } from "gatsby"
import { ThemeContext, SEO } from "../utils"

export default ({ data }) => {
  const MediaLink = ({ title, author, link }) => (
    <li key={title} style={{ color: "gray" }}>
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
          <SEO title="About" />
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
                <p className="text-center">
                  <b>Coding Monkey</b> | <b>Dad-Joke enthusiast</b> |{" "}
                  <b>Coffee addict</b> |{" "}
                  <b>2010 Chess Regionals 2nd Runner-up</b>
                </p>
                <p style={{ textIndent: "5em" }}>
                  Hello there! My name is <b>Surudh Bhutani</b>. I am a{" "}
                  <a
                    href="https://www.dictionary.com/e/fictional-characters/padawan/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
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
                    target="_blank"
                    rel="noopener noreferrer"
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
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecorationColor: "#8f001a" }}
                  >
                    <span style={{ color: "#8f001a" }}>
                      <b>University of Ottawa</b>
                    </span>
                  </a>{" "}
                  and graduating from the former with a B.SE in September 2018.
                  I am currently quarantining in Ontario, Canada 🇨🇦.{" "}
                  <i>
                    <small>#StayHomeStaySafe</small>
                  </i>
                </p>
                <p style={{ textIndent: "5em" }}>
                  In my spare time, you can find me tinkering around with new JS
                  libraries, tutoring, actively trying to beat a 10-year-old{" "}
                  <a
                    href="https://www.playmagnus.com/en"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Magnus Carlsen
                  </a>
                  , passionately arguing about: comics, vfx and video games, and
                  having long-winded discussions on history and human nature.
                </p>
                <p style={{ textIndent: "5em" }}>
                  Check out my <Link to="/projects">projects</Link> to see what
                  I've been up to! Or check out my <Link to="/blog">blog</Link>{" "}
                  to see what's recently caught my eye!
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
                <ul style={{ fontSize: "0.9rem", listStyle: "none" }}>
                  {bookLinks}
                </ul>
                <h4 className={`pt-4 ${dark ? "text-white" : "text-dark"}`}>
                  <small>Here are a couple of shows from my watch list:</small>
                </h4>
                <ul style={{ fontSize: "0.9rem", listStyle: "none" }}>
                  {showLinks}
                </ul>
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
