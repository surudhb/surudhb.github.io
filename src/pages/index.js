import React, { useContext } from "react"
import { graphql } from "gatsby"
import ThemeContext from "../utils/theme"
import { PageLayout } from "../components"
import { SEO } from "../utils"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Typewriter from "typewriter-effect"

export default ({ data }) => {
  const { unemployed, firstName, lastName, dialogues } = data.site.siteMetadata
  const { toString } = useContext(ThemeContext)
  const typewriter_dialogues = dialogues[`${toString()}`]
  unemployed &&
    typewriter_dialogues.unshift("Hey! I am looking for new opportunities.")
  return (
    <PageLayout>
      <SEO title="Home" />
      <div className="text-center px-0 mx-0" style={{ marginTop: "15%" }}>
        {unemployed && (
          <Typewriter
            options={{
              strings: typewriter_dialogues,
              delay: 20,
              deleteSpeed: 23,
              autoStart: true,
              loop: true,
            }}
          />
        )}
        <h1 className="display-1" style={{ fontSize: "7vmax" }}>
          <span className="first-name">{firstName}</span>&nbsp;
          <span className="last-name">{lastName}</span>
        </h1>
      </div>
      <div className="d-flex flex-column flex-md-row d-md-inline-flex icons-container">
        <a
          href="https://www.github.com/surudhb"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon
            icon={["fab", "github"]}
            className="home-icons github"
            title="Github"
          />
        </a>
        <a
          href="https://www.linkedin.com/in/surudh-bhutani/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon
            icon={["fab", "linkedin"]}
            className="home-icons linkedin"
            title="LinkedIn"
          />
        </a>
        <a
          href="https://angel.co/u/surudh-bhutani"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon
            icon={["fab", "angellist"]}
            className="home-icons angellist"
            title="Angel.co"
          />
        </a>
        <a
          href="https://www.hackerrank.com/surudhbhutani"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon
            icon={["fab", "hackerrank"]}
            className="home-icons hr"
            title="Hackerrank"
          />
        </a>
        <a
          href="mailto:surudhb@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon
            icon={["fas", "envelope"]}
            className="home-icons mail"
            title="e-mail"
          />
        </a>
        <a href="../../surudh_bhutani_resume.pdf" target="_blank" download>
          <FontAwesomeIcon
            icon={["fas", "file-download"]}
            className="home-icons file"
            title="Resume"
          />
        </a>
      </div>
    </PageLayout>
  )
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        dialogues {
          light
          dark
        }
        unemployed
        firstName
        lastName
        occupation
      }
    }
  }
`
