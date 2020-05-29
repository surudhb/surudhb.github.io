import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import ThemeContext from "../utils/theme-context"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Container, Row, Col, Jumbotron, Image } from "react-bootstrap"

export default ({ data }) => {
  return (
    <ThemeContext.Consumer>
      {({ dark }) => (
        <Layout>
          <Container className="pt-5 mt-5" fluid>
            <Container className="text-center pt-5 mt-5" fluid>
              <Container fluid>
                <Image
                  rounded
                  width="130"
                  height="130"
                  src={
                    dark
                      ? `../../icons/darth-vader-red.png`
                      : `../../icons/r2-d2-light.png`
                  }
                  alt={dark ? "Darth Vader" : "R2-D2"}
                />
                {data.site.siteMetadata.unemployed && (
                  <p>
                    <b> Hey! I am looking for new opportunities :)</b>
                  </p>
                )}
              </Container>
              <Jumbotron
                fluid
                className="py-0 my-0"
                style={{ background: "rgba(0,0,0,0)" }}
              >
                <Container className="py-my-0">
                  <h1
                    style={{
                      fontSize: "5rem",
                      color: "black",
                    }}
                  >
                    <span style={{ color: "#ced4da" }}>Surudh</span> Bhutani
                  </h1>
                  <p>
                    <i>
                      Software Engineer by day,{" "}
                      {dark
                        ? `Imperial enforcer by night`
                        : `Rebel scum by night`}
                    </i>
                  </p>
                </Container>
                <hr className="my-3" style={{ width: "50%" }} />
                <Container style={{ width: "60%" }}>
                  <Row className="text-center">
                    <Col>
                      <a
                        href="https://www.github.com/surudhb"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FontAwesomeIcon
                          icon={["fab", "github"]}
                          className={`icons github ${dark ? "dark" : "light"}`}
                        />
                      </a>
                    </Col>
                    <Col>
                      <a
                        href="https://linkedin.com/in/surudh-bhutani"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FontAwesomeIcon
                          icon={["fab", "linkedin"]}
                          className={`icons linkedin ${
                            dark ? "dark" : "light"
                          }`}
                        />
                      </a>
                    </Col>
                    <Col>
                      <a
                        href="https://www.freecodecamp.org/surudhb"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FontAwesomeIcon
                          icon={["fab", "free-code-camp"]}
                          className={`icons fcc ${dark ? "dark" : "light"}`}
                        />
                      </a>
                    </Col>
                    <Col>
                      <a
                        href="https://www.hackerrank.com/surudhbhutani"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FontAwesomeIcon
                          icon={["fab", "hackerrank"]}
                          className={`icons hr ${dark ? "dark" : "light"}`}
                        />
                      </a>
                    </Col>
                    <Col>
                      <a
                        href="mailto:surudhb@gmail.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FontAwesomeIcon
                          icon={["fas", "envelope"]}
                          className={`icons mail ${dark ? "dark" : "light"}`}
                        />
                      </a>
                    </Col>
                    <Col>
                      <a href="../../resume.pdf" target="_blank" download>
                        <FontAwesomeIcon
                          icon={["fas", "file-alt"]}
                          className={`icons file ${dark ? "dark" : "light"}`}
                        />
                      </a>
                    </Col>
                  </Row>
                </Container>
              </Jumbotron>
            </Container>
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
      }
    }
  }
`
