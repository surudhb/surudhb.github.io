import React, { useContext } from "react"
import { PageLayout, PageTitle } from "../components"
import Image from "react-bootstrap/Image"
import { Link, graphql } from "gatsby"
import { ThemeContext, SEO } from "../utils"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default ({ data }) => {
  const MediaLink = ({ title, author, link }) => (
    <li key={title} style={{ color: "gray" }} className="mb-3">
      <a target="_blank" rel="noopener noreferrer" href={link}>
        {title}
      </a>
      <br />
      <span
        style={{ color: "gray", fontSize: "0.8em" }}
        className="d-md-inline-flex"
      >
        &nbsp;<i>{author}</i>
      </span>
      <br />
    </li>
  )

  const {
    author,
    readingList,
    showsList,
    moviesList,
    designations,
    unemployed,
  } = data.site.siteMetadata
  const { toString } = useContext(ThemeContext)

  const bookLinks = readingList.map(book => MediaLink(book))
  const showLinks = showsList.map(show => MediaLink(show))
  const movieLinks = moviesList.map(movie => MediaLink(movie))

  return (
    <PageLayout>
      <SEO title="About Me" />
      <PageTitle title="About Me" />
      <Image
        rounded
        width="140"
        height="140"
        src={`../../icons/luke-${toString()}.png`}
        alt={author}
      />
      <div className="about-container m-auto">
        <article className="w-75 m-auto pt-2 text-justify p-large">
          <p className="text-center">
            {designations.map((attr, i) => (
              <span key={attr}>
                &nbsp;<b>{attr}</b>&nbsp;
                {i < designations.length - 1 && <>||</>}
              </span>
            ))}
          </p>
          <p className="i-5 mt-md-4 pt-md-2 mb-md-4">
            Hello there! My name is <b>{`${author}`}</b>. I am a&nbsp;
            <a
              href="https://www.dictionary.com/e/fictional-characters/padawan/"
              target="_blank"
              rel="noopener noreferrer"
            >
              padawan
            </a>
            &nbsp;developer discovering the ways of the <code>code</code>.
          </p>
          <p className="i-5">
            I've had the privilege of studying Software Engineering at both the{" "}
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
              className="uwaterloo"
            >
              <b>University of Waterloo</b>
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
              className="uottawa"
            >
              <b>University of Ottawa</b>
            </a>{" "}
            and graduating from the former with a B.SE in September 2018.
            Studying at these institutions granted me the opportunity to gain
            exposure to a spectrum of industries including healthcare, ed-tech
            and fintech. It allowed me to discover a lot about what parts of
            coding I enjoy and what parts I don't.
          </p>
          <p className="i-5">
            My technical interests lie in <b>front-end, full-stack</b> and
            <b>&nbsp;iOS development</b>. I have the most experience with&nbsp;
            <code>JavaScript</code>
            &nbsp;based frameworks and technologies:&nbsp;
            <code>React.js</code>, <code>Gatsby.js</code>, <code>Node.js</code>
            &nbsp;and&nbsp;
            <code>Express.js</code>. I am currently enjoying learning&nbsp;
            <code>SwiftUI</code>, the new mobile framework for&nbsp;
            <code>Swift</code> while quarantining in Ontario, Canada 🇨🇦.{" "}
            <i>
              <small>#StayHomeStaySafe</small>
            </i>
          </p>
          <p className="i-5">
            When I am not coding, you can find me doing one or more of:
            playing&nbsp;
            <a
              href="https://store.steampowered.com/app/381210/Dead_by_Daylight/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Dead By Daylight
            </a>
            , karting on weekends, tutoring part-time or desperately trying to
            beat a 10-year-old{" "}
            <a
              href="https://www.playmagnus.com/en"
              target="_blank"
              rel="noopener noreferrer"
            >
              Magnus Carlsen
            </a>
            &nbsp;at chess. I also aim to read one chapter a day.
          </p>
          <p className="i-5">
            Check out my <Link to="/projects">projects</Link> to see what I've
            been up to! Or check out my <Link to="/blog">blog</Link> to see
            what's recently caught my eye!
          </p>
        </article>
        <article className="w-75 m-auto">
          {unemployed && (
            <>
              <hr />
              <p className="unemployed">
                <small>
                  I am <b>currently looking for new opportunities</b>! If you
                  like what you <Link to="/resume">see</Link>, let's get
                  in&nbsp;
                  <a
                    href="https://www.linkedin.com/in/surudh-bhutani/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    touch
                  </a>
                  !
                </small>
              </p>
            </>
          )}
          <hr />
          <div className="row p-large">
            <div className="col-md-6">
              <FontAwesomeIcon
                icon={["fas", "journal-whills"]}
                className="about-icons mt-4 books"
                title="Reading List"
              />
              <h3 className="watch-list-title mt-2">Reading List</h3>
              <ul className="pl-0 mx-3 list-unstyled">{bookLinks}</ul>
            </div>
            <div className="col-md-6">
              <FontAwesomeIcon
                icon={["fas", "tv"]}
                className="about-icons mt-4 shows"
                title="Reading List"
              />
              <h3 className="watch-list-title mt-2">Binge List</h3>
              <ul className="pl-0 mx-3 list-unstyled">{showLinks}</ul>
            </div>
            <div className="col-md-6">
              <FontAwesomeIcon
                icon={["fas", "film"]}
                className="about-icons mt-4 movies"
                title="Reading List"
              />
              <h3 className="watch-list-title mt-2">Watch List</h3>
              <ul className="pl-0 mx-3 list-unstyled">{movieLinks}</ul>
            </div>
            <div className="col-md-6">
              <FontAwesomeIcon
                icon={["fas", "pen-nib"]}
                className="about-icons mt-4 poetry"
                title="Reading List"
              />
              <h3 className="watch-list-title mt-2">Girlfriend's tumblr:</h3>
              <p>
                <a
                  href="https://monicaiyer.tumblr.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  mind tricks and other paraphernalia
                </a>
                <br />
                <span
                  style={{ color: "gray", fontSize: "0.85em" }}
                  className="d-md-inline-flex"
                >
                  <i className="m-auto">Monica Iyer</i>
                </span>
              </p>
            </div>
          </div>
        </article>
      </div>
    </PageLayout>
  )
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        unemployed
        occupation
        author
        designations
        readingList {
          title
          author
          link
        }
        showsList {
          title
          author
          link
        }
        moviesList {
          title
          author
          link
        }
      }
    }
  }
`
