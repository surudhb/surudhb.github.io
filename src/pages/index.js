import React from "react"
import { Link } from "gatsby"
import Layout from "../components/Layout"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Container, Row, Col, Jumbotron, Image } from "react-bootstrap"

export default () => (
  <Layout>
    <Container className="text-center mt-5 pt-5" fluid>
      <Image
        width="130"
        height="130"
        src="https://img.icons8.com/wired/512/000000/r2-d2.png"
        alt="R2-D2"
      />
    </Container>
    <Jumbotron fluid className="bg-white text-center py-0">
      <Container>
        <h1 style={{ fontSize: "5rem" }}>Surudh Bhutani</h1>
        <p>Software Engineer by day. Rebel scum by night.</p>
      </Container>
      <hr className="my-3" style={{ width: "50%" }}></hr>
      <Container style={{ width: "50%" }}>
        <Row className="text-center">
          <Col>
            <a
              href="https://www.github.com/surudhb"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={["fab", "github"]} className="icons" />
            </a>
          </Col>
          <Col>
            <a
              href="https://linkedin.com/in/surudh-bhutani"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={["fab", "linkedin"]} className="icons" />
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
                className="icons"
              />
            </a>
          </Col>
          <Col>
            <a
              href="mailto:surudhb@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={["fas", "envelope"]} className="icons" />
            </a>
          </Col>
          <Col>
            <Link to="/resume">
              <FontAwesomeIcon icon={["fas", "file-alt"]} className="icons" />
            </Link>
          </Col>
        </Row>
      </Container>
    </Jumbotron>
  </Layout>
)
