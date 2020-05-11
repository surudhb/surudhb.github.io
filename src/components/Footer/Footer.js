import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import "./footer.module.scss"

export default () => (
  <footer className="py-3">
    <Container fluid className="text-center">
      <Row>
        <Col>
          <small>
            Surudh Bhutani &copy; {new Date().getFullYear()}. Made with ❤ &{" "}
            <a href="https://www.gatsbyjs.org/">Gatsby</a>
          </small>
        </Col>
      </Row>
    </Container>
  </footer>
)
