import React from "react"
import { Layout, JumboTitle } from "../components/Components"
import { Container } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import ThemeContext from "../utils/theme-context"

export default () => {
  return (
    <ThemeContext.Consumer>
      {({ dark }) => (
        <Layout>
          <Container fluid className="pt-2 mt-5 text-center">
            <JumboTitle title="Resume">
              <a href="../../resume.pdf" target="_blank" download>
                <FontAwesomeIcon
                  style={{ fontSize: "2rem" }}
                  icon={["fas", "file-download"]}
                  className={`icons file ${dark ? "dark" : "light"}`}
                />
              </a>
            </JumboTitle>
          </Container>
        </Layout>
      )}
    </ThemeContext.Consumer>
  )
}
